# Benchmark de apps globales de parqueo (SpotHero y pares) — features, modelos de negocio y tecnología (corte: octubre 2026)

> Nota metodológica: esta investigación se hizo con ~45 búsquedas web. El proxy de red de la sesión bloqueó la lectura directa de casi todos los sitios (spothero.com, parkmobile.io, justpark.com, metropolis.io, Wikipedia, SEC, TechCrunch, CNBC, Parking Today, etc.), por lo que los hallazgos provienen de los resúmenes y extractos de resultados de búsqueda, no de la lectura completa de las páginas. Cada hallazgo lleva su URL fuente. Donde las fuentes se contradicen o el dato es una estimación de terceros, se señala explícitamente. Los vacíos (gaps) se listan al final de cada sección.

---

## 1. Features principales de cada app (matriz funcional)

### Takeaway
Las apps líderes convergen en dos "familias" de producto que a veces se combinan: (a) **marketplace de reservas anticipadas** off-street (SpotHero, ParkWhiz/FLASH, JustPark, Parclick, YourParkingSpace) con búsqueda por destino en mapa, comparación de precios, pase digital con QR y cancelación gratuita hasta el inicio; y (b) **pago de sesión "drive-up" / pay-by-phone** (ParkMobile, EasyPark, PayByPhone, RingGo, Passport) con número de zona, extensión remota, recordatorios y, cada vez más, cámaras ANPR/LPR que inician y cierran la sesión automáticamente. Metropolis representa el extremo "checkout-free" (visión computacional + cobro automático a la placa) y los mapas (Google/Waze/Apple) actúan como canales de demanda que redirigen a estos proveedores.

### Cited Findings

