import heroTerrasse from "@/assets/hero-terrasse.jpg";
import detailTerrasse from "@/assets/detail-terrasse.jpg";
import productTerrasse from "@/assets/product-terrassenueberdachung.jpg";
import heroCarport from "@/assets/hero-carport.jpg";
import detailCarport from "@/assets/detail-carport.jpg";
import productCarport from "@/assets/product-carport.jpg";
import architectureDetail from "@/assets/architecture-detail.jpg";

// Catalog images (real product photography)
import proline1 from "@/assets/catalog/proline-1.jpg";
import proline2 from "@/assets/catalog/proline-2.jpg";
import proline3 from "@/assets/catalog/proline-3.jpg";
import cube1 from "@/assets/catalog/cube-1.jpg";
import cube2 from "@/assets/catalog/cube-2.jpg";
import cube3 from "@/assets/catalog/cube-3.jpg";
import lamellen1 from "@/assets/catalog/lamellendach-1.jpg";
import lamellen2 from "@/assets/catalog/lamellendach-2.jpg";
import lamellen3 from "@/assets/catalog/lamellendach-3.jpg";
import imgGlasschiebewand from "@/assets/catalog/glasschiebewand.jpg";
import imgSchiebetuer from "@/assets/catalog/schiebetuer.jpg";
import imgFestrahmen from "@/assets/catalog/festrahmen.jpg";
import imgKeilblende from "@/assets/catalog/keilblende.jpg";
import imgSeitenwand from "@/assets/catalog/seitenwand.jpg";
import imgZipscreen from "@/assets/catalog/zipscreen.jpg";
import imgSonnenOberdach from "@/assets/catalog/sonnenschutz-oberdach.jpg";
import imgPlissee from "@/assets/catalog/plissee.jpg";

export interface ProductFeature {
  title: string;
  desc: string;
}
export interface ProductSpec {
  label: string;
  value: string;
}

export interface TerraceModule {
  id: string;
  label: string;
  shortDesc: string;
  longDesc: string;
  image: string;
  /** Konfigurator-Aufpreis (€) */
  price: number;
  specs: ProductSpec[];
}

export interface ProductDetail {
  slug: string;
  label: string;
  shortDesc: string;
  image: string;
  hero: {
    badge: string;
    title: string;
    titleAccent: string;
    subtitle: string;
    heroImage: string;
    detailImage: string;
  };
  intro: {
    label: string;
    title: string;
    text: string;
  };
  features: ProductFeature[];
  specs: ProductSpec[];
  cta: {
    title: string;
    text: string;
  };
  /** Wenn true, wird die "Erweiterungen & Module"-Sektion auf der Detailseite angezeigt. */
  showModules?: boolean;
}

export interface Category {
  slug: string;
  label: string;
  shortDesc: string;
  longDesc: string;
  image: string;
  /** If empty, this category renders as a single product page using `singleProduct`. */
  products: ProductDetail[];
  /** Used when products is empty. */
  singleProduct?: ProductDetail;
}

