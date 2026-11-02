# Product economics — SaaS and agent pricing worksheet

**Do not infer prices, revenue, profits, fees or margins.** These formulas are planning tools. Record each source, currency, date and applicable jurisdiction.

## Unit economics per billing period

| Input | Value | Evidence source |
| --- | --- | --- |
| Currency | TBD | — |
| Plan price excluding taxes | TBD | — |
| Active users/organizations | TBD | — |
| Included requests/tokens/runtime | TBD | — |
| AI token model/provider and cost rate | TBD | Provider terms/actual invoice |
| Average requests per customer and usage distribution | TBD | Metered test or pilot |
| Infra hosting, DB, bandwidth, storage | TBD | Metered bill |
| External API/connector fees | TBD | Provider pricing/contract |
| Processor per-transaction and percentage fees | TBD | Processor fees for jurisdiction |
| Refund/chargeback allowance | TBD | Actual terms |
| Support, monitoring and incident reserve | TBD | Time/cost assumptions |
| Taxes and withholding | TBD | Qualified tax advice |
| Fraud/abuse buffer | TBD | Documented conservative assumption |

**Contribution per paying customer** = collected revenue excluding applicable taxes − variable hosting/model/API/payment costs − variable support and refund allowances.

**Contribution margin** = contribution / collected revenue excluding applicable taxes. Do not call this net profit: fixed costs, tax and founder time may remain.

**Break-even subscribers (scenario)** = fixed monthly costs ÷ positive contribution per subscriber. If contribution ≤ 0, no finite subscriber count breaks even.

## Three scenarios per product

Record low/base/high request volumes, provider latency, retries, support load and cost spikes. Apply hard caps, clear overage authorization and abuse protection. For agents, count side effects, human-review time and provider credit spend. Make customer cost behavior predictable before any subscription.

## Required commercial checks

- Verify payment provider accepts seller jurisdiction and the buyer's target regions.
- Explicitly describe renewal, cancellation, proration, refunds and invoice currency.
- Verify actual payout receipts separately from checkout success.
- Record subscription access revocation and refunds before saying delivery is automated.
- Do not subsidize unlimited AI usage without real measured costs and enforceable limits.
- Do not set a "most competitive" price before buyer research and measurable operating costs.

**Status:** all numerical inputs awaiting information from the product owner; no prices or financial predictions are approved.
