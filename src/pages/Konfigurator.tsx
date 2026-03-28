import { useState, useMemo } from "react";
import Navbar from "@/components/Navbar";
import konfBg from "@/assets/konfigurator-bg.jpg";
import { Home, Fence, Sun, Moon, Check, Plus, Minus, ChevronRight, Lightbulb, Sparkles, ShieldCheck, Droplets } from "lucide-react";
import { Link } from "react-router-dom";

const models = [
  { name: "Lamellendach", desc: "Bio-Klimatisch & Regensicher", basePrice: 12500 },
  { name: "Klassisches Glasdach", desc: "VSG-Sicherheitsglas 10mm", basePrice: 9800 },
  { name: "Kubische Flat-Dach", desc: "Puristisches Design ohne Gefälleoptik", basePrice: 11200 },
];

const colors = [
  { name: "RAL 7032", hex: "#D1D1D1", label: "Kieselgrau" },
  { name: "RAL 1019", hex: "#B8A796", label: "Graubeige" },
  { name: "Anthrazit", hex: "#2E2E2E", label: "Anthrazit" },
  { name: "RAL 9016", hex: "#F1F0EA", label: "Verkehrsweiß" },
  { name: "DB 703", hex: "#6B6B6B", label: "Eisenglimmer" },
];

const extras = [
  { id: "led", label: "Dimmbare LED-Spots", desc: "Integriert in Sparren", price: 890, icon: <Lightbulb className="w-5 h-5" /> },
  { id: "rgb", label: "Ambiente RGB-Strips", desc: "Per App steuerbar", price: 650, icon: <Sparkles className="w-5 h-5" /> },
  { id: "wartung", label: "Wartungspaket (3 Jahre)", desc: "Jährlicher Check & Justierung", price: 499, icon: <ShieldCheck className="w-5 h-5" /> },
  { id: "reinigung", label: "Professionelle Reinigung", desc: "Halbjährlich glänzende Optik", price: 349, icon: <Droplets className="w-5 h-5" /> },
];

