"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Sparkles, Award, Truck, HeartHandshake, Leaf, ImageIcon, ChevronLeft, ChevronRight } from "lucide-react"
import { ReviewsSlider } from "@/components/reviews-slider"
import { AboutImage } from "@/components/about-image"
import { useState, useEffect, useCallback, useRef } from "react"

import { type Product } from "@prisma/client"

// ─── Hero Carousel Slides ─────────────────────────────
const heroSlides = [
  {
    key: "shawls",
    badge: "Shawl Collection",
    headline: "Woven by Hand,\nWorn with Pride",
    sub: "Authentic Pathan shawls from the master weavers of Khyber Pakhtunkhwa.",
    cta: "Shop Shawls",
    href: "/products?category=shawl",
    gradient: "from-primary/90 via-primary/50 to-transparent",
  },
  {
    key: "cloth",
    badge: "Cloth Collection",
    headline: "The Fabric\nof Tradition",
    sub: "Premium khaddar & suiting fabric — unstitched, ready to craft your signature look.",
    cta: "Shop Cloth",
    href: "/products?category=cloth",
    gradient: "from-blue-900/90 via-blue-800/50 to-transparent",
  },
  {
    key: "chappal",
    badge: "Chappal Collection",
    headline: "Crafted for\nEvery Step",
    sub: "Handmade Peshawari chappal — timeless comfort meets artisanal craftsmanship.",
    cta: "Shop Chappal",
    href: "/products?category=chappal",
    gradient: "from-amber-900/90 via-amber-800/50 to-transparent",
  },
]

// ─── Category Cards ────────────────────────────────────
const categories = [
  {
    key: "shawl",
    name: "Shawls",
    headline: "Woven by Hand, Worn with Pride",
    sub: "Authentic Pathan shawls from master weavers of KPK",
    href: "/products?category=shawl",
    gradient: "from-primary/80 to-primary/40",
    emoji: "🧣",
  },
  {
    key: "cloth",
    name: "Cloth (Unstitched)",
    headline: "The Fabric of Tradition",
    sub: "Premium khaddar & suiting cloth, unstitched & ready to craft",
    href: "/products?category=cloth",
    gradient: "from-blue-800/80 to-blue-600/40",
    emoji: "🪡",
  },
  {
    key: "chappal",
    name: "Chappal (Footwear)",
    headline: "Crafted for Every Step",
    sub: "Handmade Peshawari chappal, timeless and comfortable",
    href: "/products?category=chappal",
    gradient: "from-amber-700/80 to-amber-600/40",
    emoji: "👞",
  },
]

