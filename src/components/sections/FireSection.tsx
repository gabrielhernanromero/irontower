const items = [
  "Informes de carga de fuego y evaluación de riesgos",
  "Habilitación de locales comerciales e industrias",
  "Charlas y capacitaciones sobre uso de matafuegos",
  "Planes de evacuación y simulacros",
  "Extinción de incendio en acumuladores de litio",
];

const WA_URL =
  "https://wa.me/541127259135?text=Hola,%20necesito%20info%20sobre%20prevenci%C3%B3n%20de%20incendios";

export default function FireSection() {
  return (
    <section className="px-[5%] py-[100px]" style={{ background: "#f0f6fb" }}>
      <div className="max-w-[1100px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">

          {/* Left — content */}
          <div>
            <span className="section-label">Prevención de incendios</span>
            <h2 className="section-title">
              GCI — Guardia<br />Contra Incendios.
            </h2>
            <p className="font-body text-brand-mid leading-[1.7] text-[16px] mb-2">
              Habilitamos locales e industrias, gestionamos informes técnicos y preparamos
              a tu equipo. Todo lo que tu edificio necesita para estar en regla.
            </p>

            <ul className="flex flex-col gap-3 my-8">
              {items.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <svg
                    width="18" height="18" viewBox="0 0 24 24"
                    fill="none" stroke="#E8721C" strokeWidth={2}
                    className="shrink-0 mt-0.5"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  <span className="font-body text-sm text-brand-mid leading-snug">{item}</span>
                </li>
              ))}
            </ul>

            <a href={WA_URL} target="_blank" rel="noopener noreferrer" className="btn-primary">
              Consultar por WhatsApp
            </a>
          </div>

          {/* Right — visual */}
          <div className="relative">
            <div
              className="rounded-[4px] p-10 flex flex-col gap-6"
              style={{ background: "#0a3a5c" }}
            >
              {/* Icon */}
              <div
                className="w-16 h-16 flex items-center justify-center rounded-[3px]"
                style={{ background: "rgba(232,114,28,0.15)" }}
              >
                <svg
                  width="36" height="36" viewBox="0 0 24 24"
                  fill="none" stroke="#E8721C" strokeWidth={1.6}
                >
                  <path d="M12 2c0 0-8 4-8 10a8 8 0 0 0 16 0c0-6-8-10-8-10z" />
                  <path d="M12 12c0 0-3 1.5-3 4a3 3 0 0 0 6 0c0-2.5-3-4-3-4z" />
                </svg>
              </div>

              <div>
                <p className="font-condensed font-black text-white text-2xl mb-2">
                  Guardia Contra Incendios
                </p>
                <p className="font-body text-white/60 text-sm leading-[1.7]">
                  Servicio integral de prevención, habilitación y capacitación.
                  Cumplimiento normativo garantizado.
                </p>
              </div>

              <div className="h-[1px]" style={{ background: "rgba(232,114,28,0.3)" }} />

              {/* Highlights */}
              {[
                "Inspecciones certificadas",
                "Informes técnicos oficiales",
                "Capacitación de brigadistas",
                "Cobertura CABA y GBA",
              ].map((h) => (
                <div key={h} className="flex items-center gap-3">
                  <div
                    className="w-1.5 h-1.5 rounded-full shrink-0"
                    style={{ background: "#E8721C" }}
                  />
                  <span className="font-body text-white/70 text-sm">{h}</span>
                </div>
              ))}
            </div>

            {/* Orange accent */}
            <div
              className="absolute -top-4 -right-4 font-condensed font-bold text-white text-[12px] tracking-[0.1em] uppercase px-5 py-3"
              style={{ background: "#E8721C" }}
            >
              Certificación oficial
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
