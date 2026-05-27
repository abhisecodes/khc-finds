import React from "react"
import Link from "next/link"
import { LayoutDashboard, ShoppingBag, TrendingUp, Sparkles, LogOut, ShieldCheck } from "lucide-react"
import { cookies } from "next/headers"

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // Read the admin user profile cookie on the server
  const cookieStore = await cookies()
  const userCookie = cookieStore.get("admin_user")
  
  let adminUser = {
    name: "Administrator",
    email: "admin@khcfinds.com",
    picture: null as string | null
  }

  if (userCookie) {
    try {
      adminUser = JSON.parse(userCookie.value)
    } catch (e) {
      // Keep default values if parsing fails
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#08080a] flex">
      {/* Admin Sidebar */}
      <aside className="hidden md:flex flex-col w-64 bg-white dark:bg-[#0c0c0f] border-r border-gray-200 dark:border-white/[0.06] p-6 justify-between flex-shrink-0">
        <div className="space-y-8">
          {/* Logo / Header */}
          <div className="flex items-center space-x-2.5">
            <div className="w-8 h-8 rounded-lg bg-purple-600 flex items-center justify-center text-white font-extrabold text-sm shadow-sm">
              K
            </div>
            <div>
              <span className="font-extrabold text-sm text-gray-900 dark:text-white block leading-tight">Admin Console</span>
              <span className="text-[10px] text-emerald-500 font-bold uppercase tracking-wider flex items-center">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mr-1 animate-ping" />
                Live Control
              </span>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="flex flex-col space-y-1">
            <Link
              href="/admin"
              className="flex items-center space-x-3 px-4 py-3 rounded-xl text-sm font-semibold text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-white/[0.03] transition-all"
            >
              <LayoutDashboard className="w-4 h-4 text-purple-500" />
              <span>Analytics Dashboard</span>
            </Link>

            <Link
              href="/admin/products"
              className="flex items-center space-x-3 px-4 py-3 rounded-xl text-sm font-semibold text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-white/[0.03] transition-all"
            >
              <ShoppingBag className="w-4 h-4 text-blue-500" />
              <span>Products Catalog</span>
            </Link>

            <Link
              href="/admin/trends"
              className="flex items-center space-x-3 px-4 py-3 rounded-xl text-sm font-semibold text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-white/[0.03] transition-all"
            >
              <TrendingUp className="w-4 h-4 text-rose-500" />
              <span>Google Trends</span>
            </Link>
          </nav>
        </div>

        {/* User profile footer */}
        <div className="pt-6 border-t border-black/[0.05] dark:border-white/[0.05] space-y-4">
          <div className="flex items-center space-x-3">
            {adminUser.picture ? (
              <img
                src={adminUser.picture}
                alt={adminUser.name}
                className="w-9 h-9 rounded-full object-cover border border-purple-500/30"
              />
            ) : (
              <div className="w-9 h-9 rounded-xl bg-purple-500/10 text-purple-600 dark:text-purple-400 flex items-center justify-center text-xs font-black border border-purple-500/20 uppercase">
                {adminUser.name.charAt(0)}
              </div>
            )}
            <div className="truncate">
              <span className="block font-bold text-xs text-gray-900 dark:text-white truncate">
                {adminUser.name}
              </span>
              <span className="block text-[9px] text-gray-400 font-bold truncate">
                {adminUser.email || "Active Administrator"}
              </span>
            </div>
          </div>

          <form action="/api/admin/logout" method="POST" className="w-full">
            <button
              type="submit"
              className="w-full flex items-center justify-center space-x-2 py-2.5 rounded-xl border border-gray-200 dark:border-white/[0.08] hover:bg-gray-100 dark:hover:bg-white/[0.03] text-xs font-bold text-gray-700 dark:text-gray-300 transition-all cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5 text-rose-500" />
              <span>Exit Dashboard</span>
            </button>
          </form>
        </div>
      </aside>

      {/* Main Admin Content Container */}
      <main className="flex-grow p-6 md:p-8 max-w-7xl mx-auto overflow-y-auto">
        {children}
      </main>
    </div>
  )
}
