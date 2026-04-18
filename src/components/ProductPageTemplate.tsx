import Layout from "@/components/Layout";
import { FadeIn, StaggerContainer, StaggerItem, ScaleIn, ParallaxImage } from "@/components/ScrollAnimations";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Check, Plus } from "lucide-react";
import { terraceModules } from "@/data/products";

export interface ProductFeature {
  title: string;
  desc: string;
}

export interface ProductPageData {
  badge: string;
  title: string;
  titleAccent: string;
  subtitle: string;
  heroImage: string;
  detailImage: string;
  introLabel: string;
  introTitle: string;
  introText: string;
  features: ProductFeature[];
  specs: { label: string; value: string }[];
  ctaTitle: string;
  ctaText: string;
  otherProducts: { title: string; image: string; link: string }[];
  /** Wenn true, wird die "Erweiterungen & Module"-Sektion eingeblendet (nur Terrassen). */
  showModules?: boolean;
}

const ProductPageTemplate = ({ data }: { data: ProductPageData }) => (
  <Layout>
    {/* Hero */}
    <section className="relative h-[70svh] min-h-[420px] max-h-[700px] flex items-end pb-12 md:pb-20 overflow-hidden bg-foreground">
      <div className="absolute inset-0 opacity-50">
        <motion.img
          src={data.heroImage}
          alt={data.title}
          className="w-full h-full object-cover"
          width={1920}
          height={1080}
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-foreground via-foreground/40 to-transparent" />
      <div className="container mx-auto px-5 md:px-8 relative z-10">
        <motion.span
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="inline-block bg-primary text-primary-foreground px-3 py-1 text-[10px] md:text-xs font-bold tracking-[0.3em] uppercase mb-4"
        >
          {data.badge}
        </motion.span>
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="text-[2rem] sm:text-5xl md:text-7xl font-bold text-primary-foreground leading-[0.9] tracking-tighter break-words"
        >
          {data.title} <br />
          <span className="text-primary-fixed-dim">{data.titleAccent}</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
          className="text-sm md:text-lg text-primary-foreground/60 max-w-xl mt-4 md:mt-6"
        >
          {data.subtitle}
        </motion.p>
      </div>
    </section>

    {/* Intro + Detail Image */}
    <section className="py-16 md:py-32 bg-surface">
      <div className="container mx-auto px-5 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-center">
          <FadeIn direction="left">
            <label className="text-primary text-[10px] md:text-xs font-bold tracking-[0.4em] uppercase mb-3 block">{data.introLabel}</label>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tighter mb-6">{data.introTitle}</h2>
            <p className="text-secondary leading-relaxed text-sm md:text-base mb-8">{data.introText}</p>
            <Link
              to="/kontakt"
              className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-4 font-bold uppercase tracking-widest text-xs hover:bg-primary-container transition-all"
            >
              Angebot Anfordern <ArrowRight className="w-4 h-4" />
            </Link>
          </FadeIn>
          <FadeIn direction="right" delay={0.2}>
            <div className="aspect-square overflow-hidden bg-foreground">
              <ParallaxImage
                src={data.detailImage}
                alt="Detailansicht"
                className="w-full h-full object-cover"
                loading="lazy"
                width={960}
                height={960}
              />
            </div>
          </FadeIn>
        </div>
      </div>
    </section>

    {/* Features */}
    <section className="py-16 md:py-32 bg-surface-container-low">
      <div className="container mx-auto px-5 md:px-8">
        <FadeIn className="mb-10 md:mb-20">
          <label className="text-primary text-[10px] md:text-xs font-bold tracking-[0.4em] uppercase mb-3 block">Vorteile</label>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tighter">Was uns auszeichnet</h2>
        </FadeIn>
        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-1" staggerDelay={0.1}>
          {data.features.map((f) => (
            <StaggerItem key={f.title}>
              <div className="bg-card p-8 md:p-10 h-full hover:bg-surface-container-high transition-colors">
                <Check className="w-6 h-6 text-primary mb-4" />
                <h3 className="text-lg md:text-xl font-bold mb-3">{f.title}</h3>
                <p className="text-secondary text-sm leading-relaxed">{f.desc}</p>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>

    {/* Specs */}
    <section className="py-16 md:py-32 bg-surface">
      <div className="container mx-auto px-5 md:px-8 max-w-4xl">
        <FadeIn className="mb-10 md:mb-16 text-center">
          <label className="text-primary text-[10px] md:text-xs font-bold tracking-[0.4em] uppercase mb-3 block">Technische Daten</label>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tighter">Auf einen Blick</h2>
        </FadeIn>
        <StaggerContainer className="divide-y divide-outline-variant/20" staggerDelay={0.08}>
          {data.specs.map((s) => (
            <StaggerItem key={s.label}>
              <div className="flex justify-between items-baseline py-5 md:py-6">
                <span className="text-sm md:text-base text-secondary">{s.label}</span>
                <span className="text-sm md:text-base font-bold">{s.value}</span>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>

    {/* CTA */}
    <section className="py-16 md:py-32 bg-foreground">
      <div className="container mx-auto px-5 md:px-8 text-center">
        <FadeIn distance={60}>
          <h2 className="text-[1.75rem] sm:text-4xl md:text-6xl font-bold text-primary-foreground tracking-tighter mb-6 break-words">{data.ctaTitle}</h2>
        </FadeIn>
        <FadeIn delay={0.2}>
          <p className="text-base md:text-xl text-primary-foreground/60 max-w-2xl mx-auto mb-8 md:mb-12">{data.ctaText}</p>
        </FadeIn>
        <FadeIn delay={0.4}>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link to="/konfigurator" className="bg-primary text-primary-foreground px-10 py-5 font-bold uppercase tracking-widest text-xs md:text-sm hover:bg-primary-container transition-all">
              Jetzt Konfigurieren
            </Link>
            <Link to="/kontakt" className="border border-primary-foreground/20 text-primary-foreground px-10 py-5 font-bold uppercase tracking-widest text-xs md:text-sm hover:bg-primary-foreground hover:text-foreground transition-all">
              Kontakt Aufnehmen
            </Link>
          </div>
        </FadeIn>
      </div>
    </section>

    {/* Other Products */}
    {data.otherProducts.length > 0 && (
      <section className="py-16 md:py-24 bg-surface">
        <div className="container mx-auto px-5 md:px-8">
          <FadeIn className="mb-8 md:mb-12">
            <label className="text-primary text-[10px] md:text-xs font-bold tracking-[0.4em] uppercase mb-3 block">Weitere Produkte</label>
            <h2 className="text-2xl md:text-4xl font-bold tracking-tighter">Entdecken Sie auch</h2>
          </FadeIn>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
            {data.otherProducts.map((p) => (
              <ScaleIn key={p.title}>
                <Link to={p.link} className="group block relative overflow-hidden aspect-[16/9]">
                  <img src={p.image} alt={p.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" loading="lazy" width={960} height={540} />
                  <div className="absolute inset-0 bg-foreground/40 group-hover:bg-foreground/20 transition-all" />
                  <div className="absolute bottom-4 left-4 md:bottom-8 md:left-8 flex items-center gap-3">
                    <h3 className="text-lg md:text-2xl font-bold text-primary-foreground">{p.title}</h3>
                    <ArrowRight className="w-5 h-5 text-primary-foreground group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              </ScaleIn>
            ))}
          </div>
        </div>
      </section>
    )}
  </Layout>
);

export default ProductPageTemplate;
