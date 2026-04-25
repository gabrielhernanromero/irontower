"use client";

import { useState } from "react";

const navLinks = [
  { label: "Inicio",          href: "#inicio" },
  { label: "Nosotros",        href: "#nosotros" },
  { label: "Servicios",       href: "#servicios" },
  { label: "Capacitaciones",  href: "#capacitaciones" },
  { label: "Blog",            href: "/blog" },
  { label: "Contacto",        href: "#contacto" },
];

const WA_URL =
  "https://wa.me/541127259135?text=Hola,%20quiero%20solicitar%20un%20presupuesto";

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <nav
        className="fixed top-0 left-0 right-0 z-[100] bg-white/97 backdrop-blur-[12px] border-b-2 border-brand-blue px-[5%] h-[68px] flex items-center justify-between"
        style={{ background: "rgba(255,255,255,0.97)" }}
      >
        {/* Logo */}
        <a href="#inicio" className="flex items-center gap-3">
          <div className="flex flex-col leading-none">
            <span className="font-condensed font-black text-brand-ink tracking-wide text-xl">
              IRON<span className="text-brand-orange">TOWER</span>
            </span>
            <span className="font-body text-brand-muted text-[10px] tracking-[0.2em] uppercase">
              Vertical Rope Work
            </span>
          </div>
        </a>

        {/* Links — desktop */}
        <ul className="hidden md:flex gap-8 list-none">
          {navLinks.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="font-condensed font-semibold text-[14px] tracking-[0.08em] uppercase text-brand-ink hover:text-brand-orange transition-colors duration-200"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <a
          href={WA_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="hidden md:inline-flex btn-primary"
        >
          Pedir presupuesto
        </a>

        {/* Hamburger */}
        <button
          className="md:hidden flex flex-col gap-[5px] cursor-pointer p-2"
          onClick={() => setOpen(!open)}
          aria-label={open ? "Cerrar menú" : "Abrir menú"}
        >
          <span
            className={`block w-6 h-[2px] transition-all duration-300 ${open ? "rotate-45 translate-y-[7px] bg-brand-ink" : "bg-brand-ink"}`}
          />
          <span
            className={`block w-6 h-[2px] bg-brand-ink transition-all duration-300 ${open ? "opacity-0" : ""}`}
          />
          <span
            className={`block w-6 h-[2px] transition-all duration-300 ${open ? "-rotate-45 -translate-y-[7px] bg-brand-ink" : "bg-brand-ink"}`}
          />
        </button>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div
          className="fixed top-[68px] left-0 right-0 bottom-0 z-[99] flex flex-col items-center justify-center gap-6"
          style={{ background: "linear-gradient(160deg, #0e4d7a 0%, #0a3a5c 50%, #0d4a78 100%)" }}
        >
          {navLinks.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="font-condensed font-bold text-[32px] uppercase text-white/90 hover:text-brand-orange transition-colors duration-200 tracking-widest"
            >
              {l.label}
            </a>
          ))}
          <a
            href={WA_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary mt-6"
            onClick={() => setOpen(false)}
          >
            Pedir presupuesto
          </a>
        </div>
      )}
    </>
  );
}
