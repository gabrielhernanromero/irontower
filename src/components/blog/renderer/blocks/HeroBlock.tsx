import Image from "next/image";
import type { HeroContent, HeroConfig } from "@/types/blocks";

interface PostMeta {
  title?: string;
  tags?: string[];
  date?: string;
  readTime?: number;
}

export default function HeroBlock({
  content,
  config,
  postMeta,
}: {
  content: HeroContent;
  config: HeroConfig;
  postMeta?: PostMeta;
}) {
  const title = postMeta?.title || content.title;
  const tags = postMeta?.tags ?? [];

  return (
    <div className="w-full">
      {/* Full-bleed image */}
      <div className="relative w-full" style={{ height: "50vh", minHeight: 280 }}>
        {content.image ? (
          <Image
            src={content.image}
            alt={title ?? "Portada"}
            fill
            className="object-cover"
            priority
            sizes="100vw"
            style={{ objectPosition: `${content.focalX ?? 50}% ${content.focalY ?? 50}%` }}
          />
        ) : (
          <div
            className="w-full h-full flex items-center justify-center"
            style={{ background: "linear-gradient(135deg, #0a3a5c 0%, #0e4d7a 100%)" }}
          >
            <p className="font-condensed font-bold text-white/40 text-lg">
              Subí una imagen de portada en el panel de la izquierda
            </p>
          </div>
        )}
        {config.overlay && (
          <div
            className="absolute inset-0"
            style={{ background: "linear-gradient(to bottom, rgba(10,58,92,0.2) 0%, rgba(10,58,92,0.75) 100%)" }}
          />
        )}
      </div>

      {/* Meta section below — igual al header de posts de texto */}
      <div className="px-[5%] pt-10 pb-6">
        <div className="max-w-[800px] mx-auto">

          {/* ← Blog · fecha · tiempo de lectura */}
          <div className="flex flex-wrap items-center gap-3 mb-5">
            <span
              className="font-condensed font-bold text-[11px] tracking-[0.12em] uppercase"
              style={{ color: "#0e4d7a" }}
            >
              ← Blog
            </span>
            {postMeta?.date && (
              <>
                <span className="text-brand-muted text-xs">·</span>
                <span className="font-body text-xs text-brand-muted">{postMeta.date}</span>
              </>
            )}
            {postMeta?.readTime && (
              <>
                <span className="text-brand-muted text-xs">·</span>
                <span className="font-body text-xs text-brand-muted">{postMeta.readTime} min de lectura</span>
              </>
            )}
          </div>

          {/* Tags */}
          {tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-5">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="font-body text-[11px] tracking-[0.08em] uppercase px-3 py-1 rounded-[2px]"
                  style={{ background: "rgba(14,77,122,0.08)", color: "#0e4d7a" }}
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          {/* Título */}
          {title && (
            <h1
              className="font-condensed font-black text-brand-ink leading-tight mb-3"
              style={{ fontSize: "clamp(2rem, 5vw, 3rem)" }}
            >
              {title}
            </h1>
          )}

          {content.subtitle && (
            <p className="font-body text-brand-muted text-xl">{content.subtitle}</p>
          )}

          <hr className="border-brand-light-border mt-8" />
        </div>
      </div>
    </div>
  );
}
