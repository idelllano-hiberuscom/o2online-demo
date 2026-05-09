# Instrucciones de Bloque: benefits-cards
> Generado por: Figma Analyst
> Archivo Figma: https://www.figma.com/design/DwoFVMeUoYBqDt0MfBKNeq/o2online
> Nodo(s) de referencia: 6:318 (mobile), 6:901 (desktop)
> Complejidad: Media
> Requiere JS: no
> Modelo UE: xwalk

---

## 1. Descripción y Propósito

Sección "¿Y con O2 qué ventajas tengo?" con subtítulo y 6 tarjetas de ventajas. Cada tarjeta muestra un icono centrado (66×66px), título y texto descriptivo (con partes en negrita/strong). En desktop se distribuyen en grid de 3 columnas × 2 filas. En mobile, tarjetas apiladas verticalmente. Similar en estructura a `why-o2` pero con 6 tarjetas y 3 columnas desktop.

## 2. Variantes Detectadas

- **Default:** 6 tarjetas con icono, título, texto. Fondo claro/blanco.
- ⚠️ **Relación con why-o2:** Este bloque y `why-o2` comparten la misma estructura visual (icono + título + texto en tarjeta con sombra). Se recomienda evaluar si implementar como un solo bloque `icon-cards` con una clase modificadora para el número de columnas (`icon-cards--cols-3` vs `icon-cards--cols-4`).

## 3. Estructura DOM

### ENTRADA — Matriz EDS (lo que decorate recibe):

```
block (benefits-cards)
  └── div (fila 1 — título de sección)
        └── div (col 0)
              ├── <h2> ← "¿Y con O2 qué ventajas tengo?"
              └── <p> ← subtítulo: "Porque sabemos que tu operadora tiene que darte más"
  └── div (fila 2 — tarjeta 1: Calidad de fibra)
        ├── div (col 0)
        │     └── <picture> ← icon-calidad-de-fibra.svg (66×66px)
        └── div (col 1)
              ├── <h3> ← "La mejor calidad de fibra"
              └── <p> ← texto con <strong> inline
  └── div (fila 3 — tarjeta 2: 5G)
        ├── div (col 0)
        │     └── <picture> ← icon-5g.svg (66×66px)
        └── div (col 1)
              ├── <h3> ← "Tecnología 5G+"
              └── <p> ← texto con <strong> (ej: "ultravelocidad del 5G+ de Telefónica")
  └── div (fila 4 — tarjeta 3: Sin permanencia)
        ├── div (col 0)
        │     └── <picture> ← icon-sin-permanencia.svg (66×66px)
        └── div (col 1)
              ├── <h3> ← "Sin permanencia"
              └── <p> ← texto con <strong>
  └── div (fila 5 — tarjeta 4: Sin sorpresas)
        ├── div (col 0)
        │     └── <picture> ← icon-sin-sorpresas-en-tu-factura.svg (66×66px)
        └── div (col 1)
              ├── <h3> ← "Sin sorpresas en tu factura"
              └── <p> ← texto con <strong> (ej: "Todos los meses pagarás lo mismo.")
  └── div (fila 6 — tarjeta 5: Router Smart WiFi)
        ├── div (col 0)
        │     └── <picture> ← icon-router.svg (66×66px)
        └── div (col 1)
              ├── <h3> ← "Router Smart WiFi 6 incluido"
              └── <p> ← texto con <strong>
  └── div (fila 7 — tarjeta 6: Promos)
        ├── div (col 0)
        │     └── <picture> ← icon-promos.svg (66×66px)
        └── div (col 1)
              ├── <h3> ← "Promos exclusivas"
              └── <p> ← texto con <strong>
```

### SALIDA — DOM decorado (lo que decorate produce):

```html
<div class="benefits-cards">
  <div class="benefits-cards-header">
    <h2 class="benefits-cards-title">¿Y con O2 qué ventajas tengo?</h2>
    <p class="benefits-cards-subtitle">Porque sabemos que tu operadora tiene que darte más</p>
  </div>

  <div class="benefits-cards-grid">
    <!-- Tarjeta 1 -->
    <div class="benefits-cards-card">
      <div class="benefits-cards-card-icon">
        <picture>
          <img src="..." alt="" loading="lazy" decoding="async" width="66" height="66">
        </picture>
      </div>
      <h3 class="benefits-cards-card-title">La mejor calidad de fibra</h3>
      <div class="benefits-cards-card-text">
        <p>Texto descriptivo con <strong>partes en negrita</strong>...</p>
      </div>
    </div>

    <!-- Tarjetas 2-6... (misma estructura) -->
  </div>
</div>
```

## 4. Variables CSS del Bloque

```css
.benefits-cards {
  --benefits-bg: #ffffff;
  --benefits-card-bg: #ffffff;
  --benefits-card-radius: 16px;
  --benefits-card-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  --benefits-card-padding: 15px;
  --benefits-icon-size: 66px;
  --benefits-title-color: #000019;
  --benefits-text-color: #4a4a4a;
  --benefits-text-align: center;
  --benefits-section-padding-top: 64px;
}
```

