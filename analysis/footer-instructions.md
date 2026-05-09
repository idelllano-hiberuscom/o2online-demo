# Instrucciones de Bloque: footer
> Generado por: Figma Analyst
> Archivo Figma: https://www.figma.com/design/DwoFVMeUoYBqDt0MfBKNeq/o2online
> Nodo(s) de referencia: 6:1006 (desktop)
> Complejidad: Alta
> Requiere JS: sí
> Modelo UE: xwalk (sin instrumentación UE — NO instrumentar)
> Tipo: Adaptación visual de bloque boilerplate existente

---

## 1. Descripción y Propósito

Footer corporativo de O2 con fondo azul principal (`#0050ff`) a ancho completo. En desktop se organiza en un contenedor de max-width ~1265px con 4 columnas de links agrupados bajo headings. Incluye una barra inferior con información legal (icono Junta Arbitral + copyright + logo Telefónica). Imágenes decorativas de burbujas/esferas semi-transparentes en el fondo. En mobile, las columnas se apilan verticalmente. Se adapta sobre el footer boilerplate de AEM EDS, que carga un fragmento `/footer`.

## 2. Código Existente — Contexto

### JS existente (`footer.js`):
- `decorate(block)` carga fragmento `/footer` vía `loadFragment()`
- Muy simple: `block.textContent = ''` → `footer.append(fragment children)` → `block.append(footer)`
- **No tiene lógica de columnas ni grid** — el boilerplate asume un footer simple

**⚠️ Se necesitará JS adicional** para detectar las secciones del fragmento y organizarlas en el grid de 4 columnas. El fragmento `/footer` tendrá múltiples `<div class="section">` (secciones del documento) que contienen `<div class="default-content-wrapper">` con listas y headings.

### CSS existente (`footer.css`):
- Background: `var(--light-color)` → `#f8f8f8` → **cambiar a `#0050ff`**
- Font-size: `var(--body-font-size-xs)` — **mantener**
- Max-width: `1200px` → **cambiar a `1265px`**
- Padding: `40px 24px 24px` — **ajustar según diseño**

## 3. Cambios JS Necesarios

El footer requiere JS adicional para organizar las secciones del fragmento en el grid de 4 columnas. El fragmento `/footer` producirá múltiples secciones (`.section > .default-content-wrapper`), y el JS debe agruparlas.

### Estructura esperada del fragmento `/footer`

El documento `/footer` en Google Docs / SharePoint tendrá:
- **Sección 1:** Links institucionales (listas de links sin heading)
- **Sección 2:** "Tarifas" — heading `<h2>` + listas de links
- **Sección 3:** "Contacto y ayuda" — heading `<h2>` + lista de links
- **Sección 4:** "App Mi O2 y RRSS" — heading `<h2>` + badges + links redes sociales
- **Sección 5 (separada con `---`):** Barra inferior — icono Junta Arbitral + copyright + logo Telefónica

### Lógica JS a añadir en `footer.js`

```js
// Después de block.append(footer):

// 1. Detectar secciones del fragmento
const sections = footer.querySelectorAll('.section');

// 2. Separar secciones de columnas principales vs barra inferior
// Las primeras 4 secciones → columnas del grid
// La última sección → barra inferior (footer-bottom)
if (sections.length >= 2) {
  const mainSections = [...sections].slice(0, -1); // columnas
  const bottomSection = [...sections].slice(-1)[0]; // barra inferior

  // 3. Crear contenedor grid para las columnas
  const columnsGrid = document.createElement('div');
  columnsGrid.className = 'footer-columns';
  mainSections.forEach((section) => {
    section.classList.add('footer-column');
    columnsGrid.append(section);
  });

  // 4. Marcar barra inferior
  bottomSection.classList.add('footer-bottom');

  // 5. Reorganizar el DOM
  footer.textContent = '';
  footer.append(columnsGrid);
  footer.append(bottomSection);
}
```

> ⚠️ **Esto es una referencia, no código final.** El Developer debe implementar según el contenido real del fragmento `/footer`. La cantidad de secciones puede variar; el JS debe ser defensivo.

## 4. Cambios CSS Necesarios

### 4a. Fondo y colores base

```css
/* ANTES */
footer {
  background-color: var(--light-color); /* #f8f8f8 */
}

/* DESPUÉS */
footer {
  background-color: #0050ff;
  color: white;
}
```

### 4b. Contenedor principal

```css
footer .footer > div {
  margin: auto;
  max-width: 1265px; /* era 1200px */
  padding: 48px 32px 24px;
}
```

### 4c. Grid de 4 columnas

```css
/* Columnas del footer */
.footer-columns {
  display: grid;
  grid-template-columns: 1fr; /* mobile: 1 columna */
  gap: 32px;
}

@media (width >= 768px) {
  .footer-columns {
    grid-template-columns: repeat(2, 1fr); /* tablet: 2 columnas */
    gap: 24px;
  }
}

@media (width >= 900px) {
  .footer-columns {
    grid-template-columns: repeat(4, 1fr); /* desktop: 4 columnas */
    gap: 32px;
  }
}
```

### 4d. Headings de columnas

```css
/* Headings de cada columna (h2 dentro del fragmento) */
footer .footer-column h2 {
  font-family: var(--heading-font-family); /* Roboto Condensed */
  font-size: 16px;
  font-weight: 700;
  color: white;
  margin: 0 0 16px;
  text-transform: none;
}
```

### 4e. Links del footer

