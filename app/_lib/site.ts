import type { Metadata } from "next";

export const SITE_URL = "https://plus1growperstep.wiki";
export const SITE_NAME = "+1 Grow Per Step Wiki";
export const OFFICIAL_GAME_URL =
  "https://www.roblox.com/games/96142137828854/1-Grow-Per-Step";
export const LAST_CHECKED = "August 12, 2026";

export const navItems = [
  { href: "/beginner-guide", label: "Start Here" },
  { href: "/progression", label: "Progression" },
  { href: "/mistakes", label: "Mistakes" },
  { href: "/faq", label: "FAQ" },
];

export function serializeJsonLd(value: unknown) {
  return JSON.stringify(value).replace(/</g, "\\u003c");
}

export function createPageMetadata(title: string, description: string, path: string): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title: `${title} | ${SITE_NAME}`,
      description,
      url: path,
      siteName: SITE_NAME,
      type: path === "/" ? "website" : "article",
      images: [{ url: "/og.png", width: 1200, height: 630, alt: "+1 Grow Per Step beginner mission" }],
    },
    twitter: { card: "summary_large_image", title, description, images: ["/og.png"] },
    robots: { index: true, follow: true },
  };
}
