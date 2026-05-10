import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo/site";

/**
 * AI-Crawler werden explizit gelistet — die meisten Anbieter
 * (OpenAI, Anthropic, Perplexity, Google) bevorzugen Sites,
 * die ihre User-Agents ausdrücklich erlauben.
 */
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
  "Googlebot",
  "Bingbot",
  "Applebot",
  "Applebot-Extended",
  "CCBot",
  "cohere-ai",
  "YouBot",
  "Bytespider",
  "DuckDuckBot",
  "facebookexternalhit",
  "Twitterbot",
  "LinkedInBot",
  "Mistral-Bot",
];

const COMMON_DISALLOW = ["/anfrage", "/api/"];

export default function robots(): MetadataRoute.Robots {
  const aiRules: MetadataRoute.Robots["rules"] = AI_CRAWLERS.map((ua) => ({
    userAgent: ua,
    allow: "/",
    disallow: COMMON_DISALLOW,
  }));

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: COMMON_DISALLOW,
      },
      ...aiRules,
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
