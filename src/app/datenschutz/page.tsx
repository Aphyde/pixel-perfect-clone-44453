import type { Metadata } from "next";
import Datenschutz from "@/views/Datenschutz";

export const metadata: Metadata = {
  title: "Datenschutzerklärung",
  description: "Datenschutzerklärung von Brait Überdachungen – Informationen zur Verarbeitung personenbezogener Daten.",
  alternates: { canonical: "/datenschutz" },
  robots: { index: true, follow: true },
};

export default function DatenschutzPage() {
  return <Datenschutz />;
}
