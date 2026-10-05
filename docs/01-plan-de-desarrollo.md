# Plan de desarrollo — App de parqueos para Guatemala

> Versión 0.1 · octubre 2026 · Documento vivo. Las cifras de mercado provienen del informe `reports/Investigación mercado parqueos Guatemala.md` y sus notas; la mayoría vienen de extractos de buscador (el entorno de investigación no pudo leer las fuentes primarias), así que las marcadas con **(verificar)** deben confirmarse antes de usarse en un pitch o en una negociación.

## 0. Resumen ejecutivo

**Qué vamos a construir.** Una plataforma de parqueos para Guatemala con dos caras: (a) una app para conductores que permite **encontrar, reservar con lugar garantizado y pagar** parqueo desde el celular, estilo SpotHero; y (b) un **"sistema operativo" gratuito o muy barato para el parqueo** (app de garita para el guardia + portal web para el dueño) que digitaliza parqueos que hoy funcionan con ticket de papel y efectivo.

**Por qué las dos caras y no solo la app de consumidor.** La investigación de Latinoamérica es contundente: ningún marketplace puro de parqueo escaló en la región. Los que ganaron fueron "operator-first" (Estapar/Zul+ en Brasil, Apparka en Perú, City Parking en Colombia), contratos municipales (Blinkay, Kigo, SimplePark) o B2B de accesos/LPR que luego sumó app (Appark, Kigo). Parkeyo, el competidor local, intenta justo el modelo que no funcionó (P2P puro) y tiene ~100 usuarios autodeclarados **(verificar)**. Nosotros resolvemos el problema del huevo y la gallina dándole al operador una herramienta que le sirve desde el día uno aunque todavía no haya conductores en la app; eso nos da inventario real, disponibilidad en tiempo real y una relación comercial directa.

**Cuál es el hueco en Guatemala.** Los incumbentes reales no son apps de reserva sino sistemas de pago/acceso **cautivos**: Compass (BAC, sticker RFID prepagado, 250 mil+ usuarios y 125+ parqueos y peajes **(verificar)**), Vivepass (app + tag con membresía mensual, ~40 establecimientos, calificación 3.5/5 y quejas de soporte **(verificar)**) y Spectrum App/ID (solo en malls de Spectrum; la única "reserva" existente está en Miraflores). Nadie ofrece un **agregador neutral, multi-operador, con reserva garantizada y disponibilidad en tiempo real**, y segmentos completos están desatendidos: parqueos de superficie de zonas 1, 4, 9 y 10, hospitales, torres de oficinas, Antigua, eventos y aeropuerto.

**Cómo ganamos dinero.** Tres fuentes, en este orden de importancia durante el primer año: (1) comisión sobre reservas y pases mensuales vendidos en la app (objetivo 15–20 % del GMV), (2) suscripción SaaS del operador por parqueo digitalizado (Q300–Q800/mes según tamaño, con un plan gratuito para parqueos pequeños que nos dan inventario), y (3) acuerdos B2B2C con bancos y empresas (parqueo como beneficio de tarjeta o de empleados; los bancos ya pagan por parqueo exclusivo en Oakland y Cayalá **(verificar)**).

**Cuándo.** Fase 0 de validación y alianzas (6 semanas), MVP construido en 12 semanas, beta cerrada en Zona 10 y Zona 4 con 10–20 parqueos al mes 5, lanzamiento público al mes 6, y pases mensuales, eventos y aeropuerto entre los meses 6 y 9. Equipo núcleo: 2 desarrolladores full-stack, 1 diseñador a medio tiempo, 1 persona de alianzas/operaciones y el fundador como product owner.

---

## 1. Visión, posicionamiento y principios

### 1.1 Visión
"Nunca más dar vueltas buscando parqueo en Guatemala." Ser la capa digital neutral sobre la que corre el parqueo del país: para el conductor, un solo lugar donde encontrar, reservar y pagar; para el operador, la forma más fácil de cobrar sin efectivo, sin tickets perdidos y con datos.

### 1.2 Posicionamiento
- **Para el conductor:** "Reservá tu parqueo antes de salir, llegá y entrá con un QR o con tu placa. Lugar garantizado, precio claro, sin efectivo."
- **Para el operador:** "Digitalizá tu parqueo en una tarde, sin comprar barreras. Cobro con tarjeta y QR, facturación FEL automática, control de guardias y reporte diario. Y además te llevamos clientes."
- **Diferenciación frente a Compass/Vivepass/Spectrum:** neutral (cualquier banco, cualquier operador), sin sticker ni membresía obligatoria, con reserva garantizada y disponibilidad real; frente a Parkeyo: inventario comercial real y operación profesional, no espacios de particulares.

