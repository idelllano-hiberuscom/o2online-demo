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

    // Try to determine tab category from cell content
    // The tabCategory field value may be in one of the cells
    let category = 'tab1'; // default
    cols.forEach((col) => {
      const t = col.textContent.trim();
      if (tabKeys.includes(t)) {
        category = t;
        col.classList.add('pricing-tabs-card-meta');
      }
    });
    row.dataset.tabCategory = category;

    // Classify remaining cols
    const visibleCols = cols.filter((c) => !c.classList.contains('pricing-tabs-card-meta'));

    if (visibleCols[0]) {
      visibleCols[0].classList.add('pricing-tabs-card-info');
      visibleCols[0].querySelectorAll('h3').forEach((h) => h.classList.add('pricing-tabs-card-title'));
      visibleCols[0].querySelectorAll('p').forEach((p) => {
        if (!p.querySelector('a')) p.classList.add('pricing-tabs-card-detail');
      });
    }

    if (visibleCols[1]) {
      visibleCols[1].classList.add('pricing-tabs-card-price-col');
    }

    // Find CTA links in any col
    const links = row.querySelectorAll('a');
    if (links.length > 0) {
      const actionsDiv = row.querySelector('.pricing-tabs-card-actions')
        || document.createElement('div');
      actionsDiv.classList.add('pricing-tabs-card-actions');

      links.forEach((a, idx) => {
        a.classList.add('pricing-tabs-cta');
        a.classList.add(idx === 0 ? 'pricing-tabs-cta-primary' : 'pricing-tabs-cta-secondary');
      });

      if (!actionsDiv.parentNode) {
        // Move link containers into actions div
        row.querySelectorAll('p').forEach((p) => {
          if (p.querySelector('a')) {
            actionsDiv.appendChild(p);
          }
        });
        row.appendChild(actionsDiv);
      }
    }

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
    card.dataset.aueLabel = card.querySelector('.pricing-tabs-card-title')?.textContent?.trim()
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
