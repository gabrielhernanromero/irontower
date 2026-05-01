"use client";
import type { TestimonialContent } from "@/types/blocks";

interface Props { content: TestimonialContent; onChange: (c: TestimonialContent) => void }

export default function TestimonialFill({ content, onChange }: Props) {
  return (
    <div className="flex flex-col gap-3">
      <textarea placeholder="Cita del cliente..." value={content.quote ?? ""} onChange={(e) => onChange({ ...content, quote: e.target.value })}
        rows={3} className="border border-brand-light-border rounded-[3px] px-3 py-2 font-body text-sm resize-none focus:outline-none focus:border-brand-blue" />
      <div className="flex gap-2">
        <input type="text" placeholder="Nombre del autor" value={content.author ?? ""} onChange={(e) => onChange({ ...content, author: e.target.value })}
          className="flex-1 border border-brand-light-border rounded-[3px] px-3 py-2 font-body text-sm focus:outline-none focus:border-brand-blue" />
        <input type="text" placeholder="Cargo" value={content.role ?? ""} onChange={(e) => onChange({ ...content, role: e.target.value })}
          className="flex-1 border border-brand-light-border rounded-[3px] px-3 py-2 font-body text-sm focus:outline-none focus:border-brand-blue" />
      </div>
      <input type="text" placeholder="Empresa" value={content.company ?? ""} onChange={(e) => onChange({ ...content, company: e.target.value })}
        className="border border-brand-light-border rounded-[3px] px-3 py-2 font-body text-sm focus:outline-none focus:border-brand-blue" />
    </div>
  );
}
