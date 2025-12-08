"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { WhatsAppButton } from "@/components/whatsapp-button"
import { Mail, Phone, MapPin, Clock } from "lucide-react"

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="py-12 lg:py-24 bg-gradient-to-br from-background via-background to-muted">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl lg:text-6xl font-serif font-bold text-foreground mb-4 lg:mb-6 text-balance">
            Get in Touch
          </h1>
          <p className="text-lg lg:text-xl text-muted-foreground max-w-3xl mx-auto text-pretty">
            Have questions about our products or need assistance? We're here to help!
          </p>
          <div className="flex items-center justify-center gap-2 mt-6">
            <span className="inline-flex items-center px-4 py-2 bg-green-500/10 text-green-600 rounded-full text-sm font-medium">
              <span className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse" />
              Available 24/7
            </span>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-12 lg:py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mb-8 lg:mb-12">
            {/* Contact Info Cards - Updated with correct info */}
            <Card>
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <Phone className="w-6 h-6 text-primary" />
                </div>
                <CardTitle className="font-serif">Phone / WhatsApp</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-2 text-sm lg:text-base">Call or message us anytime</p>
                <a href="tel:+923496464844" className="text-primary hover:text-primary/80 font-semibold">
                  0349-6464844
                </a>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <Mail className="w-6 h-6 text-primary" />
                </div>
                <CardTitle className="font-serif">Email</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-2 text-sm lg:text-base">Send us an email anytime</p>
                <a
                  href="mailto:khananhkhanana@gmail.com"
                  className="text-primary hover:text-primary/80 font-semibold text-sm lg:text-base break-all"
                >
                  khananhkhanana@gmail.com
                </a>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <Clock className="w-6 h-6 text-primary" />
                </div>
                <CardTitle className="font-serif">Availability</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-sm lg:text-base">
                  <span className="text-green-600 font-semibold">24/7 Available</span>
                  <br />
                  We're always here to help you
                  <br />
                  Contact us anytime!
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-12">
            {/* Quick Contact Options - Removed Send Message form */}
            <Card>
              <CardHeader>
                <CardTitle className="font-serif text-xl lg:text-2xl">Quick Contact Options</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground text-sm lg:text-base">
                  Prefer to reach out directly? Choose one of these options to get in touch with our team:
                </p>

                <WhatsAppButton
                  message="Hi Khanana! I have a question about your Pathan shawls."
                  className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3"
                />

                <a href="tel:+923496464844" className="block">
                  <Button
                    variant="outline"
                    className="w-full bg-transparent border-2 border-primary text-primary hover:bg-primary/5 font-semibold py-3"
                  >
                    <Phone className="w-4 h-4 mr-2" />
                    Call: 0349-6464844
                  </Button>
                </a>

                <a href="mailto:khananhkhanana@gmail.com" className="block">
                  <Button
                    variant="outline"
                    className="w-full bg-transparent border-2 border-primary text-primary hover:bg-primary/5 font-semibold py-3"
                  >
                    <Mail className="w-4 h-4 mr-2" />
                    Send Email
                  </Button>
                </a>

                <a
                  href="https://www.tiktok.com/@khananaofficial"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block"
                >
                  <Button
                    variant="outline"
                    className="w-full bg-transparent border-2 border-foreground/20 text-foreground hover:bg-foreground/5 font-semibold py-3"
                  >
                    <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
                    </svg>
                    TikTok: @khananaofficial
                  </Button>
                </a>
              </CardContent>
            </Card>

            {/* Location Card */}
            <Card>
              <CardHeader>
                <CardTitle className="font-serif text-xl lg:text-2xl">Location & Info</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-start space-x-3">
                  <MapPin className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <p className="font-semibold text-foreground font-serif">Khanana</p>
                    <p className="text-muted-foreground text-sm">
                      Khyber Pakhtunkhwa
                      <br />
                      Pakistan
                    </p>
                  </div>
                </div>

                <div className="border-t border-border pt-6">
                  <h3 className="font-semibold text-foreground mb-3 font-serif">Why Contact Us?</h3>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>Product inquiries and recommendations</li>
                    <li>Custom orders and bulk purchases</li>
                    <li>Shipping and delivery information</li>
                    <li>Returns and refund assistance</li>
                    <li>General feedback and suggestions</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-12 lg:py-20 bg-muted">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 lg:mb-16">
            <h2 className="text-3xl lg:text-5xl font-serif font-bold text-foreground mb-4 text-balance">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-base lg:text-lg font-serif">What is the delivery time?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-sm lg:text-base">
                  We offer free shipping with delivery within 2-3 business days across Pakistan. International orders
                  may take 7-14 business days.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base lg:text-lg font-serif">Do you offer returns?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-sm lg:text-base">
                  Yes! We offer a 30-day return policy. If you're not satisfied with your purchase, simply contact us
                  for a hassle-free return.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base lg:text-lg font-serif">Are your shawls authentic?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-sm lg:text-base">
                  Every Khanana shawl is handwoven by master artisans using traditional Pashtun techniques. We guarantee
                  100% authenticity.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base lg:text-lg font-serif">How do I care for my shawl?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-sm lg:text-base">
                  We recommend dry cleaning or gentle hand washing in cold water. Avoid bleach and harsh detergents. Lay
                  flat to dry to maintain the shape and quality.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  )
}
