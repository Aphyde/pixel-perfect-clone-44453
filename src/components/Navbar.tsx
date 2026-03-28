import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { Menu, X } from "lucide-react";

const navLinks = [
  { label: "Modelle", path: "/" },
  { label: "Konfigurator", path: "/konfigurator" },
  { label: "Service", path: "/service" },
  { label: "Referenzen", path: "/" },
  { label: "Kontakt", path: "/kontakt" },
];

const Navbar = () => {
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  const isActive = (path: string, label: string) => {
    if (label === "Modelle" && location.pathname === "/") return true;
    if (label === "Service" && location.pathname === "/service") return true;
    if (label === "Konfigurator" && location.pathname === "/konfigurator") return true;
    if (label === "Kontakt" && location.pathname === "/kontakt") return true;
    return false;
  };

  return (
    <nav className="fixed top-0 w-full flex justify-between items-center px-8 py-6 bg-card/80 backdrop-blur-xl z-50">
      <Link to="/" className="text-2xl font-bold tracking-tighter font-headline">
        Breitüberdachungen
      </Link>
      <div className="hidden md:flex gap-8 items-center">
        {navLinks.map((link) => (
          <Link
            key={link.label}
            to={link.path}
            className={`font-headline uppercase tracking-widest text-sm transition-colors ${
              isActive(link.path, link.label)
                ? "text-primary font-bold border-b-2 border-primary pb-1"
                : "text-foreground hover:text-primary"
            }`}
          >
            {link.label}
          </Link>
        ))}
      </div>
      <div className="flex items-center gap-4">
        <Link
          to="/kontakt"
          className="bg-primary text-primary-foreground px-8 py-4 font-headline uppercase tracking-widest text-xs font-bold hover:bg-primary-container transition-all active:scale-[0.99]"
        >
          Angebot Anfordern
        </Link>
        <button className="md:hidden" onClick={() => setMobileOpen(!mobileOpen)}>
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
      {mobileOpen && (
        <div className="absolute top-full left-0 w-full bg-card/95 backdrop-blur-xl border-t border-border md:hidden">
          <div className="flex flex-col p-8 gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                to={link.path}
                onClick={() => setMobileOpen(false)}
                className="font-headline uppercase tracking-widest text-sm text-foreground hover:text-primary transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
