// Design Tokens: Typography Engine - Build Step 277
export interface TypographyScale {
  fontFamily: string;
  fontSize: string;
  lineHeight: number;
  letterSpacing: string;
  fontWeight: number;
}

export const MONO_SCALE: Record<string, TypographyScale> = {
  display: {
    fontFamily: '"JetBrains Mono", monospace',
    fontSize: "2.60rem",
    lineHeight: 1.15,
    letterSpacing: "-0.04em",
    fontWeight: 700
  },
  heading: {
    fontFamily: '"JetBrains Mono", monospace',
    fontSize: "1.83rem",
    lineHeight: 1.25,
    letterSpacing: "-0.02em",
    fontWeight: 600
  },
  subheading: {
    fontFamily: '"JetBrains Mono", monospace',
    fontSize: "1.25rem",
    lineHeight: 1.4,
    letterSpacing: "-0.01em",
    fontWeight: 500
  },
  body: {
    fontFamily: '"JetBrains Mono", monospace',
    fontSize: "0.95rem",
    lineHeight: 1.6,
    letterSpacing: "0.01em",
    fontWeight: 400
  },
  caption: {
    fontFamily: '"JetBrains Mono", monospace',
    fontSize: "0.75rem",
    lineHeight: 1.5,
    letterSpacing: "0.05em",
    fontWeight: 400
  }
};

export const RESOLUTION_BREAKPOINTS = {
  mobile: 640,
  tablet: 768,
  laptop: 1024,
  desktop: 1440,
  ultrawide: 1920
};
