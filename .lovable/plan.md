

## Plan: Katalog-Integration (ohne SO Aluminium Branding)

### Entscheidungen
- **Keine Zubehör-Kategorie** – Module nur im Konfigurator + als Sektion auf Terrassen-Detailseiten
- **Lamellendach** als 3. Unterprodukt unter Terrassenüberdachungen (neben Wandbefestigt/Freistehend)
- **Logo-Wasserzeichen** bleiben auf Bildern
- **SO Aluminium nirgends erwähnen** – Brait tritt als Hersteller/Anbieter auf
- **Qualitätsstufen** für Terrassendächer: PRO-LINE (Standard) / LUXALINE CUBE (Premium Glas) / LAMELDAK CABRIO (Premium Lamellen) – auch als Konfigurator-Auswahl

### Schritte

**1. Bilder extrahieren** (~60 aus PDF) → `src/assets/catalog/`, sinnvoll umbenennen, ohne SO-Aluminium-Texte in Dateinamen

**2. `src/data/products.ts` erweitern**
- Wandbefestigt + Freistehend: echte PRO-LINE Specs (3-12×2-5m, Polycarbonat 16mm / VSG 44.2, Pfosten 14×14, 120 km/h, integrierte Dachrinne, RAL 7016/9005/9001/9010 + Maßanfertigung)
- **Neu: Lamellendach** als drittes Unterprodukt unter `/terrassenueberdachungen/lamellendach` (Cabrio-Specs: elektrisch Somfy IO, Verkehrsweiß zusätzlich, Pfosten 15×15)
- Q-Bus mit echten Cube-Specs füllen (3-7×3-4,5m, serienmäßige LED, Verkehrsweiß-Option)
- Carports/Eingangsüberdachungen: Specs übernehmen wo passend

**3. Module-Sektion auf Terrassen-Detailseiten** (`ProductPageTemplate.tsx` erweitern)
- Neue optionale Sektion „Erweiterungen & Module" für Terrassen-Produkte
- 8 Module als Cards: Glasschiebewände, Schiebetür, Festrahmen, Keilblende, Seitenwand, Zipscreen, Plissee, Sonnenschutz Oberdach
- Jeweils Bild + Kurzbeschreibung + Specs – kein eigener Routing-Layer
- Daten in `products.ts` als `modules: []` pro Produkt

**4. Konfigurator-Erweiterung (`/konfigurator`)**
- **Modell-Stufe**: PRO-LINE / LUXALINE CUBE / LAMELDAK CABRIO mit korrekten Min/Max-Maßen pro Modell
- **5 echte RAL-Farben** statt Platzhalter
- **Dachdeckung**: Polycarbonat 16mm / VSG 44.2 (klar/opal/getönt) – abhängig vom Modell
- **Module als Extras** (Checkboxen): Glasschiebewand, Schiebetür, Festrahmen, Screen, Plissee, Sonnenschutz, LED, Somfy IO Steuerung
- **Pfostenstärke** automatisch je Modell (14×14 vs. 15×15)

**5. Vertrauens-Sektion auf Startseite** (neu zwischen Produkten und Karte)
- KPI-Bar (umformuliert für Brait): „15+ Jahre Erfahrung", „3000+ realisierte Projekte", „9.4 Kundenbewertung"
- Qualitätshinweis: „Premium Pulverbeschichtung", „Aluminium 6063 T6", „CE-zertifiziert"
- **Keine** Erwähnung von SO Aluminium oder Tiger Drylac (Markenname des Lieferanten)

**6. Routing**
- Neu: `/terrassenueberdachungen/lamellendach` (automatisch via dynamischem ProductRoute, sobald in `products.ts`)
- Mega-Menu Navbar zeigt automatisch die 3 Terrassen-Unterprodukte

### Was NICHT gebaut wird
- Keine Top-Level „Zubehör"-Kategorie
- Keine Modul-Detailseiten mit eigenem Routing
- Keine B2B-Partner-Seite
- Kein 4-Phasen-Lieferanten-Prozess

### Offene Punkte (entscheide ich pragmatisch, falls nichts kommt)
- KPIs (15+ Jahre, 3000+ Projekte) sind Lieferanten-Zahlen – ich formuliere sie generisch („Mit Aluminium-Systemen aus europäischer Premium-Fertigung") oder lasse sie weg, falls sie für Brait nicht stimmen. **Sag Bescheid, ob deine Brait-Werte anders sind.**

