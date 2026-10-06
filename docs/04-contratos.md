# Contratos del monorepo (fuente de verdad para construir en paralelo)

> Versión 0.1. Este documento fija los límites entre paquetes y módulos para que varios desarrolladores o agentes construyan en paralelo sin pisarse. Si algo aquí no alcanza, se extiende el documento primero y el código después.

## 1. Mapa de propiedad

| Ruta | Paquete | Responsable de | No toca |
|---|---|---|---|
| `packages/shared` | `@parkgt/shared` | Enums, DTOs zod, dinero, placas, tiempo, geo, pase QR (tipos) | Lógica de negocio con efectos |
| `packages/pricing` | `@parkgt/pricing` | Motor de tarifas puro: cotizar, excedentes, agrupación de cobros | DB, HTTP |
| `packages/payments` | `@parkgt/payments` | Interfaz `PaymentProvider`, `MockPaymentProvider`, `RecurrentePaymentProvider`, verificación de webhooks | DB, lógica de reservas |
| `packages/invoicing` | `@parkgt/invoicing` | Interfaz `InvoiceProvider`, `MockInvoiceProvider`, `InfileInvoiceProvider`, armado del DTE FEL | DB |
| `packages/api-client` | `@parkgt/api-client` | Cliente HTTP tipado (fetch) para web y móvil, generado a mano desde las rutas de §4 | UI |
| `apps/api` | `@parkgt/api` | NestJS: módulos de §3, Prisma, workers, webhooks, OpenAPI | UI |
| `apps/web` | `@parkgt/web` | Next.js: checkout público `/p/[slug]`, portal operador `/operador/*`, admin `/admin/*` | Lógica de negocio (consume la API) |
| `apps/mobile` | `@parkgt/mobile` | Expo: app conductor | Lógica de garita |
| `apps/garita` | `@parkgt/garita` | Expo: app del guardia, offline-tolerante | Lógica de conductor |
| `infra/`, `.github/` | — | docker-compose, CI | — |

Regla: un agente/desarrollador trabaja dentro de su ruta. Los archivos raíz (`package.json`, `pnpm-workspace.yaml`, `turbo.json`, `tsconfig.base.json`, `eslint.config.mjs`) solo los cambia quien integra. Cada paquete trae su propio `package.json` con scripts `build`, `typecheck`, `lint`, `test` (aunque alguno sea trivial) para que `pnpm check` funcione.

## 2. Interfaces entre paquetes

