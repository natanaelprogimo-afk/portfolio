import { writeFileSync } from "node:fs";

function quote(s) {
  return s.replaceAll("\\","\\\\").replaceAll("(","\\(").replaceAll(")","\\)");
}
function make(lang, qa=false) {
  const english = lang === "en";
  // Background and separators are pagination artifacts, excluded from reading order.
  let page = "/Artifact BMC\n0.05 0.10 0.12 rg 0 728 595 114 re f\nEMC\n";
  const tags=[];
  const text = (s,x,y,size=9,bold=false,color=[0.13,0.19,0.2],semantic="P") => {
    const mcid=tags.length;tags.push(semantic);
    page += "/"+semantic+" <</MCID "+mcid+">> BDC\n";
    page += color.map(v=>v.toFixed(3)).join(" ")+" rg\n";
    page += "BT /"+(bold?"F2":"F1")+" "+size+" Tf 1 0 0 1 "+x+" "+y+" Tm ("+quote(s)+") Tj ET\nEMC\n";
  };
  const rule = y => {page+="/Artifact BMC\n0.8 0.86 0.82 RG 0.7 w 42 "+y+" m 553 "+y+" l S\nEMC\n";};
  text("ALERSON MORALES",42,795,26,true,[.96,.98,.95],"H1");
  text(qa ? (english?"Junior QA / Software Tester | Python":"QA Junior | Pruebas de Software con Python") : (english?"Junior Software Developer | Python, React & APIs":"Desarrollador Junior | Python, React y API REST"),42,764,12,true,[.8,.96,.58]);
  text(english?"Uruguay | 100% Remote | moralesalerson@gmail.com":"Uruguay | 100 % remoto | moralesalerson@gmail.com",42,746,9.2,false,[.89,.94,.89]);
  let y=699;
  const section=s=>{text(s.toUpperCase(),42,y,10,true,[.10,.36,.32],"H2");rule(y-6);y-=25;};
  const lines=arr=>{for(const s of arr){text(s,42,y,9.4);y-=14;}y-=7;};
  const linkData=[];
  const link=(s,url)=>{text(s,42,y,9.4,false,[.06,.35,.30]);linkData.push([url,y]);y-=16;};
  if(qa && english){
    section("Professional profile");
    lines(["Junior software tester seeking 100% remote opportunities.",
      "Hands-on API/input validation, regression checks and unit testing.",
      "Independent practice; no commercial QA tenure is claimed."]);
    section("Inspectable test evidence");
    lines(["Python HTTP API: errors, replay/conflicts and unittest cases.",
      "Python CSV: malformed rows, duplicates and unsafe exports.",
      "JavaScript lab: browser scenarios with deterministic results.",
      "React portfolio: CI, browser and accessibility checks.",
      "Two business websites completed; references not yet public."]);
    section("Testing skills");
    lines(["Functional testing, exploratory checks, regression and bug analysis",
      "Python unittest, JavaScript tests, API basics, SQL and Git",
      "Input validation, boundary cases, browser and accessibility testing"]);
    section("Education and languages");
    lines(["Technical upper-secondary diploma in Informatics, Uruguay (2025).",
      "UTU diplomas: PC Operator Basic/Advanced; Informatics/Web Design.",
      "Spanish native | English C1 | Portuguese intermediate."]);
    section("Links");
    link("Portfolio: natanaelprogimo-afk.github.io/portfolio/en/","https://natanaelprogimo-afk.github.io/portfolio/en/");
    link("GitHub: github.com/natanaelprogimo-afk","https://github.com/natanaelprogimo-afk");
    link("LinkedIn: alerson-anatael-morales-pintos-4a4634325","https://www.linkedin.com/in/alerson-anatael-morales-pintos-4a4634325/");
  }else if(qa){
    section("Perfil profesional");
    lines(["Tester de software junior; busco trabajo remoto desde Uruguay.",
      "Practico validación de API, regresión y pruebas automáticas.",
      "Ejemplos propios; no afirmo empleo comercial previo en QA."]);
    section("Evidencia pública de pruebas");
    lines(["API Python: errores, idempotencia y casos unittest.",
      "Python CSV: filas inválidas, duplicados y exportaciones seguras.",
      "Laboratorio JavaScript: escenarios reproducibles en navegador.",
      "Portafolio React: CI, pruebas de navegador y accesibilidad.",
      "Dos sitios para negocios terminados; referencias no públicas."]);
    section("Competencias QA");
    lines(["Testing funcional, exploratorio, regresión y análisis de errores",
      "Python unittest, pruebas JavaScript, API REST, SQL y Git",
      "Validación de datos, casos límite y accesibilidad web"]);
    section("Formación e idiomas");
    lines(["Bachillerato Tecnológico en Informática, Uruguay (2025).",
      "Diplomas UTU: Operador PC Básico/Avanzado y Diseño Web.",
      "Español nativo | Inglés C1 | Portugués intermedio."]);
    section("Enlaces");
    link("Portafolio: natanaelprogimo-afk.github.io/portfolio/es/","https://natanaelprogimo-afk.github.io/portfolio/es/");
    link("GitHub: github.com/natanaelprogimo-afk","https://github.com/natanaelprogimo-afk");
    link("LinkedIn: alerson-anatael-morales-pintos-4a4634325","https://www.linkedin.com/in/alerson-anatael-morales-pintos-4a4634325/");
  }else if(english){
    section("Professional profile");
    lines(["Junior software developer based in Uruguay; seeking 100% remote roles.",
      "Builds public Python/React samples with reproducible tests and guides.",
      "Independent projects are distinct from commercial deployments."]);
    section("Selected work");
    lines(["Public: Python HTTP/SQLite API with validation and unit tests.",
      "Public: Python CSV reconciliation with Decimal and test fixtures.",
      "Public: React/TypeScript portfolio with browser checks and CI.",
      "Public: SQL/SQLite reporting exercises and unit tests.",
      "Client websites: dental practice and paint retailer (references pending).",
      "VYRA: independent software projects, mostly private/unreleased."]);
    section("Technical skills");
    lines(["Python, JavaScript, TypeScript, React, HTML/CSS, Node.js and SQL",
      "REST APIs, SQLite, CSV validation, Git/GitHub, automated testing",
      "React Native/Expo and Supabase in private, unreleased projects"]);
    section("Education and languages");
    lines(["Technical upper-secondary diploma in Informatics - completed 2025.",
      "UTU diplomas: PC Operator Basic/Advanced and Informatics/Web Design.",
      "Spanish: native | English: C1 | Portuguese: intermediate."]);
    section("Links");
    link("Portfolio: natanaelprogimo-afk.github.io/portfolio/en/","https://natanaelprogimo-afk.github.io/portfolio/en/");
    link("GitHub: github.com/natanaelprogimo-afk","https://github.com/natanaelprogimo-afk");
    link("LinkedIn: alerson-anatael-morales-pintos-4a4634325","https://www.linkedin.com/in/alerson-anatael-morales-pintos-4a4634325/");
  }else{
    section("Perfil profesional");
    lines(["Desarrollador junior de software de Uruguay; busco trabajo remoto.",
      "Programo ejemplos públicos de Python y React con pruebas y guías.",
      "Distingo proyectos independientes de despliegues comerciales."]);
    section("Proyectos");
    lines(["Público: API HTTP/SQLite en Python con validación y tests.",
      "Público: conciliador CSV Python con Decimal y datos de muestra.",
      "Público: portafolio React/TypeScript, CI y pruebas de navegador.",
      "Público: ejercicios SQL/SQLite y pruebas unitarias.",
      "Clientes: dos sitios web terminados (referencias pendientes).",
      "VYRA: proyectos independientes principalmente privados."]);
    section("Competencias técnicas");
    lines(["Python, JavaScript, TypeScript, React, HTML/CSS, Node.js y SQL",
      "API REST, SQLite, validación CSV, Git/GitHub y pruebas automáticas",
      "React Native/Expo y Supabase en proyectos privados sin publicar"]);
    section("Formación e idiomas");
    lines(["Bachillerato Tecnológico en Informática - finalizado en Uruguay en 2025.",
      "Diplomas UTU: Operador PC Básico/Avanzado e Informática/Diseño Web.",
      "Español: nativo | Inglés: C1 | Portugués: intermedio."]);
    section("Enlaces");
    link("Portafolio: natanaelprogimo-afk.github.io/portfolio/es/","https://natanaelprogimo-afk.github.io/portfolio/es/");
    link("GitHub: github.com/natanaelprogimo-afk","https://github.com/natanaelprogimo-afk");
    link("LinkedIn: alerson-anatael-morales-pintos-4a4634325","https://www.linkedin.com/in/alerson-anatael-morales-pintos-4a4634325/");
  }
  if(y<65)throw new Error("PDF content overflow: "+lang);
  if(!english && !page.includes("Bachillerato Tecnológico en Informática"))throw new Error("Missing complete Spanish degree name");
  text(english?"Public resume: no ID numbers, secrets or customer details.":"CV público: sin cédula ni datos privados de clientes.",42,42,8,false,[.35,.42,.42]);
  // Standard Helvetica with WinAnsiEncoding supports the Spanish accented
  // characters used here; reject unsupported glyphs instead of silently
  // corrupting downloadable résumé text.
  const encoded = s => {
    for(const ch of s) {
      if(ch.codePointAt(0)>255) throw new Error("Unsupported PDF glyph U+"+ch.codePointAt(0).toString(16));
    }
    return Buffer.from(s,"latin1");
  };
  const stream = encoded(page);
  const obj = [
    "<< /Type /Catalog /Pages 2 0 R /Lang ("+(english?"en-US":"es-UY")+") >>",
    "<< /Type /Pages /Kids [3 0 R] /Count 1 >>",
    "<< /Type /Page /Parent 2 0 R /MediaBox [0 0 595 842] /Resources << /Font << /F1 4 0 R /F2 5 0 R >> >> /Contents 6 0 R /Annots [7 0 R 8 0 R 9 0 R] >>",
    "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica /Encoding /WinAnsiEncoding >>",
    "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold /Encoding /WinAnsiEncoding >>",
    "<< /Length "+stream.length+" >>\nstream\n"+page+"endstream"
  ];
  for (const [url,yy] of linkData) {
    obj.push("<< /Type /Annot /Subtype /Link /Rect [42 "+(yy-3)+" 553 "+(yy+12)+"] /Border [0 0 0] /A << /S /URI /URI ("+quote(url)+") >> >>");
  }
  // PDF logical structure tree: each text block is marked with an MCID in
  // visual reading order; decorative rules/background are /Artifact.  This
  // supplies usable tags, not an independent PDF/UA compliance certificate.
  const structRootId=obj.length+1,parentTreeId=structRootId+1;
  const structIds=tags.map((_,i)=>parentTreeId+i+1);
  obj[0]=obj[0].replace(" /Lang ("," /MarkInfo << /Marked true >> /StructTreeRoot "+structRootId+" 0 R /ViewerPreferences << /DisplayDocTitle true >> /Lang (");
  obj[2]=obj[2].replace("/Contents 6 0 R","/Contents 6 0 R /StructParents 0");
  obj.push("<< /Type /StructTreeRoot /K ["+structIds.map(id=>id+" 0 R").join(" ")+"] /ParentTree "+parentTreeId+" 0 R /ParentTreeNextKey 1 >>");
  obj.push("<< /Nums [0 ["+structIds.map(id=>id+" 0 R").join(" ")+"]] >>");
  tags.forEach((tag,i)=>obj.push("<< /Type /StructElem /S /"+tag+" /P "+structRootId+" 0 R /Pg 3 0 R /K "+i+" >>"));
  const infoId=obj.length+1;
  obj.push("<< /Title ("+quote(english?"Alerson Morales - Software Developer Resume":"Alerson Morales - Curriculum Vitae")+
    ") /Author (Alerson Morales) /Creator (VYRA Portfolio) /Subject ("+
    quote(english?"Remote software engineering resume":"Curriculum de desarrollo de software remoto")+") >>");
  let buffers=[encoded("%PDF-1.4\n%\xE2\xE3\xCF\xD3\n")];
  const offsets=[0];
  let bytes=buffers[0].length;
  function push(s){const b=encoded(s);buffers.push(b);bytes+=b.length;}
  for(let i=0;i<obj.length;i++){offsets.push(bytes);push((i+1)+" 0 obj\n"+obj[i]+"\nendobj\n");}
  const xref=bytes;
  push("xref\n0 "+(obj.length+1)+"\n0000000000 65535 f \n");
  for(let i=1;i<=obj.length;i++)push(String(offsets[i]).padStart(10,"0")+" 00000 n \n");
  push("trailer\n<< /Size "+(obj.length+1)+" /Root 1 0 R /Info "+infoId+" 0 R >>\nstartxref\n"+xref+"\n%%EOF\n");
  return Buffer.concat(buffers);
}
for (const locale of ["en","es"]) {
  for(const qa of [false,true]){
    const result=make(locale,qa);
    const filename="resume-"+(qa?"qa-":"")+locale+".pdf";
    writeFileSync("dist/"+filename,result);
    console.log("Created "+filename+" with clickable links: "+result.length+" bytes.");
  }
}
