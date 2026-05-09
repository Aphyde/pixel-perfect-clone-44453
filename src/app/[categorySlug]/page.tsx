import type { Metadata } from "next";
import { notFound } from "next/navigation";
import CategoryPageTemplate from "@/components/CategoryPageTemplate";
import ProductPageTemplate from "@/components/ProductPageTemplate";
import { categories, findCategory, toProductPageData } from "@/data/products";

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
  const url = `/${category.slug}`;
  return {
    title: category.label,
    description: category.shortDesc ?? category.longDesc,
    alternates: { canonical: url },
    openGraph: {
      url,
      title: `${category.label} – Brait Überdachungen`,
      description: category.shortDesc ?? category.longDesc,
      images: category.image ? [category.image] : undefined,
    },
  };
}

export default function CategoryPage({ params }: { params: Params }) {
  const category = findCategory(params.categorySlug);
  if (!category) notFound();

  if (category.singleProduct) {
    const others = categories
      .filter((c) => c.slug !== category.slug)
      .slice(0, 2)
      .map((c) => ({
        title: c.label,
        image: c.image,
        link: `/${c.slug}`,
      }));
    return (
      <ProductPageTemplate
        data={toProductPageData(category.singleProduct, others, category.slug)}
      />
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

  return <CategoryPageTemplate category={category} otherCategories={otherCategories} />;
}
