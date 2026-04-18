import { useState, useMemo, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import Navbar from "@/components/Navbar";
import { Sun, Moon, Check, Plus, Minus, ChevronDown, ShieldCheck, Sparkles, Heart } from "lucide-react";
import type { CategoryConfigurator, ConfiguratorStep, SelectCardOption, ColorOption, ExtraOption } from "@/data/configurators";

interface Props {
  config: CategoryConfigurator;
}

const formatPrice = (p: number) =>
  new Intl.NumberFormat("de-DE", { style: "currency", currency: "EUR" }).format(p);

const ConfiguratorEngine = ({ config }: Props) => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const preselectModel = searchParams.get("model");

  // Per-step selected option index (für select-cards / radio-icon / colors)
  const [selections, setSelections] = useState<Record<string, number>>({});
  // Dimensions
  const [width, setWidth] = useState<number>(0);
  const [depth, setDepth] = useState<number>(0);
  // Extras (Set von id)
  const [extras, setExtras] = useState<Set<string>>(new Set());
  // UI
  const [viewMode, setViewMode] = useState<"tag" | "nacht">("tag");
  const [showSummary, setShowSummary] = useState(false);

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
    const areaMult = activeDims ? area / 24 : 1;

    let extrasTotal = 0;
    config.steps.forEach((step) => {
      if (step.type === "extras-toggle") {
        step.extras?.forEach((e) => {
          if (extras.has(e.id)) extrasTotal += e.price;
        });
      }
    });

    return Math.round(base * Math.max(0.6, areaMult) + surcharges + extrasTotal);
  }, [config, selections, extras, width, depth, activeDims]);

  const setSelection = (stepId: string, idx: number) => {
    setSelections((p) => ({ ...p, [stepId]: idx }));
  };

  const toggleExtra = (id: string) => {
    setExtras((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

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

    navigate("/anfrage", {
      state: {
        category: config.label,
        categorySlug: config.slug,
        options,
        width: activeDims ? width : undefined,
        depth: activeDims ? depth : undefined,
        extras: selectedExtras,
        totalPrice,
      },
    });
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="min-h-screen pt-24 flex flex-col md:flex-row md:h-screen md:overflow-hidden">
        {/* Visualizer */}
        <section className="hidden md:block relative flex-1 bg-surface-container-low overflow-hidden">
          <img
            src={config.hero}
            className={`w-full h-full object-cover transition-all duration-700 ${viewMode === "nacht" ? "brightness-[0.3] saturate-50" : ""}`}
            alt={config.label}
            width={1280}
            height={960}
          />
          <div className={`absolute inset-0 transition-all duration-700 ${viewMode === "nacht" ? "bg-blue-950/30" : "bg-foreground/5"}`} />

          {config.showDayNight && (
            <div className="absolute bottom-12 left-12 flex gap-4 z-10">
              <button
                onClick={() => setViewMode("tag")}
                className={`px-6 py-3 flex items-center gap-3 transition-all shadow-xl ${viewMode === "tag" ? "bg-card/90 border-b-2 border-primary" : "bg-foreground/30 backdrop-blur-md text-primary-foreground"}`}
              >
                <Sun className="w-4 h-4" />
                <span className="font-headline text-xs uppercase tracking-widest font-bold">Tag</span>
              </button>
              <button
                onClick={() => setViewMode("nacht")}
                className={`px-6 py-3 flex items-center gap-3 transition-all ${viewMode === "nacht" ? "bg-card/90 border-b-2 border-primary text-foreground" : "bg-foreground/40 backdrop-blur-md text-primary-foreground"}`}
              >
                <Moon className="w-4 h-4" />
                <span className="font-headline text-xs uppercase tracking-widest font-bold">Nacht</span>
              </button>
            </div>
          )}

          <div className="absolute top-12 left-12 max-w-sm p-8 bg-card/80 backdrop-blur-xl border-l-4 border-primary">
            <p className="text-[10px] uppercase tracking-[0.3em] text-primary font-bold mb-2">Konfigurator</p>
            <h2 className="text-2xl font-headline font-bold leading-tight">{config.label}</h2>
            <p className="text-xs text-secondary mt-2">{config.shortDesc}</p>
          </div>

          <div className="absolute top-12 right-12 bg-primary text-primary-foreground p-6 text-center shadow-2xl z-10">
            <p className="text-[10px] uppercase tracking-widest opacity-80 mb-1">Ab</p>
            <p className="text-2xl font-headline font-bold">{formatPrice(totalPrice)}</p>
          </div>
        </section>

        {/* Config Panel */}
        <aside className="w-full md:w-[450px] lg:w-[500px] md:h-full bg-surface md:border-l border-outline-variant/20 flex flex-col">
          {/* Mobile hero preview */}
          <div className="md:hidden relative h-40 overflow-hidden">
            <img src={config.hero} alt={config.label} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 to-transparent" />
            <div className="absolute bottom-3 left-4 right-4">
              <p className="text-[10px] uppercase tracking-widest text-primary-foreground/70 font-bold">Konfigurator</p>
              <h2 className="text-xl font-headline font-bold text-primary-foreground">{config.label}</h2>
            </div>
          </div>

          <div className="p-4 md:p-8 flex-1 md:overflow-y-auto space-y-6 md:space-y-10 pb-44">
            {config.steps.map((step) => (
              <StepRenderer
                key={step.id}
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
              />
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
              </div>
            )}

            {/* Trust microcopy */}
            <div className="px-4 md:px-8 pt-3 pb-1 flex flex-wrap gap-x-3 gap-y-1 text-[10px] md:text-[11px] text-secondary">
              <span className="flex items-center gap-1"><Check className="w-3 h-3 text-primary" /> Kostenfrei</span>
              <span className="flex items-center gap-1"><Heart className="w-3 h-3 text-primary" /> Ohne Kaufverpflichtung</span>
              <span className="flex items-center gap-1"><ShieldCheck className="w-3 h-3 text-primary" /> Persönliche Beratung</span>
            </div>

            <div className="px-4 md:px-8 py-3 md:py-4 flex items-center gap-3">
              <button onClick={() => setShowSummary(!showSummary)} className="flex items-center gap-2 shrink-0">
                <ChevronDown className={`w-4 h-4 text-primary transition-transform ${showSummary ? "rotate-180" : ""}`} />
                <div className="text-left">
                  <p className="text-[9px] md:text-[10px] uppercase tracking-widest text-secondary font-bold leading-none">Richtpreis ab</p>
                  <p className="text-xl md:text-2xl font-headline font-bold text-primary leading-tight">{formatPrice(totalPrice)}</p>
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
}

const StepRenderer = ({
  step, selectedIdx, onSelect, width, depth, setWidth, setDepth, activeDims, extras, toggleExtra,
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
        <div className="flex gap-2 md:gap-3 flex-wrap">
          {step.options.map((o, i) => (
            <button
              key={o.id}
              onClick={() => onSelect(i)}
              className={`flex-1 min-w-[120px] p-3 md:p-4 text-center transition-all duration-200 ${i === selectedIdx ? "border-2 border-primary bg-primary/5 shadow-md" : "border border-outline-variant/30 hover:border-primary/50"}`}
            >
              <span className="text-[11px] md:text-xs font-bold uppercase tracking-wider block">{o.label}</span>
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

      {step.type === "extras-toggle" && step.extras && (
        <div className="grid grid-cols-1 gap-2 md:gap-3">
          {step.extras.map((e) => {
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
    </div>
  );
};

const SelectCardButton = ({ option, active, onClick }: { option: SelectCardOption; active: boolean; onClick: () => void }) => (
  <button
    onClick={onClick}
    className={`flex items-center justify-between p-3 md:p-5 text-left transition-all duration-200 ${active ? "border-2 border-primary bg-primary/5 shadow-md" : "border border-outline-variant/30 hover:border-primary/50 hover:shadow-sm"}`}
  >
    <div className="min-w-0">
      <p className="font-headline font-bold text-sm md:text-base">{option.label}</p>
      {option.desc && <p className="text-[11px] md:text-xs text-secondary mt-0.5 md:mt-1">{option.desc}</p>}
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
