import { test } from "node:test";
import assert from "node:assert/strict";
import { existsSync, readFileSync, readdirSync } from "node:fs";

const text = (path) => readFileSync(new URL("../" + path, import.meta.url), "utf8");

test("generated site ships the required static resources", () => {
  for (const path of ["dist/index.html", "dist/resume.html", "dist/resume-en.pdf", "dist/resume-es.pdf", "dist/favicon.svg", "dist/robots.txt", "dist/sitemap.xml", "dist/labs/index.html", "dist/labs/logic.mjs", "dist/cases/index.html", "dist/og-preview.svg", "dist/shared-pages.css", "dist/cases.css"]) {
    assert.ok(existsSync(new URL("../" + path, import.meta.url)), path + " is missing");
  }
  const assetDir = new URL("../dist/assets/", import.meta.url);
  const assets = readdirSync(assetDir);
  assert.ok(assets.some((name) => /^index-.*\.js$/.test(name)), "built JS is missing");
  assert.ok(assets.some((name) => /^index-.*\.css$/.test(name)), "built CSS is missing");
});

test("SEO metadata and Pages asset paths are valid", () => {
  const index = text("dist/index.html");
  assert.match(index, /Alerson Morales \| Full-Stack Software Engineer/);
  assert.match(index, /rel="canonical"/);
  assert.match(index, /application\/ld\+json/);
  const prefix = process.env.GITHUB_PAGES === "true" ? "/portfolio/" : "/";
  assert.ok(index.includes(prefix + "assets/"), "invalid deployment base path");
});

test("public résumé omits identity documents and supports printing", () => {
  const resume = text("dist/resume.html");
  assert.match(resume, /Alerson Morales/);
  assert.match(resume, /window\.print\(\)/);
  assert.match(resume, /mailto:moralesalerson@gmail\.com/);
  assert.doesNotMatch(resume, /\b\d{1,2}\.\d{3}\.\d{3}-\d\b/, "national ID-like value exposed");
  assert.doesNotMatch(resume, /Cédula de identidad:\s*\d/i);
});

test("site contains navigation anchors and honest project statuses", () => {
  const app = text("src/App.tsx");
  const projectData = text("src/data/projects.ts");
  for (const id of ["main", "top", "about", "work", "expertise", "contact"]) {
    assert.ok(app.includes('id="' + id + '"'), "missing anchor: " + id);
  }
  assert.match(text("src/components/VisitorRoutes.tsx"), /id="start-here"/);
  assert.match(text("src/components/VerifiedWork.tsx"), /id="evidence"/);
  assert.doesNotMatch(app,/className="section approach-section"/);
  assert.doesNotMatch(app,/className="section lab-section"/);
  assert.match(app, /import\.meta\.env\.BASE_URL \+ "resume\.html"/);
  assert.match(projectData, /Not released/);
  assert.match(projectData, /Private/);
  assert.match(projectData, /2 websites completed/);
  assert.doesNotMatch(projectData, /Live & functional/);
  assert.doesNotMatch(app, /Natael/);
});

test("both downloadable PDFs have a valid signature and no exposed national identity number", () => {
  for (const lang of ["en", "es"]) {
    const pdf = readFileSync(new URL("../dist/resume-" + lang + ".pdf", import.meta.url));
    assert.equal(pdf.subarray(0,8).toString("latin1"), "%PDF-1.4");
    assert.ok(pdf.toString("latin1").includes("%%EOF"), "PDF must end properly");
    assert.ok(pdf.toString("latin1").includes("/Type /Page"), "PDF needs a page");
    assert.doesNotMatch(pdf.toString("latin1"), /5\.610\.747/);
  }
});
test("public engineering examples are explicitly disclosed as independent samples", () => {
  assert.match(text("dist/labs/index.html"), /independently implemented public teaching demonstrations/);
  const cases=text("dist/en/cases/index.html");
  assert.match(cases,/data-evidence="public"/);
  assert.match(cases,/not a hosted production API|not a hosted|not a customer/i);
});

test("localized routes ship static content and independent metadata", () => {
  for (const locale of ["en", "es"]) {
    const homepage=text("dist/"+locale+"/index.html");
    assert.match(homepage, /<main class="container" id="main"/);
    assert.match(homepage, new RegExp('<html lang="'+locale+'">'));
    assert.match(homepage, new RegExp('<link rel="canonical" href="https://natanaelprogimo-afk.github.io/portfolio/'+locale+'/'));
    for (const route of ["labs", "cases"]) {
      const page=text("dist/"+locale+"/"+route+"/index.html");
      assert.match(page,new RegExp('<html lang="'+locale+'">'));
      assert.match(page, /hreflang="es"/);
      assert.match(page, /property="og:title"/);
      assert.match(page, new RegExp('/portfolio/'+locale+'/'+route+'/'));
    }
    const lab=text("dist/"+locale+"/labs/index.html");
    const prefix=process.env.GITHUB_PAGES === "true" ? "/portfolio/" : "/";
    assert.ok(lab.includes('from "'+prefix+'labs/logic.mjs"'));
  }
  assert.match(text("dist/es/index.html"), /Problemas complejos/);
  assert.match(text("dist/es/labs/index.html"), /Conciliación de catálogos/);
  assert.match(text("dist/es/cases/index.html"), /Problema de ingeniería/);
});


