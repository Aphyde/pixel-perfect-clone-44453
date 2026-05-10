import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import Layout from "@/components/Layout";
import Breadcrumbs from "@/components/seo/Breadcrumbs";
import JsonLd from "@/components/seo/JsonLd";
import {
  buildArticleSchema,
  buildBreadcrumbSchema,
  buildWebPageSchema,
} from "@/lib/seo/schema";
import { buildMetadata } from "@/lib/seo/metadata";
import { articles, findArticle } from "@/data/articles";
import { FOUNDER_NAME } from "@/lib/seo/site";
import { ArrowRight, Clock, Calendar } from "lucide-react";

interface Params {
  slug: string;
}

export function generateStaticParams(): Params[] {
  return articles.map((a) => ({ slug: a.slug }));
}

export function generateMetadata({ params }: { params: Params }): Metadata {
  const article = findArticle(params.slug);
  if (!article) return { title: "Nicht gefunden" };
  return buildMetadata({
    title: article.metaTitle ?? article.title,
    description: article.description,
    path: `/ratgeber/${article.slug}`,
    image: article.image,
    keywords: article.keywords,
    ogType: "article",
    publishedTime: article.publishedAt,
    modifiedTime: article.updatedAt,
    authors: [FOUNDER_NAME],
  });
}

const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString("de-DE", {
    year: "numeric",
    month: "long",
    day: "2-digit",
  });

