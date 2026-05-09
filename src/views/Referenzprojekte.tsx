"use client";

import { useState, useMemo, useEffect, useCallback } from "react";
import Link from "next/link";
import Layout from "@/components/Layout";
import { FadeIn, ScaleIn } from "@/components/ScrollAnimations";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { ArrowRight, ChevronLeft, ChevronRight, MapPin } from "lucide-react";
const ref1 = "/references/ref-1.webp";
const ref2 = "/references/ref-2.webp";
const ref3 = "/references/ref-3.webp";
const ref4 = "/references/ref-4.webp";
const ref5 = "/references/ref-5.webp";
const ref6 = "/references/ref-6.webp";
const ref7 = "/references/ref-7.webp";
const ref8 = "/references/ref-8.webp";
const ref9 = "/references/ref-9.webp";
const ref10 = "/references/ref-10.webp";
const ref11 = "/references/ref-11.webp";
const ref12 = "/references/ref-12.webp";

// Filterbare Kategorien — bewusst auf die Bauart reduziert, weil alle Referenzen Glas-/Alu-Konstruktionen zeigen.
type Filter = "alle" | "wohnhaus" | "glashaus" | "showroom";

interface Project {
  id: string;
  src: string;
  title: string;
  category: "wohnhaus" | "glashaus" | "showroom";
  /** Sub-Kategorie als Tag (z.B. "Wandbefestigt"). */
  type: string;
  location?: string;
  /** Layout-Hint für das Masonry-Grid: "wide" = col-span-2, "tall" = row-span-2, "hero" = beides. */
  span?: "wide" | "tall" | "hero" | "default";
}

const projects: Project[] = [
  {
    id: "ref-1",
    src: ref1,
    title: "Terrassenüberdachung mit Glasanbau",
    category: "wohnhaus",
    type: "Wandbefestigt",
    location: "Einfamilienhaus",
    span: "hero",
  },
  {
    id: "ref-2",
    src: ref2,
    title: "Glas-Veranda mit Schiebetüren",
    category: "wohnhaus",
    type: "Wandbefestigt",
    location: "Anbau Wohnhaus",
    span: "tall",
  },
  {
    id: "ref-5",
    src: ref5,
    title: "Glashaus mit Schiebetüren",
    category: "glashaus",
    type: "Glashaus",
    location: "Privatkunde",
    span: "tall",
  },
  {
    id: "ref-3",
    src: ref3,
    title: "Wandbefestigte Terrassenüberdachung",
    category: "wohnhaus",
    type: "Wandbefestigt",
    location: "Reihenhaus",
  },
  {
    id: "ref-4",
    src: ref4,
    title: "Freistehende Glas-Veranda",
    category: "wohnhaus",
    type: "Freistehend",
    location: "Einfamilienhaus",
    span: "wide",
  },
  {
    id: "ref-10",
    src: ref10,
    title: "Anthrazit-Glasveranda mit Sitzbereich",
    category: "wohnhaus",
    type: "Wandbefestigt",
    location: "Einfamilienhaus",
  },
  {
    id: "ref-11",
    src: ref11,
    title: "Wandüberdachung mit Glasdach",
    category: "wohnhaus",
    type: "Wandbefestigt",
    location: "Stadthaus",
    span: "tall",
  },
  {
    id: "ref-12",
    src: ref12,
    title: "Klassische Terrassenüberdachung",
    category: "wohnhaus",
    type: "Wandbefestigt",
    location: "Einfamilienhaus",
  },
  {
    id: "ref-6",
    src: ref6,
    title: "Glashaus mit verschiebbaren Glaswänden",
    category: "showroom",
    type: "Showroom",
    location: "Brait Showroom",
  },
  {
    id: "ref-7",
    src: ref7,
    title: "Glashaus-Modul mit umlaufender Verglasung",
    category: "showroom",
    type: "Showroom",
    location: "Brait Showroom",
    span: "wide",
  },
  {
    id: "ref-8",
    src: ref8,
    title: "Veranda mit LED-Lichtleiste",
    category: "showroom",
    type: "Showroom",
    location: "Brait Showroom",
  },
  {
    id: "ref-9",
    src: ref9,
    title: "Schiebetür-System mit Festrahmen",
    category: "showroom",
    type: "Showroom",
    location: "Brait Showroom",
  },
];

const filters: { id: Filter; label: string; count: number }[] = [
  { id: "alle", label: "Alle Projekte", count: projects.length },
  { id: "wohnhaus", label: "Wohnhaus", count: projects.filter((p) => p.category === "wohnhaus").length },
  { id: "glashaus", label: "Glashaus", count: projects.filter((p) => p.category === "glashaus").length },
  { id: "showroom", label: "Showroom", count: projects.filter((p) => p.category === "showroom").length },
];

