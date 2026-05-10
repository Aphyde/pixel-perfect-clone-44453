import type { Metadata, Viewport } from "next";
import { Space_Grotesk, Manrope } from "next/font/google";
import { Providers } from "./providers";
import ScrollToTop from "@/components/ScrollToTop";
import Telemetry from "@/components/Telemetry";
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
    default: "Brait Überdachungen – Terrassendächer, Markisen & Lamellen-Pergolen in Ulm",
    template: "%s · Brait Überdachungen",
  },
  description:
    "Premium Aluminium-Terrassenüberdachungen, Markisen, Lamellen-Pergolen und Carports in Ulm und Umgebung. Maßgefertigt, montiert vom eigenen Team, mit kostenlosem Demo-Koffer-Termin vor Ort.",
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
    languages: {
      "de-DE": SITE_URL,
      "x-default": SITE_URL,
    },
  },
  openGraph: {
    type: "website",
    locale: "de_DE",
    url: SITE_URL,
    siteName: "Brait Überdachungen",
    title: "Brait Überdachungen – Terrassendächer in Ulm",
    description:
      "Premium Aluminium-Terrassenüberdachungen, Markisen und Pergolen in Ulm. Maßgefertigt, vom eigenen Montageteam installiert.",
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
        <Telemetry />
      </body>
    </html>
  );
}
