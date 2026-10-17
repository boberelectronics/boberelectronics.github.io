# Hardware photograph audit — October 17, 2026

All 44 new originals in `assets/images/refurb_hardware/` were visually inspected using `hardware-contact-1.jpg` and `hardware-contact-2.jpg`. The source set contains 27 HEIC, 16 PNG, and one JPG photograph. Each record has one genuine supplied photograph; no alternate angles, stock images, AI images, retouching, or additional inventory claims were created.

The corresponding data categories contain 19 GPUs, seven memory listings, five CPU listings, four bundles, four systems, two storage listings, two motherboards, and one cooler. Categories group records; they do not imply current availability or a common restoration process.

## Featured photograph selection

The six selected IDs provide a deliberate mixture of product types and compositions while retaining each complete original frame:

1. **hardware-025 — Gigabyte Vision GeForce RTX 3070 Ti.** The strongest lead image: white three-fan GPU photographed upright at a shallow angle against a neutral desk and backdrop.
2. **hardware-042 — XFX AMD Radeon RX 6700 10GB GPU.** A clean dark three-fan GPU composition that complements the white Vision card.
3. **hardware-044 — i9-13900K + Z790 Gaming WiFi DDR5 Motherboard Bundle.** Supplied photograph shows the CPU and motherboard boxes, clearly distinguishable from the exposed GPU photos; it should not be described as an unboxed motherboard photograph.
4. **hardware-029 — Intel NUC8i3BEH desktop.** A compact black system photographed in three-quarter view, with its front connections visible.
5. **hardware-032 — Lenovo Thinkpad.** An authentic open-laptop photograph adds a different form factor. Its current sale text comes from the new filename; older historical records keep their existing wording separately.
6. **hardware-041 — Trident Z RGB memory.** A simple arrangement of the two supplied memory modules adds a smaller component and contrasting material texture.

Each selected item uses `assets/images/webp/refurb_hardware/<id>_thumb.webp` and `<id>_full.webp`, with IDs and exact original paths documented in the manifest.

## Decode, orientation, color, and optimization

Rebuild with:

```sh
python3 tools/build_hardware_derivatives.py
```

Requirements: Pillow with LittleCMS and WebP support; `heif-convert` from libheif for HEIC sources. The helper affects only the new hardware derivatives and their QA contact sheets. It never regenerates the PC hero, featured build, or sold-PC photographs.

macOS `sips` was tested first but returned uniform black frames for the HEIC files in this session despite reporting successful conversion. Pixel checks caught this before production derivatives were generated. The working generator therefore uses libheif `heif-convert`, which decoded the actual photographs and retained their embedded Display P3 ICC profiles. Pillow then applies ICC-managed conversion to sRGB. HEIF display transformations and remaining EXIF orientation are applied before resizing. ICC profiles are embedded in the final WebPs, while camera EXIF/XMP metadata is omitted. Temporary decoded PNGs are removed after a successful build.

All images retain their entire supplied frame. Thumbnails fit within 640×640px and full images within 1440×1440px, without upscaling. The interface should continue to use `object-fit: contain` and black letterboxing. No crop is applied. Every source and output has SHA-256 provenance, exact dimensions, byte count, and color/orientation details in `assets/images/webp/refurb_hardware/manifest.json`.

Validation passed for all 44 unchanged source hashes and all 88 WebP output hashes. Every output decoded successfully, contained nonuniform photographic pixels, retained its original aspect ratio within one pixel of resize rounding, contained its sRGB ICC profile, and omitted EXIF/XMP metadata.

- All 44 thumbnails: **1,891,602 bytes**, largest 81,532 bytes.
- All 44 full images: **8,845,446 bytes**, largest 372,002 bytes.
- Combined derivative payload: **10,737,048 bytes**.

## Moved historical photo equivalence

Read-only `git show HEAD:<old-path>` byte hashes prove the following three active historical images are exact file duplicates at their new paths:

- `assets/images/refurbished/refurbLenovoThinkpad.png` → `assets/images/refurb_hardware/Lenovo Thinkpad - i7-6600U, GeForce GTX 930M, 24GB RAM, 1TB NVMe SSD - Sold for $240.png`.
- `assets/images/refurbished/refurbCOMBO_12700k:z690.png` → `assets/images/refurb_hardware/Core i7 12700K + ASRock Z690 LGA1700 Motherboard COMBO - Sold for $200.png`.
- `assets/images/refurbished/refurbGPU_1070Ti.png` → `assets/images/refurb_hardware/EVGA GeForce GTX 1070 Ti 8G GPU (w: Original Box) - Sold for $110.png`.

The historical `refurb2080_GPU.png` asset, which was not attached to an active refurbished record, is also an exact byte duplicate of the newly named `Dell GeForce RTX 3090 24GB GPU - Sold 3x for $700 Each.png`. This is file provenance; historical names are not used to invent or modify inventory specifications.

The old `refurbGPU_3070.png` and new `OEM GeForce RTX 3070 8GB GPU - Sold for $240.HEIC` show visually matching photographed hardware with different framing and resolution. They are not exact file duplicates. No exact source alias was asserted. The retained historical WebP derivatives preserve the previous composition, and `hardware-legacy3070-compare.jpg` records the visual comparison. No deleted original was restored.
