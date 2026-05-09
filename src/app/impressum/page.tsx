import type { Metadata } from "next";
import Impressum from "@/views/Impressum";

export const metadata: Metadata = {
  title: "Impressum",
  description: "Impressum von Brait Überdachungen – Anbieterkennzeichnung gemäß § 5 TMG.",
  alternates: { canonical: "/impressum" },
  robots: { index: true, follow: true },
};

export default function ImpressumPage() {
  return <Impressum />;
}
