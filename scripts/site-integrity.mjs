/**
 * Link integrity and performance budgets for the generated static site.
 * Uses only Node.js built-ins. No web requests or external services.
 */
import { readFileSync, readdirSync, statSync, existsSync } from "node:fs";
import { join, relative, resolve, sep } from "node:path";
import assert from "node:assert/strict";

const root=resolve("dist");
const prefix=process.env.GITHUB_PAGES==="true"?"/portfolio/":"/";
const origin="https://internal.portfolio.test";
const pages=[];
const assets=[];

function walk(dir){
  for (const item of readdirSync(dir,{withFileTypes:true})){
    const path=join(dir,item.name);
    if (item.isDirectory())walk(path);
    else if (item.isFile()){
      assets.push({path,size:statSync(path).size});
      if(item.name.endsWith(".html"))pages.push(path);
    }
  }
}
walk(root);
assert.ok(pages.length>=9,"Expected base + bilingual pages to be generated.");

const tracked=[];
function checkLocalLink(value,relativeHtml){
  if (!value || /^(https?:|mailto:|tel:|data:|#|javascript:)/i.test(value))return;
  if(value.includes("%BASE_URL%"))throw new Error("Unresolved Vite BASE_URL in "+relativeHtml);
  let target;
  try {
    const at=origin+prefix+relativeHtml.replace(/index\.html$/,"");
    target=new URL(value,at);
  }catch {throw new Error("Invalid local URL: "+value+" in "+relativeHtml);}
  if(target.origin!==origin)return;
  assert.ok(target.pathname.startsWith(prefix),"Link escapes site prefix: "+value+" in "+relativeHtml);
  let item=decodeURIComponent(target.pathname.slice(prefix.length));
  if(item.endsWith("/")||item==="")item+="index.html";
  const full=resolve(root,item);
  assert.ok(full===root || full.startsWith(root+sep),"Path escaped output: "+value);
  assert.ok(existsSync(full),"Broken local link: "+value+" in "+relativeHtml+" -> "+item);
  tracked.push(relativeHtml+" -> "+item);
}
for(const page of pages){
  const relativeHtml=relative(root,page).split(sep).join("/");
  const html=readFileSync(page,"utf8");
  const matches=html.matchAll(/\b(?:href|src)="([^"]+)"/g);
  for (const match of matches)checkLocalLink(match[1],relativeHtml);
}

const sum=ext=>assets.filter(x=>x.path.endsWith(ext)).reduce((a,x)=>a+x.size,0);
const js=sum(".js"),css=sum(".css");
const og=assets.find(x=>x.path.endsWith("/og-preview.png")||x.path.endsWith(sep+"og-preview.png"));
assert.ok(js<=450_000,"JavaScript payload exceeded 450kB: "+js);
assert.ok(css<=75_000,"CSS payload exceeded 75kB: "+css);
if(og) assert.ok(og.size<=500_000,"Social image exceeded 500kB: "+og.size);
for(const lang of ["en","es"]){
  const data=readFileSync(join(root,lang,"index.html"),"utf8");
  assert.ok(data.includes('<html lang="'+lang+'">'),"Wrong document language "+lang);
  assert.equal((data.match(/hreflang="en"/g)||[]).length,1,"Duplicate English hreflang in "+lang);
  assert.equal((data.match(/hreflang="es"/g)||[]).length,1,"Duplicate Spanish hreflang in "+lang);
  assert.equal((data.match(/rel="canonical"/g)||[]).length,1,"Duplicate canonical link in "+lang);
}
// V12: every public language and evidence route must reference the built
// social asset. SVG is a safe fallback only when rasterization is unavailable.
const socialAsset=og?"og-preview.png":"og-preview.svg";
for(const lang of ["en","es"]){
  for(const page of ["", "labs/", "cases/", "hiring/", "trust/"]){
    const html=readFileSync(join(root,lang,page,"index.html"),"utf8");
    assert.ok(html.includes("og-preview."+socialAsset.split(".").at(-1)), "Social preview path is not consistent: "+lang+"/"+page);
    assert.ok(html.includes('property="og:image:width" content="1200"'),"Missing social width: "+lang+"/"+page);
    assert.ok(html.includes('property="og:image:height" content="630"'),"Missing social height: "+lang+"/"+page);
    assert.ok(html.includes('property="og:image:alt"'),"Missing alternative social text: "+lang+"/"+page);
    assert.ok(html.includes('name="twitter:card" content="summary_large_image"'),"Missing large Twitter card: "+lang+"/"+page);
    assert.ok(html.includes('property="og:locale" content="'+(lang==="es"?"es_UY":"en_US")+'"'),
      "Missing or wrong OG locale: "+lang+"/"+page);
    assert.ok(html.includes('property="og:locale:alternate" content="'+(lang==="es"?"en_US":"es_UY")+'"'),
      "Missing OG alternate locale: "+lang+"/"+page);
    for(const key of ['twitter:title','twitter:description','twitter:image'])
      assert.ok(html.includes('name="'+key+'"'),"Missing "+key+": "+lang+"/"+page);
    if(page) assert.ok(html.includes('shared-pages.css'),"Missing shared a11y stylesheet: "+lang+"/"+page);
  }
}
console.log(JSON.stringify({result:"PASS",pages:pages.length,localLinks:tracked.length,jsBytes:js,cssBytes:css,socialImageBytes:og?.size??null},null,2));
