/**
 * Kunden-Bestätigungs-Email für eingehende Anfragen.
 *
 * Design-Prinzipien für Email-HTML:
 * - Table-based Layout (Outlook 2007+ rendert nur via tables)
 * - Inline-Styles (Gmail strippt <style>-Blöcke teilweise)
 * - Max-width 600px, mobile-first
 * - Absolute Bild-URLs (https://...)
 * - Keine SVG-Logos (in vielen Clients geblockt) → Wordmark als Text
 * - Webfonts werden teilweise nicht geladen → System-Stack mit Fallback
 */
import { SITE_URL, BRAND, CONTACT, ADDRESS, SOCIAL_PROFILES } from "@/lib/seo/site";

export interface CustomerEmailConfig {
  category?: string;
  categorySlug?: string;
  options?: { label?: string; value?: string }[];
  width?: number;
  depth?: number;
  extras?: string[];
  totalPrice?: number;
  deliveryTime?: string;
}

export interface CustomerEmailPayload {
  name?: string;
  email?: string;
  phone?: string;
  ort?: string;
  message?: string;
  config?: CustomerEmailConfig;
}

/* ── Brand-Tokens (entsprechen globals.css :root) ───────────────────── */
const COLOR = {
  primary: "#7C5731", // Bronze (--primary HSL 28 47 33)
  primaryDark: "#5a3f23",
  primarySoft: "#f4ece1", // helles Bronze-Tint
  background: "#FBFAF8", // Site-Background
  surface: "#ffffff",
  surfaceMuted: "#F4F1ED",
  border: "#E1D8CD",
  borderSoft: "#EEECE9",
  text: "#1C1B1B",
  textMuted: "#4D4036",
  textSubtle: "#8A7E72",
  ctaBg: "#1C1B1B",
  ctaText: "#FFFFFF",
} as const;

const FONT_BODY =
  "-apple-system, BlinkMacSystemFont, 'Segoe UI', Manrope, Helvetica, Arial, sans-serif";
const FONT_HEAD =
  "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Space Grotesk', Helvetica, Arial, sans-serif";

/* ── Bild-Mapping nach Kategorie ────────────────────────────────────── */
function categoryImage(slug?: string): string {
  const map: Record<string, string> = {
    terrassenueberdachungen: "/product-terrassenueberdachung.jpg",
    carports: "/product-carport.jpg",
    wintergaerten: "/product-wintergarten.jpg",
    markisen: "/architecture-detail.jpg",
    schirme: "/architecture-detail.jpg",
    eingangsueberdachungen: "/architecture-detail.jpg",
    lamellendach: "/detail-terrasse.jpg",
    "qbus-pergola": "/detail-terrasse.jpg",
  };
  const path = (slug && map[slug]) || "/hero-home.jpg";
  return `${SITE_URL}${path}`;
}

/* ── Helpers ────────────────────────────────────────────────────────── */
const escapeHtml = (s: string) =>
  s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");

const formatPrice = (p: number) =>
  new Intl.NumberFormat("de-DE", { style: "currency", currency: "EUR", maximumFractionDigits: 0 }).format(p);

const firstName = (full: string) => full.trim().split(/\s+/)[0] ?? full;

/* ── Sektionen ──────────────────────────────────────────────────────── */
function renderHeader(): string {
  const heroUrl = `${SITE_URL}/hero-home.jpg`;
  return `
  <tr>
    <td style="padding:0;background:${COLOR.ctaBg};">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="border-collapse:collapse;">
        <tr>
          <td style="background-image:linear-gradient(135deg, rgba(28,27,27,0.55) 0%, rgba(28,27,27,0.85) 100%), url('${heroUrl}'); background-size:cover; background-position:center; background-color:${COLOR.ctaBg}; padding:56px 32px; text-align:center;">
            <div style="font-family:${FONT_HEAD}; font-size:11px; letter-spacing:3px; text-transform:uppercase; color:${COLOR.primarySoft}; margin-bottom:14px;">
              Premium-Überdachungen seit 2014
            </div>
            <div style="font-family:${FONT_HEAD}; font-size:32px; font-weight:600; line-height:1.1; color:#ffffff; letter-spacing:-0.5px;">
              ${BRAND}
            </div>
            <div style="margin-top:12px; font-family:${FONT_BODY}; font-size:15px; color:rgba(255,255,255,0.85); line-height:1.5;">
              Aluminium · Glas · Markisen · Carports
            </div>
          </td>
        </tr>
      </table>
    </td>
  </tr>`;
}

