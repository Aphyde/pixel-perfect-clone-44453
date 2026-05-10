/**
 * Strukturierte Review-Datenbasis. Initial leer — wird befüllt,
 * sobald echte Kundenbewertungen vorliegen. Schema-Builder
 * können `aggregateRating` direkt auf LocalBusiness und einzelne
 * `Review`-Items auf Product anhängen.
 */

export interface Review {
  /** Eindeutige ID — z.B. google-2026-04-15-mh */
  id: string;
  authorName: string;
  /** 1.0 - 5.0 */
  rating: number;
  /** ISO-Datum */
  date: string;
  body: string;
  /** Optional: bezieht sich auf konkretes Produkt-/Kategorie-Slug. */
  productSlug?: string;
  /** Quelle, z.B. "Google", "ProvenExpert", "Trustpilot". */
  source?: string;
  /** Optionaler Quellen-URL. */
  sourceUrl?: string;
}

/**
 * Liste echter Reviews. Aktuell leer, da bisher keine
 * strukturierten Bewertungen erfasst wurden.
 */
export const reviews: Review[] = [];

export const getAggregateRating = () => {
  if (reviews.length === 0) return null;
  const total = reviews.reduce((sum, r) => sum + r.rating, 0);
  return {
    ratingValue: Number((total / reviews.length).toFixed(2)),
    reviewCount: reviews.length,
    bestRating: 5,
    worstRating: 1,
  };
};

export const getProductReviews = (slug: string) =>
  reviews.filter((r) => r.productSlug === slug);
