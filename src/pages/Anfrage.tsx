import { useLocation, Link, useNavigate } from "react-router-dom";
import Layout from "@/components/Layout";
import { FadeIn } from "@/components/ScrollAnimations";
import { motion } from "framer-motion";
import { ArrowLeft, Check, Send } from "lucide-react";
import { useState } from "react";

interface ConfigData {
  model: string;
  width: number;
  depth: number;
  color: string;
  montage: string;
  extras: string[];
  totalPrice: number;
}

const Anfrage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const config = location.state as ConfigData | null;

  const [form, setForm] = useState({ name: "", email: "", phone: "", ort: "", message: "" });
  const [privacy, setPrivacy] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const formatPrice = (p: number) =>
    new Intl.NumberFormat("de-DE", { style: "currency", currency: "EUR" }).format(p);

  const handleChange = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!privacy) return;
    setSubmitted(true);
  };

  if (!config) {
    return (
      <Layout>
        <div className="pt-32 pb-24 text-center px-5">
          <h1 className="text-2xl font-bold mb-4">Keine Konfiguration gefunden</h1>
          <p className="text-secondary mb-8">Bitte konfigurieren Sie zuerst Ihre Überdachung.</p>
          <Link to="/konfigurator" className="bg-primary text-primary-foreground px-8 py-4 font-headline uppercase tracking-widest text-xs font-bold hover:bg-primary-container transition-all">
            Zum Konfigurator
          </Link>
        </div>
      </Layout>
    );
  }

  if (submitted) {
    return (
      <Layout>
        <div className="pt-32 pb-24 max-w-2xl mx-auto text-center px-5">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", duration: 0.6 }}
            className="w-20 h-20 bg-primary text-primary-foreground flex items-center justify-center mx-auto mb-8"
          >
            <Check className="w-10 h-10" />
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-3xl md:text-5xl font-bold tracking-tighter mb-4"
          >
            Anfrage gesendet!
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-secondary text-base md:text-lg mb-8"
          >
            Vielen Dank für Ihre Anfrage. Wir melden uns innerhalb von 24 Stunden bei Ihnen.
          </motion.p>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7 }}>
            <Link to="/" className="bg-primary text-primary-foreground px-8 py-4 font-headline uppercase tracking-widest text-xs font-bold hover:bg-primary-container transition-all">
              Zur Startseite
            </Link>
          </motion.div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="pt-24 md:pt-32 pb-16 md:pb-24">
        {/* Header */}
        <section className="max-w-5xl mx-auto px-5 md:px-8 mb-10 md:mb-16">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-secondary hover:text-primary transition-colors mb-6 text-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="font-headline uppercase tracking-widest text-xs font-bold">Zurück zum Konfigurator</span>
          </button>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-[2rem] sm:text-5xl md:text-7xl font-bold tracking-tighter leading-[0.9] mb-4 break-words"
          >
            Ihre <span className="text-primary">Anfrage.</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-secondary text-base md:text-lg max-w-xl"
          >
            Prüfen Sie Ihre Konfiguration und senden Sie uns Ihre Kontaktdaten für ein unverbindliches Angebot.
          </motion.p>
        </section>

        <section className="max-w-5xl mx-auto px-5 md:px-8 grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12">
          {/* Summary */}
          <FadeIn direction="up" className="lg:col-span-5">
            <div className="bg-surface-container-low p-6 md:p-8 sticky top-28">
              <h2 className="text-xs font-headline uppercase tracking-widest font-bold text-primary mb-6 flex items-center gap-3">
                <span className="w-0.5 h-5 bg-primary" />
                Ihre Konfiguration
              </h2>

              <div className="space-y-4">
                <SummaryRow label="Modell" value={config.model} />
                <SummaryRow label="Maße" value={`${config.width.toFixed(1)}m × ${config.depth.toFixed(1)}m`} />
                <SummaryRow label="Fläche" value={`${(config.width * config.depth).toFixed(1)} m²`} />
                <SummaryRow label="Farbe" value={config.color} />
                <SummaryRow label="Montage" value={config.montage} />

                {config.extras.length > 0 && (
                  <div>
                    <p className="text-[10px] uppercase tracking-widest text-outline font-bold mb-2">Extras</p>
                    <div className="flex flex-wrap gap-2">
                      {config.extras.map((extra) => (
                        <span key={extra} className="text-xs bg-primary/10 text-primary px-3 py-1 font-bold">
                          {extra}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="mt-8 pt-6 border-t border-outline-variant/20">
                <div className="flex justify-between items-end">
                  <span className="text-xs uppercase tracking-widest text-secondary font-bold">Geschätzter Preis</span>
                  <span className="text-2xl md:text-3xl font-headline font-bold text-primary">{formatPrice(config.totalPrice)}</span>
                </div>
                <p className="text-[10px] text-secondary mt-2">* Unverbindlicher Richtpreis inkl. Montage</p>
              </div>
            </div>
          </FadeIn>

          {/* Contact Form */}
          <FadeIn direction="up" delay={0.15} className="lg:col-span-7">
            <div className="bg-card p-6 md:p-10 shadow-[20px_20px_40px_rgba(28,27,27,0.04)]">
              <h2 className="text-xl md:text-2xl font-bold mb-6 md:mb-8 tracking-tight">Kontaktdaten</h2>
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

                <button
                  type="submit"
                  className="w-full bg-primary text-primary-foreground font-headline uppercase tracking-widest text-xs md:text-sm px-10 py-4 md:py-5 hover:bg-primary-container transition-all duration-150 flex items-center justify-center gap-3"
                >
                  <Send className="w-4 h-4" />
                  Anfrage Absenden
                </button>
              </form>
            </div>
          </FadeIn>
        </section>
      </div>
    </Layout>
  );
};

const SummaryRow = ({ label, value }: { label: string; value: string }) => (
  <div className="flex justify-between items-baseline">
    <span className="text-[10px] uppercase tracking-widest text-outline font-bold">{label}</span>
    <span className="text-sm font-bold">{value}</span>
  </div>
);

const InputField = ({
  label, placeholder, type, value, onChange, required
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
