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
      "Eine Aluminium-Terrassenüberdachung verlängert Ihre Outdoor-Saison um bis zu +187 nutzbare Tage pro Jahr (DWD-Klimadaten Süddeutschland). Brait baut drei Linien — Pro-Line (wandbefestigt, ab 5.490 € inkl. Montage), Cube (freistehend, ab 6.990 €) und Lamellendach Q-Bus (verstellbar, ab 8.990 €) — alles aus 6063 T6 Aluminium mit Polycarbonat oder VSG-Glas, 10 Jahren Strukturgarantie und Montage durch das eigene Team.",
    keyFacts: [
      "Material: Aluminium 6063 T6, Pulverbeschichtung 30+ Jahre Lebensdauer",
      "Glas: VSG 8–10 mm, hagelschlagsicher Klasse HW3",
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
          feature: "Preis ab (Einstieg, inkl. Montage)",
          values: {
            proline: "5.490 € (5×3 m PC)",
            cube: "6.990 € (5×3 m PC)",
            lamellen: "8.990 € (5×3 m)",
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
      "Profile aus Aluminium 6063 T6 (Strangpresslegierung, hochfest), pulverbeschichtet nach DIN EN 12206-1. Glas VSG 8–10 mm Standard nach EN 14179 (splitterfrei bei Bruch), alternativ 8 mm Polycarbonat (opal oder klar) für Einstiegsbudget. Wandanschluss mit thermisch entkoppelter EPDM-Dichtung, chemische Verbundanker in Beton oder Mauerwerk. Pfosten 15 × 15 cm Standard, optional schlank 11 × 11 cm.",
    localContext:
      "Ulm und Schwäbische Alb fallen in Schneelastzone 2a (1,32 kN/m²) bis Zone 3 (Höhenlagen ab 600 m). Brait berechnet jede Anlage individuell. Bauordnung Baden-Württemberg (LBO §50 Anlage 1): Terrassenüberdachungen bis 30 m² Grundfläche und 3 m Tiefe sind genehmigungsfrei — größere Anlagen brauchen eine Bauanzeige beim Landratsamt Alb-Donau. Bei denkmalgeschützten Häusern (Ulmer Altstadt, Söflingen) ist immer eine Genehmigung Pflicht.",
    serviceNote:
      "Brait übernimmt bei Genehmigungspflicht die Zusammenstellung der Bauunterlagen und reicht im Auftrag bei der Behörde ein.",
  },

  schirme: {
    tldr:
      "Ampelschirme sind die flexibelste Sonnenschutz-L\u00f6sung, wenn keine Wandbefestigung m\u00f6glich oder gew\u00fcnscht ist. Brait liefert Profi-Ampelschirme mit Bespannung bis 5 \u00d7 5 m, 360\u00b0-drehbar und stufenlos neigbar, mit Sunbrella Acryl 300 g/m\u00b2 (UPF 50+), Granit- oder Bodenh\u00fclsen-Sockel und Funkmotor-Option ab 1.800 \u20ac inkl. Granitsockel \u2014 ideal f\u00fcr Esstisch, Lounge, Pool und Gastronomie.",
    keyFacts: [
      "Bespannung: bis 5 \u00d7 5 m, Sunbrella Acryl 300 g/m\u00b2",
      "UV-Schutz: UPF 50+ (blockt 98 % der UV-Strahlung)",
      "Drehung: 360\u00b0, Neigung stufenlos in 4 Richtungen",
      "Sockel: Granit 90\u2013200 kg oder einbetonierte Bodenh\u00fclse",
      "Windklasse: bis 5 (\u224830 km/h Boe)",
      "Lebensdauer Tuch: 8\u201312 Jahre",
      "Lebensdauer Mast: 20+ Jahre (Aluminium pulverbeschichtet)",
      "Preis: 1.800\u20134.500 \u20ac",
    ],
    useCases: [
      {
        title: "Esstisch auf der Terrasse",
        description:
          "Der Mast steht seitlich neben dem Tisch, der Tisch ist komplett frei \u2014 keine st\u00f6rende S\u00e4ule in der Mitte. Schirme 3 \u00d7 3 m bis 4 \u00d7 4 m drehen und neigen sich der Sonnenrichtung nach. Ideal f\u00fcr Familien mit 4\u20136 Personen, sch\u00fctzt zus\u00e4tzlich die Holzm\u00f6bel vor UV-Bleichung.",
        recommended: "Ampelschirm 3 \u00d7 3 m oder 4 \u00d7 4 m mit 150-kg-Granitsockel",
      },
      {
        title: "Lounge oder Sitzgruppe im Garten",
        description:
          "Gro\u00dfe Schattenfl\u00e4che f\u00fcr 6\u201310 Personen \u2014 wir empfehlen 4 \u00d7 4 m oder 5 \u00d7 5 m mit Granitsockel ab 150 kg. Optional mit Funkmotor f\u00fcr Auf-/Zufahren auf Knopfdruck. Lampenoption mit indirekter LED am Mast f\u00fcr Abendstimmung.",
        recommended: "Ampelschirm 5 \u00d7 5 m mit Funkmotor und LED",
      },
      {
        title: "Pool-Bereich und Sonnenliegen",
        description:
          "Direkt am Pool soll der Schirm bequem den Liegebereich abdecken \u2014 Ampelschirme drehen sich der Tagessonne nach, ohne dass die Liege bewegt werden muss. Wichtig: Bodenh\u00fclse einbetonieren, weil ein Granitsockel auf nasser Pool-Umrandung verrutscht.",
        recommended: "Ampelschirm 4 \u00d7 4 m mit einbetonierter Bodenh\u00fclse",
      },
      {
        title: "Gastronomie-Au\u00dfenfl\u00e4che oder Hotelterrasse",
        description:
          "Mehrere Schirme auf einer Fl\u00e4che sind einfacher zu betreiben als feste Konstruktionen: schnell auf- und abbaubar, wettersicher \u00fcberwinterbar im Lager. F\u00fcr Bewirtungsfl\u00e4chen \u00fcber 30 m\u00b2 in BW genehmigungsrechtlich unkritisch, weil mobile Bauten nicht der LBO unterliegen.",
        recommended: "Mehrere 4 \u00d7 4 m Schirme mit Bodenh\u00fclsen \u2014 mit Werbedruck auf der Bespannung",
      },
    ],
    comparison: {
      title: "Ampelschirm vs. Mittelmast vs. Marktschirm",
      columns: [
        { key: "feature", label: "Merkmal" },
        { key: "ampel", label: "Ampelschirm" },
        { key: "mittelmast", label: "Mittelmast" },
        { key: "markt", label: "Marktschirm" },
      ],
      rows: [
        {
          feature: "Mast-Position",
          values: { ampel: "Seitlich (Hebelarm)", mittelmast: "Mittig", markt: "Mittig" },
        },
        {
          feature: "Bespannungsgr\u00f6\u00dfe",
          values: { ampel: "bis 5 \u00d7 5 m", mittelmast: "bis 4 \u00d7 4 m", markt: "\u00d8 2\u20133 m" },
        },
        {
          feature: "Drehbarkeit",
          values: { ampel: "360\u00b0 + Neigung", mittelmast: "Nein", markt: "Nein" },
        },
        {
          feature: "Sockelgewicht",
          values: { ampel: "90\u2013200 kg Granit", mittelmast: "60\u2013120 kg", markt: "30\u201360 kg" },
        },
        {
          feature: "Windstabilit\u00e4t",
          values: { ampel: "Bis Windst\u00e4rke 5", mittelmast: "Bis Windst\u00e4rke 5", markt: "Bis Windst\u00e4rke 4" },
        },
        {
          feature: "Preis",
          values: { ampel: "1.800\u20134.500 \u20ac", mittelmast: "800\u20132.000 \u20ac", markt: "150\u2013500 \u20ac" },
        },
        {
          feature: "Idealer Einsatz",
          values: { ampel: "Premium-Terrasse", mittelmast: "Garten Standard", markt: "Markt / Bistro" },
        },
      ],
    },
    materials:
      "Mast: Aluminium pulverbeschichtet, Stand-Mast und Querarm aus 6063 T6, Lebensdauer 20+ Jahre. Bespannung: Sunbrella Acryl 300 g/m\u00b2 (spinnd\u00fcsengef\u00e4rbt im Garn, schimmelresistent, UV 50+, farbecht 10+ Jahre garantiert). Sockel: Granitw\u00fcrfel 90\u2013200 kg (poliert oder geflammt) oder fest einbetonierte Bodenh\u00fclse aus verzinktem Stahl mit Schraubsicherung.",
    localContext:
      "Im Donautal um Ulm mit h\u00e4ufigen Westwinden (Bemessungswindgeschwindigkeit 25,2 m/s in Windzone 2) empfehlen wir Granitsockel ab 150 kg. In gesch\u00fctzten Innenh\u00f6fen oder Hofterrassen reichen 90 kg. Schirme sollten bei Wind ab Windst\u00e4rke 5 (\u224830 km/h) geschlossen werden \u2014 eine offene Bespannung wirkt wie ein Segel und kann Schaden anrichten. F\u00fcr exponierte Lagen auf der Schw\u00e4bischen Alb oder Hangterrassen empfehlen wir die Bodenh\u00fclsen-Variante mit Beton-Fundament.",
    serviceNote:
      "Brait liefert die Schirme komplett montiert mit Sockel zu Ihnen \u2014 im 100-km-Umkreis um Ulm versandkostenfrei. \u00dcber Winter k\u00f6nnen Sie den Schirm mit der mitgelieferten H\u00fclle einlagern oder bei Brait einlagern lassen (50 \u20ac pro Saison). Tuch-Austausch nach 8\u201312 Jahren mit 30 % Treuerabatt.",
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
      "Eine Eingangs\u00fcberdachung sch\u00fctzt Sie, Ihre G\u00e4ste und die Haust\u00fcr beim Auf- und Abschlie\u00dfen vor Regen, Schnee, Schlagregen und UV-Strahlung. Brait fertigt Aluminium-Konstruktionen 6063 T6 mit VSG-Glas 2 \u00d7 6 mm, verdeckter Edelstahl-Halterung und filigranen Profilen ab 1.490 \u20ac inkl. Montage \u2014 in BW bis 30 m\u00b2 verfahrensfrei nach \u00a7 50 LBO Anlage 1.",
    keyFacts: [
      "Material: Aluminium 6063 T6 + VSG-Glas 2 \u00d7 6 mm",
      "Max. Breite: 3.000 mm, max. Ausladung: 1.500 mm",
      "Halterung: Edelstahl V2A, verdeckt in der Wand verankert",
      "Hagelklasse: HW3 (splitterfrei nach DIN EN 13049)",
      "Montage: 1 Tag, vormontiert geliefert",
      "Preis: 1.490\u20133.500 \u20ac inkl. Montage",
      "Garantie: 10 Jahre Struktur",
      "Genehmigung BW: bis 30 m\u00b2 und 3 m H\u00f6he verfahrensfrei",
    ],
    useCases: [
      {
        title: "Klassischer Hauseingang",
        description:
          "200 \u00d7 100 cm reichen f\u00fcr Standard-Haust\u00fcren und sch\u00fctzen den Eingang vor Schlagregen aus West/S\u00fcdwest \u2014 der Hauptregenrichtung in S\u00fcddeutschland. Edelstahl-Halterung verdeckt, keine sichtbaren Streben, klares VSG-Glas l\u00e4sst Tageslicht durch.",
        recommended: "Eingangs\u00fcberdachung 200 \u00d7 100 cm in Anthrazit RAL 7016",
      },
      {
        title: "Repr\u00e4sentativer Eingang Einfamilienhaus",
        description:
          "Gr\u00f6\u00dfere Anlage 300 \u00d7 150 cm mit indirekter LED-Beleuchtung in den Profilen. Stimmungsvolle Ausleuchtung des Eingangsbereichs am Abend, Bewegungsmelder-Option, Glas wahlweise klar oder satiniert.",
        recommended: "Eingangs\u00fcberdachung 300 \u00d7 150 cm + LED + Bewegungsmelder",
      },
      {
        title: "Mehrfamilienhaus / Hauseingang Wohnanlage",
        description:
          "Mehrere Briefkasten- und T\u00fcrenbereiche werden \u00fcberdacht (bis 5 \u00d7 1,5 m). Brait fertigt nach individueller Statik, weil Spannweiten \u00fcber 3 m verst\u00e4rkte Profile brauchen. WEG-Beschluss erforderlich.",
        recommended: "Sonderanfertigung mit individueller Statik",
      },
      {
        title: "Gastronomie- oder Praxiseingang",
        description:
          "F\u00fcr Patientenpraxen, Restaurants oder Hotelportale ist eine 250\u2013350 cm breite \u00dcberdachung mit klarem VSG sinnvoll \u2014 sch\u00fctzt G\u00e4ste vor Regen w\u00e4hrend des Wartens und unterstreicht die Eingangs-Architektur.",
        recommended: "Eingangs\u00fcberdachung 350 \u00d7 150 cm mit Wandvorhang-Option",
      },
    ],
    comparison: {
      title: "Eingangs\u00fcberdachung Bauarten im Vergleich",
      columns: [
        { key: "feature", label: "Merkmal" },
        { key: "klassisch", label: "Klassisch (Glas)" },
        { key: "modern", label: "Bauhaus-Stil" },
        { key: "sonder", label: "Sonderanfertigung" },
      ],
      rows: [
        {
          feature: "Maximale Breite",
          values: { klassisch: "3 m", modern: "3 m", sonder: "5+ m" },
        },
        {
          feature: "Glasdach",
          values: { klassisch: "VSG 2 \u00d7 6 mm klar", modern: "VSG satiniert", sonder: "VSG nach Wunsch" },
        },
        {
          feature: "Halterung",
          values: { klassisch: "Edelstahl V2A verdeckt", modern: "Edelstahl V2A", sonder: "individuell" },
        },
        {
          feature: "Preis",
          values: { klassisch: "1.490\u20132.000 \u20ac", modern: "1.700\u20132.500 \u20ac", sonder: "ab 2.500 \u20ac" },
        },
        {
          feature: "Montage",
          values: { klassisch: "1 Tag", modern: "1 Tag", sonder: "1\u20132 Tage" },
        },
      ],
    },
    materials:
      "Profile aus Aluminium 6063 T6 (Strangpressprofile, korrosionsbest\u00e4ndig durch nat\u00fcrliche Oxidschicht), pulverbeschichtet nach DIN EN 12206-1 in beliebiger RAL-Farbe. Glas VSG 2 \u00d7 6 mm (Verbund-Sicherheitsglas mit PVB-Folie, splittersicher, hagelschlagsicher Klasse HW3), wahlweise klar oder satiniert (Sichtschutz von oben, lichtdurchl\u00e4ssig). Halter aus Edelstahl V2A (rostfrei, salzwasserbest\u00e4ndig), verdeckt in der Wand verankert mit Verbundankern (chemische Befestigung in Beton oder Mauerwerk).",
    localContext:
      "Eingangs\u00fcberdachungen sind in Baden-W\u00fcrttemberg nach \u00a7 50 LBO Anlage 1 grunds\u00e4tzlich verfahrensfrei, sofern unter 30 m\u00b2 Grundfl\u00e4che und 3 m H\u00f6he. In Denkmalschutz-Bereichen wie der Ulmer Altstadt oder dem Reutlinger Bismarckturm-Quartier kann die Untere Denkmalschutzbeh\u00f6rde eine Stellungnahme verlangen \u2014 Brait \u00fcbernimmt auf Wunsch das Voranfrage-Schreiben. In Mehrfamilienh\u00e4usern ist die Zustimmung der Eigent\u00fcmergemeinschaft (WEG-Beschluss \u00a7 21 WEG) notwendig.",
    serviceNote:
      "Wir vermessen Ihren Eingangsbereich kostenlos vor Ort, fertigen die \u00dcberdachung in unserer Werkstatt im 100-km-Umkreis um Ulm vor und montieren in 1 Tag. Auf Wunsch kombinieren wir die \u00dcberdachung mit Briefkasten-Anlage, Klingel-Display oder Bewegungsmelder.",
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
      "Profile Aluminium 6063 T6, pulverbeschichtet nach DIN EN 12206-1. Eindeckung: VSG-Sicherheitsglas 8–10 mm oder 8 mm Polycarbonat (HPL-Platten als Sondereindeckung auf Anfrage, für maximalen Hagelschutz). Pfosten 15 × 15 cm mit integrierten Kabelkanälen für Wallbox und Beleuchtung.",
    localContext:
      "Baden-Württemberg LBO §50: Carports bis 30 m² Grundfläche und 3 m Höhe sind verfahrensfrei. Abstandsflächen zu Nachbargrundstücken (3 m) und zur Straße (Sichtdreieck) müssen eingehalten werden — wir prüfen das im Vor-Ort-Termin. In Hochrisiko-Gebieten für Hagel (Bayerisch Schwaben) empfehlen wir HPL-Platten statt Glas.",
  },
};

export const getCategoryLongForm = (slug: string): CategoryLongFormContent | undefined =>
  categoryLongForm[slug];
