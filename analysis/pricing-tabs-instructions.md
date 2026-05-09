# Instrucciones de Bloque: pricing-tabs
> Generado por: Figma Analyst
> Archivo Figma: https://www.figma.com/design/DwoFVMeUoYBqDt0MfBKNeq/o2online
> Nodo(s) de referencia: 6:12 (mobile), 6:601 (desktop)
> Complejidad: Alta
> Requiere JS: sí
> Modelo UE: xwalk

---

## 1. Descripción y Propósito

Sección principal de selección de tarifas. Muestra un título ("Elige tu tarifa"), una barra de tabs horizontales para filtrar por categoría de tarifa (Fibra y Móvil, Fibra Móvil y TV, Fibra, Móvil), y un panel de tarjetas de precio por cada tab. Cada tarjeta muestra datos de la tarifa (fibra + móvil), precio, y dos CTAs ("Saber más" / "Lo quiero"). Debajo del panel de tarjetas aparece un banner de líneas adicionales (LMA).

## 2. Variantes Detectadas

- **Default (Fibra y Móvil):** Tab activa con fondo azul `#0050ff` y texto blanco. Tabs inactivas con borde gris y fondo blanco.
- No se detectan variantes CSS adicionales del bloque en sí. Las tabs se activan por JS.

## 3. Estructura DOM

### ENTRADA — Matriz EDS (lo que decorate recibe):

```
block (pricing-tabs)
  └── div (fila 1 — título de sección)
        └── div (col 0)
              └── <h2> ← "Elige tu tarifa"
  └── div (fila 2 — tabs)
        └── div (col 0)
              └── <p> ← "Fibra y Móvil"
        └── div (col 1)
              └── <p> ← "Fibra, Móvil y TV"
        └── div (col 2)
              └── <p> ← "Fibra"
        └── div (col 3)
              └── <p> ← "Móvil"
  └── div (fila 3 — tarjeta 1)
        └── div (col 0)
              ├── <h3> ← "Fibra 600MB / Móvil 60GB" (con <strong> en cantidades)
              └── <p> ← precio "35 €/mes" + "precio final"
        └── div (col 1)
              ├── <p><a href="...">Saber más</a></p>
              └── <p><a href="...">Lo quiero</a></p>
  └── div (fila 4 — tarjeta 2)
        └── div (col 0)
              ├── <h3> ← datos de la tarifa
              └── <p> ← precio
        └── div (col 1)
              ├── <p><a>Saber más</a></p>
              └── <p><a>Lo quiero</a></p>
  └── div (fila 5 — tarjeta 3)
        └── div (col 0)
              ├── <h3> ← datos de la tarifa
              └── <p> ← precio
        └── div (col 1)
              ├── <p><a>Saber más</a></p>
              └── <p><a>Lo quiero</a></p>
  └── div (fila 6 — banner LMA)
        └── div (col 0)
              └── <p><a href="...">Añade líneas adicionales...</a></p>
```

### SALIDA — DOM decorado (lo que decorate produce):

```html
<div class="pricing-tabs">
  <!-- Título -->
  <h2 class="pricing-tabs-title">Elige tu tarifa</h2>

  <!-- Tab bar -->
  <div class="pricing-tabs-tablist" role="tablist">
    <button class="pricing-tabs-tab pricing-tabs-tab--active" role="tab" aria-selected="true">Fibra y Móvil</button>
    <button class="pricing-tabs-tab" role="tab" aria-selected="false">Fibra, Móvil y TV</button>
    <button class="pricing-tabs-tab" role="tab" aria-selected="false">Fibra</button>
    <button class="pricing-tabs-tab" role="tab" aria-selected="false">Móvil</button>
  </div>

  <!-- Tab panel -->
  <div class="pricing-tabs-panel" role="tabpanel">
    <!-- Tarjeta 1 -->
    <div class="pricing-tabs-card">
      <div class="pricing-tabs-card-info">
        <h3>Fibra <strong>600MB</strong><br>Móvil <strong>60GB</strong></h3>
      </div>
      <div class="pricing-tabs-card-price">
        <span class="pricing-tabs-price-amount">35</span>
        <span class="pricing-tabs-price-unit">€/mes</span>
        <span class="pricing-tabs-price-note">precio final</span>
      </div>
      <div class="pricing-tabs-card-actions">
        <a href="..." class="pricing-tabs-cta pricing-tabs-cta--primary">Saber más</a>
        <a href="..." class="pricing-tabs-cta pricing-tabs-cta--secondary">Lo quiero</a>
      </div>
    </div>

    <!-- Tarjeta 2, 3... (misma estructura) -->

    <!-- Banner LMA -->
    <div class="pricing-tabs-lma">
      <a href="...">Añade líneas adicionales a tu tarifa...</a>
    </div>
  </div>
</div>
```

