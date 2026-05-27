import React from "react"
import Link from "next/link"
import { Eye, MousePointer, Percent, Library, ExternalLink, ArrowUpRight, TrendingUp } from "lucide-react"
import { getAnalyticsSummary } from "@/lib/services/db-service"

export const revalidate = 0 // Never cache admin page

export default async function AdminDashboardPage() {
  const summary = await getAnalyticsSummary()

  // Calculate scaling for the bar chart
  const maxClicks = Math.max(...summary.clicksOverTime.map(c => c.count), 1)

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-gray-900 dark:text-white">Analytics Overview</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Real-time click tracking, conversion stats, and performance metrics.
          </p>
        </div>
        <Link
          href="/admin/products"
          className="px-5 py-3 rounded-xl bg-purple-600 hover:opacity-95 text-white text-xs font-bold shadow-md shadow-purple-500/20 text-center"
        >
          Manage Products
        </Link>
      </div>

      {/* KPI Stats Cards Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Total Products */}
        <div className="glass-panel p-5 rounded-2xl border border-black/[0.04] dark:border-white/[0.04] bg-white/40 dark:bg-white/[0.01] flex items-center space-x-4">
          <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-500 flex-shrink-0">
            <Library className="w-5 h-5" />
          </div>
          <div>
            <span className="block text-[10px] font-black text-gray-400 uppercase">Total Items</span>
            <span className="text-xl font-black text-gray-900 dark:text-white">{summary.totalProducts}</span>
          </div>
        </div>

        {/* Total Views */}
        <div className="glass-panel p-5 rounded-2xl border border-black/[0.04] dark:border-white/[0.04] bg-white/40 dark:bg-white/[0.01] flex items-center space-x-4">
          <div className="w-10 h-10 rounded-xl bg-purple-500/10 flex items-center justify-center text-purple-500 flex-shrink-0">
            <Eye className="w-5 h-5" />
          </div>
          <div>
            <span className="block text-[10px] font-black text-gray-400 uppercase">Total Views</span>
            <span className="text-xl font-black text-gray-900 dark:text-white">{summary.totalViews}</span>
          </div>
        </div>

        {/* Total Clicks */}
        <div className="glass-panel p-5 rounded-2xl border border-black/[0.04] dark:border-white/[0.04] bg-white/40 dark:bg-white/[0.01] flex items-center space-x-4">
          <div className="w-10 h-10 rounded-xl bg-indigo-500/10 flex items-center justify-center text-indigo-500 flex-shrink-0">
            <MousePointer className="w-5 h-5" />
          </div>
          <div>
            <span className="block text-[10px] font-black text-gray-400 uppercase">Total Clicks</span>
            <span className="text-xl font-black text-gray-900 dark:text-white">{summary.totalClicks}</span>
          </div>
        </div>

        {/* Average CTR */}
        <div className="glass-panel p-5 rounded-2xl border border-black/[0.04] dark:border-white/[0.04] bg-white/40 dark:bg-white/[0.01] flex items-center space-x-4">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-500 flex-shrink-0">
            <Percent className="w-5 h-5" />
          </div>
          <div>
            <span className="block text-[10px] font-black text-gray-400 uppercase">Average CTR</span>
            <span className="text-xl font-black text-gray-900 dark:text-white">{summary.averageCTR.toFixed(1)}%</span>
          </div>
        </div>

      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Chart: Click-through Velocity (Bar Chart) */}
        <div className="lg:col-span-7 glass-panel p-6 rounded-3xl border border-black/[0.04] dark:border-white/[0.04] bg-white/40 dark:bg-white/[0.01] flex flex-col justify-between">
          <div>
            <h3 className="text-sm font-black text-gray-900 dark:text-white uppercase tracking-wider mb-1">Click Activity</h3>
            <p className="text-xs text-gray-500 dark:text-gray-400 mb-6">Daily redirection logs count for the past week</p>
          </div>

          {/* Bar Chart Container */}
          <div className="h-48 flex items-end justify-between px-2 gap-3 pb-2 border-b border-black/[0.05] dark:border-white/[0.05]">
            {summary.clicksOverTime.map((day) => {
              // Calculate percentage height
              const heightPercent = `${Math.max((day.count / maxClicks) * 100, 8)}%`
              return (
                <div key={day.date} className="flex-grow flex flex-col items-center group">
                  <div className="text-[10px] font-black text-purple-600 dark:text-purple-400 mb-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    {day.count}
                  </div>
                  <div
                    style={{ height: heightPercent }}
                    className="w-full max-w-[28px] rounded-t-lg bg-gradient-to-t from-indigo-600 to-purple-600 dark:from-indigo-500 dark:to-purple-500 group-hover:opacity-90 transition-all duration-300 shadow-md shadow-purple-500/10"
                  />
                  <span className="text-[10px] font-bold text-gray-400 dark:text-gray-500 mt-2 block whitespace-nowrap">
                    {day.date}
                  </span>
                </div>
              )
            })}
          </div>
        </div>

        {/* Right Chart: Categories Share (Meters) */}
        <div className="lg:col-span-5 glass-panel p-6 rounded-3xl border border-black/[0.04] dark:border-white/[0.04] bg-white/40 dark:bg-white/[0.01] flex flex-col justify-between">
          <div>
            <h3 className="text-sm font-black text-gray-900 dark:text-white uppercase tracking-wider mb-1">Category Clicks</h3>
            <p className="text-xs text-gray-500 dark:text-gray-400 mb-6">Distribution of affiliate clicks by category</p>
          </div>

          <div className="space-y-4">
            {summary.clicksByCategory.map((cat) => {
              // Calculate percent of total clicks
              const percent = summary.totalClicks > 0 ? (cat.count / summary.totalClicks) * 100 : 0
              return (
                <div key={cat.name} className="space-y-1">
                  <div className="flex justify-between text-xs font-bold text-gray-700 dark:text-gray-300">
                    <span>{cat.name}</span>
                    <span>{cat.count} clicks ({percent.toFixed(0)}%)</span>
                  </div>
                  <div className="h-2 w-full bg-gray-100 dark:bg-white/[0.04] rounded-full overflow-hidden">
                    <div
                      style={{ width: `${percent}%` }}
                      className="h-full bg-purple-500 rounded-full"
                    />
                  </div>
                </div>
              )
            })}
          </div>
        </div>

      </div>

      {/* Top Performing products table */}
      <div className="glass-panel p-6 rounded-3xl border border-black/[0.04] dark:border-white/[0.04] bg-white/40 dark:bg-white/[0.01]">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-sm font-black text-gray-900 dark:text-white uppercase tracking-wider mb-1">Top Performing Products</h3>
            <p className="text-xs text-gray-500 dark:text-gray-400">Products generating the highest affiliate link CTR</p>
          </div>
          <TrendingUp className="w-5 h-5 text-purple-500" />
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-black/[0.05] dark:divide-white/[0.05] text-left">
            <thead>
              <tr className="text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest">
                <th className="pb-3 w-1/2">Product Description</th>
                <th className="pb-3 text-right">Clicks</th>
                <th className="pb-3 text-right">CTR (%)</th>
                <th className="pb-3 text-right">Redirection Path</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-black/[0.05] dark:divide-white/[0.05] text-xs font-semibold text-gray-700 dark:text-gray-300">
              {summary.topPerforming.map((p) => (
                <tr key={p.id} className="hover:bg-black/[0.01] dark:hover:bg-white/[0.01]">
                  <td className="py-4 font-bold text-gray-900 dark:text-white max-w-[240px] truncate">
                    {p.title}
                  </td>
                  <td className="py-4 text-right text-gray-600 dark:text-gray-400">
                    {p.clicks} clicks
                  </td>
                  <td className="py-4 text-right font-black text-purple-600 dark:text-purple-400">
                    {p.ctr.toFixed(1)}%
                  </td>
                  <td className="py-4 text-right">
                    <a
                      href={`/go/${p.id}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center space-x-1 text-xs text-purple-500 hover:underline"
                    >
                      <span>Test Redirect</span>
                      <ArrowUpRight className="w-3 h-3" />
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  )
}
