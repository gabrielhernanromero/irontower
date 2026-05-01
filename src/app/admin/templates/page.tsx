"use client";
import { useState, useEffect } from "react";
import type { PostTemplate } from "@/lib/supabase";
import type { TemplateStructure } from "@/types/blocks";
import { BLOCK_META } from "@/types/blocks";

const PRESETS: { name: string; structure: TemplateStructure }[] = [
  {
    name: "Caso de Éxito",
    structure: {
      rows: [
        { id: "r1", columns: [{ id: "c1", span: 12, block: { type: "hero", config: { overlay: true, textPosition: "center" } } }] },
        { id: "r2", columns: [
          { id: "c1", span: 6, block: { type: "stats", config: { items: 4 } } },
          { id: "c2", span: 6, block: { type: "project_sheet", config: {} } },
        ]},
        { id: "r3", columns: [{ id: "c1", span: 12, block: { type: "before_after", config: {} } }] },
        { id: "r4", columns: [{ id: "c1", span: 12, block: { type: "carousel", config: { autoplay: true, interval: 3000, effect: "slide" } } }] },
      ],
    },
  },
  {
    name: "Artículo con Galería",
    structure: {
      rows: [
        { id: "r1", columns: [{ id: "c1", span: 12, block: { type: "hero", config: { overlay: true, textPosition: "bottom" } } }] },
        { id: "r2", columns: [{ id: "c1", span: 12, block: { type: "text", config: {} } }] },
        { id: "r3", columns: [{ id: "c1", span: 12, block: { type: "gallery", config: { columns: 3 } } }] },
        { id: "r4", columns: [{ id: "c1", span: 12, block: { type: "testimonial", config: {} } }] },
      ],
    },
  },
  {
    name: "Nota técnica",
    structure: {
      rows: [
        { id: "r1", columns: [{ id: "c1", span: 12, block: { type: "text", config: {} } }] },
        { id: "r2", columns: [
          { id: "c1", span: 6, block: { type: "text_image", config: { imagePosition: "right" } } },
          { id: "c2", span: 6, block: { type: "stats", config: { items: 4 } } },
        ]},
        { id: "r3", columns: [{ id: "c1", span: 12, block: { type: "video", config: { autoplay: false } } }] },
      ],
    },
  },
];

