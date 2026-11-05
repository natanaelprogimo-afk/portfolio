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
  // The first screen offers distinct recruiter and commercial buyer paths.
  for (const language of ["en","es"]) {
    await page.goto(origin+"/"+language+"/",{waitUntil:"networkidle"});
    assert.equal(await page.locator('main[data-release="v13"]').count(),1);
    assert.equal(await page.locator("#start-here .route-card").count(),2);
    assert.equal(await page.locator(".verified-quick-links a").count(),4);
    assert.equal(await page.locator(".project-status-guide").count(),1);
    assert.equal(await page.locator("#start-here .route-card a[href$='/"+language+"/hiring/']").count(),1);
    assert.equal(await page.locator("#start-here .route-card a[href$='/"+language+"/trust/']").count(),1);
    assert.equal(await page.locator(".hero-cta a[href='#contact']").count(),1);
    assert.equal(await page.locator(".hero-meta a").count(),3);
    assert.equal(await page.locator(".hero-cta a[href='#evidence']").count(),1);
    const json = JSON.parse(await page.locator('script[type="application/ld+json"]').first().innerText());
    assert.equal(json["@type"],"Person");
    assert.equal(json.name,"Alerson Morales");
    assert.equal(json.homeLocation.name,"Uruguay");
    assert.ok(json.sameAs.some(uri=>uri.includes("github.com")));
  }

  // V10: direct exercise hashes reveal the active panel, not just the tab selection.
  for(const exercise of ["catalog","retry","metrics"]){
    await page.goto(origin+"/en/labs/#"+exercise,{waitUntil:"networkidle"});
    await page.waitForTimeout(150);
    const landing=await page.evaluate(id=>({
      scroll:window.scrollY,
      panelTop:document.getElementById("panel-"+id)?.getBoundingClientRect().top,
      viewport:window.innerHeight,
      maxScroll:document.documentElement.scrollHeight-window.innerHeight
    }),exercise);
    assert.ok(landing.scroll>80, "Deep link did not scroll into view: "+exercise+" "+JSON.stringify(landing));
    assert.ok((landing.panelTop??Infinity)<landing.viewport,
      "Deep-linked exercise is not visible: "+exercise+" "+JSON.stringify(landing));
    assert.equal(await page.locator("#tab-"+exercise).getAttribute("aria-selected"),"true");
  }
  await page.goto(origin+"/es/",{waitUntil:"networkidle"});
  assert.ok((await page.locator(".section-count").innerText()).includes("CASOS"));
  assert.ok((await page.locator(".project-grid .project-card").first().innerText()).includes("Developer Portfolio"));
  assert.ok((await page.locator(".project-grid").innerText()).includes("Interfaz adaptable"));
  await page.goto(origin+"/es/hiring/",{waitUntil:"networkidle"});
  await page.setViewportSize({width:390,height:844});
  const navRows=await page.locator(".top nav a").evaluateAll(a=>a.map(x=>Math.round(x.getBoundingClientRect().top)));
  // Wrapped rows are preferable to sub-24px touch targets on narrow screens.
  assert.ok(new Set(navRows).size>=1&&new Set(navRows).size<=3,
    "Hiring header navigation may wrap without overlapping: "+JSON.stringify(navRows));
  const narrowHeader=await page.locator(".top nav a").evaluateAll(items=>items.map(el=>{
    const b=el.getBoundingClientRect();return {height:b.height,left:b.left,right:b.right};
  }));
  assert.ok(narrowHeader.every(b=>b.height>=43.5&&b.left>=-1&&b.right<=391),
    "Spanish hiring links need accessible tap targets: "+JSON.stringify(narrowHeader));
  await page.setViewportSize({width:1366,height:900});

  // V9: distinct, functional buyer and recruiter contact entry points.
  for(const lang of ["en","es"]){
    await page.goto(origin+"/"+lang+"/#contact",{waitUntil:"networkidle"});
    assert.equal(await page.locator(".contact-paths .contact-path").count(),2);
    const links=await page.locator(".contact-paths a[href^='mailto:']").evaluateAll(items=>items.map(a=>a.getAttribute("href")));
    assert.equal(links.length,2);
    assert.ok(links.some(uri=>uri.includes(lang === "es" ? "Oportunidad%20laboral%20remota" : "Remote%20software%20engineering")));
    assert.ok(links.some(uri=>uri.includes(lang === "es" ? "Consulta%20sobre%20software" : "VYRA%20business")));
    assert.equal(await page.locator('.hero-meta a[href*="upwork.com/freelancers/"]').count(),1);
    assert.equal(await page.locator('.contact-path-business a[href*="upwork.com/freelancers/"]').count(),0);
    assert.equal(await page.locator('.contact-path:not(.contact-path-business) a[href*="upwork.com/freelancers/"]').count(),1);
    assert.equal(await page.locator(".contact-path a[href$='/"+lang+"/hiring/']").count(),1);
    assert.equal(await page.locator(".contact-path a[href$='/"+lang+"/trust/']").count(),1);
    assert.equal(await page.locator(".hero-visual .visual-disclaimer").count(),1);
  }
  await page.goto(origin+"/en/",{waitUntil:"networkidle"});
  await page.locator('.site-nav a[href="#work"]').click();
  await page.waitForFunction(()=>document.querySelector('.site-nav a[href="#work"]')?.getAttribute('aria-current')==='location');

  // Work samples should be visible near the first screen, with honest provenance.
  await page.goto(origin+"/en/#evidence",{waitUntil:"networkidle"});
  assert.equal(await page.locator("#evidence .verified-card").count(),3);
  assert.ok((await page.locator("#evidence").innerText()).includes("synthetic data"));
  assert.ok(await page.evaluate(()=>scrollY > 100),"Deep link to public proof should scroll");
  assert.equal(await page.locator("#evidence a[href*='examples/backend']").count(),1);
  assert.equal(await page.locator("#evidence a[href*='examples/sql']").count(),1);
  assert.equal(await page.locator("#evidence a[href*='examples/csv']").count(),1);
  assert.ok((await page.locator(".hero-terminal").innerText()).includes("mismatch"));
  assert.equal(await page.locator(".project-grid .project-card").count(),3);
  await page.locator(".project-show-more").click();
  assert.equal(await page.locator(".project-grid .project-card").count(),5);

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

  // V13: complete bilingual public case studies and accessible secondary headers.
  for(const lang of ["en","es"]){
    await page.goto(origin+"/"+lang+"/cases/",{waitUntil:"networkidle"});
    assert.equal(await page.locator("#public-proof article[data-evidence='public']").count(),3);
    assert.equal(await page.locator("#experience article[data-evidence='private']").count(),4);
    assert.equal(await page.locator("#python-csv a[href*='examples/csv']").count(),1);
    assert.equal(await page.locator("#python-api a[href*='examples/backend']").count(),1);
    if(lang==="es"){
      const whole=await page.locator("body").innerText();
      assert.ok(whole.includes("CASOS TÉCNICOS"));
      assert.ok(whole.toLocaleLowerCase("es").includes("problema de ingeniería"));
      assert.doesNotMatch(whole,/CASE STUDIES|Try independent idempotency sample/);
      const subjects=await page.locator("a[href^='mailto:']").evaluateAll(a=>a.map(node=>decodeURIComponent(node.getAttribute("href"))));
      assert.ok(subjects.some(text=>text.includes("Referencias de proyectos web")));
    }
    for(const section of ["python-csv","python-api","portfolio","client-websites","catalog-integrity","ai-automation","vyra-fitness"])
      assert.equal(await page.locator("#"+section).count(),1);
    for(const width of [320,390,768]){
      await page.setViewportSize({width,height:844});
      for(const route of ["cases","labs","hiring","trust"]){
        await page.goto(origin+"/"+lang+"/"+route+"/",{waitUntil:"networkidle"});
        const dimensions=await page.locator("header nav a").evaluateAll(links=>links.map(node=>{
          const rect=node.getBoundingClientRect();
          return {name:node.innerText,h:rect.height,left:rect.left,right:rect.right};
        }));
        assert.ok(dimensions.length>0,"Missing secondary header links: "+lang+"/"+route);
        assert.ok(dimensions.every(x=>x.h>=43.5&&x.left>=-1&&x.right<=width+1),
          "Unsafe secondary header targets at "+lang+"/"+route+" "+width+": "+JSON.stringify(dimensions));
        const scrollWidth=await page.evaluate(()=>document.documentElement.scrollWidth);
        assert.ok(scrollWidth<=width+1,"Secondary overflow "+lang+"/"+route+" at "+width+" got "+scrollWidth);
      }
    }
  }
  await page.setViewportSize({width:1366,height:900});
  await page.goto(origin+"/en/",{waitUntil:"networkidle"});
  assert.equal(await page.locator("#evidence .verified-case-link").count(),3);

  // Public SaaS/agent trust pages: evidence vs not-yet-verified services.
  for (const lang of ["en","es"]) {
    await page.goto(origin+"/"+lang+"/trust/",{waitUntil:"networkidle"});
    assert.equal(await page.locator("html").getAttribute("lang"),lang);
    assert.equal(await page.locator("h1").count(),1);
    assert.equal(await page.locator("#evidence .card").count(),4);
    assert.equal(await page.locator("#readiness .card").count(),4);
    assert.equal(await page.locator("#security .card").count(),6);
    assert.equal(await page.locator("#buy li").count(),8);
    assert.equal(await page.locator(".trust-toc a").count(),6);
    assert.equal(await page.locator('link[rel="canonical"]').count(),1);
    const copy=await page.locator("main").innerText();
    assert.ok(copy.includes("SOC 2"));
    assert.ok(copy.includes("ISO 27001"));
    assert.ok(copy.includes("OWASP"));
    assert.equal(await page.locator("form").count(),0);
    assert.equal(await page.locator('a[href*="mailto:"]').count()>=1,true);
  }
  await page.goto(origin+"/es/",{waitUntil:"networkidle"});
  assert.equal(await page.locator('a[href$="/es/trust/"]').count()>=1,true);

  // Check honest control semantics and accessible touch targets at 390px.
  await page.goto(origin+"/en/#work",{waitUntil:"networkidle"});
  const notesButton=page.locator(".project-card .project-actions button").first();
  assert.equal(await notesButton.getAttribute("aria-expanded"),"false");
  assert.equal(await notesButton.getAttribute("aria-controls"),null);
  await notesButton.click();
  assert.equal(await notesButton.getAttribute("aria-expanded"),"true");
  const notesId=await notesButton.getAttribute("aria-controls");
  assert.ok(notesId && await page.locator("#"+notesId).isVisible());
  await notesButton.click();
  assert.equal(await notesButton.getAttribute("aria-controls"),null);

  await page.setViewportSize({width:390,height:844});
  await page.goto(origin+"/en/",{waitUntil:"networkidle"});
  await page.getByRole("button",{name:"Open navigation"}).click();
  assert.equal(await page.getByRole("button",{name:"Close navigation"}).getAttribute("aria-expanded"),"true");
  assert.equal(await page.evaluate(()=>document.activeElement?.getAttribute("href")),"#evidence");
  await page.keyboard.press("Tab");
  assert.equal(await page.evaluate(()=>document.activeElement?.getAttribute("href")),"#about");
  for(let k=0;k<13;k++){
    await page.keyboard.press("Tab");
    assert.ok(await page.evaluate(()=>document.querySelector(".site-header")?.contains(document.activeElement)),
      "Focus must remain inside the open mobile navigation");
  }
  await page.keyboard.press("Escape");
  assert.equal(await page.getByRole("button",{name:"Open navigation"}).getAttribute("aria-expanded"),"false");
  await page.waitForFunction(() => document.activeElement?.getAttribute("aria-label") === "Open navigation");
  await page.getByRole("button",{name:"Open navigation"}).click();
  await page.getByRole("button",{name:"Close navigation"}).click();

  await page.screenshot({path:"qa-evidence/mobile-390.png",fullPage:true});
  const routeDimensions=await page.locator("#start-here .route-card").evaluateAll(cards=>cards.map(c=>({
    left:c.getBoundingClientRect().left,right:c.getBoundingClientRect().right,
    windowWidth:document.documentElement.clientWidth
  })));
  assert.equal(routeDimensions.length,2);
  assert.ok(routeDimensions.every(x=>x.left>=-1&&x.right<=x.windowWidth+1));
  await page.setViewportSize({width:320,height:844});
  await page.goto(origin+"/en/",{waitUntil:"networkidle"});
  // Usability goal: interactive controls are not hard to tap on narrow screens.
  const buttons=await page.locator(".project-filters button").evaluateAll(items=>items.map(el=>({
    h:el.getBoundingClientRect().height,w:el.getBoundingClientRect().width
  })));
  assert.ok(buttons.length>=3 && buttons.every(x=>x.h>=43&&x.w>=43),
    "Project filters should have at least 44px targets: "+JSON.stringify(buttons));
  await page.goto(origin+"/en/#contact",{waitUntil:"networkidle"});
  const contactWidths=await page.locator('.contact-path').evaluateAll(items=>items.map(node=>{
    const box=node.getBoundingClientRect();
    return {left:box.left,right:box.right,viewport:document.documentElement.clientWidth};
  }));
  assert.equal(contactWidths.length,2);
  assert.ok(contactWidths.every(x=>x.left>=-1&&x.right<=x.viewport+1),
    "Contact entry cards must fit narrow screens: "+JSON.stringify(contactWidths));
  const social=await page.evaluate(()=>{
    const links=[...document.querySelectorAll(".hero-meta a")];
    return links.map(el=>({text:el.textContent,x:el.getBoundingClientRect().x,right:el.getBoundingClientRect().right}));
  });
  assert.ok(social.every(x=>x.x>=0 && x.right<=321),"320px hero links must fit: "+JSON.stringify(social));
  await page.screenshot({path:"qa-evidence/mobile-320.png",fullPage:true});
  // V12: all project evidence graphics must reflow without clipped inner rows.
  for(const width of [320,360,390,768]){
    await page.setViewportSize({width,height:844});
    await page.goto(origin+"/en/#work",{waitUntil:"networkidle"});
    if(width<=390){
      assert.equal(await page.locator(".hero-visual").isHidden(),true);
      const proofPosition=await page.locator("#evidence").evaluate(node=>node.getBoundingClientRect().top+scrollY);
      assert.ok(proofPosition<1150,"Public proof should appear near the first mobile screen: "+width+" "+proofPosition);
    }
    // Same-document hash navigation retains React state: do not close an
    // already expanded list when checking successive viewport widths.
    const expand=page.locator(".project-show-more");
    if((await expand.getAttribute("aria-expanded")) !== "true")await expand.click();
    await page.locator(".project-grid .project-card").nth(4).waitFor({state:"visible"});
    const blocks=await page.locator(".project-proof").evaluateAll(nodes=>nodes.map(node=>{
      const bounds=node.getBoundingClientRect();
      const footnote=node.querySelector(".proof-footnote");
      const footRect=footnote?.getBoundingClientRect();
      return {id:node.closest(".project-card")?.querySelector("h3")?.textContent,
        left:bounds.left,right:bounds.right,client:document.documentElement.clientWidth,
        scrollHeight:node.scrollHeight,clientHeight:node.clientHeight,
        footerInside:!footRect || (footRect.bottom <= bounds.bottom+1 && footRect.top>=bounds.top-1)};
    }));
    const totalWidth=await page.evaluate(()=>document.documentElement.scrollWidth);
    assert.ok(totalWidth<=width+1,"Unexpected page overflow at "+width+": "+totalWidth);
    assert.equal(blocks.length,5);
    assert.ok(blocks.every(x=>x.left>=-1&&x.right<=x.client+1&&x.scrollHeight<=x.clientHeight+1&&x.footerInside),
      "Project previews overflow at "+width+": "+JSON.stringify(blocks));
    assert.equal(await page.locator('a.brand[aria-label="AM. Alerson Morales — home"]').count(),1);
    if(width===390)await page.screenshot({path:"qa-evidence/v12-expanded-projects-390.png",fullPage:true});
    if(width===320)await page.screenshot({path:"qa-evidence/v12-expanded-projects-320.png",fullPage:true});
  }
  await page.setViewportSize({width:1366,height:900});
  await page.goto(origin+"/en/",{waitUntil:"networkidle"});
  await page.setViewportSize({width:1366,height:900});
  await page.goto(origin+"/en/",{waitUntil:"networkidle"});
  await page.screenshot({path:"qa-evidence/desktop-1366.png",fullPage:true});
  assert.deepEqual(errors,[],"No unhandled page errors: "+errors.join(", "));
  console.log("E2E: navigation, deep-links, language, tab, accessibility and responsive checks passed.");
}finally {
  await browser?.close();
  server.kill("SIGTERM");
}
