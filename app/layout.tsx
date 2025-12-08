import type React from "react"
import type { Metadata } from "next"
import { Playfair_Display, Poppins } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { LanguageProvider } from "@/contexts/language-context"
import { AuthProvider } from "@/contexts/auth-context"
import { WishlistProvider } from "@/contexts/wishlist-context"
import { MainLayout } from "@/components/main-layout"
import { Toaster } from "sonner"
import "./globals.css"

const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-serif",
  weight: ["400", "500", "600", "700", "800", "900"],
})

const poppins = Poppins({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["300", "400", "500", "600", "700"],
})

export const metadata: Metadata = {
  title: "Khanana - Authentic Pathan Shawls",
  description:
    "Discover authentic handwoven Pathan shawls from Khanana. Premium quality Pashtun craftsmanship with traditional heritage.",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${playfairDisplay.variable} ${poppins.variable} font-sans antialiased`}>
        <AuthProvider>
          <LanguageProvider>
            <WishlistProvider>
              <MainLayout>{children}</MainLayout>
            </WishlistProvider>
          </LanguageProvider>
        </AuthProvider>
        <Analytics />
        <Toaster />
      </body>
    </html>
  )
}
