/* eslint-disable @next/next/no-img-element */
import { ImageResponse } from "next/og";

export const ogSize = { width: 1200, height: 630 };
export const ogContentType = "image/png";

export interface OgImageProps {
  badge: string;
  title: string;
  subtitle: string;
  /** Optionales Hintergrundbild (absolute URL). */
  bgImage?: string;
}

/**
 * Wiederverwendbare OG-Image-Generator-Funktion. Wird von
 * route-level opengraph-image.tsx Files aufgerufen.
 */
export async function renderOgImage({ badge, title, subtitle, bgImage }: OgImageProps) {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          position: "relative",
          background:
            "linear-gradient(135deg, #1f1e1d 0%, #2c2a28 50%, #1c1b1b 100%)",
          color: "#ffffff",
          padding: "80px",
          fontFamily: "system-ui, -apple-system, sans-serif",
        }}
      >
        {bgImage && (
          <>
            <img
              src={bgImage}
              alt=""
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                objectFit: "cover",
                opacity: 0.35,
              }}
            />
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                background:
                  "linear-gradient(135deg, rgba(28,27,27,0.85) 0%, rgba(28,27,27,0.55) 50%, rgba(28,27,27,0.85) 100%)",
              }}
            />
          </>
        )}

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "16px",
            fontSize: "26px",
            fontWeight: 700,
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            color: "#a07845",
            position: "relative",
            zIndex: 2,
          }}
        >
          <span
            style={{
              width: "8px",
              height: "32px",
              background: "#a07845",
              display: "block",
            }}
          />
          {badge}
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "28px",
            position: "relative",
            zIndex: 2,
          }}
        >
          <div
            style={{
              fontSize: "76px",
              fontWeight: 700,
              lineHeight: 0.95,
              letterSpacing: "-0.03em",
              maxWidth: "1000px",
            }}
          >
            {title}
          </div>
          <div
            style={{
              fontSize: "30px",
              fontWeight: 400,
              color: "rgba(255,255,255,0.78)",
              maxWidth: "920px",
              lineHeight: 1.3,
            }}
          >
            {subtitle}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            fontSize: "22px",
            color: "rgba(255,255,255,0.7)",
            position: "relative",
            zIndex: 2,
          }}
        >
          <span style={{ fontWeight: 600 }}>brait-ueberdachung.de</span>
          <span style={{ color: "#a07845", fontWeight: 700 }}>0173 530 3581</span>
        </div>
      </div>
    ),
    { ...ogSize },
  );
}
