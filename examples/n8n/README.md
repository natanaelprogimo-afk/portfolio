# VYRA | n8n manual validation demo

Independent synthetic-data workflow. Not a customer project.

## What it shows

Manual Trigger -> Load synthetic records -> Validate data -> Summarize errors -> Assert expected outcomes.

Expected results: **5 records, 3 accepted and 2 rejected**. One duplicated identifier and one invalid negative amount are detected and summarized. No credentials, external APIs, customer records or persistent storage are involved.

## Reproduce

1. Open a local n8n instance and create a workflow.
2. Import `VYRA_Offline_Validation_Demo.workflow.json` via the workflow menu.
3. Execute it **manually**. Check the final node for `qa: FIXTURE_ASSERTIONS_PASSED`.
4. Capture a screenshot of actual n8n execution **only after** running and checking it.

Run `node verify_logic.mjs` to validate the JSON graph and JavaScript Code-node logic in a standalone Node VM with n8n-like input stubs.

## Verification boundary (2026-11-07)

- Graph and Code-node JavaScript: locally tested with a Node.js harness, results 5 / 3 / 2.
- Actual import and execution **inside the n8n runtime: NOT VERIFIED**.
- This does not demonstrate remote API integrations or 24/7 execution.
- Manual trigger only; no background jobs or external network activity.

Docs: https://docs.n8n.io/build/manage-workflows/export-and-import/