function renderThanks(name: string): string {
  const display = name?.trim() ? escapeHtml(firstName(name)) : "und herzlich willkommen";
  return `
  <tr>
    <td style="padding:48px 32px 16px 32px;">
      <h1 style="margin:0 0 16px 0; font-family:${FONT_HEAD}; font-size:26px; font-weight:600; line-height:1.25; color:${COLOR.text}; letter-spacing:-0.3px;">
        Vielen Dank für Ihre Anfrage,<br>${display}.
      </h1>
      <p style="margin:0 0 14px 0; font-family:${FONT_BODY}; font-size:16px; line-height:1.65; color:${COLOR.textMuted};">
        Ihre Anfrage ist bei uns angekommen. Wir prüfen sie sorgfältig und melden uns
        innerhalb von <strong style="color:${COLOR.text};">24 Stunden</strong> bei Ihnen
        – an Werktagen meist deutlich schneller.
      </p>
      <p style="margin:0; font-family:${FONT_BODY}; font-size:16px; line-height:1.65; color:${COLOR.textMuted};">
        Sollte etwas dringend sein, erreichen Sie uns persönlich unter
        <a href="tel:${CONTACT.phoneE164}" style="color:${COLOR.primary}; text-decoration:underline;">${CONTACT.phoneDisplay}</a>.
      </p>
    </td>
  </tr>`;
}

function renderConfiguration(p: CustomerEmailPayload): string {
  const c = p.config;
  if (!c || (!c.category && !c.options?.length && !c.totalPrice)) return "";

  const imgUrl = categoryImage(c.categorySlug);

  const optionsRows =
    c.options?.length
      ? c.options
          .map(
            (o) => `
        <tr>
          <td style="padding:10px 0; border-bottom:1px solid ${COLOR.borderSoft}; font-family:${FONT_BODY}; font-size:13px; color:${COLOR.textSubtle}; vertical-align:top; width:42%;">
            ${escapeHtml(o.label ?? "")}
          </td>
          <td style="padding:10px 0; border-bottom:1px solid ${COLOR.borderSoft}; font-family:${FONT_BODY}; font-size:14px; color:${COLOR.text}; font-weight:500;">
            ${escapeHtml(o.value ?? "")}
          </td>
        </tr>`,
          )
          .join("")
      : "";

  const sizeRow =
    c.width && c.depth
      ? `
        <tr>
          <td style="padding:10px 0; border-bottom:1px solid ${COLOR.borderSoft}; font-family:${FONT_BODY}; font-size:13px; color:${COLOR.textSubtle}; vertical-align:top;">Maße</td>
          <td style="padding:10px 0; border-bottom:1px solid ${COLOR.borderSoft}; font-family:${FONT_BODY}; font-size:14px; color:${COLOR.text}; font-weight:500;">
            ${c.width.toFixed(1)} × ${c.depth.toFixed(1)} m
          </td>
        </tr>`
      : "";

  const extrasRow =
    c.extras?.length
      ? `
        <tr>
          <td style="padding:10px 0; border-bottom:1px solid ${COLOR.borderSoft}; font-family:${FONT_BODY}; font-size:13px; color:${COLOR.textSubtle}; vertical-align:top;">Extras</td>
          <td style="padding:10px 0; border-bottom:1px solid ${COLOR.borderSoft}; font-family:${FONT_BODY}; font-size:14px; color:${COLOR.text}; font-weight:500;">
            ${c.extras.map(escapeHtml).join(", ")}
          </td>
        </tr>`
      : "";

  const deliveryRow = c.deliveryTime
    ? `
        <tr>
          <td style="padding:10px 0; border-bottom:1px solid ${COLOR.borderSoft}; font-family:${FONT_BODY}; font-size:13px; color:${COLOR.textSubtle}; vertical-align:top;">Lieferzeit</td>
          <td style="padding:10px 0; border-bottom:1px solid ${COLOR.borderSoft}; font-family:${FONT_BODY}; font-size:14px; color:${COLOR.text}; font-weight:500;">
            ${escapeHtml(c.deliveryTime)}
          </td>
        </tr>`
    : "";

  const priceBlock =
    c.totalPrice !== undefined
      ? `
      <tr>
        <td style="padding:20px 24px; background:${COLOR.primarySoft}; border-top:2px solid ${COLOR.primary};">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
            <tr>
              <td style="font-family:${FONT_BODY}; font-size:13px; color:${COLOR.textMuted}; letter-spacing:0.5px; text-transform:uppercase;">
                Geschätzter Investitionsrahmen
              </td>
              <td align="right" style="font-family:${FONT_HEAD}; font-size:22px; color:${COLOR.primaryDark}; font-weight:700; letter-spacing:-0.3px;">
                ${formatPrice(c.totalPrice)}
              </td>
            </tr>
            <tr>
              <td colspan="2" style="padding-top:6px; font-family:${FONT_BODY}; font-size:12px; color:${COLOR.textMuted}; line-height:1.5;">
                Unverbindliche Online-Schätzung. Das finale Angebot erstellen wir nach Aufmaß vor Ort.
              </td>
            </tr>
          </table>
        </td>
      </tr>`
      : "";

  return `
  <tr>
    <td style="padding:8px 32px 32px 32px;">
      <div style="font-family:${FONT_BODY}; font-size:11px; letter-spacing:2px; text-transform:uppercase; color:${COLOR.primary}; margin-bottom:10px;">
        Ihre Konfiguration
      </div>
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="border:1px solid ${COLOR.border}; background:${COLOR.surface};">
        ${
          c.categorySlug
            ? `
        <tr>
          <td style="padding:0; line-height:0;">
            <img src="${imgUrl}" alt="${escapeHtml(c.category ?? "Konfiguration")}" width="600" style="display:block; width:100%; max-width:600px; height:auto; object-fit:cover;">
          </td>
        </tr>`
            : ""
        }
        <tr>
          <td style="padding:24px 24px 8px 24px;">
            <h2 style="margin:0 0 4px 0; font-family:${FONT_HEAD}; font-size:20px; font-weight:600; color:${COLOR.text}; letter-spacing:-0.2px;">
              ${escapeHtml(c.category ?? "Individuelle Anfrage")}
            </h2>
            <p style="margin:0; font-family:${FONT_BODY}; font-size:13px; color:${COLOR.textSubtle};">
              Konfiguration aus dem Online-Konfigurator
            </p>
          </td>
        </tr>
        <tr>
          <td style="padding:8px 24px 16px 24px;">
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="border-collapse:collapse;">
              ${optionsRows}
              ${sizeRow}
              ${extrasRow}
              ${deliveryRow}
            </table>
          </td>
        </tr>
        ${priceBlock}
      </table>
    </td>
  </tr>`;
}

