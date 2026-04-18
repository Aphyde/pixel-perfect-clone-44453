import { useState, useMemo, useEffect } from "react";
import Navbar from "@/components/Navbar";
import konfBg from "@/assets/konfigurator-bg.jpg";
import { Home, Fence, Sun, Moon, Check, Plus, Minus, ChevronDown, Lightbulb, Sparkles, ShieldCheck, Droplets } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { terraceModules, premiumColors } from "@/data/products";

interface Model {
  id: string;
  name: string;
  desc: string;
  basePrice: number;
  minW: number; maxW: number;
  minD: number; maxD: number;
  pfosten: string;
  roofs: { id: string; label: string; surcharge: number }[];
}

const models: Model[] = [
  {
    id: "pro-line",
    name: "PRO-LINE",
    desc: "Standard-Überdachung, Polycarbonat oder VSG-Glas",
    basePrice: 7900,
    minW: 3, maxW: 12, minD: 2, maxD: 5,
    pfosten: "14 × 14 cm",
    roofs: [
      { id: "polycarbonat", label: "Polycarbonat 16 mm", surcharge: 0 },
      { id: "vsg", label: "VSG 44.2 Sicherheitsglas", surcharge: 1800 },
    ],
  },
  {
    id: "luxaline-cube",
    name: "LUXALINE CUBE",
    desc: "Premium Glasdach, kubisch, LED serienmäßig",
    basePrice: 11900,
    minW: 3, maxW: 7, minD: 3, maxD: 4.5,
    pfosten: "15 × 15 cm",
    roofs: [
      { id: "vsg-clear", label: "VSG 44.2 klar", surcharge: 0 },
      { id: "vsg-tint", label: "VSG 44.2 getönt", surcharge: 600 },
    ],
  },
  {
    id: "lameldak-cabrio",
    name: "LAMELDAK CABRIO",
    desc: "Premium-Lamellendach, elektrisch (Somfy IO)",
    basePrice: 13900,
    minW: 3, maxW: 7, minD: 3, maxD: 4.5,
    pfosten: "15 × 15 cm",
    roofs: [
      { id: "alu-lamellen", label: "Aluminium-Lamellen, motorisch", surcharge: 0 },
    ],
  },
];

// 5 echte RAL-Farben aus dem Katalog
const colors = premiumColors.map((c) => ({
  name: c.ral,
  hex: c.hex,
  label: c.label,
}));

// Service-Extras
const serviceExtras = [
  { id: "led", label: "Dimmbare LED-Spots", desc: "Integriert in Sparren", price: 890, icon: <Lightbulb className="w-5 h-5" /> },
  { id: "rgb", label: "Ambiente RGB-Strips", desc: "Per App steuerbar", price: 650, icon: <Sparkles className="w-5 h-5" /> },
  { id: "wartung", label: "Wartungspaket (3 Jahre)", desc: "Jährlicher Check & Justierung", price: 499, icon: <ShieldCheck className="w-5 h-5" /> },
  { id: "nanoversiegelung", label: "Glas-Nanoversiegelung", desc: "Langlebige Imprägnierung", price: 349, icon: <Droplets className="w-5 h-5" /> },
];

// Terrassen-Module (kommen aus products.ts)
const moduleExtras = terraceModules.map((m) => ({
  id: `mod-${m.id}`,
  label: m.label,
  desc: m.shortDesc,
  price: m.price,
  icon: <Plus className="w-5 h-5" />,
}));

const allExtras = [...moduleExtras, ...serviceExtras];

