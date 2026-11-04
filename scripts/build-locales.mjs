import { readFileSync, mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const root = "dist";
const base = process.env.GITHUB_PAGES === "true" ? "/portfolio/" : "/";
const text = p => readFileSync(join(root, p), "utf8");
const output = (p, value) => {
  const dest = join(root, p);
  mkdirSync(dest.slice(0, dest.lastIndexOf("/")), { recursive: true });
  writeFileSync(dest, value);
};
const escape = s => s.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll('"', "&quot;");
const site = "https://natanaelprogimo-afk.github.io/portfolio/";
const baseUrl = (locale,slug) => site + locale + "/" + slug;
const alternates = slug =>
  '<link rel="alternate" hreflang="en" href="'+baseUrl("en",slug)+'" />\n' +
  '<link rel="alternate" hreflang="es" href="'+baseUrl("es",slug)+'" />\n' +
  '<link rel="alternate" hreflang="x-default" href="'+site+'" />';

const pageCopy = {
  en:{
    title:"Alerson Morales | Full-Stack Developer in Uruguay",
    description:"Alerson Morales develops Python automations, REST API integrations, React apps and SQL data workflows. Explore reproducible public examples; available for remote roles.",
    subtitle:"Python automation · API integration · React / Next.js · SQL",
    headline:"Complex problems. Clear software.",
    intro:"Inspect runnable browser demos, a Python CSV comparison tool and a tested local Python API. Independent examples use fictional data; private systems are not presented as released products.",
    work:"Selected engineering work", lab:"Try interactive engineering examples", cases:"Explore engineering case studies",
    note:"The code examples use synthetic data. Private applications are clearly identified as development work."
  },
  es:{
    title:"Alerson Morales | Desarrollador Full-Stack en Uruguay",
    description:"Alerson Morales desarrolla automatizaciones Python, integraciones API REST, aplicaciones React y flujos SQL. Ejemplos reproducibles y disponibilidad remota.",
    subtitle:"Automatización Python · API REST · React / Next.js · SQL",
    headline:"Problemas complejos. Software claro.",
    intro:"Examina demostraciones interactivas, una herramienta Python de comparación CSV y una API Python local con pruebas. Los ejemplos usan datos ficticios y los sistemas privados no se presentan como publicados.",
    work:"Proyectos de ingeniería", lab:"Probar demostraciones interactivas", cases:"Ver casos de estudio de ingeniería",
    note:"Los ejemplos públicos utilizan datos ficticios. Los proyectos privados se identifican como trabajo en desarrollo."
  }
};

function decorate(html, locale,slug,title,description) {
  const canonical=baseUrl(locale,slug);
  html=html.replace(/<html lang="[^"]*">/,'<html lang="'+locale+'">');
  html=html.replace(/<link rel="canonical"[^>]*\/?>\s*/g,"");
  html=html.replace(/<link rel="alternate" hreflang="[^"]+" href="[^"]+" \/>\s*/g, "");
  // Static social metadata for every URL; avoid depending on client-side JavaScript.
  if (!html.includes('property="og:image"')) {
    html=html.replace("</head>", '<meta property="og:type" content="website" />\n'
      +'<meta property="og:title" content="'+escape(title)+'" />\n'
      +'<meta property="og:description" content="'+escape(description)+'" />\n'
      +'<meta property="og:url" content="'+canonical+'" />\n'
      +'<meta property="og:image" content="'+site+'og-preview.svg" />\n'
      +'<meta property="og:image:width" content="1200" />\n'
      +'<meta property="og:image:height" content="630" />\n'
      +'<meta property="og:image:alt" content="'+escape(locale === "es" ? "Alerson Morales: proyectos y ejemplos técnicos" : "Alerson Morales: software engineering examples")+'" />\n'
      +'<meta name="twitter:image" content="'+site+'og-preview.svg" />\n'
      +'<meta name="twitter:card" content="summary_large_image" />\n'
      +'<meta name="twitter:title" content="'+escape(title)+'" />\n'
      +'<meta name="twitter:description" content="'+escape(description)+'" />\n</head>');
  }
  html=html.replace("</head>",'<link rel="canonical" href="'+canonical+'" />\n'+alternates(slug)+"\n</head>");
  html=html.replace(/<title>[^<]*<\/title>/,'<title>'+escape(title)+'</title>');
  if (/<meta name="description"[^>]*>/.test(html))
    html=html.replace(/<meta name="description"[^>]*>/,'<meta name="description" content="'+escape(description)+'" />');
  html=html.replace(/(<meta property="og:title" content=")[^"]*(")/,'$1'+escape(title)+'$2');
  html=html.replace(/(<meta property="og:description" content=")[^"]*(")/,'$1'+escape(description)+'$2');
  html=html.replace(/(<meta property="og:url" content=")[^"]*(")/,'$1'+canonical+'$2');
  html=html.replace(/(<meta property="og:locale" content=")[^"]*(")/,'$1'+(locale==="en"?"en_US":"es_UY")+'$2');
  html=html.replace(/(<meta name="twitter:title" content=")[^"]*(")/,'$1'+escape(title)+'$2');
  html=html.replace(/(<meta name="twitter:description" content=")[^"]*(")/,'$1'+escape(description)+'$2');
  html=html.replace(/(<meta property="og:image:alt" content=")[^"]*(")/,
    '$1'+escape(locale === "es" ? "Alerson Morales: ingeniería de software, proyectos y ejemplos públicos" : "Alerson Morales: software engineering, selected work and public examples")+'$2');
  html=html.replace(/(<meta name="twitter:image:alt" content=")[^"]*(")/,
    '$1'+escape(locale === "es" ? "Portafolio de ingeniería de Alerson Morales" : "Alerson Morales engineering portfolio")+'$2');
  return html;
}

// Structured professional identity for crawler visibility. This does not
// claim an independent VYRA legal entity, public product availability or any certification.
function professionalJsonLd(locale){
  const body={
    "@context":"https://schema.org",
    "@type":"Person",
    "@id":"https://natanaelprogimo-afk.github.io/portfolio/#alerson-morales",
    name:"Alerson Morales",
    url:site+locale+"/",
    description:pageCopy[locale].description,
    jobTitle:locale==="es"?"Desarrollador de software full-stack":"Full-Stack Software Developer",
    knowsLanguage:["Spanish","English","Portuguese"],
    knowsAbout:["Python","TypeScript","React","FastAPI","SQL","Backend Development","Software Testing"],
    homeLocation:{"@type":"Country",name:"Uruguay"},
    sameAs:[
      "https://github.com/natanaelprogimo-afk",
      "https://www.linkedin.com/in/alerson-anatael-morales-pintos-4a4634325/"
    ]
  };
  return '<script type="application/ld+json">'+JSON.stringify(body).replaceAll("<","\\u003c")+'</script>';
}

// Replace the generic root Person JSON-LD with exactly one localized
// canonical Person entity per language. Never create duplicate schemas.
const original = text("index.html").replace(
  /<script type="application\/ld\+json">[\s\S]*?<\/script>\s*/g, ""
);
for(const locale of ["en","es"]) {
  const c=pageCopy[locale];
  const fallback = '<main class="container" id="main" style="padding-top:7rem;padding-bottom:7rem">'
    +'<p class="eyebrow">'+escape(c.subtitle)+'</p><h1 style="font-size:clamp(2.5rem,7vw,5rem);line-height:1.08;margin-top:1rem">'+escape(c.headline)+'</h1>'
    +'<p class="hero-description">'+escape(c.intro)+'</p>'
    +'<h2 style="margin-top:3rem">'+escape(c.work)+'</h2>'
    +'<ul><li><a href="'+base+locale+'/labs/">'+escape(c.lab)+'</a></li>'
    +'<li><a href="https://github.com/natanaelprogimo-afk/portfolio/tree/main/examples/csv">Python CSV CLI — public source and tests</a></li>'
    +'<li><a href="https://github.com/natanaelprogimo-afk/portfolio/tree/main/examples/backend">Python API — public source and tests</a></li></ul>'
    +'<p><a href="'+base+locale+'/cases/">'+escape(c.cases)+'</a> · <a href="'+base+locale+'/labs/">'+escape(c.lab)+'</a></p>'
    +'<p>'+escape(c.note)+'</p>'
    +'<p><a href="mailto:moralesalerson@gmail.com">moralesalerson@gmail.com</a> · <a href="'+base+'resume-'+locale+'.pdf">CV / Résumé PDF</a></p>'
    +'</main>';
  const html=decorate(original.replace('<div id="root"></div>','<div id="root">'+fallback+'</div>'),locale,"",c.title,c.description)
    .replace("</head>",professionalJsonLd(locale)+"\n</head>");
  output(locale+"/index.html",html);
}

const labsEnglish = text("labs/index.html");
const casesEnglish = text("cases/index.html");

// Translation table operates at build time. The generated Spanish HTML is
// crawlable without JavaScript; the English source remains the maintained original.
const labSpanish = new Map([
["Engineering Lab | Alerson Morales","Laboratorio de ingeniería | Alerson Morales"],
["Three public and fully interactive engineering examples by Alerson Morales: catalog integrity, idempotent API behavior, and metrics aggregation.","Tres ejemplos técnicos públicos e interactivos de Alerson Morales: comparación de catálogos, idempotencia y métricas."],
["← Portfolio","← Portafolio"],
["PUBLIC SOURCE · EXECUTABLE EXAMPLES · NO BACKEND","CÓDIGO PÚBLICO · EJEMPLOS EJECUTABLES · SIN BACKEND"],
["Inspect the logic.","Inspecciona la lógica."],["Try the behavior.","Prueba el funcionamiento."],
["Three small, working engineering exercises built for technical review. Edit the sample data and observe the output. All computation happens inside your browser; no data is sent to any server.","Tres ejercicios técnicos funcionales para evaluación profesional. Modifica los datos de ejemplo y observa el resultado. Todo se ejecuta en tu navegador; no se envían datos a servidores."],
["Transparency:","Transparencia:"],
["These are independently implemented public teaching demonstrations inspired by common engineering problems. They are","Son demostraciones educativas públicas e independientes sobre problemas habituales de ingeniería. No son"],
[">not<",">no<"],
["screenshots, instances or extracts of private VYRA products, nor evidence of production customer usage. The source and tests live in the public portfolio repository.","capturas, instancias o extractos de productos privados de VYRA ni pruebas de uso por clientes en producción. El código y sus pruebas están en el repositorio público."],
["01 · Catalog validation","01 · Validación de catálogos"],["02 · API idempotency","02 · Idempotencia de API"],["03 · Event aggregation","03 · Agregación de eventos"],
["Catalog reconciliation","Conciliación de catálogos"],
["Compare two CSV datasets by SKU, with cent-precision price normalization and explicit match, mismatch, missing, and extra categories. Includes quote handling and duplicate-key rejection.","Compara dos archivos CSV mediante SKU, normaliza precios a centavos y clasifica coincidencias, diferencias, ausencias y registros adicionales. Valida comillas y claves duplicadas."],
["Expected feed (CSV)","Catálogo esperado (CSV)"],["Observed catalog (CSV)","Catálogo observado (CSV)"],
["Compare catalogs →","Comparar catálogos →"],["Local-only · no API calls","Solo local · sin solicitudes API"],
["Press Compare catalogs to execute.","Pulsa Comparar catálogos para ejecutar."],
["Idempotent request behavior","Comportamiento idempotente"],
["Simulate how a service might handle an idempotency key. Replaying the same key and payload returns the recorded result, while key collisions and uncertain failures produce a conflict. This is an in-memory example, not an HTTP server.","Simula cómo un servicio maneja una clave de idempotencia. Repetir la misma clave y carga devuelve el resultado guardado; conflictos y fallos inciertos producen una respuesta de conflicto. Es una simulación en memoria, no un servidor HTTP."],
["Idempotency key","Clave de idempotencia"],["Payload (JSON)","Carga (JSON)"],["Submit simulated request →","Enviar solicitud simulada →"],
["Simulate uncertain failure","Simular fallo incierto"],["Reset ledger","Reiniciar registro"],
["Submit the same key twice to see replay behavior.","Envía la misma clave dos veces para comprobar la repetición."],
["Operational metrics aggregation","Agregación de métricas operativas"],
["Validate structured JSON events and compute daily request counts, error counts, success rate, and mean response latency. Input validation includes maximum sizes and required fields.","Valida eventos JSON y calcula solicitudes, errores, tasa de éxito y latencia media por día. Incluye límites de tamaño y campos obligatorios."],
["Sample event stream (JSON)","Eventos de ejemplo (JSON)"],["Analyze events →","Analizar eventos →"],["A working aggregation, not a SQL engine","Agregación funcional; no es un motor SQL"],
["Press Analyze events to execute.","Pulsa Analizar eventos para ejecutar."],
["← Back to portfolio","← Volver al portafolio"],["View public source code","Ver código fuente público"],
["Synthetic examples · All processing is client-side.","Ejemplos ficticios · Todo se procesa en el navegador."]
]);

const caseSpanish = new Map([
["Engineering Case Studies | Alerson Morales","Casos de estudio de ingeniería | Alerson Morales"],
["Engineering case studies from Alerson Morales: private-system architecture, test strategies, mobile development and completed client websites, with transparent evidence boundaries.","Casos técnicos de Alerson Morales: arquitectura, pruebas, desarrollo móvil y sitios terminados, con límites transparentes de evidencia."],
["Portfolio","Portafolio"],["Interactive lab","Laboratorio interactivo"],["Résumé","Currículum"],
["TECHNICAL NOTES / PROJECT DECISIONS / VERIFIABLE SCOPE","NOTAS TÉCNICAS / DECISIONES DE INGENIERÍA / ALCANCE VERIFICABLE"],
["Beyond the","Más allá de"],["project card.","la tarjeta de proyecto."],
["Technical case studies that explain the work, the constraints and the quality boundaries. They separate implemented development work from public production releases, and public demonstrations from private source code.","Casos de estudio que explican el trabajo, las restricciones y los límites de calidad. Diferencian el desarrollo interno de los productos publicados y las demostraciones públicas del código privado."],
["Evidence policy:","Política de evidencias:"],
["Private code, customer information, credentials and unapproved product screenshots are not published. Architecture drawings below are conceptual. The interactive engineering lab contains independent open-source examples using synthetic data.","No se publican códigos privados, datos de clientes, credenciales ni capturas no autorizadas. Los diagramas son conceptuales. El laboratorio incluye ejemplos independientes con datos ficticios."],
["AI Automation Factory","AI Automation Factory"],["VYRA Fitness","VYRA Fitness"],["Catalog Integrity","Integridad de catálogos"],["Client Websites","Sitios de clientes"],
["01 / AGENT SYSTEMS / BACKEND","01 / SISTEMAS DE AGENTES / BACKEND"],["02 / MOBILE PRODUCT / UI ARCHITECTURE","02 / PRODUCTO MÓVIL / ARQUITECTURA"],
["03 / STRUCTURED DATA / COMPARISON","03 / DATOS ESTRUCTURADOS / COMPARACIÓN"],["04 / INDEPENDENT WEB WORK","04 / DESARROLLO WEB INDEPENDIENTE"],
["05 / PUBLIC SOURCE / FRONTEND","05 / CÓDIGO PÚBLICO / FRONTEND"],
["Private repository · Development","Repositorio privado · En desarrollo"],
["Private · Design and testing","Privado · Diseño y pruebas"],
["Private internal prototype","Prototipo interno privado"],
["Two sites reported completed","Dos sitios declarados terminados"],
["Public repository · Published","Repositorio público · Publicado"],
["Engineering problem","Problema de ingeniería"],["Implementation scope","Alcance de implementación"],
["Trade-offs & limits","Decisiones y límites"],["Implementation focus","Enfoque técnico"],
["Evidence & limitations","Evidencias y limitaciones"],["Engineering focus","Enfoque de ingeniería"],
["Technical choices","Decisiones técnicas"],["Verification","Verificación"],
["CONCEPTUAL ARCHITECTURE · NOT A SCREENSHOT","ARQUITECTURA CONCEPTUAL · NO ES UNA CAPTURA"],
["A data-comparison workflow exploring mismatches between product feeds and observed catalog records, with explicit output states for discrepancies.","Un flujo de comparación de datos que identifica diferencias entre feeds de productos y catálogos observados, con estados explícitos de discrepancia."],
["A cross-platform fitness application in development, bringing training, nutrition, hydration and progress tracking into one experience.","Una aplicación móvil multiplataforma en desarrollo que reúne entrenamientos, nutrición, hidratación y seguimiento del progreso."],
["An independently developed system for designing, operating and evaluating AI-enabled workflows with controlled access to tools and human review of risky actions.","Un sistema independiente para diseñar y evaluar flujos con IA, controles de acceso a herramientas y revisión humana de acciones riesgosas."],
["Completed web projects for a dental practice and a paint retail business, each serving different information and navigation needs.","Dos proyectos web terminados, uno para una clínica dental y otro para una tienda de pinturas, con necesidades distintas de información y navegación."],
["This bilingual portfolio is itself an inspectable engineering artifact, with TypeScript, component design, accessible interactions and CI quality checks.","Este portafolio bilingüe es un producto de ingeniería inspeccionable, desarrollado con TypeScript, componentes reutilizables, interacciones accesibles y pruebas CI."],
["Request technical walkthrough ↗","Solicitar explicación técnica ↗"],["Request product walkthrough ↗","Solicitar demostración ↗"],
["Run independent CSV comparison ↗","Probar comparación CSV independiente ↗"],["Inspect open-source sample ↗","Inspeccionar ejemplo público ↗"],
["Ask about project references ↗","Solicitar referencias ↗"],["View public GitHub repository ↗","Ver repositorio público ↗"],
["Explore interactive examples ↗","Explorar ejemplos interactivos ↗"],["Back to portfolio ↑","Volver al portafolio ↑"],
["Engineering notes without invented performance claims.","Notas técnicas sin métricas de rendimiento inventadas."],
["Agent workflows can execute actions with side effects. Production-oriented design requires authorization boundaries, safe retries, execution limits, traceability and explicit human approval where appropriate.","Los agentes pueden ejecutar acciones con efectos externos. El diseño exige autorizaciones, reintentos seguros, límites, trazabilidad y aprobación humana en casos de riesgo."],
["API and dashboard for agents, execution state and approvals.","API y panel para agentes, estado de ejecución y aprobaciones."],
["Execution cost and token limits.","Límites de costes y tokens por ejecución."],
["Idempotency keys to avoid duplicate actions on retry.","Claves de idempotencia para evitar duplicaciones al reintentar."],
["Rate limiting, structured workflow state and test coverage.","Límites de solicitudes, estados estructurados y cobertura de pruebas."],
["Human approval takes precedence over unrestricted autonomy.","La aprobación humana prevalece sobre la autonomía sin restricciones."],
["Uncertain failed requests are not automatically retried.","No se reintentan automáticamente solicitudes cuyo resultado es incierto."],
["Private README and tests describe implementation; no production SLA or customer adoption is claimed.","El README privado y sus pruebas documentan la implementación; no se afirma disponibilidad garantizada ni adopción comercial."],
["Live services and secrets remain private.","Los servicios activos y secretos permanecen privados."],
["Several health-related flows must share a coherent navigation model and persistence strategy without producing an overcomplicated mobile interface.","Distintas funciones de salud deben compartir una navegación coherente y una estrategia de persistencia sin complicar la interfaz móvil."],
["Cross-platform screens and reusable interface components.","Pantallas multiplataforma y componentes de interfaz reutilizables."],
["Data-backed tracking flows and integration work.","Flujos de seguimiento con persistencia e integraciones."],
["Offline and synchronization concerns addressed through application design and tests.","Aspectos de funcionamiento sin conexión y sincronización tratados mediante diseño y pruebas."],
["The private repository contains implementation and test files.","El repositorio privado contiene implementación y archivos de pruebas."],
["The application is not a verified public release in Google Play or the App Store.","La aplicación no consta como publicación verificada en Google Play o App Store."],
["Product screens will only be published after approval and privacy review.","Las pantallas se publicarán únicamente tras revisión de privacidad y permisos."],
["Price and product attributes can diverge across data sources. Comparisons need deterministic keys, consistent numeric interpretation, clear failure classifications and useful audit output.","Los precios y atributos pueden variar entre fuentes. La comparación requiere claves estables, tratamiento numérico consistente, estados de error claros y resultados auditables."],
["Comparison of expected and observed fields.","Comparación de campos esperados y observados."],
["Match/mismatch result structures and sample-run validation.","Resultados explícitos de coincidencias y diferencias, validados con muestras."],
["Prototype integration experiments with external workflow tools.","Experimentos de integración con herramientas externas."],
["The original private source is not linked publicly.","El código privado original no está publicado."],
["Controlled sample runs do not demonstrate paid deployments or customer adoption.","Las ejecuciones de muestra no demuestran ventas ni adopción comercial."],
["The linked lab is a new independent implementation of the comparison idea.","El laboratorio enlazado es una implementación nueva e independiente de la idea."],
["A completed website serving a dental business, focused on understandable information architecture and an approachable responsive experience. Exact project URL and performance figures have not been made public.","Sitio web terminado para una clínica dental, centrado en la claridad informativa y la adaptación a dispositivos. Su URL y cifras de rendimiento no se han hecho públicas."],
["A completed website for a paint store, designed around retail information and clarity of content. Public screenshots, customer testimonials and commerce metrics are not currently available for verification.","Sitio web terminado para una tienda de pinturas, centrado en información comercial clara. No hay capturas, testimonios ni métricas disponibles públicamente para su comprobación."],
["Dental practice","Clínica dental"],
["Paint retailer","Tienda de pinturas"],
["Vite and React with concise client-side rendering.","Vite y React con renderizado del lado del cliente."],
["English and Spanish copy with language persistence.","Contenido en inglés y español con persistencia del idioma."],
["Data-driven project cards and accessible navigation.","Tarjetas de proyectos basadas en datos y navegación accesible."],
["Public independent interactive engineering demonstrations.","Demostraciones técnicas públicas e independientes."],
["GitHub Actions builds, lint and Node unit tests.","GitHub Actions ejecuta compilaciones, lint y pruebas unitarias."],
["Smoke tests verify static files, deployment base and résumé privacy checks.","Pruebas básicas verifican recursos, rutas de despliegue y privacidad de CV."],
["No third-party tracking pixels, backend credentials or fake contact forms.","Sin píxeles de seguimiento externos, credenciales ni formularios falsos."]
]);

function translate(source, mapping) {
  let s=source;
  for (const [english,spanish] of mapping.entries())
    if(english !== spanish) s=s.replaceAll(english,spanish);
  return s;
}
for(const locale of ["en","es"]){
  let labs=locale==="es"?translate(labsEnglish,labSpanish):labsEnglish;
  let cases=locale==="es"?translate(casesEnglish,caseSpanish):casesEnglish;
  if (locale === "es") {
    labs=labs.replaceAll("No son <strong>no</strong> capturas","<strong>No son capturas</strong>");
  }
  if (locale === "es") {
    labs=labs.replaceAll("AM. / ENGINEERING LAB", "AM. / LABORATORIO TÉCNICO")
      .replaceAll("Engineering examples", "Ejemplos de ingeniería")
      .replaceAll("Skip to content", "Saltar al contenido")
      .replaceAll("Status</th>", "Estado</th>")
      .replaceAll("Requests</th>", "Solicitudes</th>");
    cases=cases.replaceAll("Skip to content", "Saltar al contenido")
      .replaceAll("Client website builds", "Desarrollo web para clientes")
      .replaceAll("Developer Portfolio", "Portafolio profesional")
      .replaceAll("Agent runtime", "Motor de agentes")
      .replaceAll("Tracking features", "Seguimiento de actividad")
      .replaceAll("Data layer", "Capa de datos")
      .replaceAll("<span>Normalize</span>", "<span>Normalizar</span>")
      .replaceAll("<span>Compare</span>", "<span>Comparar</span>")
      .replaceAll("<span>Results</span>", "<span>Resultados</span>")
      .replaceAll('aria-label="Case studies"', 'aria-label="Casos de estudio"');
  }
  // A translated standalone lab must import from the shared original module.
  labs=labs.replace('from "./logic.mjs"','from "'+base+'labs/logic.mjs"');
  // Hash tabs stay in sync with fresh navigation and back/forward.
  labs=labs.replace('  document.getElementById("run-catalog").click();',
    '  addEventListener("hashchange", () => { const key = location.hash.slice(1); if (tabs.includes(key)) switchTab(key); });\n  document.getElementById("run-catalog").click();');
  if (locale === "es") {
    labs=labs.replaceAll("Download comparison CSV","Descargar CSV de comparación")
      .replaceAll("Download metrics CSV","Descargar CSV de métricas")
      .replaceAll("Matches: ","Coincidencias: ")
      .replaceAll("Mismatches: ","Diferencias: ")
      .replaceAll("Missing: ","Faltantes: ")
      .replaceAll("Extra: ","Adicionales: ")
      .replaceAll("Days analyzed: ","Días analizados: ");
  }
  labs=decorate(labs,locale,"labs/",locale==="es"?"Laboratorio de ingeniería | Alerson Morales":"Engineering Lab | Alerson Morales",locale==="es"?"Ejemplos públicos y ejecutables: CSV, idempotencia y métricas de eventos.":"Three executable public demos: CSV validation, idempotency and metrics.");
  // The original case-study page links to ../resume.html; localized case URLs
  // have no /en/resume.html or /es/resume.html, so point to the matching PDF.
  cases=cases.replace('href="../resume.html"', 'href="'+base+'resume-'+locale+'.pdf"');
  cases=decorate(cases,locale,"cases/",locale==="es"?"Casos técnicos | Alerson Morales":"Engineering Case Studies | Alerson Morales",locale==="es"?"Decisiones de ingeniería, arquitectura, alcance y evidencias del trabajo de Alerson Morales.":"Engineering architectures, constraints and verifiable work by Alerson Morales.");
  output(locale+"/labs/index.html",labs);
  output(locale+"/cases/index.html",cases);
}
