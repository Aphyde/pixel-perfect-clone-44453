

## Aktualisierter Plan: Erweitertes Produktportfolio

### Neue Produktstruktur (6 Kategorien)

```text
1. Markisen
   ├─ Fallarmmarkisen
   ├─ Gelenkarmmarkisen
   ├─ Senkrechtmarkisen
   └─ Aufglasmarkisen

2. Terrassenüberdachungen
   ├─ Wandbefestigt
   └─ Freistehend

3. Schirme
   ├─ Schwenkbar (Ampelschirme)
   └─ weitere Sonderformen

4. Q-Bus (Kubus)
   └─ Eigenständige Kategorie

5. Eingangsüberdachungen
   └─ Eigenständige Kategorie

6. Carports
   └─ Eigenständige Kategorie
```

(Wintergärten entfällt aus Navigation/Startseite, Datei bleibt technisch bestehen.)

### Architektur

**Zentrale Datenquelle** `src/data/products.ts`:
Eine Quelle für alle Kategorien & Unterprodukte – Navbar, Startseite, Footer und Routen lesen daraus.

**Routen-Struktur**:
- Kategorien mit Unterprodukten: `/markisen`, `/terrassenueberdachungen`, `/schirme` → Übersichtsseiten + Detailseiten (z.B. `/markisen/fallarm`)
- Einzel-Kategorien (kein Unterprodukt-Layer nötig): `/q-bus`, `/eingangsueberdachungen`, `/carports` → direkt Detailseite
- Redirects: alte Pfade (`/wintergaerten`) bleiben erreichbar

**Neue/angepasste Komponenten**:
- `CategoryPageTemplate.tsx` – Übersichtsseite für Kategorien mit Unterprodukten (Markisen, Terrassenüberdachungen, Schirme)
- Bestehendes `ProductPageTemplate.tsx` – wiederverwendet für alle Detailseiten

### Navigation (Navbar)

**Desktop Mega-Menu** – mehrspaltiges Layout:
- Linke Spalte: 6 Kategorien (Hover/Klick aktiviert)
- Rechte Spalte: Unterprodukte mit Bild + Beschreibung
- Bei Q-Bus, Eingangsüberdachungen, Carports: rechte Spalte zeigt direkt das Produkt-Hero

**Mobile**: Akkordeon mit allen 6 Kategorien; Kategorien ohne Unterprodukte sind direkte Links.

### Startseite (`Index.tsx`)

Produkt-Sektion zeigt jetzt **6 Kategorien** statt 3 Produkte:
- Desktop: 3×2 Grid
- Mobile: horizontaler Swipe (bestehendes Pattern)
- Hero-Mobile-Menu wird ebenfalls auf 6 Kategorien aktualisiert

### Bilder

Bestehende Assets werden Platzhaltern zugewiesen, bis du eigene Fotos hochlädst:
- Markisen → `hero-terrasse.jpg` / `detail-terrasse.jpg`
- Terrassenüberdachungen → `product-terrassenueberdachung.jpg`
- Schirme → Platzhalter aus Pool
- Q-Bus → Platzhalter (modernes Design-Bild)
- Eingangsüberdachungen → Platzhalter
- Carports → `hero-carport.jpg` / `product-carport.jpg`

### Texte

Für jedes Unterprodukt/Kategorie generiere ich im Stil deiner bestehenden Seiten:
- Hero-Titel + Subtitle
- Intro-Block
- 6 Features mit Beschreibung
- 8 technische Specs

### Schritte

1. `src/data/products.ts` mit 6-Kategorien-Struktur anlegen
2. `CategoryPageTemplate.tsx` erstellen
3. Detailseiten erstellen (4 Markisen, 2 Terrassen, 2 Schirme, Q-Bus, Eingang, Carports = 11 Seiten)
4. Übersichtsseiten erstellen (Markisen, Terrassenüberdachungen, Schirme = 3 Seiten)
5. `App.tsx` Routen + Redirects erweitern
6. `Navbar.tsx` Mega-Menu auf 6 Kategorien umbauen (Desktop & Mobile)
7. `Index.tsx` Produkt-Sektion auf 6 Kategorien umstellen
8. `Footer.tsx` Links aktualisieren
9. End-to-End testen: alle Routen, Mobile-Menu, Mega-Menu

### Offene Frage

Bei „Schirme" hast du nur „schwenkbar" genannt (Q-Bus ist jetzt eigene Kategorie). Soll die Schirme-Kategorie nur **schwenkbare Schirme** als einziges Unterprodukt enthalten – oder direkt als Einzel-Kategorie ohne Unterproduktebene umgesetzt werden (analog zu Q-Bus/Carports)?