/** Small inline preview shown between config steps on mobile */
const MobilePreview = ({
  viewMode, selectedExtras, selectedModel, width, depth, selectedColor, montage,
}: {
  viewMode: string; selectedExtras: Set<string>; selectedModel: number;
  width: number; depth: number; selectedColor: number; montage: number;
}) => (
  <div className="md:hidden relative h-48 overflow-hidden rounded-sm my-4">
    <img
      src={konfBg}
      className={`w-full h-full object-cover transition-all duration-500 ${viewMode === "nacht" ? "brightness-[0.3] saturate-50" : ""}`}
      alt="Vorschau"
      width={640}
      height={360}
    />
    <div className={`absolute inset-0 transition-all duration-500 ${viewMode === "nacht" ? "bg-blue-950/30" : "bg-foreground/5"}`} />
    {viewMode === "nacht" && selectedExtras.has("led") && (
      <div className="absolute inset-0 bg-gradient-to-b from-amber-400/5 via-transparent to-amber-400/10" />
    )}
    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-foreground/70 to-transparent p-3">
      <div className="flex items-center gap-2 flex-wrap">
        <span className="text-[10px] bg-primary/90 text-primary-foreground px-2 py-0.5 font-bold">{models[selectedModel].name}</span>
        <span className="text-[10px] bg-card/80 text-foreground px-2 py-0.5">{width.toFixed(1)}m × {depth.toFixed(1)}m</span>
        <span className="text-[10px] bg-card/80 text-foreground px-2 py-0.5">{colors[selectedColor].label}</span>
      </div>
    </div>
  </div>
);

