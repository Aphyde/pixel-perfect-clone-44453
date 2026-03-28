import Layout from "@/components/Layout";
import { Phone, Mail, Clock, ShieldCheck, MapPin, Upload } from "lucide-react";
import mapUlm from "@/assets/map-ulm.jpg";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/ScrollAnimations";
import { motion } from "framer-motion";

const Kontakt = () => (
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
            className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter leading-[0.9] mb-5 md:mb-8"
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
          className="lg:col-span-5 relative mt-4 lg:mt-0"
        >
          <div className="absolute -top-4 -left-4 w-12 h-[2px] bg-primary hidden md:block" />
          <div className="absolute -top-4 -left-4 w-[2px] h-12 bg-primary hidden md:block" />
          <div className="bg-surface-container-low p-8 md:p-12 flex flex-col justify-end relative overflow-hidden">
            <div className="relative z-10">
              <MapPin className="w-8 h-8 md:w-10 md:h-10 text-primary mb-3 md:mb-4" />
              <h3 className="text-xl md:text-2xl font-bold mb-2">Showroom Ulm</h3>
              <p className="text-secondary text-sm md:text-base">Blaubeurer Straße 12<br />89077 Ulm</p>
              <p className="text-primary font-bold mt-3 md:mt-4 text-sm md:text-base">+49 (0) 731 123 456 78</p>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Form & Info */}
      <section className="max-w-7xl mx-auto px-5 md:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12 md:gap-24">
        <FadeIn direction="up" className="lg:col-span-8 bg-card p-6 md:p-16 shadow-[20px_20px_40px_rgba(28,27,27,0.04)] md:shadow-[40px_40px_60px_rgba(28,27,27,0.04)]">
          <h2 className="text-2xl md:text-3xl font-bold mb-8 md:mb-12 tracking-tight">Angebotsanfrage</h2>
          <form className="space-y-6 md:space-y-10" onSubmit={(e) => e.preventDefault()}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10">
              <div>
                <label className="block text-[10px] uppercase tracking-widest text-outline font-bold mb-2">Name</label>
                <input className="w-full bg-transparent border-b-2 border-outline-variant focus:border-primary focus:ring-0 transition-colors py-2 px-0 text-foreground placeholder:text-outline-variant/50 outline-none text-sm md:text-base" placeholder="Vor- und Nachname" type="text" />
              </div>
              <div>
                <label className="block text-[10px] uppercase tracking-widest text-outline font-bold mb-2">E-Mail Adresse</label>
                <input className="w-full bg-transparent border-b-2 border-outline-variant focus:border-primary focus:ring-0 transition-colors py-2 px-0 text-foreground placeholder:text-outline-variant/50 outline-none text-sm md:text-base" placeholder="mail@beispiel.de" type="email" />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10">
              <div>
                <label className="block text-[10px] uppercase tracking-widest text-outline font-bold mb-2">Telefonnummer</label>
                <input className="w-full bg-transparent border-b-2 border-outline-variant focus:border-primary focus:ring-0 transition-colors py-2 px-0 text-foreground placeholder:text-outline-variant/50 outline-none text-sm md:text-base" placeholder="+49 --- -------" type="tel" />
              </div>
              <div>
                <label className="block text-[10px] uppercase tracking-widest text-outline font-bold mb-2">Ort der Montage</label>
                <input className="w-full bg-transparent border-b-2 border-outline-variant focus:border-primary focus:ring-0 transition-colors py-2 px-0 text-foreground placeholder:text-outline-variant/50 outline-none text-sm md:text-base" placeholder="PLZ / Stadt" type="text" />
              </div>
            </div>
            <div>
              <label className="block text-[10px] uppercase tracking-widest text-outline font-bold mb-2">Ihre Nachricht</label>
              <textarea className="w-full bg-transparent border-b-2 border-outline-variant focus:border-primary focus:ring-0 transition-colors py-2 px-0 text-foreground placeholder:text-outline-variant/50 resize-none outline-none text-sm md:text-base" placeholder="Beschreiben Sie Ihr Vorhaben..." rows={4} />
            </div>
            <div className="bg-surface-container-low p-5 md:p-8 border-2 border-dashed border-outline-variant/30 flex flex-col items-center justify-center text-center">
              <Upload className="w-8 h-8 md:w-10 md:h-10 text-outline-variant mb-2" />
              <p className="text-xs md:text-sm font-bold mb-1">Hausfotos &amp; Skizzen hochladen</p>
              <p className="text-[11px] md:text-xs text-secondary mb-3 md:mb-4">JPG, PNG bis 10MB</p>
              <label className="cursor-pointer bg-card text-foreground border border-outline-variant/30 px-5 py-2 text-[10px] md:text-xs uppercase tracking-widest font-bold hover:bg-surface-container-high transition-colors">
                Datei auswählen
                <input className="hidden" type="file" />
              </label>
            </div>
            <div className="flex items-start gap-3 md:gap-4">
              <input className="w-5 h-5 border-2 border-outline-variant text-primary focus:ring-primary mt-0.5 shrink-0" id="privacy" type="checkbox" />
              <label className="text-[11px] md:text-xs text-secondary leading-tight" htmlFor="privacy">
                Ich habe die <a className="text-primary underline" href="/datenschutz">Datenschutzerklärung</a> zur Kenntnis genommen und stimme der Verarbeitung meiner Daten zu.
              </label>
            </div>
            <button className="w-full md:w-auto bg-primary text-primary-foreground font-headline uppercase tracking-widest text-xs md:text-sm px-10 py-4 md:px-12 md:py-5 hover:bg-primary-container transition-all duration-150" type="submit">
              Anfrage Absenden
            </button>
          </form>
        </FadeIn>
        <FadeIn direction="right" delay={0.2} className="lg:col-span-4 space-y-10 md:space-y-16">
          <div className="relative">
            <div className="w-1 h-16 md:h-24 bg-primary absolute -left-5 md:-left-8 top-0 hidden lg:block" />
            <h3 className="text-lg md:text-xl font-bold uppercase tracking-widest mb-5 md:mb-6">Beratung &amp; Kontakt</h3>
            <StaggerContainer className="space-y-5 md:space-y-8" staggerDelay={0.15}>
              <StaggerItem>
                <div className="flex gap-3 md:gap-4">
                  <Phone className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                  <div>
                    <p className="text-[10px] uppercase tracking-widest text-outline font-bold">Zentrale Ulm</p>
                    <p className="text-base md:text-lg font-bold">0731 123 456 78</p>
                  </div>
                </div>
              </StaggerItem>
              <StaggerItem>
                <div className="flex gap-3 md:gap-4">
                  <Mail className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                  <div>
                    <p className="text-[10px] uppercase tracking-widest text-outline font-bold">E-Mail</p>
                    <p className="text-base md:text-lg font-bold break-all">info@breit-ulm.de</p>
                  </div>
                </div>
              </StaggerItem>
              <StaggerItem>
                <div className="flex gap-3 md:gap-4">
                  <Clock className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                  <div>
                    <p className="text-[10px] uppercase tracking-widest text-outline font-bold">Öffnungszeiten</p>
                    <p className="text-xs md:text-sm">Mo - Fr: 09:00 - 18:00 Uhr<br />Sa: 10:00 - 14:00 Uhr</p>
                  </div>
                </div>
              </StaggerItem>
            </StaggerContainer>
          </div>
          <FadeIn delay={0.4}>
            <div className="bg-surface-container-high p-6 md:p-8">
              <h4 className="font-bold mb-3 md:mb-4 flex items-center gap-2 text-sm md:text-base">
                <ShieldCheck className="w-5 h-5 text-primary shrink-0" />
                Region Ulm &amp; Umland
              </h4>
              <p className="text-xs md:text-sm text-secondary leading-relaxed">Wir sind Ihr regionaler Partner im Umkreis von 100km um Ulm.</p>
              <div className="mt-6 md:mt-8 grayscale opacity-50 contrast-125">
                <img src={mapUlm} alt="Map" className="w-full h-24 md:h-32 object-cover" loading="lazy" width={1200} height={800} />
              </div>
            </div>
          </FadeIn>
        </FadeIn>
      </section>
    </div>
  </Layout>
);

export default Kontakt;
