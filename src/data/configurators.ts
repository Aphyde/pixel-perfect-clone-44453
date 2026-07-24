import { premiumColors, standardColors } from "./products";

// Bilder werden statisch aus /public referenziert (Next.js).
const konfBg = "/konfigurator-bg.jpg";
const mAufglasAnt = "/markisen/variants/aufglas-anthracite.webp";
const mAufglasBl = "/markisen/variants/aufglas-black.webp";
const mAufglasCr = "/markisen/variants/aufglas-creme.webp";
const mAufglasWh = "/markisen/variants/aufglas-white.webp";
const mUnterglasAnt = "/markisen/variants/unterglas-anthracite.webp";
const mUnterglasBl = "/markisen/variants/unterglas-black.webp";
const mUnterglasCr = "/markisen/variants/unterglas-creme.webp";
const mUnterglasWh = "/markisen/variants/unterglas-white.webp";
const mPlisseeAnt = "/markisen/variants/plissee-anthracite.webp";
const mPlisseeBl = "/markisen/variants/plissee-black.webp";
const mPlisseeCr = "/markisen/variants/plissee-creme.webp";
const mPlisseeWh = "/markisen/variants/plissee-white.webp";
const heroSchirm = "/architecture-detail.jpg";
const qbusAnt = "/qbus/hero/anthracite.webp";
const qbusBl = "/qbus/hero/black.webp";
const qbusCr = "/qbus/hero/creme.webp";
const qbusWh = "/qbus/hero/white.webp";
const heroEingang = "/detail-terrasse.jpg";
const heroCarport = "/hero-carport.jpg";

// Q-Bus & Veranda Lamellen-Bilder werden ueber relative public-Pfade referenziert.
const qbusImg = (rel: string) => `/qbus/${rel}`;

