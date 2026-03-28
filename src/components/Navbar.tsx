import { Link, useLocation } from "react-router-dom";
import { useState, useEffect, useRef, useCallback } from "react";
import { Menu, X, ArrowRight, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import logo from "@/assets/logo-brait.svg";
import logoLight from "@/assets/logo-brait-light.svg";
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
  { label: "Konfigurator", path: "/konfigurator" },
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
        className={`fixed top-0 w-full flex justify-between items-center px-4 py-4 md:px-8 md:py-5 bg-foreground/95 md:bg-card/80 backdrop-blur-xl z-50 transition-transform duration-300 ${
          visible ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <Link to="/" className="flex items-center">
          <img src={logoLight} alt="Brait Überdachungen" className="h-12 md:hidden" />
          <img src={logo} alt="Brait Überdachungen" className="hidden md:block h-14" />
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex gap-7 items-center">

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
          <button className="md:hidden p-1 text-primary-foreground" onClick={() => setMobileOpen(!mobileOpen)}>
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ scaleY: 0, opacity: 0.98 }}
            animate={{ scaleY: 1, opacity: 1 }}
            exit={{ scaleY: 0, opacity: 0.98 }}
            transition={{ duration: 0.36, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-[60] origin-top md:hidden overflow-y-auto"
            style={{
              background: 'linear-gradient(135deg, #1F1E1D 0%, #1E1C1C 35%, #201E1D 65%, #1E1D1D 100%)',
              willChange: 'transform, opacity',
              backfaceVisibility: 'hidden',
            }}
          >
          {/* Header with logo + close */}
          <div className="flex items-center justify-between px-4 py-4">
            <Link to="/" onClick={() => setMobileOpen(false)}>
              <img src={logoLight} alt="Brait Überdachungen" className="h-12" />
            </Link>
            <button className="p-1 text-primary-foreground" onClick={() => setMobileOpen(false)}>
              <X size={22} />
            </button>
          </div>

          <div className="flex flex-col p-6 gap-4">
            {/* Mobile products */}
            <span className={`font-headline uppercase tracking-widest text-sm ${isProductPage ? "text-primary font-bold" : "text-primary-foreground/70"}`}>
              Produkte
            </span>
            <div className="mt-1 -mx-6">
              <div className="flex gap-3 overflow-x-auto px-6 pb-3 snap-x snap-mandatory scrollbar-hide" style={{ WebkitOverflowScrolling: 'touch' }}>
                {products.map((p) => (
                  <Link
                    key={p.label}
                    to={p.path}
                    onClick={() => setMobileOpen(false)}
                    className="snap-start shrink-0 w-[72vw] max-w-[300px] group"
                  >
                    <div className="relative aspect-[4/3] overflow-hidden mb-3">
                      <img src={p.image} alt={p.label} className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 via-transparent to-transparent" />
                      <div className="absolute bottom-0 left-0 right-0 p-4">
                        <h3 className={`font-headline uppercase tracking-widest text-xs font-bold text-white mb-1 ${location.pathname === p.path ? "text-primary" : ""}`}>
                          {p.label}
                        </h3>
                        <p className="text-[10px] text-white/80 leading-tight">{p.desc}</p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between px-1">
                      <span className="text-[10px] font-headline uppercase tracking-widest text-primary font-bold">Mehr erfahren</span>
                      <ArrowRight className="w-3.5 h-3.5 text-primary" />
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {simpleLinks.map((link) => (
              <Link
                key={link.label}
                to={link.path}
                onClick={() => setMobileOpen(false)}
                className={`font-headline uppercase tracking-widest text-sm transition-colors ${
                  location.pathname === link.path ? "text-primary font-bold" : "text-primary-foreground hover:text-primary"
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
        </motion.div>
        )}
      </AnimatePresence>

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
            <div className="bg-card border-t border-border shadow-[0_20px_60px_rgba(0,0,0,0.08)]">
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
