/**
 * Public, standalone engineering examples.
 * Deliberately independent from VYRA private code and production credentials.
 * All examples use in-browser, synthetic data only.
 */

export function parseCsv(input) {
  if (typeof input !== "string" || input.length > 200_000) throw new Error("CSV must be text under 200 KB.");
  const rows = [];
  let row = [], cell = "", quoted = false, closedQuote = false, atCellStart = true;
  const text = input.replace(/^\uFEFF/, "");
  for (let i = 0; i < text.length; i++) {
    const char = text[i];
    if (quoted) {
      if (char === '"' && text[i + 1] === '"') { cell += '"'; i++; }
      else if (char === '"') { quoted = false; closedQuote = true; }
      else cell += char;
      continue;
    }
    if (closedQuote && char !== "," && char !== "\n" && char !== "\r") throw new Error("Unexpected characters after closing quote.");
    if (char === '"' && atCellStart) { quoted = true; atCellStart = false; closedQuote = false; }
    else if (char === "," || char === "\n" || char === "\r") {
      row.push(cell); cell = ""; atCellStart = true; closedQuote = false;
      if (char !== ",") {
        if (char === "\r" && text[i + 1] === "\n") i++;
        if (row.some(c => c.trim() !== "")) rows.push(row);
        row = [];
      }
    } else if (char === '"' && !atCellStart) {
      throw new Error("Unexpected quote in CSV field.");
    } else { cell += char; atCellStart = false; }
  }
  if (quoted) throw new Error("Unclosed quoted CSV field.");
  row.push(cell);
  if (row.some(c => c.trim() !== "")) rows.push(row);
  if (rows.length < 2) throw new Error("CSV must have a header and at least one data row.");
  const headers = rows[0].map(s => s.trim().toLowerCase());
  if (headers.some(h => !h)) throw new Error("CSV has an empty header.");
  if (new Set(headers).size !== headers.length) throw new Error("CSV has duplicate headers.");
  return rows.slice(1).map((columns, index) => {
    if (columns.length !== headers.length) throw new Error("Row " + (index + 2) + " has the wrong number of fields.");
    return Object.fromEntries(headers.map((header, i) => [header, columns[i].trim()]));
  });
}
const cleanSku = sku => String(sku ?? "").trim().toUpperCase();
const parsePrice = value => {
  const s = String(value ?? "").trim();
  if (!/^\d+(?:\.\d{1,2})?$/.test(s)) throw new Error("Invalid price: " + s + ". Use dot-decimal numbers.");
  return Math.round(Number(s) * 100);
};
export function compareCatalog(feedCsv, observedCsv) {
  const feed = parseCsv(feedCsv), observed = parseCsv(observedCsv);
  for (const [label, rows] of [["feed", feed], ["observed", observed]]) {
    for (const [index, row] of rows.entries()) {
      if (!("sku" in row) || !("price" in row) || !cleanSku(row.sku))
        throw new Error(label + " row " + (index + 2) + ": required columns sku,price.");
    }
    for (const row of rows) parsePrice(row.price);
    const skus = rows.map(r => cleanSku(r.sku));
    if (new Set(skus).size !== skus.length) throw new Error(label + " contains duplicate SKU values.");
  }
  const found = new Map(observed.map(row => [cleanSku(row.sku), row]));
  const feedKeys = new Set(feed.map(row => cleanSku(row.sku)));
  const matched = new Set(), details = [];
  for (const row of feed) {
    const sku = cleanSku(row.sku);
    const actual = found.get(sku);
    if (!actual) { details.push({ sku, status: "missing", expected: row.price, observed: "-" }); continue; }
    matched.add(sku);
    const equal = parsePrice(row.price) === parsePrice(actual.price);
    details.push({ sku, status: equal ? "match" : "mismatch", expected: row.price, observed: actual.price });
  }
  for (const row of observed) {
    const sku = cleanSku(row.sku);
    if (!feedKeys.has(sku))
      details.push({ sku, status: "extra", expected: "-", observed: row.price });
  }
  return { details, count: Object.fromEntries(["match", "mismatch", "missing", "extra"].map(status => [status, details.filter(r => r.status === status).length])) };
}

export function createIdempotencyLedger() {
  const entries = new Map();
  let processed = 0;
  return {
    execute(key, payload, simulateFailure = false) {
      const normalizedKey = String(key ?? "").trim();
      if (!normalizedKey || normalizedKey.length > 96) throw new Error("Key must contain 1–96 characters.");
      const signature = JSON.stringify(payload);
      const existing = entries.get(normalizedKey);
      if (existing) {
        if (existing.signature !== signature) return { code: 409, message: "Key reused with different payload.", replayed: false, processed };
        if (existing.failed) return { code: 409, message: "Previous execution outcome uncertain. Manual review required.", replayed: false, processed };
        return { ...existing.result, replayed: true, processed };
      }
      if (simulateFailure) {
        entries.set(normalizedKey, { signature, failed: true });
        return { code: 500, message: "Simulated uncertain failure; no automatic retry.", replayed: false, processed };
      }
      processed++;
      const result = { code: 200, message: "Action recorded once.", replayed: false };
      entries.set(normalizedKey, { signature, result });
      return { ...result, processed };
    },
    reset() { entries.clear(); processed = 0; }
  };
}

export function summarizeEvents(input) {
  if (typeof input !== "string" || input.length > 200_000) throw new Error("JSON exceeds 200 KB.");
  let data;
  try { data = JSON.parse(input); } catch { throw new Error("Invalid JSON."); }
  if (!Array.isArray(data) || data.length > 5000) throw new Error("Expected an array of up to 5000 events.");
  const daily = new Map();
  const validDate = s => {
    if (typeof s !== "string" || !/^\d{4}-\d{2}-\d{2}$/.test(s)) return false;
    const [y, m, d] = s.split("-").map(Number);
    const dt = new Date(Date.UTC(y, m-1, d));
    return y >= 100 && dt.getUTCFullYear() === y && dt.getUTCMonth() + 1 === m && dt.getUTCDate() === d;
  };
  for (const [i, item] of data.entries()) {
    if (!item || typeof item !== "object" || !validDate(item.date)) {
      throw new Error("Event " + (i + 1) + " requires a valid YYYY-MM-DD date.");
    }
    if (!Number.isFinite(item.duration_ms) || item.duration_ms < 0 || item.duration_ms > 60_000) {
      throw new Error("Event " + (i + 1) + " requires duration_ms from 0 to 60000.");
    }
    if (typeof item.ok !== "boolean") throw new Error("Event " + (i + 1) + " requires boolean ok.");
    const row = daily.get(item.date) ?? { date: item.date, requests: 0, successful: 0, totalLatency: 0 };
    row.requests++; if (item.ok) row.successful++;
    row.totalLatency += item.duration_ms;
    daily.set(item.date, row);
  }
  return [...daily.values()].sort((a,b) => a.date.localeCompare(b.date)).map(({ date, requests, successful, totalLatency }) => ({
    date, requests, successful, errors: requests - successful,
    successRate: +(100 * successful / requests).toFixed(1),
    averageMs: +(totalLatency / requests).toFixed(1)
  }));
}
