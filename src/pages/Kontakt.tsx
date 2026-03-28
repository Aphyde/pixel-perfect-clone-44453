import Layout from "@/components/Layout";
import { Phone, Mail, Clock, ShieldCheck, MapPin, Upload, ArrowRight, ArrowLeft, X, Check, Send, Image } from "lucide-react";
import mapUlm from "@/assets/map-ulm.jpg";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/ScrollAnimations";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef } from "react";
import { Link } from "react-router-dom";

const STEPS = [
  { label: "Projekt", num: 1 },
  { label: "Kontakt", num: 2 },
  { label: "Bilder", num: 3 },
];

const Kontakt = () => {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    produktTyp: "",
    ort: "",
    message: "",
    name: "",
    email: "",
    phone: "",
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!privacy) return;
    setSubmitted(true);
  };

  const canNext = () => {
    if (step === 1) return form.produktTyp && form.ort;
    if (step === 2) return form.name && form.email;
    return true;
  };

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
        {/* Hero */}
        <section className="max-w-7xl mx-auto px-5 md:px-8 mb-12 md:mb-24 grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 items-start">
          <div className="lg:col-span-7">
            <motion.p
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="font-headline uppercase tracking-[0.2em] md:tracking-[0.3em] text-primary text-xs md:text-sm mb-3 md:mb-4 font-bold"
            >
              Planung &amp; Realisierung
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="text-[2rem] sm:text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter leading-[0.9] mb-5 md:mb-8 break-words"
            >
              Ihr Projekt in <br /><span className="text-primary">Meisterhand.</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="text-base md:text-lg text-secondary max-w-xl leading-relaxed"
            >
              Vom ersten Entwurf bis zur finalen Montage in Ulm und Umgebung. Wir verwandeln Ihre Terrasse in einen architektonischen Lebensraum.
            </motion.p>
          </div>
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="lg:col-span-5 relative mt-4 lg:mt-0 hidden lg:block"
          >
            <div className="absolute -top-4 -left-4 w-12 h-[2px] bg-primary" />
            <div className="absolute -top-4 -left-4 w-[2px] h-12 bg-primary" />
            <div className="bg-surface-container-low p-12 flex flex-col justify-end relative overflow-hidden">
              <div className="relative z-10">
                <MapPin className="w-10 h-10 text-primary mb-4" />
                <h3 className="text-2xl font-bold mb-2">Showroom Ulm</h3>
                <p className="text-secondary">Blaubeurer Straße 12<br />89077 Ulm</p>
                <p className="text-primary font-bold mt-4">+49 (0) 731 123 456 78</p>
              </div>
            </div>
          </motion.div>
        </section>

        {/* Form & Info */}
        <section className="max-w-7xl mx-auto px-5 md:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12 md:gap-24">
          <FadeIn direction="up" className="lg:col-span-8 bg-card p-6 md:p-16 shadow-[20px_20px_40px_rgba(28,27,27,0.04)] md:shadow-[40px_40px_60px_rgba(28,27,27,0.04)]">
            <h2 className="text-2xl md:text-3xl font-bold mb-8 md:mb-12 tracking-tight">Angebotsanfrage</h2>
            {/* Mobile step-based form */}
            <div className="md:hidden">
              {/* Progress bar */}
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
                      <h2 className="text-xl font-bold tracking-tight">Was planen Sie?</h2>
                      <p className="text-sm text-secondary">Wählen Sie den Produkttyp und nennen Sie uns Ihren Standort.</p>
                      <div>
                        <label className="block text-[10px] uppercase tracking-widest text-outline font-bold mb-3">Produkttyp</label>
                        <div className="grid grid-cols-1 gap-2">
                          {["Terrassenüberdachung", "Carport", "Wintergarten", "Sonstiges"].map((typ) => (
                            <button
                              key={typ}
                              type="button"
                              onClick={() => handleChange("produktTyp", typ)}
                              className={`text-left px-4 py-3.5 text-sm font-bold border-2 transition-all ${
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
                        <label className="block text-[10px] uppercase tracking-widest text-outline font-bold mb-2">Ort der Montage</label>
                        <input
                          className="w-full bg-transparent border-b-2 border-outline-variant focus:border-primary focus:ring-0 transition-colors py-2 px-0 text-foreground placeholder:text-outline-variant/50 outline-none text-sm"
                          placeholder="PLZ / Stadt"
                          type="text"
                          value={form.ort}
                          onChange={(e) => handleChange("ort", e.target.value)}
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] uppercase tracking-widest text-outline font-bold mb-2">Beschreibung (optional)</label>
                        <textarea
                          className="w-full bg-transparent border-b-2 border-outline-variant focus:border-primary focus:ring-0 transition-colors py-2 px-0 text-foreground placeholder:text-outline-variant/50 resize-none outline-none text-sm"
                          placeholder="Beschreiben Sie Ihr Vorhaben..."
                          rows={3}
                          value={form.message}
                          onChange={(e) => handleChange("message", e.target.value)}
                        />
                      </div>
                    </div>
                  )}

                  {step === 2 && (
                    <div className="space-y-5">
                      <h2 className="text-xl font-bold tracking-tight">Ihre Kontaktdaten</h2>
                      <p className="text-sm text-secondary">Wie können wir Sie erreichen?</p>
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
                    </div>
                  )}

                  {step === 3 && (
                    <div className="space-y-5">
                      <h2 className="text-xl font-bold tracking-tight">Bilder hochladen</h2>
                      <p className="text-sm text-secondary">Optional: Fotos von Ihrem Haus oder der Terrasse helfen uns bei der Planung.</p>
                      <div
                        onClick={() => fileInputRef.current?.click()}
                        className="bg-surface-container-low p-8 border-2 border-dashed border-outline-variant/30 flex flex-col items-center justify-center text-center cursor-pointer hover:border-primary/30 transition-colors"
                      >
                        <Image className="w-10 h-10 text-outline-variant mb-3" />
                        <p className="text-sm font-bold mb-1">Fotos & Skizzen hinzufügen</p>
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
                              <Image className="w-4 h-4 text-primary shrink-0" />
                              <span className="text-sm truncate flex-1">{file.name}</span>
                              <button onClick={() => removeFile(i)} className="text-secondary hover:text-foreground">
                                <X className="w-4 h-4" />
                              </button>
                            </div>
                          ))}
                        </div>
                      )}
                      <div className="flex items-start gap-3 pt-2">
                        <input
                          className="w-5 h-5 border-2 border-outline-variant text-primary focus:ring-primary mt-0.5 shrink-0"
                          id="privacy-mobile"
                          type="checkbox"
                          checked={privacy}
                          onChange={(e) => setPrivacy(e.target.checked)}
                        />
                        <label className="text-[11px] text-secondary leading-tight" htmlFor="privacy-mobile">
                          Ich habe die <a className="text-primary underline" href="/datenschutz">Datenschutzerklärung</a> zur Kenntnis genommen und stimme der Verarbeitung meiner Daten zu.
                        </label>
                      </div>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>

              {/* Navigation buttons */}
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
                    onClick={(e) => { if (privacy) { handleSubmit(e as any); } }}
                    disabled={!privacy}
                    className={`flex-1 px-6 py-4 font-headline uppercase tracking-widest text-xs font-bold transition-all flex items-center justify-center gap-2 ${
                      privacy
                        ? "bg-primary text-primary-foreground hover:bg-primary-container"
                        : "bg-outline-variant/20 text-secondary cursor-not-allowed"
                    }`}
                  >
                    <Send className="w-4 h-4" /> Absenden
                  </button>
                )}
              </div>
            </div>

            {/* Desktop form */}
            <div className="hidden md:block">
              <form className="space-y-10" onSubmit={handleSubmit}>
                <div>
                  <label className="block text-[10px] uppercase tracking-widest text-outline font-bold mb-3">Produkttyp</label>
                  <div className="grid grid-cols-2 gap-3">
                    {["Terrassenüberdachung", "Carport", "Wintergarten", "Sonstiges"].map((typ) => (
                      <button
                        key={typ}
                        type="button"
                        onClick={() => handleChange("produktTyp", typ)}
                        className={`text-left px-5 py-3.5 text-sm font-bold border-2 transition-all ${
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
                <div className="grid grid-cols-2 gap-10">
                  <div>
                    <label className="block text-[10px] uppercase tracking-widest text-outline font-bold mb-2">Name *</label>
                    <input className="w-full bg-transparent border-b-2 border-outline-variant focus:border-primary focus:ring-0 transition-colors py-2 px-0 text-foreground placeholder:text-outline-variant/50 outline-none text-base" placeholder="Vor- und Nachname" type="text" value={form.name} onChange={(e) => handleChange("name", e.target.value)} />
                  </div>
                  <div>
                    <label className="block text-[10px] uppercase tracking-widest text-outline font-bold mb-2">E-Mail Adresse *</label>
                    <input className="w-full bg-transparent border-b-2 border-outline-variant focus:border-primary focus:ring-0 transition-colors py-2 px-0 text-foreground placeholder:text-outline-variant/50 outline-none text-base" placeholder="mail@beispiel.de" type="email" value={form.email} onChange={(e) => handleChange("email", e.target.value)} />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-10">
                  <div>
                    <label className="block text-[10px] uppercase tracking-widest text-outline font-bold mb-2">Telefonnummer</label>
                    <input className="w-full bg-transparent border-b-2 border-outline-variant focus:border-primary focus:ring-0 transition-colors py-2 px-0 text-foreground placeholder:text-outline-variant/50 outline-none text-base" placeholder="+49 --- -------" type="tel" value={form.phone} onChange={(e) => handleChange("phone", e.target.value)} />
                  </div>
                  <div>
                    <label className="block text-[10px] uppercase tracking-widest text-outline font-bold mb-2">Ort der Montage</label>
                    <input className="w-full bg-transparent border-b-2 border-outline-variant focus:border-primary focus:ring-0 transition-colors py-2 px-0 text-foreground placeholder:text-outline-variant/50 outline-none text-base" placeholder="PLZ / Stadt" type="text" value={form.ort} onChange={(e) => handleChange("ort", e.target.value)} />
                  </div>
                </div>
                <div>
                  <label className="block text-[10px] uppercase tracking-widest text-outline font-bold mb-2">Ihre Nachricht</label>
                  <textarea className="w-full bg-transparent border-b-2 border-outline-variant focus:border-primary focus:ring-0 transition-colors py-2 px-0 text-foreground placeholder:text-outline-variant/50 resize-none outline-none text-base" placeholder="Beschreiben Sie Ihr Vorhaben..." rows={4} value={form.message} onChange={(e) => handleChange("message", e.target.value)} />
                </div>
                <div
                  onClick={() => fileInputRef.current?.click()}
                  className="bg-surface-container-low p-8 border-2 border-dashed border-outline-variant/30 flex flex-col items-center justify-center text-center cursor-pointer hover:border-primary/30 transition-colors"
                >
                  <Upload className="w-10 h-10 text-outline-variant mb-2" />
                  <p className="text-sm font-bold mb-1">Hausfotos &amp; Skizzen hochladen</p>
                  <p className="text-xs text-secondary mb-4">JPG, PNG bis 10MB · max. 5 Dateien</p>
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
                        <Upload className="w-4 h-4 text-primary shrink-0" />
                        <span className="text-sm truncate flex-1">{file.name}</span>
                        <button type="button" onClick={() => removeFile(i)} className="text-secondary hover:text-foreground"><X className="w-4 h-4" /></button>
                      </div>
                    ))}
                  </div>
                )}
                <div className="flex items-start gap-3">
                  <input className="w-5 h-5 border-2 border-outline-variant text-primary focus:ring-primary mt-0.5 shrink-0" id="privacy" type="checkbox" checked={privacy} onChange={(e) => setPrivacy(e.target.checked)} required />
                  <label className="text-xs text-secondary leading-tight" htmlFor="privacy">
                    Ich habe die <a className="text-primary underline" href="/datenschutz">Datenschutzerklärung</a> zur Kenntnis genommen und stimme der Verarbeitung meiner Daten zu.
                  </label>
                </div>
                <button type="submit" className="bg-primary text-primary-foreground font-headline uppercase tracking-widest text-sm px-10 py-5 hover:bg-primary-container transition-all flex items-center gap-3"><Send className="w-4 h-4" /> Anfrage Absenden</button>
              </form>
            </div>
          </FadeIn>

          <FadeIn direction="right" delay={0.2} className="lg:col-span-4 space-y-10 md:space-y-16 hidden lg:block">
            <div className="relative">
              <div className="w-1 h-24 bg-primary absolute -left-8 top-0" />
              <h3 className="text-xl font-bold uppercase tracking-widest mb-6">Beratung &amp; Kontakt</h3>
              <StaggerContainer className="space-y-8" staggerDelay={0.15}>
                <StaggerItem>
                  <div className="flex gap-4">
                    <Phone className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                    <div>
                      <p className="text-[10px] uppercase tracking-widest text-outline font-bold">Zentrale Ulm</p>
                      <p className="text-lg font-bold">0731 123 456 78</p>
                    </div>
                  </div>
                </StaggerItem>
                <StaggerItem>
                  <div className="flex gap-4">
                    <Mail className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                    <div>
                      <p className="text-[10px] uppercase tracking-widest text-outline font-bold">E-Mail</p>
                      <p className="text-lg font-bold break-all">info@breit-ulm.de</p>
                    </div>
                  </div>
                </StaggerItem>
                <StaggerItem>
                  <div className="flex gap-4">
                    <Clock className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                    <div>
                      <p className="text-[10px] uppercase tracking-widest text-outline font-bold">Öffnungszeiten</p>
                      <p className="text-sm">Mo - Fr: 09:00 - 18:00 Uhr<br />Sa: 10:00 - 14:00 Uhr</p>
                    </div>
                  </div>
                </StaggerItem>
              </StaggerContainer>
            </div>
            <FadeIn delay={0.4}>
              <div className="bg-surface-container-high p-8">
                <h4 className="font-bold mb-4 flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-primary shrink-0" />
                  Region Ulm &amp; Umland
                </h4>
                <p className="text-sm text-secondary leading-relaxed">Wir sind Ihr regionaler Partner in Ulm und Umgebung.</p>
                <div className="mt-8 grayscale opacity-50 contrast-125">
                  <img src={mapUlm} alt="Map" className="w-full h-32 object-cover" loading="lazy" width={1200} height={800} />
                </div>
              </div>
            </FadeIn>
          </FadeIn>
        </section>
      </div>
    </Layout>
  );
};

export default Kontakt;