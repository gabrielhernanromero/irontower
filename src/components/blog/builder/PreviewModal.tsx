"use client";
import { useEffect } from "react";
import BlockRenderer from "@/components/blog/renderer/BlockRenderer";
import type { TemplateStructure, PostBlocks } from "@/types/blocks";

interface Props {
  structure: TemplateStructure;
  blocks: PostBlocks;
  onClose: () => void;
}

export default function PreviewModal({ structure, blocks, onClose }: Props) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-[100] flex flex-col"
      style={{ background: "rgba(10,30,50,0.85)" }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      {/* Toolbar */}
      <div className="shrink-0 flex items-center justify-between px-6 py-3 border-b" style={{ background: "#0e4d7a", borderColor: "rgba(255,255,255,0.15)" }}>
        <p className="font-condensed font-bold text-white tracking-wide">Vista previa del artículo</p>
        <button
          onClick={onClose}
          className="font-condensed font-bold text-[12px] tracking-[0.08em] uppercase px-4 py-2 rounded-[3px] text-white border border-white/30 hover:bg-white/10 transition-colors"
        >
          Cerrar ✕
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-[1100px] mx-auto px-8 py-12 bg-white min-h-full">
          {structure.rows.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-32 text-center">
              <p className="font-condensed font-bold text-2xl text-brand-mid mb-2">Sin bloques aún</p>
              <p className="font-body text-sm text-brand-muted">Arrastrá bloques desde la paleta para construir el artículo.</p>
            </div>
          ) : (
            <BlockRenderer structure={structure} blocks={blocks} />
          )}
        </div>
      </div>
    </div>
  );
}
