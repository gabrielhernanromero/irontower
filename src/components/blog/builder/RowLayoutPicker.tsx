"use client";
import type { Column } from "@/types/blocks";

interface LayoutOption {
  label: string;
  columns: Pick<Column, "span">[];
}

const LAYOUTS: LayoutOption[] = [
  { label: "1 columna", columns: [{ span: 12 }] },
  { label: "2 iguales", columns: [{ span: 6 }, { span: 6 }] },
  { label: "Texto + foto", columns: [{ span: 8 }, { span: 4 }] },
  { label: "Foto + texto", columns: [{ span: 4 }, { span: 8 }] },
  { label: "3 columnas", columns: [{ span: 4 }, { span: 4 }, { span: 4 }] },
];

interface Props {
  onSelect: (columns: Pick<Column, "span">[]) => void;
  onClose: () => void;
}

export default function RowLayoutPicker({ onSelect, onClose }: Props) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40" onClick={onClose}>
      <div className="bg-white rounded-[4px] p-6 w-[420px] shadow-2xl" onClick={(e) => e.stopPropagation()}>
        <h3 className="font-condensed font-bold text-brand-ink text-lg mb-4">Elegí el layout de la fila</h3>
        <div className="flex flex-col gap-3">
          {LAYOUTS.map((layout) => (
            <button
              key={layout.label}
              type="button"
              onClick={() => { onSelect(layout.columns); onClose(); }}
              className="flex items-center gap-3 p-3 rounded-[3px] border border-brand-light-border hover:border-brand-blue transition-colors text-left"
            >
              <div className="flex gap-1 flex-1">
                {layout.columns.map((c, i) => (
                  <div
                    key={i}
                    className="h-8 rounded-[2px]"
                    style={{ flex: c.span, background: "rgba(14,77,122,0.15)" }}
                  />
                ))}
              </div>
              <span className="font-body text-sm text-brand-mid shrink-0 w-24">{layout.label}</span>
            </button>
          ))}
        </div>
        <button type="button" onClick={onClose} className="mt-4 w-full font-body text-sm text-brand-muted hover:text-brand-ink transition-colors">
          Cancelar
        </button>
      </div>
    </div>
  );
}
