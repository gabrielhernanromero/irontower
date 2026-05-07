"use client";
import { useDraggable } from "@dnd-kit/core";
import { BLOCK_META, BlockType } from "@/types/blocks";

const PALETTE_TYPES: BlockType[] = [
  "hero",
  "text",
  "text_image",
  "gallery",
  "carousel",
  "stats",
  "video",
  "before_after",
  "testimonial",
  "project_sheet",
];

function PaletteCard({ type }: { type: BlockType }) {
  const meta = BLOCK_META[type];
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id: `palette-${type}`,
    data: { source: "palette", blockType: type },
  });

  return (
    <div
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      className="flex items-start gap-3 p-3 rounded-[4px] border border-brand-light-border bg-white cursor-grab active:cursor-grabbing select-none transition-all hover:border-brand-blue hover:shadow-sm"
      style={{ opacity: isDragging ? 0.4 : 1 }}
    >
      <span className="text-2xl leading-none mt-0.5 shrink-0">{meta.icon}</span>
      <div className="min-w-0">
        <p className="font-condensed font-bold text-[13px] text-brand-ink leading-tight">{meta.label}</p>
        <p className="font-body text-[11px] text-brand-muted leading-snug mt-0.5">{meta.description}</p>
      </div>
    </div>
  );
}

export default function BlockPalette() {
  return (
    <aside
      className="shrink-0 flex flex-col border-r border-brand-light-border overflow-y-auto"
      style={{ width: 240, background: "#f7fafd" }}
    >
      <div className="px-4 py-3 border-b border-brand-light-border">
        <p className="font-condensed font-black text-[11px] tracking-[0.12em] uppercase text-brand-mid">
          Bloques disponibles
        </p>
        <p className="font-body text-[10px] text-brand-muted mt-0.5">Arrastrá al lienzo</p>
      </div>
      <div className="flex flex-col gap-2 p-3">
        {PALETTE_TYPES.map((type) => (
          <PaletteCard key={type} type={type} />
        ))}
      </div>
    </aside>
  );
}
