import type { Metadata } from "next";
import ServicePage from "@/components/layout/ServicePage";

export const metadata: Metadata = {
  title: "Capacitación en Trabajo en Altura Certificada | Iron Tower Argentina",
  description:
    "Cursos y capacitaciones en trabajo seguro en altura para empresas e industrias. Formación con respaldo IRATA. Certificación reconocida. Toda la Argentina.",
  keywords: [
    "capacitación trabajo en altura Argentina",
    "curso trabajo en altura certificado",
    "formación IRATA Argentina",
    "capacitación operarios altura empresa",
    "certificación trabajo en altura",
    "curso arnés y altura industria Argentina",
  ],
  openGraph: {
    title: "Capacitación en Trabajo en Altura — Iron Tower Argentina",
    description:
      "Cursos certificados de trabajo seguro en altura para operarios y brigadistas. Respaldo IRATA. Todo el país.",
    url: "https://www.irontowervrw.com.ar/capacitacion-altura",
    type: "website",
  },
  alternates: { canonical: "https://www.irontowervrw.com.ar/capacitacion-altura" },
};

const schema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Capacitación en Trabajo en Altura",
  description:
    "Cursos y capacitaciones certificadas en trabajo seguro en altura para operarios, técnicos y brigadistas de empresas e industrias argentinas.",
  provider: {
    "@type": "Organization",
    name: "Iron Tower — Vertical Rope Work",
    url: "https://www.irontowervrw.com.ar",
    telephone: "+54-11-2725-9135",
  },
  areaServed: "Argentina",
  serviceType: "Capacitación en trabajo en altura",
};

export default function CapacitacionAlturaPage() {
  return (
    <ServicePage
      badge="Capacitación IRATA"
      h1={"Capacitación en trabajo\nen altura para empresas"}
      lead="Formamos operarios, técnicos y brigadistas en trabajo seguro en altura con metodología práctica y respaldo técnico IRATA. Capacitaciones in situ en las instalaciones de tu empresa en toda la Argentina."
      image="/images/services/capacitaciones.jpg"
      imageAlt="Capacitación en trabajo en altura con arneses — Iron Tower forma operarios y técnicos en Argentina"
      waText="Hola, quiero consultar sobre capacitación en trabajo en altura"
      schema={schema}
      body={
        <>
          <h2>¿Por qué capacitar a tu personal en trabajo en altura?</h2>
          <p>
            El trabajo en altura es la principal causa de accidentes mortales en la industria
            argentina según datos de la Superintendencia de Riesgos del Trabajo (SRT).
            Capacitar correctamente al personal no es solo una obligación legal: es la
            diferencia entre un accidente grave y un trabajo bien hecho.
          </p>
          <p>
            La Resolución SRT 299/2011 exige capacitación específica para todo trabajador
            que realice tareas a más de 2 metros de altura. Las empresas que no cumplen
            pueden recibir multas y quedar expuestas a responsabilidades civiles y penales
            en caso de accidente.
          </p>
          <h2>¿Qué incluyen nuestras capacitaciones?</h2>
          <ul>
            <li>Marco legal: normativa vigente en trabajo en altura (Ley 19587, SRT 299/2011)</li>
            <li>Uso correcto de arneses, eslingas y elementos de protección personal</li>
            <li>Selección e inspección de equipos de protección contra caídas</li>
            <li>Uso de líneas de vida y sistemas de anclaje</li>
            <li>Técnicas de trabajo seguro en plataformas, escaleras y cubiertas</li>
            <li>Procedimientos de rescate básico en caso de accidente</li>
            <li>Práctica en altura supervisada por técnicos IRATA</li>
          </ul>
          <h2>Capacitaciones a medida para cada industria</h2>
          <p>
            Adaptamos el contenido de cada capacitación a la realidad de tu empresa:
            construcción, industria petroquímica, telecomunicaciones, consorcios, plantas
            de tratamiento o cualquier otro sector donde haya trabajo en altura. Las
            capacitaciones se realizan en tus instalaciones, con los equipos y estructuras
            que tu personal usa habitualmente.
          </p>
        </>
      }
      steps={[
        { n: "01", title: "Diagnóstico de necesidades", desc: "Evaluamos las tareas en altura que realiza tu personal y la normativa aplicable a tu industria para diseñar el programa correcto." },
        { n: "02", title: "Diseño del programa", desc: "Preparamos el contenido teórico y práctico adaptado a tus instalaciones, equipos y nivel de experiencia del grupo." },
        { n: "03", title: "Capacitación in situ", desc: "Realizamos la capacitación directamente en tus instalaciones, combinando teoría y práctica supervisada en altura." },
        { n: "04", title: "Certificación y registro", desc: "Entregamos certificados individuales de capacitación y el registro documentado para auditorías de la SRT y la ART." },
      ]}
      faqs={[
        {
          q: "¿La capacitación cumple con los requisitos de la SRT?",
          a: "Sí. Nuestras capacitaciones están diseñadas para cumplir con la Resolución SRT 299/2011 y las exigencias de las ART para trabajo en altura. Entregamos la documentación necesaria para el legajo de cada empleado.",
        },
        {
          q: "¿Cuántas personas puede incluir cada capacitación?",
          a: "Los grupos más efectivos son de 6 a 15 personas. Podemos organizar múltiples jornadas para cubrir grupos más grandes o personalizar la capacitación para grupos pequeños de técnicos especializados.",
        },
        {
          q: "¿Pueden capacitar en plantas del interior del país?",
          a: "Sí. Viajamos a cualquier punto de la Argentina para realizar capacitaciones in situ. Los costos de traslado y estadía se presupuestan por separado según la ubicación.",
        },
        {
          q: "¿Cada cuánto se debe renovar la capacitación en altura?",
          a: "La normativa SRT recomienda renovar la capacitación anualmente o ante cambios en las condiciones de trabajo o los equipos utilizados. La renovación periódica también es exigida por la mayoría de las ART.",
        },
        {
          q: "¿Tienen capacitaciones para niveles básico y avanzado?",
          a: "Sí. Ofrecemos formación desde nivel básico (usuarios de sistemas de protección) hasta nivel avanzado (técnicos de acceso por cuerdas con referencia al sistema IRATA). Evaluamos el nivel del grupo antes de cada capacitación.",
        },
      ]}
    />
  );
}
