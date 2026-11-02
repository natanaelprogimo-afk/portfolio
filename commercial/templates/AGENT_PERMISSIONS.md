# Agent tool permission matrix — product-specific template

**Status:** empty review template. An agent is never presumed safe merely because it uses an LLM.

## Per-tool inventory

| Tool/API | Provider | Data categories | Required scopes | Read actions | Write actions | High-impact actions | Approval owner | Rate/cost limits | Logging/retention | Test reference |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| [tool] | [provider] | [data] | [minimum scopes] | [read] | [write] | [high impact] | [person] | [caps] | [redaction] | [test] |

For every connected account, require actual OAuth/API scopes, service account isolation, credential rotation, revocation steps and cross-tenant tests.

## Default decision table

| Operation | Default | Required release evidence |
| --- | --- | --- |
| Read authorized non-sensitive records | DENY until explicitly scoped | Role, consent/authorization, retrieval log |
| Write/edit internal records | DENY until authorization/limits | Allowlist, idempotency, version test, audit |
| Send external email/SMS/social messages | HUMAN APPROVAL | Recipient preview, approval identity/time, no duplicate sends |
| Purchase, charge or transfer funds | HUMAN APPROVAL / prohibited by default | Budget, permissions, signed customer mandate, settlement test |
| Delete records or user accounts | HUMAN APPROVAL | Export/backup, scope, reversible if feasible |
| Modify integrations/credentials | HUMAN APPROVAL / admin only | Approval, secret redaction, scope change audit |
| Open public pages or read untrusted documents | LOW TRUST INPUT | Prompt-injection tests, content isolation |
| Exfiltrate or share customer data | DENY | Product-specific lawful basis, explicit destination approval |

**Required failure tests:** prompt injection, revoked key, missing owner consent, silent API timeouts, repeated tools, retry storm, partial action, data poisoning, unexpected external recipient, duplicate charge, runaway token consumption, unauthorized cross-tenant access, kill switch mid-execution.

**Minimum recorded telemetry:** anonymized run ID, agent version, tool version, action class, explicit authorization decision, non-sensitive result category, cost, elapsed time, final receipt and error state. Never log secrets or customer payload by default.

**Approval interface design:** allow user to approve or reject clearly summarized action, recipient, amount, target resource and risk before execution; enforce expiration and deny by default. Testing should demonstrate the agent **cannot** bypass the approval check.

Reference: [OWASP AI Agent Security Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/AI_Agent_Security_Cheat_Sheet.html).
