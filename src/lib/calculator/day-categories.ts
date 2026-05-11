/**
 * Tages-Kategorisierung für den Terrassenpotenzial-Rechner.
 *
 * Klassifiziert die 365 Jahres-Tage in 5 Kategorien (in Anlehnung an die
 * Darstellung von Schmidt Überdachungen, mit eigenen DWD-Daten):
 *
 *  - sommer    (Tmax 25–30 °C) – komfortabel ohne Dach
 *  - heiss     (Tmax > 30 °C)  – ohne Schatten zu heiß
 *  - potenzial (Tmax 10–25 °C) – mit Terrassendach nutzbar
 *  - kalt      (Tmax  0–10 °C) – nur mit Kaltwintergarten/Heizung
 *  - eis       (Tmax  < 0 °C)  – nicht für Terrasse nutzbar
 *
 * Datenbasis: Klimanormale 1991–2020 des DWD (siehe src/data/climate.ts) plus
 * eine Höhenkorrektur für Standorte abseits der Wetterstation. Die Methodik
 * approximiert "Eistage" und "kalte Tage" aus DWD-Frosttagen, da nicht jede
 * Station Eistage separat liefert.
 */
import type { ClimateStation } from "@/data/climate";

export interface DayCategories {
  /** Sommertage 25–30 °C — komfortabel ohne Dach. */
  sommer: number;
  /** Heiße Tage > 30 °C — zu heiß für Terrassennutzung. */
  heiss: number;
  /** Potenzialtage 10–25 °C — mit Terrassendach nutzbar. */
  potenzial: number;
  /** Kalte Tage 0–10 °C — mit Kaltwintergarten nutzbar. */
  kalt: number;
  /** Eistage < 0 °C — nicht nutzbar. */
  eis: number;
  /** Summe (in der Regel 365). */
  total: number;
}

export interface PotentialAnalysis {
  station: ClimateStation;
  effectiveElevation: number;
  categories: DayCategories;
  /** Aktuelle Situation: nur Sommertage 25–30 °C sind komfortabel nutzbar. */
  currentDays: number;
  /** Zusätzliche Tage durch Terrassendach (Potenzialtage). */
  gainedDaysWithDach: number;
  /** Gesamtsumme der nutzbaren Tage mit Terrassendach. */
  totalDaysWithDach: number;
  /** Prozentualer Anteil der Tage, die mit Dach nutzbar sind. */
  potentialPercent: number;
  /** Tage, die mit Dach ungenutzt bleiben (kalte Tage 0–10 °C). */
  unusedCold: number;
  /** Tage, die nicht nutzbar bleiben (Eistage). */
  unusedIce: number;
}

/**
 * Höhenkorrektur: Pro 100 m über Stations-Höhe sinkt die Mitteltemperatur
 * um etwa 0,65 °C (atmosphärischer Temperaturgradient). Daraus leiten wir
 * eine Verschiebung zwischen Sommer/Potenzial/Kalt/Eis-Tagen ab.
 */
function applyElevationShift(
  base: DayCategories,
  station: ClimateStation,
  elevationMeters: number,
): DayCategories {
  const deltaMeters = elevationMeters - station.elevation;
  if (Math.abs(deltaMeters) < 25) return base;

  const tempDelta = (deltaMeters / 100) * 0.65;

  let sommerShift = Math.round(tempDelta * 3);
  let heissShift = Math.round(tempDelta * 1.2);
  let eisShift = Math.round(-tempDelta * 4);
  let kaltShift = Math.round(-tempDelta * 6);

  if (deltaMeters > 0) {
    sommerShift = -Math.abs(sommerShift);
    heissShift = -Math.abs(heissShift);
    eisShift = Math.abs(eisShift);
    kaltShift = Math.abs(kaltShift);
  } else {
    sommerShift = Math.abs(sommerShift);
    heissShift = Math.abs(heissShift);
    eisShift = -Math.abs(eisShift);
    kaltShift = -Math.abs(kaltShift);
  }

  const sommer = clamp(base.sommer + sommerShift, 5, 80);
  const heiss = clamp(base.heiss + heissShift, 0, 40);
  const eis = clamp(base.eis + eisShift, 0, 80);
  const kalt = clamp(base.kalt + kaltShift, 30, 180);
  const potenzial = clamp(365 - sommer - heiss - eis - kalt, 60, 230);

  return {
    sommer,
    heiss,
    potenzial,
    kalt,
    eis,
    total: sommer + heiss + potenzial + kalt + eis,
  };
}

