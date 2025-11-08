"use client"

import { MessageCircle } from "lucide-react"
import { useState } from "react"

export function FloatingWhatsApp() {
  const [isHovered, setIsHovered] = useState(false)

  const whatsappNumber = "923001234567"
  const message = "Hi KHANAN! I'm interested in your Pathan shawls."
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-40 group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      aria-label="Contact us on WhatsApp"
    >
      <div className="relative">
        <div className="absolute inset-0 bg-green-500 rounded-full blur-lg opacity-0 group-hover:opacity-75 transition-opacity duration-300" />
        <div className="relative w-14 h-14 bg-green-500 hover:bg-green-600 rounded-full flex items-center justify-center shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-110">
          <MessageCircle className="w-7 h-7 text-white" />
        </div>
      </div>

      {/* Tooltip */}
      {isHovered && (
        <div className="absolute bottom-full right-0 mb-3 bg-foreground text-background px-3 py-2 rounded-lg text-sm font-medium whitespace-nowrap shadow-lg">
          Chat with us
        </div>
      )}
    </a>
  )
}
