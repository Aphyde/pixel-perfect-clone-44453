"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect, useRef, useCallback } from "react";
import { Menu, X, ArrowRight, ChevronDown, ChevronRight, Phone } from "lucide-react";

const PHONE_DISPLAY = "0173 530 3581";
const PHONE_HREF = "tel:+491735303581";
const WHATSAPP_HREF =
  "https://wa.me/491735303581?text=" +
  encodeURIComponent("Hallo Brait, ich interessiere mich für eine Überdachung.");

const WhatsAppIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    aria-hidden="true"
    fill="currentColor"
    className={className}
  >
    <path d="M19.05 4.91A10 10 0 0 0 12 2C6.48 2 2 6.48 2 12c0 1.76.46 3.45 1.32 4.95L2 22l5.2-1.36A10 10 0 0 0 12 22c5.52 0 10-4.48 10-10 0-2.67-1.04-5.18-2.95-7.09ZM12 20.27a8.27 8.27 0 0 1-4.21-1.15l-.3-.18-3.09.81.83-3-.2-.31a8.27 8.27 0 1 1 6.97 3.83Zm4.55-6.18c-.25-.13-1.47-.73-1.7-.81-.23-.08-.39-.13-.55.13-.16.25-.63.81-.78.98-.14.16-.29.18-.54.06-.25-.13-1.04-.38-1.99-1.22-.74-.66-1.23-1.47-1.37-1.72-.14-.25-.02-.39.11-.51.11-.11.25-.29.38-.43.13-.14.16-.25.25-.41.08-.16.04-.31-.02-.43-.06-.13-.55-1.34-.76-1.83-.2-.48-.4-.42-.55-.42l-.47-.01c-.16 0-.43.06-.65.31-.22.25-.85.83-.85 2.04 0 1.2.87 2.36.99 2.52.13.16 1.72 2.62 4.16 3.67.58.25 1.04.4 1.39.51.59.19 1.12.16 1.54.1.47-.07 1.47-.6 1.68-1.18.21-.58.21-1.07.14-1.18-.07-.11-.23-.18-.48-.31Z" />
  </svg>
);
import { motion, AnimatePresence } from "framer-motion";
const logo = "/logo-brait.svg";
const logoLight = "/logo-brait-light.svg";
import { categories, hasConfigurator } from "@/data/products";

const simpleLinks = [
  { label: "Konfigurator", path: "/konfigurator" },
  { label: "Referenzen", path: "/referenzprojekte" },
  { label: "Service", path: "/service" },
  { label: "Kontakt", path: "/kontakt" },
];

interface NavbarProps {
  /**
   * Mobile-only: Versteckt die volle Navbar und zeigt stattdessen nur
   * Telefon- und Menü-Icon als schwebende Buttons (für Konfigurator etc.).
   * Auf Desktop bleibt die Navbar unverändert.
   */
  iconsOnly?: boolean;
}

