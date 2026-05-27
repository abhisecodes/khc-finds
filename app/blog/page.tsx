import React from "react"
import Link from "next/link"
import { BookOpen, Calendar, Clock, ChevronRight } from "lucide-react"
import { getBlogs, getCategories } from "@/lib/services/db-service"

export const revalidate = 300 // Cache for 5 minutes

export default async function BlogPage() {
  const [blogs, categories] = await Promise.all([
    getBlogs(),
    getCategories()
  ])

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Header */}
      <div className="mb-12 text-center md:text-left space-y-2">
        <h1 className="text-3xl md:text-5xl font-black text-gray-900 dark:text-white">
          KHC Curated Blog
        </h1>
        <p className="text-sm md:text-base text-gray-500 dark:text-gray-400 max-w-2xl">
          Detailed product comparisons, desk setup ideas, coding gear buying guides, and tech analysis articles.
        </p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
        {blogs.map((post) => (
          <article
            key={post.id}
            className="glass-card flex flex-col rounded-3xl border border-black/[0.04] dark:border-white/[0.03] overflow-hidden bg-white/40 dark:bg-[#0f0f12]/40"
          >
            {/* Image */}
            <Link href={`/blog/${post.slug}`} className="block relative aspect-video overflow-hidden bg-gray-100 dark:bg-[#1a1a24]">
              {post.imageUrl && (
                <img
                  src={post.imageUrl}
                  alt={post.title}
                  loading="lazy"
                  className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-300"
                />
              )}
            </Link>

            {/* Content */}
            <div className="flex flex-col flex-grow p-6 space-y-4">
              <div className="flex items-center space-x-3 text-xs font-bold text-purple-600 dark:text-purple-400">
                <span className="bg-purple-500/10 px-2 py-0.5 rounded">
                  {categories.find(c => c.id === post.categoryId)?.name || "Article"}
                </span>
                <span className="flex items-center">
                  <Calendar className="w-3.5 h-3.5 mr-1" />
                  <span>{new Date(post.publishedAt).toLocaleDateString("en-IN", { day: "numeric", month: "short" })}</span>
                </span>
                <span className="flex items-center">
                  <Clock className="w-3.5 h-3.5 mr-1" />
                  <span>{post.readTime}</span>
                </span>
              </div>

              <Link href={`/blog/${post.slug}`} className="block group">
                <h2 className="text-xl md:text-2xl font-black text-gray-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors leading-tight line-clamp-2">
                  {post.title}
                </h2>
              </Link>

              <p className="text-xs md:text-sm text-gray-500 dark:text-gray-400 leading-relaxed line-clamp-2">
                {post.summary}
              </p>

              <Link
                href={`/blog/${post.slug}`}
                className="inline-flex items-center space-x-1 text-xs font-extrabold text-purple-600 dark:text-purple-400 hover:underline pt-2 mt-auto"
              >
                <span>Read Full Article</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </article>
        ))}
      </div>
    </div>
  )
}
