/**
 * Public site end-to-end regression checks, executed against local Vite preview.
 * Uses an ephemeral Playwright install and GitHub runner's Chrome browser.
 */
import assert from "node:assert/strict";
import { spawn } from "node:child_process";
import { mkdirSync } from "node:fs";
import { chromium } from "playwright";

const origin="http://127.0.0.1:4173";
const server=spawn(process.execPath,["node_modules/vite/bin/vite.js","preview","--host","127.0.0.1","--port","4173","--strictPort"],
  {stdio:"ignore"});
const sleep=ms=>new Promise(r=>setTimeout(r,ms));
async function waitReady(){
  for(let i=0;i<70;i++){
    try{const r=await fetch(origin);if(r.ok)return;}catch{/* preview not ready */}
    await sleep(250);
  }
  throw new Error("Vite preview did not start.");
}

mkdirSync("qa-evidence",{recursive:true});
let browser;
try {
  await waitReady();
  browser=await chromium.launch({headless:true,channel:"chrome",args:["--no-sandbox"]});
  const page=await browser.newPage({viewport:{width:1366,height:900},reducedMotion:"reduce"});
  const errors=[];
  page.on("pageerror",error=>errors.push(error.message));

  await page.goto(origin+"/#work",{waitUntil:"networkidle"});
  await page.waitForSelector("#work");
  await page.waitForTimeout(200);
  const startY=await page.evaluate(()=>scrollY);
  assert.ok(startY>500,"Cold #work route should scroll to work section, got "+startY);

  await page.goto(origin+"/",{waitUntil:"networkidle"});
  await page.keyboard.press("Tab");
  assert.equal(await page.evaluate(()=>document.activeElement?.className),"skip-link");
  await page.keyboard.press("Enter");
  assert.equal(await page.evaluate(()=>document.activeElement?.id),"main","Skip link should focus main");

  await page.goto(origin+"/",{waitUntil:"networkidle"});
  await page.getByRole("button",{name:/Switch to Spanish/}).click();
  await page.waitForURL("**/es/");
  assert.equal(await page.locator("html").getAttribute("lang"),"es");
  assert.ok((await page.locator("h1").innerText()).includes("Problemas complejos"));
  assert.ok((await page.locator('link[rel="canonical"]').getAttribute("href")).includes("/es/"));

  await page.goto(origin+"/es/labs/#catalog",{waitUntil:"networkidle"});
  assert.doesNotMatch(await page.locator(".notice").innerText(),/No son no capturas/i);
  assert.ok((await page.locator(".notice").innerText()).includes("No son capturas"));
  assert.equal(await page.getByRole("columnheader",{name:"Estado"}).count(),1);
  assert.ok((await page.locator("#result-catalog").innerText()).includes("Diferencia"));
  await page.goto(origin+"/es/labs/#metrics",{waitUntil:"networkidle"});
  assert.equal(await page.locator("#tab-metrics").getAttribute("aria-selected"),"true");
  assert.equal(await page.locator("#panel-metrics").isVisible(),true);
  // Work samples should be visible near the first screen, with honest provenance.
  await page.goto(origin+"/en/#evidence",{waitUntil:"networkidle"});
  assert.equal(await page.locator("#evidence .verified-card").count(),3);
  assert.ok((await page.locator("#evidence").innerText()).includes("synthetic data"));
  assert.ok(await page.evaluate(()=>scrollY > 100),"Deep link to public proof should scroll");
  assert.equal(await page.locator("#evidence a[href*='examples/backend']").count(),1);
  assert.equal(await page.locator("#evidence a[href*='examples/sql']").count(),1);

  // Editable data and local CSV export are demonstrably functional.
  await page.goto(origin+"/en/labs/#catalog",{waitUntil:"networkidle"});
  assert.equal(await page.locator("#export-catalog").isDisabled(),false);
  assert.ok((await page.locator("#summary-catalog").innerText()).includes("Mismatches: 1"));
  const csvEvent=page.waitForEvent("download");
  await page.locator("#export-catalog").click();
  const csvFile=await csvEvent;
  assert.equal(csvFile.suggestedFilename(),"catalog-reconciliation.csv");
  const {readFileSync}=await import("node:fs");
  const csvContent=readFileSync(await csvFile.path(),"utf8");
  assert.ok(csvContent.includes('"SKU","Status","Feed","Observed"'));
  assert.ok(csvContent.includes('"SKU-002","mismatch"'));
  await page.locator("#feed").fill("sku,price\\nSKU-001,not-a-price".replace("\\n","\n"));
  await page.locator("#run-catalog").click();
  assert.equal(await page.locator("#export-catalog").isDisabled(),true);
  await page.goto(origin+"/en/labs/#metrics",{waitUntil:"networkidle"});
  await page.locator("#run-metrics").click();
  assert.equal(await page.locator("#export-metrics").isDisabled(),false);

  await page.goto(origin+"/en/cases/",{waitUntil:"networkidle"});
  assert.equal(await page.locator("h1").count(),1);

  await page.setViewportSize({width:390,height:844});
  await page.goto(origin+"/en/",{waitUntil:"networkidle"});
  await page.getByRole("button",{name:"Open navigation"}).click();
  assert.equal(await page.getByRole("button",{name:"Close navigation"}).getAttribute("aria-expanded"),"true");
  assert.equal(await page.evaluate(()=>document.activeElement?.getAttribute("href")),"#about");
  await page.keyboard.press("Tab");
  assert.equal(await page.evaluate(()=>document.activeElement?.getAttribute("href")),"#work");
  await page.keyboard.press("Escape");
  assert.equal(await page.getByRole("button",{name:"Open navigation"}).getAttribute("aria-expanded"),"false");
  await page.waitForFunction(() => document.activeElement?.getAttribute("aria-label") === "Open navigation");
  await page.getByRole("button",{name:"Open navigation"}).click();
  await page.getByRole("button",{name:"Close navigation"}).click();

  await page.screenshot({path:"qa-evidence/mobile-390.png",fullPage:true});
  await page.setViewportSize({width:320,height:844});
  await page.goto(origin+"/en/",{waitUntil:"networkidle"});
  const social=await page.evaluate(()=>{
    const links=[...document.querySelectorAll(".hero-meta a")];
    return links.map(el=>({text:el.textContent,x:el.getBoundingClientRect().x,right:el.getBoundingClientRect().right}));
  });
  assert.ok(social.every(x=>x.x>=0 && x.right<=321),"320px hero links must fit: "+JSON.stringify(social));
  await page.screenshot({path:"qa-evidence/mobile-320.png",fullPage:true});
  await page.setViewportSize({width:1366,height:900});
  await page.goto(origin+"/en/",{waitUntil:"networkidle"});
  await page.screenshot({path:"qa-evidence/desktop-1366.png",fullPage:true});
  assert.deepEqual(errors,[],"No unhandled page errors: "+errors.join(", "));
  console.log("E2E: navigation, deep-links, language, tab, accessibility and responsive checks passed.");
}finally {
  await browser?.close();
  server.kill("SIGTERM");
}
