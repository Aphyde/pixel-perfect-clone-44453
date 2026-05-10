import type { Metadata } from "next";
import Wartungspakete from "@/views/Wartungspakete";
import JsonLd from "@/components/seo/JsonLd";
import {
  buildBreadcrumbSchema,
  buildServiceSchema,
  buildWebPageSchema,
} from "@/lib/seo/schema";
import { buildMetadata } from "@/lib/seo/metadata";
import { SERVICE_AREA } from "@/lib/seo/site";

export const metadata: Metadata = buildMetadata({
  title: "Wartungspakete für Terrassendächer & Pergolen ab Ulm",
  description:
    "Monatliche, jährliche oder 3-Jahres-Wartungspakete für Aluminium-Terrassendächer, Markisen und Lamellen-Pergolen. Inklusive Inspektion, Reinigung, Tuchprüfung — ab 14,90 € im Monat.",
  path: "/wartungspakete",
  keywords: [
    "Wartung Terrassendach",
    "Pergola Wartung",
    "Markisen Wartung Ulm",
    "Wartungsvertrag Aluminium",
  ],
});

export default function WartungspaketePage() {
  const url = "/wartungspakete";
  const breadcrumb = buildBreadcrumbSchema([
    { name: "Startseite", url: "/" },
    { name: "Wartungspakete", url },
  ]);
  const service = buildServiceSchema({
    name: "Wartung von Terrassenüberdachungen, Pergolen und Markisen",
    description:
      "Inspektions-, Reinigungs- und Service-Pakete für Brait-Überdachungen und Fremdfabrikate in Ulm und Umgebung.",
    url,
    serviceType: "Wartung und Inspektion von Outdoor-Konstruktionen",
    areaServed: SERVICE_AREA.primaryCities,
  });
  const webpage = buildWebPageSchema({
    url,
    name: "Wartungspakete — Brait Überdachungen",
    description: "Werterhalt und Funktionssicherung Ihrer Überdachung.",
    breadcrumbId: breadcrumb["@id"] as string,
  });
  return (
    <>
      <JsonLd data={[webpage, breadcrumb, service]} />
      <Wartungspakete />
    </>
  );
}
