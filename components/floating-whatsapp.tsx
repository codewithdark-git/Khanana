"use client"

import { MessageCircle } from "lucide-react"
import { useState } from "react"

export function FloatingWhatsApp() {
  const [isHovered, setIsHovered] = useState(false)

  const whatsappNumber = "923496464844"
  const message = "Hi Khanana! I'm interested in your Pathan shawls."
  const encodedMessage = encodeURIComponent(message)
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-4 right-4 lg:bottom-6 lg:right-6 z-40 group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      aria-label="Contact us on WhatsApp"
    >
      <div className="relative">
        <div className="absolute inset-0 bg-green-500 rounded-full blur-lg opacity-0 group-hover:opacity-75 transition-opacity duration-300" />
        <div className="relative w-12 h-12 lg:w-14 lg:h-14 bg-green-500 hover:bg-green-600 rounded-full flex items-center justify-center shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-110">
          <MessageCircle className="w-6 h-6 lg:w-7 lg:h-7 text-white" />
        </div>
        {/* Pulse animation */}
        <div className="absolute inset-0 bg-green-500 rounded-full animate-ping opacity-25" />
      </div>

      {/* Tooltip - Hidden on mobile */}
      {isHovered && (
        <div className="hidden lg:block absolute bottom-full right-0 mb-3 bg-foreground text-background px-3 py-2 rounded-lg text-sm font-medium whitespace-nowrap shadow-lg">
          Chat with us 24/7
        </div>
      )}
    </a>
  )
}
