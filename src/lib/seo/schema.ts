/**
 * Type-safe Schema.org Builders für Brait Überdachungen.
 *
 * Konvention: Builder geben rohe JSON-LD-Objekte zurück
 * (kein @context auf Sub-Schemas), die <JsonLd /> als Graph
 * oder Liste rendert.
 */

import {
  ADDRESS,
  BRAND,
  CONTACT,
  FOUNDED_YEAR,
  FOUNDER_NAME,
  OPENING_HOURS,
  ORG_LEGAL,
  PRIMARY_LANGUAGE,
  SERVICE_AREA,
  SITE_URL,
  SOCIAL_PROFILES,
} from "./site";

const abs = (path: string) =>
  path.startsWith("http") ? path : `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;

const sameAsList = () =>
  Object.values(SOCIAL_PROFILES).filter((v) => typeof v === "string" && v.length > 0);

// ---------- Organization ----------
export const buildOrganizationSchema = () => ({
  "@type": "Organization",
  "@id": `${SITE_URL}/#organization`,
  name: BRAND,
  legalName: ORG_LEGAL.legalName,
  url: SITE_URL,
  logo: {
    "@type": "ImageObject",
    url: abs("/Brait_Logo_Stroke_300dpi.png"),
    width: 600,
    height: 200,
  },
  image: abs("/opengraph-image"),
  email: CONTACT.email,
  telephone: CONTACT.phoneE164,
  foundingDate: `${FOUNDED_YEAR}-01-01`,
  founder: {
    "@type": "Person",
    name: FOUNDER_NAME,
  },
  address: {
    "@type": "PostalAddress",
    streetAddress: ADDRESS.street,
    postalCode: ADDRESS.postalCode,
    addressLocality: ADDRESS.city,
    addressRegion: ADDRESS.region,
    addressCountry: ADDRESS.country,
  },
  areaServed: SERVICE_AREA.primaryCities.map((city) => ({
    "@type": "City",
    name: city,
  })),
  contactPoint: [
    {
      "@type": "ContactPoint",
      telephone: CONTACT.phoneE164,
      contactType: "customer service",
      areaServed: "DE",
      availableLanguage: ["German", "de"],
    },
  ],
  sameAs: sameAsList(),
});

// ---------- LocalBusiness ----------
export const buildLocalBusinessSchema = () => ({
  "@type": "HomeAndConstructionBusiness",
  "@id": `${SITE_URL}/#localbusiness`,
  name: BRAND,
  description:
    "Premium Aluminium-Terrassenüberdachungen, Markisen, Lamellen-Pergolen, Schirme, Eingangsüberdachungen und Carports in Ulm und Umgebung. Maßgefertigt, montiert vom eigenen Team.",
  url: SITE_URL,
  telephone: CONTACT.phoneE164,
  email: CONTACT.email,
  image: [abs("/opengraph-image")],
  logo: abs("/Brait_Logo_Stroke_300dpi.png"),
  priceRange: "€€€",
  currenciesAccepted: "EUR",
  paymentAccepted: ["Cash", "Bank Transfer", "Invoice"],
  address: {
    "@type": "PostalAddress",
    streetAddress: ADDRESS.street,
    postalCode: ADDRESS.postalCode,
    addressLocality: ADDRESS.city,
    addressRegion: ADDRESS.region,
    addressCountry: ADDRESS.country,
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 48.4011,
    longitude: 9.9876,
  },
  areaServed: [
    {
      "@type": "GeoCircle",
      geoMidpoint: {
        "@type": "GeoCoordinates",
        latitude: 48.4011,
        longitude: 9.9876,
      },
      geoRadius: SERVICE_AREA.radiusKm * 1000,
    },
    ...SERVICE_AREA.primaryCities.map((city) => ({
      "@type": "City",
      name: city,
    })),
    ...SERVICE_AREA.regions.map((region) => ({
      "@type": "AdministrativeArea",
      name: region,
    })),
  ],
  openingHoursSpecification: OPENING_HOURS.map((h) => ({
    "@type": "OpeningHoursSpecification",
    dayOfWeek: h.days,
    opens: h.opens,
    closes: h.closes,
  })),
  sameAs: sameAsList(),
  founder: { "@type": "Person", name: FOUNDER_NAME },
  parentOrganization: { "@id": `${SITE_URL}/#organization` },
  knowsAbout: [
    "Terrassenüberdachung",
    "Markise",
    "Lamellen-Pergola",
    "Aluminium-Konstruktion",
    "Glasdach",
    "Sonnenschutz",
    "Carport",
    "Eingangsüberdachung",
    "Bioklimatische Pergola",
    "Schneelastberechnung",
  ],
  slogan: "Premium-Überdachungen aus Ulm — vom eigenen Team gefertigt und montiert.",
});

