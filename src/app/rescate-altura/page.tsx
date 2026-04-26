import type { Metadata } from "next";
import ServicePage from "@/components/layout/ServicePage";

export const metadata: Metadata = {
  title: "Rescate en Altura y Espacios Confinados | Iron Tower Argentina",
  description:
    "Servicios de rescate en altura y espacios confinados con técnicos IRATA certificados. Asistencia de emergencia y guardia de seguridad en toda la Argentina.",
  keywords: [
    "rescate en altura Argentina",
    "rescate espacios confinados",
    "técnicos rescate IRATA Argentina",
    "guardia de seguridad altura industria",
    "emergencia altura industrial Argentina",
    "brigada rescate altura",
  ],
  openGraph: {
    title: "Rescate en Altura y Espacios Confinados — Iron Tower",
    description:
      "Rescate profesional en altura y espacios confinados. Técnicos IRATA certificados. Respuesta rápida en toda la Argentina.",
    url: "https://www.irontowervrw.com.ar/rescate-altura",
    type: "website",
  },
  alternates: { canonical: "https://www.irontowervrw.com.ar/rescate-altura" },
};

const schema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Rescate en Altura y Espacios Confinados",
  description:
    "Servicios de prevención, asistencia y rescate en trabajos en altura y espacios confinados. Técnicos certificados IRATA en toda la Argentina.",
  provider: {
    "@type": "Organization",
    name: "Iron Tower — Vertical Rope Work",
    url: "https://www.irontowervrw.com.ar",
    telephone: "+54-11-2725-9135",
  },
  areaServed: "Argentina",
  serviceType: "Rescate en altura y espacios confinados",
};

export default function RescateAlturaPage() {
  return (
    <ServicePage
      badge="Rescate en altura"
      h1={"Rescate en altura\ny espacios confinados"}
      lead="Brindamos servicios de prevención, asistencia y rescate para trabajos en altura y espacios confinados. Técnicos certificados IRATA con equipamiento específico y protocolos de respuesta rápida en toda la Argentina."
      image="/images/services/rescate-alturas.jpeg"
      imageAlt="Técnico Iron Tower en operación de rescate en altura — espacio confinado Argentina IRATA"
      waText="Hola, quiero consultar sobre rescate en altura y espacios confinados"
      schema={schema}
      body={
        <>
          <h2>Rescate en altura: cuando cada segundo cuenta</h2>
          <p>
            Un trabajador suspendido en altura o atrapado en un espacio confinado puede
            sufrir consecuencias irreversibles en minutos. El síndrome de suspensión
            —conocido como trauma por arnés— puede generar daño orgánico grave en tan solo
            10 a 15 minutos después de un accidente en altura. Por eso, contar con un
            plan de rescate específico y un equipo entrenado no es opcional: es una
            exigencia de seguridad.
          </p>
          <h2>¿Qué servicios de rescate ofrece Iron Tower?</h2>
          <ul>
            <li>Guardia de seguridad en altura durante trabajos de riesgo</li>
            <li>Plan de rescate técnico para trabajos en altura o espacios confinados</li>
            <li>Asistencia de emergencia ante accidentes en altura</li>
            <li>Rescate en espacios confinados: silos, tanques, pozos y conductos</li>
            <li>Evacuación de personas desde estructuras elevadas o de difícil acceso</li>
            <li>Brigada de rescate disponible para eventos industriales de riesgo</li>
          </ul>
          <h2>¿Qué es un espacio confinado y por qué requiere rescate especializado?</h2>
          <p>
            Un espacio confinado es cualquier recinto con acceso restringido que no está
            diseñado para ocupación continua: tanques, silos, pozos, cámaras subterráneas,
            ductos de ventilación, entre otros. Los riesgos son múltiples: atmósferas
            deficientes en oxígeno, gases tóxicos y dificultad de evacuación en caso de
            emergencia.
          </p>
          <p>
            Iron Tower cuenta con equipamiento específico para rescate en espacios
            confinados, incluyendo detectores de atmósferas, trípodes de rescate y equipos
            de respiración autónoma, garantizando la seguridad del equipo de rescate
            durante toda la operación.
          </p>
        </>
      }
      steps={[
        { n: "01", title: "Evaluación de riesgos", desc: "Analizamos el tipo de trabajo, la estructura y los riesgos específicos del entorno para diseñar el plan de rescate adecuado." },
        { n: "02", title: "Plan de rescate técnico", desc: "Elaboramos un protocolo de rescate documentado que incluye equipos, roles, señales y procedimientos paso a paso." },
        { n: "03", title: "Guardia durante el trabajo", desc: "Nuestro equipo permanece en el sitio durante toda la jornada de trabajo, listo para actuar en caso de emergencia." },
        { n: "04", title: "Documentación SRT", desc: "Entregamos la documentación del plan de rescate para cumplir con los requisitos de la SRT y la ART del cliente." },
      ]}
      faqs={[
        {
          q: "¿La normativa obliga a tener un plan de rescate en altura?",
          a: "Sí. La Resolución SRT 299/2011 exige que todo trabajo en altura cuente con un procedimiento de rescate definido antes de iniciar las tareas. Iron Tower puede elaborar ese plan y también ejecutarlo en caso de emergencia.",
        },
        {
          q: "¿Qué es el síndrome de suspensión y por qué es peligroso?",
          a: "El síndrome de suspensión ocurre cuando una persona queda colgada pasivamente de un arnés sin poder moverse. En 10 a 15 minutos puede comenzar a generarse daño grave por compresión vascular. Es por eso que el rescate debe ser rápido y ejecutado por personal entrenado.",
        },
        {
          q: "¿Pueden proveer guardia de seguridad en altura para obras y eventos?",
          a: "Sí. Ofrecemos servicios de guardia técnica en altura por jornal o por obra, con uno o más técnicos IRATA según los riesgos del trabajo. Consultanos para presupuestar según la duración y el tipo de actividad.",
        },
        {
          q: "¿Trabajan en espacios confinados en plantas industriales?",
          a: "Sí. Tenemos experiencia en rescate en espacios confinados en plantas de tratamiento de agua, silos graneleros, tanques industriales y cámaras subterráneas. Coordinamos el trabajo con el área de seguridad del cliente.",
        },
      ]}
    />
  );
}
