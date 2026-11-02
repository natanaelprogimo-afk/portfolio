# Support, incident response and customer exit plan — draft

**Not a live SLA.** Targets and customer notification timeframes must be reviewed and agreed per product.

## Support matrix
- Verified support channel and hours:
- Customer verification before disclosing account information:
- Severity definitions and routing, including security-specific queue:
- On-call availability (if actually staffed):
- Response targets (do not publish before approval):
- Dependencies, planned maintenance and exclusions:
- Escalation to API/model provider:
- Refund/cancellation policy coordination:

## Incident lifecycle — internal checklist

1. **Detect:** alert from availability, abuse, cost cap, tool action, backup monitor or responsible report.
2. **Triage:** confirm environment and affected tenants without copying payload/secrets into ticket.
3. **Contain:** revoke credentials, halt an agent, isolate tenant/workflow, pause integrations and preserve minimal evidence.
4. **Investigate:** version, commit, timeline, authorized actions, audit log and root cause.
5. **Recover:** roll back, restore data and test isolation; do not re-enable unsafe automation without explicit approval.
6. **Communicate:** follow actual legal and contractual notification duties, verified facts and recipient scope.
7. **Review:** document postmortem, prevention, verification and customer remediation.

### Test scenarios
- Provider unavailable mid-action
- Partial checkout/payment or double billing
- Duplicate outbound message/agent action
- Cross-tenant permission failure
- Prompt injection with external content
- Secret/token compromise
- Data restore failure
- Excessive API bill/token usage
- User cancellation and data export

## Exit / offboarding
- Revoke agents and integrations
- Confirm payment/settlement and entitlements
- Export in agreed machine-readable format
- Deletion after lawful retention period (include backups)
- Customer confirmation and audit evidence, without personal data in public artifacts

Never advertise 24/7 support, uptime percentages, response deadlines, insurance or automatic refunds unless they exist and are contractually approved.
