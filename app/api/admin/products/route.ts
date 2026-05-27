import { NextRequest, NextResponse } from "next/server"
import { createProduct, deleteProduct, updateProduct } from "@/lib/services/db-service"

// Create new product
export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const {
      title,
      slug,
      description,
      longDescription,
      price,
      originalPrice,
      rating,
      trendingScore,
      affiliateLink,
      imageUrl,
      categoryId,
      tags,
      couponCode,
      isFeatured,
      isSponsored
    } = body

    // Validation
    if (!title || !slug || !description || !longDescription || price === undefined || !affiliateLink || !imageUrl || !categoryId) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Convert tag input to array if it is a comma separated string
    const parsedTags = Array.isArray(tags)
      ? tags
      : typeof tags === "string"
      ? tags.split(",").map(t => t.trim().toLowerCase()).filter(t => t !== "")
      : []

    const product = await createProduct({
      title,
      slug,
      description,
      longDescription,
      price: parseFloat(price),
      originalPrice: originalPrice ? parseFloat(originalPrice) : undefined,
      rating: rating ? parseFloat(rating) : 4.5,
      trendingScore: trendingScore ? parseFloat(trendingScore) : 50,
      affiliateLink,
      imageUrl,
      categoryId,
      tags: parsedTags,
      couponCode: couponCode || undefined,
      isFeatured: !!isFeatured,
      isSponsored: !!isSponsored
    })

    return NextResponse.json(product, { status: 201 })
  } catch (error) {
    console.error("API error in product creation:", error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}

// Update product
export async function PUT(req: NextRequest) {
  try {
    const body = await req.json()
    const {
      id,
      title,
      slug,
      description,
      longDescription,
      price,
      originalPrice,
      rating,
      trendingScore,
      affiliateLink,
      imageUrl,
      categoryId,
      tags,
      couponCode,
      isFeatured,
      isSponsored
    } = body

    if (!id || !title || !slug || !description || !longDescription || price === undefined || !affiliateLink || !imageUrl || !categoryId) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    const parsedTags = Array.isArray(tags)
      ? tags
      : typeof tags === "string"
      ? tags.split(",").map(t => t.trim().toLowerCase()).filter(t => t !== "")
      : []

    const updated = await updateProduct(id, {
      title,
      slug,
      description,
      longDescription,
      price: parseFloat(price),
      originalPrice: originalPrice ? parseFloat(originalPrice) : undefined,
      rating: rating ? parseFloat(rating) : 4.5,
      trendingScore: trendingScore ? parseFloat(trendingScore) : 50,
      affiliateLink,
      imageUrl,
      categoryId,
      tags: parsedTags,
      couponCode: couponCode || undefined,
      isFeatured: !!isFeatured,
      isSponsored: !!isSponsored
    })

    if (!updated) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 })
    }

    return NextResponse.json(updated)
  } catch (error) {
    console.error("API error in product update:", error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}

// Delete product
export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const id = searchParams.get("id")

    if (!id) {
      return NextResponse.json({ error: "Missing product ID parameter" }, { status: 400 })
    }

    const success = await deleteProduct(id)
    if (!success) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 })
    }

    return NextResponse.json({ success: true, message: "Product deleted successfully" })
  } catch (error) {
    console.error("API error in product deletion:", error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}
