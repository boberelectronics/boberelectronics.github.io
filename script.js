/* Bober Electronics: browsing, galleries and progressive disclosure.
 * Content lives in data.js. Images displayed here are optimized derivatives;
 * the untouched source photographs are available through explicit original links.
 */
(() => {
  'use strict';

  const data = window.BOBER_DATA;
  if (!data) return;

  function encodeImagePath(path) {
    return String(path).split('/').map(encodeURIComponent).join('/');
  }

  function getWebpPath(path, variant = 'thumb') {
    const match = String(path).match(/^assets\/images\/(featured|archive|refurbished)\/(.+)\.png$/i);
    if (!match) return encodeImagePath(path);
    return encodeImagePath(`assets/images/webp/${match[1]}/${match[2]}_${variant}.webp`);
  }

  function recordText(record) {
    return typeof record === 'string' ? record : record.filename || record.title || '';
  }

  // Preserve the original generation hierarchy, independently of sale price.
  function getGpuTier(record) {
    const text = recordText(record);
    if (/^(RTX\s*5|RX\s*9)/i.test(text)) return 1;
    if (/^RTX\s*4/i.test(text)) return 2;
    if (/^RX\s*[67]/i.test(text)) return 3;
    if (/^RTX\s*3/i.test(text)) return 4;
    if (/^RTX\s*2/i.test(text)) return 5;
    if (/^RX\b/i.test(text)) return 6;
    if (/^GTX\b/i.test(text)) return 7;
    return 8;
  }

  const pcGpuCategories = ['rtx50', 'rx9000', 'rtx40', 'rx7000', 'rx6000', 'rtx30', 'rtx20', 'rx5000', 'gtx'];

  function getPCGpuCategory(record) {
    const text = recordText(record);
    if (/^GTX\b/i.test(text)) return 'gtx';
    const match = text.match(/^(RTX|RX)\s*(\d+)/i);
    if (!match) return 'other';
    const generation = Math.floor(Number(match[2]) / 1000);
    if (match[1].toUpperCase() === 'RTX') return ({ 5: 'rtx50', 4: 'rtx40', 3: 'rtx30', 2: 'rtx20' })[generation] || 'other';
    return ({ 9: 'rx9000', 7: 'rx7000', 6: 'rx6000', 5: 'rx5000' })[generation] || 'other';
  }

  function isLegacyCPU(record) {
    const text = recordText(record);
    if (/\bXeon\b/i.test(text)) return true;
    const match = text.match(/\b(?:Core\s+)?i7[-\s]+(\d{3,5})[a-z]*\b/i);
    if (!match) return false;
    const model = match[1];
    return model.length === 3 || (model.length === 4 && Number(model[0]) <= 4);
  }

  function isPCBuildRecord(record) {
    const text = recordText(record);
    if (/\b(?:laptop|notebook|thinkpad|macbook|chromebook|ultrabook|combo|bundle|motherboard|graphics card|video card|GPU only|CPU only)\b/i.test(text)) return false;
    const hasCPU = /\b(?:Ryzen|(?:Core\s+)?i[3579]|Xeon)\b/i.test(text);
    const isSystem = /\b(?:PC|desktop|tower|workstation)\b/i.test(text);
    const listsSystemComponents = /^(?:RTX|RX|GTX)\b/i.test(text);
    return hasCPU && (isSystem || listsSystemComponents);
  }

  function getGpuSortKey(record) {
    const text = recordText(record);
    const titan = /^GTX\s+Titan\s+Xp\b/i.test(text);
    const match = text.match(/^(?:RTX|GTX|RX)\s*(\d+)\s*(XTX|XT|Ti|Super)?\b/i);
    return {
      model: titan ? 10000 : Number(match?.[1] || 0),
      suffix: ({ XTX: 4, XT: 3, TI: 3, SUPER: 2 })[(match?.[2] || '').toUpperCase()] || 0,
      titan,
    };
  }

  function compareSoldBuilds(a, b) {
    const legacyDifference = Number(isLegacyCPU(a)) - Number(isLegacyCPU(b));
    if (legacyDifference) return legacyDifference;
    const categoryRank = record => {
      const category = pcGpuCategories.indexOf(getPCGpuCategory(record));
      if (category >= 0) return category;
      // Older Radeon records remain in All PCs, ahead of GTX as in the source order.
      return /^RX\b/i.test(recordText(record)) ? pcGpuCategories.indexOf('gtx') - 0.5 : pcGpuCategories.length;
    };
    const categoryDifference = categoryRank(a) - categoryRank(b);
    if (categoryDifference) return categoryDifference;
    const gpuA = getGpuSortKey(a);
    const gpuB = getGpuSortKey(b);
    return gpuB.model - gpuA.model || gpuB.suffix - gpuA.suffix ||
      recordText(b).localeCompare(recordText(a), 'en', { numeric: true });
  }

  function parseBuildSummary(build) {
    const [specifications, descriptor = 'Custom Gaming PC'] = build.title.split(/\s*—\s*/);
    const parts = specifications.split(',').map(part => part.trim());
    const gpu = parts.find(part => /^(RTX|RX|GTX)\b/i.test(part)) || parts[0] || '';
    const cpu = parts.find(part => /^(Ryzen|Core|Intel|i[3579]|Xeon)\b/i.test(part)) || '';
    const ram = parts.find(part => /\b(DDR\d|RAM)\b/i.test(part)) || '';
    const storage = parts.find(part => /\b(SSD|NVMe|Storage|HDD)\b/i.test(part)) || '';
    return { gpu, cpu, ram, storage, descriptor };
  }

  const hardwareCategories = ['gpus', 'cpus', 'memory', 'storage', 'motherboards', 'bundles', 'cooling', 'systems'];

  function getHardwareCategoryLabel(category) {
    return ({ gpus: 'Graphics cards', cpus: 'Processors', memory: 'Memory', storage: 'Storage',
      motherboards: 'Motherboards', bundles: 'Component bundles', cooling: 'Cooling', systems: 'Systems' })[category] || 'Hardware';
  }

  function getHardwareGpuSortKey(item) {
    const match = recordText(item).match(/\b(RTX|RX|GTX|GT)\s*(Titan(?:\s+X(?:p)?(?:\s+Pascal)?)?|\d+)\s*(XTX|XT|Ti|Super)?\b/i);
    if (!match) return { tier: 8, model: 0, suffix: 0 };
    const gpu = `${match[1]} ${match[2]} ${match[3] || ''}`.trim();
    const key = getGpuSortKey(gpu);
    return { tier: getGpuTier(gpu), model: /Titan/i.test(gpu) ? 10000 : Number(match[2]) || key.model, suffix: key.suffix };
  }

  function compareHardwareItems(a, b) {
    const categoryA = hardwareCategories.indexOf(a.category);
    const categoryB = hardwareCategories.indexOf(b.category);
    const categoryDifference = (categoryA < 0 ? hardwareCategories.length : categoryA) -
      (categoryB < 0 ? hardwareCategories.length : categoryB);
    if (categoryDifference) return categoryDifference;
    if (a.category === 'gpus' && b.category === 'gpus') {
      const gpuA = getHardwareGpuSortKey(a);
      const gpuB = getHardwareGpuSortKey(b);
      const gpuDifference = gpuA.tier - gpuB.tier || gpuB.model - gpuA.model || gpuB.suffix - gpuA.suffix;
      if (gpuDifference) return gpuDifference;
    }
    return a.title.localeCompare(b.title, 'en', { numeric: true, sensitivity: 'base' }) ||
      String(a.id).localeCompare(String(b.id), 'en', { numeric: true });
  }

  function matchesHardwareFilters(item, query, category = 'all') {
    if (category !== 'all' && item.category !== category) return false;
    const normalize = value => String(value || '').toLocaleLowerCase().replace(/\s+/g, ' ').trim();
    const words = normalize(query).split(' ').filter(Boolean);
    const searchable = normalize([item.title, item.saleText, item.description, item.category, getHardwareCategoryLabel(item.category)].filter(Boolean).join(' '));
    return words.every(word => searchable.includes(word));
  }

  function getFeaturedHardwareItems(items, featuredIds) {
    const byId = new Map(items.map(item => [item.id, item]));
    return [...new Set(featuredIds)].map(id => byId.get(id)).filter(Boolean);
  }

  // Small, pure helpers are exposed for the repository's data regression checks.
  window.BOBER_UTILS = { encodeImagePath, getWebpPath, getGpuTier, getPCGpuCategory, isLegacyCPU, isPCBuildRecord, getGpuSortKey, compareSoldBuilds, parseBuildSummary,
    getHardwareCategoryLabel, getHardwareGpuSortKey, compareHardwareItems, matchesHardwareFilters, getFeaturedHardwareItems };

  function element(tag, className, text) {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (text !== undefined) node.textContent = text;
    return node;
  }

  function arrow() {
    const node = element('span', 'arrow', '↗');
    node.setAttribute('aria-hidden', 'true');
    return node;
  }

  function image(path, alt, className = '') {
    const node = element('img', className);
    node.src = path;
    node.alt = alt;
    node.loading = 'lazy';
    node.decoding = 'async';
    return node;
  }

  const featuredOrder = [1, 2, 0, ...data.featuredBuilds.map((_, index) => index).filter(index => ![1, 2, 0].includes(index))];
  let navigationFramePending = false;
  let visibleHardwareArchive = 12;
  let visibleArchive = 12;
  let activeBuild = null;
  let activeImage = 0;
  let previousOverflow = '';
  const dialogOpeners = new WeakMap();
  const soldBuilds = data.soldBuilds.filter(isPCBuildRecord).sort(compareSoldBuilds);
  const hardwareItems = [...(data.hardwareItems || [])].sort(compareHardwareItems);
  const featuredHardware = getFeaturedHardwareItems(data.hardwareItems || [], data.featuredHardwareIds || []);

  function renderFeatured() {
    const grid = document.getElementById('featured-grid');
    if (!grid) return;
    const fragment = document.createDocumentFragment();
    featuredOrder.forEach(index => {
      const build = data.featuredBuilds[index];
      const summary = parseBuildSummary(build);
      const card = element('article', 'build-card');
      const button = element('button', 'build-open');
      button.type = 'button';
      button.dataset.build = index;
      button.setAttribute('aria-label', `View full specifications and photographs: ${build.title}, ${build.price}`);
      const photo = element('span', 'build-photo');
      const cardPhoto = index === 0 ? build.images.find(path => /_SIDE\.png$/i.test(path)) || build.images[0] : build.images[0];
      photo.append(image(getWebpPath(cardPhoto), build.title));
      const body = element('span', 'build-body');
      const heading = element('span', 'build-heading');
      heading.append(element('span', 'build-name', summary.gpu), element('span', 'build-price', build.price));
      const footer = element('span', 'build-bottom');
      footer.append(element('span', '', 'Specs & photos'), arrow());
      body.append(heading,
        element('span', 'build-cpu', summary.cpu),
        element('span', 'build-specs', [summary.ram, summary.storage].filter(Boolean).join(' · ')), footer);
      button.append(photo, body);
      card.append(button);
      fragment.append(card);
    });
    grid.replaceChildren(fragment);
    queueNavigationUpdate();
  }

  function initHeroCarousel() {
    const container = document.getElementById('hero-slides');
    const items = data.heroCloseups || [];
    if (!container || !items.length) return;
    const previous = document.getElementById('hero-prev');
    const next = document.getElementById('hero-next');
    const pause = document.getElementById('hero-pause');
    const position = document.getElementById('hero-position');
    const dots = document.getElementById('hero-dots');
    const pauseSymbol = element('span', 'hero-pause-symbol');
    pauseSymbol.setAttribute('aria-hidden', 'true');
    pause?.replaceChildren(pauseSymbol);
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const slides = [];
    const images = [];
    const dotButtons = [];
    const loaded = new Set();
    let current = 0;
    let userPaused = false;
    let inView = true;
    let timer = null;

    container.setAttribute('aria-roledescription', 'carousel');
    container.setAttribute('aria-label', 'Close-up photographs of our PC builds');
    container.setAttribute('aria-live', 'off');
    container.replaceChildren();
    dots?.replaceChildren();
    items.forEach((item, index) => {
      const slide = element('figure', 'hero-slide');
      slide.id = `hero-slide-${index + 1}`;
      slide.setAttribute('role', 'group');
      slide.setAttribute('aria-roledescription', 'slide');
      slide.setAttribute('aria-label', `${index + 1} of ${items.length}`);
      const img = element('img', 'hero-slide-image');
      img.alt = item.alt;
      img.width = 1440;
      img.height = 1080;
      img.decoding = 'async';
      img.loading = index === 0 ? 'eager' : 'lazy';
      if (index === 0) img.fetchPriority = 'high';
      img.dataset.src = encodeImagePath(item.fullImage);
      img.style.objectFit = 'contain';
      slide.append(img);
      container.append(slide);
      slides.push(slide);
      images.push(img);
      if (dots) {
        const dot = element('button', 'hero-dot');
        dot.type = 'button';
        dot.setAttribute('aria-label', `Show photograph ${index + 1}: ${item.caption}`);
        dot.setAttribute('aria-controls', slide.id);
        dot.addEventListener('click', () => goTo(index, true));
        dots.append(dot);
        dotButtons.push(dot);
      }
    });

    function loadImage(index, active = false) {
      if (active) images[index].loading = 'eager';
      if (loaded.has(index)) return;
      images[index].src = images[index].dataset.src;
      loaded.add(index);
    }

    function updatePauseControl() {
      if (!pause) return;
      const reduced = reducedMotion.matches;
      pause.disabled = reduced || items.length < 2;
      pauseSymbol.textContent = userPaused || reduced ? '▶' : 'Ⅱ';
      pause.setAttribute('aria-pressed', String(userPaused || reduced));
      pause.setAttribute('aria-label', reduced ? 'Automatic slideshow disabled for reduced motion' : userPaused ? 'Play slideshow' : 'Pause slideshow');
    }

    function schedule() {
      window.clearTimeout(timer);
      timer = null;
      if (items.length > 1 && !userPaused && !reducedMotion.matches && !document.hidden && inView) {
        timer = window.setTimeout(() => goTo(current + 1), 6000);
      }
    }

    function goTo(index, manual = false) {
      current = (index + items.length) % items.length;
      loadImage(current, true);
      // Warm just the next photograph; the remaining originals never load here.
      loadImage((current + 1) % items.length);
      slides.forEach((slide, slideIndex) => {
        const active = slideIndex === current;
        slide.classList.toggle('is-active', active);
        slide.setAttribute('aria-hidden', String(!active));
      });
      dotButtons.forEach((dot, dotIndex) => {
        const active = dotIndex === current;
        dot.classList.toggle('is-active', active);
        dot.setAttribute('aria-pressed', String(active));
      });
      if (position) {
        position.setAttribute('aria-live', manual ? 'polite' : 'off');
        position.setAttribute('aria-label', `Photograph ${current + 1} of ${items.length}`);
        position.textContent = `${String(current + 1).padStart(2, '0')} / ${String(items.length).padStart(2, '0')}`;
      }
      schedule();
    }

    previous?.addEventListener('click', () => goTo(current - 1, true));
    next?.addEventListener('click', () => goTo(current + 1, true));
    [previous, next, pause].filter(Boolean).forEach(control => control.setAttribute('aria-controls', 'hero-slides'));
    if (previous) previous.disabled = items.length < 2;
    if (next) next.disabled = items.length < 2;
    pause?.addEventListener('click', () => {
      if (reducedMotion.matches) return;
      userPaused = !userPaused;
      updatePauseControl();
      schedule();
    });
    reducedMotion.addEventListener('change', () => { updatePauseControl(); schedule(); });
    document.addEventListener('visibilitychange', schedule);
    if ('IntersectionObserver' in window) {
      const observer = new window.IntersectionObserver(entries => {
        inView = entries.some(entry => entry.isIntersecting);
        schedule();
      }, { threshold: 0.1 });
      observer.observe(container);
    }
    window.addEventListener('pagehide', () => window.clearTimeout(timer));
    updatePauseControl();
    goTo(0);
  }

  function reviewMeta(review) {
    const meta = element('figcaption', 'review-meta');
    meta.append(element('span', 'review-author', review.user));
    if (review.date) {
      const date = element('time', 'review-date', review.date);
      const parsed = new Date(review.date);
      if (!Number.isNaN(parsed.valueOf())) date.dateTime = parsed.toISOString().slice(0, 10);
      meta.append(date);
    }
    return meta;
  }

  function renderFeaturedReviews() {
    const container = document.getElementById('featured-reviews-list');
    if (!container) return;
    const fragment = document.createDocumentFragment();
    data.featuredReviews.forEach((review, index) => {
      const card = element('figure', `review-card${index === 0 ? ' review-featured' : ''}`);
      card.append(element('blockquote', 'review-quote', review.text), reviewMeta(review));
      fragment.append(card);
    });
    container.replaceChildren(fragment);
    queueNavigationUpdate();
  }

  function syncFilterPills(containerId, attribute, value) {
    document.getElementById(containerId)?.querySelectorAll(`[${attribute}]`).forEach(button => {
      const active = button.getAttribute(attribute) === value;
      button.setAttribute('aria-pressed', String(active));
      button.classList.toggle('is-active', active);
    });
  }

  function bindFilterPills(containerId, attribute, selectId, render) {
    const container = document.getElementById(containerId);
    container?.addEventListener('click', event => {
      const button = event.target.closest(`[${attribute}]`);
      if (!button || !container.contains(button)) return;
      document.getElementById(selectId).value = button.getAttribute(attribute);
      render();
    });
  }

  function updateCurrentNavigation() {
    const links = [...document.querySelectorAll('#nav-links a')];
    if (!links.length) return;
    const header = document.getElementById('navbar');
    const headerHeight = header?.getBoundingClientRect().height || 0;
    const viewportHeight = window.innerHeight || document.documentElement.clientHeight || 800;
    const marker = headerHeight + Math.min(viewportHeight * 0.25, 200);
    const sectionIds = ['hero', 'store-bar', 'featured', 'testimonials', 'refurbished', 'archive', 'refurb-archive'];
    const landmarks = sectionIds.map(id => {
      const section = document.getElementById(id);
      if (!section || section.hidden || section.getClientRects().length === 0 || window.getComputedStyle(section).visibility !== 'visible') return null;
      return { id, top: section.getBoundingClientRect().top };
    }).filter(Boolean).sort((a, b) => a.top - b.top);
    let current = null;
    for (const landmark of landmarks) {
      if (landmark.top > marker) break;
      current = landmark.id === 'hero' ? null : landmark.id;
    }
    const selected = links.find(link => link.getAttribute('href') === `#${current}`);
    links.forEach(link => {
      const active = link === selected;
      link.classList.toggle('is-current', active);
      if (active) link.setAttribute('aria-current', 'location');
      else link.removeAttribute('aria-current');
    });
  }

  function queueNavigationUpdate() {
    if (navigationFramePending) return;
    navigationFramePending = true;
    const update = () => { navigationFramePending = false; updateCurrentNavigation(); };
    if (typeof window.requestAnimationFrame === 'function') window.requestAnimationFrame(update);
    else update();
  }

  function createHardwareCard(item, archived = false) {
    const card = element('article', `hardware-card${archived ? ' hardware-archive-card' : ''}`);
    const button = element('button', 'hardware-open');
    button.type = 'button';
    button.dataset.hardwareId = item.id;
    button.dataset.photo = encodeImagePath(item.fullImage);
    button.dataset.caption = [item.title, item.saleText, item.description].filter(Boolean).join('\n');
    button.dataset.original = encodeImagePath(item.images[0]);
    button.setAttribute('aria-label', `Enlarge hardware photograph: ${item.title}. ${item.saleText}`);
    const photo = element('span', 'hardware-photo');
    const img = image(encodeImagePath(item.thumbnail), item.title);
    img.width = 640;
    img.height = 480;
    img.style.objectFit = 'contain';
    photo.append(img);
    const body = element('span', 'hardware-body');
    body.append(element('span', 'hardware-category', getHardwareCategoryLabel(item.category)),
      element('span', 'hardware-title', item.title), element('span', 'hardware-sale', item.saleText));
    if (!archived) body.append(element('span', 'hardware-bottom', 'View photograph'));
    button.append(photo, body);
    card.append(button);
    return card;
  }

  function renderFeaturedHardware() {
    const grid = document.getElementById('refurb-grid');
    if (!grid) return;
    const fragment = document.createDocumentFragment();
    featuredHardware.forEach(item => fragment.append(createHardwareCard(item)));
    grid.replaceChildren(fragment);
    queueNavigationUpdate();
  }

  function filteredHardwareArchive() {
    const query = document.getElementById('hardware-search')?.value || '';
    const category = document.getElementById('hardware-filter')?.value || 'all';
    return hardwareItems.filter(item => matchesHardwareFilters(item, query, category));
  }

  function renderHardwareArchive() {
    const list = document.getElementById('hardware-archive-list');
    if (!list) return;
    const filtered = filteredHardwareArchive();
    syncFilterPills('hardware-filter-tabs', 'data-hardware-filter', document.getElementById('hardware-filter')?.value || 'all');
    const fragment = document.createDocumentFragment();
    filtered.slice(0, visibleHardwareArchive).forEach(item => fragment.append(createHardwareCard(item, true)));
    list.replaceChildren(fragment);
    const empty = document.getElementById('hardware-empty');
    if (empty) empty.hidden = filtered.length !== 0;
    const remaining = Math.max(0, filtered.length - visibleHardwareArchive);
    const context = document.getElementById('hardware-load-context');
    if (context) {
      context.setAttribute('role', 'status');
      context.setAttribute('aria-live', 'polite');
      context.hidden = !filtered.length;
      context.textContent = 'A curated selection of hardware sales. Some older listings were unavailable when this site was created.';
    }
    const more = document.getElementById('hardware-load-more');
    if (more) {
      more.hidden = !remaining;
      more.disabled = !remaining;
      more.textContent = 'Show all hardware sales';
      more.setAttribute('aria-controls', 'hardware-archive-list');
    }
    queueNavigationUpdate();
  }

  function filteredArchive() {
    const query = (document.getElementById('archive-search')?.value || '').trim().toLocaleLowerCase().replace(/\s+/g, ' ');
    const filter = document.getElementById('archive-filter')?.value || 'all';
    return soldBuilds.filter(build => {
      const matchesText = !query || build.title.toLocaleLowerCase().replace(/\s+/g, ' ').includes(query);
      const matchesFilter = filter === 'all' || (!isLegacyCPU(build) && getPCGpuCategory(build) === filter);
      return matchesText && matchesFilter;
    });
  }

  function renderArchive() {
    const list = document.getElementById('archive-list');
    if (!list) return;
    const filtered = filteredArchive();
    syncFilterPills('pc-filter-tabs', 'data-pc-filter', document.getElementById('archive-filter')?.value || 'all');
    const fragment = document.createDocumentFragment();
    filtered.slice(0, visibleArchive).forEach(build => {
      const card = element('article', 'archive-card');
      const button = element('button', 'archive-open');
      button.type = 'button';
      button.dataset.photo = getWebpPath(build.image, 'full');
      button.dataset.caption = build.title;
      button.dataset.original = encodeImagePath(build.image);
      button.setAttribute('aria-label', `Enlarge sold build photograph: ${build.title}`);
      const photo = element('span', 'archive-photo');
      const img = image(getWebpPath(build.image), build.title);
      // Archive photographs always retain their entire original composition.
      img.style.objectFit = 'contain';
      photo.append(img);
      const copy = element('span', 'archive-copy');
      copy.append(element('span', 'archive-title', build.title));
      button.append(photo, copy);
      card.append(button);
      fragment.append(card);
    });
    list.replaceChildren(fragment);
    const empty = document.getElementById('archive-empty');
    if (empty) empty.hidden = filtered.length !== 0;
    const remaining = Math.max(0, filtered.length - visibleArchive);
    const context = document.getElementById('archive-load-context');
    if (context) {
      context.setAttribute('role', 'status');
      context.setAttribute('aria-live', 'polite');
      context.hidden = !filtered.length;
      context.textContent = 'A curated selection of past PC sales. Some older listings were unavailable when this site was created.';
    }
    const more = document.getElementById('archive-load-more');
    if (more) {
      more.hidden = !remaining;
      more.disabled = !remaining;
      more.textContent = 'Show all archived PCs';
      more.setAttribute('aria-controls', 'archive-list');
    }
    queueNavigationUpdate();
  }

  function closeMenu(returnFocus = false) {
    const toggle = document.getElementById('menu-toggle');
    const navigation = document.getElementById('nav-links');
    toggle?.setAttribute('aria-expanded', 'false');
    toggle?.setAttribute('aria-label', 'Open navigation');
    navigation?.classList.remove('is-open');
    if (returnFocus === true) toggle?.focus({ preventScroll: true });
  }

  function openDialog(dialog, opener) {
    if (!dialog || dialog.open) return;
    closeMenu();
    dialogOpeners.set(dialog, opener || document.activeElement);
    if (!document.querySelector('dialog[open]')) {
      previousOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
    }
    dialog.showModal();
    dialog.querySelector('[data-dialog-close]')?.focus({ preventScroll: true });
  }

  function angleLabel(path, index) {
    if (/_FRONT\.png$/i.test(path)) return 'Front';
    if (/_SIDE2\.png$/i.test(path)) return 'Second side angle';
    if (/_SIDE\.png$/i.test(path)) return 'Side';
    if (/_BACK\.png$/i.test(path)) return 'Back';
    return `View ${index + 1}`;
  }

  function setProductImage(index) {
    if (!activeBuild) return;
    activeImage = (index + activeBuild.images.length) % activeBuild.images.length;
    const path = activeBuild.images[activeImage];
    const main = document.getElementById('modal-main-img');
    main.src = getWebpPath(path, 'full');
    main.alt = `${activeBuild.title} — ${angleLabel(path, activeImage)}`;
    document.getElementById('modal-counter').textContent = `${activeImage + 1} / ${activeBuild.images.length}`;
    document.getElementById('modal-original').href = encodeImagePath(path);
    document.querySelectorAll('#modal-thumbs .thumb-btn').forEach((button, imageIndex) => {
      const selected = imageIndex === activeImage;
      button.classList.toggle('is-active', selected);
      button.setAttribute('aria-pressed', String(selected));
    });
  }

  function openProduct(index, opener) {
    const build = data.featuredBuilds[index];
    const dialog = document.getElementById('product-dialog');
    if (!build || !dialog) return;
    activeBuild = build;
    activeImage = 0;
    document.getElementById('modal-subtitle').textContent = `Featured past build · ${parseBuildSummary(build).descriptor}`;
    document.getElementById('modal-title').textContent = build.title;
    document.getElementById('modal-price').textContent = build.price;
    document.getElementById('modal-desc').textContent = build.description;
    const components = document.getElementById('modal-comps');
    components.replaceChildren();
    build.components.forEach(component => {
      const colon = component.indexOf(':');
      const row = element('div', 'modal-spec-row');
      const name = colon < 0 ? 'Specification' : component.slice(0, colon).trim();
      const value = colon < 0 ? component : component.slice(colon + 1).trim();
      row.append(element('dt', 'modal-spec-key', name), element('dd', 'modal-spec-val', value));
      components.append(row);
    });
    const thumbnails = document.getElementById('modal-thumbs');
    thumbnails.replaceChildren();
    build.images.forEach((path, imageIndex) => {
      const label = angleLabel(path, imageIndex);
      const button = element('button', 'thumb-btn');
      button.type = 'button';
      button.setAttribute('aria-label', `Show ${label.toLowerCase()} photograph`);
      button.append(image(getWebpPath(path), ''), element('span', '', label));
      button.addEventListener('click', () => setProductImage(imageIndex));
      thumbnails.append(button);
    });
    setProductImage(0);
    openDialog(dialog, opener);
  }

  function openPhoto(button) {
    const dialog = document.getElementById('photo-dialog');
    if (!dialog) return;
    const main = document.getElementById('photo-main-img');
    main.src = button.dataset.photo;
    main.alt = button.dataset.caption || button.querySelector('img')?.alt || 'Bober Electronics build photograph';
    const caption = document.getElementById('photo-caption');
    caption.textContent = main.alt;
    caption.classList.toggle('sr-only', button.classList.contains('editorial-photo') || button.dataset.imageOnly === 'true');
    const original = document.getElementById('photo-original');
    original.href = button.dataset.original || button.dataset.photo;
    openDialog(dialog, button);
  }

  function bindDialog(dialog, closeButton) {
    if (!dialog) return;
    closeButton?.setAttribute('data-dialog-close', '');
    closeButton?.addEventListener('click', () => dialog.close());
    // Native modal inertness blocks the page behind the dialog. Explicitly wrap
    // Tab as well, keeping keyboard navigation out of the browser chrome.
    document.addEventListener('keydown', event => {
      if (!dialog.open || event.key !== 'Tab') return;
      const openDialogs = [...document.querySelectorAll('dialog[open]')];
      if (openDialogs[openDialogs.length - 1] !== dialog) return;
      const focusable = [...dialog.querySelectorAll('a[href], button, input, select, textarea, summary, [tabindex]')]
        .filter(node => node.tabIndex >= 0 && !node.disabled && !node.closest('[hidden], [inert], [aria-hidden="true"]') &&
          node.getClientRects().length > 0 && window.getComputedStyle(node).visibility === 'visible');
      if (!focusable.length) { event.preventDefault(); return; }
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      const active = document.activeElement;
      const outside = !dialog.contains(active) || active === dialog;
      if (event.shiftKey && (active === first || outside)) {
        event.preventDefault();
        last.focus({ preventScroll: true });
      } else if (!event.shiftKey && (active === last || outside)) {
        event.preventDefault();
        first.focus({ preventScroll: true });
      }
    });
    dialog.addEventListener('click', event => {
      if (event.target !== dialog) return;
      const rect = dialog.getBoundingClientRect();
      if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) dialog.close();
    });
    dialog.addEventListener('close', () => {
      if (!document.querySelector('dialog[open]')) document.body.style.overflow = previousOverflow;
      const opener = dialogOpeners.get(dialog);
      if (opener?.isConnected) opener.focus({ preventScroll: true });
    });
  }

  function bindGallerySwipe() {
    const main = document.getElementById('modal-main-img');
    if (!main) return;
    let gesture = null;
    main.draggable = false;
    main.addEventListener('pointerdown', event => {
      if (event.pointerType === 'mouse' || !event.isPrimary) return;
      gesture = { x: event.clientX, y: event.clientY };
      main.setPointerCapture(event.pointerId);
    });
    main.addEventListener('pointerup', event => {
      if (!gesture) return;
      const dx = event.clientX - gesture.x;
      const dy = event.clientY - gesture.y;
      gesture = null;
      if (Math.abs(dx) >= 48 && Math.abs(dx) > Math.abs(dy) * 1.3) setProductImage(activeImage + (dx < 0 ? 1 : -1));
    });
    main.addEventListener('pointercancel', () => { gesture = null; });
  }

  function init() {
    initHeroCarousel();
    renderFeatured();
    renderFeaturedReviews();
    renderFeaturedHardware();
    renderHardwareArchive();
    renderArchive();

    document.addEventListener('click', event => {
      const storeLink = event.target.closest('.dialog-store-link');
      if (storeLink) {
        const destination = document.getElementById(storeLink.getAttribute('href').slice(1));
        const dialog = storeLink.closest('dialog');
        if (destination && dialog) {
          event.preventDefault();
          const heading = document.getElementById(destination.getAttribute('aria-labelledby')) || destination;
          heading.tabIndex = -1;
          dialogOpeners.set(dialog, heading);
          dialog.close();
          destination.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth', block: 'start' });
        }
        return;
      }
      const build = event.target.closest('[data-build]');
      if (build) { openProduct(Number(build.dataset.build), build); return; }
      const photo = event.target.closest('[data-photo]');
      if (photo) openPhoto(photo);
    });
    document.getElementById('hardware-load-more')?.addEventListener('click', () => {
      const previousCount = Math.min(visibleHardwareArchive, filteredHardwareArchive().length);
      visibleHardwareArchive = filteredHardwareArchive().length;
      renderHardwareArchive();
      if (document.getElementById('hardware-load-more').hidden) {
        document.getElementById('hardware-archive-list').children[previousCount]?.querySelector('button')?.focus({ preventScroll: true });
      }
    });
    ['hardware-search', 'hardware-filter'].forEach(id => {
      document.getElementById(id)?.addEventListener(id === 'hardware-search' ? 'input' : 'change', () => {
        visibleHardwareArchive = 12;
        renderHardwareArchive();
      });
    });
    document.getElementById('hardware-reset')?.addEventListener('click', () => {
      document.getElementById('hardware-search').value = '';
      document.getElementById('hardware-filter').value = 'all';
      visibleHardwareArchive = 12;
      renderHardwareArchive();
      document.getElementById('hardware-search').focus();
    });
    document.getElementById('archive-load-more')?.addEventListener('click', () => {
      const previousCount = Math.min(visibleArchive, filteredArchive().length);
      visibleArchive = filteredArchive().length;
      renderArchive();
      if (document.getElementById('archive-load-more').hidden) {
        document.getElementById('archive-list').children[previousCount]?.querySelector('button')?.focus({ preventScroll: true });
      }
    });
    ['archive-search', 'archive-filter'].forEach(id => {
      document.getElementById(id)?.addEventListener(id === 'archive-search' ? 'input' : 'change', () => {
        visibleArchive = 12;
        renderArchive();
      });
    });
    document.getElementById('archive-reset')?.addEventListener('click', () => {
      document.getElementById('archive-search').value = '';
      document.getElementById('archive-filter').value = 'all';
      visibleArchive = 12;
      renderArchive();
      document.getElementById('archive-search').focus();
    });
    bindFilterPills('pc-filter-tabs', 'data-pc-filter', 'archive-filter', () => {
      visibleArchive = 12;
      renderArchive();
    });
    bindFilterPills('hardware-filter-tabs', 'data-hardware-filter', 'hardware-filter', () => {
      visibleHardwareArchive = 12;
      renderHardwareArchive();
    });

    const productDialog = document.getElementById('product-dialog');
    bindDialog(productDialog, document.getElementById('modal-close'));
    bindDialog(document.getElementById('photo-dialog'), document.getElementById('photo-close'));
    document.getElementById('modal-prev')?.addEventListener('click', () => setProductImage(activeImage - 1));
    document.getElementById('modal-next')?.addEventListener('click', () => setProductImage(activeImage + 1));
    bindGallerySwipe();
    document.addEventListener('keydown', event => {
      if (event.key === 'Escape') {
        const menuOpen = document.getElementById('menu-toggle')?.getAttribute('aria-expanded') === 'true';
        closeMenu(menuOpen);
      }
      if (!productDialog?.open) return;
      if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
        event.preventDefault();
        setProductImage(activeImage + (event.key === 'ArrowLeft' ? -1 : 1));
      }
    });

    document.getElementById('menu-toggle')?.addEventListener('click', () => {
      const navigation = document.getElementById('nav-links');
      const open = navigation?.classList.toggle('is-open') || false;
      document.getElementById('menu-toggle').setAttribute('aria-expanded', String(open));
      document.getElementById('menu-toggle').setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
    });
    document.querySelectorAll('#nav-links a').forEach(link => link.addEventListener('click', closeMenu));
    window.matchMedia('(min-width: 1001px)').addEventListener('change', event => { if (event.matches) closeMenu(); });
    window.addEventListener('scroll', queueNavigationUpdate, { passive: true });
    window.addEventListener('resize', queueNavigationUpdate);
    window.addEventListener('load', queueNavigationUpdate);
    document.fonts?.ready.then(queueNavigationUpdate);
    queueNavigationUpdate();
    const header = document.getElementById('navbar') || document.querySelector('.site-header');
    if (header) {
      const updateHeader = () => header.classList.toggle('is-scrolled', window.scrollY > 24);
      updateHeader();
      window.addEventListener('scroll', updateHeader, { passive: true });
    }
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init, { once: true });
  else init();
})();
