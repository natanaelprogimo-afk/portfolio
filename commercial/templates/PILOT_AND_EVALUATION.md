# Product-specific pilot and evaluation protocol

**Template only.** Do not contact prospects, run unapproved trials, access customer systems, or label pilots as completed.

## Pilot definition

- SKU, version, demo owner, contact and actual test environment:
- Customer segment, verified authorization and eligible country:
- Problem hypothesis, existing customer workflow and decision-maker:
- Excluded uses, data sensitivity and tool permissions:
- Pilot duration and maximum spend (must be agreed):
- Synthetic/demo data or legally authorized limited data:
- Expected completion, quality and usability criteria:
- Reliability and budget caps, explicit failure conditions:
- Human-in-the-loop approval cases and audit evidence:
- Export/delete/roll back steps after pilot:

## Test cases

1. The primary happy path works on a clean environment.
2. Invalid input is rejected without side effects.
3. Missing/expired credentials do not leak data.
4. External APIs are unavailable, rate limited or return malformed data.
5. Retrying does not duplicate purchases, messages or critical writes.
6. Human approval is required and denial prevents action.
7. Instruction injection in external content cannot override authorized scope.
8. Agent time/token/cost budget and emergency stop enforce safely.
9. Customer data is isolated and export/deletion works as promised.
10. Observability records useful evidence without passwords or payloads.

## Evidence and measurement

| Test ID | Version | Scenario | Expected | Observed | Owner | Date | Status | Redacted evidence reference |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| PILOT-001 | TBD | TBD | TBD | NOT TESTED | TBD | TBD | NOT_VERIFIED | — |

## Customer feedback capture

- Actual customer quote with authorization for internal use:
- What problem would justify paying and at what business constraints?
- Current alternative, friction and why this solution might be adopted:
- Security/procurement blockers and must-have integrations:
- Unmet expectations and unacceptable failures:
- What is required before production launch?

**No testimonials, quantified time savings or success percentages are publishable** without precise evidence, consent, context and measurement method. A demo is not proof of market demand.

## Decision record

- Engineering PASS/FAIL or open risks:
- Data/privacy legal PASS/FAIL or open risks:
- Economics and support review:
- Pilot acceptance sign-off (if any):
- Next experiment and stop condition:
- Explicit VYRA owner approval:
- Publication: HOLD until authorization and 15 release gates are satisfied.