function clamp(value: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, value));
}

/**
 * Berechnet die Tages-Kategorien aus DWD-Stationsdaten.
 *
 * Formeln:
 *  - sommer   = summerDays − hotDays
 *  - heiss    = hotDays
 *  - eis      = round(frostDays · 0,35)  (Approximation Eistage aus Frosttagen)
 *  - kalt     = round(frostDays · 0,9 + 30)
 *  - potenzial = 365 − sommer − heiss − eis − kalt
 */
function computeBaseCategories(station: ClimateStation): DayCategories {
  const sommer = Math.max(0, station.summerDaysPerYear - station.hotDaysPerYear);
  const heiss = station.hotDaysPerYear;
  const eis = Math.round(station.frostDaysPerYear * 0.35);
  const kalt = Math.round(station.frostDaysPerYear * 0.9 + 30);
  const potenzial = Math.max(60, 365 - sommer - heiss - eis - kalt);
  const total = sommer + heiss + potenzial + kalt + eis;

  return { sommer, heiss, potenzial, kalt, eis, total };
}

/**
 * Liefert die komplette Potenzialanalyse für einen Standort inkl. Höhenshift.
 */
export function computePotentialAnalysis(
  station: ClimateStation,
  elevationMeters?: number,
): PotentialAnalysis {
  const effectiveElevation =
    elevationMeters && elevationMeters > 0 ? elevationMeters : station.elevation;

  const base = computeBaseCategories(station);
  const categories =
    elevationMeters && elevationMeters > 0
      ? applyElevationShift(base, station, elevationMeters)
      : base;

  const currentDays = categories.sommer;
  const gainedDaysWithDach = categories.potenzial;
  const totalDaysWithDach = currentDays + gainedDaysWithDach;
  const potentialPercent = Math.round((totalDaysWithDach / categories.total) * 100);

  return {
    station,
    effectiveElevation,
    categories,
    currentDays,
    gainedDaysWithDach,
    totalDaysWithDach,
    potentialPercent,
    unusedCold: categories.kalt,
    unusedIce: categories.eis,
  };
}

export const CATEGORY_META: Record<
  keyof Omit<DayCategories, "total">,
  { label: string; range: string; benefit: string; color: string; ring: string }
> = {
  sommer: {
    label: "Sommertage",
    range: "25–30 °C",
    benefit: "angenehm ohne Dach",
    color: "#E2A659",
    ring: "ring-[#E2A659]",
  },
  heiss: {
    label: "Heiße Tage",
    range: "> 30 °C",
    benefit: "zu heiß für Terrassennutzung",
    color: "#C44A2C",
    ring: "ring-[#C44A2C]",
  },
  potenzial: {
    label: "Potenzialtage",
    range: "10–25 °C",
    benefit: "nutzbar mit Terrassendach",
    color: "#7AAE63",
    ring: "ring-[#7AAE63]",
  },
  kalt: {
    label: "Kalte Tage",
    range: "0–10 °C",
    benefit: "nutzbar mit Kaltwintergarten",
    color: "#6F8FA8",
    ring: "ring-[#6F8FA8]",
  },
  eis: {
    label: "Eistage",
    range: "< 0 °C",
    benefit: "nicht nutzbar",
    color: "#3E4754",
    ring: "ring-[#3E4754]",
  },
};
