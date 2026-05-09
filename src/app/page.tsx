import type { Metadata } from "next";
import Index from "@/views/Index";

export const metadata: Metadata = {
  title: "Brait Überdachungen – Terrassendächer in Ulm",
  description:
    "Premium Aluminium-Terrassenüberdachungen, Markisen und Lamellen-Pergolen aus Ulm. Maßgefertigt, montiert vom eigenen Team. Kostenloser Demo-Koffer-Termin.",
  alternates: { canonical: "/" },
  openGraph: {
    url: "/",
    title: "Brait Überdachungen – Terrassendächer in Ulm",
    description:
      "Premium Aluminium-Terrassenüberdachungen, Markisen und Pergolen in Ulm und Umgebung.",
  },
};

export default function HomePage() {
  return (
    <>
      <link
        rel="preload"
        as="image"
        type="image/avif"
        imageSrcSet="/hero/hero-home-414.avif 414w, /hero/hero-home-640.avif 640w, /hero/hero-home-828.avif 828w, /hero/hero-home-1080.avif 1080w, /hero/hero-home-1280.avif 1280w"
        imageSizes="100vw"
        fetchPriority="high"
      />
      <Index />
    </>
  );
}
