"use client";

import { useState } from "react";
import { trackWhatsApp, trackContacto } from "@/lib/analytics";

const WA_BASE = "https://wa.me/541127259135?text=";

const contactItems = [
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.4 2 2 0 0 1 3.6 1.22h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L7.91 8.8a16 16 0 0 0 6.29 6.29l.95-.95a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
      </svg>
    ),
    label: "WhatsApp",
    value: "+54 11 2725-9135",
    href: "https://wa.me/541127259135",
    track: () => trackWhatsApp("tarjeta_contacto"),
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
        <polyline points="22,6 12,13 2,6" />
      </svg>
    ),
    label: "Email",
    value: "irontowerta@gmail.com",
    href: "mailto:irontowerta@gmail.com",
    track: () => trackContacto("email", "seccion_contacto"),
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
      </svg>
    ),
    label: "Instagram",
    value: "@irontowervrww",
    href: "https://instagram.com/irontowervrww",
    track: () => trackContacto("instagram", "seccion_contacto"),
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
        <circle cx="12" cy="10" r="3" />
      </svg>
    ),
    label: "Zona de cobertura",
    value: "Todo el país",
    href: null,
    track: null,
  },
];

const services = [
  "Limpieza de fachadas y cristales",
  "Montaje de torres de telecomunicaciones",
  "Puntos y líneas de anclaje",
  "Prevención de incendios",
  "Capacitaciones en altura",
  "Otro",
];

export default function Contact() {
  const [nombre, setNombre]   = useState("");
  const [empresa, setEmpresa] = useState("");
  const [servicio, setServicio] = useState("");
  const [mensaje, setMensaje] = useState("");

  function enviarWA(e: React.FormEvent) {
    e.preventDefault();
    trackWhatsApp("formulario_contacto", servicio || undefined);
    const text = encodeURIComponent(
      `Hola, soy ${nombre}${empresa ? ` de ${empresa}` : ""}. Quiero consultar sobre: ${servicio || "servicios en general"}. ${mensaje}`
    );
    window.open(`${WA_BASE}${text}`, "_blank");
  }

  const inputClass =
    "font-body text-brand-ink bg-white border border-white/30 rounded-[3px] px-4 py-3 text-sm w-full focus:outline-none focus:border-white transition-colors placeholder:text-white/40";

  return (
    <section id="contacto" className="px-[5%] py-[100px]" style={{ background: "linear-gradient(160deg, #0e4d7a 0%, #0a3a5c 50%, #0d4a78 100%)" }}>
      <div className="max-w-[1200px] mx-auto">
        <span className="section-label" style={{ color: "rgba(255,255,255,0.7)" }}>
          Contacto
        </span>
        <h2
          className="section-title mb-12"
          style={{ color: "#ffffff" }}
        >
          ¿Empezamos?
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">

          {/* Left — info */}
          <div>
            <h3 className="font-condensed font-bold text-2xl text-white mb-8">
              Escribinos directamente
            </h3>

            <div className="flex flex-col gap-5">
              {contactItems.map(({ icon, label, value, href, track }) => (
                <div key={label} className="flex items-start gap-4">
                  <div
                    className="w-10 h-10 flex items-center justify-center rounded-[2px] shrink-0 text-white"
                    style={{ background: "rgba(255,255,255,0.15)" }}
                  >
                    {icon}
                  </div>
                  <div>
                    <p className="font-condensed font-bold text-[11px] tracking-[0.1em] uppercase mb-1"
                      style={{ color: "rgba(255,255,255,0.7)" }}>
                      {label}
                    </p>
                    {href ? (
                      <a
                        href={href}
                        target={href.startsWith("http") ? "_blank" : undefined}
                        rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                        onClick={() => track?.()}
                        className="font-body text-white text-[16px] hover:text-brand-orange transition-colors duration-200"
                      >
                        {value}
                      </a>
                    ) : (
                      <p className="font-body text-white text-[16px]">{value}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* IRATA badge */}
            <div
              className="mt-10 p-6 border-l-4 border-white"
              style={{ background: "rgba(255,255,255,0.15)" }}
            >
              <p className="font-condensed font-black text-white text-xl uppercase mb-2">
                Certificación IRATA internacional
              </p>
              <p className="font-body text-sm" style={{ color: "rgba(255,255,255,0.75)" }}>
                Todos nuestros técnicos están certificados bajo los estándares
                internacionales de acceso por cuerdas, garantizando el más alto
                nivel de seguridad en cada trabajo.
              </p>
            </div>
          </div>

          {/* Right — form */}
          <div>
            <h3 className="font-condensed font-bold text-2xl text-white mb-8">
              Envianos tu consulta
            </h3>

            <form onSubmit={enviarWA} className="flex flex-col gap-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="flex flex-col gap-1.5">
                  <label className="font-condensed font-bold text-[11px] tracking-[0.1em] uppercase text-white/70">
                    Nombre y apellido
                  </label>
                  <input
                    type="text"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                    placeholder="Tu nombre"
                    className={inputClass}
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="font-condensed font-bold text-[11px] tracking-[0.1em] uppercase text-white/70">
                    Empresa / Edificio
                  </label>
                  <input
                    type="text"
                    value={empresa}
                    onChange={(e) => setEmpresa(e.target.value)}
                    placeholder="Nombre del consorcio o empresa"
                    className={inputClass}
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="font-condensed font-bold text-[11px] tracking-[0.1em] uppercase text-white/70">
                  Servicio de interés
                </label>
                <select
                  value={servicio}
                  onChange={(e) => setServicio(e.target.value)}
                  className={inputClass}
                >
                  <option value="">Seleccioná un servicio</option>
                  {services.map((s) => <option key={s}>{s}</option>)}
                </select>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="font-condensed font-bold text-[11px] tracking-[0.1em] uppercase text-white/70">
                  Mensaje
                </label>
                <textarea
                  rows={4}
                  value={mensaje}
                  onChange={(e) => setMensaje(e.target.value)}
                  placeholder="Contanos de qué se trata tu proyecto..."
                  className={`${inputClass} resize-none`}
                />
              </div>

              <button
                type="submit"
                className="btn-primary justify-center w-full mt-2"
                style={{ fontSize: "15px", padding: "16px 28px" }}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                Enviar por WhatsApp
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
