# Análisis Figma — O2 Online (Resumen)
> Generado por: Figma Analyst
> Archivo Figma: https://www.figma.com/design/DwoFVMeUoYBqDt0MfBKNeq/o2online
> Modelo de proyecto: xwalk (EDS + Universal Editor)
> Fecha de análisis: sesión actual

---

## Inventario de Componentes

### Bloques EXISTENTES en el proyecto (no recrear)

| Bloque | Directorio | Notas del análisis |
|---|---|---|
| `header` | `/blocks/header/` | El diseño Figma muestra fondo azul oscuro `#000019` con logo O2 blanco. Requiere actualización de colores y fuentes (OnAir en lugar de Roboto). |
| `hero` | `/blocks/hero/` | El diseño muestra un slider con imágenes de fondo y overlay. La estructura hero existente es compatible pero requiere adaptación de fuentes/colores. Nodo mobile: `6:4`, desktop: `6:591`. |
| `cards` | `/blocks/cards/` | ⚠️ Evaluar si `why-o2` y `benefits-cards` pueden implementarse como variantes de cards. |
| `columns` | `/blocks/columns/` | No se detecta uso directo visible en la página analizada. |
| `footer` | `/blocks/footer/` | Nodo desktop: `6:1006`. Diseño con imagen de burbujas (`footer-bubbles.png`), 4 columnas de links en desktop, acordeón en mobile. Requiere actualización de fuentes/colores. |
| `fragment` | `/blocks/fragment/` | No se detecta uso directo visible en la página analizada. |

### Bloques NUEVOS a implementar

| # | Bloque | Archivo de instrucciones | Complejidad | JS | Descripción |
|---|---|---|---|---|---|
| 1 | `pricing-tabs` | [pricing-tabs-instructions.md](pricing-tabs-instructions.md) | Alta | sí | Tabs de categorías + tarjetas de precio con CTAs |
| 2 | `coverage-cta` | [coverage-cta-instructions.md](coverage-cta-instructions.md) | Simple | no | Banner azul con icono + texto + botón cobertura |
| 3 | `promo-carousel` | [promo-carousel-instructions.md](promo-carousel-instructions.md) | Alta | sí | Carrusel horizontal de tarjetas de producto |
| 4 | `why-o2` | [why-o2-instructions.md](why-o2-instructions.md) | Media | no | 4 tarjetas de propuesta de valor con icono |
| 5 | `app-promo` | [app-promo-instructions.md](app-promo-instructions.md) | Media | no | Sección App Mi O2 con gradiente azul + imagen teléfono |
| 6 | `benefits-cards` | [benefits-cards-instructions.md](benefits-cards-instructions.md) | Media | no | 6 tarjetas de ventajas con icono (3×2 grid) |
| 7 | `support-cta` | [support-cta-instructions.md](support-cta-instructions.md) | Simple | no | Sección de contacto/soporte con teléfono 1551 |

### Tokens globales

| Archivo | Descripción |
|---|---|
| [global-tokens.md](global-tokens.md) | Variables CSS globales: colores, tipografías, espaciados, breakpoints |

---

## Orden de secciones en la página (top → bottom)

| Orden | Sección | Bloque EDS | Below-fold |
|---|---|---|---|
| 1 | Header | `header` (existente) | no |
| 2 | Hero Slider | `hero` (existente) | no |
| 3 | Elige tu tarifa | `pricing-tabs` (nuevo) | parcial |
| 4 | Comprobar cobertura | `coverage-cta` (nuevo) | sí |
| 5 | Descubre todo O2 | `promo-carousel` (nuevo) | sí |
| 6 | ¿Por qué elegir O2? | `why-o2` (nuevo) | sí |
| 7 | App Mi O2 | `app-promo` (nuevo) | sí |
| 8 | ¿Qué ventajas tengo? | `benefits-cards` (nuevo) | sí |
| 9 | ¿Necesitas ayuda? | `support-cta` (nuevo) | sí |
| 10 | Footer | `footer` (existente) | sí |

---

## Decisiones de implementación pendientes

1. **Fusión why-o2 + benefits-cards:** Ambos bloques tienen estructura idéntica (icono + título + texto en tarjeta con sombra). Se recomienda evaluar si implementar como un solo bloque `icon-cards` con variante de columnas (`--cols-3` / `--cols-4`).

2. **Fuentes OnAir:** El Figma usa la familia OnAir (Light, Regular, Bold, Black). El proyecto actual usa Roboto. Se necesitan los archivos .woff2 de OnAir para migrar.

3. **Tablet breakpoint:** No hay frame de tablet en el Figma. El Developer deberá inferir comportamiento entre 768px y 1023px basándose en las instrucciones de cada bloque.

4. **Hero slider:** El hero existente es estático. El diseño Figma sugiere un slider (nombre "SLIDE 1"). Si se requiere slider, el hero existente necesitaría extensión con JS para carousel.

5. **Pricing tabs data model:** La asociación tabs → tarjetas en el modelo xwalk requiere definir si las tarjetas llevan un campo `tabCategory` o si se usa un modelo de contenedor anidado.

---

## Archivos generados

```
analysis/
├── global-tokens.md
├── pricing-tabs-instructions.md
├── coverage-cta-instructions.md
├── promo-carousel-instructions.md
├── why-o2-instructions.md
├── app-promo-instructions.md
├── benefits-cards-instructions.md
├── support-cta-instructions.md
└── README.md  ← este archivo
```
