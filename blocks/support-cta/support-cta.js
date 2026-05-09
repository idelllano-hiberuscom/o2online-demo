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

  rows.forEach((row) => {
    row.classList.add('support-cta-row');
    const cols = [...row.children];

    // Col 0: icono decorativo
    if (cols[0]) {
      cols[0].classList.add('support-cta-icon');

      const img = cols[0].querySelector('picture img');
      if (img) {
        img.setAttribute('alt', '');
        img.setAttribute('loading', 'lazy');
        img.setAttribute('decoding', 'async');
        img.setAttribute('width', '60');
        img.setAttribute('height', '60');
      }
    }

    // Col 1: texto principal + enlace
    if (cols[1]) {
      cols[1].classList.add('support-cta-content');

      const paragraphs = cols[1].querySelectorAll('p');
      paragraphs.forEach((p) => {
        const link = p.querySelector('a');
        if (link) {
          link.classList.add('support-cta-link');
        } else {
          p.classList.add('support-cta-text');
        }
      });
    }
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
