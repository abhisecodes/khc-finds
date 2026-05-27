import React from "react"
import { getProducts, getCategories } from "@/lib/services/db-service"
import AdminProductsList from "@/components/admin-products-list"

export const revalidate = 0 // Admin catalog should be real-time

export default async function AdminProductsPage() {
  const [products, categories] = await Promise.all([
    getProducts(),
    getCategories()
  ])

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-black text-gray-900 dark:text-white">Products Catalog</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Add, edit, or delete affiliate products and track views and click statistics.
        </p>
      </div>

      {/* Interactive Products Table list */}
      <AdminProductsList
        initialProducts={products}
        categories={categories.map(c => ({ id: c.id, name: c.name }))}
      />
    </div>
  )
}
