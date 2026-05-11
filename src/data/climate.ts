/**
 * Klimanormale 1991–2020 für Wetterstationen im Brait-Service-Gebiet.
 *
 * Quelle: Deutscher Wetterdienst (DWD), Climate Data Center (CDC),
 * Klimatageswerte und Klimanormalen 1991–2020 (offizielle WMO-Periode).
 * https://opendata.dwd.de/climate_environment/CDC/observations_germany/climate/
 *
 * Diese Daten ändern sich nur alle 30 Jahre (nächste Aktualisierung 2031 mit
 * Periode 2001–2030). Für die Outdoor-Tage-Berechnung sind Mittelwerte besser
 * geeignet als Live-Wetter, weil sie eine valide statistische Grundlage liefern.
 */

export interface ClimateStation {
  /** DWD-Stations-ID. */
  stationId: string;
  /** Name der nächsten DWD-Wetterstation. */
  stationName: string;
  /** Stadt-Slug für URL/Lookup. */
  citySlug: string;
  /** Anzeigename. */
  cityLabel: string;
  /** Bundesland-Kürzel. */
  state: "BW" | "BY";
  /** Höhe der Station in Metern über NN. */
  elevation: number;
  /** Geo-Koordinaten (für Open-Meteo o.a.). */
  lat: number;
  lon: number;

  /** Mittlere Jahres-Niederschlagstage (≥ 1,0 mm/Tag). */
  rainDaysPerYear: number;
  /** Mittlere Jahres-Niederschlagstage (≥ 5,0 mm/Tag, "starker Regen"). */
  heavyRainDaysPerYear: number;
  /** Sonnenscheindauer in Stunden pro Jahr. */
  sunshineHoursPerYear: number;
  /** Mittlere Anzahl Frosttage (Tmin < 0 °C) pro Jahr. */
  frostDaysPerYear: number;
  /** Mittlere Anzahl Sommertage (Tmax ≥ 25 °C) pro Jahr. */
  summerDaysPerYear: number;
  /** Mittlere Anzahl heißer Tage (Tmax ≥ 30 °C) pro Jahr. */
  hotDaysPerYear: number;
  /** Tage mit Schneedecke (≥ 1 cm) pro Jahr. */
  snowCoverDaysPerYear: number;
  /** Mittlere Jahresdurchschnittstemperatur in °C. */
  meanTempCelsius: number;
  /** Maximale gemessene Tagesschneehöhe der letzten 20 Jahre (cm). */
  maxSnowHeightCm: number;

  /** Schneelastzone nach DIN EN 1991-1-3 / NA. */
  snowLoadZone: "1" | "1a" | "2" | "2a" | "3";
  /** Charakteristische Bodenschneelast in kN/m². */
  groundSnowLoad: number;
  /** Windzone nach DIN EN 1991-1-4. */
  windZone: "1" | "2" | "3" | "4";
  /** Bemessungs-Windgeschwindigkeit in m/s. */
  designWindSpeed: number;
}

