"use client"

import Link from "next/link"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import type { Product } from "@/lib/products"
import { useLanguage } from "@/contexts/language-context"
import { useWishlist } from "@/contexts/wishlist-context"
import { ShoppingCart, Heart } from "lucide-react"

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  const { language } = useLanguage()
  const { isInWishlist, addToWishlist, removeFromWishlist } = useWishlist()
  const inWishlist = isInWishlist(product.id)

  const name = language === "ar" ? product.nameAr : product.name
  const description = language === "ar" ? product.descriptionAr : product.description

  const handleWishlistToggle = () => {
    if (inWishlist) {
      removeFromWishlist(product.id)
    } else {
      addToWishlist(product.id)
    }
  }

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow h-full flex flex-col">
      <div className="relative overflow-hidden bg-muted h-64">
        <img
          src={product.image || "/placeholder.svg"}
          alt={product.imageAlt}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
        />
        {product.discountPercentage > 0 && (
          <Badge className="absolute top-3 right-3 bg-destructive text-white">-{product.discountPercentage}%</Badge>
        )}
      </div>

      <CardContent className="p-4 flex-1 flex flex-col">
        <h3 className="font-semibold text-lg text-foreground mb-2 line-clamp-2">{name}</h3>
        <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{description}</p>

        <div className="mt-auto">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold text-accent">Rs {product.discountedPrice}</span>
              <span className="text-sm text-muted-foreground line-through">Rs {product.originalPrice}</span>
            </div>
          </div>
        </div>
      </CardContent>

      <CardFooter className="p-4 pt-0 flex gap-2">
        <Link href={`/products/${product.id}`} className="flex-1">
          <Button className="w-full bg-accent hover:bg-accent/90 text-accent-foreground">
            <ShoppingCart className="w-4 h-4 mr-2" />
            View Details
          </Button>
        </Link>
        <Button variant="outline" size="icon" onClick={handleWishlistToggle} className={inWishlist ? "bg-red-50" : ""}>
          <Heart className={`w-4 h-4 ${inWishlist ? "fill-red-500 text-red-500" : ""}`} />
        </Button>
      </CardFooter>
    </Card>
  )
}
