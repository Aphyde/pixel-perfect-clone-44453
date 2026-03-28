import { Link, useLocation } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { Menu, X } from "lucide-react";
import logo from "@/assets/logo-brait.svg";

const navLinks = [
  { label: "Startseite", path: "/" },
  { label: "Terrassenüberdachungen", path: "/terrassenueberdachungen" },
  { label: "Carports", path: "/carports" },
  { label: "Wintergärten", path: "/wintergaerten" },
  { label: "Service", path: "/service" },
  { label: "Kontakt", path: "/kontakt" },
];

const Navbar = () => {
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [visible, setVisible] = useState(true);
  const lastScrollY = useRef(0);
  const isHome = location.pathname === "/";

  useEffect(() => {
    const onScroll = () => {
      const currentY = window.scrollY;
      const heroThreshold = window.innerHeight * 0.7;

      // On homepage mobile: hide navbar until past hero, then show/hide on scroll direction
      if (isHome && window.innerWidth < 768) {
        if (currentY < heroThreshold) {
          setVisible(false);
        } else if (currentY < lastScrollY.current) {
          // scrolling up
          setVisible(true);
        } else {
          // scrolling down
          setVisible(false);
        }
      } else {
        // Non-home pages or desktop: always visible, but hide/show on scroll direction on mobile
        if (window.innerWidth < 768) {
          if (currentY < 80) {
            setVisible(true);
          } else if (currentY < lastScrollY.current) {
            setVisible(true);
          } else {
            setVisible(false);
          }
        } else {
          setVisible(true);
        }
      }

      lastScrollY.current = currentY;
    };

    // Initial state for homepage mobile
    if (isHome && window.innerWidth < 768) {
      setVisible(false);
    } else {
      setVisible(true);
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [isHome]);

  return (
    <nav
      className={`fixed top-0 w-full flex justify-between items-center px-4 py-4 md:px-8 md:py-6 bg-card/80 backdrop-blur-xl z-50 transition-transform duration-300 ${
        visible ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <Link to="/" className="flex items-center">
        <img src={logo} alt="Brait Überdachungen" className="h-12 md:h-14" />
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
