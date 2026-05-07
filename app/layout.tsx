import type React from "react"
import type { Metadata, Viewport } from "next"
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
  display: "swap",
})

const poppins = Poppins({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
})

export const metadata: Metadata = {
  title: "Khanana | Authentic Pashtun Shawls, Cloth & Chappal | Handcrafted in Khyber Pakhtunkhwa",
  description:
    "Khanana preserves the rich heritage of Khyber Pakhtunkhwa through handcrafted shawls, traditional cloth, and artisanal chappal. Shop authentic Pashtun craftsmanship from KPK.",
  keywords: [
    "Khanana",
    "Pashtun shawl",
    "Pathan shawl",
    "Peshawari chappal",
    "khaddar cloth",
    "Khyber Pakhtunkhwa",
    "Pakistani heritage",
    "handcrafted",
  ],
  openGraph: {
    title: "Khanana | Heritage in Every Thread & Step",
    description:
      "Authentic Pashtun craftsmanship from Khyber Pakhtunkhwa — Shawls, Cloth & Chappal.",
    type: "website",
    locale: "en_PK",
  },
  generator: "v0.app",
}

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#fbf6ec" },
    { media: "(prefers-color-scheme: dark)", color: "#1a0f0a" },
  ],
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
    <html lang="en" className="bg-background">
      <body
        className={`${playfairDisplay.variable} ${poppins.variable} font-sans antialiased bg-background min-h-screen`}
      >
        <AuthProvider>
          <LanguageProvider>
            <WishlistProvider>
              <MainLayout>{children}</MainLayout>
            </WishlistProvider>
          </LanguageProvider>
        </AuthProvider>
        <Analytics />
        <Toaster
          position="bottom-right"
          richColors
          closeButton
          toastOptions={{
            classNames: {
              toast: "rounded-xl border border-border/50 shadow-lg",
            },
          }}
        />
      </body>
    </html>
  )
}
