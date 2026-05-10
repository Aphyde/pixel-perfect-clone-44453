export interface Location {
  slug: string;
  city: string;
  region: string;
  /** km von Ulm. */
  distanceFromUlm: number;
  /** Postleitzahl-Bereich. */
  postalCodes: string[];
  /** TL;DR (1-2 Sätze, citability-optimiert). */
  tldr: string;
  /** Zwei Absätze über lokale Besonderheiten. */
  description: string[];
  /** Schneelast- und Klima-Hinweis. */
  climate: string;
  /** Häufige Hausstile / Architektur-Hinweis. */
  architecture: string;
  /** Anreise / Transit-Info. */
  transit: string;
  /** 3-5 lokale FAQs. */
  faqs: { question: string; answer: string }[];
  /** Top-3 Produkt-Empfehlungen für die Region. */
  topProducts: { label: string; href: string; reason: string }[];
}

export const locations: Location[] = [
  {
    slug: "ulm",
    city: "Ulm",
    region: "Baden-Württemberg",
    distanceFromUlm: 0,
    postalCodes: ["89073", "89075", "89077", "89079", "89081"],
    tldr:
      "Ulm ist Brait-Heimatmarkt: Sitz in Dornstadt, vollständige Service-Abdeckung in allen Stadtteilen — von Söflingen über die Weststadt bis Wiblingen. Schneelastzone 2a, Windzone 2.",
    description: [
      "Brait Überdachungen ist seit 2014 in Ulm aktiv. Wir kennen die baurechtliche Situation jedes Stadtteils — von der denkmalgeschützten Altstadt (Münsterplatz, Fischerviertel) über die gewachsenen Wohngebiete in Söflingen, Eselsberg und Lehr bis zu den Neubaugebieten in Wiblingen, Donaustetten und Eggingen.",
      "In der Altstadt sind Genehmigungen aufwendiger — wir empfehlen schmale Pro-Line-Profile in Anthrazit RAL 7016, die zurückhaltend wirken und meist genehmigungsfähig sind. In Neubaugebieten gelten oft B-Plan-Festsetzungen, die wir vor Auftrag prüfen.",
    ],
    climate:
      "Schneelastzone 2a (Bodenschneelast 1,32 kN/m²), Windzone 2 (Bemessungswind 25,2 m/s). Brait-Standardstatik (200 kg/m² Dachlast) ist ausreichend. Häufige Westwinde im Donautal — Windsensor empfohlen bei freistehenden Markisen.",
    architecture:
      "Mischung aus Gründerzeit-Mehrfamilienhäusern (Innenstadt), Einfamilienhäusern der 60er–80er Jahre (Eselsberg, Söflingen) und modernen Neubauten (Wiblingen, Donaustetten). Anthrazit RAL 7016 ist die häufigste Wunschfarbe und passt zu fast allen Fassadentypen.",
    transit:
      "Brait-Standort Dornstadt liegt 8 km nördlich der Ulmer Innenstadt, direkt an der A8. Anfahrt zu Kunden in der Stadt 15–25 min, in den Stadtteilen 10–20 min.",
    faqs: [
      {
        question: "Wie schnell kann Brait einen Termin in Ulm machen?",
        answer:
          "In der Regel innerhalb von 2–5 Werktagen — wir reservieren feste Slots für Demo-Koffer-Termine in Ulm und 30 km Umkreis.",
      },
      {
        question: "Wie ist die Genehmigungslage in der Ulmer Altstadt?",
        answer:
          "Die Altstadt unterliegt teilweise Denkmalschutz und einer Erhaltungssatzung. Jede Terrassenüberdachung ist genehmigungspflichtig. Wir erstellen die Bauunterlagen und reichen sie für Sie beim Stadtbauamt ein (350–650 € Pauschale).",
      },
      {
        question: "Welche Schneelast hat Ulm?",
        answer:
          "Ulm liegt komplett in Schneelastzone 2a (Bodenschneelast 1,32 kN/m²). Brait-Standardstatik trägt 200 kg/m² Dachlast — mehr als ausreichend für die maximalen Schneelasten der Region.",
      },
    ],
    topProducts: [
      {
        label: "Pro-Line Terrassenüberdachung",
        href: "/terrassenueberdachungen/pro-line",
        reason: "Klassische Wahl für Ulmer Reihen- und Einfamilienhäuser",
      },
      {
        label: "Markisen",
        href: "/markisen",
        reason: "Sonnenschutz für Süd- und Westterrassen mit Donau-Blick",
      },
      {
        label: "Q-Bus Lamellen-Pergola",
        href: "/q-bus",
        reason: "Premium-Outdoor-Lounge in Wiblingen, Eselsberg, Lehr",
      },
    ],
  },

  {
    slug: "neu-ulm",
    city: "Neu-Ulm",
    region: "Bayern (Schwaben)",
    distanceFromUlm: 3,
    postalCodes: ["89231", "89233"],
    tldr:
      "Neu-Ulm: bayerische Doppelstadt zu Ulm, Schneelastzone 2a, ähnliche Nachfrage-Struktur. Brait-Anfahrt 15–20 Minuten, alle Stadtteile abgedeckt.",
    description: [
      "Neu-Ulm bildet mit Ulm einen gemeinsamen Wirtschafts- und Wohnraum. Wir haben in den letzten Jahren Projekte in Pfuhl, Reutti, Burlafingen, Holzschwang und der Innenstadt umgesetzt. Bayerische Bauordnung statt LBO BW — die Verfahrensfreiheit ist ähnlich (BayBO Art. 57: Terrassenüberdachungen bis 30 m² grundsätzlich genehmigungsfrei).",
      "Besonderheit: in Neu-Ulm gilt die bayerische Bauordnung. Abstandsflächen werden teilweise anders berechnet als in BW. Wir prüfen das vor jedem Auftrag.",
    ],
    climate: "Schneelastzone 2a (1,32 kN/m²), Windzone 2. Identisches Klima zu Ulm.",
    architecture:
      "Vorwiegend Einfamilienhäuser der 70er–90er Jahre, in Pfuhl und Reutti auch Bauernhöfe und ländliche Neubauten. Helle Putzfassaden mit Anthrazit-Akzenten häufig.",
    transit: "10 km von Brait-Standort Dornstadt, Anfahrt 15–20 min via B10/B28.",
    faqs: [
      {
        question: "Gilt in Neu-Ulm die bayerische oder badenwürttembergische Bauordnung?",
        answer:
          "Bayerische Bauordnung (BayBO). Verfahrensfreiheit für Terrassenüberdachungen bis 30 m² ist analog, aber Abstandsflächen werden nach Art. 6 BayBO berechnet (0,4 H, mindestens 3 m).",
      },
      {
        question: "Wie hoch ist die Schneelast in Neu-Ulm?",
        answer:
          "Wie Ulm: Zone 2a, 1,32 kN/m² Bodenschneelast. Brait-Standardstatik trägt mit Sicherheitsreserve.",
      },
      {
        question: "Liefert Brait nach Neu-Ulm?",
        answer:
          "Ja, Neu-Ulm gehört zum Brait-Kern-Service-Gebiet. Anfahrt aus Dornstadt 15–20 min, Demo-Koffer-Termine kostenlos.",
      },
    ],
    topProducts: [
      {
        label: "Pro-Line Terrassenüberdachung",
        href: "/terrassenueberdachungen/pro-line",
        reason: "Standard für Reihenhäuser in Pfuhl und Innenstadt",
      },
      {
        label: "Carports",
        href: "/carports",
        reason: "Beliebt in den Bauernhof-nahen Ortsteilen Reutti und Holzschwang",
      },
      {
        label: "Markisen",
        href: "/markisen",
        reason: "Hitzeschutz für Süd-Terrassen",
      },
    ],
  },

  {
    slug: "memmingen",
    city: "Memmingen",
    region: "Bayern (Schwaben)",
    distanceFromUlm: 56,
    postalCodes: ["87700", "87719", "87727"],
    tldr:
      "Memmingen: 56 km südlich von Ulm an der A7. Schneelastzone 2 mit lokalen Erhöhungen Richtung Allgäu. Brait-Service voll abgedeckt, Anfahrt 50–60 min.",
    description: [
      "Memmingen liegt am Übergang vom Donautal zum Allgäu. Wir bedienen die Stadt und das Umland (Buxheim, Ottobeuren, Bad Wörishofen) komplett. Architektur-Mix: Altstadt mit historischen Fassaden, Wohngebiete mit klassischer Putz-Architektur, Neubaugebiete im typischen Allgäu-Stil mit Holzelementen.",
      "Wir haben in Memmingen besonders viele Lamellendächer verkauft — das Allgäu-Klima mit längeren Winterperioden macht die ganzjährig nutzbare Bioklimatik attraktiv.",
    ],
    climate:
      "Schneelastzone 2 (1,06 kN/m²) im Stadtgebiet, Zone 2a/3 in höheren Lagen Richtung Allgäu. Längere Winterperioden, höhere Niederschläge als Ulm.",
    architecture:
      "Historische Altstadt (denkmalgeschützt — Bauanträge nötig), Putz-Einfamilienhäuser, Allgäu-typische Neubauten mit Holzelementen. Anthrazit und Tiefschwarz beliebt.",
    transit: "56 km via A7. Brait fährt 1× pro Woche fest in die Region — Termine flexibel planbar.",
    faqs: [
      {
        question: "Liefert Brait nach Memmingen?",
        answer:
          "Ja. Memmingen ist im 100-km-Service-Gebiet. Wir bedienen die Stadt und Umlandsgemeinden komplett, mit Anfahrt 50–60 min.",
      },
      {
        question: "Was ist mit der höheren Schneelast im Allgäu?",
        answer:
          "Wir berechnen jede Anlage auf den exakten Standort. Bei Bauten in höheren Lagen Richtung Allgäu (über 600 m) verstärken wir Sparren und Pfosten — Mehrkosten 8–12 %.",
      },
      {
        question: "Welches System empfiehlt Brait für das Allgäu-Klima?",
        answer:
          "Lamellendach (Q-Bus oder Q-Bus Lamellen-Pergola) — durch Bioklimatik ganzjährig nutzbar, geschlossen wasserdicht. Im Allgäu der häufigste Verkauf.",
      },
    ],
    topProducts: [
      {
        label: "Q-Bus Lamellen-Pergola",
        href: "/q-bus",
        reason: "Top-Verkauf im Allgäu wegen Wettersicherheit",
      },
      {
        label: "Lamellendach",
        href: "/terrassenueberdachungen/lamellendach",
        reason: "Wandbefestigte Premium-Variante",
      },
      {
        label: "Carports",
        href: "/carports",
        reason: "Hagelschlagsicher in Hagelhochrisiko-Region",
      },
    ],
  },

  {
    slug: "augsburg",
    city: "Augsburg",
    region: "Bayern (Schwaben)",
    distanceFromUlm: 80,
    postalCodes: ["86150", "86152", "86153", "86154", "86157", "86161"],
    tldr:
      "Augsburg: 80 km östlich von Ulm an der A8. Größte Stadt im Brait-Service-Gebiet, vielfältige Architektur und Schneelastzone 2.",
    description: [
      "Augsburg ist mit 295.000 Einwohnern die größte Stadt im Brait-Service-Gebiet. Wir bedienen alle Stadtteile (Lechhausen, Pfersee, Göggingen, Hochzoll, Haunstetten) sowie das Umland (Friedberg, Stadtbergen, Königsbrunn, Gersthofen).",
      "Architektur-Spektrum von Renaissance-Bürgerhäusern (Maximilianstraße — denkmalgeschützt) bis zu Hochhaus-Neubauten in der Hammerschmiede. Wir liefern entsprechend differenziert: Pro-Line für Standardgebäude, Cube für moderne Reihenhäuser, Q-Bus für gewerbliche Outdoor-Bereiche (Restaurants, Hotels).",
    ],
    climate: "Schneelastzone 2 (1,06 kN/m²), Windzone 2. Eher trockenere Sommer als Ulm.",
    architecture:
      "Renaissance-Altstadt (denkmalgeschützt), Gründerzeit-Mehrfamilienhäuser, Reihenhäuser der 60er–90er, moderne Neubauten. Vielfältige Anforderungen, breites Brait-Portfolio.",
    transit:
      "80 km via A8 — Anfahrt 1 h. Brait fährt 1–2× pro Woche zu Augsburger Kunden. Demo-Koffer-Termin flexibel planbar.",
    faqs: [
      {
        question: "Liefert Brait Markisen und Terrassendächer nach Augsburg?",
        answer:
          "Ja, Augsburg liegt im 100-km-Service-Gebiet. Wir haben über 30 Projekte in der Stadt und im Umland realisiert.",
      },
      {
        question: "Wie schnell kann ich einen Termin in Augsburg bekommen?",
        answer:
          "Innerhalb 1–2 Wochen. Wir bündeln Augsburger Termine, wenn möglich — falls Sie keine Zeitvorgabe haben, ergibt sich oft eine kürzere Wartezeit.",
      },
      {
        question: "Sind in Augsburg dieselben Bauvorschriften wie in Ulm?",
        answer:
          "Nein. Augsburg gehört zu Bayern (BayBO statt LBO BW). Verfahrensfreiheit für Terrassenüberdachungen bis 30 m² existiert auch dort, aber Abstandsflächen-Berechnung ist anders.",
      },
    ],
    topProducts: [
      {
        label: "Q-Bus Lamellen-Pergola",
        href: "/q-bus",
        reason: "Beliebt bei Gastronomie und Hotellerie in Augsburger Innenstadt",
      },
      {
        label: "Pro-Line Terrassenüberdachung",
        href: "/terrassenueberdachungen/pro-line",
        reason: "Standard für Reihen- und Einfamilienhäuser",
      },
      {
        label: "Eingangsüberdachungen",
        href: "/eingangsueberdachungen",
        reason: "Auf Bestellung viele Vordächer in Augsburger Wohngebieten",
      },
    ],
  },

  {
    slug: "heidenheim",
    city: "Heidenheim an der Brenz",
    region: "Baden-Württemberg",
    distanceFromUlm: 50,
    postalCodes: ["89522", "89518", "89520"],
    tldr:
      "Heidenheim: 50 km nördlich von Ulm im Brenztal. Schneelastzone 2 im Tal, 2a/3 auf der Schwäbischen Alb. Brait-Service voll abgedeckt.",
    description: [
      "Heidenheim ist Industrie- und Wohnstadt im Brenztal, umgeben von der Schwäbischen Alb. Wir bedienen die Stadt und die umliegenden Gemeinden (Giengen, Sontheim, Steinheim, Königsbronn).",
      "Besonderheit: Häuser auf der Schwäbischen Alb (höher als 600 m, z.B. in Heidenheim-Schnaitheim) brauchen verstärkte Statik wegen Schneelastzone 3.",
    ],
    climate: "Tallage Zone 2, Höhenlagen ab 600 m Zone 3 (1,89 kN/m²). Mehr Schnee als in Ulm.",
    architecture: "Gemischte Wohngebiete der 60er–90er, Neubaugebiete am Hang.",
    transit: "50 km via B10/A7 — Anfahrt 50 min. Brait fährt regelmäßig.",
    faqs: [
      {
        question: "Was kostet ein Lamellendach in Heidenheim mit verstärkter Statik?",
        answer:
          "Bei Lage in Zone 3 ergibt sich ein Mehrpreis von 8–12 % gegenüber Standardzone 2. Bei einem 4 × 3,5 m Lamellendach Standard 15.500 € → in Zone 3 ca. 17.000 €.",
      },
      {
        question: "Welche Schneelastzone hat Heidenheim?",
        answer:
          "Tallage (Stadtzentrum, Aufhausen): Zone 2 (1,06 kN/m²). Höhenlagen ab 600 m: Zone 3 (1,89 kN/m²). Wir prüfen den exakten Standort.",
      },
    ],
    topProducts: [
      {
        label: "Lamellendach",
        href: "/terrassenueberdachungen/lamellendach",
        reason: "Schneesicher und ganzjährig nutzbar",
      },
      {
        label: "Carports",
        href: "/carports",
        reason: "Hagelschutz für die Wohngebiete am Hang",
      },
      {
        label: "Pro-Line",
        href: "/terrassenueberdachungen/pro-line",
        reason: "Standard für Tallage-Wohngebiete",
      },
    ],
  },

  {
    slug: "goeppingen",
    city: "Göppingen",
    region: "Baden-Württemberg",
    distanceFromUlm: 65,
    postalCodes: ["73033", "73035", "73037"],
    tldr:
      "Göppingen: 65 km nordwestlich von Ulm am Rand der Schwäbischen Alb. Schneelastzone 2 mit lokalen Erhöhungen. Brait-Service voll abgedeckt.",
    description: [
      "Göppingen ist Industriezentrum im Filstal mit gemischter Wohnbebauung. Wir bedienen Stadt und Umland (Rechberghausen, Heiningen, Salach, Süßen, Donzdorf).",
      "Häufige Anfragen: Pro-Line und Cube für klassische Einfamilienhäuser, Markisen für Miethäuser und Wohnungen.",
    ],
    climate: "Zone 2 im Tal, Zone 2a/3 in Höhenlagen Richtung Hohenstaufen.",
    architecture: "Klassische Reihenhäuser, Einfamilienhäuser der 70er–90er, einige Neubaugebiete.",
    transit: "65 km via A8/B10 — Anfahrt 65–80 min.",
    faqs: [
      {
        question: "Liefert Brait nach Göppingen?",
        answer: "Ja, Göppingen ist im Service-Gebiet. Anfahrt 65–80 min, Termine alle 1–2 Wochen.",
      },
      {
        question: "Welche Höhenlagen sind kritisch?",
        answer:
          "Häuser am Hohenstaufen-Hang oder im Albtrauf brauchen Zone-3-Statik. Wir prüfen vor jedem Angebot.",
      },
    ],
    topProducts: [
      { label: "Pro-Line", href: "/terrassenueberdachungen/pro-line", reason: "Reihen- und Einfamilienhäuser" },
      { label: "Markisen", href: "/markisen", reason: "Beliebt für Süd-/West-Terrassen" },
      { label: "Carports", href: "/carports", reason: "Wartungsfreie Aluminium-Lösung" },
    ],
  },

  {
    slug: "aalen",
    city: "Aalen",
    region: "Baden-Württemberg",
    distanceFromUlm: 70,
    postalCodes: ["73430", "73431", "73432"],
    tldr:
      "Aalen: 70 km nördlich von Ulm im Ostalbkreis. Schneelastzone 2/2a, Brait-Service voll abgedeckt.",
    description: [
      "Aalen ist Verwaltungssitz des Ostalbkreises, eingebettet zwischen Welzheimer Wald und Härtsfeld. Wir bedienen Aalen und die Umlandsgemeinden (Hüttlingen, Essingen, Bopfingen).",
      "Wir haben in Aalen viele Cube-Konstruktionen verkauft — die freistehende Variante passt gut zu den oft großen Grundstücken in der Region.",
    ],
    climate: "Zone 2/2a, in höheren Lagen 2a/3.",
    architecture: "Einfamilien- und Doppelhäuser, einige große Grundstücke mit Garten-Lounges.",
    transit: "70 km via B29 — Anfahrt 75 min.",
    faqs: [
      {
        question: "Liefert Brait nach Aalen?",
        answer: "Ja, Aalen ist im 100-km-Service-Gebiet. Wir kommen alle 2 Wochen.",
      },
    ],
    topProducts: [
      {
        label: "Cube freistehend",
        href: "/terrassenueberdachungen/cube",
        reason: "Beliebt auf großen Grundstücken in Aalen",
      },
      { label: "Q-Bus", href: "/q-bus", reason: "Premium-Outdoor-Lounge" },
      { label: "Markisen", href: "/markisen", reason: "Klassischer Sonnenschutz" },
    ],
  },

  {
    slug: "guenzburg",
    city: "Günzburg",
    region: "Bayern (Schwaben)",
    distanceFromUlm: 30,
    postalCodes: ["89312", "89331"],
    tldr:
      "Günzburg: 30 km östlich von Ulm an der A8. Schneelastzone 2, Brait-Service voll abgedeckt mit kurzer Anfahrt.",
    description: [
      "Günzburg liegt im Donautal, bekannt durch das Legoland. Bauliche Mischung aus historischer Innenstadt, klassischen Wohngebieten und Neubaugebieten in Reisensburg und Wasserburg.",
      "Anfahrt aus Dornstadt 30 min — Günzburg gehört zum Brait-Kern-Service-Gebiet mit kurzfristig verfügbaren Terminen.",
    ],
    climate: "Zone 2 (1,06 kN/m²), Windzone 2. Identisch zum Donautal um Ulm.",
    architecture: "Historische Altstadt (Bauanträge), klassische Wohngebiete, Neubaugebiete.",
    transit: "30 km via A8 — Anfahrt 30 min. Brait reserviert dedizierte Slots.",
    faqs: [
      {
        question: "Wie schnell kann ich einen Termin in Günzburg bekommen?",
        answer: "Innerhalb 1 Woche — Günzburg gehört zum Kern-Service-Gebiet.",
      },
    ],
    topProducts: [
      { label: "Pro-Line", href: "/terrassenueberdachungen/pro-line", reason: "Häufigste Wahl in Wohngebieten" },
      { label: "Markisen", href: "/markisen", reason: "Beliebt für Süd-Terrassen" },
      {
        label: "Eingangsüberdachungen",
        href: "/eingangsueberdachungen",
        reason: "Vordächer für klassische Wohngebiete",
      },
    ],
  },

  {
    slug: "biberach",
    city: "Biberach an der Riss",
    region: "Baden-Württemberg",
    distanceFromUlm: 38,
    postalCodes: ["88400"],
    tldr:
      "Biberach: 38 km südwestlich von Ulm. Schneelastzone 2, in Höhenlagen 2a. Kurze Anfahrt, kompletter Brait-Service.",
    description: [
      "Biberach ist Kreisstadt mit gewachsener Innenstadt und vielen klassischen Wohngebieten. Wir bedienen Biberach und Umlandsgemeinden (Laupheim, Warthausen, Ummendorf, Mittelbiberach).",
      "Besonderheit: Biberach hat eine historische Altstadt mit Erhaltungssatzung. Bauanträge sind dort komplexer — wir übernehmen die komplette Behörden-Kommunikation.",
    ],
    climate: "Zone 2 (1,06 kN/m²) im Tal, lokal 2a in höheren Lagen.",
    architecture: "Historische Altstadt mit Erhaltungssatzung, klassische Reihen- und Einfamilienhäuser.",
    transit: "38 km via B30 — Anfahrt 35–45 min.",
    faqs: [
      {
        question: "Sind Terrassenüberdachungen in der Biberacher Altstadt erlaubt?",
        answer:
          "Mit Bauantrag und denkmalrechtlicher Genehmigung — wir empfehlen schmale Pro-Line-Profile in Anthrazit, die meistens genehmigt werden.",
      },
    ],
    topProducts: [
      { label: "Pro-Line", href: "/terrassenueberdachungen/pro-line", reason: "Standard in Wohngebieten" },
      { label: "Markisen", href: "/markisen", reason: "Sonnenschutz für Süd-Terrassen" },
      { label: "Carports", href: "/carports", reason: "Beliebt im Umland" },
    ],
  },

  {
    slug: "reutlingen",
    city: "Reutlingen",
    region: "Baden-Württemberg",
    distanceFromUlm: 95,
    postalCodes: ["72760", "72762", "72764", "72766"],
    tldr:
      "Reutlingen: 95 km westlich von Ulm am Albtrauf. Schneelastzone 2, in Höhenlagen 2a/3. Im Brait-Service-Gebiet, Anfahrt 1,5 Stunden.",
    description: [
      "Reutlingen ist Großstadt am Fuß der Schwäbischen Alb, mit gewachsener Innenstadt und vielen Wohngebieten am Albtrauf. Wir bedienen Reutlingen und Tübingen einmal monatlich, Termine auf Anfrage flexibel.",
      "Besonderheit: Häuser am Albtrauf (z.B. Pfullingen, Eningen, Lichtenstein) liegen oft auf 500–700 m Höhe und brauchen verstärkte Statik.",
    ],
    climate:
      "Zone 2 im Tal, Zone 2a/3 am Albtrauf. Mehr Schnee als in Ulm, häufigere Wetterumschwünge.",
    architecture:
      "Innenstadt mit historischen Fassaden, Wohngebiete der 60er–90er Jahre, Neubaugebiete am Hang.",
    transit: "95 km via A8/B312 — Anfahrt 1,5 h. Brait kombiniert Termine in Reutlingen + Tübingen.",
    faqs: [
      {
        question: "Liefert Brait nach Reutlingen?",
        answer:
          "Ja, Reutlingen liegt am Rand des 100-km-Service-Gebiets. Wir kombinieren Termine mit Tübingen — typische Wartezeit 2–4 Wochen.",
      },
      {
        question: "Brauche ich verstärkte Statik in Pfullingen oder am Albtrauf?",
        answer:
          "Ja, ab 500 m Höhe rechnen wir Zone 2a, ab 600 m Zone 3. Mehrpreis 8–12 % gegenüber Standard.",
      },
    ],
    topProducts: [
      {
        label: "Lamellendach",
        href: "/terrassenueberdachungen/lamellendach",
        reason: "Schneesicher und ganzjährig nutzbar",
      },
      { label: "Pro-Line", href: "/terrassenueberdachungen/pro-line", reason: "Standard für Tallage" },
      { label: "Q-Bus", href: "/q-bus", reason: "Wettersichere Outdoor-Lounge" },
    ],
  },
];

export const findLocation = (slug: string) => locations.find((l) => l.slug === slug);