### 1.3 Principios de producto
1. **Android-first, iOS día uno.** 72 % Android / 28 % iOS en Guatemala (StatCounter nov-2025 **(verificar)**), pero el segmento de Zona 10 y 14 es intensivo en iPhone.
2. **Hardware-light.** Cada parqueo debe poder operar con un teléfono en la garita. Las barreras, LPR e integraciones con sistemas existentes vienen después y por capas (ver `02-arquitectura-tecnica.md`).
3. **Nunca fallar en la barrera.** La investigación regional muestra que la confianza se pierde cuando la app no abre el paso. Redención offline-tolerante, código de respaldo de 6 dígitos, teléfono de soporte visible.
4. **Siempre un camino sin tarjeta.** Solo ~38 % de adultos bancarizados y ~12 % usa tarjetas **(verificar)**: pago en garita con QR bancario (Cuik/Zigi/YoLo), efectivo registrado por el guardia, y transferencia ACH para pases mensuales.
5. **WhatsApp como canal primario.** 82 % de internautas usan WhatsApp; un mensaje por WhatsApp Business API cuesta ~11 veces menos que un SMS **(verificar)**.
6. **Facturar bien desde el día uno.** FEL obligatoria; el recibo con factura electrónica es un diferenciador real frente al ticket de papel.

---

## 2. Segmentos y propuestas de valor

| Segmento | Dolor hoy | Qué le damos | Prioridad |
|---|---|---|---|
| Conductor urbano frecuente (Z4, Z9, Z10, Z14, Z15; oficinas, clínicas, restaurantes) | Dar vueltas, cobros "sorpresa" (Q50 reducibles a Q10 con consumo), efectivo, tickets perdidos | Reserva garantizada, precio claro, pago con tarjeta/QR, recibo FEL | **MVP** |
| Trabajador de oficina / residente sin parqueo | Mensualidad informal, sin recibo, sin flexibilidad | Pases mensuales digitales, cambio de parqueo, factura | Fase 2 |
| Asistente a eventos (Cayalá, estadios, conciertos, ferias) | Caos, sobreprecio, inseguridad | Reserva anticipada por evento, mapa de acceso | Fase 2 |
| Viajero (La Aurora) | Precio opaco, situación legal del operador inestable **(verificar)** | Reserva por días, shuttle/valet de terceros | Fase 2–3 |
| Turista en Antigua / Xela | Marbete municipal confuso, parqueos privados dispersos | Buscador + pago por día | Fase 3 |
| **Operador pequeño/mediano** (superficie, torre de oficinas, hospital, iglesia, colegio con parqueo ocioso) | Efectivo y fuga, guardias sin control, sin datos, sin FEL | App de garita + portal, cobro digital, facturación, clientes nuevos | **MVP (lado oferta)** |
| **Grupo grande** (Spectrum, Pradera/CMI, Metroproyectos, Cayalá) | Ya tienen sistema; quieren ocupación en horas valle y datos | Canal de demanda, reserva de eventos, pases, integración con su PARCS | Fase 3 (alianza ancla desde Fase 0) |
| Bancos / empleadores | Pagan parqueo exclusivo como beneficio **(verificar)** | Beneficio administrado por app, reporte, facturación consolidada | Fase 2 |

---

## 3. Estrategia de oferta (el lado difícil)

### 3.1 Secuencia de adquisición de parqueos
1. **Semanas 0–6 (Fase 0):** visitar 40–60 parqueos de superficie y torres en Zona 10 (Zona Viva, Plaza Fontabella, alrededores de hospitales Herrera Llerandi y Centro Médico), Zona 4 (4 Grados Norte, Campus Tec, Vivo Z4), Zona 9/13 (Avenida Reforma, aeropuerto) y Zona 1 (Centro Histórico). Objetivo: **15 cartas de intención** y 10 parqueos piloto que acepten operar con nuestra app de garita a cambio de SaaS gratis durante 6 meses.
2. **Mes 5–6 (beta):** 10–20 parqueos vivos, 1,000–2,000 espacios. Densidad antes que cobertura: que en Zona 10 y Zona 4 siempre haya una opción a menos de 300 m.
3. **Mes 6–9:** hospitales privados, universidades (UFM, Landívar, UVG, Galileo), hoteles con parqueo ocioso de día, iglesias y colegios para eventos. Primer acuerdo con un grupo ancla (ver 3.2).
4. **Mes 9–12:** Antigua Guatemala (parqueos privados; coordinar con el modelo municipal MarbEx), Xela, Carretera a El Salvador. Integración con el PARCS del grupo ancla.

