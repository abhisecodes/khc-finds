"use client"

import React, { useState, useEffect } from "react"
import { Grid, List, Search, Star, ExternalLink, Flame, Sparkles } from "lucide-react"
import Link from "next/link"
import ProductCard from "./product-card"
import { Product, Category, Tag } from "@/lib/seed-data"

interface ExploreCatalogProps {
  initialProducts: Product[]
  categories: Category[]
  tags: Tag[]
  initialSearch?: string
  initialCategory?: string
  initialTag?: string
}

export default function ExploreCatalog({
  initialProducts,
  categories,
  tags,
  initialSearch = "",
  initialCategory = "",
  initialTag = ""
}: ExploreCatalogProps) {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [search, setSearch] = useState(initialSearch)
  const [selectedCategory, setSelectedCategory] = useState(initialCategory)
  const [selectedTag, setSelectedTag] = useState(initialTag)
  const [sortBy, setSortBy] = useState<"trending" | "newest" | "most_clicked" | "highest_rated">("trending")
  const [products, setProducts] = useState(initialProducts)

  // Trigger filtering and sorting when inputs change
  useEffect(() => {
    let filtered = [...initialProducts]

    // 1. Search Query
    if (search.trim()) {
      const q = search.toLowerCase()
      filtered = filtered.filter(
        p => p.title.toLowerCase().includes(q) ||
             p.description.toLowerCase().includes(q) ||
             p.longDescription.toLowerCase().includes(q) ||
             p.affiliateLink.toLowerCase().includes(q)
      )
    }

    // 2. Category Filter
    if (selectedCategory) {
      filtered = filtered.filter(p => p.categoryId === selectedCategory || p.categoryId === `cat-${selectedCategory}`)
    }

    // 3. Tag Filter
    if (selectedTag) {
      filtered = filtered.filter(p => p.tags.includes(selectedTag))
    }

    // 4. Sort
    if (sortBy === "trending") {
      filtered.sort((a, b) => b.trendingScore - a.trendingScore)
    } else if (sortBy === "newest") {
      filtered.sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
    } else if (sortBy === "most_clicked") {
      filtered.sort((a, b) => (b.clicksCount || 0) - (a.clicksCount || 0))
    } else if (sortBy === "highest_rated") {
      filtered.sort((a, b) => b.rating - a.rating)
    }

    setProducts(filtered)
  }, [search, selectedCategory, selectedTag, sortBy, initialProducts])

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
      {/* Left Sidebar Filters */}
      <div className="lg:col-span-1 flex flex-col space-y-6">
        {/* Search */}
        <div className="glass-panel p-5 rounded-2xl border border-black/[0.04] dark:border-white/[0.04]">
          <h3 className="text-sm font-black text-gray-800 dark:text-gray-200 mb-3 uppercase tracking-wider">Search</h3>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Type keyword..."
              className="w-full pl-9 pr-4 py-2 text-sm bg-gray-50 dark:bg-white/[0.03] border border-gray-200 dark:border-white/[0.06] rounded-xl outline-none focus:border-purple-500 transition-colors"
            />
          </div>
        </div>

        {/* Categories */}
        <div className="glass-panel p-5 rounded-2xl border border-black/[0.04] dark:border-white/[0.04]">
          <h3 className="text-sm font-black text-gray-800 dark:text-gray-200 mb-3 uppercase tracking-wider">Categories</h3>
          <div className="flex flex-col space-y-1">
            <button
              onClick={() => setSelectedCategory("")}
              className={`text-left text-sm px-3 py-2 rounded-xl font-semibold transition-all ${
                !selectedCategory
                  ? "bg-purple-500/10 text-purple-600 dark:text-purple-400"
                  : "text-gray-600 hover:text-purple-600 dark:text-gray-400 dark:hover:text-purple-400 hover:bg-gray-50 dark:hover:bg-white/[0.02]"
              }`}
            >
              All Categories
            </button>
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.slug)}
                className={`text-left text-sm px-3 py-2 rounded-xl font-semibold transition-all ${
                  selectedCategory === cat.slug
                    ? "bg-purple-500/10 text-purple-600 dark:text-purple-400"
                    : "text-gray-600 hover:text-purple-600 dark:text-gray-400 dark:hover:text-purple-400 hover:bg-gray-50 dark:hover:bg-white/[0.02]"
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>

        {/* Tags */}
        <div className="glass-panel p-5 rounded-2xl border border-black/[0.04] dark:border-white/[0.04]">
          <h3 className="text-sm font-black text-gray-800 dark:text-gray-200 mb-3 uppercase tracking-wider">Popular Tags</h3>
          <div className="flex flex-wrap gap-1.5">
            <button
              onClick={() => setSelectedTag("")}
              className={`px-3 py-1 text-xs font-bold rounded-lg border transition-all ${
                !selectedTag
                  ? "bg-purple-500 border-purple-500 text-white"
                  : "border-gray-200 dark:border-white/[0.08] text-gray-600 dark:text-gray-400 hover:border-purple-500/40"
              }`}
            >
              All
            </button>
            {tags.map((tag) => (
              <button
                key={tag.id}
                onClick={() => setSelectedTag(tag.slug)}
                className={`px-3 py-1 text-xs font-bold rounded-lg border transition-all ${
                  selectedTag === tag.slug
                    ? "bg-purple-500 border-purple-500 text-white"
                    : "border-gray-200 dark:border-white/[0.08] text-gray-600 dark:text-gray-400 hover:border-purple-500/40"
                }`}
              >
                #{tag.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Catalog View */}
      <div className="lg:col-span-3">
        {/* Controls Bar */}
        <div className="glass-panel flex flex-col sm:flex-row items-center justify-between p-4 rounded-2xl border border-black/[0.04] dark:border-white/[0.04] mb-6 gap-4">
          <div className="text-sm font-bold text-gray-500 dark:text-gray-400">
            Showing <span className="text-gray-800 dark:text-white font-black">{products.length}</span> finds
          </div>
          
          <div className="flex items-center space-x-3 w-full sm:w-auto justify-end">
            {/* Sort */}
            <select
              value={sortBy}
              onChange={(e: any) => setSortBy(e.target.value)}
              className="px-3 py-2 text-sm bg-gray-50 dark:bg-white/[0.03] border border-gray-200 dark:border-white/[0.06] rounded-xl outline-none font-semibold text-gray-700 dark:text-gray-300 focus:border-purple-500"
            >
              <option value="trending">🔥 Sort: Trending</option>
              <option value="newest">📅 Sort: Newest</option>
              <option value="most_clicked">🖱️ Sort: Most Clicked</option>
              <option value="highest_rated">⭐ Sort: Highest Rated</option>
            </select>

            {/* View Mode Toggle */}
            <div className="flex bg-gray-100 dark:bg-white/[0.04] p-1 rounded-xl">
              <button
                onClick={() => setViewMode("grid")}
                className={`p-2 rounded-lg transition-colors ${
                  viewMode === "grid"
                    ? "bg-white dark:bg-black text-purple-600 dark:text-purple-400 shadow-sm"
                    : "text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                }`}
                aria-label="Grid view"
              >
                <Grid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`p-2 rounded-lg transition-colors ${
                  viewMode === "list"
                    ? "bg-white dark:bg-black text-purple-600 dark:text-purple-400 shadow-sm"
                    : "text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                }`}
                aria-label="List view"
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Products Grid or List */}
        {products.length === 0 ? (
          <div className="glass-panel text-center py-16 px-4 rounded-3xl border border-black/[0.04] dark:border-white/[0.04]">
            <Search className="w-12 h-12 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
            <h3 className="text-lg font-black text-gray-800 dark:text-gray-200 mb-2">No products found</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 max-w-sm mx-auto">
              We couldn't find anything matching your filters. Try resetting search queries or changing your categories.
            </p>
          </div>
        ) : viewMode === "grid" ? (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col space-y-4">
            {products.map((product) => {
              const discount = product.originalPrice
                ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
                : 0

              return (
                <article
                  key={product.id}
                  className="glass-card flex flex-col md:flex-row rounded-2xl border border-black/[0.04] dark:border-white/[0.03] overflow-hidden bg-white/40 dark:bg-[#0f0f12]/40"
                >
                  {/* Left image container */}
                  <Link href={`/products/${product.slug}`} className="relative w-full md:w-64 h-48 flex-shrink-0 bg-gray-100 dark:bg-[#1a1a24]">
                    <img
                      src={product.imageUrl}
                      alt={product.title}
                      className="w-full h-full object-cover"
                    />
                    {discount > 0 && (
                      <span className="absolute bottom-3 right-3 px-2 py-0.5 rounded-lg text-xs font-black bg-emerald-500 text-white shadow-sm">
                        {discount}% OFF
                      </span>
                    )}
                  </Link>

                  {/* Right details content */}
                  <div className="flex flex-col justify-between flex-grow p-6">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[10px] font-extrabold uppercase text-purple-600 dark:text-purple-400 tracking-wider">
                          {categories.find(c => c.id === product.categoryId)?.name || "Product"}
                        </span>
                        <div className="flex items-center space-x-1">
                          <Star className="w-3.5 h-3.5 text-amber-500 fill-current" />
                          <span className="text-xs font-bold text-gray-800 dark:text-gray-200">
                            {product.rating}
                          </span>
                        </div>
                      </div>
                      <Link href={`/products/${product.slug}`}>
                        <h3 className="text-lg font-black text-gray-900 dark:text-white hover:text-purple-600 dark:hover:text-purple-400 transition-colors mb-2">
                          {product.title}
                        </h3>
                      </Link>
                      <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-2 mb-4 leading-relaxed">
                        {product.description}
                      </p>
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-black/[0.04] dark:border-white/[0.04]">
                      <div className="flex items-baseline space-x-2">
                        <span className="text-lg font-black text-purple-600 dark:text-purple-400">
                          ₹{product.price}
                        </span>
                        {product.originalPrice && (
                          <span className="text-xs text-gray-400 dark:text-gray-500 line-through">
                            ₹{product.originalPrice}
                          </span>
                        )}
                      </div>
                      <div className="flex space-x-2">
                        <Link
                          href={`/products/${product.slug}`}
                          className="px-4 py-2 rounded-lg border border-gray-200 dark:border-white/[0.08] hover:bg-gray-50 dark:hover:bg-white/[0.02] text-xs font-bold text-gray-700 dark:text-gray-200 transition-colors"
                        >
                          Review
                        </Link>
                        <a
                          href={`/go/${product.slug}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-4 py-2 rounded-lg bg-gradient-to-r from-purple-600 to-indigo-600 text-white text-xs font-bold shadow-md shadow-purple-500/10 hover:opacity-95 flex items-center space-x-1"
                        >
                          <span>Buy Deal</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      </div>
                    </div>
                  </div>
                </article>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
