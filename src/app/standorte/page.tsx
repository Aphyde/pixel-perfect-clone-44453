import type { Metadata } from "next";
import Link from "next/link";
import Layout from "@/components/Layout";
import Breadcrumbs from "@/components/seo/Breadcrumbs";
import JsonLd from "@/components/seo/JsonLd";
import {
  buildBreadcrumbSchema,
  buildCollectionPageSchema,
  buildWebPageSchema,
} from "@/lib/seo/schema";
import { buildMetadata } from "@/lib/seo/metadata";
import { locations } from "@/data/locations";
import { ArrowRight, MapPin } from "lucide-react";
import { SERVICE_AREA } from "@/lib/seo/site";

export const metadata: Metadata = buildMetadata({
  title: "Standorte — Brait Überdachungen in Ulm und 100 km Umkreis",
  description: `Brait Überdachungen bedient ${locations.length}+ Standorte in Baden-Württemberg und Bayerisch Schwaben. Detaillierte Infos zu Anfahrt, Schneelast, Bauvorschriften und Top-Produkten je Stadt.`,
  path: "/standorte",
  keywords: [
    "Standorte Brait",
    "Markisen Bayern Schwaben",
    "Terrassendach 100 km Ulm",
    "Service-Gebiet",
  ],
});

export default function StandortePage() {
  const url = "/standorte";
  const breadcrumbItems = [
    { name: "Startseite", url: "/" },
    { name: "Standorte", url },
  ];
  const breadcrumb = buildBreadcrumbSchema(breadcrumbItems);
  const collection = buildCollectionPageSchema({
    url,
    name: "Standorte — Brait Überdachungen",
    description: `Service-Gebiet Ulm und ${SERVICE_AREA.radiusKm} km Radius — Detailinfos pro Stadt.`,
    itemUrls: locations.map((l) => ({
      name: l.city,
      url: `/standorte/${l.slug}`,
    })),
  });
  const webpage = buildWebPageSchema({
    url,
    name: "Standorte — Brait Überdachungen",
    description:
      "Übersicht aller Städte und Regionen, in denen Brait Überdachungen Beratung und Montage durchführt.",
    breadcrumbId: breadcrumb["@id"] as string,
  });

  return (
    <>
      <JsonLd data={[webpage, breadcrumb, collection]} />
      <Layout>
        <Breadcrumbs items={breadcrumbItems} withoutSchema />

        <section className="container mx-auto px-5 md:px-8 pt-6 md:pt-8 pb-12 md:pb-16">
          <span className="text-primary text-[10px] md:text-xs font-bold tracking-[0.4em] uppercase mb-3 block">
            Standorte
          </span>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tighter mb-4 break-words">
            Brait in Ihrer Stadt
          </h1>
          <p className="text-secondary text-base md:text-lg max-w-2xl leading-relaxed mb-4">
            Wir bedienen Ulm und einen Radius von {SERVICE_AREA.radiusKm} km — komplett in
            Baden-Württemberg und Bayerisch Schwaben. Wählen Sie Ihre Stadt für
            spezifische Infos zu Schneelast, Bauvorschriften und Top-Produkten.
          </p>
          <Link
            href="/rechner"
            className="inline-flex items-center gap-2 text-primary border-b-2 border-primary font-bold uppercase tracking-widest text-xs md:text-sm pb-1 hover:opacity-70 transition-opacity"
          >
            Schneelast für Ihre PLZ berechnen <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </section>

        <section className="container mx-auto px-5 md:px-8 pb-16 md:pb-24">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-1">
            {locations.map((l) => (
              <Link
                key={l.slug}
                href={`/standorte/${l.slug}`}
                className="group block bg-card hover:bg-surface-container-high transition-colors p-6 md:p-7"
              >
                <div className="flex items-start gap-3 mb-4">
                  <MapPin className="w-5 h-5 text-primary mt-0.5 shrink-0" aria-hidden />
                  <div>
                    <h2 className="text-xl font-bold leading-snug group-hover:text-primary transition-colors">
                      {l.city}
                    </h2>
                    <span className="text-xs text-secondary">
                      {l.region} · {l.distanceFromUlm} km von Ulm
                    </span>
                  </div>
                </div>
                <p className="text-secondary text-sm leading-relaxed mb-4 line-clamp-3">
                  {l.tldr}
                </p>
                <span className="inline-flex items-center gap-2 text-primary font-bold uppercase tracking-widest text-xs group-hover:gap-3 transition-all">
                  Details <ArrowRight className="w-4 h-4" />
                </span>
              </Link>
            ))}
          </div>
        </section>
      </Layout>
    </>
  );
}
