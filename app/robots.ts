import { MetadataRoute } from "next"

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: [
        "/admin",
        "/api/",
        "/go/" // Keep affiliate redirect triggers private
      ],
    },
    sitemap: "https://khcfinds.com/sitemap.xml",
  }
}
