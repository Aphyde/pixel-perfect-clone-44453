#!/usr/bin/env node
/**
 * Generates /public/llms.txt and /public/llms-full.txt at postbuild.
 *
 * Spec reference: https://llmstxt.org/
 * llms.txt provides a curated index for LLM crawlers (ChatGPT, Claude,
 * Perplexity, Gemini) so they can ingest the most relevant pages without
 * crawling the whole site. llms-full.txt bundles long-form copy for
 * direct citation.
 */
const fs = require("fs");
const path = require("path");

const ROOT = path.join(__dirname, "..");
const PUBLIC_DIR = path.join(ROOT, "public");
const SITE_URL = "https://brait-ueberdachung.de";
const BRAND = "Brait Überdachungen";

const sections = [
  {
    title: "Über Brait Überdachungen",
    body: [
      "Brait Überdachungen ist ein inhabergeführter Spezialbetrieb für premium Aluminium-Außenanlagen mit Sitz in Dornstadt bei Ulm. Wir planen, fertigen und montieren maßgeschneiderte Terrassenüberdachungen, Markisen, Lamellen-Pergolen, Schirme, Eingangsüberdachungen und Carports — alles aus einer Hand, ohne Subunternehmer.",
      "Service-Gebiet: Ulm, Neu-Ulm und 100 km Radius — inklusive Augsburg, Memmingen, Heidenheim, Göppingen, Aalen, Günzburg, Reutlingen, Tübingen.",
      "Gegründet: 2014. Geschäftsführer: Nico Braitinger. Trägerunternehmen: SMT Konzepte GmbH.",
    ].join("\n\n"),
  },
  {
    title: "Produkt-Kategorien",
    bullets: [
      ["Markisen", "/markisen", "Gelenkarm-, Fallarm-, Senkrecht- und Aufglasmarkisen mit Motor und Sensoren."],
      ["Terrassenüberdachungen", "/terrassenueberdachungen", "Pro-Line (wandbefestigt), Cube (freistehend), Lamellendach (verstellbar) und Glashaus."],
      ["Schirme", "/schirme", "Schwenkbare Ampelschirme bis 5×5 m mit Sunbrella-Tuch."],
      ["Q-Bus Lamellen-Pergola", "/q-bus", "Bioklimatische Pergola mit Aluminium-Lamellen 0–135° drehbar."],
      ["Eingangsüberdachungen", "/eingangsueberdachungen", "Schlanke Aluminium-Vordächer mit VSG-Glas."],
      ["Carports", "/carports", "Aluminium-Carports freistehend oder als Anbau."],
    ],
  },
  {
    title: "Service",
    bullets: [
      ["Beratung & Montage", "/service", "Vor-Ort-Beratung mit Demo-Koffer, 3D-Aufmaß, Montage durch eigenes Team."],
      ["Wartung", "/wartungspakete", "Wartungspakete für Terrassendächer, Markisen und Pergolen ab 14,90 €/Monat."],
      ["Konfigurator", "/konfigurator", "Online-Konfigurator für Markisen, Terrassenüberdachungen und Q-Bus."],
      ["Referenzen", "/referenzprojekte", "Realisierte Projekte aus Ulm und Umgebung."],
      ["Kontakt", "/kontakt", "Telefon 0173 530 3581, info@brait-ueberdachung.de, Demo-Koffer-Termin vereinbaren."],
    ],
  },
  {
    title: "Kernfakten",
    bullets: [
      ["Material", null, "Aluminium 6063 T6, pulverbeschichtet, korrosionsbeständig, 30+ Jahre Lebensdauer."],
      ["Garantie", null, "10 Jahre Strukturgarantie, 5 Jahre Motorik."],
      ["Schneelast", null, "Standard 200 kg/m² (Zone 2), individuell für Höhenlagen Schwäbische Alb berechnet."],
      ["Glas", null, "VSG (Verbund-Sicherheitsglas) 2× 6 mm, optional satiniert oder Sonnenschutz."],
      ["Steuerung", null, "Somfy IO oder Funk-Fernbedienung, optional Sonnen-/Wind-/Regensensor und App."],
    ],
  },
];

