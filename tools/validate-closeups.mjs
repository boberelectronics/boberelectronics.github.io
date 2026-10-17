/** Validate the eight original close-ups and their optimized hero derivatives. */
import assert from 'node:assert/strict';
import { readFileSync, readdirSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import vm from 'node:vm';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const read = file => readFileSync(path.join(root, file));
const hash = bytes => createHash('sha256').update(bytes).digest('hex');
const box = { window: {} };
vm.runInNewContext(read('data.js').toString(), box);
const items = JSON.parse(JSON.stringify(box.window.BOBER_DATA.heroCloseups));
const manifest = JSON.parse(read('assets/images/webp/closeups/manifest.json'));
assert.equal(items.length, 8);
assert.equal(new Set(items.map(item => item.id)).size, 8);
assert.deepEqual(items.map(item => item.id), manifest.recommendedOrder, 'Hero close-ups must retain the visually audited sequence');
assert.deepEqual(new Set(items.map(item => path.basename(item.original))), new Set(readdirSync(path.join(root, 'assets/images/closeups')).filter(file => /\.png$/i.test(file))), 'Hero must preserve every supplied close-up photograph');
let outputs = 0;
for (const item of items) {
  const photo = manifest.items.find(photo => photo.id === item.id);
  assert.ok(photo, `Missing close-up provenance: ${item.id}`);
  assert.equal(item.original, photo.source);
  assert.equal(item.alt, photo.alt);
  assert.equal(item.caption, photo.caption);
  assert.ok(item.alt && item.caption);
  assert.equal(hash(read(item.original)), photo.sourceSHA256, `Original close-up changed: ${item.id}`);
  assert.equal(photo.crop, null);
  for (const variant of ['thumbnail', 'fullImage']) {
    const metadata = photo[variant];
    assert.equal(item[variant], metadata.path);
    const bytes = read(item[variant]);
    assert.equal(hash(bytes), metadata.sha256, `Close-up derivative changed: ${item.id}/${variant}`);
    assert.equal(bytes.length, metadata.bytes);
    assert.equal(bytes.toString('ascii', 0, 4), 'RIFF');
    assert.equal(bytes.toString('ascii', 8, 12), 'WEBP');
    assert.ok(Math.abs(metadata.height - photo.sourceHeight * metadata.width / photo.sourceWidth) <= 1, `Close-up frame was cropped: ${item.id}/${variant}`);
    outputs++;
  }
}
assert.equal(outputs, 16);
console.log('PASS: All 8 original close-ups and 16 uncropped optimized derivatives match their source/output hashes, audited sequence, captions and alternative text.');
