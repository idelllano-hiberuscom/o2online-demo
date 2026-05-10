/**
 * Support CTA Block — AEM Edge Delivery Services
 *
 * Figma reference: 6:417 (mobile), 6:997 (desktop)
 * Model: xwalk (EDS + Universal Editor)
 * UE instrumentation: ✅ Completado (Fase 3)
 * QA audit: ✅ Validado
 *
 * QA Changes:
 * - Sin cambios funcionales necesarios — DOM preservado correctamente.
 *
 * @param {Element} block - Root element of the block
 */
export default function decorate(block) {
  const rows = [...block.children];

  // Collect all cells from all rows in model field order
  // Model fields: icon (reference), body (richtext), linkText (text), link (text)
  const allCells = [];
  rows.forEach((r) => [...r.children].forEach((c) => allCells.push(c)));

  const iconCell = allCells.find((c) => c.querySelector('picture'));
  if (!iconCell) return;

  const contentCells = allCells.filter((c) => c !== iconCell);
  const bodyCell = contentCells[0] || null;

  // linkText + link: check for <a> (collapsed) or separate text cells
  let linkTextVal = '';
  let linkUrlVal = '#';
  if (contentCells[1]) {
    const existingLink = contentCells[1].querySelector('a');
    if (existingLink) {
      linkTextVal = existingLink.textContent.trim();
      linkUrlVal = existingLink.href;
    } else {
      linkTextVal = contentCells[1].textContent.trim();
      if (contentCells[2]) {
        const link2 = contentCells[2].querySelector('a');
        linkUrlVal = link2 ? link2.href : (contentCells[2].textContent.trim() || '#');
      }
    }
  }

  // Build layout in the icon's row
  const mainRow = iconCell.parentElement;
  mainRow.classList.add('support-cta-row');

  // Icon
  iconCell.classList.add('support-cta-icon');
  const iconImg = iconCell.querySelector('picture img');
  if (iconImg) {
    iconImg.setAttribute('alt', '');
    iconImg.setAttribute('loading', 'lazy');
    iconImg.setAttribute('decoding', 'async');
    iconImg.setAttribute('width', '60');
    iconImg.setAttribute('height', '60');
  }

  // Content: body text + link
  const contentDiv = document.createElement('div');
  contentDiv.classList.add('support-cta-content');

  if (bodyCell) {
    const paragraphs = [...bodyCell.querySelectorAll('p')];
    if (paragraphs.length) {
      paragraphs.forEach((p) => {
        p.classList.add('support-cta-text');
        contentDiv.appendChild(p);
      });
    } else {
      const p = document.createElement('p');
      p.classList.add('support-cta-text');
      p.textContent = bodyCell.textContent.trim();
      contentDiv.appendChild(p);
    }
  }

  if (linkTextVal) {
    const linkEl = document.createElement('a');
    linkEl.href = linkUrlVal;
    linkEl.textContent = linkTextVal;
    linkEl.classList.add('support-cta-link');
    contentDiv.appendChild(linkEl);
  }

  mainRow.appendChild(contentDiv);

  // Hide remaining rows
  rows.forEach((r) => {
    if (r !== mainRow) r.classList.add('support-cta-config');
  });

  // --- INSTRUMENTACIÓN UE (xwalk) ---

  // Block-level: keep existing data-aue-resource from AEM
  block.dataset.aueType = 'component';
  block.dataset.aueModel = 'support-cta';
  block.dataset.aueLabel = 'Support CTA';

  // Icono (picture) — editable como media
  const picture = block.querySelector('.support-cta-icon picture');
  if (picture) {
    picture.dataset.aueProp = 'icon';
    picture.dataset.aueType = 'media';
    picture.dataset.aueLabel = 'Icono';
  }

  // Texto principal — editable como richtext
  const mainText = block.querySelector('.support-cta-text');
  if (mainText) {
    mainText.dataset.aueProp = 'body';
    mainText.dataset.aueType = 'richtext';
    mainText.dataset.aueLabel = 'Texto principal';
  }

  // linkText y linkUrl son campos panel-only gestionados desde el panel lateral de UE
}
