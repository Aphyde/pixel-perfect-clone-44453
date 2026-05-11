"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  ChevronDown,
  Loader2,
  MapPin,
  Phone,
  Snowflake,
  Sparkles,
} from "lucide-react";
import Layout from "@/components/Layout";
import { FadeIn } from "@/components/ScrollAnimations";
import Breadcrumbs from "@/components/seo/Breadcrumbs";
import AddressAutocomplete from "@/components/calculator/AddressAutocomplete";
import DayCategoryDonut from "@/components/calculator/DayCategoryDonut";
import {
  type AddressSuggestion,
  fetchElevation,
} from "@/lib/calculator/geocoding";
import {
  CATEGORY_META,
  computePotentialAnalysis,
} from "@/lib/calculator/day-categories";
import { calculateSnowLoadByLocation } from "@/lib/calculator/snow-load";
import {
  findNearestStation,
  isInServiceArea,
} from "@/data/climate";

interface SelectedLocation {
  suggestion: AddressSuggestion;
  elevation: number;
  elevationSource: "open-meteo" | "station-fallback";
}

const Rechner = () => {
  const [address, setAddress] = useState("");
  const [loading, setLoading] = useState(false);
  const [location, setLocation] = useState<SelectedLocation | null>(null);
  const [showDetails, setShowDetails] = useState(false);

  const handleSelect = async (suggestion: AddressSuggestion) => {
    setLoading(true);
    const { station } = findNearestStation(suggestion.lat, suggestion.lon);
    const elev = await fetchElevation(suggestion.lat, suggestion.lon);
    setLocation({
      suggestion,
      elevation: elev ?? station.elevation,
      elevationSource: elev != null ? "open-meteo" : "station-fallback",
    });
    setLoading(false);
    setShowDetails(false);

    if (typeof window !== "undefined") {
      requestAnimationFrame(() => {
        document
          .getElementById("rechner-ergebnis")
          ?.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    }
  };

  const analysis = useMemo(() => {
    if (!location) return null;
    const { station, distanceKm } = findNearestStation(
      location.suggestion.lat,
      location.suggestion.lon,
    );
    const potential = computePotentialAnalysis(station, location.elevation);
    const snow = calculateSnowLoadByLocation({
      station,
      elevationMeters: location.elevation,
      postcode: location.suggestion.postcode,
    });
    const inService = isInServiceArea(
      location.suggestion.lat,
      location.suggestion.lon,
    );
    return { station, distanceKm, potential, snow, inService };
  }, [location]);

  return (
    <Layout>
      <Breadcrumbs
        items={[
          { name: "Startseite", url: "/" },
          { name: "Terrassenpotenzial-Rechner", url: "/rechner" },
        ]}
        withoutSchema
      />

      {/* HERO + INPUT */}
      <section className="container mx-auto px-5 md:px-8 pt-6 md:pt-10 pb-10 md:pb-14 max-w-4xl">
        <span className="text-primary text-[10px] md:text-xs font-bold tracking-[0.4em] uppercase mb-3 block">
          Adressgenau · DWD-Klimadaten · DIN EN 1991-1-3
        </span>
        <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-tighter mb-5 md:mb-7 break-words">
          Wie viele Tage Terrasse verschenken Sie pro Jahr?
        </h1>
        <p className="text-base md:text-lg leading-relaxed text-secondary max-w-3xl mb-8 md:mb-10">
          Geben Sie Ihre Adresse ein — wir zeigen Ihnen mit Klimadaten des
          Deutschen Wetterdienstes, an wie vielen Tagen Sie Ihre Terrasse heute
          komfortabel nutzen können und wie viele Tage zusätzlich nutzbar werden,
          sobald eine Brait-Überdachung darüber steht. Inklusive Schneelast-
          Analyse nach Eurocode.
        </p>

        <div className="bg-card border border-outline-variant/40 p-5 md:p-7 shadow-sm">
          <label className="text-primary text-[10px] md:text-xs font-bold tracking-[0.4em] uppercase mb-3 block">
            Adresse eingeben
          </label>
          <AddressAutocomplete
            value={address}
            onChange={setAddress}
            onSelect={handleSelect}
            placeholder="z. B. Musterstraße 1, 89073 Musterstadt"
          />
          <p className="text-xs text-secondary mt-3 flex items-start gap-2">
            <CheckCircle2 className="w-3.5 h-3.5 mt-0.5 shrink-0 text-primary" />
            <span>
              Wir nutzen die OpenStreetMap-Adresssuche (Photon) und die offene
              Höhen-API von Open-Meteo. Keine Speicherung, kein Tracking.
            </span>
          </p>
        </div>

        {loading && (
          <div className="mt-6 flex items-center gap-3 text-secondary text-sm">
            <Loader2 className="w-4 h-4 animate-spin text-primary" />
            Klimadaten und Geländehöhe werden geladen …
          </div>
        )}
      </section>

      {/* PLATZHALTER OHNE AUSWAHL */}
      {!location && !loading && (
        <section className="container mx-auto px-5 md:px-8 pb-16 md:pb-20 max-w-4xl">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6">
            {[
              {
                icon: MapPin,
                title: "1. Adresse",
                text: "Straße und Hausnummer reichen — wir ordnen die nächste DWD-Wetterstation zu.",
              },
              {
                icon: Sparkles,
                title: "2. Analyse",
                text: "Sie sehen aktuelle und gewonnene Outdoor-Tage in einem Diagramm.",
              },
              {
                icon: Snowflake,
                title: "3. Statik",
                text: "Plus exakte Schneelast und Empfehlung der Brait-Konstruktionsklasse.",
              },
            ].map((step) => (
              <div
                key={step.title}
                className="bg-card border-l-4 border-primary/30 p-5"
              >
                <step.icon className="w-5 h-5 text-primary mb-3" aria-hidden />
                <div className="text-sm font-bold uppercase tracking-widest text-primary mb-1">
                  {step.title}
                </div>
                <p className="text-sm text-secondary leading-relaxed">{step.text}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ERGEBNIS */}
      {location && analysis && (
        <FadeIn>
          <section
            id="rechner-ergebnis"
            className="container mx-auto px-5 md:px-8 pb-16 md:pb-20 max-w-5xl scroll-mt-24"
          >
            {/* Vorher / Nachher Hero */}
            <div className="bg-foreground text-primary-foreground p-6 md:p-10 mb-8 md:mb-10">
              <div className="text-[10px] md:text-xs font-bold uppercase tracking-[0.3em] text-primary mb-3">
                Analyse für {location.suggestion.label}
              </div>
              <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold tracking-tighter mb-6 md:mb-8 break-words">
                Sie nutzen heute{" "}
                <span className="text-primary">{analysis.potential.currentDays} Tage</span>.
                Mit einer Brait-Überdachung werden es{" "}
                <span className="text-primary">
                  {analysis.potential.totalDaysWithDach} Tage
                </span>{" "}
                — ein Gewinn von{" "}
                <span className="text-primary">
                  +{analysis.potential.gainedDaysWithDach} Tagen
                </span>{" "}
                pro Jahr.
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-8 max-w-3xl">
                <BeforeAfterStat
                  caption="Ihre aktuelle Situation"
                  value={analysis.potential.currentDays}
                  unit="Tage"
                  note="komfortabel ohne Dach"
                />
                <BeforeAfterStat
                  caption="Mit Terrassendach zusätzlich"
                  value={analysis.potential.gainedDaysWithDach}
                  prefix="+"
                  unit="Tage"
                  note="zusätzliche Outdoor-Saison"
                  highlight
                />
                <BeforeAfterStat
                  caption="Ihr Terrassenpotenzial gesamt"
                  value={analysis.potential.potentialPercent}
                  unit="%"
                  note={`${analysis.potential.totalDaysWithDach} von ${analysis.potential.categories.total} Tagen`}
                />
              </div>
            </div>

            {/* Donut + Insights */}
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.1fr] gap-8 md:gap-12 mb-8 md:mb-10 items-start">
              <div className="bg-card p-5 md:p-7">
                <DayCategoryDonut
                  categories={analysis.potential.categories}
                  centerValue={analysis.potential.totalDaysWithDach}
                  centerLabel="Tage mit Dach nutzbar"
                  centerSubLabel={`${analysis.potential.potentialPercent}% des Jahres`}
                />
              </div>

              <div className="space-y-4 md:space-y-5">
                <InsightRow
                  color={CATEGORY_META.sommer.color}
                  title={`${analysis.potential.currentDays} Sommertage komfortabel ohne Dach`}
                  text="Mittagshitze ist erträglich, abends ist es perfekt — heute Ihr einziger sicherer Terrassengenuss."
                />
                <InsightRow
                  color={CATEGORY_META.potenzial.color}
                  title={`+${analysis.potential.gainedDaysWithDach} Potenzialtage werden mit Dach nutzbar`}
                  text="Tage mit 10–25 °C: meist scheitern sie an Schauern, kühlem Wind oder Mittagsstau. Mit Lamellen- oder Glasdach werden sie nutzbar."
                />
                <InsightRow
                  color={CATEGORY_META.kalt.color}
                  title={`Nur ${analysis.potential.unusedCold} kalte Tage bleiben ungenutzt`}
                  text="0–10 °C – mit Glasschiebewänden, Infrarotheizung und Lamellendach holen Sie sich auch diese zurück."
                />
                <InsightRow
                  color={CATEGORY_META.eis.color}
                  title={`${analysis.potential.unusedIce} Eistage <0 °C`}
                  text="Frostperiode: nicht relevant für Terrassennutzung. Wichtig nur für die Schneelast-Statik."
                />

                <button
                  type="button"
                  onClick={() => setShowDetails((s) => !s)}
                  className="inline-flex items-center gap-2 text-primary font-bold text-sm uppercase tracking-widest hover:opacity-80 transition-opacity"
                  aria-expanded={showDetails}
                >
                  Details anzeigen
                  <ChevronDown
                    className={`w-4 h-4 transition-transform ${showDetails ? "rotate-180" : ""}`}
                    aria-hidden
                  />
                </button>

                {showDetails && (
                  <div className="bg-surface-container-low border-l-4 border-primary p-4 md:p-5 text-sm leading-relaxed space-y-2">
                    {(["sommer", "heiss", "potenzial", "kalt", "eis"] as const).map(
                      (key) => (
                        <div
                          key={key}
                          className="flex items-baseline gap-3 border-b border-outline-variant/20 last:border-0 pb-2 last:pb-0"
                        >
                          <span
                            aria-hidden
                            className="w-2.5 h-2.5 rounded-full shrink-0 mt-1"
                            style={{ backgroundColor: CATEGORY_META[key].color }}
                          />
                          <span className="flex-1">
                            <span className="font-bold">{CATEGORY_META[key].label}</span>{" "}
                            <span className="text-secondary">
                              ({CATEGORY_META[key].range})
                            </span>
                            : {analysis.potential.categories[key]} Tage —{" "}
                            <span className="text-secondary">
                              {CATEGORY_META[key].benefit}
                            </span>
                          </span>
                        </div>
                      ),
                    )}
                    <p className="text-xs text-secondary pt-2">
                      Basis: Klimanormale 1991–2020 der nächsten DWD-Station{" "}
                      <strong className="text-foreground">
                        {analysis.station.stationName}
                      </strong>{" "}
                      ({analysis.distanceKm} km Entfernung). Höhenkorrektur auf{" "}
                      {location.elevation} m über NN.
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Schneelast-Box */}
            <div className="bg-card border border-outline-variant/40 p-6 md:p-8 mb-8 md:mb-10">
              <div className="flex items-center gap-3 mb-5 md:mb-6">
                <Snowflake className="w-5 h-5 text-primary" aria-hidden />
                <h2 className="text-xl md:text-2xl font-bold tracking-tight">
                  Schneelast für {location.suggestion.label}
                </h2>
              </div>

              <dl className="grid grid-cols-2 md:grid-cols-4 gap-5 md:gap-6 mb-6">
                <SnowStat
                  label="Schneetage Ø"
                  value={`${analysis.station.snowCoverDaysPerYear}`}
                  unit="Tage/Jahr"
                />
                <SnowStat
                  label="Schneelastzone"
                  value={analysis.snow.zone.zone}
                  unit="nach DIN EN 1991-1-3"
                />
                <SnowStat
                  label="Standorthöhe"
                  value={`${location.elevation}`}
                  unit="m über NN"
                />
                <SnowStat
                  label="Bodenschneelast"
                  value={`${analysis.snow.groundLoadCorrectedKn.toLocaleString("de-DE")} kN/m²`}
                  unit={`≈ ${analysis.snow.groundLoadCorrectedKg} kg/m²`}
                />
              </dl>

              <div
                className={`p-4 md:p-5 border-l-4 ${
                  analysis.snow.braitRecommendation.level === "individuell"
                    ? "bg-primary/5 border-primary"
                    : analysis.snow.braitRecommendation.level === "verstaerkt"
                      ? "bg-surface-container-low border-primary/70"
                      : "bg-surface-container-low border-primary/40"
                }`}
              >
                <div className="text-[10px] md:text-xs font-bold uppercase tracking-widest text-primary mb-1">
                  Brait-Empfehlung
                </div>
                <div className="font-bold mb-1.5">
                  {analysis.snow.braitRecommendation.label}
                </div>
                <p className="text-sm text-secondary leading-relaxed">
                  {analysis.snow.braitRecommendation.description}
                </p>
                <p className="text-xs text-secondary mt-2">
                  {analysis.snow.braitRecommendation.costNote} ·{" "}
                  Dachlast (µ=0,8): {analysis.snow.roofLoadKg} kg/m².
                </p>
              </div>
            </div>

            {/* Service-Gebiet */}
            <div
              className={`flex items-start gap-3 p-5 md:p-6 mb-8 md:mb-10 ${
                analysis.inService
                  ? "bg-primary/10 border-l-4 border-primary"
                  : "bg-surface-container-low border-l-4 border-secondary"
              }`}
            >
              <CheckCircle2
                className={`w-5 h-5 mt-0.5 shrink-0 ${analysis.inService ? "text-primary" : "text-secondary"}`}
                aria-hidden
              />
              <div className="text-sm leading-relaxed">
                {analysis.inService ? (
                  <>
                    <strong>Sie liegen in unserem Liefer- und Montagegebiet.</strong>{" "}
                    Brait-Standort: Ulm · Distanz zur nächsten Wetterstation
                    ({analysis.station.cityLabel}): {analysis.distanceKm} km.
                  </>
                ) : (
                  <>
                    <strong>Außerhalb unseres regulären Service-Gebiets.</strong>{" "}
                    Wir prüfen Anfragen über 100 km um Ulm individuell — sprechen
                    Sie uns gerne an, in vielen Fällen ist Montage möglich.
                  </>
                )}
              </div>
            </div>

            {/* CTA */}
            <div className="bg-primary text-primary-foreground p-6 md:p-10 text-center">
              <h2 className="text-xl md:text-3xl font-bold mb-3 md:mb-4">
                Diese Analyse jetzt in einen Plan verwandeln
              </h2>
              <p className="text-sm md:text-base text-primary-foreground/85 mb-5 md:mb-6 max-w-2xl mx-auto">
                Wir kommen mit dem Demo-Koffer zu Ihnen, prüfen Statik,
                Ausrichtung und Wunschmaße — und zeigen direkt vor Ort, wie viele
                der +{analysis.potential.gainedDaysWithDach} Tage Sie konkret
                gewinnen werden.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-3">
                <Link
                  href="/kontakt#demo-koffer"
                  className="inline-flex items-center justify-center gap-2 bg-primary-foreground text-primary px-6 md:px-7 py-3 md:py-3.5 font-bold uppercase tracking-widest text-xs md:text-sm hover:opacity-90 transition-all"
                >
                  Demo-Koffer anfordern <ArrowRight className="w-4 h-4" />
                </Link>
                <a
                  href="tel:01735303581"
                  className="inline-flex items-center justify-center gap-2 border border-primary-foreground/30 px-6 md:px-7 py-3 md:py-3.5 font-bold uppercase tracking-widest text-xs md:text-sm hover:bg-primary-foreground/10 transition-all"
                >
                  <Phone className="w-4 h-4" /> 0173 530 3581
                </a>
              </div>
            </div>
          </section>
        </FadeIn>
      )}

      {/* Quer-Verlinkung */}
      <section className="bg-surface py-12 md:py-16">
        <div className="container mx-auto px-5 md:px-8 max-w-5xl">
          <h2 className="text-xl md:text-2xl font-bold tracking-tight mb-5 md:mb-6">
            Mehr Hintergrund
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4">
            <Link
              href="/ratgeber/schneelast-in-sueddeutschland"
              className="bg-card p-5 md:p-6 hover:bg-surface-container transition-colors group"
            >
              <div className="text-[10px] md:text-xs uppercase tracking-widest text-primary font-bold mb-2">
                Ratgeber
              </div>
              <p className="font-bold mb-2 group-hover:text-primary transition-colors">
                Schneelast in Süddeutschland
              </p>
              <p className="text-secondary text-sm leading-relaxed">
                Zonen, Höhenlagen, Brait-Standardstatik — Detail-Ratgeber.
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
              <p className="font-bold mb-2 group-hover:text-primary transition-colors">
                Welche Überdachung passt zu Ihrem Haus?
              </p>
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
              <p className="font-bold mb-2 group-hover:text-primary transition-colors">
                Brait in Ihrer Stadt
              </p>
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

interface BeforeAfterStatProps {
  caption: string;
  value: number;
  unit: string;
  note: string;
  prefix?: string;
  highlight?: boolean;
}

const BeforeAfterStat = ({
  caption,
  value,
  unit,
  note,
  prefix,
  highlight,
}: BeforeAfterStatProps) => (
  <div className={highlight ? "border-l-4 border-primary pl-4" : "pl-4 border-l-4 border-primary-foreground/15"}>
    <div className="text-[10px] md:text-xs uppercase tracking-widest text-primary-foreground/65 mb-2">
      {caption}
    </div>
    <div className="text-3xl md:text-5xl font-bold tracking-tighter text-primary mb-1">
      {prefix}
      {value}
      <span className="text-base md:text-2xl text-primary-foreground/70 font-medium ml-1">
        {unit}
      </span>
    </div>
    <div className="text-xs text-primary-foreground/60">{note}</div>
  </div>
);

const InsightRow = ({
  color,
  title,
  text,
}: {
  color: string;
  title: string;
  text: string;
}) => (
  <div className="flex items-start gap-3 md:gap-4">
    <span
      aria-hidden
      className="w-1.5 h-12 md:h-14 shrink-0 rounded-sm"
      style={{ backgroundColor: color }}
    />
    <div>
      <p className="font-bold text-base md:text-lg leading-snug mb-1">{title}</p>
      <p className="text-sm text-secondary leading-relaxed">{text}</p>
    </div>
  </div>
);

const SnowStat = ({
  label,
  value,
  unit,
}: {
  label: string;
  value: string;
  unit: string;
}) => (
  <div>
    <dt className="text-[10px] md:text-xs uppercase tracking-widest text-secondary mb-1">
      {label}
    </dt>
    <dd>
      <span className="block text-2xl md:text-3xl font-bold tracking-tighter text-foreground">
        {value}
      </span>
      <span className="block text-xs text-secondary mt-0.5">{unit}</span>
    </dd>
  </div>
);

export default Rechner;
