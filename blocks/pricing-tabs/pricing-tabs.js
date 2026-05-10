/**
 * Pricing Tabs Block — AEM Edge Delivery Services
 *
 * Model: xwalk (EDS + Universal Editor)
 *
 * Structure:
 * - Block-level fields: heading, tab1-tab4 (fixed tabs), bannerText, bannerImage, footerText
 * - Items (rows with data-aue-resource): pricing cards with tabCategory, cardInfo, cardPrice, etc.
 * - Config rows (no picture, no data-aue-resource): hidden, contain block-level field values
 *
 * Tab switching filters cards by their tabCategory field value (stored in a hidden cell).
 *
 * @param {Element} block - Root element of the block
 */
export default function decorate(block) {
  const rows = [...block.children];
  if (rows.length < 1) return;

  // --- 1. CLASSIFY ROWS ---
  // Card rows have multiple cols (tariff info cells); config rows are single-col block fields
  const cardRows = [];
  const configRows = [];

  rows.forEach((row) => {
    const cols = [...row.children];
    // Card items from UE always come as rows with item data; they typically have
    // multiple columns. Config rows for block-level fields are single-col.
    // Heuristic: card rows have >=2 children OR contain structured pricing content
    if (cols.length >= 2) {
      cardRows.push(row);
    } else {
      configRows.push(row);
      row.classList.add('pricing-tabs-config');
    }
  });

  // --- 2. EXTRACT CONFIG VALUES ---
  // Block-level fields: heading, tab1-4, bannerText, bannerImage, footerText
  let headingText = '';
  const tabLabels = [];
  let bannerHTML = '';
  let bannerImgRow = null;
  let footerHTML = '';

  configRows.forEach((row) => {
    const h2 = row.querySelector('h2');
    if (h2) {
      headingText = h2.textContent.trim();
      return;
    }
    const pic = row.querySelector('picture');
    if (pic) {
      bannerImgRow = row;
      return;
    }
    const text = row.textContent.trim();
    if (!text) return;
    // Try to detect footer vs tab labels vs banner
    // Tab labels are short single words/phrases; banner has longer rich content
    if (text.length < 40 && tabLabels.length < 4) {
      tabLabels.push(text);
    } else if (!bannerHTML) {
      bannerHTML = row.innerHTML;
    } else {
      footerHTML = row.innerHTML;
    }
  });

  // Default tab labels if none extracted
  const defaultTabs = ['Fibra y Móvil', 'Fibra, Móvil y TV', 'Móvil', 'Fibra'];
  while (tabLabels.length < 4) tabLabels.push(defaultTabs[tabLabels.length]);

  // --- 3. BUILD TITLE ---
  const titleDiv = document.createElement('div');
  titleDiv.classList.add('pricing-tabs-title-row');
  if (headingText) {
    const h2 = document.createElement('h2');
    h2.classList.add('pricing-tabs-title');
    h2.textContent = headingText;
    titleDiv.appendChild(h2);
  }

  // --- 4. BUILD TABLIST ---
  const tablistContainer = document.createElement('div');
  tablistContainer.classList.add('pricing-tabs-tablist-container');

  const tablist = document.createElement('div');
  tablist.classList.add('pricing-tabs-tablist');
  tablist.setAttribute('role', 'tablist');
  tablist.setAttribute('aria-label', 'Categorías de tarifas');

  const tabs = [];
  const tabKeys = ['tab1', 'tab2', 'tab3', 'tab4'];

  tabLabels.forEach((label, i) => {
    const btn = document.createElement('button');
    btn.classList.add('pricing-tabs-tab');
    btn.setAttribute('role', 'tab');
    btn.setAttribute('aria-selected', i === 0 ? 'true' : 'false');
    btn.setAttribute('tabindex', i === 0 ? '0' : '-1');
    btn.setAttribute('id', `pricing-tab-${i}`);
    btn.setAttribute('aria-controls', 'pricing-tabs-panel');
    btn.dataset.tabKey = tabKeys[i];
    btn.textContent = label;
    if (i === 0) btn.classList.add('pricing-tabs-tab-active');
    tablist.appendChild(btn);
    tabs.push(btn);
  });

  tablistContainer.appendChild(tablist);

  // --- 5. PROCESS CARD ROWS ---
  const cardsGrid = document.createElement('div');
  cardsGrid.classList.add('pricing-tabs-cards');
  cardsGrid.setAttribute('role', 'tabpanel');
  cardsGrid.setAttribute('id', 'pricing-tabs-panel');
  cardsGrid.setAttribute('aria-labelledby', 'pricing-tab-0');

  cardRows.forEach((row) => {
    row.classList.add('pricing-tabs-card');
    const cols = [...row.children];

    // Map cells by model field order (after collapsible field merging):
    // 0: tabCategory, 1: cardInfo, 2: cardPrice, 3: cardPriceNote,
    // 4: cardBadge (picture), 5: cardCtaPrimary (link), 6: cardCtaSecondary
    let category = 'tab1';
    const cellData = {
      info: null, price: null, note: null, badge: null, ctas: [],
    };

    cols.forEach((col) => {
      const text = col.textContent.trim();
      const pic = col.querySelector('picture');
      const link = col.querySelector('a');

      if (tabKeys.includes(text)) {
        category = text;
        col.classList.add('pricing-tabs-card-meta');
      } else if (pic) {
        cellData.badge = col;
      } else if (link) {
        cellData.ctas.push(col);
      } else if (!cellData.info) {
        cellData.info = col;
      } else if (!cellData.price) {
        cellData.price = col;
      } else if (!cellData.note) {
        cellData.note = col;
      } else {
        // Extra text cells might be CTA text without <a> wrapping
        cellData.ctas.push(col);
      }
    });

    row.dataset.tabCategory = category;

    // Build structured card layout
    // -- Top section: info + price side by side --
    const topSection = document.createElement('div');
    topSection.classList.add('pricing-tabs-card-top');

    if (cellData.info) {
      cellData.info.classList.add('pricing-tabs-card-info');
      cellData.info.querySelectorAll('h3, strong, b').forEach((el) => {
        el.closest('div')?.classList.add('pricing-tabs-card-info');
      });
      topSection.appendChild(cellData.info);
    }

    const priceWrap = document.createElement('div');
    priceWrap.classList.add('pricing-tabs-card-price');
    if (cellData.price) {
      const priceText = cellData.price.textContent.trim();
      const priceEl = document.createElement('span');
      priceEl.classList.add('pricing-tabs-card-price-value');
      priceEl.textContent = priceText;
      priceWrap.appendChild(priceEl);
    }
    if (cellData.note) {
      const noteEl = document.createElement('span');
      noteEl.classList.add('pricing-tabs-card-price-note');
      noteEl.textContent = cellData.note.textContent.trim();
      priceWrap.appendChild(noteEl);
      cellData.note.classList.add('pricing-tabs-card-meta');
    }
    topSection.appendChild(priceWrap);
    if (cellData.price) cellData.price.classList.add('pricing-tabs-card-meta');

    // -- Badge --
    if (cellData.badge) {
      cellData.badge.classList.add('pricing-tabs-card-badge');
      const img = cellData.badge.querySelector('img');
      if (img) {
        img.setAttribute('loading', 'lazy');
        img.setAttribute('decoding', 'async');
      }
    }

    // -- Actions: build CTA buttons --
    const actionsDiv = document.createElement('div');
    actionsDiv.classList.add('pricing-tabs-card-actions');

    cellData.ctas.forEach((col, idx) => {
      let link = col.querySelector('a');
      if (!link) {
        // Wrap plain text as an anchor
        link = document.createElement('a');
        link.href = '#';
        link.textContent = col.textContent.trim();
      }
      link.classList.add('pricing-tabs-cta');
      if (idx === 0) {
        link.classList.add('pricing-tabs-cta-primary');
      } else {
        link.classList.add('pricing-tabs-cta-secondary');
      }
      actionsDiv.appendChild(link);
      col.classList.add('pricing-tabs-card-meta');
    });

    // Clear row and rebuild
    while (row.firstChild) row.removeChild(row.firstChild);
    row.appendChild(topSection);
    if (cellData.badge) row.appendChild(cellData.badge);
    if (actionsDiv.children.length) row.appendChild(actionsDiv);

    cardsGrid.appendChild(row);
  });

  // --- 6. BUILD BANNER ---
  const bannerDiv = document.createElement('div');
  bannerDiv.classList.add('pricing-tabs-banner');
  if (bannerHTML) {
    const bannerContent = document.createElement('div');
    bannerContent.classList.add('pricing-tabs-banner-content');
    bannerContent.innerHTML = bannerHTML;
    bannerDiv.appendChild(bannerContent);
  }
  if (bannerImgRow) {
    const pic = bannerImgRow.querySelector('picture');
    if (pic) {
      pic.classList.add('pricing-tabs-banner-image');
      const img = pic.querySelector('img');
      if (img) {
        img.setAttribute('loading', 'lazy');
        img.setAttribute('decoding', 'async');
      }
      bannerDiv.appendChild(pic);
    }
  }

  // --- 7. BUILD FOOTER ---
  const footerDiv = document.createElement('div');
  footerDiv.classList.add('pricing-tabs-footer');
  if (footerHTML) {
    footerDiv.innerHTML = footerHTML;
  }

  // --- 8. ASSEMBLE DOM ---
  // Clear block and rebuild
  const fragment = document.createDocumentFragment();
  fragment.appendChild(titleDiv);
  fragment.appendChild(tablistContainer);
  fragment.appendChild(cardsGrid);
  if (bannerHTML || bannerImgRow) fragment.appendChild(bannerDiv);
  if (footerHTML) fragment.appendChild(footerDiv);

  // Hide config rows but keep in DOM for UE
  configRows.forEach((r) => { r.hidden = true; });

  block.appendChild(fragment);

  // --- 9. IMAGES — all lazy ---
  block.querySelectorAll('picture img').forEach((img) => {
    img.setAttribute('loading', 'lazy');
    img.setAttribute('decoding', 'async');
  });

  // --- 10. UE INSTRUMENTATION (xwalk) ---
  block.dataset.aueType = 'component';
  block.dataset.aueModel = 'pricing-tabs';
  block.dataset.aueLabel = 'Pricing Tabs';

  const titleH2 = block.querySelector('.pricing-tabs-title');
  if (titleH2) {
    titleH2.dataset.aueProp = 'heading';
    titleH2.dataset.aueType = 'text';
    titleH2.dataset.aueLabel = 'Título de sección';
  }

  // Cards container (items repetibles)
  if (block.dataset.aueResource) {
    cardsGrid.dataset.aueResource = block.dataset.aueResource;
  }
  cardsGrid.dataset.aueType = 'container';
  cardsGrid.dataset.aueFilter = 'pricing-tabs';
  cardsGrid.dataset.aueBehavior = 'component';
  cardsGrid.dataset.aueLabel = 'Tarjetas de precio';

  // Individual card items
  cardRows.forEach((card) => {
    card.dataset.aueType = 'component';
    card.dataset.aueModel = 'pricing-tabs-card';
    card.dataset.aueLabel = card.querySelector('.pricing-tabs-card-info')?.textContent?.trim()
      || 'Tarjeta';
  });

  // --- 11. TAB SWITCHING ---
  let activeIndex = 0;

  function filterCards(tabKey) {
    cardRows.forEach((card) => {
      const match = card.dataset.tabCategory === tabKey;
      card.hidden = !match;
    });
  }

  function activateTab(index) {
    if (index === activeIndex) return;

    tabs[activeIndex].classList.remove('pricing-tabs-tab-active');
    tabs[activeIndex].setAttribute('aria-selected', 'false');
    tabs[activeIndex].setAttribute('tabindex', '-1');

    activeIndex = index;
    tabs[activeIndex].classList.add('pricing-tabs-tab-active');
    tabs[activeIndex].setAttribute('aria-selected', 'true');
    tabs[activeIndex].setAttribute('tabindex', '0');
    tabs[activeIndex].focus();

    cardsGrid.setAttribute('aria-labelledby', tabs[activeIndex].id);
    filterCards(tabs[activeIndex].dataset.tabKey);
  }

  // Show only tab1 cards initially
  filterCards('tab1');

  tablist.addEventListener('click', (e) => {
    const tab = e.target.closest('[role="tab"]');
    if (!tab) return;
    const idx = tabs.indexOf(tab);
    if (idx >= 0) activateTab(idx);
  });

  tablist.addEventListener('keydown', (e) => {
    let newIndex = activeIndex;
    switch (e.key) {
      case 'ArrowRight':
        newIndex = (activeIndex + 1) % tabs.length;
        break;
      case 'ArrowLeft':
        newIndex = (activeIndex - 1 + tabs.length) % tabs.length;
        break;
      case 'Home':
        newIndex = 0;
        break;
      case 'End':
        newIndex = tabs.length - 1;
        break;
      default:
        return;
    }
    e.preventDefault();
    activateTab(newIndex);
  });
}
