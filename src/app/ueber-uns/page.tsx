import type { Metadata } from "next";
import Link from "next/link";
import Layout from "@/components/Layout";
import Breadcrumbs from "@/components/seo/Breadcrumbs";
import JsonLd from "@/components/seo/JsonLd";
import {
  buildAboutPageSchema,
  buildBreadcrumbSchema,
  buildPersonSchema,
  buildWebPageSchema,
} from "@/lib/seo/schema";
import { buildMetadata } from "@/lib/seo/metadata";
import { ADDRESS, BRAND, FOUNDED_YEAR, FOUNDER_NAME, ORG_LEGAL } from "@/lib/seo/site";
import { ArrowRight, Award, Hammer, MapPin, Users } from "lucide-react";

export const metadata: Metadata = buildMetadata({
  title: `Über ${BRAND} — Team, Werte & Geschichte`,
  description: `Brait Überdachungen plant und montiert seit ${FOUNDED_YEAR} premium Aluminium-Außenanlagen in Ulm. Geschäftsführer Nico Braitinger, Trägerunternehmen ${ORG_LEGAL.legalName} — alles aus einer Hand, ohne Subunternehmer.`,
  path: "/ueber-uns",
  keywords: [
    "Über Brait Überdachungen",
    "Nico Braitinger",
    "Brait Team Ulm",
    "Aluminium-Spezialist",
  ],
});

const milestones = [
  {
    year: "2014",
    title: "Gründung",
    text: "Nico Braitinger gründet Brait Überdachungen in Ulm. Spezialisierung von Anfang an: Aluminium-Außenanlagen mit eigener Montage.",
  },
  {
    year: "2018",
    title: "Eigene Montage-Crews",
    text: "Aufbau eines festen Montage-Teams aus Ulm — keine Subunternehmer mehr. Qualitätskontrolle vom ersten Termin bis zur Endabnahme.",
  },
  {
    year: "2021",
    title: "Q-Bus & Lamellendach im Portfolio",
    text: "Erweiterung um bioklimatische Pergolen — Brait wird Premium-Partner für verstellbare Lamellen-Konstruktionen in Süddeutschland.",
  },
  {
    year: "2023",
    title: "Demo-Koffer-Konzept",
    text: "Einführung des Demo-Koffer-Termins: kostenlose Beratung vor Ort mit Mini-Modell, Materialmustern und 3D-Konfigurator auf dem Tablet.",
  },
  {
    year: "2026",
    title: "200+ Projekte realisiert",
    text: "Über 200 umgesetzte Projekte in Ulm und 100 km Umkreis — von Privatkunden bis Gastronomie und Architektenobjekten.",
  },
];

const values = [
  {
    icon: Hammer,
    title: "Eigenes Montage-Team",
    text: "Keine Subunternehmer. Jede Anlage wird vom Brait-Team in Ulm produziert oder konfektioniert und montiert. Eine Hand vom ersten Termin bis zur Übergabe.",
  },
  {
    icon: Award,
    title: "10 Jahre Garantie",
    text: "Aluminium 6063 T6 mit hochwertiger Pulverbeschichtung — wir geben 10 Jahre Strukturgarantie und 5 Jahre auf Motorik. Faktisch halten unsere Anlagen 30+ Jahre.",
  },
  {
    icon: MapPin,
    title: "Verwurzelt in Ulm",
    text: "Sitz in Dornstadt, Service-Gebiet 100 km Radius. Wir kennen die Schneelastzonen, Bauvorschriften BW, Klima-Eigenheiten der Schwäbischen Alb.",
  },
  {
    icon: Users,
    title: "Beratung ohne Verkaufsdruck",
    text: "Demo-Koffer-Termin kostenlos. Wir kommen mit Mustern, machen 3D-Aufmaß und geben ein verbindliches Festpreis-Angebot — ohne Folgetermin-Druck.",
  },
];

