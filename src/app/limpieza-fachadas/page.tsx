import type { Metadata } from "next";
import ServicePage from "@/components/layout/ServicePage";

export const metadata: Metadata = {
  title: "Limpieza de Fachadas y Cristales en Altura | Iron Tower Argentina",
  description:
    "Servicio profesional de limpieza de fachadas, vidriados y cristales en altura para consorcios y edificios de toda la Argentina. Técnicos certificados IRATA.",
  keywords: [
    "limpieza fachadas altura Argentina",
    "limpieza cristales edificios",
    "limpieza vidriados consorcios Buenos Aires",
    "empresa limpieza fachadas certificada",
    "limpieza exterior edificios altura",
    "mantenimiento fachadas consorcios Argentina",
  ],
  openGraph: {
    title: "Limpieza de Fachadas y Cristales — Iron Tower",
    description:
      "Limpieza profesional de fachadas y cristales en altura para consorcios y edificios. Técnicos IRATA en toda la Argentina.",
    url: "https://www.irontowerarg.com/limpieza-fachadas",
    type: "website",
  },
  alternates: { canonical: "https://www.irontowerarg.com/limpieza-fachadas" },
};

const schema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Limpieza de Fachadas y Cristales en Altura",
  description:
    "Limpieza profesional de fachadas, vidriados y cristales en altura para consorcios, edificios y empresas en toda la Argentina.",
  provider: {
    "@type": "Organization",
    name: "Iron Tower — Vertical Rope Work",
    url: "https://www.irontowerarg.com",
    telephone: "+54-11-2725-9135",
  },
  areaServed: "Argentina",
  serviceType: "Limpieza de fachadas y cristales en altura",
};

export default function LimpiezaFachadasPage() {
  return (
    <ServicePage
      badge="Consorcios y edificios"
      h1={"Limpieza de fachadas\ny cristales en altura"}
      lead="Devolvemos el brillo a fachadas y vidriados de edificios, consorcios y empresas en toda la Argentina. Trabajo profesional en altura con técnicos certificados IRATA y equipamiento de primer nivel."
      image="/images/services/fachadas-cristales.webp"
      imageAlt="Técnico Iron Tower limpiando fachada y cristales en edificio en altura — servicio para consorcios Argentina"
      waText="Hola, quiero consultar sobre limpieza de fachadas y cristales"
      schema={schema}
      body={
        <>
          <h2>Servicio de limpieza de fachadas para consorcios y empresas</h2>
          <p>
            Iron Tower ofrece el servicio de limpieza de fachadas y cristales más completo
            del mercado para consorcios, administradores de propiedades y empresas en
            toda la Argentina. Trabajamos con técnicas de acceso por cuerdas que eliminan
            la necesidad de andamios costosos, reduciendo tiempos y sin interrumpir la
            circulación en la vía pública.
          </p>
          <h2>¿Qué tipos de fachadas limpiamos?</h2>
          <ul>
            <li>Vidriados y muros cortina en edificios de oficinas y viviendas</li>
            <li>Fachadas de hormigón, piedra, porcelanato y aluminio compuesto</li>
            <li>Frentes de locales comerciales y shopping centers</li>
            <li>Marquesinas y techos de vidrio</li>
            <li>Paneles solares en altura</li>
            <li>Estructuras metálicas y parrillas de fachada</li>
          </ul>
          <h2>Ventajas del método rope access para limpieza de edificios</h2>
          <p>
            A diferencia de los andamios tradicionales, el acceso por cuerdas no requiere
            instalaciones en la vía pública ni tiempo de montaje y desmontaje que encarezca
            el proyecto. Llegamos a cualquier punto de la fachada con mayor rapidez,
            generando menos molestias para los vecinos y transeúntes.
          </p>
          <p>
            Utilizamos productos de limpieza profesionales adecuados para cada tipo de
            superficie, garantizando un resultado impecable sin dañar los materiales de
            la fachada.
          </p>
        </>
      }
      steps={[
        { n: "01", title: "Relevamiento y presupuesto", desc: "Visitamos el edificio para medir superficies, identificar el tipo de material y elaborar un presupuesto detallado sin costo." },
        { n: "02", title: "Planificación del trabajo", desc: "Coordinamos con la administración del consorcio los días y horarios para minimizar el impacto en los vecinos." },
        { n: "03", title: "Limpieza en altura", desc: "Nuestro equipo de técnicos certificados ejecuta la limpieza con productos específicos para cada tipo de superficie." },
        { n: "04", title: "Control de calidad", desc: "Supervisamos el resultado y realizamos repasos si es necesario antes de dar el trabajo por finalizado." },
      ]}
      faqs={[
        {
          q: "¿Cuánto cuesta limpiar la fachada de un edificio?",
          a: "El precio varía según la altura, los metros cuadrados de fachada y el tipo de material. Ofrecemos presupuesto sin costo previo a cada trabajo. Contactanos para coordinar una visita técnica gratuita.",
        },
        {
          q: "¿Con qué frecuencia se recomienda limpiar la fachada de un edificio?",
          a: "En zonas urbanas con alta contaminación, se recomienda al menos una vez por año. Para vidriados expuestos al tráfico o la lluvia, cada 6 meses puede ser más adecuado. El administrador del consorcio puede coordinar un contrato de mantenimiento periódico.",
        },
        {
          q: "¿Trabajan en edificios en funcionamiento?",
          a: "Sí. El acceso por cuerdas nos permite trabajar en fachadas de edificios habitados sin interrumpir la vida cotidiana de los vecinos ni el funcionamiento de los locales comerciales en planta baja.",
        },
        {
          q: "¿Los productos de limpieza dañan las plantas o veredas?",
          a: "No. Utilizamos productos biodegradables y técnicas de contención de residuos para evitar cualquier impacto en la zona de trabajo. Tomamos todas las precauciones para proteger plantas, autos y peatones.",
        },
        {
          q: "¿Tienen experiencia en fachadas de vidrio espejado o DVH?",
          a: "Sí. Contamos con productos y técnicas específicas para vidrios espejados, DVH, termopaneles y vidrios con tratamientos especiales. Evitamos rayones y daños que podrían generar costos de reparación.",
        },
      ]}
    />
  );
}
