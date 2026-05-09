/**
 * Promo Carousel Block — AEM Edge Delivery Services
 *
 * Figma reference: 6:129 (mobile), 6:712 (desktop)
 * Model: xwalk (EDS + Universal Editor)
 * UE instrumentation: ✅ Completado (Fase 3)
 * QA audit: ✅ Validado
 *
 * QA Changes:
 * - Sin cambios necesarios en la lógica del Developer
 *
 * DOM de entrada (matriz EDS):
 *   block (promo-carousel)
 *     └── div (fila 1 — título de sección)
 *           └── div (col 0)
 *                 ├── <h2> ← título de sección
 *                 └── <p> ← subtítulo
 *     └── div (filas 2..N — tarjetas)
 *           ├── div (col 0) → <picture> imagen
 *           └── div (col 1) → <p> badge, <h3> título, <p><a> enlace
 *
 * @param {Element} block - Root element of the block
 */
export default function decorate(block) {
  const rows = [...block.children];
  if (rows.length < 2) return;

  // --- 1. HEADER ROW (row 0) ---
  const headerRow = rows[0];
  headerRow.classList.add('promo-carousel-header');

  const titleEl = headerRow.querySelector('h2');
  if (titleEl) titleEl.classList.add('promo-carousel-title');

  const subtitleEl = headerRow.querySelector('p');
  if (subtitleEl) subtitleEl.classList.add('promo-carousel-subtitle');

  // --- 2. CARD ROWS (rows 1..N) → classify and move into track ---
  const cardRows = rows.slice(1);
  const track = document.createElement('div');
  track.classList.add('promo-carousel-track');

  cardRows.forEach((row) => {
    row.classList.add('promo-carousel-card');
    const cols = [...row.children];

    // Col 0 — image container
    if (cols[0]) {
      cols[0].classList.add('promo-carousel-card-image');
      // All images are below-the-fold — lazy load
      cols[0].querySelectorAll('picture img').forEach((img) => {
        img.setAttribute('loading', 'lazy');
        img.setAttribute('decoding', 'async');
      });
    }

    // Col 1 — content (badge, title, CTA link)
    if (cols[1]) {
      cols[1].classList.add('promo-carousel-card-content');

      cols[1].querySelectorAll(':scope > p').forEach((p) => {
        if (p.querySelector('a')) {
          p.classList.add('promo-carousel-card-cta');
          p.querySelector('a').classList.add('promo-carousel-card-link');
        } else {
          p.classList.add('promo-carousel-badge');
        }
      });

      cols[1].querySelectorAll('h3').forEach((h) => {
        h.classList.add('promo-carousel-card-title');
      });
    }

    // Move card into track (append moves existing node — safe reorder)
    track.append(row);
  });

  // Track wrapper — positioning context for gradient fade and nav buttons
  const trackWrapper = document.createElement('div');
  trackWrapper.classList.add('promo-carousel-track-wrapper');
  trackWrapper.append(track);
  block.append(trackWrapper);

  // --- 3. NAVIGATION BUTTONS (new elements) ---
  const prevBtn = document.createElement('button');
  prevBtn.classList.add('promo-carousel-prev');
  prevBtn.setAttribute('type', 'button');
  prevBtn.setAttribute('aria-label', 'Anterior');

  const nextBtn = document.createElement('button');
  nextBtn.classList.add('promo-carousel-next');
  nextBtn.setAttribute('type', 'button');
  nextBtn.setAttribute('aria-label', 'Siguiente');

  trackWrapper.append(prevBtn, nextBtn);

  // --- 4. ACCESSIBILITY ---
  block.setAttribute('role', 'region');
  block.setAttribute('aria-label', 'Carrusel de promociones');

  // --- 5. UE INSTRUMENTATION (xwalk) ---

  // Block-level: keep existing data-aue-resource from AEM
  block.dataset.aueType = 'component';
  block.dataset.aueModel = 'promo-carousel';
  block.dataset.aueLabel = 'Carrusel de Promociones';

  // Título de sección
  if (titleEl) {
    titleEl.dataset.aueProp = 'heading';
    titleEl.dataset.aueType = 'text';
    titleEl.dataset.aueLabel = 'Título de sección';
  }

  // Subtítulo
  if (subtitleEl) {
    subtitleEl.dataset.aueProp = 'subtitle';
    subtitleEl.dataset.aueType = 'text';
    subtitleEl.dataset.aueLabel = 'Subtítulo';
  }

  // Contenedor de tarjetas (items repetibles)
  if (block.dataset.aueResource) {
    track.dataset.aueResource = block.dataset.aueResource;
  }
  track.dataset.aueType = 'container';
  track.dataset.aueFilter = 'promo-carousel';
  track.dataset.aueBehavior = 'component';
  track.dataset.aueLabel = 'Tarjetas de promoción';

  // Items individuales — preserve AEM-injected data-aue-resource from rows
  cardRows.forEach((card) => {
    card.dataset.aueType = 'component';
    card.dataset.aueModel = 'promo-carousel-item';
    card.dataset.aueLabel = card.querySelector('.promo-carousel-card-title')?.textContent?.trim()
      || 'Tarjeta';

    // Imagen
    const picture = card.querySelector('picture');
    if (picture) {
      picture.dataset.aueProp = 'image';
      picture.dataset.aueType = 'media';
      picture.dataset.aueLabel = 'Imagen de la tarjeta';
    }

    // Texto del badge
    const badge = card.querySelector('.promo-carousel-badge');
    if (badge) {
      badge.dataset.aueProp = 'badge';
      badge.dataset.aueType = 'text';
      badge.dataset.aueLabel = 'Texto del badge';
    }

    // Título de la tarjeta
    const cardTitle = card.querySelector('.promo-carousel-card-title');
    if (cardTitle) {
      cardTitle.dataset.aueProp = 'itemHeading';
      cardTitle.dataset.aueType = 'text';
      cardTitle.dataset.aueLabel = 'Título de la tarjeta';
    }

    // Texto del enlace (inline editable) — cardLink URL es panel-only
    const cardLinkEl = card.querySelector('.promo-carousel-card-link');
    if (cardLinkEl) {
      cardLinkEl.dataset.aueProp = 'cardLinkText';
      cardLinkEl.dataset.aueType = 'text';
      cardLinkEl.dataset.aueLabel = 'Texto del enlace';
    }
  });

  // --- 6. SCROLL NAVIGATION ---
  const scrollByCard = (direction) => {
    const firstCard = track.querySelector('.promo-carousel-card');
    if (!firstCard) return;
    const gap = parseFloat(getComputedStyle(track).columnGap) || 16;
    const amount = firstCard.offsetWidth + gap;
    track.scrollBy({ left: direction * amount, behavior: 'smooth' });
  };

  block.addEventListener('click', (e) => {
    if (e.target.closest('.promo-carousel-prev')) scrollByCard(-1);
    if (e.target.closest('.promo-carousel-next')) scrollByCard(1);
  });

  // --- 7. SCROLL STATE & OVERFLOW DETECTION ---
  const updateNavState = () => {
    const atStart = track.scrollLeft <= 0;
    const atEnd = track.scrollLeft + track.clientWidth >= track.scrollWidth - 1;
    prevBtn.disabled = atStart;
    nextBtn.disabled = atEnd;
    trackWrapper.classList.toggle('promo-carousel-track-wrapper-at-end', atEnd);
  };

  const updateLayout = () => {
    const hasOverflow = track.scrollWidth > track.clientWidth + 1;
    block.classList.toggle('promo-carousel-has-overflow', hasOverflow);
    updateNavState();
  };

  track.addEventListener('scroll', updateNavState, { passive: true });

  /* eslint-disable-next-line no-unused-vars -- observer must persist */
  const resizeObs = new ResizeObserver(updateLayout);
  resizeObs.observe(track);

  updateLayout();
}