const Navbar = ({ iconsOnly = false }: NavbarProps) => {
  const pathname = usePathname() ?? "/";
  const [mobileOpen, setMobileOpen] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState(categories[0].slug);
  const [mobileCategoryOpen, setMobileCategoryOpen] = useState<string | null>(null);
  const [visible, setVisible] = useState(true);
  const [scrolled, setScrolled] = useState(false);
  const lastScrollY = useRef(0);
  const isHome = pathname === "/";
  const transparentMobile = isHome && !scrolled && !mobileOpen;
  const megaTimeout = useRef<ReturnType<typeof setTimeout>>();

  const openMega = useCallback(() => {
    clearTimeout(megaTimeout.current);
    setMegaOpen(true);
  }, []);

  const closeMega = useCallback(() => {
    megaTimeout.current = setTimeout(() => setMegaOpen(false), 200);
  }, []);

  // Close menus on route change
  useEffect(() => {
    setMegaOpen(false);
    setMobileOpen(false);
    setMobileCategoryOpen(null);
  }, [pathname]);

  useEffect(() => {
    const onScroll = () => {
      const currentY = window.scrollY;

      setScrolled(currentY > 20);

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

      lastScrollY.current = currentY;
    };

    setVisible(true);
    onScroll();

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [isHome]);

  const isProductPage = categories.some(
    (c) =>
      pathname === `/${c.slug}` ||
      pathname.startsWith(`/${c.slug}/`),
  );

  const activeCat = categories.find((c) => c.slug === activeCategory) ?? categories[0];

  return (
    <>
      <nav
        className={`fixed top-0 w-full md:flex justify-between items-center px-4 py-1 md:px-8 md:py-2 md:bg-card/80 md:backdrop-blur-xl z-50 transition-all duration-300 ${
          iconsOnly
            ? "hidden md:flex md:bg-card/80 md:backdrop-blur-xl"
            : transparentMobile
              ? "flex bg-transparent backdrop-blur-0"
              : "flex bg-foreground/95 backdrop-blur-xl"
        } ${visible || iconsOnly ? "translate-y-0" : "-translate-y-full pointer-events-none"}`}
      >
        <Link href="/" className={`flex items-center ${iconsOnly ? "hidden md:flex" : ""}`}>
          <img src={logoLight} alt="Brait Überdachungen" className="h-20 md:hidden" />
          <img src={logo} alt="Brait Überdachungen" className="hidden md:block h-24" />
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
                isProductPage
                  ? "text-primary font-bold border-b-2 border-primary pb-1"
                  : "text-foreground hover:text-primary"
              }`}
            >
              Produkte
              <ChevronDown
                className={`w-3.5 h-3.5 transition-transform duration-200 ${megaOpen ? "rotate-180" : ""}`}
              />
            </button>
          </div>

          {simpleLinks.map((link) => (
            <Link
              key={link.label}
              href={link.path}
              className={`font-headline uppercase tracking-widest text-sm transition-colors ${
                pathname === link.path
                  ? "text-primary font-bold border-b-2 border-primary pb-1"
                  : "text-foreground hover:text-primary"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className={`flex items-center gap-2 md:gap-3 ${iconsOnly ? "hidden md:flex" : ""}`}>
          {/* WhatsApp button (Desktop: icon, Mobile: icon) — randlos */}
          <a
            href={WHATSAPP_HREF}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Per WhatsApp schreiben"
            className="hidden md:inline-flex items-center justify-center w-10 h-10 text-foreground hover:text-[#25D366] transition-colors"
          >
            <WhatsAppIcon className="w-5 h-5" />
          </a>
          <a
            href={WHATSAPP_HREF}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Per WhatsApp schreiben"
            className="md:hidden inline-flex items-center justify-center w-10 h-10 text-primary-foreground hover:text-[#25D366] transition-colors"
          >
            <WhatsAppIcon className="w-4 h-4" />
          </a>

          {/* Call button: full on desktop, icon-only on mobile — randlos */}
          <a
            href={PHONE_HREF}
            aria-label={`Anrufen: ${PHONE_DISPLAY}`}
            className="hidden md:inline-flex items-center gap-2 text-foreground hover:text-primary px-2 py-3 font-headline uppercase tracking-widest text-xs font-bold transition-colors"
          >
            <Phone className="w-3.5 h-3.5" />
            {PHONE_DISPLAY}
          </a>
          <a
            href={PHONE_HREF}
            aria-label={`Anrufen: ${PHONE_DISPLAY}`}
            className="md:hidden inline-flex items-center justify-center w-10 h-10 text-primary-foreground hover:text-primary transition-colors"
          >
            <Phone className="w-4 h-4" />
          </a>
          <Link
            href="/kontakt"
            className="hidden sm:inline-block bg-primary text-primary-foreground px-5 py-3 md:px-8 md:py-4 font-headline uppercase tracking-widest text-[10px] md:text-xs font-bold hover:bg-primary-container transition-all active:scale-[0.99]"
          >
            Angebot Anfordern
          </Link>
          <button
            className="md:hidden p-1 text-primary-foreground"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </nav>

      {/* iconsOnly: schwebende Icon-Buttons (WhatsApp + Phone + Menu) – nur auf Mobile, immer sichtbar */}
      {iconsOnly && !mobileOpen && (
        <div className="md:hidden fixed top-4 right-4 z-[55] flex items-center gap-3">
          <a
            href={WHATSAPP_HREF}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Per WhatsApp schreiben"
            className="inline-flex items-center justify-center w-10 h-10 text-white hover:text-[#25D366] transition-colors active:scale-95 drop-shadow-[0_2px_4px_rgba(0,0,0,0.55)]"
          >
            <WhatsAppIcon className="w-5 h-5" />
          </a>
          <a
            href={PHONE_HREF}
            aria-label={`Anrufen: ${PHONE_DISPLAY}`}
            className="inline-flex items-center justify-center w-10 h-10 text-white hover:text-primary transition-colors active:scale-95 drop-shadow-[0_2px_4px_rgba(0,0,0,0.55)]"
          >
            <Phone className="w-5 h-5" strokeWidth={2.25} />
          </a>
          <button
            aria-label="Menü öffnen"
            onClick={() => setMobileOpen(true)}
            className="inline-flex items-center justify-center w-10 h-10 text-white hover:text-primary transition-colors active:scale-95 drop-shadow-[0_2px_4px_rgba(0,0,0,0.55)]"
          >
            <Menu size={24} strokeWidth={2.25} />
          </button>
        </div>
      )}

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ scaleY: 0, opacity: 0.98 }}
            animate={{ scaleY: 1, opacity: 1 }}
            exit={{ scaleY: 0, opacity: 0.98 }}
            transition={{ duration: 0.36, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-[60] origin-top md:hidden overflow-y-auto"
            style={{
              background:
                "linear-gradient(135deg, #1F1E1D 0%, #1E1C1C 35%, #201E1D 65%, #1E1D1D 100%)",
              willChange: "transform, opacity",
              backfaceVisibility: "hidden",
            }}
          >
            {/* Header with logo + close */}
            <div className="flex items-center justify-between px-4 py-4">
              <Link href="/" onClick={() => setMobileOpen(false)}>
                <img src={logoLight} alt="Brait Überdachungen" className="h-20" />
              </Link>
              <button
                className="p-1 text-primary-foreground"
                onClick={() => setMobileOpen(false)}
              >
                <X size={22} />
              </button>
            </div>

            <div className="flex flex-col p-6 gap-2">
              <span className="font-headline uppercase tracking-widest text-sm text-primary-foreground/70 mb-2">
                Produkte
              </span>

              {/* Categories accordion */}
              <div className="flex flex-col divide-y divide-primary-foreground/10 border-y border-primary-foreground/10 mb-4">
                {categories.map((cat) => {
                  const hasSubproducts = cat.products.length > 0;
                  const isOpen = mobileCategoryOpen === cat.slug;
                  const isActive =
                    pathname === `/${cat.slug}` ||
                    pathname.startsWith(`/${cat.slug}/`);

                  if (!hasSubproducts) {
                    return (
                      <Link
                        key={cat.slug}
                        href={`/${cat.slug}`}
                        onClick={() => setMobileOpen(false)}
                        className={`flex items-center justify-between py-4 font-headline uppercase tracking-widest text-sm transition-colors ${
                          isActive
                            ? "text-primary font-bold"
                            : "text-primary-foreground hover:text-primary"
                        }`}
                      >
                        {cat.label}
                        <ChevronRight className="w-4 h-4 opacity-60" />
                      </Link>
                    );
                  }

                  return (
                    <div key={cat.slug} className="py-2">
                      <button
                        onClick={() =>
                          setMobileCategoryOpen(isOpen ? null : cat.slug)
                        }
                        className={`w-full flex items-center justify-between py-2 font-headline uppercase tracking-widest text-sm transition-colors ${
                          isActive
                            ? "text-primary font-bold"
                            : "text-primary-foreground hover:text-primary"
                        }`}
                      >
                        {cat.label}
                        <ChevronDown
                          className={`w-4 h-4 transition-transform ${isOpen ? "rotate-180" : ""}`}
                        />
                      </button>
                      <AnimatePresence>
                        {isOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.25 }}
                            className="overflow-hidden"
                          >
                            <div className="flex flex-col pl-4 pb-2 pt-1 gap-1">
                              <Link
                                href={`/${cat.slug}`}
                                onClick={() => setMobileOpen(false)}
                                className="py-2 text-xs font-headline uppercase tracking-widest text-primary"
                              >
                                Übersicht →
                              </Link>
                              {cat.products.map((p) => (
                                <Link
                                  key={p.slug}
                                  href={`/${cat.slug}/${p.slug}`}
                                  onClick={() => setMobileOpen(false)}
                                  className="py-2 text-sm text-primary-foreground/80 hover:text-primary transition-colors"
                                >
                                  {p.label}
                                </Link>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>

              {simpleLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.path}
                  onClick={() => setMobileOpen(false)}
                  className={`font-headline uppercase tracking-widest text-sm transition-colors py-2 ${
                    pathname === link.path
                      ? "text-primary font-bold"
                      : "text-primary-foreground hover:text-primary"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href="/kontakt"
                onClick={() => setMobileOpen(false)}
                className="sm:hidden bg-primary text-primary-foreground px-6 py-3 font-headline uppercase tracking-widest text-xs font-bold text-center mt-4"
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
            className="fixed top-[88px] left-0 w-full z-40 hidden md:block"
            onMouseEnter={openMega}
            onMouseLeave={closeMega}
          >
            <div className="bg-card border-t border-border shadow-[0_20px_60px_rgba(0,0,0,0.08)]">
              <div className="container mx-auto px-8 py-10">
                <div className="grid grid-cols-12 gap-8">
                  {/* Left: categories list */}
                  <div className="col-span-4 lg:col-span-3 flex flex-col gap-1 border-r border-outline-variant/15 pr-6">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-secondary mb-3">
                      Kategorien
                    </span>
                    {categories.map((cat) => {
                      const isActive = activeCategory === cat.slug;
                      return (
                        <button
                          key={cat.slug}
                          onMouseEnter={() => setActiveCategory(cat.slug)}
                          onClick={() => setActiveCategory(cat.slug)}
                          className={`group flex items-center justify-between text-left py-2.5 font-headline uppercase tracking-widest text-sm transition-colors ${
                            isActive
                              ? "text-primary font-bold"
                              : "text-foreground hover:text-primary"
                          }`}
                        >
                          {cat.label}
                          <ChevronRight
                            className={`w-3.5 h-3.5 transition-all ${
                              isActive
                                ? "text-primary translate-x-0.5"
                                : "opacity-0 group-hover:opacity-60"
                            }`}
                          />
                        </button>
                      );
                    })}
                  </div>

                  {/* Right: subproducts grid OR single hero */}
                  <div className="col-span-8 lg:col-span-9">
                    {activeCat.products.length > 0 ? (
                      <div className="grid grid-cols-2 lg:grid-cols-3 gap-5">
                        {/* Overview card */}
                        <Link
                          href={`/${activeCat.slug}`}
                          className="group relative overflow-hidden col-span-2 lg:col-span-1 row-span-1 lg:row-span-2 bg-foreground"
                        >
                          <img
                            src={activeCat.image}
                            alt={activeCat.label}
                            className="absolute inset-0 w-full h-full object-cover opacity-60 transition-all duration-500 group-hover:opacity-80 group-hover:scale-105"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-foreground via-foreground/50 to-transparent" />
                          <div className="relative z-10 p-5 h-full min-h-[180px] lg:min-h-[280px] flex flex-col justify-end">
                            <span className="text-[10px] font-bold uppercase tracking-widest text-primary mb-2">
                              Alle ansehen
                            </span>
                            <h3 className="text-xl font-bold text-primary-foreground mb-1">
                              {activeCat.label}
                            </h3>
                            <p className="text-xs text-primary-foreground/70 line-clamp-2">
                              {activeCat.shortDesc}
                            </p>
                          </div>
                        </Link>

                        {/* Subproducts */}
                        {activeCat.products.map((p) => (
                          <Link
                            key={p.slug}
                            href={`/${activeCat.slug}/${p.slug}`}
                            className="group block"
                          >
                            <div className="relative aspect-[4/3] overflow-hidden mb-3">
                              <img
                                src={p.image}
                                alt={p.label}
                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                              />
                              <div className="absolute inset-0 bg-foreground/10 group-hover:bg-foreground/0 transition-all" />
                            </div>
                            <h4 className="text-sm font-bold mb-1 group-hover:text-primary transition-colors">
                              {p.label}
                            </h4>
                            <p className="text-xs text-secondary line-clamp-2">
                              {p.shortDesc}
                            </p>
                          </Link>
                        ))}
                      </div>
                    ) : (
                      // Single-product category: big hero card
                      <Link
                        href={`/${activeCat.slug}`}
                        className="group relative block overflow-hidden bg-foreground aspect-[16/9]"
                      >
                        <img
                          src={activeCat.image}
                          alt={activeCat.label}
                          className="absolute inset-0 w-full h-full object-cover opacity-70 transition-all duration-500 group-hover:opacity-90 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-foreground via-foreground/40 to-transparent" />
                        <div className="relative z-10 p-8 h-full flex flex-col justify-end">
                          <span className="text-[10px] font-bold uppercase tracking-widest text-primary mb-3">
                            Kategorie
                          </span>
                          <h3 className="text-3xl font-bold text-primary-foreground mb-2">
                            {activeCat.label}
                          </h3>
                          <p className="text-sm text-primary-foreground/80 max-w-md mb-4">
                            {activeCat.longDesc}
                          </p>
                          <span className="inline-flex items-center gap-2 text-primary font-bold uppercase tracking-widest text-xs group-hover:gap-3 transition-all">
                            Entdecken <ArrowRight className="w-4 h-4" />
                          </span>
                        </div>
                      </Link>
                    )}
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-outline-variant/15 flex items-center justify-between">
                  <p className="text-xs text-secondary">
                    {hasConfigurator(activeCat.slug)
                      ? "Alle Systeme individuell konfigurierbar – kostenlose Beratung inklusive."
                      : "Persönliche Beratung – wir kommen kostenlos zu Ihnen vor Ort."}
                  </p>
                  {hasConfigurator(activeCat.slug) ? (
                    <Link
                      href={`/konfigurator/${activeCat.slug}`}
                      className="flex items-center gap-2 text-primary font-headline uppercase tracking-widest text-xs font-bold hover:opacity-70 transition-opacity"
                    >
                      {activeCat.label}-Konfigurator <ArrowRight className="w-4 h-4" />
                    </Link>
                  ) : (
                    <Link
                      href="/kontakt"
                      className="flex items-center gap-2 text-primary font-headline uppercase tracking-widest text-xs font-bold hover:opacity-70 transition-opacity"
                    >
                      Beratung anfragen <ArrowRight className="w-4 h-4" />
                    </Link>
                  )}
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
