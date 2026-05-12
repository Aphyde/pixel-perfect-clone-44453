export interface GlossaryTerm {
  /** kebab-case Term-ID, eindeutig. */
  slug: string;
  /** Anzeige-Name. */
  name: string;
  /** Optionale Synonyme für Auto-Linker. */
  synonyms?: string[];
  /** 1-3 Sätze, faktisch, citability-optimiert. */
  description: string;
  /** Optionale Vertiefung als Paragraph. */
  longDescription?: string;
  /** Kategorie-Tag für Filter-/Gruppierung. */
  category:
    | "Markisen"
    | "Terrassendach"
    | "Pergola"
    | "Material"
    | "Glas"
    | "Steuerung"
    | "Bauphysik"
    | "Recht";
  /** Verwandte Term-Slugs. */
  related?: string[];
}

export const glossaryTerms: GlossaryTerm[] = [
  {
    slug: "lamellendach",
    name: "Lamellendach",
    synonyms: ["Lamellenpergola", "Bioklimatische Pergola"],
    description:
      "Ein Lamellendach ist eine Terrassen- oder Pergola-Konstruktion mit motorisch verstellbaren Aluminium-Lamellen. Die Lamellen drehen sich von 0° (offen) bis 135° (geschlossen wasserdicht) und ermöglichen Sonne, Schatten oder Regenschutz auf Knopfdruck.",
    longDescription:
      "Das Lamellendach kombiniert die Vorteile einer offenen Pergola (volle Belüftung, freier Blick zum Himmel) mit denen eines Glasdachs (Wetterschutz). Premium-Modelle wie die Brait Q-Bus haben integrierte Wasserableitung in den Pfosten und können mit LED, Zip-Screens und Glasschiebewänden ergänzt werden.",
    category: "Pergola",
    related: ["pergola", "bioklimatik", "aluminium-6063-t6"],
  },
  {
    slug: "gelenkarmmarkise",
    name: "Gelenkarmmarkise",
    description:
      "Klassische Markise mit zwei seitlichen Gelenkarmen, die das Tuch nach vorne ausfahren. Die Gelenkarme arbeiten mit Federvorspannung und halten das Tuch unter Spannung — daher kein Mittelstützen-Bedarf bis 7 m Breite.",
    category: "Markisen",
    related: ["fallarmmarkise", "kassettenmarkise", "sunbrella"],
  },
  {
    slug: "fallarmmarkise",
    name: "Fallarmmarkise",
    description:
      "Markise, die mit zwei Fallarmen vor ein Fenster oder einen Balkon ausfährt. Stufenlos von 0° (waagerecht) bis 140° (fast senkrecht) neigbar — ideal vor Schaufenstern und gegen Aufheizung von Räumen.",
    category: "Markisen",
    related: ["gelenkarmmarkise", "senkrechtmarkise"],
  },
  {
    slug: "senkrechtmarkise",
    name: "Senkrechtmarkise",
    description:
      "Markise, deren Tuch in seitlichen Führungsschienen senkrecht nach unten fährt. Schützt vor tiefstehender Sonne, Wind und Sicht. Ohne Reißverschluss-System („Open“).",
    category: "Markisen",
    related: ["zip-screen", "fallarmmarkise"],
  },
  {
    slug: "zip-screen",
    name: "Zip-Screen",
    synonyms: ["Zipscreen", "Zip-Markise"],
    description:
      "Senkrechtmarkise mit Reißverschluss-System: Das Tuch ist seitlich mit einem Zipper in der Führungsschiene verbunden — windstabil bis Windstärke 7 (50–61 km/h). Standard-Verschattung an Lamellen-Pergolen.",
    category: "Markisen",
    related: ["senkrechtmarkise", "lamellendach"],
  },
  {
    slug: "kassettenmarkise",
    name: "Kassettenmarkise",
    description:
      "Markise, deren Tuch und Mechanik im eingefahrenen Zustand vollständig in einem Aluminium-Gehäuse („Kassette“) verschlossen sind. Schützt vor Feuchtigkeit, Schmutz und UV — Empfehlung für ganzjährige Außenmontage.",
    category: "Markisen",
    related: ["gelenkarmmarkise", "halbkassette"],
  },
  {
    slug: "halbkassette",
    name: "Halbkassette",
    description:
      "Markisenbauart, bei der das eingerollte Tuch von oben durch eine Aluminium-Blende geschützt ist, die Unterseite aber offen bleibt. Günstigere Alternative zur Vollkassette, weniger wettergeschützt.",
    category: "Markisen",
    related: ["kassettenmarkise"],
  },
  {
    slug: "aufglasmarkise",
    name: "Aufglasmarkise",
    description:
      "Markise, die direkt auf einem Glasdach (Wintergarten, Pro-Line-Terrassendach) montiert wird. Kühlt den Raum unter dem Glasdach um 5–10 °C, indem sie die Sonneneinstrahlung vor dem Glas abblockt.",
    category: "Markisen",
    related: ["pro-line", "glashaus"],
  },
  {
    slug: "pergola",
    name: "Pergola",
    description:
      "Frei stehende oder angebaute Konstruktion über einer Terrasse oder im Garten — historisch aus Holz mit Pflanzenbewuchs, modern aus Aluminium mit Lamellen oder Stoffdach. Im engeren Sinn ohne festes Dach, mit beweglichem Sonnenschutz.",
    category: "Pergola",
    related: ["lamellendach", "bioklimatik"],
  },
  {
    slug: "bioklimatik",
    name: "Bioklimatische Pergola",
    description:
      "Pergola mit verstellbaren Lamellen, die das Mikroklima darunter regulieren — Sonneneinstrahlung, Belüftung und Niederschlag werden aktiv gesteuert. Synonym für hochwertiges Lamellendach.",
    category: "Pergola",
    related: ["lamellendach", "pergola"],
  },
  {
    slug: "pro-line",
    name: "Pro-Line",
    description:
      "Brait-Modellname für die wandbefestigte Aluminium-Glas-Terrassenüberdachung mit schmalen Aluminium-Sparren und integrierter Regenrinne im Pfosten (15 × 15 cm Standard, optional schlank 11 × 11 cm).",
    category: "Terrassendach",
    related: ["cube", "glashaus"],
  },
  {
    slug: "cube",
    name: "Cube",
    description:
      "Brait-Modellname für die freistehende kubische Terrassenüberdachung ohne Wandanschluss. Bis 7 × 4,5 m, ideal als Garten-Lounge oder dort, wo keine Hauswand zur Verfügung steht.",
    category: "Terrassendach",
    related: ["pro-line", "lamellendach"],
  },
  {
    slug: "glashaus",
    name: "Glashaus",
    description:
      "Terrassenüberdachung mit Glasdach UND verglasten Wänden (Schiebe- oder Festrahmen). Unbeheizt — baurechtlich Terrassenüberdachung, kein Wintergarten. Übergangsraum zwischen Außen und Innen.",
    longDescription:
      "Im Gegensatz zum Wintergarten ist das Glashaus nicht beheizt und unterliegt nicht der Energieeinsparverordnung (GEG). Es ist daher 40–50 % günstiger und meist genehmigungsfrei (BW: bis 30 m²).",
    category: "Terrassendach",
    related: ["pro-line", "wintergarten", "schiebewand"],
  },
  {
    slug: "wintergarten",
    name: "Wintergarten",
    description:
      "Beheizter, ganzjährig nutzbarer verglaster Anbau am Haus. Baurechtlich Wohnraum mit hohen Anforderungen an Wärmedämmung (GEG), Statik und Brandschutz. Genehmigungspflichtig.",
    category: "Terrassendach",
    related: ["glashaus"],
  },
  {
    slug: "aluminium-6063-t6",
    name: "Aluminium 6063 T6",
    description:
      "Strangpress-Aluminium-Legierung (AlMgSi0,5) im Temperzustand T6 — warmausgehärtet. Standard für hochwertige Profile in der Bautechnik: hoch fest, korrosionsbeständig, gut pulverbeschichtbar. Dichte 2,7 g/cm³, Zugfestigkeit 215 N/mm².",
    category: "Material",
    related: ["pulverbeschichtung", "ral-farbe"],
  },
  {
    slug: "pulverbeschichtung",
    name: "Pulverbeschichtung",
    description:
      "Beschichtungsverfahren, bei dem ein elektrostatisch geladenes Polymerpulver auf das Aluminium aufgetragen und im Ofen bei 180–200 °C eingebrannt wird. Ergebnis: harte, UV-stabile, korrosionsbeständige Oberfläche mit 30+ Jahren Lebensdauer. Verfahren nach DIN EN 12206-1.",
    category: "Material",
    related: ["aluminium-6063-t6", "ral-farbe"],
  },
  {
    slug: "ral-farbe",
    name: "RAL-Farbe",
    description:
      "Farbnormen-System des Reichsausschusses für Lieferbedingungen — heute „RAL Deutsches Institut für Gütesicherung und Kennzeichnung“. Standardfarben bei Brait: 7016 Anthrazitgrau, 9005 Tiefschwarz, 9001 Cremeweiß, 9010 Reinweiß, 9016 Verkehrsweiß.",
    category: "Material",
  },
  {
    slug: "vsg",
    name: "VSG (Verbund-Sicherheitsglas)",
    synonyms: ["Verbundsicherheitsglas"],
    description:
      "Glas aus zwei oder mehr Floatglas-Scheiben, die durch eine reißfeste PVB- oder EVA-Folie verbunden sind. Bei Bruch kleben Splitter an der Folie — kein Herabfallen. Standard für Glasdächer und Vordächer. Hagelklasse HW3 nach DIN EN 14179.",
    category: "Glas",
    related: ["esg", "hagelklasse"],
  },
  {
    slug: "esg",
    name: "ESG (Einscheiben-Sicherheitsglas)",
    description:
      "Thermisch vorgespanntes Glas: bei Bruch zerfällt es in stumpfkantige Krümel. Hohe Schlagfestigkeit, ideal für Schiebewände und vertikale Verglasungen. Nicht splitterfrei wie VSG.",
    category: "Glas",
    related: ["vsg", "schiebewand"],
  },
  {
    slug: "schiebewand",
    name: "Glasschiebewand",
    description:
      "Vertikale Wand aus Glas-Schiebeelementen, die seitlich ineinander oder in eine Park-Position fahren. Rahmenlos (frameless) oder mit schmalem Aluminium-Rahmen. Wird bei Glashäusern und Lamellen-Pergolen eingesetzt.",
    category: "Glas",
    related: ["esg", "schiebetuer"],
  },
  {
    slug: "schiebetuer",
    name: "Schiebetür",
    description:
      "Aluminium-gerahmte Tür mit horizontalem Lauf in einer Schiebeschiene. Im Gegensatz zur Glasschiebewand mit höherer Wärmedämmung und Schloss-Möglichkeit — Übergang zum Wintergarten.",
    category: "Glas",
    related: ["schiebewand", "festrahmen"],
  },
  {
    slug: "festrahmen",
    name: "Festrahmen",
    description:
      "Fest verglaste, nicht zu öffnende Glasfläche in Aluminium-Rahmen. Für unbewegliche Wände an Lamellen-Pergolen oder Glashäusern. Maximale Glas-Flächenhalterung mit minimaler Profilstärke.",
    category: "Glas",
  },
  {
    slug: "schneelastzone",
    name: "Schneelastzone",
    description:
      "Geographische Einteilung Deutschlands in 5 Zonen nach DIN 1055-5. Ulm liegt in Zone 2a (Schneelast 1,32 kN/m² am Boden), Schwäbische Alb ab 600 m in Zone 3 (1,89 kN/m²). Bestimmt die Statik einer Überdachung.",
    category: "Bauphysik",
    related: ["windlastzone", "statik"],
  },
  {
    slug: "windlastzone",
    name: "Windlastzone",
    description:
      "Einteilung Deutschlands in 4 Windzonen nach DIN EN 1991-1-4. Bestimmt den Bemessungswind für Dächer und Wände. Ulm liegt in Zone 2 (Bemessungswind 25,2 m/s).",
    category: "Bauphysik",
    related: ["schneelastzone"],
  },
  {
    slug: "u-wert",
    name: "U-Wert",
    description:
      "Wärmedurchgangskoeffizient, gemessen in W/(m²·K). Gibt an, wie viel Energie pro m² Glasfläche bei 1 K Temperaturunterschied verloren geht. Modernes Doppelverglasungs-VSG: U-Wert 1,1; 3-fach-Verglasung: 0,6.",
    category: "Bauphysik",
  },
  {
    slug: "hagelklasse",
    name: "Hagelklasse",
    description:
      "Klassifikation der Widerstandsfähigkeit von Bauteilen gegen Hagelschlag nach VKF-Hagelregister: HW1 (kleine Hagelkörner) bis HW5 (große Hagelkörner > 5 cm). VSG-Standard ist HW3, HPL-Platten erreichen HW4–HW5.",
    category: "Bauphysik",
    related: ["vsg"],
  },
  {
    slug: "somfy-io",
    name: "Somfy IO",
    description:
      "Bidirektionales Funkprotokoll des Herstellers Somfy für Markisen-, Lamellen- und Verschattungs-Motoren. Verschlüsselte 868 MHz-Funkkommunikation mit Status-Rückmeldung, Smart-Home-Integration und App-Steuerung möglich.",
    category: "Steuerung",
    related: ["windsensor", "sonnensensor"],
  },
  {
    slug: "windsensor",
    name: "Windsensor",
    description:
      "Anemometer, der bei Erreichen einer Schwellen-Windgeschwindigkeit die Markise automatisch einfährt. Empfehlung bei jeder motorisierten Markise — verlängert die Lebensdauer und verhindert Sturmschäden.",
    category: "Steuerung",
    related: ["sonnensensor", "regensensor"],
  },
  {
    slug: "sonnensensor",
    name: "Sonnensensor",
    description:
      "Helligkeitssensor, der die Markise bei Sonneneinstrahlung über einer Schwelle automatisch ausfährt. Funktion an Lamellendächern: Lamellen schließen sich teilweise zur Mittagszeit für gleichbleibenden Schatten.",
    category: "Steuerung",
    related: ["windsensor"],
  },
  {
    slug: "regensensor",
    name: "Regensensor",
    description:
      "Sensor, der bei Niederschlag die Markise einfährt oder Lamellen schließt. Wichtig bei Lamellendächern, damit der Innenraum trocken bleibt — fährt automatisch in geschlossene, wasserdichte Position.",
    category: "Steuerung",
    related: ["windsensor", "lamellendach"],
  },
  {
    slug: "sunbrella",
    name: "Sunbrella",
    description:
      "Markenname für hochwertige Acryl-Markisentücher des Herstellers Glen Raven. Spinndüsengefärbt (UV-stabil 10+ Jahre), schimmel- und wasserabweisend, 300 g/m². Markt-Standard bei Premium-Markisen.",
    category: "Material",
    related: ["stamoid"],
  },
  {
    slug: "stamoid",
    name: "Stamoid",
    description:
      "Polyester-PVC-Markisentuch, robuster gegen mechanische Belastung als Acryl. Standardmaterial für Gastronomie- und Industrie-Markisen. Höhere Wasserdichtigkeit, geringere Atmungsaktivität.",
    category: "Material",
    related: ["sunbrella"],
  },
  {
    slug: "lbo",
    name: "LBO Baden-Württemberg",
    description:
      "Landesbauordnung Baden-Württemberg. §50 + Anlage 1 listet verfahrensfreie Bauvorhaben: Markisen, Terrassenüberdachungen und Carports bis 30 m² Grundfläche und 3 m Tiefe sind ohne Bauantrag zulässig.",
    category: "Recht",
    related: ["abstandsflache"],
  },
  {
    slug: "abstandsflache",
    name: "Abstandsfläche",
    description:
      "Mindestabstand zwischen Bauwerken und Nachbargrundstücksgrenzen, geregelt in LBO BW §5. Standardmaß: 0,4 × Wandhöhe, mindestens 2,5 m. Für Carports und freistehende Überdachungen 3 m zu Nachbargrenzen.",
    category: "Recht",
    related: ["lbo"],
  },
];

export const findGlossaryTerm = (slug: string) =>
  glossaryTerms.find((t) => t.slug === slug);

export const groupedGlossary = () => {
  const map = new Map<string, GlossaryTerm[]>();
  for (const t of glossaryTerms) {
    const arr = map.get(t.category) ?? [];
    arr.push(t);
    map.set(t.category, arr);
  }
  return [...map.entries()].sort(([a], [b]) => a.localeCompare(b));
};
