import { NextRequest, NextResponse } from "next/server"
import { bulkUploadProducts } from "@/lib/services/db-service"

export async function POST(req: NextRequest) {
  try {
    let csvText = ""
    const contentType = req.headers.get("content-type") || ""

    if (contentType.includes("multipart/form-data")) {
      const formData = await req.formData()
      const file = formData.get("file") as File | null
      if (!file) {
        return NextResponse.json({ error: "No file uploaded" }, { status: 400 })
      }
      csvText = await file.text()
    } else if (contentType.includes("application/json")) {
      const body = await req.json()
      csvText = body.csvText || ""
    } else {
      return NextResponse.json({ error: "Unsupported content type" }, { status: 400 })
    }

    if (!csvText || csvText.trim() === "") {
      return NextResponse.json({ error: "CSV data is empty" }, { status: 400 })
    }

    const count = await bulkUploadProducts(csvText)
    return NextResponse.json({ success: true, count, message: `${count} products uploaded successfully.` })
  } catch (error) {
    console.error("API error in bulk upload:", error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}