### 2.1 `@parkgt/pricing`
```ts
import type { MoneyLine, RateRuleParams, VehicleType } from '@parkgt/shared';

export interface PricingRule { id: string; priority: number; vehicleTypes: VehicleType[]; params: RateRuleParams }
export interface PricingPlan {
  graceMinutes: number;        // minutos gratis desde la entrada (solo drive-up/sesiones; en reserva aplica al excedente)
  roundingMinutes: number;     // fracción de cobro (p. ej. 30)
  dailyMaxCentavos: number | null;
  rules: PricingRule[];
}
export interface PricingEvent { id: string; startsAt: Date; endsAt: Date; priceCentavos: number }
export interface FeePolicy { reservationFeeCentavos: number }  // fee visible al conductor; 0 en drive-up

export interface QuoteInput {
  plan: PricingPlan; vehicleType: VehicleType; startsAt: Date; endsAt: Date;
  events?: PricingEvent[]; fee?: FeePolicy;
}
export interface QuoteResult {
  parkingCentavos: number; feeCentavos: number; totalCentavos: number; ivaCentavos: number;
  lines: MoneyLine[]; appliedRuleIds: string[]; eventId: string | null;
}
export function quote(input: QuoteInput): QuoteResult;

/** Cobro de una sesión real (drive-up o reserva con excedente). */
export interface SessionChargeInput {
  plan: PricingPlan; vehicleType: VehicleType; enteredAt: Date; exitedAt: Date;
  reservation?: { startsAt: Date; endsAt: Date; parkingCentavos: number } | null; // si existe, solo se cobra el excedente
  events?: PricingEvent[];
}
export interface SessionChargeResult { amountCentavos: number; overstayCentavos: number; lines: MoneyLine[]; appliedRuleIds: string[] }
export function chargeForSession(input: SessionChargeInput): SessionChargeResult;

/** Regla de agrupación: sesiones < Q20 se agrupan; se cobra al llegar a Q50 o a los 7 días. */
export const CHARGE_GROUP_THRESHOLD_CENTAVOS = 2000;
export const CHARGE_GROUP_FLUSH_CENTAVOS = 5000;
export const CHARGE_GROUP_MAX_AGE_DAYS = 7;
export function shouldGroup(amountCentavos: number): boolean;
export function shouldFlushGroup(group: { totalCentavos: number; openedAt: Date }, now: Date): boolean;
```
Semántica de reglas (todas con IVA incluido, centavos):
- Selección: entre las reglas aplicables al `vehicleType`, `EVENT` gana si el rango intersecta el evento; luego `OVERNIGHT` si el rango completo cae en la ventana nocturna; luego la de mayor `priority`. Con prioridad igual, la más barata para el usuario.
- `HOURLY`: minutos facturables = max(minimumMinutes, redondeo hacia arriba a `roundingMinutes`); precio proporcional por hora.
- `FLAT_WINDOW`: `priceCentavos` hasta `upToMinutes`; después `thenPerHourCentavos` por hora adicional redondeada hacia arriba a `roundingMinutes`; si `thenPerHourCentavos` es null, se repite la ventana (otro bloque).
- `DAILY`: por cada día local (America/Guatemala) o fracción.
- `dailyMaxCentavos`: tope por día local.
- Gracia: en `chargeForSession` sin reserva, si la estadía ≤ `graceMinutes` el monto es 0; con reserva, los primeros `graceMinutes` después de `endsAt` no se cobran.
- `lines`: `parking` ("Parqueo"), `event` ("Tarifa de evento"), `overstay` ("Tiempo adicional"), `reservation_fee` ("Fee de reserva"), `daily_cap` (negativo, "Tope diario"). `ivaCentavos` = `ivaFromInclusive(total)`.

### 2.2 `@parkgt/payments`
```ts
export interface ChargeRequest { idempotencyKey: string; amountCentavos: number; currency: 'GTQ'; paymentMethodToken: string; customerRef?: string; description: string; metadata?: Record<string, string> }
export interface ChargeResult { providerRef: string; status: 'succeeded' | 'pending' | 'failed'; failureCode?: string; failureMessage?: string; raw?: unknown }
export interface RefundRequest { idempotencyKey: string; providerRef: string; amountCentavos: number; reason: string }
export interface RefundResult { providerRef: string; status: 'succeeded' | 'pending' | 'failed'; raw?: unknown }
export interface BankTransferIntent { reference: string; qrPayload?: string; expiresAt: Date; instructions: string }
export interface WebhookEvent { externalId: string; type: 'payment.succeeded' | 'payment.failed' | 'refund.succeeded' | 'refund.failed' | 'transfer.received' | 'unknown'; providerRef?: string; amountCentavos?: number; raw: unknown }
export interface PaymentProvider {
  readonly name: string;
  charge(req: ChargeRequest): Promise<ChargeResult>;
  refund(req: RefundRequest): Promise<RefundResult>;
  createBankTransferIntent(req: { idempotencyKey: string; amountCentavos: number; reference: string; expiresAt: Date }): Promise<BankTransferIntent>;
  verifyAndParseWebhook(headers: Record<string, string | string[] | undefined>, rawBody: string | Buffer): Promise<WebhookEvent>; // lanza WebhookSignatureError si la firma es inválida
}
export class MockPaymentProvider implements PaymentProvider { /* tokens "tok_ok" éxito, "tok_fail" falla, "tok_pending" pendiente; webhooks firmados con HMAC-SHA256 y secreto configurable */ }
export class RecurrentePaymentProvider implements PaymentProvider { /* esqueleto con fetch; endpoints según docs públicas de Recurrente, marcados TODO verificar */ }
export function createPaymentProvider(env: NodeJS.ProcessEnv): PaymentProvider; // según PAYMENT_PROVIDER
```

