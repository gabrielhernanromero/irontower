# IronTower — Reglas y Estado del Proyecto

## Stack
- **Framework:** Next.js 14 (App Router)
- **Lenguaje:** TypeScript estricto
- **Estilos:** Tailwind CSS v3 + `@tailwindcss/typography` (plugin instalado)
- **Animaciones:** framer-motion
- **Íconos:** lucide-react
- **Base de datos:** Supabase (PostgreSQL) — proyecto `wvovbcsrpxepfmrmxwqu`
- **Auth:** NextAuth v5 beta (`next-auth@^5.0.0-beta.31`)
- **Editor de texto:** TipTap v3 (`@tiptap/react`, `@tiptap/starter-kit`, extensions)
- **Analytics:** Google Analytics 4 via `@next/third-parties/google` + Vercel Analytics
- **Deploy:** Vercel — proyecto `gabrielhernanromeros-projects/irontower`

## URLs de producción
- **Sitio:** `https://irontower.vercel.app` / `https://www.irontowervrw.com.ar`
- **Blog:** `https://irontower.vercel.app/blog`
- **Admin:** `https://irontower.vercel.app/admin/login`
  - Email: `irontowerta@gmail.com`
  - Contraseña: guardada en Vercel env var `ADMIN_PASSWORD`

---

## Estructura de carpetas completa

```
src/
  app/
    layout.tsx                  ← metadata global, Schema.org, GA4, Vercel Analytics
    page.tsx                    ← homepage (landing)
    sitemap.ts                  ← sitemap dinámico (homepage + servicios + blog posts)
    robots.ts                   ← robots.txt (bloquea /admin/)
    blog/
      page.tsx                  ← listado público de artículos
      [slug]/page.tsx           ← artículo individual con Schema BlogPosting
    admin/
      layout.tsx                ← layout protegido (verifica sesión NextAuth)
      login/page.tsx            ← formulario de login
      posts/
        page.tsx                ← dashboard de posts (listar, publicar, editar)
        new/page.tsx            ← crear nuevo artículo con guía de IA
        [id]/edit/page.tsx      ← editar artículo existente
    api/
      auth/[...nextauth]/route.ts  ← handler de NextAuth
      posts/route.ts            ← POST: crear post
      posts/[id]/route.ts       ← GET/PATCH/DELETE post individual
      upload/route.ts           ← subir imagen a Supabase Storage
    montaje-torres/page.tsx     ← página SEO: montaje de torres
    lineas-anclaje/page.tsx     ← página SEO: líneas de vida y anclaje
    limpieza-fachadas/page.tsx  ← página SEO: limpieza de fachadas
    prevencion-incendios/page.tsx ← página SEO: prevención incendios
    capacitacion-altura/page.tsx  ← página SEO: capacitación en altura
    rescate-altura/page.tsx     ← página SEO: rescate en altura
  components/
    sections/                   ← secciones de la landing (Hero, About, Services...)
    ui/                         ← componentes reutilizables
    layout/
      Header.tsx                ← nav con links /#seccion (no #seccion)
      Footer.tsx
      ServicePage.tsx           ← template compartido para las 6 páginas de servicio
    blog/
      PostCard.tsx              ← card de artículo para el listado
      RichTextEditor.tsx        ← editor TipTap con botón "Pegar HTML"
      BlogCTA.tsx               ← bloque CTA al final de cada artículo
      TagSelector.tsx           ← selector de etiquetas con campo personalizado
  lib/
    supabase.ts                 ← cliente Supabase lazy (función, no módulo)
    auth.ts                     ← configuración NextAuth v5
  middleware.ts                 ← protege /admin/* verificando cookies authjs.*
public/
  images/
    services/                   ← fotos de servicios (montaje-torres.jpg, anclaje.webp, etc.)
    clients/                    ← logos de clientes
assets/
  empresa/                      ← info, PDF e imágenes de la empresa
```

---

## Variables de entorno (todas cargadas en Vercel)

```
NEXT_PUBLIC_GA_ID=              ← Measurement ID de Google Analytics 4
NEXTAUTH_SECRET=                ← clave aleatoria para firmar JWT
NEXTAUTH_URL=https://www.irontowervrw.com.ar
ADMIN_EMAIL=irontowerta@gmail.com
ADMIN_PASSWORD=                 ← contraseña del panel admin
NEXT_PUBLIC_SUPABASE_URL=https://wvovbcsrpxepfmrmxwqu.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=sb_publishable_...
SUPABASE_SERVICE_ROLE_KEY=sb_secret_...
```

---

## Supabase

### Tabla `posts`
```sql
CREATE TABLE posts (
  id          UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title       TEXT NOT NULL,
  slug        TEXT UNIQUE NOT NULL,
  excerpt     TEXT,
  content     TEXT,         -- HTML del TipTap
  cover_image TEXT,         -- URL de Supabase Storage
  tags        TEXT[],
  published   BOOLEAN DEFAULT false,
  created_at  TIMESTAMPTZ DEFAULT now(),
  updated_at  TIMESTAMPTZ DEFAULT now()
);
```

