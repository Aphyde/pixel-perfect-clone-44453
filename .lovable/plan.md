

## Plan: Kategorie-spezifische Konfiguratoren + unverbindlicher CTA

### Konzept

Aktuell ist `/konfigurator` nur für Terrassenüberdachungen. Wir machen daraus **6 spezialisierte Konfiguratoren** – einen pro Produktkategorie – mit jeweils sinnvollen Schritten/Optionen, getrieben aus einer zentralen Config-Datei.

### Routing-Struktur

```text
/konfigurator                       → Übersichtsseite (6 Kategorien als Auswahl)
/konfigurator/markisen              → Markisen-Konfigurator
/konfigurator/terrassenueberdachungen → bestehender Terrassen-Konfigurator (3 Modelle)
/konfigurator/schirme               → Schirm-Konfigurator
/konfigurator/q-bus                 → Q-Bus-Konfigurator
/konfigurator/eingangsueberdachungen → Eingangs-Konfigurator
/konfigurator/carports              → Carport-Konfigurator
```

Außerdem: „Konfigurieren"-Buttons auf den Kategorie- und Produktseiten verlinken jetzt direkt auf den passenden Kategorie-Konfigurator (mit ggf. vorausgewähltem Modell).

### Schritte pro Konfigurator (kategorie-spezifisch)

| Kategorie | Schritte |
|---|---|
| **Markisen** | Typ (Fallarm/Gelenkarm/Senkrecht/Aufglas) → Maße (Breite/Ausfall) → Tuchfarbe → Gestellfarbe → Antrieb (Kurbel/Motor) → Sensoren (Wind/Sonne) → LED-Beleuchtung |
| **Terrassenüberdachungen** | (bestehend) Modell → Maße → Montage → Dachdeckung → Farbe → Module |
| **Schirme** | Typ (Schwenkbar/sonst.) → Größe → Farbe Stoff → Mast-Position → Beleuchtung → Heizung |
| **Q-Bus** | Maße (3-7×3-4,5m) → Glasart (klar/getönt) → Farbe inkl. Verkehrsweiß → LED-Stufen → Glasschiebewände → Screens |
| **Eingangsüberdachungen** | Form (gerade/gebogen) → Breite/Tiefe → Material Dach (Glas/Polycarbonat) → Farbe → Seitenteile |
| **Carports** | Typ (Einzel/Doppel/Reihe) → Maße → Dachform → Farbe → Wände/Tore → Solar-Vorbereitung |

### Architektur

**Neue Datei `src/data/configurators.ts`** – zentrale Config:
```ts
export const configurators = {
  markisen: { label, hero, steps: [...], extras: [...] },
  terrassenueberdachungen: { ... },
  schirme: { ... },
  ...
}
```

**Neue Datei `src/pages/KonfiguratorRoute.tsx`** – dynamischer Loader, der die richtige Konfig zur URL lädt und an eine generische Konfigurator-Komponente weitergibt.

**Refactoring `src/pages/Konfigurator.tsx`**:
- Wird zur Übersichts-/Auswahlseite (6 große Kategorie-Karten, Hover-Bilder, kurze Beschreibung).
- Bestehende Konfigurator-Logik wandert in eine neue Komponente `src/components/konfigurator/ConfiguratorEngine.tsx`, die generisch über die Step-Definitionen rendert.

**Generische Engine-Schritttypen**:
- `select-cards` (z.B. Modell, Typ, Form)
- `dimensions` (Slider mit Min/Max)
- `colors` (RAL-Palette)
- `radio-icon` (z.B. Antrieb Kurbel/Motor)
- `extras-toggle` (Checkbox-Module)

So ist jede Kategorie nur Daten – kein neuer Code.

### CTA-Button: unverbindlich + kostenlos kommunizieren

**Aktueller Button**: „Abschließen" (impliziert Kauf)

**Neu** im Footer-Bereich des Konfigurators:
- Großer Button-Text: **„Unverbindliche Anfrage senden"**
- Untertext direkt darunter: **„Kostenlos & unverbindlich · Antwort innerhalb von 24 h"**
- Mini-Vertrauensicons: ✓ Kostenfrei  ✓ Ohne Kaufverpflichtung  ✓ Persönliche Beratung
- Auf der **`Anfrage`-Seite** zusätzlich oben einen Vertrauens-Banner: „Diese Anfrage ist 100 % kostenlos und unverbindlich."

### Anfrage-Seite anpassen
`Anfrage.tsx` erhält in `ConfigData` zusätzliche Felder (Kategorie, dynamische Optionen), damit z.B. „Antrieb: Funkmotor" oder „Tuchfarbe: …" sauber dargestellt werden – generisch via Liste statt fester Felder.

### Navbar / Verlinkungen
- Navbar-Link „Konfigurator" zeigt weiterhin auf `/konfigurator` (jetzt Übersicht).
- Mega-Menu jeder Kategorie bekommt einen kleinen „→ Konfigurator starten"-Link.
- „Konfigurieren"-Buttons auf Produkt-Detailseiten verlinken auf `/konfigurator/{categorySlug}` mit `?model={productSlug}` als Vorbelegung.

### Schritte (Implementierung)

1. `src/data/configurators.ts` mit allen 6 Kategorie-Configs anlegen
2. `ConfiguratorEngine.tsx` als generische Render-Komponente bauen (alle Step-Typen)
3. `KonfiguratorRoute.tsx` für `/konfigurator/:categorySlug` anlegen + in `App.tsx` routen
4. `Konfigurator.tsx` zur Übersichtsseite umbauen
5. CTA-Button + Vertrauens-Texte umformulieren (auch im Anfrage-Flow)
6. `Anfrage.tsx` für dynamische Optionen erweitern
7. Verlinkungen in Navbar, ProductPageTemplate, CategoryPageTemplate, Index aktualisieren
8. End-to-End testen: alle 6 Konfiguratoren, Anfrage-Flow, Mobile

### Was nicht gebaut wird
- Keine echten Live-3D-Renderings für jede Kategorie – Bilder bleiben statisch (Tag/Nacht-Toggle nur wo sinnvoll, z.B. Terrassen, Q-Bus, Carport)
- Keine echten Preise für Markisen/Schirme/Eingang – dort Richtpreise als Anhalt (kann später verfeinert werden)