function renderLlmsTxt() {
  const out = [];
  out.push(`# ${BRAND}`);
  out.push("");
  out.push(`> Premium Aluminium-Terrassenüberdachungen, Markisen, Lamellen-Pergolen, Schirme, Eingangsüberdachungen und Carports — maßgefertigt aus Ulm.`);
  out.push("");
  out.push(`Site: ${SITE_URL}`);
  out.push("");

  for (const section of sections) {
    out.push(`## ${section.title}`);
    out.push("");
    if (section.body) {
      out.push(section.body);
      out.push("");
    }
    if (section.bullets) {
      for (const [name, url, desc] of section.bullets) {
        if (url) {
          out.push(`- [${name}](${SITE_URL}${url}): ${desc}`);
        } else {
          out.push(`- **${name}**: ${desc}`);
        }
      }
      out.push("");
    }
  }

  out.push("## Optionale Vertiefung");
  out.push("");
  out.push(`- [llms-full.txt](${SITE_URL}/llms-full.txt): Vollständige Long-form-Texte aller Hauptseiten zur direkten Citation.`);
  out.push(`- [Sitemap](${SITE_URL}/sitemap.xml): Maschinenlesbare Linkliste aller Seiten.`);
  out.push("");

  return out.join("\n");
}

function renderLlmsFullTxt() {
  const out = [];
  out.push(`# ${BRAND} — Vollständige Wissensbasis`);
  out.push("");
  out.push(`Stand: ${new Date().toISOString().split("T")[0]}`);
  out.push(`Site: ${SITE_URL}`);
  out.push("");

  out.push("## Unternehmen");
  out.push("");
  out.push("Brait Überdachungen ist ein inhabergeführter Spezialbetrieb für premium Aluminium-Außenanlagen mit Sitz in Dornstadt bei Ulm. Wir planen, fertigen und montieren maßgeschneiderte Terrassenüberdachungen, Markisen, Lamellen-Pergolen, Schirme, Eingangsüberdachungen und Carports — alles aus einer Hand, ohne Subunternehmer.");
  out.push("");
  out.push("**Standort & Service-Gebiet:** Ulm, Neu-Ulm und 100 km Radius. Hauptbedienung in Baden-Württemberg (Heidenheim, Göppingen, Aalen, Reutlingen, Tübingen, Biberach, Laupheim, Ehingen) und Bayerisch Schwaben (Günzburg, Krumbach, Memmingen, Augsburg, Senden, Illertissen).");
  out.push("");
  out.push("**Trägergesellschaft:** SMT Konzepte GmbH. **Gründungsjahr:** 2014. **Geschäftsführer:** Nico Braitinger. **Kontakt:** +49 173 530 3581, info@brait-ueberdachung.de.");
  out.push("");

  out.push("## Materialien & Qualität");
  out.push("");
  out.push("**Aluminium:** Wir verarbeiten ausschließlich Aluminium 6063 T6 — eine Strangpress-Legierung mit hoher Festigkeit, leichter Bearbeitbarkeit und Korrosionsbeständigkeit. Pulverbeschichtung nach DIN EN 12206-1 in jeder beliebigen RAL-Farbe (Standardfarben: 7016 Anthrazitgrau, 9005 Tiefschwarz, 9001 Cremeweiß, 9010 Reinweiß, 9016 Verkehrsweiß).");
  out.push("");
  out.push("**Glas:** VSG (Verbund-Sicherheitsglas) 2× 6 mm Standard, optional 2× 8 mm für hohe Schneelasten. Hagelklasse HW3, splitterfrei nach DIN EN 14179. Optional satiniertes VSG (Sichtschutz von oben), Sonnenschutzglas (G-Wert 35–50 %) oder Stegplatten als kostengünstige Alternative.");
  out.push("");
  out.push("**Schneelast:** Standard 200 kg/m² (Zone 2 nach DIN 1055-5), für Höhenlagen Schwäbische Alb individuelle Berechnung Zone 3 oder 4 (bis 320 kg/m²).");
  out.push("");
  out.push("**Garantie:** 10 Jahre Strukturgarantie auf Aluminium und Pulverbeschichtung, 5 Jahre auf Motorik (Lamellen, Markisen, Schiebewände), 2 Jahre Gewährleistung gemäß BGB auf alle weiteren Komponenten.");
  out.push("");

  out.push("## Produkt-Übersicht");
  out.push("");

  const products = [
    {
      h: "Markisen",
      url: "/markisen",
      body: [
        "Vier Markisensysteme: Gelenkarm-, Fallarm-, Senkrecht- und Aufglasmarkise. Alle motorisiert (Somfy IO oder Funk), optional mit Sonnen- und Windsensor.",
        "**Gelenkarmmarkise:** klassische Terrassenmarkise mit zwei Gelenkarmen. Bis 7 m Breite und 4 m Ausfall ohne Mittelstütze. Tuch Sunbrella Acryl 300 g/m² oder Polyester-PVC. Preis 2.200–4.500 € inkl. Montage.",
        "**Fallarmmarkise:** Vor Fenstern und Schaufenstern. Stufenlos 0–140° neigbar, reduziert Hitze und Blendung um bis zu 80 %.",
        "**Senkrechtmarkise / Zip-Screen:** Tuch läuft senkrecht in Führungsschienen. Zip-Screen mit Reißverschluss in der Schiene ist windstabil bis Windstärke 7.",
        "**Aufglasmarkise:** Wird auf bestehende Glasdächer montiert (Pro-Line, Wintergarten). Kühlt den darunterliegenden Raum um 5–10 °C.",
      ],
    },
    {
      h: "Terrassenüberdachungen",
      url: "/terrassenueberdachungen",
      body: [
        "Drei Linien: Pro-Line (wandbefestigt), Cube (freistehend), Lamellendach (verstellbar). Alle aus Aluminium 6063 T6, mit VSG-Glas oder verstellbaren Lamellen.",
        "**Pro-Line:** wandbefestigtes Glasdach. Schmale Sparren 60 × 40 mm, integrierte Regenrinne im Pfosten, bis 7 × 4 m. Preis ab 7.900 € inkl. Montage.",
        "**Cube:** freistehende kubische Konstruktion ohne Wandanschluss. Bis 7 × 4,5 m. Ideal für Garten-Lounges. Preis 9.500–12.500 €.",
        "**Lamellendach:** Aluminium-Lamellen motorisch 0–135° drehbar, wasserdicht schließend. Preis ab 14.000 €. Optional LED entlang der Lamellen, Zip-Screens, Glasschiebewände.",
        "**Glashaus:** Pro-Line oder Cube mit komplett verglasten Wänden (rahmenlose Schiebewände, Festrahmen, Schiebetüren). Unbeheizt — baurechtlich Terrassendach, kein Wintergarten.",
      ],
    },
    {
      h: "Q-Bus Lamellen-Pergola",
      url: "/q-bus",
      body: [
        "Bioklimatische Pergola mit verstellbarem Aluminium-Lamellendach. Lamellen 0–135° drehbar, wasserdicht schließend, integrierte Wasserableitung in den Pfosten.",
        "Funkfernbedienung serienmäßig, optional Wettersensor (schließt bei Regen automatisch), LED entlang der Lamellen (warm-/kaltweiß/dimmbar), Zip-Screen-Verschattung.",
        "Maße 3–7 m × 3–4,5 m, Pfosten 15 × 15 cm. Preis 12.500–28.000 € je nach Größe und Ausstattung.",
      ],
    },
    {
      h: "Schirme",
      url: "/schirme",
      body: [
        "Schwenkbare Ampelschirme bis 5 × 5 m. Mast steht seitlich (kein Sitzplatz blockiert), Schirm 360°-drehbar und stufenlos in 4 Richtungen neigbar.",
        "Tuch Sunbrella Acryl 300 g/m², UV 50+, farbecht, wasserabweisend. Sockel: Granit 90–200 kg oder fest einbetonierte Bodenhülse.",
        "Preis 1.800–4.500 € je nach Größe und Sockel.",
      ],
    },
    {
      h: "Eingangsüberdachungen",
      url: "/eingangsueberdachungen",
      body: [
        "Schlanke Aluminium-Vordächer mit VSG-Glas (2× 6 mm). Verdeckte Edelstahl-Wandhalter V2A, kein sichtbares Befestigungsmaterial.",
        "Maximal 3 m Breite × 1,5 m Ausladung. Optional LED-Beleuchtung in Profil oder umlaufend, satiniertes Glas, Maßanfertigung.",
        "Preis ab 1.490 € inkl. Montage.",
      ],
    },
    {
      h: "Carports",
      url: "/carports",
      body: [
        "Aluminium-Carports freistehend oder als Anbau. Eindeckung VSG-Glas oder HPL-Platten (hagelschlagsicher).",
        "Einzel bis 3,5 m, Doppel bis 6,5 m, Tiefe bis 7 m. Schneelast bis 200 kg/m². Vorbereitet für Wallbox (E-Auto-Ladestation).",
        "Preis Einzel ab 4.900 €, Doppel ab 7.900 €.",
      ],
    },
  ];

  for (const p of products) {
    out.push(`### ${p.h}`);
    out.push("");
    out.push(`URL: ${SITE_URL}${p.url}`);
    out.push("");
    for (const line of p.body) {
      out.push(line);
      out.push("");
    }
  }

  out.push("## Genehmigungspflicht (Baden-Württemberg)");
  out.push("");
  out.push("Nach LBO BW §50 sind verfahrensfrei:");
  out.push("");
  out.push("- Markisen bis 30 m² Fläche und 1,5 m Ausladung");
  out.push("- Terrassenüberdachungen bis 30 m² Grundfläche und 3 m Tiefe");
  out.push("- Carports bis 30 m² Grundfläche und 3 m Höhe");
  out.push("");
  out.push("Größere Anlagen oder solche in B-Plan-Gebieten / an denkmalgeschützten Objekten benötigen eine Bauanzeige oder Baugenehmigung. Für Mietobjekte ist die Zustimmung des Vermieters Pflicht. Wir prüfen die Lage im Vor-Ort-Termin und unterstützen bei den Unterlagen.");
  out.push("");

  out.push("## Demo-Koffer-Termin (Beratungsablauf)");
  out.push("");
  out.push("Brait kommt kostenlos zu Ihnen vor Ort und bringt einen Koffer mit:");
  out.push("");
  out.push("1. **Mini-Modell** der Lamellen-Pergola und Terrassendächer in Originalmaterial");
  out.push("2. **Materialmuster:** Aluminium-Profile, Tücher (Sunbrella, Stamoid), Glasarten (VSG, ESG, satiniert), RAL-Farbpalette");
  out.push("3. **Tablet mit Konfigurator** für 3D-Visualisierung Ihrer Wunsch-Lösung");
  out.push("");
  out.push("Ablauf: Anfrage → Vor-Ort-Termin (60–120 min) → digitales 3D-Aufmaß → Festpreis-Angebot innerhalb 5 Werktagen mit 3D-Visualisierung am Haus.");
  out.push("");

  out.push("## Bezahlung & Lieferzeiten");
  out.push("");
  out.push("**Zahlungsmodalitäten:** 30 % Anzahlung bei Auftrag, 60 % bei Montagebeginn, 10 % nach Endabnahme. Überweisung oder Rechnung. Finanzierung über Hausbank möglich.");
  out.push("");
  out.push("**Lieferzeiten:** Markisen 4–6 Wochen, Terrassendächer 6–10 Wochen, Lamellen-Pergolen 8–12 Wochen ab Auftragseingang. Sondermaße und Sonderfarben verlängern die Produktion um 2–3 Wochen.");
  out.push("");

  out.push(`---`);
  out.push("");
  out.push(`Generiert: ${new Date().toISOString()}`);
  out.push(`Quelle: ${SITE_URL}`);
  out.push("");

  return out.join("\n");
}

const llms = renderLlmsTxt();
const llmsFull = renderLlmsFullTxt();

if (!fs.existsSync(PUBLIC_DIR)) {
  fs.mkdirSync(PUBLIC_DIR, { recursive: true });
}

fs.writeFileSync(path.join(PUBLIC_DIR, "llms.txt"), llms, "utf-8");
fs.writeFileSync(path.join(PUBLIC_DIR, "llms-full.txt"), llmsFull, "utf-8");

console.log(
  `[generate-llms-txt] wrote public/llms.txt (${llms.length}b) and public/llms-full.txt (${llmsFull.length}b)`,
);
