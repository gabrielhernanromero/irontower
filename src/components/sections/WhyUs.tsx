const reasons = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-8 h-8 text-brand-blue">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
    title: "Certificación IRATA",
    desc: "Todos nuestros técnicos cuentan con certificación internacional IRATA (International Rope Access Trade Association), el estándar más alto del mundo en acceso por cuerdas.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-8 h-8 text-brand-blue">
        <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
      </svg>
    ),
    title: "Respuesta rápida",
    desc: "Nos adaptamos a las necesidades cambiantes de cada cliente. Brindamos soluciones personalizadas con agilidad y visión moderna para cada proyecto.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-8 h-8 text-brand-blue">
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
      </svg>
    ),
    title: "Equipo multidisciplinario",
    desc: "Contamos con técnicos altamente calificados en telecomunicaciones, prevención de incendios, trabajos en altura y limpieza de fachadas bajo un mismo paraguas operativo.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-8 h-8 text-brand-blue">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
    title: "Atención personalizada",
    desc: "Tu satisfacción es nuestra prioridad. Acompañamos cada proyecto desde la consulta inicial hasta la entrega final, con total transparencia y comunicación directa.",
  },
];

export default function WhyUs() {
  return (
    <section id="nosotros" className="bg-white px-[5%] py-[100px]">
      <div className="max-w-[1200px] mx-auto">
        <span className="section-label">¿Por qué elegirnos?</span>
        <h2 className="section-title">
          Seguridad, técnica<br />y compromiso.
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
          {reasons.map(({ icon, title, desc }) => (
            <div
              key={title}
              className="p-10 rounded-[4px] border"
              style={{ background: "#f0f6fb", borderColor: "#d0e8f7" }}
            >
              <div className="mb-5">{icon}</div>
              <h3 className="font-condensed font-bold text-xl text-brand-ink mb-3">{title}</h3>
              <p className="font-body text-sm text-brand-mid leading-[1.7]">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