const Konfigurator = () => {
  const [selectedModel, setSelectedModel] = useState(0);
  const [montage, setMontage] = useState(0);
  const [selectedColor, setSelectedColor] = useState(2);
  const [width, setWidth] = useState(6.0);
  const [depth, setDepth] = useState(4.0);
  const [selectedExtras, setSelectedExtras] = useState<Set<string>>(new Set(["led"]));
  const [viewMode, setViewMode] = useState<"tag" | "nacht">("tag");
  const [showSummary, setShowSummary] = useState(false);

  const toggleExtra = (id: string) => {
    setSelectedExtras((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const totalPrice = useMemo(() => {
    const base = models[selectedModel].basePrice;
    const areaMult = (width * depth) / 24; // base is 6x4=24
    const montageSurcharge = montage === 1 ? 1200 : 0;
    const extrasTotal = extras.filter((e) => selectedExtras.has(e.id)).reduce((s, e) => s + e.price, 0);
    return Math.round((base * areaMult + montageSurcharge + extrasTotal) * 100) / 100;
  }, [selectedModel, width, depth, montage, selectedExtras]);

  const formatPrice = (p: number) =>
    new Intl.NumberFormat("de-DE", { style: "currency", currency: "EUR" }).format(p);

  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="h-screen pt-24 flex flex-col md:flex-row overflow-hidden">
        {/* Left: Visualizer */}
        <section className="relative flex-1 bg-surface-container-low overflow-hidden">
          <img
            src={konfBg}
            className={`w-full h-full object-cover transition-all duration-700 ${viewMode === "nacht" ? "brightness-[0.3] saturate-50" : ""}`}
            alt="Terrassenüberdachung"
            width={1280}
            height={960}
          />
          <div className={`absolute inset-0 transition-all duration-700 ${viewMode === "nacht" ? "bg-blue-950/30" : "bg-foreground/5"}`} />

          {/* Night overlay glow */}
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
          <div className="absolute top-12 left-12 max-w-sm p-8 bg-card/80 backdrop-blur-xl border-l-4 border-primary transition-all duration-300">
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
        <aside className="w-full md:w-[450px] lg:w-[500px] h-full bg-surface border-l border-outline-variant/20 flex flex-col">
          <div className="p-8 flex-1 overflow-y-auto space-y-10 pb-32">
            {/* Models */}
            <ConfigSection num="01" title="Modell Wählen">
              <div className="grid grid-cols-1 gap-3">
                {models.map((m, i) => (
                  <button
                    key={m.name}
                    onClick={() => setSelectedModel(i)}
                    className={`flex items-center justify-between p-5 text-left transition-all duration-200 ${i === selectedModel ? "border-2 border-primary bg-primary/5 shadow-md" : "border border-outline-variant/30 hover:border-primary/50 hover:shadow-sm"}`}
                  >
                    <div>
                      <p className="font-headline font-bold">{m.name}</p>
                      <p className="text-xs text-secondary mt-1">{m.desc}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-xs text-primary font-bold">ab {formatPrice(m.basePrice)}</span>
                      {i === selectedModel && <Check className="w-5 h-5 text-primary" />}
                    </div>
                  </button>
                ))}
              </div>
            </ConfigSection>

            {/* Dimensions */}
            <ConfigSection num="02" title="Maße Konfigurieren">
              <div className="space-y-6">
                <DimensionSlider label="Breite" value={width} onChange={setWidth} min={3} max={10} unit="m" />
                <DimensionSlider label="Tiefe" value={depth} onChange={setDepth} min={2} max={6} unit="m" />
                <div className="bg-surface-container-low p-4 flex justify-between items-center">
                  <span className="text-sm text-secondary">Gesamtfläche</span>
                  <span className="font-headline font-bold text-primary">{(width * depth).toFixed(1)} m²</span>
                </div>
              </div>
            </ConfigSection>

            {/* Montage */}
            <ConfigSection num="03" title="Montageart">
              <div className="flex gap-3">
                {[
                  { icon: <Home className="w-5 h-5 mx-auto mb-2" />, label: "Wandmontage", extra: "" },
                  { icon: <Fence className="w-5 h-5 mx-auto mb-2" />, label: "Freistehend", extra: "+ 1.200 €" },
                ].map((m, i) => (
                  <button
                    key={m.label}
                    onClick={() => setMontage(i)}
                    className={`flex-1 p-4 text-center transition-all duration-200 ${i === montage ? "border-2 border-primary bg-primary/5 shadow-md" : "border border-outline-variant/30 hover:border-primary/50"}`}
                  >
                    {m.icon}
                    <span className="text-xs font-bold uppercase tracking-wider block">{m.label}</span>
                    {m.extra && <span className="text-[10px] text-primary mt-1 block">{m.extra}</span>}
                  </button>
                ))}
              </div>
            </ConfigSection>

            {/* Colors */}
            <ConfigSection num="04" title="Farbauswahl">
              <div className="flex gap-3 flex-wrap">
                {colors.map((c, i) => (
                  <div key={c.name} className="cursor-pointer group" onClick={() => setSelectedColor(i)}>
                    <div className={`w-14 h-14 p-0.5 transition-all duration-200 ${i === selectedColor ? "border-2 border-primary scale-110 shadow-lg" : "border border-transparent hover:border-primary/50"}`}>
                      <div className="w-full h-full relative" style={{ backgroundColor: c.hex }}>
                        {i === selectedColor && (
                          <div className="absolute inset-0 flex items-center justify-center">
                            <Check className={`w-4 h-4 ${c.hex === "#2E2E2E" || c.hex === "#6B6B6B" ? "text-primary-foreground" : "text-foreground"}`} />
                          </div>
                        )}
                      </div>
                    </div>
                    <p className="text-[10px] mt-2 text-center text-secondary uppercase tracking-tighter">{c.name}</p>
                  </div>
                ))}
              </div>
            </ConfigSection>

            {/* Extras */}
            <ConfigSection num="05" title="Extras & Services">
              <div className="grid grid-cols-1 gap-3">
                {extras.map((e) => {
                  const active = selectedExtras.has(e.id);
                  return (
                    <button
                      key={e.id}
                      onClick={() => toggleExtra(e.id)}
                      className={`p-4 flex justify-between items-center text-left transition-all duration-200 ${active ? "bg-primary/5 border-l-4 border-primary shadow-sm" : "bg-surface-container-low hover:bg-surface-container border-l-4 border-transparent"}`}
                    >
                      <div className="flex items-center gap-4">
                        <span className={active ? "text-primary" : "text-secondary"}>{e.icon}</span>
                        <div>
                          <p className="text-sm font-bold">{e.label}</p>
                          <p className="text-xs text-secondary">{e.desc}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-sm font-headline font-bold">{formatPrice(e.price)}</span>
                        <div className={`w-6 h-6 flex items-center justify-center transition-all ${active ? "bg-primary text-primary-foreground" : "border border-outline-variant/50"}`}>
                          {active ? <Check className="w-3 h-3" /> : <Plus className="w-3 h-3 text-secondary" />}
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </ConfigSection>
          </div>

          {/* Price footer */}
          <div className="p-8 bg-surface-container-highest border-t border-outline-variant/20">
            {/* Price breakdown toggle */}
            <button
              onClick={() => setShowSummary(!showSummary)}
              className="w-full flex justify-between items-center mb-4 text-xs uppercase tracking-widest text-primary font-bold hover:opacity-80 transition-opacity"
            >
              <span>Preisübersicht {showSummary ? "ausblenden" : "anzeigen"}</span>
              <ChevronRight className={`w-4 h-4 transition-transform ${showSummary ? "rotate-90" : ""}`} />
            </button>

            {showSummary && (
              <div className="mb-6 space-y-2 pb-4 border-b border-outline-variant/20 animate-in slide-in-from-top-2">
                <div className="flex justify-between text-sm">
                  <span className="text-secondary">{models[selectedModel].name} ({(width * depth).toFixed(1)} m²)</span>
                  <span>{formatPrice(models[selectedModel].basePrice * (width * depth) / 24)}</span>
                </div>
                {montage === 1 && (
                  <div className="flex justify-between text-sm">
                    <span className="text-secondary">Freistehend-Zuschlag</span>
                    <span>{formatPrice(1200)}</span>
                  </div>
                )}
                {extras.filter((e) => selectedExtras.has(e.id)).map((e) => (
                  <div key={e.id} className="flex justify-between text-sm">
                    <span className="text-secondary">{e.label}</span>
                    <span>{formatPrice(e.price)}</span>
                  </div>
                ))}
              </div>
            )}

            <div className="flex justify-between items-end mb-6">
              <div>
                <p className="text-[10px] uppercase tracking-widest text-secondary font-bold mb-1">Geschätzter Gesamtpreis</p>
                <h4 className="text-4xl font-headline font-bold text-primary transition-all">{formatPrice(totalPrice)}</h4>
              </div>
              <div className="text-right">
                <p className="text-xs text-secondary">Inkl. Montage (Ulm + 100km)</p>
                <p className="text-xs text-secondary">Lieferzeit: ca. 8-10 Wochen</p>
              </div>
            </div>
            <Link
              to="/kontakt"
              className="w-full block text-center bg-foreground text-primary-foreground py-5 font-headline uppercase tracking-[0.2em] text-sm font-bold hover:bg-primary transition-all active:scale-[0.98]"
            >
              Konfiguration Abschließen
            </Link>
          </div>
        </aside>
      </main>
    </div>
  );
};

const ConfigSection = ({ num, title, children }: { num: string; title: string; children: React.ReactNode }) => (
  <div className="space-y-6">
    <div className="flex items-center gap-4">
      <div className="w-0.5 h-6 bg-primary" />
      <h3 className="text-sm font-headline uppercase tracking-widest font-bold">{num}. {title}</h3>
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
      <div className="flex justify-between items-center mb-3">
        <span className="text-sm font-bold">{label}</span>
        <div className="flex items-center gap-2">
          <button
            onClick={() => onChange(Math.max(min, value - step))}
            className="w-7 h-7 border border-outline-variant/30 flex items-center justify-center hover:border-primary transition-colors"
          >
            <Minus className="w-3 h-3" />
          </button>
          <span className="font-headline font-bold text-primary w-16 text-center">{value.toFixed(1)} {unit}</span>
          <button
            onClick={() => onChange(Math.min(max, value + step))}
            className="w-7 h-7 border border-outline-variant/30 flex items-center justify-center hover:border-primary transition-colors"
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
