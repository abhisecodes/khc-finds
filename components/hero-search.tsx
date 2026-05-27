"use client"

import React, { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Search, Sparkles } from "lucide-react"

const KEYWORDS = [
  "viral gadgets under ₹999",
  "best AI tools for students",
  "gaming keyboard & mouse combo",
  "desk setup essentials",
  "travel packing cubes",
  "smart WiFi plugs"
]

export default function HeroSearch() {
  const router = useRouter()
  const [search, setSearch] = useState("")
  const [keywordIndex, setKeywordIndex] = useState(0)
  const [fade, setFade] = useState(true)

  // Rotating keyword animation
  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false)
      setTimeout(() => {
        setKeywordIndex((prev) => (prev + 1) % KEYWORDS.length)
        setFade(true)
      }, 300)
    }, 3500)

    return () => clearInterval(interval)
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (search.trim()) {
      router.push(`/explore?q=${encodeURIComponent(search.trim())}`)
    }
  }

  const handleChipClick = (keyword: string) => {
    router.push(`/explore?q=${encodeURIComponent(keyword)}`)
  }

  return (
    <div className="w-full max-w-3xl mx-auto flex flex-col items-center">
      {/* Dynamic rotating header tag */}
      <div className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-600 dark:text-purple-400 text-xs font-bold mb-6 animate-pulse">
        <Sparkles className="w-3.5 h-3.5" />
        <span>Discover:</span>
        <span className={`inline-block transition-opacity duration-300 ${fade ? "opacity-100" : "opacity-0"}`}>
          {KEYWORDS[keywordIndex]}
        </span>
      </div>

      {/* Main Search Input */}
      <form onSubmit={handleSubmit} className="w-full relative group">
        <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-2xl blur opacity-25 group-hover:opacity-40 transition duration-300" />
        <div className="relative flex items-center bg-white dark:bg-[#0f0f12] border border-gray-200 dark:border-white/[0.08] rounded-2xl p-1.5 focus-within:border-purple-500 focus-within:ring-2 focus-within:ring-purple-500/20 transition-all duration-300">
          <Search className="w-5 h-5 text-gray-400 ml-4 flex-shrink-0" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search viral Amazon finds, AI tools, creator gear..."
            className="w-full bg-transparent border-0 outline-none text-gray-800 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 text-base md:text-lg px-3 py-2"
          />
          <button
            type="submit"
            className="px-6 py-2.5 md:py-3 bg-gradient-to-r from-purple-600 to-indigo-600 hover:opacity-95 text-white font-bold rounded-xl text-sm md:text-base shadow-lg shadow-purple-500/20 active:scale-95 transition-all flex-shrink-0"
          >
            Find Deals
          </button>
        </div>
      </form>

      {/* Quick suggest chips */}
      <div className="flex flex-wrap justify-center gap-2 mt-5 max-w-2xl">
        {["Gadgets", "AI Tools", "Under ₹999", "Creator Setup", "Travel"].map((chip) => (
          <button
            key={chip}
            onClick={() => handleChipClick(chip === "Under ₹999" ? "under-999" : chip)}
            className="px-4 py-1.5 rounded-full bg-white dark:bg-white/[0.03] border border-gray-200 dark:border-white/[0.06] text-xs font-semibold text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 hover:border-purple-500/30 hover:bg-purple-500/5 transition-all duration-200"
          >
            {chip}
          </button>
        ))}
      </div>
    </div>
  )
}
