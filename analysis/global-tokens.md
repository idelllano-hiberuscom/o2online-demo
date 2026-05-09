# Design Tokens Globales
> Para implementar en: /styles/styles.css y /styles/fonts.css
> Modelo de proyecto: xwalk (EDS + Universal Editor)
> Archivo Figma: https://www.figma.com/design/DwoFVMeUoYBqDt0MfBKNeq/o2online
> Generado por: Figma Analyst

---

## Colores

```css
:root {
  /* Colores primarios */
  --color-primary: #0050ff;           /* Azul O2 — fondos, CTAs, enlaces */
  --color-primary-dark: #000019;      /* Azul oscuro/negro — fondo hero, header */
  --color-white: #ffffff;             /* Texto sobre fondos oscuros, fondos de tarjetas */

  /* Colores de texto */
  --color-text-primary: #4a4a4a;      /* Texto body principal */
  --color-text-heading: #000019;      /* Headings en fondo claro */
  --color-text-on-dark: #ffffff;      /* Texto sobre fondo azul/oscuro */
  --color-text-link: #0050ff;         /* Enlaces */

  /* Colores de fondo */
  --color-bg-light: #f9f9f9;          /* Fondo secciones alternas (gris claro) */
  --color-bg-white: #ffffff;          /* Fondo tarjetas, secciones claras */
  --color-bg-blue: #0050ff;           /* Fondo CTA cobertura, secciones azules */
  --color-bg-dark: #000019;           /* Fondo header, hero */

  /* Colores de UI */
  --color-border-card: #dadada;       /* Borde de tarjetas (sutil) */
  --color-shadow-card: rgba(0, 0, 0, 0.08); /* Sombra de tarjetas */
  --color-tab-active: #0050ff;        /* Tab activa */
  --color-tab-inactive: #ffffff;      /* Tab inactiva (borde) */

  /* Gradientes */
  /* Gradiente app-promo: de #0050ff (top) a #000019 (bottom) */
  /* Gradiente eSIM card: custom con púrpura */
}
```

## Tipografías

```css
/* Familia principal del Design System O2: OnAir */
:root {
  --font-family-heading: 'OnAir-Bold', 'Arial Black', sans-serif;
  --font-family-heading-black: 'OnAir-Black', 'Arial Black', sans-serif;
  --font-family-body: 'OnAir-Light', 'Arial', sans-serif;
  --font-family-body-regular: 'OnAir-Regular', 'Arial', sans-serif;
}
```

### Estilos de texto detectados en Figma

| Uso | Font Family | Weight | Tamaño Mobile | Tamaño Desktop | Line-height |
|---|---|---|---|---|---|
| H1 (Hero título) | OnAir-Bold | Bold | 28px | 44px | 32px / 48px |
| H1 (Hero tagline) | OnAir-Black | Black/900 | 40px | 56px | 48px / 64px |
| H2 (Sección título) | OnAir-Black | Black/900 | 36px | 46px | 44px / 52px |
| H3 (Tarjeta título) | OnAir-Bold | Bold | 22px | 28px | 28px / 32px |
| H5 (Footer heading) | OnAir-Bold | Bold | 20px | 20px | 24px |
| Body (descripción) | OnAir-Light | Light/300 | 18px | 18px | 22px |
| Body small | OnAir-Light | Light/300 | 16px | 16px | 24px |
| CTA button text | OnAir-Bold | Bold | 16px | 16px | 24px |
| Tab text | OnAir-Light | Light/300 | 16px | 16px | 24px |
| Price (número grande) | OnAir-Black | Black/900 | 40px | 40px | 40px |
| Price unit (€/mes) | OnAir-Bold | Bold | 20px | 20px | 24px |
| Footer link | OnAir-Light | Light/300 | 16px | 16px | 24px |

### @font-face necesarios

```css
/* En fonts.css — reemplazar fuentes Roboto existentes por OnAir */
@font-face {
  font-family: 'OnAir-Light';
  font-style: normal;
  font-weight: 300;
  font-display: swap;
  src: url('../fonts/OnAir-Light.woff2') format('woff2');
}

@font-face {
  font-family: 'OnAir-Regular';
  font-style: normal;
  font-weight: 400;
  font-display: swap;
  src: url('../fonts/OnAir-Regular.woff2') format('woff2');
}

@font-face {
  font-family: 'OnAir-Bold';
  font-style: normal;
  font-weight: 700;
  font-display: swap;
  src: url('../fonts/OnAir-Bold.woff2') format('woff2');
}

@font-face {
  font-family: 'OnAir-Black';
  font-style: normal;
  font-weight: 900;
  font-display: swap;
  src: url('../fonts/OnAir-Black.woff2') format('woff2');
}
```

> ⚠️ Los archivos .woff2 de la familia OnAir NO están incluidos en el repositorio actual. Deben ser proporcionados por el equipo de diseño de O2 o descargados del CDN corporativo.

## Espaciados

```css
:root {
  --spacing-xs: 8px;    /* 0.5rem — gap mínimo */
  --spacing-s: 15px;    /* ~1rem — padding lateral mobile */
  --spacing-m: 20px;    /* 1.25rem — separación entre secciones menores */
  --spacing-l: 24px;    /* 1.5rem — gap entre tarjetas, padding tarjetas */
  --spacing-xl: 40px;   /* 2.5rem — padding vertical secciones */
  --spacing-xxl: 64px;  /* 4rem — padding vertical secciones grandes */
}
```

## Breakpoints

| Nombre | Ancho | Frame Figma |
|---|---|---|
| Mobile | < 768px | 390px (frame `6:2`) |
| Tablet | 768px–1023px | ⚠️ No hay frame explícito de tablet en el Figma |
| Desktop | ≥ 1024px | 1264.67px (frame `6:590`) |

> ⚠️ **No se detecta un frame de tablet en el Figma.** Los breakpoints intermedios deben inferirse del comportamiento de layout entre mobile (390px) y desktop (1264px). Se recomienda usar 768px como breakpoint de tablet basado en prácticas comunes.

## Bordes y Radios

```css
:root {
  --border-radius-card: 16px;    /* Tarjetas de pricing, promo cards */
  --border-radius-button: 60px;  /* Botones pill (CTAs principales) */
  --border-radius-tab: 60px;     /* Tabs pill */
  --border-radius-badge: 15px;   /* Badges/etiquetas (NOVEDAD, eSIM) */

  --shadow-card: 0 2px 8px rgba(0, 0, 0, 0.08); /* Sombra tarjetas */
}
```

## Notas de implementación

1. **Fuentes:** El proyecto actual usa Roboto / Roboto Condensed. El diseño Figma usa la familia OnAir (propiedad de O2/Telefónica). Se deben obtener los archivos de fuente y actualizar `fonts.css` y las variables CSS `--body-font-family` y `--heading-font-family` en `styles.css`.

2. **Colores:** Las variables CSS actuales (`--link-color: #3b63fb`) difieren del azul O2 del diseño (`#0050ff`). Actualizar todas las variables de color.

3. **Max-width:** El contenedor desktop tiene un ancho máximo de ~1264px (no 1200px como es habitual). Verificar si se usa `max-width: 1350px` como se ve en el header del diseño.

4. **Nav height:** El header en el diseño mide 75px en mobile, no 64px. Actualizar `--nav-height`.
