import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Iron Tower | Trabajos en Altura Certificados IRATA — Buenos Aires",
  description:
    "Iron Tower: especialistas en trabajos en altura, limpieza de fachadas, montaje de torres de telecomunicaciones y prevención de incendios en CABA, Zona Norte y Zona Sur. Técnicos certificados IRATA. Consultá por WhatsApp.",
  keywords: [
    "trabajos en altura Buenos Aires",
    "limpieza de fachadas edificios",
    "limpieza de cristales consorcios",
    "montaje torres telecomunicaciones",
    "prevención incendios CABA",
    "líneas de anclaje",
    "certificación IRATA Argentina",
    "capacitación altura",
    "brigadistas consorcios",
    "rope access Argentina",
    "limpieza fachadas GBA",
    "habilitación contra incendios",
    "carga de fuego Buenos Aires",
  ],
  authors: [{ name: "Iron Tower — Vertical Rope Work" }],
  robots: "index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1",
  openGraph: {
    type: "website",
    url: "https://www.irontowervrw.com.ar/",
    title: "Iron Tower | Trabajos en Altura Certificados IRATA — Buenos Aires",
    description:
      "Especialistas en limpieza de fachadas, montaje de torres, líneas de anclaje y prevención de incendios. Técnicos IRATA en CABA, Zona Norte y Sur.",
    locale: "es_AR",
    siteName: "Iron Tower Vertical Rope Work",
  },
  twitter: {
    card: "summary_large_image",
    title: "Iron Tower | Trabajos en Altura — Buenos Aires",
    description:
      "Técnicos IRATA certificados. Limpieza de fachadas, torres de telecomunicaciones y prevención de incendios en Buenos Aires.",
  },
  alternates: {
    canonical: "https://www.irontowervrw.com.ar/",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
