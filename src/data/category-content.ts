/**
 * Long-form Content pro Category für Citability und tiefe SEO-Substanz.
 * Wird im CategoryPageTemplate als zusätzliche Section "Wissen & Auswahl"
 * gerendert. Die Texte sind so strukturiert, dass AI-Engines sie direkt
 * zitieren können (TL;DR, Use-Cases, Vergleichstabelle, Lokalkontext).
 */

export interface CategoryUseCase {
  title: string;
  description: string;
  recommended: string;
}

export interface CategoryComparisonRow {
  feature: string;
  values: Record<string, string>;
}

export interface CategoryLongFormContent {
  /** 1-2 Sätze, faktendicht, self-contained — wird als TL;DR oben gerendert. */
  tldr: string;
  /** Bullet-Liste mit „Schlüsselfakten“ (Stat-Format). */
  keyFacts: string[];
  useCases: CategoryUseCase[];
  comparison?: {
    title: string;
    columns: { key: string; label: string }[];
    rows: CategoryComparisonRow[];
  };
  /** Material-Erklärung. */
  materials?: string;
  /** Lokalkontext (Schneelast, Klima, BW-Recht). */
  localContext: string;
  /** Ulm-spezifischer Service-Hinweis. */
  serviceNote?: string;
}

export const categoryLongForm: Record<string, CategoryLongFormContent> = {
  markisen: {
    tldr:
      "Markisen sind die schnellste, günstigste und flexibelste Sonnenschutz-Lösung für Terrassen, Fenster und Glasdächer in Ulm. Brait verarbeitet vier Bauarten — Gelenkarm, Fallarm, Senkrecht/Zip-Screen und Aufglas — alle motorisiert, mit Sunbrella-Tuch und 5 Jahren Garantie.",
    keyFacts: [
      "Tuch: Sunbrella-Acryl 300 g/m², UV 50+, farbecht 10+ Jahre",
      "Maße: bis 7 × 4 m ohne Mittelstütze",
      "Steuerung: Funk, optional Sonnen-/Windsensor",
      "Preis: 1.200 – 4.500 € inkl. Montage",
      "Lieferzeit: 4 – 6 Wochen ab Auftrag",
      "Garantie: 5 Jahre auf Tuch + Mechanik",
    ],
    useCases: [
      {
        title: "Südterrasse mit voller Sonne",
        description:
          "Bei direkter Süd- oder Westausrichtung sind Gelenkarm- oder Aufglasmarkisen die effizienteste Wahl: Sie erzeugen großflächigen Horizontalschatten, lassen sich bei Bewölkung schnell einfahren und blockieren keine Sicht.",
        recommended: "Gelenkarmmarkise oder Aufglasmarkise",
      },
      {
        title: "Tiefstehende Sonne (Ost/West)",
        description:
          "Morgensonne im Osten oder Abendsonne im Westen kommt flach unter die Horizontalmarkise. Hier brauchen Sie eine Senkrechtmarkise oder Zip-Screen, der das Licht senkrecht abblockt.",
        recommended: "Senkrechtmarkise / Zip-Screen",
      },
      {
        title: "Glasdach im Sommer",
        description:
          "Wintergärten und Pro-Line-Terrassendächer mit Süd-/Westausrichtung heizen sich im Sommer um 10–15 °C auf. Eine Aufglasmarkise reduziert das auf 2–3 °C.",
        recommended: "Aufglasmarkise",
      },
      {
        title: "Gastronomie & Schaufenster",
        description:
          "Vor Fenstern oder Restaurant-Schaufenstern eignet sich die Fallarmmarkise: stufenlos neigbar, schützt vor Sonne und Blendung, ohne den Außenbereich einzuschränken.",
        recommended: "Fallarmmarkise",
      },
    ],
    comparison: {
      title: "Markisenarten im Vergleich",
      columns: [
        { key: "feature", label: "Merkmal" },
        { key: "gelenkarm", label: "Gelenkarm" },
        { key: "senkrecht", label: "Senkrecht / Zip" },
        { key: "aufglas", label: "Aufglas" },
        { key: "fallarm", label: "Fallarm" },
      ],
      rows: [
        {
          feature: "Schattenrichtung",
          values: {
            gelenkarm: "Horizontal",
            senkrecht: "Vertikal",
            aufglas: "Horizontal (auf Glas)",
            fallarm: "Schräg",
          },
        },
        {
          feature: "Max. Größe",
          values: {
            gelenkarm: "7 × 4 m",
            senkrecht: "5 × 4 m",
            aufglas: "Glasdachgröße",
            fallarm: "4 × 2,5 m",
          },
        },
        {
          feature: "Windklasse",
          values: {
            gelenkarm: "5",
            senkrecht: "Zip bis 7",
            aufglas: "5",
            fallarm: "5",
          },
        },
        {
          feature: "Preis ab",
          values: {
            gelenkarm: "2.200 €",
            senkrecht: "1.200 €",
            aufglas: "2.400 €",
            fallarm: "1.800 €",
          },
        },
        {
          feature: "Idealer Einsatz",
          values: {
            gelenkarm: "Süd-/Westterrasse",
            senkrecht: "Pergola, tiefe Sonne",
            aufglas: "Glasdach kühlen",
            fallarm: "Fenster, Schaufenster",
          },
        },
      ],
    },
    materials:
      "Tragrohre und Gelenkarme: Aluminium 6063 T6, pulverbeschichtet. Tücher: Sunbrella-Acryl (spinndüsengefärbt, UV-stabil) oder Polyester-PVC (Stamoid, Précontraint) für Gastronomie. Motoren: Somfy Sonesse oder Becker, beide mit 5 Jahren Garantie.",
    localContext:
      "Ulm liegt in Windzone 2 (Bemessungswind 25,2 m/s). Für freistehende Markisen empfehlen wir grundsätzlich einen Windsensor. Bei Hanglage oder Donau-Nähe (höhere Böen) erweitern wir die Befestigung mit zusätzlichen Schwerlast-Dübeln. Mietobjekte in Neu-Ulm und Söflingen erfordern oft Vermieter-Zustimmung — wir helfen mit der Argumentation.",
    serviceNote:
      "Wir beraten in Ulm und 100 km Umkreis kostenlos vor Ort mit Tuchmustern, RAL-Farbpalette und Mini-Modell. Montage durch eigenes Team in 1 Tag.",
  },

  terrassenueberdachungen: {
    tldr:
      "Eine Aluminium-Terrassenüberdachung verlängert Ihre Outdoor-Saison von 4 auf 9 Monate. Brait baut drei Linien — Pro-Line (wandbefestigt, ab 7.900 €), Cube (freistehend, ab 9.500 €) und Lamellendach (verstellbar, ab 14.000 €) — alles aus 6063 T6 Aluminium mit VSG-Glas oder Lamellen, 10 Jahren Strukturgarantie und Montage durch das eigene Team.",
    keyFacts: [
      "Material: Aluminium 6063 T6, Pulverbeschichtung 30+ Jahre Lebensdauer",
      "Glas: VSG 2× 6 mm, hagelschlagsicher Klasse HW3",
      "Schneelast: 200 kg/m² Standard, individuell bis Zone 4 (320 kg/m²)",
      "Maße: bis 7 × 4 m wandbefestigt, 7 × 4,5 m freistehend",
      "Garantie: 10 Jahre Struktur, 5 Jahre Motorik",
      "Genehmigung: bis 30 m² in BW verfahrensfrei",
    ],
    useCases: [
      {
        title: "Klassische Hausterrasse",
        description:
          "Direkter Wandanschluss, Süd-/Westausrichtung: Pro-Line mit VSG-Glasdach ist die preiswerteste und schnellste Lösung. Kann später jederzeit zum Glashaus erweitert werden.",
        recommended: "Pro-Line",
      },
      {
        title: "Outdoor-Lounge im Garten",
        description:
          "Keine Hauswand zum Anbauen oder bewusst freistehende Lounge gewünscht: Cube-Konstruktion mit kubischer Statik. Optisch losgelöst vom Haus, eigenständiges Architekturelement.",
        recommended: "Cube",
      },
      {
        title: "Premium-Outdoor-Living",
        description:
          "Volle Klimakontrolle: Sonne nach Wunsch, Schatten auf Knopfdruck, wasserdicht bei Regen. Lamellendach mit 0–135° drehbaren Aluminium-Lamellen — Investition zahlt sich durch ganzjährige Nutzung aus.",
        recommended: "Lamellendach",
      },
      {
        title: "Hochterrasse / Gastronomie",
        description:
          "Stark belastete Standorte oder gewerbliche Nutzung: Cube freistehend mit verstärkter Statik (Zone 3+) und VSG-Glas-Wänden, optional Lamellendach für 365-Tage-Betrieb.",
        recommended: "Cube oder Lamellendach + Glasschiebewände",
      },
    ],
    comparison: {
      title: "Pro-Line, Cube und Lamellendach im Vergleich",
      columns: [
        { key: "feature", label: "Merkmal" },
        { key: "proline", label: "Pro-Line" },
        { key: "cube", label: "Cube" },
        { key: "lamellen", label: "Lamellendach" },
      ],
      rows: [
        {
          feature: "Befestigung",
          values: {
            proline: "Wandbefestigt",
            cube: "Freistehend",
            lamellen: "Beides möglich",
          },
        },
        {
          feature: "Dach",
          values: {
            proline: "VSG-Glas",
            cube: "VSG-Glas oder HPL",
            lamellen: "Verstellbar 0–135°",
          },
        },
        {
          feature: "Wasserdicht",
          values: {
            proline: "Ja",
            cube: "Ja",
            lamellen: "Bei geschlossenen Lamellen",
          },
        },
        {
          feature: "Klimakontrolle",
          values: {
            proline: "Mit Aufglasmarkise",
            cube: "Mit Aufglasmarkise",
            lamellen: "Stufenlos",
          },
        },
        {
          feature: "Preis ab (3 × 4 m)",
          values: {
            proline: "7.900 €",
            cube: "9.500 €",
            lamellen: "14.000 €",
          },
        },
        {
          feature: "Erweiterbar zum Glashaus",
          values: {
            proline: "Ja",
            cube: "Ja",
            lamellen: "Ja",
          },
        },
      ],
    },
    materials:
      "Profile aus Aluminium 6063 T6 (Strangpresslegierung, hochfest), pulverbeschichtet nach DIN EN 12206-1. Glas VSG 2× 6 mm Standard nach EN 14179 (splitterfrei bei Bruch), optional satiniert oder als Sonnenschutzglas. Wandanschluss mit thermisch entkoppelter EPDM-Dichtung, chemische Verbundanker in Beton oder Mauerwerk.",
    localContext:
      "Ulm und Schwäbische Alb fallen in Schneelastzone 2a (1,32 kN/m²) bis Zone 3 (Höhenlagen ab 600 m). Brait berechnet jede Anlage individuell. Bauordnung Baden-Württemberg (LBO §50 Anlage 1): Terrassenüberdachungen bis 30 m² Grundfläche und 3 m Tiefe sind genehmigungsfrei — größere Anlagen brauchen eine Bauanzeige beim Landratsamt Alb-Donau. Bei denkmalgeschützten Häusern (Ulmer Altstadt, Söflingen) ist immer eine Genehmigung Pflicht.",
    serviceNote:
      "Brait übernimmt bei Genehmigungspflicht die Zusammenstellung der Bauunterlagen und reicht im Auftrag bei der Behörde ein.",
  },

  schirme: {
    tldr:
      "Ampelschirme sind die flexibelste Sonnenschutz-Lösung, wenn keine Wandbefestigung möglich oder gewünscht ist. Bis 5 × 5 m Bespannung, 360°-drehbar und stufenlos neigbar, mit Sunbrella-Acryl UV 50+ — ab 1.800 € inkl. Granitsockel.",
    keyFacts: [
      "Bespannung: bis 5 × 5 m, Sunbrella Acryl 300 g/m²",
      "UV-Schutz: UPF 50+",
      "Drehung: 360°, Neigung stufenlos in 4 Richtungen",
      "Sockel: Granit 90–200 kg oder Bodenhülse",
      "Windklasse: bis 5 (geschlossen winterfest)",
      "Preis: 1.800 – 4.500 €",
    ],
    useCases: [
      {
        title: "Esstisch auf der Terrasse",
        description:
          "Mast steht seitlich, Tisch ist komplett frei. Schirm 3 × 3 m bis 4 × 4 m, dreht und neigt sich der Sonne nach.",
        recommended: "Ampelschirm 3 × 3 m oder 4 × 4 m",
      },
      {
        title: "Lounge / Sitzgruppe",
        description:
          "Große Schattenfläche für mehrere Personen — empfehlen 4 × 4 m oder 5 × 5 m mit Granitsockel ab 150 kg.",
        recommended: "Ampelschirm 5 × 5 m",
      },
      {
        title: "Gastronomie-Außenfläche",
        description:
          "Mehrere Schirme auf einer Fläche: einfacher als feste Konstruktionen, schnell auf-/abgebaut, wettersicher überwinterbar.",
        recommended: "Mehrere 4 × 4 m mit Bodenhülse",
      },
    ],
    materials:
      "Mast: Aluminium pulverbeschichtet, Stand-Mast und Quer-Arm. Bespannung: Sunbrella Acryl 300 g/m² (spinndüsengefärbt, schimmelresistent). Sockel: Granit 90–200 kg oder fest einbetonierte Bodenhülse aus verzinktem Stahl.",
    localContext:
      "Im Donautal mit häufigen Westwinden empfehlen wir Granitsockel ab 150 kg, in geschützten Innenhöfen reichen 90 kg. Schirme sollten bei Wind ab Windstärke 5 (~30 km/h) geschlossen werden — eine offene Bespannung wirkt wie ein Segel.",
  },

  "q-bus": {
    tldr:
      "Die Q-Bus Lamellen-Pergola ist die Premium-Outdoor-Lösung mit voller Klimakontrolle: Aluminium-Lamellen 0–135° drehbar, wasserdicht schließend, Funk-Motor inklusive. Ab 12.500 €, voll ausgestattet mit LED, Zip-Screen und Glasschiebewänden bei 22.000–28.000 €.",
    keyFacts: [
      "Lamellen: Aluminium 6063 T6, motorisch 0–135°",
      "Wasserdicht geschlossen, integrierte Wasserableitung in Pfosten",
      "Maße: 3 – 7 m × 3 – 4,5 m",
      "Pfosten: 15 × 15 cm",
      "Steuerung: Funk-Fernbedienung, optional Wettersensor",
      "Garantie: 10 Jahre Struktur, 5 Jahre Motorik",
    ],
    useCases: [
      {
        title: "365-Tage-Outdoor-Lounge",
        description:
          "Volle Kontrolle: Lamellen offen für Sommer-Sonne, geschlossen für Regenschutz. Mit Glasschiebewänden + Zip-Screens wird daraus ein wettergeschützter Outdoor-Wohnraum.",
        recommended: "Q-Bus + Glasschiebewände + Zip-Screen",
      },
      {
        title: "Architektur-Statement im Garten",
        description:
          "Kubische Linien, schwarze oder anthrazitfarbene Profile, indirekte LED entlang der Lamellen — Q-Bus wird zum gestalterischen Mittelpunkt.",
        recommended: "Q-Bus mit LED-Lamellenbeleuchtung",
      },
      {
        title: "Gastronomie / Hotellerie",
        description:
          "Wetterfest, betriebsam wartungsarm, repräsentativ: Q-Bus als Außen-Restaurantbereich mit voller Wetterkontrolle und Optik.",
        recommended: "Q-Bus mit Heizstrahler-Vorbereitung + Vollausstattung",
      },
    ],
    materials:
      "Profile und Lamellen: Aluminium 6063 T6 mit hochwertiger Pulverbeschichtung. Motoren: 24 V Gleichstrommotoren mit Endschalter, leise und wartungsfrei. Optionale Komponenten: warmweiße/kaltweiße/dimmbare LED-Streifen entlang der Lamellen, rahmenlose Glasschiebewände, Zip-Screen-Verschattung an jeder Seite.",
    localContext:
      "In Ulm und der Schwäbischen Alb (Schneelastzone 2a/3) berechnen wir die Statik der Q-Bus inkl. der dynamischen Lasten der drehbaren Lamellen. Bei Schneefall sollten die Lamellen geschlossen sein — Schnee rutscht dann ab.",
  },

  eingangsueberdachungen: {
    tldr:
      "Eingangsüberdachungen schützen Sie und Ihre Gäste beim Auf- und Abschließen vor Regen und Schnee. Aluminium-Konstruktion mit VSG-Glas, verdeckte Edelstahl-Halterung — ab 1.490 € inkl. Montage.",
    keyFacts: [
      "Material: Aluminium 6063 T6 + VSG-Glas 2× 6 mm",
      "Max. Breite: 3.000 mm, max. Ausladung: 1.500 mm",
      "Halterung: Edelstahl V2A, verdeckt",
      "Hagelklasse: HW3 (splitterfrei)",
      "Montage: 1 Tag, vormontiert geliefert",
    ],
    useCases: [
      {
        title: "Klassischer Hauseingang",
        description:
          "200 × 100 cm reichen für Standardtüren und schützen den Eingang vor Schlagregen. Edelstahl-Halterung verdeckt — keine sichtbaren Streben.",
        recommended: "Eingangsüberdachung 200 × 100 cm",
      },
      {
        title: "Repräsentativer Eingang",
        description:
          "Größere Anlage 300 × 150 cm mit indirekter LED-Beleuchtung. Stimmungsvolle Ausleuchtung des Eingangsbereichs am Abend.",
        recommended: "Eingangsüberdachung 300 × 150 cm + LED",
      },
    ],
    materials:
      "Profile aus Aluminium 6063 T6, pulverbeschichtet. Glas VSG 2× 6 mm (Verbund-Sicherheitsglas), klar oder satiniert (Sichtschutz von oben). Halter Edelstahl V2A (rostfrei, korrosionsbeständig), verdeckt in der Wand verankert.",
    localContext:
      "Eingangsüberdachungen sind in BW grundsätzlich genehmigungsfrei (LBO §50). In Mehrfamilienhäusern ist die Zustimmung der Eigentümergemeinschaft notwendig.",
  },

  carports: {
    tldr:
      "Aluminium-Carports schützen Fahrzeuge vor Hagel, Schnee und UV — wartungsfrei und mit 10 Jahren Garantie. Einzelcarport ab 4.900 €, Doppelcarport ab 7.900 €. Optional: Wallbox-Vorbereitung, LED, Bewegungsmelder.",
    keyFacts: [
      "Material: Aluminium 6063 T6, pulverbeschichtet",
      "Eindeckung: VSG-Glas oder HPL-Platten (Hagelklasse HW3)",
      "Max. Breite Einzelcarport: 3,5 m, Doppel: 6,5 m",
      "Max. Tiefe: 7 m",
      "Schneelast: bis 200 kg/m²",
      "Durchfahrtshöhe: 2,1 – 2,5 m",
      "Vorbereitet für E-Auto-Wallbox",
    ],
    useCases: [
      {
        title: "Einzelfahrzeug",
        description:
          "Standardcarport 3 × 5 m oder 3,5 × 5 m, freistehend oder als Anbau am Haus. Wallbox-Vorbereitung in den Pfosten — keine sichtbare Verkabelung.",
        recommended: "Einzelcarport mit Wallbox-Kanal",
      },
      {
        title: "Doppelcarport für Familien",
        description:
          "6 × 5 m oder 6,5 × 5 m, optional mit Seitenwand für mehr Wetterschutz. LED + Bewegungsmelder erhöhen Sicherheit bei Dunkelheit.",
        recommended: "Doppelcarport + LED + Wallbox",
      },
      {
        title: "Carport vs. Garage",
        description:
          "Carports sind günstiger, schneller montiert, ohne Brandschutzauflagen, in BW bis 30 m² genehmigungsfrei. Ideal, wenn Sie keine geschlossene Garage benötigen.",
        recommended: "Carport ohne Seitenwände",
      },
    ],
    comparison: {
      title: "Carport vs. Garage",
      columns: [
        { key: "feature", label: "Merkmal" },
        { key: "carport", label: "Carport (Brait)" },
        { key: "garage", label: "Massive Garage" },
      ],
      rows: [
        {
          feature: "Genehmigung BW (30 m²)",
          values: { carport: "Verfahrensfrei", garage: "Bauanzeige nötig" },
        },
        {
          feature: "Bauzeit",
          values: { carport: "1–3 Tage", garage: "6–12 Wochen" },
        },
        {
          feature: "Preis",
          values: { carport: "5.000–10.000 €", garage: "15.000–25.000 €" },
        },
        {
          feature: "Wartung",
          values: { carport: "Wartungsfrei", garage: "Putz, Tor, Lüftung" },
        },
        {
          feature: "Diebstahlschutz",
          values: { carport: "Keine Tür", garage: "Abschließbar" },
        },
        {
          feature: "Belüftung Fahrzeug",
          values: { carport: "Sehr gut (offen)", garage: "Nur mit Lüftung" },
        },
      ],
    },
    materials:
      "Profile Aluminium 6063 T6, pulverbeschichtet nach DIN EN 12206-1. Eindeckung: VSG 2× 6 mm Glas oder HPL-Platten (Hochdruckschichtstoff, hagelschlagsicher). Pfosten 15 × 15 cm mit integrierten Kabelkanälen für Wallbox und Beleuchtung.",
    localContext:
      "Baden-Württemberg LBO §50: Carports bis 30 m² Grundfläche und 3 m Höhe sind verfahrensfrei. Abstandsflächen zu Nachbargrundstücken (3 m) und zur Straße (Sichtdreieck) müssen eingehalten werden — wir prüfen das im Vor-Ort-Termin. In Hochrisiko-Gebieten für Hagel (Bayerisch Schwaben) empfehlen wir HPL-Platten statt Glas.",
  },
};

export const getCategoryLongForm = (slug: string): CategoryLongFormContent | undefined =>
  categoryLongForm[slug];
