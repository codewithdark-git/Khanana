"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowRight, Award, Users, Globe } from "lucide-react"

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="py-16 lg:py-24 bg-gradient-to-br from-background via-background to-muted">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-5xl lg:text-6xl font-bold text-foreground mb-6 text-balance">About KHANAN</h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-pretty">
              Preserving authentic Pashtun heritage through handwoven Pathan shawls crafted with passion and tradition.
            </p>
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-16 lg:py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-foreground mb-6 text-balance">Our Story</h2>
              <p className="text-lg text-muted-foreground mb-4 leading-relaxed">
                KHANAN was founded with a mission to celebrate and preserve the rich heritage of Pashtun craftsmanship.
                For generations, skilled artisans in Khyber Pakhtunkhwa have perfected the art of weaving traditional
                Pathan shawls, creating pieces that tell stories of culture, tradition, and excellence.
              </p>
              <p className="text-lg text-muted-foreground mb-4 leading-relaxed">
                We believe that every shawl is more than just a garment—it's a connection to heritage, a symbol of
                identity, and a testament to the dedication of our master craftsmen. By bringing these authentic pieces
                to the world, we're not just selling products; we're sharing a legacy.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Our commitment to quality, authenticity, and fair trade practices ensures that every KHANAN shawl meets
                the highest standards while supporting the artisans who create them.
              </p>
            </div>

            <div className="relative h-96 lg:h-full">
              <div className="absolute inset-0 bg-gradient-to-br from-accent/20 to-accent/5 rounded-2xl blur-3xl" />
              <img
                src="/man-in-white-fringed-pathan-shawl-seated.jpg"
                alt="KHANAN Heritage"
                className="relative w-full h-full object-cover rounded-2xl shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 lg:py-24 bg-muted">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-foreground mb-4 text-balance">Our Values</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              These principles guide everything we do at KHANAN.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card>
              <CardHeader>
                <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mb-4">
                  <Award className="w-6 h-6 text-accent" />
                </div>
                <CardTitle>Authenticity</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Every piece is handwoven using traditional techniques passed down through generations, ensuring
                  genuine Pashtun craftsmanship.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mb-4">
                  <Users className="w-6 h-6 text-accent" />
                </div>
                <CardTitle>Fair Trade</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  We ensure our artisans receive fair compensation for their exceptional work, supporting their
                  livelihoods and communities.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mb-4">
                  <Globe className="w-6 h-6 text-accent" />
                </div>
                <CardTitle>Heritage Preservation</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  By promoting traditional weaving, we help preserve cultural heritage and keep these ancient crafts
                  alive for future generations.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Artisans Section */}
      <section className="py-16 lg:py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="relative h-96 lg:h-full order-2 lg:order-1">
              <div className="absolute inset-0 bg-gradient-to-br from-accent/20 to-accent/5 rounded-2xl blur-3xl" />
              <img
                src="/man-in-blue-attire-with-black-pathan-shawl-draped.jpg"
                alt="Master Artisans"
                className="relative w-full h-full object-cover rounded-2xl shadow-2xl"
              />
            </div>

            <div className="order-1 lg:order-2">
              <h2 className="text-4xl font-bold text-foreground mb-6 text-balance">Master Artisans</h2>
              <p className="text-lg text-muted-foreground mb-4 leading-relaxed">
                Our collection features the work of master weavers from Khyber Pakhtunkhwa, each bringing decades of
                experience and expertise to their craft.
              </p>
              <p className="text-lg text-muted-foreground mb-4 leading-relaxed">
                These skilled artisans use premium wool sourced from the mountains of the region, employing traditional
                weaving techniques to create shawls that are both beautiful and durable.
              </p>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                Every shawl is a unique creation, reflecting the individual style and expertise of the weaver who
                crafted it. When you choose KHANAN, you're supporting these talented craftspeople and their families.
              </p>

              <Link href="/products">
                <Button className="bg-accent hover:bg-accent/90 text-accent-foreground px-8 py-3 text-lg">
                  Explore Our Collection
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-accent text-accent-foreground">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-4 text-balance">Join the KHANAN Community</h2>
          <p className="text-lg mb-8 text-pretty opacity-90">
            Discover authentic Pathan shawls and become part of a movement to preserve cultural heritage.
          </p>
          <Link href="/products">
            <Button
              size="lg"
              className="bg-accent-foreground hover:bg-accent-foreground/90 text-accent px-8 py-3 text-lg"
            >
              Shop Now
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  )
}
