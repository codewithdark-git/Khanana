"use client"

import { useEffect, useState } from "react"
import { ProductCard } from "@/components/product-card"
import type { Product } from "@/lib/products"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, SlidersHorizontal, X } from "lucide-react"

const PRICE_RANGES = [
  { label: "Under Rs 3,000", min: 0, max: 3000 },
  { label: "Rs 3,000 - Rs 5,000", min: 3000, max: 5000 },
  { label: "Rs 5,000 - Rs 7,000", min: 5000, max: 7000 },
  { label: "Above Rs 7,000", min: 7000, max: Number.POSITIVE_INFINITY },
]

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedStyle, setSelectedStyle] = useState<string | null>(null)
  const [selectedPriceRange, setSelectedPriceRange] = useState<(typeof PRICE_RANGES)[0] | null>(null)
  const [showFilters, setShowFilters] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("/api/products")
        const data = await response.json()
        if (data.success) {
          setProducts(data.data)
          setFilteredProducts(data.data)
        }
      } catch (error) {
        console.error("Failed to fetch products:", error)
      } finally {
        setIsLoading(false)
      }
    }
    fetchProducts()
  }, [])

  useEffect(() => {
    let filtered = products

    if (searchQuery) {
      filtered = filtered.filter((p) => {
        const query = searchQuery.toLowerCase()
        return p.name.toLowerCase().includes(query) || p.description.toLowerCase().includes(query)
      })
    }

    if (selectedStyle) {
      filtered = filtered.filter((p) => p.style === selectedStyle)
    }

    if (selectedPriceRange) {
      filtered = filtered.filter(
        (p) => p.discountedPrice >= selectedPriceRange.min && p.discountedPrice < selectedPriceRange.max,
      )
    }

    setFilteredProducts(filtered)
  }, [searchQuery, selectedStyle, selectedPriceRange, products])

  const styles = Array.from(new Set(products.map((p) => p.style)))
  const activeFiltersCount = [selectedStyle, selectedPriceRange].filter(Boolean).length

  const clearAllFilters = () => {
    setSelectedStyle(null)
    setSelectedPriceRange(null)
    setSearchQuery("")
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background py-8 sm:py-12 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-muted rounded-lg sm:rounded-xl aspect-[4/5] animate-pulse" />
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <section className="bg-primary/5 py-8 sm:py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-block px-3 py-1 sm:px-4 sm:py-1.5 bg-secondary/20 text-secondary-foreground rounded-full text-xs sm:text-sm font-medium mb-2 sm:mb-3 lg:mb-4">
            Our Collection
          </span>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-serif font-bold text-foreground mb-2 sm:mb-3 lg:mb-4">
            Khanana Pathan Shawls
          </h1>
          <p className="text-sm sm:text-base lg:text-lg text-muted-foreground max-w-2xl mx-auto px-4">
            Discover our authentic collection of handwoven Pathan shawls, crafted with traditional Pashtun artistry
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12">
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-6 sm:mb-8">
          {/* Search Input */}
          <div className="relative flex-1">
            <Search className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-muted-foreground" />
            <Input
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 sm:pl-12 h-10 sm:h-12 bg-card border-border/50 text-sm sm:text-base"
            />
          </div>

          {/* Filter Toggle Button */}
          <Button
            variant="outline"
            onClick={() => setShowFilters(!showFilters)}
            className="h-10 sm:h-12 px-4 sm:px-6 border-border/50 text-sm sm:text-base"
          >
            <SlidersHorizontal className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
            Filters
            {activeFiltersCount > 0 && (
              <span className="ml-2 w-5 h-5 sm:w-6 sm:h-6 bg-primary text-primary-foreground rounded-full text-xs sm:text-sm flex items-center justify-center">
                {activeFiltersCount}
              </span>
            )}
          </Button>
        </div>

        {showFilters && (
          <div className="bg-card rounded-lg sm:rounded-xl p-4 sm:p-6 mb-6 sm:mb-8 border border-border/50">
            <div className="flex items-center justify-between mb-4 sm:mb-6">
              <h3 className="font-semibold text-foreground text-sm sm:text-base">Filter Products</h3>
              {activeFiltersCount > 0 && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={clearAllFilters}
                  className="text-muted-foreground text-xs sm:text-sm"
                >
                  <X className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                  Clear All
                </Button>
              )}
            </div>

            <div className="grid grid-cols-1 gap-4 sm:gap-6">
              {/* Style Filter */}
              <div>
                <label className="block text-xs sm:text-sm font-medium text-foreground mb-2 sm:mb-3">Style</label>
                <div className="flex flex-wrap gap-1.5 sm:gap-2">
                  <Button
                    variant={selectedStyle === null ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedStyle(null)}
                    className={`text-xs sm:text-sm h-8 sm:h-9 ${selectedStyle === null ? "bg-primary text-primary-foreground" : ""}`}
                  >
                    All Styles
                  </Button>
                  {styles.map((style) => (
                    <Button
                      key={style}
                      variant={selectedStyle === style ? "default" : "outline"}
                      size="sm"
                      onClick={() => setSelectedStyle(style)}
                      className={`text-xs sm:text-sm h-8 sm:h-9 ${selectedStyle === style ? "bg-primary text-primary-foreground" : ""}`}
                    >
                      {style}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Price Range Filter */}
              <div>
                <label className="block text-xs sm:text-sm font-medium text-foreground mb-2 sm:mb-3">Price Range</label>
                <div className="flex flex-wrap gap-1.5 sm:gap-2">
                  <Button
                    variant={selectedPriceRange === null ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedPriceRange(null)}
                    className={`text-xs sm:text-sm h-8 sm:h-9 ${selectedPriceRange === null ? "bg-primary text-primary-foreground" : ""}`}
                  >
                    All Prices
                  </Button>
                  {PRICE_RANGES.map((range) => (
                    <Button
                      key={range.label}
                      variant={selectedPriceRange?.label === range.label ? "default" : "outline"}
                      size="sm"
                      onClick={() => setSelectedPriceRange(range)}
                      className={`text-xs sm:text-sm h-8 sm:h-9 ${selectedPriceRange?.label === range.label ? "bg-primary text-primary-foreground" : ""}`}
                    >
                      {range.label}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="flex items-center justify-between mb-4 sm:mb-6">
          <p className="text-muted-foreground text-xs sm:text-sm">
            Showing <span className="font-semibold text-foreground">{filteredProducts.length}</span> of{" "}
            <span className="font-semibold text-foreground">{products.length}</span> products
          </p>
        </div>

        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 sm:py-16 lg:py-20 bg-muted/50 rounded-lg sm:rounded-xl">
            <p className="text-muted-foreground text-sm sm:text-base lg:text-lg mb-3 sm:mb-4">
              No products found matching your criteria.
            </p>
            <Button onClick={clearAllFilters} variant="outline" className="text-sm sm:text-base bg-transparent">
              Clear Filters
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
