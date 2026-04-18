import { terraceModules, premiumColors, standardColors } from "./products";
import konfBg from "@/assets/konfigurator-bg.jpg";
import heroMarkise from "@/assets/hero-terrasse.jpg";
import heroSchirm from "@/assets/architecture-detail.jpg";
import heroQbus from "@/assets/catalog/cube-1.jpg";
import heroEingang from "@/assets/detail-terrasse.jpg";
import heroCarport from "@/assets/hero-carport.jpg";
import heroTerrasse from "@/assets/hero-terrasse.jpg";

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
  /** Tag/Nacht-Toggle anzeigen? */
  showDayNight?: boolean;
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
const wartungExtra: ExtraOption = {
  id: "wartung",
  label: "Wartungspaket (3 Jahre)",
  desc: "Jährlicher Check & Justierung",
  price: 499,
};

// ============================================================
// TERRASSEN (3 Modelle)
// ============================================================
const terrassenConfig: CategoryConfigurator = {
  slug: "terrassenueberdachungen",
  label: "Terrassenüberdachungen",
  hero: heroTerrasse,
  shortDesc: "PRO-LINE, LUXALINE CUBE oder LAMELDAK CABRIO – konfigurieren Sie Ihr Dach.",
  basePrice: 7900,
  showDayNight: true,
  steps: [
    {
      id: "model",
      num: "01",
      title: "Modell wählen",
      type: "select-cards",
      options: [
        {
          id: "pro-line",
          label: "PRO-LINE",
          desc: "Standard, Polycarbonat oder VSG-Glas",
          basePrice: 7900,
          dimensions: { minW: 3, maxW: 12, minD: 2, maxD: 5 },
        },
        {
          id: "luxaline-cube",
          label: "LUXALINE CUBE",
          desc: "Premium Glasdach, kubisch, LED serienmäßig",
          basePrice: 11900,
          dimensions: { minW: 3, maxW: 7, minD: 3, maxD: 4.5 },
        },
        {
          id: "lameldak-cabrio",
          label: "LAMELDAK CABRIO",
          desc: "Premium Lamellendach, elektrisch (Somfy IO)",
          basePrice: 13900,
          dimensions: { minW: 3, maxW: 7, minD: 3, maxD: 4.5 },
        },
      ],
    },
    {
      id: "dimensions",
      num: "02",
      title: "Maße konfigurieren",
      type: "dimensions",
      dimensionsFromOption: "model",
      dimensions: {
        width: { min: 3, max: 12, default: 6 },
        depth: { min: 2, max: 5, default: 4 },
      },
    },
    {
      id: "montage",
      num: "03",
      title: "Montageart",
      type: "radio-icon",
      options: [
        { id: "wand", label: "Wandmontage", price: 0 },
        { id: "freistehend", label: "Freistehend", price: 1200 },
      ],
    },
    {
      id: "roof",
      num: "04",
      title: "Dachdeckung",
      type: "select-cards",
      options: [
        { id: "polycarbonat", label: "Polycarbonat 16 mm", price: 0 },
        { id: "vsg", label: "VSG 44.2 Sicherheitsglas", price: 1800 },
        { id: "vsg-tint", label: "VSG 44.2 getönt", price: 2400 },
      ],
    },
    {
      id: "color",
      num: "05",
      title: "Farbauswahl (RAL)",
      type: "colors",
      colors: premiumColors,
    },
    {
      id: "extras",
      num: "06",
      title: "Erweiterungen & Module",
      type: "extras-toggle",
      extras: [
        ...terraceModules.map((m) => ({
          id: `mod-${m.id}`,
          label: m.label,
          desc: m.shortDesc,
          price: m.price,
        })),
        ledExtra,
        wartungExtra,
      ],
    },
  ],
};

