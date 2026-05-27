import React from "react"
import { getCategories } from "@/lib/services/db-service"
import AdminProductForm from "@/components/admin-product-form"

export const revalidate = 0 // Forms should fetch categories dynamically

export default async function NewProductPage() {
  const categories = await getCategories()

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-black text-gray-900 dark:text-white">Add New Product</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Create a new product listing. Use the AI Assistant to generate optimized titles, reviews, and SEO copy.
        </p>
      </div>

      {/* Editor Form */}
      <AdminProductForm
        categories={categories.map(c => ({ id: c.id, name: c.name, slug: c.slug }))}
      />
    </div>
  )
}
