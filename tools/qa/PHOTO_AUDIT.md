# Real photography audit

Inspected all 33 featured photographs, all 131 archive photographs, and all five refurbished photographs on contact sheets. Opened the selected hero, all three dedicated SIDE2 macro photographs, RX 9070 XT side photograph, and RTX 5080 side photograph at large size. Contact sheets are saved beside this document as `*-contact-*.jpg`; inventory dimensions and original byte sizes are recorded in `image-audit.json`.

## Selection and provenance

- **Hero:** `9070White_FRONT.png`. The strongest three-quarter composition combines a recognizable complete white RX 9070 XT build, visible cooling/RAM/GPU details, and an existing dark backdrop. `hero-9070-800.webp` and `hero-9070-1600.webp` preserve the complete original frame.
- **Hero detail / black editorial:** `3080_2Black_SIDE2.png`, belonging to the RTX 3080 / Ryzen 7 3700X liquid-cooled build. A genuine close-up, with the Rise Mode pump, GeForce GPU heatsink, and sleeved black power leads. No crop. Separate 640px hero version plus 800/1440px editorial versions.
- **White editorial:** `5070_SIDE2.png`, belonging to the RTX 5070 / Ryzen 7 5700X build. A genuine close-up showing the Redragon AIO block, white coolant tubes, and GPU power cabling. No crop. 800/1440px versions.
- **Red editorial:** `6900XT_SIDE2.png`, belonging to the RX 6900 XT / Ryzen 5 5600 build. A genuine close-up of the Red Devil GPU shroud, exposed heatsink fins, and red case fans. No crop. 800/1440px versions.
- **Cooling editorial:** `9070White_SIDE.png`, the same RX 9070 XT / Ryzen 5 7600X system as the hero. Crop `[300,140,1500,840]` from the 1788×1294 original removes the case base and most backdrop to emphasize three radiator fans, the Thermalright pump, illuminated RAM, and the coolant tube/cable curves. 800×467 and 1200×700px versions. It is a tighter interior composition rather than an additional camera macro.

No hardware is added, removed, retouched, or recolored. No stock or AI imagery is used. Image crops do not mix systems. Every output, original path, source dimension, output dimension, quality setting, exact crop box, and byte size is recorded in `assets/images/editorial/manifest.json`.

## Performance and preservation

`python3 tools/build_photo_derivatives.py` recreates all new derivatives using Pillow. Existing original PNGs and featured WebP derivatives are preserved. Archive and refurbished derivatives are resized within a 640px square for thumbnails and 1440px square for detailed viewing, retaining the entire original frame and aspect ratio. In the UI they require `object-fit: contain` with black letterboxing.

- 131 archive thumbnails: 3,442,202 bytes total; largest 67,938 bytes.
- 131 archive full derivatives: 11,384,536 bytes total; largest 192,490 bytes.
- Five refurbished thumbnails: 159,178 bytes total.
- Five refurbished full derivatives: 486,724 bytes total.
- Eleven hero/editorial derivatives: 823,400 bytes total.

All 283 generated WebPs passed Pillow decoding verification. All 272 archive/refurbished derivatives have `crop: null` and preserve original aspect ratio within one pixel of resize rounding. Original archive photographs total 213,547,262 bytes; they remain available for explicit original-image viewing without being used as browsing thumbnails.

## Precise optional new photographs

The existing supplied SIDE2 photographs are enough for an authentic close-up feature. For a later refresh, capture the RTX 5080 GPU/backplate at a shallow three-quarter angle under diffused neutral light; the hidden-side cable tray with its panel off; and radiator fin, connector, and case material details at close focus. The existing BACK photos show rear I/O/exhaust, so they are not evidence of behind-the-tray cable management. Keep a complete-system reference shot alongside each macro so later captions can reliably identify its build.
