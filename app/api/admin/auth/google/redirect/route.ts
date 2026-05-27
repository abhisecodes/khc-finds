import { NextRequest, NextResponse } from "next/server"

export async function GET(req: NextRequest) {
  const clientId = process.env.GOOGLE_CLIENT_ID
  if (!clientId) {
    // Redirect to login page with a configuration warning query param
    return NextResponse.redirect(
      new URL("/admin/login?error=Google Client ID is not configured in .env", req.url)
    )
  }

  const url = new URL(req.url)
  const redirectUri = `${url.origin}/api/admin/auth/google/callback`
  const scope = "openid email profile"
  
  // Build Google OAuth authorization URL
  const googleAuthUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${clientId}&redirect_uri=${encodeURIComponent(
    redirectUri
  )}&response_type=code&scope=${encodeURIComponent(scope)}&prompt=select_account`

  return NextResponse.redirect(googleAuthUrl)
}
