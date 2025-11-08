"use client"

import { useEffect, useState, useMemo } from "react"
import { ProductCard } from "@/components/product-card"
import type { Product } from "@/lib/products"
import { useLanguage } from "@/contexts/language-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Filter, X } from "lucide-react"
import { Pagination } from "@/components/pagination"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const ITEMS_PER_PAGE = 12

export default function ProductsPage() {
  const { t, language } = useLanguage()
  const [products, setProducts] = useState<Product[]>([])
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedStyle, setSelectedStyle] = useState<string | null>(null)
  const [sortBy, setSortBy] = useState<string>("newest")
  const [currentPage, setCurrentPage] = useState(1)
  const [isLoading, setIsLoading] = useState(true)
  const [showMobileFilters, setShowMobileFilters] = useState(false)

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

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter((p) => {
        const name = language === 'ar' ? p.nameAr : p.name
        const description = language === 'ar' ? p.descriptionAr : p.description
        const query = searchQuery.toLowerCase()
        return name.toLowerCase().includes(query) || description.toLowerCase().includes(query) || p.style.toLowerCase().includes(query)
      })
    }

    // Filter by style
    if (selectedStyle) {
      filtered = filtered.filter((p) => p.style === selectedStyle)
    }

    setFilteredProducts(filtered)
  }, [searchQuery, selectedStyle, products, language])

  const styles = useMemo(() => 
    Array.from(new Set(products.map((p) => p.style)))
  , [products])

  // Sort products
  const sortedProducts = useMemo(() => {
    const filtered = [...filteredProducts]
    switch (sortBy) {
      case 'price-low':
        return filtered.sort((a, b) => a.discountedPrice - b.discountedPrice)
      case 'price-high':
        return filtered.sort((a, b) => b.discountedPrice - a.discountedPrice)
      case 'name-asc':
        return filtered.sort((a, b) => a.name.localeCompare(b.name))
      case 'name-desc':
        return filtered.sort((a, b) => b.name.localeCompare(a.name))
      case 'newest':
      default:
        // If we had a createdAt field, we would use it here
        // For now, sort by ID as a fallback
        return filtered.sort((a, b) => a.id.localeCompare(b.id))
    }
  }, [filteredProducts, sortBy])

  // Pagination
  const totalPages = Math.ceil(sortedProducts.length / ITEMS_PER_PAGE)
  const paginatedProducts = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
    return sortedProducts.slice(startIndex, startIndex + ITEMS_PER_PAGE)
  }, [sortedProducts, currentPage])

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-muted-foreground">Loading products...</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background py-8 md:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8 md:mb-12 text-center md:text-left">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-3">KHANANA Pathan Shawls</h1>
          <p className="text-muted-foreground max-w-3xl mx-auto md:mx-0">
            Discover our authentic collection of handwoven Pathan shawls, crafted with traditional Pashtun artistry.
          </p>
        </div>

        {/* Search and Filters */}
        <div className="mb-6 space-y-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value)
                  setCurrentPage(1)
                }}
                className="pl-10 h-11"
              />
            </div>
            
            <div className="flex gap-2">
              <Select
                value={sortBy}
                onValueChange={(value) => {
                  setSortBy(value)
                  setCurrentPage(1)
                }}
              >
                <SelectTrigger className="w-[180px] h-11">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="newest">Newest</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                  <SelectItem value="name-asc">Name: A to Z</SelectItem>
                  <SelectItem value="name-desc">Name: Z to A</SelectItem>
                </SelectContent>
              </Select>

              <Button 
                variant="outline" 
                size="sm" 
                className="md:hidden h-11 px-3"
                onClick={() => setShowMobileFilters(!showMobileFilters)}
              >
                <Filter className="w-4 h-4 mr-1" />
                Filters
              </Button>
            </div>
          </div>

          {/* Mobile Filters */}
          {showMobileFilters && (
            <div className="md:hidden p-4 border rounded-lg bg-card">
              <div className="flex justify-between items-center mb-3">
                <h3 className="font-medium">Filters</h3>
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => setShowMobileFilters(false)}
                  className="h-8 w-8 p-0"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
              <div className="space-y-3">
                <div className="space-y-2">
                  <p className="text-sm font-medium">Style</p>
                  <div className="flex flex-wrap gap-2">
                    <Button
                      variant={selectedStyle === null ? "default" : "outline"}
                      size="sm"
                      onClick={() => {
                        setSelectedStyle(null)
                        setCurrentPage(1)
                      }}
                      className={selectedStyle === null ? "bg-accent hover:bg-accent/90 text-accent-foreground" : ""}
                    >
                      All Styles
                    </Button>
                    {styles.map((style) => (
                      <Button
                        key={style}
                        variant={selectedStyle === style ? "default" : "outline"}
                        size="sm"
                        onClick={() => {
                          setSelectedStyle(style)
                          setCurrentPage(1)
                        }}
                        className={selectedStyle === style ? "bg-accent hover:bg-accent/90 text-accent-foreground" : ""}
                      >
                        {style}
                      </Button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Desktop Filters */}
          <div className="hidden md:block">
            <div className="flex flex-wrap gap-2">
              <Button
                variant={selectedStyle === null ? "default" : "outline"}
                onClick={() => {
                  setSelectedStyle(null)
                  setCurrentPage(1)
                }}
                className={selectedStyle === null ? "bg-accent hover:bg-accent/90 text-accent-foreground" : ""}
              >
                All Styles
              </Button>
              {styles.map((style) => (
                <Button
                  key={style}
                  variant={selectedStyle === style ? "default" : "outline"}
                  onClick={() => {
                    setSelectedStyle(style)
                    setCurrentPage(1)
                  }}
                  className={selectedStyle === style ? "bg-accent hover:bg-accent/90 text-accent-foreground" : ""}
                >
                  {style}
                </Button>
              ))}
            </div>
          </div>
        </div>

        {/* Products Grid */}
        {paginatedProducts.length > 0 ? (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {paginatedProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="mt-12">
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={handlePageChange}
                />
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-16 border rounded-lg bg-card">
            <div className="mx-auto w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
              <Search className="w-8 h-8 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-medium text-foreground mb-1">No products found</h3>
            <p className="text-muted-foreground max-w-md mx-auto">
              We couldn't find any products matching your criteria. Try adjusting your search or filters.
            </p>
            {(searchQuery || selectedStyle) && (
              <Button 
                variant="outline" 
                className="mt-4"
                onClick={() => {
                  setSearchQuery('')
                  setSelectedStyle(null)
                  setCurrentPage(1)
                }}
              >
                Clear all filters
              </Button>
            )}
          </div>
        )}

        {/* Results Count */}
        {filteredProducts.length > 0 && (
          <div className="mt-6 text-sm text-muted-foreground text-center md:text-right">
            Showing {Math.min((currentPage - 1) * ITEMS_PER_PAGE + 1, filteredProducts.length)} to{' '}
            {Math.min(currentPage * ITEMS_PER_PAGE, filteredProducts.length)} of {filteredProducts.length} products
          </div>
        )}
      </div>
    </div>
  )
}
