import { premiumColors, standardColors } from "./products";

/** Einheitlicher Platzhalter für Konfigurator-Vorschauen (Terrassenüberdachung) */
export const CONFIGURATOR_PLACEHOLDER = "/konfigurator/placeholder.jpg";

// ============================================================
// TYPES
// ============================================================
export type StepType =
  | "select-cards"
  | "dimensions"
  | "colors"
  | "radio-icon"
  | "extras-toggle";

export interface SelectCardOption {
  id: string;
  label: string;
  desc?: string;
  /** Aufpreis (€); falls Option Preis ändert */
  price?: number;
  /** Wenn das Option auch Min/Max für nachfolgenden dimensions-Step setzt */
  dimensions?: { minW: number; maxW: number; minD: number; maxD: number };
  /** Modell-spezifischer Basispreis */
  basePrice?: number;
  /** Modell-spezifische Lieferzeit (überschreibt Kategorie-Default), z. B. "8–10 Wochen" */
  deliveryTime?: string;
  /** Optionales Vorschau-Bild für die Option-Karte */
  image?: string;
  /** Kurzer Code (z. B. "halfrond"), wird zur Komposition des Visualizer-Hero-Bildes verwendet */
  code?: string;
}

export interface DimensionsConfig {
  width: { min: number; max: number; default: number; label?: string };
  depth: { min: number; max: number; default: number; label?: string };
  /** € pro m² über der Standardfläche von 24 m² (Faktor 1) */
  pricePerArea?: number;
  /** Bis zu dieser Fläche (m²) gilt der basePrice-Floor exklusiv (z. B. 15 für Terrasse). */
  floorAreaM2?: number;
}

export interface ColorOption {
  ral: string;
  hex: string;
  label: string;
  /** Kurzer Code (z. B. "anthracite"), wird zur Komposition des Visualizer-Hero-Bildes verwendet */
  code?: string;
}

export interface ExtraOption {
  id: string;
  label: string;
  desc: string;
  price: number;
  defaultOn?: boolean;
}

export interface ConfiguratorStep {
  id: string;
  num: string;
  title: string;
  type: StepType;
  /** Für select-cards / radio-icon */
  options?: SelectCardOption[];
  /** Für dimensions */
  dimensions?: DimensionsConfig;
  /** Für colors */
  colors?: ColorOption[];
  /** Für extras-toggle */
  extras?: ExtraOption[];
  /** Optional: Wenn dieser Step Maße dynamisch je gewähltem Vorgänger-Step verändert,
   *  hier die ID des Vorgänger-Steps angeben. */
  dimensionsFromOption?: string;
}

export interface CategoryConfigurator {
  slug: string;
  label: string;
  hero: string;
  shortDesc: string;
  /** Fester Basispreis (kann von select-cards überschrieben werden) */
  basePrice: number;
  steps: ConfiguratorStep[];
  /** Standard-Lieferzeit für die Kategorie (kann pro Modell überschrieben werden), z. B. "6–8 Wochen" */
  deliveryTime?: string;
  /** IDs der Steps, deren `code`-Felder zur Komposition des Hero-Bilds zusammengesetzt werden (Reihenfolge bestimmt Key-Reihenfolge) */
  heroVariantStepIds?: string[];
  /** Map von Variant-Key (Codes mit "|" getrennt) auf das zugehörige Hero-Bild */
  heroVariants?: Record<string, string>;
}

// ============================================================
// STANDARD-EXTRAS (Wartung / LED) — wiederverwendbar
// ============================================================
const ledExtra: ExtraOption = {
  id: "led",
  label: "LED-Beleuchtung",
  desc: "Dimmbar, warmweiß integriert",
  price: 990,
  defaultOn: true,
};
// Wartungspaket — wird im Konfigurator als zusammenhängender Block mit Tarif-Auswahl gerendert.
// Tarife: Monatlich 14,90 € (Flexibilität), Jährlich 199 € (Festpreis), 3 Jahre 499 € (Bestpreis ≈ −16 % vs. 3× Jährlich).
// Die `desc` der Tarife wird dort als kurzer Subtext unter der Periode angezeigt.
const wartungExtras: ExtraOption[] = [
  { id: "wartung-monat", label: "Monatlich", desc: "14,90 € / Monat", price: 14.9 },
  { id: "wartung-jahr", label: "Jährlich", desc: "199 € / Jahr", price: 199 },
  { id: "wartung-3jahre", label: "3 Jahre", desc: "499 € einmalig", price: 499 },
];

// Optionale Glas-Imprägnierung (Lotus-Effekt) — als Toggle im Service-Step
const glasImpraegnierung: ExtraOption = {
  id: "glas-impraegnierung",
  label: "Glas-Imprägnierung (Lotus-Effekt)",
  desc: "Schmutz- & wasserabweisende Beschichtung – Regen perlt ab, weniger Reinigungsaufwand",
  price: 410,
};

const wartungExtrasMarkisen: ExtraOption[] = [
  { id: "wartung-monat", label: "Monatlich", desc: "14,90 € / Monat", price: 14.9 },
  { id: "wartung-jahr", label: "Jährlich", desc: "199 € / Jahr", price: 199 },
  { id: "wartung-3jahre", label: "3 Jahre", desc: "499 € einmalig", price: 499 },
];

