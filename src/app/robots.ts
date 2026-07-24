import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo/site";

/**
 * Such- und Social-Crawler bleiben voll zugelassen (SEO/Link-Previews).
 * KI-Crawler (Training/Answer-Engines) werden von den Konfigurator-Seiten
 * und den Produkt-Render-Assets ausgesperrt.
 */
const SEARCH_SOCIAL_CRAWLERS = [
  "Googlebot",
  "Bingbot",
  "DuckDuckBot",
  "Applebot",
  "facebookexternalhit",
  "Twitterbot",
  "LinkedInBot",
];

const AI_CRAWLERS = [
  "GPTBot",
  "OAI-SearchBot",
  "ChatGPT-User",
  "ClaudeBot",
  "Claude-Web",
  "anthropic-ai",
  "PerplexityBot",
  "Perplexity-User",
  "Google-Extended",
  "Applebot-Extended",
  "CCBot",
  "cohere-ai",
  "YouBot",
  "Bytespider",
  "Mistral-Bot",
  "Meta-ExternalAgent",
  "Amazonbot",
];

const COMMON_DISALLOW = ["/anfrage", "/api/"];

/** Konfigurator-Seiten + zugehoerige Render-/Produktbilder */
const AI_DISALLOW = [
  ...COMMON_DISALLOW,
  "/konfigurator",
  "/markisen/",
  "/qbus/",
  "/veranda/",
  "/konfigurator-bg.jpg",
  "/architecture-detail.jpg",
  "/detail-terrasse.jpg",
  "/hero-carport.jpg",
];

export default function robots(): MetadataRoute.Robots {
  const searchRules: MetadataRoute.Robots["rules"] = SEARCH_SOCIAL_CRAWLERS.map((ua) => ({
    userAgent: ua,
    allow: "/",
    disallow: COMMON_DISALLOW,
  }));

  const aiRules: MetadataRoute.Robots["rules"] = AI_CRAWLERS.map((ua) => ({
    userAgent: ua,
    allow: "/",
    disallow: AI_DISALLOW,
  }));

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: COMMON_DISALLOW,
      },
      ...searchRules,
      ...aiRules,
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
