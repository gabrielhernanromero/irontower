import type { Metadata } from "next";
import ServicePage from "@/components/layout/ServicePage";

export const metadata: Metadata = {
  title: "Líneas de Vida y Puntos de Anclaje Certificados | Iron Tower Argentina",
  description:
    "Instalación de líneas de vida y sistemas de anclaje certificados para trabajos en altura. Normas IRAM e IRATA. Edificios, industrias y consorcios en toda la Argentina.",
  keywords: [
    "líneas de vida y anclaje Argentina",
    "instalación puntos de anclaje",
    "sistemas de anclaje altura certificados",
    "líneas de vida edificios consorcios",
    "anclaje norma IRAM Argentina",
    "trabajo en altura seguro",
  ],
  openGraph: {
    title: "Líneas de Vida y Puntos de Anclaje — Iron Tower",
    description:
      "Instalamos sistemas de anclaje y líneas de vida certificados para trabajos en altura seguros. Todo el país.",
    url: "https://www.irontowerarg.com/lineas-anclaje",
    type: "website",
  },
  alternates: { canonical: "https://www.irontowerarg.com/lineas-anclaje" },
};

const schema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Instalación de Líneas de Vida y Puntos de Anclaje",
  description:
    "Diseño e instalación de sistemas de anclaje y líneas de vida certificados para trabajos en altura en edificios, industrias y consorcios de toda la Argentina.",
  provider: {
    "@type": "Organization",
    name: "Iron Tower — Vertical Rope Work",
    url: "https://www.irontowerarg.com",
    telephone: "+54-11-2725-9135",
  },
  areaServed: "Argentina",
  serviceType: "Instalación de sistemas de anclaje y líneas de vida",
};

export default function LineasAnclajePage() {
  return (
    <ServicePage
      badge="Seguridad en altura"
      h1={"Líneas de vida y sistemas\nde anclaje certificados"}
      lead="Diseñamos e instalamos sistemas de anclaje y líneas de vida que cumplen las normas IRAM vigentes. Protección permanente para cualquier trabajo en altura futuro en su edificio o instalación."
      image="/images/services/anclaje.webp"
      imageAlt="Sistema de anclaje y línea de vida certificado instalado por Iron Tower en edificio argentino"
      waText="Hola, quiero consultar sobre instalación de líneas de vida y anclajes"
      schema={schema}
      body={
        <>
          <h2>¿Qué es una línea de vida y para qué sirve?</h2>
          <p>
            Una línea de vida es un sistema de protección colectiva que permite a los
            trabajadores desplazarse en altura mientras permanecen siempre vinculados a un
            punto seguro. Es obligatoria en edificios donde se realizan tareas periódicas
            en altura: limpieza de vidriados, mantenimiento de fachadas, trabajos en terrazas
            o en techos industriales.
          </p>
          <h2>¿Qué instala Iron Tower?</h2>
          <ul>
            <li>Líneas de vida horizontales y verticales certificadas</li>
            <li>Puntos de anclaje fijos en terrazas, fachadas y estructuras</li>
            <li>Sistemas de riel continuo para desplazamiento horizontal en altura</li>
            <li>Anclajes de rescate para posiciones de trabajo críticas</li>
            <li>Inspección y recertificación de sistemas existentes</li>
            <li>Documentación técnica y certificado de instalación conforme a norma</li>
          </ul>
          <h2>Normas que aplicamos</h2>
          <p>
            Todos nuestros sistemas de anclaje se instalan conforme a la normativa
            argentina vigente (IRAM 3625) y los estándares internacionales EN 795 e IRATA.
            Cada instalación incluye un certificado técnico que respalda la capacidad de carga
            del sistema frente a auditorías de seguridad o inspecciones laborales.
          </p>
          <p>
            El incumplimiento de normas de anclaje puede generar sanciones de la
            Superintendencia de Riesgos del Trabajo (SRT) y responsabilidad civil en
            caso de accidente. Iron Tower garantiza que tu instalación esté en regla.
          </p>
        </>
      }
      steps={[
        { n: "01", title: "Visita técnica", desc: "Inspeccionamos el edificio o instalación para determinar los puntos óptimos de anclaje según el tipo de trabajo que se realizará." },
        { n: "02", title: "Diseño del sistema", desc: "Diseñamos el sistema de líneas de vida según la normativa IRAM vigente y las necesidades específicas del edificio." },
        { n: "03", title: "Instalación certificada", desc: "Nuestros técnicos instalan el sistema con los materiales homologados correspondientes y realizan pruebas de carga." },
        { n: "04", title: "Certificado y capacitación", desc: "Entregamos el certificado de instalación y capacitamos al personal del edificio en el uso correcto del sistema." },
      ]}
      faqs={[
        {
          q: "¿Es obligatorio tener líneas de vida en edificios con trabajos en altura?",
          a: "Sí. La ley de Higiene y Seguridad en el Trabajo (Ley 19587) y el Decreto 351/79 establecen la obligación de proteger a los trabajadores en altura. Los edificios que contraten servicios de limpieza de fachadas, mantenimiento de techos o trabajos similares deben contar con sistemas de anclaje adecuados.",
        },
        {
          q: "¿Cada cuánto hay que recertificar los anclajes?",
          a: "Los sistemas de anclaje y líneas de vida deben inspeccionarse anualmente por un técnico habilitado y recertificarse según las indicaciones del fabricante (generalmente cada 3 a 5 años, o antes si el sistema sufrió una carga de caída).",
        },
        {
          q: "¿Pueden instalar en edificios con estructuras de hormigón, metal o madera?",
          a: "Sí. Tenemos soluciones de anclaje para todos los tipos de estructura. El diseño varía según el material y la capacidad de carga del soporte, por eso la visita técnica previa es fundamental.",
        },
        {
          q: "¿El certificado de instalación sirve para la ART?",
          a: "Sí. El certificado técnico que entregamos documenta que el sistema cumple con la normativa vigente, lo que es requerido por las ART y la SRT en caso de inspección o siniestro.",
        },
      ]}
    />
  );
}