// ============================================================
// MARKISEN
// ============================================================
const markisenConfig: CategoryConfigurator = {
  slug: "markisen",
  label: "Markisen",
  hero: CONFIGURATOR_PLACEHOLDER,
  shortDesc: "Aufglas, Unterglas, Plissee oder klassisch – Sonnenschutz nach Maß für Terrasse & Veranda.",
  basePrice: 750,
  deliveryTime: "2 Wochen",
  steps: [
    {
      id: "frame",
      num: "01",
      title: "Gestellfarbe (Aluminium-Profil)",
      type: "colors",
      colors: [
        { ral: "RAL 7016", hex: "#293133", label: "Anthrazit", code: "anthracite" },
        { ral: "RAL 9005", hex: "#0a0a0a", label: "Schwarz", code: "black" },
        { ral: "RAL 9001", hex: "#f1ecdb", label: "Cremeweiß", code: "creme" },
        { ral: "RAL 9016", hex: "#F6F6F6", label: "Verkehrsweiß", code: "white" },
      ],
    },
    {
      id: "type",
      num: "02",
      title: "Markisenart",
      type: "select-cards",
      options: [
        { id: "aufglas", code: "aufglas", label: "Aufglasmarkise", desc: "Sonnenschutz über dem Glasdach – effektivster Hitzeschutz", basePrice: 2140, dimensions: { minW: 2, maxW: 6, minD: 1.5, maxD: 4 }, deliveryTime: "2 Wochen", image: CONFIGURATOR_PLACEHOLDER },
        { id: "unterglas", code: "unterglas", label: "Unterglasmarkise", desc: "Innenseitiger Sonnenschutz unter dem Glasdach", basePrice: 1720, dimensions: { minW: 2, maxW: 6, minD: 1.5, maxD: 4 }, deliveryTime: "2 Wochen", image: CONFIGURATOR_PLACEHOLDER },
        { id: "plissee", code: "plissee", label: "Plissee-System", desc: "Faltbarer, innenliegender Lichtfilter zwischen Sparren", basePrice: 690, dimensions: { minW: 1.5, maxW: 5, minD: 1, maxD: 3 }, deliveryTime: "2 Wochen", image: CONFIGURATOR_PLACEHOLDER },
        { id: "gelenkarm", code: "gelenkarm", label: "Gelenkarmmarkise", desc: "Frei stehender Klassiker für Terrasse & Balkon", basePrice: 1450, dimensions: { minW: 2, maxW: 7, minD: 1.5, maxD: 4 }, deliveryTime: "2 Wochen" },
        { id: "senkrecht", code: "senkrecht", label: "Senkrechtmarkise (Zipscreen)", desc: "Vertikaler Sicht- und Sonnenschutz", basePrice: 470, dimensions: { minW: 1, maxW: 5, minD: 1, maxD: 3 }, deliveryTime: "2 Wochen" },
      ],
    },
    {
      id: "dimensions",
      num: "03",
      title: "Maße (Breite × Ausfall)",
      type: "dimensions",
      dimensionsFromOption: "type",
      dimensions: {
        width: { min: 2, max: 7, default: 4, label: "Breite" },
        depth: { min: 1.5, max: 4, default: 3, label: "Ausfall" },
      },
    },
    {
      id: "fabric",
      num: "04",
      title: "Tuchfarbe",
      type: "colors",
      colors: [
        { ral: "Uni Grau", hex: "#9aa0a4", label: "Grau Uni" },
        { ral: "Uni Beige", hex: "#d6c7a3", label: "Beige Uni" },
        { ral: "Uni Anthrazit", hex: "#3d3d3d", label: "Anthrazit" },
        { ral: "Streifen Grau", hex: "#bcbcbc", label: "Streifen Grau" },
        { ral: "Streifen Beige", hex: "#e2d4ad", label: "Streifen Beige" },
      ],
    },
    {
      id: "drive",
      num: "05",
      title: "Antrieb",
      type: "radio-icon",
      options: [
        { id: "kurbel", label: "Handkurbel", price: 0 },
        { id: "motor", label: "Funkmotor", price: 690 },
        { id: "motor-sensor", label: "Motor mit Wind/Sonnensensor", price: 1250 },
      ],
    },
    {
      id: "extras",
      num: "06",
      title: "Service & Optionen",
      type: "extras-toggle",
      extras: [
        { id: "led-arm", label: "LED in Profil/Armen", desc: "Stimmungsvolle Abendnutzung", price: 830 },
        { id: "volant", label: "Volant verstellbar", desc: "Zusätzlicher Blendschutz", price: 410 },
        { id: "heizstrahler", label: "Heizstrahler-Vorbereitung", desc: "Kabelweg vorinstalliert", price: 340 },
        ...wartungExtrasMarkisen,
      ],
    },
  ],
};

