"use client";
import { useState, useRef } from "react";
import Image from "next/image";
import type { BeforeAfterContent } from "@/types/blocks";

export default function BeforeAfterBlock({ content }: { content: BeforeAfterContent }) {
  const [pos, setPos] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = (clientX: number) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    const pct = Math.min(100, Math.max(0, ((clientX - rect.left) / rect.width) * 100));
    setPos(pct);
  };

  if (!content.before && !content.after) return null;

  return (
    <div className="relative w-full overflow-hidden rounded-[4px] select-none" style={{ aspectRatio: "16/9" }} ref={containerRef}
      onMouseMove={(e) => handleMove(e.clientX)}
      onTouchMove={(e) => handleMove(e.touches[0].clientX)}
    >
      {content.after && <Image src={content.after} alt={content.labelAfter ?? "Después"} fill className="object-cover" sizes="100vw" />}
      {content.before && (
        <div className="absolute inset-0 overflow-hidden" style={{ width: `${pos}%` }}>
          <Image src={content.before} alt={content.labelBefore ?? "Antes"} fill className="object-cover" sizes="100vw" />
        </div>
      )}
      <div className="absolute top-0 bottom-0 w-1 bg-white shadow-lg cursor-ew-resize z-10" style={{ left: `${pos}%`, transform: "translateX(-50%)" }}>
        <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-9 h-9 bg-white rounded-full shadow-lg flex items-center justify-center text-brand-ink font-bold text-xs">↔</div>
      </div>
      <span className="absolute bottom-3 left-3 bg-black/50 text-white text-xs px-2 py-1 rounded font-body">{content.labelBefore ?? "Antes"}</span>
      <span className="absolute bottom-3 right-3 bg-black/50 text-white text-xs px-2 py-1 rounded font-body">{content.labelAfter ?? "Después"}</span>
    </div>
  );
}
