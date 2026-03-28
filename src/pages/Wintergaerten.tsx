import ProductPageTemplate, { type ProductPageData } from "@/components/ProductPageTemplate";
import heroImg from "@/assets/hero-wintergarten.jpg";
import detailImg from "@/assets/detail-wintergarten.jpg";
import terrasseImg from "@/assets/product-terrassenueberdachung.jpg";
import carportImg from "@/assets/product-carport.jpg";

const data: ProductPageData = {
  badge: "Wintergärten",
  title: "Wohnraum trifft",
  titleAccent: "Natur.",
  subtitle: "Lichtdurchflutete Konstruktionen mit höchster Wärmedämmung – Ihr ganzjähriger Lieblingsplatz.",
  heroImage: heroImg,
  detailImage: detailImg,
  introLabel: "Das Erlebnis",
  introTitle: "Leben im Licht, geschützt vor jedem Wetter.",
  introText: "Ein Brait-Wintergarten erweitert Ihren Wohnraum um eine lichtdurchflutete Oase. Thermisch getrennte Aluminium-Profile und Isolierverglasung schaffen ein Raumklima, das zu jeder Jahreszeit überzeugt. Ob Wohnwintergarten, Kaltwintergarten oder Sommergarten – wir realisieren Ihr Projekt von der Planung bis zur schlüsselfertigen Übergabe.",
  features: [
    { title: "Thermische Trennung", desc: "Hochdämmende Profile mit Polyamid-Stegen verhindern Wärmebrücken und Kondensat." },
    { title: "Isolierverglasung", desc: "2-fach oder 3-fach Isolierglas mit Ug-Werten bis 0,5 W/m²K für maximale Energieeffizienz." },
    { title: "Beschattungssysteme", desc: "Integrierte Markisen, Raffstores oder Plissees – innen oder außen, motorisiert steuerbar." },
    { title: "Schiebe- & Faltsysteme", desc: "Großflächige Öffnungselemente für nahtlosen Übergang zwischen Innen und Außen." },
    { title: "Belüftungskonzepte", desc: "Motorisierte Lüftungsklappen und Dachfenster für optimales Raumklima im Sommer." },
    { title: "Schlüsselfertig", desc: "Von der Bodenplatte bis zur Elektrik – wir liefern Ihren Wintergarten komplett bezugsfertig." },
  ],
  specs: [
    { label: "Profilsystem", value: "Aluminium mit thermischer Trennung" },
    { label: "Verglasung Dach", value: "VSG 2-fach Isolierglas" },
    { label: "Verglasung Seiten", value: "3-fach Isolierglas (Ug 0,5)" },
    { label: "Max. Spannweite", value: "6.000 mm ohne Stütze" },
    { label: "Schneelast", value: "bis 200 kg/m²" },
    { label: "U-Wert Gesamtkonstruktion", value: "ab 1,1 W/m²K" },
    { label: "Beschattung", value: "Integriert (innen/außen)" },
    { label: "Garantie", value: "10 Jahre Struktur, 5 Jahre Dichtigkeit" },
  ],
  ctaTitle: "Ihr neuer Lieblingsraum wartet.",
  ctaText: "Planen Sie jetzt Ihren individuellen Wintergarten – unverbindlich und persönlich.",
  otherProducts: [
    { title: "Terrassenüberdachungen", image: terrasseImg, link: "/terrassenueberdachungen" },
    { title: "Carports", image: carportImg, link: "/carports" },
  ],
};

const Wintergaerten = () => <ProductPageTemplate data={data} />;
export default Wintergaerten;
