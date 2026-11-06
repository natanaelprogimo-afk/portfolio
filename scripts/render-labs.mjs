/**
 * Laboratory pages are now constructed from explicit bilingual data and a
 * source-owned CSS/JS bundle, never from global English HTML replacement.
 * Source public/labs/index.html remains readable/developable in English.
 */
import { readFileSync } from "node:fs";
const source=readFileSync("public/labs/index.html","utf8");
const CSS=source.match(/<style>([\s\S]*?)<\/style>/)?.[1];
const moduleCode=source.match(/<script type="module">([\s\S]*?)<\/script>/)?.[1];
if(!CSS||!moduleCode)throw new Error("Lab source CSS or JavaScript missing");
const L=(en,es)=>({en,es});
const copy={
 title:L("Engineering Lab | Alerson Morales","Laboratorio de ingeniería | Alerson Morales"),
 desc:L("Three public, independently implemented engineering exercises using fictional browser-only data.","Tres ejercicios públicos e independientes de ingeniería con datos ficticios ejecutados solo en el navegador."),
 brand:L("AM. / ENGINEERING LAB","AM. / LABORATORIO TÉCNICO"),
 back:L("← Portfolio","← Portafolio"),
 skip:L("Skip to content","Saltar al contenido"),
 eyebrow:L("PUBLIC SOURCE · EXECUTABLE EXAMPLES · NO BACKEND","CÓDIGO PÚBLICO · EJEMPLOS EJECUTABLES · SIN BACKEND"),
 heading:L("Inspect the logic.","Inspecciona la lógica."),
 headingAccent:L("Try the behavior.","Prueba el funcionamiento."),
 intro:L("Three small, working engineering exercises built for technical review. Edit the sample data and observe the output. All computation happens inside your browser; no data is sent to any server.","Tres ejercicios técnicos funcionales para evaluación profesional. Modifica los datos de ejemplo y observa el resultado. Todo se ejecuta en tu navegador; no se envían datos a servidores."),
 noticeLabel:L("Transparency:","Transparencia:"),
 noticeBefore:L("These are independently implemented public teaching demonstrations inspired by common engineering problems. They are","Estos son ejemplos educativos públicos e independientes con datos ficticios. No son"),
 noticeAfter:L("screenshots, instances or extracts of private VYRA products, nor evidence of production customer usage. The source and tests live in the public portfolio repository.","de productos privados de VYRA y no demuestran uso por clientes en producción. El código y las pruebas están en el repositorio público."),
 catalogTab:L("01 · Catalog validation","01 · Validación de catálogos"),
 retryTab:L("02 · API idempotency","02 · Idempotencia de API"),
 metricsTab:L("03 · Event aggregation","03 · Agregación de eventos"),
 tabAria:L("Engineering examples","Ejemplos de ingeniería"),
 catalogTitle:L("Catalog reconciliation","Conciliación de catálogos"),
 catalogIntro:L("Compare two CSV datasets by SKU, with cent-precision price normalization and explicit match, mismatch, missing, and extra categories. Includes quote handling and duplicate-key rejection.","Compara dos archivos CSV por SKU, con precios exactos en centavos y clasificación de coincidencias, diferencias, ausencias y registros adicionales. Valida comillas y claves duplicadas."),
 feed:L("Expected feed (CSV)","Catálogo esperado (CSV)"),
 observed:L("Observed catalog (CSV)","Catálogo observado (CSV)"),
 compare:L("Compare catalogs →","Comparar catálogos →"),
 downloadCompare:L("Download comparison CSV","Descargar CSV de comparación"),
 localOnly:L("Local-only · no API calls","Solo local · sin solicitudes API"),
 catalogRegion:L("Catalog results","Resultados de catálogos"),
 catalogStatus:L("Press Compare catalogs to execute.","Pulsa Comparar catálogos para ejecutar."),
 retryTitle:L("Idempotent request behavior","Comportamiento idempotente"),
 retryIntro:L("Simulate how a service might handle an idempotency key. Replaying the same key and payload returns the recorded result, while key collisions and uncertain failures produce a conflict. This is an in-memory example, not an HTTP server.","Simula cómo un servicio maneja una clave de idempotencia. Repetir la misma clave y los mismos datos devuelve el resultado guardado; un conflicto o fallo incierto produce una respuesta de conflicto. Es una simulación en memoria, no un servidor HTTP."),
 key:L("Idempotency key","Clave de idempotencia"),
 payload:L("Payload (JSON)","Datos de solicitud (JSON)"),
 submit:L("Submit simulated request →","Enviar solicitud simulada →"),
 failure:L("Simulate uncertain failure","Simular fallo incierto"),
 reset:L("Reset ledger","Reiniciar registro"),
 retryRegion:L("Request simulation results","Resultados de la simulación"),
 retryStatus:L("Submit the same key twice to see replay behavior.","Envía dos veces la misma clave para comprobar la repetición."),
 metricsTitle:L("Operational metrics aggregation","Agregación de métricas operativas"),
 metricsIntro:L("Validate structured JSON events and compute daily request counts, error counts, success rate, and mean response latency. Input validation includes maximum sizes and required fields.","Valida eventos JSON y calcula solicitudes, errores, tasa de éxito y latencia media por día. Incluye límites de tamaño y campos obligatorios."),
 events:L("Sample event stream (JSON)","Eventos de ejemplo (JSON)"),
 analyze:L("Analyze events →","Analizar eventos →"),
 downloadMetrics:L("Download metrics CSV","Descargar CSV de métricas"),
 metricsHint:L("A working aggregation, not a SQL engine","Agregación funcional; no es un motor SQL"),
 metricsRegion:L("Metrics results","Resultados de métricas"),
 metricsStatus:L("Press Analyze events to execute.","Pulsa Analizar eventos para ejecutar."),
 footerBack:L("← Back to portfolio","← Volver al portafolio"),
 source:L("View public source code","Ver código fuente público"),
 footer:L("Synthetic examples · All processing is client-side.","Ejemplos ficticios · Todo se procesa en el navegador.")
};
const esc=s=>String(s).replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;");
export function renderLabs(locale,base){
 if(locale!=="en"&&locale!=="es")throw new Error("Unsupported laboratory locale");
 const t=key=>esc(copy[key][locale]);
 const other=locale==="en"?"es":"en";
 const langControl='<a data-language-switch href="'+base+other+'/labs/" lang="'+other+'">'+(other==="es"?"Español":"English")+'</a>';
 const script=moduleCode
  .replace('from "./logic.mjs"','from "'+base+'labs/logic.mjs"')
  .replace('from "./i18n.mjs"','from "'+base+'labs/i18n.mjs"');
 const nav='<header class="wrap top"><a class="brand" href="../">'+t("brand")+'</a><nav aria-label="'+t("tabAria")+'"><a href="../">'+t("back")+'</a>'+langControl+'</nav></header>';
 const field=(id,label,value,style="")=>'<div class="field"><label for="'+id+'">'+t(label)+'</label><textarea id="'+id+'" spellcheck="false"'+style+'>'+esc(value)+'</textarea></div>';
 const catalogFeed="sku,price\nSKU-001,29.99\nSKU-002,19.99\nSKU-003,49.50";
 const catalogObserved="sku,price\nSKU-001,29.99\nSKU-002,24.99\nSKU-004,10.00";
 const jsonEvents='[\n  {"date":"2026-10-30","duration_ms":180,"ok":true},\n  {"date":"2026-10-30","duration_ms":340,"ok":false},\n  {"date":"2026-10-31","duration_ms":120,"ok":true},\n  {"date":"2026-10-31","duration_ms":220,"ok":true}\n]';
 return [
 '<!doctype html><html lang="'+locale+'"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">',
 '<meta name="color-scheme" content="dark"><meta name="theme-color" content="#080d13">',
 '<meta name="description" content="'+t("desc")+'"><title>'+t("title")+'</title><style>'+CSS+'</style></head><body>',
 '<a class="skip-link" href="#main">'+t("skip")+'</a>'+nav,
 '<main class="wrap" id="main" tabindex="-1">',
 '<div class="intro"><div class="eyebrow">'+t("eyebrow")+'</div><h1>'+t("heading")+'<br><span>'+t("headingAccent")+'</span></h1><p>'+t("intro")+'</p></div>',
 '<div class="notice"><strong>'+t("noticeLabel")+'</strong> '+t("noticeBefore")+
 (locale==="en"?' <strong>not</strong> ':' <strong>capturas, instancias ni extractos</strong> ')+
 t("noticeAfter")+'</div>',
 '<div class="tabs" role="tablist" aria-label="'+t("tabAria")+'">',
 '<button id="tab-catalog" type="button" role="tab" aria-controls="panel-catalog" aria-selected="true" tabindex="0">'+t("catalogTab")+'</button>',
 '<button id="tab-retry" type="button" role="tab" aria-controls="panel-retry" aria-selected="false" tabindex="-1">'+t("retryTab")+'</button>',
 '<button id="tab-metrics" type="button" role="tab" aria-controls="panel-metrics" aria-selected="false" tabindex="-1">'+t("metricsTab")+'</button></div>',
 '<section class="panel" id="panel-catalog" role="tabpanel" aria-labelledby="tab-catalog">',
 '<h2>'+t("catalogTitle")+'</h2><p>'+t("catalogIntro")+'</p>',
 '<div class="fields">'+field("feed","feed",catalogFeed)+field("observed","observed",catalogObserved)+'</div>',
 '<div class="controls"><button class="run" id="run-catalog" type="button">'+t("compare")+'</button>',
 '<button class="reset" id="export-catalog" type="button" disabled>'+t("downloadCompare")+'</button><span class="hint">'+t("localOnly")+'</span></div>',
 '<p class="result-summary" id="summary-catalog" role="status" aria-live="polite"></p>',
 '<div class="result" id="result-catalog" role="region" aria-label="'+t("catalogRegion")+'" tabindex="0" aria-live="polite"><span class="status">'+t("catalogStatus")+'</span></div></section>',
 '<section class="panel" id="panel-retry" role="tabpanel" aria-labelledby="tab-retry" hidden>',
 '<h2>'+t("retryTitle")+'</h2><p>'+t("retryIntro")+'</p><div class="fields">',
 '<div class="field"><label for="idempotency-key">'+t("key")+'</label><input id="idempotency-key" value="demo-order-001" maxlength="96"></div>',
 field("request-payload","payload",'{"action":"reserve","item":"SKU-001","qty":1}',' style="height:95px"')+'</div>',
 '<div class="controls"><button class="run" id="run-retry" type="button">'+t("submit")+'</button>',
 '<button class="reset" id="run-failure" type="button">'+t("failure")+'</button><button class="reset" id="reset-retry" type="button">'+t("reset")+'</button></div>',
 '<div class="result" id="result-retry" role="region" aria-label="'+t("retryRegion")+'" tabindex="0" aria-live="polite"><span class="status">'+t("retryStatus")+'</span></div></section>',
 '<section class="panel" id="panel-metrics" role="tabpanel" aria-labelledby="tab-metrics" hidden>',
 '<h2>'+t("metricsTitle")+'</h2><p>'+t("metricsIntro")+'</p>',
 field("events","events",jsonEvents,' style="height:200px"'),
 '<div class="controls"><button class="run" id="run-metrics" type="button">'+t("analyze")+'</button>',
 '<button class="reset" id="export-metrics" type="button" disabled>'+t("downloadMetrics")+'</button><span class="hint">'+t("metricsHint")+'</span></div>',
 '<p class="result-summary" id="summary-metrics" role="status" aria-live="polite"></p>',
 '<div class="result" id="result-metrics" role="region" aria-label="'+t("metricsRegion")+'" tabindex="0" aria-live="polite"><span class="status">'+t("metricsStatus")+'</span></div></section>',
 '</main><footer class="wrap footer"><a href="../">'+t("footerBack")+'</a><a href="https://github.com/natanaelprogimo-afk/portfolio/tree/main/public/labs">'+t("source")+'</a>',
 '<div>© 2026 Alerson Morales · '+t("footer")+'</div></footer>',
 '<script type="module">'+script+'</script>',
 '<script>document.querySelector("[data-language-switch]")?.addEventListener("click",function(){this.href=this.href.split("#")[0]+location.hash})</script>',
 '</body></html>'
 ].join("\n");
}