// ============================================================
// MODULE / ERWEITERUNGEN für Terrassenüberdachungen
// (Werden auf den Terrassen-Detailseiten + im Konfigurator genutzt)
// ============================================================
export const terraceModules: TerraceModule[] = [
  {
    id: "glasschiebewand",
    label: "Glasschiebewände",
    shortDesc: "Flexibler Windschutz aus 10 mm gehärtetem Glas – 2- bis 7-spurig.",
    longDesc:
      "Schließen Sie Ihre Überdachung an kühlen Tagen mit transparenten Schiebewänden aus 10 mm gehärtetem Sicherheitsglas. Die Elemente lassen sich vollständig zur Seite schieben – maximale Öffnung, minimaler Sichtbruch.",
    image: imgGlasschiebewand,
    price: 2400,
    specs: [
      { label: "Glas", value: "10 mm gehärtet (ESG)" },
      { label: "Spuren", value: "2- bis 7-spurig" },
      { label: "Max. Höhe", value: "3.000 mm" },
      { label: "Maßanfertigung", value: "ja" },
    ],
  },
  {
    id: "schiebetuer",
    label: "Schiebetür",
    shortDesc: "Eleganter Übergang vom Wohnraum nach draußen – 2- oder 4-teilig.",
    longDesc:
      "Aluminium-Schiebetüren in zwei- oder vierteiliger Ausführung verbinden Innen- und Außenraum stilvoll. Robuste Konstruktion, leichter Lauf, schmale Profile.",
    image: imgSchiebetuer,
    price: 1850,
    specs: [
      { label: "Zweiteilig", value: "1 – 4 m" },
      { label: "Vierteilig", value: "4 – 7 m" },
      { label: "Material", value: "Aluminium 6063 T6" },
      { label: "Maßanfertigung", value: "ja" },
    ],
  },
  {
    id: "festrahmen",
    label: "Festrahmen",
    shortDesc: "Geschlossene Glasfront mit Isolier- oder VSG-Verglasung.",
    longDesc:
      "Wenn dauerhaft geschlossen werden soll: Festrahmen mit VSG- oder 24 mm Isolierglas. Halten Wind, Regen und Lärm zuverlässig draußen.",
    image: imgFestrahmen,
    price: 1450,
    specs: [
      { label: "Max. Größe", value: "5.000 × 2.750 mm" },
      { label: "Glas", value: "VSG 44.2 oder Isolierglas 24 mm" },
      { label: "Profil", value: "Aluminium pulverbeschichtet" },
      { label: "Maßanfertigung", value: "ja" },
    ],
  },
  {
    id: "keilblende",
    label: "Keilblende",
    shortDesc: "Eleganter Wind- und Sichtschutz im oberen Dachbereich.",
    longDesc:
      "Maßgefertigte Keilblenden schließen den oberen Bereich zwischen Dach und Hauswand sauber ab – Wind, Regen und unerwünschte Einblicke bleiben draußen.",
    image: imgKeilblende,
    price: 690,
    specs: [
      { label: "Material", value: "Aluminium 6063 T6" },
      { label: "Beschichtung", value: "Pulverbeschichtung" },
      { label: "Farben", value: "5 RAL-Standardfarben + Maßanfertigung" },
      { label: "Maßanfertigung", value: "ja" },
    ],
  },
  {
    id: "seitenwand",
    label: "Seitenwand",
    shortDesc: "Geschlossene Aluminium-Seitenwand für sauberen Abschluss.",
    longDesc:
      "Maßgeschneiderte Seitenwände setzen den seitlichen Abschluss Ihrer Überdachung perfekt in Szene und schützen vor Seitenwind.",
    image: imgSeitenwand,
    price: 980,
    specs: [
      { label: "Material", value: "Aluminium 6063 T6" },
      { label: "Beschichtung", value: "Pulverbeschichtung" },
      { label: "Farben", value: "Anthrazit, Schwarz, Weiß, Crème + Maßanfertigung" },
      { label: "Maßanfertigung", value: "ja" },
    ],
  },
  {
    id: "zipscreen",
    label: "Zipscreen",
    shortDesc: "Senkrechter Sicht- und Sonnenschutz mit Reißverschluss-Führung.",
    longDesc:
      "Elektrisch fahrbare Zipscreens mit Somfy IO-Steuerung. Reißverschluss-Führung verhindert Auswehen und schützt zuverlässig vor Sonne, Insekten und Blicken.",
    image: imgZipscreen,
    price: 1290,
    specs: [
      { label: "Max. Größe", value: "5.000 × 3.000 mm" },
      { label: "Steuerung", value: "Somfy IO" },
      { label: "Führung", value: "Zip / Reißverschluss" },
      { label: "Maßanfertigung", value: "ja" },
    ],
  },
  {
    id: "plissee",
    label: "Sonnenschutz Plissee",
    shortDesc: "Wabenplissee zwischen den Dachsparren – 25 mm Wabenstruktur.",
    longDesc:
      "Plissees mit 25 mm Wabenstruktur werden zwischen den Sparren montiert und sorgen für angenehme Beschattung direkt unter dem Dach.",
    image: imgPlissee,
    price: 850,
    specs: [
      { label: "Wabenstruktur", value: "25 mm" },
      { label: "Montage", value: "zwischen Trägern" },
      { label: "Bedienung", value: "manuell oder elektrisch" },
      { label: "Maßanfertigung", value: "ja" },
    ],
  },
  {
    id: "sonnenschutz-oberdach",
    label: "Sonnenschutz Oberdach",
    shortDesc: "Beschattung direkt auf dem Dach – bis zu 90 % Hitzereduktion.",
    longDesc:
      "Aufdach-Sonnenschutz reflektiert die Sonne, bevor sie das Glas erreicht. Maximale Hitzereduktion, gleichzeitig Schutz für die Dachkonstruktion.",
    image: imgSonnenOberdach,
    price: 1690,
    specs: [
      { label: "Max. Größe", value: "6.000 × 4.500 mm" },
      { label: "Hitzereduktion", value: "bis zu 90 %" },
      { label: "Steuerung", value: "Funkmotor mit Sensor" },
      { label: "Maßanfertigung", value: "ja" },
    ],
  },
];

// Standard-Farbpalette aus Katalog (Aluminium-Pulverbeschichtung)
export const standardColors = [
  { ral: "RAL 7016", hex: "#293133", label: "Anthrazit" },
  { ral: "RAL 9005", hex: "#0A0A0A", label: "Schwarz" },
  { ral: "RAL 9001", hex: "#FDF4E3", label: "Weiß" },
  { ral: "RAL 9010", hex: "#F1ECDB", label: "Crème" },
];
export const premiumColors = [
  ...standardColors,
  { ral: "RAL 9016", hex: "#F6F6F6", label: "Verkehrsweiß" },
];

