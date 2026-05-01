"use client";
import { useRef } from "react";
import Image from "next/image";
import type { HeroContent } from "@/types/blocks";
import { uploadImage } from "../uploadImage";

interface Props { content: HeroContent; onChange: (c: HeroContent) => void }

export default function HeroFill({ content, onChange }: Props) {
  const ref = useRef<HTMLInputElement>(null);

  const upload = async (file: File) => {
    const url = await uploadImage(file);
    onChange({ ...content, image: url });
  };

  return (
    <div className="flex flex-col gap-3">
      <div>
        <label className="font-body text-xs text-brand-mid mb-1 block">Imagen de fondo</label>
        {content.image ? (
          <div className="relative h-28 rounded-[3px] overflow-hidden mb-1">
            <Image src={content.image} alt="Hero" fill className="object-cover" />
          </div>
        ) : (
          <div className="h-28 rounded-[3px] flex items-center justify-center cursor-pointer mb-1 hover:opacity-80 transition-opacity"
            style={{ background: "#f0f6fb", border: "2px dashed #d0e8f7" }}
            onClick={() => ref.current?.click()}
          >
            <span className="font-body text-sm text-brand-muted">Subir imagen</span>
          </div>
        )}
        <input ref={ref} type="file" accept="image/*" className="hidden" onChange={(e) => { const f = e.target.files?.[0]; if (f) upload(f); e.target.value = ""; }} />
        <button type="button" onClick={() => ref.current?.click()} className="font-body text-xs text-brand-mid hover:text-brand-ink transition-colors">
          {content.image ? "Cambiar imagen" : "Subir imagen"}
        </button>
      </div>
      <input type="text" placeholder="Título" value={content.title ?? ""} onChange={(e) => onChange({ ...content, title: e.target.value })}
        className="border border-brand-light-border rounded-[3px] px-3 py-2 font-body text-sm focus:outline-none focus:border-brand-blue" />
      <input type="text" placeholder="Subtítulo (opcional)" value={content.subtitle ?? ""} onChange={(e) => onChange({ ...content, subtitle: e.target.value })}
        className="border border-brand-light-border rounded-[3px] px-3 py-2 font-body text-sm focus:outline-none focus:border-brand-blue" />
    </div>
  );
}
