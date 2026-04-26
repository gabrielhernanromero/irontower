# IronTower — Reglas del Proyecto

## Stack
- Next.js 14 (App Router), TypeScript estricto, Tailwind CSS v3 + @tailwindcss/typography
- Supabase + NextAuth v5 beta + TipTap v3 + Vercel Analytics + GA4

## Reglas de código
- Props siempre tipadas con `interface` o `type`
- Tailwind para estilos. `style={{}}` solo para valores dinámicos o `clamp()`
- `next/image` siempre, nunca `<img>`
- Alt texts descriptivos con keywords en imágenes de servicios

## Reglas críticas (no romper)
- **Supabase:** cliente siempre lazy — `export function supabase() { return createClient(...) }`. Nunca a nivel de módulo.
- **NextAuth v5:** cookies se llaman `authjs.session-token` (no `next-auth.*` como v4). El middleware verifica ambas.
- **AdminLayout:** NO llama a `redirect()`. El middleware ya protege las rutas. Si el layout redirige → loop infinito en /admin/login.
- **TipTap:** HTML siempre con el botón "Pegar HTML". Pegado directo en el editor → HTML guardado como texto plano.
- **Nav links:** usar `/#seccion` no `#seccion`. Los hash-only no funcionan desde otras páginas.

## Estructura principal
```
src/app/          ← rutas (blog, admin, API, 6 páginas de servicio SEO)
src/components/
  sections/       ← secciones de la landing
  layout/         ← Header, Footer, ServicePage (template servicios)
  blog/           ← PostCard, RichTextEditor, BlogCTA, TagSelector
  ui/             ← componentes reutilizables
src/lib/          ← supabase.ts (lazy), auth.ts (NextAuth)
src/middleware.ts ← protege /admin/*
```

## SEO implementado
- metadata + Schema.org en layout.tsx (ProfessionalService) y en cada artículo (BlogPosting)
- 6 páginas individuales por servicio: `/montaje-torres`, `/lineas-anclaje`, `/limpieza-fachadas`, `/prevencion-incendios`, `/capacitacion-altura`, `/rescate-altura`
- Sitemap dinámico en `sitemap.ts` · robots en `robots.ts`

## Skills disponibles
- `/new-section` — crear nueva sección de la landing
- `/new-component` — crear componente UI reutilizable
