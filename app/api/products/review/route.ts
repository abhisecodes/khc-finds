import { NextRequest, NextResponse } from "next/server"
import { createReview } from "@/lib/services/db-service"

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { productId, reviewerName, rating, comment } = body

    if (!productId || !reviewerName || !rating || !comment) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    const review = await createReview({
      productId,
      reviewerName,
      rating: parseInt(rating, 10),
      comment
    })

    return NextResponse.json(review, { status: 201 })
  } catch (error) {
    console.error("API error in review creation:", error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}
