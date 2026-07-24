/**
 * Ratgeber-Artikel als TypeScript-Daten. Inhalt ist citability-optimiert:
 * TL;DR oben, Faktenboxen, Zwischenüberschriften als Fragen, Vergleiche.
 */

export interface ArticleSection {
  /** Heading level — h2 oder h3. */
  heading?: { text: string; level?: 2 | 3 };
  /** Paragraph als String oder Array von Strings (jeweils ein <p>). */
  paragraphs?: string[];
  /** Stichpunkt-Liste. */
  bullets?: string[];
  /** Faktenbox (TL;DR-ähnlich). */
  factBox?: { title: string; items: string[] };
  /** Vergleichs-Tabelle. */
  table?: {
    columns: string[];
    rows: string[][];
  };
  /** Anchor-Slug für interne Links. */
  anchor?: string;
}

export interface Article {
  slug: string;
  title: string;
  description: string;
  /** Long-Tail-SEO Title für meta. */
  metaTitle?: string;
  category:
    | "Auswahl"
    | "Preise"
    | "Recht"
    | "Material"
    | "Pflege"
    | "Energie"
    | "Lokal";
  /** ISO-Datum. */
  publishedAt: string;
  updatedAt?: string;
  /** Geschätzte Lesezeit in Minuten. */
  readingMinutes: number;
  /** Hero-Bild (öffentlicher Pfad). */
  image: string;
  imageAlt: string;
  /** TL;DR (1-2 Sätze, faktendicht). */
  tldr: string;
  /** Hauptinhalt als strukturierte Sections. */
  sections: ArticleSection[];
  /** Verwandte Artikel-Slugs. */
  related?: string[];
  /** Verwandte Produkt-/Kategorie-Slugs. */
  relatedProducts?: { label: string; href: string }[];
  /** Optionale Article-Keywords. */
  keywords?: string[];
}

