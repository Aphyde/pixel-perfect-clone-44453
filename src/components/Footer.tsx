import { Link } from "react-router-dom";

const Footer = () => (
  <footer className="bg-surface border-t border-primary/10 p-12 pt-16">
    <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
      <div>
        <div className="text-xl font-bold mb-6 uppercase tracking-widest font-headline">Breitüberdachungen</div>
        <p className="font-body text-sm leading-relaxed text-secondary mb-8">
          Ihr Spezialist für Aluminium-Terrassendächer und Glashäuser in Ulm. Seit über 10 Jahren Qualität aus der Region.
        </p>
      </div>
      <div className="flex flex-col gap-4">
        <h4 className="font-headline text-sm font-bold uppercase tracking-widest text-primary">Services</h4>
        <Link to="/service" className="font-body text-sm text-secondary hover:text-foreground transition-colors">Montage-Service Ulm</Link>
        <span className="font-body text-sm text-secondary">Wartungspakete</span>
        <span className="font-body text-sm text-secondary">Maßanfertigung</span>
        <span className="font-body text-sm text-secondary">Baugenehmigung</span>
      </div>
      <div className="flex flex-col gap-4">
        <h4 className="font-headline text-sm font-bold uppercase tracking-widest text-primary">Rechtliches</h4>
        <Link to="/impressum" className="font-body text-sm text-secondary hover:text-foreground transition-colors">Impressum</Link>
        <span className="font-body text-sm text-secondary">Datenschutz</span>
        <span className="font-body text-sm text-secondary">AGB</span>
        <Link to="/kontakt" className="font-body text-sm text-secondary hover:text-foreground transition-colors">Kontakt</Link>
      </div>
    </div>
    <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-border">
      <p className="font-body text-sm text-secondary text-center">
        © 2024 Breitüberdachungen Ulm. Ihr Partner für exklusive Terrassensysteme im Umkreis von 100km.
      </p>
    </div>
  </footer>
);

export default Footer;
