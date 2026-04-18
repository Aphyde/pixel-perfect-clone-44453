import heroTerrasse from "@/assets/hero-terrasse.jpg";
import detailTerrasse from "@/assets/detail-terrasse.jpg";
import productTerrasse from "@/assets/product-terrassenueberdachung.jpg";
import heroCarport from "@/assets/hero-carport.jpg";
import detailCarport from "@/assets/detail-carport.jpg";
import productCarport from "@/assets/product-carport.jpg";
import architectureDetail from "@/assets/architecture-detail.jpg";
import heroHome from "@/assets/hero-home.jpg";
import heroWintergarten from "@/assets/hero-wintergarten.jpg";
import detailWintergarten from "@/assets/detail-wintergarten.jpg";

export interface ProductFeature {
  title: string;
  desc: string;
}
export interface ProductSpec {
  label: string;
  value: string;
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
// ============================================================
const terrassenueberdachungenProducts: ProductDetail[] = [
  {
    slug: "wandbefestigt",
    label: "Wandbefestigt",
    shortDesc: "Direkt am Haus angebaut – nahtlose Verbindung von Wohn- und Außenraum.",
    image: heroTerrasse,
    hero: {
      badge: "Terrassenüberdachung",
      title: "Wandbefestigt.",
      titleAccent: "Erweiterung Ihres Zuhauses.",
      subtitle: "Direkt an Ihr Gebäude angebaut – für eine fließende Verbindung zwischen Wohnraum und Terrasse.",
      heroImage: heroTerrasse,
      detailImage: detailTerrasse,
    },
    intro: {
      label: "Das Konzept",
      title: "Eine Erweiterung, kein Anbau.",
      text: "Eine wandbefestigte Terrassenüberdachung wird statisch und gestalterisch als Teil Ihres Hauses geplant. Schlanke Aluminium-Profile, Glasdächer ohne sichtbare Verschraubungen und integrierte Regenrinnen sorgen für ein architektonisch klares Erscheinungsbild – innen wie außen.",
    },
    features: [
      { title: "Nahtlose Anbindung", desc: "Direkter Anschluss an die Hauswand – ohne Wasser- oder Wärmebrücken." },
      { title: "Integrierte Entwässerung", desc: "Regenrinne in den Profilen verborgen – kein Sichtbruch." },
      { title: "Glasdach", desc: "VSG aus 2× 6 mm – kratzfest, hagelsicher, selbstreinigend optional." },
      { title: "LED-Lichtleisten", desc: "Indirekte Beleuchtung in den Profilen integriert – stimmungsvoll und blendfrei." },
      { title: "Beschattung optional", desc: "Aufglas- oder Untermarkise nachträglich integrierbar." },
      { title: "Statisch geprüft", desc: "Berechnung nach DIN für Schnee- und Windlastzonen Ihrer Region." },
    ],
    specs: [
      { label: "Material Tragwerk", value: "Aluminium EN AW-6060 T66" },
      { label: "Eindeckung", value: "VSG 2× 6 mm, optional selbstreinigend" },
      { label: "Max. Breite", value: "10.000 mm" },
      { label: "Max. Ausladung", value: "4.500 mm" },
      { label: "Schneelast", value: "bis 200 kg/m²" },
      { label: "Lichte Höhe", value: "2.200 – 3.000 mm" },
      { label: "Farben", value: "Pulverbeschichtung, RAL nach Wahl" },
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
    image: detailTerrasse,
    hero: {
      badge: "Terrassenüberdachung",
      title: "Freistehend.",
      titleAccent: "Architektur im Garten.",
      subtitle: "Eigenständige Konstruktion – platziert dort, wo Sie sie haben möchten.",
      heroImage: detailTerrasse,
      detailImage: heroTerrasse,
    },
    intro: {
      label: "Das Konzept",
      title: "Frei platziert, klar gestaltet.",
      text: "Freistehende Terrassenüberdachungen sind unabhängig vom Gebäude – ideal für Poolbereiche, Outdoor-Küchen oder Gartensitzplätze. Vier oder mehr Pfosten tragen das Glasdach, das auch große Spannweiten bewältigt. Die Konstruktion fügt sich wie ein architektonisches Objekt in den Garten ein.",
    },
    features: [
      { title: "Standortunabhängig", desc: "Platzieren, wo der schönste Garten- oder Poolbereich ist." },
      { title: "Allseits offen", desc: "360°-Einsicht auf den Garten – oder mit Senkrechtmarkisen schließbar." },
      { title: "Stabile Pfosten", desc: "Pfostenstärke 120×120 mm – schlank und dennoch tragfähig." },
      { title: "Punktfundamente", desc: "Saubere Montage auf Streifen- oder Punktfundamenten." },
      { title: "Kombinierbar", desc: "Ergänzbar mit Markisen, Heizstrahlern, LED, Lautsprechern." },
      { title: "Großzügige Spannweiten", desc: "Bis 7 m × 5 m ohne Mittelpfosten möglich." },
    ],
    specs: [
      { label: "Material Tragwerk", value: "Aluminium EN AW-6060 T66" },
      { label: "Eindeckung", value: "VSG 2× 6 mm" },
      { label: "Max. Größe", value: "10.000 × 6.000 mm" },
      { label: "Pfostenquerschnitt", value: "120 × 120 mm" },
      { label: "Schneelast", value: "bis 200 kg/m²" },
      { label: "Lichte Höhe", value: "2.200 – 3.000 mm" },
      { label: "Fundament", value: "Punkt- oder Streifenfundament" },
      { label: "Garantie", value: "10 Jahre Struktur" },
    ],
    cta: {
      title: "Ein Pavillon für jeden Garten.",
      text: "Erleben Sie Ihre Möglichkeiten – planen Sie mit uns Ihre freistehende Überdachung.",
    },
  },
];

// ============================================================
// SCHIRME (Einzelkategorie – schwenkbare Ampelschirme)
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
// Q-BUS
// ============================================================
const qbusProduct: ProductDetail = {
  slug: "q-bus",
  label: "Q-Bus",
  shortDesc: "Kubische Outdoor-Lounge mit System – modulare Architektur.",
  image: architectureDetail,
  hero: {
    badge: "Q-Bus",
    title: "Q-Bus.",
    titleAccent: "Outdoor-Architektur.",
    subtitle: "Der kubische Outdoor-Raum – frei kombinierbar, vollständig integriert, jederzeit erweiterbar.",
    heroImage: architectureDetail,
    detailImage: detailTerrasse,
  },
  intro: {
    label: "Das Konzept",
    title: "Ein Würfel – unendliche Möglichkeiten.",
    text: "Der Q-Bus ist mehr als eine Überdachung: Er ist ein modulares Outdoor-System aus klar geschnittenen Aluminium-Modulen. Senkrechtmarkisen, Lamellendach, integrierte Beleuchtung und Heizung lassen sich frei kombinieren – aus einer offenen Terrasse wird eine geschlossene Lounge per Knopfdruck.",
  },
  features: [
    { title: "Modulare Bauweise", desc: "Kombinierbar zu größeren Anlagen – wachsen Sie mit Ihrem Bedarf." },
    { title: "Lamellendach", desc: "Stufenlos verstellbare Lamellen – von offen bis vollständig geschlossen." },
    { title: "Senkrechtmarkisen integriert", desc: "Alle vier Seiten optional schließbar – wettergeschützter Raum entsteht." },
    { title: "Smart-Home-Steuerung", desc: "App-Steuerung von Lamellen, Markisen, Licht und Heizung." },
    { title: "Klare Architektur", desc: "Reduziertes Design – passt zu modernen wie klassischen Gebäuden." },
    { title: "Ganzjahresnutzung", desc: "Mit Heizstrahlern und Beleuchtung das ganze Jahr nutzbar." },
  ],
  specs: [
    { label: "Material Tragwerk", value: "Aluminium EN AW-6060 T66" },
    { label: "Dachsystem", value: "Lamellendach, motorisch verstellbar" },
    { label: "Max. Modulgröße", value: "7.000 × 4.500 mm" },
    { label: "Pfostenquerschnitt", value: "150 × 150 mm" },
    { label: "Wasserableitung", value: "Integriert in Pfosten" },
    { label: "Steuerung", value: "Funk + App (optional)" },
    { label: "Erweiterbarkeit", value: "Modular kombinierbar" },
    { label: "Garantie", value: "10 Jahre Struktur" },
  ],
  cta: {
    title: "Ihr Outdoor-Raum, nach Ihren Regeln.",
    text: "Entdecken Sie das Q-Bus-System – wir konfigurieren Ihre individuelle Lösung.",
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
    text: "Eingangsüberdachungen schützen Sie und Ihre Gäste beim Auf- und Abschließen der Tür vor Regen und Schnee. Filigrane Aluminiumprofile mit VSG-Glas wirken modern und unaufdringlich – und werten gleichzeitig die Hausfassade auf. Maßanfertigung passend zu Ihrer Architektur.",
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
    { label: "Material Tragwerk", value: "Aluminium EN AW-6060 T66" },
    { label: "Eindeckung", value: "VSG 2× 6 mm, klar oder satiniert" },
    { label: "Max. Breite", value: "3.000 mm" },
    { label: "Max. Ausladung", value: "1.500 mm" },
    { label: "Halterung", value: "Edelstahl V2A, verdeckt" },
    { label: "Schneelast", value: "bis 200 kg/m²" },
    { label: "Farben", value: "Pulverbeschichtung, RAL nach Wahl" },
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
    text: "Ein Brait-Carport ist ein architektonisches Statement. Schlanke Aluminium-Profile tragen Dachflächen aus VSG-Glas oder HPL-Platten – und schützen Ihr Fahrzeug dabei zuverlässig vor Regen, Hagel und UV-Strahlung. Ob Einzel-, Doppel- oder Reihencarport: Wir planen nach Ihren Maßen und Wünschen.",
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
    { label: "Material Tragwerk", value: "Aluminium EN AW-6060 T66" },
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
      "Wandbefestigt oder freistehend: Unsere Terrassenüberdachungen aus Aluminium und Glas vereinen Architektur, Wetterschutz und Wohnkomfort.",
    image: productTerrasse,
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
    shortDesc: "Modulare Outdoor-Architektur in Würfelform.",
    longDesc:
      "Der Q-Bus ist ein modulares Outdoor-System aus Aluminium – kombinierbar, smart, ganzjährig nutzbar.",
    image: architectureDetail,
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
});
