/**
 * Rasterize the existing, owned SVG social card when local Chrome/Edge exists.
 * Pure enhancement: when unsupported, all metadata continues to point to SVG.
 * No network access or third-party dependencies are required.
 */
import { readFileSync, writeFileSync, readdirSync, existsSync, unlinkSync } from "node:fs";
import { execFileSync } from "node:child_process";
import { resolve, join } from "node:path";
import { pathToFileURL } from "node:url";

const source=resolve("dist/og-preview.svg");
const dest=resolve("dist/og-preview.png");
const commandNames=process.platform==="win32"
  ? [
      process.env.PROGRAMFILES && join(process.env.PROGRAMFILES,"Google/Chrome/Application/chrome.exe"),
      process.env["PROGRAMFILES(X86)"] && join(process.env["PROGRAMFILES(X86)"],"Microsoft/Edge/Application/msedge.exe"),
      "chrome","msedge"
    ].filter(Boolean)
  : ["google-chrome","google-chrome-stable","chromium","chromium-browser"];
let success=false;
for(const browser of commandNames){
  try{
    execFileSync(browser,[
      "--headless=new","--disable-gpu","--no-sandbox","--hide-scrollbars",
      "--force-device-scale-factor=1",
      "--window-size=1200,630","--screenshot="+dest,pathToFileURL(source).href
    ],{timeout:30000,stdio:"ignore"});
    if(!existsSync(dest))continue;
    const bytes=readFileSync(dest);
    if(bytes.length<1000 || bytes.subarray(0,8).toString("hex")!=="89504e470d0a1a0a"
      || bytes.readUInt32BE(16)!==1200 || bytes.readUInt32BE(20)!==630){
      unlinkSync(dest);continue;
    }
    success=true;
    break;
  }catch{/* Try another installed browser. */}
}
if(success){
  const walk=dir=>{
    for(const item of readdirSync(dir,{withFileTypes:true})){
      const path=join(dir,item.name);
      if(item.isDirectory())walk(path);
      else if(item.name.endsWith(".html")){
        const html=readFileSync(path,"utf8");
        if(html.includes("og-preview.svg"))writeFileSync(path,html.replaceAll("og-preview.svg","og-preview.png"));
      }
    }
  };
  walk("dist");
  console.log("Created 1200 x 630 social PNG and updated static metadata.");
}else{
  if(existsSync(dest))unlinkSync(dest);
  console.log("No suitable browser for rasterization; retaining valid SVG social metadata.");
}