// ============================================================
// SCHIRME
// ============================================================
const schirmeConfig: CategoryConfigurator = {
  slug: "schirme",
  label: "Sonnenschirme",
  hero: CONFIGURATOR_PLACEHOLDER,
  shortDesc: "Ampelschirme & Sonderformen – freischwebende Beschattung.",
  basePrice: 2090,
  deliveryTime: "2 Wochen",
  steps: [
    {
      id: "type",
      num: "01",
      title: "Schirmtyp",
      type: "select-cards",
      options: [
        { id: "ampel", label: "Ampelschirm (schwenkbar)", desc: "Freischwebend, 360° drehbar", basePrice: 2090, dimensions: { minW: 3, maxW: 5, minD: 3, maxD: 5 }, deliveryTime: "2 Wochen" },
        { id: "doppel", label: "Doppelschirm", desc: "Zwei Schirme an einem Mast", basePrice: 4050, dimensions: { minW: 4, maxW: 7, minD: 4, maxD: 7 }, deliveryTime: "2 Wochen" },
        { id: "mittelmast", label: "Mittelmast-Schirm", desc: "Klassisch, robust, großflächig", basePrice: 1690, dimensions: { minW: 3, maxW: 5, minD: 3, maxD: 5 }, deliveryTime: "2 Wochen" },
      ],
    },
    {
      id: "dimensions",
      num: "02",
      title: "Größe (Breite × Tiefe)",
      type: "dimensions",
      dimensionsFromOption: "type",
      dimensions: {
        width: { min: 3, max: 5, default: 4, label: "Breite" },
        depth: { min: 3, max: 5, default: 4, label: "Tiefe" },
      },
    },
    {
      id: "fabric",
      num: "03",
      title: "Stofffarbe",
      type: "colors",
      colors: [
        { ral: "Uni Anthrazit", hex: "#3d3d3d", label: "Anthrazit" },
        { ral: "Uni Beige", hex: "#d6c7a3", label: "Beige" },
        { ral: "Uni Crème", hex: "#f1ecdb", label: "Crème" },
        { ral: "Uni Taupe", hex: "#9a8c7a", label: "Taupe" },
        { ral: "Uni Schwarz", hex: "#0a0a0a", label: "Schwarz" },
      ],
    },
    {
      id: "frame",
      num: "04",
      title: "Mast / Gestellfarbe",
      type: "colors",
      colors: standardColors,
    },
    {
      id: "extras",
      num: "05",
      title: "Erweiterungen",
      type: "extras-toggle",
      extras: [
        { id: "led-schirm", label: "LED-Beleuchtung", desc: "Integriert in Streben", price: 550 },
        { id: "heizung", label: "Heizstrahler", desc: "An Mast montiert, Funk", price: 990 },
        { id: "bodenhuelse", label: "Bodenhülse einbetonieren", desc: "Permanente Befestigung", price: 410 },
        { id: "schutzhuelle", label: "Schutzhülle Premium", desc: "Wetterfest, atmungsaktiv", price: 210 },
      ],
    },
  ],
};