```css
/* Todos los links del footer → blanco sin subrayado */
footer a:any-link {
  color: white;
  text-decoration: none;
  font-family: var(--body-font-family);
  font-size: 13px;
  font-weight: 300;
  line-height: 1.8;
}

footer a:hover {
  text-decoration: underline;
  color: white;
}

/* Listas del footer (links agrupados) */
footer ul {
  list-style: none;
  padding: 0;
  margin: 0 0 16px;
}

footer li {
  padding: 2px 0;
}

/* Párrafos del footer */
footer p {
  margin: 0 0 4px;
  font-size: 13px;
  color: white;
}
```

### 4f. Columna 1 — Links institucionales (sin heading)

La primera columna no tiene heading visible. Los links se agrupan en varios `<ul>` o `<p>` con separación visual entre subgrupos.

```css
/* Primera columna — links institucionales agrupados */
footer .footer-column:first-child ul + ul {
  margin-top: 16px; /* separación entre subgrupos de links */
}
```

### 4g. Barra inferior

```css
/* Barra inferior: Junta Arbitral + © + logo Telefónica */
.footer-bottom {
  border-top: 1px solid rgba(255, 255, 255, 0.2);
  margin-top: 32px;
  padding-top: 24px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  text-align: center;
}

@media (width >= 900px) {
  .footer-bottom {
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    text-align: left;
  }
}

.footer-bottom p {
  font-size: 12px;
  color: rgba(255, 255, 255, 0.7);
  margin: 0;
}

/* Logo Telefónica en barra inferior */
.footer-bottom img {
  height: 24px;
  width: auto;
}

/* Icono Junta Arbitral */
.footer-bottom picture {
  display: inline-flex;
  align-items: center;
  vertical-align: middle;
}
```

### 4h. Badges App Store / Google Play (columna 4)

```css
/* Badges de descarga en columna 4 */
footer .footer-column:last-child img {
  height: 40px;
  width: auto;
  margin-right: 8px;
  margin-bottom: 8px;
}

footer .footer-column:last-child a:any-link {
  display: inline-block;
}
```

### 4i. Decoración — burbujas/esferas

> ⚠️ Las esferas/burbujas semi-transparentes del Figma son elementos decorativos de fondo. Se pueden implementar con pseudo-elementos `::before`/`::after` o ignorar en primera iteración. El Developer decidirá si usar imágenes de fondo o gradientes radiales.

```css
/* Decoración opcional — burbujas de fondo */
footer {
  position: relative;
  overflow: hidden;
}

/* Implementación de esferas decorativas → a cargo del Developer si se priorizan */
```

## 5. Comportamiento Responsivo

| Breakpoint | Layout | Detalles |
|---|---|---|
| **Mobile (<768px)** | 1 columna apilada | Columnas del footer apiladas verticalmente. Barra inferior centrada. Gap 32px entre columnas. |
| **Tablet (768px–899px)** | 2 columnas | Grid de 2 columnas. Barra inferior en fila. |
| **Desktop (≥900px)** | 4 columnas | Grid de 4 columnas de ancho igual. Max-width 1265px. Barra inferior en fila con space-between. |

## 6. Gestión de Imágenes y Media

| Imagen | Origen | LCP | Formato |
|---|---|---|---|
| Badges App Store / Google Play | Fragmento `/footer` — `<picture>` en el documento | No — footer es below-the-fold | PNG o SVG |
| Logo Telefónica (barra inferior) | Fragmento `/footer` — `<picture>` en el documento | No — below-the-fold | SVG recomendado |
| Icono Junta Arbitral | Fragmento `/footer` — `<picture>` o icono inline | No — below-the-fold | SVG |
| Burbujas decorativas | CSS background o pseudo-elementos | No | N/A |

Todas las imágenes del footer reciben `loading="lazy"` y `decoding="async"` por defecto.

## 7. Universal Editor (xwalk)

**El footer NO tiene instrumentación UE en el boilerplate.** No se añade instrumentación. El contenido del footer se edita a través del documento `/footer` en el Universal Editor (es un fragmento cargado vía `loadFragment()`).

## 8. Notas y Ambigüedades

- ⚠️ **JS necesario:** A diferencia del header (que ya tiene estructura de grid/flex), el footer boilerplate es extremadamente simple y no organiza columnas. Se requiere JS para detectar secciones del fragmento y envolverlas en `.footer-columns`. Sin esto, el CSS de grid no tendrá efecto.
- ⚠️ **Estructura del documento `/footer`:** El grid de 4 columnas depende de que el documento tenga exactamente las secciones esperadas. Si el autor añade/quita secciones en el documento, el layout se romperá. El JS debe ser defensivo y manejar cantidades variables de secciones.
- ⚠️ **Burbujas decorativas:** El Figma muestra esferas semi-transparentes dispersas en el fondo azul del footer. Esto es cosmético y puede implementarse en una segunda iteración. No bloquea la funcionalidad.
- ♿ **Contraste de links:** Texto blanco 13px sobre `#0050ff` → ratio ~8:1. Cumple WCAG AA y AAA. Buena accesibilidad.
- ♿ **Estructura de headings:** Los `<h2>` dentro del footer ("Tarifas", "Contacto y ayuda", "App Mi O2 y RRSS") podrían romper la jerarquía de headings de la página si hay un solo `<h1>` en el hero y los bloques siguientes usan `<h2>`. Verificar que no haya conflicto semántico. En el fragmento, el Developer puede considerar usar `role="heading" aria-level="2"` o simplemente `<strong>` con clase visual.
- ⚠️ **Columna 2 "Tarifas" — subgrupos:** Esta columna tiene muchos subgrupos de links (Tarifas Fibra y móvil, Tarifas Fibra móvil y TV, Fibra, etc.). El documento `/footer` deberá organizar estos como múltiples listas `<ul>` separadas o como headings `<h3>` + listas. El CSS debe manejar ambos casos.
