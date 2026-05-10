export interface FaqEntry {
  question: string;
  answer: string;
}

/**
 * FAQ-Daten pro Category- und Product-Slug.
 * Antworten sind self-contained, faktisch und citability-optimiert
 * (für AI-Engines wie ChatGPT, Perplexity, Gemini).
 */

const categoryFaqs: Record<string, FaqEntry[]> = {
  markisen: [
    {
      question: "Was kostet eine Markise in Ulm?",
      answer:
        "Eine Gelenkarmmarkise mit Motor liegt bei Brait Überdachungen je nach Größe und Tuch zwischen 1.800 € und 4.500 € inklusive Montage. Senkrechtmarkisen starten bei rund 1.200 €, Aufglasmarkisen für Terrassendächer bei 2.400 €. Der finale Preis hängt von Breite, Ausfall, Tuchwahl (Sunbrella, Stamoid), Sensorik und Befestigung ab.",
    },
    {
      question: "Welche Markisenart passt zu welcher Ausrichtung?",
      answer:
        "Für Süd- und Westterrassen sind Gelenkarm- oder Aufglasmarkisen ideal, weil sie horizontalen Schatten erzeugen. Für tiefstehende Sonne (Ost/West am Morgen oder Abend) eignet sich eine Senkrechtmarkise oder Zip-Screen, weil der Schatten vertikal nach unten fällt. Für Nordseiten reicht meist eine kleine Fallarmmarkise gegen Blendung.",
    },
    {
      question: "Wie lange dauert die Lieferung einer Markise?",
      answer:
        "Standard-Markisen liefern wir in 4–6 Wochen ab Auftragseingang. Sondermaße oder spezielle RAL-Farben verlängern die Produktion auf 6–10 Wochen. Die Montage selbst dauert 1 Tag und übernimmt unser eigenes Team aus Ulm.",
    },
    {
      question: "Sind Markisen winterfest?",
      answer:
        "Kassettenmarkisen mit geschlossenem Gehäuse können das ganze Jahr montiert bleiben — das Tuch ist im Gehäuse vor Frost und Feuchtigkeit geschützt. Offene Markisen ohne Kassette sollten im Winter eingefahren oder abgenommen werden. Senkrechtmarkisen mit Zipscreen-System sind grundsätzlich winterfest, sollten aber bei Schneelast eingefahren werden.",
    },
    {
      question: "Brauche ich eine Genehmigung für eine Markise?",
      answer:
        "In Baden-Württemberg sind Markisen bis 30 m² Fläche und 1,5 m Ausladung ab Hauswand genehmigungsfrei (LBO BW §50, Anlage 1). Größere Markisen oder solche an denkmalgeschützten Gebäuden brauchen eine Bauanzeige. In Mietobjekten ist die Zustimmung des Vermieters Pflicht. Wir prüfen das im Beratungstermin für Ihr Objekt.",
    },
    {
      question: "Welches Tuch ist bei Markisen am haltbarsten?",
      answer:
        "Sunbrella-Acryltuch (300 g/m²) ist Marktstandard: spinndüsengefärbt, UV-beständig 10+ Jahre, schimmelresistent. Polyester-PVC-Tücher (Stamoid, Précontraint) sind robuster gegen mechanische Belastung und ideal für Gastronomie. Wir verarbeiten ausschließlich europäische Tücher mit Mindestgarantie 5 Jahre.",
    },
    {
      question: "Funktioniert eine Markise auch bei Wind?",
      answer:
        "Gelenkarm- und Aufglasmarkisen sind bis Windstärke 5 (29–38 km/h) freigegeben. Mit optionalem Windsensor fährt die Markise automatisch ein, sobald der Schwellenwert überschritten wird. Wir empfehlen Windsensorik bei jeder motorisierten Markise — verlängert die Lebensdauer und schützt vor Sturmschäden.",
    },
  ],

  terrassenueberdachungen: [
    {
      question: "Was kostet eine Terrassenüberdachung in Ulm?",
      answer:
        "Eine wandbefestigte Pro-Line-Terrassenüberdachung mit VSG-Glasdach (4 × 3 m) startet bei rund 7.900 € inklusive Montage. Die Cube-Variante (freistehend) liegt bei 9.500–12.500 €. Lamellendächer mit verstellbaren Aluminium-Lamellen kosten ab 14.000 €. Der finale Preis hängt von Größe, Wandanschluss, Glas (VSG/HPL), Statik (Schneelastzone) und Optionen wie Beleuchtung oder Verschattung ab.",
    },
    {
      question: "Wie lange hält eine Aluminium-Terrassenüberdachung?",
      answer:
        "Aluminium-Konstruktionen aus 6063 T6 mit hochwertiger Pulverbeschichtung haben eine Lebensdauer von 30+ Jahren. Brait Überdachungen gibt 10 Jahre Strukturgarantie. Pulverbeschichtung ist UV-stabil und korrosionsbeständig — Wartung beschränkt sich auf gelegentliches Reinigen mit Wasser und milden Reinigern.",
    },
    {
      question: "Brauche ich für eine Terrassenüberdachung eine Baugenehmigung?",
      answer:
        "In Baden-Württemberg sind Terrassenüberdachungen bis 30 m² Grundfläche und 3 m Tiefe ab Außenwand genehmigungsfrei (LBO BW §50, Anlage 1). Bei größeren Anlagen, denkmalgeschützten Objekten oder Lage in Bebauungsplangebieten ist eine Bauanzeige erforderlich. Wir klären das beim Vor-Ort-Termin und unterstützen bei den Unterlagen.",
    },
    {
      question: "Pro-Line, Cube oder Lamellendach — welches System für mich?",
      answer:
        "Pro-Line: wandbefestigt, klares Glasdach, klassisches Anbaudach für Terrassen direkt am Haus. Cube: freistehende kubische Konstruktion ohne Wandanschluss — ideal wenn keine Hauswand zur Verfügung steht oder eine Outdoor-Lounge geplant ist. Lamellendach: verstellbare Aluminium-Lamellen, 0–135° drehbar, wasserdicht schließend — Premium-Lösung mit voller Klimakontrolle (Sonne, Schatten, Regenschutz auf Knopfdruck).",
    },
    {
      question: "Hält ein Glasdach Schneelast aus?",
      answer:
        "Ja. Wir verbauen ausschließlich VSG-Glas (Verbund-Sicherheitsglas, 2× 6 mm oder stärker) auf statisch berechneten Aluminium-Profilen. Standardausführung ist auf 200 kg/m² ausgelegt — das entspricht Schneelastzone 2 (Ulm liegt in Zone 2a). Für Höhenlagen Schwäbische Alb berechnen wir die Statik individuell auf Zone 3 oder 4.",
    },
    {
      question: "Kann ich eine Terrassenüberdachung nachträglich verglasen?",
      answer:
        "Ja, alle Brait-Pro-Line- und Cube-Systeme sind so konstruiert, dass Glasschiebewände, Festrahmen oder Zip-Screens jederzeit nachgerüstet werden können. Die Profile haben dafür vorbereitete Nuten. Sie können also mit einer offenen Überdachung starten und Jahre später zum Glashaus erweitern.",
    },
    {
      question: "Wie lange dauert die Montage?",
      answer:
        "Eine Standard-Pro-Line-Anlage (4 × 3 m) ist in 1–2 Tagen montiert. Cube-Konstruktionen brauchen 2–3 Tage, Lamellendächer 2–4 Tage je nach Größe und Optionen. Vorab benötigen wir 4–8 Wochen Produktionszeit, abhängig von Sondermaßen.",
    },
    {
      question: "Was kostet eine Terrassenüberdachung mit Lamellendach?",
      answer:
        "Lamellendächer mit motorisch verstellbaren Aluminium-Lamellen starten bei 14.000 € für eine Anlage 3 × 4 m und liegen je nach Ausführung bei 18.000–28.000 € (z.B. mit LED, Wettersensor, Glasschiebewänden). Im Vergleich zum Glasdach: höhere Investition, dafür voll klimatisierbar und wasserdicht.",
    },
  ],

  schirme: [
    {
      question: "Was kostet ein hochwertiger Ampelschirm?",
      answer:
        "Premium-Ampelschirme mit 360°-Drehung und Sunbrella-Tuch starten bei 1.800 € (3 × 3 m) und gehen bis 4.500 € (5 × 5 m mit Granitsockel). Der Preis variiert mit Mast-Material (Aluminium/Stahl), Tuch-Qualität und Sockel-Lösung.",
    },
    {
      question: "Welche Vorteile hat ein Ampelschirm gegenüber einem Mittelstockschirm?",
      answer:
        "Der seitliche Mast blockiert keinen Sitzplatz unter dem Schirm — die gesamte Tischfläche ist nutzbar. Zusätzlich lässt sich der Schirm um 360° drehen und stufenlos neigen, sodass der Schatten der Sonne folgt, ohne Möbel zu verschieben.",
    },
    {
      question: "Hält ein Ampelschirm Wind aus?",
      answer:
        "Hochwertige Ampelschirme sind bis Windstärke 5 freigegeben (29–38 km/h, frische Brise). Bei stärkerem Wind muss der Schirm geschlossen werden — eine offene Bespannung wirkt wie ein Segel. Empfehlung: Granitsockel ab 100 kg oder fest einbetonierte Bodenhülse.",
    },
    {
      question: "Wie überwintere ich meinen Ampelschirm?",
      answer:
        "Der Schirm wird komplett demontiert (Bespannung getrennt vom Mast) und in einem trockenen, frostgeschützten Raum gelagert. Alternativ mit atmungsaktiver Schutzhülle abdecken — geschlossen und vom Sockel abgeschraubt. Wir bieten optional ein Wartungspaket mit Ein- und Auslagerung.",
    },
    {
      question: "Welche Tuchgröße brauche ich für meine Sitzgruppe?",
      answer:
        "Faustregel: Bespannung sollte mindestens 1 m über die Sitzgruppe hinausragen. Für einen 6er-Esstisch (180 × 90 cm) genügt 3 × 3 m, für eine Lounge mit Sofa empfehlen wir 4 × 4 m, für Gastronomie-Sitzgruppen 5 × 5 m.",
    },
  ],

  "q-bus": [
    {
      question: "Was kostet eine Q-Bus Lamellen-Pergola?",
      answer:
        "Eine Q-Bus mit verstellbarem Lamellendach (3,5 × 3,5 m) startet bei 12.500 €. Vollausgestattet (5 × 4 m, mit LED, Zipscreen-Verschattung, Glasschiebewänden) liegt sie bei 22.000–28.000 €. Schließsystem, Wettersensor und Heizstrahler sind optional erhältlich.",
    },
    {
      question: "Ist die Q-Bus wasserdicht?",
      answer:
        "Ja. Die Aluminium-Lamellen schließen dicht und leiten Regenwasser über integrierte Rinnen in die Pfosten ab. Geschlossene Lamellen halten Starkregen sicher zurück — die Pergola wird zur überdachten Outdoor-Lounge bei jedem Wetter.",
    },
    {
      question: "Wie verstelle ich die Lamellen?",
      answer:
        "Standardmäßig per Funkfernbedienung — 0° (komplett offen für Himmelssicht) bis 135° (geschlossen, wasserdicht). Optional mit Wettersensor (schließt automatisch bei Regen) oder per App-Steuerung. Alle Bewegungen sind motorisch und leise.",
    },
    {
      question: "Was unterscheidet die Q-Bus von einem Glasdach?",
      answer:
        "Glasdach: feste Verglasung, immer geschlossen, voller Lichteinfall. Q-Bus: verstellbare Lamellen, regelbarer Schatten, optional komplett offen für Sonne. Vorteil Q-Bus: maximale Klimakontrolle, kein Aufheizen im Sommer. Vorteil Glasdach: günstiger, mehr Wintergarten-Charakter.",
    },
    {
      question: "Welche Wandsysteme passen zur Q-Bus?",
      answer:
        "Vorder-, Rück- und Seitenwände sind frei kombinierbar: Glasschiebewände (rahmenlos), Festverglasung (VSG), Sandwichpaneele (gedämmt), Zipscreens (textile Verschattung), Polycarbonat-Platten oder offen. So entsteht von der offenen Sommer-Pergola bis zur geschlossenen Winter-Lounge jede Variante.",
    },
  ],

  eingangsueberdachungen: [
    {
      question: "Was kostet eine Eingangsüberdachung?",
      answer:
        "Eine Standard-Eingangsüberdachung (200 × 100 cm) mit VSG-Glas und Aluminium-Konstruktion startet bei 1.490 € inkl. Montage. Größere Anlagen (bis 3 m Breite, 1,5 m Ausladung) liegen bei 2.200–3.500 €. LED-Beleuchtung, satiniertes Glas oder Sondermaße wirken sich auf den Endpreis aus.",
    },
    {
      question: "Wie wird die Eingangsüberdachung befestigt?",
      answer:
        "Verdeckt über Edelstahl-Wandhalter V2A, ohne sichtbare Schrauben oder Streben. Die Halterung wird in der Wand verankert (Beton oder Stein), sodass das Vordach optisch zu schweben scheint. Bei Holzfassaden montieren wir auf zusätzliche Lasche.",
    },
    {
      question: "Hält das Glasdach Hagel aus?",
      answer:
        "Ja. Wir verbauen VSG-Sicherheitsglas (2× 6 mm), das bei Hagel oder Astschlag bricht, aber zusammenhält — keine herabfallenden Splitter. Geprüft nach DIN EN 12150 und EN 14179.",
    },
    {
      question: "Kann ich eine LED-Beleuchtung nachrüsten?",
      answer:
        "Ja. Unsere Eingangsüberdachungen haben vorbereitete Kabelkanäle im Profil. LED-Spots oder umlaufende Strips können auch nachträglich integriert werden. Empfehlung: warmweiß 3000K, dimmbar.",
    },
  ],

  carports: [
    {
      question: "Was kostet ein Aluminium-Carport?",
      answer:
        "Einzelcarport (3 × 5 m, freistehend, VSG-Dach): ab 4.900 €. Doppelcarport (6 × 5 m): ab 7.900 €. Mit HPL-Dach statt Glas: −15%. Sonderausstattung wie Wallbox-Vorbereitung, LED, Bewegungsmelder oder Seitenwände 600–2.000 € zusätzlich.",
    },
    {
      question: "Wie ist der Unterschied zwischen Carport und Garage?",
      answer:
        "Carport: offen oder halboffen, Wetterschutz von oben, kein Schloss, baurechtlich oft genehmigungsfrei (BW: bis 30 m² und 3 m Höhe). Garage: vollständig geschlossen, abschließbar, immer baurechtlich anzuzeigen. Carports sind günstiger, schneller montiert und benötigen weniger Wartung — Aluminium rostet nicht.",
    },
    {
      question: "Kann ich eine Wallbox am Carport installieren?",
      answer:
        "Ja. Unsere Carports haben vorbereitete Kabelkanäle in den Pfosten — Sie können eine Wallbox (z.B. KEBA, ABL, go-eCharger) ohne sichtbare Verkabelung installieren. Empfehlung: 11 kW oder 22 kW mit FI-Schutz und Lastmanagement.",
    },
    {
      question: "Brauche ich eine Genehmigung für einen Carport?",
      answer:
        "In Baden-Württemberg sind Carports bis 30 m² Grundfläche und 3 m Höhe verfahrensfrei (LBO BW §50). Größere Anlagen oder solche in B-Plan-Gebieten benötigen eine Baugenehmigung. Abstandsflächen zu Nachbargrundstücken (3 m) müssen eingehalten werden — wir prüfen das im Vor-Ort-Termin.",
    },
    {
      question: "Hält ein Glas-Carport Hagel aus?",
      answer:
        "Ja. VSG-Glas (Verbund-Sicherheitsglas, 2× 6 mm) ist hagelschlagsicher nach Hagelklasse HW3. Bei Sondereindeckung mit HPL-Platten (Hochdruckschichtstoff) noch robuster — Standard für Hochrisiko-Regionen mit häufigem Hagel.",
    },
  ],
};

