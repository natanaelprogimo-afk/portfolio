import {mkdirSync,writeFileSync} from "node:fs";
/** Trust information only: no production, compliance, billing or SLA claims. */
const host="https://natanaelprogimo-afk.github.io/portfolio/";
const base=process.env.GITHUB_PAGES==="true"?"/portfolio/":"/";
const email="moralesalerson@gmail.com";
const esc=v=>String(v).replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;");
const strings={
  en:{
    title:"VYRA | Trust & product readiness",desc:"VYRA commercial transparency for future SaaS and AI agents: verification, security safeguards, privacy, and buyer due diligence.",
    kicker:"VYRA · COMMERCIAL TRANSPARENCY",head:"Trust must be verifiable.",sub:"An honest look at the evidence, limitations and launch conditions behind future SaaS products and AI agents.",
    intro:"VYRA is an independent software initiative operated by Alerson Morales in Uruguay. This page distinguishes published technical samples from private product development; it does not offer a live paid SaaS or AI agent.",
    dated:"Disclosure reviewed 2 November 2026",notice:"This information is not a current offer for sale, a privacy policy for a live customer service, binding terms, an SLA, or an independent security certification.",
    home:"Developer portfolio",switch:"Español",code:"Inspect working examples",ask:"Ask a commercial question",
    evidence:"What buyers can verify",evidenceIntro:"Independent public code and tests can demonstrate engineering practices. They do not certify a private SaaS or agent deployment.",
    statusTitle:"Current product status",statusIntro:"Planning, prototyping and sample executions are not equivalent to customer-ready services.",
    products:[
      ["AI agents and automation","Private development. Tool permissions, approvals, deployment security and service terms must be verified for each customer offer."],
      ["Planned SaaS products","No publicly verified generally available SaaS subscription is offered through this page."],
      ["Catalog Integrity Engine","Internal data-comparison prototype and sample experiments; no public audited commercial deployment is claimed."],
      ["VYRA Fitness","Private mobile project in design/testing; not publicly released here."]
    ],
    requirement:"Pre-launch requirement — not an implemented guarantee",verified:"Public demonstration",
    safety:"Agent and SaaS controls to validate",safetyIntro:"These are acceptance requirements for any future customer release. They are not assertions that all VYRA products already pass these checks.",
    controls:[
      ["Least privilege","Authorize each tool and operation separately, segregate tenant credentials and independently test read/write boundaries."],
      ["Human approval","Gate purchases, email sending, account changes, deletion and other high-impact actions; test refusal and timeouts."],
      ["Untrusted content and data","Defend against prompt injection, validate tool outputs, avoid secret disclosure and test adversarial inputs."],
      ["Cost and autonomy limits","Set spending, duration, retry and concurrency limits, monitoring, and an emergency stop as appropriate."],
      ["Data safeguards","Document subprocessors, regions, retention, backups, tenant isolation, export and deletion before ingesting customer data."],
      ["Incident response","Verify private security reporting, audit evidence without secrets, recovery tests and customer notification terms."]
    ],
    checklist:"What must be written before you pay",checkIntro:"Every commercial offer needs product-specific answers and a documented acceptance process.",
    buyer:[
      "Legal seller identity, product scope, deliverables, demo and acceptance criteria.",
      "Full prices, billing frequency, usage/API fees, taxes, refunds and cancellation.",
      "Supported integrations, granted permissions, approval gates and customer controls.",
      "Privacy notice, data processing roles, subprocessors, retention and deletion.",
      "Ownership, licensing, export formats and what happens on termination.",
      "Actual support hours, scope, incident process and any contractual availability targets.",
      "Security test evidence, recovery procedures and any genuinely held certifications.",
      "Explicit AI limitations, human oversight requirements and prohibited use cases."
    ],
    honesty:"What this page does not claim",limits:[
      "No SOC 2, ISO 27001, independent penetration test or formal certification is represented as completed.",
      "No invented customer testimonials, production SLA, uptime record, security guarantee or verified revenue.",
      "This static page has no customer-file upload form. The host, email provider and linked websites process access information under their own terms.",
      "Commercial data processing and applicable Uruguayan privacy duties must be evaluated for each actual product before onboarding."
    ],
    report:"Security reports",reportBody:"Report suspected problems privately by email. Do not send passwords, tokens, private customer records or exploit payloads. This page does not authorize probing private or third-party systems.",
    reportCta:"Contact security",preSale:"Discuss a pilot",
    refs:"Standards and regulatory references",refsIntro:"Published guidance for design and review, not an endorsement or certificate of VYRA.",
    footer:"VYRA · Independent software initiative · Uruguay",footNote:"No checkout, trial account or hosted customer agent is available through this informational page."
  },
  es:{
    title:"VYRA | Confianza y estado comercial",desc:"Transparencia de VYRA para futuros SaaS y agentes de IA: pruebas, seguridad, privacidad y requisitos antes de contratar.",
    kicker:"VYRA · TRANSPARENCIA COMERCIAL",head:"La confianza se demuestra.",sub:"Evidencia, límites reales y requisitos de lanzamiento para futuros productos SaaS y agentes de IA.",
    intro:"VYRA es una iniciativa independiente de software dirigida por Alerson Morales desde Uruguay. Esta página distingue los ejemplos técnicos públicos del desarrollo privado; no ofrece aquí un SaaS o agente de IA de pago en producción.",
    dated:"Declaración revisada el 2 de noviembre de 2026",notice:"Esta información no constituye una oferta de venta vigente, política de privacidad de un servicio de clientes operativo, términos vinculantes, acuerdo de servicio ni certificación de seguridad independiente.",
    home:"Portafolio profesional",switch:"English",code:"Inspeccionar ejemplos funcionales",ask:"Hacer una consulta comercial",
    evidence:"Qué puede verificar un comprador",evidenceIntro:"El código público y sus pruebas permiten evaluar prácticas de ingeniería. No certifican por sí solos un despliegue privado de SaaS o agentes.",
    statusTitle:"Estado real de los productos",statusIntro:"La planificación, los prototipos y las pruebas de muestra no equivalen a servicios listos para clientes.",
    products:[
      ["Agentes de IA y automatización","Desarrollo privado. Los permisos, las aprobaciones, la seguridad y los contratos deben verificarse para cada oferta."],
      ["Futuros productos SaaS","Esta página no ofrece suscripciones SaaS de disponibilidad general verificadas públicamente."],
      ["Catalog Integrity Engine","Prototipo interno de comparación de datos y pruebas de muestra; no se afirma un despliegue comercial auditado."],
      ["VYRA Fitness","Proyecto móvil privado en diseño y pruebas; no publicado aquí."]
    ],
    requirement:"Requisito previo al lanzamiento — no garantía implementada",verified:"Demostración pública",
    safety:"Controles que deben verificarse",safetyIntro:"Son condiciones de aceptación para el lanzamiento de productos reales. No indican que todos los sistemas de VYRA ya los cumplan.",
    controls:[
      ["Privilegios mínimos","Autorizar cada herramienta y operación, separar credenciales de clientes y probar límites de lectura y escritura."],
      ["Aprobación humana","Restringir pagos, envíos de correo, cambios de cuenta, borrados y acciones sensibles; probar rechazos y vencimientos."],
      ["Contenido y datos no confiables","Proteger frente a instrucciones maliciosas, validar salidas, no filtrar secretos y realizar pruebas adversariales."],
      ["Límites de gastos y autonomía","Restringir costos, duración, reintentos y concurrencia, con monitorización y parada de emergencia cuando aplique."],
      ["Protección de datos","Documentar proveedores, regiones, retención, copias, aislamiento, exportación y eliminación antes de incorporar clientes."],
      ["Incidentes y recuperación","Verificar recepción privada de avisos, registros sin secretos, recuperación y notificaciones a clientes."]
    ],
    checklist:"Qué debe constar por escrito antes de pagar",checkIntro:"Toda oferta necesita respuestas concretas por producto y criterios de aceptación documentados.",
    buyer:[
      "Identidad del vendedor, alcance, entregables, demostración y criterios de aceptación.",
      "Precio completo, frecuencia de cobro, cargos de API/uso, impuestos, reembolsos y cancelación.",
      "Integraciones admitidas, permisos otorgados, aprobaciones y controles disponibles.",
      "Aviso de privacidad, roles de tratamiento, terceros, retención y eliminación.",
      "Propiedad, licencia, exportación de información y tratamiento al finalizar.",
      "Soporte real, alcance, gestión de incidentes y cualquier compromiso contractual de disponibilidad.",
      "Evidencias de seguridad, recuperación y certificaciones efectivamente obtenidas.",
      "Límites de IA, necesidad de supervisión humana y usos prohibidos."
    ],
    honesty:"Lo que esta página no afirma",limits:[
      "No se presenta como superada ninguna auditoría SOC 2, ISO 27001, prueba de intrusión externa ni certificación formal.",
      "No se inventan testimonios de clientes, SLA, registros de disponibilidad, garantías de seguridad ni ingresos.",
      "Esta página estática no tiene formulario para subir archivos. El alojamiento, el correo y los sitios enlazados tratan datos según sus propios términos.",
      "El tratamiento comercial de datos y las obligaciones uruguayas aplicables deben evaluarse por producto antes de incorporar clientes."
    ],
    report:"Reportes de seguridad",reportBody:"Notifica problemas en privado por correo. No envíes contraseñas, tokens, datos privados ni material de explotación. Esta página no autoriza pruebas de sistemas privados o de terceros.",
    reportCta:"Contactar por seguridad",preSale:"Consultar un proyecto piloto",
    refs:"Estándares y normativa de referencia",refsIntro:"Guías para diseñar y revisar, no avales ni certificaciones de VYRA.",
    footer:"VYRA · Iniciativa independiente de software · Uruguay",footNote:"Esta página informativa no permite pagos, cuentas de prueba ni ejecución de agentes alojados de clientes."
  }
};
const css=':root{font-family:system-ui,-apple-system,sans-serif;background:#0c151c;color:#f0f6ef;--accent:#cef5a4;--muted:#c2d1c9;--line:#425d54}*{box-sizing:border-box}body{margin:0}a{color:var(--accent);text-underline-offset:4px}a:focus-visible{outline:3px solid var(--accent);outline-offset:4px}.wrap{max-width:1140px;margin:auto;padding:0 26px}.skip{position:absolute;top:-100px;left:15px;background:#eaffd3;color:#18291c;padding:12px;z-index:10}.skip:focus{top:10px}header{border-bottom:1px solid var(--line);background:#122128}header .wrap{display:flex;justify-content:space-between;align-items:center;gap:22px;padding-top:20px;padding-bottom:20px}.brand{font-size:20px;font-weight:900;color:#f0f6ed;text-decoration:none}.brand span{color:var(--accent)}nav{display:flex;gap:20px;flex-wrap:wrap}nav a{font-size:13px;font-weight:800;text-decoration:none}main{padding:62px 0 80px}.kicker{color:var(--accent);letter-spacing:.12em;font:800 11px ui-monospace,monospace}h1{font-size:clamp(42px,6vw,78px);line-height:1.05;letter-spacing:-.06em;margin:14px 0 17px}.sub{font-size:21px;line-height:1.42;color:#edf8e5;font-weight:720;max-width:800px}.lead{color:var(--muted);line-height:1.78;font-size:14px;max-width:930px}.date{color:#cbdbd0;font-size:12px}.actions{display:flex;gap:12px;flex-wrap:wrap;margin:27px 0}.actions a{border:1px solid #92ad80;border-radius:8px;padding:12px 17px;min-height:47px;text-decoration:none;font-size:13px;font-weight:800}.actions a:first-child{background:var(--accent);color:#13281c}.notice{background:#203128;border:1px solid #829b71;border-left:4px solid var(--accent);padding:18px 22px;border-radius:7px;color:#f1f7ea;line-height:1.68;font-size:14px;margin:24px 0}section{padding-top:59px;scroll-margin-top:90px}h2{font-size:clamp(27px,3vw,39px);letter-spacing:-.045em;line-height:1.13;margin:0 0 12px}.cards{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:15px;margin-top:24px}.triple{grid-template-columns:repeat(3,minmax(0,1fr))}.card{border:1px solid var(--line);background:#172830;border-radius:11px;padding:22px;min-width:0}.card h3{font-size:18px;letter-spacing:-.025em;margin:0 0 12px}.card p{color:var(--muted);font-size:13.5px;line-height:1.75}.card a{font-size:13px;font-weight:800;overflow-wrap:anywhere}.tag{font-size:11px;color:#e0f5cd;border:1px solid #6d885b;border-radius:12px;padding:5px 10px;display:inline-block;margin-bottom:14px}.buyer{counter-reset:item;list-style:none;padding:0;display:grid;grid-template-columns:1fr 1fr;gap:12px}.buyer li{counter-increment:item;position:relative;padding:18px 17px 18px 48px;background:#14232a;border:1px solid var(--line);border-radius:9px;font-size:14px;line-height:1.65;color:var(--muted)}.buyer li:before{content:counter(item,decimal-leading-zero);position:absolute;left:15px;top:22px;color:var(--accent);font:800 11px monospace}.plain{color:var(--muted);line-height:1.8;font-size:14px;padding-left:20px}.plain li{margin-bottom:11px}.links a{display:block;margin:11px 0;line-height:1.5;font-size:14px}footer{border-top:1px solid var(--line);background:#101e25;padding:28px 0 40px;color:var(--muted);font-size:13px;line-height:1.8}@media(max-width:880px){.triple{grid-template-columns:repeat(2,1fr)}}@media(max-width:650px){.wrap{padding:0 17px}header .wrap{flex-direction:column;align-items:flex-start}.cards,.buyer,.triple{grid-template-columns:1fr}main{padding:43px 0 65px}section{padding-top:45px}.card{padding:20px}}@media(prefers-reduced-motion:reduce){html{scroll-behavior:auto}}';
const tocStyles='.trust-toc{display:flex;align-items:center;flex-wrap:wrap;gap:11px;margin:25px 0 0;padding:15px 16px;background:#15252d;border:1px solid #46645b;border-radius:10px}.trust-toc span{font-size:12px;font-weight:850;color:#deecdd;margin-right:5px}.trust-toc a{font-size:12.5px;min-height:32px;display:inline-flex;align-items:center;padding:4px 7px;border-radius:5px}.trust-toc a:hover{background:#263f36}.trust-toc a:focus-visible{outline:3px solid var(--accent)}';
const refs=[
["OWASP AI Agent Security","https://cheatsheetseries.owasp.org/cheatsheets/AI_Agent_Security_Cheat_Sheet.html"],
["OWASP LLM Top 10","https://genai.owasp.org/llm-top-10/"],
["Uruguay Ley 18.331","https://www.impo.com.uy/bases/leyes/18331-2008"],
["URCDP obligaciones","https://www.gub.uy/unidad-reguladora-control-datos-personales/politicas-y-gestion/obligaciones"]
];
for(const lang of ["en","es"]){
 const c=strings[lang],home=base+lang+"/",canonical=host+lang+"/trust/";
  const webPageSchema=JSON.stringify({
    "@context":"https://schema.org","@type":"WebPage",
    name:c.title,description:c.desc,url:canonical,inLanguage:lang,
    isPartOf:{"@type":"WebSite",name:"Alerson Morales — Developer Portfolio",url:host}
  });
 const card=(name,body,foot)=>'<article class="card">'+(foot==='stage'?'<span class="tag">'+esc(c.requirement)+'</span>':'')+'<h3>'+esc(name)+'</h3><p>'+esc(body)+'</p>'+(foot&&foot!=='stage'?foot:'')+'</article>';
 const refLabel=(label,i)=>lang==="es"?["OWASP — Seguridad de agentes","OWASP — Riesgos de LLM","Ley uruguaya 18.331","URCDP — Obligaciones"][i]:label;
 const evidence=[
 ["Interactive examples","Browser-run CSV, idempotency and event metrics with synthetic data.",home+"labs/"],
 ["Python backend sample","Public local HTTP/SQLite validation and idempotency source with unit tests.","https://github.com/natanaelprogimo-afk/portfolio/tree/main/examples/backend"],
 ["SQL source and tests","Schema, indexes, window functions and reproducible query examples.","https://github.com/natanaelprogimo-afk/portfolio/tree/main/examples/sql"],
 ["Automated portfolio checks","GitHub Actions code and accessibility tests; not a SaaS security assessment.","https://github.com/natanaelprogimo-afk/portfolio/actions/workflows/quality.yml"]
 ];
 const evidenceEs=[
 ["Demostraciones interactivas","Comparación CSV, idempotencia y métricas con datos ficticios.",home+"labs/"],
 ["Ejemplo backend Python","Código público de HTTP/SQLite con validación, idempotencia y pruebas unitarias.","https://github.com/natanaelprogimo-afk/portfolio/tree/main/examples/backend"],
 ["Código SQL y pruebas","Esquemas, índices, funciones ventana y consultas reproducibles.","https://github.com/natanaelprogimo-afk/portfolio/tree/main/examples/sql"],
 ["Pruebas automáticas del portafolio","GitHub Actions: código y accesibilidad; no es una auditoría de seguridad SaaS.","https://github.com/natanaelprogimo-afk/portfolio/actions/workflows/quality.yml"]
 ];
 const all=(lang==="es"?evidenceEs:evidence).map(x=>card(x[0],x[1],'<a href="'+esc(x[2])+'">'+esc(c.verified)+' ↗</a>')).join("");
 const str=[
 '<!doctype html><html lang="'+lang+'"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">',
 '<meta name="description" content="'+esc(c.desc)+'"><meta name="theme-color" content="#0c151c"><title>'+esc(c.title)+'</title>',
 '<link rel="canonical" href="'+canonical+'"><link rel="alternate" hreflang="en" href="'+host+'en/trust/"><link rel="alternate" hreflang="es" href="'+host+'es/trust/">',
 '<link rel="alternate" hreflang="x-default" href="'+host+'en/trust/"><meta property="og:type" content="website"><meta property="og:title" content="'+esc(c.title)+'">',
 '<meta property="og:description" content="'+esc(c.desc)+'"><meta property="og:url" content="'+canonical+'">',
 '<meta property="og:locale" content="'+(lang==="es"?"es_UY":"en_US")+'"><meta property="og:locale:alternate" content="'+(lang==="es"?"en_US":"es_UY")+'">',
'<meta property="og:image" content="'+host+'og-trust.svg"><meta property="og:image:width" content="1200"><meta property="og:image:height" content="630"><meta property="og:image:alt" content="'+esc(lang==="es"?"Centro de confianza VYRA":"VYRA trust center")+'"><meta name="twitter:image" content="'+host+'og-trust.svg"><meta name="twitter:card" content="summary_large_image">',
'<meta name="twitter:title" content="'+esc(c.title)+'"><meta name="twitter:description" content="'+esc(c.desc)+'"><meta name="twitter:image:alt" content="'+esc(lang==="es"?"Centro de confianza VYRA":"VYRA trust center")+'">',
 '<script type="application/ld+json">'+webPageSchema+'</script>',
  '<link rel="icon" href="'+base+'favicon.svg" type="image/svg+xml"><style>'+css+tocStyles+'</style><link rel="stylesheet" href="'+base+'shared-pages.css"></head><body>',
 '<a class="skip" href="#main">'+(lang==="es"?"Saltar al contenido":"Skip to content")+'</a>',
 '<header><div class="wrap"><a class="brand" href="'+home+'">VYRA<span>.</span></a><nav aria-label="'+(lang==="es"?"Navegación":"Navigation")+'">',
 '<a href="'+home+'">'+esc(c.home)+'</a><a aria-current="page" href="'+base+lang+'/trust/">'+(lang==="es"?"Centro de confianza":"Trust center")+'</a>',
 '<a data-trust-language-switch href="'+base+(lang==="en"?"es":"en")+'/trust/" lang="'+(lang==="en"?"es":"en")+'">'+esc(c.switch)+'</a></nav></div></header>',
 '<main id="main" tabindex="-1"><div class="wrap"><span class="kicker">'+esc(c.kicker)+'</span><h1>'+esc(c.head)+'</h1>',
 '<p class="sub">'+esc(c.sub)+'</p><p class="lead">'+esc(c.intro)+'</p><p class="date">'+esc(c.dated)+'</p>',
 '<div class="actions"><a href="'+home+'labs/">'+esc(c.code)+' ↗</a><a href="mailto:'+email+'?subject='+encodeURIComponent(lang==="es"?"Consulta comercial sobre VYRA":"VYRA commercial due diligence")+'">'+esc(c.ask)+' ↗</a></div>',
 '<p class="notice">'+esc(c.notice)+'</p>',
 '<nav class="trust-toc" aria-label="'+(lang==="es"?"Accesos a secciones":"Jump to sections")+'">',
 '<span>'+(lang==="es"?"Ir a:":"Jump to:")+'</span>',
 ...[
   ["evidence","Evidencia","Evidence"],
   ["readiness","Estado","Readiness"],
   ["security","Seguridad","Security"],
   ["buy","Antes de comprar","Before purchase"],
   ["claims","Garantías","Disclosures"],
   ["report","Contacto","Contact"]
 ].map(([id,es,en])=>'<a href="#'+id+'">'+(lang==="es"?es:en)+'</a>'),
 '</nav>',
 '<section id="evidence"><h2>'+esc(c.evidence)+'</h2><p class="lead">'+esc(c.evidenceIntro)+'</p><div class="cards">'+all+'</div></section>',
 '<section id="readiness"><h2>'+esc(c.statusTitle)+'</h2><p class="lead">'+esc(c.statusIntro)+'</p><div class="cards">',
 c.products.map(x=>card(x[0],x[1],"stage")).join(""),'</div></section>',
 '<section id="security"><h2>'+esc(c.safety)+'</h2><p class="lead">'+esc(c.safetyIntro)+'</p><div class="cards triple">',
 c.controls.map(x=>card(x[0],x[1])).join(""),'</div></section>',
 '<section id="buy"><h2>'+esc(c.checklist)+'</h2><p class="lead">'+esc(c.checkIntro)+'</p><ol class="buyer">',
 c.buyer.map(x=>'<li>'+esc(x)+'</li>').join(""),'</ol></section>',
 '<section id="claims"><h2>'+esc(c.honesty)+'</h2><ul class="plain">',
 c.limits.map(x=>'<li>'+esc(x)+'</li>').join(""),'</ul></section>',
 '<section id="report"><h2>'+esc(c.report)+'</h2><p class="lead">'+esc(c.reportBody)+'</p><div class="actions">',
 '<a href="mailto:'+email+'?subject='+encodeURIComponent(lang==="es"?"Reporte de seguridad VYRA":"VYRA security report")+'">'+esc(c.reportCta)+' ↗</a>',
 '<a href="mailto:'+email+'?subject='+encodeURIComponent(lang==="es"?"Consulta sobre prueba piloto VYRA":"VYRA pilot inquiry")+'">'+esc(c.preSale)+' ↗</a></div></section>',
 '<section id="references" class="links"><h2>'+esc(c.refs)+'</h2><p class="lead">'+esc(c.refsIntro)+'</p>',
 refs.map(([label,url],i)=>'<a href="'+esc(url)+'" target="_blank" rel="noopener noreferrer">'+esc(refLabel(label,i))+' ↗</a>').join(""),'</section>',
 '</div></main><footer><div class="wrap">'+esc(c.footer)+'<p>'+esc(c.footNote)+'</p><a href="'+home+'">'+esc(c.home)+'</a></div></footer>',
'<script>document.querySelector("[data-trust-language-switch]")?.addEventListener("click",function(){const h=location.hash;if(h && document.getElementById(h.slice(1)))this.href=this.href.split("#")[0]+h})</script>',
'</body></html>'
 ].join("\n");
 const dir="dist/"+lang+"/trust";mkdirSync(dir,{recursive:true});writeFileSync(dir+"/index.html",str);console.log("Created "+dir+"/index.html");
}
