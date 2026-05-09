import type { Metadata } from "next";
import { Suspense } from "react";
import Anfrage from "@/views/Anfrage";

export const metadata: Metadata = {
  title: "Angebotsanfrage",
  description:
    "Senden Sie uns Ihre Konfiguration unverbindlich zu – wir antworten innerhalb von 24 Stunden mit einem detaillierten Angebot.",
  alternates: { canonical: "/anfrage" },
  robots: { index: false, follow: true },
};

export default function AnfragePage() {
  return (
    <Suspense fallback={null}>
      <Anfrage />
    </Suspense>
  );
}
