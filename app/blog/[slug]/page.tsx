import React from "react"
import { notFound } from "next/navigation"
import Link from "next/link"
import { Metadata } from "next"
import { Calendar, Clock, ChevronRight, User, ArrowLeft, Share2 } from "lucide-react"
import { getBlogBySlug, getProducts, getCategories } from "@/lib/services/db-service"
import ProductCard from "@/components/product-card"

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const resolvedParams = await params
  const post = await getBlogBySlug(resolvedParams.slug)
  if (!post) return { title: "Article Not Found" }

  return {
    title: `${post.title} | KHC Finds Blog`,
    description: post.summary,
    openGraph: {
      title: post.title,
      description: post.summary,
      images: post.imageUrl ? [{ url: post.imageUrl }] : [],
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
        <h4 key={index} className="text-lg font-black text-gray-800 dark:text-gray-200 mt-6 mb-2">
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
        <h2 key={index} className="text-2xl font-black text-gray-900 dark:text-white mt-10 mb-4 pb-2 border-b border-black/[0.05] dark:border-white/[0.05]">
          {trimmed.slice(2)}
        </h2>
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

export default async function BlogDetailPage({ params }: PageProps) {
  const resolvedParams = await params
  const post = await getBlogBySlug(resolvedParams.slug)

  if (!post) {
    notFound()
  }

  const [categories, allProducts] = await Promise.all([
    getCategories(),
    getProducts()
  ])

  const category = categories.find(c => c.id === post.categoryId)
  const relatedProducts = allProducts
    .filter(p => p.categoryId === post.categoryId)
    .slice(0, 3)

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      
      {/* Back button */}
      <div className="mb-8 border-b border-black/[0.04] dark:border-white/[0.04] pb-4">
        <Link
          href="/blog"
          className="inline-flex items-center space-x-1.5 text-xs font-bold text-gray-500 hover:text-purple-600 dark:text-gray-400 dark:hover:text-purple-400"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Blog Feed</span>
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        
        {/* Main Article (Left) */}
        <article className="lg:col-span-8 space-y-6">
          <div className="space-y-4">
            {/* Meta tags */}
            <div className="flex items-center space-x-3 text-xs font-bold text-purple-600 dark:text-purple-400">
              {category && (
                <Link href={`/explore?category=${category.slug}`} className="bg-purple-500/10 px-2 py-0.5 rounded hover:underline">
                  {category.name}
                </Link>
              )}
              <span className="flex items-center text-gray-400">
                <Calendar className="w-3.5 h-3.5 mr-1" />
                <span>{new Date(post.publishedAt).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}</span>
              </span>
              <span className="flex items-center text-gray-400">
                <Clock className="w-3.5 h-3.5 mr-1" />
                <span>{post.readTime}</span>
              </span>
            </div>

            <h1 className="text-3xl md:text-5xl font-black text-gray-900 dark:text-white leading-tight">
              {post.title}
            </h1>

            <div className="flex items-center space-x-2 text-xs text-gray-500 dark:text-gray-400 font-bold border-t border-b border-black/[0.04] dark:border-white/[0.04] py-3">
              <div className="w-6 h-6 rounded-full bg-purple-500/15 flex items-center justify-center text-purple-600">
                <User className="w-3.5 h-3.5" />
              </div>
              <span>Written by {post.authorName} • Curated Tech Editor</span>
            </div>
          </div>

          {/* Full Cover Image */}
          {post.imageUrl && (
            <div className="aspect-video rounded-3xl overflow-hidden bg-gray-100 dark:bg-[#1a1a24] border border-black/[0.04] dark:border-white/[0.04]">
              <img src={post.imageUrl} alt={post.title} className="w-full h-full object-cover" />
            </div>
          )}

          {/* Body Content */}
          <div className="prose dark:prose-invert max-w-none pt-4">
            {renderMarkdown(post.content)}
          </div>
        </article>

        {/* Sidebar Recommended Finds (Right) */}
        <div className="lg:col-span-4 space-y-6">
          <div className="glass-panel p-6 rounded-3xl border border-black/[0.04] dark:border-white/[0.04] bg-white/40 dark:bg-white/[0.01]">
            <h3 className="text-sm font-black text-gray-900 dark:text-white mb-6 uppercase tracking-wider">
              Featured Products in Article
            </h3>
            
            <div className="flex flex-col space-y-6">
              {relatedProducts.map((p) => (
                <div key={p.id} className="border-b border-black/[0.04] dark:border-white/[0.04] pb-4 last:border-0 last:pb-0">
                  <Link href={`/products/${p.slug}`} className="flex space-x-3 mb-2 group">
                    <img src={p.imageUrl} alt={p.title} className="w-16 h-16 rounded-xl object-cover bg-gray-50 flex-shrink-0" />
                    <div>
                      <h4 className="text-xs font-black text-gray-800 dark:text-gray-200 line-clamp-2 group-hover:text-purple-600 transition-colors">
                        {p.title}
                      </h4>
                      <span className="text-xs font-black text-purple-600 dark:text-purple-400">
                        ₹{p.price}
                      </span>
                    </div>
                  </Link>
                  <a
                    href={`/go/${p.slug}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full flex items-center justify-center space-x-1 py-1.5 rounded-lg border border-purple-500/20 bg-purple-500/5 hover:bg-purple-500/10 text-[10px] font-black text-purple-600 dark:text-purple-400 transition-colors"
                  >
                    <span>Check Live Deal</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}
