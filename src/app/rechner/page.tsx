import type { Metadata } from "next";
import Rechner from "@/views/Rechner";
import JsonLd from "@/components/seo/JsonLd";
import {
  buildBreadcrumbSchema,
  buildFaqSchema,
  buildWebPageSchema,
} from "@/lib/seo/schema";
import { buildMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = buildMetadata({
  title: "Terrassenpotenzial-Rechner — Wie viele Tage gewinnen Sie?",
  description:
    "Adresse eingeben, Klimanormale & Schneelast in 5 Sekunden: Wie viele Tage Terrasse pro Jahr gewinnen Sie mit einer Brait-Überdachung? Mit Eurocode-Statik.",
  path: "/rechner",
  keywords: [
    "Terrassenpotenzial Rechner",
    "Schneelast nach Adresse",
    "Outdoor-Tage Rechner",
    "DWD Klimadaten Terrasse",
    "DIN EN 1991-1-3 Rechner",
    "Schneelastzone Adresse",
  ],
});

const breadcrumbItems = [
  { name: "Startseite", url: "/" },
  { name: "Terrassenpotenzial-Rechner", url: "/rechner" },
];

const breadcrumb = buildBreadcrumbSchema(breadcrumbItems);

const webpage = buildWebPageSchema({
  url: "/rechner",
  name: "Terrassenpotenzial-Rechner",
  description:
    "Adressgenaue Analyse: Wie viele Tage pro Jahr ist die Terrasse heute nutzbar, wie viele zusätzliche Tage liefert eine Brait-Überdachung — plus Schneelast nach DIN EN 1991-1-3.",
  breadcrumbId: breadcrumb["@id"] as string,
  speakableSelectors: ["h1", ".speakable-tldr", ".speakable-answer"],
});

const faq = buildFaqSchema(
  [
    {
      question: "Wie funktioniert die adressgenaue Berechnung?",
      answer:
        "Sie geben Ihre Adresse ein, der Rechner ermittelt über OpenStreetMap Ihre Koordinaten und Geländehöhe. Anschließend wird die nächstgelegene DWD-Wetterstation gewählt und die Klimanormale 1991–2020 mit einer Höhenkorrektur auf Ihren Standort übertragen. So entstehen die Kategorien Sommer-, Hitze-, Potenzial-, Kalte- und Eistage.",
    },
    {
      question: "Was sind Potenzialtage (10 bis 25 °C)?",
      answer:
        "Tage mit Tageshöchsttemperatur zwischen 10 und 25 °C — heute meist verloren durch Schauer, kühlen Wind oder fehlende Beschattung. Mit einer Brait-Überdachung (Glasdach, Lamellendach) werden sie nutzbar und bilden den größten Zugewinn an Outdoor-Saison.",
    },
    {
      question: "Wie wird die Schneelast berechnet?",
      answer:
        "Nach DIN EN 1991-1-3 (Eurocode 1) und Nationalem Anhang Deutschland mit der Formel s = µ · Cₑ · Cₜ · sₖ. Für Flachdächer (Neigung ≤ 30°) gilt µ = 0,8. Die charakteristische Bodenschneelast sₖ kommt aus der Schneelastzone Ihres Standorts und wird ab 400 m NN linear bis Faktor 1,4 bei 800 m NN angehoben.",
    },
    {
      question: "Welche Schneelastzone gilt für Ulm?",
      answer:
        "Ulm und Neu-Ulm liegen in Schneelastzone 2a mit charakteristischer Bodenschneelast 1,32 kN/m² (≈ 135 kg/m²). Auf einem Brait-Flachdach (Form-Beiwert µ = 0,8) ergibt das eine Dachschneelast von 1,06 kN/m² (≈ 108 kg/m²). Die Brait-Standardstatik trägt 200 kg/m² — also fast das Doppelte mit Sicherheitsreserve.",
    },
    {
      question: "Bin ich im Brait-Service-Gebiet?",
      answer:
        "Brait montiert zuverlässig im 100-km-Radius um Ulm — das umfasst Ulm, Neu-Ulm, Memmingen, Augsburg, Reutlingen, Tübingen, Friedrichshafen, Kempten und Donauwörth. Außerhalb prüfen wir Anfragen individuell, in vielen Fällen ist Montage trotzdem möglich.",
    },
  ],
  "/rechner",
);

export default function RechnerPage() {
  return (
    <>
      <JsonLd data={[webpage, breadcrumb, faq]} />
      <Rechner />
    </>
  );
}
