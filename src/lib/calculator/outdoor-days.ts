/**
 * Berechnung "Outdoor-Tage": Wie viele Tage pro Jahr ist die Terrasse
 * realistisch nutzbar — ohne Überdachung vs. mit verschiedenen Brait-Systemen.
 *
 * Methodik (Annahmen aus DWD-Klimanormalen 1991–2020):
 *
 * 1. "Outdoor-tauglich" = Tageshöchsttemperatur ≥ 12 °C UND kein nennenswerter
 *    Niederschlag (≤ 1 mm) UND ≥ 4 Sonnenstunden im Tagesverlauf.
 *
 * 2. Outdoor-Saison = etwa 230 Tage (April–Oktober inkl. milde Schultertage).
 *
 * 3. Ohne Überdachung verfügbare Outdoor-Tage:
 *    Outdoor-Saison − (Niederschlagstage × Anteil_Saison) − Hitze-Reduktion.
 *
 * 4. Mit Pro-Line/Cube (Glasdach): Niederschlagstage werden voll nutzbar,
 *    Schultertage ausgedehnt (März / November bei mildem Wetter).
 *
 * 5. Mit Lamellendach + Glasschiebewänden: zusätzlich Wintertage mit Sonne
 *    und Frosttage mit Heizung verfügbar (≈ 365 Tage abzüglich extreme Tage).
 *
 * 6. Mit Markise: nur Hitze-Reduktion an Sommertagen, kein Regenschutz.
 */

import type { ClimateStation } from "@/data/climate";

export type OverheadSystem =
  | "none"
  | "markise"
  | "proLine"
  | "cube"
  | "lamellendach"
  | "lamellendachVollausstattung";

export interface OutdoorDaysResult {
  system: OverheadSystem;
  systemLabel: string;
  /** Verfügbare Outdoor-Tage pro Jahr. */
  daysPerYear: number;
  /** Gewonnene Tage gegenüber "kein Schutz". */
  gainedDays: number;
  /** Prozentualer Zuwachs gegenüber "kein Schutz". */
  gainedPercent: number;
  /** Gewonnene Tage in Wochen. */
  gainedWeeks: number;
  /** Beschreibung der Wirkungsweise. */
  description: string;
}

const SYSTEM_LABELS: Record<OverheadSystem, string> = {
  none: "Ohne Überdachung",
  markise: "Markise (Sonnenschutz)",
  proLine: "Pro-Line Glasdach",
  cube: "Cube freistehend",
  lamellendach: "Lamellendach Q-Bus",
  lamellendachVollausstattung:
    "Lamellendach + Glasschiebewände + Heizung",
};

const SYSTEM_DESCRIPTIONS: Record<OverheadSystem, string> = {
  none: "Aktuelle Situation: Tage mit Regen, Hitze über 30 °C oder kühlen Temperaturen unter 12 °C sind nicht oder kaum nutzbar.",
  markise:
    "Markisen reduzieren Hitze an Sommertagen, schützen aber nicht vor Regen — Regenschauer beenden die Outdoor-Nutzung weiterhin.",
  proLine:
    "Wandbefestigtes Glasdach: alle Regentage in der warmen Saison werden nutzbar, Schultertage März und November erhalten Wetterschutz.",
  cube: "Freistehendes Glasdach: gleiche Wetterschutz-Wirkung wie Pro-Line, plus volle Flexibilität ohne Wandanschluss.",
  lamellendach:
    "Lamellen 0–135° verstellbar: Sommer-Sonne durchlassen, dann Schatten regulieren, bei Regen geschlossen wasserdicht. Ganzjährig nutzbar bei mildem Wetter.",
  lamellendachVollausstattung:
    "Komplett wettergeschützter Outdoor-Wohnraum: Glasschiebewände und Heizung machen die Nutzung 365 Tage möglich, abzüglich extremer Wettertage.",
};

