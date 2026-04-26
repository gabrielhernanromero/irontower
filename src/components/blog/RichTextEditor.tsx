"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
import Placeholder from "@tiptap/extension-placeholder";
import { useEffect, useRef, useState } from "react";

interface RichTextEditorProps {
  content: string;
  onChange: (html: string) => void;
}

const BTN = "px-2 py-1 rounded text-sm font-medium transition-colors hover:bg-gray-100";
const BTN_ACTIVE = "bg-gray-200";

export default function RichTextEditor({ content, onChange }: RichTextEditorProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [htmlModalOpen, setHtmlModalOpen] = useState(false);
  const [rawHtml, setRawHtml] = useState("");

  const editor = useEditor({
    extensions: [
      StarterKit,
      Image.configure({ inline: false, allowBase64: false }),
      Link.configure({ openOnClick: false }),
      Placeholder.configure({ placeholder: "Escribí el contenido del artículo aquí, o usá el botón 'Pegar HTML' para pegar el contenido generado por IA..." }),
    ],
    content,
    onUpdate({ editor }) {
      onChange(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class: "prose prose-lg max-w-none min-h-[400px] p-6 focus:outline-none font-body text-brand-ink",
      },
    },
  });

  useEffect(() => {
    if (editor && content !== editor.getHTML()) {
      editor.commands.setContent(content);
    }
  }, [content, editor]);

  const uploadImage = async (file: File) => {
    const form = new FormData();
    form.append("file", file);
    const res = await fetch("/api/upload", { method: "POST", body: form });
    if (!res.ok) return;
    const { url } = await res.json();
    editor?.chain().focus().setImage({ src: url }).run();
  };

  const setLink = () => {
    const url = window.prompt("URL del enlace:");
    if (!url) return;
    editor?.chain().focus().setLink({ href: url }).run();
  };

  const applyHtml = () => {
    if (!rawHtml.trim()) return;
    editor?.commands.setContent(rawHtml);
    onChange(rawHtml);
    setRawHtml("");
    setHtmlModalOpen(false);
  };

  if (!editor) return null;

  return (
    <>
      <div className="border border-brand-light-border rounded-[4px] overflow-hidden bg-white">
        {/* Toolbar */}
        <div className="flex flex-wrap gap-1 p-3 border-b border-brand-light-border bg-gray-50">
          {/* Pegar HTML — botón destacado */}
          <button
            type="button"
            onClick={() => setHtmlModalOpen(true)}
            className="px-3 py-1 rounded text-sm font-bold transition-colors text-white"
            style={{ background: "#0e4d7a" }}
            title="Pegar HTML generado por IA"
          >
            Pegar HTML
          </button>
          <div className="w-px bg-gray-300 mx-1" />
          <button type="button" onClick={() => editor.chain().focus().toggleBold().run()} className={`${BTN} ${editor.isActive("bold") ? BTN_ACTIVE : ""}`} title="Negrita">
            <strong>B</strong>
          </button>
          <button type="button" onClick={() => editor.chain().focus().toggleItalic().run()} className={`${BTN} ${editor.isActive("italic") ? BTN_ACTIVE : ""}`} title="Itálica">
            <em>I</em>
          </button>
          <button type="button" onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} className={`${BTN} ${editor.isActive("heading", { level: 2 }) ? BTN_ACTIVE : ""}`} title="Título H2">
            H2
          </button>
          <button type="button" onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()} className={`${BTN} ${editor.isActive("heading", { level: 3 }) ? BTN_ACTIVE : ""}`} title="Título H3">
            H3
          </button>
          <div className="w-px bg-gray-300 mx-1" />
          <button type="button" onClick={() => editor.chain().focus().toggleBulletList().run()} className={`${BTN} ${editor.isActive("bulletList") ? BTN_ACTIVE : ""}`} title="Lista">
            • Lista
          </button>
          <button type="button" onClick={() => editor.chain().focus().toggleOrderedList().run()} className={`${BTN} ${editor.isActive("orderedList") ? BTN_ACTIVE : ""}`} title="Lista numerada">
            1. Lista
          </button>
          <div className="w-px bg-gray-300 mx-1" />
          <button type="button" onClick={setLink} className={`${BTN} ${editor.isActive("link") ? BTN_ACTIVE : ""}`} title="Insertar enlace">
            🔗 Link
          </button>
          <button type="button" onClick={() => fileInputRef.current?.click()} className={BTN} title="Insertar imagen">
            🖼 Imagen
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => { const f = e.target.files?.[0]; if (f) uploadImage(f); e.target.value = ""; }}
          />
          <div className="w-px bg-gray-300 mx-1" />
          <button type="button" onClick={() => editor.chain().focus().toggleBlockquote().run()} className={`${BTN} ${editor.isActive("blockquote") ? BTN_ACTIVE : ""}`} title="Cita">
            ❝ Cita
          </button>
          <button type="button" onClick={() => editor.chain().focus().setHorizontalRule().run()} className={BTN} title="Separador">
            ─ Sep.
          </button>
        </div>

        {/* Editor area */}
        <EditorContent editor={editor} />
      </div>

      {/* Modal Pegar HTML */}
      {htmlModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: "rgba(10,58,92,0.6)" }}>
          <div className="bg-white rounded-[4px] w-full max-w-[680px] shadow-2xl">
            <div className="flex items-center justify-between px-6 py-4 border-b border-brand-light-border">
              <div>
                <p className="font-condensed font-bold text-brand-ink text-lg">Pegar HTML de la IA</p>
                <p className="font-body text-xs text-brand-muted mt-0.5">Pegá el bloque CONTENIDO HTML que te devolvió ChatGPT o Claude</p>
              </div>
              <button type="button" onClick={() => { setHtmlModalOpen(false); setRawHtml(""); }} className="text-brand-muted hover:text-brand-ink text-xl leading-none">✕</button>
            </div>
            <div className="p-6">
              <textarea
                value={rawHtml}
                onChange={(e) => setRawHtml(e.target.value)}
                placeholder={`<h2>Título de sección</h2>\n<p>Primer párrafo del artículo...</p>\n<ul>\n  <li>Punto importante</li>\n</ul>`}
                rows={12}
                className="w-full border border-brand-light-border rounded-[3px] px-4 py-3 font-mono text-sm text-brand-ink resize-none focus:outline-none focus:border-brand-blue-dark transition-colors"
                autoFocus
              />
              <p className="font-body text-xs text-brand-muted mt-2">
                Solo pegá el contenido entre las etiquetas HTML — sin &lt;html&gt;, &lt;head&gt; ni &lt;body&gt;.
              </p>
            </div>
            <div className="flex gap-3 px-6 pb-6">
              <button
                type="button"
                onClick={applyHtml}
                disabled={!rawHtml.trim()}
                className="font-condensed font-bold text-[13px] tracking-[0.08em] uppercase text-white px-6 py-3 rounded-[3px] transition-opacity disabled:opacity-40 hover:opacity-90"
                style={{ background: "#0e4d7a" }}
              >
                Insertar contenido
              </button>
              <button
                type="button"
                onClick={() => { setHtmlModalOpen(false); setRawHtml(""); }}
                className="font-body text-sm text-brand-mid border border-brand-light-border px-6 py-3 rounded-[3px] hover:bg-gray-50 transition-colors"
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
