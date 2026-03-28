import Layout from "@/components/Layout";
import heroService from "@/assets/hero-service.jpg";
import process1 from "@/assets/process-1.jpg";
import process2 from "@/assets/process-2.jpg";
import process3 from "@/assets/process-3.jpg";
import process4 from "@/assets/process-4.jpg";
import { MapPin, Compass } from "lucide-react";
import { Link } from "react-router-dom";

const steps = [
  { num: "01", phase: "Initialphase", title: "Persönliche Beratung", img: process1, desc: "Jedes Projekt beginnt mit einem Dialog. Wir besuchen Sie vor Ort in Ulm oder Umgebung, um die Gegebenheiten Ihrer Terrasse zu analysieren und Ihre Wünsche bezüglich Design und Funktionalität aufzunehmen.", bullets: ["Kostenlose Erstberatung", "Material- und Designauswahl"] },
  { num: "02", phase: "Präzision", title: "Digitales Aufmaß", img: process2, desc: '"Fast passend" gibt es bei uns nicht. Mit modernster Lasertechnik nehmen wir Maß, um eine millmetergenaue Fertigung Ihrer Breitüberdachung zu garantieren. Dies ist die Basis für eine reibungslose Montage.', bullets: ["Lasergestützte Vermessung", "Statische Vorprüfung"] },
  { num: "03", phase: "Umsetzung", title: "Fachgerechte Montage", img: process3, desc: "Unsere eigenen Montageteams rücken an. Sauberkeit, Schnelligkeit und handwerkliche Perfektion zeichnen unsere Arbeit aus. Wir verlassen die Baustelle erst, wenn jedes Detail sitzt.", bullets: ["Zertifizierte Monteure", "Eigene Logistikflotte"] },
  { num: "04", phase: "Abschluss", title: "Gemeinsame Abnahme", img: process4, desc: "Nach der Montage erfolgt die gemeinsame Begehung. Wir erklären Ihnen alle Funktionen (z.B. integrierte Beschattung oder LED-Spots) und übergeben Ihnen das fertige Projekt schlüsselfertig.", bullets: ["Abnahmeprotokoll", "Pflegeanweisungen & Garantie"] },
];