// ============================================================
// Q-BUS – LAMELLEN-PERGOLA
// (Aluminium-Lamellen-Dach, verstellbar – Premium-Pergola)
// ============================================================
const qbusConfig: CategoryConfigurator = {
  slug: "q-bus",
  label: "Q-Bus Lamellen-Pergola",
  hero: CONFIGURATOR_PLACEHOLDER,
  shortDesc: "Premium-Lamellen-Pergola: verstellbare Aluminium-Lamellen, LED, Glaswände & Zipscreen frei kombinierbar.",
  basePrice: 7840,
  deliveryTime: "2 Wochen",
  steps: [
    {
      id: "color",
      num: "01",
      title: "Farbe (Aluminium-Profil)",
      type: "colors",
      colors: [
        { ral: "RAL 7016", hex: "#293133", label: "Anthrazit", code: "anthracite" },
        { ral: "RAL 9005", hex: "#0a0a0a", label: "Schwarz", code: "black" },
        { ral: "RAL 9001", hex: "#f1ecdb", label: "Cremeweiß", code: "creme" },
        { ral: "RAL 9016", hex: "#F6F6F6", label: "Verkehrsweiß", code: "white" },
      ],
    },
    {
      id: "dimensions",
      num: "02",
      title: "Maße (Breite × Tiefe)",
      type: "dimensions",
      dimensions: {
        width: { min: 3, max: 7, default: 5, label: "Breite" },
        depth: { min: 3, max: 4.5, default: 3, label: "Tiefe" },
      },
    },
    {
      id: "front",
      num: "03",
      title: "Vorderseite",
      type: "select-cards",
      options: [
        { id: "front-open", label: "Offen", desc: "Klassisch, freier Durchgang", price: 0, image: CONFIGURATOR_PLACEHOLDER },
        { id: "front-schiebepui", label: "Schiebetür-System", desc: "Eleganter Übergang in den Garten", price: 3790, image: CONFIGURATOR_PLACEHOLDER },
        { id: "front-schiebewand", label: "Glas-Schiebewände klar", desc: "Vollverglasung, klar", price: 3790, image: CONFIGURATOR_PLACEHOLDER },
        { id: "front-schiebewand-tint", label: "Glas-Schiebewände getönt", desc: "Vollverglasung, getönt", price: 3790, image: CONFIGURATOR_PLACEHOLDER },
        { id: "front-glas", label: "Festes Glaselement", desc: "Festrahmen mit VSG-Glas", price: 1810, image: CONFIGURATOR_PLACEHOLDER },
        { id: "front-poly", label: "Festes Polycarbonat", desc: "Festrahmen, leichter & günstiger", price: 1390, image: CONFIGURATOR_PLACEHOLDER },
        { id: "front-sandwich", label: "Sandwich-Paneel", desc: "Vollflächig isoliert (Alu-Schaum-Alu)", price: 2090, image: CONFIGURATOR_PLACEHOLDER },
      ],
    },
    {
      id: "back",
      num: "04",
      title: "Rückseite",
      type: "select-cards",
      options: [
        { id: "back-open", label: "Offen", desc: "Wandanschluss ohne Abschluss", price: 0, image: CONFIGURATOR_PLACEHOLDER },
        { id: "back-schiebepui", label: "Schiebetür-System", desc: "Eleganter Übergang", price: 3790, image: CONFIGURATOR_PLACEHOLDER },
        { id: "back-schiebewand", label: "Glas-Schiebewände klar", desc: "Vollverglasung, klar", price: 3790, image: CONFIGURATOR_PLACEHOLDER },
        { id: "back-schiebewand-tint", label: "Glas-Schiebewände getönt", desc: "Vollverglasung, getönt", price: 3790, image: CONFIGURATOR_PLACEHOLDER },
        { id: "back-glas", label: "Festes Glaselement", desc: "Festrahmen mit VSG-Glas", price: 1810, image: CONFIGURATOR_PLACEHOLDER },
        { id: "back-poly", label: "Festes Polycarbonat", desc: "Festrahmen, leichter & günstiger", price: 1390, image: CONFIGURATOR_PLACEHOLDER },
        { id: "back-sandwich", label: "Sandwich-Paneel", desc: "Vollflächig isoliert (Alu-Schaum-Alu)", price: 2090, image: CONFIGURATOR_PLACEHOLDER },
      ],
    },
    {
      id: "left",
      num: "05",
      title: "Linke Seitenwand",
      type: "select-cards",
      options: [
        { id: "left-open", label: "Offen", desc: "Keine Seitenwand", price: 0, image: CONFIGURATOR_PLACEHOLDER },
        { id: "left-schiebepui", label: "Schiebetür-System", desc: "Eleganter Übergang", price: 3790, image: CONFIGURATOR_PLACEHOLDER },
        { id: "left-schiebewand", label: "Glas-Schiebewände klar", desc: "Vollverglasung, klar", price: 3790, image: CONFIGURATOR_PLACEHOLDER },
        { id: "left-schiebewand-tint", label: "Glas-Schiebewände getönt", desc: "Vollverglasung, getönt", price: 3790, image: CONFIGURATOR_PLACEHOLDER },
        { id: "left-glas", label: "Festes Glaselement", desc: "Festrahmen mit VSG-Glas", price: 1810, image: CONFIGURATOR_PLACEHOLDER },
        { id: "left-poly", label: "Festes Polycarbonat", desc: "Festrahmen, leichter & günstiger", price: 1390, image: CONFIGURATOR_PLACEHOLDER },
        { id: "left-sandwich", label: "Sandwich-Paneel", desc: "Vollflächig isoliert (Alu-Schaum-Alu)", price: 2090, image: CONFIGURATOR_PLACEHOLDER },
      ],
    },
    {
      id: "right",
      num: "06",
      title: "Rechte Seitenwand",
      type: "select-cards",
      options: [
        { id: "right-open", label: "Offen", desc: "Keine Seitenwand", price: 0, image: CONFIGURATOR_PLACEHOLDER },
        { id: "right-schiebepui", label: "Schiebetür-System", desc: "Eleganter Übergang", price: 3790, image: CONFIGURATOR_PLACEHOLDER },
        { id: "right-schiebewand", label: "Glas-Schiebewände klar", desc: "Vollverglasung, klar", price: 3790, image: CONFIGURATOR_PLACEHOLDER },
        { id: "right-schiebewand-tint", label: "Glas-Schiebewände getönt", desc: "Vollverglasung, getönt", price: 3790, image: CONFIGURATOR_PLACEHOLDER },
        { id: "right-glas", label: "Festes Glaselement", desc: "Festrahmen mit VSG-Glas", price: 1810, image: CONFIGURATOR_PLACEHOLDER },
        { id: "right-poly", label: "Festes Polycarbonat", desc: "Festrahmen, leichter & günstiger", price: 1390, image: CONFIGURATOR_PLACEHOLDER },
        { id: "right-sandwich", label: "Sandwich-Paneel", desc: "Vollflächig isoliert (Alu-Schaum-Alu)", price: 2090, image: CONFIGURATOR_PLACEHOLDER },
      ],
    },
    {
      id: "lighting",
      num: "07",
      title: "LED-Beleuchtung",
      type: "radio-icon",
      options: [
        { id: "led-none", label: "Keine Beleuchtung", price: 0, image: CONFIGURATOR_PLACEHOLDER },
        { id: "led-cold", label: "LED Kaltweiß", price: 830, image: CONFIGURATOR_PLACEHOLDER },
        { id: "led-warm", label: "LED Warmweiß", price: 830, image: CONFIGURATOR_PLACEHOLDER },
        { id: "led-dim", label: "LED Dimmbar (Funk)", price: 1250, image: CONFIGURATOR_PLACEHOLDER },
      ],
    },
    {
      id: "motor",
      num: "08",
      title: "Lamellen-Steuerung",
      type: "radio-icon",
      options: [
        { id: "motor-manual", label: "Handkurbel", price: 0 },
        { id: "motor-auto", label: "Funk-Motor (mit Fernbedienung)", price: 990 },
      ],
    },
    {
      id: "screen",
      num: "09",
      title: "Zipscreen-Position",
      type: "radio-icon",
      options: [
        { id: "screen-none", label: "Kein Zipscreen", price: 0, image: CONFIGURATOR_PLACEHOLDER },
        { id: "screen-front", label: "Vorderseite", price: 3260, image: CONFIGURATOR_PLACEHOLDER },
        { id: "screen-back", label: "Rückseite", price: 3260, image: CONFIGURATOR_PLACEHOLDER },
        { id: "screen-left", label: "Linke Seite", price: 3260, image: CONFIGURATOR_PLACEHOLDER },
        { id: "screen-right", label: "Rechte Seite", price: 3260, image: CONFIGURATOR_PLACEHOLDER },
      ],
    },
    {
      id: "extras",
      num: "10",
      title: "Service & Optionen",
      type: "extras-toggle",
      extras: [
        glasImpraegnierung,
        ...wartungExtras,
      ],
    },
  ],
};

