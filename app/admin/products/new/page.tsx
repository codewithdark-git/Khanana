'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Switch } from '@/components/ui/switch'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { ImageUpload } from '@/components/image-upload'
import { Loader2, ArrowLeft } from 'lucide-react'

export default function NewProductPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  
  const [formData, setFormData] = useState({
    name: '',
    nameAr: '',
    description: '',
    descriptionAr: '',
    originalPrice: 0,
    discountedPrice: 0,
    discountPercentage: 0,
    image: '',
    imageAlt: '',
    style: '',
    tiktokUrl: '',
    featured: false,
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target as HTMLInputElement
    
    setFormData(prev => ({
      ...prev,
      [name]: type === 'number' ? parseFloat(value) : value
    }))
  }

  const handleImageUpload = (url: string) => {
    setFormData(prev => ({
      ...prev,
      image: url,
      imageAlt: formData.imageAlt || 'Product Image'
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    try {
      setIsLoading(true)
      setError(null)
      
      // In a real app, you would upload the image to a server here
      // and then save the product with the returned URL
      
      // For now, we'll just log the form data
      console.log('New product:', formData)
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Redirect to products list after successful creation
      router.push('/admin/products')
      router.refresh()
      
    } catch (err) {
      console.error('Error creating product:', err)
      setError('Failed to create product. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button variant="outline" size="icon" onClick={() => router.back()}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <h1 className="text-2xl font-bold">Add New Product</h1>
        </div>
        <Button 
          type="submit" 
          form="product-form" 
          disabled={isLoading}
        >
          {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Create Product
        </Button>
      </div>

      {error && (
        <div className="bg-destructive/15 text-destructive p-4 rounded-md">
          {error}
        </div>
      )}

      <form id="product-form" onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Left column - Image upload */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Product Image</CardTitle>
                <CardDescription>
                  Upload a high-quality image of your product.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ImageUpload
                  value={formData.image}
                  onChange={handleImageUpload}
                  aspectRatio={1}
                  label="Main Product Image"
                />
                {formData.image && (
                  <div className="mt-4">
                    <Label htmlFor="imageAlt">Image Alt Text</Label>
                    <Input
                      id="imageAlt"
                      name="imageAlt"
                      value={formData.imageAlt}
                      onChange={handleChange}
                      placeholder="Describe the image for accessibility"
                      className="mt-1"
                    />
                  </div>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Pricing</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="originalPrice">Original Price (PKR)</Label>
                  <Input
                    id="originalPrice"
                    name="originalPrice"
                    type="number"
                    value={formData.originalPrice}
                    onChange={handleChange}
                    min={0}
                    step="0.01"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="discountPercentage">Discount Percentage</Label>
                  <div className="flex items-center space-x-2">
                    <Input
                      id="discountPercentage"
                      name="discountPercentage"
                      type="number"
                      value={formData.discountPercentage}
                      onChange={(e) => {
                        const percentage = parseFloat(e.target.value)
                        const newDiscountedPrice = formData.originalPrice * (1 - percentage / 100)
                        setFormData(prev => ({
                          ...prev,
                          discountPercentage: percentage,
                          discountedPrice: parseFloat(newDiscountedPrice.toFixed(2))
                        }))
                      }}
                      min={0}
                      max={100}
                      step="1"
                      className="w-24"
                    />
                    <span>%</span>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="discountedPrice">Discounted Price (PKR)</Label>
                  <Input
                    id="discountedPrice"
                    name="discountedPrice"
                    type="number"
                    value={formData.discountedPrice}
                    onChange={(e) => {
                      const discountedPrice = parseFloat(e.target.value)
                      const discountPercentage = ((formData.originalPrice - discountedPrice) / formData.originalPrice) * 100
                      setFormData(prev => ({
                        ...prev,
                        discountedPrice: discountedPrice,
                        discountPercentage: parseFloat(discountPercentage.toFixed(2))
                      }))
                    }}
                    min={0}
                    step="0.01"
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Settings</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="featured">Featured Product</Label>
                    <p className="text-sm text-muted-foreground">
                      Show this product in featured section
                    </p>
                  </div>
                  <Switch
                    id="featured"
                    checked={formData.featured}
                    onCheckedChange={(checked) => 
                      setFormData(prev => ({ ...prev, featured: checked }))
                    }
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right column - Product details */}
          <div className="md:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Product Information</CardTitle>
                <CardDescription>
                  Fill in the details of your product in both English and Arabic.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Product Name (English)</Label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="e.g., Pathan Jet Black Shawl"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="nameAr">Product Name (Arabic)</Label>
                  <Input
                    id="nameAr"
                    name="nameAr"
                    value={formData.nameAr}
                    onChange={handleChange}
                    placeholder="مثال: شال باثان أسود جيت"
                    dir="rtl"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="style">Style/Type</Label>
                  <Input
                    id="style"
                    name="style"
                    value={formData.style}
                    onChange={handleChange}
                    placeholder="e.g., Jet Black, Classic Wool"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description (English)</Label>
                  <Textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Enter a detailed description of the product in English"
                    rows={4}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="descriptionAr">Description (Arabic)</Label>
                  <Textarea
                    id="descriptionAr"
                    name="descriptionAr"
                    value={formData.descriptionAr}
                    onChange={handleChange}
                    placeholder="أدخل وصفًا تفصيليًا للمنتج باللغة العربية"
                    dir="rtl"
                    rows={4}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="tiktokUrl">TikTok URL (Optional)</Label>
                  <Input
                    id="tiktokUrl"
                    name="tiktokUrl"
                    type="url"
                    value={formData.tiktokUrl}
                    onChange={handleChange}
                    placeholder="https://www.tiktok.com/..."
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </form>
    </div>
  )
}
