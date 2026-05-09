# Instrucciones de Bloque: hero
> Generado por: Figma Analyst
> Archivo Figma: https://www.figma.com/design/DwoFVMeUoYBqDt0MfBKNeq/o2online
> Nodo(s) de referencia: 6:591 (desktop), 6:3 (mobile)
> Complejidad: Simple
> Requiere JS: sí
> Modelo UE: xwalk (instrumentación boilerplate existente — NO modificar)
> Tipo: Adaptación visual de bloque boilerplate existente

---

## 1. Descripción y Propósito

Hero principal de la landing de O2 con imagen de fondo completa (oso azul O2) y contenido de texto superpuesto alineado a la izquierda. Muestra: heading `<h1>` ("O2 tu compañía de Fibra y Móvil"), texto grande destacado ("Cuando todo funciona, respiras") y un CTA con botón pill azul ("Descubre nuestras tarifas"). El contenido se contiene en un max-width ~600px alineado a la izquierda con padding generoso. En mobile, el texto se comprime a una región más estrecha.

## 2. Variantes Detectadas

- **Default:** Imagen de fondo + texto blanco + CTA pill azul. No se detectan variantes adicionales en el Figma.

## 3. Estructura DOM

### ENTRADA — Matriz EDS (lo que decorate recibe):

```
block (hero)
  └── div (fila 0)
        ├── div (col 0)
        │     └── <picture> ← imagen del hero (oso O2), entregada por EDS
        │           ├── <source> (srcset para breakpoints)
        │           └── <img> (src, alt, width, height)
        └── div (col 1)
              ├── <h1> ← "O2 tu compañía de Fibra y Móvil"
              ├── <p> ← "Cuando todo funciona, respiras" (texto destacado)
              └── <p><a href="...">Descubre nuestras tarifas</a></p> ← CTA como link envuelto en <p>
```

> **Nota sobre el modelo existente:** El `_hero.json` define un modelo con campos `image` (reference), `imageAlt` (text) y `text` (richtext). El richtext del campo `text` produce todo el contenido de col 1: el `<h1>`, los `<p>` y el link CTA.

### SALIDA — DOM decorado (lo que decorate produce):

```html
<div class="hero">
  <div class="hero-row"> <!-- fila 0, clase añadida -->
    <div class="hero-media"> <!-- col 0, clase añadida -->
      <picture>
        <source srcset="..." media="(min-width: 900px)">
        <img src="..." alt="Hero O2" loading="eager" fetchpriority="high" width="..." height="...">
      </picture>
    </div>
    <div class="hero-content"> <!-- col 1, clase añadida -->
      <h1 class="hero-title">O2 tu compañía de Fibra y Móvil</h1>
      <p class="hero-highlight">Cuando todo funciona, respiras</p>
      <p class="hero-cta-wrapper">
        <a href="..." class="hero-cta button">Descubre nuestras tarifas</a>
      </p>
    </div>
  </div>
</div>
```

## 4. Variables CSS del Bloque

```css
.hero {
  --hero-bg-color: transparent; /* imagen de fondo cubre todo */
  --hero-text-color: white;
  --hero-title-size-mobile: 22px;
  --hero-title-size-desktop: 28px;
  --hero-title-line-height: 32px;
  --hero-highlight-size-mobile: 28px;
  --hero-highlight-size-desktop: 40px;
  --hero-highlight-line-height: 48px;
  --hero-cta-bg: #0050ff;
  --hero-cta-radius: 60px; /* pill */
  --hero-cta-size: 16px;
  --hero-content-max-width: 600px;
  --hero-content-gap: 8px;
  --hero-padding-left-desktop: 65px;
  --hero-padding-vertical-desktop: 140px;
}
```

## 5. Auto-layouts → CSS

| Auto-layout Figma | CSS equivalente |
|---|---|
| Hero fullwidth con imagen de fondo | `position: relative; width: 100%; min-height: 500px;` |
| Contenido vertical, gap 8px | `display: flex; flex-direction: column; gap: 8px;` |
| Contenido alineado izquierda, max-width 600px | `max-width: 600px; align-items: flex-start;` |
| Padding izquierdo 65px desktop | `padding-left: 65px;` |
| Padding vertical 140px desktop | `padding-top: 140px; padding-bottom: 140px;` |

## 6. Cambios CSS Necesarios

### 6a. Posicionamiento de imagen de fondo (ya en boilerplate)

El CSS actual ya posiciona la imagen como fondo absoluto — **mantener sin cambios:**

```css
/* YA EXISTE — no modificar */
.hero picture {
  position: absolute;
  z-index: -1;
  inset: 0;
}

.hero img {
  object-fit: cover;
  width: 100%;
  height: 100%;
}
```