// ============================================================
// EINGANGSÜBERDACHUNGEN
// ============================================================
const eingangConfig: CategoryConfigurator = {
  slug: "eingangsueberdachungen",
  label: "Eingangsüberdachungen",
  hero: CONFIGURATOR_PLACEHOLDER,
  shortDesc: "Geradlinig oder gebogen – stilvoller Schutz für den Eingang.",
  basePrice: 0,
  deliveryTime: "2 Wochen",
  steps: [
    {
      id: "form",
      num: "01",
      title: "Form",
      type: "select-cards",
      options: [
        { id: "gerade", label: "Gerade", desc: "Klassisch, schlicht", basePrice: 0, dimensions: { minW: 1.2, maxW: 3, minD: 0.8, maxD: 1.5 }, deliveryTime: "2 Wochen" },
        { id: "gebogen", label: "Gebogen", desc: "Elegant geschwungen", basePrice: 120, dimensions: { minW: 1.2, maxW: 3, minD: 0.8, maxD: 1.5 }, deliveryTime: "2 Wochen" },
        { id: "pultdach", label: "Pultdach", desc: "Mit leichtem Gefälle", basePrice: 0, dimensions: { minW: 1.2, maxW: 3, minD: 0.8, maxD: 1.5 }, deliveryTime: "2 Wochen" },
      ],
    },
    {
      id: "dimensions",
      num: "02",
      title: "Maße (Breite × Tiefe)",
      type: "dimensions",
      dimensionsFromOption: "form",
      dimensions: {
        width: { min: 1.2, max: 3, default: 2, label: "Breite" },
        depth: { min: 0.8, max: 1.5, default: 1.2, label: "Tiefe" },
      },
    },
    {
      id: "roof",
      num: "03",
      title: "Dachmaterial",
      type: "select-cards",
      options: [
        { id: "polycarbonat", label: "Polycarbonat 8 mm", price: 0 },
        { id: "vsg-clear", label: "VSG 44.2 klar", price: 550 },
        { id: "vsg-tint", label: "VSG 44.2 getönt", price: 830 },
      ],
    },
    {
      id: "color",
      num: "04",
      title: "Farbauswahl (RAL)",
      type: "colors",
      colors: standardColors,
    },
    {
      id: "extras",
      num: "05",
      title: "Erweiterungen",
      type: "extras-toggle",
      extras: [
        { id: "seitenteil", label: "Seitenteil (Glas)", desc: "Pro Seite", price: 690 },
        { id: "led-eingang", label: "LED-Spots im Profil", desc: "2 Spots integriert", price: 410 },
        { id: "regenrinne", label: "Verdeckte Regenrinne", desc: "Mit Fallrohr", price: 310 },
        glasImpraegnierung,
      ],
    },
  ],
};

