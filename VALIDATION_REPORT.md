# Validation report

Current automated and browser revision: October 17, 2026 — eight-image hero, all featured products visible, simplified show-all archives, split GPU filters, and scroll-tracked navigation. Current browser findings appear below.

## Automated checks — passed

Run from this project directory:

```sh
node tools/validate-data.mjs
node tools/validate-site.mjs
```

Focused checks also run independently: `validate-hero.mjs`, `validate-closeups.mjs`, `validate-refurbished.mjs`, `validate-archive.mjs`, and `validate-hardware-data.mjs`, and `validate-navigation.mjs` under `tools/`.

- All nine original PC records, thirty gallery images, three SIDE2 associations, 131 archive records/originals, and all 43 reviews match their original content baseline. The four old hardware records remain frozen historical evidence. No supplied data was deleted.
- All 44 current hardware records retain exact source titles, prices and quantities across eight categories. Their 88 optimized outputs match source/output hashes and uncropped frames. Six featured references use the same canonical collection.
- All eight close-up originals and sixteen optimized images match their provenance hashes, dimensions, audited sequence, captions and alternative text. No invented model association was added.
- The actual hero controller passes deterministic six-second rotation, previous/next wraparound, persistent dots and control focus, correct image/alternative-text association without visible captions, first/current/next lazy loading, manual pause retention, reduced-motion changes, hidden-page/offscreen suspension, and page-exit timer cleanup.
- All five original highlighted reviews render verbatim together. The separate additional-feedback UI is absent; its 38 original records remain unchanged in data.
- All nine PC cards and all six hardware highlights render immediately. Both archives initially show twelve matching records; a single “Show all” activation reveals all 130 PCs or 44 hardware sales, hides the action, and focuses the first newly shown card. Filter/search/reset restores the preview. Exact sale wording, image links, decimal prices, quantities, lightboxes and focus checks pass.
- The actual PC archive renders 130 PC systems from the unchanged 131-record source. Its stored laptop remains excluded. Fourteen legacy CPU systems follow the other 116 in All PCs and are excluded from all nine specific NVIDIA/AMD generation filters. The current normal-record counts are RTX 50: 10; RX 9000: 1; RTX 40: 5; RX 7000: 1; RX 6000: 8; RTX 30: 57; RTX 20: 13; RX 5000: 10; GTX: 11. Together they cover all 116 normal PC records; unsupported older Radeon models would remain All-only rather than being relabeled. Modern/unknown Core i7 parsing regressions pass.
- Visible hardware/PC filter pills synchronize canonical values, selected states, focus and reset. Numeric archive badges and remaining-number readouts are absent, with no removed-ID references in JavaScript. Clear selection text explains the preview. Featured toggles and their counters are also removed.
- The real scrollspy follows all seven section landmarks in both scroll directions, clears the active state at the hero, and updates on resize/hidden landmarks. Exactly one current link receives matching `is-current` and `aria-current="location"` states. Marketplace cards now follow the hero under “Our marketplaces,” including the documented eBay Business Seller label.
- All **66 HTML IDs** and **460 static/dynamic asset references** resolve. Named dialogs, labels/ARIA targets, intrinsic image dimensions, local fonts, original-image loading policy and official storefront links pass. Both JavaScript files parse, reduced-motion styles exist, and `git diff --check` passes.
- Public metrics remain ordered **150+ custom PCs / 20+ refurbished GPUs / 80+ five-star reviews / $120K+ sales**. Superseded claims are absent. The three supplied `Argon_Frontend` reference files remain byte-for-byte unchanged.
- The owner’s five old refurbished-PNG deletions are respected. Retained WebPs/source hashes preserve the old photo evidence; only three byte-identical replacements are aliased. Historical missing-source derivative metadata remains preserved. No original was restored or deleted by this work, and the old photo generator was not run for this presentation update.

## Earlier browser evidence

Earlier October 14/15 passes inspected desktop, tablet and mobile layouts, all nine PC dialogs/galleries, focus/Escape/Tab behavior, review expansion then present, archive search/filter/loading and uncropped images. October 15 additionally checked all 130 runtime PC systems and legacy placement.

The preceding October 17 hardware pass inspected 390×844, 768×1024, 1440×1000 and the 1001px navigation breakpoint. It verified all 44 records load, category/search/reset behavior, exact fifty-cent/quantity wording, HEIC-original links, lightboxes/focus, and no horizontal overflow or console/HTTP errors. Screenshots remain under `tools/qa/oct15-*` and `tools/qa/oct17-*`; earlier `final-*`, desktop/mobile/tablet images document still earlier iterations.

Those screenshots predate the current revision. The earlier Argon evidence below also precedes the eight-image, show-all, marketplace-order and scrollspy changes.

## Earlier Argon browser QA — before the latest eight-image/show-all revision

The preceding Argon revision was inspected in local Chromium at 390×844, 768×1024 and 1440×1000, with additional 320px phone and 1001px desktop-navigation checks.

