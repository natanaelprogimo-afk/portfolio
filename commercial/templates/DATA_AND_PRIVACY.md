# Data, privacy and AI-provider intake — product template

**Not a privacy policy or DPA.** Do not publish as a legal contract. Owner plus qualified legal/compliance review are required.

## Data flow inventory

| Data type | Origin | Purpose | Processor/controller | Storage location | AI model/API provider | Subprocessor | Legal basis | Retention | Export/deletion | Risk | Evidence |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| [data] | [origin] | [purpose] | [role] | [region] | [provider or none] | [subprocessor] | [basis] | [period] | [mechanism] | [risk] | [test] |

## Buyer questions that must be answered

- What personal, financial, health, identity or customer-sensitive data is accepted or generated?
- Is an LLM provider permitted to retain prompts or use them for training? Record actual contract/settings rather than assumptions.
- How are user access, roles, API keys and tenant boundaries enforced in real code?
- Which region and subprocessors will host, process, back up or support the data?
- What rights do users have to access, correct, export or delete data, and how are requests fulfilled?
- What happens at subscription expiry, cancellation, nonpayment, backup expiry and disaster recovery?
- What audit events are collected, who can access them and for how long?
- Does the operation require Uruguayan database registration or notifications? Assess applicable law with qualified counsel.
- Are cross-border transfers, children's data, special categories or sectoral restrictions in scope?
- Can data from different customers be mixed during training, embeddings, retrieval, tools or logging?
- What technical and organizational measures can be demonstrated rather than only described?

### Security verification before onboarding

Run access/tenant tests, authenticated API tests, encryption/credential handling checks, vulnerability scanning permitted by scope, secret scanning, data deletion/export tests, backup restoration and representative prompt injection tests where relevant.

Keep a distinct product-specific privacy policy and DPA **only after** these answers are verified. Blank fields are a release blocker, not consent by omission.

References: [Uruguay Law 18.331](https://www.impo.com.uy/bases/leyes/18331-2008) and [URCDP obligations](https://www.gub.uy/unidad-reguladora-control-datos-personales/politicas-y-gestion/obligaciones).
