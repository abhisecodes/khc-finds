import { MetadataRoute } from "next"
import { getProducts, getBlogs, getSEOPages } from "@/lib/services/db-service"

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://khcfinds.com"

  try {
    const [products, blogs, seoPages] = await Promise.all([
      getProducts(),
      getBlogs(),
      getSEOPages()
    ])

    const productUrls = products.map((p) => ({
      url: `${baseUrl}/products/${p.slug}`,
      lastModified: new Date(p.publishedAt || new Date()),
      changeFrequency: "daily" as const,
      priority: 0.8,
    }))

    const blogUrls = blogs.map((b) => ({
      url: `${baseUrl}/blog/${b.slug}`,
      lastModified: new Date(b.publishedAt || new Date()),
      changeFrequency: "weekly" as const,
      priority: 0.7,
    }))

    const guideUrls = seoPages.map((page) => ({
      url: `${baseUrl}/guide/${page.slug}`,
      lastModified: new Date(),
      changeFrequency: "daily" as const,
      priority: 0.9,
    }))

    return [
      {
        url: baseUrl,
        lastModified: new Date(),
        changeFrequency: "daily" as const,
        priority: 1.0,
      },
      {
        url: `${baseUrl}/explore`,
        lastModified: new Date(),
        changeFrequency: "daily" as const,
        priority: 0.9,
      },
      {
        url: `${baseUrl}/trends`,
        lastModified: new Date(),
        changeFrequency: "hourly" as const,
        priority: 0.9,
      },
      {
        url: `${baseUrl}/blog`,
        lastModified: new Date(),
        changeFrequency: "weekly" as const,
        priority: 0.8,
      },
      ...productUrls,
      ...blogUrls,
      ...guideUrls,
    ]
  } catch (error) {
    console.error("Failed to generate sitemap:", error)
    return [
      {
        url: baseUrl,
        lastModified: new Date(),
      },
    ]
  }
}
