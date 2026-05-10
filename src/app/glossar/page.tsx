import type { Metadata } from "next";
import Link from "next/link";
import Layout from "@/components/Layout";
import Breadcrumbs from "@/components/seo/Breadcrumbs";
import JsonLd from "@/components/seo/JsonLd";
import {
  buildBreadcrumbSchema,
  buildDefinedTermSetSchema,
  buildWebPageSchema,
} from "@/lib/seo/schema";
import { buildMetadata } from "@/lib/seo/metadata";
import { glossaryTerms, groupedGlossary } from "@/data/glossary";

export const metadata: Metadata = buildMetadata({
  title: "Glossar — Fachbegriffe für Terrassendächer, Markisen & Pergolen",
  description:
    "Über 30 erklärte Fachbegriffe rund um Aluminium-Überdachungen: Lamellendach, Zip-Screen, VSG-Glas, Schneelastzone, Pulverbeschichtung, RAL-Farbe und vieles mehr. Klar, faktisch, kompakt.",
  path: "/glossar",
  keywords: [
    "Glossar Terrassendach",
    "Markisen Begriffe",
    "Pergola Glossar",
    "Aluminium-Konstruktion Begriffe",
    "VSG ESG Unterschied",
  ],
});

export default function GlossarPage() {
  const url = "/glossar";
  const breadcrumbItems = [
    { name: "Startseite", url: "/" },
    { name: "Glossar", url },
  ];
  const breadcrumb = buildBreadcrumbSchema(breadcrumbItems);
  const termSet = buildDefinedTermSetSchema({
    url,
    name: "Glossar — Brait Überdachungen",
    description:
      "Definierte Fachbegriffe rund um Aluminium-Überdachungen, Markisen, Pergolen und Glastechnik.",
    terms: glossaryTerms.map((t) => ({
      termCode: t.slug,
      name: t.name,
      description: t.description,
      url: `/glossar#${t.slug}`,
    })),
  });
  const webpage = buildWebPageSchema({
    url,
    name: "Glossar — Brait Überdachungen",
    description: "Fachbegriffe rund um Aluminium-Überdachungen klar erklärt.",
    breadcrumbId: breadcrumb["@id"] as string,
  });
  const grouped = groupedGlossary();

  return (
    <>
      <JsonLd data={[webpage, breadcrumb, termSet]} />
      <Layout>
        <Breadcrumbs items={breadcrumbItems} withoutSchema />

        <section className="container mx-auto px-5 md:px-8 pt-6 md:pt-8 pb-12">
          <span className="text-primary text-[10px] md:text-xs font-bold tracking-[0.4em] uppercase mb-3 block">
            Glossar
          </span>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tighter mb-4 break-words">
            Fachbegriffe verständlich erklärt
          </h1>
          <p className="text-secondary text-base md:text-lg max-w-2xl leading-relaxed">
            Über 30 Begriffe rund um Aluminium-Überdachungen, Markisen, Pergolen
            und Glastechnik — klar, faktisch, kompakt. Für alle, die wissen
            wollen, worüber sie reden, bevor sie kaufen.
          </p>
        </section>

        {/* Quick anchor nav */}
        <section className="container mx-auto px-5 md:px-8 mb-10">
          <div className="flex flex-wrap gap-2 text-xs md:text-sm">
            {grouped.map(([category]) => (
              <a
                key={category}
                href={`#cat-${category.toLowerCase()}`}
                className="border border-outline-variant/50 px-3 py-1.5 hover:bg-primary hover:text-primary-foreground hover:border-primary transition-colors"
              >
                {category}
              </a>
            ))}
          </div>
        </section>

        {/* Grouped terms */}
        <section className="container mx-auto px-5 md:px-8 pb-16 md:pb-24">
          <div className="max-w-4xl">
            {grouped.map(([category, terms]) => (
              <div
                key={category}
                id={`cat-${category.toLowerCase()}`}
                className="mb-12 md:mb-16"
              >
                <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-6 border-b border-primary/30 pb-3">
                  {category}
                </h2>
                <dl className="space-y-6">
                  {terms.map((t) => (
                    <div
                      key={t.slug}
                      id={t.slug}
                      className="scroll-mt-32 border-l-2 border-primary/30 pl-5"
                    >
                      <dt className="font-bold text-lg mb-1">
                        {t.name}
                        {t.synonyms && t.synonyms.length > 0 && (
                          <span className="font-normal text-sm text-secondary ml-2">
                            ({t.synonyms.join(", ")})
                          </span>
                        )}
                      </dt>
                      <dd className="text-secondary text-sm md:text-base leading-relaxed">
                        {t.description}
                        {t.longDescription && (
                          <span className="block mt-2">
                            {t.longDescription}
                          </span>
                        )}
                        {t.related && t.related.length > 0 && (
                          <span className="block mt-2 text-xs">
                            <span className="font-semibold uppercase tracking-wider text-foreground/60">
                              Verwandt:
                            </span>{" "}
                            {t.related.map((r, i) => (
                              <span key={r}>
                                <Link
                                  href={`#${r}`}
                                  className="text-primary hover:underline"
                                >
                                  {r.replace(/-/g, " ")}
                                </Link>
                                {i < t.related!.length - 1 ? ", " : ""}
                              </span>
                            ))}
                          </span>
                        )}
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>
            ))}
          </div>
        </section>
      </Layout>
    </>
  );
}
