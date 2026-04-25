import Image from "next/image";
import Link from "next/link";
import { Post } from "@/lib/supabase";

interface PostCardProps {
  post: Post;
}

export default function PostCard({ post }: PostCardProps) {
  const date = new Date(post.created_at).toLocaleDateString("es-AR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <Link href={`/blog/${post.slug}`} className="group flex flex-col rounded-[4px] overflow-hidden bg-white shadow-[0_4px_24px_rgba(14,77,122,0.08)] hover:shadow-[0_8px_32px_rgba(14,77,122,0.16)] transition-shadow duration-300">
      {/* Cover image */}
      <div className="relative h-52 overflow-hidden bg-brand-light-bg">
        {post.cover_image ? (
          <Image
            src={post.cover_image}
            alt={post.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center" style={{ background: "linear-gradient(160deg, #0e4d7a 0%, #0a3a5c 100%)" }}>
            <span className="font-condensed font-black text-white/20 text-6xl uppercase">IT</span>
          </div>
        )}
      </div>

      {/* Body */}
      <div className="p-6 flex flex-col flex-1">
        {/* Tags */}
        {post.tags && post.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-3">
            {post.tags.slice(0, 2).map((tag) => (
              <span
                key={tag}
                className="font-body text-[11px] tracking-[0.08em] uppercase px-3 py-1 rounded-[2px]"
                style={{ background: "rgba(14,77,122,0.08)", color: "#0e4d7a" }}
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        <h3 className="font-condensed font-bold text-[20px] text-brand-ink mb-2 leading-snug group-hover:text-brand-blue-dark transition-colors duration-200">
          {post.title}
        </h3>

        {post.excerpt && (
          <p className="font-body text-sm text-brand-mid leading-[1.7] mb-4 flex-1 line-clamp-3">
            {post.excerpt}
          </p>
        )}

        <div className="flex items-center justify-between mt-auto pt-4 border-t border-brand-light-border">
          <span className="font-body text-xs text-brand-muted">{date}</span>
          <span className="font-condensed font-bold text-[12px] tracking-[0.08em] uppercase" style={{ color: "#E8721C" }}>
            Leer más →
          </span>
        </div>
      </div>
    </Link>
  );
}
