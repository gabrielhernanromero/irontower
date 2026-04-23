import Image from "next/image";

const photos = [
  {
    src: "/images/trabajo-altura.jpg",
    alt: "Trabajo en altura — técnico Iron Tower con arnés en fachada",
    label: "Trabajos en altura",
    wide: true,
  },
  {
    src: "/images/capacitacion-arneses.jpg",
    alt: "Capacitación con arneses de seguridad — equipo Iron Tower",
    label: "Capacitaciones",
    wide: false,
  },
  {
    src: "/images/guardia-incendios.jpg",
    alt: "Guardia contra incendios Iron Tower — combate con manguera",
    label: "Guardia Contra Incendios",
    wide: false,
  },
  {
    src: "/images/brigadista-equipos.jpg",
    alt: "Brigadista Iron Tower revisando armario de equipos de emergencia",
    label: "Brigadas de emergencia",
    wide: false,
  },
  {
    src: "/images/operarios-industria.jpg",
    alt: "Operarios Iron Tower en planta industrial con chalecos reflectivos",
    label: "Industria",
    wide: false,
  },
  {
    src: "/images/espacio-confinado.jpg",
    alt: "Técnicos Iron Tower trabajando en espacio confinado",
    label: "Espacios confinados",
    wide: false,
  },
];

export default function Gallery() {
  return (
    <section className="px-[5%] py-[100px]" style={{ background: "#1a2d42" }}>
      <div className="max-w-[1200px] mx-auto">
        <span className="section-label">Trabajos realizados</span>
        <h2 className="section-title mb-12" style={{ color: "#ffffff" }}>
          En acción.
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
          {photos.map((photo, i) => (
            <div
              key={photo.src}
              className={`relative overflow-hidden rounded-[4px] group bg-brand-dark ${
                i === 0 ? "row-span-2" : ""
              }`}
              style={{
                aspectRatio: i === 0 ? undefined : "4/3",
                minHeight: i === 0 ? "400px" : "200px",
              }}
            >
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width: 768px) 50vw, 33vw"
                loading="lazy"
              />
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300" />
              {/* Label */}
              <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-2 group-hover:translate-y-0 opacity-80 group-hover:opacity-100 transition-all duration-300">
                <span
                  className="inline-block font-condensed font-bold text-[11px] tracking-[0.12em] uppercase text-white px-3 py-1.5"
                  style={{ background: "#E8721C" }}
                >
                  {photo.label}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
