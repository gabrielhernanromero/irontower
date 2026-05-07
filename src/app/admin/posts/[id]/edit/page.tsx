"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import dynamic from "next/dynamic";
import Image from "next/image";
import TagSelector from "@/components/blog/TagSelector";
import type { TemplateStructure, PostBlocks, SavedBlocksPayload } from "@/types/blocks";
import type { PostTemplate } from "@/lib/supabase";

const RichTextEditor = dynamic(() => import("@/components/blog/RichTextEditor"), { ssr: false });
const BlockBuilder = dynamic(() => import("@/components/blog/builder/BlockBuilder"), { ssr: false });

function slugify(text: string) {
  return text.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/[^a-z0-9\s-]/g, "").trim().replace(/\s+/g, "-");
}

export default function EditPostPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;

  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [coverImage, setCoverImage] = useState("");
  const [coverPreview, setCoverPreview] = useState("");
  const [published, setPublished] = useState(false);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const coverRef = useRef<HTMLInputElement>(null);

  const [mode, setMode] = useState<"text" | "blocks">("text");
  const [templates, setTemplates] = useState<PostTemplate[]>([]);
  const [templateId, setTemplateId] = useState<string>("");
  const [structure, setStructure] = useState<TemplateStructure>({ rows: [] });
  const [blocks, setBlocks] = useState<PostBlocks>({});

  // Lock body scroll when block editor is open
  useEffect(() => {
    if (mode === "blocks" && loaded) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [mode, loaded]);

  useEffect(() => {
    Promise.all([
      fetch(`/api/posts/${id}`).then((r) => r.json()),
      fetch("/api/templates").then((r) => r.json()),
    ]).then(([post, list]) => {
      setTitle(post.title ?? "");
      setSlug(post.slug ?? "");
      setExcerpt(post.excerpt ?? "");
      setContent(post.content ?? "");
      setTags(post.tags ?? []);
      setCoverImage(post.cover_image ?? "");
      setCoverPreview(post.cover_image ?? "");
      setPublished(post.published ?? false);
      if (Array.isArray(list)) setTemplates(list);
      if (post.blocks) {
        const { _s, ...contentBlocks } = post.blocks as SavedBlocksPayload;
        if (_s) {
          setMode("blocks");
          setStructure(_s);
          setBlocks(contentBlocks as PostBlocks);
          if (post.template_id) setTemplateId(post.template_id);
        }
      }
      setLoaded(true);
    });
  }, [id]);

  const applyTemplate = (tid: string) => {
    setTemplateId(tid);
    const tpl = templates.find((t) => t.id === tid);
    if (tpl) { setStructure(tpl.structure); setBlocks({}); }
    else { setStructure({ rows: [] }); setBlocks({}); }
  };

  const uploadCover = async (file: File) => {
    const form = new FormData();
    form.append("file", file);
    const res = await fetch("/api/upload", { method: "POST", body: form });
    if (!res.ok) return;
    const { url } = await res.json();
    setCoverImage(url); setCoverPreview(url);
  };

  const save = async (pub: boolean) => {
    if (!title.trim()) { alert("El título es obligatorio."); return; }
    setSaving(true);
    const body: Record<string, unknown> = { title, slug, excerpt, tags, cover_image: coverImage, published: pub };
    if (mode === "blocks") {
      body.template_id = templateId || null;
      body.blocks = { _s: structure, ...blocks } as SavedBlocksPayload;
      body.content = null;
    } else {
      body.content = content;
      body.template_id = null;
      body.blocks = null;
    }
    const res = await fetch(`/api/posts/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    setSaving(false);
    if (res.ok) { router.push("/admin/posts"); }
    else { const err = await res.json(); alert(err.error ?? "Error al guardar."); }
  };

  const deletePost = async () => {
    if (!confirm("¿Seguro que querés eliminar este artículo? Esta acción no se puede deshacer.")) return;
    setDeleting(true);
    await fetch(`/api/posts/${id}`, { method: "DELETE" });
    router.push("/admin/posts");
  };

  if (!loaded) {
    return <div className="flex items-center justify-center h-64"><p className="font-body text-brand-muted">Cargando...</p></div>;
  }

  // ─── BLOCK EDITOR: fullscreen overlay ────────────────────────────────────
  if (mode === "blocks") {
    return (
      <div className="fixed inset-0 z-50 flex flex-col" style={{ background: "#f0f6fb" }}>

        {/* Top bar */}
        <div className="shrink-0 flex items-center gap-3 px-4 border-b bg-white" style={{ height: 56, borderColor: "#d0e8f7" }}>
          <a href="/admin/posts"
            className="shrink-0 font-condensed font-bold text-[11px] tracking-[0.08em] uppercase text-brand-mid hover:text-brand-ink transition-colors flex items-center gap-1.5 pr-3 border-r"
            style={{ borderColor: "#d0e8f7" }}>
            ← Artículos
          </a>

          {/* Status badge */}
          <span className="shrink-0 font-condensed font-bold text-[10px] tracking-[0.1em] uppercase px-2 py-1 rounded-[3px]"
            style={{ background: published ? "rgba(34,197,94,0.12)" : "rgba(14,77,122,0.08)", color: published ? "#16a34a" : "#0e4d7a" }}>
            {published ? "Publicado" : "Borrador"}
          </span>

          {/* Title (inline editable) */}
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Título del artículo..."
            className="flex-1 font-condensed font-bold text-lg text-brand-ink bg-transparent border-none outline-none placeholder:text-brand-muted min-w-0"
          />

          {/* Mode toggle */}
          <button type="button" onClick={() => setMode("text")}
            className="shrink-0 font-condensed font-bold text-[10px] tracking-[0.08em] uppercase px-3 py-1.5 rounded-[3px] border transition-colors text-brand-mid hover:border-brand-blue hover:text-brand-blue"
            style={{ borderColor: "#d0e8f7" }}>
            Texto libre
          </button>

          {published && (
            <a href={`/blog/${slug}`} target="_blank"
              className="shrink-0 font-condensed font-bold text-[10px] tracking-[0.08em] uppercase px-3 py-1.5 rounded-[3px] border transition-colors text-brand-mid hover:text-brand-ink"
              style={{ borderColor: "#d0e8f7" }}>
              Ver →
            </a>
          )}

          <button onClick={() => save(false)} disabled={saving}
            className="shrink-0 font-condensed font-bold text-[11px] tracking-[0.08em] uppercase px-4 py-2 rounded-[3px] border-2 transition-colors disabled:opacity-60"
            style={{ borderColor: "#0e4d7a", color: "#0e4d7a" }}>
            {saving ? "Guardando..." : "Borrador"}
          </button>
          <button onClick={() => save(true)} disabled={saving}
            className="shrink-0 font-condensed font-bold text-[11px] tracking-[0.08em] uppercase px-4 py-2 rounded-[3px] text-white transition-opacity disabled:opacity-60 hover:opacity-90"
            style={{ background: "#E8721C" }}>
            {published ? "Actualizar" : "Publicar"}
          </button>
        </div>

        {/* Editor body */}
        <div className="flex flex-1 overflow-hidden">

          {/* Center: block builder */}
          <div className="flex-1 overflow-hidden flex flex-col">
            <BlockBuilder
              structure={structure}
              blocks={blocks}
              onStructureChange={setStructure}
              onBlocksChange={setBlocks}
            />
          </div>

          {/* Right: properties panel */}
          <aside className="shrink-0 overflow-y-auto border-l bg-white flex flex-col" style={{ width: 272, borderColor: "#d0e8f7" }}>
            <div className="px-4 py-3 border-b" style={{ borderColor: "#d0e8f7" }}>
              <p className="font-condensed font-black text-[10px] tracking-[0.14em] uppercase text-brand-mid">Propiedades</p>
            </div>

            <div className="flex flex-col gap-0 divide-y divide-[#e8f2f9]">

              {/* Plantilla */}
              <div className="px-4 py-4">
                <label className="font-condensed font-bold text-[10px] tracking-[0.1em] uppercase text-brand-mid block mb-2">Plantilla</label>
                <select value={templateId} onChange={(e) => applyTemplate(e.target.value)}
                  className="w-full border border-brand-light-border rounded-[3px] px-2 py-1.5 font-body text-xs focus:outline-none focus:border-brand-blue bg-white text-brand-ink">
                  <option value="">Sin plantilla (desde cero)</option>
                  {templates.map((t) => <option key={t.id} value={t.id}>{t.name}</option>)}
                </select>
                <a href="/admin/templates" target="_blank" className="font-body text-[10px] text-brand-blue hover:underline mt-1.5 inline-block">
                  Gestionar plantillas →
                </a>
              </div>

              {/* URL */}
              <div className="px-4 py-4">
                <label className="font-condensed font-bold text-[10px] tracking-[0.1em] uppercase text-brand-mid block mb-2">URL del artículo</label>
                <div className="flex items-center gap-1">
                  <span className="font-body text-[10px] text-brand-muted shrink-0">/blog/</span>
                  <input type="text" value={slug} onChange={(e) => setSlug(slugify(e.target.value))}
                    className="flex-1 border border-brand-light-border rounded-[3px] px-2 py-1.5 font-body text-xs text-brand-ink focus:outline-none focus:border-brand-blue min-w-0" />
                </div>
              </div>

              {/* Resumen */}
              <div className="px-4 py-4">
                <label className="font-condensed font-bold text-[10px] tracking-[0.1em] uppercase text-brand-mid block mb-2">Resumen SEO</label>
                <textarea value={excerpt} onChange={(e) => setExcerpt(e.target.value)}
                  placeholder="1-2 oraciones para Google."
                  rows={3} className="w-full border border-brand-light-border rounded-[3px] px-2 py-1.5 font-body text-xs text-brand-ink resize-none focus:outline-none focus:border-brand-blue" />
                <p className={`font-body text-[10px] font-medium mt-1 ${excerpt.length > 155 ? "text-red-500" : "text-brand-muted"}`}>{excerpt.length}/155</p>
              </div>

              {/* Imagen de portada */}
              <div className="px-4 py-4">
                <label className="font-condensed font-bold text-[10px] tracking-[0.1em] uppercase text-brand-mid block mb-2">Imagen de portada</label>
                {coverPreview ? (
                  <div className="relative h-32 rounded-[3px] overflow-hidden mb-2">
                    <Image src={coverPreview} alt="Portada" fill className="object-cover" />
                  </div>
                ) : (
                  <div className="h-24 rounded-[3px] flex items-center justify-center mb-2 cursor-pointer hover:opacity-80 transition-opacity"
                    style={{ background: "#f0f6fb", border: "2px dashed #d0e8f7" }}
                    onClick={() => coverRef.current?.click()}>
                    <span className="font-body text-xs text-brand-muted">Clic para subir</span>
                  </div>
                )}
                <input ref={coverRef} type="file" accept="image/*" className="hidden"
                  onChange={(e) => { const f = e.target.files?.[0]; if (f) uploadCover(f); e.target.value = ""; }} />
                <button onClick={() => coverRef.current?.click()}
                  className="w-full font-body text-xs text-brand-mid border border-brand-light-border rounded-[3px] py-1.5 hover:bg-brand-light-bg transition-colors">
                  {coverPreview ? "Cambiar imagen" : "Subir imagen"}
                </button>
                <p className="font-body text-[10px] text-brand-muted mt-1">1200×630 px recomendado</p>
              </div>

              {/* Etiquetas */}
              <div className="px-4 py-4">
                <label className="font-condensed font-bold text-[10px] tracking-[0.1em] uppercase text-brand-mid block mb-2">Etiquetas</label>
                <TagSelector tags={tags} onChange={setTags} />
              </div>

              {/* Peligro */}
              <div className="px-4 py-4">
                <button onClick={deletePost} disabled={deleting}
                  className="w-full font-body text-xs text-red-500 hover:text-red-700 transition-colors py-2 border border-red-200 rounded-[3px] hover:border-red-400">
                  {deleting ? "Eliminando..." : "Eliminar artículo"}
                </button>
              </div>

            </div>
          </aside>
        </div>
      </div>
    );
  }

  // ─── TEXT EDITOR: standard layout ────────────────────────────────────────
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-condensed font-black text-3xl text-brand-ink">Editar artículo</h1>
          <p className="font-body text-brand-muted text-sm mt-1">{published ? "✓ Publicado" : "Borrador"}</p>
        </div>
        <a href="/admin/posts" className="font-body text-sm text-brand-mid hover:text-brand-ink transition-colors">← Volver</a>
      </div>

      <div className="mb-6 flex items-center gap-2">
        <span className="font-body text-sm text-brand-mid">Tipo de artículo:</span>
        <button type="button" onClick={() => setMode("text")}
          className="font-condensed font-bold text-[12px] tracking-wide uppercase px-4 py-2 rounded-[3px] border-2 transition-colors text-white border-transparent"
          style={{ background: "#0e4d7a" }}>
          ✍️ Texto libre
        </button>
        <button type="button" onClick={() => setMode("blocks")}
          className="font-condensed font-bold text-[12px] tracking-wide uppercase px-4 py-2 rounded-[3px] border-2 transition-colors border-brand-light-border text-brand-mid"
          style={{}}>
          🧱 Con bloques
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 flex flex-col gap-6">
          <div className="bg-white rounded-[4px] p-6 border border-brand-light-border">
            <label className="font-body text-sm font-medium text-brand-ink block mb-2">Título *</label>
            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)}
              className="w-full border border-brand-light-border rounded-[3px] px-4 py-3 font-body text-brand-ink text-lg focus:outline-none focus:border-brand-blue-dark transition-colors" />
            <div className="flex items-center gap-2 mt-3">
              <span className="font-body text-xs text-brand-muted">/blog/</span>
              <input type="text" value={slug} onChange={(e) => setSlug(slugify(e.target.value))}
                className="flex-1 border border-brand-light-border rounded-[3px] px-3 py-1.5 font-body text-xs text-brand-mid focus:outline-none focus:border-brand-blue-dark transition-colors" />
            </div>
          </div>
          <div className="bg-white rounded-[4px] p-6 border border-brand-light-border">
            <label className="font-body text-sm font-medium text-brand-ink block mb-2">Resumen</label>
            <textarea value={excerpt} onChange={(e) => setExcerpt(e.target.value)} rows={3}
              className="w-full border border-brand-light-border rounded-[3px] px-4 py-3 font-body text-sm text-brand-ink resize-none focus:outline-none focus:border-brand-blue-dark transition-colors" />
          </div>
          <div className="bg-white rounded-[4px] p-6 border border-brand-light-border">
            <label className="font-body text-sm font-medium text-brand-ink block mb-3">Contenido</label>
            <RichTextEditor content={content} onChange={setContent} />
          </div>
        </div>
        <div className="flex flex-col gap-6">
          <div className="bg-white rounded-[4px] p-6 border border-brand-light-border">
            <h3 className="font-condensed font-bold text-brand-ink mb-4">Publicación</h3>
            <div className="flex flex-col gap-3">
              <button onClick={() => save(false)} disabled={saving}
                className="w-full font-condensed font-bold text-[13px] tracking-[0.08em] uppercase py-3 rounded-[3px] border-2 transition-colors disabled:opacity-60"
                style={{ borderColor: "#0e4d7a", color: "#0e4d7a" }}>
                {saving ? "Guardando..." : "Guardar borrador"}
              </button>
              <button onClick={() => save(true)} disabled={saving}
                className="w-full font-condensed font-bold text-[13px] tracking-[0.08em] uppercase text-white py-3 rounded-[3px] transition-opacity disabled:opacity-60 hover:opacity-90"
                style={{ background: "#E8721C" }}>
                {published ? "Actualizar publicación" : "Publicar ahora"}
              </button>
              {published && (
                <a href={`/blog/${slug}`} target="_blank" className="w-full font-body text-xs text-center text-brand-mid hover:text-brand-ink transition-colors py-2">
                  Ver en el blog →
                </a>
              )}
              <button onClick={deletePost} disabled={deleting}
                className="w-full font-body text-xs text-red-500 hover:text-red-700 transition-colors py-2 border-t border-brand-light-border mt-1">
                {deleting ? "Eliminando..." : "Eliminar artículo"}
              </button>
            </div>
          </div>
          <div className="bg-white rounded-[4px] p-6 border border-brand-light-border">
            <h3 className="font-condensed font-bold text-brand-ink mb-4">Imagen de portada</h3>
            {coverPreview ? (
              <div className="relative h-40 rounded-[3px] overflow-hidden mb-3">
                <Image src={coverPreview} alt="Portada" fill className="object-cover" />
              </div>
            ) : (
              <div className="h-40 rounded-[3px] flex items-center justify-center mb-3 cursor-pointer"
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
          <div className="bg-white rounded-[4px] p-6 border border-brand-light-border">
            <h3 className="font-condensed font-bold text-brand-ink mb-4">Etiquetas</h3>
            <TagSelector tags={tags} onChange={setTags} />
          </div>
        </div>
      </div>
    </div>
  );
}