export default function UeberUnsPage() {
  const url = "/ueber-uns";
  const breadcrumbItems = [
    { name: "Startseite", url: "/" },
    { name: "Über uns", url },
  ];
  const breadcrumb = buildBreadcrumbSchema(breadcrumbItems);
  const aboutPage = buildAboutPageSchema({
    url,
    description: `Geschichte, Werte und Team von ${BRAND} — Aluminium-Spezialist aus Ulm.`,
  });
  const founder = buildPersonSchema({
    name: FOUNDER_NAME,
    jobTitle: "Geschäftsführer",
    url,
    description: `Geschäftsführer und Gründer von ${BRAND}. Spezialist für Aluminium-Außenanlagen seit ${FOUNDED_YEAR}.`,
  });
  const webpage = buildWebPageSchema({
    url,
    name: `Über ${BRAND}`,
    description: "Geschichte, Team und Werte von Brait Überdachungen aus Ulm.",
    breadcrumbId: breadcrumb["@id"] as string,
  });

  return (
    <>
      <JsonLd data={[webpage, breadcrumb, aboutPage, founder]} />
      <Layout>
        <Breadcrumbs items={breadcrumbItems} withoutSchema />

        <section className="container mx-auto px-5 md:px-8 pt-6 md:pt-8 pb-12 md:pb-16">
          <span className="text-primary text-[10px] md:text-xs font-bold tracking-[0.4em] uppercase mb-3 block">
            Über uns
          </span>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tighter mb-6 break-words">
            Premium-Überdachungen aus Ulm — seit {FOUNDED_YEAR}
          </h1>
          <div className="border-l-4 border-primary bg-card p-5 md:p-6 mb-8 max-w-3xl speakable-tldr">
            <p className="text-base md:text-lg leading-relaxed">
              Brait Überdachungen ist ein inhabergeführter Spezialbetrieb für
              hochwertige Aluminium-Außenanlagen mit Sitz in Dornstadt bei Ulm.
              Wir planen, fertigen und montieren — ohne Subunternehmer, mit
              eigener Crew, vom ersten Termin bis zur Endabnahme.
            </p>
          </div>
        </section>

        <section className="bg-surface py-16 md:py-24">
          <div className="container mx-auto px-5 md:px-8 max-w-4xl">
            <h2 className="text-2xl md:text-4xl font-bold tracking-tighter mb-10">
              Was uns von anderen unterscheidet
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-1">
              {values.map((v) => {
                const Icon = v.icon;
                return (
                  <article
                    key={v.title}
                    className="bg-card p-7 md:p-8 hover:bg-surface-container-high transition-colors"
                  >
                    <Icon className="w-7 h-7 text-primary mb-4" />
                    <h3 className="text-lg md:text-xl font-bold mb-3">{v.title}</h3>
                    <p className="text-secondary text-sm leading-relaxed">{v.text}</p>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <section className="container mx-auto px-5 md:px-8 py-16 md:py-24 max-w-4xl">
          <h2 className="text-2xl md:text-4xl font-bold tracking-tighter mb-10">
            Geschichte in fünf Schritten
          </h2>
          <ol className="space-y-6 md:space-y-8 border-l-2 border-primary/30 pl-6 md:pl-8">
            {milestones.map((m) => (
              <li key={m.year} className="relative">
                <span
                  className="absolute -left-[33px] md:-left-[41px] top-1 block w-3 h-3 bg-primary"
                  aria-hidden
                />
                <div className="text-primary text-xs font-bold tracking-[0.3em] uppercase mb-1">
                  {m.year}
                </div>
                <h3 className="text-lg md:text-xl font-bold mb-2">{m.title}</h3>
                <p className="text-secondary text-sm md:text-base leading-relaxed">
                  {m.text}
                </p>
              </li>
            ))}
          </ol>
        </section>

        <section className="bg-surface-container-low py-16 md:py-24">
          <div className="container mx-auto px-5 md:px-8 max-w-4xl">
            <h2 className="text-2xl md:text-4xl font-bold tracking-tighter mb-8">
              Geschäftsführung
            </h2>
            <div className="bg-card p-7 md:p-10 max-w-2xl">
              <div className="text-primary text-xs font-bold tracking-[0.3em] uppercase mb-2">
                Geschäftsführer
              </div>
              <h3 className="text-2xl md:text-3xl font-bold tracking-tight mb-4">
                {FOUNDER_NAME}
              </h3>
              <p className="text-secondary leading-relaxed text-sm md:text-base mb-6">
                Gründer und Geschäftsführer von {BRAND}. Spezialist für
                Aluminium-Außenanlagen seit {FOUNDED_YEAR}, mit über 200
                realisierten Projekten in Süddeutschland. Persönlicher
                Ansprechpartner für jeden Auftrag — vom Erstgespräch bis zur
                Endabnahme.
              </p>
              <Link
                href="/kontakt"
                className="inline-flex items-center gap-2 text-primary font-bold uppercase tracking-widest text-xs hover:gap-3 transition-all"
              >
                Termin vereinbaren <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>

        <section className="container mx-auto px-5 md:px-8 py-16 md:py-24 max-w-4xl">
          <h2 className="text-2xl md:text-4xl font-bold tracking-tighter mb-6">
            Standort &amp; Trägergesellschaft
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm md:text-base text-secondary">
            <div>
              <h3 className="text-foreground font-bold mb-2">Anschrift</h3>
              <address className="not-italic">
                {ORG_LEGAL.legalName}
                <br />
                {ADDRESS.street}
                <br />
                {ADDRESS.postalCode} {ADDRESS.city}
                <br />
                {ADDRESS.region}, Deutschland
              </address>
            </div>
            <div>
              <h3 className="text-foreground font-bold mb-2">Eintragung</h3>
              <p>
                {ORG_LEGAL.registrationCourt}
                <br />
                {ORG_LEGAL.registrationNumber}
                <br />
                Geschäftsführer: {FOUNDER_NAME}
              </p>
            </div>
          </div>
        </section>
      </Layout>
    </>
  );
}
