/**
 * Automated accessibility regression with axe-core + Chrome.
 * This is a machine check, not a claim of certified WCAG conformance.
 */
import { spawn } from "node:child_process";
import { mkdirSync, writeFileSync } from "node:fs";
import { chromium } from "playwright";
import AxeBuilder from "@axe-core/playwright";

const root="http://127.0.0.1:4175";
const server=spawn(process.execPath,["node_modules/vite/bin/vite.js","preview","--host","127.0.0.1","--port","4175","--strictPort"],{stdio:"ignore"});
const delay=t=>new Promise(resolve=>setTimeout(resolve,t));
async function awaitServer(){
  for(let i=0;i<70;i++){
    try{if((await fetch(root+"/")).ok)return;}catch{ /* not ready */ }
    await delay(250);
  }
  throw new Error("Preview did not start for accessibility audit.");
}
mkdirSync("qa-evidence",{recursive:true});
let browser;
try {
  await awaitServer();
  browser=await chromium.launch({headless:true,channel:"chrome",args:["--no-sandbox"]});
  const context=await browser.newContext({viewport:{width:1366,height:900},reducedMotion:"reduce"});
  const page=await context.newPage();
  const routes=["/en/","/es/","/en/labs/","/es/labs/","/en/cases/","/es/cases/","/en/hiring/","/es/hiring/","/en/trust/","/es/trust/"];
  const reports=[];
  const failures=[];
  async function inspect(label){
    const result=await new AxeBuilder({page})
      .withTags(["wcag2a","wcag2aa","wcag21a","wcag21aa","wcag22aa"])
      .analyze();
    const violations=result.violations.map(v=>({
      id:v.id,impact:v.impact,description:v.help,
      nodes:v.nodes.slice(0,8).map(n=>({target:n.target,summary:n.failureSummary}))
    }));
    reports.push({route:label,passed:result.passes.length,violations});
    const actionable=violations.filter(v=>["critical","serious","moderate"].includes(v.impact));
    if(actionable.length)failures.push({route:label,actionable});
  }
  for(const width of [1366,390]){
    await page.setViewportSize({width,height:900});
    for(const route of routes){
      await page.goto(root+route,{waitUntil:"networkidle"});
      await inspect(route+" @ "+width);
    }
  }
  // Axe on dynamic content that is absent in a fresh default page.
  await page.setViewportSize({width:390,height:844});
  for(const lang of ["en","es"]){
    await page.goto(root+"/"+lang+"/labs/#catalog",{waitUntil:"networkidle"});
    await page.locator("#feed").fill("sku,price\\nA,not-a-price".replace("\\n","\n"));
    await page.locator("#run-catalog").click();
    await inspect("/"+lang+"/labs/ invalid CSV @390");
    await page.locator("#tab-retry").click();
    await page.locator("#request-payload").fill("invalid JSON");
    await page.locator("#run-retry").click();
    await inspect("/"+lang+"/labs/ invalid JSON @390");
    await page.goto(root+"/"+lang+"/",{waitUntil:"networkidle"});
    await page.locator(".project-show-more").click();
    await page.locator(".project-card button[aria-expanded]").first().click();
    await inspect("/"+lang+"/ expanded project @390");
  }
  writeFileSync("qa-evidence/axe-report.json",JSON.stringify({
    checked:new Date().toISOString(),tool:"axe-core via Playwright",
    limitation:"Automated checks do not replace manual assistive technology testing.",
    reports
  },null,2));
  console.log("Accessibility pages audited: "+reports.length+", actionable findings: "+failures.length);
  for(const r of reports)if(r.violations.length)console.log(JSON.stringify({route:r.route,violations:r.violations}));
  if(failures.length)throw new Error("Moderate/serious/critical axe findings: "+JSON.stringify(failures));
}finally{
  await browser?.close();
  server.kill("SIGTERM");
}
