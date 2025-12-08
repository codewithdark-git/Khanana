"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Upload, X, Copy, Check } from "lucide-react"
import { toast } from "sonner"

// Sample initial images mocked
const initialImages = [
    "/black-pathan-shawl-elegant-box.jpg",
    "/man-in-blue-attire-with-black-pathan-shawl-draped.jpg",
    "/man-in-white-fringed-pathan-shawl-seated.jpg",
    "/man-in-gray-pathan-shawl-with-subtle-patterns.jpg",
    "/brown-earth-tone-pathan-shawl-traditional.jpg",
    "/navy-wool-pathan-shawl-sophisticated.jpg",
    "/camel-tone-pathan-shawl-with-fringe.jpg",
    "/charcoal-luxury-pathan-shawl-premium.jpg",
]

export default function AdminMediaPage() {
    const [images, setImages] = useState<{ id: string, url: string }[]>([])
    const [uploadUrl, setUploadUrl] = useState("")
    const [copiedIndex, setCopiedIndex] = useState<number | null>(null)
    const [isUploading, setIsUploading] = useState(false)

    useEffect(() => {
        fetchMedia()
    }, [])

    const fetchMedia = async () => {
        try {
            const res = await fetch('/api/media')
            const data = await res.json()
            if (data.success) {
                setImages(data.data)
            }
        } catch (error) {
            console.error("Failed to fetch media", error)
        }
    }

    // Handle File Upload
    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (!file) return

        setIsUploading(true)
        const reader = new FileReader()

        reader.onloadend = async () => {
            const result = reader.result as string
            try {
                const res = await fetch('/api/media', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ url: result, name: file.name })
                })
                const data = await res.json()
                if (data.success) {
                    setImages([data.data, ...images])
                    toast.success("Image uploaded successfully!")
                } else {
                    toast.error("Failed to save image")
                }
            } catch (error) {
                toast.error("Upload error")
            } finally {
                setIsUploading(false)
                e.target.value = "" // Reset input
            }
        }

        reader.readAsDataURL(file)
    }

    const handleUrlUpload = async (e: React.FormEvent) => {
        e.preventDefault()
        if (uploadUrl) {
            try {
                const res = await fetch('/api/media', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ url: uploadUrl, name: "External Link" })
                })
                const data = await res.json()
                if (data.success) {
                    setImages([data.data, ...images])
                    setUploadUrl("")
                    toast.success("Image URL added successfully!")
                }
            } catch (error) {
                toast.error("Failed to save URL")
            }
        }
    }

    const handleDelete = async (id: string, index: number) => {
        if (confirm("Are you sure you want to remove this image?")) {
            try {
                const res = await fetch(`/api/media?id=${id}`, { method: 'DELETE' })
                if (res.ok) {
                    const newImages = [...images]
                    newImages.splice(index, 1)
                    setImages(newImages)
                    toast.success("Image deleted")
                } else {
                    toast.error("Failed to delete")
                }
            } catch (error) {
                toast.error("Delete failed")
            }
        }
    }

    const copyToClipboard = (url: string, index: number) => {
        navigator.clipboard.writeText(url)
        setCopiedIndex(index)
        setTimeout(() => setCopiedIndex(null), 2000)
        toast.success("Image URL/Data copied to clipboard!")
    }

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-foreground font-serif">Media Library</h1>
                <p className="text-sm text-muted-foreground">Manage your website images</p>
            </div>

            {/* Upload Section */}
            <Card>
                <CardContent className="pt-6">
                    <div className="md:flex gap-6 space-y-4 md:space-y-0">
                        {/* File Upload */}
                        <div className="flex-1 space-y-2">
                            <Label htmlFor="file-upload">Upload File</Label>
                            <Input
                                id="file-upload"
                                type="file"
                                accept="image/*"
                                onChange={handleFileUpload}
                                className="cursor-pointer"
                                disabled={isUploading}
                            />
                            <p className="text-xs text-muted-foreground">
                                Upload local images (stored in browser session)
                            </p>
                        </div>

                        <div className="flex items-center text-muted-foreground text-sm font-medium">OR</div>

                        {/* URL Upload */}
                        <div className="flex-1 space-y-2">
                            <form onSubmit={handleUrlUpload} className="flex gap-2">
                                <div className="flex-1">
                                    <Label htmlFor="url" className="sr-only">Image URL</Label>
                                    <Input
                                        id="url"
                                        placeholder="https://example.com/image.jpg"
                                        value={uploadUrl}
                                        onChange={(e) => setUploadUrl(e.target.value)}
                                    />
                                </div>
                                <Button type="submit" variant="secondary">
                                    Add URL
                                </Button>
                            </form>
                            <p className="text-xs text-muted-foreground">
                                Add external image link
                            </p>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Gallery */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {images.map((img, index) => (
                    <div key={img.id} className="group relative aspect-square bg-muted rounded-lg overflow-hidden border border-border">
                        <img src={img.url || "/placeholder.svg"} alt={`Media ${index}`} className="w-full h-full object-cover" />

                        {/* Overlay */}
                        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                            <Button
                                size="icon"
                                variant="secondary"
                                className="h-8 w-8"
                                onClick={() => copyToClipboard(img.url, index)}
                                title="Copy Image Data"
                            >
                                {copiedIndex === index ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                            </Button>
                            <Button
                                size="icon"
                                variant="destructive"
                                className="h-8 w-8"
                                onClick={() => handleDelete(img.id, index)}
                                title="Delete"
                            >
                                <X className="w-4 h-4" />
                            </Button>
                        </div>

                        <div className="absolute bottom-0 left-0 right-0 bg-black/60 p-2 truncate">
                            <p className="text-[10px] text-white truncate px-1">
                                {img.url.startsWith("data:") ? "Uploaded Image" : img.url}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
