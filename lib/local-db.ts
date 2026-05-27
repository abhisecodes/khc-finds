import fs from 'fs'
import path from 'path'
import { seedCategories, seedProducts, seedTags, seedBlogs, seedSEOPages, Product, Category, Tag, BlogPost, SEOPage } from './seed-data'

const DB_FILE = path.join(process.cwd(), 'database-fallback.json')

export interface LocalClick {
  id: string
  productId: string
  ipAddress?: string
  userAgent?: string
  referrer?: string
  utmSource?: string
  utmMedium?: string
  utmCampaign?: string
  createdAt: string
}

export interface LocalTrend {
  id: string
  keyword: string
  searchVolume: number
  source: string
  score: number
  isRising: boolean
  createdAt: string
}

export interface LocalReview {
  id: string
  productId: string
  reviewerName: string
  rating: number
  comment: string
  isApproved: boolean
  createdAt: string
}

export interface LocalSubscriber {
  id: string
  email: string
  createdAt: string
}

export interface LocalSchema {
  products: Product[]
  categories: Category[]
  tags: Tag[]
  blogs: BlogPost[]
  seoPages: SEOPage[]
  clicks: LocalClick[]
  trends: LocalTrend[]
  reviews: LocalReview[]
  subscribers: LocalSubscriber[]
}

export function getLocalDB(): LocalSchema {
  if (!fs.existsSync(DB_FILE)) {
    const initialData: LocalSchema = {
      products: [],
      categories: seedCategories,
      tags: seedTags,
      blogs: [],
      seoPages: [],
      clicks: [],
      trends: [],
      reviews: [],
      subscribers: []
    }
    fs.writeFileSync(DB_FILE, JSON.stringify(initialData, null, 2))
    return initialData
  }

  try {
    const content = fs.readFileSync(DB_FILE, 'utf-8')
    const parsed = JSON.parse(content)
    // Backwards compatibility for existing local database files
    if (!parsed.subscribers) {
      parsed.subscribers = []
    }
    return parsed
  } catch (error) {
    console.error("Local database corrupted. Resetting database-fallback.json", error)
    const initialData: LocalSchema = {
      products: [],
      categories: seedCategories,
      tags: seedTags,
      blogs: [],
      seoPages: [],
      clicks: [],
      trends: [],
      reviews: [],
      subscribers: []
    }
    fs.writeFileSync(DB_FILE, JSON.stringify(initialData, null, 2))
    return initialData
  }
}

export function saveLocalDB(db: LocalSchema) {
  try {
    fs.writeFileSync(DB_FILE, JSON.stringify(db, null, 2))
  } catch (error) {
    console.error("Failed to write local database", error)
  }
}