/** Fallback, falls fuer eine Option/Kategorie kein Bild hinterlegt ist */
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
  hero: mAufglasAnt,
  shortDesc: "Aufglas, Unterglas, Plissee oder klassisch – Sonnenschutz nach Maß für Terrasse & Veranda.",
  basePrice: 750,
  deliveryTime: "2 Wochen",
  // Hero reagiert live auf Gestellfarbe × Markisenart (12 Kombinationen)
  heroVariantStepIds: ["frame", "type"],
  heroVariants: {
    "anthracite|aufglas": mAufglasAnt,
    "black|aufglas": mAufglasBl,
    "creme|aufglas": mAufglasCr,
    "white|aufglas": mAufglasWh,
    "anthracite|unterglas": mUnterglasAnt,
    "black|unterglas": mUnterglasBl,
    "creme|unterglas": mUnterglasCr,
    "white|unterglas": mUnterglasWh,
    "anthracite|plissee": mPlisseeAnt,
    "black|plissee": mPlisseeBl,
    "creme|plissee": mPlisseeCr,
    "white|plissee": mPlisseeWh,
    // Gelenkarm & Senkrecht haben kein Render → fallback auf Aufglas der jeweiligen Farbe
    "anthracite|gelenkarm": mAufglasAnt,
    "black|gelenkarm": mAufglasBl,
    "creme|gelenkarm": mAufglasCr,
    "white|gelenkarm": mAufglasWh,
    "anthracite|senkrecht": mAufglasAnt,
    "black|senkrecht": mAufglasBl,
    "creme|senkrecht": mAufglasCr,
    "white|senkrecht": mAufglasWh,
  },
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
        { id: "aufglas", code: "aufglas", label: "Aufglasmarkise", desc: "Sonnenschutz über dem Glasdach – effektivster Hitzeschutz", basePrice: 2140, dimensions: { minW: 2, maxW: 6, minD: 1.5, maxD: 4 }, deliveryTime: "2 Wochen", image: mAufglasAnt },
        { id: "unterglas", code: "unterglas", label: "Unterglasmarkise", desc: "Innenseitiger Sonnenschutz unter dem Glasdach", basePrice: 1720, dimensions: { minW: 2, maxW: 6, minD: 1.5, maxD: 4 }, deliveryTime: "2 Wochen", image: mUnterglasAnt },
        { id: "plissee", code: "plissee", label: "Plissee-System", desc: "Faltbarer, innenliegender Lichtfilter zwischen Sparren", basePrice: 690, dimensions: { minW: 1.5, maxW: 5, minD: 1, maxD: 3 }, deliveryTime: "2 Wochen", image: mPlisseeAnt },
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
  hero: heroSchirm,
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
  hero: qbusAnt,
  shortDesc: "Premium-Lamellen-Pergola: verstellbare Aluminium-Lamellen, LED, Glaswände & Zipscreen frei kombinierbar.",
  basePrice: 7840,
  deliveryTime: "2 Wochen",
  heroVariantStepIds: ["color"],
  heroVariants: {
    anthracite: qbusAnt,
    black: qbusBl,
    creme: qbusCr,
    white: qbusWh,
  },
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
        { id: "front-open", label: "Offen", desc: "Klassisch, freier Durchgang", price: 0, image: qbusImg("front/none.webp") },
        { id: "front-schiebepui", label: "Schiebetür-System", desc: "Eleganter Übergang in den Garten", price: 3790, image: qbusImg("front/SchuifPuiVoor.001.webp") },
        { id: "front-schiebewand", label: "Glas-Schiebewände klar", desc: "Vollverglasung, klar", price: 3790, image: qbusImg("front/SchuifWandenVoor.001.webp") },
        { id: "front-schiebewand-tint", label: "Glas-Schiebewände getönt", desc: "Vollverglasung, getönt", price: 3790, image: qbusImg("front/SchuifWandenTintVoor.001.webp") },
        { id: "front-glas", label: "Festes Glaselement", desc: "Festrahmen mit VSG-Glas", price: 1810, image: qbusImg("front/ZijwandGlas.013.webp") },
        { id: "front-poly", label: "Festes Polycarbonat", desc: "Festrahmen, leichter & günstiger", price: 1390, image: qbusImg("front/ZijwandPoly.005.webp") },
        { id: "front-sandwich", label: "Sandwich-Paneel", desc: "Vollflächig isoliert (Alu-Schaum-Alu)", price: 2090, image: qbusImg("front/Sandwich.004.webp") },
      ],
    },
    {
      id: "back",
      num: "04",
      title: "Rückseite",
      type: "select-cards",
      options: [
        { id: "back-open", label: "Offen", desc: "Wandanschluss ohne Abschluss", price: 0, image: qbusImg("back/none.webp") },
        { id: "back-schiebepui", label: "Schiebetür-System", desc: "Eleganter Übergang", price: 3790, image: qbusImg("back/SchuifPuiVoor.002.webp") },
        { id: "back-schiebewand", label: "Glas-Schiebewände klar", desc: "Vollverglasung, klar", price: 3790, image: qbusImg("back/SchuifWandenVoor.002.webp") },
        { id: "back-schiebewand-tint", label: "Glas-Schiebewände getönt", desc: "Vollverglasung, getönt", price: 3790, image: qbusImg("back/SchuifWandenTintVoor.002.webp") },
        { id: "back-glas", label: "Festes Glaselement", desc: "Festrahmen mit VSG-Glas", price: 1810, image: qbusImg("back/ZijwandGlas.014.webp") },
        { id: "back-poly", label: "Festes Polycarbonat", desc: "Festrahmen, leichter & günstiger", price: 1390, image: qbusImg("back/ZijwandPoly.006.webp") },
        { id: "back-sandwich", label: "Sandwich-Paneel", desc: "Vollflächig isoliert (Alu-Schaum-Alu)", price: 2090, image: qbusImg("back/Sandwich.005.webp") },
      ],
    },
    {
      id: "left",
      num: "05",
      title: "Linke Seitenwand",
      type: "select-cards",
      options: [
        { id: "left-open", label: "Offen", desc: "Keine Seitenwand", price: 0, image: qbusImg("left/none.webp") },
        { id: "left-schiebepui", label: "Schiebetür-System", desc: "Eleganter Übergang", price: 3790, image: qbusImg("left/GlazenSchuifpui.003.webp") },
        { id: "left-schiebewand", label: "Glas-Schiebewände klar", desc: "Vollverglasung, klar", price: 3790, image: qbusImg("left/GlazenSchuifwand.003.webp") },
        { id: "left-schiebewand-tint", label: "Glas-Schiebewände getönt", desc: "Vollverglasung, getönt", price: 3790, image: qbusImg("left/GlazenSchuifwandGetint.001.webp") },
        { id: "left-glas", label: "Festes Glaselement", desc: "Festrahmen mit VSG-Glas", price: 1810, image: qbusImg("left/ZijwandGlas.007.webp") },
        { id: "left-poly", label: "Festes Polycarbonat", desc: "Festrahmen, leichter & günstiger", price: 1390, image: qbusImg("left/ZijwandPoly.003.webp") },
        { id: "left-sandwich", label: "Sandwich-Paneel", desc: "Vollflächig isoliert (Alu-Schaum-Alu)", price: 2090, image: qbusImg("left/Sandwich.002.webp") },
      ],
    },
    {
      id: "right",
      num: "06",
      title: "Rechte Seitenwand",
      type: "select-cards",
      options: [
        { id: "right-open", label: "Offen", desc: "Keine Seitenwand", price: 0, image: qbusImg("right/none.webp") },
        { id: "right-schiebepui", label: "Schiebetür-System", desc: "Eleganter Übergang", price: 3790, image: qbusImg("right/GlazenSchuifpui.001.webp") },
        { id: "right-schiebewand", label: "Glas-Schiebewände klar", desc: "Vollverglasung, klar", price: 3790, image: qbusImg("right/GlazenSchuifwand.001.webp") },
        { id: "right-schiebewand-tint", label: "Glas-Schiebewände getönt", desc: "Vollverglasung, getönt", price: 3790, image: qbusImg("right/GlazenSchuifwandGetint.002.webp") },
        { id: "right-glas", label: "Festes Glaselement", desc: "Festrahmen mit VSG-Glas", price: 1810, image: qbusImg("right/ZijwandGlas.012.webp") },
        { id: "right-poly", label: "Festes Polycarbonat", desc: "Festrahmen, leichter & günstiger", price: 1390, image: qbusImg("right/ZijwandPoly.004.webp") },
        { id: "right-sandwich", label: "Sandwich-Paneel", desc: "Vollflächig isoliert (Alu-Schaum-Alu)", price: 2090, image: qbusImg("right/Sandwich.003.webp") },
      ],
    },
    {
      id: "lighting",
      num: "07",
      title: "LED-Beleuchtung",
      type: "radio-icon",
      options: [
        { id: "led-none", label: "Keine Beleuchtung", price: 0, image: qbusImg("lights/none.webp") },
        { id: "led-cold", label: "LED Kaltweiß", price: 830, image: qbusImg("lights/LightsCold.webp") },
        { id: "led-warm", label: "LED Warmweiß", price: 830, image: qbusImg("lights/LightsWarm.webp") },
        { id: "led-dim", label: "LED Dimmbar (Funk)", price: 1250, image: qbusImg("lights/LightsDim.webp") },
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
        { id: "screen-none", label: "Kein Zipscreen", price: 0, image: qbusImg("screen/none.webp") },
        { id: "screen-front", label: "Vorderseite", price: 3260, image: qbusImg("screen/front.webp") },
        { id: "screen-back", label: "Rückseite", price: 3260, image: qbusImg("screen/back.webp") },
        { id: "screen-left", label: "Linke Seite", price: 3260, image: qbusImg("screen/left.webp") },
        { id: "screen-right", label: "Rechte Seite", price: 3260, image: qbusImg("screen/right.webp") },
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
  hero: heroEingang,
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
  hero: heroCarport,
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
// VERANDA (Premium-Glasüberdachung mit Live-Visualisierung)
// Bilder & Optionen: Inspiration & Renderings nachgebildet aus
// einem freigegebenen Konfigurator-Datensatz.
// ============================================================
const verandaHalfrondAnthracite = "/veranda/heros/halfrond-anthracite.webp";

// Hero-Varianten (4 Rinnen × 4 Farben)
const vH_RechtAnt = "/veranda/heros/recht-anthracite.webp";
const vH_RechtBl = "/veranda/heros/recht-black.webp";
const vH_RechtCr = "/veranda/heros/recht-creme.webp";
const vH_RechtWh = "/veranda/heros/recht-white.webp";
const vH_HalfAnt = "/veranda/heros/halfrond-anthracite.webp";
const vH_HalfBl = "/veranda/heros/halfrond-black.webp";
const vH_HalfCr = "/veranda/heros/halfrond-creme.webp";
const vH_HalfWh = "/veranda/heros/halfrond-white.webp";
const vH_ModAnt = "/veranda/heros/modern-anthracite.webp";
const vH_ModBl = "/veranda/heros/modern-black.webp";
const vH_ModCr = "/veranda/heros/modern-creme.webp";
const vH_ModWh = "/veranda/heros/modern-white.webp";
const vH_SierAnt = "/veranda/heros/sier-anthracite.webp";
const vH_SierBl = "/veranda/heros/sier-black.webp";
const vH_SierCr = "/veranda/heros/sier-creme.webp";
const vH_SierWh = "/veranda/heros/sier-white.webp";

// Rinnen-Thumbnails
const vGutterRecht = "/veranda/gutters/4507d804-8de1-44d0-b668-52e7cd529319.webp";
const vGutterHalf = "/veranda/gutters/8b6ee5b4-4d2f-4f8c-aa18-04eb855f61cd.webp";
const vGutterMod = "/veranda/gutters/1d604e3c-2580-49f2-9880-a932240ebf33.webp";
const vGutterSier = "/veranda/gutters/2aa3e4bb-1de3-4a91-a953-64294dd61e58.webp";

// Dachmaterial-Thumbnails
const vRoofPolyOpaal = "/veranda/roof/b94d478c-9820-40d1-b686-30a4f7d2421e.webp";
const vRoofPolyHelder = "/veranda/roof/470e983c-7caa-4324-a58f-ae3459f1fb95.webp";
const vRoofGlas = "/veranda/roof/8275b565-cbec-498b-98b9-19a2178290c1.webp";
const vRoofOpaalGlas = "/veranda/roof/5219cdf2-3f66-4b02-92ec-e51f95889917.webp";
const vRoofTinted = "/veranda/roof/cffeaca3-1a7b-4d44-b191-b7c6ef16f754.webp";

// Front-Thumbnails (4) – wir laden die nach Bedarf, hier per Glob (Vite)
const verandaImg = (rel: string) => `/veranda/${rel}`;

const verandaConfig: CategoryConfigurator = {
  slug: "terrassenueberdachungen",
  label: "Terrassenüberdachungen",
  hero: verandaHalfrondAnthracite,
  shortDesc: "Premium-Terrassenüberdachung – Rinne, Farbe, Dach, Wände, LED & Sonnenschutz live konfigurieren.",
  // Preislogik Mai 2026 (Nico): Produkt brutto inkl. MwSt. · zzgl. Montage & Lieferung.
  // Floor 3.790 € (5×3 m) · 290 €/m² ab >15 m² · gerundete Marketing-Preise
  basePrice: 3790,
  deliveryTime: "2 Wochen",
  heroVariantStepIds: ["gutter", "color"],
  heroVariants: {
    "recht|anthracite": vH_RechtAnt,
    "recht|black": vH_RechtBl,
    "recht|creme": vH_RechtCr,
    "recht|white": vH_RechtWh,
    "halfrond|anthracite": vH_HalfAnt,
    "halfrond|black": vH_HalfBl,
    "halfrond|creme": vH_HalfCr,
    "halfrond|white": vH_HalfWh,
    "modern|anthracite": vH_ModAnt,
    "modern|black": vH_ModBl,
    "modern|creme": vH_ModCr,
    "modern|white": vH_ModWh,
    "sier|anthracite": vH_SierAnt,
    "sier|black": vH_SierBl,
    "sier|creme": vH_SierCr,
    "sier|white": vH_SierWh,
  },
  steps: [
    {
      id: "gutter",
      num: "01",
      title: "Regenrinnen-Profil",
      type: "select-cards",
      options: [
        { id: "recht", code: "recht", label: "Gerade Rinne", desc: "Klares Box-Profil, kubische Optik", price: 310, image: vGutterRecht },
        { id: "halfrond", code: "halfrond", label: "Halbrunde Rinne", desc: "Klassiker, weiche Linienführung", price: 0, image: vGutterHalf },
        { id: "modern", code: "modern", label: "Moderne Rinne", desc: "Schlankes, modernes Profil", price: 0, image: vGutterMod },
        { id: "sier", code: "sier", label: "Zier-Rinne", desc: "Dekoratives Sims-Profil", price: 0, image: vGutterSier },
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
        { id: "poly-opaal", label: "Polycarbonat Opal", desc: "Diffuses Licht, Hitzeschutz", price: 0, image: vRoofPolyOpaal },
        { id: "poly-helder", label: "Polycarbonat Klar", desc: "Maximaler Lichteinfall", price: 0, image: vRoofPolyHelder },
        // VSG-Aufpreise leicht angehoben — primärer Marge-Hebel (~45 % Marge laut Strategie)
        { id: "glas-helder", label: "Klarglas (VSG 44.2)", desc: "Premium, kristallklar", price: 3360, image: vRoofGlas },
        { id: "glas-opaal", label: "Opalglas (VSG 44.2)", desc: "Sichtschutz & Streulicht", price: 3790, image: vRoofOpaalGlas },
        { id: "glas-tint", label: "Getöntes Glas (VSG)", desc: "Sonnenschutz integriert", price: 4060, image: vRoofTinted },
      ],
    },
    {
      id: "front",
      num: "05",
      title: "Vorderseite",
      type: "select-cards",
      options: [
        { id: "open", label: "Offen", desc: "Klassische Veranda, freier Durchgang", price: 0, image: verandaImg("front/105db456-543f-4503-8ef5-40f2d396e269.webp") },
        { id: "schiebewand-klar", label: "Glas-Schiebewände klar", desc: "Vollverglasung, klar", price: 4050, image: verandaImg("front/d222dac9-529a-4c1d-87ee-ffbd69d0a8f6.webp") },
        { id: "schiebewand-tint", label: "Glas-Schiebewände getönt", desc: "Vollverglasung, getönt", price: 4610, image: verandaImg("front/9827a863-e33a-4eab-8cd6-097aa6c61333.webp") },
        { id: "schiebetuer", label: "Schiebetür", desc: "Eleganter Übergang in den Garten", price: 2650, image: verandaImg("front/c84b71ea-6699-4fd9-8562-08dfc92614cf.webp") },
      ],
    },
    {
      id: "left-wall",
      num: "06",
      title: "Linke Seitenwand",
      type: "select-cards",
      options: [
        { id: "lw-open", label: "Offen", desc: "Keine Seitenwand", price: 0, image: verandaImg("walls-left/33ecc566-3cfd-4651-939d-5132ae70b2be.webp") },
        { id: "lw-glas-tuer", label: "Glas-Seitenwand mit Tür", desc: "Festes Glas + Drehtür", price: 2390, image: verandaImg("walls-left/53116f7e-ade4-4935-937c-946bdd821fce.webp") },
        { id: "lw-glas", label: "Glas-Seitenwand komplett", desc: "Vollglas-Modul", price: 1810, image: verandaImg("walls-left/dfc4d02d-e244-4a4b-b144-e2def1758bf5.webp") },
        { id: "lw-poly", label: "Polycarbonat Seitenwand", desc: "Komplett geschlossen", price: 990, image: verandaImg("walls-left/1daeb7b5-a22d-4edb-a33e-a570d5dbd028.webp") },
        { id: "lw-alu-glas-keil", label: "Alu-Wand mit Glas-Keil", desc: "Sandwich-Paneel + Glas oben", price: 1690, image: verandaImg("walls-left/ada93be7-41e4-4a6f-850a-8fdd960a2f3b.webp") },
        { id: "lw-alu-poly-keil", label: "Alu-Wand mit Polycarbonat-Keil", desc: "Sandwich-Paneel + PC oben", price: 1390, image: verandaImg("walls-left/71f62d80-faf3-4e65-9987-99a4742d1c17.webp") },
        { id: "lw-schiebepui-glas-keil", label: "Schiebetür + Glas-Keil", desc: "Mit Glas-Keil", price: 3350, image: verandaImg("walls-left/81074a7b-524f-4c99-a837-77450505d438.webp") },
        { id: "lw-schiebepui-poly-keil", label: "Schiebetür + Polycarbonat-Keil", desc: "Mit PC-Keil", price: 3090, image: verandaImg("walls-left/2750e21f-b3a6-4c90-8026-37a97aa96538.webp") },
        { id: "lw-schiebewand-glas-keil", label: "Glas-Schiebewände + Glas-Keil", desc: "Vollverglasung + Keil", price: 3630, image: verandaImg("walls-left/566a94ea-446b-416f-b652-f02b00466053.webp") },
        { id: "lw-schiebewand-poly-keil", label: "Glas-Schiebewände + Polycarbonat-Keil", desc: "Vollverglasung + PC-Keil", price: 3350, image: verandaImg("walls-left/c368ed92-63b3-4ead-844c-d7facdc825a6.webp") },
        { id: "lw-keil-glas", label: "Nur Keil aus Glas", desc: "Oberer Glas-Keil, Wand offen", price: 830, image: verandaImg("walls-left/c19e6442-6443-4ff8-a521-a5e19ea997c2.webp") },
        { id: "lw-keil-poly", label: "Nur Keil aus Polycarbonat", desc: "Oberer PC-Keil, Wand offen", price: 550, image: verandaImg("walls-left/5b46e8e2-5c2d-4f85-baf3-acade0cb10fe.webp") },
        { id: "lw-keil-alu", label: "Nur Keil aus Aluminium", desc: "Geschlossener Alu-Keil", price: 410, image: verandaImg("walls-left/d43cb4fc-33a4-466f-8092-34861c78bec5.webp") },
        { id: "lw-sandwich", label: "Sandwich-Paneel", desc: "Vollflächig isoliert", price: 1250, image: verandaImg("walls-left/b3f39d47-edc3-4da4-9d86-816b73be24d9.webp") },
      ],
    },
    {
      id: "right-wall",
      num: "07",
      title: "Rechte Seitenwand",
      type: "select-cards",
      options: [
        { id: "rw-open", label: "Offen", desc: "Keine Seitenwand", price: 0, image: verandaImg("walls-right/6af2f6da-33d7-4cbf-81cf-d16b6ed568c4.webp") },
        { id: "rw-glas-tuer", label: "Glas-Seitenwand mit Tür", desc: "Festes Glas + Drehtür", price: 2390, image: verandaImg("walls-right/779a8571-b648-401a-8a33-79292271180e.webp") },
        { id: "rw-glas", label: "Glas-Seitenwand komplett", desc: "Vollglas-Modul", price: 1810, image: verandaImg("walls-right/63c0da72-9bce-4c6e-a761-cd2062eb9642.webp") },
        { id: "rw-poly", label: "Polycarbonat Seitenwand", desc: "Komplett geschlossen", price: 990, image: verandaImg("walls-right/418ca24f-239a-4e96-8e7e-a4d8cfad8a86.webp") },
        { id: "rw-alu-glas-keil", label: "Alu-Wand mit Glas-Keil", desc: "Sandwich-Paneel + Glas oben", price: 1690, image: verandaImg("walls-right/741e6fde-01f5-4744-881a-d36830c7a669.webp") },
        { id: "rw-alu-poly-keil", label: "Alu-Wand mit Polycarbonat-Keil", desc: "Sandwich-Paneel + PC oben", price: 1390, image: verandaImg("walls-right/ec383245-a7c8-40ee-b1c5-93b6a0b04100.webp") },
        { id: "rw-schiebepui-glas-keil", label: "Schiebetür + Glas-Keil", desc: "Mit Glas-Keil", price: 3350, image: verandaImg("walls-right/df769a19-79d3-4300-9341-daee1eeec78e.webp") },
        { id: "rw-schiebepui-poly-keil", label: "Schiebetür + Polycarbonat-Keil", desc: "Mit PC-Keil", price: 3090, image: verandaImg("walls-right/81b8354b-58fa-4df5-b7c0-18ccd0f89182.webp") },
        { id: "rw-schiebewand-glas-keil", label: "Glas-Schiebewände + Glas-Keil", desc: "Vollverglasung + Keil", price: 3630, image: verandaImg("walls-right/348f05ee-b513-4e35-9df1-86f1fd3398fd.webp") },
        { id: "rw-schiebewand-poly-keil", label: "Glas-Schiebewände + Polycarbonat-Keil", desc: "Vollverglasung + PC-Keil", price: 3350, image: verandaImg("walls-right/c8bc7665-ada6-4ca9-8bfb-c363cc2de2b8.webp") },
        { id: "rw-keil-glas", label: "Nur Keil aus Glas", desc: "Oberer Glas-Keil, Wand offen", price: 830, image: verandaImg("walls-right/00f30151-2183-4350-b508-52bc99c56e75.webp") },
        { id: "rw-keil-poly", label: "Nur Keil aus Polycarbonat", desc: "Oberer PC-Keil, Wand offen", price: 550, image: verandaImg("walls-right/82e56e1a-ee7f-45ec-b08e-2d72f9b6427b.webp") },
        { id: "rw-keil-alu", label: "Nur Keil aus Aluminium", desc: "Geschlossener Alu-Keil", price: 410, image: verandaImg("walls-right/c922df5c-bb2a-463f-90bc-05fa54d0630f.webp") },
        { id: "rw-sandwich", label: "Sandwich-Paneel", desc: "Vollflächig isoliert", price: 1250, image: verandaImg("walls-right/e783c4de-2cec-41ab-a443-9bebd673d991.webp") },
      ],
    },
    {
      id: "lighting",
      num: "08",
      title: "LED-Beleuchtung",
      type: "radio-icon",
      options: [
        { id: "light-none", label: "Keine Beleuchtung", price: 0, image: verandaImg("lighting/a47e748d-69e2-4fe7-97b2-78443e25ff3e.webp") },
        { id: "light-cold", label: "LED Kaltweiß", price: 830, image: verandaImg("lighting/0ceb7929-e143-49e1-a23f-394c9eec3c5d.webp") },
        { id: "light-warm", label: "LED Warmweiß", price: 830, image: verandaImg("lighting/d41af972-2fe8-428d-8996-976f3db0097e.webp") },
        { id: "light-dim", label: "LED dimmbar (Funk)", price: 1250, image: verandaImg("lighting/160de327-7e39-4ea5-988c-5f7c38963bd5.webp") },
      ],
    },
    {
      id: "sunshade",
      num: "09",
      title: "Sonnenschutz",
      type: "radio-icon",
      options: [
        { id: "sun-none", label: "Kein Sonnenschutz", price: 0, image: verandaImg("sunshade/f01e14ee-0433-4360-a202-7b460eb52aba.webp") },
        { id: "sun-top", label: "Über-Dach Sonnenschutz", price: 2650, image: verandaImg("sunshade/bd57abb5-3ba7-43e1-bb19-6a28f676e22e.webp") },
        { id: "sun-under", label: "Unter-Dach Sonnenschutz", price: 2090, image: verandaImg("sunshade/b305fabd-c8e7-4592-b1e6-1a8d353efd54.webp") },
        { id: "sun-plisse", label: "Plissee (manuell)", price: 1390, image: verandaImg("sunshade/1c3de430-5dfa-4c93-9ae5-cfc124999dba.webp") },
      ],
    },
    {
      id: "screen",
      num: "10",
      title: "Zipscreen-Position",
      type: "radio-icon",
      options: [
        { id: "screen-none", label: "Keiner", price: 0, image: verandaImg("screen/19648183-afd4-4f8b-90bd-5e766e59dd1f.webp") },
        { id: "screen-front", label: "Vorderseite", price: 1810, image: verandaImg("screen/e0b6b99b-50e2-41ad-bac0-22e9162234f2.webp") },
        { id: "screen-left", label: "Links", price: 1690, image: verandaImg("screen/7aeb50a7-b542-4cc0-9ef7-6572a89f5f79.webp") },
        { id: "screen-right", label: "Rechts", price: 1690, image: verandaImg("screen/442e42e0-dc83-408e-b830-39ef7130a9cc.webp") },
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
