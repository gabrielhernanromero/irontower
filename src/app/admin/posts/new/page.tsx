"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import Image from "next/image";
import TagSelector from "@/components/blog/TagSelector";
import type { TemplateStructure, PostBlocks } from "@/types/blocks";
import type { PostTemplate } from "@/lib/supabase";

const RichTextEditor = dynamic(() => import("@/components/blog/RichTextEditor"), { ssr: false });
const BlockBuilder = dynamic(() => import("@/components/blog/builder/BlockBuilder"), { ssr: false });

const AI_PROMPT = `Sos redactor de contenido para Iron Tower, empresa argentina especializada en trabajos en altura con certificación IRATA. Escribí un artículo de blog en español rioplatense sobre [TEMA DEL ARTÍCULO].

DATOS DE LA EMPRESA:
- Nombre: Iron Tower — Vertical Rope Work
- Servicios: montaje de torres de telecomunicaciones, limpieza de fachadas y cristales, líneas de vida y anclaje, prevención de incendios (carga de fuego), rescate en altura, capacitación IRATA
- Cobertura: toda la Argentina
- Técnicos certificados IRATA nivel 1, 2 y 3
- Tono: profesional, directo, confiable. Sin frases vacías.

ESTRUCTURA DEL ARTÍCULO:
1. Introducción (1 párrafo que enganche al lector)
2. Desarrollo con subtítulos H2 y H3
3. Lista de puntos clave (ul/li)
4. Cierre con llamada a la acción mencionando a Iron Tower

FORMATO DE RESPUESTA (respetá exactamente este formato):
TÍTULO: [máx 70 caracteres, con keyword principal]
RESUMEN: [1-2 oraciones, máx 155 caracteres, para Google]
TAGS: [elegí 1 a 3 de esta lista: Trabajos en altura, Telecomunicaciones, Fachadas, Incendios, Capacitación, Rescate, IRATA, Seguridad, Proyectos realizados]
CONTENIDO HTML:
[el artículo completo en HTML usando solo estas etiquetas: <h2>, <h3>, <p>, <ul>, <li>, <ol>, <strong>, <em>, <blockquote>. Sin clases CSS. Sin estilos inline. 600 a 1000 palabras.]`;

function slugify(text: string) {
  return text.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/[^a-z0-9\s-]/g, "").trim().replace(/\s+/g, "-");
}