### 2.3 `@parkgt/invoicing`
```ts
export interface DteIssuer { nit: string; legalName: string; tradeName?: string; address: string; credentials: Record<string, string> }
export interface DteItem { description: string; quantity: number; unitPriceCentavos: number; totalCentavos: number; ivaCentavos: number }
export interface DteInput { idempotencyKey: string; issuer: DteIssuer; receiverNit: string /* 'CF' permitido */; receiverName?: string; items: DteItem[]; totalCentavos: number; ivaCentavos: number; currency: 'GTQ'; issuedAt: Date }
export interface DteResult { uuid: string; serie: string; numero: string; xml: string; pdfUrl?: string; certifiedAt: Date }
export interface InvoiceProvider {
  readonly name: string;
  issue(input: DteInput): Promise<DteResult>;
  void(input: { uuid: string; reason: string; issuer: DteIssuer }): Promise<void>;
}
export class MockInvoiceProvider implements InvoiceProvider {}
export class InfileInvoiceProvider implements InvoiceProvider { /* esqueleto */ }
export function buildParkingDteItems(args: { parkingCentavos: number; feeCentavos: number; description: string }): DteItem[];
export function createInvoiceProvider(env: NodeJS.ProcessEnv): InvoiceProvider;
```
La plataforma emite dos facturas por pago cuando aplica: la del operador (parqueo) con las credenciales del operador y la de la plataforma (fee de reserva) con `PLATFORM_NIT`. Si el operador no tiene FEL habilitada, su factura queda `PENDING` y se reporta.

### 2.4 Notificaciones (dentro de `apps/api`, módulo `notifications`)
```ts
export type NotificationTemplate = 'reservation_confirmed' | 'reservation_reminder' | 'reservation_expiring' | 'receipt' | 'refund_no_space' | 'otp';
export interface Notifier { send(input: { channel: NotificationChannel; to: string; template: NotificationTemplate; params: Record<string, string> }): Promise<{ providerRef?: string }> }
```
`ConsoleNotifier` imprime; `WhatsAppCloudNotifier` usa la Graph API (esqueleto con plantillas nombradas igual que el template).

## 3. Módulos de la API (`apps/api/src/modules/*`)
NestJS 11, Prisma 6, Node 22, Jest. Monolito modular: cada módulo tiene `*.module.ts`, `*.controller.ts`, `*.service.ts`, `dto/` (re-exporta zod de shared mediante un `ZodValidationPipe` común) y `__tests__/`. Los módulos se comunican por servicios inyectados y por eventos de dominio (`@nestjs/event-emitter`): `reservation.confirmed`, `reservation.cancelled`, `reservation.no_space`, `session.closed`, `payment.succeeded`, `payment.failed`, `refund.succeeded`, `invoice.issued`.