### 6b. Contenedor del hero — padding y min-height

```css
/* ANTES */
.hero {
  position: relative;
  padding: 40px 24px;
  min-height: 300px;
}

/* DESPUÉS */
.hero {
  position: relative;
  padding: 80px 24px;
  min-height: 420px; /* mobile: ~420px según Figma (390×420-528) */
  display: flex;
  align-items: center;
}

@media (width >= 900px) {
  .hero {
    padding: 140px 32px 140px 65px;
    min-height: 500px;
  }
}
```

### 6c. Contenido de texto

```css
/* Contenedor de texto — max-width y flex column */
.hero-content,
.hero > div > div:last-child {
  display: flex;
  flex-direction: column;
  gap: 8px;
  max-width: 600px;
  position: relative; /* sobre la imagen */
  z-index: 1;
}
```

### 6d. Título H1

```css
/* ANTES */
.hero h1 {
  max-width: 1200px;
  margin-left: auto;
  margin-right: auto;
  color: var(--background-color); /* white */
}

/* DESPUÉS */
.hero h1 {
  font-family: var(--heading-font-family); /* Roboto Condensed = OnAir-Bold */
  font-size: 22px;
  font-weight: 700;
  line-height: 1.3;
  color: white;
  margin: 0;
  max-width: none;
  text-align: left;
}

@media (width >= 900px) {
  .hero h1 {
    font-size: 28px;
    line-height: 32px;
  }
}
```

### 6e. Texto destacado (párrafo grande)

El primer `<p>` dentro de la zona de contenido es el texto destacado ("Cuando todo funciona, respiras"), visualmente más grande que el H1.

```css
/* Texto destacado — párrafo principal */
.hero-highlight,
.hero > div > div:last-child > p:first-of-type {
  font-family: var(--heading-font-family); /* Roboto Condensed = OnAir-Black */
  font-size: 28px;
  font-weight: 900;
  line-height: 1.3;
  color: white;
  margin: 0;
}

@media (width >= 900px) {
  .hero-highlight,
  .hero > div > div:last-child > p:first-of-type {
    font-size: 40px;
    line-height: 48px;
  }
}
```

### 6f. Botón CTA (pill)

EDS convierte automáticamente links solos en un `<p>` en elementos con clase `.button`. El CSS debe estilar este botón como pill.

```css
/* CTA button — pill shape */
.hero a.button,
.hero .hero-cta {
  display: inline-block;
  background-color: #0050ff;
  color: white;
  border: none;
  border-radius: 60px; /* pill */
  padding: 10px 24px;
  font-family: var(--heading-font-family);
  font-size: 16px;
  font-weight: 700;
  text-decoration: none;
  text-align: center;
  white-space: nowrap;
  cursor: pointer;
  transition: background-color 0.2s ease;
  margin-top: 8px;
}

.hero a.button:hover,
.hero .hero-cta:hover {
  background-color: #003dcc;
  color: white;
}
```

### 6g. Container / wrapper del hero

```css
/* Eliminar constraints del boilerplate wrapper */
.hero-container .hero-wrapper {
  max-width: unset; /* ya existe */
  padding: 0; /* ya existe */
}

/* La fila del hero → sin padding adicional, hereda del .hero */
.hero > div {
  display: contents; /* o flex, según la estructura */
}
```

## 7. Cambios JS Necesarios

El `hero.js` está vacío. Se necesita lógica mínima para:

1. **Añadir clases semánticas** a los divs de fila/columna para un CSS más robusto.
2. **Marcar la imagen como LCP** (añadir `loading="eager"` y `fetchpriority="high"`).

```js
export default function decorate(block) {
  // Obtener la fila principal (primer hijo directo del block)
  const row = block.firstElementChild;
  if (!row) return;

  // Columnas: [0] = media, [1] = content
  const cols = [...row.children];
  if (cols[0]) cols[0].classList.add('hero-media');
  if (cols[1]) cols[1].classList.add('hero-content');

  // Marcar imagen como LCP
  const img = block.querySelector('img');
  if (img) {
    img.loading = 'eager';
    img.fetchPriority = 'high';
  }

  // Marcar el H1
  const h1 = block.querySelector('h1');
  if (h1) h1.classList.add('hero-title');

  // Marcar texto destacado (primer <p> en hero-content)
  const content = block.querySelector('.hero-content');
  if (content) {
    const firstP = content.querySelector('p');
    if (firstP && !firstP.querySelector('a')) {
      firstP.classList.add('hero-highlight');
    }
  }

  // Marcar CTA (link dentro de <p>)
  const ctaLink = content?.querySelector('p a');
  if (ctaLink) {
    ctaLink.classList.add('hero-cta');
    ctaLink.closest('p')?.classList.add('hero-cta-wrapper');
  }
}
```

