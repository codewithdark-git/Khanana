"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import type { Product } from "@/lib/products"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useLanguage } from "@/contexts/language-context"
import { useWishlist } from "@/contexts/wishlist-context"
import { WhatsAppButton } from "@/components/whatsapp-button"
import { ChevronLeft, ShoppingCart, Heart } from "lucide-react"
import Link from "next/link"

export default function ProductDetailPage() {
  const params = useParams()
  const router = useRouter()
  const { language } = useLanguage()
  const { isInWishlist, addToWishlist, removeFromWishlist } = useWishlist()
  const [product, setProduct] = useState<Product | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [quantity, setQuantity] = useState(1)

  const inWishlist = product ? isInWishlist(product.id) : false

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`/api/products/${params.id}`)
        const data = await response.json()
        if (data.success) {
          setProduct(data.data)
        }
      } catch (error) {
        console.error("Failed to fetch product:", error)
      } finally {
        setIsLoading(false)
      }
    }

    if (params.id) {
      fetchProduct()
    }
  }, [params.id])

  const handleWishlistToggle = () => {
    if (product) {
      if (inWishlist) {
        removeFromWishlist(product.id)
      } else {
        addToWishlist(product.id)
      }
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-muted-foreground">Loading product...</p>
        </div>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-background py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-muted-foreground">Product not found.</p>
        </div>
      </div>
    )
  }

  const name = language === "ar" ? product.nameAr : product.name
  const description = language === "ar" ? product.descriptionAr : product.description
  const whatsappMessage = `Hi! I'm interested in the ${name} (Rs ${product.discountedPrice}). Can you provide more details?`

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <Link href="/products" className="inline-flex items-center text-accent hover:text-accent/80 mb-8">
          <ChevronLeft className="w-4 h-4 mr-1" />
          Back to Products
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Image */}
          <div className="flex items-center justify-center bg-muted rounded-lg overflow-hidden h-96 lg:h-full">
            <img
              src={product.image || "/placeholder.svg"}
              alt={product.imageAlt}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Product Info */}
          <div className="flex flex-col justify-center">
            <div className="mb-4">
              <Badge className="bg-accent text-accent-foreground">{product.style}</Badge>
            </div>

            <h1 className="text-4xl font-bold text-foreground mb-4">{name}</h1>

            {/* Price */}
            <div className="mb-6">
              <div className="flex items-baseline gap-3">
                <span className="text-4xl font-bold text-accent">Rs {product.discountedPrice}</span>
                <span className="text-xl text-muted-foreground line-through">Rs {product.originalPrice}</span>
                <Badge variant="secondary" className="bg-green-100 text-green-800">
                  Save {product.discountPercentage}%
                </Badge>
              </div>
            </div>

            {/* Description */}
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">{description}</p>

            {/* Quantity Selector */}
            <div className="mb-8">
              <label className="block text-sm font-medium text-foreground mb-2">Quantity</label>
              <div className="flex items-center gap-4">
                <Button
                  variant="outline"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  disabled={quantity <= 1}
                >
                  -
                </Button>
                <span className="text-lg font-semibold w-8 text-center">{quantity}</span>
                <Button variant="outline" onClick={() => setQuantity(quantity + 1)}>
                  +
                </Button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 mb-8">
              <Link href={`/checkout?productId=${product.id}&quantity=${quantity}`} className="flex-1">
                <Button className="w-full bg-accent hover:bg-accent/90 text-accent-foreground py-6 text-lg">
                  <ShoppingCart className="w-5 h-5 mr-2" />
                  Add to Cart
                </Button>
              </Link>
              <Button
                variant="outline"
                size="lg"
                onClick={handleWishlistToggle}
                className={inWishlist ? "bg-red-50" : ""}
              >
                <Heart className={`w-5 h-5 ${inWishlist ? "fill-red-500 text-red-500" : ""}`} />
              </Button>
            </div>

            {/* WhatsApp Button */}
            <WhatsAppButton
              message={whatsappMessage}
              className="w-full bg-green-600 hover:bg-green-700 text-white py-6 text-lg"
            />

            {/* Product Details Card */}
            <Card className="mt-8">
              <CardHeader>
                <CardTitle className="text-lg">Product Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Style:</span>
                  <span className="font-medium">{product.style}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Material:</span>
                  <span className="font-medium">Premium Wool</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Craftsmanship:</span>
                  <span className="font-medium">Handwoven</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Origin:</span>
                  <span className="font-medium">Khyber Pakhtunkhwa</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
