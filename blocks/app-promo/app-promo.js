/**
 * App Promo Block — AEM Edge Delivery Services
 *
 * Figma reference: 6:263 (mobile), 6:844 (desktop)
 * Model: xwalk (EDS + Universal Editor)
 * UE instrumentation: ✅ Completado (Fase 3)
 * QA audit: ✅ Validado
 *
 * QA Changes:
 * - Sin cambios necesarios en la lógica del Developer
 *
 * DOM de entrada (matriz EDS):
 *   block (app-promo)
 *     └── div (fila 0 — contenido principal)
 *           ├── div (col 0 — texto)
 *           │     ├── <h2> "App Mi O2"
 *           │     ├── <p> texto descriptivo (1-2 párrafos)
 *           │     ├── <ul> lista de características (5 <li>)
 *           │     ├── <p><a> badge App Store
 *           │     └── <p><a> badge Google Play
 *           └── div (col 1 — imagen)
 *                 └── <picture> mockup del teléfono
 *
 * @param {Element} block - Root element of the block
 */
export default function decorate(block) {
  const rows = [...block.children];
  // Find the main content row (with a <picture>)
  let row = null;
  rows.forEach((r) => {
    if (r.querySelector('picture')) {
      row = r;
    } else {
      r.classList.add('app-promo-config');
    }
  });
  if (!row) return;

  const cols = [...row.children];
  const textCol = cols[0];
  const imageCol = cols[1];

  // Classify the single row
  row.classList.add('app-promo-row');

  // --- Col 0: text content ---
  if (textCol) {
    textCol.classList.add('app-promo-content');

    const heading = textCol.querySelector('h2');
    if (heading) heading.classList.add('app-promo-title');

    const featureList = textCol.querySelector('ul');
    if (featureList) featureList.classList.add('app-promo-features');

    // Identify badge paragraphs: <p> elements containing an <a>
    // They are the last 2 <p> with <a> in the text column
    const allParas = [...textCol.querySelectorAll(':scope > p')];
    const badgeParas = allParas.filter((p) => p.querySelector('a'));

    // Description paragraphs: <p> without <a>
    allParas.forEach((p) => {
      if (!p.querySelector('a')) {
        p.classList.add('app-promo-description');
      }
    });

    // Wrap badge paragraphs in a badges container
    if (badgeParas.length) {
      const badgesWrapper = document.createElement('div');
      badgesWrapper.classList.add('app-promo-badges');

      badgeParas.forEach((p) => {
        const link = p.querySelector('a');
        if (link) link.classList.add('app-promo-badge');
        badgesWrapper.append(p);
      });

      textCol.append(badgesWrapper);
    }
  }

  // --- Col 1: phone image ---
  if (imageCol) {
    imageCol.classList.add('app-promo-image');

    // Below-the-fold block — all images lazy
    imageCol.querySelectorAll('picture img').forEach((img) => {
      img.setAttribute('loading', 'lazy');
      img.setAttribute('decoding', 'async');
    });
  }

  // Badge images: also lazy
  if (textCol) {
    textCol.querySelectorAll('.app-promo-badges picture img').forEach((img) => {
      img.setAttribute('loading', 'lazy');
      img.setAttribute('decoding', 'async');
    });
  }

  // --- INSTRUMENTACIÓN UE (xwalk) ---

  // Block-level: keep existing data-aue-resource from AEM
  block.dataset.aueType = 'component';
  block.dataset.aueModel = 'app-promo';
  block.dataset.aueLabel = 'App Promo';

  // Contenido de texto (richtext)
  if (textCol) {
    textCol.dataset.aueProp = 'text';
    textCol.dataset.aueType = 'richtext';
    textCol.dataset.aueLabel = 'Contenido';
  }

  // Imagen del teléfono
  if (imageCol) {
    imageCol.dataset.aueProp = 'image';
    imageCol.dataset.aueType = 'media';
    imageCol.dataset.aueLabel = 'Imagen del teléfono';
  }
}
