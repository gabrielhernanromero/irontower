"use client";
import { useRef } from "react";
import type { HeroContent } from "@/types/blocks";
import { uploadImage } from "../uploadImage";

interface Props { content: HeroContent; onChange: (c: HeroContent) => void }

export default function HeroFill({ content, onChange }: Props) {
  const fileRef = useRef<HTMLInputElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);

  const focalX = content.focalX ?? 50;
  const focalY = content.focalY ?? 50;

  const upload = async (file: File) => {
    const url = await uploadImage(file);
    onChange({ ...content, image: url });
  };

  const updateFocal = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!imageRef.current) return;
    const rect = imageRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(100, ((e.clientX - rect.left) / rect.width) * 100));
    const y = Math.max(0, Math.min(100, ((e.clientY - rect.top) / rect.height) * 100));
    onChange({ ...content, focalX: Math.round(x), focalY: Math.round(y) });
  };

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    dragging.current = true;
    (e.currentTarget as HTMLDivElement).setPointerCapture(e.pointerId);
    updateFocal(e);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!dragging.current) return;
    updateFocal(e);
  };

  const handlePointerUp = () => {
    dragging.current = false;
  };

  return (
    <div className="flex flex-col gap-3">
      <div>
        <label className="font-body text-xs text-brand-mid mb-1 block">Imagen de fondo</label>

        {content.image ? (
          <>
            {/* Focal point picker — usar div+backgroundImage para que los overlays sean visibles */}
            <div
              ref={imageRef}
              className="relative rounded-[3px] mb-1 select-none"
              style={{
                height: 120,
                cursor: "crosshair",
                backgroundImage: `url(${content.image})`,
                backgroundSize: "cover",
                backgroundPosition: `${focalX}% ${focalY}%`,
                overflow: "hidden",
              }}
              onPointerDown={handlePointerDown}
              onPointerMove={handlePointerMove}
              onPointerUp={handlePointerUp}
            >
              {/* Grid semitransparente */}
              <div
                className="absolute inset-0"
                style={{
                  backgroundImage: `linear-gradient(rgba(255,255,255,0.18) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.18) 1px, transparent 1px)`,
                  backgroundSize: "25% 25%",
                  pointerEvents: "none",
                }}
              />
              {/* Líneas de cruz */}
              <div className="absolute" style={{ left: `${focalX}%`, top: 0, bottom: 0, width: 1, background: "rgba(255,255,255,0.5)", transform: "translateX(-50%)", pointerEvents: "none" }} />
              <div className="absolute" style={{ top: `${focalY}%`, left: 0, right: 0, height: 1, background: "rgba(255,255,255,0.5)", transform: "translateY(-50%)", pointerEvents: "none" }} />
              {/* Focal point dot */}
              <div
                className="absolute"
                style={{
                  left: `${focalX}%`,
                  top: `${focalY}%`,
                  transform: "translate(-50%, -50%)",
                  width: 20,
                  height: 20,
                  borderRadius: "50%",
                  border: "2px solid #fff",
                  background: "rgba(232,114,28,0.85)",
                  boxShadow: "0 0 0 1px rgba(0,0,0,0.3), 0 2px 6px rgba(0,0,0,0.4)",
                }}
              />
              {/* Crosshair lines through dot */}
              <div className="absolute pointer-events-none" style={{ left: `${focalX}%`, top: 0, bottom: 0, width: 1, background: "rgba(255,255,255,0.4)", transform: "translateX(-50%)" }} />
              <div className="absolute pointer-events-none" style={{ top: `${focalY}%`, left: 0, right: 0, height: 1, background: "rgba(255,255,255,0.4)", transform: "translateY(-50%)" }} />
            </div>
            <p className="font-body text-[10px] text-brand-muted mb-2">
              Arrastrá el punto naranja para ajustar el encuadre · {focalX}% · {focalY}%
            </p>
          </>
        ) : (
          <div
            className="h-24 rounded-[3px] flex items-center justify-center cursor-pointer mb-2 hover:opacity-80 transition-opacity"
            style={{ background: "#f0f6fb", border: "2px dashed #d0e8f7" }}
            onClick={() => fileRef.current?.click()}
          >
            <span className="font-body text-sm text-brand-muted">Subir imagen</span>
          </div>
        )}

        <input
          ref={fileRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => { const f = e.target.files?.[0]; if (f) upload(f); e.target.value = ""; }}
        />
        <button
          type="button"
          onClick={() => fileRef.current?.click()}
          className="font-body text-xs text-brand-mid hover:text-brand-ink transition-colors"
        >
          {content.image ? "Cambiar imagen" : "Subir imagen"}
        </button>
      </div>

      <input
        type="text"
        placeholder="Título (opcional — se toma del título del artículo)"
        value={content.title ?? ""}
        onChange={(e) => onChange({ ...content, title: e.target.value })}
        className="border border-brand-light-border rounded-[3px] px-3 py-2 font-body text-sm focus:outline-none focus:border-brand-blue"
      />
      <input
        type="text"
        placeholder="Subtítulo (opcional)"
        value={content.subtitle ?? ""}
        onChange={(e) => onChange({ ...content, subtitle: e.target.value })}
        className="border border-brand-light-border rounded-[3px] px-3 py-2 font-body text-sm focus:outline-none focus:border-brand-blue"
      />
    </div>
  );
}