### 3.2 Alianzas con "big players" (priorizadas)
| Grupo | Por qué | Cómo entrar | Prioridad |
|---|---|---|---|
| **Metroproyectos** (14 malls: Metronorte, Metrosur, Metroplaza, Interplaza Xela y Escuintla, etc.) | Es el grupo grande **sin evidencia de pago digital** **(verificar)**; cubre interior del país | Proponer piloto de pago digital + reserva de eventos en 1–2 malls; nosotros ponemos el software | **Alta** (ancla candidata) |
| **Grupo Cayalá** (3,600+ espacios; Q15 hasta 4 h, Q50 después **(verificar)**) | Alto tráfico de eventos y restaurantes; ya experimenta con beneficios bancarios | Reserva para eventos y restaurantes; pases para colaboradores de Cayalá | **Alta** |
| **Multi-Proyectos / Pradera (CMI)** (13 malls; Pradera Concepción 1,786 espacios) | Escala nacional; CMI tiene apetito por innovación | Piloto en Pradera Concepción o Vistares; canal de demanda y datos | Media-alta |
| **Spectrum / Pantaleón** (Oakland, Miraflores 3,191 espacios, Portales, Naranjo) | Ya tiene Spectrum ID y "Parqueo Reservado" en Miraflores; competidor-socio | Entrar como canal de demanda para eventos y horas valle; no competir en su pago interno | Media (más tarde) |
| **Municipalidad de Guatemala / EMETRA** (7 parqueos ~600 espacios; 700 plazas en vía; plan de 13 mil con app **(verificar)**) | Contrato municipal fue la vía de escala en varios países | Monitorear licitación de parquímetros; ofrecer app para parqueos municipales de Z1 | Media (oportunista) |
| **La Aurora (parqueo del aeropuerto)** | Alto ticket (hasta ~Q100/día **(verificar)**), pero operador en disputa legal | Esperar a que se resuelva la administración; mientras, aliarse con parqueos privados cercanos en Z13 | Baja ahora, alta después |
| **Bancos (Bi, BAC, G&T, Banrural, Promerica, Bantrab)** | Ya subsidian parqueo como beneficio; dueños de Zigi/YoLo/Compass | Paquete "parqueo como beneficio de tarjeta" administrado por nuestra app; integración de pago con QR Cuik | Media (Fase 2) |
| **Integradores de barreras** (DIPSA e ISS para CAME/Parkare, Systeco para ZKTeco, Inalarm, Cloud Parking) | Son quienes tocan el hardware de los malls | Acuerdo de integración y referidos: ellos instalan, nosotros somos el software de reserva/pago | Media (Fase 2–3) |

### 3.3 Oferta comercial al operador
- **Plan Gratis:** app de garita, cobro con tarjeta/QR (comisión de pasarela + 5 % para nosotros), reporte diario, FEL. Para parqueos de hasta 60 espacios. A cambio: inventario reservable en la app.
- **Plan Pro (Q300–Q800/mes):** varios guardias, pases mensuales, tarifas por horario, validaciones de comercios, cierre de caja, exportación contable, LPR opcional.
- **Plan Enterprise (grupos):** integración con PARCS existente, API, reporte consolidado, SLA.
- **Pagos al operador:** liquidación semanal por transferencia ACH, con estado de cuenta descargable; retención de comisión en origen.

---

## 4. Alcance del producto por fases

### 4.1 Matriz de features
Leyenda: ✅ MVP (mes 5) · 🔜 Fase 2 (meses 6–9) · 🔭 Fase 3 (meses 9–12) · ⏳ Fase 4 (año 2) · — no planificado.

