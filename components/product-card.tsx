"use client"

import type React from "react"

import Link from "next/link"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import type { Product } from "@/lib/products"
import { useWishlist } from "@/contexts/wishlist-context"
import { Heart, Eye, ImageIcon } from "lucide-react"

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  const { isInWishlist, addToWishlist, removeFromWishlist } = useWishlist()
  const inWishlist = isInWishlist(product.id)

  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (inWishlist) {
      removeFromWishlist(product.id)
    } else {
      addToWishlist(product.id)
    }
  }

  return (
    <Card className="group overflow-hidden hover:shadow-xl transition-all duration-300 h-full flex flex-col border-border/50 bg-card">
      <div className="relative overflow-hidden bg-muted aspect-[4/5]">
        {product.image ? (
          <img
            src={product.image || "/placeholder.svg"}
            alt={product.imageAlt}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center text-muted-foreground/40">
            <ImageIcon className="w-10 h-10 sm:w-12 sm:h-12 lg:w-16 lg:h-16 mb-1 sm:mb-2" />
            <span className="text-xs sm:text-sm">Image Placeholder</span>
          </div>
        )}

        {/* Discount Badge - Responsive size */}
        {product.discountPercentage > 0 && (
          <Badge className="absolute top-2 left-2 sm:top-3 sm:left-3 bg-primary text-primary-foreground font-semibold text-xs sm:text-sm px-1.5 sm:px-2 py-0.5">
            -{product.discountPercentage}%
          </Badge>
        )}

        {/* Wishlist Button - Responsive size */}
        <button
          onClick={handleWishlistToggle}
          className={`absolute top-2 right-2 sm:top-3 sm:right-3 w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
            inWishlist ? "bg-red-500 text-white" : "bg-white/90 text-foreground hover:bg-white"
          }`}
          aria-label={inWishlist ? "Remove from wishlist" : "Add to wishlist"}
        >
          <Heart className={`w-4 h-4 sm:w-5 sm:h-5 ${inWishlist ? "fill-current" : ""}`} />
        </button>

        {/* Quick View Overlay - Hidden on mobile, shown on hover for larger screens */}
        <div className="absolute inset-0 bg-primary/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 hidden sm:flex items-center justify-center">
          <Link href={`/products/${product.id}`}>
            <Button
              variant="secondary"
              className="bg-white text-primary hover:bg-white/90 font-semibold text-xs sm:text-sm"
            >
              <Eye className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
              Quick View
            </Button>
          </Link>
        </div>
      </div>

      <CardContent className="p-3 sm:p-4 lg:p-5 flex-1 flex flex-col">
        {/* Style Tag */}
        <span className="text-xs text-secondary font-medium uppercase tracking-wider mb-1 sm:mb-2">
          {product.style}
        </span>

        {/* Product Name */}
        <h3 className="font-serif font-semibold text-sm sm:text-base lg:text-lg text-foreground mb-2 sm:mb-3 line-clamp-2 group-hover:text-primary transition-colors">
          {product.name}
        </h3>

        {/* Price - Responsive sizing */}
        <div className="mt-auto flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-2">
          <span className="text-lg sm:text-xl lg:text-2xl font-bold text-primary">
            Rs {product.discountedPrice.toLocaleString()}
          </span>
          {product.originalPrice !== product.discountedPrice && (
            <span className="text-xs sm:text-sm text-muted-foreground line-through">
              Rs {product.originalPrice.toLocaleString()}
            </span>
          )}
        </div>
      </CardContent>

      <CardFooter className="p-3 sm:p-4 lg:p-5 pt-0">
        <Link href={`/products/${product.id}`} className="w-full">
          <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-medium text-xs sm:text-sm h-9 sm:h-10">
            View Details
          </Button>
        </Link>
      </CardFooter>
    </Card>
  )
}