// ============================================================
// MARKISEN
// ============================================================
const markisenConfig: CategoryConfigurator = {
  slug: "markisen",
  label: "Markisen",
  hero: heroMarkise,
  shortDesc: "Fallarm, Gelenkarm, Senkrecht oder Aufglas – Sonnenschutz nach Maß.",
  basePrice: 1900,
  steps: [
    {
      id: "type",
      num: "01",
      title: "Markisenart",
      type: "select-cards",
      options: [
        { id: "fallarm", label: "Fallarmmarkise", desc: "Vertikaler Schutz für Fenster & Loggien", basePrice: 1900, dimensions: { minW: 1, maxW: 4, minD: 0.5, maxD: 1.8 } },
        { id: "gelenkarm", label: "Gelenkarmmarkise", desc: "Klassiker für Terrassen & Balkone", basePrice: 2400, dimensions: { minW: 2, maxW: 7, minD: 1.5, maxD: 4 } },
        { id: "senkrecht", label: "Senkrechtmarkise", desc: "Vertikaler Sicht- und Sonnenschutz", basePrice: 1700, dimensions: { minW: 1, maxW: 5, minD: 1, maxD: 3 } },
        { id: "aufglas", label: "Aufglasmarkise", desc: "Auf Wintergarten / Glasdach", basePrice: 2900, dimensions: { minW: 2, maxW: 6, minD: 1.5, maxD: 4 } },
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
        wartungExtra,
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
  steps: [
    {
      id: "type",
      num: "01",
      title: "Schirmtyp",
      type: "select-cards",
      options: [
        { id: "ampel", label: "Ampelschirm (schwenkbar)", desc: "Freischwebend, 360° drehbar", basePrice: 1490, dimensions: { minW: 3, maxW: 5, minD: 3, maxD: 5 } },
        { id: "doppel", label: "Doppelschirm", desc: "Zwei Schirme an einem Mast", basePrice: 2890, dimensions: { minW: 4, maxW: 7, minD: 4, maxD: 7 } },
        { id: "mittelmast", label: "Mittelmast-Schirm", desc: "Klassisch, robust, großflächig", basePrice: 1190, dimensions: { minW: 3, maxW: 5, minD: 3, maxD: 5 } },
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
  showDayNight: true,
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
        wartungExtra,
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
  steps: [
    {
      id: "form",
      num: "01",
      title: "Form",
      type: "select-cards",
      options: [
        { id: "gerade", label: "Gerade", desc: "Klassisch, schlicht", basePrice: 1290, dimensions: { minW: 1.2, maxW: 3, minD: 0.8, maxD: 1.5 } },
        { id: "gebogen", label: "Gebogen", desc: "Elegant geschwungen", basePrice: 1690, dimensions: { minW: 1.2, maxW: 3, minD: 0.8, maxD: 1.5 } },
        { id: "pultdach", label: "Pultdach", desc: "Mit leichtem Gefälle", basePrice: 1490, dimensions: { minW: 1.2, maxW: 3, minD: 0.8, maxD: 1.5 } },
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
  showDayNight: true,
  steps: [
    {
      id: "type",
      num: "01",
      title: "Typ",
      type: "select-cards",
      options: [
        { id: "einzel", label: "Einzel-Carport", desc: "1 Stellplatz", basePrice: 6900, dimensions: { minW: 2.8, maxW: 3.8, minD: 5, maxD: 7 } },
        { id: "doppel", label: "Doppel-Carport", desc: "2 Stellplätze nebeneinander", basePrice: 11900, dimensions: { minW: 5.4, maxW: 6.5, minD: 5, maxD: 7 } },
        { id: "reihe", label: "Reihen-Carport", desc: "3+ Stellplätze, modular", basePrice: 17900, dimensions: { minW: 8, maxW: 12, minD: 5, maxD: 7 } },
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
        wartungExtra,
      ],
    },
  ],
};

// ============================================================
// EXPORT
// ============================================================
export const configurators: Record<string, CategoryConfigurator> = {
  markisen: markisenConfig,
  terrassenueberdachungen: terrassenConfig,
  schirme: schirmeConfig,
  "q-bus": qbusConfig,
  eingangsueberdachungen: eingangConfig,
  carports: carportConfig,
};

export const configuratorList = Object.values(configurators);
