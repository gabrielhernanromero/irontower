import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import { supabase, Post } from "@/lib/supabase";
import { Header, Footer } from "@/components/layout";
import BlogCTA from "@/components/blog/BlogCTA";
import Link from "next/link";

export const revalidate = 60;

interface Props {
  params: { slug: string };
}

async function getPost(slug: string): Promise<Post | null> {
  try {
    const { data } = await supabase()
      .from("posts")
      .select("*")
      .eq("slug", slug)
      .eq("published", true)
      .single();
    return data;
  } catch {
    return null;
  }
}

async function getRelatedPosts(post: Post): Promise<Post[]> {
  if (!post.tags || post.tags.length === 0) return [];
  try {
    const { data } = await supabase()
      .from("posts")
      .select("*")
      .eq("published", true)
      .neq("id", post.id)
      .contains("tags", post.tags.slice(0, 1))
      .limit(3);
    return data ?? [];
  } catch {
    return [];
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = await getPost(params.slug);
  if (!post) return {};
  return {
    title: `${post.title} | Iron Tower Blog`,
    description: post.excerpt ?? post.title,
    openGraph: {
      title: post.title,
      description: post.excerpt ?? "",
      images: post.cover_image ? [{ url: post.cover_image }] : [],
      type: "article",
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const post = await getPost(params.slug);
  if (!post) notFound();

  const related = await getRelatedPosts(post);

  const date = new Date(post.created_at).toLocaleDateString("es-AR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const wordCount = (post.content ?? "").replace(/<[^>]*>/g, "").split(/\s+/).length;
  const readTime = Math.max(1, Math.round(wordCount / 200));

  const schema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    image: post.cover_image,
    datePublished: post.created_at,
    dateModified: post.updated_at,
    author: { "@type": "Organization", name: "Iron Tower — Vertical Rope Work" },
    publisher: { "@type": "Organization", name: "Iron Tower", logo: { "@type": "ImageObject", url: "https://www.irontowervrw.com.ar/favicon.ico" } },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <Header />
      <main>
        {/* Cover */}
        {post.cover_image && (
          <div className="relative h-[50vh] min-h-[320px] w-full">
            <Image
              src={post.cover_image}
              alt={post.title}
              fill
              className="object-cover"
              priority
              sizes="100vw"
            />
            <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, rgba(10,58,92,0.3) 0%, rgba(10,58,92,0.7) 100%)" }} />
          </div>
        )}

        {/* Article */}
        <article className="px-[5%] py-16">
          <div className="max-w-[800px] mx-auto">
            {/* Meta */}
            <div className="flex flex-wrap items-center gap-3 mb-6">
              <Link href="/blog" className="font-condensed font-bold text-[11px] tracking-[0.12em] uppercase hover:text-brand-orange transition-colors" style={{ color: "#0e4d7a" }}>
                ← Blog
              </Link>
              <span className="text-brand-muted text-xs">·</span>
              <span className="font-body text-xs text-brand-muted">{date}</span>
              <span className="text-brand-muted text-xs">·</span>
              <span className="font-body text-xs text-brand-muted">{readTime} min de lectura</span>
            </div>

            {/* Tags */}
            {post.tags && post.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-5">
                {post.tags.map((tag) => (
                  <span key={tag} className="font-body text-[11px] tracking-[0.08em] uppercase px-3 py-1 rounded-[2px]" style={{ background: "rgba(14,77,122,0.08)", color: "#0e4d7a" }}>
                    {tag}
                  </span>
                ))}
              </div>
            )}

            <h1 className="font-condensed font-black text-brand-ink leading-tight mb-8" style={{ fontSize: "clamp(2rem, 5vw, 3rem)" }}>
              {post.title}
            </h1>

            {/* Content */}
            {post.content && (
              <div
                className="prose prose-lg max-w-none font-body text-brand-ink prose-headings:font-condensed prose-headings:font-black prose-a:text-brand-blue-dark prose-img:rounded-[4px]"
                dangerouslySetInnerHTML={{ __html: post.content }}
              />
            )}

            {/* CTA */}
            <BlogCTA />
          </div>
        </article>

        {/* Related posts */}
        {related.length > 0 && (
          <section className="px-[5%] py-16 border-t border-brand-light-border" style={{ background: "#f0f6fb" }}>
            <div className="max-w-[1200px] mx-auto">
              <h2 className="font-condensed font-black text-brand-ink text-2xl mb-8">Artículos relacionados</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {related.map((p) => (
                  <Link key={p.id} href={`/blog/${p.slug}`} className="group bg-white rounded-[4px] p-6 shadow-sm hover:shadow-md transition-shadow">
                    <h3 className="font-condensed font-bold text-[17px] text-brand-ink group-hover:text-brand-blue-dark transition-colors mb-2">{p.title}</h3>
                    {p.excerpt && <p className="font-body text-sm text-brand-mid line-clamp-2">{p.excerpt}</p>}
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}
      </main>
      <Footer />
    </>
  );
}