function renderMessage(p: CustomerEmailPayload): string {
  if (!p.message) return "";
  return `
  <tr>
    <td style="padding:0 32px 32px 32px;">
      <div style="font-family:${FONT_BODY}; font-size:11px; letter-spacing:2px; text-transform:uppercase; color:${COLOR.primary}; margin-bottom:10px;">
        Ihre Nachricht
      </div>
      <div style="padding:20px 22px; background:${COLOR.surfaceMuted}; border-left:3px solid ${COLOR.primary}; font-family:${FONT_BODY}; font-size:15px; line-height:1.65; color:${COLOR.text}; white-space:pre-wrap;">
        ${escapeHtml(p.message).replace(/\n/g, "<br>")}
      </div>
    </td>
  </tr>`;
}

function renderContact(p: CustomerEmailPayload): string {
  const name = p.name ?? "";
  const email = p.email ?? "";
  const items = [
    {
      label: "Telefon",
      value: CONTACT.phoneDisplay,
      href: `tel:${CONTACT.phoneE164}`,
    },
    {
      label: "WhatsApp",
      value: CONTACT.phoneDisplay,
      href: `https://wa.me/${CONTACT.whatsapp.replace(/[^0-9]/g, "")}`,
    },
    {
      label: "E-Mail",
      value: CONTACT.email,
      href: `mailto:${CONTACT.email}`,
    },
  ];

  const itemsHtml = items
    .map(
      (i) => `
      <tr>
        <td style="padding:14px 0; border-bottom:1px solid ${COLOR.borderSoft};">
          <div style="font-family:${FONT_BODY}; font-size:11px; letter-spacing:1.5px; text-transform:uppercase; color:${COLOR.textSubtle}; margin-bottom:2px;">${i.label}</div>
          <a href="${i.href}" style="font-family:${FONT_BODY}; font-size:16px; color:${COLOR.text}; text-decoration:none; font-weight:500;">${i.value}</a>
        </td>
      </tr>`,
    )
    .join("");

  const submittedHtml =
    p.phone || p.ort || name
      ? `
        <tr>
          <td style="padding:18px 0 0 0;">
            <div style="font-family:${FONT_BODY}; font-size:12px; color:${COLOR.textSubtle}; line-height:1.55;">
              Sie haben uns folgende Kontaktdaten übermittelt:<br>
              ${name ? `<strong style="color:${COLOR.text};">${escapeHtml(name)}</strong>` : ""}${p.ort ? ` · ${escapeHtml(p.ort)}` : ""}${p.phone ? ` · ${escapeHtml(p.phone)}` : ""}<br>
              ${escapeHtml(email)}
            </div>
          </td>
        </tr>`
      : "";

  return `
  <tr>
    <td style="padding:0 32px 32px 32px;">
      <div style="font-family:${FONT_BODY}; font-size:11px; letter-spacing:2px; text-transform:uppercase; color:${COLOR.primary}; margin-bottom:10px;">
        So erreichen Sie uns
      </div>
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="border-collapse:collapse; padding:0 4px;">
        ${itemsHtml}
        ${submittedHtml}
      </table>
    </td>
  </tr>`;
}