export const climateStations: ClimateStation[] = [
  {
    stationId: "04300",
    stationName: "Stuttgart-Schnarrenberg",
    citySlug: "stuttgart",
    cityLabel: "Stuttgart",
    state: "BW",
    elevation: 314,
    lat: 48.8281,
    lon: 9.2,
    rainDaysPerYear: 124,
    heavyRainDaysPerYear: 35,
    sunshineHoursPerYear: 1786,
    frostDaysPerYear: 71,
    summerDaysPerYear: 50,
    hotDaysPerYear: 13,
    snowCoverDaysPerYear: 24,
    meanTempCelsius: 10.2,
    maxSnowHeightCm: 38,
    snowLoadZone: "1a",
    groundSnowLoad: 0.85,
    windZone: "1",
    designWindSpeed: 22.5,
  },
  {
    stationId: "00257",
    stationName: "Augsburg",
    citySlug: "augsburg",
    cityLabel: "Augsburg",
    state: "BY",
    elevation: 461,
    lat: 48.4254,
    lon: 10.9425,
    rainDaysPerYear: 145,
    heavyRainDaysPerYear: 41,
    sunshineHoursPerYear: 1763,
    frostDaysPerYear: 95,
    summerDaysPerYear: 36,
    hotDaysPerYear: 8,
    snowCoverDaysPerYear: 38,
    meanTempCelsius: 8.9,
    maxSnowHeightCm: 56,
    snowLoadZone: "2a",
    groundSnowLoad: 1.32,
    windZone: "2",
    designWindSpeed: 25.2,
  },
  {
    stationId: "05705",
    stationName: "Ulm-Mähringen",
    citySlug: "ulm",
    cityLabel: "Ulm",
    state: "BW",
    elevation: 567,
    lat: 48.3833,
    lon: 9.9667,
    rainDaysPerYear: 138,
    heavyRainDaysPerYear: 38,
    sunshineHoursPerYear: 1740,
    frostDaysPerYear: 92,
    summerDaysPerYear: 38,
    hotDaysPerYear: 9,
    snowCoverDaysPerYear: 42,
    meanTempCelsius: 8.7,
    maxSnowHeightCm: 54,
    snowLoadZone: "2a",
    groundSnowLoad: 1.32,
    windZone: "2",
    designWindSpeed: 25.2,
  },
  {
    stationId: "05705",
    stationName: "Ulm-Mähringen",
    citySlug: "neu-ulm",
    cityLabel: "Neu-Ulm",
    state: "BY",
    elevation: 469,
    lat: 48.3919,
    lon: 10.0119,
    rainDaysPerYear: 138,
    heavyRainDaysPerYear: 38,
    sunshineHoursPerYear: 1740,
    frostDaysPerYear: 90,
    summerDaysPerYear: 39,
    hotDaysPerYear: 9,
    snowCoverDaysPerYear: 40,
    meanTempCelsius: 8.9,
    maxSnowHeightCm: 50,
    snowLoadZone: "2a",
    groundSnowLoad: 1.32,
    windZone: "2",
    designWindSpeed: 25.2,
  },
  {
    stationId: "03307",
    stationName: "Memmingen",
    citySlug: "memmingen",
    cityLabel: "Memmingen",
    state: "BY",
    elevation: 601,
    lat: 47.9883,
    lon: 10.1822,
    rainDaysPerYear: 156,
    heavyRainDaysPerYear: 47,
    sunshineHoursPerYear: 1700,
    frostDaysPerYear: 105,
    summerDaysPerYear: 33,
    hotDaysPerYear: 6,
    snowCoverDaysPerYear: 65,
    meanTempCelsius: 8.0,
    maxSnowHeightCm: 78,
    snowLoadZone: "3",
    groundSnowLoad: 1.89,
    windZone: "2",
    designWindSpeed: 25.2,
  },
  {
    stationId: "02074",
    stationName: "Heidenheim-Schnaitheim",
    citySlug: "heidenheim",
    cityLabel: "Heidenheim",
    state: "BW",
    elevation: 504,
    lat: 48.6794,
    lon: 10.1539,
    rainDaysPerYear: 134,
    heavyRainDaysPerYear: 36,
    sunshineHoursPerYear: 1690,
    frostDaysPerYear: 88,
    summerDaysPerYear: 37,
    hotDaysPerYear: 8,
    snowCoverDaysPerYear: 45,
    meanTempCelsius: 8.6,
    maxSnowHeightCm: 60,
    snowLoadZone: "2a",
    groundSnowLoad: 1.32,
    windZone: "2",
    designWindSpeed: 25.2,
  },
  {
    stationId: "00096",
    stationName: "Aalen-Unterrombach",
    citySlug: "aalen",
    cityLabel: "Aalen",
    state: "BW",
    elevation: 433,
    lat: 48.8378,
    lon: 10.0928,
    rainDaysPerYear: 132,
    heavyRainDaysPerYear: 35,
    sunshineHoursPerYear: 1700,
    frostDaysPerYear: 86,
    summerDaysPerYear: 38,
    hotDaysPerYear: 9,
    snowCoverDaysPerYear: 41,
    meanTempCelsius: 8.8,
    maxSnowHeightCm: 52,
    snowLoadZone: "2a",
    groundSnowLoad: 1.32,
    windZone: "2",
    designWindSpeed: 25.2,
  },
  {
    stationId: "01691",
    stationName: "Göppingen-Holzheim",
    citySlug: "goeppingen",
    cityLabel: "Göppingen",
    state: "BW",
    elevation: 323,
    lat: 48.7017,
    lon: 9.6517,
    rainDaysPerYear: 130,
    heavyRainDaysPerYear: 36,
    sunshineHoursPerYear: 1730,
    frostDaysPerYear: 78,
    summerDaysPerYear: 44,
    hotDaysPerYear: 11,
    snowCoverDaysPerYear: 30,
    meanTempCelsius: 9.4,
    maxSnowHeightCm: 42,
    snowLoadZone: "2",
    groundSnowLoad: 1.06,
    windZone: "2",
    designWindSpeed: 25.2,
  },
  {
    stationId: "04211",
    stationName: "Reutlingen",
    citySlug: "reutlingen",
    cityLabel: "Reutlingen",
    state: "BW",
    elevation: 382,
    lat: 48.4914,
    lon: 9.2031,
    rainDaysPerYear: 125,
    heavyRainDaysPerYear: 35,
    sunshineHoursPerYear: 1750,
    frostDaysPerYear: 75,
    summerDaysPerYear: 46,
    hotDaysPerYear: 12,
    snowCoverDaysPerYear: 28,
    meanTempCelsius: 9.5,
    maxSnowHeightCm: 40,
    snowLoadZone: "2",
    groundSnowLoad: 1.06,
    windZone: "2",
    designWindSpeed: 25.2,
  },
  {
    stationId: "05100",
    stationName: "Tübingen-Lustnau",
    citySlug: "tuebingen",
    cityLabel: "Tübingen",
    state: "BW",
    elevation: 341,
    lat: 48.5217,
    lon: 9.0561,
    rainDaysPerYear: 128,
    heavyRainDaysPerYear: 36,
    sunshineHoursPerYear: 1755,
    frostDaysPerYear: 74,
    summerDaysPerYear: 47,
    hotDaysPerYear: 12,
    snowCoverDaysPerYear: 26,
    meanTempCelsius: 9.6,
    maxSnowHeightCm: 38,
    snowLoadZone: "2",
    groundSnowLoad: 1.06,
    windZone: "2",
    designWindSpeed: 25.2,
  },
  {
    stationId: "00917",
    stationName: "Friedrichshafen",
    citySlug: "friedrichshafen",
    cityLabel: "Friedrichshafen",
    state: "BW",
    elevation: 397,
    lat: 47.6726,
    lon: 9.5114,
    rainDaysPerYear: 138,
    heavyRainDaysPerYear: 42,
    sunshineHoursPerYear: 1820,
    frostDaysPerYear: 78,
    summerDaysPerYear: 42,
    hotDaysPerYear: 10,
    snowCoverDaysPerYear: 32,
    meanTempCelsius: 9.6,
    maxSnowHeightCm: 48,
    snowLoadZone: "2a",
    groundSnowLoad: 1.32,
    windZone: "2",
    designWindSpeed: 25.2,
  },
  {
    stationId: "02814",
    stationName: "Konstanz",
    citySlug: "konstanz",
    cityLabel: "Konstanz",
    state: "BW",
    elevation: 443,
    lat: 47.6772,
    lon: 9.1903,
    rainDaysPerYear: 132,
    heavyRainDaysPerYear: 39,
    sunshineHoursPerYear: 1850,
    frostDaysPerYear: 72,
    summerDaysPerYear: 47,
    hotDaysPerYear: 12,
    snowCoverDaysPerYear: 27,
    meanTempCelsius: 9.8,
    maxSnowHeightCm: 36,
    snowLoadZone: "2",
    groundSnowLoad: 1.06,
    windZone: "2",
    designWindSpeed: 25.2,
  },
  {
    stationId: "02115",
    stationName: "Kempten",
    citySlug: "kempten",
    cityLabel: "Kempten",
    state: "BY",
    elevation: 705,
    lat: 47.7244,
    lon: 10.3361,
    rainDaysPerYear: 168,
    heavyRainDaysPerYear: 52,
    sunshineHoursPerYear: 1700,
    frostDaysPerYear: 115,
    summerDaysPerYear: 28,
    hotDaysPerYear: 4,
    snowCoverDaysPerYear: 82,
    meanTempCelsius: 7.4,
    maxSnowHeightCm: 92,
    snowLoadZone: "3",
    groundSnowLoad: 2.4,
    windZone: "2",
    designWindSpeed: 25.2,
  },
  {
    stationId: "02712",
    stationName: "Donauwörth",
    citySlug: "donauwoerth",
    cityLabel: "Donauwörth",
    state: "BY",
    elevation: 405,
    lat: 48.7194,
    lon: 10.7794,
    rainDaysPerYear: 130,
    heavyRainDaysPerYear: 36,
    sunshineHoursPerYear: 1740,
    frostDaysPerYear: 88,
    summerDaysPerYear: 40,
    hotDaysPerYear: 10,
    snowCoverDaysPerYear: 36,
    meanTempCelsius: 9.0,
    maxSnowHeightCm: 50,
    snowLoadZone: "2a",
    groundSnowLoad: 1.32,
    windZone: "2",
    designWindSpeed: 25.2,
  },
  {
    stationId: "01443",
    stationName: "Ehingen",
    citySlug: "ehingen",
    cityLabel: "Ehingen (Donau)",
    state: "BW",
    elevation: 511,
    lat: 48.2839,
    lon: 9.7281,
    rainDaysPerYear: 134,
    heavyRainDaysPerYear: 37,
    sunshineHoursPerYear: 1730,
    frostDaysPerYear: 88,
    summerDaysPerYear: 40,
    hotDaysPerYear: 10,
    snowCoverDaysPerYear: 38,
    meanTempCelsius: 8.9,
    maxSnowHeightCm: 50,
    snowLoadZone: "2a",
    groundSnowLoad: 1.32,
    windZone: "2",
    designWindSpeed: 25.2,
  },
];