// ============================================================
// MARKISEN
// ============================================================
const markisenProducts: ProductDetail[] = [
  {
    slug: "fallarm",
    label: "Fallarmmarkisen",
    shortDesc: "Senkrechter Sonnenschutz für Fenster und Loggien.",
    image: heroTerrasse,
    hero: {
      badge: "Markisen",
      title: "Fallarmmarkisen.",
      titleAccent: "Schutz mit System.",
      subtitle: "Vertikaler Sonnen- und Sichtschutz für Fenster, Loggien und Schaufenster – elegant und funktional.",
      heroImage: heroTerrasse,
      detailImage: detailTerrasse,
    },
    intro: {
      label: "Das Konzept",
      title: "Schutz, der nach unten arbeitet.",
      text: "Fallarmmarkisen schützen Fenster und Loggien vor direkter Sonneneinstrahlung, ohne den Ausblick zu versperren. Die fallenden Arme passen sich dem gewünschten Neigungswinkel an und schaffen so einen flexiblen Sonnenschutz, der sich jeder Tageszeit anpasst.",
    },
    features: [
      { title: "Variabler Neigungswinkel", desc: "Stufenlose Einstellung von 0° bis 140° für individuelle Beschattung." },
      { title: "Wetterfeste Tücher", desc: "Hochwertige Acryl-Tücher mit Lichtechtheit 7/8 – farbstabil über Jahre." },
      { title: "Kompakte Bauweise", desc: "Schmales Profil – auch für enge Fensterlaibungen geeignet." },
      { title: "Motorisierung", desc: "Funkmotor mit Sonnen-/Windsensor optional erhältlich." },
      { title: "Vielfältige Designs", desc: "Über 200 Tuchfarben und 15 Gestellfarben zur Auswahl." },
      { title: "Lange Lebensdauer", desc: "Alle Komponenten aus korrosionsbeständigem Aluminium und Edelstahl." },
    ],
    specs: [
      { label: "Max. Breite", value: "4.000 mm" },
      { label: "Max. Ausfall", value: "1.800 mm" },
      { label: "Neigungswinkel", value: "0° – 140°" },
      { label: "Tuchstärke", value: "300 g/m² Acryl" },
      { label: "Antrieb", value: "Kurbel oder Motor" },
      { label: "Windklasse", value: "bis Klasse 2" },
      { label: "Gestellfarben", value: "15 Standardfarben" },
      { label: "Garantie", value: "5 Jahre" },
    ],
    cta: {
      title: "Sonnenschutz, perfekt geplant.",
      text: "Lassen Sie sich vor Ort beraten und finden Sie die passende Fallarmmarkise für Ihr Zuhause.",
    },
  },
  {
    slug: "gelenkarm",
    label: "Gelenkarmmarkisen",
    shortDesc: "Klassischer Sonnenschutz für Terrassen und Balkone.",
    image: productTerrasse,
    hero: {
      badge: "Markisen",
      title: "Gelenkarmmarkisen.",
      titleAccent: "Klassiker neu gedacht.",
      subtitle: "Bewährte Technik in zeitlosem Design – die ideale Beschattung für Terrassen und Balkone.",
      heroImage: productTerrasse,
      detailImage: detailTerrasse,
    },
    intro: {
      label: "Das Konzept",
      title: "Großer Schatten, kompakte Konstruktion.",
      text: "Gelenkarmmarkisen sind die klassische Lösung für die Terrassenbeschattung. Federgespannte Arme spannen das Tuch straff – auch bei großen Ausfällen. Im eingefahrenen Zustand verschwindet die Markise nahezu unsichtbar in ihrer Kassette.",
    },
    features: [
      { title: "Großer Ausfall", desc: "Bis zu 4 m Ausfall – auch große Terrassen werden komplett beschattet." },
      { title: "Vollkassette", desc: "Tuch und Mechanik vollständig wettergeschützt verstaut." },
      { title: "Volant verstellbar", desc: "Zusätzlicher Sicht- und Blendschutz durch verstellbaren Volant." },
      { title: "Smart-Home-fähig", desc: "Integration in gängige Smart-Home-Systeme via io-homecontrol oder Z-Wave." },
      { title: "Wind- & Sonnensensor", desc: "Automatisches Ein- und Ausfahren je nach Wetterlage." },
      { title: "LED-Beleuchtung", desc: "Optionale LED-Streifen in den Armen für stimmungsvolle Abendnutzung." },
    ],
    specs: [
      { label: "Max. Breite", value: "7.000 mm" },
      { label: "Max. Ausfall", value: "4.000 mm" },
      { label: "Neigungswinkel", value: "5° – 35°" },
      { label: "Tuchstärke", value: "300 g/m² Acryl, schmutzabweisend" },
      { label: "Antrieb", value: "Funkmotor Standard" },
      { label: "Windklasse", value: "bis Klasse 3" },
      { label: "Kassettentiefe", value: "ca. 220 mm" },
      { label: "Garantie", value: "5 Jahre Mechanik" },
    ],
    cta: {
      title: "Schatten auf Knopfdruck.",
      text: "Konfigurieren Sie Ihre Gelenkarmmarkise oder vereinbaren Sie ein kostenloses Aufmaß.",
    },
  },
  {
    slug: "senkrecht",
    label: "Senkrechtmarkisen",
    shortDesc: "Vertikaler Sicht- und Sonnenschutz für offene Bereiche.",
    image: detailTerrasse,
    hero: {
      badge: "Markisen",
      title: "Senkrechtmarkisen.",
      titleAccent: "Privatsphäre nach Maß.",
      subtitle: "Vertikaler Schutz vor Blicken, Sonne und Wind – ideal für Terrassen, Pergolen und Balkone.",
      heroImage: detailTerrasse,
      detailImage: heroTerrasse,
    },
    intro: {
      label: "Das Konzept",
      title: "Wand auf Zeit.",
      text: "Senkrechtmarkisen schaffen einen vertikalen Schutzraum, ohne die Architektur zu verändern. Geführt in seitlichen Schienen halten sie Wind, Insekten und Blicke fern – und bleiben dabei flexibel: Bei Bedarf einfach hochfahren und der freie Blick ist wieder da.",
    },
    features: [
      { title: "Zip-Führung", desc: "Reißverschluss-Führung verhindert das Auswehen des Tuchs." },
      { title: "Insektenschutz inklusive", desc: "Geschlossene Seiten halten Mücken und Insekten zuverlässig draußen." },
      { title: "Transparente Tücher", desc: "Soltis-Gewebe lassen Licht und Ausblick durch – und blockieren UV." },
      { title: "Hohe Windstabilität", desc: "Bis Windklasse 3 nutzbar – auch in exponierten Lagen." },
      { title: "Modulare Anbringung", desc: "Wand-, Decken- oder Pfostenmontage – passt überall." },
      { title: "Funkbedienung", desc: "Standardmäßig mit Funkmotor und Wandsender." },
    ],
    specs: [
      { label: "Max. Breite", value: "5.000 mm" },
      { label: "Max. Höhe", value: "4.000 mm" },
      { label: "Tucharten", value: "Acryl, Soltis, PVC-Mesh" },
      { label: "Führung", value: "Zip, Seil oder offen" },
      { label: "Antrieb", value: "Funkmotor" },
      { label: "Windklasse", value: "bis Klasse 3" },
      { label: "Lichtdurchlass", value: "3 % – 25 %" },
      { label: "Garantie", value: "5 Jahre" },
    ],
    cta: {
      title: "Schutz, der mitdenkt.",
      text: "Erfahren Sie, wie Senkrechtmarkisen Ihre Außenfläche aufwerten – wir beraten Sie unverbindlich.",
    },
  },
  {
    slug: "aufglas",
    label: "Aufglasmarkisen",
    shortDesc: "Beschattung direkt auf der Terrassenüberdachung.",
    image: heroTerrasse,
    hero: {
      badge: "Markisen",
      title: "Aufglasmarkisen.",
      titleAccent: "Schatten von oben.",
      subtitle: "Effiziente Beschattung direkt auf Glasdächern – verhindert Hitzestau und schützt das Material.",
      heroImage: heroTerrasse,
      detailImage: detailTerrasse,
    },
    intro: {
      label: "Das Konzept",
      title: "Hitzeschutz, der oben ansetzt.",
      text: "Aufglasmarkisen werden direkt auf der Glasfläche von Terrassenüberdachungen oder Wintergärten montiert. Sie reflektieren die Sonnenstrahlen, bevor sie das Glas erreichen – und reduzieren die Innentemperatur dadurch erheblich. Ein klarer Vorteil gegenüber innenliegender Beschattung.",
    },
    features: [
      { title: "Maximale Hitzereduktion", desc: "Bis zu 90 % weniger Wärmestrahlung gegenüber unbeschattetem Glas." },
      { title: "Materialschutz", desc: "Schützt die Glasdach-Konstruktion vor thermischer Belastung." },
      { title: "Schienenführung", desc: "Sichere seitliche Führung – auch bei Wind." },
      { title: "Großflächig einsetzbar", desc: "Tuchbreiten bis 6 m und Längen bis 6 m möglich." },
      { title: "Schmale Optik", desc: "Flache Bauweise integriert sich harmonisch in jede Konstruktion." },
      { title: "Sensorgesteuert", desc: "Wind- und Sonnensensor für vollautomatischen Betrieb." },
    ],
    specs: [
      { label: "Max. Breite", value: "6.000 mm" },
      { label: "Max. Ausfall", value: "6.000 mm" },
      { label: "Neigungswinkel", value: "5° – 45°" },
      { label: "Tuchart", value: "Acryl, schmutz- und wasserabweisend" },
      { label: "Antrieb", value: "Funkmotor mit Sensor" },
      { label: "Windklasse", value: "bis Klasse 3" },
      { label: "Hitzereduktion", value: "bis zu 90 %" },
      { label: "Garantie", value: "5 Jahre" },
    ],
    cta: {
      title: "Endlich kühler Schatten.",
      text: "Holen Sie sich Beratung zu Aufglasmarkisen – passend zu Ihrer Überdachung.",
    },
  },
];

