/**
 * Geocoding-Service für den Terrassen-Rechner.
 *
 * Nutzt zwei kostenlose, DSGVO-konforme Dienste:
 *  - Photon (komoot.io, OpenStreetMap-Daten, EU-Server) für Adress-Suche
 *  - Open-Meteo Elevation API für Geländehöhe in Metern über NN
 *
 * Beide APIs sind ohne API-Key nutzbar. Photon erlaubt eine grobe Bounding-Box
 * sowie Sprach-Bias, was wir auf "de" + Süddeutschland setzen.
 */

const PHOTON_ENDPOINT = "https://photon.komoot.io/api/";
const ELEVATION_ENDPOINT = "https://api.open-meteo.com/v1/elevation";

/** Grobes Service-Gebiet 100 km um Ulm — wir biasen die Suche darauf. */
const BIAS_LAT = 48.4;
const BIAS_LON = 9.99;

export interface AddressSuggestion {
  /** Anzeige-Label für die Suchliste. */
  label: string;
  /** Kompakte Hauptzeile (Straße + Hausnummer). */
  street: string;
  /** Postleitzahl, falls von Photon gefunden. */
  postcode?: string;
  /** Ortsname (z. B. "Ulm"). */
  city?: string;
  /** ISO-2-Ländercode (DE / AT / CH). */
  countryCode?: string;
  /** Bundesland (state). */
  state?: string;
  lat: number;
  lon: number;
  /** Eindeutige Photon-OSM-ID — als React-Key nutzbar. */
  osmId: string;
}

interface PhotonFeature {
  type: "Feature";
  geometry: { type: "Point"; coordinates: [number, number] };
  properties: {
    osm_id?: number;
    osm_type?: string;
    name?: string;
    street?: string;
    housenumber?: string;
    postcode?: string;
    city?: string;
    state?: string;
    country?: string;
    countrycode?: string;
    type?: string;
  };
}

interface PhotonResponse {
  type: "FeatureCollection";
  features: PhotonFeature[];
}

/**
 * Sucht passende Adressen via Photon (Komoot). Filtert auf DE/AT/CH und
 * priorisiert Treffer mit Hausnummer.
 */
export async function searchAddresses(
  query: string,
  signal?: AbortSignal,
): Promise<AddressSuggestion[]> {
  const trimmed = query.trim();
  if (trimmed.length < 3) return [];

  const params = new URLSearchParams({
    q: trimmed,
    lang: "de",
    limit: "8",
    lat: BIAS_LAT.toString(),
    lon: BIAS_LON.toString(),
  });

  const response = await fetch(`${PHOTON_ENDPOINT}?${params.toString()}`, {
    signal,
    headers: { Accept: "application/json" },
  });

  if (!response.ok) {
    throw new Error(`Photon-Antwort ${response.status}`);
  }

  const data = (await response.json()) as PhotonResponse;

  return data.features
    .filter((f) => {
      const cc = (f.properties.countrycode ?? "").toUpperCase();
      return ["DE", "AT", "CH"].includes(cc);
    })
    .map(toSuggestion)
    .filter((s): s is AddressSuggestion => s !== null);
}

function toSuggestion(feature: PhotonFeature): AddressSuggestion | null {
  const [lon, lat] = feature.geometry.coordinates;
  if (typeof lat !== "number" || typeof lon !== "number") return null;

  const street = [feature.properties.street, feature.properties.housenumber]
    .filter(Boolean)
    .join(" ")
    .trim();

  const city = feature.properties.city ?? "";
  const postcode = feature.properties.postcode ?? "";

  const labelParts = [
    street || feature.properties.name || "",
    [postcode, city].filter(Boolean).join(" "),
    feature.properties.state ?? "",
  ].filter((p) => p && p.length > 0);

  const label = labelParts.join(", ");
  if (!label) return null;

  return {
    label,
    street: street || feature.properties.name || "",
    postcode: postcode || undefined,
    city: city || undefined,
    countryCode: feature.properties.countrycode?.toUpperCase(),
    state: feature.properties.state ?? undefined,
    lat,
    lon,
    osmId: `${feature.properties.osm_type ?? ""}-${feature.properties.osm_id ?? ""}-${lat}-${lon}`,
  };
}

/**
 * Holt die Geländehöhe in m über NN von Open-Meteo. Liefert `null`, wenn der
 * API-Call fehlschlägt — der Rechner verwendet dann die Höhe der nächsten
 * Wetterstation als Approximation.
 */
export async function fetchElevation(
  lat: number,
  lon: number,
  signal?: AbortSignal,
): Promise<number | null> {
  const params = new URLSearchParams({
    latitude: lat.toString(),
    longitude: lon.toString(),
  });

  try {
    const response = await fetch(`${ELEVATION_ENDPOINT}?${params.toString()}`, {
      signal,
      headers: { Accept: "application/json" },
    });
    if (!response.ok) return null;
    const data = (await response.json()) as { elevation?: number[] };
    const elev = data.elevation?.[0];
    return typeof elev === "number" ? Math.round(elev) : null;
  } catch {
    return null;
  }
}
