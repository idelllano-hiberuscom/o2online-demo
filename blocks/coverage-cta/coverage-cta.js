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

  // Find main row — the one containing the icon picture
  const mainRow = rows.find((r) => r.querySelector('picture'));
  if (!mainRow) return;

  const mainCols = [...mainRow.children];

  // Icon col — the cell with picture
  const iconCol = mainCols.find((c) => c.querySelector('picture'));
  if (iconCol) {
    iconCol.classList.add('coverage-cta-icon');
    const img = iconCol.querySelector('picture img');
    if (img) {
      img.setAttribute('loading', 'lazy');
      img.setAttribute('decoding', 'async');
      img.setAttribute('alt', '');
      img.setAttribute('aria-hidden', 'true');
    }
  }

  // Text col — the other cell in the main row
  const textCol = mainCols.find((c) => c !== iconCol);
  if (textCol) {
    textCol.classList.add('coverage-cta-text');
  }

  // Gather CTA data from non-main rows (ctaText + cta fields are separate cells)
  let ctaTextVal = '';
  let ctaUrlVal = '';

  rows.forEach((r) => {
    if (r === mainRow) return;
    const link = r.querySelector('a');
    if (link) {
      ctaUrlVal = ctaUrlVal || link.href;
      ctaTextVal = ctaTextVal || link.textContent.trim();
    }
    [...r.children].forEach((col) => {
      const text = col.textContent.trim();
      if (!text) return;
      if (/^https?:\/\//.test(text) || text.startsWith('/')) {
        ctaUrlVal = ctaUrlVal || text;
      } else if (!ctaTextVal && !col.querySelector('a')) {
        ctaTextVal = text;
      }
    });
    r.classList.add('coverage-cta-config');
  });

  // Build CTA button and append to main row
  if (ctaTextVal || ctaUrlVal) {
    const actionDiv = document.createElement('div');
    actionDiv.classList.add('coverage-cta-action');
    const a = document.createElement('a');
    a.href = ctaUrlVal || '#';
    a.textContent = ctaTextVal || 'CTA';
    a.classList.add('coverage-cta-button');
    actionDiv.appendChild(a);
    mainRow.appendChild(actionDiv);
  }

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
