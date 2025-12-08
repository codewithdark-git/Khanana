"use client"

import type React from "react"
import { createContext, useContext, useState } from "react"

export type Language = "en"

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
  isRTL: boolean
}

const translations = {
  en: {
    // Navigation
    "nav.home": "Home",
    "nav.reviews": "Reviews",
    "nav.brand": "Khanana",

    // Hero Section
    "hero.title": "Khanana Pathan Shawls",
    "hero.subtitle": "Authentic Handwoven Pashtun Craftsmanship",
    "hero.description":
      "Discover our exclusive collection of premium Pathan shawls, handwoven with traditional Pashtun artistry. Each piece tells a story of heritage and craftsmanship.",
    "hero.buyNow": "Shop Now",
    "hero.oldPrice": "Original Price",
    "hero.newPrice": "Special Price",

    // Product Description
    "product.description.title": "Heritage Meets Modern Style",
    "product.description.text":
      "Khanana brings you authentic Pathan shawls that blend traditional Pashtun craftsmanship with contemporary style. Each shawl is handwoven by skilled artisans, ensuring quality and authenticity.",

    // Colors
    "colors.title": "Available Colors",
    "colors.midnight": "Midnight",
    "colors.starlight": "Starlight",
    "colors.silver": "Silver",

    // Reviews
    "reviews.title": "Customer Reviews",
    "reviews.average": "Average Rating",
    "reviews.writeReview": "Write a Review",
    "reviews.yourName": "Your Name",
    "reviews.rating": "Rating",
    "reviews.yourReview": "Your Review",
    "reviews.placeholder": "Share your experience with Khanana Pathan Shawls...",
    "reviews.submit": "Submit Review",
    "reviews.submitting": "Submitting...",
    "reviews.verifiedOnly": "Only verified buyers can leave reviews",

    // CTA Section
    "cta.title": "Experience Authentic Pashtun Heritage",
    "cta.description":
      "Join thousands who trust Khanana for premium, handwoven Pathan shawls that celebrate tradition and style.",
    "cta.button": "Explore Our Collection",

    // Footer
    "footer.copyright": "© 2025 Khanana. All rights reserved.",

    // Checkout
    "checkout.title": "Checkout",
    "checkout.orderSummary": "Order Summary",
    "checkout.fullName": "Full Name",
    "checkout.email": "Email",
    "checkout.phone": "Phone Number",
    "checkout.address": "Delivery Address",
    "checkout.quantity": "Quantity",
    "checkout.paymentMethod": "Payment Method",
    "checkout.creditCard": "Credit Card",
    "checkout.paypal": "PayPal",
    "checkout.cashOnDelivery": "Cash on Delivery",
    "checkout.subtotal": "Subtotal",
    "checkout.discount": "Discount",
    "checkout.total": "Total",
    "checkout.placeOrder": "Place Order",
    "checkout.processing": "Processing...",
  },
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language] = useState<Language>("en")

  const setLanguage = () => {
    // Language is fixed to English
  }

  const t = (key: string): string => {
    return translations.en[key as keyof (typeof translations)["en"]] || key
  }

  const isRTL = false

  return <LanguageContext.Provider value={{ language, setLanguage, t, isRTL }}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}
