import React from "react"
import { notFound } from "next/navigation"
import Link from "next/link"
import { Metadata } from "next"
import { Star, ShieldCheck, Heart, AlertCircle, Sparkles, ExternalLink, ChevronRight, HelpCircle, ArrowLeft } from "lucide-react"
import { getProductBySlug, getProducts, getReviews, getCategories } from "@/lib/services/db-service"
import CouponCard from "@/components/coupon-card"
import ReviewsSection from "@/components/reviews-section"
import ProductCard from "@/components/product-card"
import PriceTracker from "@/components/price-tracker"

interface PageProps {
  params: Promise<{ slug: string }>
}

// Generate dynamic metadata for SEO
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const resolvedParams = await params
  const product = await getProductBySlug(resolvedParams.slug)
  if (!product) return { title: "Product Not Found" }

  return {
    title: `${product.title} Review & Coupon Code | KHC Finds`,
    description: product.description,
    openGraph: {
      title: `${product.title} Review | KHC Finds`,
      description: product.description,
      images: [{ url: product.imageUrl }],
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
        <h2 key={index} className="text-2xl font-black text-gray-900 dark:text-white mt-10 mb-4 border-b border-black/[0.05] dark:border-white/[0.05] pb-2">
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
      <p key={index} className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed mb-3">
        {trimmed}
      </p>
    )
  })
}

