import type { Metadata } from "next";
import Kontakt from "@/views/Kontakt";
import JsonLd from "@/components/seo/JsonLd";
import {
  buildBreadcrumbSchema,
  buildContactPageSchema,
  buildWebPageSchema,
} from "@/lib/seo/schema";
import { buildMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = buildMetadata({
  title: "Kontakt & Demo-Koffer-Termin Ulm",
  description:
    "Brait Überdachungen kontaktieren: Telefon 0173 530 3581, info@brait-ueberdachung.de oder kostenlosen Demo-Koffer-Termin in Ulm und 100 km Umkreis vereinbaren.",
  path: "/kontakt",
  keywords: ["Kontakt Brait", "Demo-Koffer", "Beratung Ulm", "Terrasse Beratung"],
});

export default function KontaktPage() {
  const url = "/kontakt";
  const breadcrumb = buildBreadcrumbSchema([
    { name: "Startseite", url: "/" },
    { name: "Kontakt", url },
  ]);
  const contactPage = buildContactPageSchema({ url });
  const webpage = buildWebPageSchema({
    url,
    name: "Kontakt — Brait Überdachungen Ulm",
    description:
      "Telefon, E-Mail, Anschrift und Demo-Koffer-Termin von Brait Überdachungen.",
    breadcrumbId: breadcrumb["@id"] as string,
  });
  return (
    <>
      <JsonLd data={[webpage, breadcrumb, contactPage]} />
      <Kontakt />
    </>
  );
}
