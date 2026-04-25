"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import Image from "next/image";

const RichTextEditor = dynamic(() => import("@/components/blog/RichTextEditor"), { ssr: false });

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

function slugify(text: string) {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
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
  const coverRef = useRef<HTMLInputElement>(null);

  const handleTitleChange = (v: string) => {
    setTitle(v);
    if (!slug || slug === slugify(title)) setSlug(slugify(v));
  };

  const toggleTag = (tag: string) => {
    setTags((prev) => prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]);
  };

  const uploadCover = async (file: File) => {
    const form = new FormData();
    form.append("file", file);
    const res = await fetch("/api/upload", { method: "POST", body: form });
    if (!res.ok) return;
    const { url } = await res.json();
    setCoverImage(url);
    setCoverPreview(url);
  };

  const save = async (published: boolean) => {
    if (!title.trim()) { alert("El título es obligatorio."); return; }
    published ? setPublishing(true) : setSaving(true);

    const res = await fetch("/api/posts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, slug, excerpt, content, tags, cover_image: coverImage, published }),
    });

    setSaving(false);
    setPublishing(false);

    if (res.ok) {
      router.push("/admin/posts");
    } else {
      const err = await res.json();
      alert(err.error ?? "Error al guardar.");
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-condensed font-black text-3xl text-brand-ink">Nuevo artículo</h1>
          <p className="font-body text-brand-muted text-sm mt-1">Completá los campos y publicá cuando estés listo.</p>
        </div>
        <a href="/admin/posts" className="font-body text-sm text-brand-mid hover:text-brand-ink transition-colors">← Volver</a>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          {/* Título */}
          <div className="bg-white rounded-[4px] p-6 border border-brand-light-border">
            <label className="font-body text-sm font-medium text-brand-ink block mb-2">Título *</label>
            <input
              type="text"
              value={title}
              onChange={(e) => handleTitleChange(e.target.value)}
              placeholder="Ej: Montaje de antenas en la Torre X"
              className="w-full border border-brand-light-border rounded-[3px] px-4 py-3 font-body text-brand-ink text-lg focus:outline-none focus:border-brand-blue-dark transition-colors"
            />
            <div className="flex items-center gap-2 mt-3">
              <span className="font-body text-xs text-brand-muted">/blog/</span>
              <input
                type="text"
                value={slug}
                onChange={(e) => setSlug(slugify(e.target.value))}
                className="flex-1 border border-brand-light-border rounded-[3px] px-3 py-1.5 font-body text-xs text-brand-mid focus:outline-none focus:border-brand-blue-dark transition-colors"
              />
            </div>
          </div>

          {/* Excerpt */}
          <div className="bg-white rounded-[4px] p-6 border border-brand-light-border">
            <label className="font-body text-sm font-medium text-brand-ink block mb-2">Resumen (excerpt)</label>
            <textarea
              value={excerpt}
              onChange={(e) => setExcerpt(e.target.value)}
              placeholder="Breve descripción del artículo (aparece en el listado y en Google)..."
              rows={3}
              className="w-full border border-brand-light-border rounded-[3px] px-4 py-3 font-body text-sm text-brand-ink resize-none focus:outline-none focus:border-brand-blue-dark transition-colors"
            />
            <p className="font-body text-xs text-brand-muted mt-1">{excerpt.length}/160 caracteres recomendados</p>
          </div>

          {/* Editor */}
          <div className="bg-white rounded-[4px] p-6 border border-brand-light-border">
            <label className="font-body text-sm font-medium text-brand-ink block mb-3">Contenido</label>
            <RichTextEditor content={content} onChange={setContent} />
          </div>
        </div>

        {/* Sidebar */}
        <div className="flex flex-col gap-6">
          {/* Acciones */}
          <div className="bg-white rounded-[4px] p-6 border border-brand-light-border">
            <h3 className="font-condensed font-bold text-brand-ink mb-4">Publicación</h3>
            <div className="flex flex-col gap-3">
              <button
                onClick={() => save(false)}
                disabled={saving}
                className="w-full font-condensed font-bold text-[13px] tracking-[0.08em] uppercase py-3 rounded-[3px] border-2 transition-colors disabled:opacity-60"
                style={{ borderColor: "#0e4d7a", color: "#0e4d7a" }}
              >
                {saving ? "Guardando..." : "Guardar borrador"}
              </button>
              <button
                onClick={() => save(true)}
                disabled={publishing}
                className="w-full font-condensed font-bold text-[13px] tracking-[0.08em] uppercase text-white py-3 rounded-[3px] transition-opacity disabled:opacity-60 hover:opacity-90"
                style={{ background: "#E8721C" }}
              >
                {publishing ? "Publicando..." : "Publicar ahora"}
              </button>
            </div>
          </div>

          {/* Imagen de portada */}
          <div className="bg-white rounded-[4px] p-6 border border-brand-light-border">
            <h3 className="font-condensed font-bold text-brand-ink mb-4">Imagen de portada</h3>
            {coverPreview ? (
              <div className="relative h-40 rounded-[3px] overflow-hidden mb-3">
                <Image src={coverPreview} alt="Portada" fill className="object-cover" />
              </div>
            ) : (
              <div
                className="h-40 rounded-[3px] flex items-center justify-center mb-3 cursor-pointer hover:opacity-90 transition-opacity"
                style={{ background: "#f0f6fb", border: "2px dashed #d0e8f7" }}
                onClick={() => coverRef.current?.click()}
              >
                <p className="font-body text-sm text-brand-muted">Clic para subir imagen</p>
              </div>
            )}
            <input ref={coverRef} type="file" accept="image/*" className="hidden" onChange={(e) => { const f = e.target.files?.[0]; if (f) uploadCover(f); e.target.value = ""; }} />
            <button onClick={() => coverRef.current?.click()} className="w-full font-body text-sm text-brand-mid border border-brand-light-border rounded-[3px] py-2 hover:bg-brand-light-bg transition-colors">
              {coverPreview ? "Cambiar imagen" : "Subir imagen"}
            </button>
          </div>

          {/* Tags */}
          <div className="bg-white rounded-[4px] p-6 border border-brand-light-border">
            <h3 className="font-condensed font-bold text-brand-ink mb-4">Etiquetas</h3>
            <div className="flex flex-wrap gap-2">
              {TAGS_SUGERIDOS.map((tag) => (
                <button
                  key={tag}
                  type="button"
                  onClick={() => toggleTag(tag)}
                  className="font-body text-xs px-3 py-1.5 rounded-full border transition-colors"
                  style={{
                    borderColor: tags.includes(tag) ? "#0e4d7a" : "#d0e8f7",
                    background: tags.includes(tag) ? "rgba(14,77,122,0.08)" : "#fff",
                    color: tags.includes(tag) ? "#0e4d7a" : "#6a8aaa",
                  }}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
