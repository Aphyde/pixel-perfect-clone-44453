import { NextResponse } from "next/server";
import { z } from "zod";

const FROM = process.env.RESEND_FROM ?? "anfrage@brait-ueberdachung.de";
const TO = process.env.RESEND_TO ?? "info@brait-ueberdachung.de";

const ConfigOptionSchema = z.object({
  label: z.string(),
  value: z.string(),
});

const PayloadSchema = z.object({
  name: z.string().min(2).max(120),
  email: z.string().email().max(160),
  phone: z.string().max(60).optional().or(z.literal("")),
  ort: z.string().max(120).optional().or(z.literal("")),
  message: z.string().max(4000).optional().or(z.literal("")),
  privacy: z.boolean(),
  config: z
    .object({
      category: z.string().optional(),
      categorySlug: z.string().optional(),
      options: z.array(ConfigOptionSchema).optional(),
      width: z.number().optional(),
      depth: z.number().optional(),
      extras: z.array(z.string()).optional(),
      totalPrice: z.number().optional(),
      deliveryTime: z.string().optional(),
    })
    .optional(),
});

const escapeHtml = (s: string) =>
  s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");

const formatPrice = (p: number) =>
  new Intl.NumberFormat("de-DE", { style: "currency", currency: "EUR" }).format(p);

function buildHtml(p: z.infer<typeof PayloadSchema>) {
  const c = p.config;
  const optionsHtml = c?.options?.length
    ? `<ul>${c.options
        .map(
          (o) =>
            `<li><strong>${escapeHtml(o.label)}:</strong> ${escapeHtml(o.value)}</li>`,
        )
        .join("")}</ul>`
    : "";
  return `
<!doctype html>
<html lang="de">
<body style="font-family:system-ui,-apple-system,sans-serif;color:#1c1b1b;line-height:1.5">
  <h2>Neue Anfrage über brait-ueberdachung.de</h2>
  <h3>Kontakt</h3>
  <p>
    <strong>Name:</strong> ${escapeHtml(p.name)}<br>
    <strong>E-Mail:</strong> <a href="mailto:${escapeHtml(p.email)}">${escapeHtml(p.email)}</a><br>
    ${p.phone ? `<strong>Telefon:</strong> ${escapeHtml(p.phone)}<br>` : ""}
    ${p.ort ? `<strong>Ort:</strong> ${escapeHtml(p.ort)}<br>` : ""}
  </p>
  ${p.message ? `<h3>Nachricht</h3><p>${escapeHtml(p.message).replace(/\n/g, "<br>")}</p>` : ""}
  ${
    c
      ? `<h3>Konfiguration: ${escapeHtml(c.category ?? "—")}</h3>
         ${optionsHtml}
         ${c.width && c.depth ? `<p><strong>Maße:</strong> ${c.width.toFixed(1)} × ${c.depth.toFixed(1)} m</p>` : ""}
         ${c.extras?.length ? `<p><strong>Extras:</strong> ${c.extras.map(escapeHtml).join(", ")}</p>` : ""}
         ${c.totalPrice !== undefined ? `<p><strong>Geschätzter Preis:</strong> ${formatPrice(c.totalPrice)}</p>` : ""}
         ${c.deliveryTime ? `<p><strong>Lieferzeit:</strong> ${escapeHtml(c.deliveryTime)}</p>` : ""}`
      : ""
  }
</body>
</html>
  `.trim();
}

export async function POST(req: Request) {
  let json: unknown;
  try {
    json = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON body" }, { status: 400 });
  }

  const parsed = PayloadSchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, error: "Validation failed", issues: parsed.error.issues },
      { status: 400 },
    );
  }
  if (!parsed.data.privacy) {
    return NextResponse.json(
      { ok: false, error: "Datenschutz muss akzeptiert werden." },
      { status: 400 },
    );
  }

  const apiKey = process.env.RESEND_API_KEY;

  // Ohne API-Key loggen wir die Anfrage nur und antworten erfolgreich – so
  // bleibt das Formular sofort funktionsfähig (z. B. lokal/preview), während
  // produktiv via RESEND_API_KEY echte Mails versendet werden.
  if (!apiKey) {
    if (process.env.NODE_ENV !== "production") {
      console.info("[anfrage] no RESEND_API_KEY configured, skipping send", parsed.data);
    } else {
      console.warn("[anfrage] RESEND_API_KEY missing in production environment");
    }
    return NextResponse.json({
      ok: true,
      mailed: false,
      reason: "no_api_key",
    });
  }

  try {
    const html = buildHtml(parsed.data);
    const subject = parsed.data.config?.category
      ? `Anfrage – ${parsed.data.config.category} – ${parsed.data.name}`
      : `Anfrage – ${parsed.data.name}`;

    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        from: FROM,
        to: [TO],
        reply_to: parsed.data.email,
        subject,
        html,
      }),
    });

    if (!res.ok) {
      const text = await res.text();
      console.error("[anfrage] resend error", res.status, text);
      return NextResponse.json(
        {
          ok: false,
          error: "Mailversand fehlgeschlagen.",
          status: res.status,
          detail: text.slice(0, 500),
        },
        { status: 502 },
      );
    }

    return NextResponse.json({ ok: true, mailed: true });
  } catch (err) {
    console.error("[anfrage] unexpected error", err);
    return NextResponse.json({ ok: false, error: "Serverfehler." }, { status: 500 });
  }
}
