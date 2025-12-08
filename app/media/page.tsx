"use client"

import { useLanguage } from "@/contexts/language-context"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export default function MediaPage() {
  const { t } = useLanguage()

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl lg:text-6xl font-serif font-bold text-foreground mb-4 text-balance">Khanana Reels</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto font-sans">
            Watch our latest brand stories and product showcases on TikTok
          </p>
        </div>

        {/* TikTok Videos Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {/* TikTok Video 1 - Placeholder */}
          <div className="relative bg-muted rounded-lg overflow-hidden aspect-video flex items-center justify-center border-2 border-dashed border-border">
            <div className="text-center">
              <p className="text-muted-foreground font-sans mb-2">TikTok Video 1</p>
              <p className="text-sm text-muted-foreground font-sans">Admin will add TikTok link</p>
            </div>
          </div>

          {/* TikTok Video 2 - Placeholder */}
          <div className="relative bg-muted rounded-lg overflow-hidden aspect-video flex items-center justify-center border-2 border-dashed border-border">
            <div className="text-center">
              <p className="text-muted-foreground font-sans mb-2">TikTok Video 2</p>
              <p className="text-sm text-muted-foreground font-sans">Admin will add TikTok link</p>
            </div>
          </div>

          {/* TikTok Video 3 - Placeholder */}
          <div className="relative bg-muted rounded-lg overflow-hidden aspect-video flex items-center justify-center border-2 border-dashed border-border">
            <div className="text-center">
              <p className="text-muted-foreground font-sans mb-2">TikTok Video 3</p>
              <p className="text-sm text-muted-foreground font-sans">Admin will add TikTok link</p>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <p className="text-muted-foreground mb-6 font-sans">
            Follow us on TikTok for exclusive content, behind-the-scenes footage, and special promotions
          </p>
          <a href="https://www.tiktok.com/@khanana" target="_blank" rel="noopener noreferrer">
            <Button
              size="lg"
              className="bg-accent hover:bg-accent/90 text-accent-foreground px-8 py-3 text-lg font-semibold"
            >
              Follow us on TikTok
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </a>
        </div>
      </div>
    </div>
  )
}
