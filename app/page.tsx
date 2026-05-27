import React from "react"
import Link from "next/link"
import { Sparkles, Flame, Percent, Cpu, ChevronRight, HelpCircle } from "lucide-react"
import { getProducts, getCategories, getTrends } from "@/lib/services/db-service"
import HeroSearch from "@/components/hero-search"
import ProductCard from "@/components/product-card"

export const revalidate = 60 // Revalidate cache every 60 seconds

export default async function HomePage() {
  const [allProducts, categories, trends] = await Promise.all([
    getProducts({ limit: 12 }),
    getCategories(),
    getTrends()
  ])

  // Segment products for different sections
  const productOfTheDay = allProducts.find(p => p.isFeatured) || allProducts[0]
  const trendingProducts = allProducts.filter(p => p.trendingScore > 90).slice(0, 4)
  const budgetProducts = allProducts.filter(p => p.price < 1000).slice(0, 4)
  const aiProducts = allProducts.filter(p => p.categoryId === "cat-ai-tools").slice(0, 4)
  const creatorProducts = allProducts.filter(p => p.categoryId === "cat-creator").slice(0, 4)

  // Map category icons to actual Lucide tags
  const getCategoryIcon = (slug: string) => {
    switch (slug) {
      case "viral-gadgets": return "🎮"
      case "ai-tools": return "🤖"
      case "budget-finds": return "💸"
      case "creator-essentials": return "🎥"
      case "smart-home": return "🏠"
      case "travel-accessories": return "✈️"
      default: return "📦"
    }
  }

  return (
    <div className="relative pb-16">
      {/* Decorative ambient blobs */}
      <div className="absolute top-[-100px] left-1/2 -translate-x-1/2 w-full max-w-7xl h-[600px] bg-gradient-to-tr from-purple-500/10 via-indigo-500/10 to-blue-500/5 dark:from-purple-500/5 dark:via-indigo-500/5 dark:to-blue-500/0 rounded-full filter blur-[100px] pointer-events-none -z-10" />

      {/* Hero Section */}
      <section className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8 pt-12 pb-16 text-center">
        <h1 className="text-4xl md:text-6xl font-black tracking-tight text-gray-900 max-w-4xl mx-auto leading-[1.1] mb-6">
          Discover the Most <span className="text-purple-600">Useful & Viral</span> Products on the Internet
        </h1>
        <p className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto mb-10 font-medium">
          Programmatic SEO and AI-curated affiliate discovery platform. Finding top deals, student gear, and developer hacks in India just got 10x faster.
        </p>
        <HeroSearch />
      </section>

      {/* Quick Categories Bar */}
      <section className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8 mb-16">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xs font-black tracking-wider text-gray-400 dark:text-gray-500 uppercase">
            Browse Hot Categories
          </h2>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {categories.map((cat) => (
            <Link
              key={cat.id}
              href={`/explore?category=${cat.slug}`}
              className="glass-card flex items-center space-x-3 p-4 rounded-2xl border border-black/[0.04] dark:border-white/[0.04] bg-white/40 dark:bg-white/[0.02] hover:scale-[1.03] transition-all duration-200"
            >
              <span className="text-2xl">{getCategoryIcon(cat.slug)}</span>
              <div className="flex flex-col">
                <span className="text-sm font-bold text-gray-800 dark:text-gray-200 leading-tight">
                  {cat.name}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Compare Deals by Store (70% BuyHatke Feature) */}
      <section className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8 mb-16">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xs font-black tracking-wider text-gray-400 dark:text-gray-500 uppercase">
            Compare Deals by Online Store
          </h2>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {[
            { name: "Amazon India", slug: "amazon", logo: "A", desc: "Best prices & prime deals", color: "bg-amber-100 text-amber-800 border-amber-200 hover:bg-amber-200" },
            { name: "Flipkart", slug: "flipkart", logo: "F", desc: "Super savings & offers", color: "bg-blue-100 text-blue-800 border-blue-200 hover:bg-blue-200" },
            { name: "Myntra", slug: "myntra", logo: "M", desc: "Fashion & style discount", color: "bg-pink-100 text-pink-800 border-pink-200 hover:bg-pink-200" },
            { name: "Tata CliQ", slug: "tata", logo: "T", desc: "Premium gadgets & tech", color: "bg-red-100 text-red-800 border-red-200 hover:bg-red-200" },
            { name: "Reliance Digital", slug: "reliance", logo: "R", desc: "Electronics & appliances", color: "bg-purple-100 text-purple-800 border-purple-200 hover:bg-purple-200" }
          ].map((store) => (
            <Link
              key={store.slug}
              href={`/explore?q=${store.slug}`}
              className="glass-card p-5 rounded-2xl border border-black/[0.04] dark:border-white/[0.04] bg-white/40 dark:bg-white/[0.02] flex flex-col justify-between hover:scale-[1.03] transition-all duration-200 group h-32"
            >
              <div className="flex items-center justify-between">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-black text-sm border ${store.color} transition-all`}>
                  {store.logo}
                </div>
                <span className="text-[10px] font-black text-purple-600 bg-purple-100 dark:bg-purple-900/30 px-2 py-0.5 rounded">
                  Explore
                </span>
              </div>
              <div className="mt-3">
                <span className="block text-sm font-black text-slate-800 dark:text-slate-100 group-hover:text-purple-600 transition-colors leading-tight">
                  {store.name}
                </span>
                <span className="text-[10px] text-slate-400 font-semibold block mt-0.5">
                  {store.desc}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>


      {/* Empty State Helper */}
      {allProducts.length === 0 && (
        <section className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8 mb-20 text-center py-16 glass-card rounded-3xl border border-black/[0.04] dark:border-white/[0.04] bg-white/40 dark:bg-white/[0.01]">
          <HelpCircle className="w-12 h-12 text-purple-500 mx-auto mb-4 opacity-50" />
          <h3 className="text-base font-black text-gray-900 dark:text-white uppercase tracking-wider">No products curated yet</h3>
          <p className="text-xs text-gray-400 mt-2 max-w-sm mx-auto">
            Log in to the <Link href="/admin" className="text-purple-500 font-bold hover:underline">Admin Dashboard</Link> to publish your first affiliate product or bulk import via CSV.
          </p>
        </section>
      )}

      {/* Product of the Day */}
      {productOfTheDay && (
        <section className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8 mb-20">
          <div className="flex items-center space-x-2 mb-6">
            <Sparkles className="w-5 h-5 text-purple-600 dark:text-purple-400" />
            <h2 className="text-xl md:text-2xl font-black text-gray-900 dark:text-white">
              Product of the Day
            </h2>
          </div>
          <div className="glass-card rounded-3xl border border-black/[0.04] dark:border-white/[0.04] bg-white/50 dark:bg-white/[0.01] p-6 md:p-8 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div className="relative aspect-video lg:aspect-auto lg:h-[320px] rounded-2xl overflow-hidden bg-gray-100 dark:bg-[#1a1a24] shadow-inner">
              <img
                src={productOfTheDay.imageUrl}
                alt={productOfTheDay.title}
                className="w-full h-full object-cover"
              />
              <span className="absolute top-4 left-4 flex items-center space-x-1.5 px-3 py-1.5 rounded-full text-xs font-black bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg shadow-purple-500/20 animate-bounce">
                👑 #1 TODAY
              </span>
            </div>
            <div className="flex flex-col h-full justify-between py-2">
              <div>
                <div className="flex items-center space-x-2 text-xs font-bold text-purple-600 dark:text-purple-400 mb-2">
                  <span>SPECIAL MENTION</span>
                  <span>•</span>
                  <span>{productOfTheDay.rating} ⭐ Rating</span>
                </div>
                <h3 className="text-2xl md:text-3xl font-black text-gray-900 dark:text-white mb-4 leading-tight">
                  {productOfTheDay.title}
                </h3>
                <p className="text-sm md:text-base text-gray-500 dark:text-gray-400 leading-relaxed mb-6">
                  {productOfTheDay.description}
                </p>
              </div>
              <div className="flex items-center justify-between border-t border-black/[0.05] dark:border-white/[0.05] pt-5 mt-auto">
                <div className="flex flex-col">
                  <span className="text-xs text-gray-400 dark:text-gray-500">Regular Price</span>
                  <span className="text-2xl font-black text-purple-600 dark:text-purple-400">
                    ₹{productOfTheDay.price}
                  </span>
                </div>
                <div className="flex space-x-3">
                  <Link
                    href={`/products/${productOfTheDay.slug}`}
                    className="px-5 py-3 rounded-xl border border-gray-200 dark:border-white/[0.08] hover:bg-gray-50 dark:hover:bg-white/[0.02] text-sm font-bold text-gray-700 dark:text-gray-200 transition-colors"
                  >
                    Read Review
                  </Link>
                  <a
                    href={`/go/${productOfTheDay.slug}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 text-white text-sm font-extrabold shadow-lg shadow-purple-500/20 hover:opacity-95 transform active:scale-95 transition-all flex items-center space-x-1.5"
                  >
                    <span>Get Deal</span>
                    <ChevronRight className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Trending Today Grid */}
      {trendingProducts.length > 0 && (
        <section className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8 mb-20">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-2">
              <Flame className="w-5 h-5 text-rose-500 animate-pulse" />
              <h2 className="text-xl md:text-2xl font-black text-gray-900 dark:text-white">
                Trending on Internet Today
              </h2>
            </div>
            <Link href="/trends" className="flex items-center space-x-1 text-sm font-bold text-purple-600 dark:text-purple-400 hover:underline">
              <span>View All</span>
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {trendingProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>
      )}

      {/* Deals under ₹999 */}
      {budgetProducts.length > 0 && (
        <section className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8 mb-20">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-2">
              <Percent className="w-5 h-5 text-emerald-500" />
              <h2 className="text-xl md:text-2xl font-black text-gray-900 dark:text-white">
                Super Budget Finds (Under ₹999)
              </h2>
            </div>
            <Link href="/explore?q=under-999" className="flex items-center space-x-1 text-sm font-bold text-purple-600 dark:text-purple-400 hover:underline">
              <span>Explore Budget Deals</span>
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {budgetProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>
      )}

      {/* AI Tools */}
      {aiProducts.length > 0 && (
        <section className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8 mb-20">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-2">
              <Cpu className="w-5 h-5 text-blue-500" />
              <h2 className="text-xl md:text-2xl font-black text-gray-900 dark:text-white">
                Best AI Tools & Software Deals
              </h2>
            </div>
            <Link href="/explore?category=ai-tools" className="flex items-center space-x-1 text-sm font-bold text-purple-600 dark:text-purple-400 hover:underline">
              <span>View All AI Tools</span>
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {aiProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>
      )}

      {/* Programmatic SEO Internal Links Engine */}
      <section className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8 border-t border-black/[0.05] dark:border-white/[0.05] pt-16">
        <h2 className="text-xs font-black tracking-wider text-gray-400 dark:text-gray-500 uppercase mb-6">
          Popular Buying Guides & Reviews
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Link
            href="/guide/best-budget-gadgets-india"
            className="flex items-center justify-between p-4 rounded-xl bg-white dark:bg-white/[0.02] border border-black/[0.04] dark:border-white/[0.04] text-sm text-gray-600 dark:text-gray-300 hover:text-purple-500 transition-colors"
          >
            <span>Best budget gadgets in India under ₹999</span>
            <ChevronRight className="w-4 h-4 text-gray-400" />
          </Link>
          <Link
            href="/blog/minimal-coding-setup-under-5000"
            className="flex items-center justify-between p-4 rounded-xl bg-white dark:bg-white/[0.02] border border-black/[0.04] dark:border-white/[0.04] text-sm text-gray-600 dark:text-gray-300 hover:text-purple-500 transition-colors"
          >
            <span>Coding setups under ₹5000</span>
            <ChevronRight className="w-4 h-4 text-gray-400" />
          </Link>
          <Link
            href="/blog/top-5-ai-coding-assistants-compared"
            className="flex items-center justify-between p-4 rounded-xl bg-white dark:bg-white/[0.02] border border-black/[0.04] dark:border-white/[0.04] text-sm text-gray-600 dark:text-gray-300 hover:text-purple-500 transition-colors"
          >
            <span>Top AI coding tools compared</span>
            <ChevronRight className="w-4 h-4 text-gray-400" />
          </Link>
          <div
            className="flex items-center justify-between p-4 rounded-xl bg-white dark:bg-white/[0.02] border border-black/[0.04] dark:border-white/[0.04] text-sm text-gray-600 dark:text-gray-300"
          >
            <span>Active Discount Coupon Codes</span>
            <span className="text-xs font-black px-2 py-0.5 rounded bg-emerald-500/15 text-emerald-600">6 Live</span>
          </div>
        </div>
      </section>
    </div>
  )
}
