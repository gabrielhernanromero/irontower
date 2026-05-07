export type BlockType =
  | "hero"
  | "carousel"
  | "text_image"
  | "gallery"
  | "text"
  | "video"
  | "stats"
  | "before_after"
  | "testimonial"
  | "project_sheet";

export interface HeroConfig { overlay: boolean; textPosition: "center" | "left" | "bottom" }
export interface CarouselConfig { autoplay: boolean; interval: number; effect: "slide" | "fade" }
export interface TextImageConfig { imagePosition: "left" | "right" }
export interface GalleryConfig { columns: 2 | 3 }
export interface StatsConfig { items: number }
export interface VideoConfig { autoplay: boolean }

export type BlockConfig =
  | HeroConfig
  | CarouselConfig
  | TextImageConfig
  | GalleryConfig
  | StatsConfig
  | VideoConfig
  | Record<string, unknown>;

export interface Block {
  type: BlockType;
  config: BlockConfig;
}

export interface Column {
  id: string;
  span: 4 | 6 | 8 | 12;
  block: Block;
}

export interface Row {
  id: string;
  columns: Column[];
}

export interface TemplateStructure {
  rows: Row[];
}

// ---- Block content types (what gets stored in posts.blocks) ----

export interface StatItem { icon: string; value: string; label: string }
export interface SheetItem { key: string; value: string }

export interface HeroContent { image?: string; title?: string; subtitle?: string }
export interface CarouselContent { images: string[] }
export interface TextImageContent { html?: string; image?: string; imageAlt?: string }
export interface GalleryContent { images: string[] }
export interface TextContent { html?: string }
export interface VideoContent { url?: string }
export interface StatsContent { stats: StatItem[] }
export interface BeforeAfterContent { before?: string; after?: string; labelBefore?: string; labelAfter?: string }
export interface TestimonialContent { quote?: string; author?: string; role?: string; company?: string }
export interface ProjectSheetContent { sheet: SheetItem[] }

export type BlockContent =
  | HeroContent
  | CarouselContent
  | TextImageContent
  | GalleryContent
  | TextContent
  | VideoContent
  | StatsContent
  | BeforeAfterContent
  | TestimonialContent
  | ProjectSheetContent;

export type PostBlocks = Record<string, Record<string, BlockContent>>;

// Format stored in the DB: structure embedded under "_s" + content rows
export type SavedBlocksPayload = { _s: TemplateStructure } & Record<string, Record<string, BlockContent>>;

// ---- Template full type ----
export interface PostTemplate {
  id: string;
  name: string;
  structure: TemplateStructure;
  created_at: string;
}

// ---- Block palette metadata ----
export const BLOCK_META: Record<BlockType, { label: string; icon: string; description: string; defaultConfig: BlockConfig }> = {
  hero:          { label: "Portada Hero",       icon: "🖼",  description: "Imagen grande con título y subtítulo", defaultConfig: { overlay: true, textPosition: "center" } as HeroConfig },
  carousel:      { label: "Carrusel de fotos",  icon: "🎠",  description: "Slider con múltiples fotos",          defaultConfig: { autoplay: true, interval: 3000, effect: "slide" } as CarouselConfig },
  text_image:    { label: "Texto + Imagen",      icon: "📰",  description: "Texto al lado de una foto",           defaultConfig: { imagePosition: "right" } as TextImageConfig },
  gallery:       { label: "Galería de fotos",   icon: "🗂",  description: "Grid de fotos 2 o 3 columnas",        defaultConfig: { columns: 3 } as GalleryConfig },
  text:          { label: "Texto libre",         icon: "✍️",  description: "Editor de texto con formato",         defaultConfig: {} },
  video:         { label: "Video",              icon: "🎥",  description: "Embed de YouTube o Vimeo",            defaultConfig: { autoplay: false } as VideoConfig },
  stats:         { label: "Estadísticas",        icon: "📊",  description: "Cifras grandes del proyecto",         defaultConfig: { items: 4 } as StatsConfig },
  before_after:  { label: "Antes / Después",    icon: "↔️",  description: "Slider comparativo",                  defaultConfig: {} },
  testimonial:   { label: "Testimonio",          icon: "💬",  description: "Cita destacada de cliente",           defaultConfig: {} },
  project_sheet: { label: "Ficha técnica",      icon: "📋",  description: "Datos del proyecto (lugar, duración…)", defaultConfig: {} },
};
