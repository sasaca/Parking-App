# Guía para agentes y desarrolladores

Plataforma de parqueos para Guatemala (ver `README.md`, `docs/01-plan-de-desarrollo.md`, `docs/02-arquitectura-tecnica.md`). Este archivo define convenciones que todo cambio debe respetar.

## Contratos primero
- `docs/04-contratos.md` es la fuente de verdad de módulos, rutas de la API, interfaces entre paquetes y responsabilidades. Léelo antes de tocar código.
- `apps/api/prisma/schema.prisma` y `packages/shared/src/enums.ts` deben permanecer sincronizados. No agregues campos al esquema sin actualizar ambos y documentarlo en `docs/04-contratos.md`.
- Los DTOs de la API viven en `packages/shared/src/dto/*.ts` (zod). La API valida con esos esquemas; web y apps móviles los consumen. Si necesitas un DTO nuevo, agrégalo al archivo del módulo correspondiente, no crees archivos paralelos.

## Convenciones de código
- TypeScript estricto en todo el monorepo. Identificadores, nombres de archivo y comentarios técnicos en inglés; textos visibles al usuario, mensajes de error de negocio y documentación en español (Guatemala: "parqueo", "garita", "placa", "quetzal").
- Dinero siempre como entero en centavos (`@parkgt/shared` `money.ts`). Precios incluyen IVA; el IVA se desglosa con `ivaFromInclusive`.
- Fechas en ISO 8601 UTC en la API; zona local `America/Guatemala` solo para presentación y reglas horarias (`time.ts`).
- Placas normalizadas con `normalizePlate` antes de guardar o comparar.
- Funciones puras para reglas de negocio (tarifas, máquina de estados, inventario); efectos (DB, HTTP) en servicios NestJS.
- Idempotencia obligatoria en pagos, webhooks y eventos de garita (`idempotencyKey` / `eventId`).
- Nunca registrar en logs PAN, tokens, claves ni teléfonos completos.

## Herramientas
- pnpm 10 (workspaces, `node-linker=hoisted`), Turborepo, Node 22.
- `pnpm check` = build + typecheck + lint + test en todo el repo. Debe pasar antes de cada commit.
- Paquetes (`packages/*`): tsup + vitest. API: NestJS + Prisma + Jest. Web: Next.js + vitest. Móvil: Expo + jest-expo.
- Postgres local: `pnpm db:up` (Docker) o un servidor local con `DATABASE_URL`. Las pruebas que requieren base de datos deben saltarse si `DATABASE_URL` no está definida.
- Secretos solo en `.env` (ignorado). Actualiza `.env.example` cuando agregues una variable.

## Git
- Commits en español, imperativo, con cuerpo que explique el porqué. No incluir identificadores de modelos de IA en commits ni código.
- No rebases ni force-push sobre ramas ajenas. La rama de integración es `main`; el trabajo va por PR.

## Pruebas
- Motor de tarifas y máquina de estados: cobertura alta (≥ 95 %) con casos límite (gracia, redondeo, cruce de medianoche, eventos, máximos diarios).
- Cada módulo de la API expone pruebas unitarias de servicio con repositorio en memoria o Prisma mockeado, y pruebas de integración opcionales contra Postgres real.
- Antes de marcar algo como terminado, ejecuta los comandos del paquete afectado y reporta la salida real.