| Módulo | Responsabilidad | Depende de |
|---|---|---|
| `common` | `ZodValidationPipe`, filtro de excepciones → `ApiError`, `PrismaService`, `ConfigService` tipado (zod sobre env), crypto (AES-GCM para campos `*Enc`), `IdempotencyService`, logger | — |
| `auth` | Guard Bearer: `AUTH_MODE=dev` acepta `dev:<userId>:<USER|PLATFORM_ADMIN>` y crea el usuario si no existe; `firebase` verifica ID token; `DeviceAuthGuard` para tokens de garita (`tokenHash`). Decoradores `@CurrentUser()`, `@CurrentDevice()`, `@Roles()`; `OperatorRoleGuard` (OWNER/ADMIN/GUARD sobre `facilityId`/`operatorId` de la ruta) | common |
| `users` | Perfil, vehículos, métodos de pago (guardar token) | auth |
| `operators` | Cuentas de operador, usuarios/roles, credenciales FEL y bancarias cifradas, reporte diario de ventas | auth, common |
| `catalog` | Parqueos (CRUD operador, aprobación admin), búsqueda por radio (bounding box + haversine en SQL, orden por distancia), tarifas (RatePlan/RateRule), eventos; `manualFullSince` | operators |
| `quotes` | `POST /v1/quotes` → `@parkgt/pricing` + disponibilidad (inventory) + `quoteToken` (HMAC con expiración 10 min) | catalog, inventory |
| `inventory` | Buckets de 15 min; `reserve(facilityId, start, end, tx)` con `SELECT … FOR UPDATE`; `release`; capacidad extra por evento; `availability(facilityId, start, end)` | catalog |
| `reservations` | Crear (idempotente), máquina de estados (`canTransition`), cancelar, extender, no-show, expirar (job), pase QR (`PassService` ES256, rotación 60 s), code6 único por parqueo/día, `todaysReservations` para garita | inventory, quotes, payments, notifications |
| `sessions` | Check-in/out por QR/código/placa, drive-up, cierre y cobro (`chargeForSession`), `GateEvent` idempotente, "sin espacio" (reembolso + evento), señal lleno/disponible | reservations, payments, devices |
| `devices` | Alta de dispositivo, enrolamiento con código de 8, token de dispositivo, revocación, sync | operators |
| `payments` | `PaymentService`: cobrar reserva, cobrar sesión / `ChargeGroup`, reembolsos, intents de transferencia; webhooks (`WebhookEvent` idempotente); libro mayor (`LedgerEntry`) en cada movimiento | common |
| `invoicing` | Job: por cada `payment.succeeded`, crear `Invoice` por emisor y emitir con `@parkgt/invoicing` (reintentos exponenciales, máx. 5) | payments, operators |
| `payouts` | Job semanal: agrupar ledger por operador → `Payout`; estado de cuenta JSON/CSV; marcar pagado (admin) | payments |
| `notifications` | `Notifier`, cola (BullMQ si `REDIS_URL`, en memoria si no), plantillas | common |
| `checkout` | Checkout web sin app: `GET /v1/public/facilities/:slug`, `POST /v1/public/checkout` (reserva o pago de sesión por placa + teléfono), `GET /v1/public/reservations/:id?token=` | reservations, sessions, payments |
| `admin` | Soporte: buscar por placa/teléfono, reembolsar, reasignar, aprobar parqueos, métricas | todos |
| `health` | `GET /health`, `GET /ready` (DB) | common |

### 3.1 Esqueleto que debe existir antes de construir módulos en paralelo
- `apps/api/src/main.ts`, `app.module.ts` importando TODOS los módulos de la tabla (cada uno con un `*.module.ts` vacío inicial), `common/*` completo, `auth/*` completo, `health/*` completo, `prisma/` (schema ya existe), `jest.config.ts`, `test/setup.ts` (salta pruebas de DB si no hay `DATABASE_URL`), scripts `prisma:generate`, `prisma:migrate`, `db:seed`, `keys:generate` (par ES256 a base64), `start:dev`.
- `src/common/zod.pipe.ts`: `new ZodValidationPipe(schema)` para `@Body()`/`@Query()`.
- `src/common/errors.ts`: `DomainError(code, message, status)`; códigos estables: `RESERVATION_NOT_AVAILABLE`, `RESERVATION_INVALID_TRANSITION`, `PAYMENT_DECLINED`, `PASS_INVALID`, `PASS_EXPIRED`, `DEVICE_REVOKED`, `FACILITY_NOT_FOUND`, `IDEMPOTENCY_CONFLICT`, `FORBIDDEN_FACILITY`.
- `src/common/clock.ts`: `Clock { now(): Date }` inyectable para pruebas.
- Semilla (`prisma/seed.ts`): 1 operador, 3 parqueos en Z10/Z4 con tarifas realistas (Q12/h con fracción de 30 min; plana Q15 hasta 4 h luego Q10/h; hospital Q16/h), 1 evento, 2 usuarios dev, 1 dispositivo.

