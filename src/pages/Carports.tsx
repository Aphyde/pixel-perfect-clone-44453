import ProductPageTemplate, { type ProductPageData } from "@/components/ProductPageTemplate";
import heroImg from "@/assets/hero-carport.jpg";
import detailImg from "@/assets/detail-carport.jpg";
import terrasseImg from "@/assets/product-terrassenueberdachung.jpg";
import wintergartenImg from "@/assets/product-wintergarten.jpg";

const data: ProductPageData = {
  badge: "Carports",
  title: "Stilvoller Schutz.",
  titleAccent: "Für Ihr Fahrzeug.",
  subtitle: "Freistehend oder als Anbau – unsere Aluminium-Carports vereinen Design und Funktion auf höchstem Niveau.",
  heroImage: heroImg,
  detailImage: detailImg,
  introLabel: "Das Konzept",
  introTitle: "Mehr als nur ein Unterstand.",
  introText: "Ein Brait-Carport ist ein architektonisches Statement. Schlanke Aluminium-Profile tragen Dachflächen aus VSG-Glas oder HPL-Platten – und schützen Ihr Fahrzeug dabei zuverlässig vor Regen, Hagel und UV-Strahlung. Ob Einzel-, Doppel- oder Reihencarport: Wir planen nach Ihren Maßen und Wünschen.",
  features: [
    { title: "Freistehend oder Anbau", desc: "Flexible Konstruktion als freistehende Variante oder direkt an Ihr Gebäude angebaut." },
    { title: "Hagelschutz", desc: "VSG-Glas oder HPL-Platten bieten zuverlässigen Schutz vor Hagelschäden." },
    { title: "Integrierte Beleuchtung", desc: "LED-Spots und Bewegungsmelder für Sicherheit und Komfort bei Dunkelheit." },
    { title: "Ladestation-Ready", desc: "Vorbereitung für E-Auto-Wallbox – Kabelkanäle bereits in den Profilen integriert." },
    { title: "Wartungsfrei", desc: "Pulverbeschichtetes Aluminium benötigt keine Nachbehandlung – auch nach Jahren nicht." },
    { title: "Schneelastgeprüft", desc: "Statisch berechnet für regionale Schneelastzonen – Sicherheit garantiert." },
  ],
  specs: [
    { label: "Material Tragwerk", value: "Aluminium EN AW-6060 T66" },
    { label: "Eindeckung", value: "VSG-Glas oder HPL-Platten" },
    { label: "Max. Breite (Einzelstellplatz)", value: "3.500 mm" },
    { label: "Max. Breite (Doppelstellplatz)", value: "6.500 mm" },
    { label: "Max. Tiefe", value: "7.000 mm" },
    { label: "Schneelast", value: "bis 200 kg/m²" },
    { label: "Durchfahrtshöhe", value: "2.100 – 2.500 mm" },
    { label: "Garantie", value: "10 Jahre Struktur" },
  ],
  ctaTitle: "Schutz, der Eindruck macht.",
  ctaText: "Konfigurieren Sie Ihren individuellen Carport oder lassen Sie sich persönlich beraten.",
  otherProducts: [
    { title: "Terrassenüberdachungen", image: terrasseImg, link: "/terrassenueberdachungen" },
    { title: "Wintergärten", image: wintergartenImg, link: "/wintergaerten" },
  ],
};

const Carports = () => <ProductPageTemplate data={data} />;
export default Carports;
