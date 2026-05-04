"use client";
import Image from "next/image";
import Link from "next/link";
import { Header, Footer } from "@/components/layout";
import { trackWhatsApp } from "@/lib/analytics";

const WA_BASE = "https://wa.me/541127259135?text=";

interface Step {
  n: string;
  title: string;
  desc: string;
}

interface Faq {
  q: string;
  a: string;
}

interface ServicePageProps {
  badge: string;
  h1: string;
  lead: string;
  image: string;
  imageAlt: string;
  waText: string;
  body: React.ReactNode;
  steps: Step[];
  faqs: Faq[];
  schema: object;
}

export default function ServicePage({
  badge,
  h1,
  lead,
  image,
  imageAlt,
  waText,
  body,
  steps,
  faqs,
  schema,
}: ServicePageProps) {
  const waUrl = `${WA_BASE}${encodeURIComponent(waText)}`;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <Header />
      <main>
        {/* Hero */}
        <section
          className="px-[5%] pt-36 pb-20"
          style={{ background: "linear-gradient(160deg, #0e4d7a 0%, #0a3a5c 50%, #0d4a78 100%)" }}
        >
          <div className="max-w-[1200px] mx-auto">
            <nav className="flex items-center gap-2 mb-6 text-white/50 text-xs font-body">
              <Link href="/" className="hover:text-white transition-colors">Inicio</Link>
              <span>/</span>
              <Link href="/#servicios" className="hover:text-white transition-colors">Servicios</Link>
              <span>/</span>
              <span className="text-white/80">{badge}</span>
            </nav>
            <span className="inline-block font-condensed font-bold text-[11px] tracking-[0.18em] uppercase text-white/60 border border-white/20 px-4 py-2 mb-6">
              Iron Tower — {badge}
            </span>
            <h1
              className="font-condensed font-black text-white leading-[1.0] mb-6"
              style={{ fontSize: "clamp(2.2rem, 5.5vw, 4rem)" }}
            >
              {h1}
            </h1>
            <p className="font-body text-white/75 text-[17px] max-w-[560px] leading-[1.7] mb-10">
              {lead}
            </p>
            <div className="flex flex-wrap gap-4">
              <a
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackWhatsApp("pagina_servicio_hero", badge)}
                className="btn-primary"
              >
                Consultar por WhatsApp
              </a>
              <Link
                href="/#servicios"
                className="font-condensed font-bold text-[13px] tracking-[0.08em] uppercase text-white/80 border border-white/30 px-6 py-3 rounded-[3px] hover:border-white/60 transition-colors"
              >
                Ver todos los servicios
              </Link>
            </div>
          </div>
        </section>

        {/* Body + image */}
        <section className="px-[5%] py-20 bg-white">
          <div className="max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="prose prose-lg max-w-none font-body prose-headings:font-condensed prose-headings:font-black prose-headings:text-brand-ink prose-p:text-brand-mid prose-p:leading-[1.8] prose-strong:text-brand-ink prose-ul:list-disc prose-ul:pl-6 prose-li:text-brand-mid prose-li:my-1">
              {body}
            </div>
            <div className="relative h-[420px] rounded-[4px] overflow-hidden shadow-xl">
              <Image
                src={image}
                alt={imageAlt}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </div>
        </section>

        {/* Steps */}
        <section className="px-[5%] py-20" style={{ background: "#f0f6fb" }}>
          <div className="max-w-[1200px] mx-auto">
            <span className="section-label">Cómo trabajamos</span>
            <h2 className="font-condensed font-black text-brand-ink text-[2rem] mb-12 leading-tight">
              Proceso claro,<br />resultados garantizados.
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {steps.map((s) => (
                <div key={s.n} className="bg-white rounded-[4px] p-7 border border-brand-light-border">
                  <span
                    className="font-condensed font-black text-5xl leading-none block mb-4"
                    style={{ color: "rgba(14,77,122,0.12)" }}
                  >
                    {s.n}
                  </span>
                  <h3 className="font-condensed font-bold text-[17px] text-brand-ink mb-2">{s.title}</h3>
                  <p className="font-body text-sm text-brand-mid leading-[1.7]">{s.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="px-[5%] py-20 bg-white">
          <div className="max-w-[800px] mx-auto">
            <span className="section-label">Preguntas frecuentes</span>
            <h2 className="font-condensed font-black text-brand-ink text-[2rem] mb-10 leading-tight">
              Lo que más nos preguntan.
            </h2>
            <div className="flex flex-col gap-4">
              {faqs.map((faq, i) => (
                <details
                  key={i}
                  className="group border border-brand-light-border rounded-[4px] overflow-hidden"
                >
                  <summary className="flex items-center justify-between px-6 py-5 cursor-pointer font-condensed font-bold text-[16px] text-brand-ink list-none hover:bg-brand-light-bg transition-colors">
                    {faq.q}
                    <span className="ml-4 shrink-0 text-brand-orange font-black text-xl leading-none group-open:rotate-45 transition-transform">+</span>
                  </summary>
                  <div className="px-6 pb-5 font-body text-[15px] text-brand-mid leading-[1.75]">
                    {faq.a}
                  </div>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section
          className="px-[5%] py-20"
          style={{ background: "linear-gradient(160deg, #0e4d7a 0%, #0a3a5c 100%)" }}
        >
          <div className="max-w-[700px] mx-auto text-center">
            <h2 className="font-condensed font-black text-white text-[2.2rem] leading-tight mb-4">
              ¿Necesitás este servicio?
            </h2>
            <p className="font-body text-white/70 mb-8 leading-[1.7]">
              Contactanos por WhatsApp y te respondemos con un presupuesto sin costo, sin compromiso.
            </p>
            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackWhatsApp("pagina_servicio_cta", badge)}
              className="btn-primary"
            >
              Consultar por WhatsApp →
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