> ⚠️ **Esto es referencia, no código final.** El Developer decidirá si los selectores CSS puros (`:first-of-type`, `:last-child`) son suficientes sin JS, o si prefiere la robustez de las clases añadidas por JS.

## 8. Comportamiento Responsivo

| Breakpoint | Layout | Detalles |
|---|---|---|
| **Mobile (<768px)** | Texto superpuesto sobre imagen | Padding 80px 24px. Texto comprimido ~max-width 200px (natural por viewport). H1: 22px, highlight: 28px. Min-height 420px. |
| **Tablet (768px–899px)** | Transición | Padding lateral aumenta. Texto max-width 400px. |
| **Desktop (≥900px)** | Texto alineado izquierda con padding amplio | Padding: 140px 32px 140px 65px. Texto max-width 600px. H1: 28px, highlight: 40px/48px lh. Min-height 500px. |

## 9. Campos Editables para Universal Editor (xwalk)

El hero ya tiene un modelo definido en `_hero.json`. Los campos existentes son:

| Campo | `name` | `component` | `valueType` | ¿Requerido? |
|---|---|---|---|---|
| Imagen de fondo | `image` | `reference` | `string` | sí |
| Alt de imagen | `imageAlt` | `text` | `string` | sí |
| Contenido de texto (H1 + highlight + CTA) | `text` | `richtext` | `string` | sí |

> El campo `text` (richtext) contiene todo el texto: el `<h1>`, el párrafo destacado y el link CTA. El autor los edita como contenido enriquecido en el Universal Editor.

**No se añaden ni modifican campos.** El modelo existente es suficiente para el diseño del Figma.

## 10. Gestión de Imágenes y Media

| Imagen | Origen | LCP | Formato | Proporciones |
|---|---|---|---|---|
| Imagen de fondo (oso O2) | Celda del bloque (col 0) → `<picture>` ya en DOM | ✅ **Sí — above-the-fold, primera imagen visible** | WebP con fallback JPEG | ~16:9 (fullwidth, object-fit cover) |

**Tratamiento LCP obligatorio:**
- `loading="eager"` (no lazy)
- `fetchpriority="high"`
- No `decoding="async"` (el LCP debe decodificarse lo antes posible)

> La imagen de fondo del hero es la candidata LCP de la página. Está immediatamente debajo del header (que es transparente/azul sin imagen propia). Es la primera imagen significativa visible en el viewport sin scroll.

## 11. Interacciones y Animaciones

| Elemento | Estado | Tipo | Implementación |
|---|---|---|---|
| Botón CTA | `:hover` | Solo CSS | `background-color` transition 0.2s → `#003dcc` |
| Botón CTA | `:focus-visible` | Solo CSS | `outline: 2px solid white; outline-offset: 2px;` |

**Requiere JS:** No para interacciones. El JS del hero es solo para decoración (clases + LCP). No hay animaciones complejas.

## 12. Notas y Ambigüedades

- ⚠️ **Texto destacado vs H1:** En el Figma, el texto "Cuando todo funciona, respiras" es visualmente MÁS GRANDE que el H1 "O2 tu compañía de Fibra y Móvil". Esto es intencional en el diseño — el H1 es el título semántico (SEO) y el texto destacado es el eslogan visual. El CSS debe reflejar esto con font-size mayor en el `<p>` que en el `<h1>`.
- ⚠️ **Botón CTA sobre imagen:** El botón azul `#0050ff` puede perder contraste sobre zonas azules de la imagen de fondo. Verificar visualmente con la imagen final. Considerar añadir `box-shadow` o `border` sutil si hay pérdida de legibilidad.
- ♿ **Alt de imagen:** El campo `imageAlt` del modelo UE debe ser descriptivo (ej: "Oso de peluche azul con logo O2") ya que la imagen transmite identidad de marca.
- ♿ **CTA accesible:** El link CTA debe tener texto descriptivo ("Descubre nuestras tarifas") — ya lo tiene en el diseño. Añadir `:focus-visible` con outline visible sobre la imagen de fondo.
- ⚠️ **hero.js vacío:** El boilerplate entrega un `hero.js` vacío. Esto significa que actualmente NO se aplican clases semánticas. Los selectores CSS deben funcionar tanto con las clases (si se implementa el JS propuesto) como sin ellas (selectores estructurales como fallback).
