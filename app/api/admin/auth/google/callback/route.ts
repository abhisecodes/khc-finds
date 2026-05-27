import { NextRequest, NextResponse } from "next/server"
import { cookies } from "next/headers"

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const code = searchParams.get("code")
  const error = searchParams.get("error")

  // Handle Google OAuth authorization rejection or failure
  if (error || !code) {
    return NextResponse.redirect(
      new URL(`/admin/login?error=${encodeURIComponent(error || "OAuth access denied")}`, req.url)
    )
  }

  const clientId = process.env.GOOGLE_CLIENT_ID
  const clientSecret = process.env.GOOGLE_CLIENT_SECRET
  const url = new URL(req.url)
  const redirectUri = `${url.origin}/api/admin/auth/google/callback`

  if (!clientId || !clientSecret) {
    return NextResponse.redirect(
      new URL("/admin/login?error=Google OAuth credentials are missing in .env", req.url)
    )
  }

  try {
    // Exchange Auth Code for Access Token
    const tokenRes = await fetch("https://oauth2.googleapis.com/token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        code,
        client_id: clientId,
        client_secret: clientSecret,
        redirect_uri: redirectUri,
        grant_type: "authorization_code",
      }),
    })

    if (!tokenRes.ok) {
      const errorText = await tokenRes.text()
      console.error("Failed to exchange code for tokens:", errorText)
      return NextResponse.redirect(
        new URL("/admin/login?error=Failed to acquire authorization tokens", req.url)
      )
    }

    const tokenData = await tokenRes.json()
    const accessToken = tokenData.access_token

    // Fetch user details using access token
    const userRes = await fetch("https://www.googleapis.com/oauth2/v3/userinfo", {
      headers: { Authorization: `Bearer ${accessToken}` },
    })

    if (!userRes.ok) {
      return NextResponse.redirect(
        new URL("/admin/login?error=Failed to retrieve Google profile info", req.url)
      )
    }

    const userInfo = await userRes.json()
    const email = userInfo.email

    // Validate email against authorized whitelist
    const allowedEmailsStr = process.env.ALLOWED_ADMIN_EMAILS || ""
    const allowedEmails = allowedEmailsStr
      .split(",")
      .map(e => e.trim().toLowerCase())
      .filter(e => e !== "")

    if (allowedEmails.length > 0 && !allowedEmails.includes(email.toLowerCase())) {
      return NextResponse.redirect(
        new URL(`/admin/login?error=Unauthorized account: ${email}`, req.url)
      )
    }

    // Set secure cookies to authorize administrative access
    const cookieStore = await cookies()
    cookieStore.set("admin_session", "authenticated", {
      path: "/",
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 60 * 60 * 24 * 7, // 7 days
    })

    // Set user profile cookie for dashboard visual display
    cookieStore.set("admin_user", JSON.stringify({
      email,
      name: userInfo.name,
      picture: userInfo.picture,
    }), {
      path: "/",
      httpOnly: false,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 60 * 60 * 24 * 7,
    })

    return NextResponse.redirect(new URL("/admin", req.url))
  } catch (error) {
    console.error("Google OAuth Callback Error:", error)
    return NextResponse.redirect(
      new URL("/admin/login?error=Internal server error during authentication", req.url)
    )
  }
}
