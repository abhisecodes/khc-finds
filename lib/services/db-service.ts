import { db } from "../db"
import { getLocalDB, saveLocalDB, LocalClick, LocalTrend, LocalReview } from "../local-db"
import { Product, Category, Tag, BlogPost, SEOPage } from "../seed-data"

// Safe execution helper with silent fallback to JSON database
async function runQuery<T>(prismaQuery: () => Promise<T>, localQuery: () => T): Promise<T> {
  if (!process.env.DATABASE_URL || process.env.DATABASE_URL.trim() === "" || process.env.DATABASE_URL.includes("placeholder")) {
    return localQuery()
  }
  try {
    return await prismaQuery()
  } catch (error) {
    console.warn("Prisma query failed, falling back to local JSON database.")
    return localQuery()
  }
}

// ==========================================
// PRODUCTS SERVICE
// ==========================================

export async function getProducts(options: {
  categorySlug?: string
  tagSlug?: string
  searchQuery?: string
  sortBy?: "trending" | "newest" | "most_clicked" | "highest_rated"
  limit?: number
  isAdmin?: boolean
} = {}): Promise<Product[]> {
  const { categorySlug, tagSlug, searchQuery, sortBy = "trending", limit, isAdmin = false } = options

  return runQuery(
    async () => {
      // Prisma Query
      const where: any = {}
      if (categorySlug) {
        where.category = { slug: categorySlug }
      }
      if (tagSlug) {
        where.tags = { some: { slug: tagSlug } }
      }
      if (searchQuery) {
        where.OR = [
          { title: { contains: searchQuery, mode: "insensitive" } },
          { description: { contains: searchQuery, mode: "insensitive" } },
        ]
      }
      if (!isAdmin) {
        where.publishedAt = { lte: new Date() }
      }

      let orderBy: any = { trendingScore: "desc" }
      if (sortBy === "newest") {
        orderBy = { createdAt: "desc" }
      } else if (sortBy === "most_clicked") {
        orderBy = { clicksCount: "desc" }
      } else if (sortBy === "highest_rated") {
        orderBy = { rating: "desc" }
      }

      const products = await db.product.findMany({
        where,
        orderBy,
        take: limit,
        include: { category: true, tags: true },
      })

      return products.map(p => ({
        ...p,
        publishedAt: p.publishedAt?.toISOString() || p.createdAt.toISOString(),
        tags: p.tags.map(t => t.slug),
      })) as unknown as Product[]
    },
    () => {
      // Local JSON fallback query
      const local = getLocalDB()
      let result = [...local.products]

      if (!isAdmin) {
        const now = new Date().getTime()
        result = result.filter(p => !p.publishedAt || new Date(p.publishedAt).getTime() <= now)
      }

      if (categorySlug) {
        const cat = local.categories.find(c => c.slug === categorySlug)
        if (cat) {
          result = result.filter(p => p.categoryId === cat.id)
        } else {
          return []
        }
      }

      if (tagSlug) {
        result = result.filter(p => p.tags.includes(tagSlug))
      }

      if (searchQuery) {
        const q = searchQuery.toLowerCase()
        result = result.filter(
          p => p.title.toLowerCase().includes(q) || p.description.toLowerCase().includes(q)
        )
      }

      // Sort
      if (sortBy === "trending") {
        result.sort((a, b) => b.trendingScore - a.trendingScore)
      } else if (sortBy === "newest") {
        result.sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
      } else if (sortBy === "most_clicked") {
        result.sort((a, b) => (b.clicksCount || 0) - (a.clicksCount || 0))
      } else if (sortBy === "highest_rated") {
        result.sort((a, b) => b.rating - a.rating)
      }

      if (limit) {
        result = result.slice(0, limit)
      }

      return result
    }
  )
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  return runQuery(
    async () => {
      const p = await db.product.findUnique({
        where: { slug },
        include: { category: true, tags: true },
      })
      if (!p) return null
      return {
        ...p,
        publishedAt: p.publishedAt?.toISOString() || p.createdAt.toISOString(),
        tags: p.tags.map(t => t.slug),
      } as unknown as Product
    },
    () => {
      const local = getLocalDB()
      return local.products.find(p => p.slug === slug) || null
    }
  )
}

