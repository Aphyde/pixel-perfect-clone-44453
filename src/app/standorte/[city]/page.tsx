import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Layout from "@/components/Layout";
import Breadcrumbs from "@/components/seo/Breadcrumbs";
import JsonLd from "@/components/seo/JsonLd";
import FaqSection from "@/components/seo/FaqSection";
import {
  buildBreadcrumbSchema,
  buildFaqSchema,
  buildServiceSchema,
  buildWebPageSchema,
} from "@/lib/seo/schema";
import { buildMetadata } from "@/lib/seo/metadata";
import { findLocation, locations } from "@/data/locations";
import { ArrowRight, Cloud, Home, MapPin, Route } from "lucide-react";

interface Params {
  city: string;
}

export function generateStaticParams(): Params[] {
  return locations.map((l) => ({ city: l.slug }));
}

export function generateMetadata({ params }: { params: Params }): Metadata {
  const loc = findLocation(params.city);
  if (!loc) return { title: "Nicht gefunden" };
  return buildMetadata({
    title: `Terrassenüberdachungen, Markisen & Pergolen in ${loc.city}`,
    description: `Brait Überdachungen in ${loc.city}: kostenlose Beratung mit Demo-Koffer, eigene Montage, alle Produkte. ${loc.tldr}`,
    path: `/standorte/${loc.slug}`,
    keywords: [
      `Markisen ${loc.city}`,
      `Terrassendach ${loc.city}`,
      `Pergola ${loc.city}`,
      `Brait ${loc.city}`,
    ],
  });
}

export default function LocationPage({ params }: { params: Params }) {
  const loc = findLocation(params.city);
  if (!loc) notFound();

  const url = `/standorte/${loc.slug}`;
  const breadcrumbItems = [
    { name: "Startseite", url: "/" },
    { name: "Standorte", url: "/standorte" },
    { name: loc.city, url },
  ];
  const breadcrumb = buildBreadcrumbSchema(breadcrumbItems);
  const service = buildServiceSchema({
    name: `Terrassenüberdachungen, Markisen und Pergolen in ${loc.city}`,
    description: `Beratung, Aufmaß und Montage von Aluminium-Außenanlagen in ${loc.city} und Umgebung — durch Brait Überdachungen aus Ulm.`,
    url,
    serviceType: "Aluminium-Überdachungen, Markisen, Pergolen, Carports",
    areaServed: [loc.city, ...loc.postalCodes],
  });
  const faqSchema = buildFaqSchema(loc.faqs, url);
  const webpage = buildWebPageSchema({
    url,
    name: `Brait Überdachungen in ${loc.city}`,
    description: loc.tldr,
    breadcrumbId: breadcrumb["@id"] as string,
    speakableSelectors: ["h1", ".speakable-tldr"],
  });

  return (
    <>
      <JsonLd data={[webpage, breadcrumb, service, faqSchema]} />
      <Layout>
        <Breadcrumbs items={breadcrumbItems} withoutSchema />

        <section className="container mx-auto px-5 md:px-8 pt-6 md:pt-8 pb-10 md:pb-14">
          <span className="text-primary text-[10px] md:text-xs font-bold tracking-[0.4em] uppercase mb-3 block">
            Standort
          </span>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tighter mb-4 break-words">
            Brait Überdachungen in {loc.city}
          </h1>
          <p className="text-xs text-secondary mb-6">
            {loc.region} · {loc.distanceFromUlm} km von Ulm · PLZ-Bereich{" "}
            {loc.postalCodes.join(", ")}
          </p>

          <div className="border-l-4 border-primary bg-card p-5 md:p-6 max-w-3xl speakable-tldr">
            <p className="text-base md:text-lg leading-relaxed">{loc.tldr}</p>
          </div>
        </section>

        <section className="container mx-auto px-5 md:px-8 pb-12 md:pb-16 max-w-4xl">
          <h2 className="text-2xl md:text-3xl font-bold tracking-tighter mb-6">
            Was Sie über {loc.city} wissen sollten
          </h2>
          {loc.description.map((p, i) => (
            <p
              key={i}
              className="text-secondary leading-relaxed text-sm md:text-base mb-4"
            >
              {p}
            </p>
          ))}
        </section>

        <section className="bg-surface py-12 md:py-16">
          <div className="container mx-auto px-5 md:px-8 max-w-4xl">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-1">
              <article className="bg-card p-6 md:p-7">
                <Cloud className="w-6 h-6 text-primary mb-3" aria-hidden />
                <h3 className="font-bold mb-2">Klima &amp; Schneelast</h3>
                <p className="text-secondary text-sm leading-relaxed">{loc.climate}</p>
              </article>
              <article className="bg-card p-6 md:p-7">
                <Home className="w-6 h-6 text-primary mb-3" aria-hidden />
                <h3 className="font-bold mb-2">Architektur</h3>
                <p className="text-secondary text-sm leading-relaxed">
                  {loc.architecture}
                </p>
              </article>
              <article className="bg-card p-6 md:p-7">
                <Route className="w-6 h-6 text-primary mb-3" aria-hidden />
                <h3 className="font-bold mb-2">Anfahrt</h3>
                <p className="text-secondary text-sm leading-relaxed">{loc.transit}</p>
              </article>
            </div>
          </div>
        </section>

        <section className="container mx-auto px-5 md:px-8 py-12 md:py-16 max-w-4xl">
          <h2 className="text-2xl md:text-3xl font-bold tracking-tighter mb-6">
            Top-Empfehlungen für {loc.city}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-1">
            {loc.topProducts.map((p) => (
              <Link
                key={p.href}
                href={p.href}
                className="group block bg-card hover:bg-surface-container-high p-6 md:p-7 transition-colors border-l-2 border-primary/40"
              >
                <h3 className="font-bold text-base mb-2 group-hover:text-primary transition-colors">
                  {p.label}
                </h3>
                <p className="text-secondary text-sm leading-relaxed mb-4">{p.reason}</p>
                <span className="inline-flex items-center gap-2 text-primary font-bold uppercase tracking-widest text-xs group-hover:gap-3 transition-all">
                  Mehr <ArrowRight className="w-4 h-4" />
                </span>
              </Link>
            ))}
          </div>
        </section>

        <FaqSection
          faqs={loc.faqs}
          title={`Häufige Fragen zu ${loc.city}`}
          label="Lokale FAQ"
        />

        <section className="bg-foreground py-16 md:py-20">
          <div className="container mx-auto px-5 md:px-8 max-w-3xl text-center">
            <MapPin className="w-8 h-8 text-primary mx-auto mb-5" aria-hidden />
            <h2 className="text-2xl md:text-4xl font-bold tracking-tighter text-primary-foreground mb-4">
              Demo-Koffer-Termin in {loc.city}?
            </h2>
            <p className="text-base md:text-lg text-primary-foreground/70 mb-8">
              Wir kommen kostenlos mit Mini-Modell, Materialmustern und 3D-Konfigurator
              zu Ihnen.
            </p>
            <Link
              href="/kontakt"
              className="inline-block bg-primary text-primary-foreground px-10 py-5 font-bold uppercase tracking-widest text-xs md:text-sm hover:bg-primary-container transition-all"
            >
              Termin anfragen
            </Link>
          </div>
        </section>
      </Layout>
    </>
  );
}
