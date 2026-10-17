/** Exercise the real PC archive renderer and event handlers without a browser. */
import assert from 'node:assert/strict';
import { makeHarness } from './test-dom.mjs';

const harness = makeHarness({ archive: true });
const { nodes, window } = harness;
const data = window.BOBER_DATA;
const utils = window.BOBER_UTILS;
assert.equal(typeof utils.isPCBuildRecord, 'function', 'PC archive classifier must be exported for regression checks');
assert.equal(data.soldBuilds.length, 131, 'Runtime presentation must not delete stored archive records');
const laptop = data.soldBuilds.find(record => /Thinkpad/i.test(record.title));
assert.ok(laptop, 'The original laptop record must remain preserved internally');
assert.equal(utils.isPCBuildRecord(laptop), false, 'The laptop must not be presented as a custom PC build');
for (const record of data.soldBuilds.filter(record => record !== laptop)) {
  assert.equal(utils.isPCBuildRecord(record), true, `A supplied PC build was misclassified: ${record.title}`);
}
for (const title of [
  'Lenovo Thinkpad laptop, i7-6600U, GTX 930M',
  'Gaming notebook RTX 4070, Intel Core i7-12700H',
  'MacBook Pro laptop, Core i7',
  'EVGA GeForce GTX 1070 Ti 8GB: Repasted, Repadded, Cleaned',
  'Blower GeForce RTX 3070: Repasted, Repadded, Cleaned',
  'COMBO: ASRock Z690 Phantom Gaming + Intel Core i7-12700K',
  'RTX 3080 standalone graphics card, repasted and tested',
]) assert.equal(utils.isPCBuildRecord(title), false, `Non-PC hardware must remain outside the PC archive: ${title}`);

const list = nodes['archive-list'];
const more = nodes['archive-load-more'];
const search = nodes['archive-search'];
const filter = nodes['archive-filter'];
const buttons = () => list.children.map(card => card.querySelector('button'));
const titles = () => buttons().map(button => button.dataset.caption);
function revealAll(expectedCount) {
  assert.equal(titles().length, Math.min(12, expectedCount), 'Search/filter should restore the twelve-item preview');
  assert.equal(more.hidden, expectedCount <= 12, 'Show-all visibility must match the preview scope');
  if (expectedCount > 12) {
    assert.equal(more.textContent, 'Show all archived PCs');
    assert.match(nodes['archive-load-context'].textContent, /selection|preview/i, 'The initial archive scope must be explained');
    more.emit('click');
    assert.equal(titles().length, expectedCount, 'One show-all activation must reveal every matching PC');
    assert.equal(more.hidden, true);
    assert.equal(harness.document.activeElement, buttons()[12], 'Show all must focus the first newly revealed PC');
  }
  assert.equal(nodes['archive-load-context'].hidden, expectedCount === 0);
  assert.doesNotMatch(nodes['archive-load-context'].textContent, /\d/, 'Archive context should not expose numeric counters');
  return titles();
}
assert.equal(list.children.length, 12, 'PC archive must initially display only twelve photographs');
const allTitles = revealAll(130);
assert.equal(allTitles.length, 130, 'PC archive must display every one of the 130 supplied PC systems');
assert.equal(new Set(allTitles).size, 130, 'PC archive duplicated an original record');
assert.ok(!allTitles.includes(laptop.title), 'Laptop leaked into the rendered PC archive');
const expectedOrder = [...data.soldBuilds].filter(utils.isPCBuildRecord).sort(utils.compareSoldBuilds).map(record => record.title);
assert.deepEqual(allTitles, Array.from(expectedOrder), 'PC archive ordering or record information changed');
assert.ok(allTitles.slice(0, 116).every(title => !utils.isLegacyCPU(title)), 'Legacy systems appear above modern systems');
assert.ok(allTitles.slice(116).every(title => utils.isLegacyCPU(title)), 'All fourteen legacy systems must remain at the bottom of All PCs');
for (const [index, button] of buttons().entries()) {
  const record = data.soldBuilds.find(record => record.title === allTitles[index]);
  assert.equal(button.querySelector('.archive-title').textContent, record.title, 'Archive card must show the complete original title');
  assert.equal(button.querySelectorAll('img').length, 1, 'Archive card should have one principal photograph');
  assert.equal(button.querySelector('img').src, utils.getWebpPath(record.image), 'Archive thumbnail association changed');
  assert.equal(button.querySelector('img').style.objectFit, 'contain', 'Archive photographs must preserve original framing');
  assert.equal(button.dataset.photo, utils.getWebpPath(record.image, 'full'), 'Archive lightbox association changed');
  assert.equal(button.dataset.original, utils.encodeImagePath(record.image), 'Archive original-photo association changed');
}