| Feature | Conductor | Garita (operador) | Portal operador | Fase |
|---|---|---|---|---|
| Registro con teléfono (OTP por WhatsApp/SMS), Google y Apple Sign-in | ✅ | ✅ | ✅ | ✅ |
| Buscar por destino / mapa / "cerca de mí", filtros (techado, 24 h, motos) | ✅ | | | ✅ |
| Ficha del parqueo: fotos, cómo llegar y cómo entrar, horarios, tarifas, reglas | ✅ | | ✅ edición | ✅ |
| Reserva con lugar garantizado por rango de horas, con cancelación gratis hasta la hora de inicio | ✅ | | ✅ cupos | ✅ |
| Pago con tarjeta guardada (tokenización), recibo y **factura FEL** automática | ✅ | | | ✅ |
| Redención: **QR dinámico** + código de 6 dígitos de respaldo + placa | ✅ | ✅ escaneo | | ✅ |
| Modo garita offline-tolerante (validación local con sincronización) | | ✅ | | ✅ |
| Drive-up (sin reserva): el guardia abre sesión por placa/QR y cobra al salir | ✅ pagar | ✅ | | ✅ |
| Extender tiempo desde la app y aviso antes de vencer | ✅ | | | ✅ |
| Pago en garita con QR bancario / efectivo registrado (camino sin tarjeta) | ✅ | ✅ | | ✅ |
| Notificaciones por WhatsApp y push (confirmación, recordatorio, recibo) | ✅ | | | ✅ |
| Soporte: chat por WhatsApp y teléfono visible en el pase | ✅ | ✅ | | ✅ |
| Cierre de caja, reporte diario, liquidación semanal | | ✅ | ✅ | ✅ |
| Multi-vehículo y favoritos | ✅ | | | ✅ |
| Pases mensuales / nocturnos / fin de semana, renovables | ✅ | ✅ | ✅ | 🔜 |
| Eventos: inventario y precio por evento, mapa de acceso | ✅ | ✅ | ✅ | 🔜 |
| Aeropuerto: reserva por días | ✅ | ✅ | ✅ | 🔜 |
| Apple Pay / Google Pay | ✅ | | | 🔜 |
| Promociones, códigos, referidos, validación de comercios | ✅ | ✅ | ✅ | 🔜 |
| Cuentas empresa / beneficio bancario, facturación consolidada | ✅ | | ✅ | 🔜 |
| LPR con cámara Hikvision: entrada/salida sin ticket | ✅ | ✅ | ✅ | 🔜 piloto / 🔭 escala |
| Tarifas por horario y ocupación (reglas), precios dinámicos | | | ✅ | 🔭 |
| Integración con PARCS (CAME/Parkare, ZKTeco) vía integradores | | ✅ | ✅ | 🔭 |
| API pública / distribución en Waze y Google Maps | | | ✅ | 🔭 |
| Antigua, Xela, interior | ✅ | ✅ | ✅ | 🔭 |
| Predicción de disponibilidad, calles (parquímetros municipales) | ✅ | | | ⏳ |
| White-label para grupos, expansión a El Salvador y Honduras | | | ✅ | ⏳ |
| Valet on-demand, EV charging | — | — | — | — |

### 4.2 Qué NO hace el MVP (deliberadamente)
- No custodia saldo de usuarios (no hay "billetera" con dinero general). Hay cobro por sesión con tarjeta guardada y, después, pases prepagados para un servicio concreto. Motivo: no existe ley de dinero electrónico vigente y el anteproyecto exigiría una S.A. de objeto único autorizada por la Junta Monetaria **(verificar con abogado)**.
- No integra barreras ni LPR. Todo corre con el teléfono del guardia.
- No cubre vía pública ni parquímetros.
- No tiene P2P de espacios de particulares (eso es Parkeyo; densidad insuficiente).

### 4.3 Historias de usuario críticas del MVP (criterios de aceptación resumidos)
1. **Reservar en menos de 60 segundos.** Desde abrir la app hasta ver el QR: ≤ 4 pantallas, tarjeta guardada, precio total con IVA visible antes de pagar.
2. **Entrar sin fricción.** El guardia escanea el QR y ve "✅ Reserva válida · Placa P123ABC · hasta 18:00" en menos de 2 s; si no hay señal, valida con el código de 6 dígitos y sincroniza después.
3. **Salir y cobrar lo justo.** Si se excede el tiempo, el sistema calcula el excedente con la tarifa publicada, cobra a la tarjeta guardada y envía recibo + FEL por WhatsApp.
4. **Garantía.** Si el conductor llega y no hay espacio, el guardia marca "sin espacio", la app reembolsa automáticamente y ofrece el parqueo más cercano; el evento queda registrado contra el operador.
5. **Operador ve su dinero.** Portal con ventas del día por guardia, comisiones, liquidación semanal y descarga de facturas.

