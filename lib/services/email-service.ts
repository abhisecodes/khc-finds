import nodemailer from "nodemailer"

/**
 * Sends a notification email when someone subscribes to the waitlist.
 */
export async function sendSubscriptionNotification(subscriberEmail: string) {
  const targetEmail = "abrepy@gmail.com"
  
  // Retrieve SMTP credentials from environment variables
  const host = process.env.SMTP_HOST
  const port = process.env.SMTP_PORT ? parseInt(process.env.SMTP_PORT, 10) : 587
  const user = process.env.SMTP_USER
  const pass = process.env.SMTP_PASS
  const from = process.env.SMTP_FROM || `"KHC Finds Alerts" <noreply@khcfinds.com>`

  try {
    let transporter

    if (host && user && pass) {
      // Use production/user SMTP configuration
      transporter = nodemailer.createTransport({
        host,
        port,
        secure: port === 465,
        auth: { user, pass }
      })
      console.log(`Using configured SMTP server: ${host}`)
    } else {
      // Fallback: Generate a test SMTP service (ethereal.email) for development
      console.log("No SMTP credentials found in .env. Generating Ethereal test account...")
      const testAccount = await nodemailer.createTestAccount()
      transporter = nodemailer.createTransport({
        host: "smtp.ethereal.email",
        port: 587,
        secure: false,
        auth: {
          user: testAccount.user,
          pass: testAccount.pass
        }
      })
    }

    const mailOptions = {
      from,
      to: targetEmail,
      subject: "🔔 New Launch Page Subscriber!",
      text: `A new user has subscribed to the KHC Finds launch page waitlist!\n\nSubscriber Email: ${subscriberEmail}\nDate: ${new Date().toLocaleString()}`,
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; color: #333; max-width: 600px; border: 1px solid #eaeaea; border-radius: 10px;">
          <h2 style="color: #7c3aed; margin-bottom: 20px;">🔔 New Subscriber Alert!</h2>
          <p>A new visitor has signed up on the <strong>KHC Finds</strong> launch page waitlist.</p>
          <div style="background-color: #f8fafc; padding: 15px; border-radius: 8px; margin: 20px 0; border: 1px solid #e2e8f0;">
            <p style="margin: 0;"><strong>Subscriber Email:</strong> <a href="mailto:${subscriberEmail}" style="color: #7c3aed;">${subscriberEmail}</a></p>
            <p style="margin: 5px 0 0 0;"><strong>Signup Time:</strong> ${new Date().toLocaleString()}</p>
          </div>
          <p style="font-size: 12px; color: #888;">This is an automated notification from your Next.js development server.</p>
        </div>
      `
    }

    const info = await transporter.sendMail(mailOptions)
    console.log(`Notification sent: ${info.messageId}`)

    // If using Ethereal fallback, print the preview URL
    if (!host) {
      const previewUrl = nodemailer.getTestMessageUrl(info)
      console.log(`--------------------------------------------------`)
      console.log(`✉️  Ethereal Email Preview URL: ${previewUrl}`)
      console.log(`--------------------------------------------------`)
    }
    
    return true
  } catch (error) {
    console.error("Failed to send subscription notification email:", error)
    return false
  }
}
