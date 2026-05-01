"use client";
import { useState } from "react";
import {
  DndContext, closestCenter, KeyboardSensor, PointerSensor,
  useSensor, useSensors, DragEndEvent,
} from "@dnd-kit/core";
import {
  SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy,
  useSortable, arrayMove,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

import type {
  TemplateStructure, PostBlocks, BlockType, BlockContent, Column, Row,
  HeroConfig, CarouselConfig, TextImageConfig, GalleryConfig, VideoConfig,
} from "@/types/blocks";
import { BLOCK_META } from "@/types/blocks";
import RowLayoutPicker from "./RowLayoutPicker";

// Fill components
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
}

function uid() {
  return Math.random().toString(36).slice(2, 9);
}

function FillDispatcher({ type, content, onChange }: { type: BlockType; content: BlockContent; onChange: (c: BlockContent) => void }) {
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

function ConfigPanel({ type, config, onChange }: { type: BlockType; config: Record<string, unknown>; onChange: (c: Record<string, unknown>) => void }) {
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
          <input type="number" min={1} max={8} value={(c.interval ?? 3000) / 1000} onChange={(e) => onChange({ ...c, interval: Number(e.target.value) * 1000 })}
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

function SortableRow({ row, rowIdx, blocks, onDeleteRow, onChangeBlockType, onBlockContentChange, onConfigChange }:
  {
    row: Row; rowIdx: number; blocks: PostBlocks;
    onDeleteRow: () => void;
    onChangeBlockType: (colId: string, type: BlockType) => void;
    onBlockContentChange: (rowId: string, colId: string, content: BlockContent) => void;
    onConfigChange: (colId: string, config: Record<string, unknown>) => void;
  }
) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: row.id });
  const style = { transform: CSS.Transform.toString(transform), transition, opacity: isDragging ? 0.5 : 1 };

  return (
    <div ref={setNodeRef} style={style} className="border border-brand-light-border rounded-[4px] bg-white overflow-hidden">
      {/* Row header */}
      <div className="flex items-center justify-between px-4 py-2 border-b border-brand-light-border" style={{ background: "#f7fafd" }}>
        <div className="flex items-center gap-2">
          <button type="button" {...attributes} {...listeners} className="cursor-grab text-brand-muted hover:text-brand-ink text-lg leading-none px-1" title="Arrastrar para ordenar">
            ⠿
          </button>
          <span className="font-condensed font-bold text-xs text-brand-mid uppercase tracking-wide">Fila {rowIdx + 1}</span>
          <span className="font-body text-xs text-brand-muted">({row.columns.length} {row.columns.length === 1 ? "columna" : "columnas"})</span>
        </div>
        <button type="button" onClick={onDeleteRow} className="font-body text-xs text-red-400 hover:text-red-600 transition-colors">Eliminar fila</button>
      </div>

      {/* Columns */}
      <div className={`grid grid-cols-12 gap-4 p-4`}>
        {row.columns.map((col) => {
          const meta = BLOCK_META[col.block.type];
          const content = (blocks[row.id]?.[col.id] ?? {}) as BlockContent;
          const config = col.block.config as Record<string, unknown>;
          const spanClass: Record<number, string> = { 4: "col-span-12 md:col-span-4", 6: "col-span-12 md:col-span-6", 8: "col-span-12 md:col-span-8", 12: "col-span-12" };

          return (
            <div key={col.id} className={`${spanClass[col.span] ?? "col-span-12"} flex flex-col gap-3`}>
              {/* Block type selector */}
              <div className="flex items-center gap-2">
                <span className="text-lg">{meta.icon}</span>
                <select
                  value={col.block.type}
                  onChange={(e) => onChangeBlockType(col.id, e.target.value as BlockType)}
                  className="flex-1 border border-brand-light-border rounded-[3px] px-2 py-1.5 font-body text-sm focus:outline-none focus:border-brand-blue bg-white"
                >
                  {(Object.keys(BLOCK_META) as BlockType[]).map((t) => (
                    <option key={t} value={t}>{BLOCK_META[t].icon} {BLOCK_META[t].label}</option>
                  ))}
                </select>
              </div>

              {/* Config */}
              <ConfigPanel type={col.block.type} config={config} onChange={(c) => onConfigChange(col.id, c)} />

              {/* Fill */}
              <div className="border border-brand-light-border rounded-[3px] p-3" style={{ background: "#fafcfe" }}>
                <FillDispatcher
                  type={col.block.type}
                  content={content}
                  onChange={(c) => onBlockContentChange(row.id, col.id, c)}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default function BlockBuilder({ structure, blocks, onStructureChange, onBlocksChange }: Props) {
  const [showLayoutPicker, setShowLayoutPicker] = useState(false);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  const addRow = (colSpans: Pick<Column, "span">[]) => {
    const rowId = `r${uid()}`;
    const newRow: Row = {
      id: rowId,
      columns: colSpans.map((c) => ({
        id: `c${uid()}`,
        span: c.span,
        block: { type: "text", config: BLOCK_META["text"].defaultConfig },
      })),
    };
    onStructureChange({ rows: [...structure.rows, newRow] });
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
    // Clear content when changing type
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

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      const oldIdx = structure.rows.findIndex((r) => r.id === active.id);
      const newIdx = structure.rows.findIndex((r) => r.id === over.id);
      onStructureChange({ rows: arrayMove(structure.rows, oldIdx, newIdx) });
    }
  };

  return (
    <div className="flex flex-col gap-4">
      {structure.rows.length === 0 && (
        <div className="flex flex-col items-center justify-center py-16 rounded-[4px] border-2 border-dashed border-brand-light-border text-center">
          <p className="font-condensed font-bold text-brand-ink text-lg mb-1">Aún no hay bloques</p>
          <p className="font-body text-sm text-brand-muted mb-4">Agregá una fila para comenzar a construir el artículo.</p>
        </div>
      )}

      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={structure.rows.map((r) => r.id)} strategy={verticalListSortingStrategy}>
          {structure.rows.map((row, rowIdx) => (
            <SortableRow
              key={row.id}
              row={row}
              rowIdx={rowIdx}
              blocks={blocks}
              onDeleteRow={() => deleteRow(row.id)}
              onChangeBlockType={(colId, type) => changeBlockType(row.id, colId, type)}
              onBlockContentChange={updateBlockContent}
              onConfigChange={(colId, config) => updateConfig(row.id, colId, config)}
            />
          ))}
        </SortableContext>
      </DndContext>

      <button
        type="button"
        onClick={() => setShowLayoutPicker(true)}
        className="font-condensed font-bold text-[13px] tracking-[0.08em] uppercase py-3 rounded-[3px] border-2 transition-colors hover:opacity-80"
        style={{ borderColor: "#0e4d7a", color: "#0e4d7a" }}
      >
        + Agregar fila
      </button>

      {showLayoutPicker && (
        <RowLayoutPicker onSelect={addRow} onClose={() => setShowLayoutPicker(false)} />
      )}
    </div>
  );
}
