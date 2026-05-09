import type { Metadata } from "next";
import Referenzprojekte from "@/views/Referenzprojekte";

export const metadata: Metadata = {
  title: "Referenzprojekte – realisierte Projekte aus Ulm und Umgebung",
  description:
    "Eindrücke aus realisierten Projekten: Terrassenüberdachungen, Pergolen und Markisen in Ulm und Umgebung. Filterbare Galerie mit Lightbox.",
  alternates: { canonical: "/referenzprojekte" },
  openGraph: {
    url: "/referenzprojekte",
    title: "Referenzprojekte – Brait Überdachungen",
    description: "Realisierte Terrassendächer, Pergolen und Markisen aus Ulm und Umgebung.",
  },
};

export default function ReferenzprojektePage() {
  return <Referenzprojekte />;
}