// ---------- Website ----------
export const buildWebSiteSchema = () => ({
  "@type": "WebSite",
  "@id": `${SITE_URL}/#website`,
  url: SITE_URL,
  name: BRAND,
  inLanguage: PRIMARY_LANGUAGE,
  publisher: { "@id": `${SITE_URL}/#organization` },
  potentialAction: {
    "@type": "SearchAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: `${SITE_URL}/?q={search_term_string}`,
    },
    "query-input": "required name=search_term_string",
  },
});

// ---------- WebPage / Speakable ----------
export const buildWebPageSchema = (params: {
  url: string;
  name: string;
  description: string;
  speakableSelectors?: string[];
  breadcrumbId?: string;
  primaryImage?: string;
}) => {
  const wp: Record<string, unknown> = {
    "@type": "WebPage",
    "@id": `${abs(params.url)}#webpage`,
    url: abs(params.url),
    name: params.name,
    description: params.description,
    inLanguage: PRIMARY_LANGUAGE,
    isPartOf: { "@id": `${SITE_URL}/#website` },
    about: { "@id": `${SITE_URL}/#localbusiness` },
  };
  if (params.primaryImage) {
    wp.primaryImageOfPage = {
      "@type": "ImageObject",
      url: abs(params.primaryImage),
    };
  }
  if (params.breadcrumbId) {
    wp.breadcrumb = { "@id": params.breadcrumbId };
  }
  if (params.speakableSelectors && params.speakableSelectors.length > 0) {
    wp.speakable = {
      "@type": "SpeakableSpecification",
      cssSelector: params.speakableSelectors,
    };
  }
  return wp;
};

// ---------- Breadcrumb ----------
export interface BreadcrumbItem {
  name: string;
  url: string;
}
export const buildBreadcrumbSchema = (items: BreadcrumbItem[], idSuffix = "") => ({
  "@type": "BreadcrumbList",
  "@id": `${abs(items[items.length - 1]?.url ?? "/")}#breadcrumb${idSuffix}`,
  itemListElement: items.map((item, i) => ({
    "@type": "ListItem",
    position: i + 1,
    name: item.name,
    item: abs(item.url),
  })),
});

// ---------- Product / Offer ----------
export interface ProductSchemaInput {
  name: string;
  description: string;
  url: string;
  image: string | string[];
  category?: string;
  sku?: string;
  brand?: string;
}
export const buildProductSchema = (p: ProductSchemaInput) => ({
  "@type": "Product",
  "@id": `${abs(p.url)}#product`,
  name: p.name,
  description: p.description,
  url: abs(p.url),
  image: Array.isArray(p.image) ? p.image.map(abs) : abs(p.image),
  category: p.category,
  sku: p.sku ?? p.url.split("/").pop(),
  brand: { "@type": "Brand", name: p.brand ?? BRAND },
  manufacturer: { "@id": `${SITE_URL}/#organization` },
  offers: {
    "@type": "Offer",
    url: abs(p.url),
    priceCurrency: "EUR",
    price: "0",
    priceSpecification: {
      "@type": "PriceSpecification",
      priceCurrency: "EUR",
      valueAddedTaxIncluded: true,
      description: "Preis auf Anfrage – individuelle Maßanfertigung",
    },
    availability: "https://schema.org/InStock",
    itemCondition: "https://schema.org/NewCondition",
    seller: { "@id": `${SITE_URL}/#localbusiness` },
    areaServed: SERVICE_AREA.primaryCities.map((c) => ({ "@type": "City", name: c })),
  },
});

