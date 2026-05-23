/** Netto-Kundenpreise laut Nico (Gespräch Mai 2026) — zzgl. 19 % MwSt. */
export const DELIVERY_NET = 350;

/** Produkt-Aufschlag auf den reinen Material-/Produktanteil (nach Abzug Montage + Lieferung). */
export const PRODUCT_MARKUP = 1.4;

/**
 * Provisorischer Einkaufsrabatt auf SO-Aluminium-Listenpreise, bis Verhandlung abgeschlossen.
 * Nico: „vorsichtshalber 10–15 % runter“, Verhandlungsziel −30 %.
 */
export const SO_PURCHASE_FACTOR = {
  list: 1,
  provisional: 0.85,
  target: 0.7,
} as const;

/** Ziel-Nettomarge auf Gesamtauftrag (Produkt + Montage + Lieferung). */
export const TARGET_MARGIN = 0.35;

export type MontageCategory =
  | "terrasse"
  | "cube"
  | "qbus"
  | "carport"
  | "markise"
  | "eingang"
  | "schirm";

/** Montage-Pauschalen netto (Kundenpreis, nicht interne Kosten). */
export const MONTAGE_NET: Record<
  Exclude<MontageCategory, "terrasse">,
  number
> = {
  cube: 2500,
  qbus: 2500,
  carport: 1800,
  markise: 800,
  eingang: 1000,
  schirm: 0,
};

/** Terrasse: ab 2.000 € bis 15 m², danach +90 €/m² (netto). */
export function montageTerrasseNet(areaM2: number): number {
  return Math.max(2000, 2000 + Math.max(0, areaM2 - 15) * 90);
}

export function montageNet(
  category: MontageCategory,
  areaM2 = 15,
): number {
  if (category === "terrasse") return montageTerrasseNet(areaM2);
  return MONTAGE_NET[category];
}
