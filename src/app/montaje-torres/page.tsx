import type { Metadata } from "next";
import ServicePage from "@/components/layout/ServicePage";

export const metadata: Metadata = {
  title: "Montaje de Torres de Telecomunicaciones | Iron Tower Argentina",
  description:
    "Iron Tower instala, mantiene y repara torres de telecomunicaciones en toda la Argentina. Técnicos certificados IRATA. Presupuesto sin costo.",
  keywords: [
    "montaje torres telecomunicaciones Argentina",
    "instalación torres telecomunicaciones",
    "mantenimiento torres antenas Argentina",
    "empresa montaje torres certificada IRATA",
    "instalación antenas edificios",
    "trabajo en altura torres Argentina",
  ],
  openGraph: {
    title: "Montaje de Torres de Telecomunicaciones — Iron Tower",
    description:
      "Instalación y mantenimiento de torres de telecomunicaciones en toda la Argentina. Técnicos IRATA certificados.",
    url: "https://www.irontowerarg.com/montaje-torres",
    type: "website",
  },
  alternates: { canonical: "https://www.irontowerarg.com/montaje-torres" },
};

const schema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Montaje de Torres de Telecomunicaciones",
  description:
    "Instalación, mantenimiento y reparación de torres de telecomunicaciones en toda la Argentina. Técnicos certificados IRATA.",
  provider: {
    "@type": "Organization",
    name: "Iron Tower — Vertical Rope Work",
    url: "https://www.irontowerarg.com",
    telephone: "+54-11-2725-9135",
  },
  areaServed: "Argentina",
  serviceType: "Montaje de torres de telecomunicaciones",
};

export default function MontajeTorresPage() {
  return (
    <ServicePage
      badge="Telecomunicaciones"
      h1={"Montaje de torres de\ntecomunicaciones en Argentina"}
      lead="Instalamos, mantenemos y reparamos torres de telecomunicaciones en todo el país. Nuestros técnicos certificados IRATA garantizan trabajo seguro y resultados de primer nivel."
      image="/images/services/montaje-torres.jpg"
      imageAlt="Técnico Iron Tower en montaje de torre de telecomunicaciones — trabajo en altura certificado Argentina"
      waText="Hola, quiero consultar sobre montaje de torres de telecomunicaciones"
      schema={schema}
      body={
        <>
          <h2>Empresa especializada en torres de telecomunicaciones</h2>
          <p>
            Iron Tower es una empresa argentina especializada en trabajos verticales con más de
            una década de experiencia en el sector de las telecomunicaciones. Nuestros técnicos
            certificados IRATA niveles 1, 2 y 3 ejecutan proyectos de montaje de torres en
            todo el territorio nacional, desde edificios residenciales hasta instalaciones
            industriales y zonas de difícil acceso.
          </p>
          <h2>¿Qué incluye el servicio de montaje de torres?</h2>
          <ul>
            <li>Instalación de nuevas torres de telecomunicaciones desde cero</li>
            <li>Montaje de antenas y equipos de comunicación en estructuras existentes</li>
            <li>Mantenimiento preventivo y correctivo de torres</li>
            <li>Inspección técnica y diagnóstico de estado estructural</li>
            <li>Reparación de componentes dañados por condiciones climáticas o vandalismo</li>
            <li>Trabajos en altura a cualquier nivel: edificios, silos, chimeneas, mástiles</li>
          </ul>
          <h2>¿Por qué contratar técnicos certificados IRATA?</h2>
          <p>
            La certificación IRATA (Industrial Rope Access Trade Association) es el estándar
            internacional más exigente para trabajos en altura. Un técnico certificado IRATA
            no solo sabe ejecutar el trabajo: sabe gestionar emergencias, usar correctamente
            el equipo de protección personal y trabajar dentro de protocolos de seguridad
            que minimizan el riesgo al mínimo absoluto.
          </p>
          <p>
            Contratar empresas sin certificación en trabajos de torre puede resultar en
            accidentes graves, responsabilidad legal para el contratante y trabajos mal
            ejecutados que requieren reparaciones costosas. En Iron Tower, cada trabajo está
            respaldado por la documentación técnica correspondiente.
          </p>
        </>
      }
      steps={[
        { n: "01", title: "Relevamiento del sitio", desc: "Evaluamos la estructura, altura, acceso y condiciones del entorno antes de planificar el trabajo." },
        { n: "02", title: "Plan de trabajo y seguridad", desc: "Elaboramos el Análisis de Seguridad en el Trabajo (AST) y coordinamos con el cliente los tiempos y accesos." },
        { n: "03", title: "Ejecución certificada", desc: "Nuestros técnicos IRATA ejecutan el montaje con doble sistema de cuerda y comunicación constante." },
        { n: "04", title: "Entrega y documentación", desc: "Entregamos el trabajo terminado con documentación técnica y certificado de ejecución." },
      ]}
      faqs={[
        {
          q: "¿En qué zonas de Argentina hacen montaje de torres?",
          a: "Operamos en todo el territorio argentino: CABA, Gran Buenos Aires, provincia de Buenos Aires, interior del país e instalaciones remotas. Consultanos por tu ubicación específica.",
        },
        {
          q: "¿Cuánto tarda un trabajo de montaje de torres?",
          a: "Depende del tipo de trabajo. Una instalación simple puede resolverse en un día. Proyectos complejos de instalación completa pueden llevar de 2 a 5 días hábiles. En el relevamiento previo te damos un plazo preciso.",
        },
        {
          q: "¿Necesito permiso del edificio para instalar una antena?",
          a: "En general sí. Para instalaciones en edificios de propiedad horizontal se requiere autorización del consorcio. Podemos asesorarte sobre la documentación necesaria para cada caso.",
        },
        {
          q: "¿Tienen seguro de trabajo en altura?",
          a: "Sí. Todo el equipo de Iron Tower está cubierto por ART con cobertura específica para trabajos en altura. Podemos proveer la documentación de seguridad laboral requerida por el cliente.",
        },
        {
          q: "¿Hacen mantenimiento preventivo de torres existentes?",
          a: "Sí, ofrecemos contratos de mantenimiento periódico que incluyen inspección visual, ajuste de componentes, verificación de anclajes y reporte técnico del estado de la estructura.",
        },
      ]}
    />
  );
}
