"use client";
import { useRef } from "react";
import Image from "next/image";
import type { BeforeAfterContent } from "@/types/blocks";
import { uploadImage } from "../uploadImage";

interface Props { content: BeforeAfterContent; onChange: (c: BeforeAfterContent) => void }

function ImageSlot({ label, src, onUpload }: { label: string; src?: string; onUpload: (url: string) => void }) {
  const ref = useRef<HTMLInputElement>(null);
  const upload = async (file: File) => { const url = await uploadImage(file); onUpload(url); };
  return (
    <div className="flex-1">
      <p className="font-body text-xs text-brand-mid mb-1">{label}</p>
      <div className="relative h-28 rounded-[3px] overflow-hidden cursor-pointer hover:opacity-80 transition-opacity"
        style={src ? {} : { background: "#f0f6fb", border: "2px dashed #d0e8f7" }}
        onClick={() => ref.current?.click()}
      >
        {src ? <Image src={src} alt={label} fill className="object-cover" /> : (
          <div className="flex items-center justify-center h-full">
            <span className="font-body text-sm text-brand-muted">Subir</span>
          </div>
        )}
      </div>
      <input ref={ref} type="file" accept="image/*" className="hidden" onChange={(e) => { const f = e.target.files?.[0]; if (f) upload(f); e.target.value = ""; }} />
    </div>
  );
}

export default function BeforeAfterFill({ content, onChange }: Props) {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex gap-3">
        <ImageSlot label="Foto ANTES" src={content.before} onUpload={(url) => onChange({ ...content, before: url })} />
        <ImageSlot label="Foto DESPUÉS" src={content.after} onUpload={(url) => onChange({ ...content, after: url })} />
      </div>
      <div className="flex gap-3">
        <input type="text" placeholder="Etiqueta izquierda (Antes)" value={content.labelBefore ?? ""} onChange={(e) => onChange({ ...content, labelBefore: e.target.value })}
          className="flex-1 border border-brand-light-border rounded-[3px] px-3 py-2 font-body text-sm focus:outline-none focus:border-brand-blue" />
        <input type="text" placeholder="Etiqueta derecha (Después)" value={content.labelAfter ?? ""} onChange={(e) => onChange({ ...content, labelAfter: e.target.value })}
          className="flex-1 border border-brand-light-border rounded-[3px] px-3 py-2 font-body text-sm focus:outline-none focus:border-brand-blue" />
      </div>
    </div>
  );
}
