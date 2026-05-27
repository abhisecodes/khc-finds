import React from "react"
import { getProducts, getCategories, getTags } from "@/lib/services/db-service"
import ExploreCatalog from "@/components/explore-catalog"

export const revalidate = 0 // Dynamic data loading

interface PageProps {
  searchParams: Promise<{
    q?: string
    category?: string
    tag?: string
  }>
}

export default async function ExplorePage({ searchParams }: PageProps) {
  // Await searchParams as required by Next.js 15 breaking changes
  const resolvedParams = await searchParams
  const q = resolvedParams.q || ""
  const category = resolvedParams.category || ""
  const tag = resolvedParams.tag || ""

  // Fetch all initial dataset on server
  const [products, categories, tags] = await Promise.all([
    getProducts(),
    getCategories(),
    getTags()
  ])

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Header */}
      <div className="mb-10 text-center md:text-left">
        <h1 className="text-3xl md:text-4xl font-black text-gray-900 dark:text-white mb-3">
          Explore Hot Finds
        </h1>
        <p className="text-sm md:text-base text-gray-500 dark:text-gray-400 max-w-2xl">
          Search and filter through our curation of tech, gadgets, AI services, desk setups, and student recommendations. Updated daily.
        </p>
      </div>

      {/* Interactive Catalog */}
      <ExploreCatalog
        initialProducts={products}
        categories={categories}
        tags={tags}
        initialSearch={q}
        initialCategory={category}
        initialTag={tag}
      />
    </div>
  )
}