// ============================================================
// TERRASSENÜBERDACHUNGEN
// 3 Qualitätsstufen: Wandbefestigt (PRO-LINE) / Freistehend (PRO-LINE) / Lamellendach (Premium Cabrio)
// + Q-Bus = LUXALINE CUBE (eigene Kategorie)
// ============================================================
const terrassenueberdachungenProducts: ProductDetail[] = [
  {
    slug: "wandbefestigt",
    label: "Wandbefestigt",
    shortDesc: "Direkt am Haus angebaut – nahtlose Verbindung von Wohn- und Außenraum.",
    image: proline1,
    showModules: true,
    hero: {
      badge: "Terrassenüberdachung",
      title: "Wandbefestigt.",
      titleAccent: "Erweiterung Ihres Zuhauses.",
      subtitle: "Direkt an Ihr Gebäude angebaut – für eine fließende Verbindung zwischen Wohnraum und Terrasse.",
      heroImage: proline1,
      detailImage: proline2,
    },
    intro: {
      label: "PRO-LINE",
      title: "Klares Design, hochwertige Materialien.",
      text: "Unsere wandbefestigten Aluminium-Überdachungen verbinden klares Design mit hochwertigsten Materialien. Schlanke Profile aus 6063 T6 Aluminium mit Premium-Pulverbeschichtung, Eindeckung wahlweise aus 16 mm Polycarbonat oder VSG 44.2 Sicherheitsglas. Die Regenrinne ist vollständig in das Profil integriert – nichts stört die Linienführung.",
    },
    features: [
      { title: "Premium-Aluminium", desc: "Profile aus 6063 T6 Aluminium mit professioneller Pulverbeschichtung – jahrzehntelang farbstabil." },
      { title: "Polycarbonat oder VSG-Glas", desc: "Wahlweise 16 mm Polycarbonat (leicht & bruchfest) oder VSG 44.2 Sicherheitsglas." },
      { title: "Integrierte Dachrinne", desc: "Regenwasserableitung verborgen in den Profilen – kein Sichtbruch." },
      { title: "Stabile Pfosten 14×14", desc: "Pfostenquerschnitt 14 × 14 cm – schlank, dennoch hochbelastbar." },
      { title: "Windlast bis 120 km/h", desc: "Statisch geprüft für anspruchsvolle Wetterlagen." },
      { title: "Erweiterbar mit Modulen", desc: "Glasschiebewände, Screens, Plissees, LED u.v.m. jederzeit nachrüstbar." },
    ],
    specs: [
      { label: "Material", value: "Aluminium 6063 T6, pulverbeschichtet" },
      { label: "Eindeckung", value: "Polycarbonat 16 mm oder VSG 44.2" },
      { label: "Maße", value: "3 – 12 m × 2 – 5 m" },
      { label: "Dachneigung", value: "5° – 15°" },
      { label: "Pfosten", value: "14 × 14 cm" },
      { label: "Windlast", value: "bis 120 km/h" },
      { label: "Standardfarben", value: "RAL 7016, 9005, 9001, 9010 + Maßanfertigung" },
      { label: "Garantie", value: "10 Jahre Struktur" },
    ],
    cta: {
      title: "Ihre neue Lieblingsfläche.",
      text: "Konfigurieren Sie Ihre Terrassenüberdachung oder vereinbaren Sie einen kostenlosen Vor-Ort-Termin.",
    },
  },
  {
    slug: "freistehend",
    label: "Freistehend",
    shortDesc: "Überdachung als eigenständige Architektur im Garten.",
    image: proline3,
    showModules: true,
    hero: {
      badge: "Terrassenüberdachung",
      title: "Freistehend.",
      titleAccent: "Architektur im Garten.",
      subtitle: "Eigenständige Konstruktion – platziert dort, wo Sie sie haben möchten.",
      heroImage: proline3,
      detailImage: proline2,
    },
    intro: {
      label: "PRO-LINE",
      title: "Frei platziert, klar gestaltet.",
      text: "Die freistehende PRO-LINE Variante ist unabhängig vom Gebäude – ideal für Poolbereiche, Outdoor-Küchen oder Gartensitzplätze. Vier oder mehr Pfosten (14 × 14 cm) tragen das Dach mit Polycarbonat- oder VSG-Eindeckung. Statisch ausgelegt für Windlasten bis 120 km/h.",
    },
    features: [
      { title: "Standortunabhängig", desc: "Platzieren Sie die Überdachung dort, wo der schönste Garten- oder Poolbereich ist." },
      { title: "Allseits offen", desc: "360°-Einsicht auf den Garten – oder mit Senkrechtmarkisen / Glasschiebewänden schließbar." },
      { title: "Stabile Pfosten 14×14", desc: "Quadratische Aluminium-Pfosten – schlank und dennoch tragfähig." },
      { title: "Polycarbonat oder VSG-Glas", desc: "Eindeckung nach Wahl – leicht & bruchfest oder maximal transparent." },
      { title: "Integrierte Entwässerung", desc: "Regenrinne in Profil und Pfosten geführt – kein sichtbarer Wasserablauf." },
      { title: "Modular erweiterbar", desc: "Mit Screens, Plissees, Glasschiebewänden und LED jederzeit ausbaubar." },
    ],
    specs: [
      { label: "Material", value: "Aluminium 6063 T6, pulverbeschichtet" },
      { label: "Eindeckung", value: "Polycarbonat 16 mm oder VSG 44.2" },
      { label: "Maße", value: "3 – 12 m × 2 – 5 m" },
      { label: "Pfosten", value: "14 × 14 cm" },
      { label: "Dachneigung", value: "5° – 15°" },
      { label: "Windlast", value: "bis 120 km/h" },
      { label: "Standardfarben", value: "RAL 7016, 9005, 9001, 9010 + Maßanfertigung" },
      { label: "Garantie", value: "10 Jahre Struktur" },
    ],
    cta: {
      title: "Ein Pavillon für jeden Garten.",
      text: "Erleben Sie Ihre Möglichkeiten – planen Sie mit uns Ihre freistehende Überdachung.",
    },
  },
  {
    slug: "lamellendach",
    label: "Lamellendach",
    shortDesc: "Premium-Lamellendach mit elektrisch verstellbaren Lamellen – Somfy IO.",
    image: lamellen1,
    showModules: true,
    hero: {
      badge: "Terrassenüberdachung",
      title: "Lamellendach.",
      titleAccent: "Volle Kontrolle.",
      subtitle: "Eine luxuriöse Lösung mit vollständiger Kontrolle über Licht, Luft und Schutz – per Knopfdruck.",
      heroImage: lamellen1,
      detailImage: lamellen2,
    },
    intro: {
      label: "Premium-Klasse",
      title: "Licht, Luft und Schutz – jederzeit steuerbar.",
      text: "Das Lamellendach ist die luxuriöseste Stufe unserer Terrassenüberdachungen. Elektrisch verstellbare Aluminium-Lamellen lassen Sie zwischen offenem Himmel, dosierter Beschattung und vollständig geschlossenem Dach wählen – per Somfy IO Funksteuerung. Bei Regen schließen die Lamellen automatisch und leiten das Wasser über integrierte Rinnen in den Pfosten ab.",
    },
    features: [
      { title: "Elektrisch verstellbare Lamellen", desc: "Stufenlos drehbar von 0° bis 135° – Licht und Luft präzise dosieren." },
      { title: "Somfy IO Steuerung", desc: "Funksteuerung Serie – per Handsender, Wandtaster oder Smartphone." },
      { title: "Regenfest geschlossen", desc: "Bei vollständig geschlossenen Lamellen 100 % wasserdicht." },
      { title: "Integrierte Wasserableitung", desc: "Regenrinne in Profil und Pfosten – verdeckter Wasserablauf." },
      { title: "Stabile Pfosten 15×15", desc: "Verstärkter Pfostenquerschnitt für die Lamellenkonstruktion." },
      { title: "Premium-Farbpalette", desc: "5 Standardfarben inkl. Verkehrsweiß RAL 9016 + Maßanfertigung." },
    ],
    specs: [
      { label: "Material", value: "Aluminium 6063 T6, pulverbeschichtet" },
      { label: "Lamellen", value: "Aluminium, motorisch drehbar 0° – 135°" },
      { label: "Steuerung", value: "Somfy IO (Funk, Wandtaster, App)" },
      { label: "Maße", value: "3 – 7 m × 3 – 4,5 m" },
      { label: "Pfosten", value: "15 × 15 cm" },
      { label: "Wasserableitung", value: "Integriert in Profil & Pfosten" },
      { label: "Farben", value: "RAL 7016, 9005, 9001, 9010, 9016 + Maßanfertigung" },
      { label: "Garantie", value: "10 Jahre Struktur" },
    ],
    cta: {
      title: "Ihr Premium-Outdoor-Raum.",
      text: "Erleben Sie das Lamellendach live – wir beraten Sie unverbindlich vor Ort.",
    },
  },
];

