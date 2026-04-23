"use client";

import { useState } from "react";

const faqs = [
  {
    q: "¿Qué es la certificación IRATA?",
    a: "IRATA (International Rope Access Trade Association) es la certificación internacional más reconocida para trabajos en altura mediante acceso por cuerdas. Garantiza que el técnico está capacitado para trabajar de forma segura a cualquier altura.",
  },
  {
    q: "¿Hacen limpieza de fachadas y cristales en edificios de consorcios?",
    a: "Sí. Iron Tower se especializa en limpieza de fachadas, vidriados y cristales en altura para consorcios, edificios de departamentos y propiedades comerciales en CABA, Zona Norte y Zona Sur de GBA.",
  },
  {
    q: "¿En qué zonas de Buenos Aires trabajan?",
    a: "Operamos en Ciudad Autónoma de Buenos Aires (CABA), Zona Norte del Gran Buenos Aires y Zona Sur del Gran Buenos Aires.",
  },
  {
    q: "¿Ofrecen capacitaciones para brigadistas de consorcios?",
    a: "Sí. Brindamos formación completa de líderes de brigada y brigadistas de consorcios: uso de extintores, carga de fuego, plan de evacuación y combate de incendio.",
  },
  {
    q: "¿Cómo solicito un presupuesto?",
    a: "Podés contactarnos directamente por WhatsApp al +54 11 2725-9135 o completar el formulario en nuestro sitio web. Respondemos a la brevedad.",
  },
];

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section className="px-[5%] py-[80px]" style={{ background: "#f0f6fb" }}>
      <div className="max-w-[1200px] mx-auto">
        <span className="section-label">Preguntas frecuentes</span>
        <h2 className="section-title mb-12">
          Lo que nos preguntan<br />todo el tiempo.
        </h2>

        <div className="max-w-[800px] flex flex-col gap-[2px]">
          {faqs.map(({ q, a }, i) => (
            <div
              key={q}
              className="border"
              style={{ borderColor: "#d0e8f7", background: "#ffffff" }}
            >
              <button
                className="w-full flex items-center justify-between px-8 py-5 text-left cursor-pointer"
                onClick={() => setOpen(open === i ? null : i)}
                aria-expanded={open === i}
              >
                <span className="font-condensed font-bold text-[17px] text-brand-ink pr-4">{q}</span>
                <span
                  className="font-condensed font-bold text-xl shrink-0 transition-transform duration-200"
                  style={{
                    color: "#E8721C",
                    transform: open === i ? "rotate(45deg)" : "rotate(0deg)",
                  }}
                >
                  +
                </span>
              </button>
              {open === i && (
                <div className="px-8 pb-6">
                  <p className="font-body text-sm text-brand-mid leading-[1.7]">{a}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
