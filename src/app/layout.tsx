import type { Metadata, Viewport } from "next";
import { Space_Grotesk, Manrope } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Providers } from "./providers";
import ScrollToTop from "@/components/ScrollToTop";
import JsonLd from "@/components/seo/JsonLd";
import {
  buildLocalBusinessSchema,
  buildOrganizationSchema,
  buildWebSiteSchema,
} from "@/lib/seo/schema";
import { SITE_URL } from "@/lib/seo/site";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-headline",
  weight: ["300", "400", "500", "600", "700"],
});

const manrope = Manrope({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-body",
  weight: ["200", "300", "400", "500", "600", "700", "800"],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#1c1b1b",
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Terrassendach Ulm — Brait Aluminium & Carport-Profi",
    template: "%s · Brait Überdachungen",
  },
  description:
    "Terrassendach, Carport, Markisen & Lamellen-Pergolen in Ulm. Premium Aluminium, eigenes Montageteam, 10 Jahre Garantie. Demo-Koffer kostenlos anfordern.",
  applicationName: "Brait Überdachungen",
  authors: [{ name: "Brait Überdachungen" }],
  generator: "Next.js",
  keywords: [
    "Terrassenüberdachung Ulm",
    "Aluminium Terrassendach",
    "Lamellendach Pergola",
    "Markisen Ulm",
    "Carport Ulm",
    "Glashaus",
    "Brait Überdachungen",
  ],
  alternates: {
    canonical: "/",
    // Single-Language-Site: "de" self-referential + "x-default" als Fallback.
    // de-DE waere redundant und wuerde "URL multiple times"-Warnungen triggern.
    languages: {
      de: "/",
      "x-default": "/",
    },
  },
  openGraph: {
    type: "website",
    locale: "de_DE",
    url: SITE_URL,
    siteName: "Brait Überdachungen",
    title: "Terrassendach Ulm — Brait Aluminium & Carport-Profi",
    description:
      "Terrassendach, Carport, Markisen & Lamellen-Pergolen in Ulm. Premium Aluminium, eigenes Montageteam, 10 Jahre Garantie. Demo-Koffer kostenlos anfordern.",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Brait Überdachungen – Premium Terrassendächer aus Aluminium",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Brait Überdachungen – Terrassendächer in Ulm",
    description: "Premium Aluminium-Terrassenüberdachungen in Ulm und Umgebung.",
    images: ["/opengraph-image"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/favicon.png",
    apple: "/favicon.png",
  },
  formatDetection: {
    telephone: true,
    email: true,
    address: true,
  },
};

const globalSchemaGraph = [
  buildOrganizationSchema(),
  buildLocalBusinessSchema(),
  buildWebSiteSchema(),
];

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="de" className={`${spaceGrotesk.variable} ${manrope.variable}`}>
      <head>
        <JsonLd id="schema-global" data={globalSchemaGraph} />
      </head>
      <body className="font-body antialiased">
        <Providers>
          <ScrollToTop />
          {children}
        </Providers>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
