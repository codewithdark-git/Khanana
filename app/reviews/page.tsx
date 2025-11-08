"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useLanguage } from "@/contexts/language-context"
import { Star } from "lucide-react"

interface Review {
  id: string
  name: string
  rating: number
  text: string
  date: string
  verified: boolean
}

// Sample reviews - admin will add real reviews later
const sampleReviews: Review[] = [
  {
    id: "1",
    name: "Ahmed Hassan",
    rating: 5,
    text: "Exceptional quality and authentic craftsmanship. The shawl arrived perfectly packaged and exceeded my expectations.",
    date: "2025-01-15",
    verified: true,
  },
  {
    id: "2",
    name: "Fatima Khan",
    rating: 5,
    text: "Beautiful design and premium material. I've received many compliments on this shawl. Highly recommended!",
    date: "2025-01-10",
    verified: true,
  },
  {
    id: "3",
    name: "Muhammad Ali",
    rating: 4,
    text: "Great product with fast delivery. The color is exactly as shown in the pictures.",
    date: "2025-01-05",
    verified: true,
  },
]

export default function ReviewsPage() {
  const { t } = useLanguage()
  const [reviews, setReviews] = useState<Review[]>(sampleReviews)
  const [formData, setFormData] = useState({ name: "", rating: 5, text: "" })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const averageRating =
    reviews.length > 0 ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1) : 0

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate submission
    setTimeout(() => {
      const newReview: Review = {
        id: Date.now().toString(),
        name: formData.name,
        rating: formData.rating,
        text: formData.text,
        date: new Date().toISOString().split("T")[0],
        verified: false,
      }
      setReviews([newReview, ...reviews])
      setFormData({ name: "", rating: 5, text: "" })
      setIsSubmitting(false)
    }, 1000)
  }

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl lg:text-6xl font-serif font-bold text-foreground mb-4 text-balance">
            {t("reviews.title")}
          </h1>
          <p className="text-lg text-muted-foreground font-sans">
            Read what our customers say about Khanana Pathan Shawls
          </p>
        </div>

        {/* Average Rating */}
        <div className="bg-muted rounded-lg p-8 mb-12 text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <span className="text-5xl font-serif font-bold text-foreground">{averageRating}</span>
            <div className="flex gap-1">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-6 h-6 ${i < Math.round(Number(averageRating)) ? "fill-accent text-accent" : "text-muted-foreground"}`}
                />
              ))}
            </div>
          </div>
          <p className="text-muted-foreground font-sans">Based on {reviews.length} verified reviews</p>
        </div>

        {/* Review Form */}
        <Card className="mb-12">
          <CardHeader>
            <CardTitle className="font-serif">{t("reviews.writeReview")}</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2 font-sans">
                  {t("reviews.yourName")}
                </label>
                <Input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Your name"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2 font-sans">
                  {t("reviews.rating")}
                </label>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((rating) => (
                    <button
                      key={rating}
                      type="button"
                      onClick={() => setFormData({ ...formData, rating })}
                      className="focus:outline-none transition-transform hover:scale-110"
                    >
                      <Star
                        className={`w-8 h-8 ${
                          rating <= formData.rating ? "fill-accent text-accent" : "text-muted-foreground"
                        }`}
                      />
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2 font-sans">
                  {t("reviews.yourReview")}
                </label>
                <textarea
                  value={formData.text}
                  onChange={(e) => setFormData({ ...formData, text: e.target.value })}
                  placeholder={t("reviews.placeholder")}
                  rows={4}
                  className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent font-sans"
                  required
                />
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-accent hover:bg-accent/90 text-accent-foreground font-semibold"
              >
                {isSubmitting ? t("reviews.submitting") : t("reviews.submit")}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Reviews List */}
        <div className="space-y-6">
          {reviews.map((review) => (
            <Card key={review.id}>
              <CardContent className="pt-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="font-semibold text-foreground font-serif">{review.name}</h3>
                      {review.verified && (
                        <span className="text-xs bg-accent/10 text-accent px-2 py-1 rounded font-sans">Verified</span>
                      )}
                    </div>
                    <div className="flex gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${i < review.rating ? "fill-accent text-accent" : "text-muted-foreground"}`}
                        />
                      ))}
                    </div>
                  </div>
                  <span className="text-sm text-muted-foreground font-sans">{review.date}</span>
                </div>
                <p className="text-muted-foreground font-sans">{review.text}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
