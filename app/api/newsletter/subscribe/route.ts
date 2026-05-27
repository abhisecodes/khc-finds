import { NextRequest, NextResponse } from "next/server"
import { subscribeToNewsletter } from "@/lib/services/db-service"
import { sendSubscriptionNotification } from "@/lib/services/email-service"

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { email } = body

    if (!email || !email.includes("@")) {
      return NextResponse.json({ error: "Invalid email address" }, { status: 400 })
    }

    const success = await subscribeToNewsletter(email)
    if (!success) {
      return NextResponse.json({ error: "Failed to subscribe" }, { status: 500 })
    }

    // Fire email notification asynchronously
    sendSubscriptionNotification(email).catch(err => {
      console.error("Failed to send subscription notification:", err)
    })

    return NextResponse.json({ success: true, message: "Subscribed successfully" })
  } catch (error) {
    console.error("API error in newsletter subscription:", error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}