export async function getProductById(id: string): Promise<Product | null> {
  return runQuery(
    async () => {
      const p = await db.product.findUnique({
        where: { id },
        include: { category: true, tags: true },
      })
      if (!p) return null
      return {
        ...p,
        publishedAt: p.publishedAt?.toISOString() || p.createdAt.toISOString(),
        tags: p.tags.map(t => t.slug),
      } as unknown as Product
    },
    () => {
      const local = getLocalDB()
      return local.products.find(p => p.id === id) || null
    }
  )
}

export async function createProduct(productData: Omit<Product, "id" | "viewsCount" | "clicksCount" | "publishedAt">): Promise<Product> {
  const id = `prod-${Date.now()}`
  const now = new Date().toISOString()

  return runQuery(
    async () => {
      // Find or create category
      let category = await db.category.findUnique({ where: { id: productData.categoryId } })
      if (!category) {
        // Fallback or fetch first category
        const firstCat = await db.category.findFirst()
        if (!firstCat) {
          category = await db.category.create({
            data: { name: "General", slug: "general", description: "General products" },
          })
        } else {
          category = firstCat
        }
      }

      // Find or create tags
      const tagConnect = await Promise.all(
        productData.tags.map(async tagSlug => {
          const existing = await db.tag.findUnique({ where: { slug: tagSlug } })
          if (existing) return { id: existing.id }
          const name = tagSlug.split("-").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ")
          const newTag = await db.tag.create({ data: { name, slug: tagSlug } })
          return { id: newTag.id }
        })
      )

      const p = await db.product.create({
        data: {
          title: productData.title,
          slug: productData.slug,
          description: productData.description,
          longDescription: productData.longDescription,
          price: productData.price,
          originalPrice: productData.originalPrice,
          rating: productData.rating,
          trendingScore: productData.trendingScore,
          affiliateLink: productData.affiliateLink,
          imageUrl: productData.imageUrl,
          couponCode: productData.couponCode,
          isFeatured: productData.isFeatured,
          isSponsored: productData.isSponsored,
          categoryId: category.id,
          tags: { connect: tagConnect },
        },
        include: { category: true, tags: true },
      })

      return {
        ...p,
        publishedAt: p.publishedAt?.toISOString() || p.createdAt.toISOString(),
        tags: p.tags.map(t => t.slug),
      } as unknown as Product
    },
    () => {
      const local = getLocalDB()
      const newProduct: Product = {
        ...productData,
        id,
        viewsCount: 0,
        clicksCount: 0,
        publishedAt: now,
      }
      local.products.push(newProduct)
      saveLocalDB(local)
      return newProduct
    }
  )
}

export async function updateProduct(id: string, productData: Partial<Product>): Promise<Product | null> {
  return runQuery(
    async () => {
      const updateData: any = { ...productData }
      delete updateData.tags
      delete updateData.category

      if (productData.tags) {
        const tagConnect = await Promise.all(
          productData.tags.map(async tagSlug => {
            const existing = await db.tag.findUnique({ where: { slug: tagSlug } })
            if (existing) return { id: existing.id }
            const name = tagSlug.split("-").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ")
            const newTag = await db.tag.create({ data: { name, slug: tagSlug } })
            return { id: newTag.id }
          })
        )
        updateData.tags = { set: tagConnect }
      }

      const p = await db.product.update({
        where: { id },
        data: updateData,
        include: { category: true, tags: true },
      })

      return {
        ...p,
        publishedAt: p.publishedAt?.toISOString() || p.createdAt.toISOString(),
        tags: p.tags.map(t => t.slug),
      } as unknown as Product
    },
    () => {
      const local = getLocalDB()
      const index = local.products.findIndex(p => p.id === id)
      if (index === -1) return null

      const updated = {
        ...local.products[index],
        ...productData,
      } as Product
      local.products[index] = updated
      saveLocalDB(local)
      return updated
    }
  )
}

export async function deleteProduct(id: string): Promise<boolean> {
  return runQuery(
    async () => {
      await db.product.delete({ where: { id } })
      return true
    },
    () => {
      const local = getLocalDB()
      const lenBefore = local.products.length
      local.products = local.products.filter(p => p.id !== id)
      saveLocalDB(local)
      return local.products.length < lenBefore
    }
  )
}