function renderInstagram(): string {
  const url = SOCIAL_PROFILES.instagram;
  if (!url) return "";
  const referenceImg = `${SITE_URL}/architecture-detail.jpg`;
  return `
  <tr>
    <td style="padding:0 32px 32px 32px;">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:${COLOR.text}; border-collapse:collapse;">
        <tr>
          <td style="padding:0; line-height:0;">
            <img src="${referenceImg}" alt="Realisiertes Brait-Projekt" width="600" style="display:block; width:100%; max-width:600px; height:200px; object-fit:cover; opacity:0.55;">
          </td>
        </tr>
        <tr>
          <td style="padding:32px 28px; text-align:center; background:${COLOR.text};">
            <div style="font-family:${FONT_BODY}; font-size:11px; letter-spacing:2.5px; text-transform:uppercase; color:${COLOR.primarySoft}; margin-bottom:10px;">
              Folgen Sie uns
            </div>
            <h2 style="margin:0 0 10px 0; font-family:${FONT_HEAD}; font-size:22px; font-weight:600; color:#ffffff; letter-spacing:-0.2px;">
              @braitueberdachung
            </h2>
            <p style="margin:0 0 20px 0; font-family:${FONT_BODY}; font-size:14px; line-height:1.6; color:rgba(255,255,255,0.75); max-width:420px; margin-left:auto; margin-right:auto;">
              Echte Projekte, Material-Insights und Vorher-Nachher-Bilder aus unserer Werkstatt
              und von Montagen in Ulm und Umgebung.
            </p>
            <a href="${url}" style="display:inline-block; padding:12px 28px; background:${COLOR.primary}; color:#ffffff; font-family:${FONT_BODY}; font-size:14px; font-weight:600; letter-spacing:0.3px; text-decoration:none;">
              Auf Instagram folgen →
            </a>
          </td>
        </tr>
      </table>
    </td>
  </tr>`;
}

