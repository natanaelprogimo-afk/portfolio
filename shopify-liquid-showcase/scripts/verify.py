#!/usr/bin/env python3
"""Structural QA for this showcase. Complements, never replaces, Shopify Theme Check."""
from __future__ import annotations

import json
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
issues: list[str] = []
total = 0


def check(description: str, passed: bool) -> None:
    global total
    total += 1
    if not passed:
        issues.append(description)
    print(f"{'PASS' if passed else 'FAIL'}: {description}")


def read(path: str) -> str:
    return (ROOT / path).read_text(encoding="utf-8")


def json_at(path: str):
    obj = json.loads(read(path))
    check(f"{path}: JSON is valid", True)
    return obj


layout = read("layout/theme.liquid")
check("Layout provides content_for_header exactly once", layout.count("{{ content_for_header }}") == 1)
check("Layout provides content_for_layout exactly once", layout.count("{{ content_for_layout }}") == 1)
check("Layout has UTF-8, viewport and a <main> landmark", all(token in layout for token in [
    'charset="utf-8"', 'name="viewport"', "<main id=\"MainContent\""
]))
check("Layout links a keyboard skip link and main ID", 'href="#MainContent"' in layout)
check("Layout has SEO description and canonical URL", 'name="description"' in layout and "canonical_url" in layout)
check("Layout registers stylesheet and deferred script", "stylesheet_tag" in layout and "defer></script>" in layout)
check("Layout reads global accent setting", "settings.accent_color" in layout and "--vyra-accent" in layout)

schema_pattern = re.compile(r"{%-?\s*schema\s*-?%}([\s\S]*?){%-?\s*endschema\s*-?%}")
section_schema: dict[str, dict] = {}
for section_path in sorted((ROOT / "sections").glob("*.liquid")):
    rel = section_path.relative_to(ROOT).as_posix()
    contents = section_path.read_text(encoding="utf-8")
    matches = schema_pattern.findall(contents)
    check(f"{rel}: exactly one schema", len(matches) == 1)
    if not matches:
        continue
    schema = json.loads(matches[0])
    section_schema[section_path.stem] = schema
    check(f"{rel}: valid section name length", 0 < len(schema.get("name", "")) <= 25)
    setting_ids = [setting.get("id") for setting in schema.get("settings", []) if setting.get("id")]
    check(f"{rel}: unique section setting IDs", len(set(setting_ids)) == len(setting_ids))
    block_types = [block.get("type") for block in schema.get("blocks", [])]
    check(f"{rel}: unique block types", len(set(block_types)) == len(block_types))
    check(f"{rel}: presets use valid names", all(
        0 < len(preset.get("name", "")) <= 25 for preset in schema.get("presets", [])
    ))

templates = ["index", "product", "collection", "cart", "404"]
for name in templates:
    relative = f"templates/{name}.json"
    data = json_at(relative)
    sections = data.get("sections", {})
    order = data.get("order", [])
    check(f"{relative}: contains sections and order", isinstance(sections, dict) and isinstance(order, list))
    check(f"{relative}: references valid section IDs", len(order) == len(set(order)) and set(order) == set(sections))
    check(f"{relative}: references existing section types", all(
        section.get("type") in section_schema for section in sections.values()
    ))
    check(f"{relative}: max 25 section instances", len(sections) <= 25)
    for section in sections.values():
        sch = section_schema.get(section.get("type"), {})
        valid_blocks = {b.get("type") for b in sch.get("blocks", [])}
        for block in section.get("blocks", {}).values():
            check(f"{relative}: block '{block.get('type')}' is declared",
                  block.get("type") in valid_blocks)
        if "block_order" in section:
            check(f"{relative}: block_order matches blocks", set(section["block_order"]) == set(section["blocks"]))

for section_path in sorted((ROOT / "sections").glob("*.liquid")):
    source = section_path.read_text(encoding="utf-8")
    without_comments = re.sub(r"{%-?\s*comment\s*-?%}[\s\S]*?{%-?\s*endcomment\s*-?%}", "", source)
    for snippet in re.findall(r"{%-?\s*render\s+['\"]([^'\"]+)['\"]", without_comments):
        check(f"{section_path.name}: render '{snippet}' exists", (ROOT / "snippets" / f"{snippet}.liquid").is_file())

check("Newsletter uses Shopify's native customer form and email field",
      "{%- form 'customer'" in read("sections/vyra-newsletter.liquid")
      and 'name="contact[email]"' in read("sections/vyra-newsletter.liquid"))
check("Newsletter has required explicit opt-in and success/error messages",
      all(token in read("sections/vyra-newsletter.liquid") for token in [
          "marketing_consent_confirmed", "required", "form.posted_successfully?", "form.errors"
      ]))
check("Product template has Shopify product form with variant, quantity and add",
      all(token in read("sections/vyra-main-product.liquid") for token in [
          "form 'product'", 'name="id"', 'name="quantity"', 'name="add"', "payment_button"
      ]))
check("Cart template contains update, remove and checkout mechanics",
      all(token in read("sections/vyra-main-cart.liquid") for token in [
          'name="updates[]"', "url_to_remove", 'name="checkout"', 'name="update"'
      ]))
check("Collection uses bounded pagination",
      "paginate collection.products by 12" in read("sections/vyra-main-collection.liquid"))
check("Responsive product images use Shopify filters",
      "image_url" in read("snippets/vyra-product-card.liquid") and "image_tag" in read("snippets/vyra-product-card.liquid"))
css = read("assets/vyra-showcase.css")
check("CSS has at least mobile and tablet breakpoints", "@media (max-width: 570px)" in css and "@media (max-width: 880px)" in css)
check("CSS respects reduced motion and visible focus", "prefers-reduced-motion" in css and ":focus-visible" in css)
check("JS updates variant price and stock state", all(key in read("assets/vyra-product.js") for key in [
    "selectedOptions", "button.disabled", "price.textContent", "searchParams.set('variant'"
]))
check("Default Shopify locale exists", (ROOT / "locales/es.default.json").is_file())
json_at("locales/es.default.json")
json_at("config/settings_schema.json")
json_at("config/settings_data.json")
check("Email automation guide distinguishes Messaging and Flow",
      "Shopify Messaging" in read("docs/email-marketing-plan.md") and "Shopify Flow" in read("docs/email-marketing-plan.md"))
check("QA guide explicitly reserves tests for an authorized store",
      "tienda de desarrollo" in read("docs/qa-checklist.md"))

print(f"\nRESULT: {total - len(issues)}/{total} structural checks passed.")
if issues:
    print("FAILURES:\n - " + "\n - ".join(issues))
raise SystemExit(1 if issues else 0)
