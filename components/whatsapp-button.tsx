"use client"

import { Button } from "@/components/ui/button"
import { MessageCircle } from "lucide-react"

interface WhatsAppButtonProps {
  phoneNumber?: string
  message?: string
  variant?: "default" | "outline" | "ghost"
  size?: "default" | "sm" | "lg" | "icon"
  className?: string
}

export function WhatsAppButton({
  phoneNumber = "923496464844",
  message = "Hello! I'm interested in Khanana Pathan Shawls.",
  variant = "default",
  size = "default",
  className = "",
}: WhatsAppButtonProps) {
  const encodedMessage = encodeURIComponent(message)
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`

  return (
    <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="inline-block w-full">
      <Button type="button" variant={variant} size={size} className={`w-full ${className}`}>
        <MessageCircle className="w-4 h-4 mr-2" />
        WhatsApp
      </Button>
    </a>
  )
}
