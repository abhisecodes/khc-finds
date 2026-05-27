"use client"

import React, { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Compass, Flame, BookOpen, ShieldAlert, Sparkles, Menu, X } from "lucide-react"

export default function Navbar() {
  const pathname = usePathname()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  // Listen for scroll to toggle background opacity
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true)
      } else {
        setScrolled(false)
      }
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const isAdminPath = pathname.startsWith("/admin") || pathname.startsWith("/api") || pathname.includes("/go/")
  if (!isAdminPath) {
    return null
  }

  const navLinks = [
    { name: "Explore", href: "/explore", icon: Compass },
    { name: "Trending", href: "/trends", icon: Flame },
    { name: "Guides", href: "/guide/best-budget-gadgets-india", icon: Sparkles },
    { name: "Blog", href: "/blog", icon: BookOpen },
    { name: "Admin", href: "/admin", icon: ShieldAlert },
  ]

  const isActive = (path: string) => pathname === path

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/90 backdrop-blur-md border-b border-black/[0.06] py-3 shadow-lg shadow-black/[0.01]"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Typographic Logo */}
          <Link href="/" className="flex items-center space-x-2.5 group">
            <div className="w-9 h-9 rounded-lg bg-purple-600 flex items-center justify-center text-white font-extrabold text-base shadow-sm group-hover:bg-purple-700 transition-colors duration-200">
              K
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-lg tracking-tight text-gray-900 leading-tight">
                KHC <span className="text-purple-600 font-medium">Finds</span>
              </span>
              <span className="text-[9px] text-gray-400 font-bold tracking-wider uppercase -mt-0.5">
                Affiliate Directory
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {navLinks.map((link) => {
              const Icon = link.icon
              const active = isActive(link.href)
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`flex items-center space-x-1.5 px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200 ${
                    active
                      ? "bg-purple-500/10 text-purple-600"
                      : "text-gray-600 hover:text-purple-600 hover:bg-gray-50"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{link.name}</span>
                </Link>
              )
            })}
          </nav>

          {/* Right actions */}
          <div className="hidden md:flex items-center space-x-3">
            {/* CTA */}
            <Link
              href="/explore"
              className="px-5 py-2.5 rounded-xl bg-purple-600 text-white text-sm font-semibold hover:bg-purple-700 active:scale-[0.98] transition-all duration-200"
            >
              Discover Products
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg border border-gray-200 text-gray-600"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-white border-b border-gray-200 py-4 px-4 shadow-xl">
          <div className="flex flex-col space-y-2">
            {navLinks.map((link) => {
              const Icon = link.icon
              const active = isActive(link.href)
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center space-x-3 p-3 rounded-xl text-base font-semibold transition-all duration-200 ${
                    active
                      ? "bg-purple-500/10 text-purple-600"
                      : "text-gray-600 hover:bg-gray-50"
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span>{link.name}</span>
                </Link>
              )
            })}
            <Link
              href="/explore"
              onClick={() => setMobileMenuOpen(false)}
              className="flex justify-center items-center w-full mt-4 p-3 rounded-xl bg-purple-600 text-white font-semibold text-center hover:bg-purple-700"
            >
              Discover Products
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}
