import type { Metadata } from "next";
import { notFound } from "next/navigation";
import CategoryPageTemplate from "@/components/CategoryPageTemplate";
import ProductPageTemplate from "@/components/ProductPageTemplate";
import { categories, findCategory, toProductPageData } from "@/data/products";
import JsonLd from "@/components/seo/JsonLd";
import {
  buildBreadcrumbSchema,
  buildCollectionPageSchema,
  buildProductSchema,
  buildWebPageSchema,
} from "@/lib/seo/schema";
import { buildMetadata, CATEGORY_LONGTAIL } from "@/lib/seo/metadata";
import { getCategoryFaqs } from "@/data/faq";
import { buildFaqSchema } from "@/lib/seo/schema";
import { getCategoryLongForm } from "@/data/category-content";

interface Params {
  categorySlug: string;
}

export function generateStaticParams(): Params[] {
  return categories.map((c) => ({ categorySlug: c.slug }));
}

export function generateMetadata({ params }: { params: Params }): Metadata {
  const category = findCategory(params.categorySlug);
  if (!category) {
    return { title: "Nicht gefunden" };
  }
  const longtail = CATEGORY_LONGTAIL[category.slug];
  return buildMetadata({
    title: longtail?.titleLongTail ?? category.label,
    description: longtail?.descriptionLongTail ?? (category.shortDesc || category.longDesc),
    path: `/${category.slug}`,
    image: category.image ?? "/opengraph-image",
    keywords: longtail?.keywords,
  });
}

export default function CategoryPage({ params }: { params: Params }) {
  const category = findCategory(params.categorySlug);
  if (!category) notFound();

  const url = `/${category.slug}`;
  const breadcrumbItems = [
    { name: "Startseite", url: "/" },
    { name: category.label, url },
  ];
  const faqs = getCategoryFaqs(category.slug);
  const longForm = getCategoryLongForm(category.slug);

  if (category.singleProduct) {
    const others = categories
      .filter((c) => c.slug !== category.slug)
      .slice(0, 2)
      .map((c) => ({
        title: c.label,
        image: c.image,
        link: `/${c.slug}`,
      }));

    const productSchema = buildProductSchema({
      name: category.singleProduct.label,
      description: category.singleProduct.shortDesc,
      url,
      image: category.singleProduct.image,
      category: category.label,
    });
    const breadcrumb = buildBreadcrumbSchema(breadcrumbItems);
    const webpage = buildWebPageSchema({
      url,
      name: category.label,
      description: category.shortDesc ?? category.longDesc,
      breadcrumbId: breadcrumb["@id"] as string,
      primaryImage: category.image,
      speakableSelectors: ["h1", ".hero-subtitle"],
    });
    const graph = [webpage, breadcrumb, productSchema];
    if (faqs.length > 0) graph.push(buildFaqSchema(faqs, url));

    return (
      <>
        <JsonLd data={graph} />
        <ProductPageTemplate
          data={toProductPageData(category.singleProduct, others, category.slug)}
          breadcrumbs={breadcrumbItems}
          faqs={faqs}
          longForm={longForm}
          longFormLabel={category.label}
        />
      </>
    );
  }

  const otherCategories = categories
    .filter((c) => c.slug !== category.slug)
    .slice(0, 3)
    .map((c) => ({
      label: c.label,
      image: c.image,
      link: `/${c.slug}`,
    }));

  const productItems = category.products.map((p) => ({
    name: p.label,
    url: `/${category.slug}/${p.slug}`,
  }));
  const collection = buildCollectionPageSchema({
    url,
    name: category.label,
    description: category.longDesc,
    itemUrls: productItems,
  });
  const breadcrumb = buildBreadcrumbSchema(breadcrumbItems);
  const webpage = buildWebPageSchema({
    url,
    name: category.label,
    description: category.shortDesc ?? category.longDesc,
    breadcrumbId: breadcrumb["@id"] as string,
    primaryImage: category.image,
    speakableSelectors: ["h1", ".hero-subtitle"],
  });
  const graph: object[] = [webpage, breadcrumb, collection];
  if (faqs.length > 0) graph.push(buildFaqSchema(faqs, url));

  return (
    <>
      <JsonLd data={graph} />
      <CategoryPageTemplate
        category={category}
        otherCategories={otherCategories}
        breadcrumbs={breadcrumbItems}
        faqs={faqs}
        longForm={longForm}
      />
    </>
  );
}
