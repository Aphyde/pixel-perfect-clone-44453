import ProductPageTemplate, { type ProductPageData } from "@/components/ProductPageTemplate";
import heroImg from "@/assets/hero-terrasse.jpg";
import detailImg from "@/assets/detail-terrasse.jpg";
import carportImg from "@/assets/product-carport.jpg";
import wintergartenImg from "@/assets/product-wintergarten.jpg";

const data: ProductPageData = {
  badge: "Terrassenüberdachungen",
  title: "Perfekter Schutz.",
  titleAccent: "Maximaler Genuss.",
  subtitle: "Hochwertige Aluminium-Glas-Systeme für ganzjährigen Terrassengenuss – individuell geplant und präzise montiert.",
  heroImage: heroImg,
  detailImage: detailImg,
  introLabel: "Das System",
  introTitle: "Architektur, die schützt und begeistert.",
  introText: "Unsere Terrassenüberdachungen verbinden ästhetische Eleganz mit ingenieurtechnischer Präzision. Pulverbeschichtete Aluminium-Profile und VSG-Sicherheitsglas schaffen eine langlebige Konstruktion, die Wind und Wetter trotzt – und dabei jede Fassade aufwertet. Ob flach, geneigt oder als Walmdach: Wir realisieren Ihre Vorstellung maßgenau.",
  features: [
    { title: "VSG-Sicherheitsglas", desc: "Verbund-Sicherheitsglas als Standard – höchste Bruchsicherheit und UV-Schutz für Ihre Terrasse." },
    { title: "Integrierte Entwässerung", desc: "Verdeckte Wasserführung in den Profilen – keine sichtbaren Regenrinnen oder Fallrohre." },
    { title: "Modulare Erweiterung", desc: "Seitenwände, Schiebetüren und Beschattung lassen sich jederzeit nachrüsten." },
    { title: "Individuelle Farben", desc: "Über 200 RAL-Farbtöne für perfekte Abstimmung auf Ihre Fassade." },
    { title: "LED-Beleuchtung", desc: "Optional integrierte LED-Spots und Lichtleisten für stimmungsvolle Abende." },
    { title: "10 Jahre Garantie", desc: "Auf Statik und Oberflächenveredelung – für sorgenfreien Langzeitgenuss." },
  ],
  specs: [
    { label: "Material Tragwerk", value: "Aluminium EN AW-6060 T66" },
    { label: "Verglasung", value: "VSG 10mm (2×5mm Float)" },
    { label: "Max. Breite", value: "7.000 mm" },
    { label: "Max. Tiefe", value: "5.000 mm" },
    { label: "Schneelast", value: "bis 150 kg/m²" },
    { label: "Dachneigung", value: "5° – 45°" },
    { label: "Oberflächenveredelung", value: "Pulverbeschichtung nach GSB" },
    { label: "Garantie", value: "10 Jahre Struktur, 5 Jahre Oberfläche" },
  ],
  ctaTitle: "Ihre Terrasse verdient das Beste.",
  ctaText: "Konfigurieren Sie jetzt Ihre individuelle Terrassenüberdachung oder kontaktieren Sie uns für eine persönliche Beratung.",
  otherProducts: [
    { title: "Carports", image: carportImg, link: "/carports" },
    { title: "Wintergärten", image: wintergartenImg, link: "/wintergaerten" },
  ],
};

const Terrassenueberdachungen = () => <ProductPageTemplate data={data} />;
export default Terrassenueberdachungen;