// ---------- Service ----------
export interface ServiceSchemaInput {
  name: string;
  description: string;
  url: string;
  serviceType: string;
  areaServed?: string[];
  image?: string;
}
export const buildServiceSchema = (s: ServiceSchemaInput) => ({
  "@type": "Service",
  "@id": `${abs(s.url)}#service`,
  name: s.name,
  description: s.description,
  url: abs(s.url),
  serviceType: s.serviceType,
  provider: { "@id": `${SITE_URL}/#localbusiness` },
  areaServed: (s.areaServed ?? SERVICE_AREA.primaryCities).map((city) => ({
    "@type": "City",
    name: city,
  })),
  ...(s.image ? { image: abs(s.image) } : {}),
  audience: {
    "@type": "Audience",
    audienceType: "Hausbesitzer, Gastronomie, Architekten",
  },
});

// ---------- CollectionPage ----------
export const buildCollectionPageSchema = (params: {
  url: string;
  name: string;
  description: string;
  itemUrls: { name: string; url: string }[];
}) => ({
  "@type": "CollectionPage",
  "@id": `${abs(params.url)}#collection`,
  url: abs(params.url),
  name: params.name,
  description: params.description,
  inLanguage: PRIMARY_LANGUAGE,
  isPartOf: { "@id": `${SITE_URL}/#website` },
  mainEntity: {
    "@type": "ItemList",
    itemListElement: params.itemUrls.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      url: abs(it.url),
    })),
  },
});

// ---------- FAQ ----------
export interface FaqEntry {
  question: string;
  answer: string;
}
export const buildFaqSchema = (faqs: FaqEntry[], pageUrl?: string) => ({
  "@type": "FAQPage",
  "@id": `${pageUrl ? abs(pageUrl) : ""}#faq`,
  mainEntity: faqs.map((f) => ({
    "@type": "Question",
    name: f.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: f.answer,
    },
  })),
});

// ---------- HowTo ----------
export interface HowToStep {
  name: string;
  text: string;
  image?: string;
  url?: string;
}
export const buildHowToSchema = (params: {
  name: string;
  description: string;
  totalTime?: string;
  steps: HowToStep[];
  image?: string;
}) => ({
  "@type": "HowTo",
  name: params.name,
  description: params.description,
  ...(params.totalTime ? { totalTime: params.totalTime } : {}),
  ...(params.image ? { image: abs(params.image) } : {}),
  step: params.steps.map((s, i) => ({
    "@type": "HowToStep",
    position: i + 1,
    name: s.name,
    text: s.text,
    ...(s.image ? { image: abs(s.image) } : {}),
    ...(s.url ? { url: abs(s.url) } : {}),
  })),
});

// ---------- Article ----------
export interface ArticleSchemaInput {
  url: string;
  headline: string;
  description: string;
  image: string | string[];
  datePublished: string;
  dateModified?: string;
  authorName: string;
  authorUrl?: string;
  keywords?: string[];
  wordCount?: number;
  articleSection?: string;
}
export const buildArticleSchema = (a: ArticleSchemaInput) => ({
  "@type": "Article",
  "@id": `${abs(a.url)}#article`,
  url: abs(a.url),
  mainEntityOfPage: abs(a.url),
  headline: a.headline,
  description: a.description,
  image: Array.isArray(a.image) ? a.image.map(abs) : abs(a.image),
  datePublished: a.datePublished,
  dateModified: a.dateModified ?? a.datePublished,
  inLanguage: PRIMARY_LANGUAGE,
  author: {
    "@type": "Person",
    name: a.authorName,
    ...(a.authorUrl ? { url: abs(a.authorUrl) } : {}),
  },
  publisher: { "@id": `${SITE_URL}/#organization` },
  ...(a.keywords ? { keywords: a.keywords.join(", ") } : {}),
  ...(a.wordCount ? { wordCount: a.wordCount } : {}),
  ...(a.articleSection ? { articleSection: a.articleSection } : {}),
});

