/**
 * Hero Block — AEM Edge Delivery Services
 *
 * Figma reference: O2 Online hero section (oso azul)
 * Model: xwalk (EDS + Universal Editor)
 * UE instrumentation: ✅ Completado (Fase 3)
 * QA audit: ✅ Validado
 *
 * QA Changes:
 * - Sin cambios necesarios en la lógica del Developer
 *
 * DOM de entrada (matriz EDS):
 *   block [data-block-name="hero"]
 *     └── div (fila 0)
 *           ├── div (col 0) → <picture> con <source> y <img> (imagen de fondo)
 *           └── div (col 1) → richtext: <h1> + <p> destacado
 *               + <p.button-container><a.button> CTA
 *
 * @param {Element} block - Root element of the block
 */
export default function decorate(block) {
  const rows = [...block.children];

  rows.forEach((row) => {
    const cols = [...row.children];

    // col 0 — imagen de fondo del hero
    if (cols[0]) {
      cols[0].classList.add('hero-media');

      // Imagen LCP — above the fold, loading eager + fetchpriority high
      const img = cols[0].querySelector('picture img');
      if (img) {
        img.setAttribute('loading', 'eager');
        img.setAttribute('fetchpriority', 'high');
      }
    }

    // col 1 — contenido de texto (h1 + highlight + CTA)
    if (cols[1]) {
      cols[1].classList.add('hero-content');

      // Marcar el H1 con clase semántica
      const heading = cols[1].querySelector('h1');
      if (heading) {
        heading.classList.add('hero-title');
      }

      // Marcar el primer <p> que NO sea .button-container como texto destacado
      const paragraphs = cols[1].querySelectorAll('p');
      paragraphs.forEach((p) => {
        if (!p.classList.contains('button-container') && !p.querySelector('a.button')) {
          p.classList.add('hero-highlight');
        }
      });
    }
  });

  // --- INSTRUMENTACIÓN UE (xwalk) ---

  // Contenedor raíz — componente hero
  block.dataset.aueResource = `urn:aemconnection:${window.location.pathname}/jcr:content/hero`;
  block.dataset.aueType = 'component';
  block.dataset.aueModel = 'hero';
  block.dataset.aueLabel = 'Hero';

  // Col 0 — imagen de fondo (campo "image" en _hero.json)
  const mediaCol = block.querySelector('.hero-media');
  if (mediaCol) {
    mediaCol.dataset.aueProp = 'image';
    mediaCol.dataset.aueType = 'media';
    mediaCol.dataset.aueLabel = 'Imagen de fondo';
  }

  // Col 1 — contenido richtext (campo "text" en _hero.json)
  const contentCol = block.querySelector('.hero-content');
  if (contentCol) {
    contentCol.dataset.aueProp = 'text';
    contentCol.dataset.aueType = 'richtext';
    contentCol.dataset.aueLabel = 'Contenido de texto';
  }
}
