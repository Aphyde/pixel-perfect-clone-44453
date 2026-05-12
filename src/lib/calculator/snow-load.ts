/**
 * Schneelast-Berechnung nach DIN EN 1991-1-3 (Eurocode 1) und Nationalem
 * Anhang Deutschland.
 *
 * Vereinfachte Formel für Flachdächer (Neigung ≤ 30°):
 *
 *   s = µ_i · C_e · C_t · s_k
 *
 * mit:
 *   µ_i = 0,8 (Form-Beiwert für unverwehrte Schneedeckenform Flachdach)
 *   C_e = 1,0 (Umgebungs-Beiwert "normal")
 *   C_t = 1,0 (Wärme-Beiwert "isoliert")
 *   s_k = charakteristische Bodenschneelast aus PLZ/Höhenlage
 *
 * Resultierende Dachschneelast in kN/m². Brait-Standardstatik trägt 200 kg/m²
 * (≈ 1,96 kN/m²) — das deckt mit Sicherheitsreserve fast alle Lagen
 * außerhalb der Hochalb (>800 m) ab.
 */

import {
  type SnowLoadZone,
  lookupSnowLoadZoneByPlz,
  snowLoadZonesData,
} from "@/data/snow-load-zones";
import type { ClimateStation } from "@/data/climate";

export interface SnowLoadResult {
  zone: SnowLoadZone;
  /** Höhenkorrektur-Faktor (1.0 wenn keine Höhenanpassung). */
  elevationFactor: number;
  /** Korrigierte Bodenschneelast in kN/m². */
  groundLoadCorrectedKn: number;
  /** Korrigierte Bodenschneelast in kg/m². */
  groundLoadCorrectedKg: number;
  /** Resultierende Dachschneelast (Flachdach µ=0,8) in kN/m². */
  roofLoadKn: number;
  /** Resultierende Dachschneelast in kg/m². */
  roofLoadKg: number;
  /** Empfehlung Brait. */
  braitRecommendation: BraitRecommendation;
  /** Gesamtschneelast für Beispiel-Dachfläche (in kg). */
  totalSnowMass?: { area: number; mass: number };
  /** Bemessungsverweis. */
  reference: string;
}

export interface BraitRecommendation {
  level: "standard" | "verstaerkt" | "individuell";
  label: string;
  description: string;
  /** Mehrkosten-Hinweis. */
  costNote: string;
}

/**
 * Berechnet die Schneelast für eine PLZ + optionale Höhenangabe und
 * optionale Dachfläche.
 */
export function calculateSnowLoad(
  plz: string,
  options?: {
    elevationMeters?: number;
    /** Dachfläche in m² für Massen-Beispiel. */
    roofAreaSqm?: number;
  },
): SnowLoadResult {
  const zone = lookupSnowLoadZoneByPlz(plz, options?.elevationMeters);

  // Höhenkorrektur über 400 m linear bis Faktor 1.4 bei 800 m
  const elev = options?.elevationMeters ?? 0;
  let elevationFactor = 1;
  if (elev > 400) {
    elevationFactor = 1 + Math.min(0.4, ((elev - 400) / 400) * 0.4);
  }

  const groundLoadCorrectedKn = zone.groundLoadKn * elevationFactor;
  const groundLoadCorrectedKg = Math.round(groundLoadCorrectedKn * 102);

  // Dachschneelast: µ = 0.8 für Flachdach
  const roofLoadKn = groundLoadCorrectedKn * 0.8;
  const roofLoadKg = Math.round(roofLoadKn * 102);

  const recommendation = determineBraitRecommendation(roofLoadKg);

  let totalSnowMass: { area: number; mass: number } | undefined;
  if (options?.roofAreaSqm) {
    totalSnowMass = {
      area: options.roofAreaSqm,
      mass: Math.round(roofLoadKg * options.roofAreaSqm),
    };
  }

  return {
    zone,
    elevationFactor: Math.round(elevationFactor * 100) / 100,
    groundLoadCorrectedKn: Math.round(groundLoadCorrectedKn * 100) / 100,
    groundLoadCorrectedKg,
    roofLoadKn: Math.round(roofLoadKn * 100) / 100,
    roofLoadKg,
    braitRecommendation: recommendation,
    totalSnowMass,
    reference: "Bemessung nach DIN EN 1991-1-3 inkl. Nationalem Anhang DE",
  };
}

