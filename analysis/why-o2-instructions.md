# Instrucciones de Bloque: why-o2
> Generado por: Figma Analyst
> Archivo Figma: https://www.figma.com/design/DwoFVMeUoYBqDt0MfBKNeq/o2online
> Nodo(s) de referencia: 6:203 (mobile), 6:786 (desktop)
> Complejidad: Media
> Requiere JS: no
> Modelo UE: xwalk

---

## 1. Descripción y Propósito

Sección de propuesta de valor que muestra 4 tarjetas con icono centrado (66×66px), título y texto descriptivo. Responde a "¿Por qué elegir O2?" con argumentos como "Tu conexión más estable", "Velocidad máxima garantizada", "Sin permanencia" y "Atención personalizada". Tarjetas con sombra sutil y fondo blanco sobre fondo de sección blanco/claro.

## 2. Variantes Detectadas

- **Default:** 4 tarjetas con icono, título centrado, texto centrado. Fondo blanco.
- No se detectan variantes adicionales en el diseño.

## 3. Estructura DOM

### ENTRADA — Matriz EDS (lo que decorate recibe):

```
block (why-o2)
  └── div (fila 1 — título de sección)
        └── div (col 0)
              └── <h2> ← "¿Por qué elegir O2?"
  └── div (fila 2 — tarjeta 1)
        ├── div (col 0)
        │     └── <picture> ← icono SVG 66×66px (ej: icon-green.svg)
        └── div (col 1)
              ├── <h3> ← "Tu conexión más estable"
              └── <p> ← texto descriptivo
  └── div (fila 3 — tarjeta 2)
        ├── div (col 0)
        │     └── <picture> ← icono SVG 66×66px
        └── div (col 1)
              ├── <h3> ← "Velocidad máxima garantizada"
              └── <p> ← texto descriptivo
  └── div (fila 4 — tarjeta 3)
        ├── div (col 0)
        │     └── <picture> ← icono SVG 66×66px
        └── div (col 1)
              ├── <h3> ← "Sin permanencia"
              └── <p> ← texto descriptivo
  └── div (fila 5 — tarjeta 4)
        ├── div (col 0)
        │     └── <picture> ← icono SVG 66×66px
        └── div (col 1)
              ├── <h3> ← "Atención personalizada"
              └── <p> ← texto descriptivo
```

### SALIDA — DOM decorado (lo que decorate produce):

```html
<div class="why-o2">
  <h2 class="why-o2-title">¿Por qué elegir O2?</h2>

  <div class="why-o2-grid">
    <!-- Tarjeta 1 -->
    <div class="why-o2-card">
      <div class="why-o2-card-icon">
        <picture>
          <img src="..." alt="" loading="lazy" decoding="async" width="66" height="66">
        </picture>
      </div>
      <h3 class="why-o2-card-title">Tu conexión más estable</h3>
      <p class="why-o2-card-text">Descripción de la propuesta de valor...</p>
    </div>

    <!-- Tarjetas 2, 3, 4... (misma estructura) -->
  </div>
</div>
```

## 4. Variables CSS del Bloque

```css
.why-o2 {
  --why-o2-bg: #ffffff;
  --why-o2-card-bg: #ffffff;
  --why-o2-card-radius: 16px;
  --why-o2-card-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  --why-o2-card-padding: 24px 16px;
  --why-o2-icon-size: 66px;
  --why-o2-title-color: #000019;
  --why-o2-text-color: #4a4a4a;
  --why-o2-text-align: center;
}
```

## 5. Auto-layouts → CSS

| Auto-layout Figma | CSS equivalente |
|---|---|
| Grid mobile: 1 columna | `display: flex; flex-direction: column; gap: 16px;` |
| Grid desktop: 4 columnas | `display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px;` |
| Card: vertical, centrado | `display: flex; flex-direction: column; align-items: center; text-align: center;` |
| Icon wrapper: centrado | `display: flex; justify-content: center; margin-bottom: 16px;` |

## 6. Comportamiento Responsivo

- **Desktop (≥1024px):**
  - Título centrado.
  - 4 tarjetas en grid de 4 columnas, ~286px cada una.
  - Tarjetas con sombra, border-radius 16px, fondo blanco.
  - Icono 66×66px centrado en la parte superior de cada tarjeta.
  - Padding interno de la tarjeta: 15px arriba, 15px lados.
  - Tarjeta total: ~286×436px.

- **Tablet (768px–1023px):**
  - ⚠️ Sin frame explícito. Inferido: 2 columnas de tarjetas.

- **Mobile (<768px):**
  - Frame 390px, sección ~1430px de alto.
  - Título centrado (360px ancho).
  - 4 tarjetas apiladas verticalmente, 1 columna.
  - Cada tarjeta: 360px de ancho, fondo blanco con sombra.
  - Icono 66×66px centrado.

## 7. Campos Editables para Universal Editor (xwalk)

**Campos del contenedor raíz** (`id: why-o2`):

| Campo | `name` | `component` | `valueType` | ¿Requerido? |
|---|---|---|---|---|
| Título de sección | `sectionTitle` | `text` | `string` | sí |

**Campos de cada tarjeta/item** (`id: why-o2-item` — container/items):

| Campo | `name` | `component` | `valueType` | ¿Requerido? |
|---|---|---|---|---|
| Icono | `icon` | `reference` | `string` | sí |
| Título de tarjeta | `cardTitle` | `text` | `string` | sí |
| Texto descriptivo | `cardText` | `richtext` | `string` | sí |

## 8. Gestión de Imágenes y Media

- **Iconos de tarjeta (×4):** Origen: celda del bloque → `<picture>` ya en DOM. SVGs de 66×66px (icon-green.svg, etc.).
  - **Formato recomendado:** SVG (vectorial, escalable). Si se usa PNG: 2x para retina.
  - **Proporciones:** 1:1 (cuadrado, 66×66px).
  - `loading="lazy"`, `decoding="async"` — todas están below-the-fold.
  - `alt=""` — iconos decorativos que acompañan al texto.
- ⚠️ POSICIÓN LCP NO CONFIRMADA — Bloque below-the-fold. Ninguna imagen es candidata LCP.

## 9. Interacciones y Animaciones

- **Hover en tarjetas (desktop):** Solo CSS — `transform: translateY(-2px)` + aumento sutil de sombra. `transition: transform 0.2s ease, box-shadow 0.2s ease;`.
- No hay animaciones complejas ni estados interactivos detectados.
- Clasificación: **solo CSS**.

## 10. Notas y Ambigüedades

- ⚠️ Este bloque es visualmente muy similar a `benefits-cards` (6:318). La diferencia principal es: why-o2 tiene 4 tarjetas en 1 fila desktop, benefits-cards tiene 6 tarjetas en 2 filas (3×2). Se podría reutilizar el mismo bloque con una variante de clase, o implementar bloques separados. Se recomienda evaluar si la estructura de datos UE es la misma. Si lo es, usar un solo bloque `icon-cards` con variante `icon-cards--cols-3` / `icon-cards--cols-4`.
- ♿ Los iconos son decorativos: `alt=""` en las imágenes. El contenido significativo está en el título y el texto.

## 11. component-models.json individual

```json
[
  {
    "id": "why-o2",
    "fields": [
      {
        "component": "text",
        "name": "sectionTitle",
        "value": "",
        "label": "Título de sección",
        "valueType": "string"
      }
    ]
  },
  {
    "id": "why-o2-item",
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
  "title": "Why O2",
  "id": "why-o2",
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
