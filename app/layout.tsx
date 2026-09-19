import type { Metadata } from "next";
import { Manrope, Space_Mono } from "next/font/google";
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

export const metadata: Metadata = {
  metadataBase: new URL(
    "https://gaurav-negi-portfolio.gauravnegigvps.chatgpt.site",
  ),
  title: {
    default: "Gaurav Negi — Full-Stack Developer",
    template: "%s | Gaurav Negi",
  },
  description:
    "Software engineering student building full-stack applications and REST APIs with Angular, Node.js, Express.js, MySQL, Firebase, and applied AI.",
  keywords: [
    "Gaurav Negi",
    "software engineering student",
    "full-stack developer",
    "Angular developer",
    "Node.js developer",
    "REST API developer",
    "software engineer India",
  ],
  authors: [{ name: "Gaurav Negi" }],
  creator: "Gaurav Negi",
  robots: { index: true, follow: true },
  icons: { icon: "/favicon.svg", shortcut: "/favicon.svg" },
  openGraph: {
    type: "website",
    title: "Gaurav Negi — Full-Stack Developer",
    description:
      "Full-stack applications, secure REST APIs, and applied AI products.",
    images: [
      {
        url: "/og-monochrome.png",
        width: 1200,
        height: 630,
        alt: "Gaurav Negi portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Gaurav Negi — Full-Stack Developer",
    description:
      "Full-stack applications, secure REST APIs, and applied AI products.",
    images: ["/og-monochrome.png"],
  },
};

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
