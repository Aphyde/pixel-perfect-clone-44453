#!/usr/bin/env node
/**
 * Post-build: inlines Next.js's CSS files into prerendered HTML.
 * Eliminates the render-blocking <link rel="stylesheet"> on first paint,
 * cutting ~500-700ms LCP on slow connections (PageSpeed simulator).
 *
 * The original <link> tags are preserved as media="print" + onload swap,
 * so they still get cached for client-side navigation.
 */
const fs = require("fs");
const path = require("path");

const NEXT_DIR = path.join(__dirname, "..", ".next");
const SERVER_APP = path.join(NEXT_DIR, "server", "app");
const STATIC_CSS = path.join(NEXT_DIR, "static", "css");

if (!fs.existsSync(SERVER_APP) || !fs.existsSync(STATIC_CSS)) {
  console.log("[inline-css] no build output, skipping");
  process.exit(0);
}

const cssCache = new Map();
function readCss(href) {
  const file = href.replace("/_next/static/css/", "");
  if (cssCache.has(file)) return cssCache.get(file);
  const full = path.join(STATIC_CSS, file);
  if (!fs.existsSync(full)) return null;
  const css = fs.readFileSync(full, "utf8");
  cssCache.set(file, css);
  return css;
}

function walk(dir, out = []) {
  for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, ent.name);
    if (ent.isDirectory()) walk(p, out);
    else if (ent.isFile() && ent.name.endsWith(".html")) out.push(p);
  }
  return out;
}

const linkRe =
  /<link\s+rel="stylesheet"\s+href="(\/_next\/static\/css\/[^"]+)"\s+data-precedence="next"\s*\/?>/g;

let totalFiles = 0;
let totalInlined = 0;
let totalBytes = 0;

for (const htmlPath of walk(SERVER_APP)) {
  let html = fs.readFileSync(htmlPath, "utf8");
  const matches = [...html.matchAll(linkRe)];
  if (matches.length === 0) continue;

  let inlinedCss = "";
  let asyncLinks = "";
  for (const [, href] of matches) {
    const css = readCss(href);
    if (!css) continue;
    inlinedCss += css;
    // Re-load the same file lazily so it lands in HTTP cache for client nav
    asyncLinks += `<link rel="preload" href="${href}" as="style"/><link rel="stylesheet" href="${href}" media="print" onload="this.media='all'"/><noscript><link rel="stylesheet" href="${href}"/></noscript>`;
  }

  if (!inlinedCss) continue;

  const replacement = `<style data-inline="next">${inlinedCss}</style>${asyncLinks}`;

  // Replace ALL stylesheet links in one shot at the position of the first one
  let firstReplaced = false;
  html = html.replace(linkRe, () => {
    if (!firstReplaced) {
      firstReplaced = true;
      return replacement;
    }
    return "";
  });

  fs.writeFileSync(htmlPath, html);
  totalFiles++;
  totalInlined += matches.length;
  totalBytes += inlinedCss.length;
}

console.log(
  `[inline-css] inlined ${totalInlined} stylesheet(s) into ${totalFiles} HTML file(s) (${(
    totalBytes / 1024
  ).toFixed(1)} KiB)`
);
