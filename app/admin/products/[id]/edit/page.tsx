'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Switch } from '@/components/ui/switch'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { ImageUpload } from '@/components/image-upload'
import { Loader2, ArrowLeft, Save, Trash2 } from 'lucide-react'
import { Product } from '@/lib/products'

export default function EditProductPage() {
  const router = useRouter()
  const { id } = useParams()
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  
  const [formData, setFormData] = useState<Omit<Product, 'id'>>({
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

  // Fetch product data
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setIsLoading(true)
        // In a real app, you would fetch the product from your API
        // const response = await fetch(`/api/products/${id}`)
        // const data = await response.json()
        
        // For now, we'll use a mock fetch
        await new Promise(resolve => setTimeout(resolve, 500))
        const mockProduct = {
          id: 'jet-black',
          name: 'Pathan Jet Black',
          nameAr: 'باتھان جیٹ بلیک',
          description: 'Premium handwoven Pathan shawl in deep jet black. Features intricate fringes and authentic Pashtun craftsmanship.',
          descriptionAr: 'پریمیم ہاتھ سے بنی پاتھان شال گہری جیٹ بلیک میں۔ پیچیدہ فرنجز اور اصل پشتون کاریگری کی خصوصیات۔',
          originalPrice: 8550,
          discountedPrice: 5985,
          discountPercentage: 30,
          image: '/black-pathan-shawl-elegant-box.jpg',
          imageAlt: 'Jet Black Pathan Shawl',
          style: 'Jet Black',
          tiktokUrl: '',
          featured: true,
        }
        
        // Remove the id from the product data for the form
        const { id: _, ...productData } = mockProduct
        setFormData(productData)
      } catch (err) {
        console.error('Error fetching product:', err)
        setError('Failed to load product. Please try again.')
      } finally {
        setIsLoading(false)
      }
    }

    fetchProduct()
  }, [id])

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
      imageAlt: prev.imageAlt || 'Product Image'
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    try {
      setIsSaving(true)
      setError(null)
      
      // In a real app, you would make an API call to update the product
      console.log('Updating product:', { id, ...formData })
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Redirect to products list after successful update
      router.push('/admin/products')
      router.refresh()
      
    } catch (err) {
      console.error('Error updating product:', err)
      setError('Failed to update product. Please try again.')
    } finally {
      setIsSaving(false)
    }
  }

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this product? This action cannot be undone.')) {
      return
    }
    
    try {
      setIsDeleting(true)
      setError(null)
      
      // In a real app, you would make an API call to delete the product
      console.log('Deleting product:', id)
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Redirect to products list after successful deletion
      router.push('/admin/products')
      router.refresh()
      
    } catch (err) {
      console.error('Error deleting product:', err)
      setError('Failed to delete product. Please try again.')
    } finally {
      setIsDeleting(false)
    }
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    )
  }

  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button variant="outline" size="icon" onClick={() => router.back()}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <h1 className="text-2xl font-bold">Edit Product</h1>
        </div>
        <div className="flex items-center space-x-2">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={handleDelete}
            disabled={isDeleting || isSaving}
          >
            {isDeleting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Deleting...
              </>
            ) : (
              <>
                <Trash2 className="mr-2 h-4 w-4" />
                Delete
              </>
            )}
          </Button>
          <Button 
            type="submit" 
            form="product-form" 
            disabled={isSaving || isDeleting}
          >
            {isSaving ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Save className="mr-2 h-4 w-4" />
                Save Changes
              </>
            )}
          </Button>
        </div>
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
                  Update the details of your product in both English and Arabic.
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
                    value={formData.tiktokUrl || ''}
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
