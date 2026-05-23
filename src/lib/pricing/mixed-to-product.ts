import {
  DELIVERY_NET,
  PRODUCT_MARKUP,
  SO_PURCHASE_FACTOR,
  TARGET_MARGIN,
  montageNet,
  type MontageCategory,
} from "./constants";

/** Brutto-Konfiguratorpreis (alt, inkl. MwSt.) → Netto */
export function grossToNet(gross: number): number {
  return Math.round(gross / 1.19);
}

/** Netto-Produktpreis → Brutto für Konfigurator-Anzeige (inkl. MwSt., exkl. Montage). */
export function netToGross(net: number): number {
  return Math.round(net * 1.19);
}

/** Typ A — Grundkonstruktion direkt als Brutto für den Konfigurator. */
export function repriceBaseGrossFromMixedGross(
  mixedGross: number,
  montageNet: number,
  deliveryNet = DELIVERY_NET,
): number {
  return netToGross(repriceBaseFromMixedGross(mixedGross, montageNet, deliveryNet));
}

/** Typ B — Upsell direkt als Brutto für den Konfigurator. */
export function repriceUpsellGrossFromGross(oldGross: number): number {
  return Math.round(oldGross * PRODUCT_MARKUP);
}

/**
 * Typ A — Grundkonstruktion (Nico / Gespräch Mai 2026):
 * Zuerst Montage + Lieferung abziehen, dann Produkt × 1,40.
 */
export function repriceBaseFromMixedNet(
  mixedNet: number,
  montageNet: number,
  deliveryNet = DELIVERY_NET,
): number {
  return Math.round((mixedNet - montageNet - deliveryNet) * PRODUCT_MARKUP);
}

export function repriceBaseFromMixedGross(
  mixedGross: number,
  montageNet: number,
  deliveryNet = DELIVERY_NET,
): number {
  return repriceBaseFromMixedNet(grossToNet(mixedGross), montageNet, deliveryNet);
}

/**
 * Typ B — Upsells ohne Montage in der Mischkalkulation:
 * alter Bruttopreis → netto × 1,40
 */
export function repriceUpsellFromGross(oldGross: number): number {
  return Math.round((oldGross / 1.19) * PRODUCT_MARKUP);
}

/**
 * Typ B — kostenbasiert: SO-Optionspreis + Mindestmarge (Nico: Marge über Produkt).
 * `purchaseFactor` default 0,85 (provisorisch bis Fatih-Rabatt steht).
 */
export function repriceUpsellFromSoCost(
  soListNet: number,
  minMargin = 0.5,
  purchaseFactor = SO_PURCHASE_FACTOR.provisional,
): number {
  const cost = soListNet * purchaseFactor;
  return Math.round(cost / (1 - minMargin));
}

/** Gesamt netto für den Endkunden */
export function customerTotalNet(
  productNet: number,
  montageNet: number,
  deliveryNet = DELIVERY_NET,
): number {
  return productNet + montageNet + deliveryNet;
}

/** Nettomarge auf Gesamtauftrag (Montage ≈ Break-even angenommen). */
export function netMarginOnOrder(
  productNet: number,
  montageNet: number,
  materialNet: number,
  deliveryNet = DELIVERY_NET,
  montageInternal = montageNet,
): number {
  const revenue = customerTotalNet(productNet, montageNet, deliveryNet);
  const cost = materialNet + montageInternal + deliveryNet;
  return (revenue - cost) / revenue;
}

/**
 * Mindest-Produktpreis netto für Zielmarge bei bekanntem SO-Materialeinsatz.
 * P ≥ (Mat + ZielMarge × (Montage + Lieferung)) / (1 − ZielMarge)
 */
export function minProductNetForMargin(
  materialNet: number,
  montageNet: number,
  targetMargin = TARGET_MARGIN,
  deliveryNet = DELIVERY_NET,
): number {
  const numerator = materialNet + targetMargin * (montageNet + deliveryNet);
  return Math.round(numerator / (1 - targetMargin));
}

/** Hybrid: Marktformel, aber nie unter kostenbasierter Mindestmarge (SO-validiert). */
export function repriceBaseHybrid(
  mixedNet: number,
  montageNet: number,
  materialListNet: number,
  purchaseFactor = SO_PURCHASE_FACTOR.provisional,
  deliveryNet = DELIVERY_NET,
): number {
  const market = repriceBaseFromMixedNet(mixedNet, montageNet, deliveryNet);
  const material = Math.round(materialListNet * purchaseFactor);
  const floor = minProductNetForMargin(material, montageNet, TARGET_MARGIN, deliveryNet);
  return Math.max(market, floor);
}

export function repriceTerrasseBase(
  mixedNet: number,
  areaM2: number,
): number {
  return repriceBaseFromMixedNet(mixedNet, montageNet("terrasse", areaM2));
}

export { DELIVERY_NET, PRODUCT_MARKUP, montageNet, type MontageCategory };
