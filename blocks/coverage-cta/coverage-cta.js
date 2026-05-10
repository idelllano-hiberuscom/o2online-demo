/**
 * Coverage CTA Block — AEM Edge Delivery Services
 *
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

  // Collect all cells across all rows in model field order
  // Model fields: icon (reference), description (text), ctaText (text), cta (text)
  const allCells = [];
  rows.forEach((r) => [...r.children].forEach((c) => allCells.push(c)));

  const iconCell = allCells.find((c) => c.querySelector('picture'));
  if (!iconCell) return;

  // Non-icon cells in field order: description, ctaText, cta
  const contentCells = allCells.filter((c) => c !== iconCell);
  const descCell = contentCells[0] || null;

  // ctaText + cta: check for <a> (collapsed) or separate text cells
  let ctaTextVal = '';
  let ctaUrlVal = '#';
  if (contentCells[1]) {
    const link = contentCells[1].querySelector('a');
    if (link) {
      ctaTextVal = link.textContent.trim();
      ctaUrlVal = link.href;
    } else {
      ctaTextVal = contentCells[1].textContent.trim();
      if (contentCells[2]) {
        const link2 = contentCells[2].querySelector('a');
        ctaUrlVal = link2 ? link2.href : (contentCells[2].textContent.trim() || '#');
      }
    }
  }

  // Build layout in the icon's row
  const mainRow = iconCell.parentElement;

  // Icon styling
  iconCell.classList.add('coverage-cta-icon');
  const img = iconCell.querySelector('picture img');
  if (img) {
    img.setAttribute('loading', 'lazy');
    img.setAttribute('decoding', 'async');
    img.setAttribute('alt', '');
    img.setAttribute('aria-hidden', 'true');
  }

  // Description — move into main row if in a different row
  if (descCell) {
    descCell.classList.add('coverage-cta-text');
    if (descCell.parentElement !== mainRow) {
      mainRow.appendChild(descCell);
    }
  }

  // CTA button
  if (ctaTextVal) {
    const actionDiv = document.createElement('div');
    actionDiv.classList.add('coverage-cta-action');
    const a = document.createElement('a');
    a.href = ctaUrlVal;
    a.textContent = ctaTextVal;
    a.classList.add('coverage-cta-button');
    actionDiv.appendChild(a);
    mainRow.appendChild(actionDiv);
  }

  // Hide remaining rows
  rows.forEach((r) => {
    if (r !== mainRow) r.classList.add('coverage-cta-config');
  });

  // --- INSTRUMENTACIÓN UE (xwalk) ---
  block.dataset.aueType = 'component';
  block.dataset.aueModel = 'coverage-cta';
  block.dataset.aueLabel = 'Coverage CTA';

  const picture = block.querySelector('.coverage-cta-icon picture');
  if (picture) {
    picture.dataset.aueProp = 'icon';
    picture.dataset.aueType = 'media';
    picture.dataset.aueLabel = 'Icono';
  }

  const descP = block.querySelector('.coverage-cta-text p');
  if (descP) {
    descP.dataset.aueProp = 'description';
    descP.dataset.aueType = 'text';
    descP.dataset.aueLabel = 'Texto descriptivo';
  }

  const ctaBtn = block.querySelector('.coverage-cta-button');
  if (ctaBtn) {
    ctaBtn.dataset.aueProp = 'ctaText';
    ctaBtn.dataset.aueType = 'text';
    ctaBtn.dataset.aueLabel = 'Texto del botón';
  }
}
