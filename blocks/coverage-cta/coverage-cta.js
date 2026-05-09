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
  const row = block.children[0];
  if (!row) return;

  const cols = [...row.children];

  // Col 0 — Icono (decorativo)
  const iconCol = cols[0];
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

  // Col 1 — Texto descriptivo
  const textCol = cols[1];
  if (textCol) {
    textCol.classList.add('coverage-cta-text');
  }

  // Col 2 — Botón CTA
  const ctaCol = cols[2];
  if (ctaCol) {
    ctaCol.classList.add('coverage-cta-action');
    const link = ctaCol.querySelector('a');
    if (link) {
      link.classList.add('coverage-cta-button');
    }
  }

  // --- INSTRUMENTACIÓN UE (xwalk) ---

  // Block-level: keep existing data-aue-resource from AEM
  block.dataset.aueType = 'component';
  block.dataset.aueModel = 'coverage-cta';
  block.dataset.aueLabel = 'Coverage CTA';

  // Icono (decorativo — media)
  const picture = iconCol?.querySelector('picture');
  if (picture) {
    picture.dataset.aueProp = 'icon';
    picture.dataset.aueType = 'media';
    picture.dataset.aueLabel = 'Icono';
  }

  // Texto descriptivo
  const descP = textCol?.querySelector('p');
  if (descP) {
    descP.dataset.aueProp = 'description';
    descP.dataset.aueType = 'text';
    descP.dataset.aueLabel = 'Texto descriptivo';
  }

  // CTA — Texto del botón (inline editable)
  const ctaLink = ctaCol?.querySelector('a');
  if (ctaLink) {
    ctaLink.dataset.aueProp = 'ctaText';
    ctaLink.dataset.aueType = 'text';
    ctaLink.dataset.aueLabel = 'Texto del botón';
  }
}
