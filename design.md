# InmoTech Design System

## Brand & Style

**InmoTech** es una plataforma de inmobiliaria moderna con enfoque en **Minimalismo** y **Mobile-First**. La UI prioriza la fotografía de propiedades y datos esenciales, transmitiendo profesionalidad, confianza y accesibilidad.

El diseño evoca calma y precisión, con geometría suave y colores sofisticados de alto contraste.

## Colors

### Primary Palette
| Token | Hex | Uso |
|-------|-----|-----|
| `primary` | `#4338ca` | Botones primarios, headers, estados activos (Indigo profundo) |
| `on-primary` | `#ffffff` | Texto sobre primario |
| `primary-container` | `#e0e2fb` | Containers de énfasis |
| `on-primary-container` | `#1e1b4b` | Texto sobre container |

### Secondary Palette  
| Token | Hex | Uso |
|-------|-----|-----|
| `secondary` | `#505f76` | Texto secundario, iconos |
| `on-secondary` | `#ffffff` | Texto sobre secundario |
| `secondary-container` | `#d0e1fb` | Containers secundarios |
| `on-secondary-container` | `#54647a` | Texto sobre container secundario |

### Tertiary (Accent)
| Token | Hex | Uso |
|-------|-----|-----|
| `tertiary` | `#e05456` | Corazón favorito, "Nuevo", alertas |
| `on-tertiary` | `#ffffff` | Texto sobre terciario |

### Neutrals
| Token | Hex | Uso |
|-------|-----|-----|
| `background` | `#f7f9fb` | Fondo principal |
| `surface` | `#ffffff` | Cards, elementos elevados |
| `surface-container-low` | `#f2f4f6` | Containers bajos |
| `surface-container` | `#eceef0` | Containers medios |
| `on-surface` | `#191c1e` | Texto principal |
| `on-surface-variant` | `#45464d` | Texto secundario |
| `outline` | `#76777d` | Bordes |
| `outline-variant` | `#c6c6cd` | Bordes suaves |

### Semantic
| Token | Hex | Uso |
|-------|-----|-----|
| `error` | `#ba1a1a` | Estados de error |
| `on-error` | `#ffffff` | Texto sobre error |
| `success` | `#16a34a` | Éxito (opcional) |

## Typography

**Font Family:** Inter (Google Fonts)

| Token | Size | Weight | Line Height | Letter Spacing | Uso |
|-------|------|--------|-------------|----------------|-----|
| `headline-xl` | 48px | 700 | 56px | -0.02em | Hero titles |
| `headline-lg` | 32px | 700 | 40px | -0.01em | Títulos de sección |
| `headline-md` | 20px | 600 | 28px | - | Subtítulos |
| `body-lg` | 18px | 400 | 28px | - | Descripciones |
| `body-md` | 16px | 400 | 24px | - | Texto general |
| `label-md` | 14px | 600 | 20px | - | Botones, labels |
| `label-sm` | 12px | 500 | 16px | 0.5px | Badges, metadata |

## Spacing

Escala base de **8px**:

| Token | Value |
|-------|-------|
| `stack-sm` | 4px |
| `stack-md` | 12px |
| `stack-lg` | 24px |
| `base` | 8px |
| `gutter` | 16px |
| `container-margin` | 20px |

## Border Radius

| Token | Value | Uso |
|-------|-------|-----|
| `sm` | 4px | Inputs pequeños |
| `DEFAULT` | 8px | Botones, inputs |
| `md` | 12px | Cards pequeñas |
| `lg` | 16px | Cards de propiedad |
| `xl` | 24px | Modales |
| `full` | 9999px | Pills, badges |

## Elevation

### Surface Levels
- **Surface 0:** Fondo principal `#f7f9fb`
- **Surface 1:** Cards con borde 1px `#e0e3e5` o sombra suave (shadow-sm)
- **Surface 2:** Elementos elevados con sombra más pronunciada (shadow-md)

### Shadows
```css
shadow-sm: 0 1px 2px 0 rgb(0 0 0 / 0.05);
shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.1);
shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.1);
```

### Interactions
- **Hover:** Elevación + escala 1.02x
- **Focus:** Ring 2px primary con offset
- **Active:** Escala 0.98x

## Components

### Buttons

**Primary:**
- Background: `primary` (#4338ca)
- Text: `on-primary` (#ffffff)
- Border-radius: `rounded-md` (8px)
- Padding: 12px 24px
- Hover: `primary/90`
- Active: escala 0.98

**Secondary/Ghost:**
- Background: transparent
- Border: 1px `outline`
- Text: `on-surface`
- Hover: `surface-container` background

**Icon Button:**
- Size: 40px × 40px
- Border-radius: `full`
- Background: `surface` con sombra

### Cards

**Property Card:**
- Border-radius: `rounded-lg` (16px)
- Border: 1px `outline-variant`
- Shadow: `shadow-sm`
- Image aspect-ratio: 4/3
- Padding: 16px
- Hover: `shadow-lg` + escala 1.02

**Badge/Pill:**
- Border-radius: `full`
- Padding: 4px 12px
- Font: `label-sm`
- Background según tipo:
  - Venta: `primary` bg
  - Alquiler: `success` bg
  - Obra Nueva: `secondary` bg

### Inputs

- Border-radius: `rounded-md` (8px)
- Border: 1px `outline`
- Padding: 12px 16px
- Focus: border `primary` + ring 2px

### Chips/Tags

- Border-radius: `full`
- Padding: 6px 12px
- Font: `label-sm`
- Selected: bg `primary`, text white
- Unselected: bg `surface-container`, text `on-surface-variant`

## Layout

### Breakpoints
- Mobile: < 640px (1 columna)
- Tablet: 640px - 1024px (2 columnas)
- Desktop: > 1024px (3 columnas)

### Container
- Max-width: 1280px
- Margin horizontal: 20px (mobile), 40px (desktop)

## Iconography

**Library:** Lucide React

- Tamaño estándar: 20px (inline), 24px (buttons)
- Stroke width: 1.5px - 2px
- Color: `on-surface-variant` default, `primary` active

## Motion

- Duración base: 150ms - 300ms
- Easing: `ease-out` para entrada, `ease-in` para salida
- Transiciones: color, background, transform, shadow