// ============================================================
// CARPORTS
// ============================================================
const carportConfig: CategoryConfigurator = {
  slug: "carports",
  label: "Carports",
  hero: CONFIGURATOR_PLACEHOLDER,
  shortDesc: "Einzel, Doppel oder Reihe – Aluminium-Carports nach Maß.",
  basePrice: 6090,
  deliveryTime: "2 Wochen",
  steps: [
    {
      id: "type",
      num: "01",
      title: "Typ",
      type: "select-cards",
      options: [
        { id: "einzel", label: "Einzel-Carport", desc: "1 Stellplatz", basePrice: 6090, dimensions: { minW: 2.8, maxW: 3.8, minD: 5, maxD: 7 }, deliveryTime: "2 Wochen" },
        { id: "doppel", label: "Doppel-Carport", desc: "2 Stellplätze nebeneinander", basePrice: 13090, dimensions: { minW: 5.4, maxW: 6.5, minD: 5, maxD: 7 }, deliveryTime: "2 Wochen" },
        { id: "reihe", label: "Reihen-Carport", desc: "3+ Stellplätze, modular", basePrice: 20460, dimensions: { minW: 8, maxW: 12, minD: 5, maxD: 7 }, deliveryTime: "2 Wochen" },
      ],
    },
    {
      id: "dimensions",
      num: "02",
      title: "Maße (Breite × Tiefe)",
      type: "dimensions",
      dimensionsFromOption: "type",
      dimensions: {
        width: { min: 2.8, max: 12, default: 5.4, label: "Breite" },
        depth: { min: 5, max: 7, default: 5.5, label: "Tiefe" },
      },
    },
    {
      id: "roof-form",
      num: "03",
      title: "Dachform",
      type: "select-cards",
      options: [
        { id: "flach", label: "Flachdach", desc: "Modern, kubisch", price: 0 },
        { id: "pult", label: "Pultdach", desc: "Mit leichtem Gefälle", price: 690 },
        { id: "bogen", label: "Bogendach", desc: "Geschwungene Optik", price: 1810 },
      ],
    },
    {
      id: "color",
      num: "04",
      title: "Farbauswahl (RAL)",
      type: "colors",
      colors: standardColors,
    },
    {
      id: "extras",
      num: "05",
      title: "Wände, Tore & Optionen",
      type: "extras-toggle",
      extras: [
        { id: "rueckwand", label: "Rückwand geschlossen", desc: "Aluminium-Paneele", price: 1250 },
        { id: "seitenwand", label: "Seitenwand (pro Seite)", desc: "Aluminium-Paneele", price: 990 },
        { id: "tor", label: "Sektionaltor", desc: "Mit Funkfernbedienung", price: 3490 },
        { id: "solar", label: "Solar-Vorbereitung", desc: "Statik + Kabelweg", price: 830 },
        { id: "led-carport", label: "LED-Beleuchtung", desc: "Bewegungsmelder integriert", price: 550 },
        ...wartungExtras,
      ],
    },
  ],
};

// ============================================================
// VERANDA (Premium-Glasüberdachung)
// ============================================================