export default function HomePage() {
  // ─── Hero Carousel State ─────────────────────────────
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length)
  }, [])

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length)
  }, [])

  useEffect(() => {
    if (!isPaused) {
      intervalRef.current = setInterval(nextSlide, 5000)
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [isPaused, nextSlide])

  // ─── Hero Images ─────────────────────────────────────
  const [heroImages, setHeroImages] = useState<string[]>([])

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const res = await fetch("/api/settings")
        const data = await res.json()
        if (data.success && data.data.heroImages && data.data.heroImages.length > 0) {
          setHeroImages(data.data.heroImages)
        }
      } catch (error) {
        console.error("Failed to fetch settings:", error)
      }
    }
    fetchSettings()
  }, [])

  // ─── Featured Products ───────────────────────────────
  const [allProducts, setAllProducts] = useState<Product[]>([])
  const [activeTab, setActiveTab] = useState<"best" | "new">("best")

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("/api/products")
        const data = await res.json()
        if (data.success) {
          setAllProducts(data.data)
        }
      } catch (error) {
        console.error("Failed to fetch products", error)
      }
    }
    fetchProducts()
  }, [])

  const bestSellers = allProducts.filter((p) => p.featured).slice(0, 4)
  const newArrivals = [...allProducts].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()).slice(0, 4)
  const displayProducts = activeTab === "best" ? bestSellers : newArrivals

  const slide = heroSlides[currentSlide]

  return (
    <div className="min-h-screen">
      {/* ═══════════ HERO CAROUSEL ═══════════ */}
      <section
        className="relative min-h-[100svh] flex items-center overflow-hidden"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {/* Background — placeholder or admin image */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-secondary/5 hidden md:block">
           {/* Fallback pattern when transparent */}
        </div>
        <div className="absolute inset-0 transition-opacity duration-1000">
          {heroImages.length > 0 && (
            <img 
              src={heroImages[currentSlide % heroImages.length]} 
              key={currentSlide % heroImages.length}
              alt="Khanana Heritage Collection" 
              className="w-full h-full object-cover animate-in fade-in duration-1000" 
            />
          )}
        </div>

        {/* Gradient overlay per slide */}
        <div className={`absolute inset-0 bg-gradient-to-r ${slide.gradient}`} />

        {/* Decorative circles */}
        <div className="absolute inset-0 opacity-[0.03] hidden sm:block pointer-events-none">
          <div className="absolute top-10 left-10 w-32 h-32 lg:w-64 lg:h-64 border border-white rounded-full" />
          <div className="absolute bottom-10 right-10 w-48 h-48 lg:w-96 lg:h-96 border border-white rounded-full" />
        </div>

        {/* Slide Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32 lg:py-40 w-full">
          <div className="max-w-xl">
            <span className="inline-block px-3 py-1 sm:px-4 sm:py-1.5 bg-white/20 backdrop-blur-sm text-white rounded-full text-xs sm:text-sm font-medium mb-3 sm:mb-4 border border-white/10">
              {slide.badge}
            </span>

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-serif font-bold text-white mb-3 sm:mb-4 leading-tight whitespace-pre-line drop-shadow-lg">
              {slide.headline}
            </h1>

            <p className="text-sm sm:text-base lg:text-lg text-white/85 mb-6 sm:mb-8 max-w-lg leading-relaxed drop-shadow-md">
              {slide.sub}
            </p>

            <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
              <Link href={slide.href}>
                <Button
                  size="lg"
                  className="bg-white text-primary hover:bg-white/90 px-5 sm:px-8 h-11 sm:h-13 text-sm sm:text-base font-semibold shadow-xl w-full sm:w-auto"
                >
                  {slide.cta}
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
              <Link href="/products">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-2 border-white/50 text-white hover:bg-white/10 px-5 sm:px-8 h-11 sm:h-13 text-sm sm:text-base font-semibold bg-transparent w-full sm:w-auto"
                >
                  View All Products
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Navigation Arrows */}
        <button
          onClick={prevSlide}
          className="absolute left-2 sm:left-4 lg:left-8 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-12 sm:h-12 bg-white/15 hover:bg-white/30 backdrop-blur-sm rounded-full flex items-center justify-center text-white transition-all duration-300 border border-white/10"
          aria-label="Previous slide"
        >
          <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-2 sm:right-4 lg:right-8 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-12 sm:h-12 bg-white/15 hover:bg-white/30 backdrop-blur-sm rounded-full flex items-center justify-center text-white transition-all duration-300 border border-white/10"
          aria-label="Next slide"
        >
          <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>

        {/* Dot Indicators */}
        <div className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-2 sm:gap-3">
          {heroSlides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentSlide(idx)}
              className={`transition-all duration-300 rounded-full ${idx === currentSlide
                ? "w-8 sm:w-10 h-2.5 sm:h-3 bg-white"
                : "w-2.5 sm:w-3 h-2.5 sm:h-3 bg-white/40 hover:bg-white/60"
                }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      </section>

      {/* ═══════════ SHOP BY CATEGORY ═══════════ */}
      <section className="py-8 sm:py-12 lg:py-20 bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-6 sm:mb-8 lg:mb-12">
            <span className="inline-block px-3 py-1 sm:px-4 sm:py-1.5 bg-secondary/20 text-secondary-foreground rounded-full text-xs sm:text-sm font-medium mb-2 sm:mb-3 lg:mb-4">
              Shop by Category
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-5xl font-serif font-bold text-foreground mb-2 sm:mb-3 lg:mb-4">
              Explore Our Collections
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto text-xs sm:text-sm lg:text-base">
              Three pillars of Pashtun heritage — each handcrafted with generations of mastery
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-5 lg:gap-8">
            {categories.map((cat) => (
              <Link key={cat.key} href={cat.href} className="group">
                <div className="relative overflow-hidden rounded-xl sm:rounded-2xl bg-muted aspect-[4/5] flex flex-col items-end justify-end border border-border/50 hover:border-primary/30 transition-all duration-500 hover:shadow-2xl hover:shadow-primary/10">
                  <div className={`absolute inset-0 bg-gradient-to-t ${cat.gradient} opacity-80 group-hover:opacity-90 transition-opacity duration-500`} />
                  <div className="absolute inset-0 flex items-center justify-center opacity-20 group-hover:opacity-30 transition-opacity">
                    <span className="text-[120px] sm:text-[100px] lg:text-[140px]">{cat.emoji}</span>
                  </div>
                  <div className="relative z-10 p-4 sm:p-5 lg:p-6 w-full">
                    <h3 className="font-serif font-bold text-white text-lg sm:text-xl lg:text-2xl mb-1 sm:mb-2 drop-shadow-lg">
                      {cat.headline}
                    </h3>
                    <p className="text-white/80 text-xs sm:text-sm lg:text-base mb-3 sm:mb-4 drop-shadow-md leading-relaxed">
                      {cat.sub}
                    </p>
                    <div className="flex items-center text-white font-medium text-sm group-hover:gap-3 gap-2 transition-all duration-300">
                      Shop {cat.name.split(" ")[0]}
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ TRUST BADGES ═══════════ */}
      <section className="py-8 sm:py-12 lg:py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-5 gap-3 sm:gap-4 lg:gap-8">
            {[
              { icon: Sparkles, title: "Master Artisans", desc: "Of KPK" },
              { icon: Leaf, title: "100% Natural", desc: "& Authentic" },
              { icon: HeartHandshake, title: "Fair Trade", desc: "Certified" },
              { icon: Truck, title: "Free Delivery", desc: "Across Pakistan" },
              { icon: Award, title: "Easy Returns", desc: "No Questions" },
            ].map((feature, index) => (
              <div key={index} className="text-center p-3 sm:p-4 lg:p-6">
                <div className="w-10 h-10 sm:w-12 sm:h-12 lg:w-16 lg:h-16 bg-primary/10 rounded-lg sm:rounded-xl lg:rounded-2xl flex items-center justify-center mx-auto mb-2 sm:mb-3 lg:mb-4">
                  <feature.icon className="w-5 h-5 sm:w-6 sm:h-6 lg:w-8 lg:h-8 text-primary" />
                </div>
                <h3 className="font-serif font-bold text-foreground text-xs sm:text-sm lg:text-lg mb-1 lg:mb-2">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground text-xs lg:text-sm hidden sm:block">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ FEATURED COLLECTIONS (TABBED) ═══════════ */}
      <section className="py-8 sm:py-12 lg:py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-6 sm:mb-8 lg:mb-12">
            <span className="inline-block px-3 py-1 sm:px-4 sm:py-1.5 bg-secondary/20 text-secondary-foreground rounded-full text-xs sm:text-sm font-medium mb-2 sm:mb-3 lg:mb-4">
              Featured Collection
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-5xl font-serif font-bold text-foreground mb-4 sm:mb-6">
              Our Finest Pieces
            </h2>

            {/* Tabs */}
            <div className="inline-flex bg-card rounded-xl p-1 border border-border/50 shadow-sm">
              <button
                onClick={() => setActiveTab("best")}
                className={`px-4 sm:px-6 py-2 sm:py-2.5 rounded-lg text-xs sm:text-sm font-medium transition-all duration-300 ${activeTab === "best"
                  ? "bg-primary text-primary-foreground shadow-md"
                  : "text-muted-foreground hover:text-foreground"
                  }`}
              >
                Best Sellers
              </button>
              <button
                onClick={() => setActiveTab("new")}
                className={`px-4 sm:px-6 py-2 sm:py-2.5 rounded-lg text-xs sm:text-sm font-medium transition-all duration-300 ${activeTab === "new"
                  ? "bg-primary text-primary-foreground shadow-md"
                  : "text-muted-foreground hover:text-foreground"
                  }`}
              >
                New Arrivals
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6 mb-6 sm:mb-8 lg:mb-12">
            {displayProducts.map((product) => (
              <Link key={product.id} href={`/products/${product.id}`} className="group">
                <div className="bg-muted rounded-lg sm:rounded-xl lg:rounded-2xl aspect-[3/4] flex flex-col items-center justify-center border border-border/50 overflow-hidden relative">
                  {product.images && product.images.length > 0 ? (
                    <img
                      src={product.images[0]}
                      alt={product.imageAlt || product.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center text-muted-foreground/40">
                      <ImageIcon className="w-8 h-8 sm:w-10 sm:h-10 lg:w-16 lg:h-16 mb-1 sm:mb-2 lg:mb-3" />
                      <p className="text-xs sm:text-sm text-center px-2">{product.name}</p>
                    </div>
                  )}

                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  {/* Category badge */}
                  <span className={`absolute top-2 left-2 sm:top-3 sm:left-3 text-white text-[10px] sm:text-xs font-medium px-2 py-0.5 rounded-full ${product.category === "shawl" ? "bg-emerald-600" : product.category === "cloth" ? "bg-blue-600" : "bg-amber-600"
                    }`}>
                    {product.category === "shawl" ? "Shawl" : product.category === "cloth" ? "Cloth" : "Chappal"}
                  </span>

                  {/* Price overlay on hover */}
                  <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <p className="text-white font-serif font-bold text-sm sm:text-base lg:text-lg truncate">{product.name}</p>
                    <p className="text-white/80 text-xs sm:text-sm">Rs {product.discountedPrice.toLocaleString()}</p>
                  </div>
                </div>
              </Link>
            ))}
            {displayProducts.length === 0 && (
              <div className="col-span-full text-center text-muted-foreground py-12">
                No products found.
              </div>
            )}
          </div>

          <div className="text-center">
            <Link href="/products">
              <Button
                size="lg"
                className="bg-primary hover:bg-primary/90 text-primary-foreground px-4 sm:px-6 lg:px-8 h-10 sm:h-12 lg:h-14 text-sm sm:text-base lg:text-lg font-semibold"
              >
                View All Products
                <ArrowRight className="w-4 h-4 lg:w-5 lg:h-5 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* ═══════════ REVIEWS ═══════════ */}
      <ReviewsSlider />

      {/* ═══════════ ABOUT TEASER ═══════════ */}
      <section className="py-8 sm:py-12 lg:py-20 bg-primary/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 items-center">
            <div className="bg-muted rounded-xl sm:rounded-2xl lg:rounded-3xl w-full aspect-square flex flex-col items-center justify-center border-2 border-dashed border-border overflow-hidden relative">
              <AboutImage />
            </div>
            <div className="text-center lg:text-left">
              <span className="inline-block px-3 py-1 sm:px-4 sm:py-1.5 bg-secondary/20 text-secondary-foreground rounded-full text-xs sm:text-sm font-medium mb-2 sm:mb-3 lg:mb-4">
                About Khanana
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-5xl font-serif font-bold text-foreground mb-3 sm:mb-4 lg:mb-6">
                From Tradition to Elegance
              </h2>
              <p className="text-muted-foreground mb-4 sm:mb-6 leading-relaxed text-xs sm:text-sm lg:text-base">
                Khanana preserves the rich heritage of Khyber Pakhtunkhwa through handcrafted shawls, traditional cloth,
                and artisanal chappal. Every piece is a connection to centuries of culture and craftsmanship.
              </p>
              <Link href="/about">
                <Button
                  variant="outline"
                  size="lg"
                  className="border-2 border-primary text-primary hover:bg-primary/5 bg-transparent text-sm sm:text-base"
                >
                  Read Our Story
                  <ArrowRight className="w-4 h-4 lg:w-5 lg:h-5 ml-2" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════ CTA ═══════════ */}
      <section className="py-8 sm:py-12 lg:py-20 bg-primary text-primary-foreground">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex items-center justify-center gap-2 mb-3 sm:mb-4">
            <span className="inline-flex items-center px-2 py-1 sm:px-3 sm:py-1 bg-white/20 rounded-full text-xs sm:text-sm font-medium">
              <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-green-400 rounded-full mr-1.5 sm:mr-2 animate-pulse" />
              Available 24/7
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-5xl font-serif font-bold mb-3 sm:mb-4 lg:mb-6">
            Get in Touch Today
          </h2>
          <p className="text-primary-foreground/80 text-sm sm:text-base lg:text-lg mb-4 sm:mb-6 lg:mb-8 max-w-2xl mx-auto">
            Have questions? We're here to help. Reach out to us on WhatsApp for personalized assistance.
          </p>
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 lg:gap-4 justify-center">
            <a href="https://wa.me/923496464844" target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto">
              <Button
                size="lg"
                className="bg-white text-primary hover:bg-white/90 px-4 sm:px-6 lg:px-8 h-10 sm:h-12 lg:h-14 text-sm sm:text-base lg:text-lg font-semibold w-full"
              >
                WhatsApp: 0349-6464844
              </Button>
            </a>
            <a href="mailto:khananhkhanana@gmail.com" className="w-full sm:w-auto">
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-white text-white hover:bg-white/10 px-4 sm:px-6 lg:px-8 h-10 sm:h-12 lg:h-14 text-sm sm:text-base lg:text-lg font-semibold bg-transparent w-full"
              >
                Email Us
              </Button>
            </a>
          </div>
          <div className="mt-4 sm:mt-6">
            <a
              href="https://www.tiktok.com/@khananaofficial"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center text-primary-foreground/80 hover:text-primary-foreground transition-colors text-xs sm:text-sm"
            >
              Follow us on TikTok: @khananaofficial
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
