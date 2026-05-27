import { NextRequest, NextResponse } from "next/server"
import { trackRedirection } from "@/lib/services/db-service"

export const revalidate = 0 // Never cache this redirection endpoint

interface RouteProps {
  params: Promise<{ slug: string }>
}

export async function GET(req: NextRequest, { params }: RouteProps) {
  try {
    const resolvedParams = await params
    const slug = resolvedParams.slug

    // Extract headers for analytics tracking
    const userAgent = req.headers.get("user-agent") || undefined
    const referrer = req.headers.get("referer") || undefined
    const ipAddress = req.headers.get("x-forwarded-for")?.split(",")[0] || 
                      req.headers.get("x-real-ip") || 
                      undefined

    // Extract any incoming UTM parameters passed to the go link
    const { searchParams } = new URL(req.url)
    const utmSource = searchParams.get("utm_source") || undefined
    const utmMedium = searchParams.get("utm_medium") || undefined
    const utmCampaign = searchParams.get("utm_campaign") || undefined

    // Track click and resolve final redirect link (with default platform UTMs appended)
    const targetUrl = await trackRedirection(slug, {
      ipAddress,
      userAgent,
      referrer,
      utmSource,
      utmMedium,
      utmCampaign
    })

    if (!targetUrl) {
      // Gracefully fall back to catalog explorer if slug isn't matched
      return NextResponse.redirect(new URL("/explore", req.url))
    }

    // Perform a 307 Temporary Redirect to pass affiliate cookies cleanly
    return NextResponse.redirect(targetUrl, 307)
  } catch (error) {
    console.error("Critical error in affiliate redirection endpoint:", error)
    return NextResponse.redirect(new URL("/explore", req.url))
  }
}