## 5. Auto-layouts → CSS

| Auto-layout Figma | CSS equivalente |
|---|---|
| Grid mobile: 1 columna | `display: flex; flex-direction: column; gap: 16px;` |
| Grid desktop: 3 columnas × 2 filas | `display: grid; grid-template-columns: repeat(3, 1fr); gap: 14px;` |
| Card: vertical, centrado | `display: flex; flex-direction: column; align-items: center; text-align: center;` |
| Icon wrapper: centrado en margen | `display: flex; justify-content: center; padding: 30px 0;` |
| Container dentro de tarjeta | `padding: 15px;` |

## 6. Comportamiento Responsivo

- **Desktop (≥1024px):**
  - Título y subtítulo centrados en ancho completo.
  - Grid de 3 columnas × 2 filas. Tarjetas ~391×320px.
  - Icono 66×66px centrado con margen de 30px arriba.
  - Gap entre tarjetas: 14px (row gap) × ancho proporcional.
  - Padding de sección: 64px arriba.
  - Sección total: ~932px de alto.

- **Tablet (768px–1023px):**
  - ⚠️ Sin frame explícito. Inferido: 2 columnas con wrap.

- **Mobile (<768px):**
  - Frame 390px.
  - Título y subtítulo centrados.
  - 6 tarjetas apiladas verticalmente, 1 columna (360px ancho).
  - Cada tarjeta con icono 66×66px centrado.
  - Sección bastante alta (~2280px) por las 6 tarjetas apiladas.

## 7. Campos Editables para Universal Editor (xwalk)

**Campos del contenedor raíz** (`id: benefits-cards`):

| Campo | `name` | `component` | `valueType` | ¿Requerido? |
|---|---|---|---|---|
| Título de sección | `sectionTitle` | `text` | `string` | sí |
| Subtítulo | `subtitle` | `text` | `string` | no |

**Campos de cada tarjeta/item** (`id: benefits-cards-item` — container/items):

| Campo | `name` | `component` | `valueType` | ¿Requerido? |
|---|---|---|---|---|
| Icono | `icon` | `reference` | `string` | sí |
| Título de tarjeta | `cardTitle` | `text` | `string` | sí |
| Texto descriptivo | `cardText` | `richtext` | `string` | sí |

## 8. Gestión de Imágenes y Media

- **Iconos de tarjeta (×6):** Origen: celda del bloque → `<picture>` ya en DOM. SVGs de 66×66px:
  - `icon-calidad-de-fibra.svg`
  - `icon-5g.svg`
  - `icon-sin-permanencia.svg`
  - `icon-sin-sorpresas-en-tu-factura.svg`
  - `icon-router.svg`
  - `icon-promos.svg`
  - **Formato recomendado:** SVG.
  - **Proporciones:** 1:1 (66×66px).
  - `loading="lazy"`, `decoding="async"`.
  - `alt=""` — iconos decorativos que acompañan al texto.

- ⚠️ POSICIÓN LCP NO CONFIRMADA — Bloque below-the-fold. Ninguna imagen es candidata LCP.

## 9. Interacciones y Animaciones

- **Hover en tarjetas:** Solo CSS — sombra más intensa + ligero desplazamiento vertical.
- No hay animaciones complejas ni estados interactivos.
- Clasificación: **solo CSS**.

## 10. Notas y Ambigüedades

- ⚠️ **Fusión potencial con why-o2:** Ambos bloques comparten idéntica estructura visual (icono + título + texto en tarjeta con sombra). Si se decide implementar un solo bloque `icon-cards`, las diferencias se resolverían con:
  - `icon-cards--cols-3` (benefits-cards: 3 columnas, 6 tarjetas).
  - `icon-cards--cols-4` (why-o2: 4 columnas, 4 tarjetas).
  - La presencia de subtítulo en benefits-cards (ausente en why-o2) como campo opcional.
- ⚠️ El texto descriptivo de las tarjetas contiene `<strong>` inline (ej: "Todos los meses pagarás lo mismo"). El campo debe ser `richtext` para soportar negritas.
- ♿ Los iconos son decorativos: `alt=""`.

## 11. component-models.json individual

```json
[
  {
    "id": "benefits-cards",
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
    "id": "benefits-cards-item",
    "fields": [
      {
        "component": "reference",
        "name": "icon",
        "value": "",
        "label": "Icono",
        "valueType": "string"
      },
      {
        "component": "text",
        "name": "cardTitle",
        "value": "",
        "label": "Título",
        "valueType": "string"
      },
      {
        "component": "richtext",
        "name": "cardText",
        "value": "",
        "label": "Texto descriptivo",
        "valueType": "string"
      }
    ]
  }
]
```

## 12. component-definition.json individual

```json
{
  "title": "Benefits Cards",
  "id": "benefits-cards",
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
