// Accessible EN/ES HTML resumes built from a single verified bilingual model.
// The legacy /resume.html remains a non-indexed English alias for old links.
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
const site="https://natanaelprogimo-afk.github.io/portfolio/";
const base=process.env.GITHUB_PAGES==="true"?"/portfolio/":"/";
const legacy=readFileSync("public/resume.html","utf8");
const css=legacy.match(/<style>([\s\S]*?)<\/style>/)?.[1];
if(!css)throw new Error("Legacy accessible resume CSS missing");
const esc=s=>String(s).replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;");
const data={
 en:{
  title:"Alerson Morales | Software Engineering Résumé",
  description:"Alerson Morales — remote software developer in Uruguay. Python, API, React and SQL engineering with verifiable public code and completed client websites.",
  back:"Back to portfolio",print:"Print / Save as PDF",download:"Download résumé PDF",switch:"Español",
  role:"Software Developer · Backend, Frontend & Automation",
  location:"Uruguay · Remote opportunities · UTC−3",
  section1:"Professional summary",summary:"Independent software developer and founder of VYRA. I create Python automation, REST APIs, responsive React applications and testable data workflows. Available for fully remote collaboration with international teams.",
  section2:"Public, reproducible technical work",
  proof:[
    ["Python HTTP / SQLite","Local API with request validation, explicit idempotency behavior, unit tests and documented limitations.","python-api"],
    ["Python CSV reconciliation","Command-line tool with fictional fixtures, decimal arithmetic, validation, safe report export and tests.","python-csv"],
    ["React / TypeScript portfolio","This bilingual source-available website, accessibility checks, browser tests and release gates.","portfolio"]
  ],
  section3:"Completed client work · references pending",client:"Two websites reported completed: one for a dental practice and one for a paint retailer. Names, original URLs, screenshots and performance results are withheld pending authorization.",
  section4:"Private projects · not public releases",privateWork:"VYRA Fitness (design and testing), private automation development and internal catalog experiments are not presented as deployed client systems or published subscriptions.",
  section5:"Engineering skills",skills:[
    ["Programming","Python, JavaScript, TypeScript, Java, PHP, C#, SQL, HTML, CSS"],
    ["Frontend & mobile","React, Next.js, React Native, Expo, responsive layouts"],
    ["Backend & data","REST APIs, FastAPI, Node.js, SQLite, MySQL, PostgreSQL, Supabase"],
    ["Workflow","Git, GitHub, API integrations, automated testing, PowerShell"]
  ],
  section6:"Education & languages",education:"Technical upper-secondary diploma in Informatics, completed 2025. Additional PC Operator Basic/Advanced and IT/Web Design certificates.",languages:"Spanish: native · English: C1 · Portuguese: intermediate",
  foot:"Public professional summary. No identity numbers, private customer details, testimonials or unverified commercial metrics."
 },
 es:{
  title:"Alerson Morales | Currículum de desarrollo de software",
  description:"CV de Alerson Morales, desarrollador remoto en Uruguay. Python, API REST, React y SQL con código público verificable y webs terminadas para clientes.",
  back:"Volver al portafolio",print:"Imprimir / Guardar como PDF",download:"Descargar CV PDF",switch:"English",
  role:"Desarrollador de software · Backend, frontend y automatización",
  location:"Uruguay · Oportunidades 100 % remotas · UTC−3",
  section1:"Perfil profesional",summary:"Desarrollador independiente y fundador de VYRA. Creo automatizaciones Python, API REST, aplicaciones React adaptables y flujos de datos con pruebas. Disponible para colaborar en remoto con equipos internacionales.",
  section2:"Trabajo técnico público y reproducible",
  proof:[
    ["API HTTP / SQLite en Python","Servicio local con validación, idempotencia, pruebas unitarias y limitaciones documentadas.","python-api"],
    ["Conciliación CSV con Python","Herramienta de consola con datos ficticios, cálculos Decimal, validación, exportación segura y pruebas.","python-csv"],
    ["Portafolio React / TypeScript","Este sitio bilingüe de código público, con comprobaciones de accesibilidad, navegador y publicación.","portfolio"]
  ],
  section3:"Trabajo terminado para clientes · referencias pendientes",client:"Dos sitios web declarados terminados: uno para una clínica dental y otro para una tienda de pinturas. No se publican nombres, enlaces originales, capturas ni métricas sin autorización.",
  section4:"Proyectos privados · no publicados",privateWork:"VYRA Fitness (diseño y pruebas), desarrollo privado de automatizaciones y experimentos internos de catálogos no se presentan como sistemas implantados para clientes ni como suscripciones publicadas.",
  section5:"Competencias técnicas",skills:[
    ["Programación","Python, JavaScript, TypeScript, Java, PHP, C#, SQL, HTML, CSS"],
    ["Frontend y móvil","React, Next.js, React Native, Expo, interfaces adaptables"],
    ["Backend y datos","API REST, FastAPI, Node.js, SQLite, MySQL, PostgreSQL, Supabase"],
    ["Procesos","Git, GitHub, integraciones API, pruebas automáticas, PowerShell"]
  ],
  section6:"Formación e idiomas",education:"Bachillerato tecnológico en Informática, finalizado en 2025. Certificados adicionales: Operador PC Básico/Avanzado e Informática/Diseño Web.",languages:"Español: nativo · Inglés: C1 · Portugués: intermedio",
  foot:"Resumen profesional público. No incluye números de identidad, datos privados de clientes, testimonios ni métricas comerciales sin verificar."
 }};
