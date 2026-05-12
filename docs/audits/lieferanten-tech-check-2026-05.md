# Lieferanten-Tech-Check — Brait Überdachung vs. SO Aluminium

**Datum:** 2026-05-12
**Lieferant:** SO Aluminium B.V., Engelseweg 181, 5705 AD Helmond (NL)
**Quelle:** https://soaluminium.nl/ (Overkappingen, Lamellendak, Glazen Schuifwand, Screen, Zonwering, Kozijnen)
**Status:** Alle Brait-Aussagen wurden an die offiziellen Lieferanten-Specs angeglichen.

---

## 1. Executive Summary

Die Audit hat **mehrere kritische Abweichungen** zwischen den Marketing-/Produkttexten auf der Brait-Website und den offiziellen technischen Spezifikationen des Lieferanten SO Aluminium gefunden. Alle Diskrepanzen wurden am 2026-05-12 korrigiert. Code-Änderungen siehe Commit `feat(content): tech-specs an SO-Aluminium Lieferanten-Specs angeglichen`.

### Übersicht

| # | Bereich | Brait (vorher) | Lieferant | Status |
|---|---|---|---|---|
| 1 | Polycarbonat-Stärke | 16 mm | 8 mm | korrigiert |
| 2 | Schiebewand-Spuren | 2–7-spurig | 2–6-spurig | korrigiert |
| 3 | Schiebewand-Max-Höhe | 3.000 mm | 2.600 mm | korrigiert |
| 4 | Pro-Line Pfosten | 14 × 14 cm | 11 × 11 / 15 × 15 cm | korrigiert (15 × 15 als Standard) |
| 5 | Snow-Calc Pfosten | 12 × 12 cm | 11 × 11 / 15 × 15 cm | korrigiert (15 × 15) |
| 6 | VSG-Dicke Eindeckung | VSG 2× 6 mm (12 mm) | 8–10 mm | korrigiert |
| 7 | Standard-Weiß | RAL 9010 | RAL 9016 (Verkehrsweiß) | korrigiert (9010 → Premium-Sonderbestellung) |
| 8 | Glasschiebewand-FAQ | 4–8 mm ESG | 10 mm ESG (einheitlich) | korrigiert |
| 9 | Sparren-Maße (60×40, 80×60 mm) | spezifische Maße | nicht spezifiziert | neutralisiert |

### Ergänzungen aus Lieferanten-Specs (NEU auf Brait-Website)

- Schiebewand-Glasarten: klar / opal / grau getönt
- Schiebewand-Paneelbreiten: 83 / 90 / 98 / 103 cm
- Lamellendach Max-Modulgröße: ca. 6 × 4 m (Modulkopplung für größere Flächen)
- Zip-Screen: bis 85 % Sonnenwärme-Abweisung
- Zip-Screen: Windklasse 3 = ca. 60 km/h (Wert ergänzt)
- Dachneigung Terrassendach: 5–15° (ergänzt in Pro-Line Specs und FAQs)

---

## 2. Detailtabelle: Overkappingen (Pro-Line / Cube)

| Detail | Brait (vorher) | Brait (nachher) | Lieferant | Quelle Lieferant |
|---|---|---|---|---|
| Material Konstruktion | Aluminium 6063 T6, pulverbeschichtet | unverändert | "Gepoedercoat aluminium" | /overkappingen/ |
| Dacheindeckung Polycarbonat | 16 mm | 8 mm | "Polycarbonaat 8 mm" | /overkappingen/ |
| Dacheindeckung VSG | VSG 44.2 (8,76 mm) | VSG 8–10 mm | "Veiligheidsglas 8–10 mm" | /overkappingen/ |
| Dachneigung | nicht erwähnt | 5–15° | "5° tot 15°" | /overkappingen/ |
| Max. Abmessungen | 3–12 m × 2–5 m | unverändert | "Breedte 3–12 m / Diepte 2–5 m" | /overkappingen/ |
| Pfosten (Pro-Line) | 14 × 14 cm | 15 × 15 cm (Standard) oder 11 × 11 cm | "11 × 11 of 15 × 15 cm" | /overkappingen/ |
| Pfosten (Cube) | 15 × 15 cm | unverändert | "15 × 15 cm" | konsistent |
| Windlast | bis 120 km/h | unverändert | "tot 120 km/u" | /overkappingen/ |
| Standardfarben | RAL 7016, 9005, 9001, 9010 | RAL 7016, 9005, 9016, 9001 | "RAL 9016, 7016, 9005, 9001" | /overkappingen/ |
| Wasserableitung | integriert | unverändert | "Geïntegreerde dakgoot" | konsistent |