const productFaqs: Record<string, FaqEntry[]> = {
  "markisen/gelenkarmmarkise": [
    {
      question: "Wie groß kann eine Gelenkarmmarkise sein?",
      answer:
        "Bis 7 m Breite und 4 m Ausfall ohne Mittelstütze. Größere Anlagen werden in zwei Felder geteilt. Standardmäßig motorisiert mit Funk-Wandtaster oder Sonnen-/Windsensor.",
    },
    {
      question: "Hat die Gelenkarmmarkise eine Kassette?",
      answer:
        "Standard: offene Markise (Aluminium-Tragrohr, Tuch sichtbar eingerollt). Optional als Halbkassette oder Vollkassette — bei Vollkassette ist das Tuch komplett im Aluminium-Gehäuse geschützt. Empfehlung für ganzjährige Montage.",
    },
    {
      question: "Wie viel kostet eine Gelenkarmmarkise mit Motor?",
      answer:
        "Eine 4 × 3 m Gelenkarmmarkise mit Funkmotor und Sunbrella-Tuch: ab 2.200 € inkl. Montage. 5 × 3,5 m Vollkassette mit Sensor: 3.400–4.200 €.",
    },
  ],

  "markisen/fallarmmarkise": [
    {
      question: "Wofür eignet sich eine Fallarmmarkise?",
      answer:
        "Vor Fenstern, Schaufenstern und Balkonen. Die Markise senkt sich vor das Fenster (statt waagerecht über der Terrasse) und schützt vor direkter Sonne, neugierigen Blicken und Aufheizung des Innenraums.",
    },
    {
      question: "Wie weit kann sich eine Fallarmmarkise neigen?",
      answer:
        "Stufenlos verstellbar von 0° (waagerecht) bis 140° (fast senkrecht). Bei senkrechter Stellung wirkt sie wie ein Sichtschutz und reduziert Hitzeeintrag durch das Fenster um bis zu 80 %.",
    },
  ],

  "markisen/senkrechtmarkise": [
    {
      question: "Was ist der Unterschied zwischen Senkrechtmarkise und Zip-Screen?",
      answer:
        "Senkrechtmarkise: Tuch läuft offen in seitlichen Führungsschienen. Zip-Screen: Tuch ist seitlich mit Reißverschluss in den Schienen verbunden — windstabil bis Windstärke 7 (50–61 km/h) und ideal für Pergolen und Lamellendächer.",
    },
    {
      question: "Bis wie weit können Senkrechtmarkisen fahren?",
      answer:
        "Bis 5 m Breite und 4 m Tiefe. Größere Anlagen werden gekoppelt. Tuch ist transluzent (Sicht von innen nach außen, von außen blickdicht) oder vollständig blickdicht — auf Wunsch.",
    },
  ],

  "markisen/aufglasmarkise": [
    {
      question: "Wann brauche ich eine Aufglasmarkise?",
      answer:
        "Wenn Sie bereits ein Glasdach (Wintergarten, Pro-Line-Terrassendach) haben und der Innenraum unter dem Glas im Sommer überhitzt. Die Aufglasmarkise wird auf das Glasdach montiert und kühlt den Raum darunter um 5–10 °C — ideal für Süd- und Westdächer.",
    },
    {
      question: "Beschädigt die Aufglasmarkise das Glasdach?",
      answer:
        "Nein. Die Befestigung erfolgt rahmenseitig auf den Aluminium-Profilen, nicht auf dem Glas selbst. Das Tuch fährt über zwei Führungsschienen aus Aluminium ohne Berührung der Glasfläche.",
    },
  ],

  "terrassenueberdachungen/pro-line": [
    {
      question: "Was unterscheidet die Pro-Line von anderen Glasdächern?",
      answer:
        "Schmale Aluminium-Profile (60 × 40 mm Sparren), VSG-Sicherheitsglas, integrierte Regenrinne im Pfosten. Maßanfertigung bis 7 × 4 m wandbefestigt — größere Anlagen mit Mittelstütze möglich. 10 Jahre Strukturgarantie.",
    },
    {
      question: "Welche Glasarten sind möglich?",
      answer:
        "Standard: VSG 2× 6 mm klar. Optional: VSG mit satinierter Folie (Sichtschutz von oben), Sonnenschutzglas (G-Wert 35–50 %, reduziert Aufheizung) oder Stegplatten (kostengünstigere Variante, weniger transparent).",
    },
    {
      question: "Wie wird die Pro-Line an die Hauswand angeschlossen?",
      answer:
        "Über eine Aluminium-Wandanschluss-Schiene mit EPDM-Dichtungslippe — 100 % wasserdicht und thermisch entkoppelt. Die Befestigung erfolgt mit chemischen Verbundankern in Beton oder Mauerwerk.",
    },
  ],

  "terrassenueberdachungen/cube": [
    {
      question: "Wann eignet sich die Cube-Variante?",
      answer:
        "Wenn keine Hauswand für den Anschluss vorhanden ist (Garten-Pavillon, freistehende Lounge), wenn ein klares kubisches Design gewünscht ist, oder wenn die Überdachung bewusst losgelöst vom Haus stehen soll. Bis 7 × 4,5 m freistehend.",
    },
    {
      question: "Hat die Cube eine Regenrinne?",
      answer:
        "Ja, in jedem Pfosten ist eine integrierte Wasserableitung — Regenwasser läuft unsichtbar durch die Pfosten in den Boden oder kann an einen Regenspeicher angeschlossen werden.",
    },
  ],

  "terrassenueberdachungen/lamellendach": [
    {
      question: "Wie funktioniert das Lamellendach?",
      answer:
        "Aluminium-Lamellen sind motorisch von 0° bis 135° drehbar: 0° = komplett offen (volle Sonne, Himmelssicht), 90° = senkrecht (durchlüftet), 135° = geschlossen wasserdicht. Steuerung per Funkfernbedienung, optional mit Sonnen-, Wind- oder Regensensor.",
    },
    {
      question: "Ist das Lamellendach winterfest?",
      answer:
        "Ja, ganzjährig im Einsatz. Aluminium-Konstruktion 6063 T6 mit Pulverbeschichtung ist frost- und korrosionsbeständig. Bei starkem Schneefall sollten die Lamellen geschlossen werden, damit Schnee abrutscht — geöffnete Lamellen können Schneelasten nicht tragen.",
    },
    {
      question: "Was kostet ein Lamellendach mit Verschattung?",
      answer:
        "Lamellendach 4 × 3,5 m: ab 14.000 €. Mit Zipscreen-Verschattung an drei Seiten: +3.200 €. Mit LED-Streifen entlang der Lamellen: +1.400 €. Mit Glasschiebewänden vorne: +2.800 €.",
    },
  ],

  "terrassenueberdachungen/glashaus": [
    {
      question: "Was ist der Unterschied zum Wintergarten?",
      answer:
        "Glashaus = unbeheizt, Sommer-/Übergangsraum, baurechtlich Terrassenüberdachung. Wintergarten = beheizt, ganzjährig nutzbar, baurechtlich Wohnraum mit höheren Anforderungen (Energieeinsparverordnung GEG, Statik, Brandschutz). Glashaus ist ca. 40–50 % günstiger und meist genehmigungsfrei.",
    },
    {
      question: "Welche Schiebewände sind möglich?",
      answer:
        "Rahmenlose Glasschiebewände (4–8 mm ESG, transparent), Schiebetüren mit Aluminium-Rahmen, Festverglasung mit Klemmprofilen oder Zipscreens für Verschattung. Alle Systeme können kombiniert und auch nachträglich eingebaut werden.",
    },
  ],
};

