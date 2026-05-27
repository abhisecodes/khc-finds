import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Intercept all admin requests
  if (pathname.startsWith("/admin")) {
    // Skip the login page to prevent infinite redirects
    if (pathname === "/admin/login") {
      return NextResponse.next()
    }

    // Read the admin session cookie
    const sessionCookie = request.cookies.get("admin_session")

    // Redirect to login if session does not exist or is invalid
    if (!sessionCookie || sessionCookie.value !== "authenticated") {
      const loginUrl = new URL("/admin/login", request.url)
      return NextResponse.redirect(loginUrl)
    }
  }

  return NextResponse.next()
}

// Route matching rules
export const config = {
  matcher: [
    "/admin/:path*",
  ],
}
