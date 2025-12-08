"use client"

import { useEffect, useState } from "react"
import { Star, Quote, ChevronLeft, ChevronRight } from "lucide-react"
import type { Review } from "@/lib/reviews"

export function ReviewsSlider() {
  const [reviews, setReviews] = useState<Review[]>([])
  const [isPaused, setIsPaused] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    if (isPaused) return

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % reviews.length)
    }, 4000)

    return () => clearInterval(interval)
  }, [isPaused, reviews.length])

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const res = await fetch('/api/reviews')
        const data = await res.json()
        if (data.success) {
          setReviews(data.data)
        }
      } catch (error) {
        console.error("Failed to fetch reviews", error)
      }
    }
    fetchReviews()
  }, [])

  const goToPrev = () => {
    setCurrentIndex((prev) => (prev - 1 + reviews.length) % reviews.length)
  }

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % reviews.length)
  }

  return (
    <section className="py-8 sm:py-12 lg:py-20 bg-primary/5 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-6 sm:mb-8 lg:mb-12">
          <span className="inline-block px-3 py-1 sm:px-4 sm:py-1.5 bg-secondary/20 text-secondary-foreground rounded-full text-xs sm:text-sm font-medium mb-2 sm:mb-3 lg:mb-4">
            Customer Love
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-serif font-bold text-foreground mb-2 sm:mb-3 lg:mb-4">
            What Our Customers Say
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-xs sm:text-sm lg:text-base px-4">
            Read genuine reviews about our authentic Pathan shawls from satisfied customers
          </p>
        </div>

        <div className="relative" onMouseEnter={() => setIsPaused(true)} onMouseLeave={() => setIsPaused(false)}>
          {/* Navigation Buttons - Responsive sizing */}
          <button
            onClick={goToPrev}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 bg-card rounded-full shadow-lg flex items-center justify-center hover:bg-secondary/20 transition-colors -ml-1 sm:-ml-2 lg:ml-0"
            aria-label="Previous review"
          >
            <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-foreground" />
          </button>

          <button
            onClick={goToNext}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 bg-card rounded-full shadow-lg flex items-center justify-center hover:bg-secondary/20 transition-colors -mr-1 sm:-mr-2 lg:mr-0"
            aria-label="Next review"
          >
            <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-foreground" />
          </button>

          {/* Slider Container - Responsive padding */}
          <div className="overflow-hidden px-6 sm:px-8 lg:px-16">
            <div
              className="flex transition-transform duration-500 ease-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {reviews.map((review, index) => (
                <div key={`${review.id}-${index}`} className="w-full flex-shrink-0 px-2 sm:px-4">
                  <ReviewCard review={review} />
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-center gap-1.5 sm:gap-2 mt-4 sm:mt-6 lg:mt-8">
            {reviews.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`h-2 sm:h-2.5 rounded-full transition-all duration-300 ${index === currentIndex ? "bg-primary w-6 sm:w-8" : "bg-primary/30 hover:bg-primary/50 w-2 sm:w-2.5"
                  }`}
                aria-label={`Go to review ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function ReviewCard({ review }: { review: Review }) {
  return (
    <div className="bg-card rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-8 shadow-sm border border-border/50 max-w-3xl mx-auto">
      <div className="flex flex-col items-center text-center">
        {/* Quote Icon - Responsive size */}
        <div className="w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 bg-secondary/20 rounded-full flex items-center justify-center mb-3 sm:mb-4 lg:mb-6">
          <Quote className="w-5 h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7 text-secondary" />
        </div>

        {/* Stars - Responsive size */}
        <div className="flex gap-0.5 sm:gap-1 mb-3 sm:mb-4 lg:mb-6">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`w-4 h-4 sm:w-5 sm:h-5 ${i < review.rating ? "fill-secondary text-secondary" : "text-muted-foreground/30"}`}
            />
          ))}
        </div>

        {/* Review Text - Responsive font size */}
        <p className="text-sm sm:text-base lg:text-lg text-foreground mb-4 sm:mb-5 lg:mb-6 leading-relaxed max-w-2xl">
          "{review.text}"
        </p>

        {/* Reviewer Info - Responsive sizing */}
        <div className="flex flex-col items-center">
          {/* Photo Placeholder */}
          <div className="w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 bg-primary/10 rounded-full flex items-center justify-center mb-2 sm:mb-3 border-2 border-secondary/30">
            <span className="text-base sm:text-lg lg:text-xl font-serif font-bold text-primary">
              {review.name.charAt(0)}
            </span>
          </div>
          <h4 className="font-semibold text-foreground text-sm sm:text-base">{review.name}</h4>
          {review.location && <p className="text-xs sm:text-sm text-muted-foreground">{review.location}</p>}
          {review.verified && (
            <span className="mt-1.5 sm:mt-2 text-xs bg-green-100 text-green-700 px-2 sm:px-3 py-0.5 sm:py-1 rounded-full">
              Verified Purchase
            </span>
          )}
        </div>
      </div>
    </div>
  )
}
