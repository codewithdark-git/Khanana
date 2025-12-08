"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Sparkles, Award, Truck, HeartHandshake, ImageIcon } from "lucide-react"
import { ReviewsSlider } from "@/components/reviews-slider"
import { AboutImage } from "@/components/about-image"
import { useState, useEffect } from "react"

import { type Product } from "@prisma/client"

export default function HomePage() {
  const [heroImage, setHeroImage] = useState<string | null>(null)

  useEffect(() => {
    const savedHeroImage = localStorage.getItem("heroImage")
    if (savedHeroImage) {
      setHeroImage(savedHeroImage)
    }
  }, [])

  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([])

  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        const res = await fetch('/api/products?featured=true')
        const data = await res.json()
        if (data.success) {
          setFeaturedProducts(data.data.slice(0, 4))
        }
      } catch (error) {
        console.error("Failed to fetch featured products", error)
      }
    }
    fetchFeatured()
  }, [])

  return (
    <div className="min-h-screen">
      <section className="relative bg-gradient-to-br from-primary/5 via-background to-secondary/5 min-h-[100svh] flex items-center overflow-hidden pt-24 pb-12 sm:pt-32 sm:pb-16 lg:pt-40 lg:pb-24">
        {/* Decorative Pattern - Hidden on mobile */}
        <div className="absolute inset-0 opacity-5 hidden sm:block">
          <div className="absolute top-10 left-10 w-32 h-32 lg:w-64 lg:h-64 border border-primary rounded-full" />
          <div className="absolute bottom-10 right-10 w-48 h-48 lg:w-96 lg:h-96 border border-secondary rounded-full" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 items-center">
            {/* Hero Content */}
            <div className="text-center lg:text-left order-2 lg:order-1">
              <span className="inline-block px-3 py-1 sm:px-4 sm:py-1.5 bg-secondary/20 text-secondary-foreground rounded-full text-xs sm:text-sm font-medium mb-3 sm:mb-4">
                Authentic Pashtun Heritage
              </span>

              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-foreground mb-3 sm:mb-4 leading-tight">
                <span className="text-primary">Khanana</span>
                <br />
                <span className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-normal text-muted-foreground">
                  The Essence of Original Wool
                </span>
              </h1>

              <p className="text-sm sm:text-base lg:text-lg text-muted-foreground mb-4 sm:mb-6 max-w-lg mx-auto lg:mx-0 leading-relaxed">
                Discover exquisite handwoven Pathan shawls from the heart of Khyber Pakhtunkhwa. Each piece tells a
                story of tradition, culture, and unparalleled craftsmanship.
              </p>

              <div className="flex items-center justify-center lg:justify-start gap-2 mb-4 sm:mb-6">
                <span className="inline-flex items-center px-2 py-1 sm:px-3 sm:py-1.5 bg-green-500/10 text-green-600 rounded-full text-xs sm:text-sm font-medium">
                  <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-green-500 rounded-full mr-1.5 sm:mr-2 animate-pulse" />
                  Available 24/7
                </span>
              </div>

              <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 justify-center lg:justify-start">
                <Link href="/products" className="w-full sm:w-auto">
                  <Button
                    size="lg"
                    className="bg-primary hover:bg-primary/90 text-primary-foreground px-4 sm:px-6 h-10 sm:h-12 text-sm sm:text-base font-semibold w-full"
                  >
                    Explore Collection
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
                <Link href="/about" className="w-full sm:w-auto">
                  <Button
                    size="lg"
                    variant="outline"
                    className="px-4 sm:px-6 h-10 sm:h-12 text-sm sm:text-base font-semibold border-2 border-primary text-primary hover:bg-primary/5 bg-transparent w-full"
                  >
                    Our Story
                  </Button>
                </Link>
              </div>
            </div>

            <div className="relative order-1 lg:order-2 flex justify-center">
              <div className="bg-muted rounded-xl sm:rounded-2xl lg:rounded-3xl w-full max-w-sm lg:max-w-md aspect-[4/4] flex flex-col items-center justify-center border-2 border-dashed border-border overflow-hidden relative">
                {heroImage ? (
                  <img src={heroImage} alt="Hero" className="w-full h-full object-cover" />
                ) : (
                  <>
                    <ImageIcon className="w-10 h-10 sm:w-14 sm:h-14 lg:w-20 lg:h-20 text-muted-foreground/30 mb-2 sm:mb-3" />
                    <p className="text-muted-foreground/50 text-center px-4 text-xs sm:text-sm lg:text-base">
                      Hero Image
                      <br />
                      <span className="text-xs">(Admin will add)</span>
                    </p>
                  </>
                )}
              </div>
              {/* Decorative Badge */}
              <div className="absolute -bottom-2 -left-2 sm:-bottom-3 sm:-left-3 lg:-bottom-4 lg:-left-4 bg-secondary text-secondary-foreground px-3 py-1.5 sm:px-4 sm:py-2 lg:px-6 lg:py-3 rounded-lg sm:rounded-xl shadow-lg">
                <span className="font-serif font-bold text-xs sm:text-sm lg:text-lg">Since 2020</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-8 sm:py-12 lg:py-20 bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-8">
            {[
              { icon: Sparkles, title: "Handcrafted", desc: "Traditional techniques" },
              { icon: Award, title: "Premium Quality", desc: "Finest wool materials" },
              { icon: Truck, title: "Free Delivery", desc: "Across Pakistan" },
              { icon: HeartHandshake, title: "Satisfaction", desc: "Easy returns policy" },
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

      <section className="py-8 sm:py-12 lg:py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-6 sm:mb-8 lg:mb-12">
            <span className="inline-block px-3 py-1 sm:px-4 sm:py-1.5 bg-secondary/20 text-secondary-foreground rounded-full text-xs sm:text-sm font-medium mb-2 sm:mb-3 lg:mb-4">
              Featured Collection
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-5xl font-serif font-bold text-foreground mb-2 sm:mb-3 lg:mb-4">
              Our Finest Shawls
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto text-xs sm:text-sm lg:text-base">
              Explore our most popular and beautifully crafted shawls
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6 mb-6 sm:mb-8 lg:mb-12">
            {featuredProducts.map((product) => (
              <div
                key={product.id}
                className="bg-muted rounded-lg sm:rounded-xl lg:rounded-2xl aspect-[3/4] flex flex-col items-center justify-center border-2 border-dashed border-border overflow-hidden relative group"
              >
                {product.image ? (
                  <img src={product.image} alt={product.imageAlt} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110" />
                ) : (
                  <>
                    <ImageIcon className="w-8 h-8 sm:w-10 sm:h-10 lg:w-16 lg:h-16 text-muted-foreground/30 mb-1 sm:mb-2 lg:mb-3" />
                    <p className="text-muted-foreground/50 text-xs sm:text-sm">{product.name}</p>
                  </>
                )}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <span className="text-white font-serif font-bold text-lg">Rs {product.discountedPrice}</span>
                </div>
              </div>
            ))}
            {featuredProducts.length === 0 && (
              <div className="col-span-full text-center text-muted-foreground">
                No featured products found.
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

      {/* Reviews Slider Section */}
      <ReviewsSlider />

      {/* About Khanana Section */}
      <section className="py-8 sm:py-12 lg:py-20 bg-primary/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 items-center">

            <div className="bg-muted rounded-xl sm:rounded-2xl lg:rounded-3xl w-full aspect-square flex flex-col items-center justify-center border-2 border-dashed border-border overflow-hidden relative">
              <AboutImage />
            </div>

            {/* Content */}
            <div className="text-center lg:text-left">
              <span className="inline-block px-3 py-1 sm:px-4 sm:py-1.5 bg-secondary/20 text-secondary-foreground rounded-full text-xs sm:text-sm font-medium mb-2 sm:mb-3 lg:mb-4">
                About Khanana
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-5xl font-serif font-bold text-foreground mb-3 sm:mb-4 lg:mb-6">
                From Tradition to Elegance
              </h2>
              <p className="text-muted-foreground mb-4 sm:mb-6 leading-relaxed text-xs sm:text-sm lg:text-base">
                Khanana is dedicated to preserving the rich heritage of Khyber Pakhtunkhwa. Our shawls are crafted by
                skilled artisans using techniques passed down through generations.
              </p>
              <Link href="/about">
                <Button
                  variant="outline"
                  size="lg"
                  className="border-2 border-primary text-primary hover:bg-primary/5 bg-transparent text-sm sm:text-base"
                >
                  Learn More
                  <ArrowRight className="w-4 h-4 lg:w-5 lg:h-5 ml-2" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

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
