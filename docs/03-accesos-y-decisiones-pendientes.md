# Accesos, cuentas y decisiones pendientes

> Lista de lo que necesito del fundador para avanzar, ordenada por cuándo hace falta. Nada de esto bloquea la Fase 0 de validación en campo; sí bloquea el arranque del código (Sprint 1) en los puntos marcados **S1**.

## 1. Decisiones (las toma el fundador)

| # | Decisión | Opciones | Recomendación | Cuándo |
|---|---|---|---|---|
| D1 | Estructura societaria | (a) S.A. en Guatemala sola; (b) S.A. en Guatemala + holding LLC/C-Corp en EE. UU. | (a) para arrancar rápido y afiliar pasarela y FEL; evaluar (b) si se buscará inversión extranjera o Stripe | Fase 0 |
| D2 | Nombre y marca | Corto, pronunciable en español, dominio .com y .gt libres, sin conflicto con Parkeyo/Parkeo/Compass/Vivepass | Hacer shortlist de 5 y verificar en Registro de la Propiedad Intelectual | Fase 0 |
| D3 | Zona y lista de parqueos piloto | Zona 10 + Zona 4 (recomendado) vs. otra "mancha" | Zona 10 + Zona 4 por densidad de oficinas, clínicas y restaurantes | Fase 0 |
| D4 | Modelo de cobro al operador en el piloto | Gratis 6 meses vs. comisión desde el día uno | Gratis 6 meses a cambio de inventario y testimonio | Fase 0 |
| D5 | Pasarela primaria | Recurrente vs. Tilopay vs. VisaNet directo | Recurrente (API y suscripciones) con Tilopay como respaldo; confirmar tarifas por volumen | Fase 0 |
| D6 | Certificador FEL | Infile vs. Digifact vs. Megaprint | Infile o Digifact (ambos con API); pedir cotización | Fase 0 |
| D7 | Stack técnico | Según `02-arquitectura-tecnica.md` | Aprobar o ajustar | Antes de S1 |
| D8 | Contratación | 1 senior + 1 mid vs. 2 mid | 1 senior + 1 mid | Fase 0 |

## 2. Cuentas y servicios que debe crear el fundador (a nombre de la empresa)

| # | Servicio | Para qué | Qué compartir conmigo | Cuándo |
|---|---|---|---|---|
| A1 | **GitHub**: organización para la empresa (o seguir en `sasaca/Parking-App`) y rama `main` | Código, CI/CD | Acceso de escritura; confirmar si creo `main` | **Ya** |
| A2 | **Google Cloud** (proyecto + facturación) con Maps SDK Android/iOS, Places API (New), Geocoding | Mapas y búsqueda | API keys restringidas por app (Android package / iOS bundle) y una de servidor | **S1** |
| A3 | **Firebase** (proyecto, Authentication con teléfono/Google/Apple) | Login | Config `google-services.json` / `GoogleService-Info.plist` y credenciales de admin SDK | **S1** |
| A4 | **Apple Developer Program** (US$99/año) + **App Store Connect** | Publicar iOS, Apple Sign-in, TestFlight | Invitación como desarrollador/App Manager | S1 (tarda 1–4 semanas) |
| A5 | **Google Play Console** (US$25 único) | Publicar Android | Invitación con permisos de release | S1 |
| A6 | **Expo** (cuenta de organización, plan con EAS Build) | Compilaciones y OTA | Invitación a la organización | S1 |
| A7 | **Recurrente** (afiliación requiere S.A., NIT, cuenta bancaria, FEL) **(verificar)** y una pasarela de respaldo | Cobros | API keys de sandbox primero; producción después | S3 |
| A8 | **Infile o Digifact** (contrato de certificación FEL) | Facturas electrónicas | Credenciales de pruebas y producción | S5 |
| A9 | **Meta Business** verificado + **WhatsApp Business Platform** (número dedicado) | Notificaciones y OTP | Token de acceso del sistema, ID del número | S4 (la verificación tarda) |
| A10 | **Twilio** | SMS de respaldo | Credenciales | S4 |
| A11 | **Hosting**: Railway/Render/Fly + Neon/Supabase (Postgres) + Upstash (Redis) + Vercel | Backend, base de datos, portal | Invitaciones a los proyectos | S1 |
| A12 | **Sentry** y **PostHog** | Errores y analítica | Invitaciones | S1 |
| A13 | **Dominio** (.com y .gt) + correo corporativo (Google Workspace) | Marca, correos transaccionales, verificación de Meta/Apple | Acceso DNS | Fase 0 |
| A14 | **Figma** | Diseño | Acceso al archivo | Fase 0 |
| A15 | **Cuenta bancaria empresarial** con banca en línea y ACH | Liquidaciones a operadores | Nada técnico por ahora | Fase 0 |

Regla: nunca pegar llaves en el chat ni en el repo; usar el gestor de secretos del hosting y variables de entorno; yo dejo un `.env.example` con los nombres.

## 3. Trabajo de campo que solo puede hacer el fundador (Fase 0)
1. Verificar Parkeyo con las manos: descargar la app (si existe en tiendas), ver sus parqueos reales, probar una reserva, revisar sus redes. La investigación no pudo acceder a las tiendas de apps.
2. Probar Vivepass y Compass como usuario y anotar la experiencia de alta, costos y fallas.
3. Visitar 15–20 parqueos en Zona 10 y Zona 4 con el guion de entrevista (lo preparo en `docs/` cuando se apruebe este plan): dueño/administrador, sistema actual, tarifas, ocupación por hora, disposición a piloto.
4. Reunión exploratoria con un integrador de barreras (DIPSA o ISS para CAME/Parkare; Systeco para ZKTeco) para entender qué integración es posible.
5. Consulta legal (1–2 horas) sobre: pases prepagados vs. dinero electrónico, responsabilidad por daños en parqueos aliados, términos y condiciones, y la iniciativa de ley de parqueos 2026.

## 4. Qué puedo hacer yo sin accesos adicionales
- Esqueleto del monorepo, modelo de datos, motor de tarifas con tests, API con pasarela y FEL simuladas, apps con mapa en modo desarrollo (con una API key de Maps provisional) y toda la lógica de reservas, redención offline y liquidaciones.
- Guion de entrevistas, plantilla de carta de intención para parqueos piloto y checklist de prueba de campo.