const Service = () => (
  <Layout>
    {/* Hero */}
    <section className="relative h-[819px] flex items-center overflow-hidden pt-24">
      <div className="absolute inset-0 z-0">
        <img src={heroService} className="w-full h-full object-cover" width={1920} height={1080} alt="Montage" />
        <div className="absolute inset-0 bg-foreground/40" />
      </div>
      <div className="container mx-auto px-8 relative z-10">
        <div className="max-w-4xl bg-primary-foreground/10 backdrop-blur-md p-12 border-l-4 border-primary">
          <p className="text-primary uppercase tracking-[0.3em] mb-4 text-sm font-bold">Handwerk &amp; Präzision</p>
          <h1 className="text-primary-foreground text-6xl md:text-8xl font-bold leading-none tracking-tighter mb-8">MONTAGE<br />EXZELLENZ.</h1>
          <p className="text-primary-foreground/90 text-xl max-w-xl leading-relaxed font-body">Ihr Partner für exklusive Terrassensysteme im Umkreis von 100km um Ulm. Von der ersten Skizze bis zur finalen Abnahme – wir bauen Ihre Vision.</p>
        </div>
      </div>
    </section>

    {/* Intro */}
    <section className="py-24 bg-surface">
      <div className="container mx-auto px-8 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
        <div>
          <h2 className="text-4xl font-bold tracking-tight mb-8">Regionale Qualität für die Region Ulm</h2>
          <p className="text-lg text-secondary mb-6 leading-relaxed">Als lokaler Experte in Ulm verstehen wir die architektonischen Besonderheiten Süddeutschlands. Unser Montage-Service erstreckt sich über einen Radius von 100km – von der Donau bis zur Alb.</p>
          <div className="flex items-center gap-4 text-primary font-bold">
            <MapPin className="w-5 h-5" />
            <span>Einsatzgebiete: Ulm, Neu-Ulm, Biberach, Günzburg, Memmingen &amp; Region</span>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-surface-container h-64 flex items-center justify-center p-8">
            <div className="text-center">
              <span className="block text-4xl font-bold text-primary mb-2">100km</span>
              <span className="text-xs uppercase tracking-widest">Service Radius</span>
            </div>
          </div>
          <div className="bg-foreground text-primary-foreground h-64 flex items-center justify-center p-8">
            <div className="text-center">
              <span className="block text-4xl font-bold mb-2">100%</span>
              <span className="text-xs uppercase tracking-widest">Eigene Teams</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    {/* Process */}
    <section className="py-24 bg-surface-container-low">
      <div className="container mx-auto px-8">
        <div className="flex flex-col md:flex-row justify-between items-end mb-20">
          <div className="max-w-2xl">
            <h2 className="text-5xl font-bold tracking-tighter mb-4">DER PROZESS ZUM TRAUMDACH</h2>
            <div className="h-1 w-24 bg-primary" />
          </div>
          <p className="text-secondary max-w-sm mt-8 md:mt-0">Vier Schritte zur Perfektion. Transparent, strukturiert und professionell geplant.</p>
        </div>
        <div className="space-y-32">
          {steps.map((step, i) => (
            <div key={step.num} className={`flex flex-col ${i % 2 === 1 ? "md:flex-row-reverse" : "md:flex-row"} items-center gap-16`}>
              <div className="w-full md:w-1/2 relative">
                <img src={step.img} className="w-full h-[500px] object-cover grayscale hover:grayscale-0 transition-all duration-700" loading="lazy" width={800} height={800} alt={step.title} />
                <div className={`absolute -bottom-8 ${i % 2 === 1 ? "-left-8" : "-right-8"} ${i % 2 === 0 ? "bg-primary" : "bg-foreground"} text-primary-foreground p-8 w-24 h-24 flex items-center justify-center text-3xl font-bold`}>{step.num}</div>
              </div>
              <div className="w-full md:w-1/2">
                <span className="text-primary font-bold uppercase tracking-widest mb-4 block">{step.phase}</span>
                <h3 className="text-4xl font-bold mb-6">{step.title}</h3>
                <p className="text-secondary text-lg leading-relaxed mb-8">{step.desc}</p>
                <ul className="space-y-4">
                  {step.bullets.map((b) => (
                    <li key={b} className="flex items-center gap-3">
                      <span className="w-1.5 h-1.5 bg-primary" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* CTA */}
    <section className="py-32 bg-foreground text-primary-foreground overflow-hidden relative">
      <div className="absolute top-0 right-0 w-1/3 h-full bg-primary/10" />
      <div className="container mx-auto px-8 relative z-10 flex flex-col md:flex-row items-center justify-between gap-12">
        <div className="max-w-2xl">
          <h2 className="text-5xl font-bold mb-6 tracking-tight">BEREIT FÜR MEHR FREIRAUM?</h2>
          <p className="text-primary-foreground/60 text-xl">Vereinbaren Sie jetzt Ihren Aufmaß-Termin in Ulm und Umgebung.</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-6 w-full md:w-auto">
          <Link to="/kontakt" className="bg-primary text-primary-foreground px-10 py-5 font-bold uppercase tracking-widest hover:bg-primary-container transition-all text-center">Jetzt Anfragen</Link>
          <button className="border border-primary-foreground/20 text-primary-foreground px-10 py-5 font-bold uppercase tracking-widest hover:bg-primary-foreground/10 transition-all">0731 / Montage-Hotline</button>
        </div>
      </div>
    </section>

    {/* Map */}
    <section className="h-[400px] bg-surface-container grayscale contrast-125">
      <div className="w-full h-full flex items-center justify-center bg-surface-container-high">
        <div className="text-center p-8 bg-card border-l-4 border-primary shadow-xl">
          <Compass className="w-10 h-10 text-primary mx-auto mb-2" />
          <p className="font-bold uppercase tracking-widest">Montage-Stützpunkt Ulm</p>
          <p className="text-secondary text-sm">Blaubeurer Str., 89077 Ulm</p>
        </div>
      </div>
    </section>
  </Layout>
);

export default Service;
