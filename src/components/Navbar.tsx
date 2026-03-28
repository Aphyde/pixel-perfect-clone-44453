import { Link, useLocation } from "react-router-dom";
import { useState, useEffect, useRef, useCallback } from "react";
import { Menu, X, ArrowRight, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import logo from "@/assets/logo-brait.svg";
import productTerrasse from "@/assets/product-terrassenueberdachung.jpg";
import productCarport from "@/assets/product-carport.jpg";
import productWintergarten from "@/assets/product-wintergarten.jpg";

const products = [
  {
    label: "Terrassenüberdachungen",
    path: "/terrassenueberdachungen",
    image: productTerrasse,
    desc: "Aluminium-Glas-Systeme für ganzjährigen Terrassengenuss.",
  },
  {
    label: "Carports",
    path: "/carports",
    image: productCarport,
    desc: "Stilvoller Schutz – freistehend oder als Anbau.",
  },
  {
    label: "Wintergärten",
    path: "/wintergaerten",
    image: productWintergarten,
    desc: "Lichtdurchfluteter Wohnraum mit höchster Wärmedämmung.",
  },
];

const simpleLinks = [
  { label: "Service", path: "/service" },
  { label: "Kontakt", path: "/kontakt" },
];

const Navbar = () => {
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);
  const [mobileProductsOpen, setMobileProductsOpen] = useState(false);
  const [visible, setVisible] = useState(true);
  const lastScrollY = useRef(0);
  const isHome = location.pathname === "/";
  const megaTimeout = useRef<ReturnType<typeof setTimeout>>();

  const openMega = useCallback(() => {
    clearTimeout(megaTimeout.current);
    setMegaOpen(true);
  }, []);

  const closeMega = useCallback(() => {
    megaTimeout.current = setTimeout(() => setMegaOpen(false), 200);
  }, []);

  // Close mega menu on route change
  useEffect(() => {
    setMegaOpen(false);
    setMobileOpen(false);
    setMobileProductsOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const onScroll = () => {
      const currentY = window.scrollY;
      const heroThreshold = window.innerHeight * 0.7;

      if (isHome && window.innerWidth < 768) {
        if (currentY < heroThreshold) {
          setVisible(false);
        } else if (currentY < lastScrollY.current) {
          setVisible(true);
        } else {
          setVisible(false);
        }
      } else {
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

    if (isHome && window.innerWidth < 768) {
      setVisible(false);
    } else {
      setVisible(true);
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [isHome]);

  const isProductPage = products.some((p) => location.pathname === p.path);

  return (
    <>
      <nav
        className={`fixed top-0 w-full flex justify-between items-center px-4 py-4 md:px-8 md:py-5 bg-card/80 backdrop-blur-xl z-50 transition-transform duration-300 ${
          visible ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <Link to="/" className="flex items-center">
          <img src={logo} alt="Brait Überdachungen" className="h-12 md:h-14" />
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex gap-7 items-center">
          <Link
            to="/"
            className={`font-headline uppercase tracking-widest text-sm transition-colors ${
              location.pathname === "/" ? "text-primary font-bold border-b-2 border-primary pb-1" : "text-foreground hover:text-primary"
            }`}
          >
            Startseite
          </Link>

          {/* Produkte trigger */}
          <div
            className="relative"
            onMouseEnter={openMega}
            onMouseLeave={closeMega}
          >
            <button
              className={`font-headline uppercase tracking-widest text-sm transition-colors flex items-center gap-1.5 ${
                isProductPage ? "text-primary font-bold border-b-2 border-primary pb-1" : "text-foreground hover:text-primary"
              }`}
            >
              Produkte
              <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${megaOpen ? "rotate-180" : ""}`} />
            </button>
          </div>

          {simpleLinks.map((link) => (
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

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="absolute top-full left-0 w-full bg-card/95 backdrop-blur-xl border-t border-border md:hidden">
            <div className="flex flex-col p-6 gap-4">
              <Link
                to="/"
                onClick={() => setMobileOpen(false)}
                className={`font-headline uppercase tracking-widest text-sm transition-colors ${
                  location.pathname === "/" ? "text-primary font-bold" : "text-foreground hover:text-primary"
                }`}
              >
                Startseite
              </Link>

              {/* Mobile products accordion */}
              <button
                onClick={() => setMobileProductsOpen(!mobileProductsOpen)}
                className={`font-headline uppercase tracking-widest text-sm transition-colors flex items-center justify-between ${
                  isProductPage ? "text-primary font-bold" : "text-foreground"
                }`}
              >
                Produkte
                <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${mobileProductsOpen ? "rotate-180" : ""}`} />
              </button>
              {mobileProductsOpen && (
                <div className="flex flex-col gap-3 pl-4 border-l-2 border-primary/20">
                  {products.map((p) => (
                    <Link
                      key={p.label}
                      to={p.path}
                      onClick={() => setMobileOpen(false)}
                      className="flex items-center gap-3"
                    >
                      <img src={p.image} alt={p.label} className="w-12 h-12 object-cover shrink-0" />
                      <div>
                        <span className={`font-headline uppercase tracking-widest text-xs block ${location.pathname === p.path ? "text-primary font-bold" : "text-foreground"}`}>
                          {p.label}
                        </span>
                        <span className="text-[10px] text-secondary leading-tight block">{p.desc}</span>
                      </div>
                    </Link>
                  ))}
                  <Link
                    to="/konfigurator"
                    onClick={() => setMobileOpen(false)}
                    className="flex items-center gap-2 text-primary font-headline uppercase tracking-widest text-[10px] font-bold mt-1"
                  >
                    Konfigurator öffnen <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              )}

              {simpleLinks.map((link) => (
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

      {/* Desktop Mega Menu */}
      <AnimatePresence>
        {megaOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="fixed top-[72px] left-0 w-full z-40 hidden md:block"
            onMouseEnter={openMega}
            onMouseLeave={closeMega}
          >
            <div className="bg-card/98 backdrop-blur-2xl border-t border-border shadow-[0_20px_60px_rgba(0,0,0,0.08)]">
              <div className="container mx-auto px-8 py-10">
                <div className="grid grid-cols-3 gap-6">
                  {products.map((p) => (
                    <Link
                      key={p.label}
                      to={p.path}
                      className="group relative overflow-hidden"
                    >
                      <div className="relative aspect-[16/10] overflow-hidden mb-4">
                        <img
                          src={p.image}
                          alt={p.label}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                          width={600}
                          height={375}
                        />
                        <div className="absolute inset-0 bg-foreground/20 group-hover:bg-foreground/5 transition-all duration-300" />
                        {/* Konfigurieren overlay */}
                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <span className="bg-primary text-primary-foreground px-5 py-2.5 font-headline uppercase tracking-widest text-[10px] font-bold flex items-center gap-2">
                            Konfigurieren <ArrowRight className="w-3.5 h-3.5" />
                          </span>
                        </div>
                      </div>
                      <h3 className="text-lg font-bold mb-1 group-hover:text-primary transition-colors">{p.label}</h3>
                      <p className="text-sm text-secondary">{p.desc}</p>
                    </Link>
                  ))}
                </div>
                <div className="mt-8 pt-6 border-t border-outline-variant/15 flex items-center justify-between">
                  <p className="text-xs text-secondary">Alle Systeme individuell konfigurierbar – kostenlose Beratung inklusive.</p>
                  <Link
                    to="/konfigurator"
                    className="flex items-center gap-2 text-primary font-headline uppercase tracking-widest text-xs font-bold hover:opacity-70 transition-opacity"
                  >
                    Zum Konfigurator <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
