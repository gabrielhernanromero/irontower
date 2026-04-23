---
name: new-section
description: Crear nueva sección de la landing page de IronTower. Usar cuando se necesite agregar Hero, About, Services, Pricing, FAQ, Contact, o cualquier bloque visual nuevo.
---

# Skill: new-section

## Cuándo usar este skill
Cuando el usuario pida agregar una nueva sección a la landing: Hero, About, Services, Pricing, FAQ, Contact, CTA, Testimonials, Team, Portfolio, etc.

## Proceso

1. **Crear el componente** en `src/components/sections/<NombreSeccion>.tsx`
2. **Exportarlo** desde `src/components/sections/index.ts`
3. **Importarlo** en la página correspondiente (normalmente `src/app/page.tsx`)

## Reglas obligatorias

- Componente TypeScript con props tipadas (`interface Props { ... }`)
- Estilos **solo con clases Tailwind** — nunca CSS inline
- Diseño **mobile first**: clases base para móvil, luego `md:` y `lg:`
- Imágenes con `next/image` siempre
- Elementos semánticos HTML: `<section>`, `<h1>`/`<h2>`, etc.
- Atributos `alt` en imágenes, `aria-label` donde aplique
- Animaciones con `framer-motion` si hay movimiento

## Template base

```tsx
// src/components/sections/NombreSeccion.tsx
"use client"; // solo si necesita interactividad

import type { FC } from "react";

interface NombreSeccionProps {
  // props aquí
}

const NombreSeccion: FC<NombreSeccionProps> = () => {
  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4 md:px-6">
        {/* contenido */}
      </div>
    </section>
  );
};

export default NombreSeccion;
```

## Exportar en index.ts

```ts
// src/components/sections/index.ts
export { default as NombreSeccion } from "./NombreSeccion";
```
