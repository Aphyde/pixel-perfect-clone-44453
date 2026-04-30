import { premiumColors, standardColors } from "./products";
import konfBg from "@/assets/konfigurator-bg.jpg";
import heroMarkise from "@/assets/hero-terrasse.jpg";
import heroSchirm from "@/assets/architecture-detail.jpg";
import heroQbus from "@/assets/catalog/cube-1.jpg";
import heroEingang from "@/assets/detail-terrasse.jpg";
import heroCarport from "@/assets/hero-carport.jpg";
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
  price: 690,
  defaultOn: true,
};
// Wartungspaket — wird im Konfigurator als zusammenhängender Block mit Tarif-Auswahl gerendert.
// Die `desc` der Tarife wird dort als kurzer Subtext unter der Periode angezeigt.
const wartungExtras: ExtraOption[] = [
  { id: "wartung-monat", label: "Monatlich", desc: "14,90 € / Monat", price: 14.9 },
  { id: "wartung-jahr", label: "Jährlich", desc: "179 € / Jahr", price: 179 },
  { id: "wartung-3jahre", label: "3 Jahre", desc: "499 € einmalig", price: 499 },
];

const wartungExtrasMarkisen: ExtraOption[] = [
  { id: "wartung-monat", label: "Monatlich", desc: "14,90 € / Monat", price: 14.9 },
  { id: "wartung-jahr", label: "Jährlich", desc: "179 € / Jahr", price: 179 },
  { id: "wartung-3jahre", label: "3 Jahre", desc: "499 € einmalig", price: 499 },
];

