declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

function trackEvent(name: string, params: Record<string, string | number>) {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", name, params);
  }
}

/** Click en cualquier botón de WhatsApp */
export function trackWhatsApp(ubicacion: string, servicio?: string) {
  trackEvent("whatsapp_click", {
    ubicacion,
    ...(servicio ? { servicio } : {}),
  });
}

/** Click en teléfono, email o Instagram */
export function trackContacto(tipo: "telefono" | "email" | "instagram", ubicacion: string) {
  trackEvent("contact_click", { tipo, ubicacion });
}

/** Hito de lectura de un artículo del blog */
export function trackLectura(slug: string, titulo: string, porcentaje: number) {
  trackEvent("blog_reading_milestone", { articulo: slug, titulo, porcentaje });
}

/** Click en link de navegación del header */
export function trackNavClick(seccion: string) {
  trackEvent("nav_click", { seccion });
}