// ============================================================
// SCHIRME
// ============================================================
const schirmeProduct: ProductDetail = {
  slug: "schirme",
  label: "Schirme",
  shortDesc: "Schwenkbare Ampelschirme für maximale Flexibilität.",
  image: architectureDetail,
  hero: {
    badge: "Schirme",
    title: "Schwenkbare Schirme.",
    titleAccent: "Schatten in jede Richtung.",
    subtitle: "Großflächige Ampelschirme, die sich frei drehen und neigen lassen – ideal für Terrassen und Gastronomie.",
    heroImage: architectureDetail,
    detailImage: heroTerrasse,
  },
  intro: {
    label: "Das Konzept",
    title: "Volle Flexibilität, große Flächen.",
    text: "Ampelschirme stehen seitlich – der Schirmstock blockiert keinen Sitzplatz. Dank 360°-Drehung und stufenloser Neigung folgt der Schatten der Sonne, ohne dass die Möbel umgestellt werden müssen. Die hochwertige Verarbeitung macht diese Schirme zur dauerhaften Lösung für anspruchsvolle Außenbereiche.",
  },
  features: [
    { title: "360°-Drehung", desc: "Schirm dreht sich vollständig um die eigene Achse – Schatten folgt der Sonne." },
    { title: "Stufenlose Neigung", desc: "Neigung in alle Richtungen – auch tiefstehende Sonne wird abgehalten." },
    { title: "Großer Schattenbereich", desc: "Bis 5 × 5 m Bespannung – beschattet ganze Sitzgruppen." },
    { title: "Hochwertiges Tuch", desc: "Sunbrella-Acryl mit UV 50+ – farbecht und wasserabweisend." },
    { title: "Bodenhülse oder Sockel", desc: "Wahlweise mit Granitsockel oder fest einbetonierter Bodenhülse." },
    { title: "Wintersicher", desc: "Komplett demontierbar oder mit Schutzhülle überwinterbar." },
  ],
  specs: [
    { label: "Max. Bespannung", value: "5.000 × 5.000 mm" },
    { label: "Tuchart", value: "Sunbrella Acryl, 300 g/m²" },
    { label: "UV-Schutz", value: "UPF 50+" },
    { label: "Drehung", value: "360°" },
    { label: "Neigung", value: "stufenlos in 4 Richtungen" },
    { label: "Mast", value: "Aluminium, pulverbeschichtet" },
    { label: "Sockel", value: "Granit 90 – 200 kg oder Bodenhülse" },
    { label: "Garantie", value: "5 Jahre" },
  ],
  cta: {
    title: "Schatten, wo Sie ihn brauchen.",
    text: "Lassen Sie sich beraten – wir finden den passenden Schirm für Ihren Außenbereich.",
  },
};

