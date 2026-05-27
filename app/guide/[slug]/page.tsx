import React from "react"
import { notFound } from "next/navigation"
import Link from "next/link"
import { Metadata } from "next"
import { ChevronRight, Sparkles, BookOpen, Clock, Tag, Compass, ArrowRight } from "lucide-react"
import { getSEOPageBySlug, getProducts } from "@/lib/services/db-service"
import ProductCard from "@/components/product-card"

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const resolvedParams = await params
  const page = await getSEOPageBySlug(resolvedParams.slug)
  if (!page) return { title: "Guide Not Found" }

  return {
    title: `${page.title} | KHC Curated Buying Guides`,
    description: page.description || `Read our professional, expert-curated buying guide on: ${page.title}. Includes top products, features, pros and cons, and coupon codes.`,
    alternates: {
      canonical: `/guide/${page.slug}`,
    },
  }
}

// Lightweight Markdown to JSX renderer
function renderMarkdown(text: string) {
  if (!text) return null
  return text.split("\n").map((line, index) => {
    const trimmed = line.trim()
    if (trimmed.startsWith("### ")) {
      return (
        <h4 key={index} className="text-base font-extrabold text-gray-800 dark:text-gray-200 mt-6 mb-2">
          {trimmed.slice(4)}
        </h4>
      )
    }
    if (trimmed.startsWith("## ")) {
      return (
        <h3 key={index} className="text-xl font-black text-gray-900 dark:text-white mt-8 mb-3">
          {trimmed.slice(3)}
        </h3>
      )
    }
    if (trimmed.startsWith("# ")) {
      return (
        <h1 key={index} className="text-3xl font-black text-gray-900 dark:text-white mt-4 mb-4 pb-2 border-b border-black/[0.05] dark:border-white/[0.05]">
          {trimmed.slice(2)}
        </h1>
      )
    }
    if (trimmed.startsWith("- ")) {
      return (
        <ul key={index} className="list-disc pl-5 my-1 text-sm text-gray-600 dark:text-gray-400">
          <li>{trimmed.slice(2)}</li>
        </ul>
      )
    }
    if (trimmed === "") return <div key={index} className="h-3" />
    return (
      <p key={index} className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
        {trimmed}
      </p>
    )
  })
}

export default async function SEOGuidePage({ params }: PageProps) {
  const resolvedParams = await params
  const page = await getSEOPageBySlug(resolvedParams.slug)

  if (!page) {
    notFound()
  }

  // Load products to show a targeted slider
  // In a real database, we would filter products by tag or category mentioned in targetKeywords
  const allProducts = await getProducts()
  
  // Find products that match keywords
  const keywordsList = page.targetKeywords.toLowerCase().split(",").map(k => k.trim())
  const matchedProducts = allProducts.filter(p => {
    return keywordsList.some(k => 
      p.title.toLowerCase().includes(k) || 
      p.description.toLowerCase().includes(k) ||
      p.tags.some(t => k.includes(t))
    )
  }).slice(0, 4)

  const displayProducts = matchedProducts.length > 0 ? matchedProducts : allProducts.slice(0, 4)

  // JSON-LD breadcrumbs schema
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://khcfinds.com"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Buying Guides",
        "item": "https://khcfinds.com/explore"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": page.title,
        "item": `https://khcfinds.com/guide/${page.slug}`
      }
    ]
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      {/* Breadcrumbs */}
      <div className="flex items-center space-x-1 text-xs text-gray-400 dark:text-gray-500 font-semibold mb-8 pb-4 border-b border-black/[0.04] dark:border-white/[0.04]">
        <Link href="/" className="hover:text-purple-500 transition-colors">Home</Link>
        <ChevronRight className="w-3 h-3" />
        <span className="text-gray-400">Guides</span>
        <ChevronRight className="w-3 h-3" />
        <span className="text-gray-600 dark:text-gray-300 truncate max-w-[200px]" aria-current="page">
          {page.title}
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Left Side: Main content */}
        <article className="lg:col-span-8 space-y-6">
          
          {/* Cover Header Card */}
          <div className="p-8 rounded-3xl bg-gradient-to-br from-purple-900/10 via-indigo-900/5 to-transparent dark:from-purple-500/[0.03] dark:via-indigo-500/[0.01] border border-purple-500/10 p-6 md:p-8">
            <div className="flex items-center space-x-2 text-xs font-bold text-purple-600 dark:text-purple-400 mb-4">
              <BookOpen className="w-4 h-4" />
              <span>EXPERT BUYING GUIDE</span>
              <span>•</span>
              <div className="flex items-center">
                <Clock className="w-3.5 h-3.5 mr-1" />
                <span>5 min read</span>
              </div>
            </div>

            <h1 className="text-3xl md:text-5xl font-black text-gray-900 dark:text-white leading-tight mb-4">
              {page.title}
            </h1>

            {page.description && (
              <p className="text-base text-gray-500 dark:text-gray-400 font-medium">
                {page.description}
              </p>
            )}

            {/* Keyword badges */}
            <div className="flex flex-wrap gap-1.5 mt-6">
              {keywordsList.map((keyword) => (
                <span
                  key={keyword}
                  className="flex items-center space-x-1 px-3 py-1 rounded-full text-[10px] font-bold bg-white dark:bg-white/[0.04] border border-black/[0.04] dark:border-white/[0.04] text-gray-500"
                >
                  <Tag className="w-2.5 h-2.5" />
                  <span>{keyword}</span>
                </span>
              ))}
            </div>
          </div>

          {/* Render Markdown Content */}
          <div className="prose dark:prose-invert max-w-none pt-4">
            {renderMarkdown(page.content)}
          </div>

          {/* Targeted Deals Grid */}
          <div className="border-t border-black/[0.05] dark:border-white/[0.05] pt-12 mt-12">
            <div className="flex items-center space-x-2 mb-6">
              <Sparkles className="w-5 h-5 text-purple-600 dark:text-purple-400" />
              <h2 className="text-xl font-black text-gray-900 dark:text-white">
                Recommended Deals For You
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {displayProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>

        </article>

        {/* Right Side: Quick navigation sidebar */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* Quick links block */}
          <div className="glass-panel p-6 rounded-2xl border border-black/[0.04] dark:border-white/[0.04] bg-white/40 dark:bg-white/[0.01]">
            <h3 className="text-sm font-black text-gray-900 dark:text-white mb-4 uppercase tracking-wider">Related Guides</h3>
            <div className="flex flex-col space-y-3">
              <Link
                href="/explore"
                className="flex items-center justify-between text-xs font-bold text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
              >
                <span>Browse All Products</span>
                <ChevronRight className="w-4 h-4" />
              </Link>
              <Link
                href="/blog/minimal-coding-setup-under-5000"
                className="flex items-center justify-between text-xs font-bold text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
              >
                <span>Minimal Coding Setup Under ₹5000</span>
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Newsletter Box */}
          <div className="p-6 rounded-2xl bg-gradient-to-br from-purple-600 to-indigo-600 text-white space-y-4 shadow-xl">
            <h3 className="text-lg font-black leading-tight">Get New Buying Guides in Your Inbox</h3>
            <p className="text-xs text-purple-100 leading-relaxed">
              We send out weekly roundups of trending gadgets, AI tools, and budget hacks. No spam, ever.
            </p>
            <Link
              href="/explore"
              className="w-full py-3 bg-white text-purple-700 font-extrabold rounded-xl text-xs flex items-center justify-center space-x-1.5 shadow-md shadow-black/10"
            >
              <span>Explore Direct Deals</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

        </div>
      </div>
    </div>
  )
}
