import type { Metadata } from "next";
import Service from "@/views/Service";

export const metadata: Metadata = {
  title: "Service & Montage in Ulm",
  description:
    "Beratung, digitales Aufmaß, Montage und Abnahme – alles aus einer Hand. Persönlicher Service für Terrassendächer, Markisen und Pergolen in Ulm und Umgebung.",
  alternates: { canonical: "/service" },
  openGraph: {
    url: "/service",
    title: "Service & Montage – Brait Überdachungen Ulm",
    description: "Vom Beratungsgespräch bis zur fertigen Montage – Ihr Komplettservice in Ulm.",
  },
};

export default function ServicePage() {
  return <Service />;
}
