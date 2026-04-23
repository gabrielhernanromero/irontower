"use client";

import Image from "next/image";

const WA_URL =
  "https://wa.me/541127259135?text=Hola,%20quiero%20consultar%20sobre%20los%20servicios";

interface Service {
  num: string;
  title: string;
  desc: string;
  tag: string;
  color: string;
  image: string;
  imageAlt: string;
  icon: React.ReactNode;
}

const services: Service[] = [
  {
    num: "01",
    title: "Montaje de torres de telecomunicaciones",
    desc: "Instalación, mantenimiento y reparación de estructuras verticales para telecomunicaciones. Trabajamos con todas las tecnologías y alturas.",
    tag: "Telecomunicaciones",
    color: "#0e4d7a",
    image: "/images/services/montaje-torres.jpg",
    imageAlt: "Técnico Iron Tower trabajando en torre de telecomunicaciones",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth={1.8} className="w-10 h-10">
        <rect x="3" y="3" width="4" height="18" /><rect x="17" y="3" width="4" height="18" />
        <path d="M7 7h10M7 12h10M7 17h10" />
      </svg>
    ),
  },
  {
    num: "02",
    title: "Puntos y líneas de anclaje",
    desc: "Instalación de sistemas de líneas de vida y puntos de anclaje certificados. Seguridad garantizada para trabajos futuros en su edificio o instalación.",
    tag: "Seguridad en altura",
    color: "#E8721C",
    image: "/images/services/anclaje.webp",
    imageAlt: "Sistemas de anclaje y líneas de vida certificados",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth={1.8} className="w-10 h-10">
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
      </svg>
    ),
  },
  {
    num: "03",
    title: "Limpieza de fachadas y cristales",
    desc: "Limpieza profesional de vidriados y fachadas en altura para consorcios y edificios. Técnicas certificadas y equipamiento de primer nivel.",
    tag: "★ Estrella consorcios",
    color: "#0e4d7a",
    image: "/images/services/fachadas-cristales.webp",
    imageAlt: "Limpieza de fachadas y cristales en altura",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth={1.8} className="w-10 h-10">
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
        <polyline points="9 22 9 12 15 12 15 22" />
      </svg>
    ),
  },
  {
    num: "04",
    title: "Prevención de incendios",
    desc: "Informes de carga de fuego, habilitación de locales e industrias, planes de evacuación. Cumplimiento normativo total para consorcios e industrias.",
    tag: "Prevención",
    color: "#E8721C",
    image: "/images/services/gci-incendios.jpg",
    imageAlt: "Guardia Contra Incendios — equipo Iron Tower en acción",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth={1.8} className="w-10 h-10">
        <path d="M12 2c0 0-8 4-8 10a8 8 0 0 0 16 0c0-6-8-10-8-10z" />
        <path d="M12 12c0 0-3 1.5-3 4a3 3 0 0 0 6 0c0-2.5-3-4-3-4z" />
      </svg>
    ),
  },
  {
    num: "05",
    title: "Capacitaciones en altura",
    desc: "Formación certificada de operarios y brigadistas en trabajo seguro en altura. Metodología práctica con respaldo técnico IRATA.",
    tag: "Capacitación",
    color: "#0e4d7a",
    image: "/images/services/capacitaciones.jpg",
    imageAlt: "Capacitación con arneses — trabajo seguro en altura",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth={1.8} className="w-10 h-10">
        <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
        <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
      </svg>
    ),
  },
  {
    num: "06",
    title: "Prevención y rescate en altura",
    desc: "Servicios de prevención, asistencia y rescate en trabajos verticales. Operamos en industrias, consorcios y sector público de CABA, Zona Norte y Sur.",
    tag: "Rescate",
    color: "#E8721C",
    image: "/images/services/rescate-alturas.jpeg",
    imageAlt: "Iron Tower — prevención y rescate en espacio confinado",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth={1.8} className="w-10 h-10">
        <circle cx="12" cy="12" r="10" /><path d="M12 8v4l3 3" />
      </svg>
    ),
  },
];

export default function Services() {
  return (
    <section id="servicios" className="px-[5%] py-[100px]" style={{ background: "#f0f6fb" }}>
      <div className="max-w-[1200px] mx-auto">
        {/* Intro */}
        <div className="flex flex-wrap items-end justify-between gap-6 mb-12">
          <div>
            <span className="section-label">Nuestros servicios</span>
            <h2 className="section-title">Lo que hacemos<br />mejor que nadie.</h2>
          </div>
          <a href={WA_URL} target="_blank" rel="noopener noreferrer" className="btn-primary">
            Consultar por WhatsApp
          </a>
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((svc) => (
            <div
              key={svc.num}
              className="rounded-[4px] overflow-hidden shadow-[0_4px_24px_rgba(33,150,211,0.08)] bg-white flex flex-col"
            >
              {/* Photo top */}
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={svc.image}
                  alt={svc.imageAlt}
                  fill
                  className="object-cover transition-transform duration-500 hover:scale-105"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  loading="lazy"
                />
                {/* Number + icon */}
                <div className="absolute inset-0 flex items-end justify-between px-6 pb-4">
                  <span
                    className="font-condensed font-black text-white/20 leading-none select-none"
                    style={{ fontSize: "72px" }}
                  >
                    {svc.num}
                  </span>
                  <div className="text-white">{svc.icon}</div>
                </div>
              </div>

              {/* Body */}
              <div className="p-8 flex flex-col flex-1">
                <h3 className="font-condensed font-bold text-[22px] text-brand-ink mb-3">
                  {svc.title}
                </h3>
                <p className="font-body text-sm text-brand-mid leading-[1.7] mb-5 flex-1">
                  {svc.desc}
                </p>
                <span
                  className="inline-block font-body text-[12px] tracking-[0.08em] uppercase px-4 py-1.5 border-[1.5px] rounded-[2px] w-fit"
                  style={{ borderColor: svc.color, color: svc.color }}
                >
                  {svc.tag}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
