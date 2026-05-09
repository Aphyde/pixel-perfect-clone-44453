import type { Metadata } from "next";
import Kontakt from "@/views/Kontakt";

export const metadata: Metadata = {
  title: "Kontakt & Demo-Koffer-Termin",
  description:
    "Kontaktieren Sie Brait Überdachungen in Ulm. Telefon 0173 530 3581, E-Mail info@brait-ueberdachung.de oder Demo-Koffer-Termin vereinbaren – kostenlos und unverbindlich.",
  alternates: { canonical: "/kontakt" },
  openGraph: {
    url: "/kontakt",
    title: "Kontakt – Brait Überdachungen Ulm",
    description:
      "Beratung, Aufmaß und Demo-Koffer kostenlos vor Ort in Ulm und Umgebung.",
  },
};

export default function KontaktPage() {
  return <Kontakt />;
}
