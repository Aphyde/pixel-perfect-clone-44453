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
  title:
    "Outdoor-Tage- & Schneelast-Rechner — DWD-Klimadaten | Brait",
  description:
    "Wie viele Terrassen-Tage gewinnen Sie mit einer Überdachung? Schneelastzone für Ihre PLZ. Auf Basis offizieller DWD-Klimanormalen 1991–2020 und DIN EN 1991-1-3.",
  path: "/rechner",
  keywords: [
    "Schneelastrechner",
    "Schneelastzone PLZ",
    "Outdoor-Tage Rechner",
    "DWD Klimadaten Terrasse",
    "DIN EN 1991-1-3 Rechner",
    "Terrassendach Nutzungsdauer",
  ],
});

const breadcrumbItems = [
  { name: "Startseite", url: "/" },
  { name: "Rechner", url: "/rechner" },
];

const breadcrumb = buildBreadcrumbSchema(breadcrumbItems);

const webpage = buildWebPageSchema({
  url: "/rechner",
  name: "Outdoor-Tage- & Schneelast-Rechner",
  description:
    "Berechnung der Outdoor-Tage pro Jahr mit und ohne Überdachung sowie der Schneelastzone nach DIN EN 1991-1-3 für jede PLZ in Süddeutschland.",
  breadcrumbId: breadcrumb["@id"] as string,
  speakableSelectors: ["h1", ".speakable-tldr", ".speakable-answer"],
});

const faq = buildFaqSchema(
  [
    {
      question: "Auf welchen Daten basiert der Outdoor-Tage-Rechner?",
      answer:
        "Auf den offiziellen Klimanormalen 1991–2020 des Deutschen Wetterdienstes (DWD), Climate Data Center. Pro Standort werden Niederschlagstage, Sonnenstunden, Frosttage und Schneetage statistisch ausgewertet, um eine Outdoor-Saison zu modellieren.",
    },
    {
      question: "Wie wird die Schneelast berechnet?",
      answer:
        "Nach DIN EN 1991-1-3 (Eurocode 1) und Nationalem Anhang Deutschland mit der Formel s = µ · Cₑ · Cₜ · sₖ. Für Flachdächer (Neigung ≤ 30°) gilt µ = 0,8. Die charakteristische Bodenschneelast sₖ wird aus der PLZ-Schneelastzone und einer Höhenkorrektur ab 400 m NN ermittelt.",
    },
    {
      question:
        "Wie viele zusätzliche Terrassen-Tage bringt eine Überdachung?",
      answer:
        "In Süddeutschland gewinnt man typischerweise 60–110 Tage pro Jahr — abhängig vom System: Markisen erhöhen nur Hitze-Komfort, Glasdächer machen alle Regentage in der warmen Saison nutzbar, Lamellendächer addieren milde Wintertage. Bei Vollausstattung mit Glasschiebewänden und Heizung sind ganzjährige Outdoor-Wohnräume möglich.",
    },
    {
      question: "Welche Schneelastzone gilt für Ulm?",
      answer:
        "Ulm und Neu-Ulm liegen in Schneelastzone 2a mit charakteristischer Bodenschneelast 1,32 kN/m² (≈ 135 kg/m²). Auf einem Brait-Flachdach (Form-Beiwert µ = 0,8) ergibt das eine Dachschneelast von 1,06 kN/m² (≈ 108 kg/m²). Die Brait-Standardstatik trägt 200 kg/m² — also fast das Doppelte mit Sicherheitsreserve.",
    },
    {
      question: "Trägt die Brait-Standardstatik auch in Höhenlagen?",
      answer:
        "Die 200 kg/m² Standardstatik deckt Schneelastzone 2a (z. B. Ulm, Augsburg) komplett ab. In Schneelastzone 3 (Memmingen, Allgäu, Schwäbische Alb über 600 m NN) verstärken wir Sparren oder Pfosten. Ab 800 m NN rechnen wir grundsätzlich individuell — Mehrkosten 8–12 % plus ca. 250 € Statik.",
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
