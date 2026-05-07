"use client"

import { useState, useEffect } from "react"
import { useRouter, useParams } from "next/navigation"
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

export default function EditProductPage() {
    const router = useRouter()
    const params = useParams()
    const [isLoading, setIsLoading] = useState(true)
    const [isSaving, setIsSaving] = useState(false)
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

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await fetch(`/api/products/${params.id}`)
                const data = await response.json()

                if (data.success) {
                    const product = data.data
                    setFormData({
                        name: product.name || "",
                        description: product.description || "",
                        style: product.style || "",
                        category: product.category || "shawl",
                        originalPrice: product.originalPrice?.toString() || "",
                        discountedPrice: product.discountedPrice?.toString() || "",
                        discountPercentage: product.discountPercentage?.toString() || "0",
                        featured: product.featured || false,
                        imageAlt: product.imageAlt || "",
                    })
                    setImagesText(product.images ? product.images.join(", ") : "")
                } else {
                    toast.error("Failed to fetch product details")
                }
            } catch (error) {
                console.error("Error fetching product:", error)
                toast.error("An error occurred while fetching the product")
            } finally {
                setIsLoading(false)
            }
        }

        if (params.id) {
            fetchProduct()
        }
    }, [params.id])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsSaving(true)

        try {
            const parsedImages = imagesText.split(',').map(s => s.trim()).filter(Boolean);

            const response = await fetch(`/api/products/${params.id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    ...formData,
                    images: parsedImages
                }),
            })

            if (response.ok) {
                toast.success("Product updated successfully")
                router.push("/admin/products")
                router.refresh()
            } else {
                const errorData = await response.json()
                toast.error(errorData.error || "Failed to update product")
            }
        } catch (error) {
            toast.error("Something went wrong")
        } finally {
            setIsSaving(false)
        }
    }

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
            </div>
        )
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
                    <h1 className="text-3xl font-bold font-serif">Edit Product</h1>
                    <p className="text-muted-foreground">Update the details of your product</p>
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
                                            disabled={isSaving}
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
                                    <Button type="submit" disabled={isSaving} className="w-full h-11">
                                        {isSaving ? "Saving..." : "Save Changes"}
                                    </Button>
                                    <Link href="/admin/products">
                                        <Button type="button" variant="outline" className="w-full h-11" disabled={isSaving}>
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
