"use client";
import { useState, useMemo } from "react";
import type { Post } from "@/lib/supabase";
import PostCard from "./PostCard";

export default function BlogPostsGrid({ posts }: { posts: Post[] }) {
  const [activeTag, setActiveTag] = useState<string | null>(null);

  const allTags = useMemo(() => {
    const set = new Set<string>();
    posts.forEach((p) => p.tags?.forEach((t) => set.add(t)));
    return Array.from(set).sort();
  }, [posts]);

  const filtered = activeTag ? posts.filter((p) => p.tags?.includes(activeTag)) : posts;

  if (posts.length === 0) {
    return (
      <div className="text-center py-20">
        <p className="font-condensed font-bold text-2xl text-brand-ink mb-3">Próximamente</p>
        <p className="font-body text-brand-mid">Estamos preparando el contenido. ¡Volvé pronto!</p>
      </div>
    );
  }

  return (
    <div>
      {allTags.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-10">
          <button
            onClick={() => setActiveTag(null)}
            className={`font-body text-[11px] tracking-[0.08em] uppercase px-4 py-2 rounded-[2px] border transition-colors ${
              activeTag === null ? "text-white border-transparent" : "border-brand-light-border text-brand-mid hover:text-brand-ink"
            }`}
            style={activeTag === null ? { background: "#0e4d7a" } : {}}
          >
            Todos
          </button>
          {allTags.map((tag) => (
            <button
              key={tag}
              onClick={() => setActiveTag(activeTag === tag ? null : tag)}
              className={`font-body text-[11px] tracking-[0.08em] uppercase px-4 py-2 rounded-[2px] border transition-colors ${
                activeTag === tag ? "text-white border-transparent" : "border-brand-light-border text-brand-mid hover:text-brand-ink"
              }`}
              style={activeTag === tag ? { background: "#0e4d7a" } : {}}
            >
              {tag}
            </button>
          ))}
        </div>
      )}

      {filtered.length === 0 ? (
        <p className="font-body text-brand-mid text-center py-12">No hay artículos con esa etiqueta.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      )}
    </div>
  );
}
