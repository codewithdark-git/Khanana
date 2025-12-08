"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Card, CardContent } from "@/components/ui/card"
import { Loader2, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { toast } from "sonner"
import type { Product } from "@/lib/products"

interface ProductFormProps {
    initialData?: Product
    isEditing?: boolean
}

export function ProductForm({ initialData, isEditing = false }: ProductFormProps) {
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")

    const [formData, setFormData] = useState<Partial<Product>>(
        initialData || {
            name: "",
            description: "",
            originalPrice: 0,
            discountedPrice: 0,
            discountPercentage: 0,
            image: "",
            imageAlt: "",
            style: "",
            featured: false,
        },
    )

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value, type } = e.target
        if (type === "number") {
            setFormData((prev) => ({ ...prev, [name]: Number(value) }))
        } else {
            setFormData((prev) => ({ ...prev, [name]: value }))
        }
    }

    const handleSwitchChange = (checked: boolean) => {
        setFormData((prev) => ({ ...prev, featured: checked }))
    }

    const calculateDiscount = () => {
        if (formData.originalPrice && formData.discountedPrice) {
            const discount = ((formData.originalPrice - formData.discountedPrice) / formData.originalPrice) * 100
            setFormData((prev) => ({ ...prev, discountPercentage: Math.round(discount) }))
        }
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        setError("")

        try {
            const url = isEditing && initialData ? `/api/products/${initialData.id}` : "/api/products"
            const method = isEditing ? "PUT" : "POST"

            const response = await fetch(url, {
                method,
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            })

            if (!response.ok) {
                const errorData = await response.json()
                throw new Error(errorData.error || "Failed to save product")
            }

            toast.success(isEditing ? "Product updated successfully" : "Product created successfully")
            router.push("/admin/products")
            router.refresh()
        } catch (err: any) {
            console.error(err)
            toast.error(err.message || "Something went wrong. Please try again.")
            setError(err.message || "Something went wrong")
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-4 mb-6">
                <Link href="/admin/products">
                    <Button variant="ghost" size="icon">
                        <ArrowLeft className="w-4 h-4" />
                    </Button>
                </Link>
                <h1 className="text-2xl font-bold font-serif">{isEditing ? "Edit Product" : "Add New Product"}</h1>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                {error && (
                    <div className="bg-destructive/10 text-destructive p-4 rounded-lg border border-destructive/20">{error}</div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Card>
                        <CardContent className="pt-6 space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="name">Product Name (English)</Label>
                                <Input id="name" name="name" value={formData.name} onChange={handleChange} required />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="style">Style / Category</Label>
                                <Input id="style" name="style" value={formData.style} onChange={handleChange} required />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="description">Description (English)</Label>
                                <Textarea
                                    id="description"
                                    name="description"
                                    value={formData.description}
                                    onChange={handleChange}
                                    required
                                    rows={4}
                                />
                            </div>
                        </CardContent>
                    </Card>



                    <Card>
                        <CardContent className="pt-6 space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="originalPrice">Original Price</Label>
                                    <Input
                                        id="originalPrice"
                                        name="originalPrice"
                                        type="number"
                                        value={formData.originalPrice}
                                        onChange={handleChange}
                                        onBlur={calculateDiscount}
                                        required
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="discountedPrice">Discounted Price</Label>
                                    <Input
                                        id="discountedPrice"
                                        name="discountedPrice"
                                        type="number"
                                        value={formData.discountedPrice}
                                        onChange={handleChange}
                                        onBlur={calculateDiscount}
                                        required
                                    />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="discountPercentage">Discount Percentage</Label>
                                <Input
                                    id="discountPercentage"
                                    name="discountPercentage"
                                    type="number"
                                    value={formData.discountPercentage}
                                    readOnly
                                    className="bg-muted"
                                />
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardContent className="pt-6 space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="image">Image URL</Label>
                                <Input
                                    id="image"
                                    name="image"
                                    value={formData.image}
                                    onChange={handleChange}
                                    placeholder="/images/product.jpg"
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="imageAlt">Image Alt Text</Label>
                                <Input id="imageAlt" name="imageAlt" value={formData.imageAlt} onChange={handleChange} required />
                            </div>
                            <div className="flex items-center space-x-2 pt-4">
                                <Switch id="featured" checked={formData.featured} onCheckedChange={handleSwitchChange} />
                                <Label htmlFor="featured">Feature this product</Label>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                <div className="flex justify-end">
                    <Button type="submit" disabled={loading} size="lg" className="w-full md:w-auto">
                        {loading ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Saving...
                            </>
                        ) : (
                            "Save Product"
                        )}
                    </Button>
                </div>
            </form>
        </div>
    )
}
