# VYRA | Responsive Layout Repair - WordPress child-theme scaffold

Independent, AI-assisted educational demonstration on **fictional** content.

## Evidence status (2026-11-07)

- Static HTML/CSS fixture: Chromium checks at **320, 390, 768 and 1366 px** passed without horizontal overflow. The intentionally broken version overflows at 390 px (1060px document width).
- PHP syntax: \`php -l functions.php\` passes.
- WordPress hook wiring: an isolated PHP **mock** for \`add_action\`, \`wp_enqueue_style\`, and \`wp_get_theme\` passes.
- **OWNER-REPORTED LOCAL WORDPRESS TEST COMPLETED (2026-11-07)**: The owner installed the child theme and lab plugin in local Docker WordPress, created separate Before and After pages, and supplied actual Chrome console results for After. At 320, 390, 768 and 1366 CSS pixels, document width equalled viewport width and horizontal overflow was false. The stylesheet check on After at 390 px was true. A Before screenshot at Chrome Responsive 390 x 640 showed visible layout clipping, but Before window.innerWidth reported 1178, so that console measurement alone does not establish a 390px layout viewport. These owner-reported results validate the scoped local demo, not a production customer deployment or full WordPress plugin/browser compatibility.

## What is in this folder

- \`style.css\`: metadata for an educational Twenty Twenty-Five child-theme scaffold.
- \`functions.php\`: registers \`fixed.css\` on \`wp_enqueue_scripts\`.
- \`fixed.css\`: layout corrections for a specifically structured HTML fixture, not generic fixes for all WordPress themes.

The related reproducible HTML fixture, broken CSS, browser test, and Chromium screenshots are packaged in the VYRA Fiverr case-study ZIP delivered to the owner. This folder alone is **not a production-ready WordPress theme**. The lab was tested in a local WordPress instance, but CSS selectors and behavior must be reassessed on each real client website.

## Final evidence checklist

1. Keep authentic Before screenshot at the 390 px device setting; capture an authentic After screenshot at the same setting.
2. Store owner-reported Chrome console results (After at 320, 390, 768, 1366 CSS pixels: no horizontal overflow).
3. In Fiverr, describe this as an independent local WordPress demo with fictional content, not customer work.
4. Broader interaction, accessibility, compatibility and production tests have not been performed.

No external credentials are bundled.
