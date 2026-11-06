// Generate recruiter-ready, bilingual, printable static brief from verified facts.
import { mkdirSync, writeFileSync } from "node:fs";
const site="https://natanaelprogimo-afk.github.io/portfolio/";
const base=process.env.GITHUB_PAGES==="true"?"/portfolio/":"/";
const copy={
en:{
title:"Alerson Morales | Technical Hiring Brief",
description:"Full-stack developer based in Uruguay. Python, FastAPI, React, TypeScript, SQL. Public source, tests, résumé and remote contact.",
label:"RECRUITER OVERVIEW / 60 SECONDS",heading:"Engineering you can evaluate.",lead:"I'm Alerson Morales, an independent full-stack developer based in Uruguay and the founder of VYRA. I am interested in fully remote software roles with international teams.",
verified:"Public, independently testable work",skills:"Engineering focus",private:"Private projects — not public releases",limits:"Transparency",foot:"Examples use synthetic data. Private code, client details, revenue and production results are not presented as public evidence.",
sample1:"Python API: validation, SQLite, idempotency and concurrency tests",
sample2:"SQL: schemas, indexes, window functions, query plans and tests",
sample3:"Three working browser demos: CSV comparison, idempotency, metrics",
a:"AI Automation Factory — private development, no production adoption claimed",
b:"VYRA Fitness — design/testing; not published in app stores",
c:"Catalog Integrity Engine — private internal prototype",
clients:"Completed websites for a dental practice and paint retailer; public references not yet available.",
languages:"Spanish native · English C1 · Portuguese intermediate",
education:"IT-focused technical high-school program completed in 2025",
portfolio:"Portfolio",cases:"Case studies",demo:"Try interactive examples",resume:"Download English résumé",email:"Email about a remote role",print:"Print this brief",
},
es:{
title:"Alerson Morales | Perfil técnico para contratación",
description:"Desarrollador full-stack en Uruguay. Python, FastAPI, React, TypeScript, SQL. Código público, pruebas, CV y contacto remoto.",
label:"PARA RECLUTADORES / LECTURA DE 60 SEGUNDOS",heading:"Ingeniería que puedes comprobar.",lead:"Soy Alerson Morales, desarrollador full-stack independiente de Uruguay y fundador de VYRA. Busco puestos de programación totalmente remotos con equipos internacionales.",
verified:"Trabajo público y comprobable",skills:"Especialización técnica",private:"Proyectos privados — no publicados",limits:"Transparencia",foot:"Los ejemplos usan datos ficticios. No se presentan código privado, datos de clientes, ingresos ni resultados comerciales como pruebas públicas.",
sample1:"API Python: validación, SQLite, idempotencia y pruebas de concurrencia",
sample2:"SQL: esquemas, índices, funciones ventana, planes de consulta y pruebas",
sample3:"Tres demos funcionales: comparación CSV, idempotencia y métricas",
a:"AI Automation Factory — desarrollo privado, sin afirmar adopción comercial",
b:"VYRA Fitness — diseño y pruebas; sin publicar en tiendas",
c:"Catalog Integrity Engine — prototipo interno privado",
clients:"Sitios terminados para una clínica dental y una tienda de pinturas; aún no hay referencias públicas.",
languages:"Español nativo · Inglés C1 · Portugués intermedio",
education:"Bachillerato de informática terminado en 2025",
portfolio:"Portafolio",cases:"Casos de estudio",demo:"Probar ejemplos interactivos",resume:"Descargar CV español",email:"Contactar por trabajo remoto",print:"Imprimir resumen",
}
};
const escape=s=>s.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll('"',"&quot;");
const css=":root{font-family:system-ui,sans-serif;background:#0a1117;color:#f0f5ee;--accent:#c9f38a;--muted:#b2c7bd}*{box-sizing:border-box}body{margin:0}a{color:var(--accent)}a:focus-visible,button:focus-visible{outline:3px solid var(--accent);outline-offset:3px}.wrap{max-width:1050px;margin:auto;padding:0 24px}.top{display:flex;justify-content:space-between;gap:20px;padding:25px 0;border-bottom:1px solid #344c46}.top nav{display:flex;flex-wrap:wrap;gap:18px}.top a{font-size:14px;font-weight:700}.top .brand{color:white;text-decoration:none}.kicker{color:var(--accent);font-size:12px;font-weight:850;letter-spacing:.1em}main{padding:70px 0 60px}h1{font-size:clamp(42px,6vw,75px);line-height:1.06;letter-spacing:-.065em;margin:14px 0 20px}p{line-height:1.75;color:var(--muted)}.lead{max-width:850px;font-size:17px}.actions{display:flex;flex-wrap:wrap;gap:12px;margin:30px 0}.actions a,button{padding:13px 17px;border-radius:9px;border:1px solid #7ca47b;font:800 13px system-ui;text-decoration:none;min-height:46px;display:inline-flex;align-items:center;cursor:pointer}.actions a:first-child{background:var(--accent);color:#13221a}.grid{display:grid;grid-template-columns:1fr 1fr;gap:17px}.card{border:1px solid #354a44;border-radius:13px;padding:26px;background:#121e24}.card h2{font-size:22px;letter-spacing:-.04em}.card p,.card li{font-size:14px;color:var(--muted);line-height:1.8}.card li{margin-bottom:12px}ul{padding-left:19px}.note{padding:15px;border-left:3px solid var(--accent);margin-top:26px;font-size:13px}button{color:var(--accent);background:#152521}footer{border-top:1px solid #344c46;padding:26px 0 50px;font-size:12px;color:var(--muted)}.skip{position:absolute;top:-120px;left:15px;background:white;color:black;padding:13px;z-index:20}.skip:focus{top:10px}@media(max-width:440px){.top nav{gap:7px;justify-content:space-between;flex-wrap:nowrap}.top nav a{font-size:11px;white-space:nowrap}}@media(max-width:730px){.grid{grid-template-columns:1fr}main{padding:45px 0}.wrap{padding:0 16px}.card{padding:19px}.top{flex-direction:column}}@media print{body{background:white;color:#111}.top,.actions,button,.skip{display:none!important}main{padding:0}h1{font-size:30pt}.card{background:white;border-color:#ccc;padding:13px;break-inside:avoid}.card p,.card li,p,footer{color:#222}.kicker,a{color:#235b36}.grid{gap:10px}}";
// V14: secondary card and social links must be tappable, not 16px inline targets.
const touchCss='.card a{display:inline-flex;align-items:center;min-height:44px;padding:8px 5px;max-width:100%;overflow-wrap:anywhere}.card li a{font-size:14px}.card#contact a{margin:2px 0}.card a:focus-visible{outline:3px solid var(--accent);outline-offset:3px}@media(max-width:440px){.top nav{flex-wrap:wrap;justify-content:flex-start}.card p a{margin:3px 3px 3px 0}}';
for(const lang of ["en","es"]){
const t=copy[lang],p=base+lang+"/", canonical=site+lang+"/hiring/";
const profileSchema=JSON.stringify({
 "@context":"https://schema.org","@type":"ProfilePage",name:t.title,
 description:t.description,url:canonical,inLanguage:lang,
 mainEntity:{"@type":"Person",name:"Alerson Morales",
  jobTitle:lang==="es"?"Desarrollador de software":"Software Developer",url:site+lang+"/"}
});
const list=(items)=>'<ul>'+items.map(s=>'<li>'+s+'</li>').join("")+'</ul>';
const card=(id,title,body)=>'<section class="card" aria-labelledby="'+id+'"><h2 id="'+id+'">'+escape(title)+'</h2>'+body+'</section>';
const html=[
'<!doctype html><html lang="'+lang+'"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">',
'<meta name="description" content="'+escape(t.description)+'"><meta name="theme-color" content="#0a1117">',
'<title>'+escape(t.title)+'</title><link rel="canonical" href="'+canonical+'">',
'<link rel="alternate" hreflang="en" href="'+site+'en/hiring/"><link rel="alternate" hreflang="es" href="'+site+'es/hiring/">',
'<link rel="alternate" hreflang="x-default" href="'+site+'en/hiring/">',
'<meta property="og:type" content="website"><meta property="og:title" content="'+escape(t.title)+'">',
'<meta property="og:description" content="'+escape(t.description)+'"><meta property="og:url" content="'+canonical+'">',
'<meta property="og:locale" content="'+(lang==="es"?"es_UY":"en_US")+'"><meta property="og:locale:alternate" content="'+(lang==="es"?"en_US":"es_UY")+'">',
'<meta property="og:image" content="'+site+'og-preview.svg"><meta property="og:image:width" content="1200"><meta property="og:image:height" content="630"><meta property="og:image:alt" content="'+escape(lang==="es"?"Resumen profesional de Alerson Morales":"Alerson Morales recruiter brief")+'"><meta name="twitter:image" content="'+site+'og-preview.svg"><meta name="twitter:card" content="summary_large_image">',
'<meta name="twitter:title" content="'+escape(t.title)+'"><meta name="twitter:description" content="'+escape(t.description)+'"><meta name="twitter:image:alt" content="'+escape(lang==="es"?"Resumen profesional de Alerson Morales":"Alerson Morales recruiter brief")+'">',
'<script type="application/ld+json">'+profileSchema+'</script>',
'<link rel="icon" href="'+base+'favicon.svg" type="image/svg+xml"><style>'+css+touchCss+'</style><link rel="stylesheet" href="'+base+'shared-pages.css"></head><body>',
'<a class="skip" href="#main">'+(lang==="en"?"Skip to content":"Saltar al contenido")+'</a>',
'<div class="wrap"><header class="top"><a class="brand" href="'+p+'">AM. / ALERSON MORALES</a>',
'<nav aria-label="'+(lang==="en"?"Navigation":"Navegación")+'"><a href="'+p+'">'+t.portfolio+'</a><a href="'+p+'cases/">'+t.cases+'</a><a href="'+p+'trust/">'+(lang==="en"?"VYRA trust":"Confianza VYRA")+'</a>',
'<a lang="'+(lang==="en"?"es":"en")+'" href="'+base+(lang==="en"?"es":"en")+'/hiring/">'+(lang==="en"?"Español":"English")+'</a></nav></header>',
'<main id="main" tabindex="-1"><span class="kicker">'+t.label+'</span><h1>'+t.heading+'</h1><p class="lead">'+t.lead+'</p>',
'<p class="lead" style="font-size:14px">'+(lang==="es"?"Modalidad: 100 % remoto · Zona horaria Uruguay: UTC−3 · Colaboración internacional":"Working model: fully remote · Uruguay time zone UTC−3 · International collaboration")+'</p>',
'<div class="actions"><a href="'+p+'labs/">'+t.demo+' ↗</a><a href="'+base+'resume-'+lang+'.pdf">'+t.resume+' ↗</a>',
'<a href="mailto:moralesalerson@gmail.com?subject='+encodeURIComponent(lang==="es"?"Oportunidad laboral remota de programación":"Remote software engineering opportunity")+'">'+t.email+' ↗</a></div>',
'<div class="grid">',
card("public",t.verified,list([
'<a href="https://github.com/natanaelprogimo-afk/portfolio/tree/main/examples/backend">'+t.sample1+'</a>',
'<a href="https://github.com/natanaelprogimo-afk/portfolio/tree/main/examples/sql">'+t.sample2+'</a>',
'<a href="https://github.com/natanaelprogimo-afk/portfolio/tree/main/examples/csv">'+(lang==="es"?"Conciliación CSV con Python y pruebas":"Python CSV reconciliation and tests")+'</a>',
'<a href="'+p+'labs/">'+t.sample3+'</a>',
'<a href="'+p+'cases/#python-csv">'+(lang==="es"?"Caso técnico: conciliación CSV":"Case study: CSV reconciliation")+'</a>',
'<a href="'+p+'cases/#python-api">'+(lang==="es"?"Caso técnico: API Python":"Case study: Python HTTP API")+'</a>'
])),
card("skills",t.skills,'<p>Python · TypeScript · JavaScript · C# · SQL · React · FastAPI · Node.js · Git</p><p>'+t.languages+'</p><p>'+t.education+'</p>'),
card("private",t.private,list([t.a,t.b,t.c])),
card("contact",lang==="es"?"Contacto":"Contact",'<p>'+t.clients+'</p><p><a href="mailto:moralesalerson@gmail.com">moralesalerson@gmail.com</a></p><p><a href="https://github.com/natanaelprogimo-afk">GitHub</a> · <a href="https://www.linkedin.com/in/alerson-anatael-morales-pintos-4a4634325/">LinkedIn</a> · <a target="_blank" rel="noopener noreferrer" href="https://www.upwork.com/freelancers/~016487e77ebf028c40">Upwork</a></p>'),
'</div><p class="note"><strong>'+t.limits+':</strong> '+t.foot+'</p>',
'<div class="actions"><button type="button" onclick="window.print()">'+t.print+'</button></div>',
'</main><footer>© 2026 Alerson Morales · '+t.foot+'</footer></div></body></html>'
].join("\n");
const dir="dist/"+lang+"/hiring";mkdirSync(dir,{recursive:true});
writeFileSync(dir+"/index.html",html);
console.log("Generated "+dir+"/index.html");
}
