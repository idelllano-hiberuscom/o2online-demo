# Instrucciones de Bloque: coverage-cta
> Generado por: Figma Analyst
> Archivo Figma: https://www.figma.com/design/DwoFVMeUoYBqDt0MfBKNeq/o2online
> Nodo(s) de referencia: 6:120 (mobile), 6:703 (desktop)
> Complejidad: Simple
> Requiere JS: no
> Modelo UE: xwalk

---

## 1. Descripción y Propósito

Banner CTA de ancho completo con fondo azul `#0050ff` que invita al usuario a comprobar la cobertura de O2 en su zona. Contiene un icono de cobertura (SVG), un texto descriptivo y un botón pill blanco con texto azul. Aparece entre la sección de pricing y la sección de promos.

## 2. Variantes Detectadas

- **Default:** Fondo azul, texto blanco, botón blanco.
- No se detectan variantes adicionales en el Figma.

## 3. Estructura DOM

### ENTRADA — Matriz EDS (lo que decorate recibe):

```
block (coverage-cta)
  └── div (fila 1)
        ├── div (col 0)
        │     └── <picture> ← icono de cobertura (SVG/imagen 40x40px)
        ├── div (col 1)
        │     └── <p> ← "Comprueba nuestra cobertura O2 en tu zona"
        └── div (col 2)
              └── <p><a href="...">Comprobar cobertura</a></p>
```

### SALIDA — DOM decorado (lo que decorate produce):

```html
<div class="coverage-cta">
  <div class="coverage-cta-row">
    <div class="coverage-cta-icon">
      <picture>
        <img src="..." alt="Cobertura" loading="lazy" decoding="async">
      </picture>
    </div>
    <div class="coverage-cta-text">
      <p>Comprueba nuestra cobertura O2 en tu zona</p>
    </div>
    <div class="coverage-cta-action">
      <a href="..." class="coverage-cta-button">Comprobar cobertura</a>
    </div>
  </div>
</div>
```

## 4. Variables CSS del Bloque

```css
.coverage-cta {
  --coverage-bg: #0050ff;
  --coverage-text-color: #ffffff;
  --coverage-btn-bg: #ffffff;
  --coverage-btn-color: #0050ff;
  --coverage-btn-radius: 60px;
  --coverage-icon-size: 40px;
  --coverage-padding-y: 20px;
  --coverage-padding-x: 15px;
}
```

## 5. Auto-layouts → CSS

| Auto-layout Figma | CSS equivalente |
|---|---|
| Mobile: vertical stack, centered | `display: flex; flex-direction: column; align-items: center; gap: 16px; text-align: center;` |
| Desktop: horizontal, space-between | `display: flex; align-items: center; justify-content: center; gap: 24px;` |

## 6. Comportamiento Responsivo

- **Desktop (≥1024px):**
  - Disposición horizontal en una línea: icono | texto | botón.
  - Centrado en el contenedor.
  - Padding: 20px vertical.
  - Icono: 50px.

- **Tablet (768px–1023px):**
  - ⚠️ Sin frame de tablet explícito. Inferido: mantiene layout horizontal con wrap.

- **Mobile (<768px):**
  - Frame 390px, sección de 188px de alto.
  - Disposición vertical apilada y centrada.
  - Icono arriba (40x40px), texto debajo, botón al final.
  - Padding: 20px.
  - Botón de ancho completo (`width: 100%`).

## 7. Campos Editables para Universal Editor (xwalk)

| Campo | `name` | `component` | `valueType` | ¿Requerido? |
|---|---|---|---|---|
| Icono | `icon` | `reference` | `string` | sí |
| Texto descriptivo | `description` | `text` | `string` | sí |
| Texto del botón | `ctaText` | `text` | `string` | sí |
| Enlace del botón | `ctaLink` | `text` | `string` | sí |

## 8. Gestión de Imágenes y Media

- **Icono de cobertura:** Origen: celda del bloque → `<picture>` ya en DOM. SVG/imagen decorativa 40-50px. `loading="lazy"`, `decoding="async"`.
- ⚠️ POSICIÓN LCP NO CONFIRMADA — Este bloque está below-the-fold (después de pricing-tabs). No es candidato a LCP.

## 9. Interacciones y Animaciones

- **Hover en botón:** Solo CSS — cambio de `background-color` (de blanco a un tono ligeramente gris) o inversión de colores.
- Clasificación: **solo CSS**.

## 10. Notas y Ambigüedades

- ♿ El botón debe tener texto descriptivo suficiente (`aria-label` si el texto visible es demasiado genérico).
- ♿ El icono es decorativo: debe llevar `alt=""` o `aria-hidden="true"`.

## 11. component-models.json individual

```json
{
  "id": "coverage-cta",
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
      "name": "description",
      "value": "",
      "label": "Texto descriptivo",
      "valueType": "string"
    },
    {
      "component": "text",
      "name": "ctaText",
      "value": "",
      "label": "Texto del botón",
      "valueType": "string"
    },
    {
      "component": "text",
      "name": "ctaLink",
      "value": "",
      "label": "Enlace del botón",
      "valueType": "string"
    }
  ]
}
```

## 12. component-definition.json individual

```json
{
  "title": "Coverage CTA",
  "id": "coverage-cta",
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