// Increment view count
export async function incrementProductViews(id: string): Promise<void> {
  await runQuery(
    async () => {
      await db.product.update({
        where: { id },
        data: { viewsCount: { increment: 1 } },
      })
    },
    () => {
      const local = getLocalDB()
      const p = local.products.find(prod => prod.id === id)
      if (p) {
        p.viewsCount = (p.viewsCount || 0) + 1
        saveLocalDB(local)
      }
    }
  )
}

// ==========================================
// CATEGORIES & TAGS
// ==========================================

export async function getCategories(): Promise<Category[]> {
  return runQuery(
    async () => {
      return db.category.findMany({ orderBy: { name: "asc" } })
    },
    () => {
      const local = getLocalDB()
      return local.categories
    }
  )
}

export async function getTags(): Promise<Tag[]> {
  return runQuery(
    async () => {
      return db.tag.findMany({ orderBy: { name: "asc" } })
    },
    () => {
      const local = getLocalDB()
      return local.tags
    }
  )
}

// ==========================================
// AFFILIATE REDIRECTION & CLICKS
// ==========================================

export async function trackRedirection(
  slug: string,
  meta: {
    ipAddress?: string
    userAgent?: string
    referrer?: string
    utmSource?: string
    utmMedium?: string
    utmCampaign?: string
  }
): Promise<string | null> {
  const p = await getProductBySlug(slug)
  if (!p) return null

  // Increment clicks count in background/local
  await runQuery(
    async () => {
      await db.product.update({
        where: { id: p.id },
        data: { clicksCount: { increment: 1 } },
      })
      await db.click.create({
        data: {
          productId: p.id,
          ipAddress: meta.ipAddress,
          userAgent: meta.userAgent,
          referrer: meta.referrer,
          utmSource: meta.utmSource,
          utmMedium: meta.utmMedium,
          utmCampaign: meta.utmCampaign,
        },
      })
    },
    () => {
      const local = getLocalDB()
      const prod = local.products.find(item => item.id === p.id)
      if (prod) {
        prod.clicksCount = (prod.clicksCount || 0) + 1
      }
      const newClick: LocalClick = {
        id: `clk-${Date.now()}`,
        productId: p.id,
        ...meta,
        createdAt: new Date().toISOString(),
      }
      local.clicks.push(newClick)
      saveLocalDB(local)
    }
  )

  // Inject UTM tags dynamically to the affiliate link
  let finalLink = p.affiliateLink
  const urlObj = new URL(finalLink)

  const source = meta.utmSource || "khc_platform"
  const medium = meta.utmMedium || "affiliate"
  const campaign = meta.utmCampaign || `product_${slug}`

  // Standard UTM parameters
  urlObj.searchParams.set("utm_source", source)
  urlObj.searchParams.set("utm_medium", medium)
  urlObj.searchParams.set("utm_campaign", campaign)

  // Special networks parameters
  if (finalLink.includes("amazon.in") || finalLink.includes("amazon.com")) {
    // Inject Associate Tag
    urlObj.searchParams.set("tag", "khcaff-21") // Placeholder Associate Tag
  } else if (finalLink.includes("travelpayouts")) {
    urlObj.searchParams.set("marker", "501430") // Placeholder marker
  }

  return urlObj.toString()
}

// ==========================================
// REVIEWS SERVICE
// ==========================================

export async function getReviews(productId: string): Promise<LocalReview[]> {
  return runQuery(
    async () => {
      const reviews = await db.review.findMany({
        where: { productId, isApproved: true },
        orderBy: { createdAt: "desc" },
      })
      return reviews.map(r => ({
        ...r,
        createdAt: r.createdAt.toISOString(),
      })) as unknown as LocalReview[]
    },
    () => {
      const local = getLocalDB()
      return local.reviews.filter(r => r.productId === productId && r.isApproved)
    }
  )
}

