import type { Metadata } from "next";
import Index from "@/views/Index";
import JsonLd from "@/components/seo/JsonLd";
import {
  buildFaqSchema,
  buildHowToSchema,
  buildWebPageSchema,
} from "@/lib/seo/schema";
import { buildMetadata } from "@/lib/seo/metadata";
import { generalFaqs } from "@/data/faq";

export const metadata: Metadata = buildMetadata({
  title:
    "Brait Überdachungen Ulm — Terrassendächer, Markisen & Lamellen-Pergolen aus Aluminium",
  description:
    "Premium Aluminium-Terrassenüberdachungen, Markisen, Lamellen-Pergolen, Schirme und Carports in Ulm. Maßgefertigt, montiert vom eigenen Team. Demo-Koffer kostenlos anfordern — wir kommen mit Mini-Modell, Materialmustern und 3D-Konfigurator zu Ihnen.",
  path: "/",
  keywords: [
    "Terrassenüberdachung Ulm",
    "Markisen Ulm",
    "Lamellendach",
    "Pergola Aluminium",
    "Carport Ulm",
    "Brait Überdachungen",
    "Demo-Koffer",
  ],
});

const homeWebPage = buildWebPageSchema({
  url: "/",
  name: "Brait Überdachungen — Premium-Überdachungen aus Ulm",
  description:
    "Aluminium-Terrassendächer, Markisen, Lamellen-Pergolen, Schirme, Eingangsüberdachungen und Carports — maßgefertigt aus Ulm.",
  speakableSelectors: ["h1", ".hero-subtitle", ".speakable-faq", ".speakable-answer"],
});

const demoKofferHowTo = buildHowToSchema({
  name: "Brait Demo-Koffer anfordern: So läuft Ihre kostenlose Beratung ab",
  description:
    "In vier klaren Schritten von der Anfrage bis zum verbindlichen Angebot — ohne Druck, ohne Verkaufsgespräch.",
  totalTime: "PT2H",
  image: "/hero/hero-home-1280.webp",
  steps: [
    {
      name: "Demo-Koffer anfordern",
      text: "Anfrage per Telefon, Mail oder Kontaktformular. Wir melden uns innerhalb eines Werktages und stimmen einen Vor-Ort-Termin in Ulm und 100 km Umkreis ab.",
      url: "/kontakt",
    },
    {
      name: "Vor-Ort-Termin mit Demo-Koffer",
      text: "Wir kommen mit dem Demo-Koffer zu Ihnen: Mini-Modell, Materialmuster (Aluminium-Profile, Tücher, Glasarten, RAL-Farben) und Tablet mit Konfigurator.",
    },
    {
      name: "Bedarf klären & Aufmaß",
      text: "Wir besprechen Nutzung, Ausrichtung, Architektur Ihres Hauses, machen ein digitales 3D-Aufmaß und schlagen 1–2 passende Systeme vor.",
    },
    {
      name: "Angebot mit Visualisierung",
      text: "Innerhalb von 5 Werktagen erhalten Sie ein verbindliches Festpreis-Angebot inkl. Montage und einer 3D-Visualisierung Ihrer Überdachung am Haus.",
    },
  ],
});

const homeFaqSchema = buildFaqSchema(generalFaqs, "/");

export default function HomePage() {
  return (
    <>
      <link
        rel="preload"
        as="image"
        type="image/avif"
        imageSrcSet="/hero/hero-home-414.avif 414w, /hero/hero-home-640.avif 640w, /hero/hero-home-828.avif 828w, /hero/hero-home-1080.avif 1080w, /hero/hero-home-1280.avif 1280w"
        imageSizes="100vw"
        fetchPriority="high"
      />
      <JsonLd data={[homeWebPage, demoKofferHowTo, homeFaqSchema]} />
      <Index />
    </>
  );
}
