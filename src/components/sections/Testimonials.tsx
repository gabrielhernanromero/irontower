const testimonials = [
  {
    text: "Contratamos a Iron Tower para la limpieza de la fachada del edificio y el resultado fue excelente. Los técnicos son muy profesionales, trabajan con toda la seguridad del caso y el precio fue muy competitivo.",
    author: "Marcelo V.",
    role: "Administrador de consorcio — Zona Norte, GBA",
  },
  {
    text: "Nos dieron la capacitación de brigadistas para todo el consorcio. Muy dinámica, práctica y con mucho conocimiento. Los recomendaría sin dudarlo a cualquier administrador.",
    author: "Graciela M.",
    role: "Administradora de edificio — CABA",
  },
  {
    text: "Trabajamos con Iron Tower en el montaje de infraestructura de telecomunicaciones. Equipo confiable, certificado IRATA, y con total cumplimiento de los protocolos de seguridad. Un socio estratégico real.",
    author: "Sebastián R.",
    role: "Supervisor de operaciones — Empresa de telecomunicaciones",
  },
];

export default function Testimonials() {
  return (
    <section id="testimonios" className="bg-white px-[5%] py-[100px]">
      <div className="max-w-[1200px] mx-auto">
        <span className="section-label">Lo que dicen de nosotros</span>
        <h2 className="section-title">
          Confianza ganada<br />proyecto a proyecto.
        </h2>

        <div
          className="grid mt-12 gap-6"
          style={{ gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))" }}
        >
          {testimonials.map(({ text, author, role }) => (
            <div
              key={author}
              className="p-10 rounded-[4px] border"
              style={{ background: "#f0f6fb", borderColor: "#d0e8f7" }}
            >
              {/* Quote mark */}
              <span
                className="font-condensed font-black leading-none block mb-3"
                style={{ fontSize: "48px", color: "#E8721C", lineHeight: 0.5, marginBottom: "20px" }}
              >
                &#8220;
              </span>
              <p className="font-body text-[16px] text-brand-mid leading-[1.7] mb-6">{text}</p>
              <div>
                <p className="font-condensed font-bold text-[16px] text-brand-ink">{author}</p>
                <p className="font-body text-[13px]" style={{ color: "#E8721C" }}>{role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
