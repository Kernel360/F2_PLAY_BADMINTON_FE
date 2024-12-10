import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/login", "/my-page", "/club/create"],
    },
    sitemap: "https://www.badminton.run/sitemap.xml",
  };
}
