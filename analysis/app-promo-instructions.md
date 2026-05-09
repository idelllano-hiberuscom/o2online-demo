# Instrucciones de Bloque: app-promo
> Generado por: Figma Analyst
> Archivo Figma: https://www.figma.com/design/DwoFVMeUoYBqDt0MfBKNeq/o2online
> Nodo(s) de referencia: 6:263 (mobile), 6:844 (desktop)
> Complejidad: Media
> Requiere JS: no
> Modelo UE: xwalk

---

## 1. Descripción y Propósito

Sección promocional de la App Mi O2 con fondo degradado azul (de `#0050ff` a `#000019`). Contiene título, párrafo descriptivo, lista de características con iconos de check, y badges de descarga de App Store y Google Play. En desktop se divide en 2 columnas: contenido textual a la izquierda y mockup del teléfono a la derecha. En mobile, el teléfono está recortado/parcialmente visible en la parte inferior.

## 2. Variantes Detectadas

- **Default:** Fondo gradiente azul, texto blanco, lista con checks, badges de apps.
- No se detectan variantes adicionales en el diseño.

## 3. Estructura DOM

### ENTRADA — Matriz EDS (lo que decorate recibe):

```
block (app-promo)
  └── div (fila 1 — contenido principal)
        ├── div (col 0 — texto)
        │     ├── <h2> ← "App Mi O2"
        │     ├── <p> ← texto descriptivo (1-2 párrafos)
        │     ├── <ul> ← lista de características
        │     │     ├── <li> ← "Consulta tus datos y facturas"
        │     │     ├── <li> ← "Gestiones en 1 click"
        │     │     ├── <li> ← "Ahorra con wifi automático"
        │     │     ├── <li> ← "Wifi seguro en casa"
        │     │     └── <li> ← "Soporte en tiempo real"
        │     ├── <p><a href="...">App Store badge</a></p>
        │     └── <p><a href="...">Google Play badge</a></p>
        └── div (col 1 — imagen)
              └── <picture> ← mockup del teléfono (mobile_appmio2.png)
```

### SALIDA — DOM decorado (lo que decorate produce):

```html
<div class="app-promo">
  <div class="app-promo-content">
    <h2 class="app-promo-title">App Mi O2</h2>
    <p class="app-promo-description">Texto descriptivo de la app...</p>
    <ul class="app-promo-features">
      <li>Consulta tus datos y facturas</li>
      <li>Gestiones en 1 click</li>
      <li>Ahorra con wifi automático</li>
      <li>Wifi seguro en casa</li>
      <li>Soporte en tiempo real</li>
    </ul>
    <div class="app-promo-badges">
      <a href="..." class="app-promo-badge">
        <img src="..." alt="Disponible en el App Store" loading="lazy" decoding="async">
      </a>
      <a href="..." class="app-promo-badge">
        <img src="..." alt="Disponible en Google Play Store" loading="lazy" decoding="async">
      </a>
    </div>
  </div>
  <div class="app-promo-image">
    <picture>
      <img src="..." alt="App Mi O2 en un smartphone" loading="lazy" decoding="async">
    </picture>
  </div>
</div>
```

## 4. Variables CSS del Bloque

```css
.app-promo {
  --app-promo-bg: linear-gradient(180deg, #0050ff 0%, #000019 100%);
  --app-promo-text-color: #ffffff;
  --app-promo-check-color: #ffffff;
  --app-promo-badge-height: 48px;
  --app-promo-padding-y: 40px;
  --app-promo-padding-x: 15px;
  --app-promo-gap: 16px;
}
```

## 5. Auto-layouts → CSS

| Auto-layout Figma | CSS equivalente |
|---|---|
| Sección completa: gradiente de fondo | `background: linear-gradient(180deg, #0050ff 0%, #000019 100%);` |
| Desktop: 2 columnas 50/50 | `display: grid; grid-template-columns: 1fr 1fr; gap: 0;` |
| Mobile: 1 columna | `display: flex; flex-direction: column;` |
| Lista de features: vertical | `list-style: none; display: flex; flex-wrap: wrap; gap: 8px;` |
| Badges: horizontal | `display: flex; gap: 16px;` |

## 6. Comportamiento Responsivo

- **Desktop (≥1024px):**
  - Layout 50/50: texto a la izquierda (col 0, ~632px), imagen del teléfono a la derecha (col 1, ~632px).
  - Imagen del teléfono: `mobile_appmio2.png`, 460×457px, posicionada con offset negativo (sobresale por arriba/abajo del contenedor, overflow visible).
  - Título: OnAir-Black 44px white.
  - Descripción: OnAir-Light 18px white.
  - Lista de features: horizontal con wrap (2-3 items por línea), con icono check SVG blanco (18×18px) + texto OnAir-Light 16px white.
  - Badges de apps: 147×48px y 158×47px.
  - Sección total: ~401px de alto.