// ============================================================
// MARKISEN
// ============================================================
const markisenConfig: CategoryConfigurator = {
  slug: "markisen",
  label: "Markisen",
  hero: heroMarkise,
  shortDesc: "Fallarm, Gelenkarm, Senkrecht oder Aufglas – Sonnenschutz nach Maß.",
  basePrice: 1900,
  deliveryTime: "2 Wochen",
  steps: [
    {
      id: "type",
      num: "01",
      title: "Markisenart",
      type: "select-cards",
      options: [
        { id: "fallarm", label: "Fallarmmarkise", desc: "Vertikaler Schutz für Fenster & Loggien", basePrice: 1900, dimensions: { minW: 1, maxW: 4, minD: 0.5, maxD: 1.8 }, deliveryTime: "2 Wochen" },
        { id: "gelenkarm", label: "Gelenkarmmarkise", desc: "Klassiker für Terrassen & Balkone", basePrice: 2400, dimensions: { minW: 2, maxW: 7, minD: 1.5, maxD: 4 }, deliveryTime: "2 Wochen" },
        { id: "senkrecht", label: "Senkrechtmarkise", desc: "Vertikaler Sicht- und Sonnenschutz", basePrice: 1700, dimensions: { minW: 1, maxW: 5, minD: 1, maxD: 3 }, deliveryTime: "2 Wochen" },
        { id: "aufglas", label: "Aufglasmarkise", desc: "Auf Wintergarten / Glasdach", basePrice: 2900, dimensions: { minW: 2, maxW: 6, minD: 1.5, maxD: 4 }, deliveryTime: "2 Wochen" },
      ],
    },
    {
      id: "dimensions",
      num: "02",
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
      num: "03",
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
      id: "frame",
      num: "04",
      title: "Gestellfarbe",
      type: "colors",
      colors: standardColors,
    },
    {
      id: "drive",
      num: "05",
      title: "Antrieb",
      type: "radio-icon",
      options: [
        { id: "kurbel", label: "Handkurbel", price: 0 },
        { id: "motor", label: "Funkmotor", price: 480 },
        { id: "motor-sensor", label: "Motor mit Wind/Sonnensensor", price: 890 },
      ],
    },
    {
      id: "extras",
      num: "06",
      title: "Erweiterungen",
      type: "extras-toggle",
      extras: [
        { id: "led-arm", label: "LED in Armen", desc: "Stimmungsvolle Abendnutzung", price: 590 },
        { id: "volant", label: "Volant verstellbar", desc: "Zusätzlicher Blendschutz", price: 290 },
        { id: "heizstrahler", label: "Heizstrahler-Vorbereitung", desc: "Kabelweg vorinstalliert", price: 240 },
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
  basePrice: 1490,
  deliveryTime: "2 Wochen",
  steps: [
    {
      id: "type",
      num: "01",
      title: "Schirmtyp",
      type: "select-cards",
      options: [
        { id: "ampel", label: "Ampelschirm (schwenkbar)", desc: "Freischwebend, 360° drehbar", basePrice: 1490, dimensions: { minW: 3, maxW: 5, minD: 3, maxD: 5 }, deliveryTime: "2 Wochen" },
        { id: "doppel", label: "Doppelschirm", desc: "Zwei Schirme an einem Mast", basePrice: 2890, dimensions: { minW: 4, maxW: 7, minD: 4, maxD: 7 }, deliveryTime: "2 Wochen" },
        { id: "mittelmast", label: "Mittelmast-Schirm", desc: "Klassisch, robust, großflächig", basePrice: 1190, dimensions: { minW: 3, maxW: 5, minD: 3, maxD: 5 }, deliveryTime: "2 Wochen" },
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
        { id: "led-schirm", label: "LED-Beleuchtung", desc: "Integriert in Streben", price: 390 },
        { id: "heizung", label: "Heizstrahler", desc: "An Mast montiert, Funk", price: 690 },
        { id: "bodenhuelse", label: "Bodenhülse einbetonieren", desc: "Permanente Befestigung", price: 290 },
        { id: "schutzhuelle", label: "Schutzhülle Premium", desc: "Wetterfest, atmungsaktiv", price: 149 },
      ],
    },
  ],
};

// ============================================================
// Q-BUS (Kubus)
// ============================================================
const qbusConfig: CategoryConfigurator = {
  slug: "q-bus",
  label: "Q-Bus (Kubus)",
  hero: heroQbus,
  shortDesc: "Kubische Premium-Überdachung mit serienmäßiger LED.",
  basePrice: 11900,
  deliveryTime: "2 Wochen",
  steps: [
    {
      id: "dimensions",
      num: "01",
      title: "Maße",
      type: "dimensions",
      dimensions: {
        width: { min: 3, max: 7, default: 5, label: "Breite" },
        depth: { min: 3, max: 4.5, default: 4, label: "Tiefe" },
      },
    },
    {
      id: "glass",
      num: "02",
      title: "Glasart",
      type: "select-cards",
      options: [
        { id: "vsg-clear", label: "VSG 44.2 klar", desc: "Maximaler Lichteinfall", price: 0 },
        { id: "vsg-tint", label: "VSG 44.2 getönt", desc: "Reduzierter Lichteinfall", price: 600 },
        { id: "isolier", label: "Isolierglas 24 mm", desc: "Wärmedämmung Premium", price: 1900 },
      ],
    },
    {
      id: "color",
      num: "03",
      title: "Farbauswahl (RAL)",
      type: "colors",
      colors: premiumColors,
    },
    {
      id: "led",
      num: "04",
      title: "LED-Beleuchtung",
      type: "radio-icon",
      options: [
        { id: "led-basic", label: "Basic (8 Spots)", price: 0 },
        { id: "led-comfort", label: "Comfort (16 Spots, dimmbar)", price: 490 },
        { id: "led-rgb", label: "Premium RGB (App-Steuerung)", price: 990 },
      ],
    },
    {
      id: "extras",
      num: "05",
      title: "Erweiterungen",
      type: "extras-toggle",
      extras: [
        { id: "glasschiebewand", label: "Glasschiebewände", desc: "Flexibler Windschutz", price: 2400 },
        { id: "zipscreen", label: "Zipscreen", desc: "Senkrechter Sonnenschutz", price: 1290 },
        { id: "schiebetuer", label: "Schiebetür", desc: "Eleganter Übergang", price: 1850 },
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
  basePrice: 1290,
  deliveryTime: "2 Wochen",
  steps: [
    {
      id: "form",
      num: "01",
      title: "Form",
      type: "select-cards",
      options: [
        { id: "gerade", label: "Gerade", desc: "Klassisch, schlicht", basePrice: 1290, dimensions: { minW: 1.2, maxW: 3, minD: 0.8, maxD: 1.5 }, deliveryTime: "2 Wochen" },
        { id: "gebogen", label: "Gebogen", desc: "Elegant geschwungen", basePrice: 1690, dimensions: { minW: 1.2, maxW: 3, minD: 0.8, maxD: 1.5 }, deliveryTime: "2 Wochen" },
        { id: "pultdach", label: "Pultdach", desc: "Mit leichtem Gefälle", basePrice: 1490, dimensions: { minW: 1.2, maxW: 3, minD: 0.8, maxD: 1.5 }, deliveryTime: "2 Wochen" },
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
        { id: "polycarbonat", label: "Polycarbonat 16 mm", price: 0 },
        { id: "vsg-clear", label: "VSG 44.2 klar", price: 390 },
        { id: "vsg-tint", label: "VSG 44.2 getönt", price: 590 },
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
        { id: "seitenteil", label: "Seitenteil (Glas)", desc: "Pro Seite", price: 490 },
        { id: "led-eingang", label: "LED-Spots im Profil", desc: "2 Spots integriert", price: 290 },
        { id: "regenrinne", label: "Verdeckte Regenrinne", desc: "Mit Fallrohr", price: 220 },
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
  basePrice: 6900,
  deliveryTime: "2 Wochen",
  steps: [
    {
      id: "type",
      num: "01",
      title: "Typ",
      type: "select-cards",
      options: [
        { id: "einzel", label: "Einzel-Carport", desc: "1 Stellplatz", basePrice: 6900, dimensions: { minW: 2.8, maxW: 3.8, minD: 5, maxD: 7 }, deliveryTime: "2 Wochen" },
        { id: "doppel", label: "Doppel-Carport", desc: "2 Stellplätze nebeneinander", basePrice: 11900, dimensions: { minW: 5.4, maxW: 6.5, minD: 5, maxD: 7 }, deliveryTime: "2 Wochen" },
        { id: "reihe", label: "Reihen-Carport", desc: "3+ Stellplätze, modular", basePrice: 17900, dimensions: { minW: 8, maxW: 12, minD: 5, maxD: 7 }, deliveryTime: "2 Wochen" },
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
        { id: "pult", label: "Pultdach", desc: "Mit leichtem Gefälle", price: 480 },
        { id: "bogen", label: "Bogendach", desc: "Geschwungene Optik", price: 1290 },
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
        { id: "rueckwand", label: "Rückwand geschlossen", desc: "Aluminium-Paneele", price: 890 },
        { id: "seitenwand", label: "Seitenwand (pro Seite)", desc: "Aluminium-Paneele", price: 690 },
        { id: "tor", label: "Sektionaltor", desc: "Mit Funkfernbedienung", price: 2490 },
        { id: "solar", label: "Solar-Vorbereitung", desc: "Statik + Kabelweg", price: 590 },
        { id: "led-carport", label: "LED-Beleuchtung", desc: "Bewegungsmelder integriert", price: 390 },
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
import verandaHalfrondAnthracite from "@/assets/veranda/heros/halfrond-anthracite.webp";

// Hero-Varianten (4 Rinnen × 4 Farben)
import vH_RechtAnt from "@/assets/veranda/heros/recht-anthracite.webp";
import vH_RechtBl from "@/assets/veranda/heros/recht-black.webp";
import vH_RechtCr from "@/assets/veranda/heros/recht-creme.webp";
import vH_RechtWh from "@/assets/veranda/heros/recht-white.webp";
import vH_HalfAnt from "@/assets/veranda/heros/halfrond-anthracite.webp";
import vH_HalfBl from "@/assets/veranda/heros/halfrond-black.webp";
import vH_HalfCr from "@/assets/veranda/heros/halfrond-creme.webp";
import vH_HalfWh from "@/assets/veranda/heros/halfrond-white.webp";
import vH_ModAnt from "@/assets/veranda/heros/modern-anthracite.webp";
import vH_ModBl from "@/assets/veranda/heros/modern-black.webp";
import vH_ModCr from "@/assets/veranda/heros/modern-creme.webp";
import vH_ModWh from "@/assets/veranda/heros/modern-white.webp";
import vH_SierAnt from "@/assets/veranda/heros/sier-anthracite.webp";
import vH_SierBl from "@/assets/veranda/heros/sier-black.webp";
import vH_SierCr from "@/assets/veranda/heros/sier-creme.webp";
import vH_SierWh from "@/assets/veranda/heros/sier-white.webp";

// Rinnen-Thumbnails
import vGutterRecht from "@/assets/veranda/gutters/4507d804-8de1-44d0-b668-52e7cd529319.webp";
import vGutterHalf from "@/assets/veranda/gutters/8b6ee5b4-4d2f-4f8c-aa18-04eb855f61cd.webp";
import vGutterMod from "@/assets/veranda/gutters/1d604e3c-2580-49f2-9880-a932240ebf33.webp";
import vGutterSier from "@/assets/veranda/gutters/2aa3e4bb-1de3-4a91-a953-64294dd61e58.webp";

// Dachmaterial-Thumbnails
import vRoofPolyOpaal from "@/assets/veranda/roof/b94d478c-9820-40d1-b686-30a4f7d2421e.webp";
import vRoofPolyHelder from "@/assets/veranda/roof/470e983c-7caa-4324-a58f-ae3459f1fb95.webp";
import vRoofGlas from "@/assets/veranda/roof/8275b565-cbec-498b-98b9-19a2178290c1.webp";
import vRoofOpaalGlas from "@/assets/veranda/roof/5219cdf2-3f66-4b02-92ec-e51f95889917.webp";
import vRoofTinted from "@/assets/veranda/roof/cffeaca3-1a7b-4d44-b191-b7c6ef16f754.webp";

// Front-Thumbnails (4) – wir laden die nach Bedarf, hier per Glob (Vite)
const verandaImg = (rel: string) => new URL(`../assets/veranda/${rel}`, import.meta.url).href;

const verandaConfig: CategoryConfigurator = {
  slug: "terrassenueberdachungen",
  label: "Terrassenüberdachungen",
  hero: verandaHalfrondAnthracite,
  shortDesc: "Premium-Terrassenüberdachung – Rinne, Farbe, Dach, Wände, LED & Sonnenschutz live konfigurieren.",
  basePrice: 10790,
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
        { id: "recht", code: "recht", label: "Gerade Rinne", desc: "Klares Box-Profil, kubische Optik", price: 220, image: vGutterRecht },
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
        { ral: "RAL 9001", hex: "#f1ecdb", label: "Crème", code: "creme" },
        { ral: "RAL 9010", hex: "#ffffff", label: "Weiß", code: "white" },
      ],
    },
    {
      id: "dimensions",
      num: "03",
      title: "Maße (Breite × Tiefe)",
      type: "dimensions",
      dimensions: {
        width: { min: 3, max: 9, default: 5.5, label: "Breite" },
        depth: { min: 2.5, max: 4.5, default: 3, label: "Tiefe" },
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
        { id: "glas-helder", label: "Klarglas (VSG 44.2)", desc: "Premium, kristallklar", price: 1900, image: vRoofGlas },
        { id: "glas-opaal", label: "Opalglas (VSG 44.2)", desc: "Sichtschutz & Streulicht", price: 2200, image: vRoofOpaalGlas },
        { id: "glas-tint", label: "Getöntes Glas (VSG)", desc: "Sonnenschutz integriert", price: 2400, image: vRoofTinted },
      ],
    },
    {
      id: "front",
      num: "05",
      title: "Vorderseite",
      type: "select-cards",
      options: [
        { id: "open", label: "Offen", desc: "Klassische Veranda, freier Durchgang", price: 0, image: verandaImg("front/105db456-543f-4503-8ef5-40f2d396e269.webp") },
        { id: "schiebewand-klar", label: "Glas-Schiebewände klar", desc: "Vollverglasung, klar", price: 2890, image: verandaImg("front/d222dac9-529a-4c1d-87ee-ffbd69d0a8f6.webp") },
        { id: "schiebewand-tint", label: "Glas-Schiebewände getönt", desc: "Vollverglasung, getönt", price: 3290, image: verandaImg("front/9827a863-e33a-4eab-8cd6-097aa6c61333.webp") },
        { id: "schiebetuer", label: "Schiebetür", desc: "Eleganter Übergang in den Garten", price: 1890, image: verandaImg("front/c84b71ea-6699-4fd9-8562-08dfc92614cf.webp") },
      ],
    },
    {
      id: "left-wall",
      num: "06",
      title: "Linke Seitenwand",
      type: "select-cards",
      options: [
        { id: "lw-open", label: "Offen", desc: "Keine Seitenwand", price: 0, image: verandaImg("walls-left/33ecc566-3cfd-4651-939d-5132ae70b2be.webp") },
        { id: "lw-glas-tuer", label: "Glas-Seitenwand mit Tür", desc: "Festes Glas + Drehtür", price: 1690, image: verandaImg("walls-left/53116f7e-ade4-4935-937c-946bdd821fce.webp") },
        { id: "lw-glas", label: "Glas-Seitenwand komplett", desc: "Vollglas-Modul", price: 1290, image: verandaImg("walls-left/dfc4d02d-e244-4a4b-b144-e2def1758bf5.webp") },
        { id: "lw-poly", label: "Polycarbonat Seitenwand", desc: "Komplett geschlossen", price: 690, image: verandaImg("walls-left/1daeb7b5-a22d-4edb-a33e-a570d5dbd028.webp") },
        { id: "lw-alu-glas-keil", label: "Alu-Wand mit Glas-Keil", desc: "Sandwich-Paneel + Glas oben", price: 1190, image: verandaImg("walls-left/ada93be7-41e4-4a6f-850a-8fdd960a2f3b.webp") },
        { id: "lw-alu-poly-keil", label: "Alu-Wand mit Polycarbonat-Keil", desc: "Sandwich-Paneel + PC oben", price: 990, image: verandaImg("walls-left/71f62d80-faf3-4e65-9987-99a4742d1c17.webp") },
        { id: "lw-schiebepui-glas-keil", label: "Schiebetür + Glas-Keil", desc: "Mit Glas-Keil", price: 2390, image: verandaImg("walls-left/81074a7b-524f-4c99-a837-77450505d438.webp") },
        { id: "lw-schiebepui-poly-keil", label: "Schiebetür + Polycarbonat-Keil", desc: "Mit PC-Keil", price: 2190, image: verandaImg("walls-left/2750e21f-b3a6-4c90-8026-37a97aa96538.webp") },
        { id: "lw-schiebewand-glas-keil", label: "Glas-Schiebewände + Glas-Keil", desc: "Vollverglasung + Keil", price: 2590, image: verandaImg("walls-left/566a94ea-446b-416f-b652-f02b00466053.webp") },
        { id: "lw-schiebewand-poly-keil", label: "Glas-Schiebewände + Polycarbonat-Keil", desc: "Vollverglasung + PC-Keil", price: 2390, image: verandaImg("walls-left/c368ed92-63b3-4ead-844c-d7facdc825a6.webp") },
        { id: "lw-keil-glas", label: "Nur Keil aus Glas", desc: "Oberer Glas-Keil, Wand offen", price: 590, image: verandaImg("walls-left/c19e6442-6443-4ff8-a521-a5e19ea997c2.webp") },
        { id: "lw-keil-poly", label: "Nur Keil aus Polycarbonat", desc: "Oberer PC-Keil, Wand offen", price: 390, image: verandaImg("walls-left/5b46e8e2-5c2d-4f85-baf3-acade0cb10fe.webp") },
        { id: "lw-keil-alu", label: "Nur Keil aus Aluminium", desc: "Geschlossener Alu-Keil", price: 290, image: verandaImg("walls-left/d43cb4fc-33a4-466f-8092-34861c78bec5.webp") },
        { id: "lw-sandwich", label: "Sandwich-Paneel", desc: "Vollflächig isoliert", price: 890, image: verandaImg("walls-left/b3f39d47-edc3-4da4-9d86-816b73be24d9.webp") },
      ],
    },
    {
      id: "right-wall",
      num: "07",
      title: "Rechte Seitenwand",
      type: "select-cards",
      options: [
        { id: "rw-open", label: "Offen", desc: "Keine Seitenwand", price: 0, image: verandaImg("walls-right/6af2f6da-33d7-4cbf-81cf-d16b6ed568c4.webp") },
        { id: "rw-glas-tuer", label: "Glas-Seitenwand mit Tür", desc: "Festes Glas + Drehtür", price: 1690, image: verandaImg("walls-right/779a8571-b648-401a-8a33-79292271180e.webp") },
        { id: "rw-glas", label: "Glas-Seitenwand komplett", desc: "Vollglas-Modul", price: 1290, image: verandaImg("walls-right/63c0da72-9bce-4c6e-a761-cd2062eb9642.webp") },
        { id: "rw-poly", label: "Polycarbonat Seitenwand", desc: "Komplett geschlossen", price: 690, image: verandaImg("walls-right/418ca24f-239a-4e96-8e7e-a4d8cfad8a86.webp") },
        { id: "rw-alu-glas-keil", label: "Alu-Wand mit Glas-Keil", desc: "Sandwich-Paneel + Glas oben", price: 1190, image: verandaImg("walls-right/741e6fde-01f5-4744-881a-d36830c7a669.webp") },
        { id: "rw-alu-poly-keil", label: "Alu-Wand mit Polycarbonat-Keil", desc: "Sandwich-Paneel + PC oben", price: 990, image: verandaImg("walls-right/ec383245-a7c8-40ee-b1c5-93b6a0b04100.webp") },
        { id: "rw-schiebepui-glas-keil", label: "Schiebetür + Glas-Keil", desc: "Mit Glas-Keil", price: 2390, image: verandaImg("walls-right/df769a19-79d3-4300-9341-daee1eeec78e.webp") },
        { id: "rw-schiebepui-poly-keil", label: "Schiebetür + Polycarbonat-Keil", desc: "Mit PC-Keil", price: 2190, image: verandaImg("walls-right/81b8354b-58fa-4df5-b7c0-18ccd0f89182.webp") },
        { id: "rw-schiebewand-glas-keil", label: "Glas-Schiebewände + Glas-Keil", desc: "Vollverglasung + Keil", price: 2590, image: verandaImg("walls-right/348f05ee-b513-4e35-9df1-86f1fd3398fd.webp") },
        { id: "rw-schiebewand-poly-keil", label: "Glas-Schiebewände + Polycarbonat-Keil", desc: "Vollverglasung + PC-Keil", price: 2390, image: verandaImg("walls-right/c8bc7665-ada6-4ca9-8bfb-c363cc2de2b8.webp") },
        { id: "rw-keil-glas", label: "Nur Keil aus Glas", desc: "Oberer Glas-Keil, Wand offen", price: 590, image: verandaImg("walls-right/00f30151-2183-4350-b508-52bc99c56e75.webp") },
        { id: "rw-keil-poly", label: "Nur Keil aus Polycarbonat", desc: "Oberer PC-Keil, Wand offen", price: 390, image: verandaImg("walls-right/82e56e1a-ee7f-45ec-b08e-2d72f9b6427b.webp") },
        { id: "rw-keil-alu", label: "Nur Keil aus Aluminium", desc: "Geschlossener Alu-Keil", price: 290, image: verandaImg("walls-right/c922df5c-bb2a-463f-90bc-05fa54d0630f.webp") },
        { id: "rw-sandwich", label: "Sandwich-Paneel", desc: "Vollflächig isoliert", price: 890, image: verandaImg("walls-right/e783c4de-2cec-41ab-a443-9bebd673d991.webp") },
      ],
    },
    {
      id: "lighting",
      num: "08",
      title: "LED-Beleuchtung",
      type: "radio-icon",
      options: [
        { id: "light-none", label: "Keine Beleuchtung", price: 0, image: verandaImg("lighting/a47e748d-69e2-4fe7-97b2-78443e25ff3e.webp") },
        { id: "light-cold", label: "LED Kaltweiß", price: 590, image: verandaImg("lighting/0ceb7929-e143-49e1-a23f-394c9eec3c5d.webp") },
        { id: "light-warm", label: "LED Warmweiß", price: 590, image: verandaImg("lighting/d41af972-2fe8-428d-8996-976f3db0097e.webp") },
        { id: "light-dim", label: "LED dimmbar (Funk)", price: 890, image: verandaImg("lighting/160de327-7e39-4ea5-988c-5f7c38963bd5.webp") },
      ],
    },
    {
      id: "sunshade",
      num: "09",
      title: "Sonnenschutz",
      type: "radio-icon",
      options: [
        { id: "sun-none", label: "Kein Sonnenschutz", price: 0, image: verandaImg("sunshade/f01e14ee-0433-4360-a202-7b460eb52aba.webp") },
        { id: "sun-top", label: "Über-Dach Sonnenschutz", price: 1890, image: verandaImg("sunshade/bd57abb5-3ba7-43e1-bb19-6a28f676e22e.webp") },
        { id: "sun-under", label: "Unter-Dach Sonnenschutz", price: 1490, image: verandaImg("sunshade/b305fabd-c8e7-4592-b1e6-1a8d353efd54.webp") },
        { id: "sun-plisse", label: "Plissee (manuell)", price: 990, image: verandaImg("sunshade/1c3de430-5dfa-4c93-9ae5-cfc124999dba.webp") },
      ],
    },
    {
      id: "screen",
      num: "10",
      title: "Zipscreen-Position",
      type: "radio-icon",
      options: [
        { id: "screen-none", label: "Keiner", price: 0, image: verandaImg("screen/19648183-afd4-4f8b-90bd-5e766e59dd1f.webp") },
        { id: "screen-front", label: "Vorderseite", price: 1290, image: verandaImg("screen/e0b6b99b-50e2-41ad-bac0-22e9162234f2.webp") },
        { id: "screen-left", label: "Links", price: 1190, image: verandaImg("screen/7aeb50a7-b542-4cc0-9ef7-6572a89f5f79.webp") },
        { id: "screen-right", label: "Rechts", price: 1190, image: verandaImg("screen/442e42e0-dc83-408e-b830-39ef7130a9cc.webp") },
      ],
    },
    {
      id: "extras",
      num: "11",
      title: "Service & Optionen",
      type: "extras-toggle",
      extras: [
        ...wartungExtras,
      ],
    },
  ],
};

// ============================================================
// EXPORT
// ============================================================
export const configurators: Record<string, CategoryConfigurator> = {
  markisen: markisenConfig,
  terrassenueberdachungen: verandaConfig,
  schirme: schirmeConfig,
  "q-bus": qbusConfig,
  eingangsueberdachungen: eingangConfig,
  carports: carportConfig,
};

export const configuratorList = Object.values(configurators);
