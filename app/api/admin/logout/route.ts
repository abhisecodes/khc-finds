import { NextRequest, NextResponse } from "next/server"
import { cookies } from "next/headers"

export async function POST(req: NextRequest) {
  try {
    const cookieStore = await cookies()
    cookieStore.delete("admin_session")

    // Redirect to login page upon sign-out
    return NextResponse.redirect(new URL("/admin/login", req.url))
  } catch (error) {
    console.error("Logout API error:", error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}
