import type { Metadata } from "next";
import "./globals.css";
import { GoogleAnalytics } from "@next/third-parties/google";
import { Analytics } from "@vercel/analytics/react";

export const metadata: Metadata = {
  title: "Iron Tower | Trabajos en Altura Certificados IRATA — Argentina",
  description:
    "Iron Tower: empresa consolidada especializada en trabajos en altura, montaje de torres de telecomunicaciones, limpieza de fachadas, líneas de anclaje y prevención de incendios en toda la Argentina. Técnicos certificados IRATA niveles 1, 2 y 3.",
  keywords: [
    "trabajos en altura Argentina",
    "técnicos IRATA Argentina",
    "rope access Argentina",
    "trabajos verticales certificados",
    "montaje torres telecomunicaciones Argentina",
    "limpieza de fachadas Argentina",
    "líneas de vida y anclaje",
    "prevención incendios carga de fuego",
    "rescate en altura Argentina",
    "capacitaciones IRATA Argentina",
    "empresa trabajos en altura certificada",
    "técnicos certificados IRATA nivel 1 2 3",
    "habilitación locales carga de fuego",
    "limpieza de cristales consorcios",
    "brigadistas consorcios",
    "acceso por cuerdas Argentina",
    "seguridad en altura industria",
    "trabajos verticales industriales",
  ],
  authors: [{ name: "Iron Tower — Vertical Rope Work" }],
  robots: "index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1",
  openGraph: {
    type: "website",
    url: "https://www.irontowerarg.com/",
    title: "Iron Tower | Trabajos en Altura Certificados IRATA — Argentina",
    description:
      "Empresa consolidada especializada en trabajos verticales: montaje de torres, limpieza de fachadas, líneas de anclaje y prevención de incendios en todo el país. Técnicos IRATA niveles 1, 2 y 3.",
    locale: "es_AR",
    siteName: "Iron Tower Vertical Rope Work",
  },
  twitter: {
    card: "summary_large_image",
    title: "Iron Tower | Trabajos en Altura Certificados IRATA — Argentina",
    description:
      "Técnicos IRATA certificados. Montaje de torres, limpieza de fachadas, rescate y prevención de incendios en toda la Argentina.",
  },
  alternates: {
    canonical: "https://www.irontowerarg.com/",
  },
};

const schemaOrg = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "Iron Tower — Vertical Rope Work",
  description:
    "Empresa consolidada especializada en trabajos en altura con certificación IRATA. Montaje de torres de telecomunicaciones, limpieza de fachadas, líneas de anclaje, capacitaciones y prevención de incendios en toda la Argentina.",
  url: "https://www.irontowerarg.com/",
  telephone: "+54-11-2725-9135",
  email: "irontowerta@gmail.com",
  areaServed: {
    "@type": "Country",
    name: "Argentina",
  },
  hasCredential: {
    "@type": "EducationalOccupationalCredential",
    credentialCategory: "Certification",
    name: "IRATA International Rope Access",
  },
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+54-11-2725-9135",
    contactType: "customer service",
    availableLanguage: "Spanish",
  },
  sameAs: ["https://www.instagram.com/irontowervrww"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaOrg) }}
        />
      </head>
      <body>
        {children}
        <Analytics />
      </body>
      {process.env.NEXT_PUBLIC_GA_ID && (
        <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID} />
      )}
    </html>
  );
}
