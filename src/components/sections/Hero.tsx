"use client";

import { useEffect, useRef } from "react";
import { trackWhatsApp } from "@/lib/analytics";

const WA_URL =
  "https://wa.me/541127259135?text=Hola,%20quiero%20solicitar%20un%20presupuesto";

const WA_ICON = (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);

export default function Hero() {
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = lineRef.current;
    if (!el) return;
    let h = 0;
    const max = typeof window !== "undefined" ? window.innerHeight * 0.4 : 200;
    const id = setInterval(() => {
      h = Math.min(h + 4, max);
      el.style.height = `${h}px`;
      if (h >= max) clearInterval(id);
    }, 16);
    return () => clearInterval(id);
  }, []);

  return (
    <section
      id="inicio"
      className="relative min-h-screen flex items-end overflow-hidden"
      style={{
        background: "linear-gradient(160deg, #0e4d7a 0%, #0a3a5c 50%, #0d4a78 100%)",
      }}
    >
      {/* Atmospheric background layers */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Blue glow top-right */}
        <div
          className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full opacity-20"
          style={{
            background: "radial-gradient(circle, #5bc8f5 0%, transparent 70%)",
          }}
        />
        {/* Orange accent diagonal */}
        <div
          className="absolute bottom-0 left-0 right-0 h-1"
          style={{ background: "#E8721C" }}
        />
        {/* Subtle grid */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(white 1px, transparent 1px), linear-gradient(90deg, white 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
        {/* Orange vertical accent line */}
        <div
          ref={lineRef}
          className="absolute top-[68px] right-[15%] w-[2px]"
          style={{ background: "#E8721C", height: 0, transition: "height 0.05s linear" }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 px-[5%] pb-20 pt-40 w-full max-w-[1200px]">
        {/* Tag */}
        <div className="inline-block font-condensed font-bold text-[11px] tracking-[0.18em] uppercase text-white/70 border border-white/20 px-4 py-2 mb-6">
          Certificación Internacional IRATA
        </div>

        {/* Headline */}
        <h1 className="font-condensed font-black text-white leading-[1.0] mb-6 max-w-[700px]"
          style={{ fontSize: "clamp(3.5rem, 8vw, 6rem)" }}
        >
          Trabajamos<br />
          donde otros<br />
          <span style={{ color: "#E8721C" }}>no llegan.</span>
        </h1>

        {/* Subtext */}
        <p className="font-body font-light text-white/70 text-[17px] max-w-[520px] leading-[1.7] mb-10">
          Soluciones de altura con rigor técnico y seguridad certificada.
          Telecomunicaciones, incendio, limpieza de fachadas y capacitación
          para consorcios e industrias en toda la Argentina.
        </p>

        {/* CTAs */}
        <div className="flex flex-wrap gap-4">
          <a href={WA_URL} target="_blank" rel="noopener noreferrer" onClick={() => trackWhatsApp("hero")} className="btn-primary">
            {WA_ICON}
            Pedir presupuesto por WhatsApp
          </a>
          <a href="#servicios" className="btn-secondary">
            Ver servicios
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 right-[5%] flex flex-col items-center gap-2 text-white/40">
        <span className="font-condensed text-[11px] tracking-[0.2em] uppercase">scroll</span>
        <div className="w-[1px] h-12 bg-white/20" />
      </div>
    </section>
  );
}
