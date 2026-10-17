# Close-up photograph audit

All eight supplied PNGs in `assets/images/closeups/` have been visually inspected. The original six were inspected on their contact sheet and as full-size optimized outputs. The two additions were inspected as original photographs and again as full-size optimized outputs. Original frames and visible hardware are preserved. No crop, retouching, fabricated imagery, or inferred build association is used.

## Stable source associations

Established IDs **closeup-01 through closeup-06 remain unchanged**. Their 12 existing WebPs were retained without rewriting, preserving their previous output hashes. Although the two newly supplied filenames sort earlier, their new IDs are appended explicitly:

- **closeup-07:** `Screenshot 2026-10-17 at 1.44.52 PM.png` — a large blue illuminated cooling fan beside two visible Corsair memory modules in a dark PC interior.
- **closeup-08:** `Screenshot 2026-10-17 at 1.45.23 PM.png` — blue illuminated EVGA GeForce RTX lettering below exposed graphics-card heatsink fins and a black backplate.

The existing manifest is required before the generator can run. It is the authoritative source-to-ID mapping. Valid existing outputs are reused byte for byte. New files require an explicit audited source/ID/alt-text association; missing or modified existing originals stop generation for another visual audit. IDs never come from re-sorting the source directory.

Original exact paths, SHA-256 hashes, dimensions, embedded profile names, output dimensions, output hashes, and audited visible-content alt/caption metadata are recorded in `assets/images/webp/closeups/manifest.json`.

## Slideshow sequence

The eight-photo sequence keeps the existing lead and alternates lighter and darker compositions:

**closeup-01 → closeup-07 → closeup-05 → closeup-08 → closeup-03 → closeup-04 → closeup-02 → closeup-06**.

- **01:** Geometric white liquid-cooling block, braided coolant tubes, illuminated fan, black graphics card, and white sleeved power cables.
- **07:** Blue fan light beside two Corsair memory modules.
- **05:** White braided coolant tubes, an illuminated round cooling block, and black graphics-card backplate.
- **08:** Blue EVGA lettering, exposed heatsink fins, and backplate materials.
- **03:** White case fans, metallic motherboard heatsink, and white spiral-lit cooling block.
- **04:** Dark blue rear fan, black spiral-lit cooling block, and metallic motherboard heatsink.
- **02:** Illuminated EVGA lettering, heatsink fins, and white sleeved power cables.
- **06:** ZOTAC GAMING card, tower air cooler, case fans, and combed cables.

Alt text describes visible components without assigning an undocumented CPU/GPU specification or claiming the images belong to an existing featured build. Caption strings remain descriptive metadata; the requested interface omits visible close-up descriptions. Only the `heroCloseups` array was updated in `data.js`: the six existing records remain unchanged, two audited records were added, and every other business-data field was compared and confirmed identical.

## Color and full-frame optimization

All eight images are fully opaque. Their embedded `Display` ICC profiles were converted to sRGB using LittleCMS. Output WebPs embed an sRGB ICC profile and omit EXIF/XMP metadata. No additional crop or color retouching is applied.

Rebuild only these close-up assets with:

```sh
python3 tools/build_closeup_derivatives.py
```

Pillow with LittleCMS and WebP support is required, together with the existing close-up manifest. The helper writes missing or changed 640px and 1280px maximum-edge derivatives, updates the manifest, and refreshes `tools/qa/closeups-contact.jpg`. It reads originals without modifying them and does not rebuild existing PC or hardware imagery.

All eight source hashes and all 16 output hashes passed verification. Every output decoded, contained photographic pixels, retained its complete original aspect ratio within one pixel of resize rounding, embedded its sRGB profile, and omitted EXIF/XMP metadata. A second generator run retained all 16 outputs unchanged and preserved every ID, source association, and derivative hash. Generator syntax also passed validation.

- Original PNG payload: **40,421,786 bytes**.
- Eight 640px derivatives: **219,390 bytes**.
- Eight 1280px derivatives: **631,316 bytes**.
- All 16 optimized outputs: **850,706 bytes**.
