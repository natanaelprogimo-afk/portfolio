import { test } from "node:test";
import assert from "node:assert/strict";
import { existsSync, readFileSync, readdirSync } from "node:fs";

const text = (path) => readFileSync(new URL("../" + path, import.meta.url), "utf8");

test("generated site ships the required static resources", () => {
  for (const path of ["dist/index.html", "dist/resume.html", "dist/resume-en.pdf", "dist/resume-es.pdf", "dist/favicon.svg", "dist/robots.txt", "dist/sitemap.xml", "dist/labs/index.html", "dist/labs/logic.mjs", "dist/cases/index.html", "dist/og-preview.svg"]) {
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
  for (const id of ["main", "top", "about", "work", "expertise", "approach", "contact"]) {
    assert.ok(app.includes('id="' + id + '"'), "missing anchor: " + id);
  }
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
  assert.match(text("dist/cases/index.html"), /not published/);
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