/**
 * Berechnet die Schneelast direkt aus einem geokodierten Standort.
 *
 * Im Brait-Service-Gebiet kennen wir die Zone der nächsten Wetterstation
 * exakt — wir nutzen sie und addieren eine kontinuierliche Höhenkorrektur.
 * Für die seltenen Fälle ohne PLZ-Match liefert das Mapping einen Fallback.
 */
export function calculateSnowLoadByLocation(input: {
  station: ClimateStation;
  elevationMeters: number;
  postcode?: string;
  roofAreaSqm?: number;
}): SnowLoadResult {
  const stationZone = snowLoadZonesData[input.station.snowLoadZone];
  const plzZone = input.postcode
    ? lookupSnowLoadZoneByPlz(input.postcode, input.elevationMeters)
    : stationZone;

  const zoneRank: Record<SnowLoadZone["zone"], number> = {
    "1": 1,
    "1a": 2,
    "2": 3,
    "2a": 4,
    "3": 5,
  };
  const zone =
    zoneRank[plzZone.zone] > zoneRank[stationZone.zone] ? plzZone : stationZone;

  const elev = input.elevationMeters;
  let elevationFactor = 1;
  if (elev > 400) {
    elevationFactor = 1 + Math.min(0.4, ((elev - 400) / 400) * 0.4);
  }

  const groundLoadCorrectedKn = zone.groundLoadKn * elevationFactor;
  const groundLoadCorrectedKg = Math.round(groundLoadCorrectedKn * 102);

  const roofLoadKn = groundLoadCorrectedKn * 0.8;
  const roofLoadKg = Math.round(roofLoadKn * 102);

  const recommendation = determineBraitRecommendation(roofLoadKg);

  let totalSnowMass: { area: number; mass: number } | undefined;
  if (input.roofAreaSqm) {
    totalSnowMass = {
      area: input.roofAreaSqm,
      mass: Math.round(roofLoadKg * input.roofAreaSqm),
    };
  }

  return {
    zone,
    elevationFactor: Math.round(elevationFactor * 100) / 100,
    groundLoadCorrectedKn: Math.round(groundLoadCorrectedKn * 100) / 100,
    groundLoadCorrectedKg,
    roofLoadKn: Math.round(roofLoadKn * 100) / 100,
    roofLoadKg,
    braitRecommendation: recommendation,
    totalSnowMass,
    reference: "Bemessung nach DIN EN 1991-1-3 inkl. Nationalem Anhang DE",
  };
}

function determineBraitRecommendation(
  roofLoadKg: number,
): BraitRecommendation {
  if (roofLoadKg <= 130) {
    return {
      level: "standard",
      label: "Standard-Statik ausreichend",
      description:
        "Brait-Standardprofile (Pfosten 15 × 15 cm, optional schlank 11 × 11 cm) tragen 200 kg/m² Dachlast — bei dieser Lage haben Sie eine Sicherheitsreserve von > 50 %.",
      costNote: "Keine Mehrkosten",
    };
  }
  if (roofLoadKg <= 165) {
    return {
      level: "standard",
      label: "Standard-Statik OK, Reserve geringer",
      description:
        "Standardprofile reichen, Brait dimensioniert konservativ auf 200 kg/m². Für Sondergrößen (Spannweite > 6 m) prüfen wir individuell.",
      costNote: "Keine Mehrkosten bei Standardgrößen",
    };
  }
  if (roofLoadKg <= 200) {
    return {
      level: "verstaerkt",
      label: "Verstärkte Profile empfohlen",
      description:
        "Über 165 kg/m² rechnen wir mit verstärkten Profilen oder zusätzlichem Mittel-Pfosten. Stabilität und Lebensdauer bleiben unverändert.",
      costNote: "Mehrkosten ca. 6–10 % gegenüber Standardprofilen",
    };
  }
  return {
    level: "individuell",
    label: "Individuelle Statik erforderlich",
    description:
      "Über 200 kg/m² Dachlast (typisch für Höhenlagen Schwäbische Alb / Allgäu) erfordern eine individuelle Tragwerksberechnung mit verstärkten 15 × 15 cm Pfosten und ggf. zusätzlicher Mittelstütze.",
    costNote: "Mehrkosten 8–12 % plus ca. 250 € individuelle Statik",
  };
}
