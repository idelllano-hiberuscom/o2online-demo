# Instrucciones de Bloque: header
> Generado por: Figma Analyst
> Archivo Figma: https://www.figma.com/design/DwoFVMeUoYBqDt0MfBKNeq/o2online
> Nodo(s) de referencia: 6:568 (mobile), 6:1152 (desktop)
> Complejidad: Media
> Requiere JS: no
> Modelo UE: xwalk (instrumentación boilerplate existente — NO modificar)
> Tipo: Adaptación visual de bloque boilerplate existente

---

## 1. Descripción y Propósito

Header de navegación principal de O2 con fondo azul corporativo (`#0050ff`). En desktop muestra: logo O2 (46px), nav principal con 5 links blancos (con separador vertical antes del 5º item), nav secundario con 3 links en azul claro (`#edf7ff`), y botón "Soy cliente" con borde blanco redondeado. En mobile: logo O2 + hamburger sobre fondo azul, menú expandible. Se trata de una **adaptación CSS** sobre el header boilerplate de AEM EDS — la estructura JS, la carga de fragmento `/nav` y la lógica de hamburger/toggle ya existen y **no deben modificarse**.

## 2. Código Existente — Contexto

### JS existente (`header.js`):
- `decorate(block)` carga fragmento `/nav` vía `loadFragment()`
- Construye DOM: `nav-wrapper > nav#nav > [nav-brand, nav-sections, nav-tools]`
- Hamburger generado dinámicamente con `aria-controls`, `aria-expanded`
- Breakpoint actual: `900px` vía `matchMedia` — **mantener sin cambios**
- Toggle de menú mobile con Escape, focusout, body overflow
- `block.textContent = ''` + reconstrucción — patrón estándar del boilerplate

**⚠️ NO se debe modificar la lógica JS.** Todos los cambios son CSS.

### CSS existente (`header.css`):
- Background: `var(--background-color)` → blanco → **cambiar a `#0050ff`**
- `--nav-height: 64px` (global en `styles.css`) → **cambiar a `75px`**
- `nav-brand img: width 128px` → **cambiar a ~48px**
- Colores de texto: `currentcolor` (hereda negro) → **cambiar a blanco**
- Max-width: `1248px` / `1264px` → **cambiar a `1350px`**
- Breakpoint CSS: `900px` — **mantener consistente con JS**

## 3. Cambios CSS Necesarios

### 3a. Variables globales a modificar en `styles.css`

| Variable | Valor actual | Valor nuevo | Nota |
|---|---|---|---|
| `--nav-height` | `64px` | `75px` | Altura del header según Figma |

### 3b. Colores y fondo del header

```css
/* ANTES */
header .nav-wrapper {
  background-color: var(--background-color); /* white */
}

/* DESPUÉS */
header .nav-wrapper {
  background-color: #0050ff;
}
```

### 3c. Contenedor nav — max-width y padding

```css
/* Ajustes en mobile */
header nav {
  max-width: 1350px;
  padding: 0 30px;
  height: var(--nav-height); /* ya usa la variable, se actualizará a 75px */
}

/* Ajustes en desktop (900px+) */
@media (width >= 900px) {
  header nav {
    max-width: 1350px;
    padding: 0 30px;
    gap: 0 24px;
  }
}
```

### 3d. Logo (nav-brand)

```css
header nav .nav-brand img {
  width: 48px;  /* era 128px */
  height: auto;
}

header .nav-brand {
  flex-basis: 48px;  /* era 128px */
}
```

### 3e. Color de texto y links

```css
/* Todos los links del nav → blanco */
header nav a:any-link {
  color: white; /* era currentcolor (negro) */
  text-decoration: none;
}

/* Tipografía de nav sections */
header nav .nav-sections ul {
  font-family: var(--body-font-family); /* Roboto = OnAir-Light */
  font-size: 18px;
  font-weight: 300; /* light */
}
```

### 3f. Nav-tools — links secundarios + botón "Soy cliente"

El contenido de `nav-tools` viene del fragmento `/nav` (tercer hijo del documento). En el documento, el último link tendrá clase `.button` por convención EDS (link en su propia línea).

```css
/* Links de nav-tools (Sobre O2, Ayuda, Contacto) → color más claro */
header nav .nav-tools a:any-link {
  color: #edf7ff;
  font-family: var(--body-font-family);
  font-size: 18px;
  font-weight: 300;
}

/* Botón "Soy cliente" — EDS convierte links solos en .button */
header nav .nav-tools a.button {
  background-color: transparent;
  border: 1px solid white;
  border-radius: 2px;
  padding: 7.5px 15px;
  font-family: var(--body-font-family);
  font-size: 16px;
  font-weight: 300;
  color: white;
  text-decoration: none;
  white-space: nowrap;
}

header nav .nav-tools a.button:hover {
  background-color: rgba(255, 255, 255, 0.15);
  border-color: white;
  color: white;
}
```

### 3g. Separador vertical antes del 5º item en nav-sections

El nav del Figma muestra un separador vertical blanco antes de "Móviles y dispositivos". Esto se logra con CSS `:nth-child` sobre los `<li>` del nav-sections. El 5º item es el que aparece tras el separador.

```css
/* Separador vertical antes del 5º link de navegación */
@media (width >= 900px) {
  header nav .nav-sections .default-content-wrapper > ul > li:nth-child(5) {
    padding-left: 24px;
    border-left: 1px solid rgba(255, 255, 255, 0.5);
  }
}
```

