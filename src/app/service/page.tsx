import type { Metadata } from "next";
import Service from "@/views/Service";
import JsonLd from "@/components/seo/JsonLd";
import {
  buildBreadcrumbSchema,
  buildServiceSchema,
  buildWebPageSchema,
} from "@/lib/seo/schema";
import { buildMetadata } from "@/lib/seo/metadata";
import { SERVICE_AREA } from "@/lib/seo/site";

export const metadata: Metadata = buildMetadata({
  title: "Service & Montage Ulm — Beratung, Aufmaß, Installation",
  description:
    "Beratung, digitales 3D-Aufmaß, Montage durch eigenes Team und Endabnahme — alles aus einer Hand. Brait Überdachungen Ulm betreut Sie von der Idee bis zum Aufbau.",
  path: "/service",
  keywords: [
    "Terrassendach Montage Ulm",
    "Markise Montage",
    "Service Brait",
    "Aufmaß 3D",
  ],
});

export default function ServicePage() {
  const url = "/service";
  const breadcrumb = buildBreadcrumbSchema([
    { name: "Startseite", url: "/" },
    { name: "Service", url },
  ]);
  const service = buildServiceSchema({
    name: "Beratung, Aufmaß und Montage von Überdachungen in Ulm",
    description:
      "Persönliche Beratung mit Demo-Koffer, digitales 3D-Aufmaß und Montage durch das Brait-Team in Ulm und Umgebung — bis 100 km Radius.",
    url,
    serviceType: "Montage und Aufmaß für Terrassenüberdachungen, Markisen und Pergolen",
    areaServed: SERVICE_AREA.primaryCities,
  });
  const webpage = buildWebPageSchema({
    url,
    name: "Service — Brait Überdachungen Ulm",
    description: "Komplettservice von der Beratung bis zur Endabnahme.",
    breadcrumbId: breadcrumb["@id"] as string,
  });
  return (
    <>
      <JsonLd data={[webpage, breadcrumb, service]} />
      <Service />
    </>
  );
}
