#!/usr/bin/env python3
"""Static checks only. Shopify CLI theme check and a real dev store are separate."""
import json
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
SCHEMA_PATTERN = re.compile(r"{%\s*schema\s*%}([\s\S]*?){%\s*endschema\s*%}")
RENDER_PATTERN = re.compile(r"{%-?\s*render\s+['\"]([^'\"]+)['\"]")
checks = []

def check(description, passed):
    checks.append((description, bool(passed)))
    print(("PASS" if passed else "FAIL") + ": " + description)

layout = (ROOT / "layout/theme.liquid").read_text(encoding="utf-8")
check("Layout exposes Shopify-required content placeholders",
      "{{ content_for_header }}" in layout and "{{ content_for_layout }}" in layout)

schema_by_section = {}
for path in sorted((ROOT / "sections").glob("*.liquid")):
    source = path.read_text(encoding="utf-8")
    matches = SCHEMA_PATTERN.findall(source)
    check(f"{path.name}: exactly one schema tag", len(matches) == 1)
    if len(matches) == 1:
        data = json.loads(matches[0])
        check(f"{path.name}: section name <=25 characters", len(data["name"]) <= 25)
        schema_by_section[path.stem] = data

for path in sorted(ROOT.rglob("*.liquid")):
    source = path.read_text(encoding="utf-8")
    for name in RENDER_PATTERN.findall(source):
        check(f"{path.name}: render '{name}' exists", (ROOT / "snippets" / (name + ".liquid")).is_file())

template = json.loads((ROOT / "templates/index.json").read_text(encoding="utf-8"))
check("Index references defined sections", all(
    section.get("type") in schema_by_section
    for section in template["sections"].values()
))
check("Index order references defined IDs", set(template["order"]) == set(template["sections"]))
for entry in template["sections"].values():
    schema = schema_by_section.get(entry["type"], {})
    valid_blocks = {b["type"] for b in schema.get("blocks", [])}
    for block in entry.get("blocks", {}).values():
        check(f"{entry['type']}: block '{block['type']}' declared", block["type"] in valid_blocks)

for path in [ROOT / "config/settings_schema.json", ROOT / "config/settings_data.json"]:
    json.loads(path.read_text(encoding="utf-8"))
    check(f"{path.name} parses as JSON", True)

check("Stylesheet asset exists", (ROOT / "assets/vyra-showcase.css").is_file())
check("Customer newsletter form exists",
      "{%- form 'customer'" in (ROOT / "sections/vyra-newsletter.liquid").read_text(encoding="utf-8"))
failed = sum(not status for _, status in checks)
print(f"\nResult: {len(checks) - failed}/{len(checks)} static checks passed.")
raise SystemExit(1 if failed else 0)
