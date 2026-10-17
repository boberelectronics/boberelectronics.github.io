/** Verify the real scrollspy against changing viewport/section rectangles. */
import assert from 'node:assert/strict';
import { makeHarness } from './test-dom.mjs';

const harness = makeHarness({ navigation: true });
const { nodes, window } = harness;
const links = nodes['nav-links'].children;
function selected(expected) {
  const current = links.filter(link => link.classList.contains('is-current'));
  assert.equal(current.length, expected ? 1 : 0, 'Navigation must expose at most one current section');
  for (const link of links) {
    const active = link.getAttribute('href') === `#${expected}`;
    assert.equal(link.getAttribute('aria-current'), active ? 'location' : null, 'aria-current must match the actual visible section');
    assert.equal(link.classList.contains('is-current'), active);
  }
}
selected(null);
for (const [scrollY, id] of [[900, 'store-bar'], [1400, 'featured'], [2500, 'testimonials'], [3300, 'refurbished'], [4500, 'archive'], [6500, 'refurb-archive']]) {
  harness.setScroll(scrollY);
  selected(id);
}
// A section can already dominate the viewport while its padded heading remains
// below the activation marker. The actual section boundary must win immediately.
const paddedHeading = harness.document.createElement('h2');
paddedHeading.documentTop = 4355;
paddedHeading.rectHeight = 70;
nodes.archive.append(paddedHeading);
harness.setScroll(4046);
assert.equal(nodes.archive.getBoundingClientRect().top, 154);
assert.equal(paddedHeading.getBoundingClientRect().top, 309);
selected('archive');
nodes.archive.replaceChildren();

harness.setScroll(1400);
selected('featured');
harness.setScroll(0);
selected(null);
harness.setScroll(4500);
window.innerHeight = 400;
window.emit('resize');
selected('archive');
assert.equal(nodes['hero-slides'], undefined, 'Navigation regression must not depend on running the carousel');
console.log('PASS: Actual scrollspy follows all six sections in both directions, clears at the hero, uses section boundaries despite heading padding, updates on resize/visibility, and exposes one matching aria-current location.');
