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
  phoneNumber = "923001234567", // Default KHANAN WhatsApp number
  message = "Hello! I'm interested in KHANAN Pathan Shawls.",
  variant = "default",
  size = "default",
  className = "",
}: WhatsAppButtonProps) {
  const handleWhatsAppClick = () => {
    const encodedMessage = encodeURIComponent(message)
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`
    window.open(whatsappUrl, "_blank")
  }

  return (
    <Button onClick={handleWhatsAppClick} variant={variant} size={size} className={className}>
      <MessageCircle className="w-4 h-4 mr-2" />
      WhatsApp
    </Button>
  )
}
