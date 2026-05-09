/**
 * Why O2 Block — AEM Edge Delivery Services
 *
 * Figma reference: 6:203 (mobile), 6:786 (desktop)
 * Model: xwalk (EDS + Universal Editor)
 * UE instrumentation: ✅ Completado (Fase 3)
 * QA audit: ✅ Validado
 *
 * QA Changes:
 * - Sin cambios necesarios en la lógica del Developer
 *
 * DOM de entrada (matriz EDS):
 *   block (why-o2)
 *     └── div (fila 0 — título de sección)
 *           └── div (col 0)
 *                 └── <h2> "¿Por qué elegir O2?"
 *     └── div (fila 1 — tarjeta 1)
 *           ├── div (col 0) → <picture> icono SVG 66×66
 *           └── div (col 1) → <h3> + <p>
 *     └── div (fila 2 — tarjeta 2) …
 *     └── div (fila 3 — tarjeta 3) …
 *     └── div (fila 4 — tarjeta 4) …
 *
 * @param {Element} block - Root element of the block
 */
export default function decorate(block) {
  const rows = [...block.children];

  // Row 0: section title
  const titleRow = rows[0];
  titleRow.classList.add('why-o2-header');
  const heading = titleRow.querySelector('h2');
  if (heading) heading.classList.add('why-o2-title');

  // Rows 1+: cards — wrap in a new grid container
  const cardRows = rows.slice(1);
  const grid = document.createElement('div');
  grid.classList.add('why-o2-grid');

  cardRows.forEach((row) => {
    row.classList.add('why-o2-card');
    const cols = [...row.children];

    // Col 0: icon wrapper
    if (cols[0]) {
      cols[0].classList.add('why-o2-card-icon');
    }

    // Col 1: text content
    if (cols[1]) {
      cols[1].classList.add('why-o2-card-body');
      const cardTitle = cols[1].querySelector('h3');
      if (cardTitle) cardTitle.classList.add('why-o2-card-title');
      const cardText = cols[1].querySelector('p');
      if (cardText) cardText.classList.add('why-o2-card-text');
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

  // Block-level: keep existing data-aue-resource from AEM, add model/type
  block.dataset.aueType = 'component';
  block.dataset.aueModel = 'why-o2';
  block.dataset.aueLabel = 'Why O2';

  // Título de sección
  if (heading) {
    heading.dataset.aueProp = 'sectionTitle';
    heading.dataset.aueType = 'text';
    heading.dataset.aueLabel = 'Título de sección';
  }

  // Grid como contenedor de tarjetas (items repetibles)
  // Copy block's aue-resource to the new grid container
  if (block.dataset.aueResource) {
    grid.dataset.aueResource = block.dataset.aueResource;
  }
  grid.dataset.aueType = 'container';
  grid.dataset.aueFilter = 'why-o2';
  grid.dataset.aueBehavior = 'component';
  grid.dataset.aueLabel = 'Tarjetas Why O2';

  // Tarjetas individuales — preserve AEM-injected data-aue-resource from rows
  const cards = grid.querySelectorAll('.why-o2-card');
  cards.forEach((card) => {
    // card already has data-aue-resource from AEM (it's the original row div)
    card.dataset.aueType = 'component';
    card.dataset.aueModel = 'why-o2-item';
    card.dataset.aueLabel = card.querySelector('.why-o2-card-title')?.textContent?.trim()
      || 'Tarjeta';

    // Icono
    const picture = card.querySelector('.why-o2-card-icon picture');
    if (picture) {
      picture.dataset.aueProp = 'icon';
      picture.dataset.aueType = 'media';
      picture.dataset.aueLabel = 'Icono';
    }

    // Título de tarjeta
    const cardTitle = card.querySelector('.why-o2-card-title');
    if (cardTitle) {
      cardTitle.dataset.aueProp = 'cardTitle';
      cardTitle.dataset.aueType = 'text';
      cardTitle.dataset.aueLabel = 'Título de la tarjeta';
    }

    // Texto descriptivo
    const cardText = card.querySelector('.why-o2-card-text');
    if (cardText) {
      cardText.dataset.aueProp = 'cardText';
      cardText.dataset.aueType = 'richtext';
      cardText.dataset.aueLabel = 'Texto descriptivo';
    }
  });
}
