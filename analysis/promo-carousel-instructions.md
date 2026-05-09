# Instrucciones de Bloque: promo-carousel
> Generado por: Figma Analyst
> Archivo Figma: https://www.figma.com/design/DwoFVMeUoYBqDt0MfBKNeq/o2online
> Nodo(s) de referencia: 6:129 (mobile), 6:712 (desktop)
> Complejidad: Alta
> Requiere JS: sí
> Modelo UE: xwalk

---

## 1. Descripción y Propósito

Sección de promociones con título, subtítulo y un carrusel horizontal de tarjetas de producto. Cada tarjeta tiene imagen, badge/etiqueta (con color de fondo propio), título y enlace "Saber más". Las tarjetas promocionan productos como LaLiga con O2, dispositivos, Cloud y eSIM. En desktop se ven 4 tarjetas en línea; en mobile se hace scroll horizontal con 1 tarjeta visible y parte de la siguiente.

## 2. Variantes Detectadas

- **Default:** Fondo blanco, tarjetas con imagen + badge + título + link.
- Los badges tienen colores diferentes por tarjeta (verde, morado/eSIM, azul). El color del badge es contenido editorial, no una variante del bloque.

## 3. Estructura DOM

### ENTRADA — Matriz EDS (lo que decorate recibe):

```
block (promo-carousel)
  └── div (fila 1 — título de sección)
        └── div (col 0)
              ├── <h2> ← "Descubre todo lo que O2 tiene para ti"
              └── <p> ← subtítulo: "Los mejores extras para tus tarifas de fibra y móvil"
  └── div (fila 2 — tarjeta 1: LaLiga)
        ├── div (col 0)
        │     └── <picture> ← imagen de la tarjeta (LaLiga)
        └── div (col 1)
              ├── <p> ← "FÚTBOL" (texto del badge)
              ├── <h3> ← "LaLiga con O2"
              └── <p><a href="...">Saber más</a></p>
  └── div (fila 3 — tarjeta 2: Dispositivos)
        ├── div (col 0)
        │     └── <picture> ← imagen de la tarjeta
        └── div (col 1)
              ├── <p> ← "NOVEDAD"
              ├── <h3> ← "Móviles y dispositivos desde 0€"
              └── <p><a href="...">Saber más</a></p>
  └── div (fila 4 — tarjeta 3: Cloud)
        ├── div (col 0)
        │     └── <picture> ← imagen
        └── div (col 1)
              ├── <p> ← "CLOUD"
              ├── <h3> ← "Almacenamiento en la nube"
              └── <p><a href="...">Saber más</a></p>
  └── div (fila 5 — tarjeta 4: eSIM)
        ├── div (col 0)
        │     └── <picture> ← imagen
        └── div (col 1)
              ├── <p> ← "eSIM"
              ├── <h3> ← "Activa tu eSIM"
              └── <p><a href="...">Saber más</a></p>
```

### SALIDA — DOM decorado (lo que decorate produce):

```html
<div class="promo-carousel">
  <div class="promo-carousel-header">
    <h2 class="promo-carousel-title">Descubre todo lo que O2 tiene para ti</h2>
    <p class="promo-carousel-subtitle">Los mejores extras para tus tarifas de fibra y móvil</p>
  </div>

  <div class="promo-carousel-track">
    <!-- Tarjeta 1 -->
    <div class="promo-carousel-card">
      <div class="promo-carousel-card-image">
        <picture>
          <img src="..." alt="LaLiga con O2" loading="lazy" decoding="async">
        </picture>
      </div>
      <div class="promo-carousel-card-content">
        <span class="promo-carousel-badge">FÚTBOL</span>
        <h3 class="promo-carousel-card-title">LaLiga con O2</h3>
        <a href="..." class="promo-carousel-card-link">Saber más</a>
      </div>
    </div>

    <!-- Tarjetas 2, 3, 4... (misma estructura) -->
  </div>

  <!-- Navegación (solo si se implementan botones prev/next) -->
  <div class="promo-carousel-nav">
    <button class="promo-carousel-prev" aria-label="Anterior">‹</button>
    <button class="promo-carousel-next" aria-label="Siguiente">›</button>
  </div>
</div>
```

## 4. Variables CSS del Bloque

```css
.promo-carousel {
  --promo-bg: #ffffff;
  --promo-card-bg: #ffffff;
  --promo-card-radius: 16px;
  --promo-card-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  --promo-card-width-mobile: 280px;
  --promo-card-width-desktop: auto;
  --promo-card-gap: 16px;
  --promo-badge-radius: 15px;
  --promo-badge-padding: 4px 12px;
  --promo-title-color: #000019;
  --promo-link-color: #0050ff;
}
```

## 5. Auto-layouts → CSS

| Auto-layout Figma | CSS equivalente |
|---|---|
| Track: horizontal, scroll mobile | `display: flex; gap: 16px; overflow-x: auto; scroll-snap-type: x mandatory;` |
| Track desktop: 4 cols | `display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px;` (o flex sin scroll) |
| Card: vertical stack | `display: flex; flex-direction: column;` |
| Card image: fill width | `width: 100%; aspect-ratio: 16/10; object-fit: cover;` |
| Card content: vertical | `display: flex; flex-direction: column; padding: 16px; gap: 8px;` |

