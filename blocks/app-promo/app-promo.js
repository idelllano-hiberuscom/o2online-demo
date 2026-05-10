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

  // Collect all cells from all rows in model field order
  // Model fields: text (richtext), image (reference), imageAlt (text)
  const allCells = [];
  rows.forEach((r) => [...r.children].forEach((c) => allCells.push(c)));

  const imageCell = allCells.find((c) => c.querySelector('picture'));
  if (!imageCell) return;

  // Text cell: first non-image cell with content
  const textCell = allCells.find((c) => c !== imageCell && c.textContent.trim());

  // imageAlt cell: remaining cell (neither image nor text)
  const altCell = allCells.find((c) => c !== imageCell && c !== textCell);
  if (altCell) {
    const altText = altCell.textContent.trim();
    if (altText) {
      const imgEl = imageCell.querySelector('picture img');
      if (imgEl) imgEl.setAttribute('alt', altText);
    }
  }

  // Build layout in a single visible row
  const mainRow = imageCell.parentElement;
  mainRow.classList.add('app-promo-row');

  // --- Text content ---
  if (textCell) {
    textCell.classList.add('app-promo-content');
    if (textCell.parentElement !== mainRow) {
      mainRow.insertBefore(textCell, mainRow.firstChild);
    }

    const heading = textCell.querySelector('h2');
    if (heading) heading.classList.add('app-promo-title');

    const featureList = textCell.querySelector('ul');
    if (featureList) featureList.classList.add('app-promo-features');

    const allParas = [...textCell.querySelectorAll(':scope > p')];
    const badgeParas = allParas.filter((p) => p.querySelector('a'));

    allParas.forEach((p) => {
      if (!p.querySelector('a')) {
        p.classList.add('app-promo-description');
      }
    });

    if (badgeParas.length) {
      const badgesWrapper = document.createElement('div');
      badgesWrapper.classList.add('app-promo-badges');

      badgeParas.forEach((p) => {
        const link = p.querySelector('a');
        if (link) link.classList.add('app-promo-badge');
        badgesWrapper.append(p);
      });

      textCell.append(badgesWrapper);
    }
  }

  // --- Image (ensure it's after text for right-side placement) ---
  imageCell.classList.add('app-promo-image');
  if (textCell && textCell.parentElement === mainRow) {
    mainRow.appendChild(imageCell);
  }

  imageCell.querySelectorAll('picture img').forEach((img) => {
    img.setAttribute('loading', 'lazy');
    img.setAttribute('decoding', 'async');
  });

  // Badge images: also lazy
  if (textCell) {
    textCell.querySelectorAll('.app-promo-badges picture img').forEach((img) => {
      img.setAttribute('loading', 'lazy');
      img.setAttribute('decoding', 'async');
    });
  }

  // Hide remaining rows and unused cells
  rows.forEach((r) => {
    if (r !== mainRow) r.classList.add('app-promo-config');
  });
  if (altCell && altCell.parentElement === mainRow) {
    altCell.style.display = 'none';
  }

  // --- INSTRUMENTACIÓN UE (xwalk) ---

  // Block-level: keep existing data-aue-resource from AEM
  block.dataset.aueType = 'component';
  block.dataset.aueModel = 'app-promo';
  block.dataset.aueLabel = 'App Promo';

  // Contenido de texto (richtext)
  if (textCell) {
    textCell.dataset.aueProp = 'text';
    textCell.dataset.aueType = 'richtext';
    textCell.dataset.aueLabel = 'Contenido';
  }

  // Imagen del teléfono
  if (imageCell) {
    imageCell.dataset.aueProp = 'image';
    imageCell.dataset.aueType = 'media';
    imageCell.dataset.aueLabel = 'Imagen del teléfono';
  }
}