test("V13 case studies use structured bilingual source with distinct public and private scopes",()=>{
 const renderer=text("scripts/render-cases.mjs");
 assert.match(renderer,/const cases=\[/);
 for(const lang of ["en","es"]){
   const html=text("dist/"+lang+"/cases/index.html");
   assert.equal((html.match(/data-evidence="public"/g)||[]).length,3);
   assert.equal((html.match(/data-evidence="private"/g)||[]).length,4);
   for(const anchor of ["python-csv","python-api","portfolio","client-websites","catalog-integrity","ai-automation","vyra-fitness"])
     assert.ok(html.includes('id="'+anchor+'"'),"Missing "+lang+" case "+anchor);
   assert.ok(html.includes("examples/csv"),"Public CSV source missing");
   assert.ok(html.includes("examples/backend"),"Public backend source missing");
   assert.ok(html.includes("cases.css"),"Static case stylesheet missing");
 }
 const es=text("dist/es/cases/index.html");
 assert.doesNotMatch(es,/CASE STUDIES|Try independent idempotency sample|Website%20project%20references/);
 assert.match(es,/Casos|CASOS TÉCNICOS/);
 assert.match(es,/Referencias de proyectos web|Referencias%20de%20proyectos%20web/);
 assert.match(es,/Problema de ingeniería/);
 assert.match(text("dist/es/hiring/index.html"),/examples\/csv/);
});

test("generated recruiter PDFs contain live links and language metadata", () => {
  for (const lang of ["en","es"]) {
    const buffer=readFileSync(new URL("../dist/resume-"+lang+".pdf", import.meta.url));
    const content=buffer.toString("latin1");
    assert.match(content,/\/Annots \[7 0 R 8 0 R 9 0 R\]/);
    assert.equal((content.match(/\/Subtype \/Link/g)||[]).length,3);
    assert.match(content,/\/URI \(https:\/\/github\.com\/natanaelprogimo-afk\)/);
    assert.match(content,new RegExp("/Lang \\("+(lang==="en"?"en-US":"es-UY")+"\\)"));
  }
});

test("recruiter briefs are independently readable, honest and interlinked", () => {
  for (const locale of ["en", "es"]) {
    const html = text("dist/" + locale + "/hiring/index.html");
    assert.match(html, new RegExp('<html lang="' + locale + '">'));
    assert.match(html, /rel="canonical"/);
    assert.match(html, /hreflang="en"/);
    assert.match(html, /hreflang="es"/);
    assert.match(html, /mailto:moralesalerson@gmail.com/);
    assert.match(html, /examples\/backend/);
    assert.match(html, /examples\/sql/);
    assert.match(html, /window\.print\(\)/);
    assert.doesNotMatch(html, /\b\d{1,2}\.\d{3}\.\d{3}-\d\b/);
  }
});

test("public CV content has correct Spanish accents and official education, without sensitive ID", () => {
  const en=readFileSync(new URL("../dist/resume-en.pdf",import.meta.url)).toString("latin1");
  const es=readFileSync(new URL("../dist/resume-es.pdf",import.meta.url)).toString("latin1");
  for(const required of ["años","aplicación","diseño","clínica","Tecnológico","FORMACIÓN","Español","Inglés"]){
    assert.ok(es.includes(required), "Missing correctly encoded Spanish expression: "+required);
  }
  assert.match(en, /UTU diplomas/);
  assert.doesNotMatch(es, /\b(?:anos|Ingles|Espanol|Formacion|Automatizacion)\b/);
  assert.doesNotMatch(es, /5\.610\.747/);
});
test("professional profile copy includes no invented seniority or identity number", () => {
  for(const file of ["docs/LINKEDIN_PROFILE_READY.md","docs/GITHUB_PROFILE_README.md"]){
    const data=text(file);
    assert.match(data, /Alerson Morales/);
    assert.doesNotMatch(data, /5\.610\.747/);
  }
});

test("buyer trust pages disclose commercial limitations and independently inspectable sources", () => {
  for(const locale of ["en","es"]){
    const html=text("dist/"+locale+"/trust/index.html");
    assert.match(html,new RegExp('<html lang="'+locale+'">'));
    assert.match(html,new RegExp('rel="canonical" href="https://natanaelprogimo-afk.github.io/portfolio/'+locale+'/trust/'));
    assert.match(html,/hreflang="en"/);
    assert.match(html,/hreflang="es"/);
    assert.match(html,/OWASP/);
    assert.match(html,/SOC 2/);
    assert.match(html,/ISO 27001/);
    assert.match(html,/examples\/backend/);
    assert.match(html,/mailto:moralesalerson@gmail.com/);
    assert.doesNotMatch(html,/<form\b/);
    assert.doesNotMatch(html,/5\.610\.747/);
  }
  assert.match(text("dist/en/trust/index.html"),/not a.*security certification/);
  assert.match(text("dist/es/trust/index.html"),/no garantía implementada/);
});

test("professional JSON-LD is valid, truthful and localized on homepages", () => {
  for (const lang of ["en","es"]) {
    const html = text("dist/"+lang+"/index.html");
    const scripts=[...html.matchAll(/<script type="application\/ld\+json">([^<]+)<\/script>/g)];
    assert.equal(scripts.length,1,"One JSON-LD person schema expected for "+lang);
    const schema=JSON.parse(scripts[0][1]);
    assert.equal(schema["@type"],"Person");
    assert.equal(schema.name,"Alerson Morales");
    assert.equal(schema.homeLocation.name,"Uruguay");
    assert.ok(schema.sameAs.includes("https://github.com/natanaelprogimo-afk"));
    assert.ok(schema.url.endsWith("/"+lang+"/"));
    assert.doesNotMatch(html,/\"award\"|\"alumniOf\":\s*\[\s*\"University/);
  }
});

test("deployment requires successful complete CI on exact main SHA", () => {
  const deployment = text(".github/workflows/deploy.yml");
  assert.match(deployment,/workflow_run:/);
  assert.match(deployment,/workflows: \["Quality checks"\]/);
  assert.match(deployment,/branches: \[main\]/);
  assert.match(deployment,/workflow_run\.conclusion == 'success'/);
  assert.match(deployment,/workflow_run\.head_sha/);
  assert.doesNotMatch(deployment,/workflow_dispatch:/);
  assert.doesNotMatch(deployment,/\n  push:\s*\n/);
});
test("project accordion only announces a control when its panel is present", () => {
  const source=text("src/App.tsx");
  assert.match(source,/aria-controls=\{expanded === project\.id \?/);
});
test("unused router dependency is removed from package and lockfile", () => {
  const pkg=JSON.parse(text("package.json"));
  const lock=JSON.parse(text("package-lock.json"));
  assert.equal(pkg.dependencies["react-router-dom"],undefined);
  assert.equal(lock.packages["node_modules/react-router-dom"],undefined);
  assert.equal(lock.packages[""].dependencies["react-router-dom"],undefined);
});

test("V9 dual-track contact and conceptual diagram are explicit and accessible", () => {
  const app=text("src/App.tsx");
  const style=text("src/v9.css");
  assert.match(app,/className="contact-paths"/);
  assert.match(app,/className="contact-path contact-path-business"/);
  assert.match(app,/encodeURIComponent\(locale === "es"/);
  assert.match(app,/Consulta sobre software empresarial VYRA/);
  assert.match(app,/VYRA business software inquiry/);
  assert.match(app,/UPWORK/);
  assert.match(app,/aria-current=\{activeSection === id \?/);
  assert.match(app,/className="visual-disclaimer"/);
  assert.match(app,/className="hero-visual" aria-label=\{t\.visualOverviewLabel\}/);
  assert.match(style,/prefers-reduced-motion/);
  assert.match(style,/forced-colors:active/);
  assert.doesNotMatch(app,/LIVE SAAS|100% SECURE|SOC 2 CERTIFIED/);
});

test("V10 evidence ordering, translations and hash navigation are present",()=>{
 const app=text("src/App.tsx"), content=text("src/data/copy.ts");
 const lab=text("public/labs/index.html"), hiring=text("scripts/build-hiring.mjs");
 assert.match(app,/publicFirstOrder/);
 assert.match(app,/project: 0|portfolio: 0/);
 assert.match(app,/workCasesLabel/);
 assert.match(content,/workCasesLabel: "CASOS"/);
 assert.match(content,/contactEyebrow: "04 \/ CONTACTO"/);
 assert.match(lab,/activateFromHash/);
 assert.match(lab,/scrollIntoView/);
 assert.match(hiring,/top nav\{gap:7px/);
 assert.match(app,/originalOverflow/);
});
