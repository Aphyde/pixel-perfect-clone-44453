"use client";

import Layout from "@/components/Layout";
import Link from "next/link";
import { m } from "framer-motion";
import { ArrowRight, Check, ShieldCheck, Heart } from "lucide-react";
import { configuratorList } from "@/data/configurators";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/ScrollAnimations";

const Konfigurator = () => (
  <Layout>
    {/* Hero */}
    <section className="relative pt-32 md:pt-40 pb-12 md:pb-20 bg-foreground overflow-hidden">
      <div className="container mx-auto px-5 md:px-8 relative z-10">
        <m.span
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="inline-block bg-primary text-primary-foreground px-3 py-1 text-[10px] md:text-xs font-bold tracking-[0.3em] uppercase mb-4"
        >
          Konfigurator
        </m.span>
        <m.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="text-[2rem] sm:text-5xl md:text-7xl font-bold text-primary-foreground leading-[0.9] tracking-tighter break-words max-w-4xl"
        >
          Wählen Sie Ihren <span className="text-primary-fixed-dim">Konfigurator.</span>
        </m.h1>
        <m.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="text-sm md:text-lg text-primary-foreground/60 max-w-2xl mt-4 md:mt-6"
        >
          Stellen Sie Ihr Produkt online zusammen – Maße, Farben, Module. Sie erhalten am Ende einen unverbindlichen Richtpreis und können kostenlos eine Anfrage senden.
        </m.p>

        {/* Trust badges */}
        <m.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="flex flex-wrap gap-x-6 gap-y-2 mt-6 md:mt-8 text-xs md:text-sm text-primary-foreground/70"
        >
          <span className="flex items-center gap-2"><Check className="w-4 h-4 text-primary" /> 100 % kostenlos</span>
          <span className="flex items-center gap-2"><Heart className="w-4 h-4 text-primary" /> Ohne Kaufverpflichtung</span>
          <span className="flex items-center gap-2"><ShieldCheck className="w-4 h-4 text-primary" /> Persönliche Beratung</span>
        </m.div>
      </div>
    </section>

    {/* Categories grid */}
    <section className="py-12 md:py-24 bg-surface">
      <div className="container mx-auto px-5 md:px-8">
        <FadeIn className="mb-8 md:mb-14">
          <label className="text-primary text-[10px] md:text-xs font-bold tracking-[0.4em] uppercase mb-3 block">
            Produktkategorien
          </label>
          <h2 className="text-2xl md:text-4xl font-bold tracking-tighter">
            Was möchten Sie konfigurieren?
          </h2>
        </FadeIn>

        <StaggerContainer
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6"
          staggerDelay={0.08}
        >
          {configuratorList.map((c) => (
            <StaggerItem key={c.slug}>
              <Link
                href={`/konfigurator/${c.slug}`}
                className="group block h-full bg-card hover:shadow-2xl transition-all duration-300"
              >
                <div className="relative aspect-[16/10] overflow-hidden bg-foreground">
                  <img
                    src={c.hero}
                    alt={c.label}
                    loading="lazy"
                    width={960}
                    height={600}
                    className="w-full h-full object-cover opacity-90 transition-all duration-700 group-hover:scale-105 group-hover:opacity-100"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 via-transparent to-transparent" />
                </div>
                <div className="p-5 md:p-7">
                  <h3 className="text-lg md:text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                    {c.label}
                  </h3>
                  <p className="text-secondary text-sm leading-relaxed mb-4">
                    {c.shortDesc}
                  </p>
                  <span className="inline-flex items-center gap-2 text-primary font-bold uppercase tracking-widest text-xs group-hover:gap-3 transition-all">
                    Konfigurator starten <ArrowRight className="w-4 h-4" />
                  </span>
                </div>
              </Link>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>

    {/* Trust footer */}
    <section className="py-12 md:py-20 bg-surface-container-low">
      <div className="container mx-auto px-5 md:px-8 max-w-3xl text-center">
        <FadeIn>
          <h2 className="text-2xl md:text-4xl font-bold tracking-tighter mb-4">
            Lieber persönlich beraten?
          </h2>
          <p className="text-secondary text-sm md:text-base mb-6">
            Unser Team berät Sie kostenlos vor Ort in der Region Ulm. Ohne Kaufverpflichtung – Sie entscheiden in Ruhe.
          </p>
          <Link
            href="/kontakt"
            className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-4 font-bold uppercase tracking-widest text-xs hover:bg-primary-container transition-all"
          >
            Kostenlose Beratung anfragen <ArrowRight className="w-4 h-4" />
          </Link>
        </FadeIn>
      </div>
    </section>
  </Layout>
);

export default Konfigurator;