## 4. Variables CSS del Bloque

```css
.pricing-tabs {
  --pricing-bg: #f5f5f5;
  --pricing-card-bg: #ffffff;
  --pricing-card-radius: 16px;
  --pricing-card-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  --pricing-tab-active-bg: #0050ff;
  --pricing-tab-active-color: #ffffff;
  --pricing-tab-inactive-bg: transparent;
  --pricing-tab-inactive-color: #4a4a4a;
  --pricing-tab-inactive-border: 1px solid #dadada;
  --pricing-tab-radius: 60px;
  --pricing-cta-primary-bg: #0050ff;
  --pricing-cta-primary-color: #ffffff;
  --pricing-cta-secondary-bg: transparent;
  --pricing-cta-secondary-color: #0050ff;
  --pricing-cta-secondary-border: 1px solid #0050ff;
  --pricing-lma-bg: #000019;
  --pricing-lma-color: #ffffff;
}
```

## 5. Auto-layouts → CSS

| Auto-layout Figma | CSS equivalente |
|---|---|
| Tab list: horizontal, scroll en mobile | `display: flex; overflow-x: auto; gap: 8px;` |
| Cards: vertical stack mobile | `display: flex; flex-direction: column; gap: 16px;` |
| Cards: horizontal row desktop | `display: flex; flex-direction: row; gap: 16px; justify-content: center;` |
| Card content: horizontal info + price | `display: flex; justify-content: space-between;` |
| Card actions: horizontal 2 botones | `display: flex; gap: 8px;` |

## 6. Comportamiento Responsivo

- **Desktop (≥1024px):**
  - Tabs centradas horizontalmente.
  - Tarjetas de precio en fila horizontal (3 visibles lado a lado, ~280px cada una).
  - Banner LMA en una fila horizontal completa debajo de las tarjetas, 56px de alto.
  - Gradient de fade a la derecha para indicar scroll.

- **Tablet (768px–1023px):**
  - ⚠️ No hay frame explícito de tablet. Inferido: tarjetas en 2 columnas o scroll horizontal.
  - Tabs se mantienen horizontales con scroll.

- **Mobile (<768px):**
  - Frame: 390px, sección total 1068px de alto.
  - Tabs con scroll horizontal (se ven 2 y parte de la tercera). Gradient derecho visible (nodo 6:36).
  - Tarjetas apiladas verticalmente, centradas (280px de ancho con 40px de margen lateral).
  - Banner LMA apilado verticalmente (360px ancho, 128px alto, texto en varias líneas).
  - Sin imagen en el banner LMA en mobile (se muestra solo texto).
  - Spacing vertical entre tarjetas: 16px.

## 7. Campos Editables para Universal Editor (xwalk)

**Campos del contenedor raíz** (`id: pricing-tabs`):

| Campo | `name` | `component` | `valueType` | ¿Requerido? |
|---|---|---|---|---|
| Título de sección | `sectionTitle` | `text` | `string` | sí |
| Texto banner LMA | `lmaBannerText` | `richtext` | `string` | no |
| Enlace banner LMA | `lmaBannerLink` | `text` | `string` | no |

