/** Static integration checks. Run with: node tools/validate-site.mjs */
import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import vm from 'node:vm';
import { createHash } from 'node:crypto';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const read = file => readFileSync(path.join(root, file), 'utf8');
const html = read('index.html');
const js = read('script.js');
const css = read('style.css');
const tags = [...html.matchAll(/<([a-z][\w:-]*)\b([^<>]*?)>/gi)].map(match => {
  const attributes = Object.fromEntries([...match[2].matchAll(/([\w:-]+)\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s"'=<>`]+))/g)]
    .map(attribute => [attribute[1].toLowerCase(), attribute[2] ?? attribute[3] ?? attribute[4]]));
  return { name: match[1].toLowerCase(), attributes };
});
const ids = tags.map(tag => tag.attributes.id).filter(Boolean);
assert.equal(ids.length, new Set(ids).size, 'Duplicate HTML IDs');
const idSet = new Set(ids);
const scriptIds = [...js.matchAll(/getElementById\(['"]([^'"]+)['"]\)/g)].map(match => match[1]);
for (const id of scriptIds) assert.ok(idSet.has(id), `JavaScript refers to a missing HTML ID: ${id}`);

let checkedPaths = 0;
function checkReference(reference) {
  if (!reference || /^(?:[a-z][a-z\d+.-]*:|\/\/)/i.test(reference)) return;
  if (reference.startsWith('#')) {
    assert.ok(idSet.has(reference.slice(1)), `Missing anchor destination: ${reference}`);
    return;
  }
  const local = decodeURIComponent(reference.split(/[?#]/)[0]);
  if (!local) return;
  assert.ok(existsSync(path.join(root, local)), `Missing referenced local asset: ${local}`);
  checkedPaths++;
}

for (const tag of tags) {
  const attrs = tag.attributes;
  for (const attribute of ['src', 'href', 'data-photo', 'data-original']) {
    if (attribute in attrs) {
      assert.ok(attrs[attribute], `Empty ${attribute} on ${tag.name}#${attrs.id || ''}`);
      checkReference(attrs[attribute]);
    }
  }
  for (const attribute of ['srcset', 'imagesrcset']) {
    if (attrs[attribute]) for (const candidate of attrs[attribute].split(',')) checkReference(candidate.trim().split(/\s+/)[0]);
  }
  if (attrs['aria-controls']) for (const id of attrs['aria-controls'].split(/\s+/)) assert.ok(idSet.has(id), `Missing aria-controls target: ${id}`);
  if (attrs['aria-labelledby']) for (const id of attrs['aria-labelledby'].split(/\s+/)) assert.ok(idSet.has(id), `Missing aria-labelledby target: ${id}`);
  if (attrs.for) assert.ok(idSet.has(attrs.for), `Label refers to missing input: ${attrs.for}`);
  if (tag.name === 'img') {
    assert.ok('alt' in attrs, `Image is missing alternative text: ${attrs.src || attrs.id}`);
    assert.ok(attrs.width && attrs.height, `Static image lacks intrinsic dimensions: ${attrs.src || attrs.id}`);
    assert.ok(!/^assets\/images\/(featured|archive|refurbished|refurb_hardware|closeups)\//.test(attrs.src || ''), `Original product PNG loads directly in markup: ${attrs.src}`);
    if (!attrs.src) assert.ok(['modal-main-img', 'photo-main-img'].includes(attrs.id), `Unexpected image without a source: ${attrs.id}`);
  }
  if (attrs.target === '_blank') {
    assert.ok(/\bnoopener\b/.test(attrs.rel || '') && /\bnoreferrer\b/.test(attrs.rel || ''), `External window lacks rel safeguards: ${attrs.href || attrs.id}`);
  }
}
for (const match of css.matchAll(/url\(\s*['"]?([^'"\s)]+)['"]?\s*\)/g)) checkReference(match[1]);

const officialStores = [
  'https://www.jawa.gg/sp/62030/bober-electronics',
  'https://www.ebay.com/usr/bober_electronics',
  'https://www.facebook.com/marketplace/profile/61550627987474/',
];
for (const url of officialStores) assert.ok(tags.some(tag => tag.name === 'a' && tag.attributes.href === url), `Missing official storefront: ${url}`);
for (const id of ['product-dialog', 'photo-dialog']) assert.ok(tags.some(tag => tag.name === 'dialog' && tag.attributes.id === id && tag.attributes['aria-labelledby']), `${id} must be a named native dialog`);
assert.ok(html.includes('prefers-reduced-motion') || css.includes('prefers-reduced-motion'), 'Missing reduced-motion handling');

// The latest owner-supplied track record supersedes the original brief. Keep
// public totals separate from the preserved internal inventory/review records.
const plainText = text => text.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
const publicCopy = plainText(html.replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, '')) + ' ' +
  tags.filter(tag => tag.name === 'meta').map(tag => tag.attributes.content || '').join(' ');
for (const claim of [/\b150\s*\+/, /\b20\s*\+/, /\b80\s*\+/, /\$120K\s*\+/i]) assert.match(publicCopy, claim, 'Missing latest owner-supplied business metric');
assert.doesNotMatch(publicCopy, /(?:\b250\s*\+|\$100K\s*\+)/i, 'Outdated business claim remains public');
const bodyCopy = plainText(html.replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, ''));
const metricPositions = [/150\s*\+/, /20\s*\+/, /80\s*\+/, /\$120K\s*\+/i].map(claim => bodyCopy.search(claim));
assert.ok(metricPositions.every((position, index) => position >= 0 && (!index || position > metricPositions[index - 1])), 'Public metrics must remain ordered PCs, GPUs, reviews, then revenue');
assert.doesNotMatch(publicCopy, /\b131\b/, 'The internal archive record count must not appear as a public total');
function headingText(id) {
  const match = html.match(new RegExp(`<h[1-6]\\b[^>]*\\bid=["']${id}["'][^>]*>([\\s\\S]*?)<\\/h[1-6]>`, 'i'));
  assert.ok(match, `Missing explicit section heading: ${id}`);
  return plainText(match[1]);
}
assert.ok(headingText('featured-title'), 'Featured PC section needs a descriptive heading');
assert.ok(headingText('archive-title'), 'PC archive needs a descriptive heading');
for (const [section, label] of [['featured', 'Featured builds'], ['refurbished', 'Refurb & restored hardware'], ['archive', 'PC archive'], ['refurb-archive', 'Hardware archive']]) {
  assert.ok(tags.some(tag => tag.name === 'section' && tag.attributes.id === section), `Missing separate collection section: ${section}`);
  assert.ok(tags.some(tag => tag.name === 'a' && tag.attributes.href === `#${section}`), `Missing navigation/action for the ${section} collection`);
}
const filterMarkup = html.match(/<select\b[^>]*id=["']archive-filter["'][^>]*>([\s\S]*?)<\/select>/i)?.[1];
assert.ok(filterMarkup, 'Missing PC archive filter');
assert.doesNotMatch(filterMarkup, /Earlier Radeon/i, 'The specific RX 5000 filter must not be labeled as all older Radeon hardware');
assert.match(filterMarkup, /value=["']rx5000["'][^>]*>\s*RX\s*5000/i);
assert.deepEqual([...filterMarkup.matchAll(/<option\b[^>]*value=["']([^"']+)["']/gi)].map(match => match[1]), ['all', 'rtx50', 'rx9000', 'rtx40', 'rx7000', 'rx6000', 'rtx30', 'rtx20', 'rx5000', 'gtx'], 'PC archive should expose only All PCs and GPU generation filters');
assert.ok(tags.some(tag => tag.name === 'a' && tag.attributes.id === 'featured-archive-link' && tag.attributes.href === '#archive'), 'Featured portfolio needs a direct full-PC-archive action');
assert.ok(headingText('refurb-title'), 'Featured hardware needs a descriptive heading');
assert.ok(headingText('hardware-archive-title'), 'Hardware archive needs a descriptive heading');
assert.ok(tags.some(tag => tag.attributes.id === 'hardware-load-more' && tag.attributes['aria-controls'] === 'hardware-archive-list'), 'Hardware archive needs an accessible show-all control');
assert.ok(tags.some(tag => tag.name === 'a' && tag.attributes.id === 'refurb-archive-link' && tag.attributes.href === '#refurb-archive'), 'Featured hardware needs a direct archive action');
const hardwareFilterMarkup = html.match(/<select\b[^>]*id=["']hardware-filter["'][^>]*>([\s\S]*?)<\/select>/i)?.[1];
assert.ok(hardwareFilterMarkup, 'Missing hardware category filter');
assert.deepEqual([...hardwareFilterMarkup.matchAll(/<option\b[^>]*value=["']([^"']+)["']/gi)].map(match => match[1]), ['all', 'gpus', 'cpus', 'memory', 'storage', 'motherboards', 'bundles', 'cooling', 'systems']);
assert.doesNotMatch(js, /data\.refurbishedItems/, 'The historical four-record snapshot must not create duplicate runtime hardware products');
for (const id of ['more-reviews', 'more-reviews-list', 'reviews-load-more', 'review-prev', 'review-next', 'toggle-all-featured', 'refurb-featured-toggle', 'refurb-count', 'archive-count', 'hardware-count']) assert.ok(!idSet.has(id), `Removed additional-review UI remains: ${id}`);
assert.doesNotMatch(js, /data\.additionalReviews/, 'The 38 historical additional reviews must not render in the new public layout');
for (const id of ['toggle-all-featured', 'refurb-featured-toggle', 'refurb-count', 'archive-count', 'hardware-count']) assert.ok(!scriptIds.includes(id), `Removed counter/toggle still used in JavaScript: ${id}`);
const featuredStart = html.search(/<section\b[^>]*id=["']featured["']/i);
const testimonialsStart = html.search(/\bid=["']testimonials["']/i);
assert.ok(testimonialsStart > featuredStart && testimonialsStart < html.indexOf('</section>', featuredStart), 'Five-review feature must remain inside the featured PC section');
for (const id of ['hero-slides', 'hero-prev', 'hero-next', 'hero-pause', 'hero-position', 'hero-dots']) assert.ok(idSet.has(id), `Missing hero carousel control: ${id}`);
assert.match(tags.find(tag => tag.attributes.id === 'hero-position').attributes.class || '', /\bsr-only\b/, 'Hero position should be visually hidden while remaining accessible');
assert.equal(headingText('stores-title').toLowerCase(), 'our marketplaces');
assert.match(publicCopy, /Business Seller/i, 'Documented eBay Business Seller credential must remain visible');
const mainOrder = ['hero', 'store-bar', 'featured', 'refurbished', 'archive', 'refurb-archive'].map(id => html.search(new RegExp(`<section\\b[^>]*id=["']${id}["']`, 'i')));
assert.ok(mainOrder.every((position, index) => position >= 0 && (!index || position > mainOrder[index - 1])), 'Main sections must follow the requested marketplace/portfolio/archive order');
assert.doesNotMatch(html, /id=["']details["']|A closer look/i, 'The dedicated close-up section must be removed');

for (const [containerId, attribute, values] of [
  ['pc-filter-tabs', 'data-pc-filter', ['all', 'rtx50', 'rx9000', 'rtx40', 'rx7000', 'rx6000', 'rtx30', 'rtx20', 'rx5000', 'gtx']],
  ['hardware-filter-tabs', 'data-hardware-filter', ['all', 'gpus', 'cpus', 'memory', 'storage', 'motherboards', 'bundles', 'cooling', 'systems']],
]) {
  assert.ok(idSet.has(containerId), `Missing visible filter pills: ${containerId}`);
  const buttons = tags.filter(tag => tag.name === 'button' && attribute in tag.attributes);
  assert.deepEqual(buttons.map(tag => tag.attributes[attribute]), values);
  assert.ok(buttons.every(tag => /^(true|false)$/.test(tag.attributes['aria-pressed'] || '')), 'Filter pills must expose their selected state');
}
const reference = JSON.parse(read('tools/qa/argon-reference-manifest.json'));
for (const item of reference.files) assert.equal(createHash('sha256').update(readFileSync(path.join(root, item.file))).digest('hex'), item.sha256, `Argon reference was changed: ${item.file}`);



for (const filename of ['script.js', 'data.js']) new vm.Script(read(filename), { filename });
const sandbox = { window: {}, document: { readyState: 'loading', addEventListener() {} } };
vm.createContext(sandbox);
vm.runInContext(read('data.js'), sandbox, { filename: 'data.js' });
vm.runInContext(js, sandbox, { filename: 'script.js' });
const { BOBER_DATA: data, BOBER_UTILS: utils } = sandbox.window;
for (const original of [...data.featuredBuilds.flatMap(build => build.images), ...data.soldBuilds.map(build => build.image)]) {
  for (const variant of ['thumb', 'full']) checkReference(utils.getWebpPath(original, variant));
}
for (const item of [...data.hardwareItems, ...data.heroCloseups]) { checkReference(item.thumbnail); checkReference(item.fullImage); }
for (const tag of tags.filter(tag => 'data-build' in tag.attributes)) assert.ok(data.featuredBuilds[Number(tag.attributes['data-build'])], `Unknown build link: ${tag.attributes['data-build']}`);

console.log(`PASS: ${ids.length} unique HTML IDs; every literal JavaScript ID, anchor, label, and ARIA reference resolves.`);
console.log(`PASS: ${checkedPaths} static/dynamic asset references exist, including every product WebP variant.`);
console.log('PASS: Official storefront URLs, named native dialogs, image descriptions/dimensions, and original-photo loading policy.');
console.log('PASS: Latest metrics appear in order: 150+ custom PCs sold / 20+ refurb and restored GPUs sold / 80+ reviews / $120K+ sales; superseded claims are absent.');
console.log('PASS: Featured PCs, featured hardware, PC Build Archive and Refurb & Restored Hardware Archive have distinct sections/navigation; all relevant filters/actions resolve.');
await import('./validate-refurbished.mjs');
await import('./validate-archive.mjs');
await import('./validate-hero.mjs');
await import('./validate-navigation.mjs');
console.log('PASS: Five highlighted reviews remain public, 38 additional records remain data-only, eight-close-up carousel controls resolve, and the Argon reference is unchanged.');
console.log('PASS: Both JavaScript files parse successfully. Browser layout and remaining interactions require the separate visual QA pass.');
