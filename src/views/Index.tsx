"use client";

import Layout from "@/components/Layout";
import Link from "next/link";
import Image from "next/image";
import { categories } from "@/data/products";
import { categoryAlt } from "@/lib/seo/alt";
import { ArrowRight, Menu, X, ShieldCheck, Sparkles, Award, Briefcase, PackageOpen, Phone, Layers, Wrench } from "lucide-react";
import { FadeIn, StaggerContainer, StaggerItem, ScaleIn, RevealLine, ParallaxImage } from "@/components/ScrollAnimations";
import { m, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

const heroHome = "/hero-home.jpg";
const architectureDetail = "/architecture-detail.jpg";
const ctaTraumplatz = "/qbus/product/main.webp";
const ulmMuenster = "/region/ulm-muenster.webp";
const ref1 = "/references/ref-1.webp";
const ref4 = "/references/ref-4.webp";
const ref5 = "/references/ref-5.webp";
const ref10 = "/references/ref-10.webp";
const mapUlm = "/map-ulm.jpg";
const logoLight = "/logo-brait-light.svg";
const demoKoffer = "/demo/demo-koffer.webp";

const heroProducts = categories.map((c) => ({
  label: c.label,
  path: `/${c.slug}`,
  image: c.image,
  desc: c.shortDesc,
}));

const simpleLinks = [
  { label: "Online-Konfigurator öffnen", path: "/konfigurator" },
  { label: "Service & Montage", path: "/service" },
  { label: "Beratung anfragen", path: "/kontakt" },
];

const Index = () => {
  const [heroMenuOpen, setHeroMenuOpen] = useState(false);
  const [heroOverlayVisible, setHeroOverlayVisible] = useState(true);
  const [rechnerHover, setRechnerHover] = useState(false);

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
    {/* Mobile hero menu trigger removed — Navbar now visible on mobile home */}

    {/* Mobile hero menu dropdown with product swipe cards */}
    <AnimatePresence>
    {heroMenuOpen && (
      <m.div
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
              {heroProducts.map((p) => (
                <div
                  key={p.label}
                  className="snap-start shrink-0 w-[72vw] max-w-[300px] group relative"
                >
                  <div className="relative aspect-[4/3] overflow-hidden mb-3">
                    <Image src={p.image} alt={categoryAlt(p.label)} fill sizes="72vw" className="object-cover"
          quality={65}
        />
                    <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 via-transparent to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      <p className="font-headline uppercase tracking-widest text-xs font-bold text-white mb-1" aria-hidden>
                        {p.label}
                      </p>
                      <p className="text-[10px] text-white/80 leading-tight">{p.desc}</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between px-1">
                    <Link
                      href={p.path}
                      onClick={() => setHeroMenuOpen(false)}
                      className="text-[10px] font-headline uppercase tracking-widest text-primary font-bold after:absolute after:inset-0 after:content-[''] after:z-10"
                    >
                      {p.label} im Detail
                    </Link>
                    <ArrowRight className="w-3.5 h-3.5 text-primary" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {simpleLinks.map((link) => (
            <Link
              key={link.label}
              href={link.path}
              onClick={() => setHeroMenuOpen(false)}
              className="font-headline uppercase tracking-widest text-sm text-primary-foreground hover:text-primary transition-colors"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/kontakt"
            onClick={() => setHeroMenuOpen(false)}
            className="bg-primary text-primary-foreground px-6 py-3 font-headline uppercase tracking-widest text-xs font-bold text-center mt-2"
          >
            Angebot Anfordern
          </Link>
        </div>
      </m.div>
    )}
    </AnimatePresence>

    {/* Hero */}
    <section className="relative h-[100svh] min-h-[520px] max-h-[780px] flex items-center pt-0 md:pt-20 overflow-hidden bg-foreground">
      <div className="absolute inset-0 opacity-60">
        <picture>
          <source
            type="image/avif"
            srcSet="/hero/hero-home-414.avif 414w, /hero/hero-home-640.avif 640w, /hero/hero-home-828.avif 828w, /hero/hero-home-1080.avif 1080w, /hero/hero-home-1280.avif 1280w"
            sizes="100vw"
          />
          <source
            type="image/webp"
            srcSet="/hero/hero-home-414.webp 414w, /hero/hero-home-640.webp 640w, /hero/hero-home-828.webp 828w, /hero/hero-home-1080.webp 1080w, /hero/hero-home-1280.webp 1280w"
            sizes="100vw"
          />
          <img
            src="/hero/hero-home-1280.webp"
            alt="Premium Aluminium-Terrassenüberdachung mit VSG-Glasdach von Brait Überdachungen Ulm"
            width={1280}
            height={720}
            fetchPriority="high"
            decoding="async"
            className="absolute inset-0 w-full h-full object-cover"
          />
        </picture>
      </div>
      <div className="absolute inset-0 bg-gradient-to-r from-foreground/90 via-foreground/50 to-transparent md:from-foreground/80 md:via-foreground/40" />

      <div className="container mx-auto px-5 md:px-8 relative z-10">
        <div className="max-w-4xl">
          <span className="inline-block bg-primary text-primary-foreground px-3 py-1 text-[10px] md:text-xs font-bold tracking-[0.3em] uppercase mb-4 md:mb-6">
            Ulm &amp; Umgebung
          </span>
          <h1 className="text-[2rem] sm:text-5xl md:text-7xl lg:text-8xl font-bold text-primary-foreground leading-[0.9] tracking-tighter mb-5 md:mb-8 break-words">
            Terrassendach &amp; <br />
            <span className="text-primary-fixed-dim">Carport vom Profi</span> <br />
            in Ulm.
          </h1>
          <p className="text-sm md:text-lg lg:text-xl text-primary-foreground/70 max-w-xl mb-8 md:mb-12 font-light leading-relaxed">
            Ihr Profi für Terrassendach, Carport und Lamellen-Pergola in Ulm: maßgefertigt aus Aluminium 6063 T6, montiert vom eigenen Team — vom Demo-Koffer-Termin bis zur Endabnahme aus einer Hand.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
            <Link href="/konfigurator" className="bg-primary text-primary-foreground px-6 md:px-7 py-3 md:py-3.5 font-bold uppercase tracking-widest text-xs md:text-sm hover:bg-primary-container transition-all text-center">Konfigurieren</Link>
            <Link href="/konfigurator" className="border border-primary-foreground/20 text-primary-foreground backdrop-blur-sm px-6 md:px-7 py-3 md:py-3.5 font-bold uppercase tracking-widest text-xs md:text-sm hover:bg-primary-foreground hover:text-foreground transition-all text-center">Modelle Entdecken</Link>
          </div>
        </div>
      </div>
      <div className="absolute bottom-0 right-6 md:right-12 w-0.5 h-[120px] bg-primary hidden sm:block" />
    </section>

    {/* Intro / Answer-First Block für H1-Wort-Verankerung und SEO-Substanz */}
    <section className="py-12 md:py-20 bg-surface-container-low border-b border-outline-variant/20">
      <div className="container mx-auto px-5 md:px-8 max-w-6xl">
        <FadeIn>
          <div className="max-w-3xl mb-10 md:mb-14">
            <label className="text-primary text-[10px] md:text-xs font-bold tracking-[0.4em] uppercase mb-3 md:mb-4 block">
              Brait Überdachungen · seit 2014
            </label>
            <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold tracking-tighter mb-5 md:mb-6">
              Maßgefertigt. Aus Ulm. Selbst montiert.
            </h2>
            <p className="text-base md:text-lg leading-relaxed text-secondary speakable-tldr">
              Inhabergeführter Spezialbetrieb für maßgefertigte Aluminium-Außenanlagen in Ulm und 100&nbsp;km Umkreis. <strong className="text-foreground">Terrassendach</strong>, <strong className="text-foreground">Carport</strong>, <strong className="text-foreground">Markisen</strong>, <strong className="text-foreground">Lamellen-Pergolen</strong>, <strong className="text-foreground">Schirme</strong> und <strong className="text-foreground">Eingangsüberdachungen</strong> — von der Planung bis zur Endabnahme aus einer Hand, ohne Subunternehmer.
            </p>
          </div>

          {/* 2 Beweis-Karten */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mb-10 md:mb-14">
            <article className="bg-card p-6 md:p-7 border-t-2 border-primary flex flex-col">
              <Layers className="w-6 h-6 text-primary mb-4" aria-hidden />
              <div className="text-[10px] font-bold uppercase tracking-widest text-primary mb-2">
                01 — System-Linien
              </div>
              <h3 className="text-lg md:text-xl font-bold tracking-tight mb-3">
                Drei Linien, ein Maßstab
              </h3>
              <p className="text-sm md:text-base text-secondary leading-relaxed speakable-answer flex-1">
                <strong className="text-foreground">Pro-Line</strong> wandbefestigt ab 7.900&nbsp;€, <strong className="text-foreground">Cube</strong> freistehend ab 9.500&nbsp;€, <strong className="text-foreground">Lamellendach Q-Bus</strong> mit motorischer Klimakontrolle ab 14.000&nbsp;€. Carport ab 4.900&nbsp;€, Doppelcarport ab 7.900&nbsp;€ — alle aus Aluminium 6063&nbsp;T6, mit VSG-Glas oder verstellbaren Lamellen, wartungsfrei und schneelastgeprüft.
              </p>
            </article>

            <article className="bg-card p-6 md:p-7 border-t-2 border-primary flex flex-col">
              <Wrench className="w-6 h-6 text-primary mb-4" aria-hidden />
              <div className="text-[10px] font-bold uppercase tracking-widest text-primary mb-2">
                02 — Montage
              </div>
              <h3 className="text-lg md:text-xl font-bold tracking-tight mb-3">
                Eigenes Team, 10&nbsp;Jahre Garantie
              </h3>
              <p className="text-sm md:text-base text-secondary leading-relaxed speakable-answer flex-1">
                Standardstatik 200&nbsp;kg/m², in Schneelastzone 3 individuell verstärkt. Über 200 realisierte Projekte zwischen Ulm, Augsburg, Reutlingen und Heidenheim — alle abgenommen von eigenen Brait-Monteuren, kein Subunternehmer.
              </p>
            </article>
          </div>

          {/* Trust-Leiste */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-0 mb-10 md:mb-14 border-y border-outline-variant/30 py-6 md:py-8">
            {[
              { value: "12+", label: "Jahre Erfahrung" },
              { value: "200+", label: "Projekte realisiert" },
              { value: "10\u00A0J", label: "Strukturgarantie" },
              { value: "100\u00A0km", label: "Service-Radius" },
            ].map((stat) => (
              <div
                key={stat.label}
                className="text-center md:border-l md:first:border-l-0 border-outline-variant/30 px-2 md:px-4"
              >
                <div className="text-3xl md:text-4xl font-bold text-primary mb-1 tracking-tighter">
                  {stat.value}
                </div>
                <div className="text-[10px] md:text-xs uppercase tracking-widest text-secondary">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>

          {/* Rechner-Teaser — aufgewertet mit Vorher/Nachher */}
          <div
            className={`relative p-6 md:p-8 transition-colors ${rechnerHover ? "bg-primary" : "bg-foreground"} text-primary-foreground`}
            onMouseEnter={() => setRechnerHover(true)}
            onMouseLeave={() => setRechnerHover(false)}
          >
            <div className="grid grid-cols-1 md:grid-cols-[1.4fr_1fr] gap-6 md:gap-10 items-center">
              <div>
                <div
                  className={`text-[10px] md:text-xs font-bold uppercase tracking-[0.3em] mb-3 transition-colors ${rechnerHover ? "text-primary-foreground" : "text-primary"}`}
                >
                  Neu · Adressgenau
                </div>
                <h3 className="text-xl md:text-3xl font-bold tracking-tight mb-3 leading-snug">
                  Wie viele Tage Terrasse verschenken Sie pro Jahr?
                </h3>
                <p
                  className={`text-sm md:text-base leading-relaxed transition-colors ${rechnerHover ? "text-primary-foreground/85" : "text-primary-foreground/75"}`}
                >
                  Adresse eingeben, in 5 Sekunden sehen Sie Ihr Terrassenpotenzial: aktuelle Outdoor-Tage, mögliche Zusatz-Tage mit Brait-Dach und exakte Schneelast für Ihren Standort — auf Basis von 30 Jahren DWD-Klimadaten.
                </p>
              </div>
              <div className="flex flex-col items-start md:items-end gap-3">
                <div
                  className={`text-[10px] uppercase tracking-widest transition-colors ${rechnerHover ? "text-primary-foreground/70" : "text-primary-foreground/55"}`}
                >
                  Typisches Ergebnis in Süddeutschland
                </div>
                <div
                  className={`text-3xl md:text-5xl font-bold tracking-tighter leading-none transition-colors ${rechnerHover ? "text-primary-foreground" : "text-primary"}`}
                >
                  +180 Tage
                </div>
                <Link
                  href="/rechner"
                  className={`inline-flex items-center gap-2 font-bold uppercase tracking-widest text-xs whitespace-nowrap transition-colors after:absolute after:inset-0 after:content-[''] after:z-10 ${rechnerHover ? "text-primary-foreground" : "text-primary"}`}
                >
                  Jetzt für Ihre Adresse <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>

    {/* Products */}
    <section className="py-16 md:py-32 bg-surface">
      <div className="container mx-auto px-5 md:px-8">
        <div className="mb-10 md:mb-20">
          <FadeIn>
            <label className="text-primary text-[10px] md:text-xs font-bold tracking-[0.4em] uppercase mb-3 md:mb-4 block">Unsere Produkte</label>
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-tighter">Sechs Welten. Eine Philosophie.</h2>
          </FadeIn>
        </div>

        {/* Mobile: horizontal swipe */}
        <div className="md:hidden -mx-5">
          <div className="flex gap-4 overflow-x-auto px-3 pb-4 snap-x snap-mandatory scrollbar-hide" style={{ WebkitOverflowScrolling: 'touch' }}>
            {categories.map((c) => (
              <div key={c.slug} className="snap-start shrink-0 w-[80vw] max-w-[320px] group relative">
                <div className="relative overflow-hidden aspect-[3/4] mb-4">
                  <Image
                    src={c.image}
                    alt={categoryAlt(c.label)}
                    fill
                    sizes="(min-width: 768px) 33vw, 80vw"
                    className="object-cover"
          quality={65}
        />
                  <div className="absolute inset-0 bg-foreground/10" />
                </div>
                <div className="px-2">
                  <p className="text-xl font-bold mb-2 group-hover:text-primary transition-colors" aria-hidden>{c.label}</p>
                  <p className="text-secondary leading-relaxed text-sm mb-3">{c.shortDesc}</p>
                  <Link
                    href={`/${c.slug}`}
                    className="inline-flex items-center gap-2 text-primary font-bold uppercase tracking-widest text-xs after:absolute after:inset-0 after:content-[''] after:z-10"
                  >
                    Zu {c.label} <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Desktop: 3x2 grid */}
        <StaggerContainer className="hidden md:grid grid-cols-3 gap-4" staggerDelay={0.12}>
          {categories.map((c) => (
            <StaggerItem key={c.slug}>
              <div className="group relative h-full">
                <div className="relative overflow-hidden aspect-[4/5] mb-5 md:mb-6">
                  <Image
                    src={c.image}
                    alt={categoryAlt(c.label)}
                    fill
                    sizes="(min-width: 1024px) 33vw, (min-width: 768px) 33vw, 100vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
          quality={65}
        />
                  <div className="absolute inset-0 bg-foreground/10 group-hover:bg-transparent transition-all duration-300" />
                </div>
                <h3 className="text-xl lg:text-2xl font-bold mb-3 group-hover:text-primary transition-colors">{c.label}</h3>
                <p className="text-secondary leading-relaxed text-sm lg:text-base mb-4">{c.shortDesc}</p>
                <Link
                  href={`/${c.slug}`}
                  className="inline-flex items-center gap-2 text-primary font-bold uppercase tracking-widest text-xs group-hover:gap-3 transition-all after:absolute after:inset-0 after:content-[''] after:z-10"
                >
                  {c.label} entdecken <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>

    {/* Qualität & Vertrauen */}
    <section className="py-16 md:py-24 bg-surface-container-low border-y border-outline-variant/20">
      <div className="container mx-auto px-5 md:px-8">
        <FadeIn className="mb-10 md:mb-14 max-w-3xl">
          <label className="text-primary text-[10px] md:text-xs font-bold tracking-[0.4em] uppercase mb-3 block">Qualität &amp; Vertrauen</label>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tighter">Premium-Aluminium. Geprüfte Qualität.</h2>
        </FadeIn>
        <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-1" staggerDelay={0.1}>
          <StaggerItem>
            <div className="bg-card p-8 md:p-10 h-full">
              <Sparkles className="w-6 h-6 text-primary mb-4" />
              <h3 className="text-lg md:text-xl font-bold mb-2">Premium-Pulverbeschichtung</h3>
              <p className="text-secondary text-sm leading-relaxed">Extrem widerstandsfähig gegen Kratzer, Witterung und UV – Farbe und Struktur bleiben über Jahrzehnte stabil.</p>
            </div>
          </StaggerItem>
          <StaggerItem>
            <div className="bg-card p-8 md:p-10 h-full">
              <Award className="w-6 h-6 text-primary mb-4" />
              <h3 className="text-lg md:text-xl font-bold mb-2">Aluminium 6063 T6</h3>
              <p className="text-secondary text-sm leading-relaxed">Leicht, äußerst stabil, korrosionsbeständig. Das Material, auf dem unsere gesamte Konstruktion basiert.</p>
            </div>
          </StaggerItem>
          <StaggerItem>
            <div className="bg-card p-8 md:p-10 h-full">
              <ShieldCheck className="w-6 h-6 text-primary mb-4" />
              <h3 className="text-lg md:text-xl font-bold mb-2">CE-zertifiziert</h3>
              <p className="text-secondary text-sm leading-relaxed">Alle Aluminium- und Glasprodukte sind CE-geprüft – europäische Standards für Sicherheit und Qualität.</p>
            </div>
          </StaggerItem>
        </StaggerContainer>
      </div>
    </section>

    {/* Demo-Koffer Teaser */}
    <section className="relative bg-foreground text-primary-foreground overflow-hidden">
      <div className="container mx-auto px-5 md:px-8 py-16 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 md:gap-14 items-center">
          <FadeIn direction="left" className="lg:col-span-6">
            <div className="relative">
              <div className="absolute -top-3 -left-3 w-12 h-[2px] bg-primary z-10" />
              <div className="absolute -top-3 -left-3 w-[2px] h-12 bg-primary z-10" />
              <div className="absolute -bottom-3 -right-3 w-12 h-[2px] bg-primary z-10" />
              <div className="absolute -bottom-3 -right-3 w-[2px] h-12 bg-primary z-10" />
              <Image
                src={demoKoffer}
                alt="Brait Demo-Koffer mit Aluminium-Profilen, Glas und RAL-Farbmustern"
                width={1024}
                height={683}
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="w-full h-auto object-cover"
          quality={65}
        />
              <div className="absolute top-4 left-4 bg-primary text-primary-foreground px-3 py-1.5 font-headline uppercase tracking-widest text-[10px] md:text-xs font-bold flex items-center gap-1.5">
                <Briefcase className="w-3.5 h-3.5" /> Brait Demo-Koffer
              </div>
            </div>
          </FadeIn>
          <FadeIn direction="right" delay={0.1} className="lg:col-span-6">
            <div className="inline-flex items-center gap-2 mb-4">
              <span className="w-10 h-[2px] bg-primary" />
              <span className="font-headline uppercase tracking-[0.25em] text-xs md:text-sm text-primary font-bold">Kostenlos vor Ort</span>
            </div>
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-tighter leading-[0.95] mb-5 md:mb-7">
              Sehen, anfassen,<br /><span className="text-primary">selbst zusammenbauen.</span>
            </h2>
            <p className="text-base md:text-lg text-primary-foreground/75 leading-relaxed mb-5 md:mb-6 max-w-xl speakable-answer">
              Der Brait Demo-Koffer ist eine kostenlose Vor-Ort-Beratung mit echten Materialien. Wir kommen mit Aluminium-Profilen 6063 T6, VSG-Sicherheitsglas, RAL-Farbpalette und Beschlägen zu Ihnen. In 60–120 Minuten bauen wir vor Ihren Augen ein Mini-Modell zusammen, machen ein digitales 3D-Aufmaß und besprechen Ausrichtung, Statik und Genehmigungspflicht.
            </p>
            <p className="text-sm md:text-base text-primary-foreground/65 leading-relaxed mb-7 md:mb-9 max-w-xl">
              Kostenlos im 100-km-Umkreis um Ulm. Unverbindlich. Innerhalb von 5 Werktagen erhalten Sie ein verbindliches Festpreis-Angebot inklusive 3D-Visualisierung Ihrer Überdachung am Haus.
            </p>
            <div className="flex flex-wrap gap-x-6 gap-y-3 mb-8 md:mb-10 text-sm md:text-base text-primary-foreground/80">
              <span className="flex items-center gap-2"><PackageOpen className="w-4 h-4 text-primary" /> Echte Materialien</span>
              <span className="flex items-center gap-2"><Sparkles className="w-4 h-4 text-primary" /> RAL-Farbpalette</span>
              <span className="flex items-center gap-2"><ShieldCheck className="w-4 h-4 text-primary" /> 100 % unverbindlich</span>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 md:gap-4">
              <Link href="/kontakt#demo-koffer" className="bg-primary text-primary-foreground px-6 md:px-7 py-3 md:py-3.5 font-headline uppercase tracking-widest text-xs md:text-sm font-bold hover:bg-primary-container transition-all flex items-center justify-center gap-2.5">
                Demo-Koffer anfordern <ArrowRight className="w-4 h-4" />
              </Link>
              <a href="tel:+491735303581" className="border border-primary-foreground/30 text-primary-foreground px-6 md:px-7 py-3 md:py-3.5 font-headline uppercase tracking-widest text-xs md:text-sm font-bold hover:bg-primary-foreground/10 transition-all flex items-center justify-center gap-2.5">
                <Phone className="w-4 h-4" /> Anrufen: 0173 530 3581
              </a>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>

    <section className="relative bg-surface-container-low overflow-hidden">
      <div className="container mx-auto px-0 md:px-8 py-16 md:py-32">
        <div className="flex flex-col md:flex-row gap-0">
          <FadeIn direction="left" className="w-full md:w-1/2 bg-foreground aspect-[4/3] md:aspect-auto">
            <ParallaxImage
              src={ulmMuenster}
              alt="Ulmer Münster – Wahrzeichen unserer Heimatstadt"
              className="object-cover"
              sizes="(min-width: 768px) 50vw, 100vw"
            />
          </FadeIn>
          <FadeIn direction="right" delay={0.2} className="w-full md:w-1/2 bg-card p-8 md:p-16 lg:p-24 flex flex-col justify-center">
            <label className="text-primary text-[10px] md:text-xs font-bold tracking-[0.4em] uppercase mb-3 md:mb-4 block">Lokale Präsenz</label>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tighter mb-6 md:mb-8">Ihr Partner in Ulm und der Region.</h2>
            <p className="text-base md:text-lg text-secondary mb-4 md:mb-6 leading-relaxed speakable-answer">
              Brait Überdachungen ist seit 2014 in Ulm und Dornstadt ansässig und beliefert ein Service-Gebiet von <strong>100&nbsp;km Radius</strong> rund um Ulm. Das umfasst rund 1,2&nbsp;Millionen Einwohner zwischen Stuttgart-Süd, Memmingen, Augsburg-West und Heidenheim — in Zahlen: über 20 versorgte Städte, vom eigenen Montage-Team aus Dornstadt erreicht.
            </p>
            <p className="text-sm md:text-base text-secondary mb-8 md:mb-10 leading-relaxed">
              Schwerpunkte sind Ulm, Neu-Ulm, Augsburg, Memmingen, Heidenheim, Göppingen, Aalen, Reutlingen und Tübingen. Schneelastzonen 2a (Ulm/Neu-Ulm: 1,32&nbsp;kN/m²), Zone 2 (Augsburg, Memmingen) und Zone 3 (Höhenlagen Schwäbische Alb ab 600&nbsp;m: bis 1,82&nbsp;kN/m²) werden bei jeder Konstruktion individuell berücksichtigt.
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
            <Link href="/kontakt" className="self-start border-b-2 border-primary text-primary font-bold uppercase tracking-widest pb-1 hover:opacity-70 transition-all text-sm">Region Prüfen</Link>
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
            <Link href="/referenzprojekte" className="hidden md:flex items-center gap-2 font-bold uppercase tracking-widest text-sm text-primary hover:opacity-70 transition-opacity">
              Alle Projekte <ArrowRight className="w-4 h-4" />
            </Link>
          </FadeIn>
        </div>
        {/* Top mosaic: 1 Hero + 1 Hochformat */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3 md:gap-4 md:h-[640px] mb-3 md:mb-4">
          <ScaleIn className="md:col-span-8 md:row-span-2 relative group overflow-hidden aspect-[4/3] md:aspect-auto">
            <Link href="/referenzprojekte" className="block w-full h-full">
              <Image
                src={ref1}
                alt="Realisierte Brait Terrassenüberdachung mit Glasanbau in Ulm — Aluminium 6063 T6 in Anthrazit RAL 7016"
                fill
                sizes="(min-width: 768px) 66vw, 100vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
          quality={65}
        />
              <div className="absolute inset-0 bg-foreground/20 group-hover:bg-transparent transition-all duration-300" />
              <div className="absolute bottom-4 left-4 md:bottom-8 md:left-8 text-primary-foreground p-4 md:p-6 backdrop-blur-md bg-foreground/40 border-l-4 border-primary">
                <span className="text-[10px] md:text-xs uppercase tracking-widest opacity-80">Privatkunde</span>
                <p className="text-base md:text-xl font-bold">Terrassenüberdachung mit Anbau</p>
              </div>
            </Link>
          </ScaleIn>
          <ScaleIn delay={0.15} className="md:col-span-4 md:row-span-2 relative group overflow-hidden aspect-[3/4] md:aspect-auto">
            <Link href="/referenzprojekte" className="block w-full h-full">
              <Image
                src={ref5}
                alt="Brait Glashaus mit rahmenlosen Schiebetüren — Aluminium-Konstruktion mit VSG-Glasdach in Süddeutschland"
                fill
                sizes="(min-width: 768px) 33vw, 100vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
          quality={65}
        />
              <div className="absolute inset-0 bg-foreground/20 group-hover:bg-transparent transition-all duration-300" />
              <div className="absolute bottom-4 left-4 md:bottom-8 md:left-8 text-primary-foreground p-4 md:p-6 backdrop-blur-md bg-foreground/40 border-l-4 border-primary">
                <span className="text-[10px] md:text-xs uppercase tracking-widest opacity-80">Privatkunde</span>
                <p className="text-base md:text-xl font-bold">Glashaus mit Schiebetüren</p>
              </div>
            </Link>
          </ScaleIn>
        </div>

        {/* Bottom row: 2 weitere Projekte (4 Bilder gesamt) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
          {[
            { img: ref10, alt: "Anthrazit Brait Glasveranda mit Sitzbereich — Aluminium-Konstruktion in Ulm", label: "Privatkunde", title: "Glasveranda mit Sitzbereich" },
            { img: ref4, alt: "Freistehende Brait Glas-Veranda mit VSG-Glasdach in Süddeutschland", label: "Privatkunde", title: "Freistehende Glas-Veranda" },
          ].map((p, i) => (
            <ScaleIn key={p.title} delay={0.2 + i * 0.1} className="relative group overflow-hidden aspect-[16/10]">
              <Link href="/referenzprojekte" className="block w-full h-full">
                <Image
                  src={p.img}
                  alt={p.alt}
                  fill
                  sizes="(min-width: 768px) 50vw, 100vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
          quality={65}
        />
                <div className="absolute inset-0 bg-foreground/20 group-hover:bg-transparent transition-all duration-300" />
                <div className="absolute bottom-4 left-4 md:bottom-6 md:left-6 text-primary-foreground p-3 md:p-5 backdrop-blur-md bg-foreground/40 border-l-4 border-primary">
                  <span className="text-[10px] md:text-xs uppercase tracking-widest opacity-80">{p.label}</span>
                  <p className="text-sm md:text-lg font-bold">{p.title}</p>
                </div>
              </Link>
            </ScaleIn>
          ))}
        </div>

        {/* Mobile-CTA — Desktop hat den Link bereits oben rechts */}
        <FadeIn delay={0.4} className="md:hidden mt-8">
          <Link
            href="/referenzprojekte"
            className="flex items-center justify-center gap-2 w-full border-2 border-primary text-primary py-4 font-bold uppercase tracking-widest text-xs"
          >
            Alle Projekte ansehen <ArrowRight className="w-4 h-4" />
          </Link>
        </FadeIn>
      </div>
    </section>

    {/* Häufige Fragen — kompakt für SEO-Substanz */}
    <section className="py-14 md:py-24 bg-surface">
      <div className="container mx-auto px-5 md:px-8 max-w-4xl">
        <FadeIn>
          <label className="text-primary text-[10px] md:text-xs font-bold tracking-[0.4em] uppercase mb-3 md:mb-4 block">Häufige Fragen</label>
          <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold tracking-tighter mb-8 md:mb-10">Was Sie vor dem Kauf wissen sollten.</h2>
        </FadeIn>
        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-7 md:gap-y-9" staggerDelay={0.08}>
          <StaggerItem>
            <h3 className="text-base md:text-lg font-bold mb-2">Was kostet ein Terrassendach in Ulm?</h3>
            <p className="text-secondary text-sm md:text-base leading-relaxed speakable-answer">Ein wandbefestigtes <strong>Pro-Line-Terrassendach</strong> aus Aluminium mit VSG-Glas (4&nbsp;×&nbsp;3&nbsp;m) startet bei 7.900&nbsp;€ inklusive Montage. Freistehende Cube-Konstruktionen ab 9.500&nbsp;€, motorische Lamellendächer ab 14.000&nbsp;€.</p>
          </StaggerItem>
          <StaggerItem>
            <h3 className="text-base md:text-lg font-bold mb-2">Brauche ich in BW eine Baugenehmigung?</h3>
            <p className="text-secondary text-sm md:text-base leading-relaxed speakable-answer">Nein, in Baden-Württemberg sind <strong>Terrassendächer und Carports bis 30&nbsp;m² Grundfläche und 3&nbsp;m Höhe verfahrensfrei</strong> nach §50 LBO Anlage 1. Bei größeren Anlagen oder Denkmalschutz-Bereichen unterstützen wir bei Bauanzeige und Genehmigung.</p>
          </StaggerItem>
          <StaggerItem>
            <h3 className="text-base md:text-lg font-bold mb-2">Wie lange hält ein Aluminium-Terrassendach?</h3>
            <p className="text-secondary text-sm md:text-base leading-relaxed speakable-answer">Aluminium 6063 T6 mit Pulverbeschichtung nach DIN&nbsp;EN&nbsp;12206-1 hält <strong>30+ Jahre nahezu wartungsfrei</strong>. Eine Reinigung pro Jahr genügt. Brait gewährt 10 Jahre Strukturgarantie und 5 Jahre auf Motoren.</p>
          </StaggerItem>
          <StaggerItem>
            <h3 className="text-base md:text-lg font-bold mb-2">Was ist der Demo-Koffer?</h3>
            <p className="text-secondary text-sm md:text-base leading-relaxed speakable-answer">Eine <strong>kostenlose Vor-Ort-Beratung</strong> in Ulm und 100&nbsp;km Umkreis mit echten Aluminium-Profilen, Glasmustern und RAL-Farbpalette. Wir bauen ein Mini-Modell, machen 3D-Aufmaß und liefern innerhalb von 5 Werktagen ein verbindliches Festpreis-Angebot.</p>
          </StaggerItem>
          <StaggerItem>
            <h3 className="text-base md:text-lg font-bold mb-2">Wo liefert und montiert Brait?</h3>
            <p className="text-secondary text-sm md:text-base leading-relaxed speakable-answer">Service-Gebiet ist 100&nbsp;km um Ulm: <strong>Neu-Ulm, Memmingen, Augsburg, Heidenheim, Aalen, Göppingen, Reutlingen, Tübingen</strong> und die Schwäbische Alb. Schneelastzonen 2 bis 3 werden individuell statisch berechnet — Standardstatik trägt 200&nbsp;kg/m².</p>
          </StaggerItem>
          <StaggerItem>
            <h3 className="text-base md:text-lg font-bold mb-2">Ist Brait Hersteller oder Händler?</h3>
            <p className="text-secondary text-sm md:text-base leading-relaxed speakable-answer">Brait Überdachungen ist ein <strong>inhabergeführter Spezialbetrieb mit eigenem Montage-Team aus Dornstadt bei Ulm</strong>. Keine Subunternehmer, keine ausgelagerte Fertigung — eine Hand vom ersten Termin bis zur Endabnahme.</p>
          </StaggerItem>
        </StaggerContainer>
      </div>
    </section>

    {/* CTA */}
    <section className="relative py-16 md:py-32 bg-foreground overflow-hidden">
      <div className="absolute inset-0 opacity-40">
        <Image
          src={ctaTraumplatz}
          alt="Brait Q-Bus Lamellen-Pergola in Anthrazit als Outdoor-Lounge mit Sitzbereich"
          fill
          sizes="100vw"
          className="object-cover"
          quality={65}
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-foreground via-foreground/70 to-foreground/40" />
      <div className="container mx-auto px-5 md:px-8 relative z-10 text-center">
        <FadeIn distance={60}>
          <h2 className="text-[1.75rem] sm:text-4xl md:text-6xl lg:text-7xl font-bold text-primary-foreground tracking-tighter mb-6 md:mb-8 break-words">Bereit für Ihren Traumplatz?</h2>
        </FadeIn>
        <FadeIn delay={0.2}>
          <p className="text-base md:text-xl text-primary-foreground/60 max-w-2xl mx-auto mb-8 md:mb-12 speakable-answer">Eine Aluminium-Terrassenüberdachung von Brait verlängert Ihre Outdoor-Saison von 4 auf 9 Monate und ist in drei Linien verfügbar: Pro-Line wandbefestigt ab 7.900&nbsp;€, Cube freistehend ab 9.500&nbsp;€ und Lamellendach verstellbar ab 14.000&nbsp;€ inkl. Montage. Konfigurieren Sie online in unter 3 Minuten oder fordern Sie den Demo-Koffer kostenlos an.</p>
        </FadeIn>
        <FadeIn delay={0.4}>
          <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center items-stretch sm:items-center">
            <Link href="/konfigurator" className="inline-flex items-center justify-center bg-primary text-primary-foreground px-7 md:px-9 py-3.5 md:py-4 text-xs md:text-sm font-bold uppercase tracking-widest hover:bg-primary-container transition-all">Jetzt Konfigurator starten</Link>
            <Link href="/kontakt#demo-koffer" className="inline-flex items-center justify-center gap-2.5 border border-primary-foreground/30 text-primary-foreground px-7 md:px-9 py-3.5 md:py-4 text-xs md:text-sm font-bold uppercase tracking-widest hover:bg-primary-foreground/10 transition-all">
              <Briefcase className="w-4 h-4" /> Kostenlosen Beratungstermin sichern
            </Link>
          </div>
        </FadeIn>
      </div>
    </section>

  </Layout>
  );
};

export default Index;
