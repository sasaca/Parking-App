# Parking App Guatemala

Plataforma de parqueos para Guatemala: el conductor **encuentra, reserva con lugar garantizado y paga** desde el celular (estilo SpotHero), y el operador recibe un **sistema de cobro y control de garita** sin comprar hardware.

## Estado

Fase 0: investigación de mercado y plan de desarrollo terminados (octubre 2026). Todavía no hay código.

## Documentos

| Documento | Qué contiene |
|---|---|
| [`reports/Investigación mercado parqueos Guatemala.md`](reports/Investigación%20mercado%20parqueos%20Guatemala.md) | Informe consolidado (~10,700 palabras): competidores en Guatemala, quién controla los parqueos y con quién aliarse, benchmark de apps globales y latinoamericanas con matriz de features, contexto local (pagos, regulación, hardware, demanda, costos) e implicaciones estratégicas. |
| [`docs/01-plan-de-desarrollo.md`](docs/01-plan-de-desarrollo.md) | Plan de desarrollo: visión, cuña de entrada, segmentos, estrategia de oferta y alianzas, matriz de features por fase, economía unitaria, roadmap de 12 meses, equipo, presupuesto, go-to-market, KPIs y riesgos. |
| [`docs/02-arquitectura-tecnica.md`](docs/02-arquitectura-tecnica.md) | Stack (TypeScript: Expo RN, Next.js, NestJS, PostgreSQL+PostGIS), componentes, modelo de datos, flujos de reserva/redención/liquidación, niveles de integración con barreras, seguridad, monorepo y plan de sprints del MVP. |
| [`docs/03-accesos-y-decisiones-pendientes.md`](docs/03-accesos-y-decisiones-pendientes.md) | Decisiones que debe tomar el fundador, cuentas y servicios por crear, y trabajo de campo que no se puede delegar. |
| `research_notes/` | Notas de investigación por tema con fuentes (competidores, operadores, apps globales, apps de Latinoamérica, contexto local). |

## Hallazgos en una línea

- **No hay competidor directo.** Parkeyo es un marketplace P2P embrionario (~100 usuarios autodeclarados). Los incumbentes reales (Compass de BAC, Vivepass, Spectrum ID) son sistemas de pago y acceso cautivos de un banco o un desarrollador; nadie ofrece reserva garantizada multi-operador.
- **La oferta está concentrada** en cuatro desarrolladores de malls (Spectrum, Pradera/CMI, Metroproyectos, Cayalá). Primer anillo de alianzas: Metroproyectos (sin capa digital) y Grupo Cayalá (eventos).
- **El marketplace puro no escaló en Latinoamérica.** Ganaron los modelos operador-first, los contratos municipales y los que siempre tuvieron un camino de pago sin tarjeta.
- **El ticket de Q10–Q15 no soporta una comisión** (la pasarela cobra 4.5 % + Q1.20). El modelo se apoya en un fee de reserva visible, comisión solo en segmentos premium (eventos, hospitales, aeropuerto, pases) y SaaS al operador.

> Advertencia: el entorno de investigación no pudo leer la mayoría de las fuentes primarias; las cifras provienen de extractos de buscador y deben verificarse antes de usarse en un pitch o negociación. Cada dato lleva su URL.
