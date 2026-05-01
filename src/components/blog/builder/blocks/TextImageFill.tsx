"use client";
import { useRef } from "react";
import Image from "next/image";
import type { TextImageContent } from "@/types/blocks";
import { uploadImage } from "../uploadImage";

interface Props { content: TextImageContent; onChange: (c: TextImageContent) => void }

export default function TextImageFill({ content, onChange }: Props) {
  const ref = useRef<HTMLInputElement>(null);

  const upload = async (file: File) => {
    const url = await uploadImage(file);
    onChange({ ...content, image: url });
  };

  return (
    <div className="flex flex-col gap-3">
      <div>
        <label className="font-body text-xs text-brand-mid mb-1 block">Texto (HTML)</label>
        <textarea
          placeholder="<p>Escribí el texto aquí o pegá HTML...</p>"
          value={content.html ?? ""}
          onChange={(e) => onChange({ ...content, html: e.target.value })}
          rows={5}
          className="w-full border border-brand-light-border rounded-[3px] px-3 py-2 font-mono text-xs resize-none focus:outline-none focus:border-brand-blue"
        />
      </div>
      <div>
        <label className="font-body text-xs text-brand-mid mb-1 block">Imagen</label>
        {content.image ? (
          <div className="relative h-24 rounded-[3px] overflow-hidden mb-1">
            <Image src={content.image} alt="Imagen" fill className="object-cover" />
          </div>
        ) : (
          <div className="h-24 rounded-[3px] flex items-center justify-center cursor-pointer hover:opacity-80 transition-opacity mb-1"
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
      <input type="text" placeholder="Texto alternativo de la imagen" value={content.imageAlt ?? ""} onChange={(e) => onChange({ ...content, imageAlt: e.target.value })}
        className="border border-brand-light-border rounded-[3px] px-3 py-2 font-body text-sm focus:outline-none focus:border-brand-blue" />
    </div>
  );
}
