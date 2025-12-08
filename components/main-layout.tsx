"use client"

import type React from "react"

import { usePathname } from "next/navigation"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { FloatingWhatsApp } from "@/components/floating-whatsapp"
import { Suspense } from "react"

export function MainLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  const isAdminRoute = pathname?.startsWith("/admin")

  if (isAdminRoute) {
    return <>{children}</>
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Suspense fallback={<div className="h-16 bg-background" />}>
        <Navbar />
      </Suspense>
      <main className="flex-1">{children}</main>
      <Suspense fallback={<div className="h-20 bg-background" />}>
        <Footer />
      </Suspense>
      <FloatingWhatsApp />
    </div>
  )
}
