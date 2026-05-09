import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import ConfiguratorEngine from "@/components/konfigurator/ConfiguratorEngine";
import { configurators } from "@/data/configurators";

interface Params {
  categorySlug: string;
}

export function generateStaticParams(): Params[] {
  return Object.keys(configurators).map((categorySlug) => ({ categorySlug }));
}

export function generateMetadata({ params }: { params: Params }): Metadata {
  const config = configurators[params.categorySlug];
  if (!config) {
    return { title: "Konfigurator nicht gefunden" };
  }
  const url = `/konfigurator/${params.categorySlug}`;
  return {
    title: `${config.label}-Konfigurator`,
    description: config.shortDesc,
    alternates: { canonical: url },
    openGraph: {
      url,
      title: `${config.label}-Konfigurator – Brait Überdachungen`,
      description: config.shortDesc,
    },
    robots: { index: true, follow: true },
  };
}

export default function KonfiguratorPage({ params }: { params: Params }) {
  const config = configurators[params.categorySlug];
  if (!config) notFound();

  // useSearchParams() in der Engine triggert sonst Dynamic Rendering – die
  // Suspense-Boundary stellt sicher, dass die Shell weiterhin statisch bleibt.
  return (
    <Suspense fallback={null}>
      <ConfiguratorEngine config={config} />
    </Suspense>
  );
}
