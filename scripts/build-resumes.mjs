import { writeFileSync } from "node:fs";

function quote(s) {
  return s.replaceAll("\\","\\\\").replaceAll("(","\\(").replaceAll(")","\\)");
}
function make(lang) {
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
  text(english?"Full-Stack Developer | Backend & Automation":"Desarrollador Full-Stack | Backend y Automatización",42,764,12,true,[.8,.96,.58]);
  text(english?"Uruguay | 100% Remote | moralesalerson@gmail.com":"Uruguay | 100 % remoto | moralesalerson@gmail.com",42,746,9.2,false,[.89,.94,.89]);
  let y=699;
  const section=s=>{text(s.toUpperCase(),42,y,10,true,[.10,.36,.32],"H2");rule(y-6);y-=25;};
  const lines=arr=>{for(const s of arr){text(s,42,y,9.4);y-=14;}y-=7;};
  const linkData=[];
  const link=(s,url)=>{text(s,42,y,9.4,false,[.06,.35,.30]);linkData.push([url,y]);y-=16;};
  if(english){
    section("Professional profile");
    lines(["Independent software developer and VYRA founder. Programming since age 12.",
      "Building full-stack applications, Python backends, mobile products and AI workflows.",
      "Interested in worldwide 100% remote engineering opportunities."]);
    section("Selected work");
    lines(["VYRA | Founder and developer (independent, ongoing)",
      "- AI Automation Factory: private FastAPI/React agent workflows with human approval.",
      "- VYRA Fitness: React Native and Expo app in design and testing; not released.",
      "- Catalog Integrity Engine: private catalog comparison prototype.",
      "Web development | Two completed client websites",
      "- Completed sites for a dental practice and a paint retailer.",
      "Open-source work | Python HTTP, SQL examples and interactive JS lab."]);
    section("Technical skills");
    lines(["Python, JavaScript, TypeScript, C#, SQL, Java, PHP, HTML and CSS",
      "React, Next.js, React Native, Expo, FastAPI and Node.js",
      "REST APIs, PostgreSQL, MySQL, Supabase, Git, automated testing"]);
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
    lines(["Desarrollador independiente y fundador de VYRA. Programo desde los 12 años.",
      "Trabajo en software full-stack, backend con Python, aplicaciones móviles e IA.",
      "Busco trabajo de ingeniería de software remoto con equipos internacionales."]);
    section("Proyectos");
    lines(["VYRA | Fundador y desarrollador (independiente, en curso)",
      "- AI Automation Factory: plataforma privada con FastAPI, React y aprobaciones.",
      "- VYRA Fitness: aplicación React Native / Expo en diseño y pruebas, sin publicar.",
      "- Catalog Integrity Engine: prototipo privado para comparar catálogos.",
      "Desarrollo web | Dos sitios completos para clientes",
      "- Sitios terminados para una clínica dental y una tienda de pinturas.",
      "Código público | API Python, ejemplos SQL y laboratorio JavaScript."]);
    section("Competencias técnicas");
    lines(["Python, JavaScript, TypeScript, C#, SQL, Java, PHP, HTML y CSS",
      "React, Next.js, React Native, Expo, FastAPI y Node.js",
      "API REST, PostgreSQL, MySQL, Supabase, Git y pruebas automáticas"]);
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
  const result=make(locale);
  writeFileSync("dist/resume-"+locale+".pdf",result);
  console.log("Created "+locale+" recruiter PDF with clickable links: "+result.length+" bytes.");
}
