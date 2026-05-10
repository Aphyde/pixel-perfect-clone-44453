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
    tldr: "Drei Systeme, drei Anwendungsfälle: Pro-Line (wandbefestigt, ab 7.900 €) für klassische Hausterrassen, Cube (freistehend, ab 9.500 €) für Gartenlounges ohne Wandanschluss, Lamellendach (verstellbar, ab 14.000 €) für Premium-Outdoor mit voller Klimakontrolle. Die Wahl hängt von Ausrichtung, Statik, Budget und gewünschter Nutzungsdauer pro Jahr ab.",
    sections: [
      {
        factBox: {
          title: "Schnell-Übersicht — die drei Systeme",
          items: [
            "Pro-Line: wandbefestigt, VSG-Glasdach, ab 7.900 €. Ideal bei Süd-/Westausrichtung mit Hauswand.",
            "Cube: freistehend, kubisches Design, ab 9.500 €. Ideal als Garten-Lounge ohne Wandanschluss.",
            "Lamellendach: verstellbare Aluminium-Lamellen, ab 14.000 €. Ideal für volle Klimakontrolle und ganzjährige Nutzung.",
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
          "Pro-Line ist ein klassisches Anbaudach: schmale Aluminium-Sparren (60 × 40 mm) tragen ein VSG-Glasdach, integrierte Regenrinne im Pfosten leitet Niederschlag unsichtbar ab. Bis 7 m Breite und 4 m Tiefe ohne Mittelstütze. Der Wandanschluss erfolgt mit thermisch entkoppelter EPDM-Dichtung, die Befestigung mit chemischen Verbundankern.",
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
      "Markise, Pergola, Lamellendach im direkten Vergleich: Schattenverhalten, Wetterfestigkeit, Preis, Nutzungsdauer. Welche Lösung wirklich zu welcher Terrasse passt.",
    category: "Auswahl",
    publishedAt: "2026-04-05",
    readingMinutes: 7,
    image: "/catalog/lamellendach-1.jpg",
    imageAlt: "Vergleich Markise Pergola Lamellendach",
    tldr: "Markise = günstig + flexibel, schützt nur vor Sonne (1.200–4.500 €). Pergola = Statement-Konstruktion mit beweglichem Sonnenschutz (8.000–15.000 €). Lamellendach = Premium mit Sonnen- + Regenschutz auf Knopfdruck (14.000–28.000 €). Markise ist sinnvoll für reine Hitze-Reduktion im Sommer, Pergola für Garten-Lounges, Lamellendach für ganzjährige Outdoor-Nutzung.",
    sections: [
      {
        heading: { text: "Wofür ist eine Markise gemacht?" },
        paragraphs: [
          "Markisen sind reine Sonnenschutz-Lösungen. Sie schützen Tuch + Mechanik vor UV und Hitze und reduzieren die Innenraum-Temperatur um 5–10 °C. Aber: Markisen sind nicht regenfest. Bei beginnendem Regen müssen sie eingefahren werden — Wassersäcke beschädigen Tuch und Mechanik.",
          "Vorteil Markise: günstig (1.200–4.500 €), schnell montiert (1 Tag), vielseitig (Gelenkarm, Fallarm, Senkrecht, Aufglas). Nachteil: nur Sommer-Werkzeug, nicht wetterfest.",
        ],
      },
      {
        heading: { text: "Was unterscheidet eine Pergola?" },
        paragraphs: [
          "Pergola heißt im engeren Sinn: Aluminium-Konstruktion mit beweglichem Sonnenschutz, ohne festes Dach. Klassische Pergola: Aluminium-Rahmen mit Stoffsegel, das ein- und ausgefahren wird. Bioklimatische Pergola = Lamellendach (siehe nächster Abschnitt).",
          "Pergolen mit Stoffsegel kosten 8.000–15.000 €, sind formal eine Konstruktion (kein Anbau wie Pro-Line) und brauchen daher in BW manchmal eine Bauanzeige bei größeren Anlagen. Vorteil: optisch leichter als Glasdach, große Schattenflächen.",
        ],
      },
      {
        heading: { text: "Was kann ein Lamellendach mehr als Pergola und Markise?" },
        paragraphs: [
          "Das Lamellendach kombiniert die Vorteile: Aluminium-Lamellen drehen sich von 0° (offen) bis 135° (geschlossen wasserdicht). Sommer-Sonne reinkommen lassen, dann Schatten regulieren, bei Regen geschlossen — alles auf Knopfdruck.",
          "Lamellendächer kosten 14.000–28.000 €. Investitions-Argument: ganzjährige Nutzung. Während Markisen 4–5 Monate im Einsatz sind und Pergolen 5–6, läuft das Lamellendach 12 Monate. Pro Nutzungstag kann das günstiger sein als eine Markise.",
        ],
      },
      {
        heading: { text: "Direkter Vergleich" },
        table: {
          columns: ["Merkmal", "Markise", "Pergola (Stoff)", "Lamellendach"],
          rows: [
            ["Sonnenschutz", "Ja", "Ja", "Ja, regulierbar"],
            ["Regenschutz", "Nein", "Nein (Stoff)", "Ja, wasserdicht"],
            ["Maße", "bis 7 × 4 m", "bis 6 × 4 m", "bis 7 × 4,5 m"],
            ["Windklasse", "5", "5", "5+ (geschlossen)"],
            ["Preis", "1.200–4.500 €", "8.000–15.000 €", "14.000–28.000 €"],
            ["Lebensdauer", "10–15 Jahre", "15–20 Jahre", "30+ Jahre"],
            ["Genehmigung BW", "≤ 30 m² frei", "Bauanzeige möglich", "Bauanzeige möglich"],
            ["Nutzungsmonate", "4–5 / Jahr", "5–6 / Jahr", "12 / Jahr"],
          ],
        },
      },
      {
        heading: { text: "Welche Kombinationen sind sinnvoll?" },
        paragraphs: [
          "Pro-Line-Glasdach + Aufglasmarkise: günstige Variante mit Hitze-Schutz im Sommer. Investition ca. 10.000 €, Nutzung 7–8 Monate.",
          "Lamellendach + Zip-Screen + Glasschiebewände: voll wettergeschützter Outdoor-Wohnraum. Investition 22.000–28.000 €, Nutzung 12 Monate.",
          "Pergola mit Stoffsegel: rein optische / Sommer-Lounge-Lösung. Wenig Wetterfestigkeit, aber günstiger als Lamellendach.",
        ],
      },
    ],
    related: [
      "welche-terrassenueberdachung-passt-zu-ihrem-haus",
      "was-kostet-eine-terrassenueberdachung-in-ulm",
    ],
    relatedProducts: [
      { label: "Markisen", href: "/markisen" },
      { label: "Q-Bus Lamellen-Pergola", href: "/q-bus" },
    ],
    keywords: [
      "Markise vs Pergola",
      "Lamellendach Vergleich",
      "Pergola Pro Contra",
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
    tldr: "Eine Aluminium-Terrassenüberdachung in Ulm kostet 7.900 € (Pro-Line wandbefestigt, 4 × 3 m, VSG-Glas) bis 28.000 € (Lamellendach 5 × 4 m mit LED, Zip-Screen und Glasschiebewänden). Die Hauptpreistreiber sind Größe, Konstruktionstyp, Glas, Statik (Schneelastzone) und Verschattung. Brait-Preise enthalten immer Montage durch eigenes Team.",
    sections: [
      {
        factBox: {
          title: "Preisspannen 2026 (inkl. Montage)",
          items: [
            "Pro-Line wandbefestigt 4 × 3 m: 7.900 – 9.500 €",
            "Cube freistehend 4 × 3 m: 9.500 – 12.500 €",
            "Lamellendach 4 × 3,5 m: 14.000 – 18.000 €",
            "Lamellendach Vollausstattung 5 × 4 m: 22.000 – 28.000 €",
            "Glashaus mit Schiebewänden: +2.500 – 5.000 € auf Pro-Line/Cube",
          ],
        },
      },
      {
        heading: { text: "Welche Faktoren bestimmen den Preis?" },
        bullets: [
          "Größe: Verdoppelung der Fläche kostet etwa 60–70 % mehr (Skaleneffekt).",
          "Konstruktionstyp: Cube ist 15–20 % teurer als Pro-Line bei gleicher Fläche.",
          "Glas: VSG 2× 6 mm Standard, satiniertes oder Sonnenschutzglas +15–25 %.",
          "Schneelastzone: Höhenlagen Schwäbische Alb (Zone 3) +8–12 %.",
          "Sonderfarben: RAL-Maßanfertigung statt Standardfarbe +5 %.",
          "Verschattung: Aufglasmarkise +1.500 €, Zip-Screens je Seite +800–1.400 €.",
          "Beleuchtung: LED-Streifen entlang der Lamellen +1.200 €.",
          "Glasschiebewände: rahmenlos +2.500–4.500 € (je nach Breite).",
        ],
      },
      {
        heading: { text: "Was ist im Brait-Preis enthalten?" },
        paragraphs: [
          "Bei Brait Überdachungen sind in jedem Festpreis-Angebot enthalten: digitales 3D-Aufmaß, statische Berechnung für Ihre Schneelastzone, Anlieferung, Montage durch eigenes Team (1–4 Tage), Endabnahme mit Funktionsprüfung. Es gibt keine Folgekosten für „Statiker\u201c oder „Spezialwerkzeug\u201c — alles ist im Festpreis abgedeckt.",
          "Was nicht enthalten ist: bauliche Vorarbeiten am Untergrund (Pflastern, Fundament gießen), Stromanschluss zum Motor, Trockenlegung der Wand bei Wandanschluss in Bestandsgebäuden mit beschädigtem Putz. Diese Kosten klären wir beim Vor-Ort-Termin transparent.",
        ],
      },
      {
        heading: { text: "Beispiel-Kalkulationen" },
        table: {
          columns: ["Konfiguration", "Preis"],
          rows: [
            ["Pro-Line 4 × 3 m, VSG, Anthrazit (Standard)", "7.900 €"],
            ["Pro-Line 5 × 3,5 m, satiniertes VSG, Sonderfarbe", "11.200 €"],
            ["Cube 4 × 3,5 m, VSG, freistehend", "11.500 €"],
            ["Cube 5 × 4 m, VSG, mit Aufglasmarkise", "16.800 €"],
            ["Lamellendach 4 × 3,5 m, Standard", "15.500 €"],
            ["Lamellendach 5 × 4 m, LED + Wettersensor + Glasschiebewand vorne", "23.500 €"],
            ["Glashaus = Pro-Line + 3 Glasschiebewände", "13.800 €"],
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
    title: "Schneelast in Süddeutschland — was Sie bei der Auswahl beachten müssen",
    description:
      "Schneelastzonen in Bayern und Baden-Württemberg, Bemessung nach DIN 1055-5, was 200 kg/m² bedeuten — und warum Höhenlagen der Schwäbischen Alb besondere Statik brauchen.",
    category: "Material",
    publishedAt: "2026-04-15",
    readingMinutes: 6,
    image: "/catalog/lamellendach-2.jpg",
    imageAlt: "Schneelast auf Lamellendach Süddeutschland",
    tldr: "Süddeutschland fällt überwiegend in Schneelastzone 2 (1,32 kN/m² am Boden), Höhenlagen der Schwäbischen Alb in Zone 3 (1,89 kN/m²). Brait-Standardstatik trägt 200 kg/m² Dachlast. Bei Lagen ab 600 m oder Sondergrößen rechnen wir individuell — Lamellen müssen bei Schneefall geschlossen werden, damit Schnee abrutscht.",
    sections: [
      {
        heading: { text: "Was bedeutet eine Schneelastzone?" },
        paragraphs: [
          "DIN 1055-5 teilt Deutschland in 5 Schneelastzonen (1, 1a, 2, 2a, 3) ein. Die Zone gibt die charakteristische Bodenschneelast in kN/m² an. Über einen Höhenfaktor wird sie auf den konkreten Standort skaliert: höhere Lagen haben mehr Schnee.",
          "Aus Bodenschneelast wird Dachschneelast über einen Form-Beiwert berechnet: Flachdächer (Brait-Pro-Line, Cube) haben Form-Beiwert µ = 0,8. Bei 1,32 kN/m² (Zone 2) ergibt das 1,06 kN/m² ≈ 108 kg/m² Dachlast. Brait dimensioniert immer mindestens auf 200 kg/m² — Sicherheitsreserve eingebaut.",
        ],
      },
      {
        heading: { text: "Wo liegt das Brait-Service-Gebiet?" },
        bullets: [
          "Ulm, Neu-Ulm, Memmingen, Augsburg: Zone 2a (1,32 kN/m²)",
          "Heidenheim, Aalen, Göppingen: Zone 2a/3 (Höhe ausschlaggebend)",
          "Reutlingen, Tübingen: Zone 2",
          "Schwäbische Alb ab 600 m: Zone 3 (1,89 kN/m²)",
          "Höchster Brait-Bauort bisher: 780 m (Heroldstatt) — Zone 3, individuelle Statik",
        ],
      },
      {
        heading: { text: "Was passiert bei Überlastung?" },
        paragraphs: [
          "Bei nicht statisch berechneten Konstruktionen (oft Importware aus dem Ausland mit Standard-200 kg/m²) kann es bei einem ungewöhnlich starken Schneefall (z.B. 1.500–2.000 kg/m² Pulverschnee von 1,5 m Tiefe) zum Versagen kommen — Pfosten knicken, Sparren brechen, Glas reißt.",
          "Brait-Konstruktionen sind durch individuelle Statik abgesichert: Wir berechnen Ihre Anlage für die exakte Schneelast Ihres Standorts. Bei Bedarf verstärken wir Sparren, ergänzen Mittelstützen oder erhöhen die Pfosten-Dimension auf 18 × 18 cm.",
        ],
      },
      {
        heading: { text: "Lamellendach im Winter — was tun?" },
        paragraphs: [
          "Lamellendächer müssen bei beginnendem Schneefall geschlossen werden (135°-Position). In dieser Stellung rutscht Schnee von den glatten Aluminium-Oberflächen ab — wie bei einem Glasdach. Geöffnete oder halbgeöffnete Lamellen können Schnee in den Profilen sammeln, der dann die Lamellen-Mechanik überlastet.",
          "Mit dem optionalen Wettersensor wird das automatisch geregelt: Sobald der Sensor Niederschlag erkennt, fahren die Lamellen in 135°. Bei Schneeflocken-Erkennung lässt sich auch eine Heizung-Funktion in den Lamellen-Profilen aktivieren — bisher nur in Premium-Modellen.",
        ],
      },
      {
        heading: { text: "Was ist mit Vereisung?" },
        paragraphs: [
          "Aluminium-Profile sind frostsicher. Lackschichten (Pulverbeschichtung) zeigen auch nach Hunderten von Frost-Tau-Wechseln keine Rissbildung. Dichtungen aus EPDM bleiben elastisch bis −40 °C.",
          "Bei Glasdächern: VSG ist nicht frostempfindlich. Schmelzwasser läuft über die integrierte Regenrinne ab. Vereiste Rinnen sind in 30 Jahren Praxis bei Brait nie zum Schaden geführt — die Rinnen haben ausreichend Querschnitt und Heizband-Vorbereitung.",
        ],
      },
    ],
    related: [
      "welche-terrassenueberdachung-passt-zu-ihrem-haus",
      "genehmigung-terrassendach-baden-wuerttemberg",
    ],
    relatedProducts: [
      { label: "Q-Bus Lamellen-Pergola", href: "/q-bus" },
      { label: "Wartungspakete", href: "/wartungspakete" },
    ],
    keywords: [
      "Schneelast Süddeutschland",
      "Schneelastzone Ulm",
      "Lamellendach Schnee",
    ],
  },

  {
    slug: "aluminium-vs-holz",
    title: "Aluminium vs. Holz — welches Material hält länger?",
    description:
      "Direkter Material-Vergleich für Terrassenüberdachungen: Aluminium 6063 T6 vs. Lärche, Douglasie, BSH-Holz. Lebensdauer, Wartung, Optik und Gesamtkosten über 20 Jahre.",
    category: "Material",
    publishedAt: "2026-04-18",
    readingMinutes: 7,
    image: "/catalog/proline-3.jpg",
    imageAlt: "Aluminium-Terrassenüberdachung wartungsfrei",
    tldr: "Aluminium 6063 T6 mit Pulverbeschichtung hält 30+ Jahre nahezu wartungsfrei. Hochwertiges Holz (Lärche/Douglasie) hält 20–25 Jahre, braucht aber alle 2–3 Jahre Pflege (Lasur, Imprägnierung). Über 20 Jahre Gesamtkosten: Aluminium ca. 30 % günstiger trotz höherer Anfangsinvestition. Aluminium ist die rationale Wahl, Holz die ästhetisch warme Alternative.",
    sections: [
      {
        heading: { text: "Aluminium 6063 T6 — die technische Lösung" },
        paragraphs: [
          "Aluminium 6063 T6 ist eine Strangpress-Legierung mit 0,5 % Magnesium und 0,5 % Silizium. Im Temperzustand T6 (warmausgehärtet) erreicht es eine Zugfestigkeit von 215 N/mm² bei 2,7 g/cm³ Dichte. Damit ist Aluminium zwar weicher als Stahl (St37: 235 N/mm²), aber 3× leichter — und absolut korrosionsbeständig durch die natürliche Oxidschicht.",
          "Pulverbeschichtung nach DIN EN 12206-1 bringt eine UV-stabile Schutzschicht in beliebiger RAL-Farbe auf, die 30+ Jahre hält. Wartung: 1× pro Jahr Reinigung mit Wasser und mildem Reiniger. Keine Imprägnierung, keine Lasur, keine Streichaktion.",
        ],
      },
      {
        heading: { text: "Holz — die warme Alternative" },
        paragraphs: [
          "Hochwertige Hölzer für Außenbereich: Lärche (mitteleuropäisch, Härteklasse 3, robust), Douglasie (höhere Härte, breit gewachsene Stämme), BSH-Holz (Brettschichtholz aus Fichte, kostengünstig, größere Spannweiten möglich).",
          "Lebensdauer: 20–25 Jahre bei guter Pflege. Pflege heißt: alle 2–3 Jahre Lasur oder Imprägnierung (Kosten 200–400 € pro Behandlung), bei beschädigten Stellen Holzschutz-Lasur, gegen Pilz- und Insektenbefall regelmäßig prüfen.",
          "Optisch: warm, lebendig, alters- und witterungsabhängig veränderlich (Patina vom hellbraun zum silbergrau bei unbehandelter Lärche). Für Liebhaber dieser Optik unschlagbar.",
        ],
      },
      {
        heading: { text: "Direkter Kostenvergleich über 20 Jahre" },
        table: {
          columns: ["Position", "Aluminium 6063 T6", "Lärche / Douglasie"],
          rows: [
            ["Anfangsinvestition (4 × 3 m)", "8.500 €", "6.500 €"],
            ["Pflege Jahr 1–20", "300 € (Reinigung)", "3.500 € (10× Lasur)"],
            ["Reparaturen (Schimmel, Risse)", "0 €", "1.000 € (geschätzt)"],
            ["Lebensdauer-Wertverlust", "0 % (ersetzt nach 30 J.)", "100 % (Ersatz nach 25 J.)"],
            ["Gesamtkosten 20 Jahre", "~8.800 €", "~11.000 €"],
          ],
        },
      },
      {
        heading: { text: "Welche Argumente sprechen für was?" },
        bullets: [
          "Aluminium: wartungsfrei, korrosionsbeständig, 30+ Jahre Lebensdauer, RAL-Vielfalt, kombiniert mit Glas/Lamellen.",
          "Holz: warme Optik, natürliche Maserung, ökologische Nähe, niedrigere Anfangsinvestition.",
          "Aluminium: ideal bei Lamellendächern (verstellbare Mechanik braucht maßhaltige Profile, die nur Aluminium liefert).",
          "Holz: ideal bei Pergolen mit Stoffsegel oder klassischen Pavillons in mediterranen Architekturen.",
        ],
      },
      {
        heading: { text: "Was wir bei Brait machen" },
        paragraphs: [
          "Brait spezialisiert sich seit 2014 auf Aluminium-Konstruktionen — wir liefern keine Holzanlagen. Grund: Lamellendächer, Glas-Schiebewände und Aufglasmarkisen funktionieren nur mit maßhaltigen Aluminium-Profilen. Wenn Sie Holz wollen, empfehlen wir lokale Schreinerbetriebe in Ulm. Unsere Stärke ist die langlebige, wartungsarme, modular erweiterbare Aluminium-Lösung.",
        ],
      },
    ],
    related: [
      "welche-terrassenueberdachung-passt-zu-ihrem-haus",
      "pflege-und-wartung",
    ],
    relatedProducts: [{ label: "Terrassenüberdachungen", href: "/terrassenueberdachungen" }],
    keywords: [
      "Aluminium vs Holz",
      "Terrassendach Material",
      "Lärche Douglasie Pergola",
    ],
  },

  {
    slug: "pflege-und-wartung",
    title: "Pflege & Wartung Ihrer Aluminium-Überdachung",
    description:
      "Wartungsleitfaden für Brait-Überdachungen: Reinigungs-Intervall, Tuchpflege, Motor-Service, Glas-Reinigung, Dichtung-Check. Für Eigenleistung und Wartungsvertrag.",
    category: "Pflege",
    publishedAt: "2026-04-20",
    readingMinutes: 6,
    image: "/catalog/cube-2.jpg",
    imageAlt: "Wartung Brait Aluminium-Überdachung Ulm",
    tldr: "Aluminium-Konstruktionen mit Pulverbeschichtung sind nahezu wartungsfrei. Reinigung 1× pro Jahr genügt. Bewegliche Teile (Motoren, Lamellen, Markisentücher) brauchen alle 2–3 Jahre eine Inspektion. Brait-Wartungspakete ab 14,90 € pro Monat decken das Komplettpaket ab — inklusive Tuch- und Motorprüfung.",
    sections: [
      {
        heading: { text: "Was muss wirklich gewartet werden?" },
        bullets: [
          "Aluminium-Profile: 1× pro Jahr Reinigung mit Wasser + mildem Reiniger (z.B. Spülmittel). Kein Hochdruckreiniger direkt auf Pulverbeschichtung — kann mikroskopische Risse verursachen.",
          "Glas: 1× pro Jahr Reinigung wie Hausfenster. Bei Vogelkot innerhalb von 2 Wochen entfernen — die Säuren können bei langem Kontakt die Glas-Beschichtung angreifen.",
          "Markisentücher: 2× pro Jahr trockene Bürstenreinigung, bei Verschmutzung Klar-Wasser-Reinigung. Nicht in Waschmaschine — UV-Schutz wird zerstört.",
          "Motoren: alle 3 Jahre Schmierung der Mechanik durch Fachmann. Brait-Wartung beinhaltet das.",
          "Dichtungen: alle 5 Jahre Sichtprüfung. Bei sichtbarer Verhärtung Austausch (50–80 € pro Lippen-Dichtung).",
          "Lamellen: alle 2 Jahre Funktionsprüfung (Drehung 0–135°, Endschalter, Wassersammlung).",
        ],
      },
      {
        heading: { text: "Eigenleistung — Schritt für Schritt" },
        paragraphs: [
          "1. Lose Verschmutzung mit weichem Besen abkehren. 2. Mit Gartenschlauch (max. 3 bar) abspülen. 3. Mit weichem Schwamm und Spülmittel-Wasser einseifen. 4. Mit klarem Wasser nachspülen. 5. Glas mit Mikrofasertuch streifenfrei abwischen.",
          "Für die Markise: Tuch komplett ausgefahren reinigen. Bei feuchten Tagen einrollen vermeiden — bei eingerolltem feuchtem Tuch entwickelt sich Schimmel. Tuch in trockener Wäsche kurz auslüften, dann erst einrollen.",
        ],
      },
      {
        heading: { text: "Brait-Wartungspakete" },
        paragraphs: [
          "Brait bietet drei Wartungs-Stufen:",
        ],
        bullets: [
          "Basic 14,90 €/Monat: 1× pro Jahr Inspektion + Reinigung Aluminium + Funktionsprüfung Motoren.",
          "Premium 24,90 €/Monat: zusätzlich Glas-Reinigung, Tuchpflege, Dichtungs-Check, Hagelschaden-Sofortmeldung.",
          "Komplett 39,90 €/Monat: zusätzlich Motor-Schmierung, Endschalter-Justage, kostenloser Tuch-Austausch im Schadensfall (Selbstbehalt 250 €).",
        ],
      },
      {
        heading: { text: "Schadenserkennung" },
        paragraphs: [
          "Anzeichen, die auf Wartungsbedarf hindeuten: Markise fährt nicht mehr ganz aus oder ein, Motor brummt länger als üblich, Glas-Dichtungen wirken brüchig, Lamellen-Bewegung ruckelt, Wasser sammelt sich in Profilen.",
          "Bei diesen Symptomen früh handeln — Reparaturen kosten weniger als Komplett-Tausch. Brait reagiert auf gemeldete Defekte innerhalb von 5 Werktagen mit Inspektion vor Ort.",
        ],
      },
    ],
    related: ["aluminium-vs-holz"],
    relatedProducts: [{ label: "Wartungspakete", href: "/wartungspakete" }],
    keywords: [
      "Aluminium Pflege",
      "Markise Wartung",
      "Lamellendach Pflege",
    ],
  },

  {
    slug: "energie-sparen-mit-markisen",
    title: "Energie sparen mit Markisen — wie viel Kühlleistung Sie sparen",
    description:
      "Markisen reduzieren Hitze in Innenräumen um 5–10 °C und senken Klimaanlagen-Kosten um 30–50 %. Konkrete Berechnungen für Süd- und Westterrassen, Aufglasmarkisen und Zip-Screens.",
    category: "Energie",
    publishedAt: "2026-04-22",
    readingMinutes: 5,
    image: "/markisen-types/aufglas-main.webp",
    imageAlt: "Aufglasmarkise reduziert Hitze im Wintergarten",
    tldr: "Eine Markise vor einem 3 × 2 m Süd-Fenster reduziert die direkte Sonneneinstrahlung um bis zu 90 %, was im Innenraum 5–10 °C weniger ergibt. Eine Klimaanlage spart dadurch 30–50 % Strom. Über 10 Sommer amortisiert sich die Markisen-Investition allein durch Energieersparnis.",
    sections: [
      {
        heading: { text: "Wie viel Hitze produziert ein Süd-Fenster?" },
        paragraphs: [
          "Ein durchschnittliches Süd-Fenster (3 × 2 m, 6 m²) lässt im Hochsommer (Mittagssonne) bis zu 4.500 Watt Sonnenenergie ins Zimmer. Das entspricht der Heizleistung von 4 mittleren Heizkörpern. Ohne Schutz heizt sich der Raum um 5–10 °C über die Außentemperatur auf.",
          "Eine außenliegende Markise oder ein Zip-Screen blockt 70–90 % dieser Strahlung schon vor dem Glas — die Hitze entsteht gar nicht erst im Raum.",
        ],
      },
      {
        heading: { text: "Innenliegende vs. außenliegende Verschattung" },
        paragraphs: [
          "Innenliegende Verschattung (Plissees, Vorhänge) blockt zwar Licht, aber die Hitze entsteht trotzdem hinter dem Glas. Ergebnis: 30–50 % Hitzereduktion.",
          "Außenliegende Verschattung (Markise, Zip-Screen, Aufglasmarkise) blockt die Strahlung bereits vor dem Glas. Ergebnis: 70–90 % Hitzereduktion. Bei Wintergärten und Glashäusern ist außenliegender Schutz konkurrenzlos.",
        ],
      },
      {
        heading: { text: "Konkrete Stromkosten-Ersparnis" },
        paragraphs: [
          "Eine Klimaanlage verbraucht pro Stunde ca. 1,2 kWh, um 4.500 Watt Hitze abzuführen. Bei einem Strompreis von 0,38 €/kWh kostet eine Stunde Klimatisierung 0,46 €.",
          "An einem heißen Sommertag läuft die Klimaanlage 6 Stunden — das sind 2,76 € pro Tag. Mit Markise reduziert sich das auf 0,80 € pro Tag. Über 60 heiße Sommertage spart das 117 € pro Saison.",
          "Über 10 Jahre = 1.170 € reine Stromersparnis. Eine 3 × 2 m Gelenkarmmarkise kostet 2.200 €. Verbleibender Mehrwert: Komfortgewinn (kühler Wohnraum, kein Klima-Geräusch), keine Trockenheit der Schleimhäute, weniger CO₂-Ausstoß.",
        ],
      },
      {
        heading: { text: "Welche Lösung für welches Fenster?" },
        bullets: [
          "Süd-Fenster im Erdgeschoss: Gelenkarm- oder Aufglasmarkise (horizontaler Schatten).",
          "West-Fenster mit tiefstehender Abendsonne: Senkrechtmarkise oder Zip-Screen (senkrechter Schutz).",
          "Wintergarten oder Pro-Line-Glasdach: Aufglasmarkise direkt aufs Glasdach.",
          "Schlafzimmer-Dachfenster: Senkrecht-Rollo oder externe Verdunklung.",
        ],
      },
      {
        heading: { text: "Wirtschaftlichkeitsrechnung" },
        table: {
          columns: ["Position", "Wert"],
          rows: [
            ["Markise Anschaffung 3 × 2 m", "2.200 €"],
            ["Energie-Ersparnis pro Jahr", "117 €"],
            ["Komfortgewinn pro Jahr (geschätzt)", "150 €"],
            ["Amortisation rein finanziell", "~19 Jahre"],
            ["Amortisation inkl. Komfort", "~8 Jahre"],
          ],
        },
      },
    ],
    related: [
      "welche-terrassenueberdachung-passt-zu-ihrem-haus",
      "markise-vs-pergola-vs-lamellendach",
    ],
    relatedProducts: [
      { label: "Markisen", href: "/markisen" },
    ],
    keywords: [
      "Markisen Energie sparen",
      "Klimaanlage vs Markise",
      "Hitzeschutz Fenster",
    ],
  },
];

export const findArticle = (slug: string) => articles.find((a) => a.slug === slug);
