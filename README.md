# Bober Electronics

A static, photography-led portfolio for custom PCs and past hardware sales. Vanilla HTML, CSS, and JavaScript work on GitHub Pages without a build step.

## View locally

From this project directory:

```sh
python3 -m http.server 8000 --bind 127.0.0.1
```

Open [http://127.0.0.1:8000](http://127.0.0.1:8000). Stop with `Ctrl+C`.

## Validate

```sh
node tools/validate-data.mjs
node tools/validate-site.mjs
```

These commands protect all original PCs, reviews, hardware sale wording, photograph associations, optimized-image provenance, public metrics, and accessible references. They also run the actual hero, five-review, featured-hardware, hardware-archive, PC-archive, and visible-filter handlers in an isolated test DOM. They supplement the separate browser QA documented in `VALIDATION_REPORT.md`.

## Current presentation

The site adopts the supplied `Argon_Frontend` visual reference while retaining this project’s data, dialogs, galleries, archive filtering, and preview/show-all browsing. Original reference hashes remain recorded; reference source files are optional after the owner removes them. The hero rotates eight supplied, audited close-ups with icon controls and no visible descriptive captions; reduced motion disables automatic rotation. Alternative text and accessible control labels remain. Five original highlighted reviews appear together beneath the featured PCs. The separate additional-feedback section was removed; its 38 original records remain preserved in `data.js`.

`heroCloseups` contains the eight original/optimized paths and audited alternative text/provenance. Caption metadata remains internal rather than displaying over the photographs. `python3 tools/build_closeup_derivatives.py` can rebuild their 640px/1280px WebPs with Pillow. Focused carousel and image-provenance checks run as `node tools/validate-hero.mjs` and `node tools/validate-closeups.mjs`; both are included in the main validation commands. The PC/editorial generator does not need to run for this revision.

## Hardware content — October 17 revision

`data.js` is the authoritative runtime content source. `hardwareItems` contains all 44 newly supplied past hardware sales; `featuredHardwareIds` selects six of those same records for the featured section. All six highlights appear immediately, alongside all nine featured PCs. Featured PC cards show the full titles from the archive filenames, with prices displayed separately; their short descriptions are varied in the owner’s writing style. Original editorial copy remains in content/featured.txt. The full hardware archive starts with twelve records; one “Show all hardware sales” action reveals every matching record. Search and eight category filters restore the preview. No numeric archive counter is displayed. No separate duplicate featured inventory is maintained.

Each hardware record contains a stable `id`, exact supplied `title`, `category`, original `images` array, explicit optimized `thumbnail` and `fullImage` paths, `sold: true`, and exact `saleText`. Prices, “Each,” and documented sale quantities come from the source filenames. Do not infer technical specifications, repair work, prices, or quantities from photographs.

The current originals are in `assets/images/refurb_hardware/`: 27 HEIC, 16 PNG, and one JPG. To rebuild their uncropped, oriented WebP derivatives:

```sh
python3 tools/build_hardware_derivatives.py
```

The helper requires Pillow and libheif’s `heif-convert`. It retains stable existing IDs and writes 640px thumbnails, 1440px full views, source/derivative hashes, dimensions, and provenance to `assets/images/webp/refurb_hardware/manifest.json`. Original photographs remain read only. When adding genuine hardware later, register its supplied filename/sale wording, use the generator’s stable ID and output paths in `hardwareItems`, and review the original-source integrity baseline deliberately.

The old four-record `refurbishedItems` array and `content/refurbished.txt` remain frozen historical records. They do not render a second hardware inventory. The owner removed their five old PNG files; retained WebPs and `tools/historical-hardware-photo-manifest.json` preserve the documented images and their original-source hashes. Only three byte-identical replacement originals are aliased. The legacy RTX 3070 frame has a different crop/scale and keeps its original WebPs without an invented exact-source alias.

`python3 tools/build_photo_derivatives.py` rebuilds the PC/editorial derivatives and preserves prior metadata for missing historical inputs. It explicitly marks those entries and leaves their existing WebPs intact. Both helpers preserve the actual source photographs.

## Business metrics and PC archive

The track record is ordered: **150+ custom PCs sold, 20+ refurbished GPUs sold, 80+ five-star reviews, $120K+ total sales across platforms**. The PC Build Archive displays 130 PC systems from the unchanged 131-record source; its stored Thinkpad laptop remains excluded from that PC-only view. Fourteen legacy CPU systems appear at the bottom of All PCs and are excluded from specific GPU-generation filters. NVIDIA/AMD generation filters are separate, including a specific RX 5000 category. The archive starts with a twelve-photo selection; “Show all archived PCs” reveals all matches. Counters and remaining-number readouts are removed. The marketplace cards follow the hero, and navigation marks the current visible section as the page scrolls.

See `content/DATA_AUDIT.md` for schema and reconciliation details, `REDESIGN_NOTES.md` for the design direction, and `VALIDATION_REPORT.md` for checks and practical limits.