function renderFooter(): string {
  const fbUrl = SOCIAL_PROFILES.facebook;
  const igUrl = SOCIAL_PROFILES.instagram;
  return `
  <tr>
    <td style="padding:0 32px 40px 32px;">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="border-top:1px solid ${COLOR.border};">
        <tr>
          <td style="padding-top:28px;">
            <div style="font-family:${FONT_HEAD}; font-size:18px; font-weight:600; color:${COLOR.text}; letter-spacing:-0.2px;">
              ${BRAND}
            </div>
            <div style="font-family:${FONT_BODY}; font-size:13px; color:${COLOR.textSubtle}; margin-top:4px; line-height:1.6;">
              ${ADDRESS.street} · ${ADDRESS.postalCode} ${ADDRESS.city}<br>
              ${ADDRESS.region} · Deutschland
            </div>
            <div style="margin-top:16px;">
              ${
                igUrl
                  ? `<a href="${igUrl}" style="display:inline-block; margin-right:14px; font-family:${FONT_BODY}; font-size:13px; color:${COLOR.primary}; text-decoration:none; font-weight:500;">Instagram</a>`
                  : ""
              }
              ${
                fbUrl
                  ? `<a href="${fbUrl}" style="display:inline-block; margin-right:14px; font-family:${FONT_BODY}; font-size:13px; color:${COLOR.primary}; text-decoration:none; font-weight:500;">Facebook</a>`
                  : ""
              }
              <a href="${SITE_URL}" style="display:inline-block; margin-right:14px; font-family:${FONT_BODY}; font-size:13px; color:${COLOR.primary}; text-decoration:none; font-weight:500;">Website</a>
              <a href="${SITE_URL}/referenzprojekte" style="display:inline-block; font-family:${FONT_BODY}; font-size:13px; color:${COLOR.primary}; text-decoration:none; font-weight:500;">Referenzen</a>
            </div>
            <div style="margin-top:24px; padding-top:18px; border-top:1px solid ${COLOR.borderSoft}; font-family:${FONT_BODY}; font-size:11px; line-height:1.6; color:${COLOR.textSubtle};">
              Diese E-Mail wurde automatisch generiert, weil Sie ein Formular auf
              <a href="${SITE_URL}" style="color:${COLOR.textSubtle}; text-decoration:underline;">brait-ueberdachung.de</a>
              ausgefüllt haben.<br>
              <a href="${SITE_URL}/impressum" style="color:${COLOR.textSubtle}; text-decoration:underline;">Impressum</a> ·
              <a href="${SITE_URL}/datenschutz" style="color:${COLOR.textSubtle}; text-decoration:underline;">Datenschutz</a>
            </div>
          </td>
        </tr>
      </table>
    </td>
  </tr>`;
}

/* ── Public API ─────────────────────────────────────────────────────── */
export function buildCustomerConfirmationSubject(p: CustomerEmailPayload): string {
  if (p.config?.category) {
    return `Ihre Anfrage zu ${p.config.category} – wir melden uns | ${BRAND}`;
  }
  return `Ihre Anfrage ist bei uns angekommen | ${BRAND}`;
}

export function buildCustomerConfirmationHtml(p: CustomerEmailPayload): string {
  const fn = p.name?.trim() ? firstName(p.name) : "";
  const preheader = fn
    ? `Wir haben Ihre Anfrage erhalten und melden uns innerhalb von 24 Stunden, ${escapeHtml(fn)}.`
    : "Wir haben Ihre Anfrage erhalten und melden uns innerhalb von 24 Stunden.";

  return `<!doctype html>
<html lang="de">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="x-apple-disable-message-reformatting">
  <meta name="color-scheme" content="light">
  <meta name="supported-color-schemes" content="light">
  <title>${escapeHtml(buildCustomerConfirmationSubject(p))}</title>
  <!--[if mso]>
  <style type="text/css">
    body, table, td { font-family: Arial, Helvetica, sans-serif !important; }
  </style>
  <![endif]-->
</head>
<body style="margin:0; padding:0; background:${COLOR.background}; color:${COLOR.text}; font-family:${FONT_BODY}; -webkit-font-smoothing:antialiased; -webkit-text-size-adjust:none;">
  <div style="display:none; visibility:hidden; opacity:0; max-height:0; max-width:0; overflow:hidden; mso-hide:all; font-size:1px; line-height:1px; color:${COLOR.background};">
    ${preheader}
  </div>
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:${COLOR.background}; border-collapse:collapse;">
    <tr>
      <td align="center" style="padding:24px 16px;">
        <table role="presentation" width="600" cellpadding="0" cellspacing="0" border="0" style="width:100%; max-width:600px; background:${COLOR.surface}; border:1px solid ${COLOR.border}; border-collapse:collapse;">
          ${renderHeader()}
          ${renderThanks(p.name ?? "")}
          ${renderConfiguration(p)}
          ${renderMessage(p)}
          ${renderContact(p)}
          ${renderInstagram()}
          ${renderFooter()}
        </table>
        <table role="presentation" width="600" cellpadding="0" cellspacing="0" border="0" style="width:100%; max-width:600px;">
          <tr>
            <td align="center" style="padding:18px 12px 0 12px; font-family:${FONT_BODY}; font-size:11px; color:${COLOR.textSubtle}; line-height:1.6;">
              © ${new Date().getFullYear()} ${BRAND} · ${ADDRESS.city}
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}
