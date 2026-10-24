/** Exercise the real six-item featured hardware and 44-item archive renderers. */
import assert from 'node:assert/strict';
import { makeHarness } from './test-dom.mjs';

const harness = makeHarness({ hardwareArchive: true });
const { nodes, window, document } = harness;
const data = window.BOBER_DATA;
const utils = window.BOBER_UTILS;
const items = data.hardwareItems;
const byId = new Map(items.map(item => [item.id, item]));
const featuredGrid = nodes['refurb-grid'];
const cardButtons = grid => grid.children.map(card => card.querySelector('button'));
assert.equal(items.length, 44, 'The authoritative hardware collection must contain all supplied records');
assert.equal(data.refurbishedItems.length, 4, 'The original four historical records must remain preserved');
assert.equal(featuredGrid.children.length, 6, 'All six hardware highlights must be visible immediately');
assert.deepEqual(cardButtons(featuredGrid).map(button => button.dataset.hardwareId), Array.from(data.featuredHardwareIds));
const pcButtons = cardButtons(nodes['featured-grid']);
assert.equal(pcButtons.length, 9, 'All nine featured PC builds must be visible immediately');
assert.deepEqual(new Set(pcButtons.map(button => Number(button.dataset.build))), new Set(data.featuredBuilds.map((_, index) => index)));

const list = nodes['hardware-archive-list'];
const more = nodes['hardware-load-more'];
const search = nodes['hardware-search'];
const filter = nodes['hardware-filter'];
const buttons = () => cardButtons(list);
const ids = () => buttons().map(button => button.dataset.hardwareId);
function revealAll(expectedCount) {
  assert.equal(ids().length, Math.min(12, expectedCount), 'Hardware search/filter should restore the twelve-item preview');
  assert.equal(more.hidden, expectedCount <= 12);
  if (expectedCount > 12) {
    assert.equal(more.textContent, 'Show all hardware sales');
    assert.match(nodes['hardware-load-context'].textContent, /selection|preview/i);
    more.emit('click');
    assert.equal(ids().length, expectedCount, 'One activation must reveal all matching hardware');
    assert.equal(more.hidden, true);
    assert.equal(document.activeElement, buttons()[12], 'Show all must focus the first newly revealed item');
  }
  assert.equal(nodes['hardware-load-context'].hidden, expectedCount === 0);
  assert.doesNotMatch(nodes['hardware-load-context'].textContent, /\d/);
  assert.equal(new Set(ids()).size, expectedCount, 'Hardware browsing duplicated a record');
  return ids();
}
const allIds = revealAll(44);
assert.deepEqual(allIds, Array.from([...items].sort(utils.compareHardwareItems).map(item => item.id)));
assert.deepEqual(new Set(allIds), new Set(items.map(item => item.id)), 'Hardware archive omitted an actual source record');
for (const button of buttons()) {
  const item = byId.get(button.dataset.hardwareId);
  assert.equal(button.querySelector('.hardware-title').textContent, item.title);
  assert.equal(button.querySelector('.hardware-sale').textContent, item.saleText, 'Exact price/quantity wording changed in the card');
  assert.equal(button.querySelector('img').src, utils.encodeImagePath(item.thumbnail));
  assert.equal(button.querySelector('img').style.objectFit, 'contain');
  assert.equal(button.dataset.photo, utils.encodeImagePath(item.fullImage));
  assert.equal(button.dataset.original, utils.encodeImagePath(item.images[0]));
  assert.equal(button.dataset.caption, [item.title, item.saleText, item.description].filter(Boolean).join('\n'));
  document.emit('click', { target: button, preventDefault() {} });
  assert.equal(nodes['photo-dialog'].open, true);
  assert.equal(nodes['photo-main-img'].src, utils.encodeImagePath(item.fullImage));
  assert.equal(nodes['photo-caption'].textContent, button.dataset.caption);
  assert.equal(nodes['photo-original'].href, utils.encodeImagePath(item.images[0]));
  nodes['photo-close'].emit('click');
  assert.equal(document.activeElement, button, 'Closing a hardware photograph must return focus to its card');
}

const categoryCounts = { gpus: 19, cpus: 5, memory: 7, storage: 2, motherboards: 2, bundles: 4, cooling: 1, systems: 4 };
const categoryIds = new Set();
for (const [category, count] of Object.entries(categoryCounts)) {
  filter.value = category;
  filter.emit('change');
  const filtered = revealAll(count);
  assert.equal(filtered.length, count, `Wrong hardware count for ${category}`);
  assert.ok(filtered.every(id => byId.get(id).category === category));
  filtered.forEach(id => categoryIds.add(id));
}
assert.equal(categoryIds.size, 44, 'Category filters lost a supplied hardware record');
filter.value = 'all';
search.value = '  RTX   3070 ';
search.emit('input');
assert.equal(revealAll(4).length, 4, 'Hardware search should find all four branded RTX 3070 variants');
filter.value = 'memory';
search.value = 'DDR4 3200';
search.emit('input');
assert.equal(revealAll(5).length, 5, 'Combined category/token search should find all five matching memory records');
filter.value = 'all';
search.value = '0.50';
search.emit('input');
assert.deepEqual(new Set(revealAll(2)), new Set(['hardware-026', 'hardware-027']), 'Decimal sale prices must remain searchable');
search.value = 'Sold 3x';
search.emit('input');
assert.deepEqual(new Set(revealAll(3)), new Set(['hardware-006', 'hardware-009', 'hardware-015']), 'Documented sale quantities must remain searchable');
filter.value = 'cooling';
search.value = '3090';
search.emit('input');
assert.equal(revealAll(0).length, 0);
assert.equal(nodes['hardware-empty'].hidden, false);
nodes['hardware-reset'].emit('click');
assert.equal(search.value, '');
assert.equal(filter.value, 'all');
assert.equal(list.children.length, 12);
assert.equal(document.activeElement, search);
const hardwarePills = nodes['hardware-filter-tabs'].children;
const coolingPill = hardwarePills.find(button => button.dataset.hardwareFilter === 'cooling');
coolingPill.focus();
nodes['hardware-filter-tabs'].emit('click', { target: coolingPill });
assert.equal(filter.value, 'cooling', 'Visible hardware pill must synchronize the canonical category control');
assert.equal(ids().length, 1);
assert.equal(document.activeElement, coolingPill, 'Changing a visible hardware filter must retain button focus');
hardwarePills.forEach(button => assert.equal(button.getAttribute('aria-pressed'), String(button === coolingPill)));
nodes['hardware-reset'].emit('click');
assert.equal(hardwarePills[0].getAttribute('aria-pressed'), 'true', 'Hardware reset must synchronize the All pill');
assert.equal(utils.getHardwareGpuSortKey({ title: 'GeForce GT 630 GPU' }).model, 630);
assert.ok(utils.compareHardwareItems(byId.get('hardware-015'), byId.get('hardware-008')) < 0, 'RTX 3090 should precede RTX 3080 within its generation');
assert.ok(utils.compareHardwareItems(byId.get('hardware-025'), byId.get('hardware-018')) < 0, 'RTX 3070 Ti should precede RTX 3070');
console.log('PASS: All 9 featured PCs and all 6 hardware highlights render immediately; hardware preview reveals all 44 in one action, each exact title/sale phrase and correct thumbnail/full/original association.');
console.log('PASS: All 8 category counts, branded-GPU ordering, token search, decimal prices, quantity search, empty/reset state, lightboxes and focus return pass actual-handler regression checks.');