### Hinweis zur Aluminium-Legierung

SO Aluminium nennt die Legierung nicht explizit ("Gepoedercoat aluminium"). Die Angabe **Aluminium 6063 T6** wurde beibehalten, da:

1. 6063 T6 ist Industrie-Standard für Strangpress-Bauprofile (DIN EN 573-3, EN 755-2).
2. Brait belegt die Spec im internen Glossar ([src/data/glossary.ts](src/data/glossary.ts)) und in Über-uns ([src/app/ueber-uns/page.tsx](src/app/ueber-uns/page.tsx)) mit Eckdaten (Zugfestigkeit 215 N/mm², Dichte 2,7 g/cm³, AlMgSi0,5).
3. Andere veredelte Standard-Alternativen (6005, 6060) werden in der Praxis auch verwendet — eine explizite Bestätigung beim Lieferanten ist empfehlenswert.

**Empfehlung:** Bei nächstem Bestellgespräch SO Aluminium um schriftliche Bestätigung der Legierungs-Spec bitten (E-Mail an info@soaluminium.nl).

---

## 3. Detailtabelle: Lamellendak (Q-Bus)

| Detail | Brait (vorher) | Brait (nachher) | Lieferant | Quelle |
|---|---|---|---|---|
| Lamellen verstellbar | 0–135° | unverändert | "Lamellen kantelen elektrisch" | /lamellendak/ |
| Wasserdicht geschlossen | ja | unverändert | "Volledig waterdicht bij gesloten stand" | /lamellendak/ |
| Steuerung | Somfy IO (Funk + App) | unverändert | "Elektrische motor, afstandsbediening" | konsistent |
| Modulgröße | nicht explizit | bis ca. 6 × 4 m (Kopplung größerer Flächen) | "Tot ca. 6 x 4 meter per module" | /lamellendak/ |
| Pfosten | 15 × 15 cm | unverändert | konsistent | – |

---

## 4. Detailtabelle: Glazen Schuifwand

| Detail | Brait (vorher) | Brait (nachher) | Lieferant | Quelle |
|---|---|---|---|---|
| Glas | 10 mm ESG (gehärtet) | 10 mm ESG, klar / opal / grau getönt | "Veiligheidsglas 10 mm, transparant/opaal/grijs" | /glazen-schuifwand/ |
| Spuren | 2–7-spurig | 2–6-spurig | "2 tot 6-sporig" | /glazen-schuifwand/ |
| FAQ-Glas (Inkonsistenz) | "4–8 mm ESG" | "10 mm ESG" | "10 mm" einheitlich | /glazen-schuifwand/ |
| Max. Höhe | 3.000 mm | 2.600 mm | "Tot 260 cm" | /glazen-schuifwand/ |
| Paneelbreiten | nicht erwähnt | 83 / 90 / 98 / 103 cm | "83, 90, 98 en 103 cm" | /glazen-schuifwand/ |
| Wasserführung | nicht spezifiziert | unverändert (ergänzbar) | "Geïntegreerde waterafvoer via onderrail" | /glazen-schuifwand/ |

---

## 5. Detailtabelle: Screen / Zip-Screen / Senkrechtmarkise

