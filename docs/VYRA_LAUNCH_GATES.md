# VYRA — product-specific release gates (internal checklist)

**State:** Template / not an approved SaaS launch.  
**Date:** 2026-11-02  
**Important:** All controls start as **NOT VERIFIED**, not PASS.

## Product release record — one document per SKU

- Product name and immutable release version:
- Operator and legal contracting identity:
- Intended buyers and allowed jurisdictions:
- What is implemented, demoable, and out of scope:
- Source commit SHA, artifact SHA-256 and signed/verified release information (if available):
- Independent technical reviewer (if any):
- Product-specific privacy notice URL:
- Terms, cancellation, refund and support-policy URLs:
- Authorized processor and live checkout verification:
- Actual SLA/support hours, or explicitly none:
- Product incident/security intake:
- Rollback/export and end-of-service procedure:
- Approved price, currency, taxes and per-use third-party fees:
- Evidence owners and dates:
- Final decision, timestamp, and reason: **NOT VERIFIED** until all applicable gates pass.

## Gates (never infer success from portfolio CI)

| Gate | Required artifact / evidence | Initial state |
| --- | --- | --- |
| G01 — code and release integrity | Tagged code, dependency inventory, SHA and reproducible build | NOT VERIFIED |
| G02 — functional delivery | Tested onboarding, demo, primary workflow and acceptance criteria | NOT VERIFIED |
| G03 — identity/auth | AuthN/AuthZ, roles, tenant boundaries, least-privilege tests | NOT VERIFIED |
| G04 — secrets | Managed credentials, rotation, no secrets in logs/source | NOT VERIFIED |
| G05 — agent approval | Explicit high-impact-action approval and failure tests | NOT VERIFIED |
| G06 — adversarial inputs | Prompt injection/tool-output/schema tests | NOT VERIFIED |
| G07 — metering | API spend, limits, retries, kill switch, abuse controls | NOT VERIFIED |
| G08 — privacy/data | Data flow map, subprocessors, retention and deletion tests, lawful terms | NOT VERIFIED |
| G09 — resilience | Backup restoration, incident and rollback drills | NOT VERIFIED |
| G10 — pricing | Approved quote, fees, tax/payment processor/refunds, reconciliation | NOT VERIFIED |
| G11 — customer operations | Support, escalation, complaints and deliverable acceptance | NOT VERIFIED |
| G12 — marketing accuracy | Claims backed by source, screenshots from real build, permissions | NOT VERIFIED |
| G13 — legal review | Applicable Uruguay and cross-border obligations reviewed | NOT VERIFIED |
| G14 — pilot | Authorized representative tests with realistic but non-sensitive data | NOT VERIFIED |
| G15 — public checkout | Transaction receipt, delivery, settlement/reconciliation and rollback | NOT VERIFIED |

**Blocking rule:** no READY-FOR-SALE, customer data ingestion, automatic payment collection or promise of uptime/compliance when a material gate is unresolved. Manual approval must be explicit and documented. Controlled demos on synthetic data can be shared as demos, not as released products.

## Evidence rules

For each PASS, capture: test ID, environment/version, date, test input category, expected/actual output, author, artifact hash/log location, open exceptions and reviewer. Redact identifiers, credentials and customer confidential content. Do not label a draft or a planned control as production-proven.

## Reference material

- [OWASP AI Agent Security](https://cheatsheetseries.owasp.org/cheatsheets/AI_Agent_Security_Cheat_Sheet.html)
- [OWASP LLM Top 10](https://genai.owasp.org/llm-top-10/)
- [Uruguay: Ley 18.331](https://www.impo.com.uy/bases/leyes/18331-2008)
- [URCDP](https://www.gub.uy/unidad-reguladora-control-datos-personales/politicas-y-gestion/obligaciones)

This is an internal planning/control template, not proof that safeguards have been implemented or independently audited.