export async function createReview(reviewData: {
  productId: string
  reviewerName: string
  rating: number
  comment: string
}): Promise<LocalReview> {
  const id = `rev-${Date.now()}`
  const now = new Date().toISOString()

  return runQuery(
    async () => {
      const r = await db.review.create({
        data: {
          ...reviewData,
          isApproved: true, // auto approve for simplicity/demo
        },
      })
      return {
        ...r,
        createdAt: r.createdAt.toISOString(),
      } as unknown as LocalReview
    },
    () => {
      const local = getLocalDB()
      const newReview: LocalReview = {
        id,
        ...reviewData,
        isApproved: true,
        createdAt: now,
      }
      local.reviews.push(newReview)
      saveLocalDB(local)
      return newReview
    }
  )
}

// ==========================================
// TRENDING KEYWORDS
// ==========================================

export async function getTrends(): Promise<LocalTrend[]> {
  return runQuery(
    async () => {
      const trends = await db.trend.findMany({ orderBy: { score: "desc" } })
      return trends.map(t => ({
        ...t,
        createdAt: t.createdAt.toISOString(),
      })) as unknown as LocalTrend[]
    },
    () => {
      const local = getLocalDB()
      return local.trends
    }
  )
}

// ==========================================
// BLOGS SERVICE
// ==========================================

export async function getBlogs(): Promise<BlogPost[]> {
  return runQuery(
    async () => {
      const posts = await db.blogPost.findMany({
        orderBy: { publishedAt: "desc" },
        include: { author: true },
      })
      return posts.map(p => ({
        ...p,
        authorName: p.author?.name || "Admin",
        publishedAt: p.publishedAt?.toISOString() || p.createdAt.toISOString(),
        readTime: "5 min read",
      })) as unknown as BlogPost[]
    },
    () => {
      const local = getLocalDB()
      return local.blogs
    }
  )
}

export async function getBlogBySlug(slug: string): Promise<BlogPost | null> {
  return runQuery(
    async () => {
      const p = await db.blogPost.findUnique({
        where: { slug },
        include: { author: true },
      })
      if (!p) return null
      return {
        ...p,
        authorName: p.author?.name || "Admin",
        publishedAt: p.publishedAt?.toISOString() || p.createdAt.toISOString(),
        readTime: "5 min read",
      } as unknown as BlogPost
    },
    () => {
      const local = getLocalDB()
      return local.blogs.find(b => b.slug === slug) || null
    }
  )
}

// ==========================================
// PROGRAMMATIC SEO (pSEO) PAGES
// ==========================================

export async function getSEOPages(): Promise<SEOPage[]> {
  return runQuery(
    async () => {
      return db.sEOPage.findMany({ where: { isPublished: true } })
    },
    () => {
      const local = getLocalDB()
      return local.seoPages
    }
  )
}

export async function getSEOPageBySlug(slug: string): Promise<SEOPage | null> {
  return runQuery(
    async () => {
      return db.sEOPage.findUnique({ where: { slug } })
    },
    () => {
      const local = getLocalDB()
      return local.seoPages.find(p => p.slug === slug) || null
    }
  )
}

export async function createSEOPage(pageData: Omit<SEOPage, "id">): Promise<SEOPage> {
  const id = `seo-${Date.now()}`

  return runQuery(
    async () => {
      return db.sEOPage.create({ data: pageData })
    },
    () => {
      const local = getLocalDB()
      const newPage: SEOPage = {
        ...pageData,
        id,
      }
      local.seoPages.push(newPage)
      saveLocalDB(local)
      return newPage
    }
  )
}

// ==========================================
// ANALYTICS & CTR (ADMIN PANEL)
// ==========================================

export interface AnalyticsSummary {
  totalProducts: number
  totalClicks: number
  totalViews: number
  averageCTR: number
  clicksByCategory: { name: string; count: number }[]
  clicksOverTime: { date: string; count: number }[]
  topPerforming: { id: string; title: string; clicks: number; ctr: number }[]
}

