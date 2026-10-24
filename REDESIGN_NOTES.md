# Bober Electronics redesign

Current revision: October 17, 2026. Everything remains local; nothing was pushed or deployed.

## Visual direction

The owner’s `Argon_Frontend` reference now defines the visual presentation: near-black surfaces, Inter typography, JetBrains Mono details, compact section headers, restrained blue accents, outlined filter pills, and the reference’s product/card composition. The original reference files are untouched; their hashes are checked by `tools/validate-site.mjs`. The production site retains the complete data and working interactions developed in this project. Fonts are self-hosted with their licenses; the shared WOFF2 family files total about 80 KB and require no external font request.

The headline remains **Quality Computers - Competitive Prices**. Real photography supplies the color and character.

## Current experience

- **Hero:** eight supplied authentic close-ups in a visually audited sequence. Full frames use optimized 1280px WebPs; only the first and next photographs load initially. No descriptive caption text is visible. Icon previous/next and pause/play controls, persistent dots, hidden position text, and image alternative text retain accessibility. Rotation runs every six seconds, stops for reduced motion, hidden pages and offscreen placement, and preserves a manual pause. No precise CPU/GPU model is inferred from these new photographs.
- **Featured PCs:** all nine builds display their full original archive filename titles. Descriptions are lightly varied in the owner’s style; prices, specifications, and thirty photographs remain unchanged, including all three SIDE2 views. All nine cards are visible immediately; dialogs retain their full gallery and original-photo links. Historical labeling and storefront links clarify availability.
- **Customer feedback:** the five original highlighted reviews appear together in an Argon-style bento beneath featured PCs. The separate ending feedback section and its 38-review expansion were removed as requested. All 38 records remain unchanged in data for preservation.
- **Hardware:** all six curated highlights are visible immediately and reference the same authoritative collection of 44 documented past sales. The separate archive retains search, eight category pills, GPU-aware ordering, exact sale/quantity wording, and a twelve-item preview with one action to show all matching sales. All 88 optimized hardware photographs retain complete frames; HEIC originals never serve as browsing thumbnails.
- **PC archive:** 130 PC systems display from the unchanged 131-record source. The Thinkpad laptop stays preserved internally. All fourteen legacy CPU systems remain at the bottom of All PCs and outside specific GPU-generation filters. The nine NVIDIA/AMD generation groups are separate, including RX 5000. Visible pills synchronize with canonical values. Both archives use selection text and single show-all actions; numeric counters, remaining counts and featured toggles are removed. Revealing the full selection hides the action and focuses the first newly shown card.
- **Craftsmanship and stores:** the dedicated photographic detail section was removed at the owner’s request. The marketplace cards now follow the hero under “Our marketplaces,” retaining the supplied Jawa/Facebook credentials and eBay Business Seller label. Six navigation links track the current section with white styling and `aria-current="location"` as scrolling changes the visible section. The public metrics remain ordered **150+ custom PCs, 20+ refurbished GPUs, 80+ five-star reviews, $120K+ sales**.

## Technical choices

Buildless HTML, CSS, and JavaScript remain compatible with static GitHub Pages hosting. `data.js` is authoritative. Native dialogs retain modal inertness, explicit focus wrapping, Escape, focus return, gallery buttons/thumbnails, and swipe handlers. Archive/hardware photographs use contain fitting with black letterboxing. Reduced-motion styles disable decorative transitions and smooth scrolling.

Original PC/review content stays frozen to its migration hashes. The owner removed five old refurbished PNGs before supplying the current hardware collection; historical records, retained WebPs and source hashes preserve their evidence. Only byte-identical replacement originals are aliased. No original was restored or deleted by this work.

The eight hero records and sixteen close-up derivatives add provenance without altering existing inventory. Their original/optimized hashes, internal audited metadata and alternative text are validated independently. See `README.md` for local viewing and regeneration, `content/DATA_AUDIT.md` for schema/reconciliation, and `VALIDATION_REPORT.md` for checks and limits.

## Optional future material

Additional hardware angles or documented condition/repair descriptions can expand records where supplied. The current hardware items each have one original image; no missing angle or repair history was invented. Hidden-side cable-tray, radiator-fin, connector, and case-finish photographs could extend the detail feature later. No further photographs are required for the current eight-image hero.
