/**
 * Benefits Cards Block — AEM Edge Delivery Services
 *
 * Figma reference: 6:318 (mobile), 6:901 (desktop)
 * Model: xwalk (EDS + Universal Editor)
 * UE instrumentation: ✅ Completado (Fase 3)
 * QA audit: ✅ Validado
 *
 * QA Changes:
 * - Sin cambios necesarios en la lógica del Developer
 *
 * @param {Element} block - Root element of the block
 */
export default function decorate(block) {
  const rows = [...block.children];

  // Row 0: section header (h2 title + p subtitle)
  const headerRow = rows[0];
  headerRow.classList.add('benefits-cards-header');
  const heading = headerRow.querySelector('h2');
  if (heading) heading.classList.add('benefits-cards-title');
  const subtitle = headerRow.querySelector('p');
  if (subtitle) subtitle.classList.add('benefits-cards-subtitle');

  // Rows 1+: cards — wrap in a new grid container
  const cardRows = rows.slice(1);
  const grid = document.createElement('div');
  grid.classList.add('benefits-cards-grid');

  cardRows.forEach((row) => {
    row.classList.add('benefits-cards-card');
    const cols = [...row.children];

    // Col 0: icon wrapper
    if (cols[0]) {
      cols[0].classList.add('benefits-cards-card-icon');
    }

    // Col 1: text content (h3 + p with <strong>)
    if (cols[1]) {
      cols[1].classList.add('benefits-cards-card-body');
      const cardTitle = cols[1].querySelector('h3');
      if (cardTitle) cardTitle.classList.add('benefits-cards-card-title');
      const cardText = cols[1].querySelector('p');
      if (cardText) cardText.classList.add('benefits-cards-card-text');
    }

    // Icons: decorative (alt="") + lazy (below-the-fold, not LCP)
    row.querySelectorAll('picture img').forEach((img) => {
      img.setAttribute('loading', 'lazy');
      img.setAttribute('decoding', 'async');
      img.setAttribute('alt', '');
      img.setAttribute('width', '66');
      img.setAttribute('height', '66');
    });

    grid.append(row);
  });

  block.append(grid);

  // --- INSTRUMENTACIÓN UE (xwalk) ---

  // Block-level: keep existing data-aue-resource from AEM
  block.dataset.aueType = 'component';
  block.dataset.aueModel = 'benefits-cards';
  block.dataset.aueLabel = 'Benefits Cards';

  // Título de sección
  if (heading) {
    heading.dataset.aueProp = 'heading';
    heading.dataset.aueType = 'text';
    heading.dataset.aueLabel = 'Título de sección';
  }

  // Subtítulo
  if (subtitle) {
    subtitle.dataset.aueProp = 'subtitle';
    subtitle.dataset.aueType = 'text';
    subtitle.dataset.aueLabel = 'Subtítulo';
  }

  // Grid como contenedor de tarjetas (items repetibles)
  if (block.dataset.aueResource) {
    grid.dataset.aueResource = block.dataset.aueResource;
  }
  grid.dataset.aueType = 'container';
  grid.dataset.aueFilter = 'benefits-cards';
  grid.dataset.aueBehavior = 'component';
  grid.dataset.aueLabel = 'Tarjetas Benefits';

  // Tarjetas individuales — preserve AEM-injected data-aue-resource
  const cards = grid.querySelectorAll('.benefits-cards-card');
  cards.forEach((card) => {
    card.dataset.aueType = 'component';
    card.dataset.aueModel = 'benefits-cards-item';
    card.dataset.aueLabel = card.querySelector('.benefits-cards-card-title')?.textContent?.trim()
      || 'Tarjeta';

    // Icono
    const picture = card.querySelector('.benefits-cards-card-icon picture');
    if (picture) {
      picture.dataset.aueProp = 'icon';
      picture.dataset.aueType = 'media';
      picture.dataset.aueLabel = 'Icono';
    }

    // Título de tarjeta
    const cardTitle = card.querySelector('.benefits-cards-card-title');
    if (cardTitle) {
      cardTitle.dataset.aueProp = 'itemHeading';
      cardTitle.dataset.aueType = 'text';
      cardTitle.dataset.aueLabel = 'Título';
    }

    // Texto descriptivo
    const cardText = card.querySelector('.benefits-cards-card-text');
    if (cardText) {
      cardText.dataset.aueProp = 'itemDescription';
      cardText.dataset.aueType = 'richtext';
      cardText.dataset.aueLabel = 'Texto descriptivo';
    }
  });
}
