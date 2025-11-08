"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { WhatsAppButton } from "@/components/whatsapp-button"
import { Mail, Phone, MapPin, Clock } from "lucide-react"
import type React from "react"

interface FormData {
  name: string
  email: string
  phone: string
  subject: string
}

interface FormErrors {
  name?: string
  email?: string
  phone?: string
  subject?: string
}

export default function ContactPage() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    subject: "",
  })
  const [errors, setErrors] = useState<FormErrors>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {}

    if (!formData.name.trim()) {
      newErrors.name = "Name is required"
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required"
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address"
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required"
    }

    if (!formData.subject.trim()) {
      newErrors.subject = "Subject is required"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))

    setIsSubmitted(true)
    setIsSubmitting(false)

    // Reset form after 3 seconds
    setTimeout(() => {
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
      })
      setIsSubmitted(false)
    }, 3000)
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="py-20 lg:py-32 bg-gradient-to-br from-background via-background to-muted">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-6xl lg:text-7xl font-serif font-bold text-foreground mb-6 text-balance">Get in Touch</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-pretty font-sans">
            Have questions about our products or need assistance? We're here to help!
          </p>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 lg:py-28 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
            {/* Contact Info Cards */}
            <Card>
              <CardHeader>
                <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mb-4">
                  <Phone className="w-6 h-6 text-accent" />
                </div>
                <CardTitle className="font-serif">Phone</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-2 font-sans">Call us during business hours</p>
                <a href="tel:+923001234567" className="text-accent hover:text-accent/80 font-semibold">
                  +92 300 1234567
                </a>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mb-4">
                  <Mail className="w-6 h-6 text-accent" />
                </div>
                <CardTitle className="font-serif">Email</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-2 font-sans">Send us an email anytime</p>
                <a href="mailto:info@khanan.com" className="text-accent hover:text-accent/80 font-semibold">
                  info@khanan.com
                </a>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mb-4">
                  <Clock className="w-6 h-6 text-accent" />
                </div>
                <CardTitle className="font-serif">Business Hours</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-sm font-sans">
                  Monday - Friday: 9:00 AM - 6:00 PM
                  <br />
                  Saturday: 10:00 AM - 4:00 PM
                  <br />
                  Sunday: Closed
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Quick Contact Options */}
            <Card>
              <CardHeader>
                <CardTitle className="font-serif text-2xl">Quick Contact Options</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground font-sans">
                  Prefer to reach out directly? Choose one of these options to get in touch with our team:
                </p>

                <WhatsAppButton
                  message="Hi KHANAN! I have a question about your Pathan shawls."
                  className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3"
                />

                <a href="tel:+923001234567" className="block">
                  <Button
                    variant="outline"
                    className="w-full bg-transparent border-2 border-accent text-accent hover:bg-accent/5 font-semibold py-3"
                  >
                    <Phone className="w-4 h-4 mr-2" />
                    Call Us
                  </Button>
                </a>

                <a href="mailto:info@khanan.com" className="block">
                  <Button
                    variant="outline"
                    className="w-full bg-transparent border-2 border-accent text-accent hover:bg-accent/5 font-semibold py-3"
                  >
                    <Mail className="w-4 h-4 mr-2" />
                    Send Email
                  </Button>
                </a>
              </CardContent>
            </Card>

            {/* Location Card */}
            <Card>
              <CardHeader>
                <CardTitle className="font-serif text-2xl">Location & Info</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-start space-x-3">
                  <MapPin className="w-5 h-5 text-accent flex-shrink-0 mt-1" />
                  <div>
                    <p className="font-semibold text-foreground font-serif">KHANAN Headquarters</p>
                    <p className="text-muted-foreground text-sm font-sans">
                      Khyber Pakhtunkhwa
                      <br />
                      Pakistan
                    </p>
                  </div>
                </div>

                <div className="border-t border-border pt-6">
                  <h3 className="font-semibold text-foreground mb-3 font-serif">Why Contact Us?</h3>
                  <ul className="space-y-2 text-sm text-muted-foreground font-sans">
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
      <section className="py-20 lg:py-28 bg-muted">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-5xl lg:text-6xl font-serif font-bold text-foreground mb-4 text-balance">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg font-serif">What is the delivery time?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground font-sans">
                  We offer free shipping with delivery within 2-3 business days across Pakistan. International orders
                  may take 7-14 business days.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg font-serif">Do you offer returns?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground font-sans">
                  Yes! We offer a 30-day return policy. If you're not satisfied with your purchase, simply contact us
                  for a hassle-free return.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg font-serif">Are your shawls authentic?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground font-sans">
                  Every KHANAN shawl is handwoven by master artisans using traditional Pashtun techniques. We guarantee
                  100% authenticity.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg font-serif">How do I care for my shawl?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground font-sans">
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
