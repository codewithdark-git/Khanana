"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

export type Language = "en" | "ur"

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
  ur: {
    // Navigation
    "nav.home": "ہوم",
    "nav.reviews": "جائزے",
    "nav.brand": "خانان",

    // Hero Section
    "hero.title": "خانان پٹھان شالیں",
    "hero.subtitle": "اصل ہاتھ سے بنی پشتون کاری",
    "hero.description":
      "ہماری پریمیم پٹھان شالوں کے خصوصی مجموعہ کو دریافت کریں، جو روایتی پشتون فن سے ہاتھ سے بنی ہیں۔ ہر ٹکڑا ورثے اور کاری گری کی کہانی بیان کرتا ہے۔",
    "hero.buyNow": "اب خریدیں",
    "hero.oldPrice": "اصل قیمت",
    "hero.newPrice": "خصوصی قیمت",

    // Product Description
    "product.description.title": "ورثہ جدید انداز سے ملتا ہے",
    "product.description.text":
      "خانان آپ کو اصل پٹھان شالیں لاتا ہے جو روایتی پشتون کاری کو جدید انداز کے ساتھ ملاتی ہیں۔ ہر شال ماہر کاری گروں کے ذریعے ہاتھ سے بنی ہے، جو معیار اور اصالت کو یقینی بناتی ہے۔",

    // Colors
    "colors.title": "دستیاب رنگ",
    "colors.midnight": "آدھی رات",
    "colors.starlight": "ستاروں کی روشنی",
    "colors.silver": "چاندی",

    // Reviews
    "reviews.title": "گاہکوں کے جائزے",
    "reviews.average": "اوسط درجہ بندی",
    "reviews.writeReview": "جائزہ لکھیں",
    "reviews.yourName": "آپ کا نام",
    "reviews.rating": "درجہ بندی",
    "reviews.yourReview": "آپ کا جائزہ",
    "reviews.placeholder": "خانان پٹھان شالوں کے ساتھ اپنا تجربہ شیئر کریں...",
    "reviews.submit": "جائزہ جمع کریں",
    "reviews.submitting": "جمع ہو رہا ہے...",
    "reviews.verifiedOnly": "صرف تصدیق شدہ خریداری کنندگان جائزے چھوڑ سکتے ہیں",

    // CTA Section
    "cta.title": "اصل پشتون ورثے کا تجربہ کریں",
    "cta.description":
      "ہزاروں لوگوں کے ساتھ شامل ہوں جو خانان پر اعتماد کرتے ہیں پریمیم، ہاتھ سے بنی پٹھان شالوں کے لیے جو روایت اور انداز کا جشن مناتی ہیں۔",
    "cta.button": "ہماری کلیکشن دیکھیں",

    // Footer
    "footer.copyright": "© 2025 خانان۔ تمام حقوق محفوظ ہیں۔",

    // Checkout
    "checkout.title": "چیک آؤٹ",
    "checkout.orderSummary": "آرڈر کا خلاصہ",
    "checkout.fullName": "مکمل نام",
    "checkout.email": "ای میل",
    "checkout.phone": "فون نمبر",
    "checkout.address": "ڈیلیوری کا پتہ",
    "checkout.quantity": "مقدار",
    "checkout.paymentMethod": "ادائیگی کا طریقہ",
    "checkout.creditCard": "کریڈٹ کارڈ",
    "checkout.paypal": "پے پال",
    "checkout.cashOnDelivery": "ڈیلیوری پر نقد رقم",
    "checkout.subtotal": "ذیلی کل",
    "checkout.discount": "رعایت",
    "checkout.total": "کل",
    "checkout.placeOrder": "آرڈر دیں",
    "checkout.processing": "پروسیسنگ جاری ہے...",
  },
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>("en")

  useEffect(() => {
    // Load saved language from localStorage
    if (typeof window !== "undefined") {
      const savedLanguage = localStorage.getItem("language") as Language
      if (savedLanguage && (savedLanguage === "en" || savedLanguage === "ur")) {
        setLanguage(savedLanguage)
      }
    }
  }, [])

  useEffect(() => {
    // Save language to localStorage and update document direction
    if (typeof window !== "undefined") {
      localStorage.setItem("language", language)
      document.documentElement.lang = language
      document.documentElement.dir = language === "ur" ? "rtl" : "ltr"
    }
  }, [language])

  const t = (key: string): string => {
    return translations[language][key as keyof (typeof translations)[typeof language]] || key
  }

  const isRTL = language === "ur"

  return <LanguageContext.Provider value={{ language, setLanguage, t, isRTL }}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}
