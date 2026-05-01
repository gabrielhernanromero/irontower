import Image from "next/image";
import type { GalleryContent, GalleryConfig } from "@/types/blocks";

export default function GalleryBlock({ content, config }: { content: GalleryContent; config: GalleryConfig }) {
  const images = content.images ?? [];
  const cols = config.columns ?? 3;
  const gridClass = cols === 2 ? "grid-cols-2" : "grid-cols-2 md:grid-cols-3";

  if (!images.length) return null;

  return (
    <div className={`grid ${gridClass} gap-3`}>
      {images.map((src, i) => (
        <div key={src + i} className="relative w-full overflow-hidden rounded-[4px]" style={{ aspectRatio: "4/3" }}>
          <Image src={src} alt={`Foto ${i + 1}`} fill className="object-cover" sizes="(max-width: 768px) 50vw, 33vw" />
        </div>
      ))}
    </div>
  );
}
