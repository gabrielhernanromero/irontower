"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import dynamic from "next/dynamic";
import Image from "next/image";
import TagSelector from "@/components/blog/TagSelector";
import type { TemplateStructure, PostBlocks } from "@/types/blocks";
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

  // Block builder state
  const [mode, setMode] = useState<"text" | "blocks">("text");
  const [templates, setTemplates] = useState<PostTemplate[]>([]);
  const [templateId, setTemplateId] = useState<string>("");
  const [structure, setStructure] = useState<TemplateStructure>({ rows: [] });
  const [blocks, setBlocks] = useState<PostBlocks>({});

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

      if (post.template_id && post.blocks) {
        setMode("blocks");
        setTemplateId(post.template_id);
        setBlocks(post.blocks);
        // Load structure from template
        const tpl = Array.isArray(list) ? list.find((t: PostTemplate) => t.id === post.template_id) : null;
        if (tpl) setStructure(tpl.structure);
        else {
          // Fallback: fetch template directly
          fetch(`/api/templates/${post.template_id}`).then((r) => r.json()).then((t) => {
            if (t.structure) setStructure(t.structure);
          }).catch(() => {});
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
      body.blocks = blocks;
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

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-condensed font-black text-3xl text-brand-ink">Editar artículo</h1>
          <p className="font-body text-brand-muted text-sm mt-1">{published ? "✓ Publicado" : "Borrador"}</p>
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
          <label className="font-body text-sm font-medium text-brand-ink block mb-2">Plantilla</label>
          <select value={templateId} onChange={(e) => applyTemplate(e.target.value)}
            className="border border-brand-light-border rounded-[3px] px-3 py-2 font-body text-sm w-full max-w-xs focus:outline-none focus:border-brand-blue bg-white">
            <option value="">Sin plantilla (desde cero)</option>
            {templates.map((t) => <option key={t.id} value={t.id}>{t.name}</option>)}
          </select>
          <p className="font-body text-xs text-brand-muted mt-2">
            Cambiar de plantilla reiniciará el contenido de los bloques.{" "}
            <a href="/admin/templates" className="text-brand-blue hover:underline">Gestionar plantillas →</a>
          </p>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main */}
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
            <label className="font-body text-sm font-medium text-brand-ink block mb-3">
              {mode === "blocks" ? "Constructor de bloques" : "Contenido"}
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
            <h3 className="font-condensed font-bold text-brand-ink mb-1">Etiquetas</h3>
            <p className="font-body text-xs text-brand-muted mb-4">Seleccioná las predefinidas o creá etiquetas nuevas.</p>
            <TagSelector tags={tags} onChange={setTags} />
          </div>
        </div>
      </div>
    </div>
  );
}