function build(lang){
 const c=data[lang],other=lang==="es"?"en":"es",url=site+lang+"/resume/";
 const section=(id,h,body)=>'<section aria-labelledby="'+id+'"><h2 id="'+id+'">'+esc(h)+'</h2>'+body+'</section>';
 const proof=c.proof.map(([name,desc,anchor])=>'<li><a href="'+base+lang+'/cases/#'+anchor+'"><strong>'+esc(name)+'</strong></a> — '+esc(desc)+'</li>').join("");
 const skills=c.skills.map(([k,v])=>'<strong>'+esc(k)+'</strong><span>'+esc(v)+'</span>').join("");
 return '<!doctype html><html lang="'+lang+'"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">'+
 '<meta name="description" content="'+esc(c.description)+'"><meta name="theme-color" content="#ffffff">'+
 '<link rel="canonical" href="'+url+'"><link rel="alternate" hreflang="en" href="'+site+'en/resume/">'+
 '<link rel="alternate" hreflang="es" href="'+site+'es/resume/"><link rel="alternate" hreflang="x-default" href="'+site+'en/resume/">'+
 '<meta property="og:type" content="profile"><meta property="og:title" content="'+esc(c.title)+'"><meta property="og:description" content="'+esc(c.description)+'">'+
 '<meta property="og:url" content="'+url+'"><meta property="og:image" content="'+site+'og-preview.svg">'+
 '<meta name="twitter:card" content="summary_large_image"><meta name="twitter:title" content="'+esc(c.title)+'">'+
 '<meta name="twitter:description" content="'+esc(c.description)+'"><title>'+esc(c.title)+'</title>'+
 '<style>'+css+'\n@media(max-width:600px){.toolbar{flex-wrap:wrap}.toolbar a,.toolbar button{min-height:44px}}.toolbar a{display:inline-flex;align-items:center;min-height:44px;padding:8px 0}a{text-underline-offset:3px}.skip{position:absolute;top:-70px;left:10px;background:#fff;padding:12px;z-index:4}.skip:focus{top:8px}</style>'+
 '</head><body><a class="skip" href="#main">'+(lang==="es"?"Saltar al contenido":"Skip to content")+'</a>'+
 '<nav class="toolbar" aria-label="'+(lang==="es"?"Acciones del CV":"Résumé actions")+'"><a href="'+base+lang+'/">'+esc(c.back)+'</a>'+
 '<a href="'+base+other+'/resume/" lang="'+other+'">'+esc(c.switch)+'</a>'+
 '<a href="'+base+'resume-'+lang+'.pdf" download>'+esc(c.download)+'</a>'+
 '<button type="button" onclick="window.print()">'+esc(c.print)+'</button></nav>'+
 '<main class="sheet" id="main" tabindex="-1"><header class="header"><div><h1>Alerson Morales</h1><p class="role">'+esc(c.role)+'</p></div>'+
 '<div class="details">'+esc(c.location)+'<br><a href="mailto:moralesalerson@gmail.com">moralesalerson@gmail.com</a><br>'+
 '<a href="https://github.com/natanaelprogimo-afk">GitHub</a><br>'+
 '<a href="https://www.linkedin.com/in/alerson-anatael-morales-pintos-4a4634325/">LinkedIn</a></div></header>'+
 section("summary",c.section1,'<p>'+esc(c.summary)+'</p>')+
 section("public-work",c.section2,'<ul>'+proof+'</ul>')+
 section("client-work",c.section3,'<p>'+esc(c.client)+'</p>')+
 section("private-work",c.section4,'<p>'+esc(c.privateWork)+'</p>')+
 section("skills",c.section5,'<div class="skill-grid">'+skills+'</div>')+
 section("education",c.section6,'<p>'+esc(c.education)+'</p><p>'+esc(c.languages)+'</p>')+
 '<p class="footnote">'+esc(c.foot)+'</p></main></body></html>';
}
for(const lang of ["en","es"]){
 const target="dist/"+lang+"/resume";mkdirSync(target,{recursive:true});
 writeFileSync(target+"/index.html",build(lang));
}
const alias=legacy.replace("</head>",'<meta name="robots" content="noindex,follow"><link rel="canonical" href="'+site+'en/resume/"></head>');
writeFileSync("dist/resume.html",alias);