// Specific GPU tiers are for current-generation CPU systems. The full All PCs
// collection alone includes legacy systems, still ordered beneath the others.
const categoryCounts = { rtx50: 10, rx9000: 1, rtx40: 5, rx7000: 1, rx6000: 8, rtx30: 57, rtx20: 13, rx5000: 10, gtx: 11 };
const modernTierTitles = new Set();
for (const [category, count] of Object.entries(categoryCounts)) {
  filter.value = category;
  filter.emit('change');
  const filtered = revealAll(count);
  for (const title of filtered) {
    assert.equal(utils.isLegacyCPU(title), false, `Legacy CPU leaked into GPU category ${category}`);
    assert.equal(utils.getPCGpuCategory(title), category, `Wrong GPU generation in ${category}`);
    modernTierTitles.add(title);
  }
}
assert.equal(modernTierTitles.size, 116, 'Specific GPU categories must retain every nonlegacy PC system');
assert.deepEqual(modernTierTitles, new Set(allTitles.slice(0, 116)), 'GPU filters omitted or introduced a PC record');
const groupOrder = Object.keys(categoryCounts);
for (let index = 1; index < 116; index++) assert.ok(groupOrder.indexOf(utils.getPCGpuCategory(allTitles[index - 1])) <= groupOrder.indexOf(utils.getPCGpuCategory(allTitles[index])), 'All-PC sorting must follow the separately named NVIDIA/AMD generation groups');
for (const [title, category] of [
  ['RTX 5080, Ryzen 7 7800X3D', 'rtx50'], ['RX 9070 XT, Ryzen 5 7600X', 'rx9000'],
  ['RTX 4080, Ryzen 7 7700X', 'rtx40'], ['RX 7700XT, Ryzen 5 5600', 'rx7000'],
  ['RX 6900 XT, Ryzen 5 5600', 'rx6000'], ['RTX 3080, i7 10700K', 'rtx30'],
  ['RTX 2080 Ti, Ryzen 5 3600', 'rtx20'], ['RX 5700XT, Ryzen 5 3600', 'rx5000'],
  ['GTX 1080 Ti, Ryzen 5 3600', 'gtx'],
]) assert.equal(utils.getPCGpuCategory(title), category);

filter.value = 'all';
search.value = 'Xeon';
search.emit('input');
assert.equal(titles().length, 7, 'Searching All PCs should still find all seven Xeon systems');
assert.ok(titles().every(title => utils.isLegacyCPU(title)), 'Xeon search returned an unrelated record');
filter.value = 'rx5000';
filter.emit('change');
assert.equal(titles().length, 0, 'Specific GPU tiers must exclude Xeon systems even when searching');
assert.equal(nodes['archive-empty'].hidden, false, 'Empty combined filter needs its reset state');
assert.equal(nodes['archive-load-context'].hidden, true, 'Loading context must be hidden when there are no matching PC photos');
filter.value = 'all';
search.value = 'Thinkpad';
search.emit('input');
assert.equal(titles().length, 0, 'The preserved laptop must remain excluded during PC archive searching');
nodes['archive-reset'].emit('click');
assert.equal(search.value, '');
assert.equal(filter.value, 'all');
assert.equal(titles().length, 12, 'Reset should restore the first PC archive page');
assert.equal(harness.document.activeElement, search, 'Reset should restore focus to search');

const pcPills = nodes['pc-filter-tabs'].children;
const rtx30Pill = pcPills.find(button => button.dataset.pcFilter === 'rtx30');
rtx30Pill.focus();
nodes['pc-filter-tabs'].emit('click', { target: rtx30Pill });
assert.equal(filter.value, 'rtx30', 'Visible PC pill must synchronize the canonical GPU tier');
assert.ok(titles().every(title => !utils.isLegacyCPU(title) && utils.getPCGpuCategory(title) === 'rtx30'));
assert.equal(harness.document.activeElement, rtx30Pill, 'Changing a visible PC filter must retain button focus');
pcPills.forEach(button => assert.equal(button.getAttribute('aria-pressed'), String(button === rtx30Pill)));
nodes['archive-reset'].emit('click');
assert.equal(pcPills[0].getAttribute('aria-pressed'), 'true', 'PC reset must synchronize the All pill');

console.log('PASS: Real PC archive renders 130 systems, preserves all 131 source records, excludes the laptop and standalone hardware, and retains exact titles/uncropped main photos.');
console.log('PASS: All PCs keeps 14 legacy systems below 116 others; GPU filters exclude legacy systems, preserve all 116 normal records, and support split GPU filters, preview/show-all, search and reset.');