### 3h. Hamburger — color blanco

```css
/* Hamburger icon → blanco sobre fondo azul */
header nav .nav-hamburger button {
  background-color: transparent; /* era var(--background-color) */
  color: white;
}

header nav[aria-expanded='false'] .nav-hamburger-icon,
header nav[aria-expanded='false'] .nav-hamburger-icon::before,
header nav[aria-expanded='false'] .nav-hamburger-icon::after {
  background: white; /* era currentcolor (negro) */
}

header nav[aria-expanded='true'] .nav-hamburger-icon::before,
header nav[aria-expanded='true'] .nav-hamburger-icon::after {
  background: white;
}
```

### 3i. Menú mobile expandido

```css
/* Menú expandido en mobile — fondo azul continuo */
header nav[aria-expanded='true'] {
  background-color: #0050ff;
}

/* Items del menú mobile con borde inferior */
header nav[aria-expanded='true'] .nav-sections ul > li {
  border-bottom: 0.667px solid rgba(255, 255, 255, 0.3);
  padding: 15px 0;
  min-height: 60px;
  display: flex;
  align-items: center;
}

header nav[aria-expanded='true'] .nav-sections ul > li a {
  color: white;
}
```

### 3j. Header fijo vs relativo

```css
/* Mobile: header fijo (ya existe) */
header .nav-wrapper {
  position: fixed;
}

/* Desktop: también fijo para O2 (cambio del boilerplate que usa relative) */
@media (width >= 900px) {
  header .nav-wrapper {
    position: fixed; /* era relative en boilerplate */
  }
}
```

> ⚠️ Si el header pasa a `position: fixed` en desktop, el `body` debe compensar con `padding-top: var(--nav-height)`. Verificar si ya existe esta compensación en `styles.css` (el boilerplate suele tenerla solo para mobile). Añadir si falta:
> ```css
> body { margin-top: var(--nav-height); }
> ```

### 3k. Dropdown de subsecciones (si aplica)

```css
/* Dropdown background en desktop */
@media (width >= 900px) {
  header nav .nav-sections .default-content-wrapper > ul > li[aria-expanded='true'] > ul {
    background-color: #003dcc; /* azul más oscuro que el header */
    padding: 16px;
  }

  header nav .nav-sections .default-content-wrapper > ul > li[aria-expanded='true'] > ul a {
    color: white;
  }
}
```

## 4. Comportamiento Responsivo

| Breakpoint | Layout | Detalles |
|---|---|---|
| **Mobile (<900px)** | Logo + hamburger, menú oculto | Fondo `#0050ff`, hamburger blanco, menú expandible fullscreen con items en lista vertical y bordes blancos. Logo ~48px. |
| **Desktop (≥900px)** | Logo + nav horizontal + tools | Flex horizontal. Nav-sections con 5 links blancos 18px + separador. Nav-tools con 3 links `#edf7ff` + botón "Soy cliente". Max-width 1350px. |

## 5. Cambios JS

**No se requieren cambios en `header.js`.**

La lógica existente del boilerplate (carga de fragmento, hamburger, toggle, breakpoints) es compatible con los cambios CSS propuestos. El botón "Soy cliente" se estila via CSS aprovechando la clase `.button` que EDS añade automáticamente a links en su propia línea dentro del fragmento.

> ⚠️ **Nota sobre el botón "Soy cliente":** En el JS existente hay lógica que limpia la clase `.button` del brand link (`brandLink.className = ''`). Verificar que esta lógica NO afecte al botón de nav-tools. Si EDS también aplica `.button` a links dentro de nav-tools, la clase se preservará correctamente (el JS solo limpia en `.nav-brand`).

## 6. Gestión de Imágenes y Media

| Imagen | Origen | LCP | Formato |
|---|---|---|---|
| Logo O2 | Fragmento `/nav` (primer hijo, `<picture>` insertado por EDS) | No — el header es navegación, no contenido principal | SVG recomendado (logo vectorial) |

> El logo se carga como imagen dentro del fragmento del nav. No requiere tratamiento LCP. El CSS solo ajusta el `width` a 48px.

## 7. Universal Editor (xwalk)

**El header ya tiene instrumentación UE del boilerplate.** No se añade ni modifica instrumentación. El contenido del header se edita a través del documento `/nav` en el Universal Editor (es un fragmento).

## 8. Notas y Ambigüedades

- ⚠️ **Separador del 5º item:** Depende de que el documento `/nav` tenga exactamente 5 items en la lista principal de nav-sections. Si el número cambia, el selector `:nth-child(5)` dejará de funcionar. Alternativa: añadir una clase manual al item del separador en el documento.
- ⚠️ **Color #edf7ff para nav-tools:** Es un blanco azulado sutil. Verificar contraste WCAG sobre fondo `#0050ff` (ratio estimado ~8:1 — cumple AA y AAA).
- ♿ **Contraste del botón "Soy cliente":** Texto blanco sobre fondo transparente con borde blanco sobre `#0050ff`. El contraste del texto es bueno (~8:1), pero el borde fino (1px) puede ser difícil de percibir. Considerar aumentar a 2px en `:focus-visible`.
- ⚠️ **Header fijo en desktop:** El boilerplate usa `position: relative` en desktop. Si se cambia a `fixed`, validar que no hay solapamiento de contenido con la sección hero inmediatamente debajo.