export default function NewPostPage() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [coverImage, setCoverImage] = useState<string>("");
  const [coverPreview, setCoverPreview] = useState<string>("");
  const [saving, setSaving] = useState(false);
  const [publishing, setPublishing] = useState(false);
  const [guideOpen, setGuideOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const coverRef = useRef<HTMLInputElement>(null);

  // Block builder state
  const [mode, setMode] = useState<"text" | "blocks">("text");
  const [templates, setTemplates] = useState<PostTemplate[]>([]);
  const [templateId, setTemplateId] = useState<string>("");
  const [structure, setStructure] = useState<TemplateStructure>({ rows: [] });
  const [blocks, setBlocks] = useState<PostBlocks>({});

  useEffect(() => {
    fetch("/api/templates").then((r) => r.json()).then((list) => {
      if (Array.isArray(list)) setTemplates(list);
    }).catch(() => {});
  }, []);

  const applyTemplate = (id: string) => {
    setTemplateId(id);
    const tpl = templates.find((t) => t.id === id);
    if (tpl) { setStructure(tpl.structure); setBlocks({}); }
  };

  const handleTitleChange = (v: string) => {
    setTitle(v);
    if (!slug || slug === slugify(title)) setSlug(slugify(v));
  };

  const uploadCover = async (file: File) => {
    const form = new FormData();
    form.append("file", file);
    const res = await fetch("/api/upload", { method: "POST", body: form });
    if (!res.ok) return;
    const { url } = await res.json();
    setCoverImage(url); setCoverPreview(url);
  };

  const copyPrompt = () => { navigator.clipboard.writeText(AI_PROMPT); setCopied(true); setTimeout(() => setCopied(false), 2000); };

  const save = async (published: boolean) => {
    if (!title.trim()) { alert("El título es obligatorio."); return; }
    published ? setPublishing(true) : setSaving(true);

    const body: Record<string, unknown> = { title, slug, excerpt, tags, cover_image: coverImage, published };
    if (mode === "blocks") {
      body.template_id = templateId || null;
      body.blocks = blocks;
    } else {
      body.content = content;
    }

    const res = await fetch("/api/posts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    setSaving(false); setPublishing(false);
    if (res.ok) { router.push("/admin/posts"); }
    else { const err = await res.json(); alert(err.error ?? "Error al guardar."); }
  };

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-condensed font-black text-3xl text-brand-ink">Nuevo artículo</h1>
          <p className="font-body text-brand-muted text-sm mt-1">Completá los campos y publicá cuando estés listo.</p>
        </div>
        <a href="/admin/posts" className="font-body text-sm text-brand-mid hover:text-brand-ink transition-colors">← Volver</a>
      </div>

      {/* Mode toggle */}
      <div className="mb-6 flex items-center gap-2">
        <span className="font-body text-sm text-brand-mid">Tipo de artículo:</span>
        <button type="button" onClick={() => setMode("text")}
          className={`font-condensed font-bold text-[12px] tracking-wide uppercase px-4 py-2 rounded-[3px] border-2 transition-colors ${mode === "text" ? "text-white border-transparent" : "border-brand-light-border text-brand-mid"}`}
          style={mode === "text" ? { background: "#0e4d7a" } : {}}>
          ✍️ Texto libre
        </button>
        <button type="button" onClick={() => setMode("blocks")}
          className={`font-condensed font-bold text-[12px] tracking-wide uppercase px-4 py-2 rounded-[3px] border-2 transition-colors ${mode === "blocks" ? "text-white border-transparent" : "border-brand-light-border text-brand-mid"}`}
          style={mode === "blocks" ? { background: "#0e4d7a" } : {}}>
          🧱 Con bloques
        </button>
      </div>

      {/* Template selector (block mode) */}
      {mode === "blocks" && (
        <div className="mb-6 bg-white rounded-[4px] p-5 border border-brand-light-border">
          <label className="font-body text-sm font-medium text-brand-ink block mb-2">Plantilla (opcional)</label>
          <p className="font-body text-xs text-brand-muted mb-3">
            Seleccioná una plantilla pre-diseñada para pre-cargar la estructura de filas, o empezá desde cero.{" "}
            <a href="/admin/templates" className="text-brand-blue hover:underline">Gestionar plantillas →</a>
          </p>
          <select value={templateId} onChange={(e) => applyTemplate(e.target.value)}
            className="border border-brand-light-border rounded-[3px] px-3 py-2 font-body text-sm w-full max-w-xs focus:outline-none focus:border-brand-blue bg-white">
            <option value="">Sin plantilla (desde cero)</option>
            {templates.map((t) => <option key={t.id} value={t.id}>{t.name}</option>)}
          </select>
        </div>
      )}

      {/* Guía de IA (text mode only) */}
      {mode === "text" && (
        <div className="mb-8 rounded-[4px] border-2 overflow-hidden" style={{ borderColor: "#0e4d7a" }}>
          <button type="button" onClick={() => setGuideOpen((v) => !v)}
            className="w-full flex items-center justify-between px-6 py-4 text-left transition-colors hover:opacity-90"
            style={{ background: "#0e4d7a" }}>
            <div className="flex items-center gap-3">
              <span className="text-white font-condensed font-bold text-base tracking-wide">Guía para crear artículos con IA</span>
              <span className="font-body text-xs text-white/60">ChatGPT · Claude · Gemini</span>
            </div>
            <span className="text-white text-lg">{guideOpen ? "▲" : "▼"}</span>
          </button>
          {guideOpen && (
            <div className="bg-white px-6 py-6">
              <div className="relative">
                <pre className="font-mono text-xs text-brand-mid leading-relaxed p-4 rounded-[3px] overflow-x-auto whitespace-pre-wrap" style={{ background: "#f0f6fb", border: "1px solid #d0e8f7" }}>{AI_PROMPT}</pre>
                <button type="button" onClick={copyPrompt}
                  className="absolute top-3 right-3 font-condensed font-bold text-[11px] tracking-[0.08em] uppercase px-3 py-1.5 rounded-[3px] transition-colors"
                  style={{ background: copied ? "#22c55e" : "#0e4d7a", color: "#fff" }}>
                  {copied ? "Copiado!" : "Copiar prompt"}
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Formulario */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main */}
        <div className="lg:col-span-2 flex flex-col gap-6">

          {/* Título */}
          <div className="bg-white rounded-[4px] p-6 border border-brand-light-border">
            <label className="font-body text-sm font-medium text-brand-ink block mb-1">Título <span className="text-red-500">*</span></label>
            <input type="text" value={title} onChange={(e) => handleTitleChange(e.target.value)}
              placeholder="Ej: Montaje de antenas en edificios residenciales"
              className="w-full border border-brand-light-border rounded-[3px] px-4 py-3 font-body text-brand-ink text-lg focus:outline-none focus:border-brand-blue-dark transition-colors" />
            <div className="flex items-center gap-2 mt-3">
              <span className="font-body text-xs text-brand-muted shrink-0">URL del artículo: /blog/</span>
              <input type="text" value={slug} onChange={(e) => setSlug(slugify(e.target.value))}
                className="flex-1 border border-brand-light-border rounded-[3px] px-3 py-1.5 font-body text-xs text-brand-mid focus:outline-none focus:border-brand-blue-dark transition-colors" />
            </div>
          </div>

          {/* Excerpt */}
          <div className="bg-white rounded-[4px] p-6 border border-brand-light-border">
            <label className="font-body text-sm font-medium text-brand-ink block mb-1">Resumen</label>
            <textarea value={excerpt} onChange={(e) => setExcerpt(e.target.value)}
              placeholder="1-2 oraciones para Google y el listado del blog."
              rows={3} className="w-full border border-brand-light-border rounded-[3px] px-4 py-3 font-body text-sm text-brand-ink resize-none focus:outline-none focus:border-brand-blue-dark transition-colors" />
            <div className="flex justify-end mt-1">
              <p className={`font-body text-xs font-medium ${excerpt.length > 155 ? "text-red-500" : "text-brand-muted"}`}>{excerpt.length}/155</p>
            </div>
          </div>

          {/* Content */}
          <div className="bg-white rounded-[4px] p-6 border border-brand-light-border">
            <label className="font-body text-sm font-medium text-brand-ink block mb-3">
              {mode === "blocks" ? "Constructor de bloques" : "Contenido del artículo"}
            </label>
            {mode === "blocks" ? (
              <BlockBuilder structure={structure} blocks={blocks} onStructureChange={setStructure} onBlocksChange={setBlocks} />
            ) : (
              <RichTextEditor content={content} onChange={setContent} />
            )}
          </div>
        </div>

        {/* Sidebar */}
        <div className="flex flex-col gap-6">
          {/* Acciones */}
          <div className="bg-white rounded-[4px] p-6 border border-brand-light-border">
            <h3 className="font-condensed font-bold text-brand-ink mb-1">Publicación</h3>
            <p className="font-body text-xs text-brand-muted mb-4">Podés guardar como borrador y publicar después.</p>
            <div className="flex flex-col gap-3">
              <button onClick={() => save(false)} disabled={saving}
                className="w-full font-condensed font-bold text-[13px] tracking-[0.08em] uppercase py-3 rounded-[3px] border-2 transition-colors disabled:opacity-60"
                style={{ borderColor: "#0e4d7a", color: "#0e4d7a" }}>
                {saving ? "Guardando..." : "Guardar borrador"}
              </button>
              <button onClick={() => save(true)} disabled={publishing}
                className="w-full font-condensed font-bold text-[13px] tracking-[0.08em] uppercase text-white py-3 rounded-[3px] transition-opacity disabled:opacity-60 hover:opacity-90"
                style={{ background: "#E8721C" }}>
                {publishing ? "Publicando..." : "Publicar ahora"}
              </button>
            </div>
          </div>

          {/* Imagen de portada */}
          <div className="bg-white rounded-[4px] p-6 border border-brand-light-border">
            <h3 className="font-condensed font-bold text-brand-ink mb-1">Imagen de portada</h3>
            <p className="font-body text-xs text-brand-muted mb-4">Aparece en el listado del blog. Tamaño ideal: 1200×630 px.</p>
            {coverPreview ? (
              <div className="relative h-40 rounded-[3px] overflow-hidden mb-3">
                <Image src={coverPreview} alt="Portada" fill className="object-cover" />
              </div>
            ) : (
              <div className="h-40 rounded-[3px] flex flex-col items-center justify-center mb-3 cursor-pointer hover:opacity-80 transition-opacity"
                style={{ background: "#f0f6fb", border: "2px dashed #d0e8f7" }}
                onClick={() => coverRef.current?.click()}>
                <p className="font-body text-sm text-brand-muted">Clic para subir imagen</p>
              </div>
            )}
            <input ref={coverRef} type="file" accept="image/*" className="hidden"
              onChange={(e) => { const f = e.target.files?.[0]; if (f) uploadCover(f); e.target.value = ""; }} />
            <button onClick={() => coverRef.current?.click()} className="w-full font-body text-sm text-brand-mid border border-brand-light-border rounded-[3px] py-2 hover:bg-brand-light-bg transition-colors">
              {coverPreview ? "Cambiar imagen" : "Subir imagen"}
            </button>
          </div>

          {/* Tags */}
          <div className="bg-white rounded-[4px] p-6 border border-brand-light-border">
            <h3 className="font-condensed font-bold text-brand-ink mb-1">Etiquetas</h3>
            <p className="font-body text-xs text-brand-muted mb-4">Seleccioná las que aplicán al artículo.</p>
            <TagSelector tags={tags} onChange={setTags} />
          </div>
        </div>
      </div>
    </div>
  );
}
