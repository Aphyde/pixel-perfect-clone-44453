import { useState } from "react";
import Navbar from "@/components/Navbar";
import konfBg from "@/assets/konfigurator-bg.jpg";
import { Home, Fence, Sun, Moon, Check, Plus } from "lucide-react";

const models = [
  { name: "Lamellendach", desc: "Bio-Klimatisch & Regensicher" },
  { name: "Klassisches Glasdach", desc: "VSG-Sicherheitsglas 10mm" },
  { name: "Kubische Flat-Dach", desc: "Puristisches Design ohne Gefälleoptik" },
];

const colors = [
  { name: "RAL 7032", hex: "#D1D1D1" },
  { name: "RAL 1019", hex: "#B8A796" },
  { name: "Anthrazit", hex: "#2E2E2E" },
];

const Konfigurator = () => {
  const [selectedModel, setSelectedModel] = useState(0);
  const [montage, setMontage] = useState(0);
  const [selectedColor, setSelectedColor] = useState(2);

  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="h-screen pt-24 flex flex-col md:flex-row overflow-hidden">
        {/* Left: Visualizer */}
        <section className="relative flex-1 bg-surface-container-low overflow-hidden">
          <img src={konfBg} className="w-full h-full object-cover" alt="Terrassenüberdachung" width={1280} height={960} />
          <div className="absolute inset-0 bg-foreground/5" />
          <div className="absolute bottom-12 left-12 flex gap-4 z-10">
            <button className="bg-card/90 px-6 py-3 flex items-center gap-3 border-b-2 border-primary hover:bg-card transition-all shadow-xl">
              <Sun className="w-4 h-4 text-primary" />
              <span className="font-headline text-xs uppercase tracking-widest font-bold">Tag</span>
            </button>
            <button className="bg-foreground/40 backdrop-blur-md text-primary-foreground px-6 py-3 flex items-center gap-3 hover:bg-foreground/60 transition-all">
              <Moon className="w-4 h-4" />
              <span className="font-headline text-xs uppercase tracking-widest font-bold">Nacht</span>
            </button>
          </div>
          <div className="absolute top-12 left-12 max-w-sm p-8 bg-card/80 backdrop-blur-xl border-l-4 border-primary">
            <p className="text-[10px] uppercase tracking-[0.3em] text-primary font-bold mb-2">Aktuelle Ansicht</p>
            <h2 className="text-2xl font-headline font-bold leading-tight">{models[selectedModel].name}</h2>
            <div className="mt-4 flex gap-4">
              <span className="text-xs text-secondary">6.0m x 4.0m</span>
              <span className="text-xs text-secondary">{colors[selectedColor].name}</span>
            </div>
          </div>
        </section>

        {/* Right: Config Panel */}
        <aside className="w-full md:w-[450px] lg:w-[500px] h-full bg-surface border-l border-outline-variant/20 flex flex-col">
          <div className="p-8 flex-1 overflow-y-auto space-y-12 pb-32">
            {/* Models */}
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-0.5 h-6 bg-primary" />
                <h3 className="text-sm font-headline uppercase tracking-widest font-bold">01. Modell Wählen</h3>
              </div>
              <div className="grid grid-cols-1 gap-3">
                {models.map((m, i) => (
                  <button key={m.name} onClick={() => setSelectedModel(i)} className={`flex items-center justify-between p-5 text-left transition-all ${i === selectedModel ? "border-2 border-primary bg-primary/5" : "border border-outline-variant/30 hover:border-primary/50"}`}>
                    <div>
                      <p className="font-headline font-bold">{m.name}</p>
                      <p className="text-xs text-secondary mt-1">{m.desc}</p>
                    </div>
                    {i === selectedModel && <Check className="w-5 h-5 text-primary" />}
                  </button>
                ))}
              </div>
            </div>

            {/* Montage */}
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-0.5 h-6 bg-primary" />
                <h3 className="text-sm font-headline uppercase tracking-widest font-bold">02. Montageart</h3>
              </div>
              <div className="flex gap-3">
                {[{ icon: <Home className="w-5 h-5 mx-auto mb-2" />, label: "Wandmontage" }, { icon: <Fence className="w-5 h-5 mx-auto mb-2" />, label: "Freistehend" }].map((m, i) => (
                  <button key={m.label} onClick={() => setMontage(i)} className={`flex-1 p-4 text-center transition-all ${i === montage ? "border-2 border-primary bg-primary/5" : "border border-outline-variant/30 hover:border-primary/50"}`}>
                    {m.icon}
                    <span className="text-xs font-bold uppercase tracking-wider">{m.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Colors */}
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-0.5 h-6 bg-primary" />
                <h3 className="text-sm font-headline uppercase tracking-widest font-bold">03. Neo-Neutral Palette</h3>
              </div>
              <div className="flex gap-4">
                {colors.map((c, i) => (
                  <div key={c.name} className="cursor-pointer" onClick={() => setSelectedColor(i)}>
                    <div className={`w-12 h-12 p-0.5 transition-all ${i === selectedColor ? "border-2 border-primary" : "border border-transparent hover:border-primary/50"}`}>
                      <div className="w-full h-full" style={{ backgroundColor: c.hex }} />
                    </div>
                    <p className="text-[10px] mt-2 text-center text-secondary uppercase tracking-tighter">{c.name}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Premium */}
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-0.5 h-6 bg-primary" />
                <h3 className="text-sm font-headline uppercase tracking-widest font-bold">04. Premium Services</h3>
              </div>
              <div className="grid grid-cols-1 gap-3">
                <div className="p-4 bg-primary/5 border-l-4 border-primary flex justify-between items-center">
                  <div>
                    <p className="text-sm font-bold">Wartungspaket (3 Jahre)</p>
                    <p className="text-xs text-secondary">Inkl. jährlichem Check &amp; Justierung</p>
                  </div>
                  <p className="text-sm font-headline font-bold">+ 499€</p>
                </div>
                <div className="p-4 bg-surface-container-low flex justify-between items-center hover:bg-surface-container transition-colors cursor-pointer">
                  <div>
                    <p className="text-sm font-bold">Professionelle Reinigung</p>
                    <p className="text-xs text-secondary">Halbjährlich glänzende Optik</p>
                  </div>
                  <Plus className="w-4 h-4 text-secondary" />
                </div>
              </div>
            </div>
          </div>

          {/* Price footer */}
          <div className="p-8 bg-surface-container-highest border-t border-outline-variant/20">
            <div className="flex justify-between items-end mb-6">
              <div>
                <p className="text-[10px] uppercase tracking-widest text-secondary font-bold mb-1">Geschätzter Gesamtpreis</p>
                <h4 className="text-4xl font-headline font-bold text-primary">14.850,00 €</h4>
              </div>
              <div className="text-right">
                <p className="text-xs text-secondary">Inkl. Montage (Ulm + 100km)</p>
                <p className="text-xs text-secondary">Lieferzeit: ca. 8-10 Wochen</p>
              </div>
            </div>
            <button className="w-full bg-foreground text-primary-foreground py-5 font-headline uppercase tracking-[0.2em] text-sm font-bold hover:bg-primary transition-all active:scale-[0.98]">
              Konfiguration Abschließen
            </button>
          </div>
        </aside>
      </main>
    </div>
  );
};

export default Konfigurator;
