import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { Menu, X } from "lucide-react";

const navLinks = [
  { label: "Startseite", path: "/" },
  { label: "Konfigurator", path: "/konfigurator" },
  { label: "Service", path: "/service" },
  { label: "Kontakt", path: "/kontakt" },
];

const Navbar = () => {
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="fixed top-0 w-full flex justify-between items-center px-4 py-4 md:px-8 md:py-6 bg-card/80 backdrop-blur-xl z-50">
      <Link to="/" className="text-lg md:text-2xl font-bold tracking-tighter font-headline">
        Breitüberdachungen
      </Link>
      <div className="hidden md:flex gap-8 items-center">
        {navLinks.map((link) => (
          <Link
            key={link.label}
            to={link.path}
            className={`font-headline uppercase tracking-widest text-sm transition-colors ${
              location.pathname === link.path
                ? "text-primary font-bold border-b-2 border-primary pb-1"
                : "text-foreground hover:text-primary"
            }`}
          >
            {link.label}
          </Link>
        ))}
      </div>
      <div className="flex items-center gap-3">
        <Link
          to="/kontakt"
          className="hidden sm:inline-block bg-primary text-primary-foreground px-5 py-3 md:px-8 md:py-4 font-headline uppercase tracking-widest text-[10px] md:text-xs font-bold hover:bg-primary-container transition-all active:scale-[0.99]"
        >
          Angebot Anfordern
        </Link>
        <button className="md:hidden p-1" onClick={() => setMobileOpen(!mobileOpen)}>
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>
      {mobileOpen && (
        <div className="absolute top-full left-0 w-full bg-card/95 backdrop-blur-xl border-t border-border md:hidden">
          <div className="flex flex-col p-6 gap-5">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                to={link.path}
                onClick={() => setMobileOpen(false)}
                className={`font-headline uppercase tracking-widest text-sm transition-colors ${
                  location.pathname === link.path ? "text-primary font-bold" : "text-foreground hover:text-primary"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Link
              to="/kontakt"
              onClick={() => setMobileOpen(false)}
              className="sm:hidden bg-primary text-primary-foreground px-6 py-3 font-headline uppercase tracking-widest text-xs font-bold text-center mt-2"
            >
              Angebot Anfordern
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