## 4. Rutas de la API (`/v1`)
Auth: `U` usuario (Bearer), `O` operador con rol sobre el recurso, `D` dispositivo de garita, `A` admin de plataforma, `P` público.

| Método y ruta | Auth | Body / Query (zod en shared) | Respuesta |
|---|---|---|---|
| `GET /health`, `GET /ready` | P | — | `{status}` |
| `GET /v1/me` · `PATCH /v1/me` | U | `updateUserProfileSchema` | `userProfileSchema` |
| `GET/POST /v1/me/vehicles` · `PATCH/DELETE /v1/me/vehicles/:id` | U | `createVehicleSchema` | `vehicleSchema` |
| `GET/POST /v1/me/payment-methods` · `DELETE /v1/me/payment-methods/:id` | U | `createPaymentMethodSchema` | `paymentMethodSchema` |
| `GET /v1/facilities` | P | `searchFacilitiesQuerySchema` | `facilitySummarySchema[]` (con `distanceMeters`, `quoteTotalCentavos`, `isAvailable` si hay rango) |
| `GET /v1/facilities/:idOrSlug` | P | — | `facilityDetailSchema` |
| `POST /v1/quotes` | P | `quoteRequestSchema` | `quoteSchema` |
| `POST /v1/reservations` | U | `createReservationSchema` | `reservationSchema` (201; 200 si idempotente) |
| `GET /v1/reservations` · `GET /v1/reservations/:id` | U | paginación | `reservationSchema` |
| `GET /v1/reservations/:id/pass` | U | — | `reservationPassSchema` |
| `POST /v1/reservations/:id/extend` · `POST /v1/reservations/:id/cancel` | U | `extendReservationSchema` / `cancelReservationSchema` | `reservationSchema` |
| `GET /v1/me/sessions` · `GET /v1/me/sessions/:id` | U | — | `parkingSessionSchema` |
| `POST /v1/me/sessions/:id/pay` | U | `{paymentMethodId, idempotencyKey}` | `paymentSchema` |
| `GET /v1/me/payments` · `GET /v1/me/invoices/:id` | U | — | `paymentSchema` / `invoiceSchema` |
| `POST /v1/operators` · `GET /v1/operators/:id` · `PATCH /v1/operators/:id` | U → O | `createOperatorAccountSchema` | `operatorAccountSchema` |
| `GET/POST /v1/operators/:id/users` · `DELETE /v1/operators/:id/users/:userId` | O(OWNER/ADMIN) | `inviteOperatorUserSchema` | `operatorUserSchema` |
| `PUT /v1/operators/:id/fel-credentials` · `PUT /v1/operators/:id/bank-account` | O(OWNER) | `{...}` cifrado en servidor | `{ok}` |
| `GET /v1/operators/:id/facilities` · `POST /v1/operators/:id/facilities` | O | `upsertFacilitySchema` | `facilityDetailSchema` |
| `PATCH /v1/facilities/:id` · `POST /v1/facilities/:id/submit` · `POST /v1/facilities/:id/pause` | O | `upsertFacilitySchema` parcial | `facilityDetailSchema` |
| `GET/PUT /v1/facilities/:id/rate-plan` | O | `upsertRatePlanSchema` | `ratePlanSchema` |
| `GET/POST /v1/facilities/:id/events` · `PATCH/DELETE /v1/facilities/:id/events/:eventId` | O | `upsertEventSchema` | `eventSchema` |
| `GET /v1/facilities/:id/reservations?date=` · `GET /v1/facilities/:id/sessions?status=` | O | — | listas |
| `GET /v1/facilities/:id/reports/daily?date=` | O | — | `dailySalesReportSchema` |
| `GET /v1/operators/:id/payouts` · `GET /v1/operators/:id/payouts/:payoutId/statement.csv` | O | — | `payoutSchema[]` / CSV |
| `GET/POST /v1/facilities/:id/devices` · `POST /v1/devices/:id/revoke` | O | `createDeviceSchema` | `deviceSchema` |
| `POST /v1/devices/enroll` | P | `enrollDeviceSchema` | `deviceSessionSchema` |
| `GET /v1/gate/today` | D | — | `todaysReservationsSchema` |
| `POST /v1/gate/scan` | D | `gateScanSchema` | `gateValidationSchema` (valida y, si procede, ejecuta check-in/out) |
| `POST /v1/gate/sessions` | D | `openDriveUpSessionSchema` | `parkingSessionDto` |
| `POST /v1/gate/sessions/:id/close` | D | `closeSessionSchema` | `parkingSessionDto` |
| `POST /v1/gate/no-space` | D | `markNoSpaceSchema` | `{ok, refundedCentavos}` |
| `POST /v1/gate/full` · `POST /v1/gate/available` | D | — | `{ok}` |
| `GET /v1/gate/sessions/open` | D | — | `parkingSessionDto[]` |
| `POST /v1/gate/events/sync` | D | `gateScanSchema[]` (eventos offline) | resultados por `eventId` |
| `GET /v1/public/facilities/:slug` | P | — | `facilityDetailSchema` |
| `POST /v1/public/checkout` | P | `webCheckoutSchema` | `reservationSchema` o `paymentSchema` + `accessToken` |
| `GET /v1/public/reservations/:id?token=` | P | — | `reservationSchema` + `reservationPassSchema` |
| `POST /v1/webhooks/payments/:provider` | P (firma) | raw body | `{received: true}` |
| `GET /v1/admin/search?q=` · `POST /v1/admin/payments/:id/refund` · `POST /v1/admin/facilities/:id/approve` · `GET /v1/admin/metrics` | A | `refundRequestSchema` | — |

