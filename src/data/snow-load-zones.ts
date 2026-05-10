/**
 * Schneelastzonen nach DIN EN 1991-1-3 / NA — vereinfachtes PLZ-Range-Lookup
 * für das Brait-Service-Gebiet (100 km Umkreis Ulm).
 *
 * Quelle: Karte Schneelastzonen Deutschland, BBSR (Bundesinstitut für Bau-,
 * Stadt- und Raumforschung) sowie regionale Bauordnungen BW/BY.
 *
 * Hinweis: PLZ-Bereiche sind Approximationen. In Höhenlagen kann eine
 * angrenzende Zone gelten — bei Bemessung > 600 m NN immer manuell prüfen.
 */

export interface SnowLoadZone {
  zone: "1" | "1a" | "2" | "2a" | "3";
  /** Charakteristische Bodenschneelast in kN/m² (NA). */
  groundLoadKn: number;
  /** Pendant in kg/m². */
  groundLoadKg: number;
  /** Form-Beiwert µ für Flachdach (≤ 30°). */
  shapeFactorFlat: number;
  /** Resultierende Dachschneelast bei µ = 0,8 in kN/m². */
  flatRoofLoadKn: number;
  /** Resultierende Dachschneelast bei µ = 0,8 in kg/m². */
  flatRoofLoadKg: number;
  description: string;
}

export const snowLoadZonesData: Record<string, SnowLoadZone> = {
  "1": {
    zone: "1",
    groundLoadKn: 0.65,
    groundLoadKg: 66,
    shapeFactorFlat: 0.8,
    flatRoofLoadKn: 0.52,
    flatRoofLoadKg: 53,
    description: "Norddeutsche Tiefebene, Küste",
  },
  "1a": {
    zone: "1a",
    groundLoadKn: 0.85,
    groundLoadKg: 87,
    shapeFactorFlat: 0.8,
    flatRoofLoadKn: 0.68,
    flatRoofLoadKg: 69,
    description: "Mitteldeutschland, niedrige Mittelgebirgslagen",
  },
  "2": {
    zone: "2",
    groundLoadKn: 1.06,
    groundLoadKg: 108,
    shapeFactorFlat: 0.8,
    flatRoofLoadKn: 0.85,
    flatRoofLoadKg: 87,
    description: "Mitteldeutschland und Süden bis ca. 400 m NN",
  },
  "2a": {
    zone: "2a",
    groundLoadKn: 1.32,
    groundLoadKg: 135,
    shapeFactorFlat: 0.8,
    flatRoofLoadKn: 1.06,
    flatRoofLoadKg: 108,
    description: "Süddeutsches Hügelland, Donautal, Oberschwaben",
  },
  "3": {
    zone: "3",
    groundLoadKn: 1.89,
    groundLoadKg: 193,
    shapeFactorFlat: 0.8,
    flatRoofLoadKn: 1.51,
    flatRoofLoadKg: 154,
    description: "Alpenvorland, Schwäbische Alb ab 600 m NN",
  },
};

interface PlzZoneRange {
  /** Erste 2 oder 3 Stellen der PLZ. */
  prefix: string;
  zone: SnowLoadZone["zone"];
  /** Wenn Höhenlage über diesem Wert ist, ggf. eine Zone höher. */
  elevationThreshold?: number;
  zoneAboveThreshold?: SnowLoadZone["zone"];
}

/**
 * PLZ-Range-Mapping für das Brait-Service-Gebiet. Diese Liste deckt die
 * relevanten 100 km um Ulm zuverlässig ab. Außerhalb fallen wir auf eine
 * konservative Default-Zone zurück (2a).
 */
export const plzZoneMapping: PlzZoneRange[] = [
  // Ulm + Umkreis (BW)
  { prefix: "89", zone: "2a", elevationThreshold: 700, zoneAboveThreshold: "3" },

  // Schwäbische Alb / Reutlingen / Tübingen
  { prefix: "72", zone: "2", elevationThreshold: 600, zoneAboveThreshold: "3" },

  // Stuttgart Region
  { prefix: "70", zone: "1a" },
  { prefix: "71", zone: "1a" },
  { prefix: "73", zone: "2", elevationThreshold: 500, zoneAboveThreshold: "2a" },
  { prefix: "74", zone: "1a" },
  { prefix: "75", zone: "1a" },

  // BW Süden (Friedrichshafen, Konstanz, Sigmaringen)
  { prefix: "78", zone: "2", elevationThreshold: 600, zoneAboveThreshold: "3" },
  { prefix: "88", zone: "2a", elevationThreshold: 700, zoneAboveThreshold: "3" },

  // Bayrisch-Schwaben (Augsburg, Memmingen, Donau-Ries)
  { prefix: "86", zone: "2a", elevationThreshold: 600, zoneAboveThreshold: "3" },
  { prefix: "87", zone: "3" }, // Allgäu (Memmingen, Kempten)

  // Donauwörth, Nördlingen
  { prefix: "865", zone: "2a" },
  { prefix: "866", zone: "2a" },
  { prefix: "867", zone: "2a" },
];

export function lookupSnowLoadZoneByPlz(
  plz: string,
  elevationMeters?: number,
): SnowLoadZone {
  if (!plz || plz.length < 2) return snowLoadZonesData["2a"];

  // Zuerst längste passende Präfixe (3 Stellen) prüfen
  const sorted = [...plzZoneMapping].sort(
    (a, b) => b.prefix.length - a.prefix.length,
  );

  for (const range of sorted) {
    if (plz.startsWith(range.prefix)) {
      if (
        range.elevationThreshold &&
        range.zoneAboveThreshold &&
        elevationMeters !== undefined &&
        elevationMeters >= range.elevationThreshold
      ) {
        return snowLoadZonesData[range.zoneAboveThreshold];
      }
      return snowLoadZonesData[range.zone];
    }
  }

  // Default für Service-Gebiet außerhalb der Mapping-Tabelle
  return snowLoadZonesData["2a"];
}

export const allSnowLoadZones = Object.values(snowLoadZonesData);
