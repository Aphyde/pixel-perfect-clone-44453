import Layout from "@/components/Layout";
import heroWartung from "@/assets/hero-wartung.jpg";
import { Check, Send, ArrowRight, ArrowLeft, ShieldCheck, Sparkles, Wrench, Droplets, X, Image as ImageIcon } from "lucide-react";
import { Link } from "react-router-dom";
import { FadeIn, StaggerContainer, StaggerItem, RevealLine } from "@/components/ScrollAnimations";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef } from "react";

const packages = [
  {
    id: "basis",
    name: "Basis-Reinigung",
    price: "ab 189 €",
    icon: Sparkles,
    desc: "Professionelle Reinigung Ihrer Überdachung für dauerhaften Glanz und Schutz.",
    features: [
      "Glasreinigung aller Dachflächen",
      "Rinnen & Ablaufreinigung",
      "Sichtprüfung der Konstruktion",
      "Moos- & Algenentfernung",
    ],
    popular: false,
  },
  {
    id: "premium",
    name: "Premium-Wartung",
    price: "ab 349 €",
    icon: ShieldCheck,
    desc: "Umfassende Inspektion und Pflege für maximale Langlebigkeit Ihrer Anlage.",
    features: [
      "Alles aus Basis-Reinigung",
      "Dichtungsprüfung & Nachjustierung",
      "Beschattungssystem-Check",
      "Schmierung aller Scharniere",
      "Prüfbericht mit Fotodokumentation",
      "10% Rabatt auf Ersatzteile",
    ],
    popular: true,
  },
  {
    id: "impraegnierung",
    name: "Glas-Imprägnierung",
    price: "ab 249 €",
    icon: Droplets,
    desc: "Langanhaltender Lotus-Effekt für selbstreinigende Glasflächen – weniger Schmutz, weniger Pflegeaufwand.",
    features: [
      "Professionelle Glasreinigung vorab",
      "Nano-Imprägnierung aller Glasflächen",
      "Lotus-Effekt für Selbstreinigung",
      "Schutz vor Kalk & Grünbelag",
      "Haltbarkeit bis zu 5 Jahre",
      "Reduziert künftigen Reinigungsaufwand",
    ],
    popular: false,
  },
  {
    id: "reparatur",
    name: "Reparatur-Service",
    price: "auf Anfrage",
    icon: Wrench,
    desc: "Schnelle Hilfe bei Schäden, Verschleiß oder Funktionsstörungen.",
    features: [
      "Vor-Ort-Diagnose",
      "Glasscheiben-Austausch",
      "Motor- & Antriebsreparatur",
      "Dichtungs-Erneuerung",
      "Sturmschaden-Behebung",
      "Garantie-Abwicklung",
    ],
    popular: false,
  },
];

const STEPS = [
  { label: "Paket", num: 1 },
  { label: "Details", num: 2 },
  { label: "Kontakt", num: 3 },
];

