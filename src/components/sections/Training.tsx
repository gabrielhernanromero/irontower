const cards = [
  {
    title: "Trabajo seguro en altura",
    desc: "Capacitación teórico-práctica certificada para operarios y técnicos que realicen tareas en altura. Incluye uso de EPP, sistemas de detención y procedimientos de emergencia.",
    wa: "Hola,%20quiero%20info%20sobre%20capacitaci%C3%B3n%20en%20altura",
  },
  {
    title: "Uso y manejo de extintores",
    desc: "Taller práctico sobre identificación, operación y mantenimiento de matafuegos. Ideal para brigadistas de consorcios, comercios e industrias. Incluye simulacros reales.",
    wa: "Hola,%20quiero%20info%20sobre%20capacitaci%C3%B3n%20de%20extintores",
  },
  {
    title: "Formación de brigadistas",
    desc: "Formación completa de líderes de brigada y brigadistas de consorcios. Incluye carga de fuego, plan de evacuación, combate de incendio y extinción sobre acumuladores de litio.",
    wa: "Hola,%20quiero%20info%20sobre%20formaci%C3%B3n%20de%20brigadistas",
  },
  {
    title: "Acceso por cuerdas IRATA",
    desc: "Formación de técnicos en acceso por cuerdas bajo estándares IRATA. Identificación, control y eliminación de riesgos latentes en actividades verticales. Niveles 1, 2 y 3.",
    wa: "Hola,%20quiero%20info%20sobre%20formaci%C3%B3n%20IRATA",
  },
];

export default function Training() {
  return (
    <section id="capacitaciones" className="px-[5%] py-[100px]" style={{ background: "linear-gradient(160deg, #0e4d7a 0%, #0a3a5c 50%, #0d4a78 100%)" }}>
      <div className="max-w-[1100px] mx-auto">
        <span className="section-label" style={{ color: "rgba(255,255,255,0.7)" }}>
          Formación técnica
        </span>
        <h2 className="section-title" style={{ color: "#ffffff" }}>
          Capacitaciones<br />que salvan vidas.
        </h2>
        <p className="section-sub" style={{ color: "rgba(255,255,255,0.75)", marginBottom: 0 }}>
          Más de 1.000 capacitaciones dictadas. Formamos equipos en todo lo que
          necesita su edificio, consorcio o industria.
        </p>

        <div
          className="grid mt-14 gap-[2px]"
          style={{ gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))" }}
        >
          {cards.map(({ title, desc, wa }) => (
            <div
              key={title}
              className="px-8 py-10"
              style={{
                background: "rgba(255,255,255,0.08)",
                borderTop: "3px solid rgba(255,255,255,0.2)",
              }}
            >
              <h3 className="font-condensed font-bold text-xl text-white mb-4">{title}</h3>
              <p className="font-body text-sm leading-[1.7] mb-6" style={{ color: "rgba(255,255,255,0.7)" }}>
                {desc}
              </p>
              <a
                href={`https://wa.me/541127259135?text=${wa}`}
                target="_blank"
                rel="noopener noreferrer"
                className="font-condensed font-bold text-[13px] tracking-[0.1em] uppercase text-white pb-1 border-b-2 transition-colors duration-200 hover:border-white"
                style={{ borderColor: "rgba(255,255,255,0.4)" }}
              >
                Consultar →
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
