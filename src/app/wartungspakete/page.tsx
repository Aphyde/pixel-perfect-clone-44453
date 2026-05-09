import type { Metadata } from "next";
import Wartungspakete from "@/views/Wartungspakete";

export const metadata: Metadata = {
  title: "Wartungspakete",
  description:
    "Schützen Sie Ihre Investition: monatliche, jährliche oder 3-Jahres-Wartungspakete für Terrassendächer und Pergolen ab Ulm. Inklusive Bestpreis-Garantie.",
  alternates: { canonical: "/wartungspakete" },
  openGraph: {
    url: "/wartungspakete",
    title: "Wartungspakete – Brait Überdachungen",
    description: "Schutz und Werterhalt für Ihre Überdachung – Pakete ab 14,90 € im Monat.",
  },
};

export default function WartungspaketePage() {
  return <Wartungspakete />;
}
