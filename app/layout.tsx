import type { Metadata, Viewport } from "next"
import { Outfit } from "next/font/google"
import { Providers } from "./providers"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import ComingSoonOverlay from "@/components/coming-soon-overlay"
import "./globals.css"

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "KHC Finds - Premium Affiliate & Trend Product Discovery Platform",
  description: "Discover viral Amazon finds, developer tools, top AI apps, creator gear, and student picks. Curated, reviewed, and optimized for your lifestyle.",
  metadataBase: new URL("https://khcfinds.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "KHC Finds - Premium Product Discovery Platform",
    description: "Discover viral Amazon finds, developer tools, top AI apps, creator gear, and student picks.",
    url: "https://khcfinds.com",
    siteName: "KHC Finds",
    images: [
      {
        url: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&h=630&q=80",
        width: 1200,
        height: 630,
        alt: "KHC Finds Banner",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "KHC Finds - Premium Product Discovery Platform",
    description: "Discover viral Amazon finds, developer tools, top AI apps, creator gear, and student picks.",
    images: ["https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&h=630&q=80"],
  },
}

export const viewport: Viewport = {
  themeColor: "#7c3aed",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${outfit.variable} h-full scroll-smooth`} suppressHydrationWarning>
      <body className="flex flex-col min-h-screen antialiased bg-gray-50 dark:bg-black text-gray-900 dark:text-gray-100">
        <Providers>
          <ComingSoonOverlay />
          <Navbar />
          <main className="flex-grow pt-24">
            {children}
          </main>
          <Footer />
        </Providers>
      </body>
    </html>
  )
}