// ============================================================
// Q-BUS  =  LUXALINE CUBE
// ============================================================
const qbusProduct: ProductDetail = {
  slug: "q-bus",
  label: "Q-Bus",
  shortDesc: "Kubische Premium-Überdachung mit Glasdach und serienmäßiger LED.",
  image: cube1,
  hero: {
    badge: "Q-Bus",
    title: "Q-Bus.",
    titleAccent: "Kubische Architektur.",
    subtitle: "Die kubische Premium-Überdachung – klare Linien, vollverglastes Dach, serienmäßige LED-Beleuchtung.",
    heroImage: cube1,
    detailImage: cube2,
  },
  intro: {
    label: "Premium-Klasse",
    title: "Ein Würfel, der Eindruck macht.",
    text: "Der Q-Bus ist unsere kubische Premium-Überdachung. Die rein kubische Form mit vollverglastem Dach (VSG 44.2) erzeugt eine Architektursprache, die zu modernen wie klassischen Gebäuden passt. Serienmäßige integrierte LED-Beleuchtung verleiht dem Außenraum auch abends die richtige Atmosphäre. Verstärkte Pfosten 15 × 15 cm tragen das schwere Glasdach souverän.",
  },
  features: [
    { title: "Vollverglastes Glasdach", desc: "VSG 44.2 Sicherheitsglas – maximale Transparenz, hagelsicher." },
    { title: "Kubische Architektur", desc: "Reduziertes, klares Design – keine Dachneigung sichtbar, perfekte Geometrie." },
    { title: "LED serienmäßig", desc: "Integrierte LED-Beleuchtung im Profil – stimmungsvoll und blendfrei." },
    { title: "Premium-Aluminium", desc: "Profile aus 6063 T6 Aluminium mit professioneller Pulverbeschichtung." },
    { title: "Verstärkte Pfosten", desc: "15 × 15 cm Pfostenquerschnitt – tragen auch große Glasflächen souverän." },
    { title: "Erweiterbar", desc: "Glasschiebewände, Zipscreens, Plissees jederzeit nachrüstbar." },
  ],
  specs: [
    { label: "Material", value: "Aluminium 6063 T6, pulverbeschichtet" },
    { label: "Eindeckung", value: "VSG 44.2 Sicherheitsglas" },
    { label: "Maße", value: "3 – 7 m × 3 – 4,5 m" },
    { label: "Pfosten", value: "15 × 15 cm" },
    { label: "Beleuchtung", value: "Integrierte LED serienmäßig" },
    { label: "Wasserableitung", value: "Integriert in Profil & Pfosten" },
    { label: "Farben", value: "RAL 7016, 9005, 9001, 9010, 9016 + Maßanfertigung" },
    { label: "Garantie", value: "10 Jahre Struktur" },
  ],
  cta: {
    title: "Premium-Architektur für Ihren Garten.",
    text: "Entdecken Sie den Q-Bus – wir konfigurieren Ihre individuelle Lösung.",
  },
};