export default async function ProductDetailPage({ params }: PageProps) {
  const resolvedParams = await params
  const product = await getProductBySlug(resolvedParams.slug)

  if (!product) {
    notFound()
  }

  const getStoreName = (url: string) => {
    if (url.includes("amazon")) return "Amazon"
    if (url.includes("flipkart")) return "Flipkart"
    if (url.includes("travelpayouts")) return "TravelPayouts"
    if (url.includes("myntra")) return "Myntra"
    return "Partner Store"
  }

  const mainStore = getStoreName(product.affiliateLink)
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

  // Fetch reviews, related products, and categories
  const [reviews, categories, allProducts] = await Promise.all([
    getReviews(product.id),
    getCategories(),
    getProducts()
  ])

  const category = categories.find(c => c.id === product.categoryId)
  const relatedProducts = allProducts
    .filter(p => p.categoryId === product.categoryId && p.id !== product.id)
    .slice(0, 4)

  // JSON-LD Schemas for Search Engines
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
        "name": category?.name || "Products",
        "item": `https://khcfinds.com/explore?category=${category?.slug}`
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": product.title,
        "item": `https://khcfinds.com/products/${product.slug}`
      }
    ]
  }

  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": product.title,
    "image": product.imageUrl,
    "description": product.description,
    "brand": {
      "@type": "Brand",
      "name": "Curated Find"
    },
    "offers": {
      "@type": "Offer",
      "url": `https://khcfinds.com/products/${product.slug}`,
      "priceCurrency": "INR",
      "price": product.price,
      "itemCondition": "https://schema.org/NewCondition",
      "availability": "https://schema.org/InStock"
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": product.rating,
      "reviewCount": Math.max(reviews.length, 1)
    }
  }

  const faqSchema = product.faqs && product.faqs.length > 0 ? {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": product.faqs.map(faq => ({
      "@type": "Question",
      "name": faq.q,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.a
      }
    }))
  } : null

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Dynamic Schemas */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}

      {/* Back button and Breadcrumbs */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8 gap-4 border-b border-black/[0.04] dark:border-white/[0.04] pb-5">
        <Link
          href="/explore"
          className="inline-flex items-center space-x-1.5 text-xs font-bold text-gray-500 hover:text-purple-600 dark:text-gray-400 dark:hover:text-purple-400"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Catalog</span>
        </Link>

        {/* Semantic Breadcrumbs */}
        <nav aria-label="Breadcrumb" className="flex items-center space-x-1 text-xs text-gray-400 dark:text-gray-500 font-semibold">
          <Link href="/" className="hover:text-purple-500 transition-colors">Home</Link>
          <ChevronRight className="w-3 h-3" />
          {category && (
            <>
              <Link href={`/explore?category=${category.slug}`} className="hover:text-purple-500 transition-colors">
                {category.name}
              </Link>
              <ChevronRight className="w-3 h-3" />
            </>
          )}
          <span className="text-gray-600 dark:text-gray-300 truncate max-w-[200px]" aria-current="page">
            {product.title}
          </span>
        </nav>
      </div>

      {/* Main product core card grid */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-10 mb-16">
        
        {/* Left Side: Product Image Display */}
        <div className="lg:col-span-5 flex flex-col space-y-4">
          <div className="glass-panel p-3 rounded-3xl border border-black/[0.04] dark:border-white/[0.04] overflow-hidden bg-white/40 dark:bg-white/[0.01]">
            <div className="relative aspect-square rounded-2xl overflow-hidden bg-gray-100 dark:bg-[#1a1a24] shadow-md">
              <img
                src={product.imageUrl}
                alt={product.title}
                className="w-full h-full object-cover"
              />
              {product.isFeatured && (
                <span className="absolute top-4 left-4 flex items-center space-x-1 px-3 py-1.5 rounded-full text-[10px] font-black bg-purple-600 text-white shadow-md">
                  <Sparkles className="w-3 h-3" />
                  <span>FEATURED FIND</span>
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Right Side: Primary Details & Buy CTA */}
        <div className="lg:col-span-7 flex flex-col justify-between space-y-6">
          <div>
            <div className="flex items-center space-x-2 text-xs font-bold text-purple-600 dark:text-purple-400 mb-2">
              <Link href={`/explore?category=${category?.slug}`} className="hover:underline">
                {category?.name || "Curated"}
              </Link>
              <span>•</span>
              <div className="flex items-center">
                <Star className="w-3.5 h-3.5 text-amber-500 fill-current mr-1" />
                <span className="text-gray-800 dark:text-gray-200">{product.rating} / 5.0 Rating</span>
              </div>
            </div>
            
            <h1 className="text-2xl md:text-4xl font-black text-gray-900 dark:text-white leading-tight mb-4">
              {product.title}
            </h1>

            <p className="text-sm md:text-base text-gray-600 dark:text-gray-400 leading-relaxed mb-6">
              {product.description}
            </p>
          </div>

          <div className="space-y-6">
            {/* Coupon Card */}
            {product.couponCode && (
              <CouponCard couponCode={product.couponCode} />
            )}

            {/* Direct Redirect Pricing Container */}
            <div className="glass-panel p-6 rounded-2xl border border-black/[0.04] dark:border-white/[0.04] bg-white/40 dark:bg-white/[0.01] flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex flex-col text-center sm:text-left">
                <span className="text-xs text-gray-400 dark:text-gray-500 font-bold mb-1">Deal Price (India / Global)</span>
                <div className="flex items-baseline space-x-2">
                  <span className="text-3xl font-black text-purple-600 dark:text-purple-400">
                    ₹{product.price}
                  </span>
                  {product.originalPrice && (
                    <span className="text-sm text-gray-400 line-through">
                      ₹{product.originalPrice}
                    </span>
                  )}
                </div>
              </div>

              <a
                href={`/go/${product.slug}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:opacity-95 text-white font-extrabold shadow-lg shadow-purple-500/25 transform active:scale-95 transition-all text-center flex items-center justify-center space-x-2"
              >
                <span>Buy Direct Deal</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>

            {/* Shield disclaimer */}
            <div className="flex items-center space-x-2 text-[10px] text-gray-400 dark:text-gray-500 font-semibold justify-center lg:justify-start">
              <ShieldCheck className="w-4 h-4 text-emerald-500" />
              <span>Verified Seller Link • Commission-Supported Partner</span>
            </div>
          </div>

        </div>

      </section>

      {/* BuyHatke 70% Features: Price Comparisons, Set Alerts & 90-Day SVG Price Trends */}
      <PriceTracker product={product} compareStores={compareStores} />

      {/* Pros & Cons Section */}
      {(product.pros || product.cons) && (
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          {product.pros && (
            <div className="p-6 rounded-2xl bg-emerald-500/[0.03] border border-emerald-500/10 space-y-3">
              <h3 className="text-sm font-black text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">Pros</h3>
              <ul className="space-y-2">
                {product.pros.map((pro, index) => (
                  <li key={index} className="flex items-start text-xs font-semibold text-gray-600 dark:text-gray-300">
                    <span className="text-emerald-500 mr-2 flex-shrink-0">✓</span>
                    <span>{pro}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
          {product.cons && (
            <div className="p-6 rounded-2xl bg-rose-500/[0.03] border border-rose-500/10 space-y-3">
              <h3 className="text-sm font-black text-rose-600 dark:text-rose-400 uppercase tracking-wider">Cons</h3>
              <ul className="space-y-2">
                {product.cons.map((con, index) => (
                  <li key={index} className="flex items-start text-xs font-semibold text-gray-600 dark:text-gray-300">
                    <span className="text-rose-500 mr-2 flex-shrink-0">✗</span>
                    <span>{con}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </section>
      )}

      {/* Long Description review markdown */}
      {product.longDescription && (
        <section className="max-w-4xl mx-auto mb-16 border-t border-black/[0.04] dark:border-white/[0.04] pt-12">
          <h2 className="text-xs font-black tracking-wider text-gray-400 dark:text-gray-500 uppercase mb-4">
            Detailed Review & Analysis
          </h2>
          <div className="prose dark:prose-invert max-w-none">
            {renderMarkdown(product.longDescription)}
          </div>
        </section>
      )}

      {/* Technical Specifications */}
      {product.specifications && Object.keys(product.specifications).length > 0 && (
        <section className="max-w-4xl mx-auto mb-16 border-t border-black/[0.04] dark:border-white/[0.04] pt-12">
          <h2 className="text-xs font-black tracking-wider text-gray-400 dark:text-gray-500 uppercase mb-6">
            Technical Specifications
          </h2>
          <div className="glass-panel rounded-2xl border border-black/[0.04] dark:border-white/[0.04] overflow-hidden bg-white/40 dark:bg-white/[0.01]">
            <table className="min-w-full divide-y divide-black/[0.05] dark:divide-white/[0.05]">
              <tbody className="divide-y divide-black/[0.05] dark:divide-white/[0.05]">
                {Object.entries(product.specifications).map(([key, val]) => (
                  <tr key={key}>
                    <td className="px-6 py-4 text-xs font-black text-gray-500 dark:text-gray-400 uppercase w-1/3">
                      {key}
                    </td>
                    <td className="px-6 py-4 text-sm font-semibold text-gray-800 dark:text-gray-200">
                      {val}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}

      {/* FAQ Accordion Section */}
      {product.faqs && product.faqs.length > 0 && (
        <section className="max-w-4xl mx-auto mb-16 border-t border-black/[0.04] dark:border-white/[0.04] pt-12">
          <h2 className="text-xs font-black tracking-wider text-gray-400 dark:text-gray-500 uppercase mb-6 flex items-center space-x-1.5">
            <HelpCircle className="w-4 h-4 text-purple-500" />
            <span>Product FAQs</span>
          </h2>
          <div className="space-y-3">
            {product.faqs.map((faq, index) => (
              <div
                key={index}
                className="p-5 rounded-2xl bg-white dark:bg-white/[0.01] border border-black/[0.04] dark:border-white/[0.04] space-y-2"
              >
                <h3 className="text-sm font-black text-gray-800 dark:text-gray-200">
                  Q: {faq.q}
                </h3>
                <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed pl-4">
                  A: {faq.a}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Reviews Form & Feed */}
      <section className="max-w-4xl mx-auto mb-20 border-t border-black/[0.04] dark:border-white/[0.04] pt-12">
        <ReviewsSection productId={product.id} initialReviews={reviews} />
      </section>

      {/* Related Products Section */}
      {relatedProducts.length > 0 && (
        <section className="border-t border-black/[0.05] dark:border-white/[0.05] pt-16">
          <h2 className="text-xl font-black text-gray-900 dark:text-white mb-8">
            You Might Also Discover
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}

    </div>
  )
}
