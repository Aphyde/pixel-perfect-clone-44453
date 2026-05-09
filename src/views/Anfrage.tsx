"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import Layout from "@/components/Layout";
import { FadeIn, ScaleIn } from "@/components/ScrollAnimations";
import { m } from "framer-motion";
import { ArrowLeft, ArrowRight, Check, Send, ShieldCheck, Heart, Truck, MessageCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { categories } from "@/data/products";
import { configurators } from "@/data/configurators";

interface ConfigOption {
  label: string;
  value: string;
}

interface ConfigData {
  category?: string;
  categorySlug?: string;
  options?: ConfigOption[];
  width?: number;
  depth?: number;
  extras?: string[];
  totalPrice?: number;
  deliveryTime?: string;
  // Legacy support (alte Terrassen-Konfigurator-Felder)
  model?: string;
  color?: string;
  montage?: string;
  roof?: string;
}

const SESSION_KEY = "brait:lastConfig";

const Anfrage = () => {
  const router = useRouter();
  const [config, setConfig] = useState<ConfigData | null>(null);
  const [hydrated, setHydrated] = useState(false);

  // Lese die zuletzt gespeicherte Konfiguration aus sessionStorage (vom
  // Konfigurator gesetzt). Wir hydraten clientseitig, damit Anfrage-State
  // einen Reload überlebt und es keinen Hydration-Mismatch gibt.
  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const raw = sessionStorage.getItem(SESSION_KEY);
      if (raw) setConfig(JSON.parse(raw) as ConfigData);
    } catch {
      // ignore
    }
    setHydrated(true);
  }, []);

  const [form, setForm] = useState({ name: "", email: "", phone: "", ort: "", message: "" });
  const [privacy, setPrivacy] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const formatPrice = (p: number) =>
    new Intl.NumberFormat("de-DE", { style: "currency", currency: "EUR" }).format(p);

  const handleChange = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!privacy || submitting) return;
    setSubmitting(true);
    setError(null);
    try {
      const res = await fetch("/api/anfrage", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, privacy, config }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setError(typeof data?.error === "string" ? data.error : "Anfrage konnte nicht gesendet werden.");
        return;
      }
      if (typeof window !== "undefined") {
        try {
          sessionStorage.removeItem(SESSION_KEY);
        } catch {
          // ignore
        }
      }
      setSubmitted(true);
    } catch (err) {
      console.error("anfrage submit failed", err);
      setError("Verbindung fehlgeschlagen. Bitte später erneut versuchen.");
    } finally {
      setSubmitting(false);
    }
  };

  // Vor Hydration nichts spezifisches zur Konfiguration rendern, damit
  // Server- und Client-HTML übereinstimmen.
  if (!hydrated || !config) {
    // Kein Konfigurations-State übergeben → Produktauswahl-Landing zeigen.
    // Jede Kategorie führt entweder direkt in den Konfigurator (falls vorhanden)
    // oder zur Produktdetailseite mit anschließender Kontaktaufnahme-Möglichkeit.
    return (
      <Layout>
        <div className="pt-24 md:pt-32 pb-16 md:pb-24">
          {/* Trust banner */}
          <div className="bg-primary/10 border-b border-primary/20">
            <div className="max-w-5xl mx-auto px-5 md:px-8 py-3 flex flex-wrap items-center justify-center gap-x-6 gap-y-1 text-xs md:text-sm">
              <span className="flex items-center gap-2 font-bold text-primary">
                <ShieldCheck className="w-4 h-4" /> 100 % kostenlos & unverbindlich
              </span>
              <span className="hidden md:flex items-center gap-2 text-secondary">
                <Heart className="w-4 h-4 text-primary" /> Ohne Kaufverpflichtung
              </span>
              <span className="hidden md:flex items-center gap-2 text-secondary">
                <Check className="w-4 h-4 text-primary" /> Antwort innerhalb von 24 h
              </span>
            </div>
          </div>

          {/* Header */}
          <section className="max-w-5xl mx-auto px-5 md:px-8 mb-10 md:mb-16 mt-8 md:mt-12">
            <button
              onClick={() => router.back()}
              className="flex items-center gap-2 text-secondary hover:text-primary transition-colors mb-6 text-sm"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="font-headline uppercase tracking-widest text-xs font-bold">Zurück</span>
            </button>
            <m.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="text-[2rem] sm:text-5xl md:text-7xl font-bold tracking-tighter leading-[0.9] mb-4 break-words"
            >
              Ihr <span className="text-primary">Angebot.</span>
            </m.h1>
            <m.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-secondary text-base md:text-lg max-w-2xl"
            >
              Wählen Sie das Produkt, für das Sie ein kostenloses, unverbindliches Angebot wünschen — wir starten direkt mit dem passenden Konfigurator.
            </m.p>
          </section>

          {/* Produktauswahl */}
          <section className="max-w-6xl mx-auto px-5 md:px-8">
            <div className="flex items-baseline justify-between mb-6 md:mb-8">
              <h2 className="text-xs md:text-sm font-headline uppercase tracking-widest font-bold text-primary flex items-center gap-3">
                <span className="w-0.5 h-4 bg-primary" />
                Unsere Produkte
              </h2>
              <span className="text-[10px] md:text-xs text-secondary uppercase tracking-widest">
                {categories.length} Kategorien
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
              {categories.map((cat, i) => {
                const hasConfigurator = configurators[cat.slug] !== undefined;
                const target = hasConfigurator ? `/konfigurator/${cat.slug}` : `/${cat.slug}`;
                return (
                  <ScaleIn key={cat.slug} delay={Math.min(i * 0.05, 0.4)}>
                    <Link
                      href={target}
                      className="group relative block aspect-[4/3] overflow-hidden bg-foreground"
                    >
                      <img
                        src={cat.image}
                        alt={cat.label}
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-foreground via-foreground/60 to-foreground/10 group-hover:via-foreground/40 transition-all" />
                      <div className="absolute inset-x-0 bottom-0 p-4 md:p-5 text-primary-foreground">
                        <span className="inline-block px-2 py-0.5 bg-primary/90 text-primary-foreground text-[9px] uppercase tracking-widest font-bold mb-1.5">
                          {hasConfigurator ? "Konfigurator" : "Anfrage"}
                        </span>
                        <h3 className="text-base md:text-lg font-bold leading-tight mb-1">{cat.label}</h3>
                        <p className="text-[11px] md:text-xs text-primary-foreground/70 line-clamp-2 mb-2">
                          {cat.shortDesc}
                        </p>
                        <span className="inline-flex items-center gap-1.5 text-[10px] uppercase tracking-widest font-bold text-primary-foreground/90 group-hover:text-primary transition-colors">
                          {hasConfigurator ? "Jetzt konfigurieren" : "Mehr erfahren"}
                          <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-0.5" />
                        </span>
                      </div>
                    </Link>
                  </ScaleIn>
                );
              })}
            </div>

            {/* Direktanfrage-Fallback */}
            <FadeIn delay={0.4} className="mt-10 md:mt-14">
              <div className="bg-surface-container-low p-6 md:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 md:gap-8 border-l-4 border-primary">
                <div>
                  <h3 className="text-base md:text-lg font-bold mb-1 flex items-center gap-2">
                    <MessageCircle className="w-5 h-5 text-primary" />
                    Lieber direkt schreiben?
                  </h3>
                  <p className="text-sm text-secondary leading-relaxed">
                    Sie wissen schon genau, was Sie möchten, oder haben spezielle Fragen — wir antworten innerhalb von 24 Stunden.
                  </p>
                </div>
                <Link
                  href="/kontakt"
                  className="shrink-0 inline-flex items-center gap-3 bg-primary text-primary-foreground px-6 md:px-8 py-3 md:py-4 font-headline uppercase tracking-widest text-xs font-bold hover:bg-primary-container transition-all"
                >
                  Zum Kontaktformular
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </FadeIn>
          </section>
        </div>
      </Layout>
    );
  }

  if (submitted) {
    return (
      <Layout>
        <div className="pt-32 pb-24 max-w-2xl mx-auto text-center px-5">
          <m.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", duration: 0.6 }}
            className="w-20 h-20 bg-primary text-primary-foreground flex items-center justify-center mx-auto mb-8"
          >
            <Check className="w-10 h-10" />
          </m.div>
          <m.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-3xl md:text-5xl font-bold tracking-tighter mb-4"
          >
            Anfrage gesendet!
          </m.h1>
          <m.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-secondary text-base md:text-lg mb-8"
          >
            Vielen Dank für Ihre unverbindliche Anfrage. Wir melden uns kostenlos innerhalb von 24 Stunden bei Ihnen.
          </m.p>
          <m.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7 }}>
            <Link href="/" className="bg-primary text-primary-foreground px-8 py-4 font-headline uppercase tracking-widest text-xs font-bold hover:bg-primary-container transition-all">
              Zur Startseite
            </Link>
          </m.div>
        </div>
      </Layout>
    );
  }

  // Build a unified options list (new format + legacy fallback)
  const unifiedOptions: ConfigOption[] = config.options ? [...config.options] : [];
  if (!config.options) {
    if (config.model) unifiedOptions.push({ label: "Modell", value: config.model });
    if (config.montage) unifiedOptions.push({ label: "Montage", value: config.montage });
    if (config.roof) unifiedOptions.push({ label: "Dachdeckung", value: config.roof });
    if (config.color) unifiedOptions.push({ label: "Farbe", value: config.color });
  }

  const hasDimensions = config.width !== undefined && config.depth !== undefined;
  const extras = config.extras ?? [];
  const categoryLabel = config.category ?? "Konfiguration";

  return (
    <Layout>
      <div className="pt-24 md:pt-32 pb-16 md:pb-24">
        {/* Trust banner */}
        <div className="bg-primary/10 border-b border-primary/20">
          <div className="max-w-5xl mx-auto px-5 md:px-8 py-3 flex flex-wrap items-center justify-center gap-x-6 gap-y-1 text-xs md:text-sm">
            <span className="flex items-center gap-2 font-bold text-primary">
              <ShieldCheck className="w-4 h-4" /> 100 % kostenlos & unverbindlich
            </span>
            <span className="hidden md:flex items-center gap-2 text-secondary">
              <Heart className="w-4 h-4 text-primary" /> Ohne Kaufverpflichtung
            </span>
            <span className="hidden md:flex items-center gap-2 text-secondary">
              <Check className="w-4 h-4 text-primary" /> Antwort innerhalb von 24 h
            </span>
          </div>
        </div>

        {/* Header */}
        <section className="max-w-5xl mx-auto px-5 md:px-8 mb-10 md:mb-16 mt-8 md:mt-12">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 text-secondary hover:text-primary transition-colors mb-6 text-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="font-headline uppercase tracking-widest text-xs font-bold">Zurück zum Konfigurator</span>
          </button>
          <m.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-[2rem] sm:text-5xl md:text-7xl font-bold tracking-tighter leading-[0.9] mb-4 break-words"
          >
            Ihre <span className="text-primary">Anfrage.</span>
          </m.h1>
          <m.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-secondary text-base md:text-lg max-w-xl"
          >
            Prüfen Sie Ihre Konfiguration und senden Sie uns Ihre Kontaktdaten – kostenlos und unverbindlich.
          </m.p>
        </section>

        <section className="max-w-5xl mx-auto px-5 md:px-8 grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12">
          {/* Summary */}
          <FadeIn direction="up" className="lg:col-span-5">
            <div className="bg-surface-container-low p-6 md:p-8 sticky top-28">
              <h2 className="text-xs font-headline uppercase tracking-widest font-bold text-primary mb-2 flex items-center gap-3">
                <span className="w-0.5 h-5 bg-primary" />
                {categoryLabel}
              </h2>
              <p className="text-[10px] text-secondary mb-6 ml-3 uppercase tracking-widest">Ihre Konfiguration</p>

              <div className="space-y-4">
                {unifiedOptions.map((o) => (
                  <SummaryRow key={o.label} label={o.label} value={o.value} />
                ))}
                {hasDimensions && (
                  <>
                    <SummaryRow label="Maße" value={`${config.width!.toFixed(1)}m × ${config.depth!.toFixed(1)}m`} />
                    <SummaryRow label="Fläche" value={`${(config.width! * config.depth!).toFixed(1)} m²`} />
                  </>
                )}

                {extras.length > 0 && (
                  <div>
                    <p className="text-[10px] uppercase tracking-widest text-outline font-bold mb-2">Extras</p>
                    <div className="flex flex-wrap gap-2">
                      {extras.map((extra) => (
                        <span key={extra} className="text-xs bg-primary/10 text-primary px-3 py-1 font-bold">
                          {extra}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {config.totalPrice !== undefined && (
                <div className="mt-8 pt-6 border-t border-outline-variant/20">
                  <div className="flex justify-between items-end">
                    <span className="text-xs uppercase tracking-widest text-secondary font-bold">Geschätzter Preis</span>
                    <span className="text-2xl md:text-3xl font-headline font-bold text-primary">{formatPrice(config.totalPrice)}</span>
                  </div>
                  <p className="text-[10px] text-secondary mt-2">inkl. MwSt. & Montage · Endgültiges Angebot nach Beratung</p>
                </div>
              )}

              {config.deliveryTime && (
                <div className="mt-4 pt-4 border-t border-outline-variant/20 flex items-center gap-3">
                  <div className="w-9 h-9 bg-primary/10 flex items-center justify-center shrink-0">
                    <Truck className="w-4 h-4 text-primary" />
                  </div>
                  <div className="leading-tight">
                    <p className="text-[10px] uppercase tracking-widest text-outline font-bold">Voraussichtliche Lieferzeit</p>
                    <p className="text-sm font-bold text-foreground">{config.deliveryTime} ab Auftragsbestätigung</p>
                  </div>
                </div>
              )}
            </div>
          </FadeIn>

          {/* Contact Form */}
          <FadeIn direction="up" delay={0.15} className="lg:col-span-7">
            <div className="bg-card p-6 md:p-10 shadow-[20px_20px_40px_rgba(28,27,27,0.04)]">
              <h2 className="text-xl md:text-2xl font-bold mb-2 tracking-tight">Kontaktdaten</h2>
              <p className="text-xs md:text-sm text-secondary mb-6 md:mb-8">
                Mit dem Absenden geben Sie noch keine Bestellung ab – Sie erhalten ein kostenloses, unverbindliches Angebot.
              </p>
              <form className="space-y-5 md:space-y-8" onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-8">
                  <InputField label="Name" placeholder="Vor- und Nachname" type="text" value={form.name} onChange={(v) => handleChange("name", v)} required />
                  <InputField label="E-Mail Adresse" placeholder="mail@beispiel.de" type="email" value={form.email} onChange={(v) => handleChange("email", v)} required />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-8">
                  <InputField label="Telefonnummer" placeholder="+49 --- -------" type="tel" value={form.phone} onChange={(v) => handleChange("phone", v)} />
                  <InputField label="Ort der Montage" placeholder="PLZ / Stadt" type="text" value={form.ort} onChange={(v) => handleChange("ort", v)} />
                </div>
                <div>
                  <label className="block text-[10px] uppercase tracking-widest text-outline font-bold mb-2">Nachricht (optional)</label>
                  <textarea
                    className="w-full bg-transparent border-b-2 border-outline-variant focus:border-primary focus:ring-0 transition-colors py-2 px-0 text-foreground placeholder:text-outline-variant/50 resize-none outline-none text-sm md:text-base"
                    placeholder="Besondere Wünsche oder Fragen..."
                    rows={3}
                    value={form.message}
                    onChange={(e) => handleChange("message", e.target.value)}
                  />
                </div>

                <div className="flex items-start gap-3">
                  <input
                    className="w-5 h-5 border-2 border-outline-variant text-primary focus:ring-primary mt-0.5 shrink-0"
                    id="privacy-anfrage"
                    type="checkbox"
                    checked={privacy}
                    onChange={(e) => setPrivacy(e.target.checked)}
                    required
                  />
                  <label className="text-[11px] md:text-xs text-secondary leading-tight" htmlFor="privacy-anfrage">
                    Ich habe die <a className="text-primary underline" href="/datenschutz">Datenschutzerklärung</a> zur Kenntnis genommen und stimme der Verarbeitung meiner Daten zu.
                  </label>
                </div>

                <div>
                  <button
                    type="submit"
                    disabled={submitting || !privacy}
                    className="w-full bg-primary text-primary-foreground font-headline uppercase tracking-widest text-xs md:text-sm px-10 py-4 md:py-5 hover:bg-primary-container transition-all duration-150 flex items-center justify-center gap-3 disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    <Send className="w-4 h-4" />
                    {submitting ? "Wird gesendet …" : "Unverbindliche Anfrage senden"}
                  </button>
                  {error && (
                    <p className="text-center text-[11px] text-destructive mt-3" role="alert">
                      {error}
                    </p>
                  )}
                  <p className="text-center text-[11px] text-secondary mt-3">
                    Kostenlos · Ohne Kaufverpflichtung · Antwort in 24 h
                  </p>
                </div>
              </form>
            </div>
          </FadeIn>
        </section>
      </div>
    </Layout>
  );
};

const SummaryRow = ({ label, value }: { label: string; value: string }) => (
  <div className="flex justify-between items-baseline gap-3">
    <span className="text-[10px] uppercase tracking-widest text-outline font-bold shrink-0">{label}</span>
    <span className="text-sm font-bold text-right">{value}</span>
  </div>
);

const InputField = ({
  label, placeholder, type, value, onChange, required,
}: { label: string; placeholder: string; type: string; value: string; onChange: (v: string) => void; required?: boolean }) => (
  <div>
    <label className="block text-[10px] uppercase tracking-widest text-outline font-bold mb-2">{label}</label>
    <input
      className="w-full bg-transparent border-b-2 border-outline-variant focus:border-primary focus:ring-0 transition-colors py-2 px-0 text-foreground placeholder:text-outline-variant/50 outline-none text-sm md:text-base"
      placeholder={placeholder}
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      required={required}
    />
  </div>
);

export default Anfrage;
