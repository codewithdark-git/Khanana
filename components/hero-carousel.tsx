"use client"

import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"

interface CarouselItem {
  id: string
  alt: string
}

interface HeroCarouselProps {
  items?: CarouselItem[]
}

export default function HeroCarousel({ items = [] }: HeroCarouselProps) {
  const [current, setCurrent] = useState(0)
  const [isAutoPlay, setIsAutoPlay] = useState(true)

  // Default placeholder items if none provided
  const carouselItems =
    items.length > 0
      ? items
      : Array(3)
          .fill(null)
          .map((_, i) => ({ id: `placeholder-${i}`, alt: `Gallery image ${i + 1}` }))

  useEffect(() => {
    if (!isAutoPlay || carouselItems.length <= 1) return

    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % carouselItems.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [isAutoPlay, carouselItems.length])

  const goToPrevious = () => {
    setCurrent((prev) => (prev - 1 + carouselItems.length) % carouselItems.length)
    setIsAutoPlay(false)
  }

  const goToNext = () => {
    setCurrent((prev) => (prev + 1) % carouselItems.length)
    setIsAutoPlay(false)
  }

  const goToSlide = (index: number) => {
    setCurrent(index)
    setIsAutoPlay(false)
  }

  return (
    <div
      className="relative w-full h-96 lg:h-full bg-muted rounded-2xl overflow-hidden group"
      onMouseEnter={() => setIsAutoPlay(false)}
      onMouseLeave={() => setIsAutoPlay(true)}
    >
      {/* Main image area */}
      <div className="relative w-full h-full flex items-center justify-center bg-gradient-to-br from-muted to-muted/50">
        <svg className="w-32 h-32 text-muted-foreground/20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
          />
        </svg>
        <div className="absolute bottom-4 left-4 right-4 text-center">
          <p className="text-muted-foreground text-sm font-sans">Hero Gallery - Add Images in Admin</p>
        </div>
      </div>

      {/* Navigation buttons - visible on hover */}
      {carouselItems.length > 1 && (
        <>
          <button
            onClick={goToPrevious}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-accent/80 hover:bg-accent text-accent-foreground p-2 rounded-full transition-all opacity-0 group-hover:opacity-100 shadow-lg"
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <button
            onClick={goToNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-accent/80 hover:bg-accent text-accent-foreground p-2 rounded-full transition-all opacity-0 group-hover:opacity-100 shadow-lg"
            aria-label="Next slide"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          {/* Dot indicators */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 flex gap-2">
            {carouselItems.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-2 h-2 rounded-full transition-all ${
                  index === current ? "bg-accent w-6" : "bg-accent/40 hover:bg-accent/60"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  )
}
