/**
 * Auszug SO Aluminium Händlerpreise V.2026.05 (exkl. MwSt.).
 * Maße in mm — Konfigurator-Meter werden auf nächstgrößere SO-Spalte/-Zeile gerundet.
 */
export type SoProductKey =
  | "proline_pc"
  | "proline_glas_klar"
  | "proline_glas_opal"
  | "cube_glas_klar"
  | "louvre";

const PROLINE_WIDTHS = [3060, 4060, 5060, 6060, 7060, 8060, 9060, 10060, 11060, 12060] as const;
const PROLINE_DEPTHS = [2000, 2500, 3000, 3500, 4000, 4500, 5000, 5500, 6000] as const;

/** PRO-Line Polycarbonat Klar/Opal — Seite 3 */
const PROLINE_PC: Record<string, number> = {
  "3060x2000": 617,
  "4060x2000": 726,
  "5060x2000": 837,
  "5060x3000": 1058,
  "6060x4000": 1387,
  "7060x4000": 1631,
};

/** PRO-Line Glasdach 44.2 Klar — Seite 5 */
const PROLINE_GLAS_KLAR: Record<string, number> = {
  "5060x3000": 1841,
  "6060x4000": 2817,
};

/** LUXALINE CUBE Glasdach Klar — Seite 8 (Breite × Tiefe) */
const CUBE_GLAS: Record<string, number> = {
  "5052x3000": 5102,
  "6016x3500": 6091,
};

/** LUXALINE LOUVRE Lamellendach — Seite 9 */
const LOUVRE: Record<string, number> = {
  "4990x3000": 9791,
  "5196x4000": 10926,
};

/** Glasschiebewand 3-Rail Klarglas — Seite 10 */
export const SO_SCHIEBEWAND_KLAR_3R = 545;

/** LED dimmbar 10 Spots — Seite 23 */
export const SO_LED_DIM_10 = 181.82;

function snapUp(valueMm: number, grid: readonly number[]): number {
  return grid.find((g) => g >= valueMm) ?? grid[grid.length - 1];
}

export function toSoKey(widthM: number, depthM: number): string {
  const w = snapUp(Math.round(widthM * 1000), PROLINE_WIDTHS);
  const d = snapUp(Math.round(depthM * 1000), PROLINE_DEPTHS);
  return `${w}x${d}`;
}

function lookup(table: Record<string, number>, key: string): number | undefined {
  if (table[key] !== undefined) return table[key];
  // Fallback: nächstkleinere bekannte Breite
  const [w, d] = key.split("x").map(Number);
  const keys = Object.keys(table).sort();
  for (let i = keys.length - 1; i >= 0; i--) {
    const [kw, kd] = keys[i].split("x").map(Number);
    if (kw <= w && kd <= d) return table[keys[i]];
  }
  return undefined;
}

export function soMaterialNet(
  product: SoProductKey,
  widthM: number,
  depthM: number,
): number | undefined {
  const key = toSoKey(widthM, depthM);
  switch (product) {
    case "proline_pc":
      return lookup(PROLINE_PC, key);
    case "proline_glas_klar":
      return lookup(PROLINE_GLAS_KLAR, key);
    case "cube_glas_klar":
      return lookup(CUBE_GLAS, key.replace(/^5060/, "5052"));
    case "louvre":
      return lookup(LOUVRE, key.replace(/^5060/, "4990"));
    default:
      return undefined;
  }
}

export function soVsgUpgradeNet(widthM: number, depthM: number): number | undefined {
  const pc = soMaterialNet("proline_pc", widthM, depthM);
  const glas = soMaterialNet("proline_glas_klar", widthM, depthM);
  if (pc === undefined || glas === undefined) return undefined;
  return glas - pc;
}
