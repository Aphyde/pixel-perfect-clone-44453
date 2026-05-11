import type { Metadata } from "next";
import { BRAND, SITE_URL } from "./site";

interface BuildMetadataInput {
  /** Page-spezifischer Titel ohne Brand-Suffix. */
  title: string;
  description: string;
  path: string;
  image?: string;
  keywords?: string[];
  /** Wenn true, kein Index. */
  noindex?: boolean;
  /** Article-spezifisch: published / modified date (ISO). */
  publishedTime?: string;
  modifiedTime?: string;
  /** Article-spezifisch: Autoren-Namen. */
  authors?: string[];
  /** Override OG-Type. Default = "website". */
  ogType?: "website" | "article";
}

const ensureLeadingSlash = (p: string) => (p.startsWith("/") ? p : `/${p}`);

/**
 * Generiert konsistente Metadata mit Long-Tail-Title, OG, Twitter,
 * Canonical und hreflang-Defaults.
 */
export function buildMetadata(input: BuildMetadataInput): Metadata {
  const {
    title,
    description,
    path,
    image = "/opengraph-image",
    keywords,
    noindex,
    publishedTime,
    modifiedTime,
    authors,
    ogType = "website",
  } = input;

  const canonical = ensureLeadingSlash(path);
  const fullTitle = title.endsWith(BRAND) ? title : `${title} · ${BRAND}`;

  const meta: Metadata = {
    title,
    description,
    alternates: {
      canonical,
      // Hreflang fuer Single-Language-Site (Deutsch):
      // - "de" als Self-Reference (deckt alle deutschsprachigen Regionen ab)
      // - "x-default" als Fallback fuer alle anderen Sprachen
      // de-DE waere redundant zu de und wuerde Seobility-Warnungen
      // "URL multiple times" provozieren.
      languages: {
        de: `${SITE_URL}${canonical}`,
        "x-default": `${SITE_URL}${canonical}`,
      },
    },
    keywords,
    openGraph: {
      type: ogType,
      locale: "de_DE",
      url: `${SITE_URL}${canonical}`,
      siteName: BRAND,
      title: fullTitle,
      description,
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      ...(ogType === "article" && publishedTime
        ? {
            publishedTime,
            modifiedTime: modifiedTime ?? publishedTime,
            authors,
          }
        : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [image],
    },
    robots: noindex
      ? { index: false, follow: false }
      : {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            "max-image-preview": "large",
            "max-snippet": -1,
          },
        },
  };

  return meta;
}

/**
 * Long-Tail-Suffixes pro Kategorie für Title und Description.
 */
export const CATEGORY_LONGTAIL: Record<
  string,
  { titleLongTail: string; descriptionLongTail: string; keywords: string[] }
> = {
  markisen: {
    titleLongTail: "Markisen Ulm — Gelenkarm, Fallarm, Senkrecht & Aufglas",
    descriptionLongTail:
      "Markisen aus Ulm: Gelenkarm-, Fallarm-, Senkrecht- und Aufglasmarkisen. Maßanfertigung, motorisiert, Sonnen-/Windsensor. Beratung mit Demo-Koffer vor Ort.",
    keywords: [
      "Markisen Ulm",
      "Gelenkarmmarkise",
      "Fallarmmarkise",
      "Senkrechtmarkise",
      "Aufglasmarkise",
      "Markise mit Motor",
    ],
  },
  terrassenueberdachungen: {
    titleLongTail:
      "Terrassenüberdachung Ulm — Aluminium-Glas, Pro-Line Cube & Lamellendach",
    descriptionLongTail:
      "Terrassenüberdachungen in Ulm: Aluminium-Konstruktion, Glas- oder Lamellendach, frei stehend oder wandbefestigt. Schneelastgeprüft, mit eigener Montage und 10 Jahren Garantie.",
    keywords: [
      "Terrassenüberdachung Ulm",
      "Aluminium Terrassendach",
      "Glasdach Terrasse",
      "Lamellendach",
      "Terrassendach freistehend",
      "Pro-Line Cube",
    ],
  },
  schirme: {
    titleLongTail: "Ampelschirme Ulm — Schwenkbar, Sonnenschutz für Terrasse & Gastronomie",
    descriptionLongTail:
      "Ampelschirme bis 5 × 5 m, 360°-drehbar und stufenlos neigbar. Sunbrella-Tuch UV 50+, Granitsockel oder Bodenhülse. Beratung in Ulm und 100 km Umkreis.",
    keywords: [
      "Ampelschirm Ulm",
      "Sonnenschirm groß",
      "Schirm Gastronomie",
      "Sunbrella Schirm",
    ],
  },
  "q-bus": {
    titleLongTail: "Q-Bus Lamellen-Pergola Ulm — Bioklimatik mit verstellbarem Aluminium-Dach",
    descriptionLongTail:
      "Q-Bus Lamellen-Pergola: Aluminium-Lamellen 0–135° drehbar, wasserdicht schließend, Funkmotor, optional LED & Zipscreen. Premium-Outdoor-Lounge aus Ulm.",
    keywords: [
      "Q-Bus Pergola",
      "Lamellen Pergola Ulm",
      "bioklimatische Pergola",
      "Aluminium Pergola",
    ],
  },
  eingangsueberdachungen: {
    titleLongTail: "Eingangsüberdachung Ulm — Aluminium-Vordach mit VSG-Glas",
    descriptionLongTail:
      "Schlanke Aluminium-Vordächer mit VSG-Glas, verdeckter Edelstahl-Halterung, optional LED. Maßanfertigung für Hauseingänge in Ulm und Umgebung.",
    keywords: [
      "Eingangsüberdachung Ulm",
      "Vordach Aluminium",
      "Hauseingang Vordach",
      "Glasvordach",
    ],
  },
  carports: {
    titleLongTail: "Carport Ulm — Aluminium-Carport mit Glas oder HPL-Dach",
    descriptionLongTail:
      "Aluminium-Carports freistehend oder als Anbau: VSG-Glas oder HPL-Dach, Hagelschutz, vorbereitet für Wallbox. Schneelastgeprüft, mit 10 Jahren Strukturgarantie.",
    keywords: [
      "Carport Ulm",
      "Aluminium Carport",
      "Carport mit Glasdach",
      "Doppelcarport",
      "Carport Wallbox",
    ],
  },
};
