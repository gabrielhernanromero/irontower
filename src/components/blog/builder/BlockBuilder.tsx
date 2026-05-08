"use client";
import { useState } from "react";
import {
  DndContext, DragOverlay, closestCenter, KeyboardSensor, PointerSensor,
  useSensor, useSensors, DragEndEvent, DragStartEvent, useDroppable,
} from "@dnd-kit/core";
import {
  SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy,
  useSortable, arrayMove,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import type {
  TemplateStructure, PostBlocks, BlockType, BlockContent, Row,
  HeroConfig, CarouselConfig, TextImageConfig, GalleryConfig, VideoConfig,
} from "@/types/blocks";
import { BLOCK_META } from "@/types/blocks";
import BlockPalette from "./BlockPalette";
import BlockRenderer from "@/components/blog/renderer/BlockRenderer";

import HeroFill from "./blocks/HeroFill";
import CarouselFill from "./blocks/CarouselFill";
import GalleryFill from "./blocks/GalleryFill";
import TextImageFill from "./blocks/TextImageFill";
import TextFill from "./blocks/TextFill";
import VideoFill from "./blocks/VideoFill";
import StatsFill from "./blocks/StatsFill";
import BeforeAfterFill from "./blocks/BeforeAfterFill";
import TestimonialFill from "./blocks/TestimonialFill";
import ProjectSheetFill from "./blocks/ProjectSheetFill";

interface Props {
  structure: TemplateStructure;
  blocks: PostBlocks;
  onStructureChange: (s: TemplateStructure) => void;
  onBlocksChange: (b: PostBlocks) => void;
  postMeta?: { title?: string; tags?: string[] };
}

function uid() {
  return Math.random().toString(36).slice(2, 9);
}

function FillDispatcher({ type, content, onChange }: {
  type: BlockType; content: BlockContent; onChange: (c: BlockContent) => void;
}) {
  switch (type) {
    case "hero":          return <HeroFill content={content as never} onChange={onChange as never} />;
    case "carousel":      return <CarouselFill content={content as never} onChange={onChange as never} />;
    case "text_image":    return <TextImageFill content={content as never} onChange={onChange as never} />;
    case "gallery":       return <GalleryFill content={content as never} onChange={onChange as never} />;
    case "text":          return <TextFill content={content as never} onChange={onChange as never} />;
    case "video":         return <VideoFill content={content as never} onChange={onChange as never} />;
    case "stats":         return <StatsFill content={content as never} onChange={onChange as never} />;
    case "before_after":  return <BeforeAfterFill content={content as never} onChange={onChange as never} />;
    case "testimonial":   return <TestimonialFill content={content as never} onChange={onChange as never} />;
    case "project_sheet": return <ProjectSheetFill content={content as never} onChange={onChange as never} />;
    default:              return null;
  }
}

function ConfigPanel({ type, config, onChange }: {
  type: BlockType; config: Record<string, unknown>; onChange: (c: Record<string, unknown>) => void;
}) {
  if (type === "hero") {
    const c = config as unknown as HeroConfig;
    return (
      <div className="flex flex-wrap gap-4 text-xs font-body">
        <label className="flex items-center gap-1.5 cursor-pointer">
          <input type="checkbox" checked={c.overlay ?? true} onChange={(e) => onChange({ ...c, overlay: e.target.checked })} />
          Overlay oscuro
        </label>
        <select value={c.textPosition ?? "center"} onChange={(e) => onChange({ ...c, textPosition: e.target.value })}
          className="border border-brand-light-border rounded px-2 py-1">
          <option value="center">Centrado</option>
          <option value="left">Izquierda</option>
          <option value="bottom">Abajo</option>
        </select>
      </div>
    );
  }
  if (type === "carousel") {
    const c = config as unknown as CarouselConfig;
    return (
      <div className="flex flex-wrap gap-4 text-xs font-body">
        <label className="flex items-center gap-1.5 cursor-pointer">
          <input type="checkbox" checked={c.autoplay ?? true} onChange={(e) => onChange({ ...c, autoplay: e.target.checked })} />
          Autoplay
        </label>
        <select value={c.effect ?? "slide"} onChange={(e) => onChange({ ...c, effect: e.target.value })}
          className="border border-brand-light-border rounded px-2 py-1">
          <option value="slide">Deslizar</option>
          <option value="fade">Fade</option>
        </select>
        <label className="flex items-center gap-1.5">
          Intervalo
          <input type="number" min={1} max={8} value={(c.interval ?? 3000) / 1000}
            onChange={(e) => onChange({ ...c, interval: Number(e.target.value) * 1000 })}
            className="w-12 border border-brand-light-border rounded px-1 py-1 text-center" />
          s
        </label>
      </div>
    );
  }
  if (type === "text_image") {
    const c = config as unknown as TextImageConfig;
    return (
      <div className="text-xs font-body">
        <label>Posición imagen: </label>
        <select value={c.imagePosition ?? "right"} onChange={(e) => onChange({ ...c, imagePosition: e.target.value })}
          className="border border-brand-light-border rounded px-2 py-1 ml-1">
          <option value="right">Derecha</option>
          <option value="left">Izquierda</option>
        </select>
      </div>
    );
  }
  if (type === "gallery") {
    const c = config as unknown as GalleryConfig;
    return (
      <div className="text-xs font-body">
        <label>Columnas: </label>
        <select value={c.columns ?? 3} onChange={(e) => onChange({ ...c, columns: Number(e.target.value) })}
          className="border border-brand-light-border rounded px-2 py-1 ml-1">
          <option value={2}>2</option>
          <option value={3}>3</option>
        </select>
      </div>
    );
  }
  if (type === "video") {
    const c = config as unknown as VideoConfig;
    return (
      <label className="flex items-center gap-1.5 text-xs font-body cursor-pointer">
        <input type="checkbox" checked={c.autoplay ?? false} onChange={(e) => onChange({ ...c, autoplay: e.target.checked })} />
        Autoplay (silenciado)
      </label>
    );
  }
  return null;
}

function DropZone({ id, label }: { id: string; label?: string }) {
  const { isOver, setNodeRef } = useDroppable({ id });
  return (
    <div
      ref={setNodeRef}
      className="h-10 rounded-[3px] border-2 border-dashed flex items-center justify-center transition-all"
      style={{
        borderColor: isOver ? "#E8721C" : "rgba(14,77,122,0.2)",
        background: isOver ? "rgba(232,114,28,0.06)" : "transparent",
      }}
    >
      {label && <span className="font-body text-[11px] text-brand-muted">{label}</span>}
    </div>
  );
}

function SortableRow({
  row, rowIdx, blocks, activeColKey, onDeleteRow, onChangeBlockType,
  onBlockContentChange, onConfigChange, onColClick,
}: {
  row: Row; rowIdx: number; blocks: PostBlocks; activeColKey: string | null;
  onDeleteRow: () => void;
  onChangeBlockType: (colId: string, type: BlockType) => void;
  onBlockContentChange: (rowId: string, colId: string, content: BlockContent) => void;
  onConfigChange: (colId: string, config: Record<string, unknown>) => void;
  onColClick: (key: string) => void;
}) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: row.id });
  const style = { transform: CSS.Transform.toString(transform), transition, opacity: isDragging ? 0.4 : 1 };

  return (
    <div ref={setNodeRef} style={style}>
      <div className="border border-brand-light-border rounded-[4px] bg-white overflow-hidden">
        <div className="flex items-center justify-between px-3 py-2 border-b border-brand-light-border" style={{ background: "#f0f6fb" }}>
          <div className="flex items-center gap-2">
            <button type="button" {...attributes} {...listeners}
              className="cursor-grab text-brand-muted hover:text-brand-ink text-base leading-none px-1" title="Arrastrar para ordenar">
              ⠿
            </button>
            <span className="font-condensed font-bold text-[11px] text-brand-mid uppercase tracking-wide">
              Fila {rowIdx + 1}
            </span>
            <span className="font-body text-[11px] text-brand-muted">
              · {row.columns.map((c) => `${BLOCK_META[c.block.type].icon} ${BLOCK_META[c.block.type].label}`).join("  |  ")}
            </span>
          </div>
          <button type="button" onClick={onDeleteRow}
            className="font-body text-[11px] text-red-400 hover:text-red-600 transition-colors">
            Eliminar
          </button>
        </div>

        <div className="grid grid-cols-12 gap-3 p-3">
          {row.columns.map((col) => {
            const meta = BLOCK_META[col.block.type];
            const content = (blocks[row.id]?.[col.id] ?? {}) as BlockContent;
            const config = col.block.config as Record<string, unknown>;
            const colKey = `${row.id}-${col.id}`;
            const isActive = activeColKey === colKey;
            const spanClass: Record<number, string> = {
              4: "col-span-12 md:col-span-4",
              6: "col-span-12 md:col-span-6",
              8: "col-span-12 md:col-span-8",
              12: "col-span-12",
            };

            return (
              <div key={col.id} className={`${spanClass[col.span] ?? "col-span-12"} flex flex-col gap-2`}>
                <button
                  type="button"
                  onClick={() => onColClick(isActive ? "" : colKey)}
                  className="flex items-center gap-2 px-3 py-2 rounded-[3px] border-2 transition-all text-left w-full"
                  style={{
                    borderColor: isActive ? "#E8721C" : "#d0e8f7",
                    background: isActive ? "rgba(232,114,28,0.05)" : "#f7fafd",
                  }}
                >
                  <span className="text-lg">{meta.icon}</span>
                  <div className="flex-1 min-w-0">
                    <p className="font-condensed font-bold text-[13px] text-brand-ink">{meta.label}</p>
                    <p className="font-body text-[10px] text-brand-muted">
                      {isActive ? "Hacé clic para cerrar" : "Hacé clic para cargar contenido"}
                    </p>
                  </div>
                  <span className="font-condensed font-bold text-[11px] text-brand-mid">{isActive ? "▲" : "▼"}</span>
                </button>

                <select
                  value={col.block.type}
                  onChange={(e) => onChangeBlockType(col.id, e.target.value as BlockType)}
                  className="border border-brand-light-border rounded-[3px] px-2 py-1.5 font-body text-xs focus:outline-none focus:border-brand-blue bg-white"
                >
                  {(Object.keys(BLOCK_META) as BlockType[]).map((t) => (
                    <option key={t} value={t}>{BLOCK_META[t].icon} {BLOCK_META[t].label}</option>
                  ))}
                </select>

                {isActive && (
                  <div className="flex flex-col gap-3 p-3 rounded-[3px] border border-brand-light-border" style={{ background: "#fafcfe" }}>
                    <ConfigPanel type={col.block.type} config={config} onChange={(c) => onConfigChange(col.id, c)} />
                    <FillDispatcher
                      type={col.block.type}
                      content={content}
                      onChange={(c) => onBlockContentChange(row.id, col.id, c)}
                    />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default function BlockBuilder({ structure, blocks, onStructureChange, onBlocksChange, postMeta }: Props) {
  const [activeColKey, setActiveColKey] = useState<string | null>(null);
  const [draggedBlockType, setDraggedBlockType] = useState<BlockType | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  const addRowWithBlock = (blockType: BlockType, atIndex?: number) => {
    const rowId = `r${uid()}`;
    const newRow: Row = {
      id: rowId,
      columns: [{ id: `c${uid()}`, span: 12, block: { type: blockType, config: BLOCK_META[blockType].defaultConfig } }],
    };
    const rows = [...structure.rows];
    if (atIndex !== undefined) rows.splice(atIndex, 0, newRow);
    else rows.push(newRow);
    onStructureChange({ rows });
  };

  const deleteRow = (rowId: string) => {
    onStructureChange({ rows: structure.rows.filter((r) => r.id !== rowId) });
    const next = { ...blocks };
    delete next[rowId];
    onBlocksChange(next);
  };

  const changeBlockType = (rowId: string, colId: string, type: BlockType) => {
    const rows = structure.rows.map((r) =>
      r.id !== rowId ? r : {
        ...r,
        columns: r.columns.map((c) =>
          c.id !== colId ? c : { ...c, block: { type, config: BLOCK_META[type].defaultConfig } }
        ),
      }
    );
    onStructureChange({ rows });
    const next = { ...blocks, [rowId]: { ...(blocks[rowId] ?? {}), [colId]: {} as BlockContent } };
    onBlocksChange(next);
  };

  const updateBlockContent = (rowId: string, colId: string, content: BlockContent) => {
    onBlocksChange({ ...blocks, [rowId]: { ...(blocks[rowId] ?? {}), [colId]: content } });
  };

  const updateConfig = (rowId: string, colId: string, config: Record<string, unknown>) => {
    const rows = structure.rows.map((r) =>
      r.id !== rowId ? r : {
        ...r,
        columns: r.columns.map((c) =>
          c.id !== colId ? c : { ...c, block: { ...c.block, config } }
        ),
      }
    );
    onStructureChange({ rows });
  };

  const saveAsTemplate = async () => {
    const name = window.prompt("Nombre de la plantilla:");
    if (!name?.trim()) return;
    await fetch("/api/templates", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: name.trim(), structure }),
    });
    alert(`Plantilla "${name.trim()}" guardada.`);
  };

  const handleDragStart = (event: DragStartEvent) => {
    const data = event.active.data.current;
    if (data?.source === "palette") setDraggedBlockType(data.blockType as BlockType);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    setDraggedBlockType(null);
    const { active, over } = event;
    if (!over) return;

    const activeData = active.data.current;

    if (activeData?.source === "palette") {
      const blockType = activeData.blockType as BlockType;
      const overId = over.id as string;
      if (overId === "canvas-bottom") {
        addRowWithBlock(blockType);
      } else if (overId.startsWith("drop-before-")) {
        const rowId = overId.replace("drop-before-", "");
        const idx = structure.rows.findIndex((r) => r.id === rowId);
        addRowWithBlock(blockType, idx);
      }
      return;
    }

    if (active.id !== over.id) {
      const oldIdx = structure.rows.findIndex((r) => r.id === active.id);
      const newIdx = structure.rows.findIndex((r) => r.id === over.id);
      if (oldIdx !== -1 && newIdx !== -1) {
        onStructureChange({ rows: arrayMove(structure.rows, oldIdx, newIdx) });
      }
    }
  };

  const previewScale = 0.52;

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      {/* 3-panel layout: palette | canvas | live preview */}
      <div className="flex h-full overflow-hidden">

        {/* LEFT — block palette (always visible) */}
        <BlockPalette />

        {/* CENTER — canvas */}
        <div className="flex-1 flex flex-col overflow-hidden" style={{ background: "#fff", minWidth: 0 }}>
          {/* Canvas toolbar */}
          <div className="shrink-0 flex items-center justify-between px-4 py-2 border-b border-brand-light-border" style={{ background: "#f0f6fb" }}>
            <p className="font-condensed font-bold text-[11px] tracking-[0.1em] uppercase text-brand-mid">
              Lienzo
            </p>
            {structure.rows.length > 0 && (
              <button type="button" onClick={saveAsTemplate}
                className="font-condensed font-bold text-[11px] tracking-[0.08em] uppercase px-3 py-1.5 rounded-[3px] border border-brand-light-border text-brand-mid hover:border-brand-blue hover:text-brand-blue transition-colors">
                Guardar como plantilla
              </button>
            )}
          </div>

          {/* Scrollable rows */}
          <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-2">
            {structure.rows.length === 0 ? (
              <DropZone id="canvas-bottom" label="Arrastrá un bloque desde la paleta para empezar" />
            ) : (
              <>
                <SortableContext items={structure.rows.map((r) => r.id)} strategy={verticalListSortingStrategy}>
                  {structure.rows.map((row, idx) => (
                    <div key={row.id} className="flex flex-col gap-2">
                      <DropZone id={`drop-before-${row.id}`} />
                      <SortableRow
                        row={row}
                        rowIdx={idx}
                        blocks={blocks}
                        activeColKey={activeColKey}
                        onDeleteRow={() => deleteRow(row.id)}
                        onChangeBlockType={(colId, type) => changeBlockType(row.id, colId, type)}
                        onBlockContentChange={updateBlockContent}
                        onConfigChange={(colId, config) => updateConfig(row.id, colId, config)}
                        onColClick={(key) => setActiveColKey(key === activeColKey ? null : key)}
                      />
                    </div>
                  ))}
                </SortableContext>
                <DropZone id="canvas-bottom" label="Arrastrá otro bloque aquí" />
              </>
            )}
          </div>
        </div>

        {/* RIGHT — live preview (always visible) */}
        <div
          className="shrink-0 flex flex-col border-l border-brand-light-border overflow-hidden"
          style={{ width: "38%", background: "#e8f2f9" }}
        >
          {/* Preview header */}
          <div className="shrink-0 px-4 py-2 border-b border-brand-light-border" style={{ background: "#f0f6fb" }}>
            <p className="font-condensed font-bold text-[11px] tracking-[0.12em] uppercase text-brand-mid">
              Vista previa — como se verá publicado
            </p>
          </div>

          {/* Scaled blog preview */}
          <div className="flex-1 overflow-y-auto">
            {structure.rows.length === 0 ? (
              <div className="flex items-center justify-center py-24 text-center px-8">
                <p className="font-body text-sm text-brand-muted">
                  Arrastrá bloques al lienzo para ver la vista previa aquí.
                </p>
              </div>
            ) : (
              <div
                style={{
                  transformOrigin: "top left",
                  transform: `scale(${previewScale})`,
                  width: `${100 / previewScale}%`,
                  background: "#fff",
                }}
              >
                {/* Nav placeholder */}
                <div style={{ height: 68, borderBottom: "1px solid #e5e7eb", display: "flex", alignItems: "center", padding: "0 5%", background: "#fff" }}>
                  <span style={{ fontWeight: 900, color: "#0e4d7a", fontSize: 18, letterSpacing: "0.02em" }}>IRON</span>
                  <span style={{ fontWeight: 900, color: "#E8721C", fontSize: 18 }}>TOWER</span>
                  <span style={{ fontWeight: 400, color: "#6c8fa5", fontSize: 11, marginLeft: 8, letterSpacing: "0.1em", textTransform: "uppercase" }}>
                    Vertical Rope Work
                  </span>
                </div>
                {/* Blog content */}
                <div style={{ background: "#fff", minHeight: 400 }}>
                  <BlockRenderer
                    structure={structure}
                    blocks={blocks}
                    postMeta={{
                      title: postMeta?.title,
                      tags: postMeta?.tags,
                      date: new Date().toLocaleDateString("es-AR", { year: "numeric", month: "long", day: "numeric" }),
                      readTime: 3,
                    }}
                  />
                </div>
                {/* CTA footer */}
                <div style={{ background: "#f0f6fb", padding: "48px 5%", textAlign: "center", borderTop: "1px solid #d0e8f7" }}>
                  <p style={{ fontWeight: 900, color: "#0e4d7a", fontSize: 26, marginBottom: 16 }}>
                    ¿Necesitás trabajos en altura certificados?
                  </p>
                  <div style={{ display: "inline-block", background: "#E8721C", color: "#fff", padding: "10px 28px", borderRadius: 3, fontWeight: 700, fontSize: 13 }}>
                    Pedir presupuesto
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* DragOverlay */}
      <DragOverlay>
        {draggedBlockType && (
          <div className="flex items-center gap-3 p-3 rounded-[4px] border-2 shadow-lg bg-white" style={{ borderColor: "#E8721C", width: 220 }}>
            <span className="text-2xl">{BLOCK_META[draggedBlockType].icon}</span>
            <div>
              <p className="font-condensed font-bold text-[13px] text-brand-ink">{BLOCK_META[draggedBlockType].label}</p>
              <p className="font-body text-[10px] text-brand-muted">Soltá para agregar</p>
            </div>
          </div>
        )}
      </DragOverlay>
    </DndContext>
  );
}
