import type { Metadata } from "next";
import { supabase, Post } from "@/lib/supabase";
import PostCard from "@/components/blog/PostCard";
import { Header, Footer } from "@/components/layout";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Blog | Iron Tower — Trabajos en Altura Argentina",
  description:
    "Artículos, novedades y trabajos realizados por el equipo de Iron Tower. Aprende sobre trabajos en altura, seguridad IRATA y proyectos en toda la Argentina.",
};

export const revalidate = 60;

async function getPosts(): Promise<Post[]> {
  try {
    const { data } = await supabase()
      .from("posts")
      .select("*")
      .eq("published", true)
      .order("created_at", { ascending: false });
    return data ?? [];
  } catch {
    return [];
  }
}

export default async function BlogPage() {
  const posts = await getPosts();

  return (
    <>
      <Header />
      <main>
        {/* Hero del blog */}
        <section
          className="px-[5%] pt-32 pb-20"
          style={{ background: "linear-gradient(160deg, #0e4d7a 0%, #0a3a5c 50%, #0d4a78 100%)" }}
        >
          <div className="max-w-[1200px] mx-auto">
            <span className="inline-block font-condensed font-bold text-[11px] tracking-[0.18em] uppercase text-white/60 border border-white/20 px-4 py-2 mb-6">
              Iron Tower — Blog
            </span>
            <h1 className="font-condensed font-black text-white leading-[1.0] mb-4" style={{ fontSize: "clamp(2.5rem, 6vw, 4.5rem)" }}>
              Novedades y trabajos<br />
              <span style={{ color: "#E8721C" }}>realizados.</span>
            </h1>
            <p className="font-body text-white/70 text-[17px] max-w-[520px] leading-[1.7]">
              Seguí nuestros proyectos, aprendé sobre seguridad en altura y
              conocé las últimas novedades del equipo Iron Tower.
            </p>
          </div>
        </section>

        {/* Posts */}
        <section className="px-[5%] py-[80px]" style={{ background: "#f0f6fb" }}>
          <div className="max-w-[1200px] mx-auto">
            {posts.length === 0 ? (
              <div className="text-center py-20">
                <p className="font-condensed font-bold text-2xl text-brand-ink mb-3">
                  Próximamente
                </p>
                <p className="font-body text-brand-mid">
                  Estamos preparando el contenido. ¡Volvé pronto!
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {posts.map((post) => (
                  <PostCard key={post.id} post={post} />
                ))}
              </div>
            )}
          </div>
        </section>

        {/* CTA final */}
        <section className="px-[5%] py-[80px]" style={{ background: "#fff" }}>
          <div className="max-w-[700px] mx-auto text-center">
            <h2 className="font-condensed font-black text-brand-ink text-3xl mb-4">
              ¿Necesitás nuestros servicios?
            </h2>
            <p className="font-body text-brand-mid mb-8 leading-[1.7]">
              Contactanos por WhatsApp y te respondemos a la brevedad con un presupuesto sin costo.
            </p>
            <a
              href="https://wa.me/541127259135?text=Hola,%20vi%20el%20blog%20de%20Iron%20Tower%20y%20quiero%20consultar"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
            >
              Consultar por WhatsApp
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
