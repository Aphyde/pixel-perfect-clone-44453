import Layout from "@/components/Layout";
import impressumImg from "@/assets/impressum-img.jpg";
import { Gavel } from "lucide-react";

const Impressum = () => (
  <Layout>
    <div className="pt-32 pb-24">
      {/* Hero */}
      <section className="px-8 max-w-7xl mx-auto mb-24">
        <div className="flex flex-col md:flex-row gap-12 items-start">
          <div className="md:w-1/2">
            <p className="text-sm uppercase tracking-[0.3em] text-primary mb-4">Rechtliche Informationen</p>
            <h1 className="text-6xl md:text-8xl font-bold tracking-tighter leading-none mb-8">Impressum.</h1>
            <div className="w-16 h-[2px] bg-primary" />
          </div>
          <div className="md:w-1/2 relative">
            <div className="bg-surface-container-low p-12 relative z-10">
              <p className="text-lg font-light leading-relaxed text-on-surface-variant">
                Transparenz und Vertrauen sind das Fundament unserer Arbeit. Hier finden Sie alle gesetzlich vorgeschriebenen Angaben zur SMT Konzepte GmbH.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-16">
          <div className="hidden md:block md:col-span-1 border-r border-outline-variant/30">
            <span className="rotate-90 origin-left inline-block whitespace-nowrap text-xs tracking-[0.5em] uppercase text-outline mt-12">Legal Framework</span>
          </div>
          <div className="md:col-span-11 grid grid-cols-1 md:grid-cols-2 gap-24">
            <div className="space-y-16">
              <article>
                <h2 className="text-xs uppercase tracking-[0.2em] text-primary mb-6 font-bold">Angaben gemäß § 5 TMG</h2>
                <p className="text-3xl font-medium tracking-tight">SMT Konzepte GmbH</p>
                <p className="text-on-surface-variant font-light leading-loose mt-4">Graf-Albrecht-Str. 34/1<br />89160 Dornstadt</p>
              </article>
              <article>
                <h2 className="text-xs uppercase tracking-[0.2em] text-primary mb-6 font-bold">Vertretungsberechtigte Personen</h2>
                <p className="text-xl">Nico Braitinger</p>
              </article>
              <article>
                <h2 className="text-xs uppercase tracking-[0.2em] text-primary mb-6 font-bold">Registereintrag</h2>
                <p className="text-on-surface-variant">Registergericht: Amtsgericht Ulm<br />Registernummer: HRB 749310</p>
              </article>
            </div>
            <div className="relative">
              <div className="aspect-[4/5] bg-surface-container overflow-hidden">
                <img src={impressumImg} className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700" loading="lazy" alt="Architecture" width={800} height={1000} />
                <div className="absolute inset-0 bg-primary/10 mix-blend-multiply" />
              </div>
              <div className="absolute -top-8 -left-8 p-8 bg-surface border border-outline-variant/10 shadow-xl hidden md:block">
                <Gavel className="w-10 h-10 text-primary" />
              </div>
            </div>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="mt-32 pt-24 border-t border-outline-variant/20">
          <div className="max-w-4xl">
            <h2 className="text-4xl font-bold tracking-tight mb-12">Haftungsausschluss</h2>
            <div className="space-y-12">
              {[
                { title: "Haftung für Inhalte", text: "Als Diensteanbieter sind wir gemäß § 7 Abs.1 TMG für eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 TMG sind wir als Diensteanbieter jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde Informationen zu überwachen oder nach Umständen zu forschen, die auf eine rechtswidrige Tätigkeit hinweisen." },
                { title: "Haftung für Links", text: "Unser Angebot enthält Links zu externen Websites Dritter, auf deren Inhalte wir keinen Einfluss haben. Deshalb können wir für diese fremden Inhalte auch keine Gewähr übernehmen. Für die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber der Seiten verantwortlich." },
                { title: "Urheberrecht", text: "Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen dem deutschen Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb der Grenzen des Urheberrechtes bedürfen der schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers." },
              ].map((s) => (
                <div key={s.title}>
                  <h3 className="text-lg font-bold uppercase tracking-widest text-primary mb-4 flex items-center gap-3">
                    <span className="w-8 h-[1px] bg-primary" /> {s.title}
                  </h3>
                  <p className="text-on-surface-variant leading-relaxed font-light">{s.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="px-8 max-w-7xl mx-auto mt-32">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-0">
          <div className="bg-primary text-primary-foreground p-12 flex flex-col justify-between">
            <h3 className="text-3xl font-bold leading-tight">Noch Fragen zum<br />Rechtlichen?</h3>
            <p className="font-headline uppercase text-xs tracking-widest opacity-80 mt-4">Kontaktieren Sie uns direkt.</p>
          </div>
          <div className="bg-surface-container-high p-12 flex flex-col justify-center">
            <p className="text-xs uppercase tracking-widest text-primary font-bold mb-2">Telefon</p>
            <p className="text-2xl font-headline">+49 (0) 7348 123456</p>
          </div>
          <div className="bg-surface-container-highest p-12 flex flex-col justify-center">
            <p className="text-xs uppercase tracking-widest text-primary font-bold mb-2">Email</p>
            <p className="text-2xl font-headline">info@breitueberdachungen.de</p>
          </div>
        </div>
      </section>
    </div>
  </Layout>
);

export default Impressum;