const verandaConfig: CategoryConfigurator = {
  slug: "terrassenueberdachungen",
  label: "Terrassenüberdachungen",
  hero: CONFIGURATOR_PLACEHOLDER,
  shortDesc: "Premium-Terrassenüberdachung – Rinne, Farbe, Dach, Wände, LED & Sonnenschutz live konfigurieren.",
  // Preislogik Mai 2026 (Nico): Produkt brutto inkl. MwSt. · zzgl. Montage & Lieferung.
  // Floor 3.790 € (5×3 m) · 290 €/m² ab >15 m² · gerundete Marketing-Preise
  basePrice: 3790,
  deliveryTime: "2 Wochen",
  steps: [
    {
      id: "gutter",
      num: "01",
      title: "Regenrinnen-Profil",
      type: "select-cards",
      options: [
        { id: "recht", code: "recht", label: "Gerade Rinne", desc: "Klares Box-Profil, kubische Optik", price: 310, image: CONFIGURATOR_PLACEHOLDER },
        { id: "halfrond", code: "halfrond", label: "Halbrunde Rinne", desc: "Klassiker, weiche Linienführung", price: 0, image: CONFIGURATOR_PLACEHOLDER },
        { id: "modern", code: "modern", label: "Moderne Rinne", desc: "Schlankes, modernes Profil", price: 0, image: CONFIGURATOR_PLACEHOLDER },
        { id: "sier", code: "sier", label: "Zier-Rinne", desc: "Dekoratives Sims-Profil", price: 0, image: CONFIGURATOR_PLACEHOLDER },
      ],
    },
    {
      id: "color",
      num: "02",
      title: "Farbe (Aluminium-Profil)",
      type: "colors",
      colors: [
        { ral: "RAL 7016", hex: "#293133", label: "Anthrazit", code: "anthracite" },
        { ral: "RAL 9005", hex: "#0a0a0a", label: "Schwarz", code: "black" },
        { ral: "RAL 9001", hex: "#f1ecdb", label: "Cremeweiß", code: "creme" },
        { ral: "RAL 9016", hex: "#F6F6F6", label: "Verkehrsweiß", code: "white" },
      ],
    },
    {
      id: "dimensions",
      num: "03",
      title: "Maße (Breite × Tiefe)",
      type: "dimensions",
      dimensions: {
        // Floor 3.790 € brutto bis 15 m² (5×3). Darüber 290 €/m² brutto.
        width: { min: 2.5, max: 9, default: 5, label: "Breite" },
        depth: { min: 2, max: 4.5, default: 3, label: "Tiefe" },
        pricePerArea: 290,
        floorAreaM2: 15,
      },
    },
    {
      id: "roof",
      num: "04",
      title: "Dachmaterial",
      type: "select-cards",
      options: [
        { id: "poly-opaal", label: "Polycarbonat Opal", desc: "Diffuses Licht, Hitzeschutz", price: 0, image: CONFIGURATOR_PLACEHOLDER },
        { id: "poly-helder", label: "Polycarbonat Klar", desc: "Maximaler Lichteinfall", price: 0, image: CONFIGURATOR_PLACEHOLDER },
        // VSG-Aufpreise leicht angehoben — primärer Marge-Hebel (~45 % Marge laut Strategie)
        { id: "glas-helder", label: "Klarglas (VSG 44.2)", desc: "Premium, kristallklar", price: 3360, image: CONFIGURATOR_PLACEHOLDER },
        { id: "glas-opaal", label: "Opalglas (VSG 44.2)", desc: "Sichtschutz & Streulicht", price: 3790, image: CONFIGURATOR_PLACEHOLDER },
        { id: "glas-tint", label: "Getöntes Glas (VSG)", desc: "Sonnenschutz integriert", price: 4060, image: CONFIGURATOR_PLACEHOLDER },
      ],
    },
    {
      id: "front",
      num: "05",
      title: "Vorderseite",
      type: "select-cards",
      options: [
        { id: "open", label: "Offen", desc: "Klassische Veranda, freier Durchgang", price: 0, image: CONFIGURATOR_PLACEHOLDER },
        { id: "schiebewand-klar", label: "Glas-Schiebewände klar", desc: "Vollverglasung, klar", price: 4050, image: CONFIGURATOR_PLACEHOLDER },
        { id: "schiebewand-tint", label: "Glas-Schiebewände getönt", desc: "Vollverglasung, getönt", price: 4610, image: CONFIGURATOR_PLACEHOLDER },
        { id: "schiebetuer", label: "Schiebetür", desc: "Eleganter Übergang in den Garten", price: 2650, image: CONFIGURATOR_PLACEHOLDER },
      ],
    },
    {
      id: "left-wall",
      num: "06",
      title: "Linke Seitenwand",
      type: "select-cards",
      options: [
        { id: "lw-open", label: "Offen", desc: "Keine Seitenwand", price: 0, image: CONFIGURATOR_PLACEHOLDER },
        { id: "lw-glas-tuer", label: "Glas-Seitenwand mit Tür", desc: "Festes Glas + Drehtür", price: 2390, image: CONFIGURATOR_PLACEHOLDER },
        { id: "lw-glas", label: "Glas-Seitenwand komplett", desc: "Vollglas-Modul", price: 1810, image: CONFIGURATOR_PLACEHOLDER },
        { id: "lw-poly", label: "Polycarbonat Seitenwand", desc: "Komplett geschlossen", price: 990, image: CONFIGURATOR_PLACEHOLDER },
        { id: "lw-alu-glas-keil", label: "Alu-Wand mit Glas-Keil", desc: "Sandwich-Paneel + Glas oben", price: 1690, image: CONFIGURATOR_PLACEHOLDER },
        { id: "lw-alu-poly-keil", label: "Alu-Wand mit Polycarbonat-Keil", desc: "Sandwich-Paneel + PC oben", price: 1390, image: CONFIGURATOR_PLACEHOLDER },
        { id: "lw-schiebepui-glas-keil", label: "Schiebetür + Glas-Keil", desc: "Mit Glas-Keil", price: 3350, image: CONFIGURATOR_PLACEHOLDER },
        { id: "lw-schiebepui-poly-keil", label: "Schiebetür + Polycarbonat-Keil", desc: "Mit PC-Keil", price: 3090, image: CONFIGURATOR_PLACEHOLDER },
        { id: "lw-schiebewand-glas-keil", label: "Glas-Schiebewände + Glas-Keil", desc: "Vollverglasung + Keil", price: 3630, image: CONFIGURATOR_PLACEHOLDER },
        { id: "lw-schiebewand-poly-keil", label: "Glas-Schiebewände + Polycarbonat-Keil", desc: "Vollverglasung + PC-Keil", price: 3350, image: CONFIGURATOR_PLACEHOLDER },
        { id: "lw-keil-glas", label: "Nur Keil aus Glas", desc: "Oberer Glas-Keil, Wand offen", price: 830, image: CONFIGURATOR_PLACEHOLDER },
        { id: "lw-keil-poly", label: "Nur Keil aus Polycarbonat", desc: "Oberer PC-Keil, Wand offen", price: 550, image: CONFIGURATOR_PLACEHOLDER },
        { id: "lw-keil-alu", label: "Nur Keil aus Aluminium", desc: "Geschlossener Alu-Keil", price: 410, image: CONFIGURATOR_PLACEHOLDER },
        { id: "lw-sandwich", label: "Sandwich-Paneel", desc: "Vollflächig isoliert", price: 1250, image: CONFIGURATOR_PLACEHOLDER },
      ],
    },
    {
      id: "right-wall",
      num: "07",
      title: "Rechte Seitenwand",
      type: "select-cards",
      options: [
        { id: "rw-open", label: "Offen", desc: "Keine Seitenwand", price: 0, image: CONFIGURATOR_PLACEHOLDER },
        { id: "rw-glas-tuer", label: "Glas-Seitenwand mit Tür", desc: "Festes Glas + Drehtür", price: 2390, image: CONFIGURATOR_PLACEHOLDER },
        { id: "rw-glas", label: "Glas-Seitenwand komplett", desc: "Vollglas-Modul", price: 1810, image: CONFIGURATOR_PLACEHOLDER },
        { id: "rw-poly", label: "Polycarbonat Seitenwand", desc: "Komplett geschlossen", price: 990, image: CONFIGURATOR_PLACEHOLDER },
        { id: "rw-alu-glas-keil", label: "Alu-Wand mit Glas-Keil", desc: "Sandwich-Paneel + Glas oben", price: 1690, image: CONFIGURATOR_PLACEHOLDER },
        { id: "rw-alu-poly-keil", label: "Alu-Wand mit Polycarbonat-Keil", desc: "Sandwich-Paneel + PC oben", price: 1390, image: CONFIGURATOR_PLACEHOLDER },
        { id: "rw-schiebepui-glas-keil", label: "Schiebetür + Glas-Keil", desc: "Mit Glas-Keil", price: 3350, image: CONFIGURATOR_PLACEHOLDER },
        { id: "rw-schiebepui-poly-keil", label: "Schiebetür + Polycarbonat-Keil", desc: "Mit PC-Keil", price: 3090, image: CONFIGURATOR_PLACEHOLDER },
        { id: "rw-schiebewand-glas-keil", label: "Glas-Schiebewände + Glas-Keil", desc: "Vollverglasung + Keil", price: 3630, image: CONFIGURATOR_PLACEHOLDER },
        { id: "rw-schiebewand-poly-keil", label: "Glas-Schiebewände + Polycarbonat-Keil", desc: "Vollverglasung + PC-Keil", price: 3350, image: CONFIGURATOR_PLACEHOLDER },
        { id: "rw-keil-glas", label: "Nur Keil aus Glas", desc: "Oberer Glas-Keil, Wand offen", price: 830, image: CONFIGURATOR_PLACEHOLDER },
        { id: "rw-keil-poly", label: "Nur Keil aus Polycarbonat", desc: "Oberer PC-Keil, Wand offen", price: 550, image: CONFIGURATOR_PLACEHOLDER },
        { id: "rw-keil-alu", label: "Nur Keil aus Aluminium", desc: "Geschlossener Alu-Keil", price: 410, image: CONFIGURATOR_PLACEHOLDER },
        { id: "rw-sandwich", label: "Sandwich-Paneel", desc: "Vollflächig isoliert", price: 1250, image: CONFIGURATOR_PLACEHOLDER },
      ],
    },
    {
      id: "lighting",
      num: "08",
      title: "LED-Beleuchtung",
      type: "radio-icon",
      options: [
        { id: "light-none", label: "Keine Beleuchtung", price: 0, image: CONFIGURATOR_PLACEHOLDER },
        { id: "light-cold", label: "LED Kaltweiß", price: 830, image: CONFIGURATOR_PLACEHOLDER },
        { id: "light-warm", label: "LED Warmweiß", price: 830, image: CONFIGURATOR_PLACEHOLDER },
        { id: "light-dim", label: "LED dimmbar (Funk)", price: 1250, image: CONFIGURATOR_PLACEHOLDER },
      ],
    },
    {
      id: "sunshade",
      num: "09",
      title: "Sonnenschutz",
      type: "radio-icon",
      options: [
        { id: "sun-none", label: "Kein Sonnenschutz", price: 0, image: CONFIGURATOR_PLACEHOLDER },
        { id: "sun-top", label: "Über-Dach Sonnenschutz", price: 2650, image: CONFIGURATOR_PLACEHOLDER },
        { id: "sun-under", label: "Unter-Dach Sonnenschutz", price: 2090, image: CONFIGURATOR_PLACEHOLDER },
        { id: "sun-plisse", label: "Plissee (manuell)", price: 1390, image: CONFIGURATOR_PLACEHOLDER },
      ],
    },
    {
      id: "screen",
      num: "10",
      title: "Zipscreen-Position",
      type: "radio-icon",
      options: [
        { id: "screen-none", label: "Keiner", price: 0, image: CONFIGURATOR_PLACEHOLDER },
        { id: "screen-front", label: "Vorderseite", price: 1810, image: CONFIGURATOR_PLACEHOLDER },
        { id: "screen-left", label: "Links", price: 1690, image: CONFIGURATOR_PLACEHOLDER },
        { id: "screen-right", label: "Rechts", price: 1690, image: CONFIGURATOR_PLACEHOLDER },
      ],
    },
    {
      id: "extras",
      num: "11",
      title: "Service & Optionen",
      type: "extras-toggle",
      extras: [
        glasImpraegnierung,
        ...wartungExtras,
      ],
    },
  ],
};

// ============================================================
// EXPORT
// ============================================================
// Hinweis: Schirme, Eingangsüberdachungen und Carports haben aktuell KEINEN Konfigurator —
// nur Produktinfo-Seiten. Daher hier bewusst nicht im Export-Mapping enthalten.
export const configurators: Record<string, CategoryConfigurator> = {
  markisen: markisenConfig,
  terrassenueberdachungen: verandaConfig,
  "q-bus": qbusConfig,
};

export const configuratorList = Object.values(configurators);
