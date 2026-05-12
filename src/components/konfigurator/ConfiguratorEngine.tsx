"use client";

import { useState, useMemo, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { useRouter, useSearchParams } from "next/navigation";
import Navbar from "@/components/Navbar";
import { Check, Plus, Minus, ChevronDown, ShieldCheck, Sparkles, Truck, Info } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog";
import type { CategoryConfigurator, ConfiguratorStep, SelectCardOption, ColorOption, ExtraOption } from "@/data/configurators";

interface Props {
  config: CategoryConfigurator;
}

const formatPrice = (p: number) =>
  new Intl.NumberFormat("de-DE", { style: "currency", currency: "EUR" }).format(p);

const ConfiguratorEngine = ({ config }: Props) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const preselectModel = searchParams?.get("model") ?? null;

  // Per-step selected option index (für select-cards / radio-icon / colors)
  const [selections, setSelections] = useState<Record<string, number>>({});
  // Dimensions
  const [width, setWidth] = useState<number>(0);
  const [depth, setDepth] = useState<number>(0);
  // Extras (Set von id)
  const [extras, setExtras] = useState<Set<string>>(new Set());
  // UI
  const [showSummary, setShowSummary] = useState(false);
  const [visualizerHovered, setVisualizerHovered] = useState(false);
  /** ID des Steps, der gerade beim Scrollen sichtbar / aktiv ist – dessen Option-Bild wird im Visualizer groß angezeigt */
  const [previewStepId, setPreviewStepId] = useState<string | null>(null);

  // Scroll-Spy: Refs auf jeden Step-Container in der Aside, IntersectionObserver wählt den jeweils oberen sichtbaren Step
  const stepRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);
  const mobileHeroRef = useRef<HTMLDivElement | null>(null);

  // Init: defaults setzen
  useEffect(() => {
    const init: Record<string, number> = {};
    let initW = 0;
    let initD = 0;
    config.steps.forEach((s) => {
      if (s.type === "select-cards" || s.type === "radio-icon" || s.type === "colors") {
        init[s.id] = 0;
      }
      if (s.type === "dimensions" && s.dimensions) {
        initW = s.dimensions.width.default;
        initD = s.dimensions.depth.default;
      }
    });

    // Preselect via ?model= param (sucht nach passender Option-id im ersten select-cards step)
    if (preselectModel) {
      const firstSelect = config.steps.find((s) => s.type === "select-cards");
      if (firstSelect?.options) {
        const idx = firstSelect.options.findIndex((o) => o.id === preselectModel);
        if (idx >= 0) init[firstSelect.id] = idx;
      }
    }

    // Default-Extras
    const initExtras = new Set<string>();
    config.steps.forEach((s) => {
      if (s.type === "extras-toggle" && s.extras) {
        s.extras.forEach((e) => {
          if (e.defaultOn) initExtras.add(e.id);
        });
      }
    });

    setSelections(init);
    setWidth(initW);
    setDepth(initD);
    setExtras(initExtras);
  }, [config, preselectModel]);

  // Wenn dimensionsFromOption-Step seinen Wert ändert, Maße clampen
  const dimsStep = config.steps.find((s) => s.type === "dimensions");
  const dimsSourceStepId = dimsStep?.dimensionsFromOption;
  const dimsSourceStep = dimsSourceStepId ? config.steps.find((s) => s.id === dimsSourceStepId) : undefined;
  const dimsSourceIdx = dimsSourceStepId ? selections[dimsSourceStepId] ?? 0 : 0;
  const activeDims = useMemo(() => {
    if (dimsStep?.dimensions) {
      const opt = dimsSourceStep?.options?.[dimsSourceIdx];
      if (opt?.dimensions) {
        return {
          width: { ...dimsStep.dimensions.width, min: opt.dimensions.minW, max: opt.dimensions.maxW },
          depth: { ...dimsStep.dimensions.depth, min: opt.dimensions.minD, max: opt.dimensions.maxD },
        };
      }
      return dimsStep.dimensions;
    }
    return undefined;
  }, [dimsStep, dimsSourceStep, dimsSourceIdx]);

  useEffect(() => {
    if (!activeDims) return;
    setWidth((w) => {
      const v = w || activeDims.width.default;
      return Math.min(activeDims.width.max, Math.max(activeDims.width.min, v));
    });
    setDepth((d) => {
      const v = d || activeDims.depth.default;
      return Math.min(activeDims.depth.max, Math.max(activeDims.depth.min, v));
    });
  }, [activeDims]);

  // Preisberechnung
  const totalPrice = useMemo(() => {
    let base = config.basePrice;
    let surcharges = 0;

    config.steps.forEach((step) => {
      const idx = selections[step.id] ?? 0;
      if (step.type === "select-cards" || step.type === "radio-icon") {
        const opt = step.options?.[idx];
        if (opt) {
          if (opt.basePrice !== undefined) base = opt.basePrice;
          surcharges += opt.price ?? 0;
        }
      }
    });

    const area = (width || 1) * (depth || 1);

    let extrasTotal = 0;
    config.steps.forEach((step) => {
      if (step.type === "extras-toggle") {
        step.extras?.forEach((e) => {
          if (extras.has(e.id)) extrasTotal += e.price;
        });
      }
    });

    // Wenn die aktive Dimensions-Konfig einen pricePerArea-Faktor definiert,
    // wird linear pro Quadratmeter abgerechnet (saubere "ab X €/m²"-Logik).
    // basePrice wirkt dabei als Floor — kleinere Größen werden nicht unter
    // den Einstiegspreis gedrückt (z. B. 5.490 € Mindestpreis für Veranda
    // inkl. Montage, Lieferung, Statik & Wandanschluss — fix unabhängig
    // von der Quadratmeterzahl).
    // Sonst fällt der Konfigurator auf die historische Area-Multiplikator-Formel
    // zurück (Vergleich zur Standardfläche 24 m², gedeckelt nach unten auf 60 %).
    const pricePerArea = activeDims?.pricePerArea;
    const baseTotal =
      pricePerArea !== undefined && activeDims
        ? Math.max(base, area * pricePerArea)
        : base * Math.max(0.6, activeDims ? area / 24 : 1);

    return Math.round(baseTotal + surcharges + extrasTotal);
  }, [config, selections, extras, width, depth, activeDims]);

  // Aktive Lieferzeit: erste select-cards-Option mit deliveryTime gewinnt, sonst Kategorie-Default
  const activeDeliveryTime = useMemo(() => {
    for (const step of config.steps) {
      if (step.type === "select-cards" && step.options) {
        const opt = step.options[selections[step.id] ?? 0];
        if (opt?.deliveryTime) return opt.deliveryTime;
      }
    }
    return config.deliveryTime;
  }, [config, selections]);

  // Komposition (Rinne + Farbe) – das ist die "Standard"-Vorschau
  const composedHero = useMemo(() => {
    if (!config.heroVariantStepIds || !config.heroVariants) return config.hero;
    const codes: string[] = [];
    for (const stepId of config.heroVariantStepIds) {
      const step = config.steps.find((s) => s.id === stepId);
      if (!step) return config.hero;
      const idx = selections[stepId] ?? 0;
      let code: string | undefined;
      if (step.type === "colors") code = step.colors?.[idx]?.code;
      else code = step.options?.[idx]?.code;
      if (!code) return config.hero;
      codes.push(code);
    }
    return config.heroVariants[codes.join("|")] ?? config.hero;
  }, [config, selections]);

  // Optional: Detail-Vorschau der zuletzt gewählten Option (z. B. Dachmaterial, Wand, LED, ...)
  const previewImage = useMemo(() => {
    if (!previewStepId) return null;
    const step = config.steps.find((s) => s.id === previewStepId);
    if (!step) return null;
    const idx = selections[step.id] ?? 0;
    return step.options?.[idx]?.image ?? null;
  }, [config, selections, previewStepId]);

  // Aktuell angezeigtes Hauptbild
  const activeHero = previewImage ?? composedHero;

  const setSelection = (stepId: string, idx: number) => {
    setSelections((p) => ({ ...p, [stepId]: idx }));
    // Direktes Feedback: bei Klick sofort die Detail-Vorschau dieses Steps zeigen
    // (außer es ist ein Hero-Variant-Step wie Rinne / Farbe – dort soll die Komposition bleiben)
    if (config.heroVariantStepIds?.includes(stepId)) {
      setPreviewStepId(null);
    } else {
      const step = config.steps.find((s) => s.id === stepId);
      if (step?.options?.[idx]?.image) setPreviewStepId(stepId);
    }
  };

  // Scroll-Spy: aktualisiere previewStepId basierend auf der Scroll-Position
  // Funktioniert sowohl auf Desktop (innerer scrollContainer) als auch auf Mobile (window scroll mit sticky Hero).
  useEffect(() => {
    const scroller = scrollContainerRef.current;
    if (!scroller) return;

    const updateActiveStep = () => {
      // Trigger-Linie unterhalb des Sticky-Heros (Mobile) oder im oberen Drittel des Scroll-Containers (Desktop)
      const isDesktop = window.matchMedia("(min-width: 768px)").matches;
      let triggerY: number;
      if (isDesktop) {
        const scrollerRect = scroller.getBoundingClientRect();
        triggerY = scrollerRect.top + scrollerRect.height * 0.25;
      } else if (mobileHeroRef.current) {
        triggerY = mobileHeroRef.current.getBoundingClientRect().bottom + 40;
      } else {
        triggerY = window.innerHeight * 0.5;
      }

      let bestId: string | null = null;
      let bestDistance = Infinity;

      for (const [id, el] of Object.entries(stepRefs.current)) {
        if (!el) continue;
        const rect = el.getBoundingClientRect();
        if (rect.top <= triggerY && rect.bottom >= triggerY) {
          bestId = id;
          bestDistance = 0;
          break;
        }
        const dist = rect.top > triggerY ? rect.top - triggerY : triggerY - rect.bottom;
        if (dist < bestDistance) {
          bestDistance = dist;
          bestId = id;
        }
      }

      if (!bestId) return;
      if (config.heroVariantStepIds?.includes(bestId)) {
        setPreviewStepId(null);
      } else {
        setPreviewStepId(bestId);
      }
    };

    updateActiveStep();
    scroller.addEventListener("scroll", updateActiveStep, { passive: true });
    window.addEventListener("scroll", updateActiveStep, { passive: true });
    window.addEventListener("resize", updateActiveStep);

    return () => {
      scroller.removeEventListener("scroll", updateActiveStep);
      window.removeEventListener("scroll", updateActiveStep);
      window.removeEventListener("resize", updateActiveStep);
    };
  }, [config]);

  // Preload aller Option- und Hero-Variant-Bilder beim Mount,
  // damit der Wechsel zwischen Optionen instant ist (kein Flash zum Hintergrund).
  useEffect(() => {
    const urls = new Set<string>();
    for (const step of config.steps) {
      for (const opt of step.options ?? []) {
        if ("image" in opt && opt.image) urls.add(opt.image);
      }
    }
    if (config.heroVariants) {
      for (const url of Object.values(config.heroVariants)) urls.add(url);
    }
    if (config.hero) urls.add(config.hero);
    urls.forEach((src) => {
      const img = new Image();
      img.src = src;
    });
  }, [config]);

  const toggleExtra = (id: string) => {
    setExtras((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  // Wartungs-Tarife sind exklusiv: nur ein Tarif kann gleichzeitig aktiv sein.
  const selectWartungTariff = (id: string) => {
    setExtras((prev) => {
      const next = new Set(prev);
      const wasActive = next.has(id);
      Array.from(next).forEach((eid) => {
        if (eid.startsWith("wartung-")) next.delete(eid);
      });
      if (!wasActive) next.add(id);
      return next;
    });
  };

  const wartungSubtitle =
    config.slug === "markisen"
      ? "Frühjahr & Herbst – inkl. Prüfprotokoll, Wartungsaufkleber, Kassettenreinigung & Tuchwechsel"
      : "Frühjahr & Herbst – inkl. Prüfprotokoll und Wartungsaufkleber";

  const handleSubmit = () => {
    // Build dynamic options list for inquiry page
    const options: { label: string; value: string }[] = [];
    config.steps.forEach((step) => {
      if (step.type === "select-cards" || step.type === "radio-icon") {
        const opt = step.options?.[selections[step.id] ?? 0];
        if (opt) options.push({ label: step.title, value: opt.label });
      }
      if (step.type === "colors") {
        const c = step.colors?.[selections[step.id] ?? 0];
        if (c) options.push({ label: step.title, value: `${c.label} (${c.ral})` });
      }
    });

    const selectedExtras: string[] = [];
    config.steps.forEach((step) => {
      if (step.type === "extras-toggle") {
        step.extras?.forEach((e) => {
          if (extras.has(e.id)) selectedExtras.push(e.label);
        });
      }
    });

    // Konfiguration via sessionStorage an /anfrage übergeben (Next.js: kein
    // location.state über Routenwechsel hinaus). Reload-tolerant, ohne URL-Verschmutzung.
    const payload = {
      category: config.label,
      categorySlug: config.slug,
      options,
      width: activeDims ? width : undefined,
      depth: activeDims ? depth : undefined,
      extras: selectedExtras,
      totalPrice,
      deliveryTime: activeDeliveryTime,
    };
    if (typeof window !== "undefined") {
      try {
        sessionStorage.setItem("brait:lastConfig", JSON.stringify(payload));
      } catch {
        // sessionStorage kann in Privatmodus oder bei Quota-Fehlern fehlschlagen.
      }
    }
    router.push("/anfrage");
  };

  return (
    <div className="min-h-screen">
      <Navbar iconsOnly />

      {/* Mobile fixed hero – via Portal direkt in document.body, damit position:fixed garantiert funktioniert */}
      {createPortal(
        <div
          ref={mobileHeroRef}
          className="md:hidden fixed top-0 left-0 right-0 z-40 h-72 bg-surface-container-low overflow-hidden"
        >
          <img
            src={composedHero}
            alt={config.label}
            className="absolute inset-0 w-full h-full object-cover transition-all duration-500"
            width={1920}
            height={1080}
          />
          {previewImage && (
            <img
              src={previewImage}
              alt="Detail-Vorschau"
              className="absolute inset-0 w-full h-full object-cover transition-opacity duration-500"
              width={1920}
              height={1080}
            />
          )}
          {previewStepId && (() => {
            const step = config.steps.find((s) => s.id === previewStepId);
            const opt = step?.options?.[selections[previewStepId] ?? 0];
            if (!step || !opt) return null;
            return (
              <div className="absolute bottom-2 right-2 bg-card/90 backdrop-blur-md border-l-4 border-primary px-3 py-2 shadow-lg">
                <p className="text-[8px] uppercase tracking-widest text-secondary font-bold">{step.num}. {step.title}</p>
                <p className="text-xs font-headline font-bold text-foreground leading-tight">{opt.label}</p>
              </div>
            );
          })()}
        </div>,
        document.body
      )}

      <main className="min-h-screen pt-72 md:pt-24 flex flex-col md:flex-row md:h-screen md:overflow-hidden">
        {/* Visualizer */}
        <section
          className="hidden md:block relative flex-1 bg-surface-container-low overflow-hidden"
          onMouseEnter={() => setVisualizerHovered(true)}
          onMouseLeave={() => setVisualizerHovered(false)}
        >
          {/* Basis-Komposition (Rinne + Farbe) – füllt den kompletten Container */}
          <img
            src={composedHero}
            className="absolute inset-0 w-full h-full object-cover transition-all duration-700"
            alt={config.label}
            width={1920}
            height={1080}
          />
          {/* Detail-Vorschau (zuletzt gewählte Option) – fadet drüber, sobald aktiv */}
          {previewImage && (
            <img
              src={previewImage}
              className="absolute inset-0 w-full h-full object-cover transition-opacity duration-500 opacity-100"
              alt="Detail-Vorschau"
              width={1920}
              height={1080}
            />
          )}
          <div className="absolute inset-0 bg-foreground/5 pointer-events-none" />

          <div
            className={`absolute top-12 left-12 max-w-sm p-8 bg-card/80 backdrop-blur-xl border-l-4 border-primary transition-all duration-300 ${visualizerHovered ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 -translate-y-2 pointer-events-none"}`}
          >
            <p className="text-[10px] uppercase tracking-[0.3em] text-primary font-bold mb-2">Konfigurator</p>
            <h2 className="text-2xl font-headline font-bold leading-tight">{config.label}</h2>
            <p className="text-xs text-secondary mt-2">{config.shortDesc}</p>
          </div>

          {previewStepId && (() => {
            const step = config.steps.find((s) => s.id === previewStepId);
            const opt = step?.options?.[selections[previewStepId] ?? 0];
            if (!step || !opt) return null;
            return (
              <div className="absolute bottom-12 right-12 z-10 bg-card/90 backdrop-blur-xl border-l-4 border-primary px-4 py-3 shadow-xl">
                <p className="text-[9px] uppercase tracking-widest text-secondary font-bold">{step.num}. {step.title}</p>
                <p className="text-sm font-headline font-bold text-foreground leading-tight">{opt.label}</p>
              </div>
            );
          })()}

          <div
            className={`absolute top-12 right-12 z-10 flex flex-col items-stretch gap-3 transition-all duration-300 ${visualizerHovered ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 -translate-y-2 pointer-events-none"}`}
          >
            <div className="bg-primary text-primary-foreground p-6 text-center shadow-2xl">
              <p className="text-[10px] uppercase tracking-widest opacity-80 mb-1">Ab</p>
              <p className="text-2xl font-headline font-bold">{formatPrice(totalPrice)}</p>
            </div>
            {activeDeliveryTime && (
              <div className="bg-card/90 backdrop-blur-xl border-l-4 border-primary px-4 py-3 shadow-xl flex items-center gap-3">
                <Truck className="w-4 h-4 text-primary shrink-0" />
                <div className="text-left leading-tight">
                  <p className="text-[9px] uppercase tracking-widest text-secondary font-bold">Lieferzeit</p>
                  <p className="text-sm font-headline font-bold text-foreground">{activeDeliveryTime}</p>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Config Panel */}
        <aside className="w-full md:w-[450px] lg:w-[500px] md:h-full bg-surface md:border-l border-outline-variant/20 flex flex-col">
          <div ref={scrollContainerRef} className="p-4 md:p-8 flex-1 md:overflow-y-auto space-y-6 md:space-y-10 pb-44">
            {config.steps.map((step) => (
              <div
                key={step.id}
                data-step-id={step.id}
                ref={(el) => {
                  stepRefs.current[step.id] = el;
                }}
              >
                <StepRenderer
                  step={step}
                  selectedIdx={selections[step.id] ?? 0}
                  onSelect={(i) => setSelection(step.id, i)}
                  width={width}
                  depth={depth}
                  setWidth={setWidth}
                  setDepth={setDepth}
                  activeDims={activeDims}
                  extras={extras}
                  toggleExtra={toggleExtra}
                  selectWartungTariff={selectWartungTariff}
                  wartungSubtitle={wartungSubtitle}
                  isMarkisen={config.slug === "markisen"}
                />
              </div>
            ))}
          </div>

          {/* Footer CTA */}
          <div className="fixed bottom-0 left-0 right-0 md:relative md:bottom-auto bg-surface-container-highest border-t border-outline-variant/20 z-20 shadow-[0_-4px_20px_rgba(0,0,0,0.1)]">
            {showSummary && (
              <div className="px-4 md:px-8 pt-3 pb-2 space-y-1 border-b border-outline-variant/20 max-h-48 overflow-y-auto">
                {config.steps.map((step) => {
                  if (step.type === "select-cards" || step.type === "radio-icon") {
                    const opt = step.options?.[selections[step.id] ?? 0];
                    if (!opt) return null;
                    return (
                      <div key={step.id} className="flex justify-between text-xs md:text-sm">
                        <span className="text-secondary">{step.title}</span>
                        <span>{opt.label}</span>
                      </div>
                    );
                  }
                  return null;
                })}
                {Array.from(extras).length > 0 && (
                  <div className="flex justify-between text-xs md:text-sm">
                    <span className="text-secondary">Extras</span>
                    <span>{extras.size} ausgewählt</span>
                  </div>
                )}
                {activeDeliveryTime && (
                  <div className="flex justify-between text-xs md:text-sm pt-1">
                    <span className="text-secondary flex items-center gap-1.5"><Truck className="w-3 h-3 text-primary" /> Lieferzeit</span>
                    <span className="font-bold text-primary">{activeDeliveryTime}</span>
                  </div>
                )}
              </div>
            )}

            {/* Trust microcopy */}
            <div className="px-4 md:px-8 pt-3 pb-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-[10px] md:text-[11px] text-secondary">
              <span className="flex items-center gap-1"><ShieldCheck className="w-3 h-3 text-primary" /> Persönliche Beratung</span>
              {activeDeliveryTime && (
                <span className="flex items-center gap-1"><Truck className="w-3 h-3 text-primary" /> Lieferzeit {activeDeliveryTime}</span>
              )}
            </div>

            <div className="px-4 md:px-8 py-3 md:py-4 flex items-center gap-3">
              <button onClick={() => setShowSummary(!showSummary)} className="flex items-center gap-2 shrink-0">
                <ChevronDown className={`w-4 h-4 text-primary transition-transform ${showSummary ? "rotate-180" : ""}`} />
                <div className="text-left">
                  <p className="text-xl md:text-2xl font-headline font-bold text-primary leading-tight">{formatPrice(totalPrice)}</p>
                  <p className="text-[9px] md:text-[10px] uppercase tracking-widest text-secondary font-bold leading-none mt-0.5">inkl. MwSt. & Montage</p>
                </div>
              </button>

              <button
                onClick={handleSubmit}
                className="flex-1 flex flex-col items-center justify-center bg-foreground text-primary-foreground py-2.5 md:py-3 font-headline uppercase tracking-[0.15em] hover:bg-primary transition-all active:scale-[0.98] ml-auto leading-tight"
              >
                <span className="text-[11px] md:text-sm font-bold">Unverbindliche Anfrage</span>
                <span className="text-[9px] md:text-[10px] opacity-70 normal-case tracking-normal mt-0.5">Kostenlos · Antwort in 24 h</span>
              </button>
            </div>
          </div>
        </aside>
      </main>
    </div>
  );
};

// ============================================================
// STEP RENDERER
// ============================================================
interface StepRendererProps {
  step: ConfiguratorStep;
  selectedIdx: number;
  onSelect: (i: number) => void;
  width: number;
  depth: number;
  setWidth: (v: number) => void;
  setDepth: (v: number) => void;
  activeDims?: ConfiguratorStep["dimensions"];
  extras: Set<string>;
  toggleExtra: (id: string) => void;
  selectWartungTariff: (id: string) => void;
  wartungSubtitle: string;
  isMarkisen: boolean;
}

const StepRenderer = ({
  step, selectedIdx, onSelect, width, depth, setWidth, setDepth, activeDims, extras, toggleExtra,
  selectWartungTariff, wartungSubtitle, isMarkisen,
}: StepRendererProps) => {
  return (
    <div className="space-y-4 md:space-y-6">
      <div className="flex items-center gap-3 md:gap-4">
        <div className="w-0.5 h-5 md:h-6 bg-primary" />
        <h3 className="text-xs md:text-sm font-headline uppercase tracking-widest font-bold">
          {step.num}. {step.title}
        </h3>
      </div>

      {step.type === "select-cards" && step.options && (
        <div className="grid grid-cols-1 gap-2 md:gap-3">
          {step.options.map((o, i) => (
            <SelectCardButton key={o.id} option={o} active={i === selectedIdx} onClick={() => onSelect(i)} />
          ))}
        </div>
      )}

      {step.type === "radio-icon" && step.options && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 md:gap-3">
          {step.options.map((o, i) => (
            <button
              key={o.id}
              onClick={() => onSelect(i)}
              className={`p-3 md:p-4 text-center transition-all duration-200 flex flex-col items-center justify-center min-h-[72px] ${i === selectedIdx ? "border-2 border-primary bg-primary/5 shadow-md" : "border border-outline-variant/30 hover:border-primary/50"}`}
            >
              <span className="text-[11px] md:text-xs font-bold uppercase tracking-wider block break-words hyphens-auto leading-tight">{o.label}</span>
              {o.price ? <span className="text-[10px] text-primary mt-1 block">+ {formatPrice(o.price)}</span> : null}
            </button>
          ))}
        </div>
      )}

      {step.type === "dimensions" && activeDims && (
        <div className="space-y-4 md:space-y-6">
          <DimensionSlider
            label={activeDims.width.label ?? "Breite"}
            value={width}
            onChange={setWidth}
            min={activeDims.width.min}
            max={activeDims.width.max}
            unit="m"
          />
          <DimensionSlider
            label={activeDims.depth.label ?? "Tiefe"}
            value={depth}
            onChange={setDepth}
            min={activeDims.depth.min}
            max={activeDims.depth.max}
            unit="m"
          />
          <div className="bg-surface-container-low p-3 md:p-4 flex justify-between items-center">
            <span className="text-xs md:text-sm text-secondary">Gesamtfläche</span>
            <span className="font-headline font-bold text-primary text-sm md:text-base">{(width * depth).toFixed(1)} m²</span>
          </div>
        </div>
      )}

      {step.type === "colors" && step.colors && (
        <div className="flex gap-2 md:gap-3 flex-wrap">
          {step.colors.map((c, i) => {
            const isDark = ["#293133", "#0A0A0A", "#0a0a0a", "#3d3d3d"].includes(c.hex);
            return (
              <div key={`${c.ral}-${i}`} className="cursor-pointer" onClick={() => onSelect(i)}>
                <div className={`w-11 h-11 md:w-14 md:h-14 p-0.5 transition-all duration-200 ${i === selectedIdx ? "border-2 border-primary scale-110 shadow-lg" : "border border-transparent hover:border-primary/50"}`}>
                  <div className="w-full h-full relative" style={{ backgroundColor: c.hex }}>
                    {i === selectedIdx && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <Check className={`w-3 h-3 md:w-4 md:h-4 ${isDark ? "text-primary-foreground" : "text-foreground"}`} />
                      </div>
                    )}
                  </div>
                </div>
                <p className="text-[9px] md:text-[10px] mt-1 md:mt-2 text-center text-secondary uppercase tracking-tighter max-w-[60px] truncate">{c.label}</p>
              </div>
            );
          })}
        </div>
      )}

      {step.type === "extras-toggle" && step.extras && (() => {
        const wartungItems = step.extras.filter((e) => e.id.startsWith("wartung-"));
        const normalItems = step.extras.filter((e) => !e.id.startsWith("wartung-"));
        return (
          <div className="space-y-4 md:space-y-5">
            {normalItems.length > 0 && (
              <div className="grid grid-cols-1 gap-2 md:gap-3">
                {normalItems.map((e) => {
                  const active = extras.has(e.id);
                  return (
                    <button
                      key={e.id}
                      onClick={() => toggleExtra(e.id)}
                      className={`p-3 md:p-4 flex justify-between items-center text-left transition-all duration-200 ${active ? "bg-primary/5 border-l-4 border-primary shadow-sm" : "bg-surface-container-low hover:bg-surface-container border-l-4 border-transparent"}`}
                    >
                      <div className="flex items-center gap-3 md:gap-4 min-w-0">
                        <Sparkles className={`w-5 h-5 shrink-0 ${active ? "text-primary" : "text-secondary"}`} />
                        <div className="min-w-0">
                          <p className="text-xs md:text-sm font-bold">{e.label}</p>
                          <p className="text-[11px] md:text-xs text-secondary truncate">{e.desc}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 md:gap-3 shrink-0 ml-2">
                        <span className="text-xs md:text-sm font-headline font-bold whitespace-nowrap">{formatPrice(e.price)}</span>
                        <div className={`w-5 h-5 md:w-6 md:h-6 flex items-center justify-center transition-all ${active ? "bg-primary text-primary-foreground" : "border border-outline-variant/50"}`}>
                          {active ? <Check className="w-3 h-3" /> : <Plus className="w-3 h-3 text-secondary" />}
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            )}

            {wartungItems.length > 0 && (
              <div className="bg-surface-container-low border border-outline-variant/30 p-4 md:p-5">
                <div className="flex items-start gap-3 md:gap-4 mb-3 md:mb-4">
                  <div className="w-10 h-10 md:w-11 md:h-11 bg-primary/10 flex items-center justify-center shrink-0">
                    <ShieldCheck className="w-5 h-5 md:w-6 md:h-6 text-primary" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <p className="text-sm md:text-base font-headline font-bold leading-tight">Wartungspaket</p>
                      <Dialog>
                        <DialogTrigger asChild>
                          <button
                            type="button"
                            className="inline-flex items-center gap-1 text-[10px] md:text-xs uppercase tracking-widest font-bold text-primary hover:text-primary/80 transition-colors border border-primary/30 hover:border-primary px-2 py-1 leading-none"
                          >
                            <Info className="w-3 h-3" />
                            Mehr Info
                          </button>
                        </DialogTrigger>
                        <DialogContent className="max-w-lg">
                          <DialogHeader>
                            <div className="flex items-center gap-3 mb-2">
                              <div className="w-11 h-11 bg-primary/10 flex items-center justify-center shrink-0">
                                <ShieldCheck className="w-6 h-6 text-primary" />
                              </div>
                              <div>
                                <DialogTitle className="text-lg font-headline font-bold leading-tight">
                                  Wartungspaket – Umfang
                                </DialogTitle>
                                <DialogDescription className="text-xs text-secondary mt-1">
                                  Zwei professionelle Wartungstermine pro Jahr für maximale Lebensdauer.
                                </DialogDescription>
                              </div>
                            </div>
                          </DialogHeader>
                          <div className="space-y-5 mt-2 text-sm">
                            <section>
                              <p className="text-[10px] uppercase tracking-widest text-primary font-bold mb-2">Frühjahrs-Service (April / Mai)</p>
                              <ul className="space-y-1.5 text-foreground/85">
                                <li className="flex gap-2"><Check className="w-4 h-4 text-primary shrink-0 mt-0.5" /> Sicht- und Funktionsprüfung aller Komponenten</li>
                                <li className="flex gap-2"><Check className="w-4 h-4 text-primary shrink-0 mt-0.5" /> Reinigung der Profile, Glasflächen & Dichtungen</li>
                                <li className="flex gap-2"><Check className="w-4 h-4 text-primary shrink-0 mt-0.5" /> Schmierung aller beweglichen Teile</li>
                                <li className="flex gap-2"><Check className="w-4 h-4 text-primary shrink-0 mt-0.5" /> Justierung von Schrauben, Scharnieren & Führungen</li>
                                <li className="flex gap-2"><Check className="w-4 h-4 text-primary shrink-0 mt-0.5" /> Prüfung der Entwässerung (Regenrinnen, Abläufe)</li>
                                {isMarkisen && (
                                  <>
                                    <li className="flex gap-2"><Check className="w-4 h-4 text-primary shrink-0 mt-0.5" /> Reinigung der Markisenkassetten innen & außen</li>
                                    <li className="flex gap-2"><Check className="w-4 h-4 text-primary shrink-0 mt-0.5" /> Tuchprüfung und ggf. Tuchwechsel-Beratung</li>
                                  </>
                                )}
                              </ul>
                            </section>

                            <section>
                              <p className="text-[10px] uppercase tracking-widest text-primary font-bold mb-2">Herbst-Service (Oktober / November)</p>
                              <ul className="space-y-1.5 text-foreground/85">
                                <li className="flex gap-2"><Check className="w-4 h-4 text-primary shrink-0 mt-0.5" /> Wintersicheres Einrichten der Anlage</li>
                                <li className="flex gap-2"><Check className="w-4 h-4 text-primary shrink-0 mt-0.5" /> Kontrolle aller elektrischen Komponenten (LED, Funk, Motoren)</li>
                                <li className="flex gap-2"><Check className="w-4 h-4 text-primary shrink-0 mt-0.5" /> Endreinigung & Pflege vor der kalten Jahreszeit</li>
                                <li className="flex gap-2"><Check className="w-4 h-4 text-primary shrink-0 mt-0.5" /> Kleine Reparaturen vor Ort (im Rahmen der Wartung)</li>
                              </ul>
                            </section>

                            <section className="bg-primary/5 border-l-4 border-primary p-3">
                              <p className="text-[10px] uppercase tracking-widest text-primary font-bold mb-2">Inklusive Dokumentation</p>
                              <ul className="space-y-1.5 text-foreground/85">
                                <li className="flex gap-2"><Check className="w-4 h-4 text-primary shrink-0 mt-0.5" /> Ausführliches Prüfprotokoll nach jedem Termin</li>
                                <li className="flex gap-2"><Check className="w-4 h-4 text-primary shrink-0 mt-0.5" /> Wartungsaufkleber als Nachweis am Profil</li>
                                <li className="flex gap-2"><Check className="w-4 h-4 text-primary shrink-0 mt-0.5" /> Empfehlung für die nächste Saison</li>
                              </ul>
                            </section>

                            <section className="border-t border-outline-variant/30 pt-4">
                              <p className="text-[10px] uppercase tracking-widest text-secondary font-bold mb-2">Tarife im Überblick</p>
                              <div className="grid grid-cols-3 gap-2 text-center">
                                <div className="border border-outline-variant/30 p-2">
                                  <p className="text-[9px] uppercase tracking-widest text-secondary font-bold">Monatlich</p>
                                  <p className="text-sm font-headline font-bold mt-1">14,90 €</p>
                                  <p className="text-[10px] text-secondary">/ Monat</p>
                                </div>
                                <div className="border border-primary/40 bg-primary/[0.02] p-2">
                                  <p className="text-[9px] uppercase tracking-widest text-secondary font-bold">Jährlich</p>
                                  <p className="text-sm font-headline font-bold mt-1">199 €</p>
                                  <p className="text-[10px] text-secondary">/ Jahr</p>
                                </div>
                                <div className="border-2 border-primary bg-primary/5 p-2 relative">
                                  <span className="absolute -top-2 left-1/2 -translate-x-1/2 px-1.5 py-0.5 bg-primary text-primary-foreground text-[8px] uppercase tracking-widest font-bold leading-none whitespace-nowrap">
                                    Bestpreis · −16 %
                                  </span>
                                  <p className="text-[9px] uppercase tracking-widest text-primary font-bold">3 Jahre</p>
                                  <p className="text-sm font-headline font-bold mt-1">499 €</p>
                                  <p className="text-[10px] text-secondary">einmalig</p>
                                </div>
                              </div>
                            </section>
                          </div>
                        </DialogContent>
                      </Dialog>
                    </div>
                    <p className="text-[11px] md:text-xs text-secondary mt-1 leading-snug">{wartungSubtitle}</p>
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 md:gap-3 sm:items-stretch">
                  {(() => {
                    // Tarif-Preise
                    const yearly = wartungItems.find((x) => x.id === "wartung-jahr")?.price ?? 0;
                    const threeY = wartungItems.find((x) => x.id === "wartung-3jahre")?.price ?? 0;
                    // Bestpreis-Referenz: 3 Jahre vs. Jährlich × 3 (ehrliche Spar-Aussage).
                    const threeYearBaseline = yearly * 3;
                    const savingsThreeY = Math.max(0, Math.round(threeYearBaseline - threeY));
                    const pctThreeY = threeYearBaseline > 0 ? Math.round((savingsThreeY / threeYearBaseline) * 100) : 0;

                    return wartungItems.map((e) => {
                      const active = extras.has(e.id);
                      const isMonth = e.id === "wartung-monat";
                      const isYear = e.id === "wartung-jahr";
                      const isBest = e.id === "wartung-3jahre";

                      // Visuelle Hierarchie (passive Karten)
                      const passiveBorder = isBest
                        ? "border-2 border-primary"
                        : isYear
                        ? "border border-primary/40"
                        : "border border-outline-variant/40";
                      const passiveBg = isBest
                        ? "bg-primary/5"
                        : isYear
                        ? "bg-primary/[0.02]"
                        : "bg-surface";

                      // Kompaktes Badge oben mittig — nur „Bestpreis" auf 3 Jahre, Jährlich neutral lassen.
                      const badgeLabel = isBest ? `Bestpreis · −${pctThreeY} %` : null;
                      const badgeClasses = isBest ? "bg-primary text-primary-foreground" : "";

                      // Subtext unter dem Preis (positionsspezifisch)
                      const savingsLine = isBest
                        ? `Spare ${savingsThreeY} € vs. Jährlich`
                        : isYear
                        ? "Festpreis · 1× im Jahr abgerechnet"
                        : "Volle Flexibilität · monatlich kündbar";

                      // Preis kompakt zerlegen (Hauptbetrag + Periode)
                      // e.desc kommt z.B. als "14,90 € / Monat" / "199 € / Jahr" / "499 € einmalig"
                      const descParts = e.desc.split(/\s+\/\s+|\s+(?=einmalig)/);
                      const priceLabel = descParts[0] ?? e.desc;
                      const periodLabel = descParts[1] ?? "";

                      return (
                        <button
                          key={e.id}
                          onClick={() => selectWartungTariff(e.id)}
                          className={`relative p-3 md:p-4 pt-5 md:pt-6 text-left transition-all duration-200 flex flex-col ${
                            active
                              ? "bg-primary text-primary-foreground shadow-md border-2 border-primary"
                              : `${passiveBg} ${passiveBorder} hover:border-primary/70 hover:shadow-sm`
                          }`}
                        >
                          {badgeLabel && (
                            <span className={`absolute -top-2 left-1/2 -translate-x-1/2 px-2 py-0.5 ${active ? "bg-primary-foreground text-primary" : badgeClasses} text-[9px] uppercase tracking-widest font-bold leading-none whitespace-nowrap shadow-sm`}>
                              {badgeLabel}
                            </span>
                          )}
                          <p className={`text-[10px] md:text-[11px] uppercase tracking-widest font-bold mb-1 ${active ? "text-primary-foreground/70" : "text-secondary"}`}>
                            {e.label}
                          </p>
                          <div className="flex items-baseline gap-1 flex-wrap">
                            <span className={`text-lg md:text-xl font-headline font-bold leading-none ${active ? "text-primary-foreground" : "text-foreground"}`}>
                              {priceLabel}
                            </span>
                            {periodLabel && (
                              <span className={`text-[10px] md:text-[11px] ${active ? "text-primary-foreground/70" : "text-secondary"}`}>
                                {periodLabel === "einmalig" ? "einmalig" : `/ ${periodLabel}`}
                              </span>
                            )}
                          </div>
                          <p className={`text-[10px] md:text-[11px] mt-1.5 leading-snug ${
                            active
                              ? "text-primary-foreground/80"
                              : isBest
                              ? "text-primary font-bold"
                              : "text-secondary"
                          }`}>
                            {savingsLine}
                          </p>
                          <div className="flex items-center justify-between mt-auto pt-2 md:pt-3">
                            <span className={`text-[10px] ${active ? "text-primary-foreground/70" : "text-secondary"}`}>
                              {active ? "Ausgewählt" : "Auswählen"}
                            </span>
                            <div className={`w-4 h-4 md:w-5 md:h-5 flex items-center justify-center transition-all ${active ? "bg-primary-foreground text-primary" : "border border-outline-variant/50"}`}>
                              {active ? <Check className="w-2.5 h-2.5 md:w-3 md:h-3" /> : <Plus className="w-2.5 h-2.5 md:w-3 md:h-3 text-secondary" />}
                            </div>
                          </div>
                        </button>
                      );
                    });
                  })()}
                </div>
              </div>
            )}
          </div>
        );
      })()}
    </div>
  );
};

const SelectCardButton = ({ option, active, onClick }: { option: SelectCardOption; active: boolean; onClick: () => void }) => (
  <button
    onClick={onClick}
    className={`flex items-center gap-3 md:gap-4 p-3 md:p-4 text-left transition-all duration-200 ${active ? "border-2 border-primary bg-primary/5 shadow-md" : "border border-outline-variant/30 hover:border-primary/50 hover:shadow-sm"}`}
  >
    {option.image && (
      <div className="shrink-0 w-16 h-16 md:w-20 md:h-20 bg-surface-container-low overflow-hidden">
        <img src={option.image} alt={option.label} width={80} height={80} className="w-full h-full object-cover" loading="lazy" />
      </div>
    )}
    <div className="min-w-0 flex-1">
      <p className="font-headline font-bold text-sm md:text-base">{option.label}</p>
      {option.desc && <p className="text-[11px] md:text-xs text-secondary mt-0.5 md:mt-1">{option.desc}</p>}
      {option.deliveryTime && (
        <p className="text-[10px] md:text-[11px] text-secondary mt-1 flex items-center gap-1">
          <Truck className="w-3 h-3 text-primary" />
          <span>Lieferzeit <span className="font-bold text-foreground">{option.deliveryTime}</span></span>
        </p>
      )}
    </div>
    <div className="flex items-center gap-2 md:gap-3 shrink-0 ml-2">
      {option.basePrice !== undefined && (
        <span className="text-[11px] md:text-xs text-primary font-bold">ab {formatPrice(option.basePrice)}</span>
      )}
      {option.basePrice === undefined && option.price ? (
        <span className="text-[11px] md:text-xs text-primary font-bold">+ {formatPrice(option.price)}</span>
      ) : null}
      {active && <Check className="w-4 h-4 md:w-5 md:h-5 text-primary" />}
    </div>
  </button>
);

const DimensionSlider = ({
  label, value, onChange, min, max, unit,
}: { label: string; value: number; onChange: (v: number) => void; min: number; max: number; unit: string }) => {
  const step = 0.1;
  const safeValue = Math.min(max, Math.max(min, value || min));
  const pct = ((safeValue - min) / (max - min)) * 100;

  return (
    <div>
      <div className="flex justify-between items-center mb-2 md:mb-3">
        <span className="text-xs md:text-sm font-bold">{label}</span>
        <div className="flex items-center gap-1.5 md:gap-2">
          <button
            onClick={() => onChange(Math.max(min, +(safeValue - 0.1).toFixed(1)))}
            className="w-6 h-6 md:w-7 md:h-7 border border-outline-variant/30 flex items-center justify-center hover:border-primary transition-colors"
          >
            <Minus className="w-3 h-3" />
          </button>
          <span className="font-headline font-bold text-primary w-14 md:w-16 text-center text-sm md:text-base">{safeValue.toFixed(1)} {unit}</span>
          <button
            onClick={() => onChange(Math.min(max, +(safeValue + 0.1).toFixed(1)))}
            className="w-6 h-6 md:w-7 md:h-7 border border-outline-variant/30 flex items-center justify-center hover:border-primary transition-colors"
          >
            <Plus className="w-3 h-3" />
          </button>
        </div>
      </div>
      <div className="relative h-2 bg-surface-container-high">
        <div className="absolute left-0 top-0 h-full bg-primary transition-all duration-200" style={{ width: `${pct}%` }} />
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={safeValue}
          onChange={(e) => onChange(parseFloat(e.target.value))}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        />
        <div
          className="absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-primary border-2 border-primary-foreground shadow-md transition-all duration-200 pointer-events-none"
          style={{ left: `calc(${pct}% - 8px)` }}
        />
      </div>
      <div className="flex justify-between mt-1">
        <span className="text-[10px] text-secondary">{min} {unit}</span>
        <span className="text-[10px] text-secondary">{max} {unit}</span>
      </div>
    </div>
  );
};

export default ConfiguratorEngine;