// ============================================================
// EINGANGSÜBERDACHUNGEN
// ============================================================
const eingangProduct: ProductDetail = {
  slug: "eingangsueberdachungen",
  label: "Eingangsüberdachungen",
  shortDesc: "Eleganter Wetterschutz für Hauseingänge – schlanke Aluminium-Konstruktion.",
  image: detailCarport,
  hero: {
    badge: "Eingangsüberdachungen",
    title: "Eingangsüberdachung.",
    titleAccent: "Erster Eindruck.",
    subtitle: "Schlanke Aluminium-Vordächer mit Glas – Wetterschutz und Designstatement zugleich.",
    heroImage: detailCarport,
    detailImage: heroCarport,
  },
  intro: {
    label: "Das Konzept",
    title: "Willkommen, wettergeschützt.",
    text: "Eingangsüberdachungen schützen Sie und Ihre Gäste beim Auf- und Abschließen der Tür vor Regen und Schnee. Filigrane Aluminium-Profile (6063 T6) mit VSG-Glas wirken modern und unaufdringlich – und werten gleichzeitig die Hausfassade auf. Maßanfertigung passend zu Ihrer Architektur.",
  },
  features: [
    { title: "Maßanfertigung", desc: "Genau auf Ihren Eingang abgestimmt – Breite, Tiefe, Form." },
    { title: "VSG-Glasdach", desc: "Sicherheitsverbundglas – auch bei Hagel oder Schneelast bruchsicher." },
    { title: "Integrierte Wasserableitung", desc: "Ablauf seitlich oder verdeckt – kein Tropfen vor die Tür." },
    { title: "LED-Beleuchtung optional", desc: "Indirekte Beleuchtung im Profil – stimmungsvoll und funktional." },
    { title: "Wandhalterungen", desc: "Verdeckte Edelstahl-Halter – kein sichtbares Befestigungsmaterial." },
    { title: "Schnelle Montage", desc: "Vormontiert geliefert – Installation an einem Tag." },
  ],
  specs: [
    { label: "Material", value: "Aluminium 6063 T6, pulverbeschichtet" },
    { label: "Eindeckung", value: "VSG 2× 6 mm, klar oder satiniert" },
    { label: "Max. Breite", value: "3.000 mm" },
    { label: "Max. Ausladung", value: "1.500 mm" },
    { label: "Halterung", value: "Edelstahl V2A, verdeckt" },
    { label: "Schneelast", value: "bis 200 kg/m²" },
    { label: "Standardfarben", value: "RAL 7016, 9005, 9001, 9010 + Maßanfertigung" },
    { label: "Garantie", value: "10 Jahre Struktur" },
  ],
  cta: {
    title: "Ein Eingang, der einlädt.",
    text: "Konfigurieren Sie Ihre Eingangsüberdachung oder lassen Sie sich kostenlos beraten.",
  },
};

