import { AdsterraPopunderGate, AdsterraSocialBarGate, AdsterraStickyRail, AdsterraGlobalFallback } from "@/components/ads";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { SiteFooter } from "./_components/SiteFooter";
import { SiteHeader } from "./_components/SiteHeader";
import { SITE_NAME, SITE_URL } from "./_lib/site";
import "./globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: SITE_NAME, template: `%s | ${SITE_NAME}` },
  description:
    "Start +1 Grow Per Step with a fact-checked first-run tutorial, then learn the growth loop, wall checks, upgrades, crystals, rebirths, offline growth, and common mistakes.",
  keywords: ["+1 Grow Per Step", "+1 Grow Per Step guide", "+1 Grow Per Step wiki", "Roblox beginner guide"],
  category: "games",
  robots: { index: true, follow: true },
  applicationName: SITE_NAME,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: SITE_NAME,
    title: SITE_NAME,
    description: "Walk. Grow. Challenge walls. Plan the next loop.",
    url: "/",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "+1 Grow Per Step beginner mission" }],
  },
  twitter: { card: "summary_large_image", images: ["/og.png"] },
  icons: { icon: "/icon.png", apple: "/icon.png" },
};

export const viewport = { themeColor: "#11131a", colorScheme: "light" };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <AdsterraPopunderGate />
        <AdsterraSocialBarGate />
        <AdsterraStickyRail />
        <AdsterraGlobalFallback />
        <SiteHeader />
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}
