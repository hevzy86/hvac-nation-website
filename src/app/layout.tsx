import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.hvacnation.local"),
  title: {
    default: "HVAC Nation — Fast Plumbing, Drains & HVAC | 24/7 Same‑Day Service",
    template: "%s | HVAC Nation",
  },
  description:
    "Trusted local experts for plumbing, drains, heating and cooling. Same‑day service, upfront pricing, and thousands of 5‑star reviews.",
  applicationName: "HVAC Nation",
  authors: [{ name: "HVAC Nation" }],
  keywords: [
    "HVAC",
    "plumbing",
    "drain cleaning",
    "AC repair",
    "heating repair",
    "water heater",
    "same-day service",
  ],
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 5,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },
  themeColor: "#005baa",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: "/",
    title: "HVAC Nation — Fast Plumbing, Drains & HVAC",
    description:
      "Trusted local experts for plumbing, drains, heating and cooling. Same‑day service, upfront pricing, and thousands of 5‑star reviews.",
    siteName: "HVAC Nation",
    images: [
      {
        url: "/images/Hero_HVAC.jpg",
        width: 1200,
        height: 630,
        alt: "HVAC Nation service team",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "HVAC Nation — Fast Plumbing, Drains & HVAC",
    description:
      "Trusted local experts for plumbing, drains, heating and cooling. Same‑day service, upfront pricing, and thousands of 5‑star reviews.",
    images: ["/images/Hero_HVAC.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Preload hero image for faster Largest Contentful Paint */}
        <link
          rel="preload"
          as="image"
          href="/images/Hero_HVAC.jpg"
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
