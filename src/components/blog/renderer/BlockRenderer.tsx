import type { TemplateStructure, PostBlocks, BlockContent, BlockType } from "@/types/blocks";
import HeroBlock from "./blocks/HeroBlock";
import CarouselBlock from "./blocks/CarouselBlock";
import TextImageBlock from "./blocks/TextImageBlock";
import GalleryBlock from "./blocks/GalleryBlock";
import TextBlock from "./blocks/TextBlock";
import VideoBlock from "./blocks/VideoBlock";
import StatsBlock from "./blocks/StatsBlock";
import BeforeAfterBlock from "./blocks/BeforeAfterBlock";
import TestimonialBlock from "./blocks/TestimonialBlock";
import ProjectSheetBlock from "./blocks/ProjectSheetBlock";

interface Props {
  structure: TemplateStructure;
  blocks: PostBlocks;
}

const colSpanClass: Record<number, string> = {
  4:  "col-span-12 md:col-span-4",
  6:  "col-span-12 md:col-span-6",
  8:  "col-span-12 md:col-span-8",
  12: "col-span-12",
};

function renderBlock(type: BlockType, config: unknown, content: BlockContent) {
  switch (type) {
    case "hero":         return <HeroBlock content={content as never} config={config as never} />;
    case "carousel":     return <CarouselBlock content={content as never} config={config as never} />;
    case "text_image":   return <TextImageBlock content={content as never} config={config as never} />;
    case "gallery":      return <GalleryBlock content={content as never} config={config as never} />;
    case "text":         return <TextBlock content={content as never} />;
    case "video":        return <VideoBlock content={content as never} config={config as never} />;
    case "stats":        return <StatsBlock content={content as never} />;
    case "before_after": return <BeforeAfterBlock content={content as never} />;
    case "testimonial":  return <TestimonialBlock content={content as never} />;
    case "project_sheet":return <ProjectSheetBlock content={content as never} />;
    default:             return null;
  }
}

export default function BlockRenderer({ structure, blocks }: Props) {
  return (
    <div className="flex flex-col gap-10">
      {structure.rows.map((row) => (
        <div key={row.id} className="grid grid-cols-12 gap-6 md:gap-8">
          {row.columns.map((col) => {
            const content = (blocks[row.id]?.[col.id] ?? {}) as BlockContent;
            return (
              <div key={col.id} className={colSpanClass[col.span] ?? "col-span-12"}>
                {renderBlock(col.block.type, col.block.config, content)}
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
}
