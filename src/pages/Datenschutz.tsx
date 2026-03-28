import Layout from "@/components/Layout";
import { FadeIn, StaggerContainer, StaggerItem, RevealLine } from "@/components/ScrollAnimations";
import { motion } from "framer-motion";
import { Shield } from "lucide-react";

const sections = [
  {
    title: "1. Verantwortlicher",
    text: `Verantwortlich für die Datenverarbeitung auf dieser Website ist:\n\nSMT Konzepte GmbH\nGraf-Albrecht-Str. 34/1\n89160 Dornstadt\n\nVertreten durch: Nico Braitinger\nTelefon: +49 (0) 7348 123456\nE-Mail: info@braitueberdachungen.de`,
  },
  {
    title: "2. Erhebung und Speicherung personenbezogener Daten",
    text: "Beim Besuch unserer Website werden automatisch Informationen durch den Browser übermittelt und in Server-Logfiles gespeichert. Diese Informationen umfassen: Browsertyp und -version, verwendetes Betriebssystem, Referrer URL, Hostname des zugreifenden Rechners, Uhrzeit der Serveranfrage und IP-Adresse. Eine Zusammenführung dieser Daten mit anderen Datenquellen wird nicht vorgenommen.",
  },
  {
    title: "3. Kontaktformular",
    text: "Wenn Sie uns per Kontaktformular Anfragen zukommen lassen, werden Ihre Angaben aus dem Anfrageformular inklusive der von Ihnen dort angegebenen Kontaktdaten zwecks Bearbeitung der Anfrage und für den Fall von Anschlussfragen bei uns gespeichert. Diese Daten geben wir nicht ohne Ihre Einwilligung weiter. Die Verarbeitung erfolgt auf Grundlage von Art. 6 Abs. 1 lit. b DSGVO.",
  },
  {
    title: "4. Cookies",
    text: "Unsere Website verwendet keine Tracking-Cookies. Es werden lediglich technisch notwendige Cookies eingesetzt, die für den Betrieb der Website erforderlich sind. Diese Cookies enthalten keine personenbezogenen Daten und werden nach Ende der Browser-Sitzung automatisch gelöscht.",
  },
  {
    title: "5. Ihre Rechte",
    text: "Sie haben jederzeit das Recht auf unentgeltliche Auskunft über Ihre gespeicherten personenbezogenen Daten, deren Herkunft und Empfänger und den Zweck der Datenverarbeitung sowie ein Recht auf Berichtigung, Sperrung oder Löschung dieser Daten. Hierzu sowie zu weiteren Fragen zum Thema personenbezogene Daten können Sie sich jederzeit an uns wenden.",
  },
  {
    title: "6. Datensicherheit",
    text: "Wir verwenden innerhalb des Website-Besuchs das verbreitete SSL-Verfahren (Secure Socket Layer) in Verbindung mit der jeweils höchsten Verschlüsselungsstufe, die von Ihrem Browser unterstützt wird. Ob eine einzelne Seite unseres Internetauftrittes verschlüsselt übertragen wird, erkennen Sie an der geschlossenen Darstellung des Schloss-Symbols in der Statusleiste Ihres Browsers.",
  },
  {
    title: "7. Hosting",
    text: "Diese Website wird bei einem externen Dienstleister gehostet (Hoster). Die personenbezogenen Daten, die auf dieser Website erfasst werden, werden auf den Servern des Hosters gespeichert. Hierbei kann es sich v.a. um IP-Adressen, Kontaktanfragen, Meta- und Kommunikationsdaten, Vertragsdaten, Kontaktdaten, Namen, Webseitenzugriffe und sonstige Daten handeln.",
  },
];

const Datenschutz = () => (
  <Layout>
    <div className="pt-24 md:pt-32 pb-16 md:pb-24">
      {/* Hero */}
      <section className="px-5 md:px-8 max-w-7xl mx-auto mb-12 md:mb-24">
        <div className="flex flex-col md:flex-row gap-8 md:gap-12 items-start">
          <div className="md:w-1/2">
            <motion.p
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-xs md:text-sm uppercase tracking-[0.2em] md:tracking-[0.3em] text-primary mb-3 md:mb-4"
            >
              Datenschutz gemäß DSGVO
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-[2rem] sm:text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter leading-none mb-6 md:mb-8 break-words"
            >
              Datenschutz.
            </motion.h1>
            <RevealLine className="w-16 h-[2px] bg-primary" delay={0.8} />
          </div>
          <FadeIn delay={0.3} direction="right" className="md:w-1/2 relative">
            <div className="bg-surface-container-low p-8 md:p-12 relative z-10 flex items-start gap-4">
              <Shield className="w-8 h-8 text-primary shrink-0 mt-1" />
              <p className="text-base md:text-lg font-light leading-relaxed text-on-surface-variant">
                Der Schutz Ihrer persönlichen Daten ist uns ein besonderes Anliegen. Wir verarbeiten Ihre Daten ausschließlich auf Grundlage der gesetzlichen Bestimmungen (DSGVO, TMG).
              </p>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Content */}
      <section className="px-5 md:px-8 max-w-4xl mx-auto">
        <StaggerContainer className="space-y-10 md:space-y-14" staggerDelay={0.1}>
          {sections.map((s) => (
            <StaggerItem key={s.title}>
              <h2 className="text-lg md:text-xl font-bold uppercase tracking-widest text-primary mb-4 md:mb-6 flex items-center gap-3">
                <span className="w-6 md:w-8 h-[1px] bg-primary shrink-0" /> {s.title}
              </h2>
              <p className="text-on-surface-variant leading-relaxed font-light text-sm md:text-base whitespace-pre-line">{s.text}</p>
            </StaggerItem>
          ))}
        </StaggerContainer>

        {/* Last updated */}
        <FadeIn className="mt-16 md:mt-24 pt-8 border-t border-outline-variant/20">
          <p className="text-xs text-secondary">Stand: März 2026 · Bei Fragen zum Datenschutz wenden Sie sich an info@braitueberdachungen.de</p>
        </FadeIn>
      </section>
    </div>
  </Layout>
);

export default Datenschutz;