Convenciones: errores con cuerpo `ApiError`; paginación por cursor `?cursor&limit`; `Idempotency-Key` también aceptado como header y equivalente al campo del body; todas las fechas ISO UTC; OpenAPI en `/docs` (Swagger) con `nestjs-zod` o decoradores manuales.

## 5. Autenticación y roles
- Usuario: `Authorization: Bearer <firebase-id-token>`; en dev `Bearer dev:<userId>:<platformRole>`. El guard hace upsert del `User` por `firebaseUid` (o por `userId` en dev).
- Dispositivo: `Authorization: Bearer dev-<token>`; se busca por `tokenHash = sha256(token)`; rechaza revocados.
- Roles de operador: `OperatorRoleGuard` resuelve `facilityId` → `operatorId` y exige `OperatorUser.role ∈ roles`. GUARD solo puede usar rutas `/gate` desde dispositivo.
- Admin: `platformRole = PLATFORM_ADMIN`.

## 6. Pase QR y código de respaldo
- Contenido del QR: `PKGT1:<jwt>`; JWT ES256 con `PassClaims` (shared). `nbf = now - 120 s`, `exp = now + 60 s + 120 s`. El servidor regenera en `GET /reservations/:id/pass`; la app lo refresca cada 60 s.
- Garita offline: verifica firma con la clave pública recibida al enrolar y en `/gate/today`; acepta si `nbf ≤ now ≤ exp` con tolerancia `PASS_CLOCK_SKEW_SECONDS` y si `fac` coincide con su parqueo. Luego, si hay red, `POST /gate/scan` decide check-in/out definitivo; si no hay red, encola el evento y lo manda en `/gate/events/sync`.
- `code6`: 6 dígitos aleatorios (crypto), único por `(facilityId, día local)`; la garita lo valida contra la lista de `/gate/today`.
- Placa: la garita puede buscar por placa en la lista del día; coincidencia exacta tras `normalizePlate`.

