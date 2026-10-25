import type { Metadata } from "next";
import { Instrument_Serif, Plus_Jakarta_Sans, JetBrains_Mono } from "next/font/google";
import { XRayProvider } from "@/context/XRayContext";
import { Toaster } from "sonner";
import { MotionProvider } from "@/components/ui/MotionProvider";
import "./globals.css";

const instrumentSerif = Instrument_Serif({
  weight: "400",
  style: ["normal", "italic"],
  subsets: ["latin"],
  variable: "--font-instrument-serif",
  display: "swap",
});

const plusJakartaSans = Plus_Jakarta_Sans({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-plus-jakarta-sans",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  weight: ["400", "500", "600"],
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://ashmitkathat.com"),
  title: {
    default: "Ashmit Kathat — UI/UX Designer & Design Engineer",
    template: "%s | Ashmit Kathat",
  },
  description:
    "Portfolio of Ashmit Kathat. Bridging Figma system architectures, tactile React interfaces, and AI orchestration. Available for Summer & Fall Internships.",
  keywords: [
    "Ashmit Kathat",
    "Design Engineer",
    "UI/UX Designer",
    "Product Designer",
    "Design Systems Architect",
    "React 19",
    "Tailwind CSS",
    "Figma Variables",
    "DevMate Mentors",
    "FloodWatch AI",
    "Jaipur",
  ],
  authors: [{ name: "Ashmit Kathat", url: "https://ashmitkathat.com" }],
  creator: "Ashmit Kathat",
  publisher: "Ashmit Kathat",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Ashmit Kathat — UI/UX Designer & Design Engineer",
    description:
      "Bridging Figma system architectures, tactile React interfaces, and AI orchestration. Available for Summer & Fall Internships.",
    url: "https://ashmitkathat.com",
    siteName: "Ashmit Kathat — Design Engineer & Systems Portfolio",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Ashmit Kathat — UI/UX Designer & Design Engineer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Ashmit Kathat — UI/UX Designer & Design Engineer",
    description:
      "Bridging multi-variant Figma systems, tactile React micro-physics, and AI orchestration.",
    creator: "@ashmit_kathat",
    images: ["/opengraph-image"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
    apple: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Ashmit Kathat",
    jobTitle: "UI/UX Designer & Design Engineer",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Jaipur",
      addressRegion: "Rajasthan",
      addressCountry: "India",
    },
    alumniOf: "B.Tech in Artificial Intelligence & Data Science",
    knowsAbout: [
      "Design Systems",
      "UI/UX Design",
      "React",
      "Tailwind CSS",
      "Framer Motion",
      "AI Orchestration",
      "Figma Architecture",
    ],
  };

  return (
    <html
      lang="en"
      className={`${instrumentSerif.variable} ${plusJakartaSans.variable} ${jetbrainsMono.variable}`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="font-sans antialiased bg-canvas text-ink-primary selection:bg-signal-orange selection:text-white">
        <MotionProvider>
        <XRayProvider>
          {children}
          <Toaster
            position="bottom-right"
            toastOptions={{
              className:
                "!bg-surface !border !border-hairline !text-ink-primary !font-mono !text-xs !shadow-tactile",
            }}
          />
        </XRayProvider>
        </MotionProvider>
      </body>
    </html>
  );
}
