"use client";

import Image from "next/image";

const clients = [
  {
    name: "Trenes Argentinos",
    category: "Transporte público",
    logo: "/images/clients/trenes-argentinos.png",
    logoBg: "#ffffff",
  },
  {
    name: "AVN",
    category: "Telecomunicaciones",
    logo: "/images/clients/avn.png",
    logoBg: "#f5f5f5",
  },
  {
    name: "Albano Ozzuol",
    category: "Administración de edificios",
    logo: "/images/clients/ozzuol.png",
    logoBg: "#ffffff",
  },
  {
    name: "Casiba",
    category: "Aire Optimo",
    logo: "/images/clients/casiba.png",
    logoBg: "#ffffff",
  },
];

export default function Industries() {
  return (
    <section id="clientes" className="px-[5%] py-[100px]" style={{ background: "linear-gradient(160deg, #0e4d7a 0%, #0a3a5c 50%, #0d4a78 100%)" }}>
      <div className="max-w-[1200px] mx-auto">
        <span className="section-label" style={{ color: "rgba(255,255,255,0.6)" }}>
          Empresas que confían en nosotros
        </span>
        <h2 className="section-title" style={{ color: "#ffffff" }}>
          Nuestros clientes.
        </h2>
        <p className="section-sub mb-14" style={{ color: "rgba(255,255,255,0.6)" }}>
          Trabajamos con empresas e instituciones que exigen el más alto nivel
          de seguridad y profesionalismo.
        </p>

        <div
          className="grid gap-[2px]"
          style={{ gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))" }}
        >
          {clients.map(({ name, category, logo, logoBg }) => (
            <div
              key={name}
              className="flex flex-col items-center justify-center gap-4 px-8 py-10 transition-colors duration-300"
              style={{ background: "#f0f6fb", border: "1px solid #d0e8f7" }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLDivElement).style.background = "#e3f0f9";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLDivElement).style.background = "#f0f6fb";
              }}
            >
              {/* Logo */}
              <div
                className="w-full flex items-center justify-center rounded-[4px] py-4 px-6 min-h-[80px]"
                style={{ background: logoBg }}
              >
                <div className="relative w-full h-[60px]">
                  <Image
                    src={logo}
                    alt={`Logo de ${name}`}
                    fill
                    className="object-contain"
                    sizes="220px"
                  />
                </div>
              </div>

              {/* Name */}
              <div className="text-center">
                <p className="font-condensed font-bold text-brand-ink text-[15px]">{name}</p>
                <p className="font-body text-brand-mid text-xs mt-1">{category}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Frase confianza */}
        <div
          className="mt-[2px] px-10 py-8 text-center"
          style={{ background: "#E8721C" }}
        >
          <p className="font-condensed font-black text-white text-2xl uppercase tracking-wide">
            Ellos confían en Iron Tower. Vos también podés.
          </p>
          <a
            href="https://wa.me/541127259135?text=Hola,%20quiero%20trabajar%20con%20Iron%20Tower"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block mt-4 font-condensed font-bold text-[13px] tracking-[0.12em] uppercase text-white border-b-2 border-white/50 hover:border-white pb-0.5 transition-colors duration-200"
          >
            Contactar →
          </a>
        </div>
      </div>
    </section>
  );
}
