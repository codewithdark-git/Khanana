"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowRight, Award, Users, Globe, ImageIcon } from "lucide-react"

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="py-12 lg:py-24 bg-gradient-to-br from-background via-background to-muted">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 lg:mb-12">
            <h1 className="text-4xl lg:text-6xl font-serif font-bold text-foreground mb-4 lg:mb-6 text-balance">
              About Khanana
            </h1>
            <p className="text-lg lg:text-xl text-muted-foreground max-w-3xl mx-auto text-pretty">
              Preserving authentic Pashtun heritage through handwoven Pathan shawls crafted with passion and tradition.
            </p>
          </div>
        </div>
      </section>

      {/* Our Story Section - Images replaced with placeholders */}
      <section className="py-8 sm:py-12 lg:py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 items-center">
            <div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-foreground mb-3 sm:mb-4 lg:mb-6 text-balance">
                Our Story
              </h2>
              <p className="text-sm sm:text-base lg:text-lg text-muted-foreground mb-3 sm:mb-4 leading-relaxed">
                Khanana was founded with a mission to celebrate and preserve the rich heritage of Pashtun craftsmanship.
                For generations, skilled artisans in Khyber Pakhtunkhwa have perfected the art of weaving traditional
                Pathan shawls, creating pieces that tell stories of culture, tradition, and excellence.
              </p>
              <p className="text-sm sm:text-base lg:text-lg text-muted-foreground mb-3 sm:mb-4 leading-relaxed">
                We believe that every shawl is more than just a garment—it's a connection to heritage, a symbol of
                identity, and a testament to the dedication of our master craftsmen.
              </p>
              <p className="text-sm sm:text-base lg:text-lg text-muted-foreground leading-relaxed hidden sm:block">
                Our commitment to quality, authenticity, and fair trade practices ensures that every Khanana shawl meets
                the highest standards while supporting the artisans who create them.
              </p>
            </div>

            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-primary/5 rounded-xl sm:rounded-2xl blur-3xl" />
              <div className="relative w-full aspect-[4/3] sm:aspect-square bg-muted rounded-xl sm:rounded-2xl flex flex-col items-center justify-center border-2 border-dashed border-border">
                <ImageIcon className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 text-muted-foreground/30 mb-2 sm:mb-3" />
                <p className="text-muted-foreground/50 text-center px-4 text-xs sm:text-sm">
                  Our Story Image
                  <br />
                  <span className="text-xs">(Admin will add)</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-8 sm:py-12 lg:py-24 bg-muted">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-6 sm:mb-8 lg:mb-12">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-foreground mb-3 sm:mb-4 text-balance">
              Our Values
            </h2>
            <p className="text-sm sm:text-base lg:text-lg text-muted-foreground max-w-2xl mx-auto">
              These principles guide everything we do at Khanana.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
            <Card>
              <CardHeader className="p-4 sm:p-6">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-3 sm:mb-4">
                  <Award className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
                </div>
                <CardTitle className="font-serif text-base sm:text-lg">Authenticity</CardTitle>
              </CardHeader>
              <CardContent className="p-4 pt-0 sm:p-6 sm:pt-0">
                <p className="text-muted-foreground text-xs sm:text-sm lg:text-base">
                  Every piece is handwoven using traditional techniques passed down through generations.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="p-4 sm:p-6">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-3 sm:mb-4">
                  <Users className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
                </div>
                <CardTitle className="font-serif text-base sm:text-lg">Fair Trade</CardTitle>
              </CardHeader>
              <CardContent className="p-4 pt-0 sm:p-6 sm:pt-0">
                <p className="text-muted-foreground text-xs sm:text-sm lg:text-base">
                  We ensure our artisans receive fair compensation for their exceptional work.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="p-4 sm:p-6">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-3 sm:mb-4">
                  <Globe className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
                </div>
                <CardTitle className="font-serif text-base sm:text-lg">Heritage Preservation</CardTitle>
              </CardHeader>
              <CardContent className="p-4 pt-0 sm:p-6 sm:pt-0">
                <p className="text-muted-foreground text-xs sm:text-sm lg:text-base">
                  We help preserve cultural heritage and keep ancient crafts alive for future generations.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Artisans Section - Images replaced with placeholders */}
      <section className="py-8 sm:py-12 lg:py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 items-center">
            <div className="relative order-2 lg:order-1">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-primary/5 rounded-xl sm:rounded-2xl blur-3xl" />
              <div className="relative w-full aspect-[4/3] sm:aspect-square bg-muted rounded-xl sm:rounded-2xl flex flex-col items-center justify-center border-2 border-dashed border-border">
                <ImageIcon className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 text-muted-foreground/30 mb-2 sm:mb-3" />
                <p className="text-muted-foreground/50 text-center px-4 text-xs sm:text-sm">
                  Artisans Image
                  <br />
                  <span className="text-xs">(Admin will add)</span>
                </p>
              </div>
            </div>

            <div className="order-1 lg:order-2">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-foreground mb-3 sm:mb-4 lg:mb-6 text-balance">
                Master Artisans
              </h2>
              <p className="text-sm sm:text-base lg:text-lg text-muted-foreground mb-3 sm:mb-4 leading-relaxed">
                Our collection features the work of master weavers from Khyber Pakhtunkhwa, each bringing decades of
                experience and expertise to their craft.
              </p>
              <p className="text-sm sm:text-base lg:text-lg text-muted-foreground mb-3 sm:mb-4 leading-relaxed hidden sm:block">
                These skilled artisans use premium wool sourced from the mountains of the region, employing traditional
                weaving techniques to create shawls that are both beautiful and durable.
              </p>
              <p className="text-sm sm:text-base lg:text-lg text-muted-foreground mb-4 sm:mb-6 lg:mb-8 leading-relaxed">
                When you choose Khanana, you're supporting these talented craftspeople and their families.
              </p>

              <Link href="/products">
                <Button className="bg-primary hover:bg-primary/90 text-primary-foreground px-4 sm:px-6 lg:px-8 py-2 sm:py-3 text-sm sm:text-base lg:text-lg w-full sm:w-auto">
                  Explore Our Collection
                  <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 ml-2" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-8 sm:py-12 lg:py-16 bg-primary text-primary-foreground">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold mb-3 sm:mb-4 text-balance">
            Join the Khanana Community
          </h2>
          <p className="text-sm sm:text-base lg:text-lg mb-4 sm:mb-6 lg:mb-8 text-pretty opacity-90">
            Discover authentic Pathan shawls and become part of a movement to preserve cultural heritage.
          </p>
          <Link href="/products">
            <Button
              size="lg"
              className="bg-primary-foreground hover:bg-primary-foreground/90 text-primary px-4 sm:px-6 lg:px-8 py-2 sm:py-3 text-sm sm:text-base lg:text-lg w-full sm:w-auto"
            >
              Shop Now
              <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 ml-2" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  )
}