export default function RatgeberArticlePage({ params }: { params: Params }) {
  const article = findArticle(params.slug);
  if (!article) notFound();

  const url = `/ratgeber/${article.slug}`;
  const breadcrumbItems = [
    { name: "Startseite", url: "/" },
    { name: "Ratgeber", url: "/ratgeber" },
    { name: article.title, url },
  ];
  const breadcrumb = buildBreadcrumbSchema(breadcrumbItems);
  const articleSchema = buildArticleSchema({
    url,
    headline: article.title,
    description: article.description,
    image: article.image,
    datePublished: article.publishedAt,
    dateModified: article.updatedAt ?? article.publishedAt,
    authorName: FOUNDER_NAME,
    authorUrl: "/ueber-uns",
    keywords: article.keywords,
    articleSection: article.category,
  });
  const webpage = buildWebPageSchema({
    url,
    name: article.title,
    description: article.description,
    breadcrumbId: breadcrumb["@id"] as string,
    primaryImage: article.image,
    speakableSelectors: ["h1", ".speakable-tldr"],
  });

  const relatedArticles = (article.related ?? [])
    .map((slug) => findArticle(slug))
    .filter(Boolean) as typeof articles;

  return (
    <>
      <JsonLd data={[webpage, breadcrumb, articleSchema]} />
      <Layout>
        <Breadcrumbs items={breadcrumbItems} withoutSchema />

        <article className="container mx-auto px-5 md:px-8 pt-6 md:pt-8 pb-16 md:pb-24 max-w-3xl">
          <header className="mb-8 md:mb-10">
            <span className="text-primary text-[10px] md:text-xs font-bold tracking-[0.4em] uppercase mb-3 block">
              {article.category}
            </span>
            <h1 className="text-3xl md:text-5xl font-bold tracking-tighter mb-5 break-words leading-tight">
              {article.title}
            </h1>
            <div className="flex flex-wrap items-center gap-4 text-xs text-secondary mb-6">
              <span className="inline-flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5" aria-hidden />
                {formatDate(article.publishedAt)}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5" aria-hidden />
                {article.readingMinutes} Min Lesezeit
              </span>
              <span>
                von{" "}
                <Link href="/ueber-uns" className="text-primary hover:underline">
                  {FOUNDER_NAME}
                </Link>
              </span>
            </div>

            {/* Hero image */}
            <div className="relative aspect-[16/9] overflow-hidden bg-surface-container mb-8">
              <Image
                src={article.image}
                alt={article.imageAlt}
                fill
                priority
                quality={70}
                sizes="(min-width: 1024px) 768px, 100vw"
                className="object-cover"
              />
            </div>

            {/* TL;DR */}
            <div className="border-l-4 border-primary bg-card p-5 md:p-6 speakable-tldr">
              <span className="text-primary text-[10px] font-bold tracking-[0.3em] uppercase block mb-2">
                In 30 Sekunden
              </span>
              <p className="text-base md:text-lg leading-relaxed">{article.tldr}</p>
            </div>
          </header>

          <div className="prose prose-neutral max-w-none">
            {article.sections.map((section, i) => (
              <section key={i} className="mb-10">
                {section.heading && (
                  <>
                    {(section.heading.level ?? 2) === 2 ? (
                      <h2 className="text-2xl md:text-3xl font-bold tracking-tight mt-2 mb-4">
                        {section.heading.text}
                      </h2>
                    ) : (
                      <h3 className="text-xl md:text-2xl font-bold tracking-tight mt-2 mb-3">
                        {section.heading.text}
                      </h3>
                    )}
                  </>
                )}

                {section.factBox && (
                  <div className="bg-surface-container-low border-l-4 border-primary p-5 md:p-6 my-6">
                    <h4 className="font-bold mb-3">{section.factBox.title}</h4>
                    <ul className="space-y-2">
                      {section.factBox.items.map((item, j) => (
                        <li
                          key={j}
                          className="flex items-start gap-3 text-sm md:text-base"
                        >
                          <span
                            className="block w-1.5 h-1.5 bg-primary mt-2 shrink-0"
                            aria-hidden
                          />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {section.paragraphs?.map((p, j) => (
                  <p
                    key={j}
                    className="text-secondary leading-relaxed text-base mb-4"
                  >
                    {p}
                  </p>
                ))}

                {section.bullets && (
                  <ul className="my-5 space-y-2">
                    {section.bullets.map((b, j) => (
                      <li
                        key={j}
                        className="flex items-start gap-3 text-secondary text-base"
                      >
                        <span
                          className="block w-1.5 h-1.5 bg-primary mt-2 shrink-0"
                          aria-hidden
                        />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                )}

                {section.table && (
                  <div className="overflow-x-auto -mx-5 md:mx-0 my-6">
                    <table className="w-full text-sm border-collapse">
                      <thead>
                        <tr className="border-b-2 border-primary/30">
                          {section.table.columns.map((c, j) => (
                            <th
                              key={j}
                              className="text-left p-3 md:p-4 font-bold uppercase tracking-wider text-xs"
                            >
                              {c}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {section.table.rows.map((row, j) => (
                          <tr
                            key={j}
                            className="border-b border-outline-variant/30"
                          >
                            {row.map((cell, k) => (
                              <td
                                key={k}
                                className={`p-3 md:p-4 align-top ${
                                  k === 0
                                    ? "font-semibold text-foreground"
                                    : "text-secondary"
                                }`}
                              >
                                {cell}
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </section>
            ))}
          </div>

          {article.relatedProducts && article.relatedProducts.length > 0 && (
            <aside className="mt-12 md:mt-16 bg-card p-6 md:p-8 border-l-2 border-primary">
              <h3 className="font-bold text-lg mb-4">
                Produkte zu diesem Thema
              </h3>
              <ul className="space-y-2">
                {article.relatedProducts.map((p) => (
                  <li key={p.href}>
                    <Link
                      href={p.href}
                      className="inline-flex items-center gap-2 text-primary hover:underline font-semibold"
                    >
                      {p.label} <ArrowRight className="w-4 h-4" />
                    </Link>
                  </li>
                ))}
              </ul>
            </aside>
          )}
        </article>

        {relatedArticles.length > 0 && (
          <section className="bg-surface py-16 md:py-24">
            <div className="container mx-auto px-5 md:px-8 max-w-5xl">
              <h2 className="text-2xl md:text-4xl font-bold tracking-tighter mb-8">
                Verwandte Themen
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-1">
                {relatedArticles.map((a) => (
                  <Link
                    key={a.slug}
                    href={`/ratgeber/${a.slug}`}
                    className="group block bg-card p-6 hover:bg-surface-container-high transition-colors"
                  >
                    <span className="text-primary text-xs font-bold tracking-widest uppercase block mb-2">
                      {a.category}
                    </span>
                    <h3 className="font-bold text-base mb-3 leading-snug group-hover:text-primary transition-colors">
                      {a.title}
                    </h3>
                    <span className="text-xs text-secondary inline-flex items-center gap-2">
                      Lesen <ArrowRight className="w-3 h-3" />
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}
      </Layout>
    </>
  );
}
