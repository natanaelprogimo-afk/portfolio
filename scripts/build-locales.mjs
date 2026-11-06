import { renderCases } from "./render-cases.mjs";
import { renderLabs } from "./render-labs.mjs";
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
  if (slug && !html.includes('type="application/ld+json"')) {
    const schema={
      "@context":"https://schema.org","@type":"WebPage",
      name:title,description,inLanguage:locale,url:canonical,
      isPartOf:{"@type":"WebSite",url:site,name:"Alerson Morales — Developer Portfolio"}
    };
    html=html.replace("</head>",'<script type="application/ld+json">'+
      JSON.stringify(schema).replaceAll("<","\\u003c")+'</script>\n</head>');
  }
  if(slug==="cases/")html=html.replaceAll("og-preview.svg","og-cases.svg");
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
const original = text("index.html")
  // The unlocalized root owns a separate no-JS English gateway; localized
  // pages render their own full language-specific fallback in #root.
  .replace(/<noscript>[\s\S]*?<\/noscript>\s*/g,"")
  .replace(/<script type="application\/ld\+json">[\s\S]*?<\/script>\s*/g, "");
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

const labsEnglish = renderLabs("en",base);
for(const locale of ["en","es"]){
  // The public laboratory is rendered from explicit bilingual content, never
  // translated by mutating JavaScript strings or English HTML fragments.
  let labs=renderLabs(locale,base);
  let cases=renderCases(locale,base);
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