| Detail | Brait (vorher) | Brait (nachher) | Lieferant | Quelle |
|---|---|---|---|---|
| Windklasse | Klasse 3 | Klasse 3 (ca. 60 km/h) — Wert ergänzt | "windklasse 3 (circa 60 km/u)" | /screen/ |
| Sonnenwärme-Abweisung | nicht erwähnt | bis 85 % (neue Feature-Karte + Spec-Zeile) | "Houdt tot 85 % van de zonnewarmte buiten" | /screen/ |
| Tucharten | Acryl, Soltis, PVC-Mesh | + transparent/halbtransparent/verdunkelnd | "transparant, semi-transparant of verduisterend" | /screen/ |
| Antrieb | Funkmotor | + serienmäßig | "Standaard motor" | konsistent |

---

## 6. Detailtabelle: Eingangsüberdachung

| Detail | Brait (vorher) | Brait (nachher) | Lieferant | Hinweis |
|---|---|---|---|---|
| VSG-Dicke | VSG 2× 6 mm (12 mm Gesamt) | VSG 8–10 mm | 8–10 mm (Standard) | außerhalb Standard-Range korrigiert |
| Standardfarben | RAL 7016, 9005, 9001, 9010 | RAL 7016, 9005, 9016, 9001 | RAL 9016 statt 9010 | Verkehrsweiß ist Lieferanten-Standard |

---

## 7. Detailtabelle: Carport

| Detail | Brait (vorher) | Brait (nachher) | Lieferant | Hinweis |
|---|---|---|---|---|
| Eindeckung | "VSG-Glas oder HPL-Platten" | "VSG-Glas 8–10 mm oder Polycarbonat 8 mm (HPL-Platten auf Anfrage)" | nur VSG/PC im Standard-Sortiment | HPL als Sondermaßanfertigung markiert |
| Schneelast | bis 200 kg/m² | unverändert | nicht explizit beim Lieferant | Brait-interne Statik-Spec |

---

## 8. Standardfarben — vorher vs. nachher

### Vorher (products.ts)
```
standardColors = [
  RAL 7016 Anthrazit,
  RAL 9005 Schwarz,
  RAL 9001 "Weiß" (falsches Label — RAL 9001 ist Cremeweiß),
  RAL 9010 "Crème" (falsches Label — RAL 9010 ist Reinweiß),
]
premiumColors = standardColors + RAL 9016 "Verkehrsweiß"
```

### Nachher
```
standardColors = [
  RAL 7016 Anthrazit,
  RAL 9005 Schwarz,
  RAL 9016 Verkehrsweiß,   ← korrekt als Lieferanten-Standard
  RAL 9001 Cremeweiß,      ← Label korrigiert
]
premiumColors = standardColors + RAL 9010 Reinweiß (Sonderbestellung)
```

**Auswirkung Konfigurator:** Der Code `"white"` (für Hero-Bild-Mapping) bleibt erhalten — daher keine Bild-Brüche. Der Farbton, der dem Kunden als "Weiß" gezeigt wird, ist nun Verkehrsweiß (RAL 9016) statt Reinweiß (RAL 9010 = `#FFFFFF`-Annäherung). Das entspricht der echten Lieferanten-Realität: RAL 9016 hat einen kaum sichtbaren Kühl-Anteil, RAL 9010 ist warm-cremig.

---

## 9. Geänderte Dateien

- [src/data/products.ts](../../src/data/products.ts) — Pro-Line, Lamellendach, Schiebewand, Eingangsüberdachung, Carport, Standard-/Premium-Farben, Zip-Screen
- [src/data/configurators.ts](../../src/data/configurators.ts) — RAL 9010 → RAL 9016 in 3 Steps, Polycarbonat 16 → 8 mm
- [src/data/articles.ts](../../src/data/articles.ts) — Sparren-Maße neutralisiert, VSG 2× 6 mm → 8–10 mm
- [src/data/faq.ts](../../src/data/faq.ts) — Schiebewand-Glas, VSG-Dicke (3 Stellen), Pro-Line-Specs
- [src/data/category-content.ts](../../src/data/category-content.ts) — VSG-Dicke, HPL-Hinweis bei Carport, Pfosten-Maße
- [src/data/glossary.ts](../../src/data/glossary.ts) — Sparren-Maße neutralisiert
- [src/lib/calculator/snow-load.ts](../../src/lib/calculator/snow-load.ts) — Pfosten 12 × 12 → 15 × 15, Sparren-Maße entfernt

