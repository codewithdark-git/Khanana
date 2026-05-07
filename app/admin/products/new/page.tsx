"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { ChevronLeft } from "lucide-react"
import Link from "next/link"
import { toast } from "sonner"

export default function NewProductPage() {
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(false)
    const [imagesText, setImagesText] = useState("")

    const [formData, setFormData] = useState({
        name: "",
        description: "",
        style: "",
        category: "shawl",
        originalPrice: "",
        discountedPrice: "",
        discountPercentage: "0",
        featured: false,
        imageAlt: "",
    })

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)

        try {
            const parsedImages = imagesText.split(',').map(s => s.trim()).filter(Boolean);

            const response = await fetch("/api/products", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    ...formData,
                    images: parsedImages
                }),
            })

            if (response.ok) {
                toast.success("Product created successfully")
                router.push("/admin/products")
                router.refresh()
            } else {
                const errorData = await response.json()
                toast.error(errorData.error || "Failed to create product")
            }
        } catch (error) {
            toast.error("Something went wrong")
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="max-w-4xl mx-auto space-y-6">
            <div className="flex items-center gap-4">
                <Link href="/admin/products">
                    <Button variant="outline" size="icon">
                        <ChevronLeft className="h-4 w-4" />
                    </Button>
                </Link>
                <div>
                    <h1 className="text-3xl font-bold font-serif">Add New Product</h1>
                    <p className="text-muted-foreground">Create a new product in your catalog</p>
                </div>
            </div>

            <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2 space-y-6">
                        <Card>
                            <CardHeader>
                                <CardTitle>Basic Information</CardTitle>
                                <CardDescription>Enter the core details of your product</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="name">Product Name</Label>
                                    <Input
                                        id="name"
                                        required
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="description">Description</Label>
                                    <Textarea
                                        id="description"
                                        required
                                        rows={5}
                                        value={formData.description}
                                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                    />
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="style">Style / Tagline</Label>
                                        <Input
                                            id="style"
                                            required
                                            placeholder="e.g. Jet Black, Classic Wool"
                                            value={formData.style}
                                            onChange={(e) => setFormData({ ...formData, style: e.target.value })}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="category">Category</Label>
                                        <Select
                                            value={formData.category}
                                            onValueChange={(value) => setFormData({ ...formData, category: value })}
                                        >
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select category" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="shawl">Shawl</SelectItem>
                                                <SelectItem value="cloth">Cloth</SelectItem>
                                                <SelectItem value="chappal">Chappal</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>Pricing</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="grid grid-cols-3 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="originalPrice">Original Price (Rs)</Label>
                                        <Input
                                            id="originalPrice"
                                            type="number"
                                            required
                                            min="0"
                                            value={formData.originalPrice}
                                            onChange={(e) => setFormData({ ...formData, originalPrice: e.target.value })}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="discountedPrice">Discounted Price (Rs)</Label>
                                        <Input
                                            id="discountedPrice"
                                            type="number"
                                            required
                                            min="0"
                                            value={formData.discountedPrice}
                                            onChange={(e) => setFormData({ ...formData, discountedPrice: e.target.value })}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="discountPercentage">Discount %</Label>
                                        <Input
                                            id="discountPercentage"
                                            type="number"
                                            required
                                            min="0"
                                            max="100"
                                            value={formData.discountPercentage}
                                            onChange={(e) => setFormData({ ...formData, discountPercentage: e.target.value })}
                                        />
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>Images</CardTitle>
                                <CardDescription>Upload one or more images for this product. The first image will be the primary thumbnail.</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="images">Image URLs (comma separated)</Label>
                                        <Textarea
                                            id="images"
                                            placeholder="https://example.com/image1.jpg, https://example.com/image2.jpg"
                                            rows={3}
                                            value={imagesText}
                                            disabled={isLoading}
                                            onChange={(e) => setImagesText(e.target.value)}
                                        />
                                        <p className="text-xs text-muted-foreground mt-1">
                                            Enter valid image URLs separated by commas. The first URL is the primary image.
                                        </p>
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="imageAlt">Alt Text for Images (SEO)</Label>
                                        <Input
                                            id="imageAlt"
                                            placeholder="e.g. Jet Black Pathan Shawl in elegant box"
                                            value={formData.imageAlt}
                                            onChange={(e) => setFormData({ ...formData, imageAlt: e.target.value })}
                                        />
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    <div className="space-y-6">
                        <Card>
                            <CardHeader>
                                <CardTitle>Visibility & Status</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <div className="flex items-center justify-between rounded-lg border p-4">
                                    <div className="space-y-0.5">
                                        <Label className="text-base">Featured</Label>
                                        <p className="text-sm text-muted-foreground">
                                            Display on the home page as a best seller.
                                        </p>
                                    </div>
                                    <Switch
                                        checked={formData.featured}
                                        onCheckedChange={(checked) => setFormData({ ...formData, featured: checked })}
                                    />
                                </div>

                                <div className="pt-4 flex flex-col gap-3">
                                    <Button type="submit" disabled={isLoading} className="w-full h-11">
                                        {isLoading ? "Creating..." : "Save Product"}
                                    </Button>
                                    <Link href="/admin/products">
                                        <Button type="button" variant="outline" className="w-full h-11" disabled={isLoading}>
                                            Cancel
                                        </Button>
                                    </Link>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </form>
        </div>
    )
}
