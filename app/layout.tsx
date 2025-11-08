import type React from "react"
import type { Metadata } from "next"
import { Playfair_Display, Poppins } from "next/font/google"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { LanguageProvider } from "@/contexts/language-context"
import { AuthProvider } from "@/contexts/auth-context"
import { WishlistProvider } from "@/contexts/wishlist-context"
import { FloatingWhatsApp } from "@/components/floating-whatsapp"
import { Suspense } from "react"
import "./globals.css"

const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  weight: ["400", "500", "600", "700", "800", "900"],
})

const poppins = Poppins({
  subsets: ["latin"],
  variable: "--font-poppins",
  weight: ["300", "400", "500", "600", "700"],
})

export const metadata: Metadata = {
  title: "KHANAN - Authentic Pathan Shawls",
  description:
    "Discover authentic handwoven Pathan shawls from KHANAN. Premium quality Pashtun craftsmanship with traditional heritage.",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${playfairDisplay.variable} ${poppins.variable} ${GeistMono.variable} font-sans antialiased`}>
        <AuthProvider>
          <LanguageProvider>
            <WishlistProvider>
              <div className="min-h-screen flex flex-col">
                <Suspense fallback={<div>Loading...</div>}>
                  <Navbar />
                </Suspense>
                <main className="flex-1">{children}</main>
                <Suspense fallback={<div>Loading...</div>}>
                  <Footer />
                </Suspense>
                <FloatingWhatsApp />
              </div>
            </WishlistProvider>
          </LanguageProvider>
        </AuthProvider>
        <Analytics />
      </body>
    </html>
  )
}
