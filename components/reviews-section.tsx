"use client"

import React, { useState } from "react"
import { Star, Send, User } from "lucide-react"

interface Review {
  id: string
  reviewerName: string
  rating: number
  comment: string
  createdAt: string
}

interface ReviewsSectionProps {
  productId: string
  initialReviews: Review[]
}

export default function ReviewsSection({ productId, initialReviews }: ReviewsSectionProps) {
  const [reviews, setReviews] = useState<Review[]>(initialReviews)
  const [name, setName] = useState("")
  const [comment, setComment] = useState("")
  const [rating, setRating] = useState(5)
  const [hoverRating, setHoverRating] = useState<number | null>(null)
  const [submitting, setSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!name || !comment) return

    setSubmitting(true)
    try {
      const res = await fetch("/api/products/review", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId, reviewerName: name, rating, comment }),
      })

      if (res.ok) {
        const newReview = await res.json()
        setReviews([newReview, ...reviews])
        setName("")
        setComment("")
        setRating(5)
        setSuccess(true)
        setTimeout(() => setSuccess(false), 3000)
      }
    } catch (error) {
      console.error("Failed to submit review", error)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-start md:space-x-10 gap-8">
        
        {/* Left Side: Submit Form */}
        <div className="w-full md:w-5/12 glass-panel p-6 rounded-2xl border border-black/[0.04] dark:border-white/[0.04]">
          <h3 className="text-base font-black text-gray-900 dark:text-white mb-4">Write a Review</h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-gray-500 dark:text-gray-400 mb-1.5 uppercase">
                Your Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. John Doe"
                required
                className="w-full px-3.5 py-2.5 text-sm bg-gray-50 dark:bg-white/[0.02] border border-gray-200 dark:border-white/[0.06] rounded-xl outline-none focus:border-purple-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-500 dark:text-gray-400 mb-1.5 uppercase">
                Rating
              </label>
              <div className="flex space-x-1.5">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    onMouseEnter={() => setHoverRating(star)}
                    onMouseLeave={() => setHoverRating(null)}
                    className="p-1 -m-1"
                  >
                    <Star
                      className={`w-6 h-6 transition-colors duration-150 ${
                        star <= (hoverRating || rating)
                          ? "text-amber-500 fill-current animate-pulse"
                          : "text-gray-300 dark:text-gray-700"
                      }`}
                    />
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-500 dark:text-gray-400 mb-1.5 uppercase">
                Comment
              </label>
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                rows={3}
                placeholder="Share your experience with this deal..."
                required
                className="w-full px-3.5 py-2.5 text-sm bg-gray-50 dark:bg-white/[0.02] border border-gray-200 dark:border-white/[0.06] rounded-xl outline-none focus:border-purple-500 resize-none"
              />
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-xl text-xs font-bold flex items-center justify-center space-x-1.5 shadow-md shadow-purple-500/10 hover:opacity-95"
            >
              <span>{submitting ? "Submitting..." : "Post Review"}</span>
              <Send className="w-3.5 h-3.5" />
            </button>

            {success && (
              <div className="text-center text-xs font-bold text-emerald-500 bg-emerald-500/10 py-2 rounded-lg">
                Review posted successfully!
              </div>
            )}
          </form>
        </div>

        {/* Right Side: Reviews Feed */}
        <div className="w-full md:w-7/12 space-y-4">
          <h3 className="text-base font-black text-gray-900 dark:text-white border-b border-black/[0.05] dark:border-white/[0.05] pb-2">
            User Feedback ({reviews.length})
          </h3>
          
          {reviews.length === 0 ? (
            <div className="text-center py-10 text-gray-400 dark:text-gray-500">
              <p className="text-sm">No reviews yet. Be the first to share your thoughts!</p>
            </div>
          ) : (
            <div className="space-y-4 max-h-[380px] overflow-y-auto pr-2">
              {reviews.map((rev) => (
                <div
                  key={rev.id}
                  className="p-4 rounded-2xl bg-white dark:bg-white/[0.01] border border-black/[0.03] dark:border-white/[0.03] space-y-2"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className="w-7 h-7 rounded-lg bg-gray-100 dark:bg-white/[0.05] flex items-center justify-center text-gray-500">
                        <User className="w-4 h-4" />
                      </div>
                      <span className="text-xs font-bold text-gray-800 dark:text-gray-200">
                        {rev.reviewerName}
                      </span>
                    </div>
                    <div className="flex space-x-0.5">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className={`w-3.5 h-3.5 ${
                            star <= rev.rating ? "text-amber-500 fill-current" : "text-gray-200 dark:text-gray-700"
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                  <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed pl-9">
                    {rev.comment}
                  </p>
                  <span className="block text-[9px] text-gray-400 dark:text-gray-500 text-right pl-9">
                    {new Date(rev.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  )
}
