/**
 * Pricing Tabs Block — AEM Edge Delivery Services
 *
 * Figma reference: 6:12 (mobile), 6:601 (desktop)
 * Model: xwalk (EDS + Universal Editor)
 * UE instrumentation: ✅ Completado (Fase 3)
 * QA audit: ✅ Validado
 *
 * QA Changes:
 * - Sin cambios necesarios en la lógica del Developer
 *
 * DOM de entrada (matriz EDS):
 *   block (pricing-tabs)
 *     └── div (fila 1) → título de sección
 *           └── div (col 0) → <h2> "Elige tu tarifa"
 *     └── div (fila 2) → tabs
 *           ├── div (col 0..3) → <p> etiqueta de tab
 *     └── div (filas 3..N-1) → tarjetas de precio
 *           ├── div (col 0) → <h3> datos tarifa + <p> precio
 *           └── div (col 1) → <p><a> CTA × 2
 *     └── div (fila N) → banner LMA
 *           └── div (col 0) → <p><a> enlace LMA
 *
 * @param {Element} block - Root element of the block
 */
export default function decorate(block) {
  const rows = [...block.children];
  if (rows.length < 4) return;

  // --- 1. TITLE ROW (row 0) ---
  const titleRow = rows[0];
  titleRow.classList.add('pricing-tabs-title-row');
  const titleH2 = titleRow.querySelector('h2');
  if (titleH2) titleH2.classList.add('pricing-tabs-title');

  // --- 2. TABS ROW (row 1) — extract labels, hide original row ---
  const tabsRow = rows[1];
  const tabCols = [...tabsRow.children];
  tabsRow.hidden = true;

  // Tablist scroll container (NEW — for gradient overlay)
  const tablistContainer = document.createElement('div');
  tablistContainer.classList.add('pricing-tabs-tablist-container');

  // Tablist (NEW — ARIA tablist)
  const tablist = document.createElement('div');
  tablist.classList.add('pricing-tabs-tablist');
  tablist.setAttribute('role', 'tablist');
  tablist.setAttribute('aria-label', 'Categorías de tarifas');

  const panelId = 'pricing-tabs-panel';
  const tabs = [];

  tabCols.forEach((col, i) => {
    const label = col.textContent.trim();
    const tabId = `pricing-tab-${i}`;

    const btn = document.createElement('button');
    btn.classList.add('pricing-tabs-tab');
    btn.setAttribute('role', 'tab');
    btn.setAttribute('aria-selected', i === 0 ? 'true' : 'false');
    btn.setAttribute('tabindex', i === 0 ? '0' : '-1');
    btn.setAttribute('id', tabId);
    btn.setAttribute('aria-controls', panelId);
    btn.textContent = label;
    if (i === 0) btn.classList.add('pricing-tabs-tab-active');

    tablist.appendChild(btn);
    tabs.push(btn);
  });

  tablistContainer.appendChild(tablist);
  tabsRow.after(tablistContainer);

  // --- 3. CARD ROWS (rows 2..N-2) — classify and move into panel ---
  const lmaRow = rows[rows.length - 1];
  const cardRows = rows.slice(2, rows.length - 1);

  // Panel wrapper (NEW — ARIA tabpanel)
  const panel = document.createElement('div');
  panel.classList.add('pricing-tabs-panel');
  panel.setAttribute('role', 'tabpanel');
  panel.setAttribute('id', panelId);
  panel.setAttribute('aria-labelledby', 'pricing-tab-0');

  // Cards container inside panel (NEW — for flex layout of cards only)
  const cardsGrid = document.createElement('div');
  cardsGrid.classList.add('pricing-tabs-cards');

  cardRows.forEach((row) => {
    row.classList.add('pricing-tabs-card');
    const cols = [...row.children];

    // Col 0: tariff info + price
    if (cols[0]) {
      cols[0].classList.add('pricing-tabs-card-info');
      cols[0].querySelectorAll('h3').forEach((h) => h.classList.add('pricing-tabs-card-title'));
      cols[0].querySelectorAll('p').forEach((p) => p.classList.add('pricing-tabs-card-price'));
    }

    // Col 1: CTA links
    if (cols[1]) {
      cols[1].classList.add('pricing-tabs-card-actions');
      const links = cols[1].querySelectorAll('a');
      links.forEach((a, idx) => {
        a.classList.add('pricing-tabs-cta');
        // First link = "Saber más" (secondary/outline), Second = "Lo quiero" (primary/filled)
        a.classList.add(idx === 0 ? 'pricing-tabs-cta-secondary' : 'pricing-tabs-cta-primary');
      });
    }

    cardsGrid.appendChild(row);
  });

  panel.appendChild(cardsGrid);
  tablistContainer.after(panel);

  // --- 4. LMA BANNER (last row) — classify ---
  lmaRow.classList.add('pricing-tabs-lma');
  const lmaLink = lmaRow.querySelector('a');
  if (lmaLink) lmaLink.classList.add('pricing-tabs-lma-link');
  // lmaRow naturally remains as last child of block after card rows were moved to panel

  // --- 5. IMAGES — all lazy (block is below the fold, section 8 confirms no LCP) ---
  block.querySelectorAll('picture img').forEach((img) => {
    img.setAttribute('loading', 'lazy');
    img.setAttribute('decoding', 'async');
  });

  // --- 6. UE INSTRUMENTATION (xwalk) ---

  // Block-level: keep existing data-aue-resource from AEM
  block.dataset.aueType = 'component';
  block.dataset.aueModel = 'pricing-tabs';
  block.dataset.aueLabel = 'Pricing Tabs';

  // Título de sección
  if (titleH2) {
    titleH2.dataset.aueProp = 'heading';
    titleH2.dataset.aueType = 'text';
    titleH2.dataset.aueLabel = 'Título de sección';
  }

  // Contenedor de tarjetas (items repetibles)
  if (block.dataset.aueResource) {
    cardsGrid.dataset.aueResource = block.dataset.aueResource;
  }
  cardsGrid.dataset.aueType = 'container';
  cardsGrid.dataset.aueFilter = 'pricing-tabs';
  cardsGrid.dataset.aueBehavior = 'component';
  cardsGrid.dataset.aueLabel = 'Tarjetas de precio';

  // Items individuales — preserve AEM-injected data-aue-resource from rows
  cardRows.forEach((card) => {
    card.dataset.aueType = 'component';
    card.dataset.aueModel = 'pricing-tabs-card';
    card.dataset.aueLabel = card.querySelector('.pricing-tabs-card-title')?.textContent?.trim()
      || 'Tarjeta';

    // Datos de tarifa (richtext)
    const cardTitle = card.querySelector('.pricing-tabs-card-title');
    if (cardTitle) {
      cardTitle.dataset.aueProp = 'tariff_info';
      cardTitle.dataset.aueType = 'richtext';
      cardTitle.dataset.aueLabel = 'Datos de tarifa';
    }

    // Precio
    const cardPrice = card.querySelector('.pricing-tabs-card-price');
    if (cardPrice) {
      cardPrice.dataset.aueProp = 'tariff_price';
      cardPrice.dataset.aueType = 'text';
      cardPrice.dataset.aueLabel = 'Precio';
    }

    // CTA "Saber más" (secondary)
    const ctaSecondary = card.querySelector('.pricing-tabs-cta-secondary');
    if (ctaSecondary) {
      ctaSecondary.dataset.aueProp = 'linkMoreText';
      ctaSecondary.dataset.aueType = 'text';
      ctaSecondary.dataset.aueLabel = 'Texto Saber más';
    }

    // CTA "Lo quiero" (primary)
    const ctaPrimary = card.querySelector('.pricing-tabs-cta-primary');
    if (ctaPrimary) {
      ctaPrimary.dataset.aueProp = 'linkBuyText';
      ctaPrimary.dataset.aueType = 'text';
      ctaPrimary.dataset.aueLabel = 'Texto Lo quiero';
    }
  });

  // Banner LMA — texto del enlace
  if (lmaLink) {
    lmaLink.dataset.aueProp = 'lmaBannerText';
    lmaLink.dataset.aueType = 'text';
    lmaLink.dataset.aueLabel = 'Texto banner líneas adicionales';
  }

  // --- 7. TAB SWITCHING ---
  let activeIndex = 0;

  /**
   * Activates a tab by index and toggles panel/LMA visibility.
   * Tab 0 shows all cards; other tabs show empty panel.
   * ⚠️ TODO: In production, filter cards by data-tab-category matching the active tab label.
   * @param {number} index - Tab index to activate
   */
  function activateTab(index) {
    if (index === activeIndex) return;

    // Deactivate current tab
    tabs[activeIndex].classList.remove('pricing-tabs-tab-active');
    tabs[activeIndex].setAttribute('aria-selected', 'false');
    tabs[activeIndex].setAttribute('tabindex', '-1');

    // Activate new tab
    activeIndex = index;
    tabs[activeIndex].classList.add('pricing-tabs-tab-active');
    tabs[activeIndex].setAttribute('aria-selected', 'true');
    tabs[activeIndex].setAttribute('tabindex', '0');
    tabs[activeIndex].focus();

    // Update panel association
    panel.setAttribute('aria-labelledby', tabs[activeIndex].id);

    // Tab 0 shows all cards; other tabs show empty panel
    if (activeIndex === 0) {
      panel.classList.remove('pricing-tabs-panel-empty');
      lmaRow.hidden = false;
    } else {
      panel.classList.add('pricing-tabs-panel-empty');
      lmaRow.hidden = true;
    }
  }

  // Click handler — delegated on tablist
  tablist.addEventListener('click', (e) => {
    const tab = e.target.closest('[role="tab"]');
    if (!tab) return;
    const idx = tabs.indexOf(tab);
    if (idx >= 0) activateTab(idx);
  });

  // Keyboard navigation (ARIA tablist pattern: arrow keys, Home, End)
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
