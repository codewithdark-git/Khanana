"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Save, Loader2 } from "lucide-react"
import { toast } from "sonner"

export default function AdminHomePage() {
    const [loading, setLoading] = useState(false)
    const [formData, setFormData] = useState({
        heroImage: "/placeholder.svg",
    })

    useEffect(() => {
        const saved = localStorage.getItem("heroImage")
        if (saved) {
            setFormData({ heroImage: saved })
        }
    }, [])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)

        // Simulate API call
        setTimeout(() => {
            localStorage.setItem("heroImage", formData.heroImage)
            setLoading(false)
            toast.success("Home page image updated successfully!")
        }, 500)
    }

    return (
        <div className="space-y-6 max-w-4xl">
            <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-foreground font-serif">Home Page Images</h1>
                <p className="text-sm text-muted-foreground">Manage the images on your landing page</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                <Card>
                    <CardHeader>
                        <CardTitle>Hero Section</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="heroImage">Hero Image URL</Label>
                            <div className="flex gap-2">
                                <Input
                                    id="heroImage"
                                    name="heroImage"
                                    value={formData.heroImage}
                                    onChange={handleChange}
                                    placeholder="/images/hero.jpg"
                                />
                            </div>
                            <p className="text-xs text-muted-foreground">
                                Enter the URL of the image to display in the main hero section.
                            </p>
                        </div>

                        {/* Preview */}
                        {formData.heroImage && (
                            <div className="mt-4 p-4 border border-border rounded-lg bg-muted/30">
                                <Label className="mb-2 block">Preview</Label>
                                <div className="relative aspect-[16/9] w-full max-w-md overflow-hidden rounded-md border border-border bg-muted">
                                    <img
                                        src={formData.heroImage}
                                        alt="Hero Preview"
                                        className="object-cover w-full h-full"
                                        onError={(e) => {
                                            (e.target as HTMLImageElement).src = "/placeholder.svg"
                                        }}
                                    />
                                </div>
                            </div>
                        )}
                    </CardContent>
                </Card>

                <div className="flex justify-end">
                    <Button type="submit" size="lg" disabled={loading}>
                        {loading ? (
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
            </form>
        </div>
    )
}
