import Link from "next/link";
import Image from "next/image";
import { categories } from "@/data/products";

const logoLight = "/logo-brait-light.svg";

const Footer = () => (
  <footer className="bg-foreground text-primary-foreground p-6 pt-10 md:p-12 md:pt-16">
    <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
      <div>
        <Image
          src={logoLight}
          alt="Brait Überdachungen"
          width={200}
          height={96}
          className="h-20 md:h-24 w-auto mb-4 md:mb-6"
        />
        <p className="font-body text-xs md:text-sm leading-relaxed text-primary-foreground/60 mb-6 md:mb-8">
          Ihr Spezialist für Aluminium-Terrassendächer, Markisen und Carports in Ulm. Seit über 10 Jahren Qualität aus der Region.
        </p>
      </div>
      <div className="flex flex-col gap-3 md:gap-4">
        <h4 className="font-headline text-xs md:text-sm font-bold uppercase tracking-widest text-primary">Produkte</h4>
        {categories.map((c) => (
          <Link
            key={c.slug}
            href={`/${c.slug}`}
            className="font-body text-xs md:text-sm text-primary-foreground/60 hover:text-primary-foreground transition-colors"
          >
            {c.label}
          </Link>
        ))}
      </div>
      <div className="flex flex-col gap-3 md:gap-4">
        <h4 className="font-headline text-xs md:text-sm font-bold uppercase tracking-widest text-primary">Services</h4>
        <Link href="/service" className="font-body text-xs md:text-sm text-primary-foreground/60 hover:text-primary-foreground transition-colors">Montage-Service Ulm</Link>
        <Link href="/wartungspakete" className="font-body text-xs md:text-sm text-primary-foreground/60 hover:text-primary-foreground transition-colors">Wartungspakete</Link>
        <Link href="/service" className="font-body text-xs md:text-sm text-primary-foreground/60 hover:text-primary-foreground transition-colors">Maßanfertigung</Link>
        <Link href="/konfigurator" className="font-body text-xs md:text-sm text-primary-foreground/60 hover:text-primary-foreground transition-colors">Konfigurator</Link>
      </div>
      <div className="flex flex-col gap-3 md:gap-4">
        <h4 className="font-headline text-xs md:text-sm font-bold uppercase tracking-widest text-primary">Rechtliches</h4>
        <Link href="/impressum" className="font-body text-xs md:text-sm text-primary-foreground/60 hover:text-primary-foreground transition-colors">Impressum</Link>
        <Link href="/datenschutz" className="font-body text-xs md:text-sm text-primary-foreground/60 hover:text-primary-foreground transition-colors">Datenschutz</Link>
        <Link href="/kontakt" className="font-body text-xs md:text-sm text-primary-foreground/60 hover:text-primary-foreground transition-colors">Kontakt</Link>
      </div>
    </div>
    <div className="max-w-7xl mx-auto mt-10 md:mt-16 pt-6 md:pt-8 border-t border-primary-foreground/10 flex flex-col items-center gap-2">
      <p className="font-body text-[11px] md:text-sm text-primary-foreground/60 text-center">
        © 2025 Brait Überdachungen – eine Marke von <a href="https://bau-braitinger.de/" target="_blank" rel="noopener noreferrer" className="text-primary-foreground/80 hover:text-primary transition-colors underline underline-offset-2">SMT Konzepte GmbH</a>
      </p>
      <p className="font-body text-[10px] md:text-xs text-primary-foreground/55 text-center">
        Website & Marketing von <a href="https://rossigroup.de" target="_blank" rel="noopener noreferrer" className="text-primary-foreground/70 hover:text-primary transition-colors underline underline-offset-2">rossigroup.de</a>
      </p>
    </div>
  </footer>
);

export default Footer;
