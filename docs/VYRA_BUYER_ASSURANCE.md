# VYRA — buyer assurance and transparent product evaluation

**Published disclosure date:** 2026-11-02  
**Operator:** Alerson Morales — independent developer in Uruguay, VYRA brand  
**Contact for a proposed engagement:** moralesalerson@gmail.com  
**Scope:** future SaaS subscriptions, custom software and AI-agent solutions

> This document is **not** a live product's terms, SLA, privacy notice or DPA. It does not certify production controls. Each future product must pass its own commercial, legal, data protection and security review before accepting payment or customer data.

## Distinguish evidence from aspirations

| Subject | What can be inspected today | What must not be claimed |
| --- | --- | --- |
| Public engineering | [React portfolio](https://natanaelprogimo-afk.github.io/portfolio/en/), [Python/SQLite API example](../examples/backend/), [SQL tests](../examples/sql/), [client-side lab](https://natanaelprogimo-afk.github.io/portfolio/en/labs/) | That the examples are the deployed private agent/SaaS; customer outcomes or uptime |
| CI | [Portfolio quality workflow](../.github/workflows/quality.yml), automated tests and optional artifacts | Independent penetration test, production security audit or formal certification |
| SaaS | Product ideas, in-development private systems | Generally available, hosted paid SaaS, validated subscription or guaranteed SLA |
| Agents | Private prototypes and research | Unlimited autonomous access, guaranteed task success, safe high-risk operations without controls |
| Data handling | A static informational portfolio and outbound email contact | Production tenant isolation, encryption at rest, retention periods or deletion guarantees for unreleased products |

## What a prospective buyer should receive before purchase

1. **Legal identity and product scope:** confirmed seller details, contact and invoicing, exact deliverables, version, customer responsibilities and acceptance test.
2. **Transparent economics:** purchase/subscription price, recurring period, taxes, API/model spending caps and how overages are approved, refunds and cancellations.
3. **Verified demonstration:** demo environment with synthetic data, documentation, test results, known limits, responsible usage and a written acceptance criterion.
4. **Data terms:** product-specific privacy notice; data roles, purposes, legal basis, storage locations, subprocessors, model providers, retention, deletion, export and training use; assessment of applicable Uruguayan law and other jurisdictions.
5. **Security architecture:** documented auth, identity isolation, permissions, secret handling, webhook authentication, input/output validation, dependency review, backups and restoration test.
6. **AI-agent safety:** allowlisted tools, least privilege, explicit approval for money/transfers/messages/deletions, escalation, idempotency, rollback where feasible, prompt-injection tests and a kill switch.
7. **Availability and support:** written support channel, scope, hours, target times if contractually offered; any SLA requires defined measurement and remedies.
8. **Exit plan:** licensing and IP scope, access revocation, data export, retention after end of service, deletion confirmation and migration limitations.
9. **Evidence:** dated test results, unresolved risks, release version, support contact and any legitimate third-party reports.
10. **Dispute/incident mechanism:** genuine complaint/incident intake, delivery/contract record and locally reviewed refund language.

**No payment acceptance gate:** do not describe a service as operational until the relevant conditions have verifiable evidence. Do not charge for undocumented performance or compliance guarantees.

## Agent threat model and required verification

Threats to test per product (based on [OWASP AI Agent Security](https://cheatsheetseries.owasp.org/cheatsheets/AI_Agent_Security_Cheat_Sheet.html)):

| Risk | Release test that should exist | Evidence to retain |
| --- | --- | --- |
| Prompt injection from document or webpage | Inject conflicting instructions into untrusted content; ensure actions remain within authorized policy | Test ID, redacted input, expected/actual result |
| Excessive tool authority | Attempt unapproved write/transfer/message; ensure deny or human approval | Permission matrix, decision log |
| Cross-customer leakage | Attempt tenant A resource access with tenant B credentials | Isolation tests and access rules |
| Unsafe retries | Replay duplicate request after ambiguous failure | Idempotency and side-effect reconciliation |
| Data exfiltration | Attempt sensitive data export to unauthorized destination | Scope restrictions, test outcome |
| Unbounded tokens/time/cost | Force recursive/retry-heavy tasks; observe cap/termination | Cost limits, alerts and stop behavior |
| Credential exposure | Examine outputs/logs/errors for API secrets and tokens | Secret-scanning and redaction evidence |
| Misleading success report | Compare agent claims against real tool receipt/state | Source-linked verification or failure status |
| Provider outage | Simulate unavailability and observe safe failure | Recovery/restore exercise |

No passing result for a private production agent is asserted by this template.

## Privacy and Uruguay

The [Uruguayan Personal Data Protection Law 18.331](https://www.impo.com.uy/bases/leyes/18331-2008) and [URCDP guidance](https://www.gub.uy/unidad-reguladora-control-datos-personales/politicas-y-gestion/obligaciones) may impose notice, data subject rights, registration, security and other duties according to actual operations. Do not publish an inaccurate privacy policy copied from unrelated SaaS businesses. Obtain professional legal review of the actual product, processing activities, jurisdictions and terms before onboarding customers.

## Responsible vulnerability intake

Use subject **"VYRA security report"** to contact moralesalerson@gmail.com. Do not email secrets, customer datasets or exploit payloads. A report is not authorization to scan, attack or access private or third-party services. No response-time promise or bug bounty is offered here.

## What does not exist as an established claim

No independent SOC 2 audit, ISO 27001 certification, independent pentest, production uptime log, public enterprise reference, general SLA, paid SaaS checkout or documented standard DPA is asserted by this document.

*This document describes commercial due diligence and future release gates; it is not legal advice or a substitute for independent product verification.*