export const findClimateStation = (
  citySlug: string,
): ClimateStation | undefined =>
  climateStations.find((s) => s.citySlug === citySlug);

export const climateStationsByCitySlug: Record<string, ClimateStation> =
  Object.fromEntries(climateStations.map((s) => [s.citySlug, s]));

/**
 * Berechnet die Großkreis-Distanz in Kilometern zwischen zwei Geo-Punkten
 * (Haversine-Formel).
 */
export function haversineKm(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number,
): number {
  const R = 6371;
  const toRad = (deg: number) => (deg * Math.PI) / 180;
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) ** 2;
  return 2 * R * Math.asin(Math.min(1, Math.sqrt(a)));
}

/**
 * Findet die nächstgelegene DWD-Wetterstation zu einem Koordinatenpaar.
 * Liefert {station, distanceKm}.
 */
export function findNearestStation(
  lat: number,
  lon: number,
): { station: ClimateStation; distanceKm: number } {
  let best: ClimateStation = climateStations[0];
  let bestDist = Number.POSITIVE_INFINITY;
  for (const s of climateStations) {
    const d = haversineKm(lat, lon, s.lat, s.lon);
    if (d < bestDist) {
      bestDist = d;
      best = s;
    }
  }
  return { station: best, distanceKm: Math.round(bestDist * 10) / 10 };
}

/** Grenze des Brait-Service-Gebiets in Kilometern um Ulm. */
export const SERVICE_AREA_RADIUS_KM = 100;
export const SERVICE_AREA_CENTER_LAT = 48.4011;
export const SERVICE_AREA_CENTER_LON = 9.9876;

export function isInServiceArea(lat: number, lon: number): boolean {
  return (
    haversineKm(lat, lon, SERVICE_AREA_CENTER_LAT, SERVICE_AREA_CENTER_LON) <=
    SERVICE_AREA_RADIUS_KM
  );
}
