"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Star } from "lucide-react"
import { toast } from "sonner"
import type { Review } from "@/lib/reviews"

export default function ReviewsPage() {
  const [reviews, setReviews] = useState<Review[]>([])
  const [formData, setFormData] = useState({ name: "", rating: 5, text: "" })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const averageRating =
    reviews.length > 0 ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1) : "0"

  const ratingDistribution = [5, 4, 3, 2, 1].map((rating) => ({
    rating,
    count: reviews.filter((r) => r.rating === rating).length,
    percentage: (reviews.filter((r) => r.rating === rating).length / reviews.length) * 100,
  }))

  useEffect(() => {
    fetchReviews()
  }, [])

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const res = await fetch('/api/reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          rating: formData.rating,
          text: formData.text,
          location: "Online Customer"
        })
      })

      const data = await res.json()

      if (data.success) {
        setReviews([data.data, ...reviews])
        setFormData({ name: "", rating: 5, text: "" })
        toast.success("Review submitted successfully!")
      } else {
        toast.error("Failed to submit review")
      }
    } catch (error) {
      toast.error("Error submitting review")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <section className="bg-primary/5 py-8 sm:py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-block px-3 py-1 sm:px-4 sm:py-1.5 bg-secondary/20 text-secondary-foreground rounded-full text-xs sm:text-sm font-medium mb-2 sm:mb-3 lg:mb-4">
            Customer Feedback
          </span>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-serif font-bold text-foreground mb-2 sm:mb-3 lg:mb-4">
            Reviews & Testimonials
          </h1>
          <p className="text-sm sm:text-base lg:text-lg text-muted-foreground max-w-2xl mx-auto px-4">
            Read what our satisfied customers have to say about Khanana Pathan Shawls
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-12">
          <div className="lg:col-span-1 order-2 lg:order-1">
            <Card className="lg:sticky lg:top-24">
              <CardContent className="p-4 sm:p-6">
                {/* Overall Rating */}
                <div className="text-center mb-6 sm:mb-8">
                  <div className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold text-foreground mb-2">
                    {averageRating}
                  </div>
                  <div className="flex justify-center gap-0.5 sm:gap-1 mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-5 h-5 sm:w-6 sm:h-6 ${i < Math.round(Number(averageRating))
                          ? "fill-secondary text-secondary"
                          : "text-muted-foreground/30"
                          }`}
                      />
                    ))}
                  </div>
                  <p className="text-muted-foreground text-xs sm:text-sm">Based on {reviews.length} reviews</p>
                </div>

                {/* Rating Distribution */}
                <div className="space-y-2 sm:space-y-3">
                  {ratingDistribution.map(({ rating, count, percentage }) => (
                    <div key={rating} className="flex items-center gap-2 sm:gap-3">
                      <span className="text-xs sm:text-sm font-medium w-6 sm:w-8">{rating} ★</span>
                      <div className="flex-1 h-1.5 sm:h-2 bg-muted rounded-full overflow-hidden">
                        <div
                          className="h-full bg-secondary rounded-full transition-all duration-500"
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                      <span className="text-xs sm:text-sm text-muted-foreground w-6 sm:w-8">{count}</span>
                    </div>
                  ))}
                </div>

                {/* Write Review Button */}
                <Button
                  className="w-full mt-6 sm:mt-8 bg-primary hover:bg-primary/90 text-primary-foreground text-sm sm:text-base h-10 sm:h-11"
                  onClick={() => document.getElementById("review-form")?.scrollIntoView({ behavior: "smooth" })}
                >
                  Write a Review
                </Button>
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-2 space-y-4 sm:space-y-6 order-1 lg:order-2">
            {/* Review Form */}
            <Card id="review-form" className="mb-6 sm:mb-8">
              <CardContent className="p-4 sm:p-6">
                <h3 className="font-serif font-bold text-lg sm:text-xl text-foreground mb-4 sm:mb-6">
                  Write Your Review
                </h3>
                <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-foreground mb-1.5 sm:mb-2">
                      Your Name
                    </label>
                    <Input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Enter your name"
                      required
                      className="h-10 sm:h-12 text-sm sm:text-base"
                    />
                  </div>

                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-foreground mb-1.5 sm:mb-2">
                      Rating
                    </label>
                    <div className="flex gap-1 sm:gap-2">
                      {[1, 2, 3, 4, 5].map((rating) => (
                        <button
                          key={rating}
                          type="button"
                          onClick={() => setFormData({ ...formData, rating })}
                          className="focus:outline-none transition-transform hover:scale-110"
                        >
                          <Star
                            className={`w-8 h-8 sm:w-10 sm:h-10 ${rating <= formData.rating ? "fill-secondary text-secondary" : "text-muted-foreground/30"
                              }`}
                          />
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-foreground mb-1.5 sm:mb-2">
                      Your Review
                    </label>
                    <textarea
                      value={formData.text}
                      onChange={(e) => setFormData({ ...formData, text: e.target.value })}
                      placeholder="Share your experience..."
                      rows={4}
                      className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-border rounded-lg bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary resize-none text-sm sm:text-base"
                      required
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full h-10 sm:h-12 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold text-sm sm:text-base"
                  >
                    {isSubmitting ? "Submitting..." : "Submit Review"}
                  </Button>
                </form>
              </CardContent>
            </Card>

            {reviews.map((review) => (
              <Card key={review.id} className="overflow-hidden">
                <CardContent className="p-4 sm:p-6">
                  <div className="flex items-start gap-3 sm:gap-4">
                    {/* Avatar - Responsive size */}
                    <div className="w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 border-2 border-secondary/30">
                      {review.photo ? (
                        <img
                          src={review.photo || "/placeholder.svg"}
                          alt={review.name}
                          className="w-full h-full object-cover rounded-full"
                        />
                      ) : (
                        <span className="text-base sm:text-lg lg:text-xl font-serif font-bold text-primary">
                          {review.name.charAt(0)}
                        </span>
                      )}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-1 sm:gap-2 mb-2">
                        <div>
                          <div className="flex items-center gap-2 flex-wrap">
                            <h4 className="font-semibold text-foreground text-sm sm:text-base">{review.name}</h4>
                            {review.verified && (
                              <span className="text-xs bg-green-100 text-green-700 px-1.5 sm:px-2 py-0.5 rounded-full">
                                Verified
                              </span>
                            )}
                          </div>
                          {review.location && (
                            <p className="text-xs sm:text-sm text-muted-foreground">{review.location}</p>
                          )}
                        </div>
                        <span className="text-xs sm:text-sm text-muted-foreground">
                          {new Date(review.date).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          })}
                        </span>
                      </div>

                      {/* Stars */}
                      <div className="flex gap-0.5 mb-2 sm:mb-3">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-3 h-3 sm:w-4 sm:h-4 ${i < review.rating ? "fill-secondary text-secondary" : "text-muted-foreground/30"
                              }`}
                          />
                        ))}
                      </div>

                      {/* Review Text */}
                      <p className="text-foreground leading-relaxed text-xs sm:text-sm lg:text-base">{review.text}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
