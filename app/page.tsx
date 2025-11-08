"use client"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/contexts/language-context"
import { ArrowRight } from "lucide-react"
import HeroCarousel from "@/components/hero-carousel"

export default function HomePage() {
  const { t } = useLanguage()

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-background via-background to-muted py-20 lg:py-32 overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl -mr-48 -mt-48" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl -ml-48 -mb-48" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Hero Content */}
            <div className="text-center lg:text-left">
              <div className="inline-block mb-6 px-4 py-2 bg-accent/10 rounded-full border border-accent/20">
                <span className="text-sm font-semibold text-accent uppercase tracking-widest">
                  Authentic Pashtun Heritage
                </span>
              </div>
              <h1 className="text-6xl lg:text-7xl font-serif font-bold text-foreground mb-6 text-balance leading-tight">
                {t("hero.title")}
              </h1>
              <p className="text-xl text-muted-foreground mb-8 text-pretty leading-relaxed font-sans">
                {t("hero.description")}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link href="/products">
                  <Button
                    size="lg"
                    className="bg-accent hover:bg-accent/90 text-accent-foreground px-8 py-3 text-lg font-semibold"
                  >
                    {t("hero.buyNow")}
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </Link>
                <Link href="/about">
                  <Button
                    size="lg"
                    variant="outline"
                    className="px-8 py-3 text-lg font-semibold bg-transparent border-2 border-accent text-accent hover:bg-accent/5"
                  >
                    Learn Our Story
                  </Button>
                </Link>
              </div>
            </div>

            <HeroCarousel />
          </div>
        </div>
      </section>

      {/* Product Description Section */}
      <section className="py-20 lg:py-28 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-5xl lg:text-6xl font-serif font-bold text-foreground mb-6 text-balance">
                {t("product.description.title")}
              </h2>
              <p className="text-lg text-muted-foreground mb-8 text-pretty leading-relaxed font-sans">
                {t("product.description.text")}
              </p>

              <div className="space-y-4 mt-8">
                <div className="group relative bg-gradient-to-br from-accent/10 to-accent/5 border border-accent/20 rounded-xl p-6 hover:border-accent/40 hover:shadow-lg transition-all duration-300">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-accent to-accent/70 rounded-lg flex items-center justify-center flex-shrink-0 shadow-md">
                      <span className="text-accent-foreground font-bold text-lg">✦</span>
                    </div>
                    <div className="flex-1">
                      <h3 className="font-serif font-bold text-foreground text-lg mb-2">Handwoven Craftsmanship</h3>
                      <p className="text-muted-foreground text-sm font-sans leading-relaxed">
                        Each shawl is meticulously handwoven by skilled artisans using traditional techniques passed
                        down through generations
                      </p>
                    </div>
                  </div>
                </div>

                <div className="group relative bg-gradient-to-br from-accent/10 to-accent/5 border border-accent/20 rounded-xl p-6 hover:border-accent/40 hover:shadow-lg transition-all duration-300">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-accent to-accent/70 rounded-lg flex items-center justify-center flex-shrink-0 shadow-md">
                      <span className="text-accent-foreground font-bold text-lg">◆</span>
                    </div>
                    <div className="flex-1">
                      <h3 className="font-serif font-bold text-foreground text-lg mb-2">Premium Materials</h3>
                      <p className="text-muted-foreground text-sm font-sans leading-relaxed">
                        Made from the finest wool sourced from Khyber Pakhtunkhwa, ensuring durability and luxury
                        comfort
                      </p>
                    </div>
                  </div>
                </div>

                <div className="group relative bg-gradient-to-br from-accent/10 to-accent/5 border border-accent/20 rounded-xl p-6 hover:border-accent/40 hover:shadow-lg transition-all duration-300">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-accent to-accent/70 rounded-lg flex items-center justify-center flex-shrink-0 shadow-md">
                      <span className="text-accent-foreground font-bold text-lg">❖</span>
                    </div>
                    <div className="flex-1">
                      <h3 className="font-serif font-bold text-foreground text-lg mb-2">Authentic Heritage</h3>
                      <p className="text-muted-foreground text-sm font-sans leading-relaxed">
                        Preserving traditional Pashtun weaving techniques and cultural identity through every creation
                      </p>
                    </div>
                  </div>
                </div>

                <div className="group relative bg-gradient-to-br from-accent/10 to-accent/5 border border-accent/20 rounded-xl p-6 hover:border-accent/40 hover:shadow-lg transition-all duration-300">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-accent to-accent/70 rounded-lg flex items-center justify-center flex-shrink-0 shadow-md">
                      <span className="text-accent-foreground font-bold text-lg">⬥</span>
                    </div>
                    <div className="flex-1">
                      <h3 className="font-serif font-bold text-foreground text-lg mb-2">Versatile Style</h3>
                      <p className="text-muted-foreground text-sm font-sans leading-relaxed">
                        Perfect for formal occasions, cultural events, and everyday elegance with timeless appeal
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-muted rounded-xl aspect-square flex items-center justify-center border-2 border-dashed border-muted-foreground/20">
                <div className="text-center">
                  <svg
                    className="w-12 h-12 text-muted-foreground/30 mx-auto mb-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                  <p className="text-xs text-muted-foreground/50 font-sans">Image 1</p>
                </div>
              </div>

              <div className="bg-muted rounded-xl aspect-square flex items-center justify-center border-2 border-dashed border-muted-foreground/20">
                <div className="text-center">
                  <svg
                    className="w-12 h-12 text-muted-foreground/30 mx-auto mb-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                  <p className="text-xs text-muted-foreground/50 font-sans">Image 2</p>
                </div>
              </div>

              <div className="bg-muted rounded-xl aspect-square flex items-center justify-center border-2 border-dashed border-muted-foreground/20">
                <div className="text-center">
                  <svg
                    className="w-12 h-12 text-muted-foreground/30 mx-auto mb-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                  <p className="text-xs text-muted-foreground/50 font-sans">Image 3</p>
                </div>
              </div>

              <div className="bg-muted rounded-xl aspect-square flex items-center justify-center border-2 border-dashed border-muted-foreground/20">
                <div className="text-center">
                  <svg
                    className="w-12 h-12 text-muted-foreground/30 mx-auto mb-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                  <p className="text-xs text-muted-foreground/50 font-sans">Image 4</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Information Section */}
      <section className="py-20 lg:py-28 bg-muted">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-5xl lg:text-6xl font-serif font-bold text-foreground mb-4 text-balance">
              Get in Touch with Khanana
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto font-sans">
              Have questions about our authentic Pathan shawls? We're here to help and provide personalized styling
              advice.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* WhatsApp Contact */}
            <div className="bg-background rounded-xl p-8 border border-accent/20 shadow-md hover:shadow-lg transition-all hover:border-accent/40">
              <div className="w-14 h-14 bg-gradient-to-br from-accent to-accent/70 rounded-lg flex items-center justify-center mb-6 shadow-md">
                <svg className="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.67-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074l-1.062 3.889 3.976-1.041c.821.454 1.759.708 2.746.708 3.179 0 5.776-2.595 5.776-5.778 0-1.543-.635-2.993-1.784-4.134-1.149-1.14-2.678-1.77-4.29-1.77z" />
                </svg>
              </div>
              <h3 className="font-serif font-bold text-foreground text-xl mb-3">WhatsApp</h3>
              <p className="text-muted-foreground font-sans mb-4">Chat with us directly for quick assistance</p>
              <a
                href="https://wa.me/923496464844"
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent font-semibold hover:text-accent/80 transition-colors"
              >
                +92 349 6464844
              </a>
            </div>

            {/* Email Contact */}
            <div className="bg-background rounded-xl p-8 border border-accent/20 shadow-md hover:shadow-lg transition-all hover:border-accent/40">
              <div className="w-14 h-14 bg-gradient-to-br from-accent to-accent/70 rounded-lg flex items-center justify-center mb-6 shadow-md">
                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <h3 className="font-serif font-bold text-foreground text-xl mb-3">Email</h3>
              <p className="text-muted-foreground font-sans mb-4">Reach us for inquiries and orders</p>
              <a
                href="mailto:khananhkhanana@gmail.com"
                className="text-accent font-semibold hover:text-accent/80 transition-colors"
              >
                khananhkhanana@gmail.com
              </a>
            </div>

            {/* TikTok Contact */}
            <div className="bg-background rounded-xl p-8 border border-accent/20 shadow-md hover:shadow-lg transition-all hover:border-accent/40">
              <div className="w-14 h-14 bg-gradient-to-br from-accent to-accent/70 rounded-lg flex items-center justify-center mb-6 shadow-md">
                <svg className="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19.498 3.094c1.871 0 3.495 1.746 3.495 3.621 0 1.814-1.468 3.338-3.282 3.494V17.5c0 4.213-3.298 7.371-7.422 7.371-4.029 0-7.27-3.173-7.27-7.371V9.337C5.503 9.56 4.923 9.674 4.35 9.674c-1.872 0-3.496-1.748-3.496-3.622 0-1.875 1.624-3.621 3.496-3.621 1.871 0 3.495 1.746 3.495 3.621v9.179c0 2.092 1.658 3.812 3.746 3.812 2.089 0 3.746-1.72 3.746-3.812V6.715c.688.461 1.517.747 2.424.747z" />
                </svg>
              </div>
              <h3 className="font-serif font-bold text-foreground text-xl mb-3">TikTok</h3>
              <p className="text-muted-foreground font-sans mb-4">Follow us for styling tips and product showcases</p>
              <a
                href="https://www.tiktok.com/@khananaofficial"
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent font-semibold hover:text-accent/80 transition-colors"
              >
                @khananaofficial
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-20 lg:py-28 bg-background rounded-xl p-8 border border-accent/20 shadow-md hover:shadow-lg transition-all hover:border-accent/40 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-5xl lg:text-6xl font-serif font-bold mb-4 text-balance">{t("cta.title")}</h2>
        <p className="text-lg mb-8 text-pretty opacity-90 font-sans">{t("cta.description")}</p>
        <Link href="/products">
          <Button
            size="lg"
            className="bg-accent-foreground hover:bg-accent-foreground/90 text-accent px-8 py-3 text-lg font-semibold"
          >
            {t("cta.button")}
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </Link>
      </section>
    </div>
  )
}
