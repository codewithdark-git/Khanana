"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import type { Product } from "@/lib/products"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useWishlist } from "@/contexts/wishlist-context"
import { WhatsAppButton } from "@/components/whatsapp-button"
import { ProductImageSlider } from "@/components/product-image-slider"
import { ReviewsSlider } from "@/components/reviews-slider"
import { ChevronLeft, Heart, ShoppingCart, Truck, Shield, RotateCcw, Star } from "lucide-react"
import Link from "next/link"

export default function ProductDetailPage() {
  const params = useParams()
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
      <div className="min-h-screen bg-background py-6 sm:py-8 lg:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12">
            <div className="bg-muted rounded-xl sm:rounded-2xl aspect-square animate-pulse" />
            <div className="space-y-3 sm:space-y-4">
              <div className="h-6 sm:h-8 bg-muted rounded w-1/3 animate-pulse" />
              <div className="h-8 sm:h-12 bg-muted rounded w-2/3 animate-pulse" />
              <div className="h-16 sm:h-24 bg-muted rounded animate-pulse" />
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-background py-12 sm:py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-xl sm:text-2xl font-semibold text-foreground mb-4">Product not found</h1>
          <Link href="/products">
            <Button>Back to Products</Button>
          </Link>
        </div>
      </div>
    )
  }

  const whatsappMessage = `Hi! I'm interested in the ${product.name} (Rs ${product.discountedPrice}). Can you provide more details?`
  const productImages = product.image ? [product.image] : []

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8">
        <Link
          href="/products"
          className="inline-flex items-center text-muted-foreground hover:text-primary transition-colors mb-4 sm:mb-6 lg:mb-8 text-sm sm:text-base"
        >
          <ChevronLeft className="w-4 h-4 mr-1" />
          Back to Collection
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 xl:gap-16">
          {/* Product Images */}
          <ProductImageSlider images={productImages} alt={product.imageAlt} />

          {/* Product Info */}
          <div className="flex flex-col">
            {/* Style Badge */}
            <Badge className="w-fit bg-secondary/20 text-secondary-foreground hover:bg-secondary/30 mb-2 sm:mb-3 lg:mb-4 text-xs sm:text-sm">
              {product.style}
            </Badge>

            {/* Title - Responsive */}
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-foreground mb-2 sm:mb-3 lg:mb-4">
              {product.name}
            </h1>

            {/* Rating - Responsive */}
            <div className="flex items-center gap-2 mb-4 sm:mb-6 flex-wrap">
              <div className="flex gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 sm:w-5 sm:h-5 fill-secondary text-secondary" />
                ))}
              </div>
              <span className="text-muted-foreground text-xs sm:text-sm">(5.0) • 24 Reviews</span>
            </div>

            {/* Price - Responsive */}
            <div className="flex items-baseline gap-2 sm:gap-3 mb-4 sm:mb-6 flex-wrap">
              <span className="text-2xl sm:text-3xl lg:text-4xl font-bold text-primary">
                Rs {product.discountedPrice.toLocaleString()}
              </span>
              {product.originalPrice !== product.discountedPrice && (
                <>
                  <span className="text-base sm:text-lg lg:text-xl text-muted-foreground line-through">
                    Rs {product.originalPrice.toLocaleString()}
                  </span>
                  <Badge className="bg-primary text-primary-foreground text-xs sm:text-sm">
                    Save {product.discountPercentage}%
                  </Badge>
                </>
              )}
            </div>

            {/* Description - Responsive */}
            <p className="text-muted-foreground mb-6 sm:mb-8 leading-relaxed text-sm sm:text-base">
              {product.description}
            </p>

            {/* Product Details - Responsive grid */}
            <div className="grid grid-cols-2 gap-3 sm:gap-4 mb-6 sm:mb-8 p-3 sm:p-4 bg-muted/50 rounded-lg sm:rounded-xl">
              <div>
                <span className="text-xs sm:text-sm text-muted-foreground">Material</span>
                <p className="font-medium text-foreground text-sm sm:text-base">Premium Wool</p>
              </div>
              <div>
                <span className="text-xs sm:text-sm text-muted-foreground">Craftsmanship</span>
                <p className="font-medium text-foreground text-sm sm:text-base">Handwoven</p>
              </div>
              <div>
                <span className="text-xs sm:text-sm text-muted-foreground">Origin</span>
                <p className="font-medium text-foreground text-sm sm:text-base">Khyber Pakhtunkhwa</p>
              </div>
              <div>
                <span className="text-xs sm:text-sm text-muted-foreground">Style</span>
                <p className="font-medium text-foreground text-sm sm:text-base">{product.style}</p>
              </div>
            </div>

            {/* Quantity Selector - Responsive */}
            <div className="mb-4 sm:mb-6">
              <label className="block text-xs sm:text-sm font-medium text-foreground mb-2 sm:mb-3">Quantity</label>
              <div className="flex items-center gap-2 sm:gap-3">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg border border-border flex items-center justify-center hover:bg-muted transition-colors text-lg sm:text-xl font-medium"
                  disabled={quantity <= 1}
                >
                  −
                </button>
                <span className="w-10 sm:w-12 text-center text-lg sm:text-xl font-semibold">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg border border-border flex items-center justify-center hover:bg-muted transition-colors text-lg sm:text-xl font-medium"
                >
                  +
                </button>
              </div>
            </div>

            {/* Action Buttons - Responsive */}
            <div className="flex gap-2 sm:gap-3 mb-4 sm:mb-6">
              <Link href={`/checkout?productId=${product.id}&quantity=${quantity}`} className="flex-1">
                <Button className="w-full h-11 sm:h-12 lg:h-14 bg-primary hover:bg-primary/90 text-primary-foreground text-sm sm:text-base lg:text-lg font-semibold">
                  <ShoppingCart className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                  Add to Cart
                </Button>
              </Link>
              <Button
                variant="outline"
                size="lg"
                onClick={handleWishlistToggle}
                className={`h-11 sm:h-12 lg:h-14 w-11 sm:w-12 lg:w-14 ${inWishlist ? "bg-red-50 border-red-200" : ""}`}
              >
                <Heart className={`w-5 h-5 sm:w-6 sm:h-6 ${inWishlist ? "fill-red-500 text-red-500" : ""}`} />
              </Button>
            </div>

            {/* WhatsApp Button - Responsive */}
            <WhatsAppButton
              message={whatsappMessage}
              className="w-full h-11 sm:h-12 lg:h-14 bg-green-600 hover:bg-green-700 text-white text-sm sm:text-base lg:text-lg font-semibold mb-6 sm:mb-8"
            />

            {/* Trust Badges - Responsive */}
            <div className="grid grid-cols-3 gap-2 sm:gap-4 pt-4 sm:pt-6 border-t border-border">
              <div className="text-center">
                <Truck className="w-5 h-5 sm:w-6 sm:h-6 mx-auto mb-1 sm:mb-2 text-secondary" />
                <span className="text-xs sm:text-sm text-muted-foreground">Free Shipping</span>
              </div>
              <div className="text-center">
                <Shield className="w-5 h-5 sm:w-6 sm:h-6 mx-auto mb-1 sm:mb-2 text-secondary" />
                <span className="text-xs sm:text-sm text-muted-foreground">Authentic</span>
              </div>
              <div className="text-center">
                <RotateCcw className="w-5 h-5 sm:w-6 sm:h-6 mx-auto mb-1 sm:mb-2 text-secondary" />
                <span className="text-xs sm:text-sm text-muted-foreground">Easy Returns</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Customer Reviews Section */}
      <div className="mt-8 sm:mt-12 lg:mt-16">
        <ReviewsSlider />
      </div>
    </div>
  )
}
