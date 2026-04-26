"use client";

import { useState, KeyboardEvent } from "react";

const TAGS_SUGERIDOS = [
  "Trabajos en altura",
  "Telecomunicaciones",
  "Fachadas",
  "Incendios",
  "Capacitación",
  "Rescate",
  "IRATA",
  "Seguridad",
  "Proyectos realizados",
];

interface TagSelectorProps {
  tags: string[];
  onChange: (tags: string[]) => void;
}

export default function TagSelector({ tags, onChange }: TagSelectorProps) {
  const [input, setInput] = useState("");

  const toggle = (tag: string) => {
    onChange(tags.includes(tag) ? tags.filter((t) => t !== tag) : [...tags, tag]);
  };

  const addCustom = () => {
    const trimmed = input.trim();
    if (!trimmed || tags.includes(trimmed)) { setInput(""); return; }
    onChange([...tags, trimmed]);
    setInput("");
  };

  const handleKey = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") { e.preventDefault(); addCustom(); }
  };

  const customTags = tags.filter((t) => !TAGS_SUGERIDOS.includes(t));

  return (
    <div className="flex flex-col gap-3">
      {/* Etiquetas predefinidas */}
      <div className="flex flex-wrap gap-2">
        {TAGS_SUGERIDOS.map((tag) => (
          <button
            key={tag}
            type="button"
            onClick={() => toggle(tag)}
            className="font-body text-xs px-3 py-1.5 rounded-full border transition-colors"
            style={{
              borderColor: tags.includes(tag) ? "#0e4d7a" : "#d0e8f7",
              background: tags.includes(tag) ? "rgba(14,77,122,0.08)" : "#fff",
              color: tags.includes(tag) ? "#0e4d7a" : "#6a8aaa",
            }}
          >
            {tags.includes(tag) ? "✓ " : ""}{tag}
          </button>
        ))}
      </div>

      {/* Etiquetas personalizadas activas */}
      {customTags.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {customTags.map((tag) => (
            <span
              key={tag}
              className="flex items-center gap-1 font-body text-xs px-3 py-1.5 rounded-full border"
              style={{ borderColor: "#E8721C", background: "rgba(232,114,28,0.08)", color: "#E8721C" }}
            >
              {tag}
              <button
                type="button"
                onClick={() => onChange(tags.filter((t) => t !== tag))}
                className="ml-0.5 leading-none hover:opacity-70 transition-opacity"
                aria-label={`Eliminar etiqueta ${tag}`}
              >
                ✕
              </button>
            </span>
          ))}
        </div>
      )}

      {/* Input para etiqueta personalizada */}
      <div className="flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKey}
          placeholder="Nueva etiqueta personalizada..."
          className="flex-1 border border-brand-light-border rounded-[3px] px-3 py-2 font-body text-xs text-brand-ink focus:outline-none focus:border-brand-blue-dark transition-colors"
        />
        <button
          type="button"
          onClick={addCustom}
          disabled={!input.trim()}
          className="font-condensed font-bold text-xs px-4 py-2 rounded-[3px] transition-opacity disabled:opacity-40"
          style={{ background: "#0e4d7a", color: "#fff" }}
        >
          + Agregar
        </button>
      </div>
      <p className="font-body text-xs text-brand-muted">Presioná Enter o clic en "+ Agregar" para crear una etiqueta nueva.</p>
    </div>
  );
}
