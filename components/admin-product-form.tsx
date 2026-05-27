"use client"

import React, { useState } from "react"
import { useRouter } from "next/navigation"
import { Sparkles, Save, ArrowLeft, Cpu, ShieldCheck } from "lucide-react"
import Link from "next/link"
import { Product } from "@/lib/seed-data"

interface CategoryOption {
  id: string
  name: string
  slug: string
}

interface AdminProductFormProps {
  categories: CategoryOption[]
  initialProduct?: Product
}

export default function AdminProductForm({ categories, initialProduct }: AdminProductFormProps) {
  const router = useRouter()
  const [submitting, setSubmitting] = useState(false)
  const [generating, setGenerating] = useState(false)
  const [aiGeneratedMessage, setAiGeneratedMessage] = useState("")

  // Form states
  const [title, setTitle] = useState(initialProduct?.title || "")
  const [slug, setSlug] = useState(initialProduct?.slug || "")
  const [description, setDescription] = useState(initialProduct?.description || "")
  const [longDescription, setLongDescription] = useState(initialProduct?.longDescription || "")
  const [price, setPrice] = useState(initialProduct ? String(initialProduct.price) : "")
  const [originalPrice, setOriginalPrice] = useState(initialProduct?.originalPrice ? String(initialProduct.originalPrice) : "")
  const [rating, setRating] = useState(initialProduct ? String(initialProduct.rating) : "4.5")
  const [trendingScore, setTrendingScore] = useState(initialProduct ? String(initialProduct.trendingScore) : "85")
  const [affiliateLink, setAffiliateLink] = useState(initialProduct?.affiliateLink || "")
  const [imageUrl, setImageUrl] = useState(initialProduct?.imageUrl || "")
  const [categoryId, setCategoryId] = useState(initialProduct?.categoryId || categories[0]?.id || "")
  const [tags, setTags] = useState(initialProduct?.tags ? initialProduct.tags.join(", ") : "")
  const [couponCode, setCouponCode] = useState(initialProduct?.couponCode || "")
  const [isFeatured, setIsFeatured] = useState(initialProduct?.isFeatured || false)
  const [isSponsored, setIsSponsored] = useState(initialProduct?.isSponsored || false)

  // Auto generate slug from title
  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value
    setTitle(val)
    // Basic slugification
    const autoSlug = val
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "")
    setSlug(autoSlug)
  }

  // AI Content Generator call
  const handleAIGenerate = async () => {
    if (!title.trim()) {
      alert("Please enter a product title first to generate AI content.")
      return
    }

    setGenerating(true)
    setAiGeneratedMessage("")

    try {
      const selectedCat = categories.find(c => c.id === categoryId)?.name || "Gadget"
      const res = await fetch("/api/admin/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productName: title, category: selectedCat }),
      })

      if (res.ok) {
        const data = await res.json()
        
        // Auto fill states
        if (data.description) setDescription(data.description)
        if (data.longDescription) setLongDescription(data.longDescription)
        if (data.price) setPrice(String(data.price))
        if (data.originalPrice) setOriginalPrice(String(data.originalPrice))
        if (data.rating) setRating(String(data.rating))
        if (data.trendingScore) setTrendingScore(String(data.trendingScore))
        if (data.tags) setTags(data.tags.join(", "))
        if (data.slug) setSlug(data.slug)

        setAiGeneratedMessage(
          data._note 
            ? "Generated mock templates (configure GEMINI_API_KEY in environment for live AI)."
            : "Successfully generated optimized copy using Google Gemini model!"
        )
      } else {
        alert("AI Assistant failed to generate content.")
      }
    } catch (error) {
      console.error("AI Generation request failed:", error)
      alert("AI Generation request failed.")
    } finally {
      setGenerating(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!title || !slug || !description || !longDescription || !price || !affiliateLink || !imageUrl || !categoryId) {
      alert("Please fill in all required fields.")
      return
    }

    setSubmitting(true)
    try {
      const url = "/api/admin/products"
      const method = initialProduct ? "PUT" : "POST"
      const payload = {
        id: initialProduct?.id,
        title,
        slug,
        description,
        longDescription,
        price: parseFloat(price),
        originalPrice: originalPrice ? parseFloat(originalPrice) : null,
        rating: parseFloat(rating),
        trendingScore: parseFloat(trendingScore),
        affiliateLink,
        imageUrl,
        categoryId,
        tags,
        couponCode,
        isFeatured,
        isSponsored,
      }

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })

      if (res.ok) {
        router.push("/admin/products")
        router.refresh()
      } else {
        const errorData = await res.json()
        alert(`Error: ${errorData.error || `Failed to ${initialProduct ? "update" : "create"} product`}`)
      }
    } catch (error) {
      console.error("Failed to submit form:", error)
      alert("Failed to submit form.")
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Top action bar */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-black/[0.05] dark:border-white/[0.05] pb-5">
        <Link
          href="/admin/products"
          className="inline-flex items-center space-x-1 text-xs font-bold text-gray-500 hover:text-purple-600 dark:text-gray-400 dark:hover:text-purple-400"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Cancel & Back</span>
        </Link>

        <div className="flex space-x-2">
          {/* AI Generator Trigger */}
          <button
            type="button"
            onClick={handleAIGenerate}
            disabled={generating}
            className="flex items-center justify-center space-x-1.5 px-5 py-2.5 rounded-xl border border-purple-500/20 bg-purple-500/5 hover:bg-purple-500/10 text-xs font-bold text-purple-600 dark:text-purple-400 transition-colors disabled:opacity-50"
          >
            <Cpu className="w-4 h-4" />
            <span>{generating ? "AI Writing Copy..." : "AI SEO Assistant"}</span>
          </button>

          <button
            type="submit"
            disabled={submitting}
            className="flex items-center justify-center space-x-1.5 px-5 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:opacity-95 text-white text-xs font-bold shadow-md shadow-purple-500/20 disabled:opacity-50"
          >
            <Save className="w-4 h-4" />
            <span>{submitting ? "Saving..." : initialProduct ? "Update Product" : "Save Product"}</span>
          </button>
        </div>
      </div>

      {aiGeneratedMessage && (
        <div className="p-4 rounded-xl text-xs font-bold text-purple-600 dark:text-purple-400 bg-purple-500/10 border border-purple-500/20 flex items-center space-x-2">
          <Sparkles className="w-4 h-4 text-purple-500 animate-spin" />
          <span>{aiGeneratedMessage}</span>
        </div>
      )}

      {/* Grid segments */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column: Basic Details (Col Span 2) */}
        <div className="lg:col-span-2 space-y-6">
          <div className="glass-panel p-6 rounded-3xl border border-black/[0.04] dark:border-white/[0.04] bg-white/40 dark:bg-white/[0.01] space-y-4">
            <h2 className="text-sm font-black text-gray-900 dark:text-white uppercase tracking-wider mb-2">Core Specifications</h2>
            
            {/* Title */}
            <div>
              <label className="block text-xs font-bold text-gray-500 dark:text-gray-400 mb-1.5 uppercase">Product Title *</label>
              <input
                type="text"
                required
                value={title}
                onChange={handleTitleChange}
                placeholder="e.g. Zebronics Zeb-Transformer Combo"
                className="w-full px-3.5 py-2.5 text-sm bg-white dark:bg-white/[0.02] border border-gray-200 dark:border-white/[0.06] rounded-xl outline-none focus:border-purple-500"
              />
            </div>

            {/* Slug */}
            <div>
              <label className="block text-xs font-bold text-gray-500 dark:text-gray-400 mb-1.5 uppercase">Slug URL *</label>
              <input
                type="text"
                required
                value={slug}
                onChange={(e) => setSlug(e.target.value.toLowerCase().replace(/ /g, "-"))}
                placeholder="zebronics-zeb-transformer-combo"
                className="w-full px-3.5 py-2.5 text-sm bg-white dark:bg-white/[0.02] border border-gray-200 dark:border-white/[0.06] rounded-xl outline-none focus:border-purple-500"
              />
            </div>

            {/* Short Description */}
            <div>
              <label className="block text-xs font-bold text-gray-500 dark:text-gray-400 mb-1.5 uppercase">Short Description (Excerpt) *</label>
              <input
                type="text"
                required
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Provide a punchy 1-sentence tagline..."
                className="w-full px-3.5 py-2.5 text-sm bg-white dark:bg-white/[0.02] border border-gray-200 dark:border-white/[0.06] rounded-xl outline-none focus:border-purple-500"
              />
            </div>

            {/* Markdown Long Description */}
            <div>
              <label className="block text-xs font-bold text-gray-500 dark:text-gray-400 mb-1.5 uppercase">Review Contents (Markdown Editor) *</label>
              <textarea
                required
                value={longDescription}
                onChange={(e) => setLongDescription(e.target.value)}
                rows={10}
                placeholder="## Product Title Review&#10;&#10;Use standard headings ##, specs, pros and cons lists..."
                className="w-full px-3.5 py-2.5 text-sm bg-white dark:bg-white/[0.02] border border-gray-200 dark:border-white/[0.06] rounded-xl outline-none focus:border-purple-500 font-mono resize-y"
              />
            </div>
          </div>
        </div>

        {/* Right Column: Pricing, taxonomy, settings */}
        <div className="lg:col-span-1 space-y-6">
          
          {/* Metadata details */}
          <div className="glass-panel p-6 rounded-3xl border border-black/[0.04] dark:border-white/[0.04] bg-white/40 dark:bg-white/[0.01] space-y-4">
            <h2 className="text-sm font-black text-gray-900 dark:text-white uppercase tracking-wider mb-2">Meta & Pricing</h2>

            {/* Price */}
            <div>
              <label className="block text-xs font-bold text-gray-500 dark:text-gray-400 mb-1.5 uppercase">Deal Price (INR) *</label>
              <input
                type="number"
                required
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="1199"
                className="w-full px-3.5 py-2.5 text-sm bg-white dark:bg-white/[0.02] border border-gray-200 dark:border-white/[0.06] rounded-xl outline-none focus:border-purple-500"
              />
            </div>

            {/* Original Price */}
            <div>
              <label className="block text-xs font-bold text-gray-500 dark:text-gray-400 mb-1.5 uppercase">Original Retail Price (INR)</label>
              <input
                type="number"
                value={originalPrice}
                onChange={(e) => setOriginalPrice(e.target.value)}
                placeholder="1599"
                className="w-full px-3.5 py-2.5 text-sm bg-white dark:bg-white/[0.02] border border-gray-200 dark:border-white/[0.06] rounded-xl outline-none focus:border-purple-500"
              />
            </div>

            {/* Category */}
            <div>
              <label className="block text-xs font-bold text-gray-500 dark:text-gray-400 mb-1.5 uppercase">Category *</label>
              <select
                value={categoryId}
                onChange={(e) => setCategoryId(e.target.value)}
                className="w-full px-3.5 py-2.5 text-sm bg-white dark:bg-white/[0.02] border border-gray-200 dark:border-white/[0.06] rounded-xl outline-none focus:border-purple-500 font-bold"
              >
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>{cat.name}</option>
                ))}
              </select>
            </div>

            {/* Rating */}
            <div>
              <label className="block text-xs font-bold text-gray-500 dark:text-gray-400 mb-1.5 uppercase">Editor Rating (0 - 5) *</label>
              <input
                type="number"
                step="0.1"
                min="0"
                max="5"
                required
                value={rating}
                onChange={(e) => setRating(e.target.value)}
                placeholder="4.5"
                className="w-full px-3.5 py-2.5 text-sm bg-white dark:bg-white/[0.02] border border-gray-200 dark:border-white/[0.06] rounded-xl outline-none focus:border-purple-500"
              />
            </div>

            {/* Trending Score */}
            <div>
              <label className="block text-xs font-bold text-gray-500 dark:text-gray-400 mb-1.5 uppercase">Trending Score (1 - 100) *</label>
              <input
                type="number"
                required
                value={trendingScore}
                onChange={(e) => setTrendingScore(e.target.value)}
                placeholder="85"
                className="w-full px-3.5 py-2.5 text-sm bg-white dark:bg-white/[0.02] border border-gray-200 dark:border-white/[0.06] rounded-xl outline-none focus:border-purple-500"
              />
            </div>
          </div>

          {/* Links and Codes */}
          <div className="glass-panel p-6 rounded-3xl border border-black/[0.04] dark:border-white/[0.04] bg-white/40 dark:bg-white/[0.01] space-y-4">
            <h2 className="text-sm font-black text-gray-900 dark:text-white uppercase tracking-wider mb-2">Deal Redirection</h2>

            {/* Affiliate Link */}
            <div>
              <label className="block text-xs font-bold text-gray-500 dark:text-gray-400 mb-1.5 uppercase">Affiliate Link *</label>
              <input
                type="url"
                required
                value={affiliateLink}
                onChange={(e) => setAffiliateLink(e.target.value)}
                placeholder="https://amazon.in/dp/..."
                className="w-full px-3.5 py-2.5 text-sm bg-white dark:bg-white/[0.02] border border-gray-200 dark:border-white/[0.06] rounded-xl outline-none focus:border-purple-500"
              />
            </div>

            {/* Image URL */}
            <div>
              <label className="block text-xs font-bold text-gray-500 dark:text-gray-400 mb-1.5 uppercase">Product Image URL *</label>
              <input
                type="url"
                required
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                placeholder="https://images.unsplash.com/photo-..."
                className="w-full px-3.5 py-2.5 text-sm bg-white dark:bg-white/[0.02] border border-gray-200 dark:border-white/[0.06] rounded-xl outline-none focus:border-purple-500"
              />
            </div>

            {/* Tags */}
            <div>
              <label className="block text-xs font-bold text-gray-500 dark:text-gray-400 mb-1.5 uppercase">Tags (comma separated)</label>
              <input
                type="text"
                value={tags}
                onChange={(e) => setTags(e.target.value)}
                placeholder="amazon-finds, gaming, student"
                className="w-full px-3.5 py-2.5 text-sm bg-white dark:bg-white/[0.02] border border-gray-200 dark:border-white/[0.06] rounded-xl outline-none focus:border-purple-500"
              />
            </div>

            {/* Coupon Code */}
            <div>
              <label className="block text-xs font-bold text-gray-500 dark:text-gray-400 mb-1.5 uppercase">Coupon Code (Optional)</label>
              <input
                type="text"
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value)}
                placeholder="ZEBTRANS50"
                className="w-full px-3.5 py-2.5 text-sm bg-white dark:bg-white/[0.02] border border-gray-200 dark:border-white/[0.06] rounded-xl outline-none focus:border-purple-500 font-bold tracking-wider"
              />
            </div>

            {/* Placement Toggles */}
            <div className="flex flex-col space-y-3 pt-3 border-t border-black/[0.05] dark:border-white/[0.05]">
              <label className="flex items-center space-x-2 text-xs font-bold text-gray-600 dark:text-gray-300">
                <input
                  type="checkbox"
                  checked={isFeatured}
                  onChange={(e) => setIsFeatured(e.target.checked)}
                  className="w-4 h-4 accent-purple-500 rounded border-gray-200 focus:ring-purple-500/20"
                />
                <span>Set as Product of the Day</span>
              </label>

              <label className="flex items-center space-x-2 text-xs font-bold text-gray-600 dark:text-gray-300">
                <input
                  type="checkbox"
                  checked={isSponsored}
                  onChange={(e) => setIsSponsored(e.target.checked)}
                  className="w-4 h-4 accent-purple-500 rounded border-gray-200 focus:ring-purple-500/20"
                />
                <span>Set as Sponsored Placement</span>
              </label>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-gray-100 dark:bg-white/[0.02] border border-black/[0.04] dark:border-white/[0.04] text-[10px] text-gray-400 flex items-center space-x-2">
            <ShieldCheck className="w-4 h-4 text-purple-500" />
            <span>Product will publish instantly to catalog without redeployment.</span>
          </div>

        </div>

      </div>
    </form>
  )
}
