import { getMetadata } from '../../scripts/aem.js';
import { loadFragment } from '../fragment/fragment.js';

/**
 * Footer Block — AEM Edge Delivery Services
 *
 * Figma reference: 6:1006 (desktop)
 * Model: xwalk (EDS + Universal Editor)
 * UE instrumentation: N/A — bloque de fragmento, sin instrumentación UE
 * QA audit: ✅ Validado (Fase 3)
 *
 * QA Changes:
 * - Añadido null-guard para loadFragment (previene TypeError si el fragmento falla)
 *
 * Loads the /footer fragment and reorganizes its sections into a
 * 4-column grid (footer-columns) + bottom bar (footer-bottom).
 *
 * @param {Element} block - Root element of the footer block
 */
export default async function decorate(block) {
  // load footer as fragment
  const footerMeta = getMetadata('footer');
  const footerPath = footerMeta ? new URL(footerMeta, window.location).pathname : '/footer';
  const fragment = await loadFragment(footerPath);
  if (!fragment) return;

  // decorate footer DOM
  block.textContent = '';
  const footer = document.createElement('div');
  while (fragment.firstElementChild) footer.append(fragment.firstElementChild);

  block.append(footer);

  // --- Reorganize fragment sections into grid + bottom bar ---
  const sections = footer.querySelectorAll('.section');

  if (sections.length >= 2) {
    const allSections = [...sections];
    const mainSections = allSections.slice(0, -1);
    const bottomSection = allSections[allSections.length - 1];

    // Grid container for column sections
    const columnsGrid = document.createElement('div');
    columnsGrid.className = 'footer-columns';
    mainSections.forEach((section) => {
      section.classList.add('footer-column');
      columnsGrid.append(section);
    });

    // Bottom bar
    bottomSection.classList.add('footer-bottom');

    // Reassemble footer wrapper
    footer.textContent = '';
    footer.append(columnsGrid);
    footer.append(bottomSection);
  }

  // Mark all footer images as lazy (footer is always below-the-fold)
  footer.querySelectorAll('picture img').forEach((img) => {
    img.setAttribute('loading', 'lazy');
    img.setAttribute('decoding', 'async');
  });
}
