"use client"

import React, { useState, useEffect } from "react"
import Link from "next/link"
import { Star, Share2, Heart, ExternalLink, Sparkles, Flame, Check, Copy } from "lucide-react"
import { Product } from "@/lib/seed-data"

interface ProductCardProps {
  product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
  const [saved, setSaved] = useState(false)
  const [copied, setCopied] = useState(false)
  const [couponCopied, setCouponCopied] = useState(false)

  // Load saved state from localStorage
  useEffect(() => {
    const savedItems = JSON.parse(localStorage.getItem("khc-wishlist") || "[]")
    setSaved(savedItems.includes(product.id))
  }, [product.id])

  const toggleSave = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    const savedItems = JSON.parse(localStorage.getItem("khc-wishlist") || "[]")
    let newItems: string[]
    if (saved) {
      newItems = savedItems.filter((id: string) => id !== product.id)
      setSaved(false)
    } else {
      newItems = [...savedItems, product.id]
      setSaved(true)
    }
    localStorage.setItem("khc-wishlist", JSON.stringify(newItems))
  }

  const handleShare = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    const shareUrl = `${window.location.origin}/products/${product.slug}`
    navigator.clipboard.writeText(shareUrl)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleCopyCoupon = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (!product.couponCode) return
    navigator.clipboard.writeText(product.couponCode)
    setCouponCopied(true)
    setTimeout(() => setCouponCopied(false), 2000)
  }

  // Derive saving percentage
  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0

  // Identify source affiliate store name (BuyHatke feature)
  const getStoreName = (url: string) => {
    if (url.includes("amazon")) return "Amazon"
    if (url.includes("flipkart")) return "Flipkart"
    if (url.includes("travelpayouts")) return "TravelPayouts"
    if (url.includes("myntra")) return "Myntra"
    return "Partner Store"
  }

  const mainStore = getStoreName(product.affiliateLink)

  // Price comparison simulator (BuyHatke feature)
  const compareStores = [
    { name: mainStore, price: product.price, active: true },
    { 
      name: mainStore === "Amazon" ? "Flipkart" : "Amazon", 
      price: Math.round(product.price * 1.06), 
      active: false 
    },
    { 
      name: mainStore === "Myntra" ? "Tata CliQ" : "Reliance Digital", 
      price: Math.round(product.price * 1.12), 
      active: false 
    }
  ]

  return (
    <article className="bg-white border border-slate-200 rounded-3xl shadow-sm hover:shadow-md transition-all duration-300 flex flex-col overflow-hidden relative group">
      
      {/* Badges */}
      <div className="absolute top-4 left-4 z-10 flex flex-col space-y-1.5">
        {product.isFeatured && (
          <span className="flex items-center space-x-1 px-2.5 py-0.5 rounded-full text-[9px] font-black uppercase tracking-wider bg-purple-600 text-white shadow-sm">
            <Sparkles className="w-2.5 h-2.5" />
            <span>Featured</span>
          </span>
        )}
        {discount > 15 && (
          <span className="flex items-center space-x-1 px-2.5 py-0.5 rounded-full text-[9px] font-black uppercase tracking-wider bg-emerald-500 text-white shadow-sm">
            <span>🔥 {discount}% Saving</span>
          </span>
        )}
      </div>

      {/* Share / Save buttons */}
      <div className="absolute top-4 right-4 z-10 flex space-x-1.5">
        <button
          onClick={handleShare}
          className="w-7 h-7 rounded-full flex items-center justify-center bg-white border border-slate-200 text-slate-500 hover:text-purple-600 hover:scale-105 active:scale-95 transition-all"
          title="Share Product"
        >
          {copied ? <Check className="w-3 h-3 text-green-500" /> : <Share2 className="w-3 h-3" />}
        </button>
        <button
          onClick={toggleSave}
          className="w-7 h-7 rounded-full flex items-center justify-center bg-white border border-slate-200 hover:scale-105 active:scale-95 transition-all"
          title={saved ? "Remove from wishlist" : "Add to wishlist"}
        >
          <Heart
            className={`w-3.5 h-3.5 transition-colors ${
              saved ? "text-red-500 fill-current" : "text-slate-500 hover:text-red-500"
            }`}
          />
        </button>
      </div>

      {/* Image container */}
      <Link href={`/products/${product.slug}`} className="block relative aspect-video overflow-hidden bg-slate-50 border-b border-slate-100">
        <img
          src={product.imageUrl}
          alt={product.title}
          className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-300"
        />
        {/* Original Store Badge */}
        <span className="absolute bottom-3 right-3 px-2 py-0.5 rounded bg-slate-900/80 text-white font-extrabold text-[9px] uppercase tracking-wider">
          {mainStore}
        </span>
      </Link>

      {/* Details Area */}
      <div className="flex flex-col flex-grow p-4">
        {/* Rating and short details */}
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center space-x-0.5 text-xs text-slate-500">
            <Star className="w-3.5 h-3.5 text-amber-500 fill-current" />
            <span className="font-bold text-slate-800">{product.rating}</span>
          </div>

          <div className="flex items-baseline space-x-1">
            {product.originalPrice && (
              <span className="text-xs text-slate-400 line-through">
                ₹{product.originalPrice}
              </span>
            )}
            <span className="text-base font-black text-purple-600">
              ₹{product.price}
            </span>
          </div>
        </div>

        {/* Title */}
        <Link href={`/products/${product.slug}`} className="block mb-1">
          <h3 className="font-bold text-sm text-slate-950 line-clamp-1 hover:text-purple-600 transition-colors">
            {product.title}
          </h3>
        </Link>

        {/* Description Excerpt */}
        <p className="text-[11px] text-slate-500 leading-normal line-clamp-2 mb-3">
          {product.description}
        </p>

        {/* Price Comparison Block (BuyHatke 70% styling) */}
        <div className="mt-auto pt-3 border-t border-slate-100 space-y-1.5">
          <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest block">Store Comparison</span>
          <div className="space-y-1">
            {compareStores.map((st, idx) => (
              <div 
                key={idx}
                className={`flex items-center justify-between px-2 py-1 rounded-lg text-[11px] ${
                  st.active 
                    ? "bg-purple-50 border border-purple-100/50 font-bold text-purple-700" 
                    : "text-slate-500"
                }`}
              >
                <span className="flex items-center space-x-1">
                  <span className={`w-1 h-1 rounded-full ${st.active ? "bg-purple-600" : "bg-slate-300"}`} />
                  <span>{st.name}</span>
                </span>
                <span className="flex items-center space-x-1.5">
                  <span>₹{st.price}</span>
                  {st.active && (
                    <span className="text-[8px] font-black uppercase tracking-wider bg-purple-600 text-white px-1 rounded">Best</span>
                  )}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Coupon Copy Box (BuyHatke feature) */}
        {product.couponCode && (
          <div 
            onClick={handleCopyCoupon}
            className="mt-2.5 p-2.5 rounded-xl border border-dashed border-amber-300 bg-amber-50/50 hover:bg-amber-50 text-amber-800 text-[10px] font-bold text-center flex items-center justify-between cursor-pointer active:scale-95 transition-all"
            title="Click to copy coupon code"
          >
            <span className="font-mono">Code: <span className="bg-amber-100 px-1 py-0.5 rounded text-amber-900 border border-amber-200">{product.couponCode}</span></span>
            <span className="text-[8px] font-black uppercase tracking-wider text-amber-600 bg-amber-100/50 px-1.5 py-0.5 rounded">
              {couponCopied ? "Copied!" : "Copy"}
            </span>
          </div>
        )}

        {/* Action Buttons Grid */}
        <div className="grid grid-cols-2 gap-2 mt-3.5">
          <Link
            href={`/products/${product.slug}`}
            className="flex items-center justify-center space-x-1 py-2 rounded-xl border border-slate-200 hover:bg-slate-50 text-[11px] font-bold text-slate-700 transition-colors"
          >
            <span>Details & History</span>
          </Link>
          <a
            href={`/go/${product.slug}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center space-x-1 py-2 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-[11px] font-bold shadow-sm transition-colors"
          >
            <span>Buy at {mainStore}</span>
            <ExternalLink className="w-3 h-3 ml-0.5" />
          </a>
        </div>

      </div>
    </article>
  )
}