function StructurePreview({ structure }: { structure: TemplateStructure }) {
  return (
    <div className="flex flex-col gap-1">
      {structure.rows.map((row) => (
        <div key={row.id} className="flex gap-1">
          {row.columns.map((col) => (
            <div
              key={col.id}
              className="flex items-center justify-center h-8 rounded-[2px] text-[10px] font-body text-brand-blue gap-1"
              style={{ flex: col.span, background: "rgba(14,77,122,0.08)", border: "1px solid rgba(14,77,122,0.15)" }}
            >
              <span>{BLOCK_META[col.block.type]?.icon}</span>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

export default function TemplatesPage() {
  const [templates, setTemplates] = useState<PostTemplate[]>([]);
  const [loading, setLoading] = useState(true);
  const [newName, setNewName] = useState("");
  const [creating, setCreating] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const load = () => {
    setLoading(true);
    fetch("/api/templates").then((r) => r.json()).then((list) => {
      if (Array.isArray(list)) setTemplates(list);
      setLoading(false);
    }).catch(() => setLoading(false));
  };

  useEffect(() => { load(); }, []);

  const createPreset = async (preset: typeof PRESETS[0]) => {
    const res = await fetch("/api/templates", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: preset.name, structure: preset.structure }),
    });
    if (res.ok) load();
  };

  const createBlank = async () => {
    if (!newName.trim()) { alert("Escribí un nombre para la plantilla."); return; }
    setCreating(true);
    const res = await fetch("/api/templates", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: newName.trim(), structure: { rows: [] } }),
    });
    setCreating(false);
    if (res.ok) { setNewName(""); load(); }
  };

  const deleteTemplate = async (id: string) => {
    if (!confirm("¿Eliminar esta plantilla? Los artículos que la usan conservarán sus bloques.")) return;
    setDeletingId(id);
    await fetch(`/api/templates/${id}`, { method: "DELETE" });
    setDeletingId(null);
    load();
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-condensed font-black text-3xl text-brand-ink">Plantillas de artículo</h1>
          <p className="font-body text-brand-muted text-sm mt-1">Estructuras reutilizables para crear artículos con bloques.</p>
        </div>
        <a href="/admin/posts" className="font-body text-sm text-brand-mid hover:text-brand-ink transition-colors">← Posts</a>
      </div>

      {/* Presets */}
      <div className="mb-8 bg-white rounded-[4px] p-6 border border-brand-light-border">
        <h2 className="font-condensed font-bold text-brand-ink text-lg mb-1">Plantillas prediseñadas</h2>
        <p className="font-body text-xs text-brand-muted mb-4">Guardá una de estas plantillas para usarla al crear artículos.</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {PRESETS.map((preset) => (
            <div key={preset.name} className="border border-brand-light-border rounded-[4px] p-4 flex flex-col gap-3">
              <p className="font-condensed font-bold text-brand-ink text-base">{preset.name}</p>
              <StructurePreview structure={preset.structure} />
              <button type="button" onClick={() => createPreset(preset)}
                className="font-condensed font-bold text-[12px] tracking-[0.08em] uppercase py-2 rounded-[3px] border-2 transition-colors hover:opacity-80"
                style={{ borderColor: "#0e4d7a", color: "#0e4d7a" }}>
                Guardar esta plantilla
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Create blank */}
      <div className="mb-8 bg-white rounded-[4px] p-6 border border-brand-light-border">
        <h2 className="font-condensed font-bold text-brand-ink text-lg mb-1">Nueva plantilla en blanco</h2>
        <p className="font-body text-xs text-brand-muted mb-4">Creá una plantilla vacía y después la completás al editar un artículo con bloques.</p>
        <div className="flex gap-3 max-w-sm">
          <input type="text" placeholder="Nombre de la plantilla" value={newName} onChange={(e) => setNewName(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && createBlank()}
            className="flex-1 border border-brand-light-border rounded-[3px] px-3 py-2 font-body text-sm focus:outline-none focus:border-brand-blue" />
          <button type="button" onClick={createBlank} disabled={creating}
            className="font-condensed font-bold text-[12px] tracking-[0.08em] uppercase px-4 py-2 rounded-[3px] text-white transition-opacity disabled:opacity-60 hover:opacity-90"
            style={{ background: "#E8721C" }}>
            {creating ? "Creando..." : "Crear"}
          </button>
        </div>
      </div>

      {/* Existing templates */}
      <div className="bg-white rounded-[4px] border border-brand-light-border overflow-hidden">
        <div className="px-6 py-4 border-b border-brand-light-border" style={{ background: "#f7fafd" }}>
          <h2 className="font-condensed font-bold text-brand-ink">Plantillas guardadas ({templates.length})</h2>
        </div>
        {loading ? (
          <div className="p-8 text-center font-body text-brand-muted text-sm">Cargando...</div>
        ) : templates.length === 0 ? (
          <div className="p-8 text-center font-body text-brand-muted text-sm">No hay plantillas guardadas aún.</div>
        ) : (
          <div className="divide-y divide-brand-light-border">
            {templates.map((tpl) => (
              <div key={tpl.id} className="flex items-center justify-between px-6 py-4">
                <div className="flex items-center gap-6">
                  <div className="w-40">
                    <StructurePreview structure={tpl.structure} />
                  </div>
                  <div>
                    <p className="font-condensed font-bold text-brand-ink text-base">{tpl.name}</p>
                    <p className="font-body text-xs text-brand-muted">{tpl.structure.rows.length} filas · {tpl.structure.rows.reduce((sum, r) => sum + r.columns.length, 0)} bloques</p>
                  </div>
                </div>
                <button type="button" onClick={() => deleteTemplate(tpl.id)} disabled={deletingId === tpl.id}
                  className="font-body text-xs text-red-400 hover:text-red-600 transition-colors disabled:opacity-50">
                  {deletingId === tpl.id ? "Eliminando..." : "Eliminar"}
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