---

## 5. Modelo de negocio y economía unitaria

### 5.1 Precios de referencia en Guatemala **(verificar)**
Malls Q5–Q15/h o tarifas planas Q10–Q20 (Cayalá Q15 hasta 4 h; Miraflores hasta Q50); Zona 4 ~Q12/h; Zona 1 Q10–Q15/h; hospitales ~Q16/h; aeropuerto Q20/4 h + Q10/h, máximo ~Q100/día; vía pública municipal Q3/30 min; Antigua Q10/día.

### 5.2 Costos de pasarela **(verificar tarifas vigentes)**
Recurrente 4.5 % + Q1.20 + IVA; Tilopay 4.25 % + US$0.35; VisaNet/Cybersource ~3.5 %; BAC Compra Click 3.5–5 % + mensualidad; transferencia/ACH vía Recurrente 1 % (máx. Q20).

### 5.3 Economía por transacción (ilustrativa)
| Producto | Ticket | Costo pasarela | Nuestra comisión | Margen neto por transacción |
|---|---|---|---|---|
| Sesión suelta | Q15 | ~Q1.90 (12.5 %) | 20 % = Q3.00 | **~Q1.10** |
| Sesión suelta | Q30 | ~Q2.55 (8.5 %) | 20 % = Q6.00 | ~Q3.45 |
| Pase mensual | Q450 | ~Q21.50 (4.8 %) | 15 % = Q67.50 | ~Q46 |
| Reserva de evento | Q60 | ~Q3.90 (6.5 %) | 20 % = Q12.00 | ~Q8.10 |
| SaaS Pro (por parqueo) | Q500/mes | ~Q6 (ACH) | 100 % | ~Q494 |

**Conclusión:** la sesión suelta de Q15 apenas cubre costos; el negocio se sostiene con pases mensuales, eventos, tickets altos (aeropuerto, hospitales) y SaaS. Por eso el MVP debe estar diseñado para vender pases desde la Fase 2 y para que el operador pague por valor operativo, no solo por demanda. Optimizaciones a evaluar: cobro agregado semanal de sesiones pequeñas con tarjeta guardada (reduce el fijo de Q1.20 por transacción), negociar tarifa por volumen con la pasarela, y pago con QR Cuik/ACH que no tiene fijo.

### 5.4 Metas financieras orientativas (12 meses)
- Mes 6: 15 parqueos, 1,500 espacios, 1,200 reservas/mes, GMV ~Q30 mil/mes.
- Mes 9: 35 parqueos, 300 pases mensuales activos, GMV ~Q180 mil/mes.
- Mes 12: 60 parqueos, 800 pases, 2 grupos ancla en piloto, GMV ~Q450 mil/mes, ingreso ~Q90–110 mil/mes (comisión + SaaS). Estas metas son hipótesis a calibrar con la beta.

---

## 6. Roadmap y cronograma

| Fase | Semanas | Entregables | Criterio de salida |
|---|---|---|---|
| **0. Validación y alianzas** | 1–6 | 20 entrevistas a operadores y 50 a conductores; 15 cartas de intención; S.A. constituida; cuentas (Recurrente, FEL, Google Maps, Apple/Google developer, WhatsApp API); marca y prototipo Figma probado con 10 usuarios; backlog priorizado | ≥ 10 parqueos piloto confirmados en Z10/Z4 |
| **1. MVP** | 7–18 | Backend, app conductor (Android + iOS), modo garita, portal operador mínimo, FEL, WhatsApp, panel admin, analítica básica | Demo end-to-end real en 3 parqueos con dinero real |
| **2. Beta cerrada** | 19–22 | 10–20 parqueos vivos; 300 usuarios invitados (oficinas de Z10/Z4); soporte 7 días; corrección de fallas en garita | Tasa de fallo en garita < 2 %; NPS operador ≥ 40; repetición a 30 días ≥ 35 % |
| **3. Lanzamiento público** | 23–26 | Tiendas públicas, campaña digital geolocalizada, alianzas con 3 empresas de Z10 | 1,000 reservas/mes |
| **4. Fase 2** | 27–40 | Pases mensuales, eventos, aeropuerto (parqueos privados Z13), Apple/Google Pay, promociones, cuentas empresa, piloto LPR en 2 parqueos | 300 pases activos; primer contrato B2B2C |
| **5. Fase 3** | 41–52 | Integración PARCS con grupo ancla, API, Waze/Google, Antigua y Xela, tarifas por reglas | Grupo ancla en producción; 60 parqueos |
| **6. Fase 4** | año 2 | LPR a escala, precios dinámicos, white-label, El Salvador/Honduras | Decidir con datos |

