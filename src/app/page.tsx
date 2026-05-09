import type { Metadata } from "next";
import Index from "@/views/Index";

export const metadata: Metadata = {
  title: "Brait Überdachungen – Terrassendächer in Ulm",
  description:
    "Premium Aluminium-Terrassenüberdachungen, Markisen und Lamellen-Pergolen aus Ulm. Maßgefertigt, montiert vom eigenen Team. Kostenloser Demo-Koffer-Termin.",
  alternates: { canonical: "/" },
  openGraph: {
    url: "/",
    title: "Brait Überdachungen – Terrassendächer in Ulm",
    description:
      "Premium Aluminium-Terrassenüberdachungen, Markisen und Pergolen in Ulm und Umgebung.",
  },
};

export default function HomePage() {
  return <Index />;
}
