# IronTower — Reglas del Proyecto

## Stack
- **Framework:** Next.js 14 (App Router)
- **Lenguaje:** TypeScript estricto
- **Estilos:** Tailwind CSS v3
- **Animaciones:** framer-motion
- **Íconos:** lucide-react

## Reglas de componentes
- Todo componente debe tener tipado TypeScript explícito (props con `interface` o `type`)
- Usar clases Tailwind siempre, **nunca CSS inline** (`style={{...}}`)
- No crear archivos `.css` separados — todo con Tailwind utilities
- Usar `next/image` para todas las imágenes (nunca `<img>`)

## Estructura de carpetas
```
src/
  app/                    ← rutas y layouts (App Router)
  components/
    sections/             ← secciones de la landing (Hero, About, Services...)
    ui/                   ← componentes reutilizables (Button, Card, Badge...)
    layout/               ← Header, Footer, Nav
  lib/                    ← utils y helpers
public/
  images/                 ← imágenes estáticas
  icons/                  ← íconos SVG
assets/
  empresa/                ← info, PDF e imágenes de la empresa
```

## Secciones (`/sections`)
- Cada sección es un componente separado en `src/components/sections/`
- Exportar desde `sections/index.ts`
- Nombres en PascalCase: `Hero.tsx`, `About.tsx`, `Services.tsx`, etc.

## Componentes UI (`/ui`)
- Elementos reutilizables que se repiten en múltiples secciones
- Props tipadas, variantes implementadas con clases Tailwind
- Exportar desde `ui/index.ts`

## SEO y Metadata
- Cada página debe tener `export const metadata: Metadata = { ... }`
- Incluir `title`, `description`, y `openGraph` como mínimo

## Performance
- No instalar librerías pesadas sin justificación
- Preferir componentes server-side (RSC) donde no se necesite interactividad
- Usar `loading="lazy"` en imágenes que estén below the fold

## Diseño
- **Mobile first:** diseñar primero para pantallas pequeñas, luego `md:` y `lg:`
- Colores y tipografías definidos en `tailwind.config.ts`

## Accesibilidad
- Atributo `alt` descriptivo en todas las imágenes
- Atributos `aria-label` en botones/links que no tengan texto visible
- Usar elementos semánticos: `<header>`, `<main>`, `<section>`, `<footer>`, `<nav>`

## Skills disponibles
- `/new-section` — crear nueva sección de la landing
- `/new-component` — crear componente UI reutilizable
