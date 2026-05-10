import { findCategory } from "@/data/products";
import { renderOgImage, ogSize, ogContentType } from "@/lib/seo/og-image";
import { CATEGORY_LONGTAIL } from "@/lib/seo/metadata";
import { SITE_URL } from "@/lib/seo/site";

export const runtime = "edge";
export const size = ogSize;
export const contentType = ogContentType;

export const alt = "Brait Überdachungen — Kategorie";

export default async function OgImage({
  params,
}: {
  params: { categorySlug: string };
}) {
  const cat = findCategory(params.categorySlug);
  const longtail = CATEGORY_LONGTAIL[params.categorySlug];

  const title =
    longtail?.titleLongTail.split(" — ")[0] ?? cat?.label ?? "Brait Überdachungen";
  const subtitle = longtail?.descriptionLongTail
    ? longtail.descriptionLongTail.slice(0, 150)
    : (cat?.shortDesc ?? "Premium-Überdachungen aus Ulm");

  const bgImage = cat?.image ? `${SITE_URL}${cat.image}` : undefined;

  return renderOgImage({
    badge: cat?.label ?? "Brait Überdachungen",
    title,
    subtitle,
    bgImage,
  });
}
