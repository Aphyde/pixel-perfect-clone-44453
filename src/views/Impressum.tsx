"use client";

import Layout from "@/components/Layout";
const impressumImg = "/impressum-img.jpg";
import { Gavel } from "lucide-react";
import { FadeIn, StaggerContainer, StaggerItem, RevealLine } from "@/components/ScrollAnimations";
import { m } from "framer-motion";

const Impressum = () => (
  <Layout>
    <div className="pt-24 md:pt-32 pb-16 md:pb-24">
      {/* Hero */}
      <section className="px-5 md:px-8 max-w-7xl mx-auto mb-12 md:mb-24">
        <div className="flex flex-col md:flex-row gap-8 md:gap-12 items-start">
          <div className="md:w-1/2">
            <m.p
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-xs md:text-sm uppercase tracking-[0.2em] md:tracking-[0.3em] text-primary mb-3 md:mb-4"
            >
              Rechtliche Informationen
            </m.p>
            <m.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-[2rem] sm:text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter leading-none mb-6 md:mb-8 break-words"
            >
              Impressum.
            </m.h1>
            <RevealLine className="w-16 h-[2px] bg-primary" delay={0.8} />
          </div>
          <FadeIn delay={0.3} direction="right" className="md:w-1/2 relative">
            <div className="bg-surface-container-low p-8 md:p-12 relative z-10">
              <p className="text-base md:text-lg font-light leading-relaxed text-on-surface-variant">
                Transparenz und Vertrauen sind das Fundament unserer Arbeit. Hier finden Sie alle gesetzlich vorgeschriebenen Angaben zur SMT Konzepte GmbH.
              </p>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Content */}
      <section className="px-5 md:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-16">
          <div className="hidden md:block md:col-span-1 border-r border-outline-variant/30">
            <span className="rotate-90 origin-left inline-block whitespace-nowrap text-xs tracking-[0.5em] uppercase text-outline mt-12">Legal Framework</span>
          </div>
          <div className="md:col-span-11 grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24">
            <StaggerContainer className="space-y-10 md:space-y-16" staggerDelay={0.15}>
              <StaggerItem>
                <article>
                  <h2 className="text-[10px] md:text-xs uppercase tracking-[0.2em] text-primary mb-4 md:mb-6 font-bold">Angaben gemäß § 5 TMG</h2>
                  <p className="text-2xl md:text-3xl font-medium tracking-tight">SMT Konzepte GmbH</p>
                  <p className="text-sm md:text-base text-primary font-bold mt-2">Brait Überdachungen ist eine Marke von <a href="https://bau-braitinger.de/" target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 hover:opacity-70 transition-opacity">SMT Konzepte</a></p>
                  <p className="text-on-surface-variant font-light leading-loose mt-3 md:mt-4 text-sm md:text-base">Graf-Albrecht-Str. 34/1<br />89160 Dornstadt</p>
                </article>
              </StaggerItem>
              <StaggerItem>
                <article>
                  <h2 className="text-[10px] md:text-xs uppercase tracking-[0.2em] text-primary mb-4 md:mb-6 font-bold">Vertretungsberechtigte Personen</h2>
                  <p className="text-lg md:text-xl">Nico Braitinger</p>
                </article>
              </StaggerItem>
              <StaggerItem>
                <article>
                  <h2 className="text-[10px] md:text-xs uppercase tracking-[0.2em] text-primary mb-4 md:mb-6 font-bold">Registereintrag</h2>
                  <p className="text-on-surface-variant text-sm md:text-base">Registergericht: Amtsgericht Ulm<br />Registernummer: HRB 749310</p>
                </article>
              </StaggerItem>
            </StaggerContainer>
            <FadeIn delay={0.3} className="relative">
              <div className="aspect-[4/3] md:aspect-[4/5] bg-surface-container overflow-hidden">
                <img src={impressumImg} className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700" loading="lazy" alt="Architecture" width={800} height={1000} />
                <div className="absolute inset-0 bg-primary/10 mix-blend-multiply" />
              </div>
              <m.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="absolute -top-4 -left-4 md:-top-8 md:-left-8 p-5 md:p-8 bg-surface border border-outline-variant/10 shadow-xl hidden md:block"
              >
                <Gavel className="w-8 h-8 md:w-10 md:h-10 text-primary" />
              </m.div>
            </FadeIn>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="mt-16 md:mt-32 pt-12 md:pt-24 border-t border-outline-variant/20">
          <div className="max-w-4xl">
            <FadeIn>
              <h2 className="text-2xl md:text-4xl font-bold tracking-tight mb-8 md:mb-12">Haftungsausschluss</h2>
            </FadeIn>
            <StaggerContainer className="space-y-8 md:space-y-12" staggerDelay={0.15}>
              {[
                { title: "Haftung für Inhalte", text: "Als Diensteanbieter sind wir gemäß § 7 Abs.1 TMG für eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 TMG sind wir als Diensteanbieter jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde Informationen zu überwachen oder nach Umständen zu forschen, die auf eine rechtswidrige Tätigkeit hinweisen." },
                { title: "Haftung für Links", text: "Unser Angebot enthält Links zu externen Websites Dritter, auf deren Inhalte wir keinen Einfluss haben. Deshalb können wir für diese fremden Inhalte auch keine Gewähr übernehmen. Für die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber der Seiten verantwortlich." },
                { title: "Urheberrecht", text: "Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen dem deutschen Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb der Grenzen des Urheberrechtes bedürfen der schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers." },
              ].map((s) => (
                <StaggerItem key={s.title}>
                  <h3 className="text-sm md:text-lg font-bold uppercase tracking-widest text-primary mb-3 md:mb-4 flex items-center gap-3">
                    <span className="w-6 md:w-8 h-[1px] bg-primary shrink-0" /> {s.title}
                  </h3>
                  <p className="text-on-surface-variant leading-relaxed font-light text-sm md:text-base">{s.text}</p>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="px-5 md:px-8 max-w-7xl mx-auto mt-16 md:mt-32">
        <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-0" staggerDelay={0.15}>
          <StaggerItem direction="left">
            <div className="bg-primary text-primary-foreground p-8 md:p-12 flex flex-col justify-between h-full">
              <h3 className="text-2xl md:text-3xl font-bold leading-tight">Noch Fragen zum<br />Rechtlichen?</h3>
              <p className="font-headline uppercase text-[10px] md:text-xs tracking-widest opacity-80 mt-3 md:mt-4">Kontaktieren Sie uns direkt.</p>
            </div>
          </StaggerItem>
          <StaggerItem>
            <div className="bg-surface-container-high p-8 md:p-12 flex flex-col justify-center h-full">
              <p className="text-[10px] md:text-xs uppercase tracking-widest text-primary font-bold mb-2">Telefon</p>
              <a href="tel:+491735303581" className="text-xl md:text-2xl font-headline hover:text-primary transition-colors">+49 (0) 173 530 3581</a>
            </div>
          </StaggerItem>
          <StaggerItem direction="right">
            <div className="bg-surface-container-highest p-8 md:p-12 flex flex-col justify-center h-full">
              <p className="text-[10px] md:text-xs uppercase tracking-widest text-primary font-bold mb-2">Email</p>
              <a href="mailto:info@brait-ueberdachung.de" className="text-sm sm:text-base md:text-2xl font-headline break-words hover:text-primary transition-colors">info@brait-ueberdachung.de</a>
            </div>
          </StaggerItem>
        </StaggerContainer>
      </section>
    </div>
  </Layout>
);

export default Impressum;
