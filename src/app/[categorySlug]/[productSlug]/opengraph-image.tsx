import { findCategory, findProduct } from "@/data/products";
import { renderOgImage, ogSize, ogContentType } from "@/lib/seo/og-image";
import { SITE_URL } from "@/lib/seo/site";

export const runtime = "edge";
export const size = ogSize;
export const contentType = ogContentType;

export const alt = "Brait Überdachungen — Produktdetail";

export default async function OgImage({
  params,
}: {
  params: { categorySlug: string; productSlug: string };
}) {
  const cat = findCategory(params.categorySlug);
  const prod = findProduct(params.categorySlug, params.productSlug);

  const title = prod?.label ?? "Brait Überdachungen";
  const subtitle = prod?.shortDesc ?? cat?.shortDesc ?? "Premium-Überdachungen aus Ulm";

  const bgImage = prod?.hero?.heroImage
    ? `${SITE_URL}${prod.hero.heroImage}`
    : prod?.image
      ? `${SITE_URL}${prod.image}`
      : undefined;

  return renderOgImage({
    badge: cat?.label ?? "Produkt",
    title,
    subtitle,
    bgImage,
  });
}
