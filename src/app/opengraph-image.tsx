import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Ashmit Kathat — UI/UX Designer & Design Engineer";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "60px",
          backgroundColor: "#F4F5F7",
          fontFamily: "system-ui, sans-serif",
          position: "relative",
        }}
      >
        {/* Outer 1px Hairline Structural Border */}
        <div
          style={{
            position: "absolute",
            inset: "24px",
            border: "1px solid #DDE1E7",
            borderRadius: "16px",
            pointerEvents: "none",
          }}
        />

        {/* Top Header Row */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          {/* Status Pill Badge */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              padding: "8px 16px",
              backgroundColor: "#FFFFFF",
              border: "1px solid #DDE1E7",
              borderRadius: "999px",
            }}
          >
            <div
              style={{
                width: "8px",
                height: "8px",
                borderRadius: "999px",
                backgroundColor: "#107C41",
              }}
            />
            <span
              style={{
                fontSize: "14px",
                fontWeight: 700,
                color: "#111315",
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                fontFamily: "monospace",
              }}
            >
              AVAILABLE FOR SUMMER & FALL INTERNSHIPS
            </span>
          </div>

          {/* Coordinates Telemetry */}
          <div
            style={{
              fontSize: "14px",
              color: "#5A6065",
              fontFamily: "monospace",
              letterSpacing: "0.06em",
              textTransform: "uppercase",
            }}
          >
            JAIPUR, IN // 26.9124° N // IST (UTC+5:30)
          </div>
        </div>

        {/* Center Display Identity & Editorial Headline */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "12px",
            maxWidth: "960px",
          }}
        >
          <div
            style={{
              fontSize: "64px",
              fontWeight: 800,
              color: "#111315",
              letterSpacing: "-0.04em",
              lineHeight: 1.05,
            }}
          >
            Ashmit Kathat
          </div>

          <div
            style={{
              fontSize: "26px",
              fontWeight: 500,
              color: "#5A6065",
              lineHeight: 1.35,
            }}
          >
            UI/UX Designer & Design Engineer • Bridging multi-variant Figma systems,
            tactile React 19 micro-physics, and AI orchestration.
          </div>
        </div>

        {/* Bottom Bento Metric Strip */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "16px",
            width: "100%",
          }}
        >
          {/* Tile 1: 100% Token Parity */}
          <div
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              padding: "16px 20px",
              backgroundColor: "#FFFFFF",
              border: "1px solid #DDE1E7",
              borderRadius: "10px",
            }}
          >
            <div
              style={{
                fontSize: "11px",
                fontFamily: "monospace",
                color: "#FF4F00",
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: "0.08em",
              }}
            >
              FIGMA ⇄ REACT
            </div>
            <div
              style={{
                fontSize: "28px",
                fontWeight: 800,
                color: "#111315",
                marginTop: "4px",
              }}
            >
              100% Token Parity
            </div>
          </div>

          {/* Tile 2: 0.82s Latency */}
          <div
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              padding: "16px 20px",
              backgroundColor: "#FFFFFF",
              border: "1px solid #DDE1E7",
              borderRadius: "10px",
            }}
          >
            <div
              style={{
                fontSize: "11px",
                fontFamily: "monospace",
                color: "#0047FF",
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: "0.08em",
              }}
            >
              FLOODWATCH AI GIS
            </div>
            <div
              style={{
                fontSize: "28px",
                fontWeight: 800,
                color: "#111315",
                marginTop: "4px",
              }}
            >
              0.82s Field Latency
            </div>
          </div>

          {/* Tile 3: -44% Cognitive Load */}
          <div
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              padding: "16px 20px",
              backgroundColor: "#FFFFFF",
              border: "1px solid #DDE1E7",
              borderRadius: "10px",
            }}
          >
            <div
              style={{
                fontSize: "11px",
                fontFamily: "monospace",
                color: "#107C41",
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: "0.08em",
              }}
            >
              DEVMATE MENTORS
            </div>
            <div
              style={{
                fontSize: "28px",
                fontWeight: 800,
                color: "#111315",
                marginTop: "4px",
              }}
            >
              -44% Mental Load
            </div>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
