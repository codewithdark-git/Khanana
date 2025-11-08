'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Image as ImageIcon, Save, Upload } from 'lucide-react'
import { ImageUpload } from '@/components/image-upload'

type HomepageImage = {
  id: string
  section: string
  url: string
  alt: string
  link?: string
}

export default function AdminHomepagePage() {
  const [images, setImages] = useState<HomepageImage[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)

  // Load saved images (in a real app, this would be an API call)
  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      // In a real app, you would fetch these from your API
      const savedImages = localStorage.getItem('homepageImages')
      if (savedImages) {
        setImages(JSON.parse(savedImages))
      } else {
        // Default sections
        setImages([
          { id: '1', section: 'hero', url: '', alt: 'Hero Banner' },
          { id: '2', section: 'about', url: '', alt: 'About Section' },
          { id: '3', section: 'featured', url: '', alt: 'Featured Products' },
        ])
      }
      setIsLoading(false)
    }, 500)

    return () => clearTimeout(timer)
  }, [])

  const handleImageChange = (id: string, url: string) => {
    setImages(prev => 
      prev.map(img => 
        img.id === id ? { ...img, url } : img
      )
    )
  }

  const handleSave = () => {
    setIsSaving(true)
    // In a real app, you would save to your API here
    localStorage.setItem('homepageImages', JSON.stringify(images))
    
    // Simulate API call
    setTimeout(() => {
      setIsSaving(false)
      // You might want to show a success toast here
    }, 1000)
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p>Loading...</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Homepage Manager</h1>
          <p className="text-muted-foreground mt-1">Manage your homepage images and content</p>
        </div>
        <Button 
          onClick={handleSave}
          disabled={isSaving}
          className="bg-accent hover:bg-accent/90 text-accent-foreground"
        >
          {isSaving ? 'Saving...' : 'Save Changes'}
          {!isSaving && <Save className="w-4 h-4 ml-2" />}
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Homepage Images</CardTitle>
        </CardHeader>
        <CardContent className="space-y-8">
          {images.map((image) => (
            <div key={image.id} className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium capitalize">{image.section} Section</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="md:col-span-2">
                  <ImageUpload
                    value={image.url}
                    onChange={(url) => handleImageChange(image.id, url)}
                    label={`${image.section} Image`}
                    aspectRatio={image.section === 'hero' ? 16/9 : 4/3}
                  />
                </div>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor={`alt-${image.id}`}>Alt Text</Label>
                    <Input
                      id={`alt-${image.id}`}
                      value={image.alt}
                      onChange={(e) => 
                        setImages(prev => 
                          prev.map(img => 
                            img.id === image.id ? { ...img, alt: e.target.value } : img
                          )
                        )
                      }
                      placeholder="Description for accessibility"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor={`link-${image.id}`}>Link (optional)</Label>
                    <Input
                      id={`link-${image.id}`}
                      value={image.link || ''}
                      onChange={(e) => 
                        setImages(prev => 
                          prev.map(img => 
                            img.id === image.id ? { ...img, link: e.target.value } : img
                          )
                        )
                      }
                      placeholder="https://example.com"
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}
