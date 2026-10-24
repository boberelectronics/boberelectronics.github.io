# Content reconciliation

`data.js` is the authoritative runtime inventory and review source. The original `content/featured.txt`, `content/refurbished.txt`, and `content/reviews.txt` remain unchanged editorial snapshots.

## Original records preserved

- Nine featured PC builds use the original archive filename titles, with sale-price suffixes shown separately. Their descriptions were lightly varied at the owner’s request on October 18; prices, component lines, and thirty assigned gallery photographs remain unchanged. The original prose remains in content/featured.txt. SIDE2 views remain with `3080_2Black`, `5070`, and `6900XT` only.
- All 131 sold archive records and their original PNGs remain preserved. The PC-only runtime view displays 130 actual systems and excludes the stored Thinkpad laptop.
- Five featured reviews and thirty-eight additional reviews retain supplied wording, names, and dates. Only the five highlighted reviews render together in the current public layout; the ending additional-feedback section was removed at the owner’s request, without deleting its 38 data records. No individual ratings, marketplace fields, or verified-buyer claims were added. Editorial review 31 has only an inconsequential trailing-space difference from the original prototype wording.
- The four old refurbished records retain their exact original fields and editorial associations as a historical snapshot. They no longer create runtime product cards.

The owner removed the five old originals under `assets/images/refurbished/` before providing the October 17 hardware collection. No deleted PNG was restored, and no photograph was deleted by this redesign work. Existing old WebPs remain intact. `tools/historical-hardware-photo-manifest.json` records source SHA-256/dimensions read from the tracked Git baseline without restoring files, plus hashes of retained optimized photographs.

Three new originals are byte-identical replacements for the old Thinkpad, GTX 1070 Ti, and Core i7-12700K/ASRock Z690 photographs. `hardwareSourceAliases` records only those proven matches. The old RTX 3070 PNG and new OEM RTX 3070 HEIC show a visually related frame with different crop/scale; no exact-file alias is asserted. Its retained historical WebPs preserve the old gallery association.

The three `3080BF_` photographs still have no reconciled PC inventory record. An old unlisted `refurb2080_GPU.png` photograph is byte-identical to the newly and explicitly documented Dell RTX 3090 photograph; no old guessed product specification was migrated into the new collection.

## Hardware collection — October 17

All **44** supplied files in `assets/images/refurb_hardware/` map one-to-one to `hardwareItems`. Formats: **27 HEIC, 16 PNG, one JPG**. Every original title and sale phrase is preserved separately and reconstructs its exact source filename stem, including documented quantities, “Each,” decimals, and the incidental trailing space after the RX 6500XT price.

| Category | Records |
| --- | ---: |
| Graphics cards | 19 |
| Processors | 5 |
| Memory | 7 |
| Storage | 2 |
| Motherboards | 2 |
| Component bundles | 4 |
| Cooling | 1 |
| Laptops and mini PCs | 4 |

Important wording remains exact: the two Intel Core i3 sales are **$0.50** each; the NUC listing says **10x for $130 Each**; Mac Mini **3x for $250 Each**; Dell RTX 3090 **3x for $700 Each**; Titan X Pascal **2x for $180 Each**; Wraith cooler **2x for $10 Each**; and Seagate HDD **5x for $30 Each**. Mixed-brand SSDs say **$20 Each** and Ryzen 7 5700X **$145 Each**, without inventing quantities.

The new Thinkpad hardware record says **$240**. The separate original sold-build archive record still says **$160**. Photograph identity does not justify substituting either sale price for the other.

Six photo-audited IDs select records from this same collection: **013, 042, 044, 029, 007, 041** — Custom Painted AMD Wraith Cooler, XFX RX 6700, i9/Z790 bundle, Intel NUC, ASUS ROG laptop, and Trident Z RGB memory. All six hardware highlights and all nine featured PC cards render immediately. The hardware archive starts with twelve records and reveals all current matches in one action; search/category changes restore the preview. Visible numeric counters and featured expansion controls are removed. Product cards and lightboxes retain exact sale wording; all new entries are explicitly past sales.

## Runtime data shape

- `featuredBuilds`: `title`, `price`, `description`, `components[]`, `images[]`.
- `soldBuilds`: stable `id`, exact `filename`, complete `title`, original `image` path.
- `featuredReviews`, `additionalReviews`: `user`, `date`, `text`.
- `hardwareItems`: stable `id`, exact `title`, `category`, original `images[]`, optimized `thumbnail`, optimized `fullImage`, `sold`, exact `saleText`.
- `featuredHardwareIds`: six unique references into `hardwareItems`.
- `refurbishedItems`: four frozen historical `title`/`image` records; not a runtime collection.
- `hardwareSourceAliases`: verified byte-identical old-original → new-original mappings.
- `heroCloseups`: eight visually audited `{id, thumbnail, fullImage, alt, caption, original}` records referencing the new close-up photographs.

