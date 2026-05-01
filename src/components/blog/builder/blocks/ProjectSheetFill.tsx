"use client";
import type { ProjectSheetContent, SheetItem } from "@/types/blocks";

interface Props { content: ProjectSheetContent; onChange: (c: ProjectSheetContent) => void }

const EMPTY: SheetItem = { key: "", value: "" };

const DEFAULTS: SheetItem[] = [
  { key: "Ubicación", value: "" },
  { key: "Cliente", value: "" },
  { key: "Servicios", value: "" },
  { key: "Duración", value: "" },
];

export default function ProjectSheetFill({ content, onChange }: Props) {
  const sheet = content.sheet?.length ? content.sheet : DEFAULTS;

  const update = (i: number, field: keyof SheetItem, val: string) => {
    const next = sheet.map((item, idx) => idx === i ? { ...item, [field]: val } : item);
    onChange({ sheet: next });
  };

  const add = () => onChange({ sheet: [...sheet, { ...EMPTY }] });
  const remove = (i: number) => onChange({ sheet: sheet.filter((_, idx) => idx !== i) });

  return (
    <div className="flex flex-col gap-2">
      {sheet.map((item, i) => (
        <div key={i} className="flex gap-2 items-center">
          <input type="text" placeholder="Clave (ej: Ubicación)" value={item.key} onChange={(e) => update(i, "key", e.target.value)}
            className="w-36 border border-brand-light-border rounded-[3px] px-3 py-2 font-body text-sm focus:outline-none focus:border-brand-blue" />
          <input type="text" placeholder="Valor" value={item.value} onChange={(e) => update(i, "value", e.target.value)}
            className="flex-1 border border-brand-light-border rounded-[3px] px-3 py-2 font-body text-sm focus:outline-none focus:border-brand-blue" />
          <button type="button" onClick={() => remove(i)} className="text-red-400 hover:text-red-600 text-xs px-1">✕</button>
        </div>
      ))}
      <button type="button" onClick={add} className="font-body text-xs text-brand-blue hover:text-brand-ink transition-colors text-left mt-1">
        + Agregar fila
      </button>
    </div>
  );
}