- The supplied Argon palette, fonts, compact navigation, rounded photographic cards, section headers, review composition and filter-pill styling are integrated with the existing data and interactions. The reference files remain unchanged. The public metrics retain the requested values and order.
- All six new photographs appear in the hero with accurate captions. Automatic rotation was observed in the live browser; previous/next, manual pause and position updates work. The 390px first fold shows the slogan, both actions, close-up photo and controls, followed by the four metrics. No horizontal page overflow was found at the tested widths. Reduced-motion and visibility/timer behavior are covered separately by the production-handler regression.
- Featured PCs expand from three to nine; hardware highlights expand from three to six. Clear full-archive actions remain visible above both collections. The five highlighted reviews render together, and the additional-review section is absent.
- Product dialogs retain original titles, prices, specifications and gallery associations. The black RTX 3080 dialog has four angles; advancing to its third image loads the correct SIDE2 photograph. Mobile gallery controls work. Scrolling a long mobile dialog by 652px keeps its close button at the top; closing restores focus to the original card. Three- and four-image thumbnail rows adapt to their actual image count.
- The dedicated detail feature and its lightboxes retain their original source associations. Hardware lightboxes open the correct optimized full image and original-file link. A mobile Thinkpad search shows the supplied $240 sale, separate from the PC-only archive.
- PC filter pills synchronize their selected state and canonical value. Searching All builds for Xeon returns seven records; choosing RTX 30 hides those legacy systems. Reset restores 12 of 130 photographs, and loading more advances to 24.
- Hardware pills, combined search, empty/reset and loading work on desktop and mobile. Processors show five records; searching `0.50` shows both supplied fifty-cent sales; systems show four. Reset returns 12 of 44 records; loading advances to 24. The mobile continuation button is 350×66px at 390px and explicitly states its next batch and remaining count. The automated handler regression separately loads all 44 records and all 130 PC systems.
- Mobile navigation opens all six destinations, closes on selection and responds to Escape. The 1001px desktop navigation fits without overlapping the brand. Archive photos retain contain fitting and complete frames. Card focus outlines remain visible outside rounded frames; filter-pill focus stays within its scrolling row.
- Visual inspection led to aligned hardware-card footer actions, adaptive gallery thumbnails and consistent metric alignment when a tablet label wraps. The two shared local WOFF2 font URLs served successfully; all five requested weights reuse those family files. No console warnings/errors or HTTP 404/500 responses appeared in this preview session.

Evidence for that preceding revision is in `tools/qa/argon-*.jpg`, including desktop hero/cards/reviews/hardware/archive/gallery, mobile hero/details/archive/loading/scrolled-gallery, and tablet hero/archive views. The rebuilt root `index.html` is the deliverable; `Argon_Frontend/` remains reference material.

## Latest refinements browser QA — passed

The revised page was inspected in local Chromium at 1440×1000, 390×844 and 768×1024, with an additional 1001px navigation-width check.

- All eight hero slides are present without visible captions. The two added photographs load their correct `closeup-07` and `closeup-08` optimized images. Pause/play displays only its icon, and the position status remains visually hidden. The mobile hero retains its complete photograph and controls without horizontal overflow.
- All nine featured PC cards and six hardware highlights render immediately, with no featured expansion controls or counters. Original gallery and product information remain intact.
- Our marketplaces is the first section after the hero. Its heading is white, the old Shop live inventory copy is absent, and eBay displays Business Seller. Three marketplace cards fit a tablet row and stack cleanly on mobile.
- The white navigation highlight follows manual scrolling from marketplaces to featured PCs and back. It also tracks the archive and other anchored sections. Browser testing exposed a padded-section edge case: the PC archive was already dominant while its heading remained lower on screen. Scrollspy now uses section boundaries; retesting at section top 166px and heading top 310px correctly highlights PC archive. The exact edge also has a permanent handler regression.
- RTX 50 and Radeon RX 9000 filter separately in the live browser; their current results contain ten and one PC respectively. RX 5000 returns ten correctly labeled records. The filter row has no merged NVIDIA/AMD series or Earlier Radeon label. Legacy filtering, empty state and reset retain their previous behavior.
- The PC archive starts with twelve photos and expands to all 130 in one click. The hardware archive starts with twelve and expands to all 44 in one click, also checked on mobile. Each action hides after expansion and moves focus to the first newly shown card. There are no visible shown/total badges or remaining-number labels. The preview explicitly states that it is only a selection, above a prominent Show all action.
- Closeup lightboxes hide descriptive caption text while preserving accessible image names. Opening a hardware photo afterward restores its product title and sale wording; the tested Thinkpad still shows its supplied $240 sale.
- All seven mobile navigation links open and close correctly. The 1001px desktop menu fits without overlapping the brand; no horizontal page overflow appeared at the tested widths. No console warnings/errors or HTTP 404/500 responses were captured.

Current screenshots are `tools/qa/refinements-desktop-hero.jpg`, `refinements-desktop-marketplaces.jpg`, `refinements-desktop-pc-archive.jpg`, `refinements-mobile-hero.jpg`, `refinements-mobile-marketplaces.jpg`, `refinements-mobile-show-all.jpg`, and `refinements-tablet-marketplaces.jpg`.

## October 18 copy and title revision

All nine featured cards show the original archive filename title before its sale-price suffix, with a separate price and no duplicated component recap. All nine descriptions were lightly varied from the owner's original copy; original source prose remains in `content/featured.txt`. Public shorthand labels now read “refurbished.”

`node tools/validate-data.mjs`, `node tools/validate-site.mjs`, and `git diff --check` passed. The optional Argon reference files were removed from the workspace by the owner; their absence is reported as a skip, while remaining production references and inventory provenance are checked. The quantity-search fixture now includes the newly documented three Ryzen 7 5700X sales.

Local browser inspection confirmed full titles at desktop and 390px mobile widths, no horizontal overflow, expanded navigation labels fitting at the 1001px desktop breakpoint, and the revised description appearing in the native build dialog. Browser console warnings/errors were empty. Screenshots: `tools/qa/full-featured-titles-desktop.jpg`, `tools/qa/full-featured-titles-mobile.jpg`, and `tools/qa/featured-description-revision.jpg`.

## Practical limits

Isolated DOM checks exercise production handlers and data; they do not verify browser layout. Browser checks use local Chromium viewport overrides. Physical touch devices, Safari, Firefox and a throttled Lighthouse benchmark have not been measured. Marketplace URLs match the owner’s supplied links; external account availability/current listings were not audited.

The completed source remains local. Nothing was pushed or deployed.
