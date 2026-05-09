import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ProductPageTemplate from "@/components/ProductPageTemplate";
import {
  categories,
  findCategory,
  findProduct,
  toProductPageData,
} from "@/data/products";

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
  return {
    title: product.label,
    description: product.shortDesc,
    alternates: { canonical: url },
    openGraph: {
      url,
      title: `${product.label} – Brait Überdachungen`,
      description: product.shortDesc,
      images: product.image ? [product.image] : undefined,
    },
  };
}

export default function ProductPage({ params }: { params: Params }) {
  const category = findCategory(params.categorySlug);
  const product = findProduct(params.categorySlug, params.productSlug);
  if (!category || !product) notFound();

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

  return <ProductPageTemplate data={toProductPageData(product, others, category.slug)} />;
}
