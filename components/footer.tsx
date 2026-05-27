"use client"

import React, { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Send, Sparkles, Heart, Mail, ShieldAlert } from "lucide-react"

export default function Footer() {
  const pathname = usePathname()
  const [email, setEmail] = useState("")
  const [subscribed, setSubscribed] = useState(false)

  const isAdminPath = pathname.startsWith("/admin") || pathname.startsWith("/api") || pathname.includes("/go/")
  if (!isAdminPath) {
    return null
  }

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return
    try {
      const res = await fetch("/api/newsletter/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      })
      if (res.ok) {
        setSubscribed(true)
        setEmail("")
        setTimeout(() => {
          setSubscribed(false)
        }, 4000)
      } else {
        alert("Subscription failed. Please try again.")
      }
    } catch (error) {
      console.error("Subscription error:", error)
      alert("Subscription error. Please try again.")
    }
  }

  const footerLinks = {
    explore: [
      { name: "Trending Items", href: "/trends" },
      { name: "AI Tools Directory", href: "/explore?category=ai-tools" },
      { name: "Viral Gadgets", href: "/explore?category=viral-gadgets" },
      { name: "Budget Deals", href: "/explore?category=budget-finds" }
    ],
    resources: [
      { name: "Programmatic Guides", href: "/guide/best-budget-gadgets-india" },
      { name: "Blog Posts", href: "/blog" },
      { name: "Admin Console", href: "/admin" },
      { name: "Sitemap", href: "/sitemap.xml" }
    ],
    legal: [
      { name: "Privacy Policy", href: "#" },
      { name: "Terms of Service", href: "#" },
      { name: "Affiliate Disclosure", href: "#" }
    ]
  }

  return (
    <footer className="relative mt-24 bg-white dark:bg-black border-t border-gray-200 dark:border-white/[0.06] overflow-hidden">
      {/* Background radial glow */}
      <div className="absolute top-0 right-1/4 w-[500px] h-[300px] bg-purple-500/10 dark:bg-purple-600/5 rounded-full filter blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          
          {/* Brand Info */}
          <div className="lg:col-span-2 flex flex-col space-y-4">
            <Link href="/" className="flex items-center space-x-2.5">
              <div className="w-8 h-8 rounded-lg bg-purple-600 flex items-center justify-center text-white font-extrabold text-sm shadow-sm">
                K
              </div>
              <span className="font-bold text-lg tracking-tight text-gray-900 leading-tight">
                KHC <span className="text-purple-600 font-medium">Finds</span>
              </span>
            </Link>
            <p className="text-sm text-gray-500 dark:text-gray-400 max-w-sm leading-relaxed">
              Discover viral gadgets, life-saving AI tools, and budget-friendly Amazon finds curated for developers, students, and creators in India.
            </p>

            {/* Newsletter */}
            <div className="pt-2">
              <span className="block text-sm font-bold text-gray-800 dark:text-gray-200 mb-2">
                Join our newsletter for weekly deal alerts
              </span>
              <form onSubmit={handleSubscribe} className="flex max-w-md">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                  className="flex-grow px-4 py-2.5 rounded-l-xl bg-gray-50 dark:bg-white/[0.03] border border-gray-200 dark:border-white/[0.08] text-sm text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-1 focus:ring-purple-500"
                />
                <button
                  type="submit"
                  className="px-4 bg-gradient-to-r from-purple-600 to-indigo-600 hover:opacity-95 text-white rounded-r-xl transition-all duration-200 flex items-center justify-center"
                >
                  {subscribed ? "Subscribed!" : <Send className="w-4 h-4" />}
                </button>
              </form>
            </div>
          </div>

          {/* Links Column 1 */}
          <div className="flex flex-col space-y-3">
            <span className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest">
              Explore
            </span>
            <ul className="space-y-2">
              {footerLinks.explore.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-sm text-gray-600 hover:text-purple-500 dark:text-gray-400 dark:hover:text-purple-400 transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Links Column 2 */}
          <div className="flex flex-col space-y-3">
            <span className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest">
              Resources
            </span>
            <ul className="space-y-2">
              {footerLinks.resources.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-sm text-gray-600 hover:text-purple-500 dark:text-gray-400 dark:hover:text-purple-400 transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Links Column 3 */}
          <div className="flex flex-col space-y-3">
            <span className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest">
              Legal
            </span>
            <ul className="space-y-2">
              {footerLinks.legal.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-sm text-gray-600 hover:text-purple-500 dark:text-gray-400 dark:hover:text-purple-400 transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

        </div>

        {/* Affiliate Disclosure Section */}
        <div className="mt-12 pt-8 border-t border-gray-200 dark:border-white/[0.06] text-center max-w-5xl mx-auto">
          <div className="flex items-center justify-center space-x-1.5 text-amber-600 dark:text-amber-500 text-xs font-bold mb-2">
            <ShieldAlert className="w-3.5 h-3.5" />
            <span>AFFILIATE PARTNERSHIP DISCLOSURE</span>
          </div>
          <p className="text-[11px] text-gray-400 dark:text-gray-500 leading-relaxed">
            KHC Finds is a participant in affiliate advertising programs, including the Amazon Services LLC Associates Program, TravelPayouts, Impact Radius, and other networks. We edit reviews and suggest products that we believe offer real value. When you click on links and buy products through our site, we earn a small commission at zero extra cost to you. This support helps keep our platform running fast and ad-free.
          </p>
        </div>

        {/* Copy / Signature */}
        <div className="mt-8 pt-8 border-t border-gray-200 dark:border-white/[0.06] flex flex-col sm:flex-row items-center justify-between text-xs text-gray-500 dark:text-gray-400">
          <span>&copy; {new Date().getFullYear()} KHC Finds. All rights reserved.</span>
          <div className="flex items-center space-x-4 mt-4 sm:mt-0">
            <span className="flex items-center">
              Made with <Heart className="w-3 h-3 text-red-500 mx-1 fill-current" /> in India
            </span>
            <Link href="https://github.com" aria-label="GitHub Repository" className="hover:text-purple-500 transition-colors">
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
              </svg>
            </Link>
            <Link href="mailto:contact@khcfinds.com" className="hover:text-purple-500 transition-colors">
              <Mail className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
