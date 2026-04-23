"use client";

const navLinks = [
  { label: "Inicio",         href: "#inicio" },
  { label: "Nosotros",       href: "#nosotros" },
  { label: "Servicios",      href: "#servicios" },
  { label: "Capacitaciones", href: "#capacitaciones" },
  { label: "Contacto",       href: "#contacto" },
];

const contactLinks = [
  {
    label: "+54 11 2725-9135",
    href: "tel:+541127259135",
  },
  {
    label: "irontowerta@gmail.com",
    href: "mailto:irontowerta@gmail.com",
  },
  {
    label: "@irontowervrww",
    href: "https://instagram.com/irontowervrww",
  },
];

const year = new Date().getFullYear();

export default function Footer() {
  return (
    <footer className="text-white px-[5%] pt-[72px] pb-10" style={{ background: "linear-gradient(160deg, #0e4d7a 0%, #0a3a5c 50%, #0d4a78 100%)" }}>
      <div className="max-w-[1200px] mx-auto">

        {/* Top grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16 pb-12 border-b border-white/10">

          {/* Brand */}
          <div className="md:col-span-1">
            <p className="font-condensed font-black text-2xl tracking-wide mb-1">
              IRON<span style={{ color: "#E8721C" }}>TOWER</span>
            </p>
            <p className="font-body text-white/40 text-xs tracking-[0.2em] uppercase mb-5">
              Vertical Rope Work
            </p>
            <p className="font-body text-white/60 text-sm leading-[1.7] max-w-[280px]">
              Especialistas en trabajos en altura con certificación IRATA.
              Seguridad, técnica y compromiso en cada proyecto.
            </p>

            {/* Social */}
            <div className="flex gap-3 mt-5">
              <a
                href="https://instagram.com/irontowervrww"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram de Iron Tower"
                className="w-9 h-9 flex items-center justify-center rounded-[3px] transition-colors duration-200"
                style={{ background: "rgba(255,255,255,0.08)" }}
                onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.background = "#E8721C")}
                onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.background = "rgba(255,255,255,0.08)")}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                </svg>
              </a>
              <a
                href="https://wa.me/541127259135"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp de Iron Tower"
                className="w-9 h-9 flex items-center justify-center rounded-[3px] transition-colors duration-200"
                style={{ background: "rgba(255,255,255,0.08)" }}
                onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.background = "#E8721C")}
                onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.background = "rgba(255,255,255,0.08)")}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="font-condensed font-bold text-[12px] tracking-[0.15em] uppercase mb-5"
              style={{ color: "rgba(255,255,255,0.5)" }}>
              Navegación
            </h4>
            <nav className="flex flex-col gap-2.5">
              {navLinks.map(({ label, href }) => (
                <a
                  key={href}
                  href={href}
                  className="font-body text-sm transition-colors duration-200"
                  style={{ color: "rgba(255,255,255,0.6)" }}
                  onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = "#fff")}
                  onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = "rgba(255,255,255,0.6)")}
                >
                  {label}
                </a>
              ))}
            </nav>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-condensed font-bold text-[12px] tracking-[0.15em] uppercase mb-5"
              style={{ color: "rgba(255,255,255,0.5)" }}>
              Contacto
            </h4>
            <div className="flex flex-col gap-2.5">
              {contactLinks.map(({ label, href }) => (
                <a
                  key={href}
                  href={href}
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="font-body text-sm transition-colors duration-200"
                  style={{ color: "rgba(255,255,255,0.6)" }}
                  onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = "#fff")}
                  onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = "rgba(255,255,255,0.6)")}
                >
                  {label}
                </a>
              ))}
              <p className="font-body text-sm" style={{ color: "rgba(255,255,255,0.6)" }}>
                CABA · Zona Norte · Zona Sur
              </p>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="font-body text-xs" style={{ color: "rgba(255,255,255,0.35)" }}>
            © {year} Iron Tower — Vertical Rope Work. Todos los derechos reservados.
          </p>
          <p className="font-condensed font-bold text-[11px] tracking-[0.15em] uppercase"
            style={{ color: "rgba(255,255,255,0.35)" }}>
            Certificación IRATA · Buenos Aires, Argentina
          </p>
        </div>
      </div>

      {/* WhatsApp floating button */}
      <a
        href="https://wa.me/541127259135?text=Hola,%20quiero%20consultar%20sobre%20sus%20servicios"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Contactar por WhatsApp"
        className="fixed bottom-6 right-6 z-50 w-14 h-14 flex items-center justify-center rounded-full shadow-lg transition-transform duration-200 hover:scale-110"
        style={{ background: "#25D366" }}
      >
        <svg width="28" height="28" viewBox="0 0 24 24" fill="white" aria-hidden="true">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
      </a>
    </footer>
  );
}
