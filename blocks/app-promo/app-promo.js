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
  const row = block.children[0];
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

  // Contenedor raíz
  block.dataset.aueResource = `urn:aemconnection:${window.location.pathname}/jcr:content/app-promo`;
  block.dataset.aueType = 'component';
  block.dataset.aueModel = 'app-promo';
  block.dataset.aueLabel = 'App Promo';

  // Título
  const title = textCol?.querySelector('.app-promo-title');
  if (title) {
    title.dataset.aueProp = 'title';
    title.dataset.aueType = 'text';
    title.dataset.aueLabel = 'Título';
  }

  // Descripción
  const description = textCol?.querySelector('.app-promo-description');
  if (description) {
    description.dataset.aueProp = 'description';
    description.dataset.aueType = 'richtext';
    description.dataset.aueLabel = 'Descripción';
  }

  // Lista de características
  const features = textCol?.querySelector('.app-promo-features');
  if (features) {
    features.dataset.aueProp = 'features';
    features.dataset.aueType = 'richtext';
    features.dataset.aueLabel = 'Lista de características';
  }

  // Imagen del teléfono
  const phonePicture = imageCol?.querySelector('picture');
  if (phonePicture) {
    phonePicture.dataset.aueProp = 'phoneImage';
    phonePicture.dataset.aueType = 'media';
    phonePicture.dataset.aueLabel = 'Imagen del teléfono';
  }
}
