import test from "node:test";
import assert from "node:assert/strict";
import { GATES, loadFixture, validateRegistry } from "../commercial/validate.mjs";

const clone=x=>structuredClone(x);
test("seven products start anonymous, private and without inferred readiness",()=>{
  const data=loadFixture();
  const result=validateRegistry(data);
  assert.equal(result.valid,true,JSON.stringify(result.errors));
  assert.equal(data.products.length,7);
  assert.deepEqual(data.products.map(p=>p.id),["P01","P02","P03","P04","P05","P06","P07"]);
  for(const p of data.products){
    assert.equal(p.name,null);
    assert.equal(p.kind,"UNSPECIFIED");
    assert.equal(p.lifecycle,"INTAKE_PENDING");
    assert.equal(p.publicListingApproved,false);
    assert.equal(p.ownerApproval.approved,false);
    assert.deepEqual(Object.keys(p.gates).sort(),[...GATES].sort());
    assert.ok(GATES.every(g=>p.gates[g].status==="NOT_VERIFIED"));
  }
  assert.ok(result.report.every(r=>r.canBeAdvertisedAsAvailable===false));
});
test("duplicate IDs, missing gates and spurious evidence cannot pass",()=>{
  const data=clone(loadFixture());
  data.products[1].id="P01";
  delete data.products[0].gates.G15;
  data.products[2].gates.G01.status="PASS";
  const result=validateRegistry(data);
  assert.equal(result.valid,false);
  assert.ok(result.errors.some(e=>e.includes("Duplicate")));
  assert.ok(result.errors.some(e=>e.includes("missing G15")));
  assert.ok(result.errors.some(e=>e.includes("PASS requires")));
});
test("a seemingly launched SaaS is blocked without explicit owner approval and evidence",()=>{
  const data=clone(loadFixture());
  const p=data.products[0];
  p.kind="SAAS";p.name="Example";p.summary="Example only";
  p.lifecycle="APPROVED_FOR_SALE";
  p.publicListingApproved=true;
  p.commercial.price=10;p.commercial.currency="USD";
  assert.equal(validateRegistry(data).valid,false);
  assert.ok(validateRegistry(data).errors.some(e=>e.includes("signed owner approval")));
  assert.ok(validateRegistry(data).errors.some(e=>e.includes("unresolved release gates")));
});
test("do not allow a fake N/A to bypass human review",()=>{
  const data=clone(loadFixture());
  data.products[0].gates.G05.status="NOT_APPLICABLE";
  assert.equal(validateRegistry(data).valid,false);
});
test("never include actual business/customer secrets in a public product template",()=>{
  const text=JSON.stringify(loadFixture());
  assert.doesNotMatch(text,/sk-[A-Za-z0-9]{12,}/);
  assert.doesNotMatch(text,/(?:password|secret|apiKey)\s*:\s*"[^"]+"/i);
});

test("public repository fails if a real product identity accidentally reaches the template",()=>{
  const data=clone(loadFixture());
  data.products[0].name="Confidential product name";
  const result=validateRegistry(data);
  assert.equal(result.valid,false);
  assert.ok(result.errors.some(e=>e.includes("public template may not expose")));
});
test("sale visibility cannot be manually toggled without approved sale lifecycle",()=>{
  const data=clone(loadFixture());
  data.products[0].publicListingApproved=true;
  assert.equal(validateRegistry(data).valid,false);
});