## 7. Inventario
- `reservableCapacity` del parqueo + `extraReservableCapacity` de eventos activos que cubren el slot.
- Reservar: en transacción, `SELECT … FOR UPDATE` de los buckets del rango (creándolos si faltan con `INSERT … ON CONFLICT DO NOTHING` previo), verificar `reserved < capacity` en todos, incrementar. Liberar al cancelar/expirar/no-space.
- Disponibilidad pública = min(capacity − reserved) sobre el rango, y `manualFullSince == null`.

## 8. Dinero
- Reserva: cobro inmediato al confirmar; `feeCentavos` = `OperatorAccount.reservationFeeCentavos` (en eventos puede ser mayor); comisión = `applyBps(parkingCentavos, commissionBps)`.
- Sesión drive-up con tarjeta tokenizada: si `shouldGroup(amount)`, se agrega al `ChargeGroup` abierto del usuario (uno a la vez) y se cobra al cumplir `shouldFlushGroup`; si falla el cobro, `User.isBlocked = true` hasta regularizar. Si no se agrupa, se cobra de inmediato.
- Ledger por pago exitoso: débito `CUSTOMER_RECEIVABLE`→ crédito `OPERATOR_PAYABLE` (parking − comisión), `PLATFORM_REVENUE` (fee + comisión), `GATEWAY_FEES` (estimado desde config `GATEWAY_FEE_BPS` y `GATEWAY_FEE_FIXED_CENTAVOS`, por defecto 450 y 120), `TAX_IVA` informativo. Reembolsos revierten proporcionalmente.
- Pago en garita (efectivo/QR bancario): `Payment.method` correspondiente, `CASH_AT_FACILITY` en lugar de receivable; se liquida neto de comisión.

## 9. Apps
### 9.1 `apps/web` (Next.js 15, App Router, Tailwind, shadcn/ui, TanStack Query, `@parkgt/api-client`)
Rutas: `/p/[slug]` (ficha pública + checkout sin app: placa, teléfono, pagar sesión o reservar), `/r/[id]?token=` (pase web), `/operador` (login dev, lista de parqueos), `/operador/parqueos/nuevo`, `/operador/parqueos/[id]` (datos, tarifas, eventos, dispositivos, reservas del día, ventas, liquidaciones), `/admin` (búsqueda, aprobaciones, métricas). Textos en español. Login: en dev un selector de usuario que setea el Bearer `dev:`; en producción Firebase Web SDK.

### 9.2 `apps/mobile` (Expo SDK actual, Expo Router, TypeScript, TanStack Query, `react-native-maps`, Zustand)
Pantallas: Inicio/mapa con buscador (Places Autocomplete si hay key; fallback lista), resultados, ficha, selector de horario y vehículo, pago (método guardado; pantalla de "agregar tarjeta" con WebView al formulario de la pasarela — en dev, formulario mock), pase (QR grande, code6, placa, cómo llegar, soporte), mis reservas, extender, recibos, vehículos, métodos de pago, perfil. Auth: Firebase (teléfono/Google/Apple) con modo dev (`EXPO_PUBLIC_AUTH_MODE=dev`).

### 9.3 `apps/garita` (Expo, Expo Router, `expo-camera` para QR, SQLite/`expo-sqlite` o MMKV para cola offline)
Pantallas: enrolar (código de 8), inicio (escanear / buscar / llegan hoy / sesiones abiertas / lleno-disponible), resultado de validación (verde/rojo, grande), drive-up (placa, tipo, foto), cerrar sesión y cobrar (monto, método), cierre de turno, estado de sincronización. Verificación offline de JWT ES256 con `jose` o `@noble/curves`.

## 10. Verificación
Cada paquete debe pasar `pnpm --filter <pkg> build typecheck lint test`. `pnpm check` en la raíz debe quedar en verde antes de un PR. Las pruebas de la API que requieren DB usan `DATABASE_URL` y `prisma migrate deploy` sobre una base `parkgt_test`; se saltan sin la variable.
