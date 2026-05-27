"use client"

import React, { useState, useEffect, useRef } from "react"
import { TrendingDown, Bell, ArrowRight, Check, AlertCircle, Info, ExternalLink, Activity } from "lucide-react"
import { Product } from "@/lib/seed-data"

interface StoreCompare {
  name: string
  price: number
  active: boolean
}

interface PriceTrackerProps {
  product: Product
  compareStores: StoreCompare[]
}

export default function PriceTracker({ product, compareStores }: PriceTrackerProps) {
  // Price trend generator
  const [historyData, setHistoryData] = useState<{ date: string; price: number }[]>([])
  const [stats, setStats] = useState({ lowest: 0, highest: 0, average: 0 })
  const [hoverIndex, setHoverIndex] = useState<number | null>(null)
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 })
  const svgRef = useRef<SVGSVGElement | null>(null)

  // Price Drop Alert Form State
  const [alertTargetPrice, setAlertTargetPrice] = useState<number>(Math.round(product.price * 0.9))
  const [email, setEmail] = useState("")
  const [isAlertSubmitting, setIsAlertSubmitting] = useState(false)
  const [alertSuccess, setAlertSuccess] = useState(false)
  const [alertError, setAlertError] = useState("")

  // Generate simulated 90-day history on mount
  useEffect(() => {
    const points = []
    const now = new Date()
    const currentPrice = product.price
    const lowest = Math.round(currentPrice * 0.92)
    const highest = Math.round(currentPrice * 1.25)
    
    // Total steps
    const days = 90
    for (let i = days; i >= 0; i--) {
      const date = new Date()
      date.setDate(now.getDate() - i)

      const progress = (days - i) / days // 0 to 1
      // Sine wave with decay and noise
      const wave = Math.sin(progress * Math.PI * 2.8) * 0.08
      const trend = 0.12 * Math.cos(progress * Math.PI)
      const noise = Math.sin(i * 0.8) * 0.015 + Math.cos(i * 1.5) * 0.01

      // Let the price start high, drop, fluctuate, and finish exactly at currentPrice
      const factor = 1.1 + wave + trend + noise
      let simulatedPrice = Math.round(currentPrice * (i === 0 ? 1 : factor))

      if (simulatedPrice < lowest) simulatedPrice = lowest
      if (simulatedPrice > highest) simulatedPrice = highest

      points.push({
        date: date.toLocaleDateString("en-IN", { day: "numeric", month: "short" }),
        price: simulatedPrice
      })
    }

    setHistoryData(points)

    // Calculate actual average from generated points
    const sum = points.reduce((acc, p) => acc + p.price, 0)
    setStats({
      lowest,
      highest,
      average: Math.round(sum / points.length)
    })
  }, [product.price])

  // Chart coordinates mapping helper
  const svgWidth = 600
  const svgHeight = 220
  const paddingX = 40
  const paddingY = 30

  const getCoordinates = () => {
    if (historyData.length === 0) return []
    const minVal = stats.lowest * 0.98
    const maxVal = stats.highest * 1.02
    const range = maxVal - minVal

    return historyData.map((d, index) => {
      const x = paddingX + (index / (historyData.length - 1)) * (svgWidth - paddingX * 2)
      const y = svgHeight - paddingY - ((d.price - minVal) / range) * (svgHeight - paddingY * 2)
      return { x, y, price: d.price, date: d.date }
    })
  }

  const coords = getCoordinates()

  // Generate SVG paths
  const linePath = coords.reduce((acc, c, idx) => {
    return acc + `${idx === 0 ? "M" : "L"} ${c.x} ${c.y} `
  }, "")

  const fillPath = coords.length > 0 
    ? `${linePath} L ${coords[coords.length - 1].x} ${svgHeight - paddingY} L ${coords[0].x} ${svgHeight - paddingY} Z`
    : ""

  // Mouse move handler for interactive tooltip
  const handleMouseMove = (e: React.MouseEvent<SVGSVGElement, MouseEvent>) => {
    if (!svgRef.current || coords.length === 0) return
    const rect = svgRef.current.getBoundingClientRect()
    const mouseX = e.clientX - rect.left

    // Find closest index based on x-coordinate
    let closestIdx = 0
    let minDiff = Infinity
    coords.forEach((c, idx) => {
      const diff = Math.abs(c.x - (mouseX / rect.width) * svgWidth)
      if (diff < minDiff) {
        minDiff = diff
        closestIdx = idx
      }
    })

    setHoverIndex(closestIdx)
    // Convert coordinate spaces back to mouse position
    const tooltipX = (coords[closestIdx].x / svgWidth) * rect.width
    const tooltipY = (coords[closestIdx].y / svgHeight) * rect.height
    setTooltipPos({ x: tooltipX, y: tooltipY })
  }

  const handleMouseLeave = () => {
    setHoverIndex(null)
  }

  // Handle Set Price Drop Alert submission
  const handleSetAlert = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) {
      setAlertError("Please enter your email address.")
      return
    }
    
    setIsAlertSubmitting(true)
    setAlertError("")
    
    try {
      const response = await fetch("/api/price-alert", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          productId: product.id,
          targetPrice: alertTargetPrice,
          email: email
        })
      })

      if (response.ok) {
        setAlertSuccess(true)
        setEmail("")
      } else {
        const data = await response.json()
        setAlertError(data.error || "Failed to activate alert. Try again.")
      }
    } catch (err) {
      setAlertError("Network error. Please try again.")
    } finally {
      setIsAlertSubmitting(false)
    }
  }

  // Quick select alert percentages
  const applyPercentDrop = (pct: number) => {
    setAlertTargetPrice(Math.round(product.price * (1 - pct / 100)))
  }

  // Price analysis recommendation label
  const isBestTimeToBuy = product.price <= stats.lowest * 1.03
  const isHighPrice = product.price >= stats.highest * 0.95

  return (
    <div className="space-y-8 my-12 border-t border-b border-slate-100 py-10">
      
      {/* Grid: Comparisons (Left) & Price Drop Alert Widget (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Side: Store Comparisons (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-black text-slate-900 tracking-tight flex items-center space-x-2">
              <span className="w-1.5 h-6 rounded-full bg-purple-600 inline-block" />
              <span>Compare Store Prices</span>
            </h3>
            <span className="text-[10px] font-black uppercase tracking-wider text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full flex items-center space-x-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span>Live Checked</span>
            </span>
          </div>

          <div className="border border-slate-200 rounded-2xl overflow-hidden bg-white shadow-sm divide-y divide-slate-100">
            {compareStores.map((st, idx) => {
              const isLowest = st.price === Math.min(...compareStores.map(s => s.price))
              return (
                <div 
                  key={idx} 
                  className={`flex flex-col sm:flex-row sm:items-center justify-between p-4 gap-3 transition-colors ${
                    st.active ? "bg-purple-500/[0.02]" : "hover:bg-slate-50"
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    {/* Store avatar logo */}
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-black text-sm uppercase ${
                      st.name === "Amazon" ? "bg-amber-100 text-amber-800" :
                      st.name === "Flipkart" ? "bg-blue-100 text-blue-800" :
                      st.name === "Myntra" ? "bg-pink-100 text-pink-800" :
                      st.name === "Tata CliQ" ? "bg-red-100 text-red-800" :
                      "bg-purple-100 text-purple-800"
                    }`}>
                      {st.name.charAt(0)}
                    </div>
                    <div>
                      <div className="flex items-center space-x-1.5">
                        <span className="font-extrabold text-sm text-slate-900">{st.name}</span>
                        {st.active && (
                          <span className="text-[9px] font-semibold text-purple-600 bg-purple-100 px-1.5 py-0.5 rounded">
                            Original Source
                          </span>
                        )}
                      </div>
                      <span className="text-[11px] text-slate-400 font-semibold">
                        {isLowest ? "⚡ Free & Express Delivery" : "✓ In Stock"}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between sm:justify-end gap-4">
                    <div className="flex flex-col text-right">
                      <span className="text-base font-black text-slate-950">₹{st.price}</span>
                      {isLowest && (
                        <span className="text-[9px] font-black text-emerald-600 uppercase tracking-wider">
                          Lowest Price
                        </span>
                      )}
                    </div>

                    <a
                      href={`/go/${product.slug}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`px-4 py-2.5 rounded-xl text-xs font-black transition-all flex items-center space-x-1.5 ${
                        isLowest 
                          ? "bg-purple-600 hover:bg-purple-700 text-white shadow-sm"
                          : "bg-slate-100 hover:bg-slate-200 text-slate-700"
                      }`}
                    >
                      <span>Get Deal</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Right Side: Set Price Alert Widget (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          <h3 className="text-base font-black text-slate-900 tracking-tight flex items-center space-x-2">
            <span className="w-1.5 h-6 rounded-full bg-purple-600 inline-block" />
            <span>Price Drop Alerts</span>
          </h3>

          <div className="border border-slate-200 rounded-2xl p-5 bg-white shadow-sm relative overflow-hidden flex flex-col justify-between h-[256px]">
            {/* Background design */}
            <div className="absolute -right-12 -bottom-12 w-32 h-32 bg-purple-50 rounded-full filter blur-2xl pointer-events-none" />

            {!alertSuccess ? (
              <form onSubmit={handleSetAlert} className="space-y-4 h-full flex flex-col justify-between relative z-10">
                <div>
                  <p className="text-xs text-slate-500 font-semibold leading-relaxed mb-3">
                    Don't want to buy now? Set a target price and enter your email address. We'll drop a mail when it hits the spot.
                  </p>

                  {/* Percentage buttons */}
                  <div className="grid grid-cols-3 gap-2 mb-3">
                    <button
                      type="button"
                      onClick={() => applyPercentDrop(5)}
                      className={`py-1.5 rounded-lg border text-xs font-bold transition-all ${
                        alertTargetPrice === Math.round(product.price * 0.95)
                          ? "border-purple-600 bg-purple-50 text-purple-700"
                          : "border-slate-200 text-slate-600 hover:bg-slate-50"
                      }`}
                    >
                      5% Drop (₹{Math.round(product.price * 0.95)})
                    </button>
                    <button
                      type="button"
                      onClick={() => applyPercentDrop(10)}
                      className={`py-1.5 rounded-lg border text-xs font-bold transition-all ${
                        alertTargetPrice === Math.round(product.price * 0.90)
                          ? "border-purple-600 bg-purple-50 text-purple-700"
                          : "border-slate-200 text-slate-600 hover:bg-slate-50"
                      }`}
                    >
                      10% Drop (₹{Math.round(product.price * 0.90)})
                    </button>
                    <button
                      type="button"
                      onClick={() => applyPercentDrop(15)}
                      className={`py-1.5 rounded-lg border text-xs font-bold transition-all ${
                        alertTargetPrice === Math.round(product.price * 0.85)
                          ? "border-purple-600 bg-purple-50 text-purple-700"
                          : "border-slate-200 text-slate-600 hover:bg-slate-50"
                      }`}
                    >
                      15% Drop (₹{Math.round(product.price * 0.85)})
                    </button>
                  </div>

                  {/* Target Price input */}
                  <div className="flex items-center space-x-3 bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider pl-1.5">Target Price</span>
                    <input
                      type="number"
                      value={alertTargetPrice}
                      onChange={(e) => setAlertTargetPrice(Math.max(1, parseInt(e.target.value) || 0))}
                      className="bg-transparent border-0 font-extrabold text-slate-900 text-sm focus:ring-0 outline-none w-full text-right"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex gap-2">
                    <input
                      type="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="bg-white border border-slate-200 rounded-xl px-3 py-2.5 text-xs font-semibold focus:border-purple-600 focus:outline-none w-full shadow-inner"
                      required
                    />
                    <button
                      type="submit"
                      disabled={isAlertSubmitting}
                      className="bg-purple-600 hover:bg-purple-700 text-white rounded-xl px-4 py-2.5 text-xs font-bold transition-all flex items-center justify-center flex-shrink-0 cursor-pointer shadow-md shadow-purple-500/25 active:scale-95"
                    >
                      {isAlertSubmitting ? "Activating..." : "Set Alert"}
                    </button>
                  </div>

                  {alertError && (
                    <div className="flex items-center space-x-1 text-[10px] font-bold text-red-500">
                      <AlertCircle className="w-3.5 h-3.5" />
                      <span>{alertError}</span>
                    </div>
                  )}
                </div>
              </form>
            ) : (
              <div className="flex flex-col items-center justify-center text-center h-full space-y-3 relative z-10">
                <div className="w-12 h-12 rounded-full bg-green-50 flex items-center justify-center text-green-600 shadow-inner">
                  <Check className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-sm font-black text-slate-900">Price Drop Alert Set!</h4>
                  <p className="text-[11px] text-slate-500 mt-1 max-w-[280px]">
                    We'll trigger an email instantly when the price dips below <span className="font-extrabold text-purple-600">₹{alertTargetPrice}</span>.
                  </p>
                </div>
                <button
                  onClick={() => setAlertSuccess(false)}
                  className="text-xs font-bold text-purple-600 hover:underline pt-1"
                >
                  Create another alert
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* SVG-based 90-Day Price Trend History Tracker */}
      <div className="space-y-4">
        <h3 className="text-base font-black text-slate-900 tracking-tight flex items-center space-x-2">
          <span className="w-1.5 h-6 rounded-full bg-purple-600 inline-block" />
          <span>Price Trends Tracker (90 Days)</span>
        </h3>

        <div className="border border-slate-200 rounded-2xl p-6 bg-white shadow-sm space-y-6">
          
          {/* Stats Bar */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 items-center">
            <div className="flex flex-col bg-slate-50 p-3 rounded-xl border border-slate-100">
              <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Lowest Price</span>
              <span className="text-lg font-black text-emerald-600">₹{stats.lowest}</span>
            </div>
            <div className="flex flex-col bg-slate-50 p-3 rounded-xl border border-slate-100">
              <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Average Price</span>
              <span className="text-lg font-black text-slate-800">₹{stats.average}</span>
            </div>
            <div className="flex flex-col bg-slate-50 p-3 rounded-xl border border-slate-100">
              <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Highest Price</span>
              <span className="text-lg font-black text-red-500">₹{stats.highest}</span>
            </div>
            
            {/* Recommendation Display */}
            <div className={`p-3 rounded-xl flex items-center space-x-2 border ${
              isBestTimeToBuy 
                ? "bg-emerald-50 border-emerald-100 text-emerald-800"
                : isHighPrice 
                ? "bg-amber-50 border-amber-100 text-amber-800"
                : "bg-purple-50 border-purple-100 text-purple-800"
            }`}>
              <div className="flex-shrink-0">
                <Activity className="w-5 h-5" />
              </div>
              <div className="flex flex-col">
                <span className="text-[9px] font-black uppercase tracking-wider leading-none mb-0.5">Recommendation</span>
                <span className="text-xs font-black leading-tight">
                  {isBestTimeToBuy ? "Buy Now! Great Deal" : isHighPrice ? "High Price. Wait drop" : "Average Price. Fair Deal"}
                </span>
              </div>
            </div>
          </div>

          {/* Line Chart */}
          <div className="relative">
            {coords.length > 0 && (
              <svg 
                ref={svgRef}
                viewBox={`0 0 ${svgWidth} ${svgHeight}`}
                className="w-full h-auto max-h-[220px] overflow-visible select-none"
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
              >
                {/* SVG Definitions */}
                <defs>
                  <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.25" />
                    <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0.0" />
                  </linearGradient>
                </defs>

                {/* Horizontal grid lines */}
                {Array.from({ length: 4 }).map((_, idx) => {
                  const y = paddingY + (idx / 3) * (svgHeight - paddingY * 2)
                  return (
                    <line 
                      key={idx}
                      x1={paddingX} 
                      y1={y} 
                      x2={svgWidth - paddingX} 
                      y2={y} 
                      stroke="#f1f5f9" 
                      strokeWidth="1.5"
                    />
                  )
                })}

                {/* Shaded Area under path */}
                <path 
                  d={fillPath} 
                  fill="url(#chartGradient)"
                />

                {/* Line Path */}
                <path 
                  d={linePath} 
                  fill="none" 
                  stroke="#8b5cf6" 
                  strokeWidth="3.5" 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                />

                {/* High/Low markers labels */}
                {coords.map((c, idx) => {
                  if (c.price === stats.lowest && idx === Math.floor(coords.length / 2)) {
                    return (
                      <g key={idx}>
                        <circle cx={c.x} cy={c.y} r="5" fill="#10b981" stroke="#ffffff" strokeWidth="2" />
                        <text x={c.x} y={c.y + 18} textAnchor="middle" className="text-[10px] font-bold fill-emerald-600">Lowest</text>
                      </g>
                    )
                  }
                  if (c.price === stats.highest && idx === Math.floor(coords.length / 5)) {
                    return (
                      <g key={idx}>
                        <circle cx={c.x} cy={c.y} r="5" fill="#ef4444" stroke="#ffffff" strokeWidth="2" />
                        <text x={c.x} y={c.y - 12} textAnchor="middle" className="text-[10px] font-bold fill-rose-600">Highest</text>
                      </g>
                    )
                  }
                  return null
                })}

                {/* Interactive hover elements */}
                {hoverIndex !== null && coords[hoverIndex] && (
                  <g>
                    {/* Vertical tracking cursor */}
                    <line 
                      x1={coords[hoverIndex].x} 
                      y1={paddingY} 
                      x2={coords[hoverIndex].x} 
                      y2={svgHeight - paddingY} 
                      stroke="#c084fc" 
                      strokeWidth="1.5" 
                      strokeDasharray="4 4"
                    />
                    
                    {/* Hover dot */}
                    <circle 
                      cx={coords[hoverIndex].x} 
                      cy={coords[hoverIndex].y} 
                      r="6.5" 
                      fill="#8b5cf6" 
                      stroke="#ffffff" 
                      strokeWidth="2.5" 
                      className="drop-shadow-md"
                    />
                  </g>
                )}

                {/* Time Axis Labels */}
                <text x={paddingX} y={svgHeight - 10} textAnchor="start" className="text-[10px] font-bold fill-slate-400">90 Days Ago</text>
                <text x={svgWidth / 2} y={svgHeight - 10} textAnchor="middle" className="text-[10px] font-bold fill-slate-400">45 Days Ago</text>
                <text x={svgWidth - paddingX} y={svgHeight - 10} textAnchor="end" className="text-[10px] font-bold fill-slate-400">Today</text>
              </svg>
            )}

            {/* Float Tooltip over SVG via absolute coordinates */}
            {hoverIndex !== null && coords[hoverIndex] && (
              <div 
                className="absolute pointer-events-none bg-slate-900 text-white rounded-lg p-2 text-xs font-black shadow-lg flex flex-col space-y-0.5 border border-slate-800 transition-all z-20"
                style={{ 
                  left: `${tooltipPos.x}px`, 
                  top: `${tooltipPos.y - 58}px`,
                  transform: "translateX(-50%)"
                }}
              >
                <span className="text-[9px] font-bold text-slate-400 leading-none">{coords[hoverIndex].date}</span>
                <span className="text-purple-300 leading-normal">₹{coords[hoverIndex].price}</span>
              </div>
            )}
          </div>

          <div className="flex items-center space-x-2 text-[10px] text-slate-400 font-semibold justify-center">
            <Info className="w-3.5 h-3.5 text-purple-500" />
            <span>Hover over the trend chart to view specific date prices. Data is dynamically compiled from partner listing histories.</span>
          </div>

        </div>
      </div>

    </div>
  )
}
