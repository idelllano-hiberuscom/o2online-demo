# Instrucciones de Bloque: support-cta
> Generado por: Figma Analyst
> Archivo Figma: https://www.figma.com/design/DwoFVMeUoYBqDt0MfBKNeq/o2online
> Nodo(s) de referencia: 6:417 (mobile), 6:997 (desktop)
> Complejidad: Simple
> Requiere JS: no
> Modelo UE: xwalk

---

## 1. Descripción y Propósito

Sección de contacto/soporte que muestra un icono de soporte, el texto "¿Necesitas ayuda? Puedes contactar con nosotros en el 1551" y un enlace "Otras formas de contacto". Fondo gris claro `#f9f9f9`. En desktop es una disposición horizontal (inline). En mobile, vertical apilada.

## 2. Variantes Detectadas

- **Default:** Fondo gris claro, icono + texto + enlace.
- No se detectan variantes adicionales.

## 3. Estructura DOM

### ENTRADA — Matriz EDS (lo que decorate recibe):

```
block (support-cta)
  └── div (fila 1)
        ├── div (col 0)
        │     └── <picture> ← icono de soporte (icon-support.svg, 60×60px)
        └── div (col 1)
              ├── <p> ← "¿Necesitas ayuda? Puedes contactar con nosotros en el 1551"
              └── <p><a href="...">Otras formas de contacto</a></p>
```

### SALIDA — DOM decorado (lo que decorate produce):

```html
<div class="support-cta">
  <div class="support-cta-row">
    <div class="support-cta-icon">
      <picture>
        <img src="..." alt="" loading="lazy" decoding="async" width="60" height="60">
      </picture>
    </div>
    <div class="support-cta-content">
      <p class="support-cta-text">
        ¿Necesitas ayuda? Puedes contactar con nosotros en el
        <strong>1551</strong>
      </p>
      <a href="..." class="support-cta-link">Otras formas de contacto</a>
    </div>
  </div>
</div>
```

## 4. Variables CSS del Bloque

```css
.support-cta {
  --support-bg: #f9f9f9;
  --support-text-color: #4a4a4a;
  --support-link-color: #0050ff;
  --support-icon-size: 60px;
  --support-padding-y: 32px;
  --support-padding-x: 15px;
  --support-font-title: 'OnAir-Bold', sans-serif;
  --support-font-title-size: 28px;
  --support-font-title-lh: 34px;
  --support-font-link: 'OnAir-Light', sans-serif;
  --support-font-link-size: 20px;
  --support-font-link-lh: 24px;
}
```

## 5. Auto-layouts → CSS

| Auto-layout Figma | CSS equivalente |
|---|---|
| Desktop: horizontal inline, centrado | `display: flex; align-items: center; justify-content: center; gap: 16px;` |
| Mobile: vertical apilado, centrado | `display: flex; flex-direction: column; align-items: center; text-align: center; gap: 12px;` |

## 6. Comportamiento Responsivo

- **Desktop (≥1024px):**
  - Layout horizontal: icono (60×60px) | texto | enlace, todos en la misma línea.
  - Centrado horizontalmente en el contenedor.
  - Texto: OnAir-Bold 28px, color `#4a4a4a`, con "1551" en `<strong>`.
  - Enlace: OnAir-Light 20px, color `#0050ff`.
  - Sección total: 124px de alto, fondo `#f9f9f9`.

- **Tablet (768px–1023px):**
  - ⚠️ Sin frame explícito. Inferido: mantiene layout horizontal con posible wrap.

- **Mobile (<768px):**
  - Frame 390px, sección ~290px de alto.
  - Layout vertical apilado: icono arriba (pequeño), texto debajo, enlace al final.
  - Texto centrado.
  - Icono probablemente redimensionado (más pequeño que desktop).

## 7. Campos Editables para Universal Editor (xwalk)

| Campo | `name` | `component` | `valueType` | ¿Requerido? |
|---|---|---|---|---|
| Icono | `icon` | `reference` | `string` | sí |
| Texto principal | `mainText` | `richtext` | `string` | sí |
| Texto del enlace | `linkText` | `text` | `string` | sí |
| URL del enlace | `linkUrl` | `text` | `string` | sí |

## 8. Gestión de Imágenes y Media

- **Icono de soporte:** Origen: celda del bloque → `<picture>` ya en DOM. SVG `icon-support.svg` de 60×60px.
  - `loading="lazy"`, `decoding="async"`.
  - `alt=""` — icono decorativo (el contenido significativo está en el texto).
  - **Formato recomendado:** SVG.
  - **Proporciones:** 1:1.

- ⚠️ POSICIÓN LCP NO CONFIRMADA — Bloque al final de la página, definitivamente below-the-fold. No es candidato LCP.

## 9. Interacciones y Animaciones

- **Hover en enlace:** Solo CSS — subrayado o cambio de opacidad.
- No hay animaciones complejas.
- Clasificación: **solo CSS**.

## 10. Notas y Ambigüedades

- ⚠️ El número de teléfono "1551" aparece dentro del párrafo como texto en negrita. En el modelo richtext, el autor puede editarlo directamente. Considerar si "1551" debe ser un enlace `tel:1551` para móvil.
- ♿ Si "1551" se implementa como enlace telefónico, debe llevar `href="tel:1551"` y un `aria-label` descriptivo (ej: "Llamar al 1551").
- ♿ El icono es decorativo: `alt=""` o `aria-hidden="true"`.

## 11. component-models.json individual

```json
{
  "id": "support-cta",
  "fields": [
    {
      "component": "reference",
      "name": "icon",
      "value": "",
      "label": "Icono",
      "valueType": "string"
    },
    {
      "component": "richtext",
      "name": "mainText",
      "value": "",
      "label": "Texto principal",
      "valueType": "string"
    },
    {
      "component": "text",
      "name": "linkText",
      "value": "",
      "label": "Texto del enlace",
      "valueType": "string"
    },
    {
      "component": "text",
      "name": "linkUrl",
      "value": "",
      "label": "URL del enlace",
      "valueType": "string"
    }
  ]
}
```

## 12. component-definition.json individual

```json
{
  "title": "Support CTA",
  "id": "support-cta",
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