const Wartungspakete = () => {
  const [selectedPkg, setSelectedPkg] = useState<string | null>(null);
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    adresse: "",
    produktTyp: "",
    baujahr: "",
    message: "",
  });
  const [files, setFiles] = useState<File[]>([]);
  const [privacy, setPrivacy] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleChange = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFiles((prev) => [...prev, ...Array.from(e.target.files!)].slice(0, 5));
    }
  };

  const removeFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = () => {
    if (!privacy) return;
    setSubmitted(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const canNext = () => {
    if (step === 1) return !!selectedPkg;
    if (step === 2) return form.adresse && form.produktTyp;
    if (step === 3) return form.name && form.email && privacy;
    return true;
  };

  const selectedPackage = packages.find((p) => p.id === selectedPkg);

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
            Wartung beauftragt!
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-secondary text-base md:text-lg mb-4"
          >
            Vielen Dank für Ihre Beauftragung des <strong>{selectedPackage?.name}</strong>-Pakets.
          </motion.p>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="text-secondary text-sm mb-8"
          >
            Wir melden uns innerhalb von 24 Stunden bei Ihnen, um einen Termin zu vereinbaren.
          </motion.p>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }}>
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
      {/* Hero */}
      <section className="relative h-[50svh] min-h-[350px] max-h-[600px] flex items-center overflow-hidden pt-16 md:pt-24">
        <div className="absolute inset-0 z-0">
          <motion.img
            src={heroWartung}
            className="w-full h-full object-cover"
            width={1920}
            height={1080}
            alt="Wartung"
            initial={{ scale: 1.15 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1.8, ease: [0.22, 1, 0.36, 1] }}
          />
          <div className="absolute inset-0 bg-foreground/50" />
        </div>
        <div className="container mx-auto px-5 md:px-8 relative z-10">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-primary uppercase tracking-[0.2em] md:tracking-[0.3em] mb-3 text-xs md:text-sm font-bold"
          >
            Pflege & Instandhaltung
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="text-primary-foreground text-[2rem] sm:text-5xl md:text-7xl font-bold leading-none tracking-tighter mb-4 break-words"
          >
            Wartungs&shy;pakete.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="text-primary-foreground/80 text-sm md:text-lg max-w-xl"
          >
            Professionelle Pflege für Ihre Überdachung – wählen Sie Ihr Paket und beauftragen Sie direkt online.
          </motion.p>
        </div>
      </section>

      {/* Packages */}
      <section className="py-16 md:py-24 bg-surface">
        <div className="container mx-auto px-5 md:px-8">
          <div className="mb-10 md:mb-16">
            <FadeIn>
              <label className="text-primary text-[10px] md:text-xs font-bold tracking-[0.4em] uppercase mb-3 block">Unsere Pakete</label>
              <h2 className="text-3xl md:text-5xl font-bold tracking-tighter">Wählen Sie Ihr Wartungspaket.</h2>
            </FadeIn>
          </div>

          {/* Mobile: swipe */}
          <div className="md:hidden -mx-5">
            <div className="flex gap-4 overflow-x-auto px-5 pb-4 snap-x snap-mandatory scrollbar-hide" style={{ WebkitOverflowScrolling: 'touch' }}>
              {packages.map((pkg) => (
                <PackageCard
                  key={pkg.id}
                  pkg={pkg}
                  selected={selectedPkg === pkg.id}
                  onSelect={() => setSelectedPkg(pkg.id)}
                  className="snap-start shrink-0 w-[82vw] max-w-[340px]"
                />
              ))}
            </div>
          </div>

          {/* Desktop: grid */}
          <StaggerContainer className="hidden md:grid grid-cols-3 gap-6" staggerDelay={0.15}>
            {packages.map((pkg) => (
              <StaggerItem key={pkg.id}>
                <PackageCard
                  pkg={pkg}
                  selected={selectedPkg === pkg.id}
                  onSelect={() => setSelectedPkg(pkg.id)}
                />
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Booking Form */}
      {selectedPkg && (
        <section className="py-16 md:py-24 bg-surface-container-low" id="beauftragen">
          <div className="container mx-auto px-5 md:px-8 max-w-3xl">
            <FadeIn>
              <div className="bg-card p-6 md:p-12 shadow-[20px_20px_40px_rgba(28,27,27,0.04)]">
                <div className="flex items-center gap-3 mb-2">
                  <span className="bg-primary/10 text-primary px-3 py-1 text-xs font-bold">{selectedPackage?.name}</span>
                  <span className="text-sm text-secondary">{selectedPackage?.price}</span>
                </div>
                <h2 className="text-xl md:text-3xl font-bold mb-8 tracking-tight">Wartung beauftragen</h2>

                {/* Step indicator */}
                <div className="flex items-center gap-0 mb-8">
                  {STEPS.map((s, i) => (
                    <div key={s.num} className="flex items-center flex-1">
                      <div className="flex flex-col items-center flex-1">
                        <div
                          className={`w-9 h-9 flex items-center justify-center text-xs font-bold transition-all ${
                            step >= s.num
                              ? "bg-primary text-primary-foreground"
                              : "bg-surface-container-high text-secondary"
                          }`}
                        >
                          {step > s.num ? <Check className="w-4 h-4" /> : s.num}
                        </div>
                        <span className="text-[9px] uppercase tracking-widest font-bold mt-1.5 text-secondary">{s.label}</span>
                      </div>
                      {i < STEPS.length - 1 && (
                        <div className={`h-0.5 flex-1 -mt-4 ${step > s.num ? "bg-primary" : "bg-outline-variant/30"}`} />
                      )}
                    </div>
                  ))}
                </div>

                <AnimatePresence mode="wait">
                  <motion.div
                    key={step}
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -30 }}
                    transition={{ duration: 0.25 }}
                  >
                    {step === 1 && (
                      <div className="space-y-5">
                        <p className="text-sm text-secondary">Sie haben <strong>{selectedPackage?.name}</strong> gewählt. Geben Sie uns Details zu Ihrer Überdachung.</p>
                        <div>
                          <label className="block text-[10px] uppercase tracking-widest text-outline font-bold mb-3">Produkttyp</label>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                            {["Terrassenüberdachung", "Carport", "Wintergarten", "Sonstiges"].map((typ) => (
                              <button
                                key={typ}
                                type="button"
                                onClick={() => handleChange("produktTyp", typ)}
                                className={`text-left px-4 py-3 text-sm font-bold border-2 transition-all ${
                                  form.produktTyp === typ
                                    ? "border-primary bg-primary/5 text-primary"
                                    : "border-outline-variant/20 text-foreground hover:border-outline-variant/40"
                                }`}
                              >
                                {typ}
                              </button>
                            ))}
                          </div>
                        </div>
                        <div>
                          <label className="block text-[10px] uppercase tracking-widest text-outline font-bold mb-2">Adresse / Standort *</label>
                          <input
                            className="w-full bg-transparent border-b-2 border-outline-variant focus:border-primary focus:ring-0 transition-colors py-2 px-0 text-foreground placeholder:text-outline-variant/50 outline-none text-sm"
                            placeholder="Straße, PLZ Ort"
                            type="text"
                            value={form.adresse}
                            onChange={(e) => handleChange("adresse", e.target.value)}
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] uppercase tracking-widest text-outline font-bold mb-2">Baujahr der Überdachung (optional)</label>
                          <input
                            className="w-full bg-transparent border-b-2 border-outline-variant focus:border-primary focus:ring-0 transition-colors py-2 px-0 text-foreground placeholder:text-outline-variant/50 outline-none text-sm"
                            placeholder="z.B. 2019"
                            type="text"
                            value={form.baujahr}
                            onChange={(e) => handleChange("baujahr", e.target.value)}
                          />
                        </div>
                      </div>
                    )}

                    {step === 2 && (
                      <div className="space-y-5">
                        <p className="text-sm text-secondary">Beschreiben Sie den Zustand oder besondere Wünsche. Optional: Fotos hochladen.</p>
                        <div>
                          <label className="block text-[10px] uppercase tracking-widest text-outline font-bold mb-2">Anmerkungen (optional)</label>
                          <textarea
                            className="w-full bg-transparent border-b-2 border-outline-variant focus:border-primary focus:ring-0 transition-colors py-2 px-0 text-foreground placeholder:text-outline-variant/50 resize-none outline-none text-sm"
                            placeholder="Z.B. Glasscheibe hat einen Riss, Rinne verstopft..."
                            rows={3}
                            value={form.message}
                            onChange={(e) => handleChange("message", e.target.value)}
                          />
                        </div>
                        <div
                          onClick={() => fileInputRef.current?.click()}
                          className="bg-surface-container-low p-6 border-2 border-dashed border-outline-variant/30 flex flex-col items-center justify-center text-center cursor-pointer hover:border-primary/30 transition-colors"
                        >
                          <ImageIcon className="w-8 h-8 text-outline-variant mb-2" />
                          <p className="text-sm font-bold mb-1">Fotos hinzufügen</p>
                          <p className="text-[11px] text-secondary">JPG, PNG bis 10MB · max. 5 Dateien</p>
                          <input
                            ref={fileInputRef}
                            className="hidden"
                            type="file"
                            accept="image/*"
                            multiple
                            onChange={handleFileChange}
                          />
                        </div>
                        {files.length > 0 && (
                          <div className="space-y-2">
                            {files.map((file, i) => (
                              <div key={i} className="flex items-center gap-3 bg-surface-container-low px-4 py-3">
                                <ImageIcon className="w-4 h-4 text-primary shrink-0" />
                                <span className="text-sm truncate flex-1">{file.name}</span>
                                <button onClick={() => removeFile(i)} className="text-secondary hover:text-foreground">
                                  <X className="w-4 h-4" />
                                </button>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    )}

                    {step === 3 && (
                      <div className="space-y-5">
                        <p className="text-sm text-secondary">Wie können wir Sie für die Terminvereinbarung erreichen?</p>
                        <div>
                          <label className="block text-[10px] uppercase tracking-widest text-outline font-bold mb-2">Name *</label>
                          <input
                            className="w-full bg-transparent border-b-2 border-outline-variant focus:border-primary focus:ring-0 transition-colors py-2 px-0 text-foreground placeholder:text-outline-variant/50 outline-none text-sm"
                            placeholder="Vor- und Nachname"
                            type="text"
                            value={form.name}
                            onChange={(e) => handleChange("name", e.target.value)}
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] uppercase tracking-widest text-outline font-bold mb-2">E-Mail Adresse *</label>
                          <input
                            className="w-full bg-transparent border-b-2 border-outline-variant focus:border-primary focus:ring-0 transition-colors py-2 px-0 text-foreground placeholder:text-outline-variant/50 outline-none text-sm"
                            placeholder="mail@beispiel.de"
                            type="email"
                            value={form.email}
                            onChange={(e) => handleChange("email", e.target.value)}
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] uppercase tracking-widest text-outline font-bold mb-2">Telefonnummer (optional)</label>
                          <input
                            className="w-full bg-transparent border-b-2 border-outline-variant focus:border-primary focus:ring-0 transition-colors py-2 px-0 text-foreground placeholder:text-outline-variant/50 outline-none text-sm"
                            placeholder="+49 --- -------"
                            type="tel"
                            value={form.phone}
                            onChange={(e) => handleChange("phone", e.target.value)}
                          />
                        </div>
                        <div className="flex items-start gap-3 pt-2">
                          <input
                            className="w-5 h-5 border-2 border-outline-variant text-primary focus:ring-primary mt-0.5 shrink-0"
                            id="privacy-wartung"
                            type="checkbox"
                            checked={privacy}
                            onChange={(e) => setPrivacy(e.target.checked)}
                          />
                          <label className="text-[11px] text-secondary leading-tight" htmlFor="privacy-wartung">
                            Ich habe die <a className="text-primary underline" href="/datenschutz">Datenschutzerklärung</a> zur Kenntnis genommen und stimme der Verarbeitung meiner Daten zu.
                          </label>
                        </div>
                      </div>
                    )}
                  </motion.div>
                </AnimatePresence>

                {/* Nav buttons */}
                <div className="flex gap-3 mt-8">
                  {step > 1 && (
                    <button
                      type="button"
                      onClick={() => setStep(step - 1)}
                      className="flex-1 border border-outline-variant/30 text-foreground px-6 py-4 font-headline uppercase tracking-widest text-xs font-bold hover:bg-surface-container-high transition-all flex items-center justify-center gap-2"
                    >
                      <ArrowLeft className="w-4 h-4" /> Zurück
                    </button>
                  )}
                  {step < 3 ? (
                    <button
                      type="button"
                      onClick={() => canNext() && setStep(step + 1)}
                      disabled={!canNext()}
                      className={`flex-1 px-6 py-4 font-headline uppercase tracking-widest text-xs font-bold transition-all flex items-center justify-center gap-2 ${
                        canNext()
                          ? "bg-primary text-primary-foreground hover:bg-primary-container"
                          : "bg-outline-variant/20 text-secondary cursor-not-allowed"
                      }`}
                    >
                      Weiter <ArrowRight className="w-4 h-4" />
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={handleSubmit}
                      disabled={!canNext()}
                      className={`flex-1 px-6 py-4 font-headline uppercase tracking-widest text-xs font-bold transition-all flex items-center justify-center gap-2 ${
                        canNext()
                          ? "bg-primary text-primary-foreground hover:bg-primary-container"
                          : "bg-outline-variant/20 text-secondary cursor-not-allowed"
                      }`}
                    >
                      <Send className="w-4 h-4" /> Beauftragen
                    </button>
                  )}
                </div>
              </div>
            </FadeIn>
          </div>
        </section>
      )}

      {/* CTA if no package selected */}
      {!selectedPkg && (
        <section className="py-16 md:py-24 bg-foreground text-primary-foreground">
          <div className="container mx-auto px-5 md:px-8 text-center">
            <FadeIn>
              <h2 className="text-2xl md:text-4xl font-bold mb-4 tracking-tight">Nicht sicher, welches Paket?</h2>
              <p className="text-primary-foreground/60 text-sm md:text-lg mb-8 max-w-xl mx-auto">Kontaktieren Sie uns – wir beraten Sie gerne und finden das passende Wartungspaket für Ihre Anlage.</p>
              <Link to="/kontakt" className="inline-block bg-primary text-primary-foreground px-10 py-5 font-bold uppercase tracking-widest text-xs md:text-sm hover:bg-primary-container transition-all">
                Beratung anfragen
              </Link>
            </FadeIn>
          </div>
        </section>
      )}
    </Layout>
  );
};