Paths remain unencoded in data. Encode path segments when assigning URLs. The 44-record source audit is in `tools/qa/hardware-source-audit.json`; optimized output provenance is in `assets/images/webp/refurb_hardware/manifest.json`. No unprovided long-form descriptions or repair claims were added to new records.

## Ordering and performance

The PC archive now orders separate generation groups as RTX 50, RX 9000, RTX 40, RX 7000, RX 6000, RTX 30, RTX 20, RX 5000, then GTX. The RX 5000 label does not imply all earlier Radeon cards. Older unsupported Radeon models remain All-only without being relabeled; their fallback preserves their place before GTX. Within a group, models descend and Ti precedes Super/base equivalents. All Xeon and known fourth-generation-or-earlier Core i7 systems move to the bottom of All PCs and are excluded from specific groups. Modern i7-10700K/i7 10700K/i7-12700K remain normal; unspecified Core i7 receives no invented generation.

The current 116 normal PC records are fully covered by the nine specific filters: 10 RTX 50, 1 RX 9000, 5 RTX 40, 1 RX 7000, 8 RX 6000, 57 RTX 30, 13 RTX 20, 10 RX 5000, and 11 GTX. The other fourteen PC records are legacy systems and appear only in All PCs. The original `getGpuTier` helper remains unchanged for hardware/baseline compatibility. Both archives show a twelve-record selection initially, then all current matches in one activation; filtering/reset restores twelve. No visible archive totals or remaining-number readouts are generated.

Hardware groups are graphics cards, processors, memory, storage, motherboards, bundles, cooling, then systems. Graphics cards sort by GPU generation/model/suffix even when a brand precedes the GPU name. Complete image frames use contain styling. Hardware browsing uses 88 optimized WebPs; the HEIC originals are never assigned as browsing-image sources. The PC archive retains 262 thumbnail/full derivatives; all 131 thumbnails total 3.28 MiB.

The public metrics remain **150+ custom PCs sold, 20+ refurbished GPUs sold, 80+ five-star reviews, $120K+ total sales across platforms**, in that order. Archive collection counts remain separate from those business totals.

## Validation and regeneration

Run `node tools/validate-data.mjs` and `node tools/validate-site.mjs`. Focused checks also run as `node tools/validate-refurbished.mjs`, `node tools/validate-archive.mjs`, and `node tools/validate-hardware-data.mjs`.

Validation covers immutable original-content hashes and editorial records; all original PC/photo associations; all 44 hardware titles/sale phrases/categories; all 88 new source/derivative hashes, frames and paths; historical photo provenance; six featured selections; actual rendering/search/filter/preview-and-show-all handlers; and lightbox/original associations with focus return. It does not claim browser layout verification.

Use `python3 tools/build_hardware_derivatives.py` for current hardware. Pillow and libheif’s `heif-convert` are required. Use `python3 tools/build_photo_derivatives.py` for PC/editorial derivatives; it now preserves and marks historical metadata when an original was removed, rather than dropping that provenance on rerun. Source photos remain read only, and existing optimized images are replaced atomically.

## Argon presentation and eight-close-up hero

The October 17 presentation update adopts the supplied `Argon_Frontend` visuals while preserving the complete business data. Its three reference files remain untouched and hash-checked. The hero adds the eight actual PNGs in `assets/images/closeups/`, ordered **01, 07, 05, 08, 03, 04, 02, 06** from visual inspection. Captions and alternative text describe visible hardware details without inferring a CPU/GPU model or associating unrelated systems.

`assets/images/webp/closeups/manifest.json` records all original-file and output hashes, dimensions, color conversion and uncropped frames. Sixteen 640px/1280px WebPs preserve the complete frames. Existing IDs 01–06 and their twelve outputs remain stable; 07 and 08 extend the collection. All eight source screenshots remain unchanged. Descriptive captions stay internal, while only photographs and icon controls are visible in the hero. Regeneration uses `python3 tools/build_closeup_derivatives.py` with Pillow; no PC/hardware asset regeneration is needed for this update.

`tools/validate-hero.mjs` exercises the actual six-second carousel, wraparound/dots, stable focus, lazy current/next image loading, explicit pause retention, reduced-motion changes, page visibility, offscreen suspension and page-exit cleanup. It also verifies the five reviews render verbatim together while the other 38 remain data-only. The archive regressions additionally exercise split GPU pills, canonical filter/reset synchronization, one-action reveal-all behavior, hidden completed actions, and focus on the first newly revealed card. Navigation regression exercises all seven section links in both scroll directions, resize and hidden landmarks, enforcing a single `aria-current="location"`. Marketplace cards now follow the hero; all nine PCs and six hardware highlights remain visible without toggles. These checks supplement browser QA rather than claiming layout inspection.
