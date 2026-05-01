import Image from "next/image";
import type { HeroContent, HeroConfig } from "@/types/blocks";

export default function HeroBlock({ content, config }: { content: HeroContent; config: HeroConfig }) {
  const pos = config.textPosition ?? "center";
  const align = pos === "left" ? "items-end justify-start text-left px-[8%]" : pos === "bottom" ? "items-end justify-center text-center pb-16" : "items-center justify-center text-center";

  return (
    <div className="relative w-full min-h-[60vh] flex overflow-hidden">
      {content.image && (
        <Image src={content.image} alt={content.title ?? "Portada"} fill className="object-cover" priority sizes="100vw" />
      )}
      {config.overlay && <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, rgba(10,58,92,0.2) 0%, rgba(10,58,92,0.75) 100%)" }} />}
      <div className={`relative z-10 flex flex-col ${align} w-full py-20 px-[5%]`}>
        {content.title && (
          <h1 className="font-condensed font-black text-white leading-tight mb-3" style={{ fontSize: "clamp(2.2rem, 6vw, 4rem)" }}>
            {content.title}
          </h1>
        )}
        {content.subtitle && (
          <p className="font-body text-white/80 text-xl max-w-[600px]">{content.subtitle}</p>
        )}
      </div>
    </div>
  );
}
