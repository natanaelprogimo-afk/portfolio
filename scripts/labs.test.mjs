import { test } from "node:test";
import assert from "node:assert/strict";
import { compareCatalog, createIdempotencyLedger, parseCsv, serializeReportCsv, summarizeEvents } from "../public/labs/logic.mjs";

test("CSV supports RFC-style escaped quotes, BOM, and CRLF", () => {
  assert.deepEqual(parseCsv('\uFEFFsku,price,note\r\nABC,12.50,"a,b""c"\r\n'), [{ sku:"ABC",price:"12.50",note:'a,b"c' }]);
});
test("CSV rejects duplicate headers and unterminated quotes", () => {
  assert.throws(()=>parseCsv("sku,sku\nx,y"), /duplicate headers/);
  assert.throws(()=>parseCsv('sku,price\n"abc,20'), /Unclosed/);
});
test("Catalog comparison groups mismatch, missing, and extra", () => {
  const r = compareCatalog("sku,price\nA,10.00\nB,2.50\nC,7.10", "sku,price\nA,10\nB,2.51\nD,5");
  assert.deepEqual(r.count, {match:1,mismatch:1,missing:1,extra:1});
  assert.equal(r.details[1].status,"mismatch");
});
test("Catalog comparison rejects duplicate SKU and invalid prices", () => {
  assert.throws(()=>compareCatalog("sku,price\nA,1\nA,2","sku,price\nA,1"), /duplicate SKU/);
  assert.throws(()=>compareCatalog("sku,price\nA,free","sku,price\nA,0"), /Invalid price/);
});
test("Idempotency replay never increments action count", () => {
  const ledger=createIdempotencyLedger();
  assert.equal(ledger.execute("order-1",{qty:1}).processed,1);
  const replay=ledger.execute("order-1",{qty:1});
  assert.equal(replay.code,200);assert.equal(replay.replayed,true);assert.equal(replay.processed,1);
  assert.equal(ledger.execute("order-1",{qty:2}).code,409);
  ledger.reset();assert.equal(ledger.execute("order-1",{qty:2}).processed,1);
});
test("Uncertain failure blocks automatic retry", () => {
  const ledger=createIdempotencyLedger();
  assert.equal(ledger.execute("request",{},true).code,500);
  assert.equal(ledger.execute("request",{}).code,409);
});
test("Operational metric aggregation uses validated daily buckets", () => {
  assert.deepEqual(summarizeEvents(JSON.stringify([
    {date:"2026-10-30",duration_ms:100,ok:true},
    {date:"2026-10-30",duration_ms:300,ok:false}
  ])), [{date:"2026-10-30",requests:2,successful:1,errors:1,successRate:50,averageMs:200}]);
  assert.throws(()=>summarizeEvents('{"bad":true}'), /Expected an array/);
});
test("Event aggregation rejects invalid durations and shapes", () => {
  assert.throws(()=>summarizeEvents('[{"date":"2026-10-31","duration_ms":-2,"ok":true}]'), /duration_ms/);
  assert.throws(()=>summarizeEvents('[{"date":"xxx","duration_ms":10,"ok":true}]'), /date/);
});

test("Rejects invalid calendar dates including impossible February days", () => {
  assert.throws(() => summarizeEvents('[{"date":"2026-02-30","duration_ms":100,"ok":true}]'), /valid YYYY-MM-DD/);
  assert.throws(() => summarizeEvents('[{"date":"2025-02-29","duration_ms":100,"ok":true}]'), /valid YYYY-MM-DD/);
  assert.equal(summarizeEvents('[{"date":"2024-02-29","duration_ms":100,"ok":true}]')[0].date, "2024-02-29");
});
test("Rejects malformed prices even when SKU is missing in other file", () => {
  assert.throws(() => compareCatalog("sku,price\nMISSING,oops", "sku,price\nFOUND,2.00"), /Invalid price/);
  assert.throws(() => compareCatalog("sku,price\nA,1.00", "sku,price\nA,1.00\nEXTRA,not-a-price"), /Invalid price/);
});
test("CSV rejects unexpected unquoted text after a quoted field", () => {
  assert.throws(() => parseCsv('sku,price\n"A"trailing,12'), /Unexpected characters/);
});

test("CSV report serialization quotes data and mitigates formula injection", () => {
  const report = serializeReportCsv([{sku:'=cmd',note:'a,b"c',price:12.5}],[
    ["sku","SKU"],["note","Note"],["price","Price"]
  ]);
  assert.match(report, /^"SKU","Note","Price"\r\n/);
  assert.match(report, /"'=cmd"/);
  assert.match(report, /"a,b""c"/);
  assert.match(report, /"12.5"/);
  assert.throws(() => serializeReportCsv([], []), /bounded table/);
});

test("Price parsing is exact, bounded and never compares infinities as matches", () => {
  const a="9".repeat(320), b="8".repeat(320);
  assert.throws(()=>compareCatalog("sku,price\\nA,"+a,"sku,price\\nA,"+b), /Invalid price|safe cent/);
  assert.deepEqual(compareCatalog("sku,price\\nA,100.01","sku,price\\nA,100.02").count,
    {match:0,mismatch:1,missing:0,extra:0});
  assert.deepEqual(compareCatalog("sku,price\\nA,0.10","sku,price\\nA,0.1").count,
    {match:1,mismatch:0,missing:0,extra:0});
  assert.throws(()=>compareCatalog("sku,price\\nA,90071992547409.92","sku,price\\nA,1"),/safe cent/);
});
test("Idempotency canonicalizes nested JSON object keys but preserves array order",()=>{
  const ledger=createIdempotencyLedger();
  const first=ledger.execute("same",{a:1,nested:{x:true,y:2},list:[1,2]});
  const second=ledger.execute("same",{list:[1,2],nested:{y:2,x:true},a:1});
  assert.equal(first.code,200);
  assert.equal(second.code,200);
  assert.equal(second.replayed,true);
  assert.equal(second.processed,1);
  assert.equal(ledger.execute("same",{nested:{y:2,x:true},a:1,list:[2,1]}).code,409);
});
test("Teaching demo bounds new idempotency keys to 500",()=>{
  const ledger=createIdempotencyLedger();
  for(let i=0;i<500;i++)ledger.execute("key-"+i,{n:i});
  assert.throws(()=>ledger.execute("another",{}),/limit reached/);
  assert.equal(ledger.execute("key-1",{n:1}).replayed,true);
  ledger.reset();
  assert.equal(ledger.execute("another",{}).processed,1);
});
