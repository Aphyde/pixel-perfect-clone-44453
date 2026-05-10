/**
 * Zentrale SEO/Site-Konstanten. Eine Quelle für Site-URL, Brand,
 * Kontakt, Service-Area, Sprache, Social-Profile.
 */

export const SITE_URL = "https://brait-ueberdachung.de";
export const BRAND = "Brait Überdachungen";
export const PARENT_COMPANY = "SMT Konzepte GmbH";
export const FOUNDER_NAME = "Nico Braitinger";
export const FOUNDED_YEAR = 2014;

export const CONTACT = {
  phoneE164: "+491735303581",
  phoneDisplay: "+49 173 530 3581",
  email: "info@brait-ueberdachung.de",
  whatsapp: "+491735303581",
};

export const ADDRESS = {
  street: "Graf-Albrecht-Str. 34/1",
  postalCode: "89160",
  city: "Dornstadt",
  region: "Baden-Württemberg",
  country: "DE",
};

export const SERVICE_AREA = {
  centerCity: "Ulm",
  radiusKm: 100,
  primaryCities: [
    "Ulm",
    "Neu-Ulm",
    "Dornstadt",
    "Blaustein",
    "Erbach",
    "Senden",
    "Illertissen",
    "Ehingen",
    "Laupheim",
    "Biberach",
    "Heidenheim",
    "Geislingen",
    "Göppingen",
    "Aalen",
    "Günzburg",
    "Memmingen",
    "Krumbach",
    "Augsburg",
    "Reutlingen",
    "Tübingen",
  ],
  regions: ["Baden-Württemberg", "Bayern (Schwaben)"],
};

export const OPENING_HOURS = [
  { days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"], opens: "09:00", closes: "18:00" },
  { days: ["Saturday"], opens: "10:00", closes: "14:00" },
];

export const SOCIAL_PROFILES = {
  // Hier können später real existierende Profile eingetragen werden.
  // Leere Werte werden in Schema/sameAs gefiltert.
  instagram: "",
  facebook: "",
  linkedin: "",
  youtube: "",
};

export const ORG_LEGAL = {
  legalName: "SMT Konzepte GmbH",
  registrationCourt: "Amtsgericht Ulm",
  registrationNumber: "HRB 749310",
};

export const PRIMARY_LANGUAGE = "de-DE";
