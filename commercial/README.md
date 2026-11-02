# VYRA — 7-product commercial readiness framework

**Status: preparation only.** The operator stated that seven SaaS/agent projects exist, but has not yet supplied their names, exact functionality, product types, current implementation, target customers or commercial readiness. Accordingly, this repository contains **seven anonymous templates**, not seven advertised or verified products.

> **Public repository safety boundary:** this directory is publicly readable. Do **not** commit actual customer records, credentials, business secrets, non-public repositories, confidential software architecture, vendor keys, private evidence or personal identity numbers. When factual details arrive, keep full product dossiers in a dedicated **private** workspace; publish only deliberately approved, sanitized excerpts.

## Prepared package

| ID | Intake dossier | State |
| --- | --- | --- |
| P01 | [Open blank intake](intake/P01.md) | INTAKE_PENDING / NOT_VERIFIED |
| P02 | [Open blank intake](intake/P02.md) | INTAKE_PENDING / NOT_VERIFIED |
| P03 | [Open blank intake](intake/P03.md) | INTAKE_PENDING / NOT_VERIFIED |
| P04 | [Open blank intake](intake/P04.md) | INTAKE_PENDING / NOT_VERIFIED |
| P05 | [Open blank intake](intake/P05.md) | INTAKE_PENDING / NOT_VERIFIED |
| P06 | [Open blank intake](intake/P06.md) | INTAKE_PENDING / NOT_VERIFIED |
| P07 | [Open blank intake](intake/P07.md) | INTAKE_PENDING / NOT_VERIFIED |

Also prepared:

- [Reusable product dossier](templates/PRODUCT_DOSSIER.md)
- [Agent permission and human-approval matrix](templates/AGENT_PERMISSIONS.md)
- [Privacy, AI-provider and data-flow questionnaire](templates/DATA_AND_PRIVACY.md)
- [Buyer-facing offer and acceptance checklist](templates/SALES_OFFER.md)
- [Security and procurement questionnaire](templates/BUYER_DUE_DILIGENCE.md)
- [Incident response, support and exit plan](templates/SUPPORT_INCIDENT_EXIT.md)
- [Evidence release and no-invented-claims checklist](templates/CLAIMS_AND_EVIDENCE.md)
- [Unit economics and pricing](templates/PRICING_AND_UNIT_ECONOMICS.md)
- [Pilot test and customer feedback protocol](templates/PILOT_AND_EVALUATION.md)
- [Bilingual sales landing page copy](templates/PRODUCT_LISTING_BILINGUAL.md)
- [Delivery, renewals and cancellation operations](templates/DELIVERY_AND_OFFBOARDING.md)
- [15 existing launch gates](../docs/VYRA_LAUNCH_GATES.md)
- [Public trust center](https://natanaelprogimo-afk.github.io/portfolio/en/trust/)

## Readiness gate CLI

The sample registry is \`seven-products.template.json\`. All 105 product-gate entries begin **NOT_VERIFIED**. A PASS in the gate matrix requires a dated human review and evidence references; a sale approval requires further commercial fields and explicit operator authorization.

\`\`\`sh
npm run test:commercial
npm run commercial:check
\`\`\`

The checker verifies structural consistency. It **cannot determine whether evidence is real**, whether contracts are legally valid, or whether real production security controls pass. Store genuine evidence in private storage and have the owner (and independent reviewers, where needed) verify it.

## Operating procedure when seven identities arrive

1. Privately map product name -> P01..P07 without assuming whether it is SaaS, agent or hybrid.
2. Collect one sentence of functionality and the *real* current state for each; do not invent anything missing.
3. Identify jurisdiction, customer type, sensitive data, external actions, integrations and hosting.
4. Inspect real source/working demo with authorized access and record test evidence.
5. Determine MVP and competitive positioning; validate demand and costs before pricing.
6. Complete applicable legal, security, privacy, support, agent controls and product acceptance checks.
7. Prepare a buyer proof pack from screenshots/videos of the real product, with consent.
8. Approve each commercial listing separately; **no automatic public release, checkout or customer onboarding**.
9. If a material gate fails, leave that product blocked even if the other six are ready.
10. Audit after publication and reconcile actual customer orders, service delivery and received payouts.

### Critical distinction

A secure-looking website or successful GitHub Actions run for this **portfolio** does not certify the seven separate products. The public trust center is a transparency page, not a product-specific security assessment.
