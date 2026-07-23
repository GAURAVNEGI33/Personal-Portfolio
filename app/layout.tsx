import type { Metadata } from "next";
import { Manrope, Space_Mono } from "next/font/google";
import { headers } from "next/headers";
import "./globals.css";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  display: "swap",
});

const spaceMono = Space_Mono({
  variable: "--font-space",
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
});

export async function generateMetadata(): Promise<Metadata> {
  const requestHeaders = await headers();
  const host =
    requestHeaders.get("x-forwarded-host") ??
    requestHeaders.get("host") ??
    "localhost:3000";
  const protocol =
    requestHeaders.get("x-forwarded-proto") ??
    (host.startsWith("localhost") ? "http" : "https");

  return {
    metadataBase: new URL(`${protocol}://${host}`),
    title: {
      default: "Gaurav Negi — Full-Stack Developer",
      template: "%s | Gaurav Negi",
    },
    description:
      "Full-stack developer building AI-powered web products with React, Firebase, live data, and thoughtful interfaces.",
    keywords: [
      "Gaurav Negi",
      "full-stack developer",
      "React developer",
      "AI web applications",
      "frontend developer India",
    ],
    authors: [{ name: "Gaurav Negi" }],
    creator: "Gaurav Negi",
    robots: { index: true, follow: true },
    icons: { icon: "/favicon.svg", shortcut: "/favicon.svg" },
    openGraph: {
      type: "website",
      title: "Gaurav Negi — Full-Stack Developer",
      description: "AI-powered web products, live data, and thoughtful interfaces.",
      images: [{ url: "/og.png", width: 1200, height: 630, alt: "Gaurav Negi portfolio" }],
    },
    twitter: {
      card: "summary_large_image",
      title: "Gaurav Negi — Full-Stack Developer",
      description: "AI-powered web products, live data, and thoughtful interfaces.",
      images: ["/og.png"],
    },
  };
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${manrope.variable} ${spaceMono.variable}`}>
        {children}
      </body>
    </html>
  );
}