- **Tablet (768px–1023px):**
  - ⚠️ Sin frame explícito. Inferido: layout 50/50 con imagen redimensionada.

- **Mobile (<768px):**
  - Frame 390px, sección ~594px de alto.
  - Una sola columna: título, descripción, features apiladas verticalmente (1 item por línea), badges debajo.
  - Imagen del teléfono: aparece parcialmente visible / recortada en la parte inferior (overflow hidden probable).
  - Título: OnAir-Black ~36px.
  - Features: lista vertical con checkmarks.

## 7. Campos Editables para Universal Editor (xwalk)

| Campo | `name` | `component` | `valueType` | ¿Requerido? |
|---|---|---|---|---|
| Título | `title` | `text` | `string` | sí |
| Descripción | `description` | `richtext` | `string` | sí |
| Lista de características | `features` | `richtext` | `string` | sí |
| Enlace App Store | `appStoreLink` | `text` | `string` | no |
| Imagen badge App Store | `appStoreBadge` | `reference` | `string` | no |
| Enlace Google Play | `googlePlayLink` | `text` | `string` | no |
| Imagen badge Google Play | `googlePlayBadge` | `reference` | `string` | no |
| Imagen del teléfono | `phoneImage` | `reference` | `string` | no |

## 8. Gestión de Imágenes y Media

- **Mockup del teléfono:** Origen: celda del bloque → `<picture>` ya en DOM. Imagen `mobile_appmio2.png` (460×457px en desktop). `loading="lazy"`, `decoding="async"`.
  - **Formato recomendado:** WebP con fallback PNG (transparencia necesaria para el recorte).
  - **Proporciones:** ~1:1.
  - **Responsive:** En mobile se recorta/reduce. En desktop se posiciona con offset negativo.

- **Badges de App Store y Google Play:** Origen: celda del bloque → `<picture>` ya en DOM. Imágenes estáticas ~147×48px y 158×47px.
  - `loading="lazy"`, `decoding="async"`.
  - `alt="Disponible en el App Store"` / `alt="Disponible en Google Play Store"`.

- **Iconos de check (lista de features):** SVG inline o background-image CSS. Origen: NO celda del bloque → se implementan como pseudo-elemento CSS `::before` con SVG inline en `background-image`, o como imagen de lista `list-style-image`.

- ⚠️ POSICIÓN LCP NO CONFIRMADA — Bloque below-the-fold. Ninguna imagen es candidata LCP.

## 9. Interacciones y Animaciones

- **Hover en badges:** Solo CSS — `opacity: 0.8` o `transform: scale(1.05)`.
- No hay animaciones complejas detectadas.
- Clasificación: **solo CSS**.

## 10. Notas y Ambigüedades

- ⚠️ La imagen del teléfono en desktop tiene coordenadas negativas (`x=-333, y=-60` en el frame Figma), lo que indica que sobresale del contenedor. El Developer necesitará `overflow: visible` en el contenedor del bloque o `position: relative` + `position: absolute` para la imagen.
- ⚠️ Los iconos de check (variant-white.svg) de la lista de features no provienen de una celda de la tabla, sino que son decoraciones visuales. Se implementan como `::before` pseudo-elementos en CSS con un SVG inline.
- ♿ Los badges de apps deben tener `alt` descriptivos.
- ♿ La lista de features (`<ul>/<li>`) mantiene semántica correcta nativamente.

## 11. component-models.json individual

```json
{
  "id": "app-promo",
  "fields": [
    {
      "component": "text",
      "name": "title",
      "value": "",
      "label": "Título",
      "valueType": "string"
    },
    {
      "component": "richtext",
      "name": "description",
      "value": "",
      "label": "Descripción",
      "valueType": "string"
    },
    {
      "component": "richtext",
      "name": "features",
      "value": "",
      "label": "Lista de características",
      "valueType": "string"
    },
    {
      "component": "text",
      "name": "appStoreLink",
      "value": "",
      "label": "Enlace App Store",
      "valueType": "string"
    },
    {
      "component": "reference",
      "name": "appStoreBadge",
      "value": "",
      "label": "Imagen badge App Store",
      "valueType": "string"
    },
    {
      "component": "text",
      "name": "googlePlayLink",
      "value": "",
      "label": "Enlace Google Play",
      "valueType": "string"
    },
    {
      "component": "reference",
      "name": "googlePlayBadge",
      "value": "",
      "label": "Imagen badge Google Play",
      "valueType": "string"
    },
    {
      "component": "reference",
      "name": "phoneImage",
      "value": "",
      "label": "Imagen del teléfono",
      "valueType": "string"
    }
  ]
}
```

## 12. component-definition.json individual

```json
{
  "title": "App Promo",
  "id": "app-promo",
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