export async function getAnalyticsSummary(): Promise<AnalyticsSummary> {
  // We compute analytics directly from products and click tables (with fallback)
  const products = await getProducts()
  const local = getLocalDB()

  const totalProducts = products.length
  const totalViews = products.reduce((acc, p) => acc + (p.viewsCount || 0), 0)
  const totalClicks = products.reduce((acc, p) => acc + (p.clicksCount || 0), 0)
  const averageCTR = totalViews > 0 ? (totalClicks / totalViews) * 100 : 0

  // Category distribution
  const categories = await getCategories()
  const clicksByCategory = categories.map(cat => {
    const count = products
      .filter(p => p.categoryId === cat.id)
      .reduce((acc, p) => acc + (p.clicksCount || 0), 0)
    return { name: cat.name, count }
  })

  // Clicks over time (last 7 days)
  const clicksOverTime = Array.from({ length: 7 }, (_, i) => {
    const d = new Date()
    d.setDate(d.getDate() - i)
    const dateStr = d.toLocaleDateString("en-IN", { day: "numeric", month: "short" })

    // Count clicks matching this day
    const dayStart = new Date(d.setHours(0, 0, 0, 0)).getTime()
    const dayEnd = new Date(d.setHours(23, 59, 59, 999)).getTime()

    const count = local.clicks.filter(c => {
      const t = new Date(c.createdAt).getTime()
      return t >= dayStart && t <= dayEnd
    }).length

    return { date: dateStr, count }
  }).reverse()

  // Top products
  const topPerforming = [...products]
    .sort((a, b) => (b.clicksCount || 0) - (a.clicksCount || 0))
    .slice(0, 5)
    .map(p => {
      const ctr = p.viewsCount > 0 ? (p.clicksCount / p.viewsCount) * 100 : 0
      return {
        id: p.id,
        title: p.title,
        clicks: p.clicksCount || 0,
        ctr,
      }
    })

  return {
    totalProducts,
    totalClicks,
    totalViews,
    averageCTR,
    clicksByCategory,
    clicksOverTime,
    topPerforming,
  }
}

// ==========================================
// NEWSLETTER SUBSCRIBERS
// ==========================================

export async function subscribeToNewsletter(email: string): Promise<boolean> {
  return runQuery(
    async () => {
      await db.newsletterSubscriber.create({
        data: { email, isSubscribed: true }
      })
      return true
    },
    () => {
      const local = getLocalDB()
      if (!local.subscribers) {
        local.subscribers = []
      }
      // Avoid duplicate entries
      if (!local.subscribers.some(s => s.email.toLowerCase() === email.toLowerCase())) {
        local.subscribers.push({
          id: `sub-${Date.now()}`,
          email,
          createdAt: new Date().toISOString()
        })
        saveLocalDB(local)
      }
      return true
    }
  )
}

// ==========================================
// BULK UPLOAD PRODUCTS
// ==========================================

export async function bulkUploadProducts(csvText: string): Promise<number> {
  const lines = csvText.split("\n").filter(l => l.trim() !== "")
  if (lines.length <= 1) return 0

  const headers = lines[0].split(",").map(h => h.trim().toLowerCase())
  let count = 0

  for (let i = 1; i < lines.length; i++) {
    const cols = lines[i].split(",").map(c => c.trim())
    if (cols.length < headers.length) continue

    const row: any = {}
    headers.forEach((h, idx) => {
      row[h] = cols[idx]
    })

    try {
      const categories = await getCategories()
      const categorySlug = row.categoryslug || "viral-gadgets"
      let category = categories.find(c => c.slug === categorySlug)
      if (!category) {
        category = categories[0]
      }

      const tagsList = row.tags
        ? row.tags.split(";").map((t: string) => t.trim().toLowerCase())
        : ["amazon-finds"]

      await createProduct({
        title: row.title || "Bulk Product",
        slug: row.slug || `bulk-prod-${Date.now()}-${i}`,
        description: row.description || "Curated find",
        longDescription: row.longdescription || "Full review coming soon.",
        price: parseFloat(row.price) || 499,
        originalPrice: row.originalprice ? parseFloat(row.originalprice) : undefined,
        rating: parseFloat(row.rating) || 4.2,
        trendingScore: parseFloat(row.trendingscore) || 75,
        affiliateLink: row.affiliatelink || "https://amazon.in",
        imageUrl: row.imageurl || "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=600&q=80",
        categoryId: category.id,
        tags: tagsList,
        couponCode: row.couponcode || undefined,
        isFeatured: row.isfeatured === "true",
        isSponsored: row.issponsored === "true"
      })
      count++
    } catch (e) {
      console.error("Failed to parse bulk upload CSV row: ", lines[i], e)
    }
  }
  return count
}