---

## 10. Lieferanten-Spec-Referenz (Anhang)

### Overkappingen (Stand 2026-05-12)
| Spec | Wert |
|---|---|
| Material | Gepoedercoat aluminium |
| Dakbedekking | Opaal/helder polycarbonaat 8 mm / veiligheidsglas 8–10 mm |
| Dakhelling | 5° tot 15° |
| Afmetingen | Breedte 3–12 m / Diepte 2–5 m |
| Staanders | 11 × 11 cm of 15 × 15 cm |
| Bevestiging | Muur- of plafondbevestiging, gegalvaniseerde verankering |
| Waterafvoer | Geïntegreerde dakgoot met regenpijp |
| Standaardkleur | RAL 9016, RAL 7016, RAL 9005, RAL 9001 |
| Windbelasting | tot 120 km/u |

### Glazen Schuifwand
| Spec | Wert |
|---|---|
| Materiaal glas | Veiligheidsglas (gehard), 10 mm |
| Glastype | Transparent, opaal (melkglas), grijs getint |
| Paneelbreedte | 83, 90, 98, 103 cm |
| Max. hoogte | tot 260 cm |
| Aantal sporen | 2 tot 6-sporig |
| Profielen | Aluminium onder-/bovenprofielen, RAL-kleuren |
| Slotopties | Meenemersysteem, optioneel met slot |

### Lamellendak
| Spec | Wert |
|---|---|
| Lamellen | Elektrisch verstelbaar, waterdicht bij gesloten stand |
| Max. modulegrootte | ca. 6 × 4 m (koppelbaar voor grotere oppervlaktes) |
| Bediening | Elektrisch via afstandsbediening of schakelaar |
| Uitbreidingen | Geïntegreerde LED, terrasverwarming, glazen schuifwanden |

### Screen (Zip-Screen)
| Spec | Wert |
|---|---|
| Zonwering-effectiviteit | tot 85 % van de zonnewarmte buiten |
| Windbestendigheid | windklasse 3 (circa 60 km/u) |
| Doek-opties | Transparant, semi-transparant, verduisterend |
| Bediening | Elektrisch (motor, afstandsbediening) |

### Kozijnen
| Spec | Wert |
|---|---|
| Isolatie | Uf-waarden vanaf 1,0 W/(m²·K) |
| Beglazing | HR++ of triple glas |
| Standaard kleuren | Antraciet, zwart, crème, wit |
| Andere RAL | Op aanvraag |

### Algemene Bedrijfsspecs
| Spec | Wert |
|---|---|
| Standaard levertijd | 2 weken (afhankelijk van maatwerk en voorraad) |
| Maatwerk | Vrijwel alle producten op maat leverbaar |
| Certificering | Voldoet aan CE-normen, extra documentatie op aanvraag |

---

## 11. Empfehlungen für Folge-Aktionen

1. **Schriftliche Bestätigung Aluminium-Legierung** bei SO Aluminium einholen (info@soaluminium.nl). Falls 6063 T6 nicht bestätigt: Aussage in Glossar und Über-uns-Seite präzisieren.

2. **HPL-Platten für Carport**: Klären, ob HPL als Sondermaßanfertigung über SO Aluminium oder über separaten Lieferanten bezogen wird. Aktuell als "auf Anfrage" markiert.

3. **Schneelast 200 kg/m²**: Statik-Berechnung in den Akten verifizieren (Brait-interne Spec, beim Lieferanten nicht ausgewiesen).

4. **Bildmaterial Farben**: Konfigurator-Hero-Bilder für `code: "white"` zeigen aktuell vermutlich Reinweiß-Renderings. Bei nächster Bild-Aktualisierung auf RAL 9016 Verkehrsweiß umstellen, damit Visualizer der echten Farbe entspricht.

5. **Regelmäßiger Recheck**: Lieferanten-Specs ändern sich gelegentlich. Empfohlen: Quartalsweise diese Audit-Datei aktualisieren oder bei jeder Bestellung Datenblätter mit-archivieren.
