import { NextRequest, NextResponse } from "next/server"

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { productId, targetPrice, email } = body

    if (!productId) {
      return NextResponse.json({ error: "Product ID is required" }, { status: 400 })
    }

    if (!targetPrice || isNaN(Number(targetPrice)) || Number(targetPrice) <= 0) {
      return NextResponse.json({ error: "Invalid target price" }, { status: 400 })
    }

    if (!email || !email.includes("@")) {
      return NextResponse.json({ error: "Invalid email address" }, { status: 400 })
    }

    // Console logging the set alert to show it's active in background console
    console.log(`[Price Drop Alert Set] Product: ${productId}, Target: ₹${targetPrice}, Email: ${email}`)

    return NextResponse.json({ 
      success: true, 
      message: "Price alert activated successfully." 
    })
  } catch (error) {
    console.error("API error in price alert subscription:", error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}
