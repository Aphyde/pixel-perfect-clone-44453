import type { Metadata } from "next";
import Konfigurator from "@/views/Konfigurator";

export const metadata: Metadata = {
  title: "Konfigurator – Terrassendach, Pergola & Markise",
  description:
    "Konfigurieren Sie Ihre Terrassenüberdachung, Lamellen-Pergola oder Markise online und erhalten Sie sofort eine Preisindikation – inklusive Live-Visualisierung.",
  alternates: { canonical: "/konfigurator" },
  openGraph: {
    url: "/konfigurator",
    title: "Konfigurator – Brait Überdachungen",
    description: "Live-Konfigurator für Terrassendach, Pergola und Markise.",
  },
};

export default function KonfiguratorOverviewPage() {
  return <Konfigurator />;
}