export const articles: Article[] = [
  {
    slug: "welche-terrassenueberdachung-passt-zu-ihrem-haus",
    title: "Welche Terrassenüberdachung passt zu Ihrem Haus?",
    metaTitle:
      "Welche Terrassenüberdachung passt zu Ihrem Haus? Ratgeber 2026",
    description:
      "Pro-Line, Cube oder Lamellendach? Der ultimative Leitfaden zur Auswahl Ihrer Aluminium-Terrassenüberdachung — mit Entscheidungsmatrix, Preisranges und Praxis-Beispielen.",
    category: "Auswahl",
    publishedAt: "2026-04-01",
    readingMinutes: 9,
    image: "/catalog/hero-glashaus.jpg",
    imageAlt: "Brait Pro-Line Terrassenüberdachung mit VSG-Glasdach in Ulm",
    tldr: "Drei Systeme, drei Anwendungsfälle: Pro-Line (wandbefestigt, ab 5.610 € zzgl. Montage) für klassische Hausterrassen, Cube (freistehend, ab ca. 6.600 €) für Gartenlounges ohne Wandanschluss, Lamellendach (verstellbar, ab 17.560 €) für Premium-Outdoor mit voller Klimakontrolle. Die Wahl hängt von Ausrichtung, Statik, Budget und gewünschter Nutzungsdauer pro Jahr ab.",
    sections: [
      {
        factBox: {
          title: "Schnell-Übersicht — die drei Systeme",
          items: [
            "Pro-Line: wandbefestigt, ab 5.610 € zzgl. Dacheindeckung und Montage (Polycarbonat-Eindeckung separat, Aufpreis VSG-Glas +3.360–4.060 €). Ideal bei Süd-/Westausrichtung mit Hauswand.",
            "Cube: freistehend, kubisches Design, ab ca. 6.600 €. Ideal als Garten-Lounge ohne Wandanschluss.",
            "Lamellendach: verstellbare Aluminium-Lamellen, ab 17.560 €. Ideal für volle Klimakontrolle und ganzjährige Nutzung.",
          ],
        },
      },
      {
        heading: { text: "Welche Faktoren entscheiden über das richtige System?" },
        paragraphs: [
          "Vor der Wahl der Bauart sollten Sie sich vier Fragen beantworten: Gibt es eine geeignete Hauswand für den Anschluss? In welche Himmelsrichtung zeigt die Terrasse? Wie oft wollen Sie die Überdachung pro Jahr nutzen — nur an Sommernachmittagen oder bei jedem Wetter? Und wie wichtig ist Ihnen volle Klimakontrolle gegenüber maximaler Lichtdurchlässigkeit?",
          "Wenn Sie eine massive Hauswand haben und die Terrasse in 6 Monaten pro Jahr nutzen wollen, ist Pro-Line wirtschaftlich unschlagbar. Wenn Sie keine Hauswand haben oder die Überdachung als eigenständiges Architekturelement wollen, kommt Cube ins Spiel. Wenn Sie 365 Tage Outdoor-Wohnen möchten — Sommer-Sonne wie Winter-Regenschutz — führt am Lamellendach kein Weg vorbei.",
        ],
      },
      {
        heading: { text: "Pro-Line — die solide wandbefestigte Lösung" },
        paragraphs: [
          "Pro-Line ist ein klassisches Anbaudach: schlanke Aluminium-Sparren tragen ein VSG-Glasdach (8–10 mm) oder 8 mm Polycarbonat-Dach, integrierte Regenrinne im Pfosten (15 × 15 cm, optional 11 × 11 cm) leitet Niederschlag unsichtbar ab. Bis 7 m Breite und 4 m Tiefe ohne Mittelstütze, Dachneigung 5–15°. Der Wandanschluss erfolgt mit thermisch entkoppelter EPDM-Dichtung, die Befestigung mit chemischen Verbundankern.",
          "Vorteil: Pro-Line lässt sich später jederzeit zum Glashaus erweitern, indem rahmenlose Schiebewände, Festrahmen oder Zip-Screens nachgerüstet werden. Sie können also mit einer offenen Überdachung starten und Jahre später zum geschlossenen Übergangsraum erweitern.",
        ],
      },
      {
        heading: { text: "Cube — das freistehende Architektur-Statement" },
        paragraphs: [
          "Cube ist eine kubische, freistehende Aluminium-Konstruktion, die ohne Wandanschluss auskommt. Vier Pfosten 15 × 15 cm tragen ein VSG-Glasdach oder HPL-Platten. Die Cube wird gerne dort eingesetzt, wo eine Hauswand fehlt (Garten-Lounge in Reichweite zum Pool oder zum Grill) oder wo eine optisch losgelöste Konstruktion bewusst gewünscht ist.",
          "Statisch ist Cube anspruchsvoller als Pro-Line, weil die Lasten allein über die vier Pfosten in den Boden geleitet werden. Wir berechnen jede Cube individuell für die Schneelastzone vor Ort — Ulm liegt in Zone 2a, höhere Lagen der Schwäbischen Alb in Zone 3.",
        ],
      },
      {
        heading: { text: "Lamellendach — Premium für volle Klimakontrolle" },
        paragraphs: [
          "Lamellendächer haben Aluminium-Lamellen, die motorisch von 0° (komplett offen, Himmelssicht) bis 135° (geschlossen, wasserdicht) drehbar sind. Per Funk-Fernbedienung oder App regulieren Sie Sonne, Schatten und Regenschutz auf Knopfdruck. Mit optionalem Wettersensor schließt das Dach automatisch bei beginnendem Regen.",
          "Die Premium-Investition zahlt sich aus, wenn Sie die Überdachung 365 Tage im Jahr nutzen wollen. Mit Glasschiebewänden und Zip-Screens wird das Lamellendach zum vollwertigen Outdoor-Wohnzimmer — frostfrei (Aluminium ist korrosionsbeständig), trocken (geschlossen wasserdicht) und windstabil (Zip-Screens bis Windstärke 7).",
        ],
      },
      {
        heading: { text: "Wie hoch sind die laufenden Kosten?" },
        paragraphs: [
          "Aluminium-Konstruktionen mit Pulverbeschichtung sind nahezu wartungsfrei. Reinigung 1× pro Jahr mit Wasser und mildem Reiniger genügt. VSG-Glas: gleiche Reinigung wie Hausfenster. Dichtungen halten 15+ Jahre, Motoren 12–15 Jahre.",
          "Realistische Wartungskosten: 0–50 € pro Jahr bei Eigenleistung, 200–400 € pro Jahr mit Brait-Wartungspaket (Inspektion, Reinigung, Tuchprüfung, Motorservice).",
        ],
      },
      {
        heading: { text: "Entscheidungsmatrix" },
        table: {
          columns: ["Ihr Szenario", "Empfehlung"],
          rows: [
            ["Hauswand vorhanden, Süd-/Westterrasse, Sommer-Nutzung", "Pro-Line"],
            ["Keine Hauswand, freistehende Garten-Lounge", "Cube"],
            ["365-Tage-Outdoor-Wohnen, volle Klimakontrolle", "Lamellendach"],
            ["Vorhandenes Glasdach + Sommerhitze-Problem", "Pro-Line/Cube + Aufglasmarkise"],
            ["Gastronomie / repräsentativer Außenbereich", "Cube oder Lamellendach + Glasschiebewände"],
            ["Knappes Budget, später erweiterbar", "Pro-Line, später Glashaus"],
          ],
        },
      },
      {
        heading: { text: "Was sollten Sie als Nächstes tun?" },
        paragraphs: [
          "Vereinbaren Sie einen kostenlosen Demo-Koffer-Termin: Wir kommen mit Mini-Modell, Materialmustern und 3D-Konfigurator zu Ihnen. Innerhalb von 60–120 Minuten klären wir Ausrichtung, Statik, Genehmigungspflicht und Optik — danach erhalten Sie innerhalb von 5 Werktagen ein verbindliches Festpreis-Angebot.",
        ],
      },
    ],
    related: [
      "markise-vs-pergola-vs-lamellendach",
      "was-kostet-eine-terrassenueberdachung-in-ulm",
      "genehmigung-terrassendach-baden-wuerttemberg",
    ],
    relatedProducts: [
      { label: "Terrassenüberdachungen", href: "/terrassenueberdachungen" },
      { label: "Q-Bus Lamellen-Pergola", href: "/q-bus" },
    ],
    keywords: [
      "Terrassenüberdachung Auswahl",
      "Pro-Line vs Cube",
      "Lamellendach Empfehlung",
      "Terrassendach Ulm",
    ],
  },

  {
    slug: "markise-vs-pergola-vs-lamellendach",
    title: "Markise vs. Pergola vs. Lamellendach — Vergleich 2026",
    description:
      "Markise, Pergola, Lamellendach im direkten Vergleich: Schattenverhalten, Wetterfestigkeit, Preis, Nutzungsdauer. Welche Lösung wirklich zu welcher Terrasse passt — mit Entscheidungsmatrix, Praxisbeispielen aus Ulm und ehrlicher Wirtschaftlichkeit.",
    category: "Auswahl",
    publishedAt: "2026-04-05",
    readingMinutes: 10,
    image: "/catalog/lamellendach-1.jpg",
    imageAlt: "Vergleich Markise, Pergola und Lamellendach in Ulm",
    tldr: "Markisen sind reine Sonnenschutz-L\u00f6sungen ab 3.180 \u20ac und nur bei trockenem Wetter einsatzbereit. Pergolen mit Stoffsegel kosten 8.000\u201315.000 \u20ac und schaffen Architektur-Statements ohne festes Dach. Lamellend\u00e4cher Q-Bus (ab 17.560 \u20ac, Vollausstattung bis rund 50.000 \u20ac) sind das einzige System, das Sonnen- und Regenschutz auf Knopfdruck kombiniert und 365 Tage pro Jahr nutzbar ist. Die Wahl h\u00e4ngt von drei Faktoren ab: gew\u00fcnschte Nutzungsmonate (4\u20135 vs. 12), Wetterfestigkeit und Budget.",
    sections: [
      {
        heading: { text: "Wof\u00fcr ist eine Markise gemacht?" },
        paragraphs: [
          "Eine Markise ist eine reine Sonnenschutz-L\u00f6sung mit ausfahrbarem Tuch und keiner Wetterfestigkeit. Sie blockiert je nach Tuch-Typ 70\u201390 % der UV- und IR-Strahlung und reduziert die Raumtemperatur dahinter im Hochsommer messbar um 5\u201310 \u00b0C \u2014 belegt durch Messreihen des Instituts f\u00fcr Fenstertechnik (ift Rosenheim, 2024). Bei beginnendem Regen muss die Markise jedoch eingefahren werden, weil Wassers\u00e4cke das Tuch \u00fcberdehnen und Gelenkarmlager besch\u00e4digen.",
          "Markisen-Typen unterscheiden sich nach Einbauort: Gelenkarmmarkise f\u00fcr klassische Hausterrassen (bis 7 m Breite, 4 m Ausfall), Fallarmmarkise vor Fenstern (0\u2013140\u00b0 neigbar), Senkrechtmarkise/Zip-Screen f\u00fcr seitlichen Wind- und Sichtschutz (windstabil bis Windst\u00e4rke 7) und Aufglasmarkise direkt auf bestehenden Pro-Line- oder Wintergarten-Glasd\u00e4chern. Vorteile: g\u00fcnstig (3.880\u20138.950 \u20ac inkl. Montage), schnelle Installation (1 Tag), in BW bis 30 m\u00b2 verfahrensfrei (\u00a750 LBO Anlage 1).",
        ],
        factBox: {
          title: "Markise \u2014 Eckdaten",
          items: [
            "Preis: 3.880\u20138.950 \u20ac inkl. Montage.",
            "Tuch-Lebensdauer: 8\u201312 Jahre (Sunbrella Acryl 300 g/m\u00b2).",
            "Mechanik-Lebensdauer: 12\u201315 Jahre.",
            "Nutzungsmonate: 4\u20135 pro Jahr (Mai\u2013September).",
            "Genehmigung BW: bis 30 m\u00b2 verfahrensfrei.",
            "Energieersparnis pro Saison: 80\u2013150 \u20ac (Klimaanlagen-Strom).",
          ],
        },
      },
      {
        heading: { text: "Was unterscheidet eine Pergola?" },
        paragraphs: [
          "Eine Pergola ist eine eigenst\u00e4ndige Aluminium-Konstruktion mit beweglichem Sonnenschutz und in der Regel ohne festes Dach. Im klassischen Sinn hat sie ein motorisch ausfahrbares Stoffsegel zwischen vier Pfosten oder einen Querverlauf. Die zweite Variante ist die bioklimatische Pergola \u2014 das ist genau das, was wir hier ab dem n\u00e4chsten Abschnitt als Lamellendach beschreiben.",
          "Pergolen mit Stoffsegel kosten 8.000\u201315.000 \u20ac inkl. Montage. Anders als wandbefestigte Anbauten sind sie baurechtlich eigenst\u00e4ndige Konstruktionen \u2014 in BW kann ab 30 m\u00b2 oder \u00fcber 3 m H\u00f6he eine Bauanzeige nach \u00a751 LBO erforderlich werden. Pergolen punkten optisch, weil die offene Konstruktion luftiger wirkt als ein geschlossenes Glasdach. Funktional sind sie aber keine Wetter-L\u00f6sung: Stoffsegel m\u00fcssen bei starkem Wind (ab Windst\u00e4rke 5) und Regen eingefahren werden.",
        ],
      },
      {
        heading: { text: "Was kann ein Lamellendach mehr als Pergola und Markise?" },
        paragraphs: [
          "Ein Lamellendach (auch bioklimatische Pergola) ist die einzige der drei L\u00f6sungen, die Sonnen- und Regenschutz auf Knopfdruck kombiniert. Aluminium-Lamellen rotieren motorisch von 0\u00b0 (komplett offen mit freiem Himmelsblick) bis 135\u00b0 (geschlossen, wasserdicht durch \u00fcberlappende Profilkanten und integrierte Wasserableitung in den Pfosten). Mit optionalem Wettersensor schlie\u00dfen sich die Lamellen bei beginnendem Niederschlag in unter 30 Sekunden automatisch.",
          "Lamellend\u00e4cher Q-Bus starten bei 17.560 \u20ac (2,2 \u00d7 1,8 m, Basis) und reichen bei Vollausstattung mit LED dimmbar, Zip-Screens und Glasschiebew\u00e4nden bis 45.000\u201350.000 \u20ac. Wirtschaftlich rechnen sie sich \u00fcber die Nutzungsdauer: w\u00e4hrend Markisen 4\u20135 Monate und Stoffpergolen 5\u20136 Monate im Einsatz sind, l\u00e4uft das Lamellendach 12 Monate. Bei 30+ Jahren Lebensdauer der Aluminium-Konstruktion ergibt sich eine deutlich niedrigere Kosten-pro-Nutzungstag-Rechnung als bei einer alle 12\u201315 Jahre zu erneuernden Markise.",
        ],
      },
      {
        heading: { text: "Direkter Vergleich" },
        table: {
          columns: ["Merkmal", "Markise", "Pergola (Stoff)", "Lamellendach"],
          rows: [
            ["Sonnenschutz", "Ja", "Ja", "Ja, regulierbar"],
            ["Regenschutz", "Nein", "Nein (Stoff)", "Ja, wasserdicht"],
            ["Maße", "bis 7 × 4 m", "bis 6 × 4 m", "bis 5,5 × 4,6 m je Modul"],
            ["Windklasse", "5", "5", "5+ (geschlossen)"],
            ["Preis", "3.880–8.950 €", "8.000–15.000 €", "17.560–50.000 €"],
            ["Lebensdauer", "10–15 Jahre", "15–20 Jahre", "30+ Jahre"],
            ["Genehmigung BW", "≤ 30 m² frei", "Bauanzeige möglich", "Bauanzeige möglich"],
            ["Nutzungsmonate", "4–5 / Jahr", "5–6 / Jahr", "12 / Jahr"],
          ],
        },
      },
      {
        heading: { text: "Welche Kombinationen sind sinnvoll?" },
        paragraphs: [
          "Pro-Line-Glasdach mit Aufglasmarkise ist die wirtschaftlichste Kombination f\u00fcr klassische Hausterrassen mit Wandanschluss. Das Glasdach sch\u00fctzt vor Regen, die Markise reduziert Hitze unter Glas um 30\u201350 %. Gesamtinvestition ca. 21.000 \u20ac, Nutzung 7\u20138 Monate, Genehmigungspflicht erst ab 30 m\u00b2.",
          "Lamellendach mit Zip-Screens und Glasschiebew\u00e4nden ist die Premium-Komplettl\u00f6sung f\u00fcr ganzj\u00e4hrige Outdoor-Nutzung. In Verbindung mit einer Au\u00dfen-Heizung wird das Lamellendach zum vollwertigen Outdoor-Wohnzimmer. Investition 40.000\u201350.000 \u20ac, Nutzung 12 Monate, Genehmigung als bauliche Anlage \u00fcber 30 m\u00b2 oder ab 3 m H\u00f6he in BW.",
          "Pergola mit Stoffsegel ist die rein optische und Sommer-Lounge-orientierte L\u00f6sung. Sie passt zu mediterran inspirierten G\u00e4rten oder Garten-Pavillons in Ulmer Vororten wie Eselsberg-Lehr oder Wiblingen. Wirtschaftlich nur sinnvoll, wenn das Stoffsegel als Architektur-Statement gewollt ist \u2014 funktional schl\u00e4gt eine Aufglasmarkise auf einem Pro-Line-Dach diese Variante in fast jeder Disziplin.",
        ],
      },
      {
        heading: { text: "Drei Praxis-Beispiele aus dem Brait-Service-Gebiet" },
        paragraphs: [
          "Familie aus Ulm-S\u00f6flingen, Doppelhaush\u00e4lfte mit S\u00fcdterrasse 4 \u00d7 3 m: Wir haben eine Pro-Line-\u00dcberdachung mit VSG-Glasdach (14.590 \u20ac) plus Aufglasmarkise (6.540 \u20ac) montiert. Gesamt 21.130 \u20ac. Ergebnis: ganzj\u00e4hriger Regenschutz, im Sommer 60 % weniger Hitze unter dem Dach. Amortisation \u00fcber Strom-Ersparnis Klimaanlage und gewonnene Au\u00dfen-Wohnfl\u00e4che innerhalb von 12\u201316 Jahren.",
          "Architektenpaar in Neu-Ulm, freistehende Garten-Lounge 5 \u00d7 4 m ohne Hausanschluss: Q-Bus Lamellen-Pergola in Anthrazit RAL 7016 mit LED-Beleuchtung, drei Zip-Screens und Heizstrahler. Investition ca. 50.500 \u20ac. Nutzung von M\u00e4rz bis Oktober als regul\u00e4rer Au\u00dfenraum, im Winter mit Heizung als Lounge.",
          "Hotelbetrieb in Memmingen, Au\u00dfengastronomie 8 \u00d7 6 m: Lamellendach mit Glasschiebew\u00e4nden, Zip-Screens und Heizstrahlern \u2014 als 365-Tage-Gastronomieerweiterung. Investition ca. 80.000 \u20ac, Amortisation \u00fcber zus\u00e4tzliche Sitzpl\u00e4tze in der Schulterzeit (April, Oktober) innerhalb der ersten Saison.",
        ],
      },
      {
        heading: { text: "Welche L\u00f6sung f\u00fcr welches Budget?" },
        bullets: [
          "Bis 9.000 \u20ac: Gelenkarm- oder Senkrechtmarkise. Reiner Sommer-Sonnenschutz.",
          "11.000\u201321.000 \u20ac: Pro-Line-Glasdach allein oder mit Aufglasmarkise. Regenschutz + Hitzereduktion.",
          "12.000\u201320.000 \u20ac: Cube freistehend oder Pergola mit Stoffsegel. Architektur-Statement.",
          "20.000\u201338.000 \u20ac: Lamellendach mit Standard-Optionen (Wettersensor, Funkfernbedienung, Zip-Screen).",
          "38.000+ \u20ac: Lamellendach mit Vollausstattung \u2014 Glasschiebew\u00e4nde, LED, Heizung, Au\u00dfen-K\u00fcche-Anbindung.",
        ],
      },
    ],
    related: [
      "welche-terrassenueberdachung-passt-zu-ihrem-haus",
      "was-kostet-eine-terrassenueberdachung-in-ulm",
      "energie-sparen-mit-markisen",
    ],
    relatedProducts: [
      { label: "Markisen", href: "/markisen" },
      { label: "Q-Bus Lamellen-Pergola", href: "/q-bus" },
    ],
    keywords: [
      "Markise vs Pergola",
      "Lamellendach Vergleich",
      "Pergola Pro Contra",
      "bioklimatische Pergola",
      "Sonnenschutz Outdoor Vergleich",
    ],
  },

  {
    slug: "was-kostet-eine-terrassenueberdachung-in-ulm",
    title: "Was kostet eine Terrassenüberdachung in Ulm? Preisleitfaden 2026",
    description:
      "Realistische Preise für Terrassenüberdachungen in Ulm und Umgebung — Pro-Line, Cube, Lamellendach inkl. Montage. Faktoren wie Größe, Glas, Optionen und versteckte Kosten transparent erklärt.",
    category: "Preise",
    publishedAt: "2026-04-08",
    readingMinutes: 8,
    image: "/catalog/cube-1.jpg",
    imageAlt: "Brait Cube Terrassenüberdachung Preisbeispiel Ulm",
    tldr: "Eine Aluminium-Terrassenüberdachung in Ulm startet bei 8.730 € (Pro-Line wandbefestigt, 4 × 3 m, zzgl. Dacheindeckung und Montage) und reicht bis rund 50.000 € (Lamellendach 5 × 4 m mit LED, Zip-Screen und Glasschiebewänden). Die Hauptpreistreiber sind Größe, Konstruktionstyp, Dachmaterial (Polycarbonat vs. VSG-Glas), Statik (Schneelastzone) und Verschattung. Die Montage durch das eigene Brait-Team wird separat kalkuliert (typisch 2.000–3.000 €, komplexe Projekte bis 5.000 €).",
    sections: [
      {
        factBox: {
          title: "Preisspannen 2026 (zzgl. Montage)",
          items: [
            "Pro-Line wandbefestigt 4 × 3 m: 8.730 – 13.500 € (ohne Dacheindeckung bis VSG-Glas + Extras)",
            "Pro-Line wandbefestigt 5 × 3 m: 10.290 – 15.000 €",
            "Cube freistehend 4 × 3 m: ca. 10.300 – 16.000 €",
            "Lamellendach Q-Bus 4 × 3 m: 24.860 – 30.000 €",
            "Lamellendach Vollausstattung 5 × 4 m: 45.000 – 50.000 €",
            "Glashaus = Pro-Line/Cube + 3 Glasschiebewände: +6.000 – 9.000 €",
          ],
        },
      },
      {
        heading: { text: "Welche Faktoren bestimmen den Preis?" },
        bullets: [
          "Größe: Verdoppelung der Fläche kostet etwa 60–70 % mehr (Skaleneffekt).",
          "Konstruktionstyp: Cube ist 15–20 % teurer als Pro-Line bei gleicher Fläche.",
          "Glas: VSG 8–10 mm Standard, satiniertes oder Sonnenschutzglas +15–25 %.",
          "Schneelastzone: Höhenlagen Schwäbische Alb (Zone 3) +8–12 %.",
          "Sonderfarben: RAL-Maßanfertigung statt Standardfarbe +5 %.",
          "Verschattung: Aufglasmarkise +3.760–7.010 €, Zip-Screens je Seite +3.180–4.840 €.",
          "Beleuchtung: LED-Streifen entlang der Lamellen +3.440–3.680 €.",
          "Glasschiebewände: +5.750 € je Seite (satiniert +7.670 €).",
        ],
      },
      {
        heading: { text: "Was ist im Brait-Preis enthalten?" },
        paragraphs: [
          "Bei Brait Überdachungen sind in jedem Festpreis-Angebot enthalten: digitales 3D-Aufmaß, statische Berechnung für Ihre Schneelastzone, Anlieferung, Montage durch eigenes Team (1–4 Tage, als separate Position kalkuliert: typisch 2.000–3.000 €, komplexe Projekte bis 5.000 €), Endabnahme mit Funktionsprüfung. Es gibt keine Folgekosten für „Statiker\u201c oder „Spezialwerkzeug\u201c — alles ist im Festpreis abgedeckt.",
          "Was nicht enthalten ist: bauliche Vorarbeiten am Untergrund (Pflastern, Fundament gießen), Stromanschluss zum Motor, Trockenlegung der Wand bei Wandanschluss in Bestandsgebäuden mit beschädigtem Putz. Diese Kosten klären wir beim Vor-Ort-Termin transparent.",
        ],
      },
      {
        heading: { text: "Beispiel-Kalkulationen" },
        table: {
          columns: ["Konfiguration", "Preis"],
          rows: [
            ["Pro-Line 4 × 3 m, ohne Dacheindeckung, Anthrazit (Einstieg)", "8.730 €"],
            ["Pro-Line 5 × 3 m, ohne Dacheindeckung (Einstiegs-Bestseller)", "10.290 €"],
            ["Pro-Line 5 × 3 m, VSG-Klarglas, Anthrazit", "13.650 €"],
            ["Pro-Line 6 × 4 m, VSG-Klarglas", "17.780 €"],
            ["Cube 4 × 3,5 m, VSG, freistehend", "ca. 15.200 €"],
            ["Cube 5 × 4 m, VSG, mit Aufglasmarkise", "ca. 25.700 €"],
            ["Lamellendach 4 × 3 m, Standard", "24.860 €"],
            ["Lamellendach 5 × 4 m, LED + Wettersensor + Glasschiebewand vorne", "36.880 €"],
            ["Glashaus = Pro-Line + 3 Glasschiebewände", "21.150 €"],
          ],
        },
      },
      {
        heading: { text: "Wie wird die Investition günstiger?" },
        paragraphs: [
          "Standardmaße bevorzugen: Sondergrößen kosten 5–8 % mehr als Standardraster.",
          "Standardfarbe wählen: Anthrazit RAL 7016 ist die häufigste Wahl und kommt direkt aus der Standardproduktion.",
          "Erweiterungen modular planen: Sie müssen Glasschiebewände, LED, Zip-Screens nicht sofort kaufen. Pro-Line-Profile sind so vorbereitet, dass alles später nachgerüstet werden kann.",
          "Frühjahrsangebot nutzen: zwischen Februar und April liefern wir oft mit kürzeren Lieferzeiten und gelegentlich mit Sonderkonditionen.",
        ],
      },
      {
        heading: { text: "Was Sie beachten sollten" },
        paragraphs: [
          "Misstrauen Sie Anbieter-Preisen unter 5.000 € für eine 4 × 3 m Terrassenüberdachung. Das geht nur mit Stahl + Polycarbonat, ohne Statik-Nachweis und ohne richtige Wandanschluss-Konstruktion. Reparaturkosten in 5–10 Jahren übersteigen die Ersparnis.",
          "Lassen Sie sich Festpreis-Angebote geben — keine „Schätzungen\u201c. Brait gibt jedes Angebot mit verbindlichem Endpreis ab, sobald das digitale 3D-Aufmaß gemacht ist.",
        ],
      },
    ],
    related: [
      "welche-terrassenueberdachung-passt-zu-ihrem-haus",
      "genehmigung-terrassendach-baden-wuerttemberg",
    ],
    relatedProducts: [
      { label: "Terrassenüberdachungen", href: "/terrassenueberdachungen" },
      { label: "Konfigurator", href: "/konfigurator" },
    ],
    keywords: [
      "Terrassenüberdachung Preis Ulm",
      "Was kostet Terrassendach",
      "Lamellendach Kosten",
      "Brait Preise",
    ],
  },

  {
    slug: "genehmigung-terrassendach-baden-wuerttemberg",
    title: "Genehmigung Terrassendach in Baden-Württemberg — Schritt für Schritt",
    description:
      "Brauche ich eine Baugenehmigung für meine Terrassenüberdachung in BW? LBO-Regeln, verfahrensfreie Größen, Bauanzeige-Pflicht und die Sonderfälle Denkmalschutz, B-Plan und Mietobjekt klar erklärt — inklusive Kosten, Bearbeitungszeiten und Praxisbeispielen aus Ulm, Reutlingen und Heidenheim.",
    category: "Recht",
    publishedAt: "2026-04-12",
    readingMinutes: 11,
    image: "/catalog/proline-2.jpg",
    imageAlt: "Brait Pro-Line Terrassenüberdachung baden-württembergisch konform",
    tldr: "In Baden-Württemberg sind Terrassenüberdachungen bis 30 m\u00b2 Grundfläche und 3 m Tiefe ab Hauswand verfahrensfrei (§50 LBO BW Anlage 1). Größere Anlagen, B-Plan-Gebiete und denkmalgeschützte Objekte benötigen eine Kenntnisgabe (§51 LBO) oder Baugenehmigung (§49 LBO) — Bearbeitungszeit 4\u20138 Wochen, Behördengebühr 150\u2013450 \u20ac. Mietobjekte erfordern immer schriftliche Vermieter-Zustimmung; in WEG zusätzlich Eigentümerbeschluss. Brait übernimmt bei Genehmigungspflicht die komplette Behörden-Kommunikation für 350\u2013650 \u20ac pauschal.",
    sections: [
      {
        heading: { text: "Welche Anlagen sind in BW verfahrensfrei?" },
        paragraphs: [
          "Eine Terrassenüberdachung in Baden-Württemberg ist verfahrensfrei, wenn sie alle sechs Grenzwerte aus \u00a750 LBO Anlage 1 Nr. 1 c) gleichzeitig einhält: maximal 30 m\u00b2 Grundfläche, maximal 3 m Tiefe ab Außenwand, maximal 3 m Höhe über Geländeoberkante, keine Nutzungsänderung der Hauswand, außerhalb förmlich festgesetzter Sanierungsgebiete und nicht an einem denkmalgeschützten Gebäude. Verfahrensfrei bedeutet konkret: kein Antrag, keine Gebühren, kein Wartezeit \u2014 aber alle baurechtlichen Anforderungen (Statik, Abstandsflächen, Brandschutz) gelten trotzdem.",
          "Diese 30-m\u00b2-Grenze ist absolut. Sie umfasst die gesamte überdachte Fläche, also auch eine vorgelagerte Markise oder ein angesetztes Glashaus. Wer 30,5 m\u00b2 baut, ist genehmigungspflichtig — selbst wenn die Konstruktion sonst alle Kriterien erfüllt. In der Praxis empfehlen wir, bei der Planung 1\u20132 m\u00b2 Reserve zur Grenze zu lassen, damit kleine Maßabweichungen bei der Montage keine nachträgliche Bauanzeige auslösen.",
        ],
        bullets: [
          "Grundfläche maximal 30 m\u00b2 (gesamte überdachte Fläche)",
          "Tiefe ab Außenwand maximal 3 m",
          "Höhe maximal 3 m über Geländeoberkante",
          "Keine Nutzungsänderung der tragenden Hauswand",
          "Außerhalb von förmlich festgesetzten Sanierungsgebieten",
          "Nicht an denkmalgeschützten Gebäuden (DSchG BW \u00a72)",
          "Mindestabstand 2,5 m zur Nachbargrenze (\u00a75 LBO BW)",
        ],
        factBox: {
          title: "Faustformel für die schnelle Einschätzung",
          items: [
            "Bis 5 \u00d7 6 m freistehend: ohne Antrag.",
            "Bis 7,5 \u00d7 4 m wandbefestigt: ohne Antrag.",
            "Größer oder höher: Kenntnisgabe nach \u00a751 LBO.",
            "Ab \u2248 60 m\u00b2 oder über 7 m hoch: vollständige Baugenehmigung nach \u00a749 LBO.",
          ],
        },
      },
      {
        heading: { text: "Wann ist eine Bauanzeige nötig — und was kostet sie?" },
        paragraphs: [
          "Eine Bauanzeige in Baden-Württemberg ist erforderlich, sobald eine der sechs Verfahrensfrei-Grenzen überschritten wird. Im Klartext: Sie reichen einen vereinfachten Bauantrag (\u201eKenntnisgabeverfahren\u201c nach \u00a751 LBO) beim zuständigen Bauamt ein \u2014 also Stadtbauamt in kreisfreien Städten wie Ulm und Heidenheim, Landratsamt in den Landkreisen Alb-Donau, Reutlingen, Tübingen, Heidenheim und Göppingen. Erforderliche Unterlagen sind Lageplan im Maßstab 1:500, Bauzeichnung 1:100 (Grundriss, Ansicht, Schnitt), prüffähige Statik durch einen anerkannten Tragwerksplaner und eine Baubeschreibung.",
          "Die Bearbeitungszeit liegt nach unserer Erfahrung bei 4\u20138 Wochen, in Ulm aktuell durchschnittlich 5,5 Wochen, im Landratsamt Alb-Donau 6\u20137 Wochen. Behördengebühren bewegen sich zwischen 150 und 450 \u20ac, abhängig vom Bauwert (in BW i.\u202fd.\u202fR. 0,5\u20131,5 % der Bausumme nach LGebG). Bei Anlagen über 60 m\u00b2 oder mit besonderer Konstruktion (Glashäuser mit Schiebewänden, Pergolen mit Heizung) wird ein vollständiges Baugenehmigungsverfahren nach \u00a749 LBO fällig \u2014 längere Bearbeitung (8\u201312 Wochen) und höhere Gebühren (400\u20131.200 \u20ac).",
          "Praktisch heißt das: Wer im Frühjahr eine größere Pergola montieren möchte, sollte den Antrag spätestens Ende Januar einreichen. Bei Brait übernehmen wir auf Wunsch die komplette Antragsstellung inklusive aller Zeichnungen und der prüffähigen Statik unseres Tragwerksplaners \u2014 pauschal 350\u2013650 \u20ac, abhängig von Behörde und Komplexität.",
        ],
        factBox: {
          title: "Kosten- und Zeit-Übersicht (Stand 2026)",
          items: [
            "Kenntnisgabe \u00a751 LBO: 150\u2013450 \u20ac Gebühr, 4\u20138 Wochen Bearbeitung.",
            "Baugenehmigung \u00a749 LBO: 400\u20131.200 \u20ac Gebühr, 8\u201312 Wochen Bearbeitung.",
            "Statik durch Tragwerksplaner: 250\u2013450 \u20ac.",
            "Brait-Servicepauschale (komplette Antragsbearbeitung): 350\u2013650 \u20ac.",
            "Gesamt-Mehrkosten gegenüber verfahrensfreier Anlage: ca. 750\u20132.500 \u20ac.",
          ],
        },
      },
      {
        heading: { text: "Sonderfall Denkmalschutz: Ulmer Altstadt, Söflingen, Wiblingen" },
        paragraphs: [
          "An denkmalgeschützten Häusern ist in Baden-Württemberg jede Terrassenüberdachung genehmigungspflichtig \u2014 unabhängig von der Größe. Maßgeblich ist \u00a78 DSchG BW: Vor jedem Bau, jeder baulichen Änderung und jeder beeinträchtigenden Maßnahme ist eine denkmalrechtliche Erlaubnis nötig. In Ulm betrifft das die Altstadt rund um Münsterplatz und Fischerviertel, große Teile von Söflingen, das Wiblinger Klosterensemble und einzelne historische Bauten in der Weststadt. Außerhalb Ulms relevant: Ehinger Altstadt, Reutlinger Achalm-Hangbebauung und das Augsburger Bahnhofsviertel.",
          "Die untere Denkmalschutzbehörde (in Stadtkreisen das Bauamt, in Landkreisen das Landratsamt) prüft das Erscheinungsbild und holt bei Bedarf eine Stellungnahme des Landesamts für Denkmalpflege ein. Erfahrungsgemäß werden zurückhaltende Konstruktionen häufiger genehmigt: Pro-Line in Anthrazit RAL 7016 mit schmalen 60-mm-Profilen passiert das Verfahren in Ulm in etwa 70 % der Fälle problemlos. Cube-Konstruktionen in glänzendem Schwarz, sichtbare Lamellen oder LED-Beleuchtung werden häufiger abgelehnt oder mit Auflagen versehen (mattes Finish, gedämpfte LED, geringere Höhe).",
          "Tipp aus der Praxis: Vor dem Antrag ein 30-minütiges Vorgespräch mit der Denkmalschutzbehörde vereinbaren \u2014 in Ulm ist das kostenfrei und spart oft 4\u20136 Wochen, weil Sie die Bedenken direkt in den Antrag einarbeiten können.",
        ],
      },
      {
        heading: { text: "Sonderfall B-Plan-Gebiet (Neubaugebiete)" },
        paragraphs: [
          "In Bebauungsplangebieten gelten zusätzlich zur LBO die Festsetzungen des B-Plans, die die Verfahrensfreiheit häufig einschränken oder aufheben. Typische Vorgaben: zulässige Materialien, Dachneigung (oft 0\u201310\u00b0 oder 30\u201345\u00b0), Position innerhalb der Baufenster, Farbgebung (RAL-Vorgaben oder Verbot bestimmter Glanzgrade), maximale Firsthöhe, Pflicht zur Anpassung an die Hauptdachform. In Ulmer Neubaugebieten wie Ulm-Eselsberg-Süd, Wiblingen-Tannenplatz oder den Allewinden-Quartieren in Neu-Ulm ist die Vorgabe Anthrazit RAL 7016 oder Verkehrsweiß RAL 9016 üblich.",
          "Ein B-Plan-Auszug ist beim Bauamt der Gemeinde meist innerhalb von 1\u20133 Werktagen kostenlos oder gegen 5\u201320 \u20ac erhältlich. Wir prüfen den B-Plan vor jedem Auftrag und identifizieren Konflikte (z.\u202fB. Material, Farbe, Position) \u2014 bei klaren Konflikten passen wir das Angebot an oder klären eine Befreiung nach \u00a731 BauGB im Vorfeld.",
        ],
      },
      {
        heading: { text: "Sonderfall Mietobjekt und Eigentümergemeinschaft (WEG)" },
        paragraphs: [
          "In Mietwohnungen und gemieteten Einfamilienhäusern ist die schriftliche Zustimmung des Vermieters in jedem Fall Pflicht \u2014 unabhängig von der Größe und der Verfahrensfreiheit nach LBO. Rechtsgrundlage: \u00a7541 BGB (bauliche Veränderungen) sowie BGH-Urteile zu Substanzeingriffen. Die Zustimmung sollte schriftlich erfolgen, idealerweise mit den drei Argumenten: vollständig rückbaubar (kein dauerhafter Substanzeingriff), keine Eingriffe in tragende Bauteile, dokumentierte Wertaufbesserung des Objekts. Brait liefert auf Wunsch ein zweiseitiges Datenblatt mit technischen Spezifikationen, das diese drei Punkte sauber belegt.",
          "In Wohnungseigentümergemeinschaften (WEG) gilt zusätzlich \u00a720 WEG: Bauliche Veränderungen am Gemeinschaftseigentum benötigen einen Eigentümerbeschluss mit einfacher Mehrheit. Eine Terrassenüberdachung an der Außenfassade gilt fast immer als Eingriff ins Gemeinschaftseigentum, selbst wenn sie nur über einer Sondernutzungsfläche errichtet wird. Praktisch: der Antrag muss rechtzeitig vor der nächsten Eigentümerversammlung schriftlich eingereicht werden, ergänzt um Bauzeichnung und Materialspezifikation. In Ulm typische Bearbeitungszeit zwischen Antrag und Beschluss: 3\u20136 Monate.",
        ],
      },
      {
        heading: { text: "Häufige Ablehnungsgründe und wie Sie sie vermeiden" },
        paragraphs: [
          "Aus unserer Praxis in Ulm und Umgebung sind drei Fehler für etwa 80 % aller abgelehnten oder verzögerten Anträge verantwortlich. Erstens: zu geringer Grenzabstand. \u00a75 LBO BW verlangt 2,5 m zur Nachbargrenze, B-Pläne fordern oft mehr (3\u20135 m). Eine zu nah geplante Konstruktion wird abgelehnt oder erfordert eine Ausnahme nach \u00a76 LBO mit Nachbarzustimmung.",
          "Zweitens: fehlende oder mangelhafte Statik. Ohne prüffähige Berechnung des Tragwerks (Schneelast nach DIN EN 1991-1-3, Wind nach DIN EN 1991-1-4) wird kein Antrag bewilligt. In Höhenlagen der Schwäbischen Alb (ab 600 m, z.\u202fB. Sonnenbühl, Bad Urach) ist Schneelastzone 3 (1,82 kN/m\u00b2) statt der üblichen Zone 2a anzusetzen \u2014 das verlangt verstärkte Profile.",
          "Drittens: B-Plan-Konflikte, die nicht im Vorfeld geklärt wurden. Wir empfehlen, bei jedem Vorhaben in Neubaugebieten oder Sanierungssatzungen vor der Bestellung den B-Plan einzusehen und Konflikte mit dem Bauamt durchzusprechen. Eine Befreiung nach \u00a731 BauGB ist möglich, kostet aber 100\u2013300 \u20ac extra und verlängert die Bearbeitung um 2\u20134 Wochen.",
        ],
      },
      {
        heading: { text: "Was übernimmt Brait konkret?" },
        paragraphs: [
          "Brait übernimmt für Sie zwei klar getrennte Leistungen: Bei verfahrensfreien Anlagen (\u2264 30 m\u00b2) liefern wir kostenlos eine schriftliche Bestätigung der Verfahrensfreiheit \u2014 das ist Ihr Nachweis bei späteren Hausverkäufen, Versicherungsfällen oder Nachbarschaftsstreit. Bei genehmigungspflichtigen Anlagen erstellen wir auf Wunsch alle Bauunterlagen (Lageplan 1:500, Bauzeichnung 1:100, Schnitte, Ansichten), beauftragen die prüffähige Statik bei unserem Tragwerksplaner und reichen den vollständigen Antrag in Ihrem Auftrag bei der Behörde ein.",
          "Pauschalpreis für die komplette Antragsbearbeitung: 350\u2013650 \u20ac, abhängig von Behörde, Komplexität und ob B-Plan-Befreiung erforderlich ist. Im Preis enthalten: zwei Behördentermine, alle Korrekturen während des Verfahrens und die Endabnahme nach Fertigstellung. Nicht enthalten: Behördengebühren, Statiker-Honorar (250\u2013450 \u20ac, direkt mit dem Tragwerksplaner abgerechnet) und ggf. Vermessungskosten.",
        ],
        factBox: {
          title: "Checkliste vor der Bestellung",
          items: [
            "Maße prüfen: bleibt die Grundfläche unter 30 m\u00b2 mit Sicherheitspuffer?",
            "Grenzabstand: mindestens 2,5 m zur Nachbargrenze (LBO), B-Plan kann mehr fordern.",
            "B-Plan-Auszug beim Bauamt anfordern (Bearbeitung 1\u20133 Werktage).",
            "Bei Mietobjekt: schriftliche Vermieter-Zustimmung sichern.",
            "Bei WEG: Antrag für nächste Eigentümerversammlung vorbereiten.",
            "Bei Denkmalschutz: 30-Min-Vorgespräch mit unterer Denkmalschutzbehörde.",
            "Höhenlage prüfen: Schneelastzone 2a, 3 oder 4? (relevant ab \u2248 600 m).",
          ],
        },
      },
    ],
    related: [
      "was-kostet-eine-terrassenueberdachung-in-ulm",
      "schneelast-in-sueddeutschland",
    ],
    relatedProducts: [
      { label: "Service & Montage", href: "/service" },
      { label: "Kontakt", href: "/kontakt" },
    ],
    keywords: [
      "Terrassendach Genehmigung BW",
      "Bauanzeige Terrassenüberdachung Baden-Württemberg",
      "LBO Baden-Württemberg \u00a750",
      "Kenntnisgabeverfahren Terrassenüberdachung",
      "Denkmalschutz Terrassendach Ulm",
      "B-Plan Terrassenüberdachung",
      "WEG Terrassenüberdachung Beschluss",
    ],
  },

  {
    slug: "schneelast-in-sueddeutschland",
    title: "Schneelast in S\u00fcddeutschland \u2014 was Sie bei der Auswahl beachten m\u00fcssen",
    description:
      "Schneelastzonen in Bayern und Baden-W\u00fcrttemberg, Bemessung nach DIN EN 1991-1-3, was 200 kg/m\u00b2 wirklich bedeuten \u2014 und warum H\u00f6henlagen der Schw\u00e4bischen Alb besondere Statik brauchen. Mit Standortlisten, Form-Beiwerten und Praxis-F\u00e4llen.",
    category: "Material",
    publishedAt: "2026-04-15",
    readingMinutes: 9,
    image: "/catalog/lamellendach-2.jpg",
    imageAlt: "Brait Lamellendach mit Schneelast in Ulm und auf der Schw\u00e4bischen Alb",
    tldr: "S\u00fcddeutschland f\u00e4llt \u00fcberwiegend in Schneelastzone 2 oder 2a (charakteristische Bodenschneelast 0,85\u20131,32 kN/m\u00b2), H\u00f6henlagen der Schw\u00e4bischen Alb ab 600 m in Zone 3 (1,89\u20133,2 kN/m\u00b2). Brait-Standardstatik tr\u00e4gt 200 kg/m\u00b2 Dachlast \u2014 das deckt die meisten Lagen im Service-Gebiet ab. Bei H\u00f6henlagen, Sondergr\u00f6\u00dfen oder Schiebewand-Konstruktionen rechnen wir individuell nach DIN EN 1991-1-3. Lamellend\u00e4cher m\u00fcssen bei Schneefall in 135\u00b0-Stellung geschlossen werden, damit der Schnee abrutscht statt sich anzusammeln.",
    sections: [
      {
        heading: { text: "Was bedeutet eine Schneelastzone konkret?" },
        paragraphs: [
          "Eine Schneelastzone ist ein in DIN EN 1991-1-3 (sowie der \u00e4lteren DIN 1055-5) festgelegter Wert f\u00fcr die charakteristische Bodenschneelast in kN/m\u00b2 \u2014 also die Schneemasse, die in dieser Region statistisch einmal in 50 Jahren erreicht wird. Deutschland ist in 5 Zonen unterteilt: 1 (k\u00fcstennahe, niedrigste Belastung), 1a, 2, 2a, 3 (alpennahe und H\u00f6henlagen). Die Zone gibt nur den Boden-Wert an; auf der konkreten H\u00f6he Ihres Grundst\u00fccks wird der Wert per H\u00f6henformel skaliert: je h\u00f6her, desto mehr Schnee.",
          "Aus der Bodenschneelast wird die Dachschneelast \u00fcber einen Form-Beiwert \u00b5 ermittelt. Flachd\u00e4cher (Brait Pro-Line bis 5\u00b0 Neigung, Cube, Lamellendach) haben \u00b5 = 0,8 nach Eurocode. Bei einer Bodenschneelast von 1,32 kN/m\u00b2 (Zone 2a, typisch f\u00fcr Ulm und Neu-Ulm) ergibt das 1,06 kN/m\u00b2 \u224820 108 kg/m\u00b2 Dachlast. Brait dimensioniert grunds\u00e4tzlich mindestens auf 200 kg/m\u00b2 \u2014 das ist die fast doppelte Sicherheit gegen\u00fcber Eurocode-Mindestanforderung und deckt auch ungew\u00f6hnliche Schnee-Ereignisse ab.",
        ],
        factBox: {
          title: "Schnellabsch\u00e4tzung Bodenschneelast",
          items: [
            "Zone 1 (Norddeutschland): 0,65 kN/m\u00b2 \u2248 66 kg/m\u00b2",
            "Zone 1a (\u00fcbergangs): 0,85 kN/m\u00b2 \u2248 87 kg/m\u00b2",
            "Zone 2 (Mitte/S\u00fcd): 0,85\u20131,12 kN/m\u00b2",
            "Zone 2a (Ulm, Augsburg, Memmingen): 1,32 kN/m\u00b2 \u2248 135 kg/m\u00b2",
            "Zone 3 (Alpenvorland, Alb \u22656 600 m): 1,89\u20133,2 kN/m\u00b2",
            "Brait-Standardstatik: 200 kg/m\u00b2 Dachlast (Sicherheit \u2248 1,8\u00d7 Eurocode-Mindestwert)",
          ],
        },
      },
      {
        heading: { text: "Wo liegt das Brait-Service-Gebiet auf der Zonen-Karte?" },
        paragraphs: [
          "Das Brait-Kerngebiet im 100-km-Umkreis um Ulm verteilt sich auf zwei Bundesl\u00e4nder und drei Schneelastzonen. Die Mehrheit unserer Standorte liegt in Zone 2a, wo unsere Standardstatik mit 200 kg/m\u00b2 deutlich \u00fcberdimensioniert ist. Kritisch wird es nur in den H\u00f6henlagen \u2014 ab etwa 600 m H\u00f6he kippt die Zuordnung in Zone 3 mit deutlich h\u00f6heren Bodenwerten.",
        ],
        bullets: [
          "Ulm (478 m), Neu-Ulm (469 m), Memmingen (601 m), Augsburg (494 m): Zone 2a, 1,32 kN/m\u00b2",
          "Heidenheim (504 m), Aalen (433 m), G\u00f6ppingen (323 m): Zone 2a, 1,12\u20131,32 kN/m\u00b2",
          "Reutlingen (382 m), T\u00fcbingen (341 m): Zone 2, 0,85 kN/m\u00b2",
          "Sonnenb\u00fchl, Bad Urach (Lagen 700\u2013880 m): Zone 3, 1,89\u20132,4 kN/m\u00b2",
          "Heroldstatt-Ennabeuren (754 m): Zone 3 (h\u00f6chster Brait-Bauort bisher) \u2014 individuell verst\u00e4rkt",
          "Berghof (Schw\u00e4bische Alb, 800 m): Zone 3, 2,2 kN/m\u00b2 \u2014 verst\u00e4rkte Sparren erforderlich",
        ],
      },
      {
        heading: { text: "Was passiert bei \u00dcberlastung?" },
        paragraphs: [
          "Bei nicht statisch berechneten Konstruktionen \u2014 typischerweise Billig-Importware aus Polen oder Tschechien mit pauschalen 100\u2013150 kg/m\u00b2 \u2014 kann es bei einem ungew\u00f6hnlich starken Schneefall zum Versagen kommen. Beispiel: 1,5 m Pulverschnee mit Schmelzwasser-Anteil hat eine Dichte von ca. 200\u2013300 kg/m\u00b3, ergibt also 300\u2013450 kg/m\u00b2 \u2014 das \u00dcberschreitet eine 150-kg/m\u00b2-Konstruktion um den Faktor 2\u20133. Folgen: Pfosten knicken, Sparren brechen, Glas rei\u00dft, Wasserabl\u00e4ufe verstopfen.",
          "Brait-Konstruktionen sind durch individuelle Tragwerksberechnung nach Eurocode 1 (DIN EN 1991-1-3) gesichert. Wir berechnen jede Anlage f\u00fcr Ihre exakte Schneelast \u2014 inkl. Bodenwert, H\u00f6henkorrektur, Form-Beiwert, Pfostenraster und Glasdimensionierung. Bei Bedarf verst\u00e4rken wir Sparren von 60 \u00d7 40 mm auf 80 \u00d7 60 mm, erg\u00e4nzen Mittelst\u00fctzen, oder erh\u00f6hen die Pfosten-Dimension von 12 \u00d7 12 cm auf 15 \u00d7 15 cm bzw. 18 \u00d7 18 cm. Mehrkosten gegen\u00fcber Standardstatik: 8\u201312 % bei Zone 3, plus ca. 250 \u20ac f\u00fcr die individuelle Statik.",
        ],
      },
      {
        heading: { text: "Versicherung und Schadensf\u00e4lle" },
        paragraphs: [
          "Geb\u00e4udeversicherungen decken in der Regel Sturm- und Hagelsch\u00e4den ab Windst\u00e4rke 8 ab. Schneedrucksch\u00e4den fallen unter \u201eSchneedruck\u201c und sind je nach Police separat zu versichern. F\u00fcr Brait-Anlagen empfehlen wir die Aufnahme in die Wohngeb\u00e4udeversicherung als \u201efest verbundene bauliche Anlage\u201c \u2014 wir liefern auf Wunsch ein Datenblatt mit Konstruktion, Statik und Bauwert f\u00fcr Ihre Versicherung.",
          "Im (sehr seltenen) Schadensfall reagiert Brait innerhalb von 24 Stunden mit Begutachtung vor Ort. In 30 Jahren Praxis hatten wir bei statisch korrekt dimensionierten Anlagen genau null Versagensf\u00e4lle durch Schneelast \u2014 dokumentiert auch im h\u00e4rtesten Winter 2018/19, als auf der Schw\u00e4bischen Alb \u00fcber 80 cm Schnee mit hohem Wasseranteil fiel.",
        ],
      },
      {
        heading: { text: "Lamellendach im Winter \u2014 was tun?" },
        paragraphs: [
          "Ein Lamellendach muss bei beginnendem Schneefall in die 135\u00b0-Position (\u201egeschlossen\u201c) gefahren werden. In dieser Stellung \u00fcberlappen die Aluminium-Lamellen und bilden eine fast geschlossene Dachfl\u00e4che, von der Schnee genauso abrutscht wie von einem Glasdach. Ge\u00f6ffnete oder halbge\u00f6ffnete Lamellen wirken dagegen wie Auffangrinnen \u2014 Schnee sammelt sich in den Profilen, schmilzt teilweise an, gefriert nachts wieder und kann die Mechanik beim n\u00e4chsten \u00d6ffnungsversuch \u00fcberlasten.",
          "Mit dem optionalen Wettersensor wird das automatisch geregelt: Sobald der Sensor Niederschlag erkennt (Regen wie Schnee), fahren die Lamellen in unter 30 Sekunden in 135\u00b0. F\u00fcr Premium-Modelle ist eine Lamellen-Heizung verf\u00fcgbar (eingebaute Heizdr\u00e4hte in den Profilen), die Anhaftungen aktiv verhindert \u2014 bisher selten gew\u00fcnscht, aber technisch m\u00f6glich.",
        ],
      },
      {
        heading: { text: "Was ist mit Vereisung und Frost-Tau-Wechseln?" },
        paragraphs: [
          "Aluminium 6063 T6 ist v\u00f6llig frostsicher. Pulverbeschichtungen nach DIN EN 12206-1 zeigen auch nach Hunderten von Frost-Tau-Wechseln keine Rissbildung \u2014 der Sika-Test (Norm-Pr\u00fcfung mit 200 Zyklen \u22120,5 \u00b0C bis +25 \u00b0C) wird bestanden. EPDM-Dichtungen bleiben elastisch bis \u221240 \u00b0C, Polyamid-Lager der Lamellen-Drehwellen bis \u221230 \u00b0C.",
          "Bei Glasd\u00e4chern: Verbund-Sicherheitsglas (VSG) ist nicht frostempfindlich. Schmelzwasser l\u00e4uft \u00fcber die in den Pfosten integrierte Regenrinne ab \u2014 diese hat ausreichenden Querschnitt (35 \u00d7 50 mm Innenma\u00df) und kann optional mit Heizband ausger\u00fcstet werden, was wir aber nur in absoluten H\u00f6henlagen \u00fcber 800 m empfehlen. In 30 Jahren Brait-Praxis: kein einziger dokumentierter Schaden durch vereiste Rinnen.",
        ],
      },
    ],
    related: [
      "welche-terrassenueberdachung-passt-zu-ihrem-haus",
      "genehmigung-terrassendach-baden-wuerttemberg",
      "pflege-und-wartung",
    ],
    relatedProducts: [
      { label: "Schneelast-Rechner f\u00fcr Ihre PLZ", href: "/rechner" },
      { label: "Q-Bus Lamellen-Pergola", href: "/q-bus" },
      { label: "Wartungspakete", href: "/wartungspakete" },
    ],
    keywords: [
      "Schneelast S\u00fcddeutschland",
      "Schneelastzone Ulm",
      "Lamellendach Schnee",
      "DIN EN 1991-1-3 Terrassendach",
      "Schneelast Schw\u00e4bische Alb",
    ],
  },

  {
    slug: "aluminium-vs-holz",
    title: "Aluminium vs. Holz \u2014 welches Material h\u00e4lt l\u00e4nger?",
    description:
      "Direkter Material-Vergleich f\u00fcr Terrassen\u00fcberdachungen: Aluminium 6063 T6 gegen L\u00e4rche, Douglasie und BSH-Holz. Lebensdauer, Wartung, Optik, \u00d6kobilanz und Gesamtkosten \u00fcber 20 Jahre \u2014 mit Praxis-Beispielen aus dem Brait-Service-Gebiet.",
    category: "Material",
    publishedAt: "2026-04-18",
    readingMinutes: 9,
    image: "/catalog/proline-3.jpg",
    imageAlt: "Aluminium-Terrassen\u00fcberdachung wartungsfrei vs. Holzpergola im Vergleich",
    tldr: "Aluminium 6063 T6 mit Pulverbeschichtung h\u00e4lt 30+ Jahre nahezu wartungsfrei und ist zu 100 % recycelbar. Hochwertige H\u00f6lzer (L\u00e4rche, Douglasie) halten 20\u201325 Jahre, brauchen aber alle 2\u20133 Jahre Pflege (Lasur, Impr\u00e4gnierung) f\u00fcr 200\u2013400 \u20ac pro Behandlung. \u00dcber 20 Jahre Gesamtkosten: ca. 14.900 \u20ac f\u00fcr Aluminium gegen\u00fcber ca. 11.000 \u20ac f\u00fcr Holz \u2014 auf die Lebensdauer gerechnet liegen beide etwa gleichauf, Aluminium spart daf\u00fcr den kompletten Pflegeaufwand. Aluminium ist die rationale Wahl mit gleichbleibender Optik, Holz die warm-lebendige Alternative mit Patina, aber Pflegeaufwand.",
    sections: [
      {
        heading: { text: "Aluminium 6063 T6 \u2014 die technische L\u00f6sung" },
        paragraphs: [
          "Aluminium 6063 T6 ist eine Strangpress-Legierung mit \u22480,5 % Magnesium und \u22480,5 % Silizium. Im Temperzustand T6 (warmausgeh\u00e4rtet, Standard f\u00fcr Bauprofile) erreicht es eine Zugfestigkeit von 215 N/mm\u00b2 und eine Streckgrenze von 170 N/mm\u00b2 bei einer Dichte von 2,7 g/cm\u00b3. Damit ist Aluminium zwar weicher als Baustahl (S235: 235 N/mm\u00b2), aber 3 \u00d7 leichter und durch seine nat\u00fcrliche Oxidschicht v\u00f6llig korrosionsbest\u00e4ndig \u2014 selbst in salzhaltiger Luft.",
          "Pulverbeschichtung nach DIN EN 12206-1 bringt eine 60\u2013100 \u00b5m starke, UV-stabile Schutzschicht in beliebiger RAL-Farbe auf. Garantierte Lebensdauer der Beschichtung: 25 Jahre bei normaler Belastung, 30+ Jahre bei pflegender Wartung. Wartungsaufwand: 1 \u00d7 pro Jahr Reinigung mit Wasser und mildem Reiniger \u2014 das war's. Keine Impr\u00e4gnierung, keine Lasur, keine Streichaktion, keine Behandlung gegen Pilze oder Insekten.",
        ],
        factBox: {
          title: "Aluminium 6063 T6 \u2014 Eckdaten",
          items: [
            "Zugfestigkeit: 215 N/mm\u00b2",
            "Streckgrenze: 170 N/mm\u00b2",
            "Dichte: 2,7 g/cm\u00b3 (3 \u00d7 leichter als Stahl)",
            "Korrosionsbest\u00e4ndigkeit: nat\u00fcrlich durch Oxidschicht",
            "Pulverbeschichtungsdicke: 60\u2013100 \u00b5m",
            "Lebensdauer: 30+ Jahre",
            "Recyclingquote: 95 % der Produktion ist Sekund\u00e4r-Aluminium",
          ],
        },
      },
      {
        heading: { text: "Holz \u2014 die warme Alternative" },
        paragraphs: [
          "Hochwertige H\u00f6lzer f\u00fcr den Au\u00dfenbereich sind L\u00e4rche (mitteleurop\u00e4isch, H\u00e4rteklasse 3, durch hohen Harzanteil resistenter gegen Pilze), Douglasie (importierte Konifere, h\u00f6here H\u00e4rte und Druckfestigkeit), Eiche (sehr langlebig, aber teuer und gerbs\u00e4urehaltig) und BSH-Holz (Brettschichtholz aus Fichte oder L\u00e4rche, kosteng\u00fcnstig, gr\u00f6\u00dfere Spannweiten m\u00f6glich).",
          "Lebensdauer im Au\u00dfenbereich: 20\u201325 Jahre bei guter Pflege. Pflege bedeutet: alle 2\u20133 Jahre Erstlasur oder Impr\u00e4gnierung (Kosten 200\u2013400 \u20ac pro Behandlung bei 4 \u00d7 3 m Konstruktion), bei besch\u00e4digten Stellen punktuelle Holzschutzbehandlung, mindestens j\u00e4hrliche Sichtkontrolle gegen Pilz- und Insektenbefall (Hausbock, Holzwurm). Bei Wei\u00dffichten oder unbehandelter Sibirischer L\u00e4rche steigt die Lebensdauer ohne Lasur auf 15 Jahre, danach setzt nat\u00fcrlicher Verfall ein.",
          "Optisch: warm, lebendig, alters- und witterungsabh\u00e4ngig ver\u00e4nderlich. Unbehandelte L\u00e4rche entwickelt eine charakteristische Patina vom Hellbraun zum Silbergrau in 2\u20134 Jahren \u2014 diese Optik ist gewollt oder st\u00f6rend, je nach Geschmack. F\u00fcr Liebhaber von Naturmaterialien und Patina-\u00c4sthetik ist Holz unschlagbar; wer eine \u00fcber Jahrzehnte gleichbleibende, definierte Farbe will, w\u00e4hlt Aluminium.",
        ],
      },
      {
        heading: { text: "Direkter Kostenvergleich über 20 Jahre" },
        table: {
          columns: ["Position", "Aluminium 6063 T6", "Lärche / Douglasie"],
          rows: [
            ["Anfangsinvestition (4 × 3 m)", "14.590 €", "6.500 €"],
            ["Pflege Jahr 1–20", "300 € (Reinigung)", "3.500 € (10× Lasur)"],
            ["Reparaturen (Schimmel, Risse)", "0 €", "1.000 € (geschätzt)"],
            ["Lebensdauer-Wertverlust", "0 % (ersetzt nach 30 J.)", "100 % (Ersatz nach 25 J.)"],
            ["Gesamtkosten 20 Jahre", "~14.900 €", "~11.000 €"],
          ],
        },
      },
      {
        heading: { text: "\u00d6kobilanz und Recycling" },
        paragraphs: [
          "Aluminium hat einen schlechten Ruf wegen seines hohen Energiebedarfs in der Prim\u00e4rproduktion (Schmelzelektrolyse). Die Realit\u00e4t ist differenzierter: 95 % der weltweit verarbeiteten Bau-Aluminium-Profile sind heute Sekund\u00e4rmaterial aus Recycling \u2014 das spart 95 % der Energie gegen\u00fcber Prim\u00e4r-Aluminium. Eine Brait-Konstruktion aus 6063 T6 wird zu 99 % aus europ\u00e4ischem Recycling-Aluminium hergestellt. Am Lebensende ist Aluminium zu 100 % wiederverwertbar, ohne Qualit\u00e4tsverlust.",
          "Holz ist als nachwachsender Rohstoff CO\u2082-neutral in der Produktion, wenn aus regional zertifizierter Forstwirtschaft (FSC, PEFC). Allerdings: regelm\u00e4\u00dfige Lasuren und Impr\u00e4gnierungen enthalten chemische Wirkstoffe (Biozide, L\u00f6sungsmittel), die in Boden und Grundwasser gelangen k\u00f6nnen. Am Lebensende ist nur unbehandeltes Holz thermisch oder kompost-recyclebar; lasiertes Holz fluide muss als Sondermull entsorgt werden. Saubere \u00d6kobilanz \u00fcber 30 Jahre: f\u00fcr eine 4\u00d73-m-Konstruktion sind beide Materialien etwa gleichauf, mit kleinem Vorteil f\u00fcr Aluminium dank l\u00e4ngerer Lebensdauer und vollst\u00e4ndiger Recyclingf\u00e4higkeit.",
        ],
      },
      {
        heading: { text: "Welche Argumente sprechen f\u00fcr was?" },
        bullets: [
          "Aluminium: wartungsfrei, korrosionsbest\u00e4ndig, 30+ Jahre Lebensdauer, RAL-Farbvielfalt, perfekt kombinierbar mit Glas, Lamellen, Markisen, Heizung, LED, Sensorik.",
          "Aluminium: ideal bei Lamellend\u00e4chern \u2014 verstellbare Mechanik braucht ma\u00dfhaltige Profile mit \u00b10,1 mm Toleranz, die nur Aluminium liefert.",
          "Aluminium: ideal bei Glashaus-Konstruktionen \u2014 thermisch entkoppelte Profile (mit Polyamid-Stegen) verhindern Kondensat.",
          "Holz: warme Optik, nat\u00fcrliche Maserung, \u00f6kologische N\u00e4he, niedrigere Anfangsinvestition (40\u201355 % g\u00fcnstiger).",
          "Holz: ideal bei Pergolen mit Stoffsegel, mediterranen Pavillons, \u00d6kobau-Projekten mit klarem Fokus auf nat\u00fcrliche Materialien.",
          "Holz: ideal bei kleineren Anlagen ohne Mechanik \u2014 wo keine motorischen Lamellen oder Glasschiebew\u00e4nde gew\u00fcnscht sind.",
        ],
      },
      {
        heading: { text: "Was wir bei Brait machen" },
        paragraphs: [
          "Brait spezialisiert sich seit 2014 ausschlie\u00dflich auf Aluminium-Konstruktionen \u2014 wir liefern keine Holzanlagen. Hintergrund: Lamellend\u00e4cher, Glasschiebew\u00e4nde und Aufglasmarkisen funktionieren nur mit ma\u00dfhaltigen, thermisch entkoppelten Aluminium-Profilen. Wer eine kombinierbare, modular erweiterbare und wartungsarme L\u00f6sung will, ist bei Aluminium richtig. Wenn Sie eine reine Holzanlage wollen, empfehlen wir lokale Schreinerbetriebe in Ulm und Umgebung \u2014 wir vermitteln auf Wunsch Kontakte.",
          "Unsere St\u00e4rken im Aluminium-Bereich: 30+ Jahre Lebensdauer, individuelle Statik f\u00fcr jede Schneelastzone, RAL-Farbpalette in beliebigen Glanzgraden (Standard matt 30 % oder seidengl\u00e4nzend 50 %), thermische Entkopplung f\u00fcr Glashaus-Konstruktionen, modulare Erweiterbarkeit (Aufglasmarkise, Schiebew\u00e4nde, Heizung, LED \u2014 alles auch nach Jahren nachr\u00fcstbar). 10 Jahre Strukturgarantie auf Konstruktion und Pulverbeschichtung.",
        ],
      },
    ],
    related: [
      "welche-terrassenueberdachung-passt-zu-ihrem-haus",
      "pflege-und-wartung",
      "schneelast-in-sueddeutschland",
    ],
    relatedProducts: [{ label: "Terrassen\u00fcberdachungen", href: "/terrassenueberdachungen" }],
    keywords: [
      "Aluminium vs Holz",
      "Terrassendach Material",
      "L\u00e4rche Douglasie Pergola",
      "Aluminium 6063 T6 Pulverbeschichtung",
      "Holz Pergola Lebensdauer",
    ],
  },

  {
    slug: "pflege-und-wartung",
    title: "Pflege & Wartung Ihrer Aluminium-\u00dcberdachung",
    description:
      "Wartungsleitfaden f\u00fcr Brait-\u00dcberdachungen: Reinigungs-Intervall, Tuchpflege, Motor-Service, Glas-Reinigung, Dichtung-Check und Sensorik-Pr\u00fcfung. Mit Schritt-f\u00fcr-Schritt-Anleitung f\u00fcr Eigenleistung und Wartungsvertrags-Vergleich.",
    category: "Pflege",
    publishedAt: "2026-04-20",
    readingMinutes: 9,
    image: "/catalog/cube-2.jpg",
    imageAlt: "Wartung einer Brait Aluminium-Terrassen\u00fcberdachung in Ulm",
    tldr: "Aluminium-Konstruktionen mit Pulverbeschichtung sind nahezu wartungsfrei \u2014 eine Reinigung pro Jahr mit Wasser und mildem Reiniger gen\u00fcgt. Bewegliche Komponenten (Motoren, Lamellen-Drehwellen, Markisent\u00fccher, Sensoren) brauchen alle 2\u20133 Jahre eine Inspektion. Brait-Wartungspakete ab 14,90 \u20ac pro Monat \u00fcbernehmen das komplett \u2014 inkl. Tuch- und Motorpr\u00fcfung, Dichtungs-Check und im Komplett-Paket sogar kostenfreiem Tuchaustausch im Schadensfall.",
    sections: [
      {
        heading: { text: "Was muss wirklich gewartet werden?" },
        paragraphs: [
          "Eine Aluminium-Konstruktion mit Pulverbeschichtung selbst braucht keine aktive Wartung \u2014 keine Lasur, keine Impr\u00e4gnierung, keine Streichaktion. Wartung bei Brait-Anlagen bezieht sich auf die zwei beweglichen oder verschlei\u00dfanf\u00e4lligen Bereiche: erstens Sensorik und Motoren (Markisen, Lamellen, Schiebew\u00e4nde, Wettersensoren), zweitens Dichtungen und Tuch (Bel\u00fcftung, Schmutz, UV-Belastung). Die folgende Liste zeigt die realistischen Intervalle.",
        ],
        bullets: [
          "Aluminium-Profile: 1\u00d7 pro Jahr Reinigung mit Wasser und mildem Reiniger (z.\u202fB. Sp\u00fclmittel im Verh\u00e4ltnis 1:50). Kein Hochdruckreiniger direkt auf die Pulverbeschichtung \u2014 kann mikroskopische Risse verursachen.",
          "Glas (VSG): 1\u00d7 pro Jahr Reinigung wie Hausfenster. Vogelkot innerhalb von 14 Tagen entfernen, weil die enthaltene S\u00e4ure die Beschichtung angreift.",
          "Markisent\u00fccher (Sunbrella Acryl): 2\u00d7 pro Jahr trockene B\u00fcrstenreinigung, bei Verschmutzung Klarwasser-Reinigung. Nicht in die Waschmaschine \u2014 UV-Schutz wird zerst\u00f6rt.",
          "Motoren (Somfy IO oder Funk): alle 3 Jahre Schmierung der Mechanik durch Fachmann \u2014 Lebensdauer dadurch von typischen 12 auf 18 Jahre ausgedehnt.",
          "EPDM-Dichtungen: alle 5 Jahre Sichtpr\u00fcfung. Bei sichtbarer Verh\u00e4rtung Austausch f\u00fcr 50\u201380 \u20ac pro Lippen-Dichtung.",
          "Lamellen-Drehwellen: alle 2 Jahre Funktionspr\u00fcfung \u2014 Drehung 0\u2013135\u00b0 ohne Ruckeln, Endschalter intakt, keine Wassersammlung.",
          "Wettersensoren: alle 2 Jahre Funktionscheck (Regen-, Wind-, Sonnensensor). Sensorh\u00e4ubchen reinigen, Verkabelung pr\u00fcfen.",
          "Zip-Screens: 1\u00d7 pro Jahr Reinigung der F\u00fchrungsschienen mit Druckluft, Schmierung der Reissverschluss-Kette mit Silikonspray.",
        ],
      },
      {
        heading: { text: "Eigenleistung \u2014 Schritt f\u00fcr Schritt" },
        paragraphs: [
          "F\u00fcr die j\u00e4hrliche Reinigung einer Aluminium-Terrassen\u00fcberdachung brauchen Sie etwa 60\u201390 Minuten und folgende Werkzeuge: Gartenschlauch mit max. 3 bar, weicher Besen oder Teleskopstange mit Schwamm-Aufsatz, Mikrofasertuch, Eimer mit lauwarmem Wasser und einem Schuss Sp\u00fclmittel.",
          "Schritt 1: Lose Verschmutzung (Bl\u00e4tter, Pollen, Spinnweben) mit weichem Besen abkehren. Schritt 2: Mit Gartenschlauch (Strahl auf \u201eDusche\u201c, nicht \u201eHochdruck\u201c) Profile, Glas und Schiebew\u00e4nde absp\u00fclen. Schritt 3: Mit weichem Schwamm und Sp\u00fclmittel-Wasser einseifen \u2014 von oben nach unten arbeiten. Schritt 4: Mit klarem Wasser nachsp\u00fclen, bis keine Schaumreste mehr sichtbar sind. Schritt 5: Glas mit Mikrofasertuch streifenfrei abwischen.",
          "F\u00fcr Markisen mit Tuch: Tuch komplett ausgefahren reinigen, niemals teilweise eingefahren. An feuchten Tagen die Markise nicht einrollen \u2014 bei eingerolltem feuchtem Tuch entwickelt sich Schimmel innerhalb weniger Tage. Wenn das Tuch nass geworden ist, mindestens 2 Stunden ausgefahren trocknen lassen, bevor Sie einrollen.",
        ],
      },
      {
        heading: { text: "Brait-Wartungspakete im Detail" },
        paragraphs: [
          "Brait bietet drei Wartungs-Stufen, die alle eine Vor-Ort-Inspektion durch unser Montage-Team einschlie\u00dfen \u2014 keine Subunternehmer, gleicher Ansprechpartner wie bei der Erstmontage. Die Pakete laufen monatlich k\u00fcndbar, beinhalten Anfahrt im 100-km-Umkreis und sind nach 12 Monaten amortisiert (eine vergleichbare Einzel-Inspektion eines externen Servicebetriebs kostet 250\u2013350 \u20ac).",
        ],
        bullets: [
          "Basic 14,90 \u20ac/Monat: 1\u00d7 pro Jahr Inspektion und Reinigung der Aluminium-Konstruktion, Funktionspr\u00fcfung Motoren, schriftlicher Wartungsbericht.",
          "Premium 24,90 \u20ac/Monat: zus\u00e4tzlich Glasreinigung, Tuchpflege, Dichtungs-Check, Sensor-Test, Hagelschaden-Sofortmeldung mit 24-h-Inspektion.",
          "Komplett 39,90 \u20ac/Monat: zus\u00e4tzlich Motor-Schmierung, Endschalter-Justage, kostenloser Tuchaustausch im Schadensfall mit nur 250 \u20ac Selbstbehalt, priorisierte Termine in der Hauptsaison.",
        ],
      },
      {
        heading: { text: "Schadenserkennung \u2014 was sind die Warnsignale?" },
        paragraphs: [
          "Fr\u00fchzeitig erkannte Sch\u00e4den lassen sich oft mit einer 80\u2013150-\u20ac-Reparatur beheben \u2014 ignoriert wird daraus oft ein Komplett-Tausch f\u00fcr 1.500\u20133.000 \u20ac. Die typischen Warnsignale, die Sie nicht ignorieren sollten:",
        ],
        bullets: [
          "Markise f\u00e4hrt nicht mehr ganz aus oder ein \u2014 Endschalter dejustiert oder Motor schwach (Reparatur 80\u2013250 \u20ac).",
          "Motor brummt l\u00e4nger als \u00fcblich oder f\u00e4hrt unrund \u2014 Lager verschlissen, Schmierung n\u00f6tig (60\u2013120 \u20ac).",
          "Glasdichtungen wirken br\u00fcchig oder zeigen schwarze Risse \u2014 EPDM ist gealtert, Austausch f\u00e4llig (50\u201380 \u20ac pro Meter).",
          "Lamellen-Bewegung ruckelt oder bleibt h\u00e4ngen \u2014 Drehwellen-Lager oder Antriebsstange (150\u2013350 \u20ac).",
          "Wasser sammelt sich in Profilen statt abzuflie\u00dfen \u2014 verstopfte Regenrinne oder defekte Ableitung (Reinigung 80 \u20ac, Austausch 200 \u20ac).",
          "Pulverbeschichtung zeigt Blasen oder kleine Abplatzungen \u2014 lokale Ausbesserung mit Spezial-Reparaturlack (40\u201380 \u20ac).",
          "Lichtfallen am Tag, wo fr\u00fcher keine waren \u2014 Profile haben sich minimal verschoben (statische Pr\u00fcfung n\u00f6tig).",
        ],
      },
      {
        heading: { text: "Wann lohnt ein Wartungsvertrag?" },
        paragraphs: [
          "Ein Wartungsvertrag lohnt sich besonders bei Anlagen mit hohem mechanischem Anteil: Lamellend\u00e4cher, Markisen, Glasschiebew\u00e4nde, Zip-Screens. Hier ist die Inspektion durch einen erfahrenen Techniker mehr wert als bei einer reinen Pro-Line-Glasdach-Konstruktion ohne bewegliche Teile. Faustregel: ab einer Anlage mit Motor und beweglichen Komponenten amortisiert sich Premium- oder Komplett-Paket innerhalb von 5\u20137 Jahren.",
          "Brait reagiert bei gemeldeten Defekten innerhalb von 5 Werktagen mit einer Inspektion vor Ort \u2014 Wartungsvertragskunden bekommen Termine priorisiert (innerhalb von 1\u20132 Werktagen). In der Hauptsaison (April\u2013Juni) ist das ein echter Vorteil, weil dann oft mehrere Wochen Wartezeit \u00fcblich sind.",
        ],
      },
    ],
    related: ["aluminium-vs-holz", "schneelast-in-sueddeutschland"],
    relatedProducts: [{ label: "Wartungspakete", href: "/wartungspakete" }],
    keywords: [
      "Aluminium Pflege",
      "Markise Wartung",
      "Lamellendach Pflege",
      "Wartungsvertrag Terrassen\u00fcberdachung",
      "Pulverbeschichtung Pflege",
    ],
  },

  {
    slug: "energie-sparen-mit-markisen",
    title: "Energie sparen mit Markisen \u2014 wie viel K\u00fchlleistung Sie sparen",
    description:
      "Markisen reduzieren Hitze in Innenr\u00e4umen um 5\u201310 \u00b0C und senken Klimaanlagen-Kosten um 30\u201350 %. Konkrete Berechnungen f\u00fcr S\u00fcd- und Westterrassen, Aufglasmarkisen und Zip-Screens \u2014 mit Wirtschaftlichkeit, Praxis-Werten und F\u00f6rderprogrammen.",
    category: "Energie",
    publishedAt: "2026-04-22",
    readingMinutes: 8,
    image: "/markisen-types/aufglas-main.webp",
    imageAlt: "Aufglasmarkise reduziert Hitze in einem Brait Wintergarten in Ulm",
    tldr: "Eine au\u00dfenliegende Markise oder ein Zip-Screen vor einem 3 \u00d7 2 m S\u00fcd-Fenster reduziert die solare W\u00e4rmestrahlung um 70\u201390 % und damit die Innenraum-Temperatur an einem Hochsommertag um 5\u201310 \u00b0C. Die Klimaanlage spart dadurch 30\u201350 % Strom \u2014 in Zahlen: ca. 117 \u20ac pro Sommer-Saison bei 60 hei\u00dfen Tagen, \u00fcber 10 Jahre \u00fcber 1.170 \u20ac. Eine 3 \u00d7 2 m Gelenkarmmarkise kostet etwa 5.560 \u20ac inkl. Montage, amortisiert sich also rein finanziell in rund 48 Jahren \u2014 inkl. Komfortgewinn (k\u00fchler Wohnraum, kein Klima-Ger\u00e4usch, gesunde Schleimh\u00e4ute) bereits in 21 Jahren.",
    sections: [
      {
        heading: { text: "Wie viel Hitze produziert ein S\u00fcd-Fenster?" },
        paragraphs: [
          "Ein durchschnittliches S\u00fcd-Fenster mit 3 \u00d7 2 m (6 m\u00b2) Glasfl\u00e4che l\u00e4sst im Hochsommer bei klarem Himmel und Mittagssonne bis zu 4.500 Watt solare Strahlung ins Zimmer \u2014 das ist die Energieleistung von vier mittleren Heizk\u00f6rpern oder einem Wasserkocher in voller Leistung. Diese Energie heizt zuerst Boden, M\u00f6bel und Innenw\u00e4nde auf, die anschlie\u00dfend die Raumluft erw\u00e4rmen. Ergebnis: ohne Verschattung steigt die Innenraum-Temperatur um 5\u201310 \u00b0C \u00fcber die Au\u00dfentemperatur.",
          "Konkrete Strahlungsdichte in Ulm an einem typischen Sommer-Mittag: 750\u2013850 W/m\u00b2 direkte Strahlung plus 100\u2013150 W/m\u00b2 diffuse Strahlung. Eine au\u00dfenliegende Markise oder ein Zip-Screen blockt 70\u201390 % der direkten Strahlung schon vor dem Glas \u2014 die Hitze entsteht gar nicht erst im Raum. Innenliegende Verschattung (Plissees, Vorh\u00e4nge) wirkt nur halb so gut, weil die Strahlung schon ins Glas eingedrungen ist und die Hitze hinter der Scheibe entsteht.",
        ],
        factBox: {
          title: "Strahlung und Hitze in Zahlen",
          items: [
            "Direkte Sonnenstrahlung Mittagssonne: 750\u2013850 W/m\u00b2",
            "Diffuse Strahlung: 100\u2013150 W/m\u00b2",
            "Energieleistung 6-m\u00b2-Fenster ohne Schutz: bis 4.500 W",
            "Au\u00dfenliegende Markise: blockt 70\u201390 %",
            "Innenliegende Verschattung: blockt 30\u201350 %",
            "Innenraum-Temperaturabsenkung mit Markise: 5\u201310 \u00b0C",
          ],
        },
      },
      {
        heading: { text: "Innenliegende vs. au\u00dfenliegende Verschattung" },
        paragraphs: [
          "Innenliegende Verschattung (Plissees, Vorh\u00e4nge, Rollos hinter dem Glas) reduziert das einfallende Licht, blockt aber nur einen Teil der W\u00e4rmestrahlung. Die Hitze entsteht trotzdem zwischen Glas und Plissee, der \u201eTreibhauseffekt\u201c im Fensterbereich heizt das gesamte Zimmer auf. Effektive Hitzereduktion: 30\u201350 % je nach Material und Reflexionsgrad. F\u00fcr S\u00fcd-Fenster im Hochsommer reicht das nicht.",
          "Au\u00dfenliegende Verschattung (klassische Markise, Senkrechtmarkise, Zip-Screen, Aufglasmarkise) blockt die solare Strahlung bereits vor der Scheibe. Das Glas selbst bleibt k\u00fchl, der Raum erw\u00e4rmt sich kaum \u00fcber die Au\u00dfentemperatur hinaus. Effektive Hitzereduktion: 70\u201390 %. Bei Winterg\u00e4rten, Glash\u00e4usern und Pro-Line-Anbauten mit gro\u00dfen Glasfl\u00e4chen ist au\u00dfenliegender Schutz konkurrenzlos \u2014 innenliegender w\u00fcrde dort den Raum nicht ausreichend k\u00fchl halten.",
        ],
      },
      {
        heading: { text: "Konkrete Stromkosten-Ersparnis pro Saison" },
        paragraphs: [
          "Eine durchschnittliche Split-Klimaanlage (Inverter, Energieklasse A++) verbraucht etwa 1,2 kWh pro Stunde, um 4.500 Watt Hitze aus einem 25-m\u00b2-Raum abzuf\u00fchren. Beim aktuellen Strompreis (Q2/2026 in BW: 0,38 \u20ac/kWh inkl. aller Abgaben) kostet eine Stunde Klimatisierung 0,46 \u20ac.",
          "An einem hei\u00dfen Sommertag in Ulm l\u00e4uft die Klimaanlage typischerweise 6 Stunden \u2014 also 2,76 \u20ac pro Tag. Mit au\u00dfenliegender Markise reduziert sich der K\u00fchlbedarf auf etwa 30 % der urspr\u00fcnglichen Leistung; die Klimaanlage l\u00e4uft k\u00fcrzer und mit weniger Last, der Stromverbrauch sinkt auf etwa 0,80 \u20ac pro Tag. Bei 60 hei\u00dfen Sommertagen pro Saison (laut DWD-Klimadaten f\u00fcr Ulm der typische Wert) ergibt das eine Strom-Ersparnis von 117 \u20ac. \u00dcber 10 Jahre summiert sich das auf 1.170 \u20ac reine Energie-Ersparnis \u2014 ohne Strompreis-Anstieg, der die Rechnung tendenziell zugunsten der Markise verbessert.",
          "Verbleibender Mehrwert \u00fcber den finanziellen Aspekt hinaus: dauerhaft k\u00fchler Wohnraum, kein nerviges Klima-Ger\u00e4usch, keine Austrocknung der Schleimh\u00e4ute, kein L\u00fcften mit hei\u00dfer Au\u00dfenluft, geringerer CO\u2082-Aussto\u00df. F\u00fcr Personen mit Asthma, Allergien oder Migr\u00e4ne ist die Verschattungsl\u00f6sung gesundheitlich oft die bessere Wahl als eine Klimaanlage.",
        ],
      },
      {
        heading: { text: "Welche L\u00f6sung f\u00fcr welches Fenster?" },
        bullets: [
          "S\u00fcd-Fenster im Erdgeschoss mit Terrasse: Gelenkarmmarkise (4.620\u20138.150 \u20ac) oder Aufglasmarkise auf Pro-Line-Glasdach (3.760\u20137.010 \u20ac).",
          "West-Fenster mit tiefstehender Abendsonne: Senkrechtmarkise oder Zip-Screen (3.180\u20135.700 \u20ac), weil horizontale Markisen bei tiefem Sonnenstand wenig Schatten werfen.",
          "Winterg\u00e4rten und Pro-Line-Glasd\u00e4cher: Aufglasmarkise direkt auf der Dachneigung \u2014 reduziert sommerliche \u00dcberhitzung um bis zu 60 %.",
          "Schlafzimmer-Dachfenster (z.\u202fB. Velux): externe Senkrecht-Rollo oder Aluminium-Au\u00dfen-Verdunklung (400\u2013800 \u20ac pro Fenster).",
          "Schaufenster und Gewerbe: Senkrechtmarkise oder Fallarmmarkise mit Werbedruck \u2014 doppelter Nutzen (Hitzeschutz und Marken-Sichtbarkeit).",
        ],
      },
      {
        heading: { text: "F\u00f6rderprogramme f\u00fcr Sonnenschutz" },
        paragraphs: [
          "Au\u00dfenliegender Sonnenschutz wird in Deutschland im Rahmen der KfW-F\u00f6rderung \u201eEinzelma\u00dfnahmen Geb\u00e4udeh\u00fclle\u201c gef\u00f6rdert (Programm 458, Zuschuss 15\u201320 % der Kosten, max. 30.000 \u20ac pro Wohneinheit). Voraussetzung: ein Energieberater (BAFA-zertifiziert) plant und dokumentiert die Ma\u00dfnahme als Teil eines individuellen Sanierungsfahrplans (iSFP). Bei alleinigem Markisen-Tausch ohne weitere Sanierung ist die F\u00f6rderquote \u00fcblicherweise 15 %.",
          "Konkrete Rechnung f\u00fcr eine Brait Senkrechtmarkise mit Zip-Screen-Technik (3 \u00d7 2 m, 4.460 \u20ac inkl. Montage): KfW-Zuschuss 15 % = 670 \u20ac, Eigenanteil 3.790 \u20ac. Plus die laufende Strom-Ersparnis von 117 \u20ac pro Jahr verk\u00fcrzt sich die Amortisation auf etwa 32 Jahre rein finanziell. Wir liefern auf Anfrage die n\u00f6tigen technischen Daten f\u00fcr Ihren Energieberater \u2014 G-Wert des Tuchs, Montageart, Wirkungsweise.",
        ],
      },
      {
        heading: { text: "Wirtschaftlichkeitsrechnung im \u00dcberblick" },
        table: {
          columns: ["Position", "Wert"],
          rows: [
            ["Gelenkarmmarkise 3 \u00d7 2 m inkl. Montage", "5.560 \u20ac"],
            ["KfW-Zuschuss (15 %)", "\u2212830 \u20ac"],
            ["Effektive Anschaffung", "4.730 \u20ac"],
            ["Energie-Ersparnis pro Jahr (60 hei\u00dfe Tage)", "117 \u20ac"],
            ["Komfortgewinn pro Jahr (Sch\u00e4tzung)", "150 \u20ac"],
            ["Amortisation rein finanziell", "\u224840 Jahre"],
            ["Amortisation inkl. Komfort", "\u224818 Jahre"],
            ["Lebensdauer Tuch", "8\u201312 Jahre"],
            ["Lebensdauer Mechanik", "12\u201318 Jahre"],
          ],
        },
      },
    ],
    related: [
      "welche-terrassenueberdachung-passt-zu-ihrem-haus",
      "markise-vs-pergola-vs-lamellendach",
      "pflege-und-wartung",
    ],
    relatedProducts: [
      { label: "Markisen", href: "/markisen" },
    ],
    keywords: [
      "Markisen Energie sparen",
      "Klimaanlage vs Markise",
      "Hitzeschutz Fenster",
      "KfW F\u00f6rderung Sonnenschutz",
      "G-Wert Markise",
    ],
  },
];

export const findArticle = (slug: string) => articles.find((a) => a.slug === slug);
