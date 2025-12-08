"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Minus, Plus, CheckCircle, Loader2 } from "lucide-react"
import { useRouter, useSearchParams } from "next/navigation"
import { useLanguage } from "@/contexts/language-context"
import type { Product } from "@/lib/products"
import { toast } from "sonner"

interface FormData {
  fullName: string
  email: string
  phone: string
  address: string
  quantity: number
}

interface FormErrors {
  fullName?: string
  email?: string
  phone?: string
  address?: string
}

export default function CheckoutPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { t } = useLanguage()
  const [product, setProduct] = useState<Product | null>(null)
  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    quantity: 1,
  })
  const [errors, setErrors] = useState<FormErrors>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [orderComplete, setOrderComplete] = useState(false)
  const [orderId, setOrderId] = useState<string>("")
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const productId = searchParams.get("productId")
    const quantity = searchParams.get("quantity")

    if (productId) {
      const fetchProduct = async () => {
        try {
          const response = await fetch(`/api/products/${productId}`)
          const data = await response.json()
          if (data.success) {
            setProduct(data.data)
            if (quantity) {
              setFormData((prev) => ({ ...prev, quantity: Number.parseInt(quantity) }))
            }
          }
        } catch (error) {
          console.error("Failed to fetch product:", error)
        } finally {
          setIsLoading(false)
        }
      }
      fetchProduct()
    } else {
      setIsLoading(false)
    }
  }, [searchParams])

  const subtotal = product ? product.discountedPrice * formData.quantity : 0
  const discount = product ? (product.originalPrice - product.discountedPrice) * formData.quantity : 0
  const totalPrice = subtotal

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {}

    if (!formData.fullName.trim()) {
      newErrors.fullName = "Full name is required"
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required"
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address"
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required"
    } else if (!/^\+?[\d\s\-()]+$/.test(formData.phone)) {
      newErrors.phone = "Please enter a valid phone number"
    }

    if (!formData.address.trim()) {
      newErrors.address = "Delivery address is required"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    console.log("[v0] Form submitted, validating...")

    if (!validateForm() || !product) {
      console.log("[v0] Validation failed or no product")
      return
    }

    setIsSubmitting(true)
    console.log("[v0] Submitting order to API...")

    try {
      const orderData = {
        customerName: formData.fullName,
        customerEmail: formData.email,
        customerPhone: formData.phone,
        customerAddress: formData.address,
        productId: product.id,
        productName: product.name,
        productPrice: product.discountedPrice,
        quantity: formData.quantity,
        totalAmount: totalPrice,
      }

      console.log("[v0] Order data:", orderData)

      const response = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderData),
      })

      console.log("[v0] API response status:", response.status)
      const data = await response.json()
      console.log("[v0] API response data:", data)

      if (data.success) {
        setOrderId(data.data.id)
        if (typeof window !== "undefined") {
          localStorage.setItem("verifiedBuyer", "true")
        }

        try {
          console.log("[v0] Sending admin notification...")
          const notifyResponse = await fetch("/api/notify-admin", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ order: data.data }),
          })
          const notifyData = await notifyResponse.json()
          console.log("[v0] Admin notification response:", notifyData)
        } catch (notifyError) {
          console.error("[v0] Failed to send admin notification:", notifyError)
        }

        setOrderComplete(true)
        console.log("[v0] Order placed successfully:", data.data.id)
      } else {
        console.log("[v0] Order failed:", data.error)
        toast.error("Failed to place order. Please try again.")
      }
    } catch (error) {
      console.error("[v0] Failed to submit order:", error)
      toast.error("Failed to place order. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const updateQuantity = (change: number) => {
    setFormData((prev) => ({
      ...prev,
      quantity: Math.max(1, prev.quantity + change),
    }))
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background py-8">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    )
  }

  if (orderComplete) {
    return (
      <div className="min-h-screen bg-background py-8">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="text-center">
            <CardContent className="p-6 sm:p-8">
              <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
              <h1 className="text-xl sm:text-2xl lg:text-3xl font-serif font-bold text-foreground mb-4">
                Order Placed Successfully!
              </h1>
              <p className="text-sm sm:text-base lg:text-lg text-muted-foreground mb-6">
                Thank you for your order! Our team will contact you shortly via WhatsApp to confirm your order and
                discuss the payment method.
              </p>

              {orderId && (
                <div className="bg-muted p-4 rounded-lg mb-6">
                  <p className="text-xs sm:text-sm text-muted-foreground mb-1">Order ID</p>
                  <p className="font-mono font-semibold text-foreground text-sm sm:text-base">{orderId}</p>
                </div>
              )}

              {product && (
                <div className="bg-muted p-4 rounded-lg mb-6 text-left">
                  <h3 className="font-semibold text-foreground mb-2 text-sm sm:text-base">Order Details</h3>
                  <p className="text-xs sm:text-sm text-muted-foreground">{product.name}</p>
                  <p className="text-xs sm:text-sm text-muted-foreground">Quantity: {formData.quantity}</p>
                  <p className="text-xs sm:text-sm text-muted-foreground">Total: Rs {totalPrice.toLocaleString()}</p>
                </div>
              )}

              <div className="bg-green-50 border border-green-200 p-4 rounded-lg mb-6">
                <p className="text-xs sm:text-sm text-green-800 font-medium">
                  We will contact you within 24 hours to confirm your order. Please keep your phone available.
                </p>
              </div>

              <div className="space-y-3">
                <Button
                  onClick={() => router.push("/products")}
                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
                >
                  Continue Shopping
                </Button>
                <Button variant="outline" onClick={() => router.push("/")} className="w-full">
                  Back to Home
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-background py-8">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card>
            <CardContent className="p-8 text-center">
              <p className="text-muted-foreground mb-4">No product selected for checkout.</p>
              <Button
                onClick={() => router.push("/products")}
                className="bg-primary hover:bg-primary/90 text-primary-foreground"
              >
                Browse Products
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background py-6 lg:py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-6 lg:mb-8">
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-serif font-bold text-foreground text-balance">
            {t("checkout.title")}
          </h1>
          <p className="text-muted-foreground mt-2 text-xs sm:text-sm lg:text-base">
            Complete your order for {product.name}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          {/* Order Form */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="font-serif text-base sm:text-lg">Shipping Information</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4 lg:space-y-6">
                  {/* Full Name */}
                  <div>
                    <Label htmlFor="fullName" className="text-sm">
                      {t("checkout.fullName")} *
                    </Label>
                    <Input
                      id="fullName"
                      type="text"
                      value={formData.fullName}
                      onChange={(e) => setFormData((prev) => ({ ...prev, fullName: e.target.value }))}
                      className={`${errors.fullName ? "border-destructive" : ""} text-sm`}
                      placeholder={t("checkout.fullName")}
                    />
                    {errors.fullName && <p className="text-xs text-destructive mt-1">{errors.fullName}</p>}
                  </div>

                  {/* Email */}
                  <div>
                    <Label htmlFor="email" className="text-sm">
                      {t("checkout.email")} *
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
                      className={`${errors.email ? "border-destructive" : ""} text-sm`}
                      placeholder={t("checkout.email")}
                    />
                    {errors.email && <p className="text-xs text-destructive mt-1">{errors.email}</p>}
                  </div>

                  {/* Phone Number (WhatsApp) */}
                  <div>
                    <Label htmlFor="phone" className="text-sm">
                      {t("checkout.phone")} (WhatsApp) *
                    </Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData((prev) => ({ ...prev, phone: e.target.value }))}
                      className={`${errors.phone ? "border-destructive" : ""} text-sm`}
                      placeholder="03XX-XXXXXXX"
                    />
                    {errors.phone && <p className="text-xs text-destructive mt-1">{errors.phone}</p>}
                    <p className="text-xs text-muted-foreground mt-1">We will contact you on this number</p>
                  </div>

                  {/* Delivery Address */}
                  <div>
                    <Label htmlFor="address" className="text-sm">
                      {t("checkout.address")} *
                    </Label>
                    <Textarea
                      id="address"
                      value={formData.address}
                      onChange={(e) => setFormData((prev) => ({ ...prev, address: e.target.value }))}
                      className={`${errors.address ? "border-destructive" : ""} text-sm`}
                      placeholder={t("checkout.address")}
                      rows={3}
                    />
                    {errors.address && <p className="text-xs text-destructive mt-1">{errors.address}</p>}
                  </div>

                  {/* Quantity */}
                  <div>
                    <Label className="text-sm">{t("checkout.quantity")}</Label>
                    <div className="flex items-center space-x-3 mt-2">
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => updateQuantity(-1)}
                        disabled={formData.quantity <= 1}
                      >
                        <Minus className="h-4 w-4" />
                      </Button>
                      <span className="text-lg font-medium w-8 text-center">{formData.quantity}</span>
                      <Button type="button" variant="outline" size="sm" onClick={() => updateQuantity(1)}>
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  <div className="border-t border-border pt-4 lg:pt-6">
                    <h3 className="font-serif font-semibold text-foreground mb-3 text-sm sm:text-base">
                      Payment Method
                    </h3>
                    <p className="text-xs sm:text-sm text-muted-foreground mb-4">
                      Our team will contact you to discuss the most convenient payment method:
                    </p>
                    <ul className="text-xs sm:text-sm text-muted-foreground space-y-1 mb-4">
                      <li>• Cash on Delivery (COD)</li>
                      <li>• Bank Transfer</li>
                      <li>• JazzCash / EasyPaisa</li>
                    </ul>
                  </div>

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-primary hover:bg-primary/90 text-primary-foreground h-12 lg:h-14 text-sm sm:text-base lg:text-lg font-semibold"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                        Placing Order...
                      </>
                    ) : (
                      "Confirm Order"
                    )}
                  </Button>

                  <p className="text-xs text-center text-muted-foreground">
                    By placing this order, our team will contact you via WhatsApp to confirm and process your order
                  </p>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle className="font-serif text-base sm:text-lg">{t("checkout.orderSummary")}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 bg-muted rounded flex items-center justify-center">
                    <span className="text-muted-foreground text-xs">Image</span>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium text-xs sm:text-sm text-pretty">{product.name}</h3>
                    <p className="text-xs text-muted-foreground">{product.style}</p>
                  </div>
                </div>

                <div className="border-t border-border pt-4 space-y-2">
                  <div className="flex justify-between text-xs sm:text-sm">
                    <span>{t("checkout.subtotal")}:</span>
                    <span>Rs {subtotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-xs sm:text-sm text-green-600">
                    <span>{t("checkout.discount")}:</span>
                    <span>-Rs {discount.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-xs sm:text-sm">
                    <span>{t("checkout.quantity")}:</span>
                    <span>{formData.quantity}</span>
                  </div>
                  <div className="flex justify-between text-xs sm:text-sm">
                    <span>Shipping:</span>
                    <span className="text-green-600">Free</span>
                  </div>
                  <div className="border-t border-border pt-2">
                    <div className="flex justify-between font-semibold text-base sm:text-lg">
                      <span>{t("checkout.total")}:</span>
                      <span className="text-primary">Rs {totalPrice.toLocaleString()}</span>
                    </div>
                  </div>
                </div>

                <div className="text-xs text-muted-foreground space-y-1 bg-muted p-3 rounded">
                  <p>✓ Free shipping on all orders</p>
                  <p>✓ 30-day return policy</p>
                  <p>✓ Authentic handwoven shawls</p>
                  <p>✓ 24/7 customer support</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
