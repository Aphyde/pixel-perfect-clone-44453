import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ProductPageTemplate from "@/components/ProductPageTemplate";
import {
  categories,
  findCategory,
  findProduct,
  toProductPageData,
} from "@/data/products";
import JsonLd from "@/components/seo/JsonLd";
import {
  buildBreadcrumbSchema,
  buildFaqSchema,
  buildProductSchema,
  buildWebPageSchema,
} from "@/lib/seo/schema";
import { buildMetadata } from "@/lib/seo/metadata";
import { getProductFaqs } from "@/data/faq";

interface Params {
  categorySlug: string;
  productSlug: string;
}

export function generateStaticParams(): Params[] {
  return categories.flatMap((c) =>
    c.products.map((p) => ({ categorySlug: c.slug, productSlug: p.slug })),
  );
}

export function generateMetadata({ params }: { params: Params }): Metadata {
  const product = findProduct(params.categorySlug, params.productSlug);
  if (!product) {
    return { title: "Nicht gefunden" };
  }
  const url = `/${params.categorySlug}/${params.productSlug}`;
  return buildMetadata({
    title: `${product.label} Ulm`,
    description: product.shortDesc,
    path: url,
    image: product.image,
    keywords: [product.label, `${product.label} Ulm`, "Brait Überdachungen"],
  });
}

export default function ProductPage({ params }: { params: Params }) {
  const category = findCategory(params.categorySlug);
  const product = findProduct(params.categorySlug, params.productSlug);
  if (!category || !product) notFound();

  const url = `/${category.slug}/${product.slug}`;

  const siblings = category.products
    .filter((p) => p.slug !== product.slug)
    .slice(0, 2)
    .map((p) => ({
      title: p.label,
      image: p.image,
      link: `/${category.slug}/${p.slug}`,
    }));

  const others =
    siblings.length >= 2
      ? siblings
      : [
          ...siblings,
          ...categories
            .filter((c) => c.slug !== category.slug)
            .slice(0, 2 - siblings.length)
            .map((c) => ({ title: c.label, image: c.image, link: `/${c.slug}` })),
        ];

  const breadcrumbItems = [
    { name: "Startseite", url: "/" },
    { name: category.label, url: `/${category.slug}` },
    { name: product.label, url },
  ];
  const breadcrumb = buildBreadcrumbSchema(breadcrumbItems);
  const productSchema = buildProductSchema({
    name: product.label,
    description: product.shortDesc,
    url,
    image: [product.image, product.hero.heroImage, product.hero.detailImage].filter(Boolean),
    category: category.label,
  });
  const webpage = buildWebPageSchema({
    url,
    name: `${product.label} — ${category.label}`,
    description: product.shortDesc,
    breadcrumbId: breadcrumb["@id"] as string,
    primaryImage: product.hero.heroImage,
    speakableSelectors: ["h1", ".hero-subtitle"],
  });
  const faqs = getProductFaqs(category.slug, product.slug);
  const graph: object[] = [webpage, breadcrumb, productSchema];
  if (faqs.length > 0) graph.push(buildFaqSchema(faqs, url));

  return (
    <>
      <JsonLd data={graph} />
      <ProductPageTemplate
        data={toProductPageData(product, others, category.slug)}
        breadcrumbs={breadcrumbItems}
        faqs={faqs}
      />
    </>
  );
}
