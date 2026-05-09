"use client";

import Layout from "@/components/Layout";
const heroService = "/hero-service.jpg";
const ctaFreiraum = "/catalog/hero-glashaus.jpg";
const process1 = "/process-beratung.webp";
const process2 = "/process-aufmass.webp";
const process3 = "/process-montage.webp";
const process4 = "/process-abnahme.webp";
import { MapPin, Briefcase, PackageOpen, Sparkles, Wrench, ArrowRight } from "lucide-react";
const demoKoffer = "/demo/demo-koffer.webp";
import Link from "next/link";
import { FadeIn, StaggerContainer, StaggerItem, RevealLine } from "@/components/ScrollAnimations";
import { motion } from "framer-motion";

const steps = [
  { num: "01", phase: "Initialphase", title: "Persönliche Beratung", img: process1, desc: "Jedes Projekt beginnt mit einem Dialog. Wir besuchen Sie vor Ort in Ulm oder Umgebung, um die Gegebenheiten Ihrer Terrasse zu analysieren und Ihre Wünsche bezüglich Design und Funktionalität aufzunehmen.", bullets: ["Kostenlose Erstberatung", "Material- und Designauswahl"] },
  { num: "02", phase: "Präzision", title: "Digitales Aufmaß", img: process2, desc: '"Fast passend" gibt es bei uns nicht. Mit modernster Lasertechnik nehmen wir Maß, um eine millmetergenaue Fertigung Ihrer Breitüberdachung zu garantieren. Dies ist die Basis für eine reibungslose Montage.', bullets: ["Lasergestützte Vermessung", "Statische Vorprüfung"] },
  { num: "03", phase: "Umsetzung", title: "Fachgerechte Montage", img: process3, desc: "Unsere eigenen Montageteams rücken an. Sauberkeit, Schnelligkeit und handwerkliche Perfektion zeichnen unsere Arbeit aus. Wir verlassen die Baustelle erst, wenn jedes Detail sitzt.", bullets: ["Zertifizierte Monteure", "Eigene Logistikflotte"] },
  { num: "04", phase: "Abschluss", title: "Gemeinsame Abnahme", img: process4, desc: "Nach der Montage erfolgt die gemeinsame Begehung. Wir erklären Ihnen alle Funktionen (z.B. integrierte Beschattung oder LED-Spots) und übergeben Ihnen das fertige Projekt schlüsselfertig.", bullets: ["Abnahmeprotokoll", "Pflegeanweisungen & Garantie"] },
];