Dependencias críticas: afiliación con la pasarela (hasta 15 días hábiles **(verificar)**), aprobación de cuentas Apple y Google (2–4 semanas), certificador FEL (1–2 semanas), WhatsApp Business API (verificación de empresa de Meta, 1–3 semanas). Todas se arrancan en la semana 1 de la Fase 0.

---

## 7. Equipo, costos y herramientas

### 7.1 Equipo núcleo (año 1)
| Rol | Dedicación | Costo mensual estimado **(verificar)** |
|---|---|---|
| Fundador / product owner / ventas | 100 % | — |
| Desarrollador full-stack senior (TypeScript, móvil + backend), líder técnico | 100 % | Q20–30 mil |
| Desarrollador full-stack mid | 100 % | Q11–14 mil |
| Diseñador UX/UI | 50 % | Q5–8 mil |
| Alianzas y operaciones (visita parqueos, capacita guardias, soporte) | 100 % | Q8–12 mil |
| Soporte al cliente (desde la beta) | 50 % → 100 % | Q4–6 mil |
| Contador/legal externo | por demanda | Q3–5 mil |
| **Total nómina** | | **~Q50–75 mil/mes** |

Referencias de mercado: Developer Q11.6 mil/mes, ingeniero de software Q11.3 mil, sénior Q12.8 mil (Computrabajo 2026); rango Q11.8–41 mil (Tusalario) **(verificar)**.

### 7.2 Herramientas y servicios (estimado mensual en producción temprana)
Hosting PaaS + Postgres gestionado US$150–400; Google Maps Platform dentro del tope gratuito al inicio, luego US$100–300; WhatsApp API US$50–200; Sentry/monitoreo US$30–80; Expo EAS US$100; dominios, correo, Figma, GitHub US$100; FEL certificador Q200–600; **total ~US$600–1,300/mes**.

### 7.3 Presupuesto año 1 (orden de magnitud)
Nómina Q600–900 mil + herramientas ~Q60–120 mil + legal/constitución Q15–25 mil + hardware piloto LPR (2 cámaras Hikvision ~Q7–8 mil c/u + instalación) Q25–40 mil + marketing de lanzamiento Q60–120 mil ≈ **Q760 mil – Q1.2 millones (US$100–155 mil)**. Fuentes de capital locales a explorar: Caricaco (US$50 mil), Side Door (US$100 mil), Pomona Impact, Multiverse/INhatcher, Volcano Innovation Summit **(verificar)**.

---

## 8. Go-to-market

1. **Densidad geográfica:** lanzar solo en Zona 10 y Zona 4 hasta tener ≥ 15 parqueos a menos de 300 m entre sí. Expandir por "manchas" (Z9/Reforma, Z14/Z15, Carretera a El Salvador).
2. **Canales de adquisición del conductor:** (a) el propio parqueo: rótulos con QR "Reservá y pagá aquí" en cada entrada, (b) empresas de Z10/Z4 (beneficio para empleados), (c) restaurantes y clínicas (validación de parqueo a través de la app), (d) anuncios geolocalizados en Instagram/TikTok/Waze, (e) referidos con crédito.
3. **Canales del operador:** visita en persona, integradores de barreras como referidores, cámaras de comercio y asociaciones de vecinos.
4. **Marca:** nombre corto, pronunciable en español, dominio .com y .gt disponibles, sin conflicto con "Parkeyo", "Parkeo", "Compass" ni "Vivepass".
5. **Relaciones públicas:** la discusión pública sobre tarifas abusivas y la iniciativa de ley de parqueos 2026 es una oportunidad para posicionarnos como "precio claro y recibo".

---

## 9. KPIs

