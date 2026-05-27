"use client"

import React, { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { KeyRound, Mail } from "lucide-react"
import Link from "next/link"

export default function AdminLoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  // Capture redirection errors (e.g. from Google OAuth whitelist check)
  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search)
      const err = params.get("error")
      if (err) {
        setError(decodeURIComponent(err))
      }
    }
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      })

      if (res.ok) {
        router.push("/admin")
        router.refresh()
      } else {
        const data = await res.json()
        setError(data.error || "Incorrect email or password")
      }
    } catch (err) {
      console.error(err)
      setError("Connection error. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  const handleGoogleSignIn = () => {
    setLoading(true)
    setError("")
    window.location.href = "/api/admin/auth/google/redirect"
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4 w-full">
      {/* Clean Light-Themed Login Box */}
      <div className="w-full max-w-sm bg-white p-8 rounded-2xl border border-slate-200 shadow-md space-y-6">
        
        {/* Typographic Logo Mark */}
        <div className="text-center space-y-2">
          <div className="w-10 h-10 rounded-lg bg-purple-600 flex items-center justify-center text-white font-extrabold text-base shadow-sm mx-auto">
            K
          </div>
          <h1 className="text-lg font-bold text-slate-900 tracking-tight pt-2">
            KHC Finds Admin
          </h1>
          <p className="text-xs text-slate-500">
            Sign in via Google or Email credentials
          </p>
        </div>

        {/* Credentials Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email input */}
          <div>
            <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@example.com"
                className="w-full pl-9 pr-4 py-2.5 text-sm bg-white border border-slate-200 rounded-xl outline-none focus:border-purple-600 focus:ring-1 focus:ring-purple-600 transition-all font-sans"
              />
            </div>
          </div>

          {/* Password input */}
          <div>
            <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">
              Password
            </label>
            <div className="relative">
              <KeyRound className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-9 pr-4 py-2.5 text-sm bg-white border border-slate-200 rounded-xl outline-none focus:border-purple-600 focus:ring-1 focus:ring-purple-600 transition-all font-mono"
              />
            </div>
          </div>

          {error && (
            <div className="p-3 rounded-xl bg-red-50 border border-red-100">
              <p className="text-[10px] font-bold text-red-600 text-center uppercase tracking-wider leading-relaxed">
                {error}
              </p>
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center py-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold uppercase tracking-wider shadow-sm active:scale-95 transition-all disabled:opacity-50 cursor-pointer"
          >
            <span>{loading ? "Verifying..." : "Sign In with Email"}</span>
          </button>
        </form>

        {/* Divider */}
        <div className="relative flex py-1 items-center">
          <div className="flex-grow border-t border-slate-100"></div>
          <span className="flex-shrink mx-4 text-[9px] text-slate-400 font-bold uppercase tracking-widest">
            or
          </span>
          <div className="flex-grow border-t border-slate-100"></div>
        </div>

        {/* Google OAuth Button Container */}
        <div className="space-y-2">
          <button
            type="button"
            onClick={handleGoogleSignIn}
            disabled={loading}
            className="w-full flex items-center justify-center space-x-2 py-2.5 rounded-xl bg-white border border-slate-200 hover:bg-slate-50 text-xs font-bold text-slate-700 transition-all disabled:opacity-50 cursor-pointer"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24">
              <path
                fill="#EA4335"
                d="M5.266 9.765A7.077 7.077 0 0 1 12 4.909c1.69 0 3.218.6 4.418 1.582L19.91 3C17.782 1.145 15.055 0 12 0 7.336 0 3.336 2.69 1.436 6.618l3.83 3.147z"
              />
              <path
                fill="#34A853"
                d="M16.04 15.345c-1.077.737-2.43 1.173-4.04 1.173a7.07 7.07 0 0 1-6.733-4.854L1.436 14.81C3.336 18.736 7.336 21.427 12 21.427c3.155 0 6.009-1.054 8.236-2.882l-4.195-3.2z"
              />
              <path
                fill="#4285F4"
                d="M22.545 12.273c0-.682-.063-1.345-.181-1.982H12v3.982h5.918a5.073 5.073 0 0 1-2.2 3.327l4.195 3.2c2.455-2.264 3.85-5.59 3.85-9.527z"
              />
              <path
                fill="#FBBC05"
                d="M5.267 9.765L1.436 6.617C.518 8.508 0 10.654 0 12.91c0 2.253.518 4.4 1.436 6.291l3.83-3.147A7.07 7.07 0 0 1 4.91 12.909c0-1.118.136-2.19.356-3.144z"
              />
            </svg>
            <span>Continue with Google</span>
          </button>
          <span className="block text-[9px] text-slate-400 text-center leading-relaxed">
            Note: Google login requires setting <code className="font-mono text-purple-600 bg-purple-50 px-1 py-0.5 rounded">GOOGLE_CLIENT_ID</code> in the <code className="font-mono">.env</code> file.
          </span>
        </div>

        {/* Back Link */}
        <div className="text-center pt-1 border-t border-slate-100">
          <Link
            href="/"
            className="text-[10px] font-bold uppercase tracking-wider text-purple-600 hover:text-purple-700 hover:underline"
          >
            ← Back to Public Site
          </Link>
        </div>
      </div>
    </div>
  )
}