**SpotHero (Chicago, EE. UU./Canadá)**
- Lanzada en 2011; a febrero de 2026 ofrecía parqueo en más de 13,000 garajes, lotes y valets en más de 400 ciudades de EE. UU. y Canadá — [CNBC](https://www.cnbc.com/2026/02/23/uber-acquiring-spothero.html)
- Permite cancelar la reserva "hasta el minuto en que inicia" con reembolso total, vía app, web o sistema telefónico de autoservicio; los reembolsos pueden tardar hasta 21 días; una vez iniciada la reserva no se puede cancelar ni reembolsar; soporte "Customer Heroes" por teléfono (844) 324-7768, 7 días/365 — [SpotHero FAQ](https://spothero.com/faq); [SpotHero Blog – cancelar reserva](https://blog.spothero.com/cancel-spothero-reservation); [RefundGuides](https://refundguides.com/spothero-cancellation-refund-guide/)
- Muchas instalaciones tienen escáneres que permiten entrar y salir escaneando el código QR del "Parking Pass" de SpotHero desde el celular; el conductor busca un letrero "Scan Barcode Here" y la barrera se levanta — [SpotHero Blog – escáner](https://blog.spothero.com/how-to-parking-scanner-spothero); [SpotHero Touchless Parking](https://spothero.com/about/touchless-parking)
- "Scan2Pay" es la solución drive-up de SpotHero: el conductor escanea el QR del letrero in situ, ajusta la duración, ingresa su placa y paga con métodos seguros — [SpotHero Operator Help – Scan2Pay](https://operator-help.spothero.com/en/articles/9346439-scan2pay-sell-secure-on-site-parking-reservations)
- Página de "Parking Guarantee" (garantía de lugar) existe en el sitio oficial — [SpotHero Parking Guarantee](https://spothero.com/about/parking-guarantee) (no se pudo leer el contenido; ver gaps)
- Integración con Apple Maps (enero 2023): información de parqueo para más de 8,000 ubicaciones en EE. UU. y Canadá; filtros por carga EV, accesibilidad en silla de ruedas, valet; búsqueda por fecha y hora — [MacRumors](https://www.macrumors.com/2023/01/09/apple-maps-parking-feature-spothero/); [TechCrunch](https://techcrunch.com/2023/01/09/apple-maps-spothero-parking-feature)
- Tiene un "Operator Panel" (panel para operadores) con un squad de ingeniería dedicado, y un producto para operadores "Online Reservations for Parking Operators" — [SpotHero Tech Blog – Operator Panel Squad](https://medium.com/spothero-technology-blog/operator-panel-squad-at-spothero-45ebc2f54266); [SpotHero – Operators](https://spothero.com/sell-parking/operators)
- Guía oficial "How SpotHero Works" y "How to Redeem your SpotHero Reservation" (instrucciones de redención) — [SpotHero Blog – How it works](https://blog.spothero.com/how-spothero-works); [SpotHero Blog – Redeem](https://blog.spothero.com/redeem-spothero-reservation)

**ParkWhiz / BestParking / Arrive Mobility → FLASH (Austin, EE. UU.)**
- En enero de 2021 Flash se fusionó con Arrive Mobility, incluyendo las marcas de consumo ParkWhiz y BestParking; ParkWhiz hoy se describe como "powered by Arrive, a Flash Technology" — [Flash Parking – nota Chicago Inno](https://www.flashparking.com/news-press/chicago-inno-parking-startup-arrive-to-merge-with-austins-flashparking/); [Crunchbase – adquisición](https://www.crunchbase.com/acquisition/flashparking-acquires-parkwhiz--9c05d57e)
- Live Nation nombró a ParkWhiz (Flash) proveedor oficial de parqueo para 41 venues en EE. UU. (parqueo de eventos) — [Parking Network](https://www.parking.net/parking-news/flash/live-nation-taps-parkwhiz-as-official-parking-provider)
- Flash "pone el parqueo en el mapa": los listados aparecen en Google Search, Google Maps y Waze con botón "Reserve & Save"/"Book Online" que abre una página alojada por FLASH donde se paga con Apple Pay, Google Pay, tarjeta o cuenta — [Parking Network – Flash/Google/Waze](https://www.parking.net/parking-news/flash/google-search-google-maps-and-now-waze); [IPMI](https://www.parking-mobility.org/news/flash-puts-parking-on-the-map-with-google-search-google-maps-and-now-waze/)
- Existe documentación de soporte para "ParkWhiz reservations via Waze mobile app" — [ParkWhiz B2B Support](https://digitalsupport.parkwhiz.com/support/solutions/articles/60001627199-parkwhiz-reservations-via-waze-mobile-app)
- "Express Pay" (ParkMobile + Flash, Filadelfia): acceso y pago automáticos en garajes participantes (sin ticket) — [Arrive newsroom](https://arrive.com/en/newsroom/press-release/arrive-and-flash-transform-philadelphia-parking-with-the-launch-of-express-pay); [IPMI](https://www.parking-mobility.org/news/arrive-and-flash-transform-philadelphia-parking/)

**ParkMobile (EE. UU./Canadá; grupo Arrive, ex-EasyPark Group)**
- Más de 66 millones de usuarios registrados en Norteamérica (reportes anteriores: más de 50 millones en 2023); funciona en más de 700 ciudades de EE. UU. y Canadá; "zone parking" en más de 600 ciudades y en 8 de las 10 ciudades más grandes de EE. UU. — [ParkMobile – Zone Parking](https://parkmobile.io/zone-parking/); [App Store](https://apps.apple.com/us/app/parkmobile-park-pay-go/id365399299); [Google Play](https://play.google.com/store/apps/details?id=net.sharewire.parkmobilev2&hl=en_US)
- Permite pagar parqueo en calle y fuera de calle, reservar garajes, parqueo de eventos y de aeropuerto, y campus universitarios — [ParkMobile – Zone Parking](https://parkmobile.io/zone-parking/); [ParkMobile Support FAQ](https://support.parkmobile.io/hc/en-us/articles/222180708-FREQUENTLY-ASKED-QUESTIONS)
- Producto para operadores "ParkMobile 360 Policy Management" — [ParkMobile 360](https://parkmobile.io/parking-solutions/parkmobile-360/)
- Interoperabilidad con operadores privados: p. ej., "New Orleans, LA (Premium Parking) – Zone Number 133" — [ParkMobile Support](https://support.parkmobile.io/hc/en-us/articles/36854918857499-New-Orleans-LA-Premium-Parking-Zone-Number-133)

**EasyPark (Europa; grupo Arrive)**
- Descrita como la app de pago de parqueo más usada de Europa, con cobertura en más de 4,400 ciudades en más de 20 países; su "rueda rosada" inicia, extiende y detiene sesiones de calle; "Camera Park" automatiza garajes con barrera; carga de EV integrada en la app — [ParkAppsHub – EasyPark review](https://parkappshub.com/apps/easypark/)
- "Automatic camera parking" (CamAccess): al activarlo en la app, cámaras en ubicaciones participantes leen la placa al llegar e inician la sesión automáticamente; al salir la sesión termina y se cobra en la app — [EasyPark – Automatic camera parking](https://www.easypark.com/en-nl/how-it-works/automatic-camera-parking); [EasyPark Partners – CamAccess](https://www.easyparkpartners.com/our-services/easypark-camera-park)
- "Find parking": datos en vivo para encontrar calles con alta probabilidad de espacio libre antes de llegar; modelo predictivo (pendiente de patente) que analiza datos históricos y eventos para pronosticar ocupación; detección de disponibilidad vía CCTV con visión computacional — [ParkAppsHub](https://parkappshub.com/apps/easypark/); [AllParkingApps – EasyPark](https://allparkingapps.com/apps/easypark)
- Cooperación con APCOA para parqueo sin contacto en garajes — [Parking Network – APCOA/EasyPark](https://www.parking.net/parking-news/apcoa-and-easypark-group/way-to-contactless-parking-in-garages); hito en integraciones de "camera parking" — [Parking Network](https://www.parking.net/parking-news/easypark-group/achieves-milestone)
- Producto B2G/B2B "EasyPark Parking Dashboard" para ciudades y operadores — [EasyPark – Parking Dashboard](https://www.easypark.com/en-se/cities-and-operators/our-services/easypark-parking-dashboard)

**PayByPhone (Vancouver; Corpay → Lightyear Capital)**
- Permite pagar parqueo vía app, llamada o SMS; procesó más de 200 millones de transacciones de pago en 2023; más de 110 millones de conductores han descargado la app; trabaja con más de 1,300 ciudades/operadores en Reino Unido, Norteamérica, Francia, Alemania, Suiza (e Italia según otra fuente) — [Corpay newsroom](https://www.corpay.com/corporate-newsroom/16996/fleetcor-acquires-paybyphone-a-global-digital-parking-company); [PayByPhone press – Lightyear](https://www.paybyphone.com/press-articles/lightyear-capital-signs-agreement-to-acquire-paybyphone); [Payments Dive](https://www.paymentsdive.com/ex/mpt/news/volkswagen-financial-services-acquires-paybyphone/)
- Puntuación 3.8/5 en una reseña comparativa de apps (vs. 4.1/5 de EasyPark) — [ParkAppsHub – PayByPhone](https://parkappshub.com/apps/paybyphone/)

**JustPark (Reino Unido) + ParkHub (EE. UU.)**
- Originalmente "ParkatmyHouse" (marketplace peer-to-peer de entradas de casa) — [CB Insights](https://www.cbinsights.com/company/parkatmyhousecom)
- Modelo de dos lados: el espacio lo publica un "space owner" (desde dueños de casa hasta operadores) y el conductor paga el precio listado más un "Driver fee" — [JustPark Support – Transaction Fee](https://support-uk.justpark.com/hc/en-gb/articles/4416535659921-Transaction-Fee); [JustPark – rent out your driveway](https://www.justpark.com/how-it-works/rent-out-your-driveway)
- JustPark calcula/sugiere precios ("How do we calculate your pricing?") y publica guías para que el host fije precio — [JustPark Support – Pricing](https://support-uk.justpark.com/hc/en-gb/articles/5088348156817-Pricing-How-do-we-calculate-your-pricing); [JustPark Resource Centre](https://www.justpark.com/resource-centre/how-to-price-your-parking-space-a-space-owner-guide-to-getting-it-right)
- Tras la fusión con ParkHub (tecnología de parqueo de eventos en Norteamérica), el grupo combinado sirve a más de 20 millones de conductores y más de 500 clientes B2B — [JustPark Business Blog](https://www.justpark.com/business/blog/parkhub-and-justpark-agree-to-merge); [Dallas Innovates](https://dallasinnovates.com/dallas-parkhub-and-u-k-s-justpark-to-merge-alongside-strategic-growth-investment/)

**Parkopedia (Reino Unido; grupo Arrive)**
- Agregador global de datos de parqueo y proveedor de servicios para auto conectado: datos y pagos in-car para parqueo, carga EV, combustible y peajes; adquirido por EasyPark Group el 13 de febrero de 2025 tras una década de colaboración — [Parkopedia press release](https://business.parkopedia.com/press-releases/easypark-group-acquires-parkopedia-to-streamline-the-driver-experience); [TransportXtra](https://www.transportxtra.com/publications/local-transport-today/news/77624/easypark-group-acquires-parkopedia)
- Post-adquisición publica actualizaciones sobre calidad de datos y cobertura "Arrive" — [Parkopedia blog](https://business.parkopedia.com/blog/year-end-post-acquisition-update-maximising-parkopedia-data-quality-and-arrive-coverage)

**ParkMe (INRIX)**
- INRIX adquirió ParkMe (anuncio oficial) y pasó a usar datos de ParkMe exclusivamente en EE. UU. y Europa — [INRIX press release](https://inrix.com/press-releases/parkme-english/); [INRIX blog](https://inrix.com/blog/parkme-switch/); [LA Business Journal](https://labusinessjournal.com/technology/parking-app-startup-parkme-acquired-inrix/)
- La app "INRIX ParkMe" fue retirada de Google Play el 14 de mayo de 2025; última actualización el 2 de febrero de 2024; ~420 mil descargas acumuladas — [AppBrain](https://www.appbrain.com/app/inrix-parkme/com.parkme.consumer)

**Parclick (España/Europa)**
- Marketplace de reserva online de parqueos en Europa con descuentos "de hasta 70%"; presente en España, Francia, Italia, Portugal, Bélgica, Países Bajos, Alemania y Suiza; más de 500 ciudades; parqueo en aeropuertos (oficial, cercano, valet) y estaciones de tren — [Parclick – Sobre nosotros](https://parclick.es/about-us); [Parclick.es](https://parclick.es/)
- La app se llama "Parquímetro y Parking Parclick" (es decir, también paga parquímetro/calle) y dice ofrecer ahorro en "más de 1,400 parkings" en Europa y 125 ciudades españolas — [App Store (ES)](https://apps.apple.com/es/app/parquimetro-y-parking-parclick/id1175900386); [Google Play](https://play.google.com/store/apps/details?id=com.parclick&hl=en_US) (las cifras de "3,000 parkings/9 países" en el sitio y "1,400 parkings" en la tienda no coinciden; distinta fecha)
- Adquirió la central de reservas ParkingsdeParis.com — [Hosteltur](https://www.hosteltur.com/comunidad/nota/002276_la-start-up-espanola-parclick-adquiere-la-central-de-reservas-parkingsdepariscom.html); [Ecommerce News](https://ecommerce-news.es/la-startup-espanola-parclick-adquiere-la-central-de-reservas-parkingsdeparis-com/)

**RingGo (Reino Unido; grupo Arrive)**
- Su empresa matriz (EasyPark Group) se rebautizó como Arrive en 2025 — [Fleet World](https://fleetworld.co.uk/ringgo-parent-company-rebrands-to-build-global-mobility-platform/)

**Passport (Charlotte, EE. UU.; adquirida por Arrive el 1-oct-2026)**
- Plataforma de "compliance and curbside payment" para ciudades y operadores: pago móvil, enforcement digital, permisos — [IPMI – Arrive completes acquisition of Passport](https://www.parking-mobility.org/news/arrive-completes-acquisition-of-passport/)
- Reportó 117 millones de transacciones de parqueo en 2025 y más de USD 4.8 mil millones en pagos acumulados procesados (recap enero 2026) — [Passport News](https://www.passportinc.com/news/)
- Expansiones 2025: Boston (infraestructura digital de parqueo), Austin (procesamiento de pagos de parquímetros y estaciones, octubre 2025), Tybee Island GA (permisos digitales y enforcement), Glencoe IL (compliance) — [Passport News](https://www.passportinc.com/news/)

**Metropolis (Los Ángeles; checkout-free con visión computacional)**
- Empresa de IA que usa visión computacional para habilitar pago "checkout-free" (sin ticket ni cajero): el sistema identifica el vehículo y cobra automáticamente — [Metropolis newsroom](https://www.metropolis.io/newsroom/metropolis-to-acquire-sp-plus); [Payments Dive](https://www.paymentsdive.com/news/metropolis-sp-plus-parking-automation-billion-acquisition-contactless-payment/695970/)
- Procesa USD 5 mil millones anuales en volumen de pagos, controla más de 4,200 ubicaciones en EE. UU. y emplea 23,000 personas (nov 2025) — [Biometric Update](https://www.biometricupdate.com/202511/metropolis-secures-1-6b-to-bring-ai-recognition-platform-to-new-verticals); [Fortune](https://fortune.com/2026/05/20/metropolis-5-billion-ai-infrastructure-jp-morgan-parking-biometrics/)
- Guía de terceros sobre cómo funciona Metropolis/SP+ para conductores — [AirGarage blog](https://www.airgarage.com/blog/metropolis-sp-plus)

**Premium Parking (Nueva Orleans; operador "gateless")**
- Opera más de 80 ubicaciones en Nueva Orleans; sistema sin barreras: cámaras LPR capturan la placa al entrar; pago por app, "TextPay" (enviar 'park' al 504504 o escanear QR) o "CameraPay"; también máquinas de pago; ubicaciones "frecuentemente fiscalizadas" (enforcement) — [BriefGlance](https://briefglance.com/articles/premium-parkings-gateless-revolution-from-new-orleans-to-national-scale); [New Orleans Mom](https://neworleansmom.com/in-and-around-new-orleans/local-businesses/how-to-park-like-a-pro-with-premium-parking-in-new-orleans/); [Premium Parking](https://www.premiumparking.com/city/new-orleans/the-now); [Parking Network](https://www.parking.net/parking-industry/premium-parking)

**YourParkingSpace (Reino Unido; Flowbird → Arrive)**
- Fundada en 2013 como servicio peer-to-peer para rentar entradas de casa; evolucionó a marketplace de "pre-book y suscripción" que incluye parqueos comerciales y carga EV; usada por más de 5 millones de conductores; 85,000 proveedores de espacio, desde particulares hasta Premier Inn, Tesco y Morrisons — [Parking Network](https://www.parking.net/parking-news/flowbird/acquires-yourparkingspace-the-uks-leading-pre-book-and-subscription-marketplace); [TransportXtra](https://www.transportxtra.com/publications/evolution/news/71797/flowbird-group-acquires-yourparkingspace/)

**Wayleadr (parqueo corporativo/workplace) y Spacer (P2P Australia)**
- Wayleadr: plataforma de "workplace arrival and parking" que permite a empleados ver disponibilidad, reservar y liberar espacios; usa automatización y ML para asignar; clientes como OpenAI, Google, Uber, Novartis, Sanofi y Riot Games; tiene página de precios (SaaS) — [Wayleadr](https://wayleadr.com/); [Wayleadr Pricing](https://wayleadr.com/pricing/); [citybiz](https://www.citybiz.co/article/854267/wayleadr-secures-majority-growth-investment-to-scale-workplace-arrival-and-parking-platform-globally/); [Capterra](https://www.capterra.com/p/181872/Wayleadr/)
- Spacer (Australia): marketplace P2P de almacenamiento y parqueo; adquirió Parkhound (9-oct-2017), que tenía 55,000 miembros y 10,000 espacios — [SBS](https://www.sbs.com.au/news/spacer-buys-online-parking-platform); [SmartCompany](https://www.smartcompany.com.au/startupsmart/storage-startup-spacer-raised-2-7-million-acquire-parkhound-competitor-pitched-shark-tank/)

**Pavemint (P2P, Los Ángeles) — cerrada**
- Permitía rentar tu espacio, garaje o entrada; el sitio cerró sin explicación (caído desde agosto 2024) — [SideHusl](https://sidehusl.com/pavemint/); perfil previo — [SuperbCrew](https://www.superbcrew.com/the-pavemint-app-is-changing-the-way-people-park/)

**Google Maps / Waze / Apple Maps**
- Google Maps: botón "Pay for Parking" al acercarse al destino; se ingresa número de parquímetro y tiempo; pago con cualquier método de Google Pay; disponible en parquímetros de más de 400 ciudades de EE. UU. (lanzado en febrero de 2021 con socios de pago móvil) — [TechCrunch (2021)](https://techcrunch.com/2021/02/17/google-maps-users-can-now-pay-for-parking-or-their-transit-fare-right-from-the-app/embed/); [Tearsheet](https://tearsheet.co/payments/google-maps-and-waze-enable-users-to-make-contactless-payments-for-parking-and-fuel/)
- Waze: transacciones de parqueo reservable en 30,000 ubicaciones de Norteamérica; al ingresar destino sugiere parqueos reservables cercanos con costo, amenidades, accesibilidad y valet; reserva, paga y enruta con pase digital — [Tearsheet](https://tearsheet.co/payments/google-maps-and-waze-enable-users-to-make-contactless-payments-for-parking-and-fuel/); [Parking Network – Flash/Waze](https://www.parking.net/parking-news/flash/google-search-google-maps-and-now-waze)
- Google Maps añadió lotes de parqueo como feature y Waze reportes en vivo — [HardwareZone](https://www.hardwarezone.com.sg/lifestyle/apps/tech-news-google-adds-features-maps-and-waze)
- Apple Maps: marca la ubicación del auto estacionado al desconectarse del Bluetooth/CarPlay del vehículo (iOS 10+); muestra hace cuánto se estacionó — [Apple Support](https://support.apple.com/en-us/101587); Google Maps y Apple Maps guardan el lugar de parqueo automáticamente — [Fox News](https://www.foxnews.com/tech/never-lose-your-car-maps-parking-tools)
- Apple Maps: ruteo para EV con paradas de carga — [Apple Support – EV routing](https://support.apple.com/guide/iphone/set-up-electric-vehicle-routing-iphc5e3a4b4b/ios); integración de reservas con SpotHero (8,000+ ubicaciones) — [MacRumors](https://www.macrumors.com/2023/01/09/apple-maps-parking-feature-spothero/)

### Inferences
- **Matriz de features (derivada de los hallazgos anteriores; "✓" = confirmado por fuente citada, "~" = parcial/indirecto, "?" = no verificado en esta sesión):**

| Feature | SpotHero | ParkWhiz/FLASH | ParkMobile | EasyPark | PayByPhone | JustPark | Parclick | Metropolis | Premium Parking | YourParkingSpace |
|---|---|---|---|---|---|---|---|---|---|---|
| Búsqueda por destino en mapa + comparar precios | ✓ | ✓ | ~ (reservas) | ~ (Find) | ? | ✓ | ✓ | n/a | ~ | ✓ |
| Reserva anticipada (pre-book) | ✓ | ✓ | ✓ | ? | ? | ✓ | ✓ | n/a | ✓ (pagar por adelantado) | ✓ |
| Drive-up pay-by-phone (zona/placa) | ✓ (Scan2Pay) | ~ (Express Pay) | ✓ | ✓ | ✓ | ? | ✓ (parquímetro) | ✓ (auto) | ✓ (TextPay/QR) | ? |
| Extender sesión remotamente | ~ | ? | ✓ | ✓ | ✓ | ? | ? | n/a | ? | ? |
| Mensual / suscripción | ? | ? | ? | ? | ? | ✓ (hosts) | ? | ? | ? | ✓ |
| Eventos / venues | ✓ | ✓ (Live Nation, 41 venues) | ✓ | ? | ? | ✓ (ParkHub) | ? | ? | ? | ? |
| Aeropuerto | ✓ | ✓ | ✓ | ? | ? | ✓ | ✓ | ? | ? | ? |
| Filtro EV charging | ✓ (vía Apple Maps) | ? | ? | ✓ | ? | ? | ? | ? | ? | ✓ |
| Valet | ✓ | ✓ (Waze muestra) | ? | ? | ? | ? | ✓ (aeropuertos) | ? | ? | ? |
| Entrada por LPR/ANPR | ~ (placa en Scan2Pay) | ✓ (Express Pay) | ~ | ✓ (CamAccess) | ? | ? | ? | ✓ (core) | ✓ | ? |
| QR/código de barras en barrera | ✓ | ✓ | ? | ? | ? | ? | ? | n/a | ✓ (QR para pagar) | ? |
| Garantía de lugar | ✓ (página oficial) | ? | ? | n/a | n/a | ? | ? | n/a | n/a | ? |
| Cancelación gratuita hasta inicio | ✓ | ? | ? | n/a | n/a | ? | ? | n/a | n/a | ? |
| Apple Pay / Google Pay | ✓ (PayPal, tarjeta) | ✓ | ? | ? | ? | ? | ? | ? | ? | ? |
| Integración Google Maps / Waze / Apple Maps | ✓ Apple Maps | ✓ Google, Waze | ✓ Google Maps pay (2021) | ? | ? | ? | ? | ? | ? | ? |
| Predicción de disponibilidad | ? | ? | ? | ✓ | ? | ? | ? | n/a | ? | ? |
| Cuenta empresarial / recibos | ? | ? | ? | ~ (Dashboard es B2G) | ? | ✓ (B2B 500 clientes) | ? | ? | ? | ? |
| Soporte telefónico 24/7 | ✓ | ? | ? | ? | ? | ? | ? | ? | ? | ? |

- La redención con **QR en el pase + escáner en barrera** (SpotHero/ParkWhiz) es la vía "con hardware ligero"; la ruta de **placa (LPR)** es la que están adoptando todos los grandes (Metropolis, EasyPark CamAccess, Premium Parking, Flash Express Pay). Para un MVP en Guatemala, el pase QR + ingreso de placa + "mostrar al attendant" cubre los tres escenarios de garaje sin exigir integración de hardware.
- Los mapas (Google/Waze/Apple) **no venden parqueo propio**: son canales de distribución que insertan al proveedor (SpotHero en Apple Maps, FLASH en Google/Waze, Passport/ParkMobile en Google Maps). Un entrante local no accederá a esos canales al inicio; su equivalente es SEO local + QR físico en el lote.

### Gaps
- No pude leer las listas oficiales de features (App Store/Google Play) de cada app, por lo que features como CarPlay/Android Auto, Apple Wallet pass, favoritos, múltiples vehículos, notificaciones antes de vencer, créditos/lealtad y cuentas empresariales **no se verificaron** para la mayoría (celdas "?"). Es conocimiento común que ParkMobile/EasyPark/PayByPhone ofrecen recordatorios de expiración y múltiples vehículos, pero no obtuve una URL que lo confirme en esta sesión.
- No encontré detalle de la política de cancelación de ParkWhiz, JustPark, Parclick ni YourParkingSpace.
- RingGo: no se pudo acceder a Wikipedia ni a fuentes con cifras (consejos municipales, usuarios, tarifa de conveniencia).
- Parkopedia: no obtuve cifras de cobertura (países/ciudades/OEMs).

---

## 2. Modelos de negocio, cifras y estado 2024–2026 (M&A, financiamiento, señales)

### Takeaway
Entre 2024 y 2026 el sector se consolidó en tres bloques: **Uber compró SpotHero** (USD 617 M, cerrado 16-abr-2026); **EasyPark Group absorbió Flowbird, Parkopedia y Passport y se renombró "Arrive"** (nombre comprado a Flash), convirtiéndose en el mayor grupo global de pago de parqueo; y **Metropolis compró SP+ por USD 1.5 B** y luego levantó USD 1.6 B a una valuación de ~USD 5 B para llevar su visión computacional a otros verticales. La señal es clara: los marketplaces puros de reservas se volvieron features dentro de superapps (Uber) o plataformas de pago, y el valor migró hacia (a) propiedad del cobro/enforcement y (b) tecnología de identificación del vehículo (LPR/visión). Las comisiones reportadas para SpotHero varían según la fuente (15 %–35 %); JustPark cobra fee al conductor (~12 % con tope £1.99) más un pequeño fee al host.

### Cited Findings

**SpotHero**
- Última ronda externa: USD 50 M en 2019 liderada por Macquarie Capital — [CNBC](https://www.cnbc.com/2026/02/23/uber-acquiring-spothero.html)
- 23-feb-2026: Uber anunció la adquisición de SpotHero; términos no revelados; cierre esperado en H1 2026; Uber ofrecerá una "parking reservation experience" powered by SpotHero para aeropuertos y venues dentro de la app de Uber — [CNBC](https://www.cnbc.com/2026/02/23/uber-acquiring-spothero.html); [Silicon Republic](https://www.siliconrepublic.com/business/uber-boost-consumer-base-spothero-acquisition-autonomous-vehicle); [Entrepreneur](https://www.entrepreneur.com/business-news/uber-buys-parking-app-for-when-you-dont-want-an-uber/502932)
- Según el 10-Q de Uber (trimestre al 30-jun-2026), Uber adquirió el 100 % de SpotHero el 16 de abril de 2026 por un precio total de USD 617 millones en efectivo — [Uber 10-Q Q2 2026 (SEC)](https://www.sec.gov/Archives/edgar/data/0001543151/000154315126000032/uber-20260630.htm) (dato tomado del resumen de búsqueda; no pude abrir el documento para citar el texto exacto); [Parking Network](https://www.parking.net/parking-news/uber-spothero-acquisition)
- Comisión a operadores — **fuentes contradictorias**: el "Seller FAQ" de SpotHero (PDF, 2020) indica 35 % de comisión sobre todas las reservas; otra fuente de terceros reporta 15 % para transacciones hasta USD 10 y 15 % + USD 0.99 para USD 11 o más, y que publicar es gratis y solo se cobra comisión cuando el lugar se vende — [SpotHero Seller FAQ (PDF)](https://blog.spothero.com/wp-content/uploads/2020/08/Updated-Seller-FAQs-1.pdf); [Giigs](https://www.giigs.us/make-money/rent-out-parking-space/spothero.html)
- Estimaciones de terceros (no oficiales) sitúan la comisión de SpotHero en 10–30 % o 15–25 %, con ejemplo de una reserva de USD 20 en que SpotHero retiene USD 4–6 y el operador recibe USD 14–16; socios de alto volumen negociarían comisiones menores — [Vizologi](https://vizologi.com/business-strategy-canvas/spothero-business-model-canvas/); [Sharetribe](https://www.sharetribe.com/create/how-to-build-website-like-spothero/); [BusinessModelCanvasTemplate](https://businessmodelcanvastemplate.com/blogs/how-it-works/spothero-how-it-works)
- Hay críticas de usuarios sobre "costos ocultos"/fees en SpotHero — [The Traveler](https://www.thetraveler.org/the-hidden-cost-of-using-spothero-for-parking-reservations/); explicación de cargos, reembolsos y disputas — [LegalClarity](https://legalclarity.org/spothero-charge-explained-fees-refunds-and-disputes/)

**ParkWhiz / Arrive Mobility / FLASH**
- Enero 2021: fusión Flash + Arrive (ParkWhiz, BestParking) — [Flash Parking](https://www.flashparking.com/news-press/chicago-inno-parking-startup-arrive-to-merge-with-austins-flashparking/)
- Marzo 2022: FLASH levantó más de USD 250 M en ronda liderada por Vista Equity Partners (participación minoritaria), valuación superior a USD 1 B; en ese momento Flash estaba en más de 10,000 ubicaciones en EE. UU. y Canadá, servía 11 millones de conductores al mes y generaba más de USD 1 B en transacciones anuales — [Austin American-Statesman](https://www.statesman.com/story/business/2022/03/21/austins-parking-tech-flash-raises-250-million-giving-valuation/9453273002/); [PitchBook](https://pitchbook.com/newsletter/vista-equity-leads-250m-investment-in-flash); [IPMI](https://www.parking-mobility.org/news/flash-secures-over-250-million-in-round-led-by-vista-equity-partners-to-advance-connected-mobility-ecosystem/); [Beringea](https://www.beringea.com/news/in-the-news/flash-parking-secures-over-usd250-million-in-recent-funding-round)
- Flash vendió/licenció el nombre "Arrive" a EasyPark Group mediante un acuerdo cuyos términos financieros no se revelaron; el acuerdo del nombre es distinto de la "alianza estratégica" Flash–ParkMobile de septiembre (2024) — [Parking Today](https://parkingtoday.com/suppliers/parking-giant-easypark-becomes-arrive-after-acquiring-rights-from-flash/)

**EasyPark Group → Arrive (Suecia/Noruega; brands: EasyPark, ParkMobile, RingGo, Flowbird, Parkopedia, YourParkingSpace, Yellowbrick, Passport)**
- EasyPark Group es dueño de las apps EasyPark, PARK NOW, ParkMobile, RingGo y Park-line — [Parkopedia press release](https://business.parkopedia.com/press-releases/easypark-group-acquires-parkopedia-to-streamline-the-driver-experience)
- 15-ene-2025: cerró la adquisición de Flowbird Group (fabricante de parquímetros/sistemas de pago); términos no revelados — [PR Newswire](https://www.prnewswire.com/news-releases/easypark-group-closes-acquisition-of-flowbird-group-to-become-a-leading-global-mobility-platform-provider-302351996.html); [Cision](https://news.cision.com/arrive/r/easypark-group-closes-acquisition-of-flowbird-group-to-become-a-leading-global-mobility-platform-pro,c4091707); [Parking Network](https://www.parking.net/parking-news/easypark-group/group-intends-to-acquire-flowbird-group)
- 13-feb-2025: cerró la adquisición de Parkopedia — [Parkopedia](https://business.parkopedia.com/press-releases/easypark-group-acquires-parkopedia-to-streamline-the-driver-experience); [Fundz](https://app.fundz.net/acquisitions/acquires-ae6f)
- 2025: EasyPark Group se unifica bajo "Arrive", nombre que reemplaza a EasyPark Group y Flowbird Group como marca paraguas de EasyPark, Flowbird, ParkMobile, Parkopedia, RingGo, Yellowbrick, YourParkingSpace y otras — [Arrive newsroom](https://arrive.com/en/newsroom/news/easypark-group-unifies-under-arrive-to-build-the-world-s-leading-global-mobility-platform); [IPMI](https://www.parking-mobility.org/news/easypark-group-unifies-under-arrive/); [Yahoo Finance](https://finance.yahoo.com/news/easypark-group-unifies-under-arrive-151900971.html); [Fleet World](https://fleetworld.co.uk/ringgo-parent-company-rebrands-to-build-global-mobility-platform/)
- 1-oct-2026: Arrive completó la adquisición de Passport (plataforma de compliance y pago en bordillo para ciudades y operadores de Norteamérica); respaldada por Vitruvian Partners, Verdane y Searchlight Capital Partners; posicionamiento: "City OS" para movilidad autónoma — [IPMI](https://www.parking-mobility.org/news/arrive-completes-acquisition-of-passport/); [Passport blog – intent](https://www.passportinc.com/blog/arrive-announces-intent-to-acquire-passport/); [Yahoo Finance](https://finance.yahoo.com/news/arrive-announces-intent-acquire-passport-171500568.html); [FTC early termination notice 20261056 (Arrive AS; Passport Labs)](https://www.ftc.gov/legal-library/browse/early-termination-notices/20261056)
- Ingresos (estimaciones de bases de datos, no oficiales): EasyPark entre €100 M y €500 M (al 31-dic-2023) según Tracxn; Flowbird USD 100–500 M según Owler — [Tracxn – EasyPark](https://tracxn.com/d/companies/easypark/__eJTnjY_rVUV-R6Djt8puvZEbVx0BliLYJityhW73mf0); [Owler – Flowbird](https://www.owler.com/company/flowbird); [PitchBook – EasyPark Group](https://pitchbook.com/profiles/company/53814-61)

**Passport**
- Serie D de USD 65 M (dic 2019); USD 90 M de growth capital de Sixth Street Growth (mayo 2021); capital total levantado superior a USD 200 M — [Passport blog – Series D](https://www.passportinc.com/blog/passport-raises-65m-in-series-d-funding/); [Passport blog – Sixth Street](https://www.passportinc.com/blog/passport-raises-90m-in-growth-capital-with-sixth-street-growth/); [PR Newswire](https://www.prnewswire.com/news-releases/passport-raises-65m-in-series-d-funding-300972288.html)
- 117 M transacciones en 2025; USD 4.8 B acumulados procesados — [Passport News](https://www.passportinc.com/news/)

**PayByPhone**
- Diciembre 2016: adquirida por Volkswagen Financial Services (monto no revelado) — [Fortune (2016)](https://fortune.com/2016/12/28/volkswagen-parking-acquisition); [Fleet News](https://www.fleetnews.co.uk/news/fleet-industry-news/2017/01/05/volkswagen-financial-services-buys-paybyphone-parking-app)
- 15-sep-2023: FLEETCOR (hoy Corpay) adquirió PayByPhone de VW Financial Services; valor reportado USD 300 M — [Corpay investor release](https://investor.corpay.com/news-releases/news-release-details/fleetcor-technologies-acquires-paybyphone-volkswagen-financial); [TransportXtra](https://www.transportxtra.com/publications/evolution/news/74598/fleetcor-acquires-paybyphone/)
- Febrero 2026 (fecha según URL del comunicado 2026-02-04): Corpay acordó vender PayByPhone ("activo no core de pagos vehiculares") a Lightyear Capital; cierre esperado en Q2 2026 — [Business Wire](https://www.businesswire.com/news/home/20260204689731/en/Corpay-Announces-Agreement-to-Sell-Non-Core-Vehicle-Payments-Asset); [PayByPhone press](https://www.paybyphone.com/press-articles/lightyear-capital-signs-agreement-to-acquire-paybyphone); [FinTech Futures](https://www.fintechfutures.com/m-a/corpay-sells-paybyphone-to-lightyear-capital); [GuruFocus](https://www.gurufocus.com/news/8776000/corpay-cpay-sells-paybyphone-unit-plans-share-buybacks) (un resumen de búsqueda decía "febrero 2025"; la URL del comunicado indica 2026)

**JustPark / ParkHub**
- Marzo 2024: ParkHub (Dallas) y JustPark (Reino Unido) acuerdan fusionarse, con inversión de crecimiento liderada por FTV Capital y participación de LLR Partners; juntos: más de 20 M de conductores, más de 500 clientes B2B y más de USD 1 B en volumen de reservas; términos no revelados — [JustPark Business Blog](https://www.justpark.com/business/blog/parkhub-and-justpark-agree-to-merge); [Dallas Innovates](https://dallasinnovates.com/dallas-parkhub-and-u-k-s-justpark-to-merge-alongside-strategic-growth-investment/); [Parking & Mobility Magazine](https://parking-mobility-magazine.org/around-the-industry-2/parkhub-and-justpark-agree-to-merge-alongside-strategic-growth-investment-from-ftv-capital-and-llr-partners/)
- Abril 2025: ParkHub se renombra JustPark en Norteamérica, enfocado en parqueo de eventos — [Dallas Innovates](https://dallasinnovates.com/dallas-based-parkhub-rebrands-as-justpark-following-2024-u-k-merger/); [TransportXtra](https://www.transportxtra.com/publications/new-transit/news/78167/parkhub-becomes-justpark)
- JustPark levantó capital de inversionistas minoristas vía Crowdcube — [Crowdcube](https://www.crowdcube.com/explore/blog/investing/justpark-joins-forces-with-parkhub)
- Fees: el conductor paga el precio del listado más un "Driver fee" (servicio y transacción): £0.69 para reservas menores a £5.75, o 12 % del valor con tope de £1.99, cobrado una vez por reserva; a los space owners se les aplica un fee sobre sus ganancias en reservas de corto plazo (reportado como 3 %) y un fee de 3 % al retirar fondos; publicar es gratis — [JustPark Support – Transaction Fee](https://support-uk.justpark.com/hc/en-gb/articles/4416535659921-Transaction-Fee); [JustPark Support – Is it free to list](https://support-uk.justpark.com/hc/en-gb/articles/207336687-Is-it-free-to-sign-up-and-list-my-space); [JustPark Owner Agreement](https://www.justpark.com/owner-agreement) (no pude leer el contrato; cifras tomadas del resumen de búsqueda)
- Queja de hosts sobre retención de fondos por JustPark — [MoneySavingExpert Forum](https://forums.moneysavingexpert.com/discussion/6524559/justpark-doing-what-they-can-to-retain-space-owners-cash)

**Metropolis / SP+**
- 30-mar-2022: Metropolis adquirió el operador Premier Parking — [Metropolis newsroom](https://www.metropolis.io/newsroom/metropolis-acquires-premier-parking); [Mergr](https://mergr.com/transaction/metropolis-technologies-acquires-premier-parking)
- Ronda de USD 167 M (anterior a la Serie C) — [dot.LA](https://dot.la/metropolis-raise-automated-parking-payment-2657510172.html)
- Octubre 2023: anunció Serie C de USD 1.7 B y acuerdo para adquirir SP Plus por USD 1.5 B (USD 54/acción en efectivo, prima de 52 % sobre el cierre del 4-oct-2023 y 28 % sobre el máximo de 52 semanas) — [Metropolis newsroom](https://www.metropolis.io/newsroom/metropolis-to-acquire-sp-plus); [TechCrunch](https://techcrunch.com/2023/10/05/ai-powered-parking-platform-metropolis-raises-1-7b-to-acquire-sp-plus/); [SP+ acquisition announcement](https://spplus.com/acquisition-announcement/)
- 16-may-2024: cierre; financiado con USD 1.05 B en acciones preferentes Serie C y USD 550 M de deuda a plazo (USD 1.8 B total), liderado por Eldridge y 3L Capital, con BDT & MSD Partners (crédito), Vista Credit Partners y Temasek; SP+ tenía más de 20,000 empleados y 3,300 ubicaciones; Metropolis pasó a ser el mayor operador de parqueo de Norteamérica — [Metropolis newsroom – cierre](https://www.metropolis.io/newsroom/metropolis-closes-acquisition-of-sp-plus); [Payments Dive](https://www.paymentsdive.com/news/metropolis-sp-plus-parking-automation-billion-acquisition-contactless-payment/695970/); [LA Business Journal](https://labusinessjournal.com/featured/metropolis-eyeing-growth-closes-1-5b-deal-for-parking-company/)
- Enero 2025: adquirió Oosto (ex-AnyVision, visión/biometría) en acuerdo 100 % en acciones por USD 125 M, un tercio de los ~USD 352–380 M que Oosto había levantado — [TechCrunch](https://techcrunch.com/2025/01/20/sources-ai-vision-startup-metropolis-is-buying-oosto-formerly-known-as-anyvision-for-just-125m/); [Calcalist](https://www.calcalistech.com/ctechnews/article/sk5ewnswke); [Parking Network](https://www.parking.net/parking-news/ai-vision-startup-metropolis-acquires-oosto)
- Noviembre 2025: aseguró USD 1.6 B en financiamiento para llevar su plataforma de reconocimiento por IA a nuevos verticales; valuación ~USD 5 B (6-nov-2025) — [Biometric Update](https://www.biometricupdate.com/202511/metropolis-secures-1-6b-to-bring-ai-recognition-platform-to-new-verticals); [Stock Analysis](https://stockanalysis.com/private/metropolis/); [Fortune (mayo 2026)](https://fortune.com/2026/05/20/metropolis-5-billion-ai-infrastructure-jp-morgan-parking-biometrics/); [Fast Forward Ventures](https://fastforwardventures.substack.com/p/metropolis-the-5-billion-vision-hiding)
- Tracxn lista 3 adquisiciones de Metropolis (a sep 2026) — [Tracxn](https://tracxn.com/d/acquisitions/acquisitions-by-metropolis/__WCrWqtc9CbNc39_jtum9z3k6VfY161MRL9p-KT3UbpY)

**YourParkingSpace / Flowbird**
- 13-jul-2022: Flowbird adquirió YourParkingSpace; Tracxn registra un monto de USD 142 M; Pelican Capital reportó salida de hasta 6.5x — [Tracxn](https://tracxn.com/d/companies/yourparkingspace/__KXweIgC_GjIJbXiKJFQ8WuUNS9RAKZysWq512O8Lh2g); [Pelican Capital](https://www.pelicancapital.com/pelican-capital-exits-yourparkingspace-for-up-to-6-5x/); [PE Hub](https://www.pehub.com/pelican-capital-exits-yourparkingspace/); [Highways Today](https://highways.today/2022/07/14/flowbird-yourparkingspace/)

**Wayleadr / Spacer**
- Wayleadr levantó USD 4 M (ronda semilla/Serie A, Nueva York) y ~USD 10 M en total; en 2025 anunció una inversión mayoritaria de crecimiento (monto no revelado) para expansión internacional — [Silicon Republic](https://www.siliconrepublic.com/start-ups/wayleadr-funding-last-mile-automation-proptech-new-york); [citybiz](https://www.citybiz.co/article/854267/wayleadr-secures-majority-growth-investment-to-scale-workplace-arrival-and-parking-platform-globally/); [PitchBook](https://pitchbook.com/profiles/company/169300-27)
- Spacer levantó AUD 2.7 M y compró Parkhound (2017) para dominar un mercado australiano de almacenamiento/parqueo estimado en AUD 2 B — [Elite Agent](https://eliteagent.com/storage-start-spacer-raises-2-7-million-acquires-parkhound/); [Inside Self-Storage](https://www.insideselfstorage.com/facility-operators/australia-based-peer-to-peer-self-storage-operator-spacer-raises-2-7m-buys-parkhound)

**Modelos de pago en vía pública (Google Maps como canal)**
- Google Maps "Pay for Parking" (2021) se lanzó con socios de pago móvil en más de 400 ciudades de EE. UU. — [TechCrunch](https://techcrunch.com/2021/02/17/google-maps-users-can-now-pay-for-parking-or-their-transit-fare-right-from-the-app/embed/)

### Inferences
- **Take rate**: el único documento oficial encontrado (Seller FAQ 2020) dice 35 %, mientras las fuentes secundarias dicen 15–30 %. Lo más probable es que SpotHero tenga una tarifa estándar alta para listados "self-serve" pequeños (35 %) y tarifas negociadas (15–25 %) para operadores grandes. Para un plan en Guatemala, asumir 15–25 % como rango competitivo y 30–35 % solo en segmentos premium (eventos/aeropuerto) parece razonable; **marcar como estimación**.
- **Modelo de fee al conductor** (JustPark ~12 % con tope, RingGo/PayByPhone/ParkMobile con "convenience fee" por sesión): es el modelo dominante en pay-by-phone municipal porque el operador/municipio no quiere ceder margen. En un mercado nuevo se puede combinar: comisión baja al operador + fee pequeño y visible al conductor.
- **Señal de las M&A 2024–2026**: (1) Uber pagó USD 617 M por SpotHero, una empresa que no levantaba capital desde 2019 — sugiere que SpotHero operaba de forma sostenible pero sin crecimiento explosivo, y que su valor para Uber es la **demanda cautiva + inventario de 13,000 lotes**, no la tecnología. (2) Metropolis a USD 5 B indica que los inversionistas valoran mucho más la **infraestructura de identificación del vehículo y el control del cobro** que el marketplace. (3) Arrive compra "capas" (hardware Flowbird, datos Parkopedia, enforcement Passport) para ser plataforma integral ciudad–operador–conductor. Lección para Guatemala: el marketplace solo es el inicio; la defensa competitiva viene de poseer el flujo de pago del operador (SaaS/POS) y, a mediano plazo, LPR.
- La venta de PayByPhone por VW (2023, USD 300 M) y por Corpay (2026, a un fondo de PE) muestra que las apps de pago de parqueo **no son estratégicas para corporativos no-parking** y terminan en manos de consolidadores especializados.

### Gaps
- No pude verificar el texto exacto del 10-Q de Uber (USD 617 M) por bloqueo de acceso a sec.gov; el dato proviene del resumen del buscador.
- No encontré el monto pagado por EasyPark por ParkMobile (2021), Flowbird (2025), Parkopedia (2025) ni Passport (2026): todos "no revelados".
- No encontré comisiones oficiales de ParkWhiz/FLASH a operadores, ni de Parclick, ni de YourParkingSpace, ni de Metropolis (modelo de operador integrado, no marketplace).
- No encontré cifras de GMV/ingresos oficiales de SpotHero ni ParkWhiz; solo estimaciones de bases de datos (Growjo, Dealroom) que no se citan por baja confiabilidad.
- No pude confirmar rentabilidad de SpotHero ni despidos 2023 (la búsqueda fue bloqueada por el límite de la sesión).

---

## 3. Producto lado operador: integración con barreras, LPR, QR, "modo attendant" e inventario

### Takeaway
Existen cuatro niveles de integración y todos los líderes los soportan simultáneamente: (1) **sin tecnología** — el conductor muestra el pase (QR/código) a un attendant o imprime el pase; (2) **QR en barrera** — escáner de código de barras del fabricante del PARCS (SKIDATA, DESIGNA, FLASH, etc.) lee el pase; (3) **QR fijo en letrero** para pago drive-up por placa (SpotHero Scan2Pay, Premium Parking TextPay/QR); (4) **LPR/ANPR** con sesión automática (EasyPark CamAccess, Flash Express Pay, Metropolis). El inventario en los marketplaces lo define el operador (capacidad asignada por horario) y el riesgo de sobreventa se mitiga con "garantía" y reembolso.

### Cited Findings
- SpotHero: los conductores entran/salen escaneando el QR de su Parking Pass en escáneres de la instalación ("Scan Barcode Here") — [SpotHero Blog](https://blog.spothero.com/how-to-parking-scanner-spothero); [SpotHero Touchless Parking](https://spothero.com/about/touchless-parking)
- SpotHero Scan2Pay (drive-up): letrero con QR → el conductor escanea, elige duración, ingresa placa y paga; se vende como forma de que los operadores "capturen más demanda" con una experiencia rápida y sin fricción — [SpotHero Operator Help](https://operator-help.spothero.com/en/articles/9346439-scan2pay-sell-secure-on-site-parking-reservations); [SpotHero – Operators](https://spothero.com/sell-parking/operators)
- SpotHero publica un "Seller FAQ" sobre cómo configurar el listado (requisitos para vender) — [SpotHero Seller FAQ (PDF)](https://blog.spothero.com/wp-content/uploads/2020/08/Updated-Seller-FAQs-1.pdf) (no pude leer el PDF; ver gaps)
- SKIDATA: integración de LPR y pago móvil; "scan-and-pay" vía QR sin app ni registro, para pagar antes de salir y "reducir la dependencia de efectivo, tarjetas y filas en la máquina de pago" — [SKIDATA blog](https://www.skidata.com/en-us/skidata-blog/parking-payments-lpr); [SKIDATA – Digital & Onsite Payment](https://www.skidata.com/en-nordics/solutions/mobility-parking/digital-onsite-payment)
- DESIGNA: producto "Barcode Scan&Go" para acceso por código de barras — [DESIGNA](https://designa.com/en-us/barcode-scango)
- EasyPark CamAccess: el operador instala cámaras; el usuario activa "automatic parking" en la app y la sesión inicia/termina por lectura de placa — [EasyPark Partners – CamAccess](https://www.easyparkpartners.com/our-services/easypark-camera-park); [EasyPark](https://www.easypark.com/en-nl/how-it-works/automatic-camera-parking); hito de integraciones con cámaras — [Parking Network](https://www.parking.net/parking-news/easypark-group/achieves-milestone); cooperación con APCOA (operador paneuropeo) para garajes sin contacto — [Parking Network](https://www.parking.net/parking-news/apcoa-and-easypark-group/way-to-contactless-parking-in-garages)
- Flash + ParkMobile "Express Pay" (Filadelfia): acceso y pago automáticos en garajes participantes — [Arrive newsroom](https://arrive.com/en/newsroom/press-release/arrive-and-flash-transform-philadelphia-parking-with-the-launch-of-express-pay)
- Flash: plataforma PARCS/"connected mobility" en más de 10,000 ubicaciones — [Statesman](https://www.statesman.com/story/business/2022/03/21/austins-parking-tech-flash-raises-250-million-giving-valuation/9453273002/)
- Metropolis: visión computacional para pago checkout-free; tras SP+ controla más de 4,200 ubicaciones — [Metropolis newsroom](https://www.metropolis.io/newsroom/metropolis-to-acquire-sp-plus); [Biometric Update](https://www.biometricupdate.com/202511/metropolis-secures-1-6b-to-bring-ai-recognition-platform-to-new-verticals)
- Premium Parking (gateless): LPR captura la placa al entrar; pago por app, TextPay (SMS al 504504) o QR; "frequently enforced" (fiscalización) — [BriefGlance](https://briefglance.com/articles/premium-parkings-gateless-revolution-from-new-orleans-to-national-scale); [New Orleans Mom](https://neworleansmom.com/in-and-around-new-orleans/local-businesses/how-to-park-like-a-pro-with-premium-parking-in-new-orleans/)
- ParkMobile ofrece a operadores "ParkMobile 360 Policy Management" y opera zonas para operadores privados (p. ej., Premium Parking zona 133) — [ParkMobile 360](https://parkmobile.io/parking-solutions/parkmobile-360/); [ParkMobile Support](https://support.parkmobile.io/hc/en-us/articles/36854918857499-New-Orleans-LA-Premium-Parking-Zone-Number-133)
- EasyPark ofrece un "Parking Dashboard" para ciudades y operadores — [EasyPark](https://www.easypark.com/en-se/cities-and-operators/our-services/easypark-parking-dashboard)
- JustPark: el host fija el precio con guías/sugerencias de la plataforma; publicar es gratis; hay un "owner agreement" formal — [JustPark Support – Pricing](https://support-uk.justpark.com/hc/en-gb/articles/5088348156817-Pricing-How-do-we-calculate-your-pricing); [JustPark Owner Agreement](https://www.justpark.com/owner-agreement); guía "primeros 30 días como host" — [JustPark Resource Centre](https://www.justpark.com/resource-centre/become-a-justpark-host-what-to-expect-in-your-first-30-days)
- Pitch a operadores sobre "visibilidad" como motor de ingresos de garajes — [Propmodo](https://propmodo.com/parking-visibility-tech-is-turning-garages-into-revenue-engines/)

### Inferences
- **"Modo attendant" (sin tecnología)**: el pase con QR/código de reserva + nombre del lote + placa, mostrado en pantalla al encargado, es el nivel 1 de todos los marketplaces; la existencia de guías como "How to Redeem" y "How to use a parking scanner" de SpotHero implica que la redención varía por lote y que la app debe mostrar **instrucciones específicas por ubicación** (lo que SpotHero hace con fotos de la entrada; no pude confirmar las fotos en esta sesión, ver gaps).
- **Integración con PARCS**: los grandes se integran con escáneres de barras de los fabricantes (SKIDATA, DESIGNA, FLASH, TIBA, Amano, HUB); un entrante en Guatemala puede empezar con un **código QR estándar (Code-128/QR) imprimible** que los escáneres genéricos lean, y pactar con el operador la validación manual mientras tanto.
- **Inventario**: los marketplaces trabajan con capacidad asignada por el operador (cupos por franja) y la "garantía" compensa la sobreventa; el drive-up por placa (Scan2Pay/TextPay) no necesita inventario porque el auto ya está dentro. Para el MVP, el modelo "cupos asignados + buffer + garantía/reembolso" es replicable sin sensores.

### Gaps
- No pude leer el Seller FAQ de SpotHero ni la página de operadores, por lo que **no verifiqué**: calendario de pagos (payouts), requisitos mínimos (seguro, horario, attendant), control de precios por el operador, política de oversell, ni la lista de vendors PARCS integrados (FLASH, TIBA, Skidata, Amano, HUB) — todo esto queda como gap.
- No encontré casos de estudio públicos de TIBA/Amano/HUB sobre integración con SpotHero o ParkWhiz (la búsqueda específica no arrojó resultados de TIBA).
- No encontré descripción pública del modelo de disponibilidad en tiempo real (ocupación) de los marketplaces de reserva (si usan conteo de barrera o solo cupos estáticos).

---

## 4. Patrones de UX lado conductor dignos de copiar

### Takeaway
El patrón dominante es: destino → mapa con precios → ficha del lote con "cómo redimir" → pago en un toque (Apple/Google Pay) → pase digital con QR y navegación; cancelación gratuita hasta el inicio y soporte telefónico/chat permanente. En drive-up, el patrón es escanear QR del letrero o teclear zona → placa → duración → pagar → extender desde el teléfono con recordatorio antes de vencer.

### Cited Findings
- SpotHero: cancelación hasta el minuto de inicio con reembolso total; reembolso al método original (tarjeta o PayPal) a elección del usuario; soporte "Customer Heroes" 7/365 — [SpotHero FAQ](https://spothero.com/faq); [SpotHero Blog](https://blog.spothero.com/cancel-spothero-reservation); [GetHuman](https://gethuman.com/customer-service/SpotHero/faq/What-is-SpotHero-s-refund-policy/HZM6aW)
- SpotHero publica guías "How SpotHero Works: What to Know Before You Park" y "Parking Made Easy: How to Redeem your SpotHero Reservation" — [SpotHero Blog](https://blog.spothero.com/how-spothero-works); [SpotHero Blog – Redeem](https://blog.spothero.com/redeem-spothero-reservation)
- Reseña independiente de SpotHero ("Is the stress-free parking legit?") — [Pilot Plans](https://www.pilotplans.com/blog/spothero-review); guía de disputas/reembolsos — [JoinChargeback](https://www.joinchargeback.com/refunds/how-to-get-an-spothero-refund)
- Scan2Pay: flujo de 4 pasos (escanear QR → duración → placa → pagar) — [SpotHero Operator Help](https://operator-help.spothero.com/en/articles/9346439-scan2pay-sell-secure-on-site-parking-reservations)
- Waze: al ingresar destino sugiere parqueos reservables con costo, amenidades, accesibilidad y valet; reservar, pagar y ser enrutado al lote con pase digital — [Tearsheet](https://tearsheet.co/payments/google-maps-and-waze-enable-users-to-make-contactless-payments-for-parking-and-fuel/)
- FLASH en Google/Waze: botón "Reserve & Save"/"Book Online" que abre checkout web con Apple Pay/Google Pay/tarjeta/cuenta — [Parking Network](https://www.parking.net/parking-news/flash/google-search-google-maps-and-now-waze)
- Google Maps: "Pay for Parking" al acercarse al destino; ingresar número de parquímetro y tiempo; pagar con Google Pay — [TechCrunch](https://techcrunch.com/2021/02/17/google-maps-users-can-now-pay-for-parking-or-their-transit-fare-right-from-the-app/embed/)
- EasyPark: "rueda rosada" para iniciar/extender/detener sesión en segundos; "Find" muestra calles con alta probabilidad de espacio; carga EV en la app — [ParkAppsHub](https://parkappshub.com/apps/easypark/)
- Premium Parking: texto 'park' al 504504 o QR; pago anticipado por app/web — [New Orleans Mom](https://neworleansmom.com/in-and-around-new-orleans/local-businesses/how-to-park-like-a-pro-with-premium-parking-in-new-orleans/)
- Apple Maps: marcador automático de "auto estacionado" al desconectar Bluetooth/CarPlay; filtros EV/accesibilidad/valet y fecha-hora en la integración SpotHero — [Apple Support](https://support.apple.com/en-us/101587); [MacRumors](https://www.macrumors.com/2023/01/09/apple-maps-parking-feature-spothero/)
- JustPark: guías de precio al host y centro de recursos; fee al conductor transparente (£0.69 o 12 % tope £1.99) — [JustPark Support](https://support-uk.justpark.com/hc/en-gb/articles/4416535659921-Transaction-Fee)
- Reseñas comparativas de apps (EasyPark 4.1/5; PayByPhone 3.8/5) — [ParkAppsHub EasyPark](https://parkappshub.com/apps/easypark/); [ParkAppsHub PayByPhone](https://parkappshub.com/apps/paybyphone/)
- Críticas de usuarios a SpotHero por fees poco visibles — [The Traveler](https://www.thetraveler.org/the-hidden-cost-of-using-spothero-for-parking-reservations/)

### Inferences
- "Cancelación gratuita hasta el inicio" es el estándar de confianza del marketplace; eliminarla reduce conversión. Para Guatemala, un MVP debería copiarlo y financiarlo con un buffer de inventario.
- La existencia de guías dedicadas a "cómo redimir" y a "cómo usar el escáner" indica que **la redención es el punto de mayor fricción**; la app debe mostrar por lote: tipo de acceso (attendant/QR/placa), foto de entrada, horario y qué hacer si la barrera no abre (botón de soporte).
- El checkout web sin app (FLASH en Google/Waze, SKIDATA scan-and-pay "sin app ni registro") sugiere que un **flujo web/QR sin descarga** es clave para la primera transacción; la app queda para retención (pases, recordatorios, vehículos guardados).
- Las quejas sobre fees ocultos (SpotHero) y retención de fondos a hosts (JustPark) muestran que la **transparencia de fees** en ambos lados es un diferenciador barato.

### Gaps
- No pude confirmar de fuente primaria que SpotHero/ParkWhiz muestren fotos de la entrada y "redemption instructions" en la ficha del lote (es práctica conocida, pero sus páginas estaban bloqueadas).
- No encontré datos de "tiempo a primera reserva" ni tasas de conversión publicadas.
- No encontré información sobre chat en app vs. teléfono para ParkMobile/EasyPark/PayByPhone.

---

## 5. Fracasos y lecciones (valet on-demand, pivotes, P2P)

### Takeaway
Los fracasos documentados caen en tres categorías: **valet on-demand** (Luxe, Zirx, Vatler, Caarbon, Valet Anywhere) por economía unitaria imposible (dos movimientos de mano de obra por transacción, valets pagados en tiempo ocioso, sin descuentos de garajes, impuestos/permisos); **pivotes forzados** (ParkJockey → REEF, hacia cocinas fantasma, con ~USD 1 B de SoftBank/Mubadala); y **marketplaces P2P de entradas de casa** que cierran o se venden a plataformas más grandes (Pavemint cerrada; Parkhound absorbida por Spacer; YourParkingSpace y JustPark sobrevivieron solo al agregar parqueos comerciales y B2B). También desaparecen apps "solo datos" (INRIX ParkMe retirada en 2025).

### Cited Findings
- Zirx cerró su negocio de consumo por mala economía unitaria y por no diversificar su base de clientes; quemaba efectivo pagando a legiones de valets incluso en tiempo de espera, y no lograba descuentos significativos de los garajes porque no falta demanda para los espacios limitados; pivotó a mover autos para empresas (abril 2016) — [TechCrunch](https://techcrunch.com/2016/04/11/as-on-demand-startups-fizzle-zirx-moves-cars-for-other-companies-not-individuals/); [Detroit News](https://www.detroitnews.com/story/business/autos/2016/03/15/demand-valet-parking-seemed-like-good-idea/81829750/)
- Luxe falló porque la app no podía eliminar los dos movimientos humanos de cada transacción de valet (estacionar y recuperar el auto) — [GetValetParking – Luxe](https://getvaletparking.com/blog/what-happened-to-luxe-valet-the-rise-and-fall-of-on-demand-parking/); [Wikipedia – Luxe](https://en.wikipedia.org/wiki/Luxe_(company)) (no accesible en esta sesión)
- Zirx concluyó antes que el resto del mercado que el valet puerta a puerta daba gran experiencia pero "la matemática de mano de obra, parqueo, responsabilidad civil y densidad no funcionaba" al precio que paga el consumidor — [GetValetParking – Zirx](https://getvaletparking.com/blog/what-happened-to-zirx-the-on-demand-valet-startup-in-retrospect/)
- Vatler enfrentó obstáculos regulatorios, incluido un impuesto al parqueo de 25 % y múltiples permisos — [Sunset – Vatler](https://www.sunsethq.com/blog/why-did-vatler-fail)
- Dos startups (Caarbon y Vatler) implosionaron rápido y tres más (Luxe, Zirx y Valet Anywhere) abandonaron el modelo on-demand; no hay hoy apps de valet puerta a puerta para consumo en EE. UU. a la escala de 2015–2016 — [Detroit News](https://www.detroitnews.com/story/business/autos/2016/03/15/demand-valet-parking-seemed-like-good-idea/81829750/); [GetValetParking](https://getvaletparking.com/blog/what-happened-to-luxe-valet-the-rise-and-fall-of-on-demand-parking/)
- Análisis de inversor sobre el cierre del valet de consumo de Zirx ("Ripe for disruption or doomed for failure?") — [Medium – @Bgsheng](https://medium.com/@Bgsheng/thoughts-on-zirx-shutdown-of-consumer-valet-service-b9b5b8c1f21a)
- ParkJockey: el 3-dic-2018 SoftBank y Mubadala compraron participaciones por un total aproximado de USD 800 M–1 B; en junio 2019 se relanzó como REEF Technology y desde 2019 pasó de "pure parking" a "hubs multipropósito" (cocinas fantasma, micromovilidad, etc.) en sus lotes — [Smart Cities Dive](https://www.smartcitiesdive.com/news/reef-to-turn-parking-garages-into-on-demand-economy-hubs/557532/); [Parking Network](https://www.parking.net/parking-news/reef-technology-transform-parking-facilities-multipurpose-hubs); [WLRN](https://www.wlrn.org/2022-01-17/from-parking-lots-to-ghost-kitchens-how-reef-technology-is-changing-the-restaurant-business-and-regulations); [ValueTheMarkets](https://www.valuethemarkets.com/analysis/reef-technology-from-parking-lot-automation-to-urban-saviour)
- Pavemint (P2P) cerró sin explicación; sitio caído desde agosto 2024 — [SideHusl](https://sidehusl.com/pavemint/)
- INRIX ParkMe retirada de Google Play (14-may-2025), sin actualizaciones desde feb 2024 — [AppBrain](https://www.appbrain.com/app/inrix-parkme/com.parkme.consumer)
- Parkhound (P2P, 55,000 miembros) fue absorbida por Spacer en 2017 — [SBS](https://www.sbs.com.au/news/spacer-buys-online-parking-platform)
- YourParkingSpace empezó como P2P (2013) y sobrevivió al incorporar parqueos comerciales, suscripciones y EV, hasta venderse a Flowbird — [Parking Network](https://www.parking.net/parking-news/flowbird/acquires-yourparkingspace-the-uks-leading-pre-book-and-subscription-marketplace)
- JustPark nació como ParkatmyHouse (P2P) y hoy su crecimiento viene del B2B/eventos (ParkHub) — [CB Insights](https://www.cbinsights.com/company/parkatmyhousecom); [Dallas Innovates](https://dallasinnovates.com/dallas-based-parkhub-rebrands-as-justpark-following-2024-u-k-merger/)
- SpotHero no levantó capital desde 2019 hasta venderse en 2026 — [CNBC](https://www.cnbc.com/2026/02/23/uber-acquiring-spothero.html)

### Inferences
- **No incluir valet on-demand** en el MVP: la evidencia muestra que la mano de obra por transacción destruye el margen y los garajes no otorgan descuentos cuando tienen demanda propia.
- El **"chicken-and-egg"** se resolvió en los casos exitosos (SpotHero, ParkWhiz, Parclick) agregando inventario comercial (operadores) antes que P2P; los P2P puros (Pavemint, Parkhound, Spot) no alcanzaron densidad. Para Guatemala: priorizar operadores comerciales y lotes de alta demanda (zona 10, 4, 9, centros comerciales, eventos, aeropuerto) sobre entradas de casa.
- Los márgenes bajos empujan a los sobrevivientes a **B2B/SaaS** (JustPark-ParkHub, Passport, Wayleadr) o a ser adquiridos por quien posee la demanda (Uber) o el cobro (Arrive, Metropolis).

### Gaps
- No pude investigar "Spot" (P2P Boston) por límite de búsquedas.
- No encontré cifras de fraude/no-shows publicadas por ninguna plataforma.
- No encontré el monto exacto de capital quemado por Luxe/Zirx (Wikipedia bloqueada).

---

## 6. Métricas, KPIs y "pain points" de operadores que citan las empresas

### Takeaway
Las cifras públicas son de escala (transacciones/año, volumen de pagos, ubicaciones, usuarios), no de eficiencia (tasa de repetición, conversión). Órdenes de magnitud: PayByPhone 200 M+ transacciones/año (2023), Passport 117 M (2025), Flash USD 1 B+/año en transacciones y 11 M conductores/mes (2022), Metropolis USD 5 B/año en pagos (2025), JustPark+ParkHub USD 1 B+ acumulado en reservas. El pitch a operadores gira en torno a "capturar más demanda", reducir efectivo y filas, y visibilidad/ingresos adicionales.

### Cited Findings
- SpotHero: 13,000+ ubicaciones, 400+ ciudades (feb 2026); precio de venta USD 617 M (abr 2026) — [CNBC](https://www.cnbc.com/2026/02/23/uber-acquiring-spothero.html); [Uber 10-Q](https://www.sec.gov/Archives/edgar/data/0001543151/000154315126000032/uber-20260630.htm)
- Flash: 10,000+ ubicaciones, 11 M conductores/mes, USD 1 B+ transacciones anuales (2022) — [Statesman](https://www.statesman.com/story/business/2022/03/21/austins-parking-tech-flash-raises-250-million-giving-valuation/9453273002/)
- Waze: 30,000 ubicaciones reservables en Norteamérica — [Tearsheet](https://tearsheet.co/payments/google-maps-and-waze-enable-users-to-make-contactless-payments-for-parking-and-fuel/)
- ParkMobile: 66 M+ usuarios registrados; 700+ ciudades — [ParkMobile](https://parkmobile.io/zone-parking/)
- EasyPark: 4,400+ ciudades, 20+ países — [ParkAppsHub](https://parkappshub.com/apps/easypark/)
- PayByPhone: 200 M+ transacciones (2023); 110 M+ descargas; 1,300+ ciudades/operadores — [Corpay](https://www.corpay.com/corporate-newsroom/16996/fleetcor-acquires-paybyphone-a-global-digital-parking-company); [PayByPhone](https://www.paybyphone.com/press-articles/lightyear-capital-signs-agreement-to-acquire-paybyphone)
- Passport: 117 M transacciones (2025); USD 4.8 B acumulados — [Passport News](https://www.passportinc.com/news/)
- Metropolis: USD 5 B volumen anual de pagos; 4,200+ ubicaciones; 23,000 empleados; SP+ aportó 3,300 ubicaciones y 20,000 empleados — [Biometric Update](https://www.biometricupdate.com/202511/metropolis-secures-1-6b-to-bring-ai-recognition-platform-to-new-verticals); [Metropolis newsroom](https://www.metropolis.io/newsroom/metropolis-closes-acquisition-of-sp-plus)
- JustPark+ParkHub: 20 M+ conductores, 500+ clientes B2B, USD 1 B+ en volumen de reservas — [JustPark](https://www.justpark.com/business/blog/parkhub-and-justpark-agree-to-merge)
- YourParkingSpace: 5 M+ conductores, 85,000 proveedores — [Parking Network](https://www.parking.net/parking-news/flowbird/acquires-yourparkingspace-the-uks-leading-pre-book-and-subscription-marketplace)
- Parclick: 500+ ciudades, 9 países; "hasta 70 % de descuento" (pitch de precio al conductor; implica venta de inventario ocioso con descuento) — [Parclick](https://parclick.es/about-us)
- Pain points en el pitch a operadores: SpotHero Scan2Pay "capture more demand"; SKIDATA "reduce la dependencia de efectivo, tarjetas y largas filas en la máquina de pago"; Propmodo "la visibilidad convierte garajes en motores de ingresos" — [SpotHero Operators](https://spothero.com/sell-parking/operators); [SKIDATA](https://www.skidata.com/en-us/skidata-blog/parking-payments-lpr); [Propmodo](https://propmodo.com/parking-visibility-tech-is-turning-garages-into-revenue-engines/)
- Premium Parking enfatiza enforcement ("frequently enforced") como parte del modelo gateless — [New Orleans Mom](https://neworleansmom.com/in-and-around-new-orleans/local-businesses/how-to-park-like-a-pro-with-premium-parking-in-new-orleans/)

### Inferences
- **Ticket promedio implícito**: Passport USD 4.8 B acumulados vs. ~117 M transacciones/año sugiere tickets de pocos dólares en vía pública; Flash USD 1 B/año sobre 11 M conductores/mes (~132 M sesiones/año) implica ~USD 7–8 por transacción off-street. Para Guatemala, con tarifas de Q10–Q40/hora, el ticket será bajo y el **fee fijo por transacción** pesa más que el porcentaje: diseñar la monetización con mínimos (p. ej., Q2–Q5 por reserva).
- Ningún líder publica tasa de repetición ni take rate; el "15–25 %" que circula es estimación de terceros. Tratarlo como hipótesis a validar con operadores locales.
- Los pain points que vende la industria (efectivo, filas, lotes vacíos fuera de pico, visibilidad) son directamente aplicables a Guatemala, donde el cobro en efectivo con attendant es la norma.

### Gaps
- No encontré KPIs de eficiencia (repeat rate, reservas por usuario, conversión, CAC) de ninguna empresa.
- No encontré el número de reservas anuales de SpotHero ni ParkWhiz.

---

## 7. Stacks tecnológicos públicos (mobile, backend, mapas, pagos)

### Takeaway
Solo SpotHero documenta su stack en detalle: monolito Django/Python/PostgreSQL migrando a "monolito modular" con DDD, Kafka para eventos de dominio, gRPC entre servicios, Docker/Kubernetes, Concourse CI/CD, OpenTelemetry, y squads por dominio (Money, Operator Panel, Hero Tools, Data Engineering, Platform). Para EasyPark solo hay señales de ofertas de empleo (Kotlin/Java Spring, TypeScript, React). No encontré confirmación pública del proveedor de mapas ni del procesador de pagos de ninguna app, ni si usan nativo vs. React Native/Flutter.

### Cited Findings
- SpotHero backend: monolito Django/Python/PostgreSQL; frameworks Django y OpenTelemetry; migrando a monolito modular con Domain Driven Design; Kafka para publicación asíncrona de eventos de dominio; gRPC para comunicación sincrónica entre servicios; Docker y despliegues en Kubernetes; Concourse para CI/CD; GitHub para control de versiones; Jinja + HTML/JS/CSS en herramientas internas — [SpotHero Tech Blog – Hero Tools Squad](https://medium.com/spothero-technology-blog/hero-tools-squad-at-spothero-62e389af0301); [Operator Panel Squad](https://medium.com/spothero-technology-blog/operator-panel-squad-at-spothero-45ebc2f54266); [Platform Engineering Squad](https://medium.com/spothero-technology-blog/platform-engineering-squad-at-spothero-5e1d5c8a7174); [Data Engineering at SpotHero](https://technology.spothero.com/2022/10/20/%EF%BF%BCdata-engineering-blog-post/); [Money Squad](https://medium.com/spothero-technology-blog/money-squad-at-spothero-beeb063d4cf0); [SpotHero careers – engineering](https://spothero.com/careers-engineering)
- SpotHero organiza ingeniería por "squads" de dominio: Money (pagos), Operator Panel (producto para operadores), Hero Tools (herramientas internas de soporte), Data Engineering, Platform Engineering — mismas fuentes del Tech Blog
- EasyPark (ofertas de empleo): backend en Kotlin y Java/Spring, microservicios, React; el stack "se desplaza hacia TypeScript/JavaScript" — [freehire – Software Engineer II EasyPark](https://freehire.me/jobs/software-engineer-ii-easypark-ba663jmh); [MeetFrank – Backend EasyPark](https://meetfrank.com/jobs/easypark/backend-software-engineer) (fuentes débiles: anuncios de empleo)
- ParkMobile Android usa el paquete `net.sharewire.parkmobilev2` (Sharewire fue el desarrollador original) y la app europea EasyPark usa el paquete `com.parkmobile` (herencia de Parkmobile Group Europa) — [Google Play – ParkMobile](https://play.google.com/store/apps/details?id=net.sharewire.parkmobilev2&hl=en_US); [AppBrain – EasyPark (com.parkmobile)](https://www.appbrain.com/app/easypark/com.parkmobile)
- Metropolis: visión computacional/IA para identificar vehículos y cobrar sin checkout; adquirió Oosto (visión/biometría) para reforzar la tecnología — [TechCrunch](https://techcrunch.com/2025/01/20/sources-ai-vision-startup-metropolis-is-buying-oosto-formerly-known-as-anyvision-for-just-125m/)
- FLASH: checkout web alojado con Apple Pay, Google Pay y tarjeta — [Parking Network](https://www.parking.net/parking-news/flash/google-search-google-maps-and-now-waze)
- SpotHero acepta tarjeta y PayPal (los reembolsos regresan al método original) — [SpotHero FAQ](https://spothero.com/faq)
- Guías de terceros sobre "costo de desarrollar una app tipo SpotHero" (útiles para arquitectura de referencia, no como fuente de stack real) — [Appinventiv](https://appinventiv.com/blog/cost-of-car-parking-app-development/); [Concetto Labs](https://www.concettolabs.com/blog/cost-of-developing-parking-app-like-spothero/); [A3Logics](https://www.a3logics.com/blog/spothero-like-parking-app-development-cost/)
- Existe un scraper comercial de tarifas y disponibilidad de SpotHero (indica que la API pública/web expone precios y disponibilidad por lote) — [Apify](https://apify.com/automation-lab/spothero-parking-rates-availability)

### Inferences
- Un **monolito Python/Django + PostgreSQL** fue suficiente para que SpotHero llegara a 13,000 lotes y una venta de USD 617 M; la modularización y Kafka llegaron después. Para un MVP en Guatemala, un monolito bien estructurado (Django/Rails/NestJS) con PostgreSQL + PostGIS y una cola simple es coherente con la evidencia.
- La estructura de squads de SpotHero revela los **dominios del producto**: pagos/payouts (Money), panel de operador, herramientas de soporte (Hero Tools) y datos; es un buen mapa de módulos para el backlog.
- Que SpotHero acepte PayPal además de tarjeta y que FLASH use Apple/Google Pay sugiere que la integración con wallets es tabla de juego en EE. UU.; en Guatemala el equivalente son tarjetas locales (Visanet/Credomatic), Apple/Google Pay donde esté disponible, y potencialmente billeteras locales.

### Gaps
- No encontré el proveedor de mapas (Google Maps Platform vs. Mapbox) de ninguna app.
- No encontré el procesador de pagos (Stripe/Braintree/Adyen) de ninguna app; el artículo "Money Squad" de SpotHero podría contenerlo pero no fue accesible.
- No encontré confirmación de si las apps móviles son nativas (Swift/Kotlin) o multiplataforma (React Native/Flutter).
- No encontré blogs de ingeniería de ParkMobile, JustPark, PayByPhone ni EasyPark (solo anuncios de empleo).
