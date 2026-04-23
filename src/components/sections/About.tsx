const valores = [
  "Técnicos certificados IRATA nivel 1, 2 y 3",
  "Equipo multidisciplinario en telecomunicaciones, fachadas e incendios",
  "Proyectos en CABA, Zona Norte y Zona Sur",
  "Empresa joven con trayectoria consolidada",
];

export default function About() {
  return (
    <section className="px-[5%] py-[100px]" style={{ background: "#f0f6fb" }}>
      <div className="max-w-[1100px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">

          {/* Left — content */}
          <div>
            <span className="section-label">Sobre Iron Tower</span>
            <h2 className="section-title">
              Jóvenes en altura,<br />sólidos en tierra.
            </h2>
            <p className="section-sub mb-8">
              Aunque somos una empresa emergente, combinamos juventud y trayectoria.
              Nuestro equipo técnico multidisciplinario enfrenta cada proyecto con
              profesionalismo, agilidad y visión moderna.
            </p>

            {/* Checkmarks */}
            <ul className="flex flex-col gap-4 mb-10">
              {valores.map((v) => (
                <li key={v} className="flex items-start gap-3">
                  <svg
                    width="18" height="18" viewBox="0 0 24 24"
                    fill="none" stroke="#E8721C" strokeWidth={2.5}
                    className="shrink-0 mt-0.5"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  <span className="font-body text-sm text-brand-mid leading-snug">{v}</span>
                </li>
              ))}
            </ul>

            <a
              href="https://wa.me/541127259135?text=Hola,%20quiero%20conocer%20m%C3%A1s%20sobre%20Iron%20Tower"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
            >
              Contactar al equipo
            </a>
          </div>

          {/* Right — visual card */}
          <div className="relative">
            <div
              className="rounded-[4px] p-10"
              style={{ background: "#0a3a5c" }}
            >
              {/* Header */}
              <div className="flex items-center gap-4 mb-6">
                <div
                  className="w-12 h-12 flex items-center justify-center rounded-[3px]"
                  style={{ background: "#E8721C" }}
                >
                  <span className="font-condensed font-black text-white text-lg">IT</span>
                </div>
                <div>
                  <p className="font-condensed font-black text-white text-lg tracking-wide">
                    IRON<span style={{ color: "#E8721C" }}>TOWER</span>
                  </p>
                  <p className="font-body text-white/50 text-xs tracking-[0.2em] uppercase">
                    Vertical Rope Work
                  </p>
                </div>
              </div>

              <div className="h-[1px] mb-6" style={{ background: "rgba(232,114,28,0.3)" }} />

              {/* Stats */}
              <div className="flex flex-col gap-5">
                {[
                  { num: "5+",    label: "Años en el mercado" },
                  { num: "99+",   label: "Proyectos completados" },
                  { num: "1000+", label: "Capacitaciones dictadas" },
                ].map(({ num, label }) => (
                  <div key={num} className="flex items-center gap-5">
                    <span
                      className="font-condensed font-black text-3xl w-20 shrink-0"
                      style={{ color: "#E8721C" }}
                    >
                      {num}
                    </span>
                    <span className="font-body text-white/70 text-sm leading-snug">{label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Badge */}
            <div
              className="absolute -bottom-5 -right-5 font-condensed font-bold text-[13px] tracking-[0.08em] uppercase text-white px-6 py-4"
              style={{ background: "#E8721C" }}
            >
              <p>Empresa emergente</p>
              <p className="text-white/80 font-normal text-xs mt-0.5 tracking-normal">
                con experiencia consolidada
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
