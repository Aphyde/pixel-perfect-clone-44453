#!/usr/bin/env npx tsx
/**
 * Validiert Nico-Kalkulation gegen SO Aluminium Händlerpreise V.2026.05.
 * Ausgabe: Markdown-Tabelle für Bericht / Review.
 */
import {
  customerTotalNet,
  minProductNetForMargin,
  netMarginOnOrder,
  repriceBaseFromMixedGross,
  repriceBaseFromMixedNet,
  repriceUpsellFromGross,
  repriceUpsellFromSoCost,
} from "../src/lib/pricing/mixed-to-product";
import { SO_PURCHASE_FACTOR, montageNet } from "../src/lib/pricing/constants";
import {
  SO_LED_DIM_10,
  SO_SCHIEBEWAND_KLAR_3R,
  soMaterialNet,
  soVsgUpgradeNet,
} from "../src/lib/pricing/so-aluminium-2026-05";

const fmt = (n: number) =>
  n.toLocaleString("de-DE", { maximumFractionDigits: 0 }) + " €";
const pct = (n: number) => (n * 100).toFixed(1) + " %";

console.log("# Validierung: Nico-Kalkulation × SO Aluminium V.2026.05\n");

console.log("## Grundprodukte\n");
console.log("| Produkt | SO Mat. (Liste) | Produkt netto | Gesamt netto | Marge @ Liste | Marge @ −15 % | Marge @ −30 % | Min. Produkt (35 %) |");
console.log("|---|---:|---:|---:|---:|---:|---:|---:|");

const bases = [
  { label: "Pro-Line 5×3 PC", gross: 5490, area: 15, w: 5, d: 3, so: "proline_pc" as const, cat: "terrasse" as const },
  { label: "Pro-Line 6×4 PC", gross: 8784, area: 24, w: 6, d: 4, so: "proline_pc" as const, cat: "terrasse" as const },
  { label: "Cube 5×3 Glas", gross: 6990, area: 15, w: 5, d: 3, so: "cube_glas_klar" as const, cat: "cube" as const },
  { label: "Q-Bus 5×3", gross: 8990, area: 15, w: 5, d: 3, so: "louvre" as const, cat: "qbus" as const },
];

for (const b of bases) {
  const mont = montageNet(b.cat, b.area);
  const product = repriceBaseFromMixedGross(b.gross, mont);
  const total = customerTotalNet(product, mont);
  const matList = soMaterialNet(b.so, b.w, b.d) ?? 0;
  const mList = netMarginOnOrder(product, mont, matList);
  const mProv = netMarginOnOrder(product, mont, matList * SO_PURCHASE_FACTOR.provisional);
  const mTarget = netMarginOnOrder(product, mont, matList * SO_PURCHASE_FACTOR.target);
  const minProd = minProductNetForMargin(
    matList * SO_PURCHASE_FACTOR.target,
    mont,
  );
  console.log(
    `| ${b.label} | ${fmt(matList)} | ${fmt(product)} | ${fmt(total)} | ${pct(mList)} | ${pct(mProv)} | ${pct(mTarget)} | ${fmt(minProd)} |`,
  );
}

console.log("\n## Upsells (5×3 Referenz)\n");
console.log("| Option | SO Liste | Marktformel netto | Kostenbasiert (50 %) |");
console.log("|---|---:|---:|---:|");

const vsgSo = soVsgUpgradeNet(5, 3) ?? 0;
console.log(
  `| VSG Klarglas Aufpreis | ${fmt(vsgSo)} | ${fmt(repriceUpsellFromGross(2400))} | ${fmt(repriceUpsellFromSoCost(vsgSo))} |`,
);
console.log(
  `| Glas-Schiebewand klar (3-Rail) | ${fmt(SO_SCHIEBEWAND_KLAR_3R)} | ${fmt(repriceUpsellFromGross(2890))} | ${fmt(repriceUpsellFromSoCost(SO_SCHIEBEWAND_KLAR_3R))} |`,
);
console.log(
  `| LED dimmbar 10 Spots | ${fmt(SO_LED_DIM_10)} | ${fmt(repriceUpsellFromGross(890))} | ${fmt(repriceUpsellFromSoCost(SO_LED_DIM_10))} |`,
);

console.log("\n## Nico-Referenz Basis-Produkt (intern)\n");
const nicoCost = 3650;
const nicoRevenue = 6460;
console.log(`- Interne Kosten (Nico): ${fmt(nicoCost)}`);
console.log(`- Einnahmen netto (Nico): ${fmt(nicoRevenue)}`);
console.log(`- Nettomarge: ${pct((nicoRevenue - nicoCost) / nicoRevenue)}`);
const so5x3 = soMaterialNet("proline_pc", 5, 3)!;
console.log(`- SO Mat. 5×3 PC Liste: ${fmt(so5x3)} + Lieferung 350 € + Montage intern ~2.000 € ≈ ${fmt(so5x3 + 2350)}`);

console.log("\n## Fazit\n");
console.log("- **Pro-Line (PC):** Marktformel ×1,40 erfüllt 30–40 % Zielmarge bei SO-Listenpreis.");
console.log("- **Cube / Q-Bus:** Marktformel allein reicht nicht — Fatih-Rabatt ~35–40 % nötig oder Hybrid-Preis (Kapitel 11).");
console.log("- **Upsells:** Marktformel deutlich über SO-Kosten — Marge gesichert.");
