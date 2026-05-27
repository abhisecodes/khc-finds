"use client"

import React, { useState } from "react"
import Link from "next/link"
import { Trash2, Edit, ExternalLink, Plus, Search, Eye, MousePointer, Upload, FileSpreadsheet } from "lucide-react"
import { Product } from "@/lib/seed-data"

interface AdminProductsListProps {
  initialProducts: Product[]
  categories: { id: string; name: string }[]
}

export default function AdminProductsList({ initialProducts, categories }: AdminProductsListProps) {
  const [products, setProducts] = useState<Product[]>(initialProducts)
  const [search, setSearch] = useState("")
  const [showBulkUpload, setShowBulkUpload] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [bulkCsvText, setBulkCsvText] = useState("")
  const [csvFile, setCsvFile] = useState<File | null>(null)

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`Are you sure you want to delete "${title}"?`)) return

    try {
      const res = await fetch(`/api/admin/products?id=${id}`, {
        method: "DELETE",
      })

      if (res.ok) {
        setProducts(products.filter(p => p.id !== id))
      } else {
        alert("Failed to delete product")
      }
    } catch (error) {
      console.error("Failed to delete product:", error)
    }
  }

  const handleBulkUpload = async (e: React.FormEvent) => {
    e.preventDefault()
    setUploading(true)
    try {
      let res
      if (csvFile) {
        const formData = new FormData()
        formData.append("file", csvFile)
        res = await fetch("/api/admin/bulk-upload", {
          method: "POST",
          body: formData,
        })
      } else if (bulkCsvText.trim()) {
        res = await fetch("/api/admin/bulk-upload", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ csvText: bulkCsvText }),
        })
      } else {
        alert("Please select a file or paste CSV text.")
        setUploading(false)
        return
      }

      if (res.ok) {
        const data = await res.json()
        alert(data.message || "Bulk upload successful!")
        setBulkCsvText("")
        setCsvFile(null)
        setShowBulkUpload(false)
        window.location.reload()
      } else {
        const data = await res.json()
        alert(`Failed to upload: ${data.error || "Unknown error"}`)
      }
    } catch (err) {
      console.error("Bulk upload error:", err)
      alert("Error occurred during bulk upload.")
    } finally {
      setUploading(false)
    }
  }

  const filteredProducts = products.filter(p =>
    p.title.toLowerCase().includes(search.toLowerCase()) ||
    p.description.toLowerCase().includes(search.toLowerCase())
  )

  const getCategoryName = (catId: string) => {
    return categories.find(c => c.id === catId)?.name || "General"
  }

  return (
    <div className="space-y-6">
      {/* Controls Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        {/* Search */}
        <div className="relative w-full sm:max-w-xs">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search products..."
            className="w-full pl-9 pr-4 py-2.5 text-sm bg-white dark:bg-white/[0.02] border border-gray-200 dark:border-white/[0.06] rounded-xl outline-none focus:border-purple-500"
          />
        </div>

        {/* Action Buttons */}
        <div className="flex items-center space-x-2">
          {/* Bulk Upload Toggle Button */}
          <button
            type="button"
            onClick={() => setShowBulkUpload(!showBulkUpload)}
            className="flex items-center justify-center space-x-1.5 px-5 py-2.5 rounded-xl border border-gray-200 dark:border-white/[0.08] hover:bg-gray-50 dark:hover:bg-white/[0.02] text-xs font-bold text-gray-700 dark:text-gray-300 transition-colors"
          >
            <Upload className="w-4 h-4 text-purple-500" />
            <span>Bulk Import (CSV)</span>
          </button>

          {/* Action Button */}
          <Link
            href="/admin/products/new"
            className="flex items-center justify-center space-x-1.5 px-5 py-2.5 rounded-xl bg-purple-600 hover:opacity-95 text-white text-xs font-bold shadow-md shadow-purple-500/25 active:scale-95 transition-all text-center"
          >
            <Plus className="w-4 h-4" />
            <span>Add New Product</span>
          </Link>
        </div>
      </div>

      {/* Collapsible Bulk Upload Form */}
      {showBulkUpload && (
        <div className="glass-panel p-6 rounded-3xl border border-black/[0.04] dark:border-white/[0.04] bg-white/40 dark:bg-white/[0.01] space-y-4">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="text-sm font-black text-gray-900 dark:text-white uppercase tracking-wider flex items-center space-x-1.5">
                <FileSpreadsheet className="w-4 h-4 text-purple-500" />
                <span>Bulk Import Products via CSV</span>
              </h3>
              <p className="text-[10px] text-gray-400 mt-1">
                Upload a CSV file or paste raw CSV text. Expected columns (comma-separated, header line required):
                <br />
                <span className="font-mono text-purple-500 bg-purple-500/5 px-1 py-0.5 rounded">
                  title, slug, description, longdescription, price, originalprice, rating, trendingscore, affiliatelink, imageurl, categoryslug, tags, couponcode, isfeatured, issponsored
                </span>
              </p>
            </div>
            <button
              onClick={() => setShowBulkUpload(false)}
              className="text-xs font-bold text-gray-400 hover:text-gray-500"
            >
              Close
            </button>
          </div>

          <form onSubmit={handleBulkUpload} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* File Upload Option */}
              <div className="flex flex-col items-center justify-center border-2 border-dashed border-gray-200 dark:border-white/[0.08] rounded-xl p-4 bg-black/[0.01] dark:bg-white/[0.01]">
                <Upload className="w-8 h-8 text-gray-400 mb-2" />
                <span className="text-xs text-gray-500 dark:text-gray-400 font-bold mb-1">
                  {csvFile ? csvFile.name : "Select CSV File"}
                </span>
                <input
                  type="file"
                  accept=".csv"
                  onChange={(e) => {
                    const file = e.target.files?.[0] || null
                    setCsvFile(file)
                    if (file) setBulkCsvText("") // clear text area if file chosen
                  }}
                  className="hidden"
                  id="csv-file-input"
                />
                <label
                  htmlFor="csv-file-input"
                  className="px-3 py-1.5 text-[10px] font-black uppercase tracking-wider bg-white dark:bg-white/[0.04] border border-gray-200 dark:border-white/[0.08] hover:bg-gray-50 dark:hover:bg-white/[0.08] rounded-lg cursor-pointer"
                >
                  Choose File
                </label>
              </div>

              {/* Paste Text Option */}
              <div className="flex flex-col">
                <textarea
                  value={bulkCsvText}
                  onChange={(e) => {
                    setBulkCsvText(e.target.value)
                    if (e.target.value) setCsvFile(null) // clear file if text pasted
                  }}
                  placeholder="title,slug,description,longdescription,price,originalprice,rating,trendingscore,affiliatelink,imageurl,categoryslug,tags,couponcode,isfeatured,issponsored&#10;Zebronics Mouse,zeb-mouse,Smooth mouse,Great specs,499,999,4.2,80,https://amazon.in,https://image.url,viral-gadgets,mouse;gaming,ZEBMOUSE,true,false"
                  className="w-full h-32 px-3 py-2 text-xs bg-white dark:bg-white/[0.02] border border-gray-200 dark:border-white/[0.06] rounded-xl outline-none focus:border-purple-500 font-mono resize-none"
                />
              </div>
            </div>

            <div className="flex justify-end space-x-2 pt-2 border-t border-black/[0.04] dark:border-white/[0.04]">
              <button
                type="button"
                onClick={() => {
                  setCsvFile(null)
                  setBulkCsvText("")
                }}
                className="px-4 py-2 rounded-lg border border-gray-200 dark:border-white/[0.08] text-xs font-bold text-gray-500"
              >
                Clear
              </button>
              <button
                type="submit"
                disabled={uploading}
                className="px-5 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-lg text-xs font-bold shadow-md shadow-purple-500/20 disabled:opacity-50"
              >
                {uploading ? "Uploading..." : "Start Import"}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Catalog Table */}
      <div className="glass-panel rounded-3xl border border-black/[0.04] dark:border-white/[0.04] overflow-hidden bg-white/40 dark:bg-white/[0.01]">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-black/[0.05] dark:divide-white/[0.05] text-left">
            <thead>
              <tr className="text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest bg-black/[0.01] dark:bg-white/[0.01]">
                <th className="px-6 py-4">Title / Category</th>
                <th className="px-6 py-4 text-right">Price</th>
                <th className="px-6 py-4 text-right">CTR / Activity</th>
                <th className="px-6 py-4 text-right">Flags</th>
                <th className="px-6 py-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-black/[0.05] dark:divide-white/[0.05] text-xs font-semibold text-gray-700 dark:text-gray-300">
              {filteredProducts.length === 0 ? (
                <tr>
                  <td colSpan={5} className="text-center py-12 text-gray-400 dark:text-gray-500">
                    No products matching search criteria.
                  </td>
                </tr>
              ) : (
                filteredProducts.map((p) => {
                  const ctr = p.viewsCount > 0 ? (p.clicksCount / p.viewsCount) * 100 : 0
                  return (
                    <tr key={p.id} className="hover:bg-black/[0.01] dark:hover:bg-white/[0.01]">
                      {/* Image & Title */}
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-3 max-w-sm">
                          <img src={p.imageUrl} alt={p.title} className="w-10 h-10 rounded-lg object-cover bg-gray-50 flex-shrink-0" />
                          <div className="truncate">
                            <span className="block font-bold text-gray-900 dark:text-white truncate">
                              {p.title}
                            </span>
                            <span className="text-[10px] text-purple-600 dark:text-purple-400 uppercase font-black tracking-wider">
                              {getCategoryName(p.categoryId)}
                            </span>
                          </div>
                        </div>
                      </td>

                      {/* Price */}
                      <td className="px-6 py-4 text-right font-black text-gray-900 dark:text-white">
                        ₹{p.price}
                      </td>

                      {/* CTR & Clicks */}
                      <td className="px-6 py-4 text-right">
                        <div className="flex flex-col items-end">
                          <span className="font-black text-purple-600 dark:text-purple-400">
                            {ctr.toFixed(1)}% CTR
                          </span>
                          <span className="text-[10px] text-gray-400 font-bold flex items-center space-x-1">
                            <MousePointer className="w-2.5 h-2.5 mr-0.5" /> {p.clicksCount || 0} / <Eye className="w-2.5 h-2.5 mx-0.5" /> {p.viewsCount || 0}
                          </span>
                        </div>
                      </td>

                      {/* Flags */}
                      <td className="px-6 py-4 text-right">
                        <div className="flex flex-wrap gap-1 justify-end">
                          {p.isFeatured && (
                            <span className="px-2 py-0.5 rounded-full text-[9px] font-black uppercase tracking-wider bg-purple-500/10 text-purple-600 dark:text-purple-400 border border-purple-500/20">
                              Featured
                            </span>
                          )}
                          {p.isSponsored && (
                            <span className="px-2 py-0.5 rounded-full text-[9px] font-black uppercase tracking-wider bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20">
                              Sponsored
                            </span>
                          )}
                        </div>
                      </td>

                      {/* Actions */}
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-center space-x-2">
                          <Link
                            href={`/products/${p.slug}`}
                            target="_blank"
                            className="p-1.5 rounded-lg border border-gray-200 dark:border-white/[0.08] text-gray-500 hover:text-purple-500 hover:bg-gray-50 dark:hover:bg-white/[0.02]"
                            title="View Public Page"
                          >
                            <ExternalLink className="w-3.5 h-3.5" />
                          </Link>
                          <Link
                            href={`/admin/products/edit/${p.id}`}
                            className="p-1.5 rounded-lg border border-gray-200 dark:border-white/[0.08] text-gray-500 hover:text-purple-500 hover:bg-gray-50 dark:hover:bg-white/[0.02]"
                            title="Edit Product"
                          >
                            <Edit className="w-3.5 h-3.5" />
                          </Link>
                          <button
                            onClick={() => handleDelete(p.id, p.title)}
                            className="p-1.5 rounded-lg border border-rose-500/20 text-rose-500 hover:bg-rose-500/10"
                            title="Delete Product"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  )
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