/**
 * Berechnet die Outdoor-Tage für eine bestimmte Wetterstation und ein System.
 */
export function calculateOutdoorDays(
  station: ClimateStation,
  system: OverheadSystem,
): OutdoorDaysResult {
  const baseDays = computeBaseOutdoorDays(station);
  let days = baseDays;

  switch (system) {
    case "none":
      days = baseDays;
      break;

    case "markise": {
      // Markise nur Hitze-Reduktion: bei Sommertagen mit Mittagssonne wird
      // zusätzliche Stunde gewonnen, aber keine neuen Tage. ~10–15 Tage Bonus.
      const heatGain = Math.round(station.hotDaysPerYear * 0.6);
      days = baseDays + heatGain;
      break;
    }

    case "proLine":
    case "cube": {
      // Glasdach: Niederschlagstage in warmer Saison (April–Oktober) werden
      // nutzbar. ~60 % aller Niederschlagstage liegen in dieser Zeit.
      const rainSaisonDays = Math.round(station.rainDaysPerYear * 0.6);
      // Plus Schultertage März / November mit mildem Wetter.
      const shoulderGain = 18;
      days = baseDays + rainSaisonDays + shoulderGain;
      break;
    }

    case "lamellendach": {
      // Lamellendach: alle warmen Saison-Regentage + Schulterzeit + milde
      // Wintertage mit Sonne (etwa 25 Tage Bonus).
      const rainSaisonDays = Math.round(station.rainDaysPerYear * 0.65);
      const shoulderGain = 28;
      const mildWinterDays = Math.max(0, 25 - station.snowCoverDaysPerYear / 4);
      days = baseDays + rainSaisonDays + shoulderGain + mildWinterDays;
      break;
    }

    case "lamellendachVollausstattung": {
      // Voll ausgestattet: 365 Tage abzüglich extremer Wettertage
      // (heftige Stürme, sehr starker Schneefall, sehr starker Frost).
      const extremeDays = Math.round(
        station.snowCoverDaysPerYear * 0.3 + station.frostDaysPerYear * 0.15,
      );
      days = 365 - extremeDays;
      break;
    }
  }

  days = Math.min(365, Math.round(days));
  const gainedDays = Math.max(0, days - baseDays);
  const gainedPercent =
    baseDays > 0 ? Math.round((gainedDays / baseDays) * 100) : 0;

  return {
    system,
    systemLabel: SYSTEM_LABELS[system],
    daysPerYear: days,
    gainedDays,
    gainedPercent,
    gainedWeeks: Math.round((gainedDays / 7) * 10) / 10,
    description: SYSTEM_DESCRIPTIONS[system],
  };
}

/**
 * Basisberechnung "Outdoor-tauglich ohne Schutz".
 *
 * Outdoor-Saison ≈ 230 Tage (April–Oktober).
 * Davon Regentage in Saison ≈ rainDays × 0.6.
 * Davon Hitze-Reduktion (Tmax > 30 °C, Mittagshitze, ohne Schatten unangenehm)
 *   ≈ hotDays × 0.5.
 * Result = Outdoor-Saison − Regentage_Saison − Hitze-Reduktion.
 */
function computeBaseOutdoorDays(station: ClimateStation): number {
  const outdoorSeason = 230;
  const rainSaisonDays = station.rainDaysPerYear * 0.6;
  const hotDaysReduction = station.hotDaysPerYear * 0.5;
  const base = outdoorSeason - rainSaisonDays - hotDaysReduction;
  return Math.max(60, Math.round(base));
}

/**
 * Berechnet Vergleichs-Liste über alle Systeme.
 */
export function calculateAllSystems(
  station: ClimateStation,
): OutdoorDaysResult[] {
  const systems: OverheadSystem[] = [
    "none",
    "markise",
    "proLine",
    "cube",
    "lamellendach",
    "lamellendachVollausstattung",
  ];
  return systems.map((s) => calculateOutdoorDays(station, s));
}