export const getCategoryFaqs = (categorySlug: string): FaqEntry[] =>
  categoryFaqs[categorySlug] ?? [];

export const getProductFaqs = (categorySlug: string, productSlug: string): FaqEntry[] =>
  productFaqs[`${categorySlug}/${productSlug}`] ?? [];

/** Generelle FAQs für Homepage / globale Verwendung. */
export const generalFaqs: FaqEntry[] = [
  {
    question: "Wo liegt das Service-Gebiet von Brait Überdachungen?",
    answer:
      "Wir beraten und montieren in Ulm und im 100-km-Umkreis: Ulm, Neu-Ulm, Memmingen, Augsburg, Heidenheim, Göppingen, Aalen, Günzburg, Reutlingen, Tübingen, Biberach, Laupheim und alle dazwischenliegenden Orte. Größere Projekte auf Anfrage auch deutschlandweit.",
  },
  {
    question: "Wie kann ich den Demo-Koffer anfordern?",
    answer:
      "Sie fordern den Demo-Koffer kostenlos per Telefon (0173 530 3581), E-Mail (info@brait-ueberdachung.de) oder Kontaktformular an. Wir kommen zu Ihnen vor Ort und bringen Mini-Modell, Materialmuster (Aluminium-Profile in 6063 T6, Sunbrella-Tücher, VSG-Glas, vollständige RAL-Farbpalette) und ein Tablet mit dem Konfigurator mit. Der Termin dauert 60–120 Minuten, ist unverbindlich und im 100-km-Umkreis um Ulm gratis.",
  },
  {
    question: "Wer übernimmt die Montage?",
    answer:
      "Unser eigenes Montage-Team aus Ulm — keine Subunternehmer. Damit garantieren wir gleichbleibende Qualität, kurze Wege und persönliche Ansprechpartner vom ersten Termin bis zur Endabnahme.",
  },
  {
    question: "Wie lange ist die Garantie?",
    answer:
      "10 Jahre Strukturgarantie auf Aluminium-Konstruktion und Pulverbeschichtung. 5 Jahre auf Motorik (Lamellen, Markisen, Glasschiebewände). 2 Jahre Gewährleistung auf alle weiteren Komponenten gemäß BGB.",
  },
  {
    question: "Bezahlung und Finanzierung?",
    answer:
      "Üblich: 30 % Anzahlung bei Auftrag, 60 % bei Montagebeginn, 10 % nach Endabnahme. Wir akzeptieren Überweisung und Rechnung. Finanzierung über Hausbank ist möglich — auf Wunsch vermitteln wir Kontakte zu regionalen Partnerbanken.",
  },
];
