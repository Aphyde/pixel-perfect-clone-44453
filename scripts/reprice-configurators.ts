#!/usr/bin/env npx tsx
/**
 * Dokumentiert die Repricing-Regeln für configurators.ts (Mai 2026).
 * Preise wurden statisch angewendet — dieses Skript dient zur Verifikation.
 *
 * Typ A (Grundkonstruktion): (Mischpreis netto − Montage − 350) × 1,40
 * Typ B (Upsells): round(alter Bruttopreis ÷ 1,19 × 1,40)
 * Wartungspakete: unverändert (Abo-Preise)
 */
import {
  repriceBaseGrossFromMixedGross,
  repriceUpsellGrossFromGross,
} from "../src/lib/pricing/mixed-to-product";
import { montageNet } from "../src/lib/pricing/constants";

const checks = [
  { label: "Veranda 5×3 Floor (brutto)", got: 3770, want: repriceBaseGrossFromMixedGross(5490, montageNet("terrasse", 15)) },
  { label: "Q-Bus Basis (brutto)", got: 7839, want: repriceBaseGrossFromMixedGross(8990, montageNet("qbus")) },
  { label: "Markise Aufglas (brutto)", got: 2144, want: repriceBaseGrossFromMixedGross(2900, montageNet("markise")) },
  { label: "VSG Klarglas Upsell (brutto)", got: 3360, want: repriceUpsellGrossFromGross(2400) },
  { label: "LED dimmbar Upsell (brutto)", got: 1246, want: repriceUpsellGrossFromGross(890) },
];

let ok = true;
for (const c of checks) {
  const pass = c.got === c.want;
  if (!pass) ok = false;
  console.log(`${pass ? "✓" : "✗"} ${c.label}: ${c.got} (erwartet ${c.want})`);
}
process.exit(ok ? 0 : 1);
