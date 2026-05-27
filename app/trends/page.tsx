import React from "react"
import Link from "next/link"
import { Flame, TrendingUp, Sparkles, AlertCircle, Calendar, RefreshCw } from "lucide-react"
import { getProducts, getTrends } from "@/lib/services/db-service"
import ProductCard from "@/components/product-card"

export const revalidate = 300 // Cache for 5 minutes

export default async function TrendsPage() {
  const [products, trends] = await Promise.all([
    getProducts({ sortBy: "trending" }),
    getTrends()
  ])

  // Get current date formatted
  const currentDate = new Date().toLocaleDateString("en-IN", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric"
  })

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      
      {/* Header Banner */}
      <div className="glass-panel p-8 rounded-3xl border border-black/[0.04] dark:border-white/[0.04] bg-white/40 dark:bg-white/[0.01] mb-12 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="text-center md:text-left space-y-2">
          <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-rose-500/10 text-rose-600 dark:text-rose-400">
            <Flame className="w-3.5 h-3.5 text-rose-500 animate-bounce" />
            <span>Real-time Trends Engine</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-black text-gray-900 dark:text-white">
            Trending Products & Keywords
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 font-semibold flex items-center justify-center md:justify-start">
            <Calendar className="w-3.5 h-3.5 mr-1" />
            <span>Updated: {currentDate}</span>
          </p>
        </div>

        <div className="flex items-center space-x-2 text-xs font-bold text-gray-500 bg-white dark:bg-white/[0.03] border border-black/[0.04] dark:border-white/[0.04] px-4 py-2.5 rounded-xl">
          <RefreshCw className="w-3.5 h-3.5 animate-spin text-purple-500" />
          <span>Syncing Google & Reddit trends...</span>
        </div>
      </div>

      {/* Grid: Trends Table (Left) + Top Products (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mb-16">
        
        {/* Left Column: Trending Keywords Analysis */}
        <div className="lg:col-span-5 flex flex-col h-full">
          <div className="flex items-center space-x-2 mb-6">
            <TrendingUp className="w-5 h-5 text-purple-600 dark:text-purple-400" />
            <h2 className="text-xl font-black text-gray-900 dark:text-white">
              Viral Search Keywords (India)
            </h2>
          </div>
          
          <div className="glass-panel rounded-2xl border border-black/[0.04] dark:border-white/[0.04] overflow-hidden bg-white/40 dark:bg-white/[0.01] divide-y divide-black/[0.04] dark:divide-white/[0.04] flex-grow">
            <div className="grid grid-cols-12 px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-wider">
              <span className="col-span-6">Keyword / Source</span>
              <span className="col-span-3 text-right">Volume</span>
              <span className="col-span-3 text-right">Trend Score</span>
            </div>
            
            {trends.map((t, idx) => (
              <div key={t.id} className="grid grid-cols-12 px-6 py-4 items-center hover:bg-black/[0.01] dark:hover:bg-white/[0.01] transition-colors">
                <div className="col-span-6 flex items-center space-x-3">
                  <span className="text-xs font-black text-purple-600 dark:text-purple-400">
                    #{idx + 1}
                  </span>
                  <div>
                    <span className="block text-sm font-bold text-gray-800 dark:text-gray-200">
                      {t.keyword}
                    </span>
                    <span className="text-[10px] font-semibold text-gray-400 uppercase">
                      via {t.source}
                    </span>
                  </div>
                </div>
                <span className="col-span-3 text-right text-xs font-bold text-gray-600 dark:text-gray-400">
                  {t.searchVolume.toLocaleString("en-IN")}
                </span>
                <div className="col-span-3 text-right flex items-center justify-end space-x-1.5">
                  <span className="text-xs font-black text-rose-600 dark:text-rose-400">
                    {t.score.toFixed(1)}
                  </span>
                  {t.isRising && (
                    <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-rose-500/10 text-rose-600 dark:text-rose-400 animate-pulse">
                      ▲ RISING
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Trending products grid (7 items grid) */}
        <div className="lg:col-span-7 space-y-6">
          <div className="flex items-center space-x-2">
            <Flame className="w-5 h-5 text-rose-600" />
            <h2 className="text-xl font-black text-gray-900 dark:text-white">
              Trending Products (Global Score &gt; 80)
            </h2>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {products.slice(0, 4).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>

      </div>

      {/* Internal SEO links section */}
      <section className="border-t border-black/[0.05] dark:border-white/[0.05] pt-12">
        <h2 className="text-xs font-black tracking-wider text-gray-400 dark:text-gray-500 uppercase mb-6 flex items-center space-x-1">
          <Sparkles className="w-3.5 h-3.5 text-purple-500" />
          <span>Recommended searches to explore</span>
        </h2>
        <div className="flex flex-wrap gap-2">
          {trends.map(t => (
            <Link
              key={t.id}
              href={`/explore?q=${encodeURIComponent(t.keyword)}`}
              className="px-4 py-2 rounded-xl bg-white dark:bg-white/[0.02] border border-black/[0.04] dark:border-white/[0.04] text-xs font-semibold text-gray-600 dark:text-gray-300 hover:text-purple-600 hover:border-purple-500/40 transition-all duration-200"
            >
              🔍 {t.keyword}
            </Link>
          ))}
        </div>
      </section>

    </div>
  )
}
