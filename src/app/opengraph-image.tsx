import { ImageResponse } from "next/og";

export const alt = "Luqman Hadi — Mohamed Luqman Hadi Bin Mohamed Suhairi";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * Share card. Deliberately Latin-only: ImageResponse ships no CJK glyphs
 * unless a font file is embedded, and katakana would render as tofu.
 *
 * Colours are the dark-theme tokens from globals.css, hard-coded because this
 * renders outside the page and cannot read CSS variables.
 */
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#0c0c0b",
          color: "#e9e6e0",
          padding: "72px",
          fontFamily: "monospace",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              fontSize: 22,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "#e8724f",
            }}
          >
            luqmanhadi.com
          </div>
          <div style={{ fontSize: 76, marginTop: 28, fontWeight: 600 }}>
            Luqman Hadi Suhairi
          </div>
          <div style={{ fontSize: 27, marginTop: 18, color: "#918d85" }}>
            Mohamed Luqman Hadi Bin Mohamed Suhairi
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ height: 2, width: 160, background: "#e8724f" }} />
          <div style={{ fontSize: 27, marginTop: 26, color: "#e9e6e0" }}>
            AI Systems Development, Kobe Institute of Computing
          </div>
          <div style={{ fontSize: 23, marginTop: 12, color: "#918d85" }}>
            MEXT Scholar · Cloud &amp; infrastructure · Kobe, Japan
          </div>
        </div>
      </div>
    ),
    size,
  );
}