**Campos de cada tab** (`id: pricing-tabs-tab` — container/items):

| Campo | `name` | `component` | `valueType` | ¿Requerido? |
|---|---|---|---|---|
| Nombre de tab | `tabName` | `text` | `string` | sí |

**Campos de cada tarjeta** (`id: pricing-tabs-card` — container/items):

| Campo | `name` | `component` | `valueType` | ¿Requerido? |
|---|---|---|---|---|
| Datos de tarifa (richtext) | `tariffInfo` | `richtext` | `string` | sí |
| Precio (número) | `price` | `text` | `string` | sí |
| Texto de precio | `priceNote` | `text` | `string` | no |
| Enlace "Saber más" | `linkMore` | `text` | `string` | sí |
| Texto "Saber más" | `linkMoreText` | `text` | `string` | sí |
| Enlace "Lo quiero" | `linkBuy` | `text` | `string` | sí |
| Texto "Lo quiero" | `linkBuyText` | `text` | `string` | sí |
| Tab padre (categoría) | `tabCategory` | `select` | `string` | sí |

## 8. Gestión de Imágenes y Media

- **Banner LMA en desktop:** Contiene una imagen pequeña (`foto-lma-faldon.png`, nodo 6:702, 104x80px). Origen: celda del bloque → `<picture>` ya en DOM. `loading="lazy"`, `decoding="async"`.
- **Banner LMA en mobile:** La imagen NO se muestra (oculta o no incluida).
- ⚠️ POSICIÓN LCP NO CONFIRMADA — Este bloque NO es above-the-fold; está después del hero. Todas las imágenes llevan `loading="lazy"`.

## 9. Interacciones y Animaciones

- **Tab switching:** Requiere JS. Click en tab activa el panel correspondiente. Animación recomendada: `opacity` transition CSS en el panel (300ms ease).
- **Scroll horizontal de tabs en mobile:** Solo CSS con `overflow-x: auto; scroll-snap-type: x mandatory;`.
- **Hover en tarjetas:** Solo CSS — `box-shadow` transition.
- **Hover en botones CTA:** Solo CSS — `background-color` y `color` transition.
- Clasificación: **requiere JS** (para tab switching y filtrado de tarjetas).

## 10. Notas y Ambigüedades

- ⚠️ El diseño muestra solo el panel de "Fibra y Móvil" activo. Los paneles de las otras tabs (Fibra Móvil y TV, Fibra, Móvil) no son visibles en el Figma. El Developer deberá implementar el switching de paneles ocultando/mostrando los grupos de tarjetas correspondientes.
- ⚠️ La estructura de datos para asociar tarjetas a tabs en el modelo xwalk puede requerir un campo `tabCategory` en cada tarjeta, o bien tabs y tarjetas como items separados en un container.
- ♿ Los tabs deben implementar el patrón ARIA de tablist/tab/tabpanel con gestión de foco por teclado (flechas izquierda/derecha).
- ⚠️ El gradient en el borde derecho (nodo 6:36, 6:625) indica scroll disponible. Implementar como pseudo-elemento CSS `::after` con gradient.

## 11. component-models.json individual

```json
{
  "id": "pricing-tabs",
  "fields": [
    {
      "component": "text",
      "name": "sectionTitle",
      "value": "",
      "label": "Título de sección",
      "valueType": "string"
    },
    {
      "component": "richtext",
      "name": "lmaBannerText",
      "value": "",
      "label": "Texto banner líneas adicionales",
      "valueType": "string"
    },
    {
      "component": "text",
      "name": "lmaBannerLink",
      "value": "",
      "label": "Enlace banner líneas adicionales",
      "valueType": "string"
    }
  ]
}
```

## 12. component-definition.json individual

```json
{
  "title": "Pricing Tabs",
  "id": "pricing-tabs",
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
