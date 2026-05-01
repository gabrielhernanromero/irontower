import Image from "next/image";
import type { TextImageContent, TextImageConfig } from "@/types/blocks";

export default function TextImageBlock({ content, config }: { content: TextImageContent; config: TextImageConfig }) {
  const imgRight = (config.imagePosition ?? "right") === "right";

  return (
    <div className={`flex flex-col md:flex-row gap-8 items-center ${imgRight ? "" : "md:flex-row-reverse"}`}>
      <div
        className="flex-1 prose prose-base max-w-none font-body text-brand-ink"
        dangerouslySetInnerHTML={{ __html: content.html ?? "" }}
      />
      {content.image && (
        <div className="flex-1 relative w-full min-h-[260px] rounded-[4px] overflow-hidden">
          <Image src={content.image} alt={content.imageAlt ?? "Imagen"} fill className="object-cover" sizes="(max-width: 768px) 100vw, 50vw" />
        </div>
      )}
    </div>
  );
}
