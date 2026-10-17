/** Validate the October 17 hardware sources, exact sale wording and photo provenance. */
import assert from 'node:assert/strict';
import { readFileSync, readdirSync, existsSync, statSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import vm from 'node:vm';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const read = file => readFileSync(path.join(root, file));
const json = file => JSON.parse(read(file).toString());
const hash = bytes => createHash('sha256').update(bytes).digest('hex');
const box = { window: {} };
vm.runInNewContext(read('data.js').toString(), box);
const data = JSON.parse(JSON.stringify(box.window.BOBER_DATA));
const baseline = json('tools/qa/hardware-source-audit.json');
const historical = json('tools/historical-hardware-photo-manifest.json');
const derivatives = json('assets/images/webp/refurb_hardware/manifest.json');
assert.equal(data.hardwareItems.length, 44, 'Every supplied hardware source must remain represented');
assert.equal(new Set(data.hardwareItems.map(item => item.id)).size, 44, 'Hardware IDs must be unique');
const sourceFiles = readdirSync(path.join(root, 'assets/images/refurb_hardware')).filter(file => /\.(heic|jpe?g|png)$/i.test(file)).sort();
assert.deepEqual(data.hardwareItems.map(item => path.basename(item.images[0])).sort(), sourceFiles, 'Hardware collection must map every original exactly once');
const categoryCounts = {};
const derivativeById = new Map(derivatives.items.map(item => [item.id, item]));
let derivativeCount = 0;
for (const item of data.hardwareItems) {
  const original = baseline.find(record => record.id === item.id);
  assert.ok(original, `Unknown supplied hardware ID: ${item.id}`);
  for (const key of ['title', 'category', 'images', 'sold', 'saleText']) assert.deepEqual(item[key], original[key], `Original hardware ${key} changed: ${item.id}`);
  assert.equal(item.images.length, 1, 'Each currently supplied hardware record has one documented original');
  assert.equal(item.sold, true, 'Every supplied hardware photograph is a documented past sale');
  const filename = path.basename(item.images[0]);
  const stem = filename.replace(/\.[^.]+$/, '');
  assert.equal(`${item.title} - ${item.saleText}`, stem, `Hardware filename information was lost: ${item.id}`);
  categoryCounts[item.category] = (categoryCounts[item.category] || 0) + 1;
  const photo = derivativeById.get(item.id);
  assert.ok(photo, `Missing hardware derivative provenance: ${item.id}`);
  assert.equal(photo.source, item.images[0], `Wrong original photograph: ${item.id}`);
  assert.equal(photo.sourceSHA256, hash(read(photo.source)), `Original hardware file changed: ${item.id}`);
  assert.equal(photo.sourceBytes, statSync(path.join(root, photo.source)).size);
  assert.equal(photo.crop, null, `Hardware photographs must retain their entire frame: ${item.id}`);
  for (const variant of ['thumbnail', 'fullImage']) {
    const metadata = photo[variant];
    assert.equal(item[variant], metadata.path, `Wrong optimized photograph: ${item.id}/${variant}`);
    assert.ok(existsSync(path.join(root, item[variant])), `Missing optimized hardware photograph: ${item[variant]}`);
    assert.ok(Math.abs(metadata.height - photo.sourceHeight * metadata.width / photo.sourceWidth) <= 1, `Hardware aspect ratio changed: ${item.id}/${variant}`);
    const bytes = read(item[variant]);
    assert.equal(bytes.length, metadata.bytes);
    assert.equal(hash(bytes), metadata.sha256, `Optimized hardware file changed: ${item.id}/${variant}`);
    assert.equal(bytes.toString('ascii', 0, 4), 'RIFF');
    assert.equal(bytes.toString('ascii', 8, 12), 'WEBP');
    derivativeCount++;
  }
}
assert.deepEqual(categoryCounts, { storage: 2, memory: 7, bundles: 4, cpus: 5, systems: 4, gpus: 19, cooling: 1, motherboards: 2 });
assert.equal(derivativeCount, 88);
assert.equal(data.featuredHardwareIds.length, 6, 'Featured hardware should contain six selected real records');
assert.equal(new Set(data.featuredHardwareIds).size, 6, 'Featured hardware selection duplicates a product');
for (const id of data.featuredHardwareIds) assert.ok(data.hardwareItems.some(item => item.id === id), `Unknown featured hardware: ${id}`);
for (const [id, saleText] of [
  ['hardware-026', 'Sold for $0.50'], ['hardware-027', 'Sold for $0.50'],
  ['hardware-029', 'Sold 10x for $130 Each'], ['hardware-009', 'Sold 3x for $250 Each'],
  ['hardware-015', 'Sold 3x for $700 Each'], ['hardware-020', 'Sold 2x for $180 Each'],
  ['hardware-013', 'Sold 2x for $10 Each'], ['hardware-040', 'Sold 5x for $30 Each'],
  ['hardware-001', 'Sold 5x for $20 Each'], ['hardware-006', 'Sold 3x for $145 Each'],
  ['hardware-032', 'Sold for $240'],
]) assert.equal(data.hardwareItems.find(item => item.id === id).saleText, saleText, `Exact quantity/price wording changed: ${id}`);

// Historical records keep their exact original fields. The owner removed old
// PNGs; retained derivatives and read-only Git-baseline hashes preserve evidence.
assert.equal(historical.photos.length, 4);
for (const item of data.refurbishedItems) {
  const photo = historical.photos.find(photo => photo.original === item.image);
  assert.ok(photo, `Missing historical photo provenance: ${item.image}`);
  if (existsSync(path.join(root, item.image))) assert.equal(hash(read(item.image)), photo.sourceSha256);
  for (const variant of ['thumbnail', 'fullImage']) {
    assert.equal(hash(read(photo[variant].path)), photo[variant].sha256, `Historical optimized photo changed: ${photo[variant].path}`);
  }
  const alias = data.hardwareSourceAliases[item.image];
  if (alias) {
    assert.equal(alias, photo.exactReplacement, `Historical alias lacks provenance: ${item.image}`);
    assert.equal(hash(read(alias)), photo.sourceSha256, `Historical alias is not an exact original-file match: ${item.image}`);
  }
}
assert.ok(data.soldBuilds.some(item => /Thinkpad/.test(item.title) && /\$160/.test(item.title)), 'Original $160 Thinkpad archive record was overwritten by the separate $240 hardware sale');
console.log('PASS: 44 genuine hardware records / 8 categories / exact original titles, sale prices and quantity wording / 6 real featured selections.');
console.log('PASS: 88 uncropped hardware WebPs match original-file and derivative hashes; 4 historical records/derivatives retain their original baseline and proven photo aliases.');
