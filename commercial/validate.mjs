/**
 * Template-only readiness validation for seven future VYRA SaaS/agent products.
 * A machine PASS is a consistency check, NEVER evidence of a security audit.
 * Keep real names, credentials, customers and internal architecture PRIVATE.
 */
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { resolve } from "node:path";

export const GATES=Object.freeze(Array.from({length:15},(_,i)=>"G"+String(i+1).padStart(2,"0")));
export const LIFECYCLES=Object.freeze(["INTAKE_PENDING","IN_DEVELOPMENT","QA_REVIEW","PILOT_READY","APPROVED_FOR_SALE"]);
export const CATEGORIES=Object.freeze(["UNSPECIFIED","SAAS","AGENT","HYBRID"]);
export const STATUS=Object.freeze(["NOT_VERIFIED","FAILED","PASS","NOT_APPLICABLE"]);

const hasText=x=>typeof x==="string"&&x.trim().length>0;
const calendarDate=x=>typeof x==="string"&&/^\d{4}-\d{2}-\d{2}$/.test(x)
  && !Number.isNaN(Date.parse(x+"T00:00:00Z"));
const evidenceAllowed=x=>typeof x==="string" && x.length<=500
  && /^[a-zA-Z0-9./:_@# -]+$/.test(x)
  && !/api[_-]?key|password|secret|token=/i.test(x);

export function validateRegistry(registry){
  const errors=[];
  if(!registry||registry.schemaVersion!==1||!Array.isArray(registry.products)){
    return {valid:false,errors:["Expected v1 registry with products array."],report:[]};
  }
  if(registry.products.length!==7)errors.push("Exactly seven anonymous product slots are required.");
  if(!["PUBLIC_TEMPLATE_ONLY","PRIVATE_INTERNAL"].includes(registry.classification))
    errors.push("Registry classification must be PUBLIC_TEMPLATE_ONLY or PRIVATE_INTERNAL.");
  const ids=new Set();
  const report=[];
  for(const [index,p] of registry.products.entries()){
    const id=p?.id??"UNKNOWN-"+index;
    if(!/^P0[1-7]$/.test(id))errors.push("Invalid anonymous product ID: "+id);
    if(ids.has(id))errors.push("Duplicate product ID: "+id);
    ids.add(id);
    if(!CATEGORIES.includes(p.kind))errors.push(id+": invalid kind");
    if(!LIFECYCLES.includes(p.lifecycle))errors.push(id+": invalid lifecycle");
    // Public sample data MUST stay anonymous even when actual product details arrive.
    if(registry.classification==="PUBLIC_TEMPLATE_ONLY"){
      if(p.name!==null||p.summary!==null||p.problem!==null||p.targetCustomer!==null
        ||p.kind!=="UNSPECIFIED"||p.lifecycle!=="INTAKE_PENDING"
        ||p.publicListingApproved!==false||p.ownerApproval?.approved!==false){
        errors.push(id+": public template may not expose unpublished product details or readiness.");
      }
      if(GATES.some(g=>p.gates?.[g]?.status!=="NOT_VERIFIED"))
        errors.push(id+": public template must not assert any gate result.");
    }
    if(typeof p.publicListingApproved!=="boolean")errors.push(id+": invalid public listing approval flag");
    if(!p.ownerApproval||typeof p.ownerApproval.approved!=="boolean")errors.push(id+": invalid owner approval");
    const gateEntries=p.gates&&typeof p.gates==="object"?Object.entries(p.gates):[];
    const present=new Set(gateEntries.map(([g])=>g));
    for(const gate of GATES)if(!present.has(gate))errors.push(id+": missing "+gate);
    for(const gate of present)if(!GATES.includes(gate))errors.push(id+": unexpected "+gate);
    let passed=0;
    for(const gate of GATES){
      const g=p.gates?.[gate];if(!g)continue;
      if(!STATUS.includes(g.status))errors.push(id+": "+gate+" invalid state");
      if(!Array.isArray(g.evidence))errors.push(id+": "+gate+" missing evidence array");
      if(g.status==="PASS"){
        passed++;
        if(!hasText(g.reviewedBy)||!calendarDate(g.reviewedAt)||!Array.isArray(g.evidence)
          ||g.evidence.length===0||!g.evidence.every(evidenceAllowed)){
          errors.push(id+": "+gate+" PASS requires dated review and non-sensitive evidence reference.");
        }
      }
      if(g.status==="NOT_APPLICABLE" && (!hasText(g.reviewedBy)||!calendarDate(g.reviewedAt)
        ||!Array.isArray(g.evidence)||g.evidence.length===0)){
        errors.push(id+": "+gate+" NOT_APPLICABLE requires a reason, review and evidence reference.");
      }
    }
    const ready=p.lifecycle==="PILOT_READY"||p.lifecycle==="APPROVED_FOR_SALE";
    if(ready){
      if(!hasText(p.name)||!hasText(p.summary)||p.kind==="UNSPECIFIED")
        errors.push(id+": pilot/sale requires real product identity and kind.");
      if(GATES.some(g=>p.gates?.[g]?.status==="NOT_VERIFIED"||p.gates?.[g]?.status==="FAILED"))
        errors.push(id+": pilot/sale blocked by unresolved release gates.");
      if(GATES.some(g=>p.gates?.[g]?.status==="NOT_APPLICABLE"))
        errors.push(id+": applicability exceptions require manual assessment; no automatic launch.");
    }
    if(p.publicListingApproved===true&&p.lifecycle!=="APPROVED_FOR_SALE")
      errors.push(id+": public listing approval forbidden before sale approval.");
    if(p.lifecycle==="APPROVED_FOR_SALE"){
      if(p.ownerApproval?.approved!==true||!hasText(p.ownerApproval.approver)
        ||!calendarDate(p.ownerApproval.approvedAt))errors.push(id+": signed owner approval missing.");
      if(p.publicListingApproved!==true)errors.push(id+": sale requires public listing approval.");
      const c=p.commercial;
      for(const field of ["currency","billing","usagePolicy","refundsPolicy","cancellationPolicy",
        "supportPolicy","privacyPolicy","terms"]){
        if(!hasText(c?.[field]))errors.push(id+": missing commercial "+field);
      }
      if(typeof c?.price!=="number"||!Number.isFinite(c.price)||c.price<0)
        errors.push(id+": invalid approved numeric price");
      if(c?.verifiedCheckout!==true)errors.push(id+": checkout and delivery must be verified");
    }
    report.push({id,kind:p.kind,lifecycle:p.lifecycle,gatePassCount:passed,gateTotal:GATES.length,
      publicListingApproved:p.publicListingApproved===true,
      canBeAdvertisedAsAvailable:p.lifecycle==="APPROVED_FOR_SALE" && p.ownerApproval?.approved===true
        && p.publicListingApproved===true && passed===GATES.length});
  }
  return {valid:errors.length===0,errors,report};
}

export const fixtureUrl=new URL("./seven-products.template.json",import.meta.url);
export const loadFixture=()=>JSON.parse(readFileSync(fixtureUrl,"utf8"));

if(process.argv[1]&&fileURLToPath(import.meta.url)===resolve(process.argv[1])){
  const result=validateRegistry(loadFixture());
  process.stdout.write(JSON.stringify(result,null,2)+"\n");
  if(!result.valid)process.exitCode=1;
}
