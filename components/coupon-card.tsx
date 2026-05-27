"use client"

import React, { useState } from "react"
import { Copy, Check, Tag } from "lucide-react"

export default function CouponCard({ couponCode }: { couponCode: string }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(couponCode)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="relative overflow-hidden p-5 rounded-2xl border border-dashed border-purple-500/40 bg-purple-500/5 dark:bg-purple-500/[0.02] flex items-center justify-between">
      {/* Decorative background glow */}
      <div className="absolute -right-8 -bottom-8 w-24 h-24 bg-purple-500/10 rounded-full filter blur-xl pointer-events-none" />

      <div className="flex items-center space-x-3">
        <div className="w-10 h-10 rounded-xl bg-purple-500/15 flex items-center justify-center text-purple-600 dark:text-purple-400">
          <Tag className="w-5 h-5" />
        </div>
        <div>
          <span className="block text-[10px] font-black text-purple-500 tracking-widest uppercase">Discount Coupon Code</span>
          <span className="font-extrabold text-base tracking-wider text-gray-800 dark:text-gray-200">
            {couponCode}
          </span>
        </div>
      </div>

      <button
        onClick={handleCopy}
        className="flex items-center space-x-1.5 px-4 py-2 rounded-xl bg-purple-600 hover:opacity-95 text-white text-xs font-bold shadow-md shadow-purple-500/25 active:scale-95 transition-all"
      >
        {copied ? (
          <>
            <Check className="w-3.5 h-3.5" />
            <span>Copied!</span>
          </>
        ) : (
          <>
            <Copy className="w-3.5 h-3.5" />
            <span>Copy Code</span>
          </>
        )}
      </button>
    </div>
  )
}
