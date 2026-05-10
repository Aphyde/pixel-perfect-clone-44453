import { ImageResponse } from "next/og";

export const runtime = "edge";

export const alt = "Brait Überdachungen – Premium Terrassendächer aus Aluminium in Ulm";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background:
            "linear-gradient(135deg, #1f1e1d 0%, #2c2a28 50%, #1c1b1b 100%)",
          color: "#ffffff",
          padding: "80px",
          fontFamily: "system-ui, -apple-system, sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "16px",
            fontSize: "28px",
            fontWeight: 700,
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            color: "#a07845",
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
          Brait Überdachungen
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "32px" }}>
          <div
            style={{
              fontSize: "84px",
              fontWeight: 700,
              lineHeight: 0.95,
              letterSpacing: "-0.03em",
              maxWidth: "900px",
            }}
          >
            Premium Terrassen&shy;dächer aus{" "}
            <span style={{ color: "#a07845" }}>Aluminium</span>.
          </div>
          <div
            style={{
              fontSize: "32px",
              fontWeight: 400,
              color: "rgba(255,255,255,0.7)",
              maxWidth: "880px",
            }}
          >
            Maßgefertigt in Ulm — montiert vom eigenen Team. Demo-Koffer kostenlos anfordern.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            fontSize: "20px",
            color: "rgba(255,255,255,0.55)",
          }}
        >
          <span>brait-ueberdachung.de</span>
          <span style={{ color: "#a07845", fontWeight: 700 }}>0173 530 3581</span>
        </div>
      </div>
    ),
    { ...size },
  );
}
