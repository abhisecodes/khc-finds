"use client"

import React, { useState, useEffect } from "react"
import { usePathname } from "next/navigation"
import { Mail, Clock, ArrowRight, Check, AlertCircle, Sparkles, Unlock, ShieldCheck, Award } from "lucide-react"

export default function ComingSoonOverlay() {
  const pathname = usePathname()
  const isAdminPath = pathname ? (pathname.startsWith("/admin") || pathname.startsWith("/api") || pathname.includes("/go/")) : false

  const [visible, setVisible] = useState(true)
  const [dismissed, setDismissed] = useState(isAdminPath)
  
  // Countdown state
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 })
  
  // Email form state
  const [email, setEmail] = useState("")
  const [submitting, setSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState("")

  // Set target launch date: June 15, 2026
  const targetDate = new Date("2026-06-15T00:00:00+05:30").getTime()

  useEffect(() => {
    if (isAdminPath) {
      setDismissed(true)
      return
    }

    // Always show coming soon screen to public visitors (no preview bypass)
    setDismissed(false)
    // Fade in the overlay
    setTimeout(() => setVisible(true), 100)
  }, [pathname, isAdminPath])

  // Countdown timer effect
  useEffect(() => {
    if (dismissed) return

    const calculateTime = () => {
      const now = new Date().getTime()
      const difference = targetDate - now

      if (difference <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 })
        return
      }

      const d = Math.floor(difference / (1000 * 60 * 60 * 24))
      const h = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
      const m = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60))
      const s = Math.floor((difference % (1000 * 60)) / 1000)

      setTimeLeft({ days: d, hours: h, minutes: m, seconds: s })
    }

    calculateTime()
    const timer = setInterval(calculateTime, 1000)
    return () => clearInterval(timer)
  }, [dismissed, targetDate])

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return
    setSubmitting(true)
    setError("")

    try {
      const res = await fetch("/api/newsletter/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email })
      })

      if (res.ok) {
        setSuccess(true)
        setEmail("")
      } else {
        const data = await res.json()
        setError(data.error || "Subscription failed. Please try again.")
      }
    } catch (err) {
      setError("Network error. Please try again.")
    } finally {
      setSubmitting(false)
    }
  }

  if (dismissed) return null

  return (
    <div 
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#f8fafc] px-4 transition-all duration-700 ${
        visible ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none"
      }`}
    >
      {/* Vibrant Animated Background Blobs */}
      <div className="absolute top-[-10%] left-[10%] w-[450px] h-[450px] bg-pink-300/30 rounded-full filter blur-[100px] animate-float-blob-1 pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[10%] w-[450px] h-[450px] bg-cyan-300/30 rounded-full filter blur-[100px] animate-float-blob-2 pointer-events-none" />
      <div className="absolute top-[40%] left-[50%] -translate-x-1/2 w-[350px] h-[350px] bg-purple-400/20 rounded-full filter blur-[90px] animate-float-blob-3 pointer-events-none" />

      {/* Bird Animation Container */}
      <div className="relative w-full max-w-lg mb-14 flex flex-col items-center select-none z-20">
        
        {/* Bird flying and holding banner */}
        <div className="animate-bird-flight flex flex-col items-center relative">
          
          {/* Bird SVG with animated wing flaps - styled in ultra-vibrant colors */}
          <svg className="w-24 h-24 filter drop-shadow-[0_0_15px_rgba(236,72,153,0.3)]" viewBox="0 0 100 100">
            {/* Wing Back */}
            <path 
              className="animate-wing-flap-back fill-cyan-500" 
              d="M 50 40 Q 20 25 10 45 Q 30 55 50 40 Z" 
              style={{ transformOrigin: "50px 40px" }}
            />
            {/* Body */}
            <path 
              className="fill-pink-500" 
              d="M 30 50 Q 50 22 70 50 Q 82 50 86 45 Q 81 60 70 60 Q 50 72 30 50 Z" 
              style={{ transformOrigin: "center" }}
            />
            {/* Beak */}
            <path className="fill-amber-400" d="M 70 48 L 79 51 L 70 54 Z" />
            {/* Eye */}
            <circle cx="62" cy="45" r="2.5" fill="#ffffff" />
            <circle cx="62.5" cy="45" r="1" fill="#000000" />
            {/* Wing Front */}
            <path 
              className="animate-wing-flap-front fill-purple-400" 
              d="M 45 42 Q 25 18 15 38 Q 35 50 45 42 Z" 
              style={{ transformOrigin: "45px 42px" }}
            />
          </svg>

          {/* Glowing dangling cords from bird beak to banner */}
          <svg className="absolute top-[60px] left-[66px] w-20 h-16 pointer-events-none" viewBox="0 0 80 60">
            <path d="M 15 0 C 15 20, 5 35, 0 50" fill="none" stroke="#db2777" strokeWidth="1.5" strokeDasharray="2 2" />
            <path d="M 15 0 C 25 20, 35 35, 40 50" fill="none" stroke="#0891b2" strokeWidth="1.5" strokeDasharray="2 2" />
          </svg>

          {/* Floating dangling Coming Soon banner */}
          <div className="absolute top-[110px] -left-12 animate-banner-wave z-10">
            <div className="bg-gradient-to-r from-pink-500 via-purple-600 to-cyan-500 px-7 py-3 rounded-2xl border border-pink-400/20 text-white font-black text-xs uppercase tracking-widest shadow-xl shadow-pink-500/20 whitespace-nowrap flex items-center space-x-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-300 animate-pulse" />
              <span>We're Launching Soon!</span>
              <Sparkles className="w-3.5 h-3.5 text-amber-300 animate-pulse" />
            </div>
          </div>
          
        </div>

      </div>

      {/* Main Glassmorphic Coming Soon Console */}
      <div className="w-full max-w-md bg-white/70 border border-slate-200/50 rounded-3xl p-6 md:p-8 shadow-[0_20px_50px_-12px_rgba(124,58,237,0.1)] relative z-10 flex flex-col space-y-6 backdrop-blur-xl">
        
        {/* Logo and Intro */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center space-x-2 text-cyan-600 bg-cyan-50 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider border border-cyan-200/60">
            <Sparkles className="w-3 h-3 text-cyan-500" />
            <span>AFFILIATE & DEALS DISCOVERY</span>
          </div>
          
          <h2 className="text-3xl md:text-4xl font-black bg-gradient-to-r from-pink-600 via-purple-600 to-cyan-600 bg-clip-text text-transparent leading-tight py-1">
            KHC Finds
          </h2>
          
          <p className="text-xs text-slate-600 font-semibold leading-relaxed max-w-sm mx-auto">
            Your ultimate hub for affiliate products, coupons, deals, gift cards, and much more. Launching shortly!
          </p>
        </div>

        {/* Countdown Timer Grid with vibrant pink/cyan values */}
        <div className="grid grid-cols-4 gap-3">
          {[
            { value: timeLeft.days, label: "Days", color: "text-pink-600" },
            { value: timeLeft.hours, label: "Hours", color: "text-purple-600" },
            { value: timeLeft.minutes, label: "Mins", color: "text-cyan-600" },
            { value: timeLeft.seconds, label: "Secs", color: "text-amber-600" }
          ].map((t, idx) => (
            <div key={idx} className="bg-slate-50 border border-slate-100 p-3 rounded-2xl flex flex-col items-center justify-center">
              <span className={`font-extrabold text-2xl tracking-tight leading-none mb-1 ${t.color}`}>
                {String(t.value).padStart(2, '0')}
              </span>
              <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">
                {t.label}
              </span>
            </div>
          ))}
        </div>

        {/* Notify subscription form */}
        <div className="space-y-3">
          {!success ? (
            <form onSubmit={handleSubscribe} className="space-y-3">
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest block mb-1 text-center">
                Subscribe to get launch coupon codes
              </label>
              
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-white border border-slate-200 text-slate-800 placeholder-slate-400 rounded-xl px-4 py-3 text-xs font-semibold focus:border-purple-500 focus:outline-none w-full shadow-sm focus:ring-1 focus:ring-purple-500/20 transition-all"
                  required
                />
                
                <button
                  type="submit"
                  disabled={submitting}
                  className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white rounded-xl px-6 py-3 text-xs font-black transition-all flex items-center justify-center flex-shrink-0 cursor-pointer shadow-lg shadow-pink-500/20 active:scale-95 border border-pink-400/20"
                >
                  {submitting ? "Subscribing..." : "Notify Me"}
                </button>
              </div>

              {error && (
                <div className="flex items-center space-x-1 text-[10px] font-bold text-rose-600 justify-center">
                  <AlertCircle className="w-3.5 h-3.5" />
                  <span>{error}</span>
                </div>
              )}
            </form>
          ) : (
            <div className="bg-emerald-50 border border-emerald-200 p-4 rounded-2xl text-center space-y-2">
              <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                <Check className="w-4 h-4" />
              </div>
              <div>
                <span className="block text-xs font-black text-slate-800">Awesome! You've joined the waitlist.</span>
                <span className="text-[10px] text-emerald-600 font-semibold block mt-0.5">We will notify you immediately upon public launch.</span>
              </div>
            </div>
          )}
        </div>

        {/* Trust & Security Badges */}
        <div className="flex items-center justify-center space-x-6 text-[10px] font-bold text-slate-500 border-t border-slate-100 pt-5">
          <div className="flex items-center space-x-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-600 flex-shrink-0" />
            <span>Secure & Spam-Free</span>
          </div>
          <div className="flex items-center space-x-1.5">
            <Award className="w-4 h-4 text-purple-600 flex-shrink-0" />
            <span>100% Genuine Products</span>
          </div>
        </div>
      </div>

      {/* Dynamic Keyframes Styling */}
      <style jsx global>{`
        @keyframes float-blob-1 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(80px, 60px) scale(1.15); }
        }
        @keyframes float-blob-2 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(-60px, -80px) scale(1.15); }
        }
        @keyframes float-blob-3 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(40px, -40px) scale(1.1); }
        }
        @keyframes bird-flight {
          0% {
            transform: translate(-100vw, 40px) scale(0.6);
          }
          40% {
            transform: translate(-20vw, -10px) scale(0.8);
          }
          75% {
            transform: translate(15vw, -45px) scale(0.9);
          }
          100% {
            transform: translate(0, 0) scale(1);
          }
        }
        @keyframes wing-flap-front {
          0%, 100% { transform: rotate(0deg); }
          50% { transform: rotate(-35deg) translateY(-2px); }
        }
        @keyframes wing-flap-back {
          0%, 100% { transform: rotate(0deg); }
          50% { transform: rotate(25deg) translateY(2px); }
        }
        @keyframes banner-wave {
          0%, 100% {
            transform: translate(20px, 20px) rotate(-3deg);
          }
          50% {
            transform: translate(30px, 26px) rotate(4deg);
          }
        }
        
        .animate-float-blob-1 {
          animation: float-blob-1 12s ease-in-out infinite alternate;
        }
        .animate-float-blob-2 {
          animation: float-blob-2 15s ease-in-out infinite alternate;
        }
        .animate-float-blob-3 {
          animation: float-blob-3 10s ease-in-out infinite alternate;
        }
        .animate-bird-flight {
          animation: bird-flight 4.2s cubic-bezier(0.12, 0.85, 0.22, 1) forwards;
        }
        .animate-wing-flap-front {
          animation: wing-flap-front 0.22s ease-in-out infinite;
        }
        .animate-wing-flap-back {
          animation: wing-flap-back 0.22s ease-in-out infinite;
        }
        .animate-banner-wave {
          animation: banner-wave 2.2s ease-in-out infinite alternate;
        }
      `}</style>
    </div>
  )
}
