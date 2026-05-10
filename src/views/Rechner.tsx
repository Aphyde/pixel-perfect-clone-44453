"use client";

import Layout from "@/components/Layout";
import { FadeIn } from "@/components/ScrollAnimations";
import Breadcrumbs from "@/components/seo/Breadcrumbs";
import { useMemo, useState } from "react";
import { climateStations, findClimateStation } from "@/data/climate";
import { calculateAllSystems, type OutdoorDaysResult } from "@/lib/calculator/outdoor-days";
import { calculateSnowLoad, type SnowLoadResult } from "@/lib/calculator/snow-load";
import { Calculator, MapPin, Sun, CloudRain, Snowflake, Thermometer, ArrowRight, Home, Briefcase } from "lucide-react";
import Link from "next/link";

type Tab = "outdoor" | "schneelast";

const Rechner = () => {
  const [tab, setTab] = useState<Tab>("outdoor");
  const [selectedCity, setSelectedCity] = useState<string>("ulm");
  const [plz, setPlz] = useState<string>("89073");
  const [elevation, setElevation] = useState<string>("478");
  const [roofArea, setRoofArea] = useState<string>("12");

  const station = useMemo(
    () => findClimateStation(selectedCity) ?? climateStations[2],
    [selectedCity],
  );

  const allSystems = useMemo(() => calculateAllSystems(station), [station]);
  const outdoorBase = allSystems[0];
  const outdoorPro = allSystems[2];
  const outdoorLam = allSystems[4];
  const outdoorMax = allSystems[5];

  const snowResult = useMemo<SnowLoadResult>(
    () =>
      calculateSnowLoad(plz, {
        elevationMeters: Number(elevation) || undefined,
        roofAreaSqm: Number(roofArea) || undefined,
      }),
    [plz, elevation, roofArea],
  );

  return (
    <Layout>
      <Breadcrumbs
        items={[
          { name: "Startseite", url: "/" },
          { name: "Rechner", url: "/rechner" },
        ]}
        withoutSchema
      />

      <section className="container mx-auto px-5 md:px-8 pt-6 md:pt-8 pb-10 md:pb-14 max-w-5xl">
        <span className="text-primary text-[10px] md:text-xs font-bold tracking-[0.4em] uppercase mb-3 block">
          DWD-Klimadaten · DIN EN 1991-1-3
        </span>
        <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-tighter mb-5 md:mb-7 break-words">
          Outdoor-Tage- &amp; Schneelast-Rechner
        </h1>
        <div className="border-l-4 border-primary bg-card p-5 md:p-6 mb-8 max-w-3xl speakable-tldr">
          <p className="text-base md:text-lg leading-relaxed">
            <strong>So viele zusätzliche Tage Terrasse pro Jahr</strong> mit einer Brait-Überdachung — auf Basis der offiziellen Klimanormalen 1991–2020 des Deutschen Wetterdienstes für Ihren Standort. Plus: Schneelastzone und Dachschneelast nach DIN EN 1991-1-3 für die Statik Ihrer Konstruktion.
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="inline-flex border border-outline-variant/40 mb-8 md:mb-10">
          <button
            type="button"
            onClick={() => setTab("outdoor")}
            className={`px-4 md:px-6 py-3 text-xs md:text-sm font-bold uppercase tracking-widest transition-all ${
              tab === "outdoor"
                ? "bg-primary text-primary-foreground"
                : "bg-card hover:bg-surface-container"
            }`}
          >
            <Sun className="w-4 h-4 inline mr-2 -mt-0.5" />
            Outdoor-Tage
          </button>
          <button
            type="button"
            onClick={() => setTab("schneelast")}
            className={`px-4 md:px-6 py-3 text-xs md:text-sm font-bold uppercase tracking-widest transition-all border-l border-outline-variant/40 ${
              tab === "schneelast"
                ? "bg-primary text-primary-foreground"
                : "bg-card hover:bg-surface-container"
            }`}
          >
            <Snowflake className="w-4 h-4 inline mr-2 -mt-0.5" />
            Schneelast
          </button>
        </div>
      </section>

      {/* OUTDOOR TAGE */}
      {tab === "outdoor" && (
        <FadeIn>
          <section className="container mx-auto px-5 md:px-8 max-w-5xl pb-16 md:pb-24">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 mb-10 md:mb-14">
              <div>
                <label className="text-primary text-[10px] md:text-xs font-bold tracking-[0.4em] uppercase mb-3 block">
                  1. Standort wählen
                </label>
                <select
                  value={selectedCity}
                  onChange={(e) => setSelectedCity(e.target.value)}
                  className="w-full bg-card border border-outline-variant/40 px-4 py-3 text-base font-bold focus:border-primary focus:outline-none"
                >
                  {climateStations.map((s) => (
                    <option key={`${s.citySlug}-${s.stationId}`} value={s.citySlug}>
                      {s.cityLabel} ({s.elevation} m, Zone {s.snowLoadZone})
                    </option>
                  ))}
                </select>
                <p className="text-xs text-secondary mt-2">
                  DWD-Wetterstation: {station.stationName}
                </p>
              </div>

              <div className="bg-card border-l-4 border-primary p-5 md:p-6">
                <div className="text-[10px] md:text-xs font-bold uppercase tracking-widest text-primary mb-2">
                  Klimanormale {station.cityLabel} (1991–2020)
                </div>
                <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <CloudRain className="w-4 h-4 text-primary" />
                    <span>{station.rainDaysPerYear} Regentage</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Sun className="w-4 h-4 text-primary" />
                    <span>{station.sunshineHoursPerYear} h Sonne</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Thermometer className="w-4 h-4 text-primary" />
                    <span>Ø {station.meanTempCelsius} °C</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Snowflake className="w-4 h-4 text-primary" />
                    <span>{station.snowCoverDaysPerYear} Schneetage</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Hero Result */}
            <div className="bg-foreground text-primary-foreground p-6 md:p-10 mb-8 md:mb-10">
              <div className="text-[10px] md:text-xs font-bold uppercase tracking-[0.3em] text-primary mb-3">
                Ihr Ergebnis für {station.cityLabel}
              </div>
              <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-tighter mb-5 md:mb-7 break-words">
                Mit einem Lamellendach gewinnen Sie{" "}
                <span className="text-primary">
                  +{outdoorLam.gainedDays} Tage
                </span>{" "}
                Outdoor-Saison.
              </h2>
              <p className="text-base md:text-lg text-primary-foreground/75 max-w-2xl leading-relaxed mb-6 md:mb-8 speakable-answer">
                In {station.cityLabel} sind nach DWD-Klimanormalen aktuell etwa{" "}
                <strong className="text-primary-foreground">
                  {outdoorBase.daysPerYear} Tage pro Jahr
                </strong>{" "}
                Outdoor-tauglich. Mit einem Brait-Lamellendach erhöht sich das auf{" "}
                <strong className="text-primary-foreground">
                  {outdoorLam.daysPerYear} Tage
                </strong>{" "}
                — das entspricht{" "}
                <strong className="text-primary-foreground">
                  +{outdoorLam.gainedWeeks} Wochen pro Jahr
                </strong>{" "}
                gewonnener Lebenszeit im Freien.
              </p>
              <div className="grid grid-cols-3 gap-4 md:gap-6 max-w-2xl">
                <div>
                  <div className="text-2xl md:text-4xl font-bold text-primary mb-1">
                    {outdoorBase.daysPerYear}
                  </div>
                  <div className="text-[10px] md:text-xs uppercase tracking-widest text-primary-foreground/60">
                    Heute (kein Schutz)
                  </div>
                </div>
                <div>
                  <div className="text-2xl md:text-4xl font-bold text-primary mb-1">
                    {outdoorPro.daysPerYear}
                  </div>
                  <div className="text-[10px] md:text-xs uppercase tracking-widest text-primary-foreground/60">
                    Mit Pro-Line
                  </div>
                </div>
                <div>
                  <div className="text-2xl md:text-4xl font-bold text-primary mb-1">
                    {outdoorMax.daysPerYear}
                  </div>
                  <div className="text-[10px] md:text-xs uppercase tracking-widest text-primary-foreground/60">
                    Vollausstattung
                  </div>
                </div>
              </div>
            </div>

            {/* System-Vergleich */}
            <div className="mb-8 md:mb-10">
              <h2 className="text-2xl md:text-4xl font-bold tracking-tighter mb-6 md:mb-8">
                Vergleich aller Brait-Systeme
              </h2>
              <div className="space-y-3">
                {allSystems.map((r) => (
                  <SystemBar
                    key={r.system}
                    result={r}
                    maxDays={365}
                  />
                ))}
              </div>
            </div>

            {/* Methodik */}
            <details className="bg-surface-container-low border border-outline-variant/30 p-5 md:p-7 mb-8 md:mb-10">
              <summary className="font-bold text-base md:text-lg cursor-pointer">
                Methodik &amp; Quellen
              </summary>
              <div className="text-secondary text-sm md:text-base leading-relaxed mt-4 space-y-3">
                <p>
                  <strong className="text-foreground">Datenbasis:</strong>{" "}
                  Klimanormale 1991–2020 des Deutschen Wetterdienstes (DWD), Climate Data Center (CDC), abrufbar unter{" "}
                  <a
                    href="https://opendata.dwd.de/climate_environment/CDC/"
                    target="_blank"
                    rel="noopener"
                    className="text-primary underline underline-offset-2"
                  >
                    opendata.dwd.de
                  </a>
                  . Das ist die offizielle WMO-Periode für Klima-Vergleiche, die nächste Aktualisierung erfolgt 2031 mit Periode 2001–2030.
                </p>
                <p>
                  <strong className="text-foreground">Definition „Outdoor-tauglich":</strong>{" "}
                  Tageshöchsttemperatur ≥ 12 °C, kein nennenswerter Niederschlag (≤ 1 mm), mindestens 4 Sonnenstunden im Tagesverlauf.
                </p>
                <p>
                  <strong className="text-foreground">Outdoor-Saison:</strong>{" "}
                  ≈ 230 Tage (April bis Oktober inkl. milder Schultertage).
                </p>
                <p>
                  <strong className="text-foreground">Wirkung der Systeme:</strong>{" "}
                  Markisen reduzieren Hitze, schützen aber nicht vor Regen. Glasdächer (Pro-Line, Cube) machen alle Regentage in der warmen Saison nutzbar. Lamellendächer addieren milde Wintertage. Vollausstattung mit Glasschiebewänden und Heizung erlaubt 365-Tage-Nutzung abzüglich extremer Wettertage.
                </p>
                <p>
                  <strong className="text-foreground">Hinweis:</strong>{" "}
                  Die Werte sind statistische Mittel aus 30 Jahren. Einzelne Jahre können stark abweichen — extrem nasse oder sehr trockene Sommer verschieben das Bild.
                </p>
              </div>
            </details>

            {/* CTA */}
            <div className="bg-primary text-primary-foreground p-6 md:p-10 text-center">
              <h2 className="text-xl md:text-3xl font-bold mb-3 md:mb-4">
                Jetzt persönlich beraten lassen
              </h2>
              <p className="text-sm md:text-base text-primary-foreground/85 mb-5 md:mb-6 max-w-2xl mx-auto">
                Im Demo-Koffer-Termin vor Ort prüfen wir Ihre Terrasse, Ausrichtung, Statik und finden das System mit der besten Wirtschaftlichkeit für Ihren Standort.
              </p>
              <Link
                href="/kontakt#demo-koffer"
                className="inline-flex items-center justify-center gap-2 bg-primary-foreground text-primary px-6 md:px-7 py-3 md:py-3.5 font-bold uppercase tracking-widest text-xs md:text-sm hover:opacity-90 transition-all"
              >
                <Briefcase className="w-4 h-4" /> Demo-Koffer anfordern
              </Link>
            </div>
          </section>
        </FadeIn>
      )}

      {/* SCHNEELAST */}
      {tab === "schneelast" && (
        <FadeIn>
          <section className="container mx-auto px-5 md:px-8 max-w-5xl pb-16 md:pb-24">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-7 mb-10 md:mb-14">
              <div>
                <label className="text-primary text-[10px] md:text-xs font-bold tracking-[0.4em] uppercase mb-3 block">
                  Postleitzahl
                </label>
                <input
                  type="text"
                  value={plz}
                  onChange={(e) => setPlz(e.target.value.replace(/\D/g, "").slice(0, 5))}
                  placeholder="89073"
                  className="w-full bg-card border border-outline-variant/40 px-4 py-3 text-base font-bold focus:border-primary focus:outline-none"
                />
              </div>
              <div>
                <label className="text-primary text-[10px] md:text-xs font-bold tracking-[0.4em] uppercase mb-3 block">
                  Höhe (m über NN)
                </label>
                <input
                  type="number"
                  value={elevation}
                  onChange={(e) => setElevation(e.target.value)}
                  placeholder="478"
                  className="w-full bg-card border border-outline-variant/40 px-4 py-3 text-base font-bold focus:border-primary focus:outline-none"
                />
              </div>
              <div>
                <label className="text-primary text-[10px] md:text-xs font-bold tracking-[0.4em] uppercase mb-3 block">
                  Dachfläche (m²)
                </label>
                <input
                  type="number"
                  value={roofArea}
                  onChange={(e) => setRoofArea(e.target.value)}
                  placeholder="12"
                  className="w-full bg-card border border-outline-variant/40 px-4 py-3 text-base font-bold focus:border-primary focus:outline-none"
                />
              </div>
            </div>

            {/* Hero Result */}
            <div className="bg-foreground text-primary-foreground p-6 md:p-10 mb-8 md:mb-10">
              <div className="text-[10px] md:text-xs font-bold uppercase tracking-[0.3em] text-primary mb-3">
                Schneelast PLZ {plz || "—"}
              </div>
              <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-tighter mb-5 md:mb-7 break-words">
                Schneelastzone{" "}
                <span className="text-primary">{snowResult.zone.zone}</span> — Dachlast{" "}
                <span className="text-primary">{snowResult.roofLoadKg} kg/m²</span>
              </h2>
              <p className="text-sm md:text-base text-primary-foreground/75 max-w-2xl leading-relaxed mb-6 md:mb-8 speakable-answer">
                {snowResult.zone.description}. Die charakteristische Bodenschneelast beträgt{" "}
                <strong className="text-primary-foreground">
                  {snowResult.groundLoadCorrectedKn} kN/m² (≈ {snowResult.groundLoadCorrectedKg} kg/m²)
                </strong>
                {snowResult.elevationFactor > 1 ? (
                  <>
                    {" "}— mit Höhenkorrektur ×{snowResult.elevationFactor} für{" "}
                    {elevation} m NN
                  </>
                ) : null}
                . Auf einem Flachdach (Form-Beiwert µ = 0,8) ergibt das eine Bemessungslast von{" "}
                <strong className="text-primary-foreground">
                  {snowResult.roofLoadKn} kN/m² (≈ {snowResult.roofLoadKg} kg/m²)
                </strong>
                .
              </p>
              {snowResult.totalSnowMass && (
                <div className="border-t border-primary-foreground/20 pt-5 md:pt-6">
                  <div className="text-[10px] md:text-xs uppercase tracking-widest text-primary-foreground/60 mb-2">
                    Gesamtlast auf {snowResult.totalSnowMass.area} m² Dachfläche
                  </div>
                  <div className="text-2xl md:text-4xl font-bold text-primary">
                    {snowResult.totalSnowMass.mass.toLocaleString("de-DE")} kg
                  </div>
                  <div className="text-xs md:text-sm text-primary-foreground/60 mt-1">
                    entspricht etwa{" "}
                    {Math.round(snowResult.totalSnowMass.mass / 80).toLocaleString("de-DE")}{" "}
                    Personen mit 80 kg auf dem Dach
                  </div>
                </div>
              )}
            </div>

            {/* Brait Empfehlung */}
            <div
              className={`p-5 md:p-7 mb-8 md:mb-10 border-l-4 ${
                snowResult.braitRecommendation.level === "individuell"
                  ? "bg-card border-primary"
                  : snowResult.braitRecommendation.level === "verstaerkt"
                    ? "bg-card border-primary/70"
                    : "bg-card border-primary/40"
              }`}
            >
              <div className="text-[10px] md:text-xs font-bold uppercase tracking-widest text-primary mb-2">
                Brait-Empfehlung
              </div>
              <h3 className="text-xl md:text-2xl font-bold tracking-tight mb-3">
                {snowResult.braitRecommendation.label}
              </h3>
              <p className="text-secondary text-sm md:text-base leading-relaxed mb-4">
                {snowResult.braitRecommendation.description}
              </p>
              <div className="flex flex-wrap items-center gap-3 text-xs md:text-sm">
                <span className="bg-primary/10 text-primary px-3 py-1 font-bold uppercase tracking-widest">
                  {snowResult.braitRecommendation.costNote}
                </span>
                <span className="text-secondary">{snowResult.reference}</span>
              </div>
            </div>

            {/* Zonen-Tabelle */}
            <div className="mb-8 md:mb-10">
              <h2 className="text-2xl md:text-4xl font-bold tracking-tighter mb-6 md:mb-8">
                Schneelastzonen Süddeutschland
              </h2>
              <div className="overflow-x-auto">
                <table className="w-full text-sm md:text-base">
                  <thead className="border-b-2 border-foreground">
                    <tr className="text-left">
                      <th className="py-3 px-2 md:px-4 font-bold">Zone</th>
                      <th className="py-3 px-2 md:px-4 font-bold">Bodenschneelast</th>
                      <th className="py-3 px-2 md:px-4 font-bold">Dachschneelast</th>
                      <th className="py-3 px-2 md:px-4 font-bold hidden md:table-cell">
                        Region
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { zone: "1", load: "0,65 kN/m²", roof: "53 kg/m²", region: "Norddeutsche Tiefebene" },
                      { zone: "1a", load: "0,85 kN/m²", roof: "69 kg/m²", region: "Mitteldeutschland" },
                      { zone: "2", load: "1,06 kN/m²", roof: "87 kg/m²", region: "Reutlingen, Tübingen, Göppingen" },
                      { zone: "2a", load: "1,32 kN/m²", roof: "108 kg/m²", region: "Ulm, Augsburg, Heidenheim, Donautal" },
                      { zone: "3", load: "1,89 kN/m²", roof: "154 kg/m²", region: "Memmingen, Schwäbische Alb ab 600 m, Allgäu" },
                    ].map((r) => (
                      <tr
                        key={r.zone}
                        className={`border-b border-outline-variant/30 ${
                          r.zone === snowResult.zone.zone
                            ? "bg-primary/10 font-bold"
                            : ""
                        }`}
                      >
                        <td className="py-3 px-2 md:px-4">{r.zone}</td>
                        <td className="py-3 px-2 md:px-4">{r.load}</td>
                        <td className="py-3 px-2 md:px-4">{r.roof}</td>
                        <td className="py-3 px-2 md:px-4 hidden md:table-cell text-secondary">
                          {r.region}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Methodik */}
            <details className="bg-surface-container-low border border-outline-variant/30 p-5 md:p-7 mb-8 md:mb-10">
              <summary className="font-bold text-base md:text-lg cursor-pointer">
                Berechnungsformel &amp; Norm-Verweise
              </summary>
              <div className="text-secondary text-sm md:text-base leading-relaxed mt-4 space-y-3">
                <p>
                  <strong className="text-foreground">Bemessung:</strong>{" "}
                  s = µ · C<sub>e</sub> · C<sub>t</sub> · s<sub>k</sub>{" "}
                  nach DIN EN 1991-1-3 (Eurocode 1) und Nationalem Anhang Deutschland.
                </p>
                <ul className="list-disc list-inside space-y-1">
                  <li>µ = 0,8 (Form-Beiwert für Flachdach ≤ 30°)</li>
                  <li>C<sub>e</sub> = 1,0 (Umgebungsbeiwert „normal")</li>
                  <li>C<sub>t</sub> = 1,0 (Wärmebeiwert „isoliert")</li>
                  <li>s<sub>k</sub> = charakteristische Bodenschneelast aus PLZ + Höhe</li>
                </ul>
                <p>
                  <strong className="text-foreground">Höhenkorrektur:</strong>{" "}
                  Über 400 m NN steigt die Bodenschneelast linear bis zu Faktor 1,4 bei 800 m NN.
                </p>
                <p>
                  <strong className="text-foreground">Brait-Standardstatik:</strong>{" "}
                  200 kg/m² Dachlast — das deckt mit Sicherheitsreserve fast alle Lagen außerhalb der Hochalb (über 800 m NN) ab. Bei Höhenlagen oder Sondergrößen rechnen wir individuell.
                </p>
                <p>
                  <strong className="text-foreground">Hinweis:</strong>{" "}
                  Diese Berechnung ersetzt keine prüffähige Tragwerksberechnung. Brait erstellt diese im Rahmen der Auftragsplanung kostenfrei.
                </p>
              </div>
            </details>

            {/* CTA */}
            <div className="bg-primary text-primary-foreground p-6 md:p-10 text-center">
              <h2 className="text-xl md:text-3xl font-bold mb-3 md:mb-4">
                Brauchen Sie eine prüffähige Statik?
              </h2>
              <p className="text-sm md:text-base text-primary-foreground/85 mb-5 md:mb-6 max-w-2xl mx-auto">
                Brait erstellt für jede Anlage eine individuelle Statik nach Eurocode 1 — kostenfrei im Rahmen der Auftragsplanung.
              </p>
              <Link
                href="/kontakt"
                className="inline-flex items-center justify-center gap-2 bg-primary-foreground text-primary px-6 md:px-7 py-3 md:py-3.5 font-bold uppercase tracking-widest text-xs md:text-sm hover:opacity-90 transition-all"
              >
                <Home className="w-4 h-4" /> Statik anfragen
              </Link>
            </div>
          </section>
        </FadeIn>
      )}

      {/* Quer-Verlinkung */}
      <section className="bg-surface py-12 md:py-16">
        <div className="container mx-auto px-5 md:px-8 max-w-5xl">
          <h2 className="text-xl md:text-2xl font-bold tracking-tight mb-5 md:mb-6">
            Verwandte Themen
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4">
            <Link
              href="/ratgeber/schneelast-in-sueddeutschland"
              className="bg-card p-5 md:p-6 hover:bg-surface-container transition-colors group"
            >
              <div className="text-[10px] md:text-xs uppercase tracking-widest text-primary font-bold mb-2">
                Ratgeber
              </div>
              <h3 className="font-bold mb-2 group-hover:text-primary transition-colors">
                Schneelast in Süddeutschland
              </h3>
              <p className="text-secondary text-sm leading-relaxed">
                Detaillierter Hintergrund zu Zonen, Höhenlagen und Praxis.
              </p>
              <span className="inline-flex items-center gap-1 text-primary text-xs font-bold uppercase tracking-widest mt-3">
                Lesen <ArrowRight className="w-3 h-3" />
              </span>
            </Link>
            <Link
              href="/ratgeber/welche-terrassenueberdachung-passt-zu-ihrem-haus"
              className="bg-card p-5 md:p-6 hover:bg-surface-container transition-colors group"
            >
              <div className="text-[10px] md:text-xs uppercase tracking-widest text-primary font-bold mb-2">
                Ratgeber
              </div>
              <h3 className="font-bold mb-2 group-hover:text-primary transition-colors">
                Welche Überdachung passt zu Ihrem Haus?
              </h3>
              <p className="text-secondary text-sm leading-relaxed">
                Pro-Line, Cube oder Lamellendach — Entscheidungshilfe.
              </p>
              <span className="inline-flex items-center gap-1 text-primary text-xs font-bold uppercase tracking-widest mt-3">
                Lesen <ArrowRight className="w-3 h-3" />
              </span>
            </Link>
            <Link
              href="/standorte"
              className="bg-card p-5 md:p-6 hover:bg-surface-container transition-colors group"
            >
              <div className="text-[10px] md:text-xs uppercase tracking-widest text-primary font-bold mb-2">
                Standorte
              </div>
              <h3 className="font-bold mb-2 group-hover:text-primary transition-colors">
                Brait in Ihrer Stadt
              </h3>
              <p className="text-secondary text-sm leading-relaxed">
                Service-Gebiet, Anfahrt und lokale Besonderheiten.
              </p>
              <span className="inline-flex items-center gap-1 text-primary text-xs font-bold uppercase tracking-widest mt-3">
                Übersicht <ArrowRight className="w-3 h-3" />
              </span>
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
};

const SystemBar = ({
  result,
  maxDays,
}: {
  result: OutdoorDaysResult;
  maxDays: number;
}) => {
  const widthPct = Math.min(100, (result.daysPerYear / maxDays) * 100);
  return (
    <div className="bg-card p-4 md:p-5 border-l-4 border-primary/30 hover:border-primary transition-colors">
      <div className="flex flex-wrap items-baseline justify-between gap-2 mb-3">
        <div>
          <div className="font-bold text-base md:text-lg">{result.systemLabel}</div>
          <div className="text-xs text-secondary">{result.description}</div>
        </div>
        <div className="text-right">
          <div className="text-2xl md:text-3xl font-bold text-primary">
            {result.daysPerYear}
          </div>
          <div className="text-[10px] md:text-xs uppercase tracking-widest text-secondary">
            Tage/Jahr
            {result.gainedDays > 0 && (
              <span className="text-primary ml-2 font-bold">
                +{result.gainedDays}
              </span>
            )}
          </div>
        </div>
      </div>
      <div className="h-2 bg-surface-container-low overflow-hidden">
        <div
          className="h-full bg-primary transition-all duration-700"
          style={{ width: `${widthPct}%` }}
        />
      </div>
    </div>
  );
};

export default Rechner;
