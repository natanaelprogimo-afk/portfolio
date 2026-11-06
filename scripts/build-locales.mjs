import { renderCases } from "./render-cases.mjs";
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
  '<link rel="alternate" hreflang="x-default" href="'+(slug?baseUrl("en",slug):site)+'" />';

const pageCopy = {
  en:{
    title:"Alerson Morales | Full-Stack Developer in Uruguay",
    description:"Alerson Morales develops Python automations, REST API integrations, React apps and SQL data workflows. Explore reproducible public examples; available for remote roles.",
    subtitle:"Python automation · API integration · React / Next.js · SQL",
    headline:"Complex problems. Clear software.",
    intro:"Inspect runnable browser demos, a Python CSV comparison tool and a tested local Python API. Independent examples use fictional data; private systems are not presented as released products.",
    work:"Selected engineering work", lab:"Try interactive engineering examples", cases:"Explore engineering case studies",
    note:"The code examples use synthetic data. Private applications are clearly identified as development work.", csvLink:"Python CSV CLI — public source and tests",apiLink:"Python API — public source and tests"
  },
  es:{
    title:"Alerson Morales | Desarrollador Full-Stack en Uruguay",
    description:"Alerson Morales desarrolla automatizaciones Python, integraciones API REST, aplicaciones React y flujos SQL. Ejemplos reproducibles y disponibilidad remota.",
    subtitle:"Automatización Python · API REST · React / Next.js · SQL",
    headline:"Problemas complejos. Software claro.",
    intro:"Examina demostraciones interactivas, una herramienta Python de comparación CSV y una API Python local con pruebas. Los ejemplos usan datos ficticios y los sistemas privados no se presentan como publicados.",
    work:"Proyectos de ingeniería", lab:"Probar demostraciones interactivas", cases:"Ver casos de estudio de ingeniería",
    note:"Los ejemplos públicos utilizan datos ficticios. Los proyectos privados se identifican como trabajo en desarrollo.", csvLink:"Herramienta Python CSV — código y pruebas públicas",apiLink:"API Python — código y pruebas públicas"
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
  // Locale metadata and static navigation styling must exist in source HTML,
  // not be injected only by client-side React.
  if (!html.includes('property="og:locale"'))
    html=html.replace("</head>", '<meta property="og:locale" content="'+(locale==="es"?"es_UY":"en_US")+'" />\n</head>');
  if (!html.includes('property="og:locale:alternate"'))
    html=html.replace("</head>", '<meta property="og:locale:alternate" content="'+(locale==="es"?"en_US":"es_UY")+'" />\n</head>');
  if (!html.includes('name="twitter:image:alt"'))
    html=html.replace("</head>", '<meta name="twitter:image:alt" content="'+escape(locale==="es"?"Casos de ingeniería de Alerson Morales":"Alerson Morales software engineering")+'" />\n</head>');
  if (slug && !html.includes('href="'+base+'shared-pages.css"'))
    html=html.replace("</head>", '<link rel="stylesheet" href="'+base+'shared-pages.css" />\n</head>');
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
    +'<li><a href="https://github.com/natanaelprogimo-afk/portfolio/tree/main/examples/csv">'+escape(c.csvLink)+'</a></li>'
    +'<li><a href="https://github.com/natanaelprogimo-afk/portfolio/tree/main/examples/backend">'+escape(c.apiLink)+'</a></li></ul>'
    +'<p><a href="'+base+locale+'/cases/">'+escape(c.cases)+'</a> · <a href="'+base+locale+'/labs/">'+escape(c.lab)+'</a></p>'
    +'<p>'+escape(c.note)+'</p>'
    +'<p><a href="mailto:moralesalerson@gmail.com">moralesalerson@gmail.com</a> · <a href="'+base+'resume-'+locale+'.pdf">CV / Résumé PDF</a></p>'
    +'</main>';
  const html=decorate(original.replace('<div id="root"></div>','<div id="root">'+fallback+'</div>'),locale,"",c.title,c.description)
    .replace("</head>",professionalJsonLd(locale)+"\n</head>");
  output(locale+"/index.html",html);
}

const labsEnglish = text("labs/index.html");


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
["Synthetic examples · All processing is client-side.","Ejemplos ficticios · Todo se procesa en el navegador."],
["Catalog results","Resultados de catálogos"],["Request simulation results","Resultados de simulación"],["Metrics results","Resultados de métricas"]
]);



function translate(source, mapping) {
  let s=source;
  for (const [english,spanish] of mapping.entries())
    if(english !== spanish) s=s.replaceAll(english,spanish);
  return s;
}
for(const locale of ["en","es"]){
  let labs=locale==="es"?translate(labsEnglish,labSpanish):labsEnglish;
  let cases=renderCases(locale,base);
  if (locale === "es") {
    labs=labs.replaceAll("No son <strong>no</strong> capturas","<strong>No son capturas</strong>");
  }
  if (locale === "es") {
    labs=labs.replaceAll("AM. / ENGINEERING LAB", "AM. / LABORATORIO TÉCNICO")
      .replaceAll("Engineering examples", "Ejemplos de ingeniería")
      .replaceAll("Skip to content", "Saltar al contenido")
      .replaceAll("Status</th>", "Estado</th>")
      .replaceAll("Requests</th>", "Solicitudes</th>");

  }
  // The EN/ES switch maintains the currently selected exercise (#catalog etc.).
  labs=labs.replace('</nav></header>', '<a data-language-switch lang="'+(locale==="en"?"es":"en")+'" href="'+base+(locale==="en"?"es":"en")+'/labs/">'+(locale==="en"?"Español":"English")+'</a></nav></header>');
  labs=labs.replace('</body>', '<script>document.querySelector("[data-language-switch]")?.addEventListener("click",function(){this.href=this.href.split("#")[0]+window.location.hash})</script></body>');
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
  // Case-study markup comes directly from bilingual structured data rather than
  // translated post-hoc English HTML. Stable anchors preserve existing links.
  cases=decorate(cases,locale,"cases/",locale==="es"?"Casos técnicos | Alerson Morales":"Engineering Case Studies | Alerson Morales",locale==="es"?"Decisiones de ingeniería, arquitectura, alcance y evidencias del trabajo de Alerson Morales.":"Engineering architectures, constraints and verifiable work by Alerson Morales.");
  output(locale+"/labs/index.html",labs);
  output(locale+"/cases/index.html",cases);
}
// Legacy /labs/ stays for older links; unlike localized pages it is not indexed.
output("labs/index.html",labsEnglish.replace("</head>",
  '<link rel="canonical" href="'+baseUrl("en","labs/")+'" /><meta name="robots" content="noindex,follow" />\n</head>'));
// Legacy /cases/ remains an English alias but uses the same authored content.
output("cases/index.html",decorate(renderCases("en",base),"en","cases/","Engineering Case Studies | Alerson Morales","Inspect public code, verified tests and clearly labeled private work.")
  .replace(/<link rel="canonical" href="[^"]+" \/>/,'<link rel="canonical" href="'+baseUrl("en","cases/")+'" />')
  .replace("</head>",'<meta name="robots" content="noindex,follow" />\n</head>'));