const PackageCard = ({
  pkg,
  selected,
  onSelect,
  className = "",
}: {
  pkg: typeof packages[0];
  selected: boolean;
  onSelect: () => void;
  className?: string;
}) => {
  const Icon = pkg.icon;
  return (
    <div
      className={`relative bg-card p-6 md:p-8 border-2 transition-all cursor-pointer ${
        selected
          ? "border-primary shadow-[0_10px_40px_rgba(0,0,0,0.08)]"
          : "border-outline-variant/20 hover:border-outline-variant/40"
      } ${className}`}
      onClick={onSelect}
    >
      {pkg.popular && (
        <span className="absolute -top-3 left-6 bg-primary text-primary-foreground text-[10px] font-bold uppercase tracking-widest px-3 py-1">
          Beliebt
        </span>
      )}
      <Icon className={`w-8 h-8 mb-4 ${selected ? "text-primary" : "text-secondary"}`} />
      <h3 className="text-lg md:text-xl font-bold mb-1">{pkg.name}</h3>
      <p className="text-xl md:text-2xl font-headline font-bold text-primary mb-3">{pkg.price}</p>
      <p className="text-sm text-secondary mb-5">{pkg.desc}</p>
      <ul className="space-y-2.5 mb-6">
        {pkg.features.map((f) => (
          <li key={f} className="flex items-start gap-2 text-sm">
            <Check className="w-4 h-4 text-primary shrink-0 mt-0.5" />
            <span>{f}</span>
          </li>
        ))}
      </ul>
      <button
        className={`w-full py-3 font-headline uppercase tracking-widest text-xs font-bold transition-all ${
          selected
            ? "bg-primary text-primary-foreground"
            : "border border-outline-variant/30 text-foreground hover:border-primary hover:text-primary"
        }`}
      >
        {selected ? "Ausgewählt ✓" : "Auswählen"}
      </button>
    </div>
  );
};

export default Wartungspakete;
