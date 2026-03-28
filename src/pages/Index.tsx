import Layout from "@/components/Layout";
import heroHome from "@/assets/hero-home.jpg";
import architectureDetail from "@/assets/architecture-detail.jpg";
import ref1 from "@/assets/ref-1.jpg";
import ref2 from "@/assets/ref-2.jpg";
import ref3 from "@/assets/ref-3.jpg";
import mapUlm from "@/assets/map-ulm.jpg";
import { Award, Wrench, ShieldCheck, MapPin, Clock, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { FadeIn, StaggerContainer, StaggerItem, ScaleIn, RevealLine, ParallaxImage } from "@/components/ScrollAnimations";
import { motion } from "framer-motion";

const Index = () => (
  <Layout>
    {/* Hero */}
    <section className="relative h-[100svh] min-h-[520px] max-h-[780px] flex items-center pt-16 md:pt-20 overflow-hidden bg-foreground">
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
            className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-bold text-primary-foreground leading-[0.9] tracking-tighter mb-5 md:mb-8"
          >
            Exklusive <br />
            <span className="text-primary-fixed-dim">Terrassensysteme</span> <br />
            aus Ulm.
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

    {/* Why Us */}
    <section className="py-16 md:py-32 bg-surface">
      <div className="container mx-auto px-5 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-end mb-12 md:mb-24">
          <div className="md:col-span-7">
            <FadeIn delay={0}>
              <label className="text-primary text-[10px] md:text-xs font-bold tracking-[0.4em] uppercase mb-3 md:mb-4 block">Qualität &amp; Handwerk</label>
              <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-tighter">Warum Breitüberdachungen?</h2>
            </FadeIn>
          </div>
          <FadeIn delay={0.2} direction="left" className="md:col-span-5 border-l-2 border-primary pl-6 md:pl-8 pb-2">
            <p className="text-secondary font-body leading-relaxed text-sm md:text-base">Seit über einem Jahrzehnt stehen wir für strukturelle Integrität und ästhetische Brillanz im Terrassenbau. Jedes Projekt ist ein Unikat.</p>
          </FadeIn>
        </div>
        <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-1" staggerDelay={0.15}>
          {[
            { icon: <Award className="w-8 h-8 md:w-10 md:h-10 text-primary mb-5 md:mb-8" />, title: "Höchste Qualität", desc: "Zertifizierte Aluminium-Profile und Sicherheitsglas für maximale Langlebigkeit unter allen Witterungsbedingungen." },
            { icon: <Wrench className="w-8 h-8 md:w-10 md:h-10 text-primary mb-5 md:mb-8" />, title: "Montage-Service", desc: "Eigene Festangestellte Montageteams garantieren saubere, präzise und termingerechte Ausführung in Ihrem Zuhause." },
            { icon: <ShieldCheck className="w-8 h-8 md:w-10 md:h-10 text-primary mb-5 md:mb-8" />, title: "Langlebigkeit", desc: "Wartungsarme Konstruktionen mit bis zu 10 Jahren Garantie auf die Statik und Oberflächenveredelung." },
          ].map((item) => (
            <StaggerItem key={item.title}>
              <div className="bg-surface-container-low p-8 md:p-12 hover:bg-surface-container-high transition-colors h-full">
                {item.icon}
                <h3 className="text-xl md:text-2xl font-bold mb-3 md:mb-4">{item.title}</h3>
                <p className="text-secondary leading-relaxed text-sm md:text-base">{item.desc}</p>
              </div>
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
          <h2 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold text-primary-foreground tracking-tighter mb-6 md:mb-8">Bereit für Ihren Traumplatz?</h2>
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
    <section className="py-12 md:py-20 bg-surface-container">
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
            <img src={mapUlm} alt="Karte Ulm" className="w-full h-full object-cover grayscale" loading="lazy" width={1200} height={800} />
          </FadeIn>
        </div>
      </div>
    </section>
  </Layout>
);

export default Index;