// ============================================================
// CARPORTS
// ============================================================
const carportsProduct: ProductDetail = {
  slug: "carports",
  label: "Carports",
  shortDesc: "Stilvoller Schutz für Ihr Fahrzeug – freistehend oder als Anbau.",
  image: productCarport,
  hero: {
    badge: "Carports",
    title: "Stilvoller Schutz.",
    titleAccent: "Für Ihr Fahrzeug.",
    subtitle: "Freistehend oder als Anbau – unsere Aluminium-Carports vereinen Design und Funktion auf höchstem Niveau.",
    heroImage: heroCarport,
    detailImage: detailCarport,
  },
  intro: {
    label: "Das Konzept",
    title: "Mehr als nur ein Unterstand.",
    text: "Ein Brait-Carport ist ein architektonisches Statement. Schlanke Aluminium-Profile (6063 T6) tragen Dachflächen aus VSG-Glas oder HPL-Platten – und schützen Ihr Fahrzeug dabei zuverlässig vor Regen, Hagel und UV-Strahlung. Ob Einzel-, Doppel- oder Reihencarport: Wir planen nach Ihren Maßen und Wünschen.",
  },
  features: [
    { title: "Freistehend oder Anbau", desc: "Flexible Konstruktion als freistehende Variante oder direkt an Ihr Gebäude angebaut." },
    { title: "Hagelschutz", desc: "VSG-Glas oder HPL-Platten bieten zuverlässigen Schutz vor Hagelschäden." },
    { title: "Integrierte Beleuchtung", desc: "LED-Spots und Bewegungsmelder für Sicherheit und Komfort bei Dunkelheit." },
    { title: "Ladestation-Ready", desc: "Vorbereitung für E-Auto-Wallbox – Kabelkanäle bereits in den Profilen integriert." },
    { title: "Wartungsfrei", desc: "Pulverbeschichtetes Aluminium benötigt keine Nachbehandlung – auch nach Jahren nicht." },
    { title: "Schneelastgeprüft", desc: "Statisch berechnet für regionale Schneelastzonen – Sicherheit garantiert." },
  ],
  specs: [
    { label: "Material", value: "Aluminium 6063 T6, pulverbeschichtet" },
    { label: "Eindeckung", value: "VSG-Glas oder HPL-Platten" },
    { label: "Max. Breite (Einzelstellplatz)", value: "3.500 mm" },
    { label: "Max. Breite (Doppelstellplatz)", value: "6.500 mm" },
    { label: "Max. Tiefe", value: "7.000 mm" },
    { label: "Schneelast", value: "bis 200 kg/m²" },
    { label: "Durchfahrtshöhe", value: "2.100 – 2.500 mm" },
    { label: "Garantie", value: "10 Jahre Struktur" },
  ],
  cta: {
    title: "Schutz, der Eindruck macht.",
    text: "Konfigurieren Sie Ihren individuellen Carport oder lassen Sie sich persönlich beraten.",
  },
};

// ============================================================
// CATEGORIES
// ============================================================
export const categories: Category[] = [
  {
    slug: "markisen",
    label: "Markisen",
    shortDesc: "Sonnenschutz für jede Anforderung.",
    longDesc:
      "Vier Markisensysteme – ein Versprechen: Hochwertiger Sonnenschutz, der zur Architektur passt. Vom klassischen Gelenkarm bis zur modernen Aufglasmarkise.",
    image: heroTerrasse,
    products: markisenProducts,
  },
  {
    slug: "terrassenueberdachungen",
    label: "Terrassenüberdachungen",
    shortDesc: "Aluminium-Glas-Systeme für ganzjährigen Genuss.",
    longDesc:
      "Drei Qualitätsstufen: Wandbefestigt und freistehend (PRO-LINE) oder das Premium-Lamellendach mit elektrisch verstellbaren Lamellen.",
    image: proline1,
    products: terrassenueberdachungenProducts,
  },
  {
    slug: "schirme",
    label: "Schirme",
    shortDesc: "Schwenkbare Ampelschirme für volle Flexibilität.",
    longDesc:
      "Großflächige Ampelschirme, die sich frei drehen und neigen lassen – ideal für Terrassen und Gastronomie.",
    image: architectureDetail,
    products: [],
    singleProduct: schirmeProduct,
  },
  {
    slug: "q-bus",
    label: "Q-Bus",
    shortDesc: "Kubische Premium-Überdachung mit Glasdach und LED.",
    longDesc:
      "Der Q-Bus ist unsere kubische Premium-Überdachung – vollverglastes Dach, integrierte LED, klare Architektur.",
    image: cube1,
    products: [],
    singleProduct: qbusProduct,
  },
  {
    slug: "eingangsueberdachungen",
    label: "Eingangsüberdachungen",
    shortDesc: "Eleganter Wetterschutz für Hauseingänge.",
    longDesc:
      "Schlanke Aluminium-Vordächer mit VSG-Glas – Wetterschutz und Designstatement zugleich.",
    image: detailCarport,
    products: [],
    singleProduct: eingangProduct,
  },
  {
    slug: "carports",
    label: "Carports",
    shortDesc: "Stilvoller Schutz für Ihr Fahrzeug.",
    longDesc:
      "Freistehend oder als Anbau – Aluminium-Carports mit Glas- oder HPL-Eindeckung, individuell geplant.",
    image: productCarport,
    products: [],
    singleProduct: carportsProduct,
  },
];

export const findCategory = (slug: string) => categories.find((c) => c.slug === slug);
export const findProduct = (categorySlug: string, productSlug: string) =>
  findCategory(categorySlug)?.products.find((p) => p.slug === productSlug);

/** Convenience: turn a ProductDetail into the legacy ProductPageTemplate shape. */
export const toProductPageData = (
  product: ProductDetail,
  otherProducts: { title: string; image: string; link: string }[],
) => ({
  badge: product.hero.badge,
  title: product.hero.title,
  titleAccent: product.hero.titleAccent,
  subtitle: product.hero.subtitle,
  heroImage: product.hero.heroImage,
  detailImage: product.hero.detailImage,
  introLabel: product.intro.label,
  introTitle: product.intro.title,
  introText: product.intro.text,
  features: product.features,
  specs: product.specs,
  ctaTitle: product.cta.title,
  ctaText: product.cta.text,
  otherProducts,
  showModules: product.showModules,
});