| Área | KPI | Meta beta → mes 12 |
|---|---|---|
| Oferta | Parqueos vivos / espacios reservables | 15 / 1,500 → 60 / 6,000 |
| Demanda | Reservas por mes; usuarios activos mensuales | 1,200 → 8,000; 800 → 6,000 |
| Calidad | Tasa de fallo en garita (no pudo entrar) | < 2 % |
| Calidad | Tiempo de reserva (abrir app → QR) | < 60 s mediana |
| Retención | Repetición a 30 días | ≥ 35 % → ≥ 50 % |
| Monetización | GMV; take rate efectivo; pases activos | Q30 mil → Q450 mil; 15–20 %; 0 → 800 |
| Operador | NPS; churn de parqueos | ≥ 40; < 3 %/mes |
| Economía | CAC por conductor; LTV/CAC | < Q25; > 3 |
| Confianza | Reembolsos por "sin espacio" | < 1 % de reservas |

---

## 10. Riesgos y mitigaciones

| Riesgo | Probabilidad | Impacto | Mitigación |
|---|---|---|---|
| **Iniciativa de ley de parqueos 2026** (1.ª hora gratis, tope Q5/h y Q30/día, responsabilidad civil directa, seguro obligatorio) **(verificar estado)** | Media | Alto en GMV de sesiones sueltas | Pesar el modelo hacia SaaS, pases y eventos; la presión regulatoria aumenta la necesidad de eficiencia del operador, que es lo que vendemos |
| Regulación de dinero electrónico / fintech | Media | Alto si custodiamos saldo | No custodiar saldo; opinión legal antes de lanzar pases prepagados; estructura de pagos "pass-through" con la pasarela |
| Reacción de incumbentes (BAC/Compass, Vivepass, Spectrum) | Media | Medio | Neutralidad como ventaja; buscar a los bancos como socios (beneficios de tarjeta), no como enemigos; no competir en pago interno de Spectrum |
| Entrada de Kigo (México) u otro jugador regional **(verificar)** | Baja-media | Medio | Velocidad en firmar exclusividades blandas con operadores pequeños; densidad local |
| Operadores no adoptan (desconfianza, informalidad fiscal) | Alta | Alto | Plan gratis, FEL como argumento, cobro en efectivo registrado como transición, visitas presenciales y capacitación de guardias |
| Fallo en garita destruye confianza | Media | Alto | Modo offline, código de respaldo, soporte telefónico, SLA de respuesta < 2 min en horas pico |
| Fraude y no-shows | Media | Medio | Tarjeta tokenizada, cargo en reserva, política de cancelación clara, lista negra de placas |
| Dependencia de una pasarela | Media | Medio | Abstracción de pagos con dos proveedores (Recurrente + Tilopay/VisaNet) desde el diseño |
| Ley de protección de datos (iniciativa 6464) **(verificar)** | Media | Medio | Diseñar con minimización de datos y consentimiento desde el inicio; placas y ubicación son datos sensibles |
| Mercado pequeño para VC | Alta | Medio | Rentabilidad temprana vía SaaS; plan de expansión a El Salvador (sin apps privadas de parqueo) y Honduras |
| Seguridad física / responsabilidad por daños | Media | Medio | Términos claros; seguro de responsabilidad civil; registro fotográfico de ingreso opcional en garita |

---

## 11. Decisiones abiertas (requieren al fundador)
Ver `03-accesos-y-decisiones-pendientes.md`. Las tres más urgentes: (1) estructura societaria (S.A. en Guatemala sola vs. holding en EE. UU. que habilita Stripe e inversión extranjera), (2) nombre y marca, (3) zona y lista de los 10 primeros parqueos piloto.

## 12. Próximos pasos inmediatos (2 semanas)
1. Confirmar personalmente la ficha de Parkeyo en Play Store/App Store y su lista de parqueos; probar Vivepass y Compass como usuario (la investigación no pudo acceder a las tiendas).
2. Visitar 15 parqueos en Zona 10 y Zona 4 con un guion de entrevista; anotar sistema actual, tarifas, dueño, disposición a piloto.
3. Iniciar constitución de la S.A. y abrir cuenta bancaria; solicitar afiliación en Recurrente y una alternativa.
4. Crear cuentas de Apple Developer, Google Play Console, Google Cloud (Maps), Meta Business (WhatsApp), certificador FEL (Infile o Digifact).
5. Aprobar el stack técnico de `02-arquitectura-tecnica.md` y arrancar el esqueleto del monorepo.
