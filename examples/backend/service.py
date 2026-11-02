"""An independent, educational API sample. Python 3.11+, stdlib only.

Not production-ready: in-memory database, no authentication, TLS or persistence.
"""
from hashlib import sha256
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer
import json
import os
import re
import sqlite3
from threading import RLock


def validate_order(body):
    if not isinstance(body, dict) or set(body) != {"sku", "quantity", "unit_price_cents"}:
        raise ValueError("Required: sku, quantity, unit_price_cents.")
    if not isinstance(body["sku"], str) or not re.fullmatch(r"[A-Z0-9_-]{3,32}", body["sku"]):
        raise ValueError("Invalid SKU.")
    for key, lo, hi in [("quantity", 1, 100), ("unit_price_cents", 1, 1_000_000)]:
        val = body[key]
        if isinstance(val, bool) or not isinstance(val, int) or not lo <= val <= hi:
            raise ValueError("Invalid " + key + ".")
    return body


class OrderService:
    def __init__(self):
        self.lock = RLock()
        self.db = sqlite3.connect(":memory:", check_same_thread=False)
        self.db.executescript("""
            CREATE TABLE orders(id INTEGER PRIMARY KEY, sku TEXT NOT NULL, amount_cents INTEGER NOT NULL);
            CREATE TABLE requests(request_key TEXT PRIMARY KEY, signature TEXT NOT NULL, result TEXT NOT NULL);
        """)

    def submit(self, key, body):
        if not isinstance(key, str) or not re.fullmatch(r"[A-Za-z0-9_-]{1,96}", key):
            return 400, {"error": "Invalid Idempotency-Key."}
        try:
            value = validate_order(body)
        except ValueError as exc:
            return 400, {"error": str(exc)}
        signature = sha256(json.dumps(value, sort_keys=True).encode()).hexdigest()
        with self.lock:
            previous = self.db.execute("SELECT signature,result FROM requests WHERE request_key=?", (key,)).fetchone()
            if previous:
                if previous[0] != signature:
                    return 409, {"error": "Key previously used with different payload."}
                return 200, {**json.loads(previous[1]), "replayed": True}
            with self.db:
                amount = value["quantity"] * value["unit_price_cents"]
                cursor = self.db.execute(
                    "INSERT INTO orders(sku,amount_cents) VALUES (?,?)", (value["sku"], amount)
                )
                result = {"id": cursor.lastrowid, "sku": value["sku"], "amount_cents": amount}
                self.db.execute(
                    "INSERT INTO requests(request_key,signature,result) VALUES (?,?,?)",
                    (key, signature, json.dumps(result))
                )
            return 201, {**result, "replayed": False}

    def count(self):
        with self.lock:
            return self.db.execute("SELECT COUNT(*) FROM orders").fetchone()[0]


SERVICE = OrderService()


class Handler(BaseHTTPRequestHandler):
    def respond(self, status, value):
        body = json.dumps(value).encode()
        self.send_response(status)
        self.send_header("Content-Type", "application/json; charset=utf-8")
        self.send_header("X-Content-Type-Options", "nosniff")
        self.send_header("Content-Length", str(len(body)))
        self.end_headers()
        self.wfile.write(body)

    def do_GET(self):
        if self.path == "/health":
            self.respond(200, {"status": "ok", "sample": True})
        else:
            self.respond(404, {"error": "Not found."})

    def do_POST(self):
        if self.path != "/v1/orders":
            return self.respond(404, {"error": "Not found."})
        try:
            size = int(self.headers.get("Content-Length", "0"))
            if not 1 <= size <= 16384:
                return self.respond(413, {"error": "Body length must be 1-16384 bytes."})
            body = json.loads(self.rfile.read(size))
        except (ValueError, UnicodeDecodeError):
            return self.respond(400, {"error": "Invalid request JSON."})
        status, response = SERVICE.submit(self.headers.get("Idempotency-Key", ""), body)
        self.respond(status, response)


if __name__ == "__main__":
    port = int(os.environ.get("DEMO_PORT", "8765"))
    if not 1 <= port <= 65535:
        raise SystemExit("DEMO_PORT must be a valid port.")
    print("Educational local API at http://127.0.0.1:" + str(port))
    ThreadingHTTPServer(("127.0.0.1", port), Handler).serve_forever()
