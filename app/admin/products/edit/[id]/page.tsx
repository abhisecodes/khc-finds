import React from "react"
import { getProductById, getCategories } from "@/lib/services/db-service"
import AdminProductForm from "@/components/admin-product-form"
import { notFound } from "next/navigation"

export const revalidate = 0 // Disable cache for admin pages

interface EditProductPageProps {
  params: Promise<{ id: string }>
}

export default async function EditProductPage({ params }: EditProductPageProps) {
  const { id } = await params
  
  const [product, categories] = await Promise.all([
    getProductById(id),
    getCategories()
  ])

  if (!product) {
    notFound()
  }

  // Format categories options for the form
  const categoriesOptions = categories.map(c => ({
    id: c.id,
    name: c.name,
    slug: c.slug
  }))

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-black text-gray-900 dark:text-white">Edit Product</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Modify product details, pricing, tags, and SEO tags.
        </p>
      </div>

      {/* Form */}
      <AdminProductForm
        categories={categoriesOptions}
        initialProduct={product}
      />
    </div>
  )
}
