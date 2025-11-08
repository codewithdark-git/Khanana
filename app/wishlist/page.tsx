"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { useWishlist } from "@/contexts/wishlist-context"
import { ProductCard } from "@/components/product-card"
import type { Product } from "@/lib/products"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowLeft, Heart } from "lucide-react"

export default function WishlistPage() {
  const { wishlist, clearWishlist } = useWishlist()
  const [products, setProducts] = useState<Product[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("/api/products")
        const data = await response.json()
        if (data.success) {
          const wishlistProducts = data.data.filter((p: Product) => wishlist.includes(p.id))
          setProducts(wishlistProducts)
        }
      } catch (error) {
        console.error("Failed to fetch products:", error)
      } finally {
        setIsLoading(false)
      }
    }

    if (wishlist.length > 0) {
      fetchProducts()
    } else {
      setIsLoading(false)
    }
  }, [wishlist])

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <Link href="/products" className="inline-flex items-center text-accent hover:text-accent/80 mb-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Products
          </Link>
          <h1 className="text-4xl font-bold text-foreground mb-2 flex items-center gap-2">
            <Heart className="w-8 h-8 fill-red-500 text-red-500" />
            My Wishlist
          </h1>
          <p className="text-lg text-muted-foreground">
            {wishlist.length} {wishlist.length === 1 ? "item" : "items"} saved
          </p>
        </div>

        {isLoading ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">Loading wishlist...</p>
          </div>
        ) : wishlist.length === 0 ? (
          <Card>
            <CardContent className="p-12 text-center">
              <Heart className="w-16 h-16 text-muted-foreground mx-auto mb-4 opacity-50" />
              <h2 className="text-2xl font-semibold text-foreground mb-2">Your wishlist is empty</h2>
              <p className="text-muted-foreground mb-6">
                Start adding your favorite KHANAN Pathan Shawls to your wishlist!
              </p>
              <Link href="/products">
                <Button className="bg-accent hover:bg-accent/90 text-accent-foreground">Browse Products</Button>
              </Link>
            </CardContent>
          </Card>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>

            <div className="flex justify-center">
              <Button
                variant="outline"
                onClick={clearWishlist}
                className="text-destructive hover:text-destructive bg-transparent"
              >
                Clear Wishlist
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
