import { Link } from "react-router-dom";
import logo from "@/assets/logo-brait.svg";

const Footer = () => (
  <footer className="bg-surface border-t border-primary/10 p-6 pt-10 md:p-12 md:pt-16">
    <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 md:gap-12">
      <div>
        <img src={logo} alt="Brait Überdachungen" className="h-10 mb-4 md:mb-6" />
        <p className="font-body text-xs md:text-sm leading-relaxed text-secondary mb-6 md:mb-8">
          Ihr Spezialist für Aluminium-Terrassendächer und Glashäuser in Ulm. Seit über 10 Jahren Qualität aus der Region.
        </p>
      </div>
      <div className="flex flex-col gap-3 md:gap-4">
        <h4 className="font-headline text-xs md:text-sm font-bold uppercase tracking-widest text-primary">Services</h4>
        <Link to="/service" className="font-body text-xs md:text-sm text-secondary hover:text-foreground transition-colors">Montage-Service Ulm</Link>
        <Link to="/service" className="font-body text-xs md:text-sm text-secondary hover:text-foreground transition-colors">Wartungspakete</Link>
        <Link to="/service" className="font-body text-xs md:text-sm text-secondary hover:text-foreground transition-colors">Maßanfertigung</Link>
        <Link to="/konfigurator" className="font-body text-xs md:text-sm text-secondary hover:text-foreground transition-colors">Konfigurator</Link>
      </div>
      <div className="flex flex-col gap-3 md:gap-4">
        <h4 className="font-headline text-xs md:text-sm font-bold uppercase tracking-widest text-primary">Rechtliches</h4>
        <Link to="/impressum" className="font-body text-xs md:text-sm text-secondary hover:text-foreground transition-colors">Impressum</Link>
        <Link to="/datenschutz" className="font-body text-xs md:text-sm text-secondary hover:text-foreground transition-colors">Datenschutz</Link>
        <Link to="/kontakt" className="font-body text-xs md:text-sm text-secondary hover:text-foreground transition-colors">Kontakt</Link>
      </div>
    </div>
    <div className="max-w-7xl mx-auto mt-10 md:mt-16 pt-6 md:pt-8 border-t border-border">
      <p className="font-body text-[11px] md:text-sm text-secondary text-center">
        © 2024 Brait Überdachungen Ulm. Ihr Partner für exklusive Terrassensysteme.
      </p>
    </div>
  </footer>
);

export default Footer;