const Referenzprojekte = () => {
  const [filter, setFilter] = useState<Filter>("alle");
  const [activeIdx, setActiveIdx] = useState<number | null>(null);

  const filteredProjects = useMemo(
    () => (filter === "alle" ? projects : projects.filter((p) => p.category === filter)),
    [filter],
  );

  const closeLightbox = useCallback(() => setActiveIdx(null), []);
  const showPrev = useCallback(
    () =>
      setActiveIdx((idx) =>
        idx === null ? null : (idx - 1 + filteredProjects.length) % filteredProjects.length,
      ),
    [filteredProjects.length],
  );
  const showNext = useCallback(
    () => setActiveIdx((idx) => (idx === null ? null : (idx + 1) % filteredProjects.length)),
    [filteredProjects.length],
  );

  // Tastatur-Navigation in der Lightbox
  useEffect(() => {
    if (activeIdx === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox();
      else if (e.key === "ArrowRight") showNext();
      else if (e.key === "ArrowLeft") showPrev();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [activeIdx, closeLightbox, showNext, showPrev]);

  const active = activeIdx !== null ? filteredProjects[activeIdx] : null;

  return (
    <Layout>
      {/* Hero */}
      <section className="relative pt-28 md:pt-36 pb-12 md:pb-20 bg-foreground text-primary-foreground overflow-hidden">
        <div className="absolute inset-0 opacity-30">
          <img
            src={ref1}
            alt=""
            className="w-full h-full object-cover"
            loading="eager"
            aria-hidden
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-foreground via-foreground/80 to-foreground/30" />
        <div className="container mx-auto px-5 md:px-8 relative z-10">
          <FadeIn>
            <span className="text-primary text-[10px] md:text-xs font-bold tracking-[0.4em] uppercase mb-4 md:mb-5 block">
              Referenzen
            </span>
          </FadeIn>
          <FadeIn delay={0.1}>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tighter mb-5 md:mb-8 max-w-4xl">
              Realisierte Projekte aus der Region.
            </h1>
          </FadeIn>
          <FadeIn delay={0.2}>
            <p className="text-base md:text-xl text-primary-foreground/70 max-w-2xl leading-relaxed">
              Aluminium-Glas-Konstruktionen von Brait — montiert bei Privatkunden, ausgestellt in unserem Showroom. Jedes Projekt entsteht in enger Abstimmung mit Architektur und Wunsch.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Filter & Gallery */}
      <section className="py-12 md:py-20 bg-surface">
        <div className="container mx-auto px-5 md:px-8">
          {/* Filter chips */}
          <FadeIn className="mb-8 md:mb-12">
            <div className="flex flex-wrap gap-2 md:gap-3">
              {filters.map((f) => {
                const active = filter === f.id;
                return (
                  <button
                    key={f.id}
                    onClick={() => setFilter(f.id)}
                    className={`group flex items-center gap-2 px-4 md:px-5 py-2.5 md:py-3 text-[11px] md:text-xs font-bold uppercase tracking-widest transition-all ${
                      active
                        ? "bg-primary text-primary-foreground shadow-md"
                        : "bg-card border border-outline-variant/40 text-foreground hover:border-primary/60 hover:text-primary"
                    }`}
                  >
                    {f.label}
                    <span
                      className={`text-[10px] font-headline ${
                        active ? "text-primary-foreground/70" : "text-secondary"
                      }`}
                    >
                      {f.count}
                    </span>
                  </button>
                );
              })}
            </div>
          </FadeIn>

          {/* Masonry-style grid: jede Kachel kann optional größer (col-span/row-span) sein. */}
          <div className="grid grid-cols-2 md:grid-cols-4 auto-rows-[200px] md:auto-rows-[260px] gap-3 md:gap-4">
            {filteredProjects.map((p, i) => {
              const span =
                p.span === "hero"
                  ? "col-span-2 row-span-2"
                  : p.span === "wide"
                  ? "col-span-2"
                  : p.span === "tall"
                  ? "row-span-2"
                  : "";
              return (
                <ScaleIn
                  key={p.id}
                  delay={Math.min(i * 0.04, 0.5)}
                  className={`relative group overflow-hidden ${span}`}
                >
                  <button
                    onClick={() => setActiveIdx(i)}
                    aria-label={`${p.title} öffnen`}
                    className="relative w-full h-full block focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                  >
                    <img
                      src={p.src}
                      alt={p.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                      loading="lazy"
                      width={1280}
                      height={960}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-foreground/85 via-foreground/30 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="absolute inset-x-0 bottom-0 p-4 md:p-5 text-left">
                      <span className="inline-block px-2 py-0.5 bg-primary/90 text-primary-foreground text-[9px] md:text-[10px] uppercase tracking-widest font-bold mb-1.5">
                        {p.type}
                      </span>
                      <h3 className="text-sm md:text-base lg:text-lg font-bold text-primary-foreground leading-tight">
                        {p.title}
                      </h3>
                      {p.location && (
                        <p className="hidden md:flex items-center gap-1 text-[11px] text-primary-foreground/70 mt-1">
                          <MapPin className="w-3 h-3" />
                          {p.location}
                        </p>
                      )}
                    </div>
                  </button>
                </ScaleIn>
              );
            })}
          </div>

          {filteredProjects.length === 0 && (
            <div className="py-16 text-center text-secondary">
              <p>Keine Projekte in dieser Kategorie.</p>
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-16 md:py-24 bg-foreground text-primary-foreground overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <img src={ref5} alt="" className="w-full h-full object-cover" loading="lazy" aria-hidden />
        </div>
        <div className="absolute inset-0 bg-foreground/70" />
        <div className="container mx-auto px-5 md:px-8 relative z-10 text-center max-w-3xl">
          <FadeIn>
            <span className="text-primary text-[10px] md:text-xs font-bold tracking-[0.4em] uppercase mb-4 block">
              Ihr Projekt
            </span>
          </FadeIn>
          <FadeIn delay={0.1}>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tighter mb-5 md:mb-7">
              Wird Ihr Zuhause das nächste?
            </h2>
          </FadeIn>
          <FadeIn delay={0.2}>
            <p className="text-base md:text-lg text-primary-foreground/70 mb-8 md:mb-10 leading-relaxed">
              Vom kostenlosen Aufmaß bis zur fertigen Montage — sprechen Sie mit uns oder konfigurieren Sie online den passenden Rahmen.
            </p>
          </FadeIn>
          <FadeIn delay={0.3}>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 md:gap-4">
              <Link
                href="/konfigurator"
                className="inline-flex items-center gap-3 bg-primary text-primary-foreground px-8 py-4 md:px-10 md:py-5 font-bold uppercase tracking-widest text-xs md:text-sm hover:bg-primary-container transition-all"
              >
                Konfigurator starten
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/kontakt"
                className="inline-flex items-center gap-3 border-2 border-primary-foreground/30 text-primary-foreground px-8 py-4 md:px-10 md:py-5 font-bold uppercase tracking-widest text-xs md:text-sm hover:border-primary hover:text-primary transition-all"
              >
                Beratung anfragen
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Lightbox */}
      <Dialog open={activeIdx !== null} onOpenChange={(open) => !open && closeLightbox()}>
        <DialogContent className="max-w-[95vw] md:max-w-6xl w-full p-0 bg-foreground border-foreground text-primary-foreground gap-0 [&>button]:bg-foreground/70 [&>button]:text-primary-foreground [&>button]:rounded-none [&>button]:p-2 [&>button]:hover:bg-primary [&>button]:hover:opacity-100 [&>button]:opacity-100 [&>button]:right-3 [&>button]:top-3">
          {active && (
            <div className="relative">
              <img
                src={active.src}
                alt={active.title}
                className="w-full h-auto max-h-[80vh] object-contain bg-foreground"
              />
              {/* Header overlay */}
              <div className="absolute top-0 inset-x-0 p-4 md:p-6 pr-16 md:pr-20 bg-gradient-to-b from-foreground/80 to-transparent text-primary-foreground">
                <span className="inline-block px-2 py-0.5 bg-primary/90 text-primary-foreground text-[10px] uppercase tracking-widest font-bold mb-1.5">
                  {active.type}
                </span>
                <h3 className="text-lg md:text-2xl font-bold leading-tight">{active.title}</h3>
                {active.location && (
                  <p className="flex items-center gap-1 text-xs md:text-sm text-primary-foreground/70 mt-1">
                    <MapPin className="w-3.5 h-3.5" />
                    {active.location}
                  </p>
                )}
              </div>
              {/* Prev / Next */}
              {filteredProjects.length > 1 && (
                <>
                  <button
                    onClick={showPrev}
                    aria-label="Voriges Projekt"
                    className="absolute top-1/2 left-2 md:left-4 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 flex items-center justify-center bg-foreground/60 hover:bg-primary text-primary-foreground transition-colors"
                  >
                    <ChevronLeft className="w-5 h-5 md:w-6 md:h-6" />
                  </button>
                  <button
                    onClick={showNext}
                    aria-label="Nächstes Projekt"
                    className="absolute top-1/2 right-2 md:right-4 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 flex items-center justify-center bg-foreground/60 hover:bg-primary text-primary-foreground transition-colors"
                  >
                    <ChevronRight className="w-5 h-5 md:w-6 md:h-6" />
                  </button>
                </>
              )}
              {/* Counter */}
              <div className="absolute bottom-3 left-3 md:bottom-4 md:left-4 px-2 py-1 bg-foreground/70 text-primary-foreground text-[10px] md:text-xs font-headline tracking-widest">
                {(activeIdx ?? 0) + 1} / {filteredProjects.length}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </Layout>
  );
};

export default Referenzprojekte;
