import Layout from "@/components/Layout";
import { FadeIn, StaggerContainer, StaggerItem, ScaleIn } from "@/components/ScrollAnimations";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import type { Category } from "@/data/products";

interface Props {
  category: Category;
  otherCategories: { label: string; image: string; link: string }[];
}

const CategoryPageTemplate = ({ category, otherCategories }: Props) => (
  <Layout>
    {/* Hero */}
    <section className="relative h-[70svh] min-h-[420px] max-h-[700px] flex items-end pb-12 md:pb-20 overflow-hidden bg-foreground">
      <div className="absolute inset-0 opacity-50">
        <motion.img
          src={category.image}
          alt={category.label}
          className="w-full h-full object-cover"
          width={1920}
          height={1080}
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-foreground via-foreground/40 to-transparent" />
      <div className="container mx-auto px-5 md:px-8 relative z-10">
        <motion.span
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="inline-block bg-primary text-primary-foreground px-3 py-1 text-[10px] md:text-xs font-bold tracking-[0.3em] uppercase mb-4"
        >
          Kategorie
        </motion.span>
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="text-[2rem] sm:text-5xl md:text-7xl font-bold text-primary-foreground leading-[0.9] tracking-tighter break-words"
        >
          {category.label}
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
          className="text-sm md:text-lg text-primary-foreground/60 max-w-xl mt-4 md:mt-6"
        >
          {category.longDesc}
        </motion.p>
      </div>
    </section>

    {/* Subproducts grid */}
    <section className="py-16 md:py-32 bg-surface">
      <div className="container mx-auto px-5 md:px-8">
        <FadeIn className="mb-10 md:mb-16">
          <label className="text-primary text-[10px] md:text-xs font-bold tracking-[0.4em] uppercase mb-3 block">
            Unsere Modelle
          </label>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tighter">
            Wählen Sie Ihr System
          </h2>
        </FadeIn>
        <StaggerContainer
          className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6"
          staggerDelay={0.12}
        >
          {category.products.map((product) => (
            <StaggerItem key={product.slug}>
              <Link
                to={`/${category.slug}/${product.slug}`}
                className="group block h-full"
              >
                <div className="relative overflow-hidden aspect-[16/10] mb-5">
                  <img
                    src={product.image}
                    alt={product.label}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                    width={1280}
                    height={800}
                  />
                  <div className="absolute inset-0 bg-foreground/20 group-hover:bg-foreground/5 transition-all duration-300" />
                </div>
                <h3 className="text-xl md:text-2xl font-bold mb-2 group-hover:text-primary transition-colors">
                  {product.label}
                </h3>
                <p className="text-secondary text-sm md:text-base leading-relaxed mb-3">
                  {product.shortDesc}
                </p>
                <span className="inline-flex items-center gap-2 text-primary font-bold uppercase tracking-widest text-xs group-hover:gap-3 transition-all">
                  Mehr erfahren <ArrowRight className="w-4 h-4" />
                </span>
              </Link>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>

    {/* CTA */}
    <section className="py-16 md:py-32 bg-foreground">
      <div className="container mx-auto px-5 md:px-8 text-center">
        <FadeIn distance={60}>
          <h2 className="text-[1.75rem] sm:text-4xl md:text-6xl font-bold text-primary-foreground tracking-tighter mb-6 break-words">
            Unsicher, welches System passt?
          </h2>
        </FadeIn>
        <FadeIn delay={0.2}>
          <p className="text-base md:text-xl text-primary-foreground/60 max-w-2xl mx-auto mb-8 md:mb-12">
            Wir beraten Sie persönlich vor Ort – kostenlos und unverbindlich.
          </p>
        </FadeIn>
        <FadeIn delay={0.4}>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              to="/konfigurator"
              className="bg-primary text-primary-foreground px-10 py-5 font-bold uppercase tracking-widest text-xs md:text-sm hover:bg-primary-container transition-all"
            >
              Jetzt Konfigurieren
            </Link>
            <Link
              to="/kontakt"
              className="border border-primary-foreground/20 text-primary-foreground px-10 py-5 font-bold uppercase tracking-widest text-xs md:text-sm hover:bg-primary-foreground hover:text-foreground transition-all"
            >
              Kontakt Aufnehmen
            </Link>
          </div>
        </FadeIn>
      </div>
    </section>

    {/* Other categories */}
    {otherCategories.length > 0 && (
      <section className="py-16 md:py-24 bg-surface">
        <div className="container mx-auto px-5 md:px-8">
          <FadeIn className="mb-8 md:mb-12">
            <label className="text-primary text-[10px] md:text-xs font-bold tracking-[0.4em] uppercase mb-3 block">
              Weitere Kategorien
            </label>
            <h2 className="text-2xl md:text-4xl font-bold tracking-tighter">
              Entdecken Sie auch
            </h2>
          </FadeIn>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4">
            {otherCategories.map((c) => (
              <ScaleIn key={c.label}>
                <Link
                  to={c.link}
                  className="group block relative overflow-hidden aspect-[16/10]"
                >
                  <img
                    src={c.image}
                    alt={c.label}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                    width={960}
                    height={600}
                  />
                  <div className="absolute inset-0 bg-foreground/40 group-hover:bg-foreground/20 transition-all" />
                  <div className="absolute bottom-4 left-4 md:bottom-6 md:left-6 flex items-center gap-3">
                    <h3 className="text-lg md:text-xl font-bold text-primary-foreground">
                      {c.label}
                    </h3>
                    <ArrowRight className="w-5 h-5 text-primary-foreground group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              </ScaleIn>
            ))}
          </div>
        </div>
      </section>
    )}
  </Layout>
);

export default CategoryPageTemplate;
