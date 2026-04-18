import Layout from "@/components/Layout";
import heroHome from "@/assets/hero-home.jpg";
import architectureDetail from "@/assets/architecture-detail.jpg";
import ref1 from "@/assets/ref-1.jpg";
import ref2 from "@/assets/ref-2.jpg";
import ref3 from "@/assets/ref-3.jpg";
import mapUlm from "@/assets/map-ulm.jpg";
import logoLight from "@/assets/logo-brait-light.svg";
import { categories } from "@/data/products";
import { useLocation } from "react-router-dom";
import { MapPin, Clock, ArrowRight, Menu, X } from "lucide-react";
import { Link } from "react-router-dom";
import { FadeIn, StaggerContainer, StaggerItem, ScaleIn, RevealLine, ParallaxImage } from "@/components/ScrollAnimations";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

const heroProducts = categories.map((c) => ({
  label: c.label,
  path: `/${c.slug}`,
  image: c.image,
  desc: c.shortDesc,
}));

const simpleLinks = [
  { label: "Konfigurator", path: "/konfigurator" },
  { label: "Service", path: "/service" },
  { label: "Kontakt", path: "/kontakt" },
];

const Index = () => {
  const [heroMenuOpen, setHeroMenuOpen] = useState(false);
  const [heroOverlayVisible, setHeroOverlayVisible] = useState(true);

  useEffect(() => {
    const getOverlayThreshold = () => (window.innerWidth < 768 ? window.innerHeight * 0.7 : 100);

    const onScroll = () => {
      const shouldShowOverlay = window.scrollY < getOverlayThreshold();

      setHeroOverlayVisible(shouldShowOverlay);
      if (!shouldShowOverlay) setHeroMenuOpen(false);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
  <Layout>
    {/* Mobile Hero Overlay: Logo left + Hamburger right */}
    <div className={`md:hidden fixed top-0 left-0 right-0 z-[55] flex items-center justify-between px-4 py-4 pointer-events-none transition-opacity duration-300 ${heroOverlayVisible ? "opacity-100" : "opacity-0 pointer-events-none"}`}>
      <img src={logoLight} alt="Brait Überdachungen" className="h-14 pointer-events-auto" />
      <button
        className="pointer-events-auto p-2 text-primary-foreground"
        onClick={() => setHeroMenuOpen(!heroMenuOpen)}
      >
        {heroMenuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>
    </div>

    {/* Mobile hero menu dropdown with product swipe cards */}
    <AnimatePresence>
    {heroMenuOpen && (
      <motion.div
        initial={{ scaleY: 0, opacity: 0.98 }}
        animate={{ scaleY: 1, opacity: 1 }}
        exit={{ scaleY: 0, opacity: 0.98 }}
        transition={{ duration: 0.36, ease: [0.22, 1, 0.36, 1] }}
        className="md:hidden fixed top-14 left-0 right-0 bottom-0 z-[55] origin-top backdrop-blur-xl border-t border-primary-foreground/10 overflow-y-auto"
        style={{
          background: 'linear-gradient(135deg, #1F1E1D 0%, #1E1C1C 35%, #201E1D 65%, #1E1D1D 100%)',
          willChange: 'transform, opacity',
          backfaceVisibility: 'hidden',
        }}
      >
        <div className="flex flex-col p-6 gap-4">
          <span className="font-headline uppercase tracking-widest text-sm text-primary-foreground/70">
            Produkte
          </span>
          <div className="-mx-6">
            <div className="flex gap-3 overflow-x-auto px-6 pb-3 snap-x snap-mandatory scrollbar-hide" style={{ WebkitOverflowScrolling: 'touch' }}>
              {products.map((p) => (
                <Link
                  key={p.label}
                  to={p.path}
                  onClick={() => setHeroMenuOpen(false)}
                  className="snap-start shrink-0 w-[72vw] max-w-[300px] group"
                >
                  <div className="relative aspect-[4/3] overflow-hidden mb-3">
                    <img src={p.image} alt={p.label} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 via-transparent to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      <h3 className="font-headline uppercase tracking-widest text-xs font-bold text-white mb-1">
                        {p.label}
                      </h3>
                      <p className="text-[10px] text-white/80 leading-tight">{p.desc}</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between px-1">
                    <span className="text-[10px] font-headline uppercase tracking-widest text-primary font-bold">Mehr erfahren</span>
                    <ArrowRight className="w-3.5 h-3.5 text-primary" />
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {simpleLinks.map((link) => (
            <Link
              key={link.label}
              to={link.path}
              onClick={() => setHeroMenuOpen(false)}
              className="font-headline uppercase tracking-widest text-sm text-primary-foreground hover:text-primary transition-colors"
            >
              {link.label}
            </Link>
          ))}
          <Link
            to="/kontakt"
            onClick={() => setHeroMenuOpen(false)}
            className="bg-primary text-primary-foreground px-6 py-3 font-headline uppercase tracking-widest text-xs font-bold text-center mt-2"
          >
            Angebot Anfordern
          </Link>
        </div>
      </motion.div>
    )}
    </AnimatePresence>

    {/* Hero */}
    <section className="relative h-[100svh] min-h-[520px] max-h-[780px] flex items-center pt-0 md:pt-20 overflow-hidden bg-foreground">
      <div className="absolute inset-0 opacity-60">
        <motion.img
          src={heroHome}
          alt="Luxury terrace roofing"
          className="w-full h-full object-cover"
          width={1920}
          height={1080}
          initial={{ scale: 1.15 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.8, ease: [0.22, 1, 0.36, 1] }}
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-r from-foreground/90 via-foreground/50 to-transparent md:from-foreground/80 md:via-foreground/40" />

      <div className="container mx-auto px-5 md:px-8 relative z-10">
        <div className="max-w-4xl">
          <motion.span
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="inline-block bg-primary text-primary-foreground px-3 py-1 text-[10px] md:text-xs font-bold tracking-[0.3em] uppercase mb-4 md:mb-6"
          >
            Ulm &amp; Umgebung
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="text-[2rem] sm:text-5xl md:text-7xl lg:text-8xl font-bold text-primary-foreground leading-[0.9] tracking-tighter mb-5 md:mb-8 break-words"
          >
            Terrassendach &amp; <br />
            <span className="text-primary-fixed-dim">Carport vom Profi</span> <br />
            in Ulm.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.8 }}
            className="text-sm md:text-lg lg:text-xl text-primary-foreground/70 max-w-xl mb-8 md:mb-12 font-light leading-relaxed"
          >
            Wir vereinen architektonische Präzision mit höchster Materialqualität für Ihren persönlichen Rückzugsort im Freien.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.1 }}
            className="flex flex-col sm:flex-row gap-3 sm:gap-4"
          >
            <Link to="/konfigurator" className="bg-primary text-primary-foreground px-8 py-4 md:px-10 md:py-5 font-bold uppercase tracking-widest text-xs md:text-sm hover:bg-primary-container transition-all text-center">Konfigurieren</Link>
            <Link to="/konfigurator" className="border border-primary-foreground/20 text-primary-foreground backdrop-blur-sm px-8 py-4 md:px-10 md:py-5 font-bold uppercase tracking-widest text-xs md:text-sm hover:bg-primary-foreground hover:text-foreground transition-all text-center">Modelle Entdecken</Link>
          </motion.div>
        </div>
      </div>
      <motion.div
        initial={{ height: 0 }}
        animate={{ height: 120 }}
        transition={{ duration: 1, delay: 1.4, ease: [0.22, 1, 0.36, 1] }}
        className="absolute bottom-0 right-6 md:right-12 w-0.5 bg-primary hidden sm:block"
      />
    </section>

    {/* Products */}
    <section className="py-16 md:py-32 bg-surface">
      <div className="container mx-auto px-5 md:px-8">
        <div className="mb-10 md:mb-20">
          <FadeIn>
            <label className="text-primary text-[10px] md:text-xs font-bold tracking-[0.4em] uppercase mb-3 md:mb-4 block">Unsere Produkte</label>
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-tighter">Drei Systeme. Eine Philosophie.</h2>
          </FadeIn>
        </div>

        {/* Mobile: horizontal swipe */}
        <div className="md:hidden -mx-5">
          <div className="flex gap-4 overflow-x-auto px-3 pb-4 snap-x snap-mandatory scrollbar-hide" style={{ WebkitOverflowScrolling: 'touch' }}>
            {[
              { img: productTerrasse, title: "Terrassenüberdachungen", desc: "Ganzjährig geschützt genießen – mit Aluminium-Glas-Systemen, die architektonisch überzeugen.", link: "/terrassenueberdachungen" },
              { img: productCarport, title: "Carports", desc: "Stilvoller Schutz für Ihr Fahrzeug – freistehend oder am Gebäude angebaut, individuell geplant.", link: "/carports" },
              { img: productWintergarten, title: "Wintergärten", desc: "Wohnraum trifft Natur – lichtdurchflutete Konstruktionen mit höchster Wärmedämmung.", link: "/wintergaerten" },
            ].map((item) => (
              <Link key={item.title} to={item.link} className="snap-start shrink-0 w-[85vw] max-w-[340px] group block">
                <div className="relative overflow-hidden aspect-[3/4] mb-4">
                  <img src={item.img} alt={item.title} className="w-full h-full object-cover" loading="lazy" width={960} height={1280} />
                  <div className="absolute inset-0 bg-foreground/10" />
                </div>
                <div className="px-2">
                  <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">{item.title}</h3>
                  <p className="text-secondary leading-relaxed text-sm mb-3">{item.desc}</p>
                  <span className="inline-flex items-center gap-2 text-primary font-bold uppercase tracking-widest text-xs">
                    Mehr erfahren <ArrowRight className="w-4 h-4" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Desktop: grid */}
        <StaggerContainer className="hidden md:grid grid-cols-3 gap-4" staggerDelay={0.15}>
          {[
            { img: productTerrasse, title: "Terrassenüberdachungen", desc: "Ganzjährig geschützt genießen – mit Aluminium-Glas-Systemen, die architektonisch überzeugen.", link: "/terrassenueberdachungen" },
            { img: productCarport, title: "Carports", desc: "Stilvoller Schutz für Ihr Fahrzeug – freistehend oder am Gebäude angebaut, individuell geplant.", link: "/carports" },
            { img: productWintergarten, title: "Wintergärten", desc: "Wohnraum trifft Natur – lichtdurchflutete Konstruktionen mit höchster Wärmedämmung.", link: "/wintergaerten" },
          ].map((item) => (
            <StaggerItem key={item.title}>
              <Link to={item.link} className="group block h-full">
                <div className="relative overflow-hidden aspect-[3/4] mb-5 md:mb-6">
                  <img src={item.img} alt={item.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" loading="lazy" width={960} height={1280} />
                  <div className="absolute inset-0 bg-foreground/10 group-hover:bg-transparent transition-all duration-300" />
                </div>
                <h3 className="text-2xl font-bold mb-3 group-hover:text-primary transition-colors">{item.title}</h3>
                <p className="text-secondary leading-relaxed text-base mb-4">{item.desc}</p>
                <span className="inline-flex items-center gap-2 text-primary font-bold uppercase tracking-widest text-xs group-hover:gap-3 transition-all">
                  Mehr erfahren <ArrowRight className="w-4 h-4" />
                </span>
              </Link>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>

    {/* Local Partner */}
    <section className="relative bg-surface-container-low overflow-hidden">
      <div className="container mx-auto px-0 md:px-8 py-16 md:py-32">
        <div className="flex flex-col md:flex-row gap-0">
          <FadeIn direction="left" className="w-full md:w-1/2 bg-foreground aspect-[4/3] md:aspect-auto">
            <ParallaxImage src={architectureDetail} alt="Architectural detailing" className="w-full h-full object-cover grayscale opacity-80" loading="lazy" width={1024} height={1024} />
          </FadeIn>
          <FadeIn direction="right" delay={0.2} className="w-full md:w-1/2 bg-card p-8 md:p-16 lg:p-24 flex flex-col justify-center">
            <label className="text-primary text-[10px] md:text-xs font-bold tracking-[0.4em] uppercase mb-3 md:mb-4 block">Lokale Präsenz</label>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tighter mb-6 md:mb-8">Ihr Partner in Ulm und der Region.</h2>
            <p className="text-base md:text-lg text-secondary mb-8 md:mb-12 leading-relaxed">
              Wir sind tief in Ulm verwurzelt. Unser Service-Radius von <strong>100km</strong> umfasst die gesamte Region von Augsburg über Memmingen bis an den Rand von Stuttgart.
            </p>
            <StaggerContainer className="grid grid-cols-2 gap-6 md:gap-8 mb-8 md:mb-12" staggerDelay={0.2} delay={0.3}>
              <StaggerItem>
                <span className="text-2xl md:text-3xl font-bold text-primary block mb-1">100km</span>
                <span className="text-[10px] md:text-xs uppercase tracking-widest text-secondary">Einsatzradius</span>
              </StaggerItem>
              <StaggerItem>
                <span className="text-2xl md:text-3xl font-bold text-primary block mb-1">24h</span>
                <span className="text-[10px] md:text-xs uppercase tracking-widest text-secondary">Reaktionszeit</span>
              </StaggerItem>
            </StaggerContainer>
            <Link to="/kontakt" className="self-start border-b-2 border-primary text-primary font-bold uppercase tracking-widest pb-1 hover:opacity-70 transition-all text-sm">Region Prüfen</Link>
          </FadeIn>
        </div>
      </div>
    </section>

    {/* Gallery */}
    <section className="py-16 md:py-32 bg-surface">
      <div className="container mx-auto px-5 md:px-8">
        <div className="flex justify-between items-end mb-8 md:mb-16">
          <FadeIn>
            <label className="text-primary text-[10px] md:text-xs font-bold tracking-[0.4em] uppercase mb-3 md:mb-4 block">Inspiration</label>
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-tighter">Referenzprojekte</h2>
          </FadeIn>
          <FadeIn delay={0.2}>
            <Link to="/kontakt" className="hidden md:flex items-center gap-2 font-bold uppercase tracking-widest text-sm text-primary hover:opacity-70 transition-opacity">
              Alle Projekte <ArrowRight className="w-4 h-4" />
            </Link>
          </FadeIn>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3 md:gap-4 md:h-[800px]">
          <ScaleIn className="md:col-span-8 md:row-span-2 relative group overflow-hidden aspect-[4/3] md:aspect-auto">
            <img src={ref1} alt="Residenz am Blauufer" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" loading="lazy" width={1280} height={960} />
            <div className="absolute inset-0 bg-foreground/20 group-hover:bg-transparent transition-all duration-300" />
            <div className="absolute bottom-4 left-4 md:bottom-8 md:left-8 text-primary-foreground p-4 md:p-6 backdrop-blur-md bg-foreground/40 border-l-4 border-primary">
              <span className="text-[10px] md:text-xs uppercase tracking-widest opacity-80">Ulm-Söflingen</span>
              <h4 className="text-base md:text-xl font-bold">Residenz am Blauufer</h4>
            </div>
          </ScaleIn>
          <ScaleIn delay={0.15} className="md:col-span-4 relative group overflow-hidden aspect-[3/2] md:aspect-auto">
            <img src={ref2} alt="Gartenfokus Neu-Ulm" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" loading="lazy" width={800} height={600} />
            <div className="absolute bottom-4 left-4 md:bottom-8 md:left-8 text-primary-foreground">
              <h4 className="text-base md:text-lg font-bold">Gartenfokus Neu-Ulm</h4>
            </div>
          </ScaleIn>
          <ScaleIn delay={0.3} className="md:col-span-4 relative group overflow-hidden aspect-[3/2] md:aspect-auto">
            <img src={ref3} alt="Penthouse Blaustein" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" loading="lazy" width={800} height={600} />
            <div className="absolute bottom-4 left-4 md:bottom-8 md:left-8 text-primary-foreground">
              <h4 className="text-base md:text-lg font-bold">Penthouse Blaustein</h4>
            </div>
          </ScaleIn>
        </div>
      </div>
    </section>

    {/* CTA */}
    <section className="relative py-16 md:py-32 bg-foreground overflow-hidden">
      <div className="absolute inset-0 opacity-30">
        <img src={architectureDetail} alt="Configure now" className="w-full h-full object-cover" loading="lazy" width={1024} height={1024} />
      </div>
      <div className="container mx-auto px-5 md:px-8 relative z-10 text-center">
        <FadeIn distance={60}>
          <h2 className="text-[1.75rem] sm:text-4xl md:text-6xl lg:text-7xl font-bold text-primary-foreground tracking-tighter mb-6 md:mb-8 break-words">Bereit für Ihren Traumplatz?</h2>
        </FadeIn>
        <FadeIn delay={0.2}>
          <p className="text-base md:text-xl text-primary-foreground/60 max-w-2xl mx-auto mb-8 md:mb-12">Nutzen Sie unseren Online-Konfigurator für eine unverbindliche erste Preisschätzung in unter 3 Minuten.</p>
        </FadeIn>
        <FadeIn delay={0.4}>
          <Link to="/konfigurator" className="inline-block bg-primary text-primary-foreground px-10 py-5 md:px-16 md:py-6 text-sm md:text-lg font-bold uppercase tracking-[0.15em] md:tracking-[0.2em] hover:bg-primary-container transition-all">Konfigurator Starten</Link>
        </FadeIn>
      </div>
    </section>

    {/* Map/Showroom */}
    <section className="py-16 md:py-32 bg-surface-container">
      <div className="container mx-auto px-5 md:px-8">
        <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
          <FadeIn direction="left" className="w-full md:w-1/3">
            <h3 className="text-2xl md:text-3xl font-bold mb-4 md:mb-6">Besuchen Sie unseren Showroom</h3>
            <p className="text-secondary mb-6 md:mb-8 leading-relaxed text-sm md:text-base">Erleben Sie unsere Systeme live. Wir zeigen Ihnen verschiedene Materialien, Beschattungsoptionen und technische Raffinessen.</p>
            <div className="space-y-3 md:space-y-4">
              <div className="flex gap-3 md:gap-4 items-start">
                <MapPin className="w-5 h-5 text-primary mt-0.5" />
                <div>
                  <p className="font-bold text-sm md:text-base">Hauptstraße 42</p>
                  <p className="text-secondary text-sm">89073 Ulm</p>
                </div>
              </div>
              <div className="flex gap-3 md:gap-4 items-start">
                <Clock className="w-5 h-5 text-primary mt-0.5" />
                <div>
                  <p className="font-bold text-sm md:text-base">Öffnungszeiten</p>
                  <p className="text-secondary text-sm">Mo - Fr: 09:00 - 18:00</p>
                  <p className="text-secondary text-sm">Sa: 10:00 - 14:00</p>
                </div>
              </div>
            </div>
          </FadeIn>
          <FadeIn direction="right" delay={0.2} className="w-full md:w-2/3 h-[250px] md:h-[400px]">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d42584.29839498498!2d9.9455!3d48.4011!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4799a5b3b0b4e3c7%3A0x42d5e03d5e5c5f0!2sUlm!5e0!3m2!1sde!2sde!4v1700000000000!5m2!1sde!2sde"
              className="w-full h-full border-0 grayscale"
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Standort Ulm"
            />
          </FadeIn>
        </div>
      </div>
    </section>
  </Layout>
  );
};

export default Index;
