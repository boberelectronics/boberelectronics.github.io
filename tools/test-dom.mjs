/** Minimal, test-only DOM for exercising real production renderers and handlers. */
import { readFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import vm from 'node:vm';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

export function makeHarness({ hardwareItems, featuredHardwareIds, hardwareArchive = false, archive = false, hero = false, reviews = false, reducedMotion = false, documentHidden = false, navigation = false } = {}) {
  let activeElement = null;
  let viewportScrollY = 0;
  class TestNode {
    constructor(tagName) {
      this.tagName = tagName;
      this.children = [];
      this.dataset = {};
      this.attributes = {};
      this.style = {};
      this.listeners = {};
      this.className = '';
      this.rootConnected = false;
      this.classList = {
        contains: token => this.className.split(/\s+/).includes(token),
        add: (...tokens) => { this.className = [...new Set([...this.className.split(/\s+/).filter(Boolean), ...tokens])].join(' '); },
        remove: (...tokens) => { this.className = this.className.split(/\s+/).filter(token => !tokens.includes(token)).join(' '); },
        toggle: (token, force) => {
          const selected = force === undefined ? !this.classList.contains(token) : Boolean(force);
          this.classList[selected ? 'add' : 'remove'](token);
          return selected;
        },
      };
    }
    get isConnected() { return this.parentNode ? this.parentNode.isConnected && this.parentNode.children.includes(this) : this.rootConnected; }
    append(...nodes) {
      for (const node of nodes) {
        if (node.tagName === '#fragment') this.append(...node.children);
        else { node.parentNode = this; this.children.push(node); }
      }
    }
    replaceChildren(...nodes) {
      if (this.children.some(child => child.contains(activeElement))) activeElement = null;
      for (const child of this.children) child.parentNode = null;
      this.children = [];
      this.append(...nodes);
    }
    contains(node) { return node === this || this.children.some(child => child.contains(node)); }
    setAttribute(name, value) { this.attributes[name] = String(value); if (name === 'id') this.id = String(value); }
    getAttribute(name) {
      if (name in this.attributes) return this.attributes[name];
      if (name === 'id') return this.id || null;
      if (name.startsWith('data-')) return this.dataset[name.slice(5).replace(/-([a-z])/g, (_, letter) => letter.toUpperCase())] ?? null;
      return null;
    }
    removeAttribute(name) { delete this.attributes[name]; }
    addEventListener(type, listener) { (this.listeners[type] ||= []).push(listener); }
    emit(type, event = {}) {
      for (const listener of this.listeners[type] || []) listener({ target: this, preventDefault() {}, ...event });
    }
    matches(selector) {
      if (selector.includes(',')) return selector.split(',').some(part => this.matches(part.trim()));
      const descendant = selector.trim().match(/^(.+)\s+([^ ]+)$/);
      if (descendant) return this.matches(descendant[2]) && Boolean(this.parentNode?.closest(descendant[1]));
      if (selector.startsWith('#')) return this.id === selector.slice(1);
      if (selector.startsWith('.')) return this.classList.contains(selector.slice(1));
      if (selector === 'dialog[open]') return this.tagName === 'dialog' && this.open;
      const attribute = selector.match(/^([a-z][\w-]*)?\[([^=\]\^]+)(?:(\^?=)["']?([^"'\]]+)["']?)?\]$/i);
      if (attribute) {
        if (attribute[1] && this.tagName !== attribute[1]) return false;
        const value = this.getAttribute(attribute[2]);
        return value !== null && (attribute[3] === undefined || (attribute[3] === '^=' ? String(value).startsWith(attribute[4]) : String(value) === attribute[4]));
      }
      return this.tagName === selector;
    }
    closest(selector) { return this.matches(selector) ? this : this.parentNode?.closest(selector) || null; }
    querySelector(selector) { return this.querySelectorAll(selector)[0] || null; }
    querySelectorAll(selector) { return this.children.flatMap(child => [...(child.matches(selector) ? [child] : []), ...child.querySelectorAll(selector)]); }
    focus() { activeElement = this; }
    showModal() { this.open = true; }
    close() { this.open = false; this.emit('close'); }
    getBoundingClientRect() { const top = (this.documentTop || 0) - (this.fixed ? 0 : viewportScrollY); const height = this.rectHeight || 480; return { top, left: 0, right: 640, bottom: top + height, width: 640, height }; }
    getClientRects() { return this.hidden ? [] : [this.getBoundingClientRect()]; }
  }
  const nodes = {};
  const register = (id, tag = 'div') => { const node = new TestNode(tag); node.id = id; node.rootConnected = true; nodes[id] = node; return node; };
  for (const [id, tag] of [['featured-grid', 'div'], ['refurb-grid', 'div'], ['photo-dialog', 'dialog'], ['photo-close', 'button'], ['photo-main-img', 'img'], ['photo-caption', 'p'], ['photo-original', 'a']]) register(id, tag);
  if (hardwareArchive) {
    for (const [id, tag] of [['hardware-archive-list', 'div'], ['hardware-load-more', 'button'], ['hardware-load-context', 'p'], ['hardware-empty', 'div'], ['hardware-reset', 'button'], ['hardware-search', 'input'], ['hardware-filter', 'select'], ['hardware-filter-tabs', 'div']]) register(id, tag);
    nodes['hardware-search'].value = '';
    nodes['hardware-filter'].value = 'all';
    for (const category of ['all', 'gpus', 'cpus', 'memory', 'storage', 'motherboards', 'bundles', 'cooling', 'systems']) {
      const button = new TestNode('button'); button.dataset.hardwareFilter = category; nodes['hardware-filter-tabs'].append(button);
    }
  }
  if (archive) {
    for (const [id, tag] of [['archive-list', 'div'], ['archive-load-more', 'button'], ['archive-load-context', 'p'], ['archive-empty', 'div'], ['archive-reset', 'button'], ['archive-search', 'input'], ['archive-filter', 'select'], ['pc-filter-tabs', 'div']]) register(id, tag);
    nodes['archive-search'].value = '';
    nodes['archive-filter'].value = 'all';
    for (const tier of ['all', 'rtx50', 'rx9000', 'rtx40', 'rx7000', 'rx6000', 'rtx30', 'rtx20', 'rx5000', 'gtx']) {
      const button = new TestNode('button'); button.dataset.pcFilter = tier; nodes['pc-filter-tabs'].append(button);
    }
  }
  if (reviews) register('featured-reviews-list');
  if (hero) {
    register('hero', 'section');
    for (const [id, tag] of [['hero-slides', 'div'], ['hero-prev', 'button'], ['hero-next', 'button'], ['hero-pause', 'button'], ['hero-position', 'p'], ['hero-dots', 'div']]) register(id, tag);
    nodes.hero.append(nodes['hero-slides'], nodes['hero-prev'], nodes['hero-next'], nodes['hero-pause'], nodes['hero-position'], nodes['hero-dots']);
  }
  if (navigation) {
    const positions = { hero: [0, 900], 'store-bar': [900, 300], featured: [1200, 1800], testimonials: [2400, 600], refurbished: [3000, 1200], archive: [4200, 2000], 'refurb-archive': [6200, 2000] };
    for (const [id, [top, height]] of Object.entries(positions)) {
      const section = nodes[id] || register(id, id === 'testimonials' ? 'div' : 'section');
      section.documentTop = top; section.rectHeight = height;
    }
    const navbar = register('navbar', 'header'); navbar.fixed = true; navbar.rectHeight = 64; navbar.offsetHeight = 64;
    const nav = register('nav-links', 'nav'); nav.className = 'nav-links';
    navbar.append(nav);
    for (const id of ['featured', 'refurbished', 'archive', 'refurb-archive', 'testimonials', 'store-bar']) {
      const link = new TestNode('a'); link.setAttribute('href', `#${id}`); nav.append(link);
    }
  }
  nodes['photo-dialog'].append(nodes['photo-close'], nodes['photo-main-img'], nodes['photo-caption'], nodes['photo-original']);
  const descend = node => node.children.flatMap(child => [child, ...descend(child)]);
  const selectAll = selector => [...new Set(Object.values(nodes).flatMap(node => [node, ...descend(node)]))].filter(node => node.matches(selector));
  const document = {
    readyState: 'complete', hidden: documentHidden, body: { style: {} }, documentElement: { clientHeight: 800 }, listeners: {},
    get activeElement() { return activeElement; },
    createElement: tag => new TestNode(tag), createDocumentFragment: () => new TestNode('#fragment'),
    getElementById: id => nodes[id] || null,
    querySelector: selector => selectAll(selector)[0] || null, querySelectorAll: selectAll,
    addEventListener(type, listener) { (this.listeners[type] ||= []).push(listener); },
    emit(type, event = {}) { for (const listener of this.listeners[type] || []) listener(event); },
  };
  let now = 0;
  let timerSequence = 0;
  const timers = new Map();
  const setTimeout = (callback, delay = 0) => { const id = ++timerSequence; timers.set(id, { callback, at: now + delay, delay }); return id; };
  const clearTimeout = id => timers.delete(id);
  const advance = milliseconds => {
    const finish = now + milliseconds;
    let iterations = 0;
    while (true) {
      const next = [...timers].sort((a, b) => a[1].at - b[1].at)[0];
      if (!next || next[1].at > finish) break;
      assertTimerLimit(++iterations);
      now = next[1].at; timers.delete(next[0]); next[1].callback();
    }
    now = finish;
  };
  function assertTimerLimit(iterations) { if (iterations > 1000) throw new Error('Test timers entered an unbounded loop'); }
  const media = new Map();
  const matchMedia = query => {
    if (!media.has(query)) media.set(query, { matches: query.includes('prefers-reduced-motion') ? reducedMotion : false, listeners: [], addEventListener(type, callback) { if (type === 'change') this.listeners.push(callback); } });
    return media.get(query);
  };
  const observers = [];
  class IntersectionObserver {
    constructor(callback) { this.callback = callback; this.targets = []; observers.push(this); }
    observe(target) { this.targets.push(target); }
    disconnect() { this.targets = []; }
  }
  let frameSequence = 0;
  const frames = new Map();
  const requestAnimationFrame = callback => { const id = ++frameSequence; frames.set(id, callback); return id; };
  const flushAnimationFrames = () => { let attempts = 0; while (frames.size) { if (++attempts > 100) throw new Error('Unbounded animation-frame loop'); const batch = [...frames]; frames.clear(); batch.forEach(([, callback]) => callback(now)); } };
  const window = { innerHeight: 800, listeners: {}, get scrollY() { return viewportScrollY; }, addEventListener(type, callback) { (this.listeners[type] ||= []).push(callback); }, emit(type, event = {}) { for (const callback of this.listeners[type] || []) callback(event); flushAnimationFrames(); }, matchMedia, setTimeout, clearTimeout, IntersectionObserver, requestAnimationFrame, getComputedStyle: () => ({ visibility: 'visible' }) };
  const context = vm.createContext({ window, document, setTimeout, clearTimeout, IntersectionObserver, requestAnimationFrame });
  vm.runInContext(readFileSync(path.join(root, 'data.js'), 'utf8'), context, { filename: 'data.js' });
  if (hardwareItems) window.BOBER_DATA.hardwareItems = hardwareItems;
  if (featuredHardwareIds) window.BOBER_DATA.featuredHardwareIds = featuredHardwareIds;
  vm.runInContext(readFileSync(path.join(root, 'script.js'), 'utf8'), context, { filename: 'script.js' });
  flushAnimationFrames();
  const setReducedMotion = matches => { for (const [query, value] of media) if (query.includes('prefers-reduced-motion')) { value.matches = matches; value.listeners.forEach(callback => callback({ matches })); } };
  const setHidden = hidden => { document.hidden = hidden; document.emit('visibilitychange'); };
  const setIntersecting = isIntersecting => { for (const observer of observers) observer.callback(observer.targets.map(target => ({ target, isIntersecting, intersectionRatio: isIntersecting ? 1 : 0 }))); };
  return { nodes, document, window, timers, advance, setReducedMotion, setHidden, setIntersecting, setScroll: y => { viewportScrollY = y; window.emit('scroll'); }, flushAnimationFrames };
}
