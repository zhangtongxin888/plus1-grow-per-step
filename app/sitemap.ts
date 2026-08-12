import type { MetadataRoute } from "next";
import { SITE_URL } from "./_lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return ["", "/beginner-guide", "/progression", "/mistakes", "/faq", "/sources"].map((path) => ({ url: `${SITE_URL}${path}`, lastModified: new Date("2026-08-12"), changeFrequency: path === "" ? "weekly" : "monthly", priority: path === "" ? 1 : path === "/beginner-guide" ? .9 : .7 }));
}
