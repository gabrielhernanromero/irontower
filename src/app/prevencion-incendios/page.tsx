import type { Metadata } from "next";
import ServicePage from "@/components/layout/ServicePage";

export const metadata: Metadata = {
  title: "Prevención de Incendios y Habilitación de Locales | Iron Tower Argentina",
  description:
    "Informes de carga de fuego, habilitación de locales comerciales e industrias, planes de evacuación y señalética. Cumplimiento normativo total en toda la Argentina.",
  keywords: [
    "prevención incendios Argentina",
    "habilitación local comercial incendios",
    "informe carga de fuego industria",
    "habilitación comercio prevención incendios Buenos Aires",
    "plan de evacuación empresa Argentina",
    "señalética evacuación incendios",
    "matafuego habilitación comercio",
  ],
  openGraph: {
    title: "Prevención de Incendios y Habilitación Comercial — Iron Tower",
    description:
      "Informe de carga de fuego, habilitación de locales e industrias y planes de evacuación en toda la Argentina.",
    url: "https://www.irontowervrw.com.ar/prevencion-incendios",
    type: "website",
  },
  alternates: { canonical: "https://www.irontowervrw.com.ar/prevencion-incendios" },
};

const schema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Prevención de Incendios y Habilitación de Locales",
  description:
    "Informes de carga de fuego, habilitación de locales comerciales e industrias, planes de evacuación y señalética en toda la Argentina.",
  provider: {
    "@type": "Organization",
    name: "Iron Tower — Vertical Rope Work",
    url: "https://www.irontowervrw.com.ar",
    telephone: "+54-11-2725-9135",
  },
  areaServed: "Argentina",
  serviceType: "Prevención de incendios y habilitación comercial",
};

export default function PrevencionIncendiosPage() {
  return (
    <ServicePage
      badge="Prevención de incendios"
      h1={"Prevención de incendios\ny habilitación de locales"}
      lead="¿Necesitás habilitar tu local, industria o edificio? Realizamos informes de carga de fuego, planes de evacuación y toda la documentación requerida por las autoridades municipales y provinciales de toda la Argentina."
      image="/images/services/gci-incendios.jpg"
      imageAlt="Equipo Iron Tower en servicio de prevención de incendios — habilitación de locales comerciales Argentina"
      waText="Hola, quiero consultar sobre prevención de incendios y habilitación de local"
      schema={schema}
      body={
        <>
          <h2>¿Qué necesitás para habilitar tu local o industria?</h2>
          <p>
            La habilitación de locales comerciales, industrias y edificios en Argentina
            requiere cumplir con la normativa de prevención de incendios vigente. Esto
            incluye el cálculo de carga de fuego, la instalación de matafuegos adecuados,
            la señalética de evacuación, la iluminación de emergencia y, en algunos casos,
            un sistema automático de detección y supresión de incendios.
          </p>
          <h2>Servicios de prevención de incendios que ofrecemos</h2>
          <ul>
            <li>Informe técnico de carga de fuego para habilitación municipal</li>
            <li>Plano de medios de escape y señalética de evacuación</li>
            <li>Plan de evacuación y manual de procedimientos de emergencia</li>
            <li>Capacitación de brigadas internas de prevención de incendios</li>
            <li>Instalación, recarga y mantenimiento de matafuegos</li>
            <li>Auditoría de cumplimiento normativo para industrias</li>
          </ul>
          <h2>¿Por qué es importante cumplir con la normativa de incendios?</h2>
          <p>
            El incumplimiento de la normativa de prevención de incendios puede resultar en
            la clausura inmediata del establecimiento, multas significativas y, en caso de
            siniestro, responsabilidad penal para el propietario o administrador. Además,
            las aseguradoras pueden rechazar siniestros si el local no cumplía con los
            requisitos de prevención.
          </p>
          <p>
            En Iron Tower gestionamos toda la documentación necesaria para que tu local
            esté habilitado y en regla, sin que tengas que preocuparte por los trámites.
          </p>
        </>
      }
      steps={[
        { n: "01", title: "Diagnóstico normativo", desc: "Evaluamos tu local o industria para identificar qué documentación y medidas se requieren según la actividad y la jurisdicción." },
        { n: "02", title: "Informe de carga de fuego", desc: "Calculamos la carga de fuego del establecimiento y elaboramos el informe técnico requerido por las autoridades." },
        { n: "03", title: "Plan y señalética", desc: "Diseñamos el plan de evacuación, el plano de medios de escape y gestionamos la señalética e iluminación de emergencia." },
        { n: "04", title: "Tramitación y entrega", desc: "Entregamos la documentación completa lista para presentar ante el organismo correspondiente para la habilitación." },
      ]}
      faqs={[
        {
          q: "¿Qué es el informe de carga de fuego y cuándo lo necesito?",
          a: "Es un documento técnico que calcula la cantidad de material combustible por metro cuadrado en tu local o industria, y determina qué medidas de protección contra incendios son necesarias. Lo necesitás para habilitar cualquier local comercial, industrial o de servicios.",
        },
        {
          q: "¿Cuánto tarda el trámite de habilitación por incendios?",
          a: "El informe técnico lo entregamos en 5 a 10 días hábiles. El tiempo de aprobación por parte del municipio o la autoridad correspondiente varía según la jurisdicción, pero habiendo presentado toda la documentación correcta, el proceso suele ser rápido.",
        },
        {
          q: "¿Sirve para cualquier tipo de local o industria?",
          a: "Sí. Trabajamos con locales comerciales, restaurants, depósitos, industrias, edificios de propiedad horizontal, shoppings y organismos públicos. Cada caso tiene sus requisitos específicos y los abordamos de forma personalizada.",
        },
        {
          q: "¿Qué pasa si me clausuran por incumplimiento de normativa de incendios?",
          a: "La clausura puede ser inmediata si las condiciones representan un riesgo grave. Contactanos de urgencia y evaluamos cuáles son los requisitos mínimos para levantar la clausura lo antes posible.",
        },
        {
          q: "¿Hacen la capacitación de brigadas de incendio in situ?",
          a: "Sí. Ofrecemos capacitaciones para brigadas internas de prevención de incendios directamente en las instalaciones del cliente. La capacitación incluye teoría, uso de matafuegos y práctica de evacuación.",
        },
      ]}
    />
  );
}
