/**
 * Rasterize the four original, project-owned social previews if local
 * Chrome/Chromium exists. Every metadata URL keeps a valid SVG fallback.
 * No network access, downloaded artwork, logos or fonts required.
 */
import { readFileSync, writeFileSync, readdirSync, existsSync, unlinkSync } from "node:fs";
import { execFileSync } from "node:child_process";
import { resolve, join } from "node:path";
import { pathToFileURL } from "node:url";

const browserCommands=process.platform==="win32"
  ? [
      process.env.PROGRAMFILES && join(process.env.PROGRAMFILES,"Google/Chrome/Application/chrome.exe"),
      process.env["PROGRAMFILES(X86)"] && join(process.env["PROGRAMFILES(X86)"],"Microsoft/Edge/Application/msedge.exe"),
      "chrome","msedge"
    ].filter(Boolean)
  : ["google-chrome","google-chrome-stable","chromium","chromium-browser"];
const stems=["og-preview","og-cases","og-hiring","og-trust"];
const created=new Set();
for(const stem of stems){
  const source=resolve("dist",stem+".svg"),dest=resolve("dist",stem+".png");
  if(!existsSync(source))throw new Error("Original social artwork missing: "+stem+".svg");
  let success=false;
  for(const browser of browserCommands){
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
      success=true;break;
    }catch{/* Try another installed browser. */}
  }
  if(success)created.add(stem);
  else if(existsSync(dest))unlinkSync(dest);
}
if(created.size){
  const walk=dir=>{
    for(const item of readdirSync(dir,{withFileTypes:true})){
      const path=join(dir,item.name);
      if(item.isDirectory())walk(path);
      else if(item.name.endsWith(".html")){
        let html=readFileSync(path,"utf8"),next=html;
        for(const stem of created)next=next.replaceAll(stem+".svg",stem+".png");
        if(next!==html)writeFileSync(path,next);
      }
    }
  };
  walk("dist");
}
console.log("Social previews rasterized: "+[...created].join(", ")+"; remaining SVGs are valid fallbacks.");