const Service = () => (
  <Layout>
    {/* Hero */}
    <section className="relative h-[70svh] min-h-[420px] max-h-[819px] flex items-center overflow-hidden pt-16 md:pt-24">
      <div className="absolute inset-0 z-0">
        <motion.img
          src={heroService}
          className="w-full h-full object-cover"
          width={1920}
          height={1080}
          alt="Montage"
          initial={{ scale: 1.15 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.8, ease: [0.22, 1, 0.36, 1] }}
        />
        <div className="absolute inset-0 bg-foreground/40" />
      </div>
      <div className="container mx-auto px-5 md:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, x: -60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-4xl bg-primary-foreground/10 backdrop-blur-md p-6 md:p-12 border-l-4 border-primary"
        >
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="text-primary uppercase tracking-[0.2em] md:tracking-[0.3em] mb-3 md:mb-4 text-xs md:text-sm font-bold"
          >
            Handwerk &amp; Präzision
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.7 }}
            className="text-primary-foreground text-[2rem] sm:text-5xl md:text-7xl lg:text-8xl font-bold leading-none tracking-tighter mb-4 md:mb-8 break-words"
          >
            MONTAGE<br />EXZELLENZ.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1 }}
            className="text-primary-foreground/90 text-base md:text-xl max-w-xl leading-relaxed font-body"
          >
            Ihr Partner für exklusive Terrassensysteme in Ulm und Umgebung.
          </motion.p>
        </motion.div>
      </div>
    </section>

    {/* Intro */}
    <section className="py-16 md:py-24 bg-surface">
      <div className="container mx-auto px-5 md:px-8 grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center">
        <FadeIn direction="left">
          <h2 className="text-2xl md:text-4xl font-bold tracking-tight mb-5 md:mb-8">Regionale Qualität für die Region Ulm</h2>
          <p className="text-base md:text-lg text-secondary mb-4 md:mb-6 leading-relaxed">Als lokaler Experte in Ulm verstehen wir die architektonischen Besonderheiten Süddeutschlands. Unser Montage-Service erstreckt sich über einen Radius von 100km.</p>
          <div className="flex items-start gap-3 text-primary font-bold text-sm md:text-base">
            <MapPin className="w-5 h-5 shrink-0 mt-0.5" />
            <span>Einsatzgebiete: Ulm, Neu-Ulm, Biberach, Günzburg, Memmingen &amp; Region</span>
          </div>
        </FadeIn>
        <StaggerContainer className="grid grid-cols-2 gap-3 md:gap-4" staggerDelay={0.2}>
          <StaggerItem>
            <div className="bg-surface-container h-40 md:h-64 flex items-center justify-center p-6 md:p-8">
              <div className="text-center">
                <span className="block text-3xl md:text-4xl font-bold text-primary mb-2">100km</span>
                <span className="text-[10px] md:text-xs uppercase tracking-widest">Service Radius</span>
              </div>
            </div>
          </StaggerItem>
          <StaggerItem>
            <div className="bg-foreground text-primary-foreground h-40 md:h-64 flex items-center justify-center p-6 md:p-8">
              <div className="text-center">
                <span className="block text-3xl md:text-4xl font-bold mb-2">100%</span>
                <span className="text-[10px] md:text-xs uppercase tracking-widest">Eigene Teams</span>
              </div>
            </div>
          </StaggerItem>
        </StaggerContainer>
      </div>
    </section>

    {/* Process */}
    <section className="py-16 md:py-24 bg-surface-container-low">
      <div className="container mx-auto px-5 md:px-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 md:mb-20">
          <FadeIn className="max-w-2xl">
            <h2 className="text-3xl md:text-5xl font-bold tracking-tighter mb-4">DER PROZESS ZUM TRAUMDACH</h2>
            <RevealLine className="h-1 w-24 bg-primary" delay={0.3} />
          </FadeIn>
          <FadeIn delay={0.2}>
            <p className="text-secondary max-w-sm mt-4 md:mt-0 text-sm md:text-base">Vier Schritte zur Perfektion. Transparent, strukturiert und professionell geplant.</p>
          </FadeIn>
        </div>
        <div className="space-y-16 md:space-y-32">
          {steps.map((step, i) => (
            <div key={step.num} className={`flex flex-col ${i % 2 === 1 ? "md:flex-row-reverse" : "md:flex-row"} items-center gap-8 md:gap-16`}>
              <FadeIn direction={i % 2 === 0 ? "left" : "right"} className="w-full md:w-1/2 relative">
                <motion.img
                  src={step.img}
                  className="w-full h-[280px] md:h-[500px] object-cover grayscale hover:grayscale-0 transition-all duration-700"
                  loading="lazy"
                  width={800}
                  height={800}
                  alt={step.title}
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.4 }}
                />
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  className={`absolute -bottom-4 md:-bottom-8 ${i % 2 === 1 ? "left-4 md:-left-8" : "right-4 md:-right-8"} ${i % 2 === 0 ? "bg-primary" : "bg-foreground"} text-primary-foreground p-4 md:p-8 w-16 h-16 md:w-24 md:h-24 flex items-center justify-center text-xl md:text-3xl font-bold`}
                >
                  {step.num}
                </motion.div>
              </FadeIn>
              <FadeIn direction={i % 2 === 0 ? "right" : "left"} delay={0.2} className="w-full md:w-1/2 mt-4 md:mt-0">
                <span className="text-primary font-bold uppercase tracking-widest mb-2 md:mb-4 block text-xs md:text-sm">{step.phase}</span>
                <h3 className="text-2xl md:text-4xl font-bold mb-4 md:mb-6">{step.title}</h3>
                <p className="text-secondary text-sm md:text-lg leading-relaxed mb-5 md:mb-8">{step.desc}</p>
                <ul className="space-y-3 md:space-y-4">
                  {step.bullets.map((b) => (
                    <li key={b} className="flex items-center gap-3 text-sm md:text-base">
                      <span className="w-1.5 h-1.5 bg-primary shrink-0" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </FadeIn>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* Demo-Koffer */}
    <section className="py-16 md:py-24 bg-surface">
      <div className="container mx-auto px-5 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-14 items-center">
          <FadeIn direction="left" className="lg:col-span-6">
            <div className="relative">
              <div className="absolute -top-3 -left-3 w-12 h-[2px] bg-primary z-10" />
              <div className="absolute -top-3 -left-3 w-[2px] h-12 bg-primary z-10" />
              <img src={demoKoffer} alt="Brait Demo-Koffer mit Aluminium-Profilen, Glas und RAL-Farbmustern" className="w-full h-auto object-cover" loading="lazy" width={1024} height={683} />
              <div className="absolute top-4 left-4 bg-primary text-primary-foreground px-3 py-1.5 font-headline uppercase tracking-widest text-[10px] md:text-xs font-bold flex items-center gap-1.5">
                <Briefcase className="w-3.5 h-3.5" /> Brait Demo-Koffer
              </div>
            </div>
          </FadeIn>
          <FadeIn direction="right" delay={0.1} className="lg:col-span-6">
            <span className="text-primary font-headline uppercase tracking-[0.25em] text-xs md:text-sm font-bold mb-3 md:mb-4 block">Extra-Service · Kostenlos</span>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tighter leading-[0.95] mb-5 md:mb-7">
              Materialien zum Anfassen.<br /><span className="text-primary">Wir kommen vorbei.</span>
            </h2>
            <p className="text-base md:text-lg text-secondary leading-relaxed mb-7 md:mb-9 max-w-xl">
              Bevor Sie sich entscheiden, wollen Sie sehen, fühlen und vergleichen? Genau dafür gibt es unseren Demo-Koffer mit Original-Profilen, Glas, RAL-Farbmustern und Beschlägen — wir bringen ihn kostenlos zu Ihnen und bauen vor Ort ein Mini-Modell zusammen.
            </p>
            <ul className="space-y-3 md:space-y-4 mb-8 md:mb-10">
              <li className="flex items-start gap-3 text-sm md:text-base">
                <PackageOpen className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                <span><strong className="font-bold">Echte Materialien:</strong> Aluminium-Profile, VSG-Glas, Polycarbonat, LED-Muster.</span>
              </li>
              <li className="flex items-start gap-3 text-sm md:text-base">
                <Sparkles className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                <span><strong className="font-bold">RAL-Farbpalette:</strong> Anthrazit, Schwarz, Verkehrs- und Cremeweiß zum direkten Vergleich.</span>
              </li>
              <li className="flex items-start gap-3 text-sm md:text-base">
                <Wrench className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                <span><strong className="font-bold">Live-Aufbau:</strong> Wir stecken die Profile vor Ihren Augen zu einem Mini-Rahmen zusammen.</span>
              </li>
            </ul>
            <Link href="/kontakt#demo-koffer" className="inline-flex items-center gap-3 bg-foreground text-primary-foreground px-7 md:px-9 py-4 md:py-5 font-headline uppercase tracking-widest text-xs md:text-sm font-bold hover:bg-primary hover:text-primary-foreground transition-all">
              Termin vereinbaren <ArrowRight className="w-4 h-4" />
            </Link>
          </FadeIn>
        </div>
      </div>
    </section>

    {/* CTA */}
    <section className="py-16 md:py-32 bg-foreground text-primary-foreground overflow-hidden relative">
      {/* Hintergrundbild */}
      <div className="absolute inset-0 opacity-35">
        <img
          src={ctaFreiraum}
          alt=""
          aria-hidden
          className="w-full h-full object-cover"
          loading="lazy"
          width={1920}
          height={1280}
        />
      </div>
      {/* Dunkler Verlauf für Lesbarkeit der Headline */}
      <div className="absolute inset-0 bg-gradient-to-r from-foreground via-foreground/80 to-foreground/40" />
      <motion.div
        initial={{ x: "100%" }}
        whileInView={{ x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        className="absolute top-0 right-0 w-1/3 h-full bg-primary/10"
      />
      <div className="container mx-auto px-5 md:px-8 relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-8 md:gap-12">
        <FadeIn direction="left" className="max-w-2xl">
          <h2 className="text-3xl md:text-5xl font-bold mb-4 md:mb-6 tracking-tight">BEREIT FÜR MEHR FREIRAUM?</h2>
          <p className="text-primary-foreground/60 text-base md:text-xl">Vereinbaren Sie jetzt Ihren Aufmaß-Termin in Ulm und Umgebung.</p>
        </FadeIn>
        <FadeIn direction="right" delay={0.2}>
          <div className="flex flex-col sm:flex-row flex-wrap gap-3 md:gap-4 w-full md:w-auto">
            <Link href="/kontakt" className="bg-primary text-primary-foreground px-7 py-4 md:px-9 md:py-5 font-bold uppercase tracking-widest text-xs md:text-sm hover:bg-primary-container transition-all text-center">Jetzt Anfragen</Link>
            <Link href="/kontakt#demo-koffer" className="border border-primary text-primary-foreground px-7 py-4 md:px-9 md:py-5 font-bold uppercase tracking-widest text-xs md:text-sm hover:bg-primary/20 transition-all text-center inline-flex items-center justify-center gap-2">
              <Briefcase className="w-4 h-4" /> Demo-Koffer
            </Link>
            <a href="tel:+491735303581" className="border border-primary-foreground/20 text-primary-foreground px-7 py-4 md:px-9 md:py-5 font-bold uppercase tracking-widest text-xs md:text-sm hover:bg-primary-foreground/10 transition-all text-center">0173 530 3581</a>
          </div>
        </FadeIn>
      </div>
    </section>

  </Layout>
);

export default Service;