// ---------- Person ----------
export interface PersonSchemaInput {
  name: string;
  jobTitle?: string;
  url?: string;
  image?: string;
  description?: string;
  email?: string;
  telephone?: string;
  /** Fachgebiete f\u00fcr E-E-A-T-Signal. */
  knowsAbout?: string[];
  /** Sprachen, die die Person spricht. */
  knowsLanguage?: string[];
  /** Erfahrungsbereich (z. B. "Aluminium-Au\u00dfenanlagen seit 2014"). */
  hasOccupation?: {
    name: string;
    description?: string;
    skills?: string[];
  };
  /** Soziale Profile / sameAs. */
  sameAs?: string[];
  /** Wohnort. */
  homeLocation?: { name: string };
  /** Geburtsjahr (optional, f\u00fcr E-E-A-T). */
  birthDate?: string;
}
export const buildPersonSchema = (p: PersonSchemaInput) => ({
  "@type": "Person",
  "@id": `${SITE_URL}/ueber-uns#${p.name.toLowerCase().replace(/\s+/g, "-")}`,
  name: p.name,
  ...(p.jobTitle ? { jobTitle: p.jobTitle } : {}),
  ...(p.url ? { url: abs(p.url) } : {}),
  ...(p.image ? { image: abs(p.image) } : {}),
  ...(p.description ? { description: p.description } : {}),
  ...(p.email ? { email: p.email } : {}),
  ...(p.telephone ? { telephone: p.telephone } : {}),
  ...(p.knowsAbout && p.knowsAbout.length > 0 ? { knowsAbout: p.knowsAbout } : {}),
  ...(p.knowsLanguage && p.knowsLanguage.length > 0 ? { knowsLanguage: p.knowsLanguage } : {}),
  ...(p.hasOccupation
    ? {
        hasOccupation: {
          "@type": "Occupation",
          name: p.hasOccupation.name,
          ...(p.hasOccupation.description ? { description: p.hasOccupation.description } : {}),
          ...(p.hasOccupation.skills && p.hasOccupation.skills.length > 0
            ? { skills: p.hasOccupation.skills.join(", ") }
            : {}),
        },
      }
    : {}),
  ...(p.sameAs && p.sameAs.length > 0 ? { sameAs: p.sameAs } : {}),
  ...(p.homeLocation
    ? { homeLocation: { "@type": "Place", name: p.homeLocation.name } }
    : {}),
  ...(p.birthDate ? { birthDate: p.birthDate } : {}),
  worksFor: { "@id": `${SITE_URL}/#organization` },
});

// ---------- DefinedTerm / DefinedTermSet ----------
export interface DefinedTermInput {
  termCode: string;
  name: string;
  description: string;
  url?: string;
}
export const buildDefinedTermSchema = (term: DefinedTermInput, setUrl: string) => ({
  "@type": "DefinedTerm",
  "@id": `${abs(setUrl)}#term-${term.termCode}`,
  termCode: term.termCode,
  name: term.name,
  description: term.description,
  inDefinedTermSet: `${abs(setUrl)}#termset`,
  ...(term.url ? { url: abs(term.url) } : {}),
});
export const buildDefinedTermSetSchema = (params: {
  url: string;
  name: string;
  description: string;
  terms: DefinedTermInput[];
}) => ({
  "@type": "DefinedTermSet",
  "@id": `${abs(params.url)}#termset`,
  url: abs(params.url),
  name: params.name,
  description: params.description,
  inLanguage: PRIMARY_LANGUAGE,
  hasDefinedTerm: params.terms.map((t) => buildDefinedTermSchema(t, params.url)),
});

// ---------- ContactPage ----------
export const buildContactPageSchema = (params: {
  url: string;
  name?: string;
  description?: string;
}) => ({
  "@type": "ContactPage",
  "@id": `${abs(params.url)}#contactpage`,
  url: abs(params.url),
  name: params.name ?? `Kontakt — ${BRAND}`,
  description: params.description ?? "Kontaktdaten von Brait Überdachungen — Telefon, E-Mail, Standort.",
  inLanguage: PRIMARY_LANGUAGE,
  about: { "@id": `${SITE_URL}/#localbusiness` },
});

// ---------- AboutPage ----------
export const buildAboutPageSchema = (params: { url: string; description: string }) => ({
  "@type": "AboutPage",
  "@id": `${abs(params.url)}#aboutpage`,
  url: abs(params.url),
  name: `Über Brait Überdachungen`,
  description: params.description,
  inLanguage: PRIMARY_LANGUAGE,
  about: { "@id": `${SITE_URL}/#organization` },
});

// ---------- Helpers ----------
export const wrapAsGraph = (entries: object[]) => ({
  "@context": "https://schema.org",
  "@graph": entries,
});
