/**
 * Source-backed bilingual engineering case studies.
 * Every claim is bounded by public code or explicitly labeled as private.
 * Rendered at build time: no translation by string replacement of HTML.
 */
const L=(en,es)=>({en,es});
const repo="https://github.com/natanaelprogimo-afk/portfolio";
const cases=[
 {
  id:"python-csv", group:"public",
  title:L("Python CSV reconciliation","Conciliación de CSV con Python"),
  kind:L("PUBLIC SOURCE / LOCAL CLI","CÓDIGO PÚBLICO / HERRAMIENTA LOCAL"),
  status:L("Source and automated tests","Código y pruebas automáticas"),
  intro:L("A command-line program compares two synthetic product catalogs, validates the inputs and exports an inspectable CSV report. This is independent sample code, not a client deployment.","Un programa de consola compara dos catálogos ficticios, valida las entradas y exporta un informe CSV verificable. Es código de muestra independiente, no una implantación en un cliente."),
  problem:L("Comparing feeds by product identifier can conceal duplicate records, malformed prices and misleading spreadsheet output.","Comparar archivos por identificador de producto puede ocultar duplicados, precios inválidos y resultados inseguros al abrirlos en hojas de cálculo."),
  approach:[
   L("Python standard library only; explicit input headers and validation.","Solo biblioteca estándar de Python; cabeceras obligatorias y validaciones explícitas."),
   L("Decimal arithmetic and deterministic match, mismatch, missing and extra states.","Aritmética Decimal y estados deterministas de coincidencia, diferencia, faltante y adicional."),
   L("Safeguards against duplicate identifiers and spreadsheet formula injection.","Protecciones ante identificadores duplicados e inyección de fórmulas en hojas de cálculo.")
  ],
  verification:[L("Fictional fixtures and unit tests are included in the public repository.","El repositorio público incluye datos ficticios y pruebas unitarias.")],
  limitations:[L("Loads small CSV inputs in memory. No exchange rates, taxes, online API, payments or customer data.","Carga CSV pequeños en memoria. Sin tipos de cambio, impuestos, API en línea, pagos ni datos de clientes.")],
  command:"python examples/csv/reconcile.py --feed examples/csv/fixtures/feed.csv --observed examples/csv/fixtures/observed.csv --output report.csv",
  tags:["Python","CSV","Decimal","unittest"],
  links:[
    {label:L("Source, fixtures and tests","Código, datos y pruebas"),href:repo+"/tree/main/examples/csv"},
    {label:L("Run separate browser CSV demo","Probar demo CSV independiente"),href:"LAB"}
  ]
 },
 {
  id:"python-api",group:"public",
  title:L("Local Python HTTP API","API HTTP local en Python"),
  kind:L("PUBLIC SOURCE / BACKEND","CÓDIGO PÚBLICO / BACKEND"),
  status:L("Source and unit tests","Código y pruebas unitarias"),
  intro:L("A localhost-only HTTP/SQLite service example demonstrates request validation, deterministic responses, idempotency handling and tests. It is not a hosted production API.","Un ejemplo de servicio HTTP/SQLite local demuestra validación de solicitudes, respuestas deterministas, idempotencia y pruebas. No es una API de producción alojada."),
  problem:L("Retries and invalid requests can make backend state inconsistent if operations do not define reliable behavior.","Los reintentos y solicitudes inválidas pueden dejar un backend inconsistente si sus operaciones no definen comportamientos fiables."),
  approach:[
   L("Local HTTP request handling with explicit validation and response semantics.","Gestión local de solicitudes HTTP con validaciones y respuestas explícitas."),
   L("SQLite persistence and documented idempotency behavior.","Persistencia SQLite y comportamiento de idempotencia documentado."),
   L("Reproducible unit tests, including edge cases and concurrency exercises.","Pruebas unitarias reproducibles, incluidos casos límite y ejercicios de concurrencia.")
  ],
  verification:[L("Implementation, tests and setup instructions are available in GitHub.","La implementación, las pruebas y las instrucciones están disponibles en GitHub.")],
  limitations:[L("Educational localhost service. Not a hosted SaaS, a customer integration or a verified security-certified backend.","Servicio educativo local. No es un SaaS alojado, una integración de cliente ni un backend certificado.")],
  tags:["Python","HTTP","SQLite","unittest"],
  links:[
    {label:L("Inspect Python API and tests","Revisar API Python y pruebas"),href:repo+"/tree/main/examples/backend"},
    {label:L("Try separate idempotency simulator","Probar simulador independiente de idempotencia"),href:"LAB_RETRY"}
  ]
 },
 {
  id:"portfolio",group:"public",
  title:L("Bilingual React portfolio","Portafolio bilingüe en React"),
  kind:L("PUBLISHED SITE / OPEN SOURCE","SITIO PUBLICADO / CÓDIGO ABIERTO"),
  status:L("Live website and source","Sitio publicado y código"),
  intro:L("This website is a public React/TypeScript project with bilingual static routes, a responsive interface, source-backed engineering examples and quality gates on GitHub Actions.","Este sitio es un proyecto público React/TypeScript con rutas estáticas bilingües, interfaz adaptable, ejemplos técnicos verificables y controles de calidad en GitHub Actions."),
  problem:L("Recruiters should find practical proof quickly without confusing private prototypes with commercial deployments.","Los reclutadores deben encontrar pruebas prácticas rápidamente sin confundir prototipos privados con despliegues comerciales."),
  approach:[
   L("React components, TypeScript, Vite and responsive CSS with semantic HTML.","Componentes React, TypeScript, Vite y CSS adaptable con HTML semántico."),
   L("Separate canonical EN/ES URLs and multilingual content built as HTML.","URL canónicas EN/ES independientes y contenido multilingüe generado como HTML."),
   L("Browser interaction tests, Python/Node checks and axe-core automated accessibility audits.","Pruebas de interacción en navegador, verificaciones Python/Node y auditorías automáticas axe-core.")
  ],
  verification:[L("Read the public source, CI workflows, demos and current implementation.","Se pueden revisar el código público, los flujos CI, las demostraciones y la implementación actual.")],
  limitations:[L("Automated accessibility checks are not an independent WCAG certificate. There are no claimed conversion or revenue results.","Las pruebas automáticas de accesibilidad no constituyen certificación WCAG. No se atribuyen resultados de conversiones ni ingresos.")],
  tags:["React","TypeScript","Vite","Accessibility"],
  links:[
    {label:L("Inspect website source","Revisar código del sitio"),href:repo},
    {label:L("Try public engineering lab","Probar laboratorio público"),href:"LAB"}
  ]
 },
 {
  id:"client-websites",group:"experience",
  title:L("Websites for two local businesses","Sitios web para dos negocios"),
  kind:L("COMPLETED WORK / REFERENCES PENDING","TRABAJO TERMINADO / REFERENCIAS PENDIENTES"),
  status:L("2 completed websites reported","2 sitios web declarados terminados"),
  intro:L("Two completed websites: one for a dental practice and one for a paint retailer. Public screenshots, customer references and performance results have not been approved for publication.","Dos sitios web terminados: uno para una clínica dental y otro para una tienda de pinturas. No hay capturas, referencias ni resultados de rendimiento autorizados para publicación."),
  problem:L("Translate distinct business information needs into clear, navigable responsive websites.","Convertir necesidades informativas comerciales distintas en sitios web claros, navegables y adaptables."),
  approach:[L("End-to-end development with responsive layouts and practical information architecture.","Desarrollo completo con diseños adaptables y arquitectura de información práctica.")],
  verification:[L("These projects are reported as completed; public URLs or independent proof are currently unavailable.","Estos proyectos se declaran terminados; actualmente no hay URL ni prueba pública independiente.")],
  limitations:[L("No screenshots, client names, testimonials or measured outcomes are presented without permission.","No se publican capturas, nombres de clientes, testimonios ni cifras sin autorización.")],
  tags:["Frontend","Responsive UI","Client work"],
  links:[{label:L("Ask about permitted references","Consultar referencias autorizadas"),href:"MAIL_REFERENCES"}]
 },
 {
  id:"catalog-integrity",group:"experience",
  title:L("Catalog Integrity Engine","Catalog Integrity Engine"),
  kind:L("PRIVATE / INTERNAL PROTOTYPE","PRIVADO / PROTOTIPO INTERNO"),
  status:L("Internal prototype","Prototipo interno"),
  intro:L("Private work investigating differences between product feeds and observed catalog records; public CSV examples are independent implementations.","Trabajo privado para detectar diferencias entre catálogos y registros observados; los ejemplos públicos de CSV son implementaciones independientes."),
  problem:L("Data drift between feeds makes product information inconsistent.","Las diferencias entre fuentes producen información de productos inconsistente."),
  approach:[L("Define deterministic comparison keys and explicit mismatch classifications.","Definir claves de comparación deterministas y clasificación explícita de diferencias.")],
  verification:[L("A separate public CSV lab demonstrates a related principle with fictional inputs.","Un laboratorio CSV público e independiente demuestra un principio relacionado con entradas ficticias.")],
  limitations:[L("No production adoption, customer deployments or commercial revenue is claimed.","No se afirma adopción productiva, despliegues de clientes ni ingresos comerciales.")],
  tags:["Data validation","TypeScript","Cloudflare","Apify"],
  links:[{label:L("Try independent CSV example","Probar ejemplo CSV independiente"),href:"LAB_CATALOG"}]
 },
 {
  id:"ai-automation",group:"experience",
  title:L("AI Automation Factory","AI Automation Factory"),
  kind:L("PRIVATE / IN DEVELOPMENT","PRIVADO / EN DESARROLLO"),
  status:L("Private engineering work","Desarrollo privado"),
  intro:L("A private agent-oriented development effort exploring API workflows, controlled actions, explicit approvals and operational visibility.","Un desarrollo privado orientado a agentes que explora flujos API, acciones controladas, aprobaciones explícitas y visibilidad operativa."),
  problem:L("Agent workflows with side effects need authorization boundaries, retry rules and traceability.","Los agentes que ejecutan acciones externas necesitan límites de autorización, reglas de reintentos y trazabilidad."),
  approach:[L("Design around approvals, execution state, idempotency and observable operations.","Diseño con aprobaciones, estados de ejecución, idempotencia y operaciones observables.")],
  verification:[L("The independent public idempotency simulator is an educational analog, not the private product.","El simulador público de idempotencia es un ejemplo educativo independiente, no el producto privado.")],
  limitations:[L("Source and credentials are private. No verified customer adoption, certification or production SLA.","Código y credenciales privados. Sin adopción verificada, certificación ni SLA productivo.")],
  tags:["Python","FastAPI","Agents","Observability"],
  links:[{label:L("Try separate retry simulation","Probar simulación independiente de reintentos"),href:"LAB_RETRY"}]
 },
 {
  id:"vyra-fitness",group:"experience",
  title:L("VYRA Fitness","VYRA Fitness"),
  kind:L("PRIVATE / DESIGN AND TESTING","PRIVADO / DISEÑO Y PRUEBAS"),
  status:L("Unreleased application","Aplicación sin publicar"),
  intro:L("An all-in-one fitness application under design and testing, bringing workouts, nutrition, hydration and progress tracking together.","Aplicación integral de fitness en diseño y pruebas que reúne entrenamientos, nutrición, hidratación y seguimiento del progreso."),
  problem:L("Keep multiple tracking journeys understandable across mobile screens.","Mantener comprensibles distintas funciones de seguimiento en pantallas móviles."),
  approach:[L("Reusable cross-platform UI and data-backed flow design.","Interfaz multiplataforma reutilizable y diseño de flujos con persistencia.")],
  verification:[L("Development work remains private; app-store publication is not claimed.","El desarrollo continúa privado; no se afirma publicación en tiendas.")],
  limitations:[L("No published app, public screenshot or verified real-user metrics are claimed.","No se afirma una app publicada, capturas públicas ni métricas verificadas de usuarios reales.")],
  tags:["React Native","Expo","TypeScript","Supabase"],
  links:[{label:L("Discuss implementation scope","Consultar el alcance técnico"),href:"MAIL_FITNESS"}]
 }
];
const escapeHtml=s=>String(s).replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#39;");
const tr=(item,language)=>typeof item==="string"?item:item[language];
const label=(language,en,es)=>language==="es"?es:en;
function resolveHref(href,language,base) {
 if(href==="LAB")return base+language+"/labs/";
 if(href==="LAB_CATALOG")return base+language+"/labs/#catalog";
 if(href==="LAB_RETRY")return base+language+"/labs/#retry";
 if(href==="MAIL_REFERENCES")return "mailto:moralesalerson@gmail.com?subject="+encodeURIComponent(label(language,"Website project references","Referencias de proyectos web"));
 if(href==="MAIL_FITNESS")return "mailto:moralesalerson@gmail.com?subject="+encodeURIComponent(label(language,"VYRA Fitness technical discussion","Consulta técnica sobre VYRA Fitness"));
 return href;
}
function article(item,language,base){
 const txt=s=>escapeHtml(tr(s,language));
 const line=arr=>arr.map(s=>"<li>"+txt(s)+"</li>").join("");
 const publicCase=item.group==="public";
 const limitation=line(item.limitations);
 const safeHref=link=>escapeHtml(resolveHref(link.href,language,base));
 return [
 '<article class="case" id="'+item.id+'" data-evidence="'+(publicCase?"public":"private")+'">',
 '<div class="case-head"><div><span class="case-kicker">'+txt(item.kind)+'</span><h3>'+txt(item.title)+'</h3></div><span class="status '+(publicCase?"":"status--private")+'">'+txt(item.status)+'</span></div>',
 '<p class="case-description">'+txt(item.intro)+'</p>',
 '<div class="proof-detail">',
 '<section class="card"><h4>'+label(language,"Engineering problem","Problema de ingeniería")+'</h4><p>'+txt(item.problem)+'</p><h4 style="margin-top:20px">'+label(language,"Implementation decisions","Decisiones de implementación")+'</h4><ul>'+line(item.approach)+'</ul></section>',
 '<section class="card"><h4>'+label(language,"Verifiable evidence","Evidencia verificable")+'</h4><ul>'+line(item.verification)+'</ul><h4 style="margin-top:20px">'+label(language,"Scope and limitations","Alcance y limitaciones")+'</h4><ul>'+limitation+'</ul></section>',
 '</div>',
 item.command?'<pre class="code-command"><code>$ '+escapeHtml(item.command)+'</code></pre>':"",
 '<div class="stack">'+item.tags.map(s=>"<span>"+escapeHtml(s)+"</span>").join("")+'</div>',
 '<div class="case-links">'+item.links.map(link=>'<a href="'+safeHref(link)+'"'+(link.href.startsWith("https:")?' target="_blank" rel="noopener noreferrer"':"")+'>'+txt(link.label)+' <span aria-hidden="true">↗</span></a>').join("")+'</div>',
 '</article>'
 ].join("");
}
export function renderCases(language,base){
 if(language!=="en"&&language!=="es")throw Error("unsupported locale");
 const p=base+language+"/";
 const publicCases=cases.filter(item=>item.group==="public");
 const others=cases.filter(item=>item.group!=="public");
 const groups=[
  '<section class="case-group" id="public-proof" aria-labelledby="public-heading">',
  '<div class="case-group-heading"><div><span class="kicker">'+label(language,"01 / REPRODUCIBLE PUBLIC WORK","01 / TRABAJO PÚBLICO REPRODUCIBLE")+'</span><h2 id="public-heading">'+label(language,"Engineering you can verify","Ingeniería que puedes verificar")+'</h2><p>'+label(language,"Source code, executable steps and explicit limitations. These are independent examples, not claimed client deployments.","Código, instrucciones de ejecución y limitaciones explícitas. Son ejemplos independientes, no despliegues de clientes.")+'</p></div></div>',
  publicCases.map(x=>article(x,language,base)).join(""),'</section>',
  '<section class="case-group" id="experience" aria-labelledby="experience-heading">',
  '<div class="case-group-heading"><div><span class="kicker">'+label(language,"02 / EXPERIENCE AND PRIVATE WORK","02 / EXPERIENCIA Y TRABAJO PRIVADO")+'</span><h2 id="experience-heading">'+label(language,"Completed work and projects in progress","Trabajo terminado y proyectos en desarrollo")+'</h2><p>'+label(language,"Completed client websites are disclosed separately from private prototypes and unreleased software.","Los sitios terminados para clientes se distinguen de los prototipos privados y del software sin publicar.")+'</p></div></div>',
  others.map(x=>article(x,language,base)).join(""),'</section>'
 ].join("");
 const navLink=(href,en,es)=>'<a href="'+escapeHtml(href)+'">'+label(language,en,es)+'</a>';
 const index=cases.map(x=>'<a href="#'+x.id+'">'+escapeHtml(tr(x.title,language))+'</a>').join("");
 return [
 '<!doctype html><html lang="'+language+'"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="color-scheme" content="dark">',
 '<meta name="theme-color" content="#080d13"><meta name="description" content="'+label(language,"Inspectable Python, API and frontend engineering case studies by Alerson Morales.","Casos de ingeniería verificables de Python, API y frontend de Alerson Morales.")+'">',
 '<title>'+label(language,"Engineering Case Studies | Alerson Morales","Casos de ingeniería | Alerson Morales")+'</title>',
 '<link rel="icon" href="'+base+'favicon.svg" type="image/svg+xml"><link rel="stylesheet" href="'+base+'cases.css">',
 '</head><body>',
 '<a class="skip-link" href="#main">'+label(language,"Skip to content","Saltar al contenido")+'</a>',
 '<header class="top container"><a class="brand" href="'+p+'">AM. / '+label(language,"ENGINEERING CASES","CASOS TÉCNICOS")+'</a>',
 '<nav aria-label="'+label(language,"Case navigation","Navegación de casos")+'">',
 navLink(p,"Portfolio","Portafolio"),navLink(p+"labs/","Interactive lab","Laboratorio interactivo"),
 navLink(p+"hiring/","Recruiter brief","Perfil para reclutadores"),
 navLink(base+"resume-"+language+".pdf","Résumé PDF","Currículum PDF"),
 '</nav></header>',
 '<main class="container" id="main" tabindex="-1">',
 '<div class="mast"><span class="kicker">'+label(language,"SOURCE / TESTS / SCOPE","CÓDIGO / PRUEBAS / ALCANCE")+'</span>',
 '<h1>'+label(language,"Proof before promises.","Pruebas antes que promesas.")+'</h1>',
 '<p>'+label(language,"Three public case studies lead with source and tests. Private VYRA software and client work remain clearly labeled, with no unverified screenshots or results.","Tres casos públicos comienzan por código y pruebas. El software privado VYRA y los trabajos para clientes están identificados sin capturas ni resultados no verificados.")+'</p>',
 '<div class="notice"><strong>'+label(language,"Evidence policy:","Política de evidencias:")+'</strong> '+
 label(language,"Examples use fictional data and are not production customer systems. Private work is not presented as published, commercially adopted or certified.","Los ejemplos usan datos ficticios y no son sistemas productivos de clientes. El trabajo privado no se presenta como publicado, adoptado comercialmente ni certificado.")+'</div>',
 '<nav aria-label="'+label(language,"Case-study index","Índice de casos")+'" class="index">'+index+'</nav></div>',
 groups,
 '</main>',
 '<footer class="footer container"><span>© 2026 Alerson Morales · '+label(language,"No invented customer metrics or launch claims.","Sin métricas de clientes ni lanzamientos inventados.")+'</span>'+navLink(p,"Back to portfolio ↑","Volver al portafolio ↑")+'</footer>',
 '</body></html>'
 ].join("\n");
}