## 6. Comportamiento Responsivo

- **Desktop (≥1024px):**
  - 4 tarjetas en grid horizontal, ancho igual.
  - Sin scroll horizontal. Sin botones de navegación (todas visibles).
  - Imágenes con border-radius solo en la parte superior de la tarjeta.
  - Sección ocupa ~552px de ancho total.

- **Tablet (768px–1023px):**
  - ⚠️ Sin frame explícito. Inferido: 2-3 tarjetas visibles con scroll horizontal.

- **Mobile (<768px):**
  - Frame: 390px, sección 500px de alto.
  - 1 tarjeta visible completa + parte de la siguiente (indicando scroll).
  - Scroll horizontal con `scroll-snap`.
  - Tarjetas de ~310px de ancho.
  - Gradient de fade en el borde derecho para indicar más contenido.

## 7. Campos Editables para Universal Editor (xwalk)

**Campos del contenedor raíz** (`id: promo-carousel`):

| Campo | `name` | `component` | `valueType` | ¿Requerido? |
|---|---|---|---|---|
| Título de sección | `sectionTitle` | `text` | `string` | sí |
| Subtítulo | `subtitle` | `text` | `string` | no |

**Campos de cada tarjeta/item** (`id: promo-carousel-item` — container/items):

| Campo | `name` | `component` | `valueType` | ¿Requerido? |
|---|---|---|---|---|
| Imagen | `image` | `reference` | `string` | sí |
| Texto del badge | `badgeText` | `text` | `string` | no |
| Título de la tarjeta | `cardTitle` | `text` | `string` | sí |
| Enlace "Saber más" | `cardLink` | `text` | `string` | sí |
| Texto del enlace | `cardLinkText` | `text` | `string` | sí |

## 8. Gestión de Imágenes y Media

- **Imágenes de tarjeta:** Origen: celda del bloque → `<picture>` ya en DOM. Cada tarjeta tiene una imagen de producto (~310×186px en Figma).
  - **Formato recomendado:** WebP con fallback JPEG.
  - **Proporciones:** ~16:10.
  - **Responsive:** Mantiene proporción, se adapta al ancho de la tarjeta.
  - `loading="lazy"`, `decoding="async"` — todas están below-the-fold.
- ⚠️ POSICIÓN LCP NO CONFIRMADA — Bloque below-the-fold. Ninguna imagen es candidata LCP.

## 9. Interacciones y Animaciones

- **Scroll horizontal en mobile:** Solo CSS con `overflow-x: auto; scroll-snap-type: x mandatory; scroll-snap-align: start;`.
- **Botones prev/next (opcional):** Requiere JS — para navegar entre tarjetas del carrusel. Se recomienda implementar solo si se requiere UX de paginación. El scroll nativo funciona sin JS.
- **Hover en tarjetas:** Solo CSS — `transform: translateY(-4px)` + sombra más intensa.
- **Hover en "Saber más":** Solo CSS — subrayado o cambio de color.
- Clasificación: **requiere JS** (navegación de carrusel con botones, gestión de visibilidad en desktop).

## 10. Notas y Ambigüedades

- ⚠️ En el diseño desktop se muestran exactamente 4 tarjetas. Si el autor añade más de 4, el comportamiento deseado es ambiguo: ¿scroll horizontal? ¿paginación? ¿ocultar excedentes? Se recomienda implementar scroll horizontal como fallback.
- ⚠️ Los badges tienen colores de fondo diferentes por tarjeta (verde para FÚTBOL, morado para eSIM, azul para CLOUD, etc.). Este color podría gestionarse como campo adicional o como clase CSS basada en el texto del badge.
- ♿ El carrusel debe incluir `role="region"` con `aria-label` descriptivo y botones de navegación con `aria-label`.
- ♿ El gradient de fade que indica "más contenido" no es accesible — asegurarse de que el scroll sea descubrible por teclado.

## 11. component-models.json individual

```json
[
  {
    "id": "promo-carousel",
    "fields": [
      {
        "component": "text",
        "name": "sectionTitle",
        "value": "",
        "label": "Título de sección",
        "valueType": "string"
      },
      {
        "component": "text",
        "name": "subtitle",
        "value": "",
        "label": "Subtítulo",
        "valueType": "string"
      }
    ]
  },
  {
    "id": "promo-carousel-item",
    "fields": [
      {
        "component": "reference",
        "name": "image",
        "value": "",
        "label": "Imagen",
        "valueType": "string"
      },
      {
        "component": "text",
        "name": "badgeText",
        "value": "",
        "label": "Texto del badge",
        "valueType": "string"
      },
      {
        "component": "text",
        "name": "cardTitle",
        "value": "",
        "label": "Título de la tarjeta",
        "valueType": "string"
      },
      {
        "component": "text",
        "name": "cardLink",
        "value": "",
        "label": "Enlace",
        "valueType": "string"
      },
      {
        "component": "text",
        "name": "cardLinkText",
        "value": "",
        "label": "Texto del enlace",
        "valueType": "string"
      }
    ]
  }
]
```

## 12. component-definition.json individual

```json
{
  "title": "Promo Carousel",
  "id": "promo-carousel",
  "plugins": {
    "xwalk": {
      "page": {
        "resourceType": "core/franklin/components/block",
        "template": {}
      }
    }
  }
}
```
