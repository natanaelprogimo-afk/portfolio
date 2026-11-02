import { test } from "node:test";
import assert from "node:assert/strict";
import { compareCatalog, createIdempotencyLedger, parseCsv, summarizeEvents } from "../public/labs/logic.mjs";

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
