import Layout from "@/components/Layout";
import heroHome from "@/assets/hero-home.jpg";
import architectureDetail from "@/assets/architecture-detail.jpg";
import ref1 from "@/assets/ref-1.jpg";
import ref2 from "@/assets/ref-2.jpg";
import ref3 from "@/assets/ref-3.jpg";
import mapUlm from "@/assets/map-ulm.jpg";
import { Award, Wrench, ShieldCheck, MapPin, Clock, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const Index = () => (
  <Layout>
    {/* Hero */}
    <section className="relative h-[972px] flex items-center pt-20 overflow-hidden bg-foreground">
      <div className="absolute inset-0 opacity-60">
        <img src={heroHome} alt="Luxury terrace roofing" className="w-full h-full object-cover" width={1920} height={1080} />
      </div>
      <div className="absolute inset-0 bg-gradient-to-r from-foreground/80 via-foreground/40 to-transparent" />
      <div className="container mx-auto px-8 relative z-10">
        <div className="max-w-4xl">
          <span className="inline-block bg-primary text-primary-foreground px-4 py-1 text-xs font-bold tracking-[0.3em] uppercase mb-6">Ulm &amp; Umgebung</span>
          <h1 className="text-6xl md:text-8xl font-bold text-primary-foreground leading-[0.9] tracking-tighter mb-8">
            Exklusive <br />
            <span className="text-primary-fixed-dim">Terrassensysteme</span> <br />
            aus Ulm.
          </h1>
          <p className="text-lg md:text-xl text-primary-foreground/70 max-w-xl mb-12 font-light leading-relaxed">
            Wir vereinen architektonische Präzision mit höchster Materialqualität für Ihren persönlichen Rückzugsort im Freien. Made in Ulm, gebaut für die Ewigkeit.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link to="/konfigurator" className="bg-primary text-primary-foreground px-10 py-5 font-bold uppercase tracking-widest hover:bg-primary-container transition-all">Konfigurieren</Link>
            <button className="border border-primary-foreground/20 text-primary-foreground backdrop-blur-sm px-10 py-5 font-bold uppercase tracking-widest hover:bg-primary-foreground hover:text-foreground transition-all">Modelle Entdecken</button>
          </div>
        </div>
      </div>
      <div className="absolute bottom-0 right-12 w-0.5 h-48 bg-primary" />
    </section>

    {/* Why Us */}
    <section className="py-32 bg-surface">
      <div className="container mx-auto px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-end mb-24">
          <div className="md:col-span-7">
            <label className="text-primary text-xs font-bold tracking-[0.4em] uppercase mb-4 block">Qualität &amp; Handwerk</label>
            <h2 className="text-4xl md:text-6xl font-bold tracking-tighter">Warum Breitüberdachungen?</h2>
          </div>
          <div className="md:col-span-5 border-l-2 border-primary pl-8 pb-2">
            <p className="text-secondary font-body leading-relaxed">Seit über einem Jahrzehnt stehen wir für strukturelle Integrität und ästhetische Brillanz im Terrassenbau. Jedes Projekt ist ein Unikat.</p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-1">
          {[
            { icon: <Award className="w-10 h-10 text-primary mb-8" />, title: "Höchste Qualität", desc: "Zertifizierte Aluminium-Profile und Sicherheitsglas für maximale Langlebigkeit unter allen Witterungsbedingungen." },
            { icon: <Wrench className="w-10 h-10 text-primary mb-8" />, title: "Montage-Service", desc: "Eigene Festangestellte Montageteams garantieren saubere, präzise und termingerechte Ausführung in Ihrem Zuhause." },
            { icon: <ShieldCheck className="w-10 h-10 text-primary mb-8" />, title: "Langlebigkeit", desc: "Wartungsarme Konstruktionen mit bis zu 10 Jahren Garantie auf die Statik und Oberflächenveredelung." },
          ].map((item) => (
            <div key={item.title} className="bg-surface-container-low p-12 hover:bg-surface-container-high transition-colors">
              {item.icon}
              <h3 className="text-2xl font-bold mb-4">{item.title}</h3>
              <p className="text-secondary leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* Local Partner */}
    <section className="relative bg-surface-container-low overflow-hidden">
      <div className="container mx-auto px-0 md:px-8 py-32">
        <div className="flex flex-col md:flex-row gap-0">
          <div className="w-full md:w-1/2 bg-foreground aspect-square md:aspect-auto">
            <img src={architectureDetail} alt="Architectural detailing" className="w-full h-full object-cover grayscale opacity-80" loading="lazy" width={1024} height={1024} />
          </div>
          <div className="w-full md:w-1/2 bg-card p-12 md:p-24 flex flex-col justify-center">
            <label className="text-primary text-xs font-bold tracking-[0.4em] uppercase mb-4 block">Lokale Präsenz</label>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tighter mb-8">Ihr Partner in Ulm und der Region.</h2>
            <p className="text-lg text-secondary mb-12 leading-relaxed">
              Wir sind tief in Ulm verwurzelt. Unser Service-Radius von <strong>100km</strong> umfasst die gesamte Region von Augsburg über Memmingen bis an den Rand von Stuttgart. Kurze Wege bedeuten für Sie: schnellere Beratung, effiziente Montage und ein Ansprechpartner direkt vor Ort.
            </p>
            <div className="grid grid-cols-2 gap-8 mb-12">
              <div>
                <span className="text-3xl font-bold text-primary block mb-1">100km</span>
                <span className="text-xs uppercase tracking-widest text-secondary">Einsatzradius</span>
              </div>
              <div>
                <span className="text-3xl font-bold text-primary block mb-1">24h</span>
                <span className="text-xs uppercase tracking-widest text-secondary">Reaktionszeit</span>
              </div>
            </div>
            <button className="self-start border-b-2 border-primary text-primary font-bold uppercase tracking-widest pb-1 hover:opacity-70 transition-all">Region Prüfen</button>
          </div>
        </div>
      </div>
    </section>

    {/* Gallery */}
    <section className="py-32 bg-surface">
      <div className="container mx-auto px-8">
        <div className="flex justify-between items-end mb-16">
          <div>
            <label className="text-primary text-xs font-bold tracking-[0.4em] uppercase mb-4 block">Inspiration</label>
            <h2 className="text-4xl md:text-6xl font-bold tracking-tighter">Referenzprojekte</h2>
          </div>
          <button className="hidden md:flex items-center gap-2 font-bold uppercase tracking-widest text-sm text-primary">
            Alle Projekte <ArrowRight className="w-4 h-4" />
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:h-[800px]">
          <div className="md:col-span-8 md:row-span-2 relative group overflow-hidden">
            <img src={ref1} alt="Residenz am Blauufer" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" loading="lazy" width={1280} height={960} />
            <div className="absolute inset-0 bg-foreground/20 group-hover:bg-transparent transition-all duration-300" />
            <div className="absolute bottom-8 left-8 text-primary-foreground p-6 backdrop-blur-md bg-foreground/40 border-l-4 border-primary">
              <span className="text-xs uppercase tracking-widest opacity-80">Ulm-Söflingen</span>
              <h4 className="text-xl font-bold">Residenz am Blauufer</h4>
            </div>
          </div>
          <div className="md:col-span-4 relative group overflow-hidden">
            <img src={ref2} alt="Gartenfokus Neu-Ulm" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" loading="lazy" width={800} height={600} />
            <div className="absolute bottom-8 left-8 text-primary-foreground">
              <h4 className="text-lg font-bold">Gartenfokus Neu-Ulm</h4>
            </div>
          </div>
          <div className="md:col-span-4 relative group overflow-hidden">
            <img src={ref3} alt="Penthouse Blaustein" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" loading="lazy" width={800} height={600} />
            <div className="absolute bottom-8 left-8 text-primary-foreground">
              <h4 className="text-lg font-bold">Penthouse Blaustein</h4>
            </div>
          </div>
        </div>
      </div>
    </section>

    {/* CTA */}
    <section className="relative py-32 bg-foreground overflow-hidden">
      <div className="absolute inset-0 opacity-30">
        <img src={architectureDetail} alt="Configure now" className="w-full h-full object-cover" loading="lazy" width={1024} height={1024} />
      </div>
      <div className="container mx-auto px-8 relative z-10 text-center">
        <h2 className="text-5xl md:text-7xl font-bold text-primary-foreground tracking-tighter mb-8">Bereit für Ihren Traumplatz?</h2>
        <p className="text-xl text-primary-foreground/60 max-w-2xl mx-auto mb-12">Nutzen Sie unseren Online-Konfigurator für eine unverbindliche erste Preisschätzung in unter 3 Minuten.</p>
        <Link to="/konfigurator" className="inline-block bg-primary text-primary-foreground px-16 py-6 text-lg font-bold uppercase tracking-[0.2em] hover:bg-primary-container transition-all">Konfigurator Starten</Link>
      </div>
    </section>

    {/* Map/Showroom */}
    <section className="py-20 bg-surface-container">
      <div className="container mx-auto px-8">
        <div className="flex flex-col md:flex-row items-center gap-12">
          <div className="w-full md:w-1/3">
            <h3 className="text-3xl font-bold mb-6">Besuchen Sie unseren Showroom</h3>
            <p className="text-secondary mb-8 leading-relaxed">Erleben Sie unsere Systeme live. Wir zeigen Ihnen verschiedene Materialien, Beschattungsoptionen und technische Raffinessen.</p>
            <div className="space-y-4">
              <div className="flex gap-4 items-start">
                <MapPin className="w-5 h-5 text-primary mt-1" />
                <div>
                  <p className="font-bold">Hauptstraße 42</p>
                  <p className="text-secondary">89073 Ulm</p>
                </div>
              </div>
              <div className="flex gap-4 items-start">
                <Clock className="w-5 h-5 text-primary mt-1" />
                <div>
                  <p className="font-bold">Öffnungszeiten</p>
                  <p className="text-secondary">Mo - Fr: 09:00 - 18:00</p>
                  <p className="text-secondary">Sa: 10:00 - 14:00</p>
                </div>
              </div>
            </div>
          </div>
          <div className="w-full md:w-2/3 h-[400px]">
            <img src={mapUlm} alt="Karte Ulm" className="w-full h-full object-cover grayscale" loading="lazy" width={1200} height={800} />
          </div>
        </div>
      </div>
    </section>
  </Layout>
);

export default Index;
