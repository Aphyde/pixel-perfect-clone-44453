import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import Layout from "@/components/Layout";
import Breadcrumbs from "@/components/seo/Breadcrumbs";
import JsonLd from "@/components/seo/JsonLd";
import {
  buildBreadcrumbSchema,
  buildCollectionPageSchema,
  buildWebPageSchema,
} from "@/lib/seo/schema";
import { buildMetadata } from "@/lib/seo/metadata";
import { articles } from "@/data/articles";
import { ArrowRight } from "lucide-react";

export const metadata: Metadata = buildMetadata({
  title: "Ratgeber — Wissen rund um Terrassendächer, Markisen & Pergolen",
  description:
    "Detaillierte Ratgeber-Artikel von Brait Überdachungen: Auswahl, Preise, Genehmigung in BW, Schneelast, Aluminium vs. Holz, Wartung und Energie sparen mit Markisen.",
  path: "/ratgeber",
  keywords: [
    "Ratgeber Terrassendach",
    "Terrassenüberdachung Wissen",
    "Markisen Vergleich",
    "Pergola Tipps",
  ],
});

const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString("de-DE", {
    year: "numeric",
    month: "long",
    day: "2-digit",
  });

export default function RatgeberPage() {
  const url = "/ratgeber";
  const breadcrumbItems = [
    { name: "Startseite", url: "/" },
    { name: "Ratgeber", url },
  ];
  const breadcrumb = buildBreadcrumbSchema(breadcrumbItems);

  const sortedArticles = [...articles].sort((a, b) =>
    b.publishedAt.localeCompare(a.publishedAt),
  );

  const collection = buildCollectionPageSchema({
    url,
    name: "Ratgeber — Brait Überdachungen",
    description:
      "Wissens-Bibliothek rund um Aluminium-Überdachungen, Markisen und Pergolen.",
    itemUrls: sortedArticles.map((a) => ({
      name: a.title,
      url: `/ratgeber/${a.slug}`,
    })),
  });
  const webpage = buildWebPageSchema({
    url,
    name: "Ratgeber — Brait Überdachungen",
    description: "Detaillierte Long-form-Artikel zu Auswahl, Preis, Recht und Pflege.",
    breadcrumbId: breadcrumb["@id"] as string,
  });

  return (
    <>
      <JsonLd data={[webpage, breadcrumb, collection]} />
      <Layout>
        <Breadcrumbs items={breadcrumbItems} withoutSchema />

        <section className="container mx-auto px-5 md:px-8 pt-6 md:pt-8 pb-12 md:pb-16">
          <span className="text-primary text-[10px] md:text-xs font-bold tracking-[0.4em] uppercase mb-3 block">
            Ratgeber
          </span>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tighter mb-4 break-words">
            Wissen, das Sie vor dem Kauf brauchen
          </h1>
          <p className="text-secondary text-base md:text-lg max-w-2xl leading-relaxed">
            Acht detaillierte Artikel zu allem, was Sie über Terrassendächer,
            Markisen, Pergolen und Lamellendächer wissen sollten — Auswahl,
            Preise, Recht in BW, Material, Wartung und Energiekosten.
          </p>
        </section>

        <section className="container mx-auto px-5 md:px-8 pb-16 md:pb-24">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-1">
            {sortedArticles.map((a) => (
              <Link
                key={a.slug}
                href={`/ratgeber/${a.slug}`}
                className="group block bg-card hover:bg-surface-container-high transition-colors"
              >
                <div className="relative aspect-[16/10] overflow-hidden bg-surface-container">
                  <Image
                    src={a.image}
                    alt={a.imageAlt}
                    fill
                    sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                    quality={65}
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="p-6 md:p-7">
                  <div className="flex items-center justify-between mb-3 text-xs">
                    <span className="text-primary font-bold tracking-widest uppercase">
                      {a.category}
                    </span>
                    <span className="text-secondary">
                      {a.readingMinutes} Min · {formatDate(a.publishedAt)}
                    </span>
                  </div>
                  <h2 className="text-lg md:text-xl font-bold mb-3 leading-snug group-hover:text-primary transition-colors">
                    {a.title}
                  </h2>
                  <p className="text-secondary text-sm leading-relaxed mb-4 line-clamp-3">
                    {a.description}
                  </p>
                  <span className="inline-flex items-center gap-2 text-primary font-bold uppercase tracking-widest text-xs group-hover:gap-3 transition-all">
                    Lesen <ArrowRight className="w-4 h-4" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </Layout>
    </>
  );
}