### Storage
- Bucket: `blog-images` (público)
- Las imágenes se sirven desde `https://wvovbcsrpxepfmrmxwqu.supabase.co/storage/v1/object/public/blog-images/`
- El dominio está habilitado en `next.config.mjs` bajo `images.remotePatterns`

---

## Sistema de Blog — cómo funciona

### Publicar un artículo con IA
1. Ir a `/admin/posts/new`
2. En el panel azul "Guía para crear artículos con IA", copiar el prompt
3. Pegarlo en ChatGPT o Claude reemplazando `[TEMA DEL ARTÍCULO]`
4. Copiar cada sección de la respuesta al campo correspondiente:
   - `TÍTULO` → campo Título (la URL/slug se genera sola)
   - `RESUMEN` → campo Resumen (max 155 caracteres)
   - `TAGS` → hacer clic en las etiquetas indicadas
   - `CONTENIDO HTML` → clic en botón **"Pegar HTML"** del editor → pegar → "Insertar contenido"
5. Subir imagen de portada (JPG/PNG/WEBP, ideal 1200×630 px)
6. "Publicar ahora" o "Guardar borrador"

> **IMPORTANTE:** El HTML siempre debe pegarse con el botón "Pegar HTML", nunca directo en el área del editor. Si se pega directo, TipTap lo trata como texto plano y guarda las etiquetas como texto literal.

### Etiquetas disponibles
Trabajos en altura · Telecomunicaciones · Fachadas · Incendios · Capacitación · Rescate · IRATA · Seguridad · Proyectos realizados

También se pueden crear etiquetas personalizadas escribiendo en el campo y presionando Enter.

---

## Páginas de servicios SEO

Cada servicio tiene su propia URL para posicionarse en Google:

| URL | Servicio | Keyword principal |
|---|---|---|
| `/montaje-torres` | Montaje de torres de telecomunicaciones | "montaje torres telecomunicaciones Argentina" |
| `/lineas-anclaje` | Líneas de vida y anclaje | "líneas de vida y anclaje Argentina" |
| `/limpieza-fachadas` | Limpieza de fachadas y cristales | "limpieza fachadas altura Argentina" |
| `/prevencion-incendios` | Prevención de incendios | "habilitación local comercial incendios" |
| `/capacitacion-altura` | Capacitación en trabajo en altura | "capacitación trabajo en altura Argentina" |
| `/rescate-altura` | Rescate en altura y espacios confinados | "rescate en altura Argentina" |

Cada página usa el componente `ServicePage.tsx` y tiene: metadata con keywords, Schema.org `Service`, breadcrumb, H1, body con keywords, proceso en 4 pasos, FAQ y CTA.

---

## Reglas de componentes
- Todo componente debe tener tipado TypeScript explícito (props con `interface` o `type`)
- Usar clases Tailwind siempre. Excepción: `style={{}}` solo para valores dinámicos o `clamp()`
- No crear archivos `.css` separados — todo con Tailwind utilities
- Usar `next/image` para todas las imágenes (nunca `<img>`)

## Reglas de navegación
- Los links del Header usan `/#seccion` (no `#seccion`) para funcionar desde cualquier página
- Las páginas de servicios y blog tienen Header y Footer comunes

## Reglas de Supabase
- El cliente Supabase SIEMPRE se inicializa dentro de una función (`supabase()`, no módulo)
- Nunca instanciar `createClient()` a nivel de módulo — Next.js lo evalúa en build time cuando las env vars están vacías

## Reglas de NextAuth v5
- Las cookies de sesión se llaman `authjs.session-token` (no `next-auth.session-token` como en v4)
- El middleware verifica ambas variantes para compatibilidad
- El `AdminLayout` NO debe redirigir — eso lo hace el middleware. El layout solo agrega el chrome cuando hay sesión.

## SEO — implementado
- `src/app/layout.tsx`: title, description, 18+ keywords, openGraph, twitter card, robots, Schema.org `ProfessionalService`
- `src/app/sitemap.ts`: homepage + 6 páginas de servicio + posts del blog (dinámico desde Supabase)
- `src/app/robots.ts`: bloquea `/admin/`, expone sitemap
- Cada página de servicio: metadata individual + Schema.org `Service` + URL canónica
- Cada artículo de blog: metadata dinámica (título/excerpt/cover) + Schema.org `BlogPosting`
- Alt texts en imágenes de servicios: descriptivos con keywords

## Analytics — implementado
- **Google Analytics 4:** `<GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID} />` en layout.tsx
- **Vercel Analytics:** `<Analytics />` en layout.tsx
- Para activar GA4: agregar `NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX` en Vercel → redeploy

## Google Search Console — pendiente (manual)
1. Ir a search.google.com/search-console
2. Agregar dominio `irontowervrw.com.ar`
3. Verificar con registro TXT en el proveedor de dominio
4. Enviar sitemap: `https://www.irontowervrw.com.ar/sitemap.xml`

---

## Skills disponibles
- `/new-section` — crear nueva sección de la landing
- `/new-component` — crear componente UI reutilizable
