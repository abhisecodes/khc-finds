import { NextRequest, NextResponse } from "next/server"
import { cookies } from "next/headers"

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { email, password } = body
    const expectedPassword = process.env.ADMIN_PASSWORD || "admin"

    // Optional email validation if whitelist is configured
    const allowedEmailsStr = process.env.ALLOWED_ADMIN_EMAILS || ""
    const allowedEmails = allowedEmailsStr
      .split(",")
      .map(e => e.trim().toLowerCase())
      .filter(e => e !== "")

    if (allowedEmails.length > 0 && (!email || !allowedEmails.includes(email.trim().toLowerCase()))) {
      return NextResponse.json({ error: "Email address is not authorized" }, { status: 401 })
    }

    if (password === expectedPassword) {
      const cookieStore = await cookies()
      
      // Authorize access
      cookieStore.set("admin_session", "authenticated", {
        path: "/",
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 60 * 60 * 24 * 7, // 7 days
      })

      // Store profile details
      cookieStore.set("admin_user", JSON.stringify({
        email: email || "admin@khcfinds.com",
        name: "Administrator",
        picture: null,
      }), {
        path: "/",
        httpOnly: false,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 60 * 60 * 24 * 7,
      })

      return NextResponse.json({ success: true })
    }

    return NextResponse.json({ error: "Incorrect administrator password" }, { status: 401 })
  } catch (error) {
    console.error("Login API error:", error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}
