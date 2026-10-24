/** Run with: node tools/validate-data.mjs */
import assert from 'node:assert/strict';
import { readFileSync, readdirSync, existsSync, statSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import vm from 'node:vm';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const read = file => readFileSync(path.join(root, file), 'utf8');
const sandbox = { window: {} };
vm.createContext(sandbox);
vm.runInContext(read('data.js'), sandbox, { filename: 'data.js' });
const data = JSON.parse(JSON.stringify(sandbox.window.BOBER_DATA));
const original = JSON.parse(read('tools/original-content-manifest.json'));
const digest = value => createHash('sha256').update(JSON.stringify(value)).digest('hex');

// Digests were captured before the redesign. Reviews remain verbatim; featured
// titles now follow archive filenames and descriptions are edited by the owner.
for (const key of ['featuredReviews', 'additionalReviews']) {
  assert.equal(data[key].length, original[key].count, `${key}: missing original records`);
  assert.equal(digest(data[key]), original[key].sha256, `${key}: original content changed`);
}
// The old four-record collection is a frozen historical snapshot. The October
// 17 supplied hardwareItems collection is now authoritative for hardware browsing.
assert.equal(data.refurbishedItems.length, original.refurbishedItems.count, 'Historical refurbished record count changed');
assert.equal(digest(data.refurbishedItems), original.refurbishedItems.sha256, 'Original refurbished content changed');
const archiveFiles = data.soldBuilds.map(build => build.filename);
assert.equal(archiveFiles.length, original.archiveFiles.count, 'Archive count changed');
assert.equal(new Set(archiveFiles).size, 131, 'Duplicate archive records');
assert.equal(digest(archiveFiles), original.archiveFiles.sha256, 'Original archive filenames changed');
assert.deepEqual(new Set(archiveFiles), new Set(readdirSync(path.join(root, 'assets/images/archive')).filter(file => /\.png$/i.test(file))), 'Archive originals and data records differ');

const resolve = file => path.join(root, file);
let featuredPhotos = 0;
for (const build of data.featuredBuilds) {
  assert.ok(build.title && build.price && build.description && build.components.length, 'Incomplete featured record');
  assert.equal(new Set(build.images).size, build.images.length, 'Duplicate gallery photo');
  for (const image of build.images) {
    featuredPhotos++;
    assert.ok(existsSync(resolve(image)), `Missing original photo: ${image}`);
    const stem = image.replace('assets/images/featured/', 'assets/images/webp/featured/').replace(/\.png$/i, '');
    for (const variant of ['thumb', 'full']) {
      assert.ok(existsSync(resolve(`${stem}_${variant}.webp`)), `Missing WebP: ${stem}_${variant}.webp`);
    }
  }
}
assert.equal(featuredPhotos, 30, 'Featured gallery photo count changed');
for (const stem of ['3080_2Black', '5070', '6900XT']) {
  const front = `assets/images/featured/${stem}_FRONT.png`;
  const side2 = `assets/images/featured/${stem}_SIDE2.png`;
  const owner = data.featuredBuilds.find(build => build.images.includes(front));
  assert.ok(owner?.images.includes(side2), `SIDE2 assigned incorrectly: ${side2}`);
  assert.equal(data.featuredBuilds.filter(build => build.images.includes(side2)).length, 1, `SIDE2 has multiple owners: ${side2}`);
}
for (const build of data.soldBuilds) {
  assert.equal(build.image, `assets/images/archive/${build.filename}`, `Archive association changed: ${build.id}`);
  assert.equal(build.title, build.filename.replace(/\.[^/.]+$/, '').replace(/^\d+\s*[-–]\s*/, '').trim(), `Archive information changed: ${build.id}`);
  assert.ok(existsSync(resolve(build.image)), `Missing archive photo: ${build.image}`);
}

// Every visible archive/refurbished image uses a derivative mapped back to its
// exact original. Metadata records permit a no-crop aspect-ratio regression check.
const derivativeManifest = JSON.parse(read('assets/images/editorial/manifest.json'));
const derivativeByOutput = new Map(derivativeManifest.map(item => [item.output, item]));
let optimizedContentPhotos = 0;
let archiveThumbBytes = 0;
for (const source of data.soldBuilds.map(build => build.image)) {
  const png = readFileSync(resolve(source));
  const sourceWidth = png.readUInt32BE(16);
  const sourceHeight = png.readUInt32BE(20);
  for (const variant of ['thumb', 'full']) {
    const output = source.replace('assets/images/', 'assets/images/webp/').replace(/\.png$/i, `_${variant}.webp`);
    const metadata = derivativeByOutput.get(output);
    assert.ok(existsSync(resolve(output)), `Missing optimized derivative: ${output}`);
    assert.ok(metadata, `Missing derivative provenance: ${output}`);
    assert.equal(metadata.source, source, `Wrong image association: ${output}`);
    assert.equal(metadata.sourceWidth, sourceWidth, `Source width mismatch: ${source}`);
    assert.equal(metadata.sourceHeight, sourceHeight, `Source height mismatch: ${source}`);
    assert.equal(metadata.crop, null, `Archive/refurbished photo was cropped: ${output}`);
    assert.ok(Math.abs(metadata.height - sourceHeight * metadata.width / sourceWidth) <= 1, `Aspect ratio changed: ${output}`);
    assert.equal(statSync(resolve(output)).size, metadata.bytes, `Derivative size does not match manifest: ${output}`);
    const webp = readFileSync(resolve(output));
    assert.equal(webp.toString('ascii', 0, 4), 'RIFF', `Invalid WebP file: ${output}`);
    assert.equal(webp.toString('ascii', 8, 12), 'WEBP', `Invalid WebP file: ${output}`);
    optimizedContentPhotos++;
    if (source.startsWith('assets/images/archive/') && variant === 'thumb') archiveThumbBytes += metadata.bytes;
  }
}
assert.equal(optimizedContentPhotos, 2 * data.soldBuilds.length);

// The independent editorial text sources remain useful for reconciliation.
const records = file => read(file).split(/\r?\n(?=\[)/).map(block => {
  const result = {};
  for (const line of block.split(/\r?\n/)) {
    const match = line.match(/^([^:]+):\s*(.*)$/);
    if (match) result[match[1].toLowerCase()] = match[2].trim();
  }
  return result;
});
const featuredSource = records('content/featured.txt');
assert.equal(featuredSource.length, 9);
assert.equal(data.featuredBuilds.length, featuredSource.length);
const originalFeatured = data.featuredBuilds.map((build, i) => ({ ...build, title: featuredSource[i].title, description: featuredSource[i].description }));
assert.equal(digest(originalFeatured), original.featuredBuilds.sha256, 'Original featured prices, specifications or photo associations changed');
const filenameTitles = new Set(data.soldBuilds.map(build => build.filename.replace(/\.[^.]+$/, '').replace(/,\s*Sold\b.*$/i, '').trim()));
for (const [i, source] of featuredSource.entries()) {
  const build = data.featuredBuilds[i];
  assert.ok(filenameTitles.has(build.title), `Featured title does not match an original archive filename: ${build.title}`);
  assert.equal(build.price, source.price);
  assert.deepEqual(build.components, source.components.split(' | '));
  assert.deepEqual(build.images, source.images.split(' | '));
  assert.match(build.images[0], /_FRONT\.png$/i, `Featured build should start with its front photo: ${build.title}`);
}
const refurbSource = records('content/refurbished.txt');
assert.equal(refurbSource.length, 4);
for (const [i, source] of refurbSource.entries()) {
  assert.equal(data.refurbishedItems[i].title, source.title);
  assert.equal(data.refurbishedItems[i].image, source.imagepath);
}
const reviewSource = records('content/reviews.txt');
const reviews = [...data.featuredReviews, ...data.additionalReviews];
assert.equal(reviewSource.length, reviews.length);
for (const [i, source] of reviewSource.entries()) {
  assert.equal(reviews[i].user, source.user);
  assert.equal(reviews[i].date, source.date || '');
  assert.equal(reviews[i].text, source.text);
  assert.deepEqual(Object.keys(reviews[i]).sort(), ['date', 'text', 'user'], 'Unsupported invented review attribution or rating');
}

// Exercise the production sorting helpers without constructing the interface.
sandbox.document = { readyState: 'loading', addEventListener() {} };
vm.runInContext(read('script.js'), sandbox, { filename: 'script.js' });
const utils = sandbox.window.BOBER_UTILS;
assert.ok(utils?.compareSoldBuilds, 'Production archive helpers are unavailable');
for (const title of [
  'RTX 5080, Xeon E5, 16GB DDR3',
  'RTX 5080, Core i7-4770, 16GB DDR3',
  'RTX 5080, i7 3930K, 32GB RAM',
  'GTX 980 Ti, i7-875K, 16GB DDR3',
  'RTX 5080, i7-2600, 16GB DDR3',
]) assert.equal(utils.isLegacyCPU(title), true, `Legacy CPU incorrectly classified: ${title}`);
for (const title of [
  'RTX 5080, i7-12700K, 32GB DDR4',
  'RTX 5080, i7 10700K, 32GB DDR4',
  'RTX 5080, Core i7-14700K, 32GB DDR5',
  'RTX 5080, i7-7700K, 16GB DDR4',
  'RTX 3060 Ti, Core i7, 1TB SSD',
  'GTX 745, i5-2400, 8GB DDR3',
  'RX 9070 XT, Ryzen 5 7600X, 16GB DDR5',
]) assert.equal(utils.isLegacyCPU(title), false, `Modern or unspecified CPU incorrectly classified: ${title}`);
const precedes = (first, second) => assert.ok(utils.compareSoldBuilds(first, second) < 0, `Incorrect archive ordering: ${first} must precede ${second}`);
for (const [first, second] of [
  ['GTX 745, Ryzen 5 3600', 'RTX 5080, Xeon E5'],
  ['GTX 745, Ryzen 5 3600', 'RTX 5080, i7-4770'],
  ['RTX 5060, Ryzen 5 3600', 'RTX 4080, Ryzen 5 3600'],
  ['RTX 4060 Ti, Ryzen 5 3600', 'RX 7700XT, Ryzen 5 3600'],
  ['RX 6400, Ryzen 5 3600', 'RTX 3090, Ryzen 5 3600'],
  ['RTX 3050, Ryzen 5 3600', 'RTX 2080 Ti, Ryzen 5 3600'],
  ['RTX 2070, Ryzen 5 3600', 'RX 5700XT, Ryzen 5 3600'],
  ['RX 580, Ryzen 5 3600', 'GTX 1080 Ti, Ryzen 5 3600'],
  ['RTX 5080, Ryzen 5 3600', 'RTX 5070 Ti, Ryzen 5 3600'],
  ['RTX 2080 Ti, Ryzen 5 3600', 'RTX 2080 Super, Ryzen 5 3600'],
  ['RTX 2080 Super, Ryzen 5 3600', 'RTX 2080, Ryzen 5 3600'],
  ['RX 5700XT, Ryzen 5 3600', 'RX 5700, Ryzen 5 3600'],
  ['GTX Titan Xp, Ryzen 5 3600', 'GTX 1080 Ti, Ryzen 5 3600'],
]) precedes(first, second);
const sorted = [...data.soldBuilds].sort(utils.compareSoldBuilds);
assert.equal(sorted.filter(utils.isLegacyCPU).length, 14, 'Documented legacy CPU count changed');
assert.ok(sorted.slice(0, 117).every(build => !utils.isLegacyCPU(build)), 'Legacy CPU record appears above newer systems');
assert.ok(sorted.slice(117).every(utils.isLegacyCPU), 'Legacy CPU override does not dominate every GPU tier');
assert.equal(utils.parseBuildSummary(data.featuredBuilds[0]).cpu, 'Ryzen 5 7600X', 'Featured CPU parsing mistakes storage for CPU');
assert.ok(utils.getWebpPath(data.refurbishedItems[3].image).includes('12700k%3Az690_thumb.webp'), 'Punctuation in original filenames must be URL encoded');

console.log(`PASS: 9 featured builds / ${featuredPhotos} correctly associated gallery photos / 3 SIDE2 views.`);
console.log(`PASS: All 4 original refurbished records preserved (${data.refurbishedItems.length} historical items) / 131 unique archive records and original photos.`);
console.log('PASS: 5 featured + 38 additional reviews match the original wording, identities and dates.');
console.log('PASS: Original prices, specifications, photo associations and reviews match; featured titles follow archive filenames, with owner-authorized description edits.');
console.log('PASS: Production GPU tier/model/suffix ordering and 14 legacy CPU overrides, including modern Intel CPU regressions.');
console.log(`PASS: ${optimizedContentPhotos} archive WebP derivatives preserve original associations and uncropped aspect ratios; all 131 archive thumbnails total ${(archiveThumbBytes / 1024 / 1024).toFixed(2)} MiB.`);
await import('./validate-hardware-data.mjs');
await import('./validate-closeups.mjs');
