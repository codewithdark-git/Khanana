"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight, ImageIcon } from "lucide-react"

interface ProductImageSliderProps {
  images: string[]
  alt: string
}

export function ProductImageSlider({ images, alt }: ProductImageSliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0)

  // If no images, show placeholder
  const displayImages = images.length > 0 ? images : [null]

  const goToPrev = () => {
    setCurrentIndex((prev) => (prev - 1 + displayImages.length) % displayImages.length)
  }

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % displayImages.length)
  }

  // Touch / swipe support
  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    ;(e.currentTarget as any)._tx = e.touches[0].clientX
  }
  const handleTouchEnd = (e: React.TouchEvent<HTMLDivElement>) => {
    const start = (e.currentTarget as any)._tx as number | undefined
    const end = e.changedTouches[0].clientX
    if (start !== undefined && displayImages.length > 1) {
      const delta = end - start
      if (delta > 50) goToPrev()
      else if (delta < -50) goToNext()
    }
  }

  return (
    <div className="space-y-3 sm:space-y-4">
      {/* Main Image with crossfade */}
      <div
        className="relative bg-muted rounded-xl sm:rounded-2xl overflow-hidden aspect-square shadow-sm"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {displayImages.some(Boolean) ? (
          displayImages.map((img, idx) => {
            if (!img) return null
            const isActive = idx === currentIndex
            return (
              <img
                key={idx}
                src={img}
                alt={`${alt} - Image ${idx + 1}`}
                loading={idx === 0 ? "eager" : "lazy"}
                decoding="async"
                className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ease-out ${
                  isActive ? "opacity-100" : "opacity-0"
                }`}
              />
            )
          })
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center text-muted-foreground/40">
            <ImageIcon className="w-16 h-16 sm:w-24 sm:h-24 mb-2 sm:mb-4" />
            <span className="text-base sm:text-lg">Product Image</span>
            <span className="text-xs sm:text-sm">(Admin will add image)</span>
          </div>
        )}

        {/* Navigation Arrows */}
        {displayImages.length > 1 && (
          <>
            <button
              onClick={goToPrev}
              className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 bg-white/90 rounded-full shadow-lg flex items-center justify-center hover:bg-white hover:scale-110 active:scale-95 transition-all duration-300 backdrop-blur-sm"
              aria-label="Previous image"
            >
              <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 text-foreground" />
            </button>
            <button
              onClick={goToNext}
              className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 bg-white/90 rounded-full shadow-lg flex items-center justify-center hover:bg-white hover:scale-110 active:scale-95 transition-all duration-300 backdrop-blur-sm"
              aria-label="Next image"
            >
              <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 text-foreground" />
            </button>

            {/* Image counter */}
            <div className="absolute bottom-3 right-3 sm:bottom-4 sm:right-4 px-2 py-1 sm:px-2.5 sm:py-1 rounded-full bg-black/60 backdrop-blur-sm text-white text-xs font-medium tabular-nums">
              {currentIndex + 1} / {displayImages.length}
            </div>
          </>
        )}
      </div>

      {/* Thumbnail Strip */}
      {displayImages.length > 1 && (
        <div className="flex gap-2 sm:gap-3 overflow-x-auto pb-2 scrollbar-hide -mx-1 px-1">
          {displayImages.map((img, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              aria-label={`Go to image ${index + 1}`}
              aria-current={index === currentIndex}
              className={`flex-shrink-0 w-16 h-16 sm:w-20 sm:h-20 rounded-md sm:rounded-lg overflow-hidden border-2 transition-all duration-300 ${
                index === currentIndex
                  ? "border-primary ring-2 ring-primary/20 scale-100"
                  : "border-transparent opacity-60 hover:opacity-100 hover:scale-105"
              }`}
            >
              {img ? (
                <img
                  src={img}
                  alt={`Thumbnail ${index + 1}`}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-muted flex items-center justify-center">
                  <ImageIcon className="w-5 h-5 sm:w-6 sm:h-6 text-muted-foreground/40" />
                </div>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
