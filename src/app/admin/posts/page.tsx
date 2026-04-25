import { supabaseAdmin, Post } from "@/lib/supabase";
import Link from "next/link";

async function getPosts(): Promise<Post[]> {
  try {
    const { data } = await supabaseAdmin()
      .from("posts")
      .select("*")
      .order("created_at", { ascending: false });
    return data ?? [];
  } catch {
    return [];
  }
}

export default async function AdminPostsPage() {
  const posts = await getPosts();

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-condensed font-black text-3xl text-brand-ink">Artículos del blog</h1>
          <p className="font-body text-brand-muted text-sm mt-1">{posts.length} artículos en total</p>
        </div>
        <Link
          href="/admin/posts/new"
          className="font-condensed font-bold text-[13px] tracking-[0.08em] uppercase text-white px-6 py-3 rounded-[3px] transition-opacity hover:opacity-90"
          style={{ background: "#E8721C" }}
        >
          + Nuevo artículo
        </Link>
      </div>

      {posts.length === 0 ? (
        <div className="bg-white rounded-[4px] p-16 text-center border border-brand-light-border">
          <p className="font-condensed font-bold text-xl text-brand-ink mb-2">No hay artículos todavía</p>
          <p className="font-body text-brand-muted text-sm mb-6">Creá tu primer artículo para que aparezca en el blog.</p>
          <Link href="/admin/posts/new" className="btn-primary">Crear primer artículo</Link>
        </div>
      ) : (
        <div className="bg-white rounded-[4px] border border-brand-light-border overflow-hidden">
          <table className="w-full">
            <thead>
              <tr style={{ background: "#f0f6fb", borderBottom: "1px solid #d0e8f7" }}>
                <th className="text-left font-condensed font-bold text-[12px] tracking-[0.1em] uppercase text-brand-muted px-6 py-4">Título</th>
                <th className="text-left font-condensed font-bold text-[12px] tracking-[0.1em] uppercase text-brand-muted px-6 py-4 hidden md:table-cell">Estado</th>
                <th className="text-left font-condensed font-bold text-[12px] tracking-[0.1em] uppercase text-brand-muted px-6 py-4 hidden md:table-cell">Fecha</th>
                <th className="px-6 py-4" />
              </tr>
            </thead>
            <tbody>
              {posts.map((post, i) => (
                <tr key={post.id} style={{ borderTop: i > 0 ? "1px solid #d0e8f7" : undefined }}>
                  <td className="px-6 py-4">
                    <p className="font-body font-medium text-brand-ink text-sm">{post.title}</p>
                    {post.tags && post.tags.length > 0 && (
                      <p className="font-body text-xs text-brand-muted mt-1">{post.tags.join(", ")}</p>
                    )}
                  </td>
                  <td className="px-6 py-4 hidden md:table-cell">
                    <span
                      className="font-body text-[11px] tracking-[0.06em] uppercase px-3 py-1 rounded-full"
                      style={{
                        background: post.published ? "rgba(22,163,74,0.1)" : "rgba(107,114,128,0.1)",
                        color: post.published ? "#16a34a" : "#6b7280",
                      }}
                    >
                      {post.published ? "Publicado" : "Borrador"}
                    </span>
                  </td>
                  <td className="px-6 py-4 hidden md:table-cell">
                    <span className="font-body text-xs text-brand-muted">
                      {new Date(post.created_at).toLocaleDateString("es-AR")}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3 justify-end">
                      {post.published && (
                        <a href={`/blog/${post.slug}`} target="_blank" className="font-body text-xs text-brand-mid hover:text-brand-ink transition-colors">
                          Ver →
                        </a>
                      )}
                      <Link href={`/admin/posts/${post.id}/edit`} className="font-body text-xs font-medium hover:underline" style={{ color: "#0e4d7a" }}>
                        Editar
                      </Link>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