const Konfigurator = () => {
  const navigate = useNavigate();
  const [selectedModel, setSelectedModel] = useState(0);
  const [montage, setMontage] = useState(0);
  const [selectedColor, setSelectedColor] = useState(0);
  const [width, setWidth] = useState(6.0);
  const [depth, setDepth] = useState(4.0);
  const [roofIdx, setRoofIdx] = useState(0);
  const [selectedExtras, setSelectedExtras] = useState<Set<string>>(new Set(["led"]));
  const [viewMode, setViewMode] = useState<"tag" | "nacht">("tag");
  const [showSummary, setShowSummary] = useState(false);

  const currentModel = models[selectedModel];

  // Maße & Dachdeckung beim Modellwechsel valide halten
  useEffect(() => {
    setWidth((w) => Math.min(currentModel.maxW, Math.max(currentModel.minW, w)));
    setDepth((d) => Math.min(currentModel.maxD, Math.max(currentModel.minD, d)));
    setRoofIdx(0);
  }, [selectedModel, currentModel.maxW, currentModel.minW, currentModel.maxD, currentModel.minD]);

  const toggleExtra = (id: string) => {
    setSelectedExtras((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const totalPrice = useMemo(() => {
    const base = currentModel.basePrice;
    const areaMult = (width * depth) / 24;
    const montageSurcharge = montage === 1 ? 1200 : 0;
    const roofSurcharge = currentModel.roofs[roofIdx]?.surcharge ?? 0;
    const extrasTotal = allExtras.filter((e) => selectedExtras.has(e.id)).reduce((s, e) => s + e.price, 0);
    return Math.round((base * areaMult + montageSurcharge + roofSurcharge + extrasTotal) * 100) / 100;
  }, [currentModel, width, depth, montage, roofIdx, selectedExtras]);

  const formatPrice = (p: number) =>
    new Intl.NumberFormat("de-DE", { style: "currency", currency: "EUR" }).format(p);

  const previewProps = { viewMode, selectedExtras, selectedModel, width, depth, selectedColor, montage };

  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="min-h-screen pt-24 flex flex-col md:flex-row md:h-screen md:overflow-hidden">
        {/* Left: Visualizer (hidden on mobile, shown on desktop) */}
        <section className="hidden md:block relative flex-1 bg-surface-container-low overflow-hidden">
          <img
            src={konfBg}
            className={`w-full h-full object-cover transition-all duration-700 ${viewMode === "nacht" ? "brightness-[0.3] saturate-50" : ""}`}
            alt="Terrassenüberdachung"
            width={1280}
            height={960}
          />
          <div className={`absolute inset-0 transition-all duration-700 ${viewMode === "nacht" ? "bg-blue-950/30" : "bg-foreground/5"}`} />

          {viewMode === "nacht" && selectedExtras.has("led") && (
            <div className="absolute inset-0 bg-gradient-to-b from-amber-400/5 via-transparent to-amber-400/10 transition-opacity duration-700" />
          )}

          {/* View toggle */}
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

          {/* Info overlay */}
          <div className="absolute top-12 left-12 max-w-sm p-8 bg-card/80 backdrop-blur-xl border-l-4 border-primary">
            <p className="text-[10px] uppercase tracking-[0.3em] text-primary font-bold mb-2">Aktuelle Ansicht</p>
            <h2 className="text-2xl font-headline font-bold leading-tight">{models[selectedModel].name}</h2>
            <div className="mt-4 flex gap-4 flex-wrap">
              <span className="text-xs text-secondary bg-surface-container px-2 py-1">{width.toFixed(1)}m x {depth.toFixed(1)}m</span>
              <span className="text-xs text-secondary bg-surface-container px-2 py-1">{colors[selectedColor].label}</span>
              <span className="text-xs text-secondary bg-surface-container px-2 py-1">{montage === 0 ? "Wandmontage" : "Freistehend"}</span>
            </div>
            <p className="text-xs text-secondary mt-3">Fläche: {(width * depth).toFixed(1)} m²</p>
          </div>

          {/* Live price badge */}
          <div className="absolute top-12 right-12 bg-primary text-primary-foreground p-6 text-center shadow-2xl z-10">
            <p className="text-[10px] uppercase tracking-widest opacity-80 mb-1">Ab</p>
            <p className="text-2xl font-headline font-bold">{formatPrice(totalPrice)}</p>
          </div>
        </section>

        {/* Right: Config Panel */}
        <aside className="w-full md:w-[450px] lg:w-[500px] md:h-full bg-surface md:border-l border-outline-variant/20 flex flex-col">
          {/* Mobile: Day/Night toggle at top */}
          <div className="md:hidden flex gap-2 px-4 pt-4">
            <button
              onClick={() => setViewMode("tag")}
              className={`flex-1 py-2 flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-wider transition-all ${viewMode === "tag" ? "bg-card border-b-2 border-primary" : "bg-surface-container-low text-secondary"}`}
            >
              <Sun className="w-3.5 h-3.5" /> Tag
            </button>
            <button
              onClick={() => setViewMode("nacht")}
              className={`flex-1 py-2 flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-wider transition-all ${viewMode === "nacht" ? "bg-card border-b-2 border-primary" : "bg-surface-container-low text-secondary"}`}
            >
              <Moon className="w-3.5 h-3.5" /> Nacht
            </button>
          </div>

          {/* Mobile: Initial preview */}
          <div className="md:hidden px-4">
            <MobilePreview {...previewProps} />
          </div>

          <div className="p-4 md:p-8 flex-1 md:overflow-y-auto space-y-6 md:space-y-10 pb-40">
            {/* Models */}
            <ConfigSection num="01" title="Modell Wählen">
              <div className="grid grid-cols-1 gap-2 md:gap-3">
                {models.map((m, i) => (
                  <button
                    key={m.name}
                    onClick={() => setSelectedModel(i)}
                    className={`flex items-center justify-between p-3 md:p-5 text-left transition-all duration-200 ${i === selectedModel ? "border-2 border-primary bg-primary/5 shadow-md" : "border border-outline-variant/30 hover:border-primary/50 hover:shadow-sm"}`}
                  >
                    <div>
                      <p className="font-headline font-bold text-sm md:text-base">{m.name}</p>
                      <p className="text-[11px] md:text-xs text-secondary mt-0.5 md:mt-1">{m.desc}</p>
                    </div>
                    <div className="flex items-center gap-2 md:gap-3 shrink-0 ml-2">
                      <span className="text-[11px] md:text-xs text-primary font-bold">ab {formatPrice(m.basePrice)}</span>
                      {i === selectedModel && <Check className="w-4 h-4 md:w-5 md:h-5 text-primary" />}
                    </div>
                  </button>
                ))}
              </div>
            </ConfigSection>

            {/* Mobile preview after step 1 */}
            <MobilePreview {...previewProps} />

            {/* Dimensions */}
            <ConfigSection num="02" title="Maße Konfigurieren">
              <div className="space-y-4 md:space-y-6">
                <DimensionSlider label="Breite" value={width} onChange={setWidth} min={3} max={10} unit="m" />
                <DimensionSlider label="Tiefe" value={depth} onChange={setDepth} min={2} max={6} unit="m" />
                <div className="bg-surface-container-low p-3 md:p-4 flex justify-between items-center">
                  <span className="text-xs md:text-sm text-secondary">Gesamtfläche</span>
                  <span className="font-headline font-bold text-primary text-sm md:text-base">{(width * depth).toFixed(1)} m²</span>
                </div>
              </div>
            </ConfigSection>

            {/* Mobile preview after step 2 */}
            <MobilePreview {...previewProps} />

            {/* Montage */}
            <ConfigSection num="03" title="Montageart">
              <div className="flex gap-2 md:gap-3">
                {[
                  { icon: <Home className="w-5 h-5 mx-auto mb-1 md:mb-2" />, label: "Wandmontage", extra: "" },
                  { icon: <Fence className="w-5 h-5 mx-auto mb-1 md:mb-2" />, label: "Freistehend", extra: "+ 1.200 €" },
                ].map((m, i) => (
                  <button
                    key={m.label}
                    onClick={() => setMontage(i)}
                    className={`flex-1 p-3 md:p-4 text-center transition-all duration-200 ${i === montage ? "border-2 border-primary bg-primary/5 shadow-md" : "border border-outline-variant/30 hover:border-primary/50"}`}
                  >
                    {m.icon}
                    <span className="text-[11px] md:text-xs font-bold uppercase tracking-wider block">{m.label}</span>
                    {m.extra && <span className="text-[10px] text-primary mt-1 block">{m.extra}</span>}
                  </button>
                ))}
              </div>
            </ConfigSection>

            {/* Roof covering */}
            <ConfigSection num="04" title="Dachdeckung">
              <div className="grid grid-cols-1 gap-2 md:gap-3">
                {currentModel.roofs.map((r, i) => (
                  <button
                    key={r.id}
                    onClick={() => setRoofIdx(i)}
                    className={`flex items-center justify-between p-3 md:p-4 text-left transition-all duration-200 ${i === roofIdx ? "border-2 border-primary bg-primary/5 shadow-md" : "border border-outline-variant/30 hover:border-primary/50"}`}
                  >
                    <span className="text-xs md:text-sm font-bold">{r.label}</span>
                    <div className="flex items-center gap-2 shrink-0 ml-2">
                      {r.surcharge > 0 && (
                        <span className="text-[11px] md:text-xs text-primary font-bold">+ {formatPrice(r.surcharge)}</span>
                      )}
                      {i === roofIdx && <Check className="w-4 h-4 md:w-5 md:h-5 text-primary" />}
                    </div>
                  </button>
                ))}
              </div>
            </ConfigSection>

            {/* Colors */}
            <ConfigSection num="05" title="Farbauswahl (RAL)">
              <div className="flex gap-2 md:gap-3 flex-wrap">
                {colors.map((c, i) => {
                  // helle Farben → dunkles Häkchen
                  const isDark = ["RAL 7016", "RAL 9005"].includes(c.name);
                  return (
                    <div key={c.name} className="cursor-pointer group" onClick={() => setSelectedColor(i)}>
                      <div className={`w-11 h-11 md:w-14 md:h-14 p-0.5 transition-all duration-200 ${i === selectedColor ? "border-2 border-primary scale-110 shadow-lg" : "border border-transparent hover:border-primary/50"}`}>
                        <div className="w-full h-full relative" style={{ backgroundColor: c.hex }}>
                          {i === selectedColor && (
                            <div className="absolute inset-0 flex items-center justify-center">
                              <Check className={`w-3 h-3 md:w-4 md:h-4 ${isDark ? "text-primary-foreground" : "text-foreground"}`} />
                            </div>
                          )}
                        </div>
                      </div>
                      <p className="text-[9px] md:text-[10px] mt-1 md:mt-2 text-center text-secondary uppercase tracking-tighter">{c.name}</p>
                    </div>
                  );
                })}
              </div>
            </ConfigSection>

            {/* Mobile preview */}
            <MobilePreview {...previewProps} />

            {/* Extras + Module */}
            <ConfigSection num="06" title="Erweiterungen & Services">
              <div className="grid grid-cols-1 gap-2 md:gap-3">
                {allExtras.map((e) => {
                  const active = selectedExtras.has(e.id);
                  return (
                    <button
                      key={e.id}
                      onClick={() => toggleExtra(e.id)}
                      className={`p-3 md:p-4 flex justify-between items-center text-left transition-all duration-200 ${active ? "bg-primary/5 border-l-4 border-primary shadow-sm" : "bg-surface-container-low hover:bg-surface-container border-l-4 border-transparent"}`}
                    >
                      <div className="flex items-center gap-3 md:gap-4 min-w-0">
                        <span className={`${active ? "text-primary" : "text-secondary"} shrink-0`}>{e.icon}</span>
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
            </ConfigSection>
          </div>

          {/* Compact price footer */}
          <div className="fixed bottom-0 left-0 right-0 md:relative md:bottom-auto bg-surface-container-highest border-t border-outline-variant/20 z-20 shadow-[0_-4px_20px_rgba(0,0,0,0.1)]">
            {/* Collapsible breakdown */}
            {showSummary && (
              <div className="px-4 md:px-8 pt-3 pb-2 space-y-1.5 border-b border-outline-variant/20 animate-in slide-in-from-bottom-2 max-h-48 overflow-y-auto">
                <div className="flex justify-between text-xs md:text-sm">
                  <span className="text-secondary">{models[selectedModel].name} ({(width * depth).toFixed(1)} m²)</span>
                  <span>{formatPrice(models[selectedModel].basePrice * (width * depth) / 24)}</span>
                </div>
                {montage === 1 && (
                  <div className="flex justify-between text-xs md:text-sm">
                    <span className="text-secondary">Freistehend-Zuschlag</span>
                    <span>{formatPrice(1200)}</span>
                  </div>
                )}
                {extras.filter((e) => selectedExtras.has(e.id)).map((e) => (
                  <div key={e.id} className="flex justify-between text-xs md:text-sm">
                    <span className="text-secondary">{e.label}</span>
                    <span>{formatPrice(e.price)}</span>
                  </div>
                ))}
              </div>
            )}

            <div className="px-4 md:px-8 py-3 md:py-4 flex items-center gap-3">
              {/* Price + toggle */}
              <button
                onClick={() => setShowSummary(!showSummary)}
                className="flex items-center gap-2 shrink-0"
              >
                <ChevronDown className={`w-4 h-4 text-primary transition-transform ${showSummary ? "rotate-180" : ""}`} />
                <div className="text-left">
                  <p className="text-[9px] md:text-[10px] uppercase tracking-widest text-secondary font-bold leading-none">Gesamt</p>
                  <p className="text-xl md:text-2xl font-headline font-bold text-primary leading-tight">{formatPrice(totalPrice)}</p>
                </div>
              </button>

              {/* CTA button */}
              <button
                onClick={() => navigate("/anfrage", {
                  state: {
                    model: models[selectedModel].name,
                    width,
                    depth,
                    color: colors[selectedColor].label,
                    montage: montage === 0 ? "Wandmontage" : "Freistehend",
                    extras: extras.filter((e) => selectedExtras.has(e.id)).map((e) => e.label),
                    totalPrice,
                  }
                })}
                className="flex-1 block text-center bg-foreground text-primary-foreground py-3 md:py-4 font-headline uppercase tracking-[0.15em] text-xs md:text-sm font-bold hover:bg-primary transition-all active:scale-[0.98] ml-auto"
              >
                Abschließen
              </button>
            </div>
          </div>
        </aside>
      </main>
    </div>
  );
};

const ConfigSection = ({ num, title, children }: { num: string; title: string; children: React.ReactNode }) => (
  <div className="space-y-4 md:space-y-6">
    <div className="flex items-center gap-3 md:gap-4">
      <div className="w-0.5 h-5 md:h-6 bg-primary" />
      <h3 className="text-xs md:text-sm font-headline uppercase tracking-widest font-bold">{num}. {title}</h3>
    </div>
    {children}
  </div>
);

const DimensionSlider = ({
  label, value, onChange, min, max, unit
}: { label: string; value: number; onChange: (v: number) => void; min: number; max: number; unit: string }) => {
  const step = 0.5;
  const pct = ((value - min) / (max - min)) * 100;

  return (
    <div>
      <div className="flex justify-between items-center mb-2 md:mb-3">
        <span className="text-xs md:text-sm font-bold">{label}</span>
        <div className="flex items-center gap-1.5 md:gap-2">
          <button
            onClick={() => onChange(Math.max(min, value - step))}
            className="w-6 h-6 md:w-7 md:h-7 border border-outline-variant/30 flex items-center justify-center hover:border-primary transition-colors"
          >
            <Minus className="w-3 h-3" />
          </button>
          <span className="font-headline font-bold text-primary w-14 md:w-16 text-center text-sm md:text-base">{value.toFixed(1)} {unit}</span>
          <button
            onClick={() => onChange(Math.min(max, value + step))}
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
          value={value}
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

export default Konfigurator;
