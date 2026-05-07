"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Save, Loader2 } from "lucide-react"
import { toast } from "sonner"

export default function AdminHomePage() {
    const [loading, setLoading] = useState(false)
    const [formData, setFormData] = useState({
        heroImages: "",
    })

    useEffect(() => {
        // Fetch from API instead of localStorage
        const fetchSettings = async () => {
            try {
                const res = await fetch("/api/settings")
                const data = await res.json()
                if (data.success && data.data.heroImages) {
                    setFormData({ heroImages: data.data.heroImages.join(", ") })
                }
            } catch (error) {
                console.error("Failed to fetch settings:", error)
            }
        }
        fetchSettings()
    }, [])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)

        try {
            const parsedImages = formData.heroImages.split(',').map(s => s.trim()).filter(Boolean);

            const res = await fetch("/api/settings", {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ heroImages: parsedImages })
            })
            const data = await res.json()
            if (data.success) {
                toast.success("Home page image updated successfully!")
            } else {
                toast.error("Failed to update image")
            }
        } catch (error) {
            toast.error("Failed to update image")
        } finally {
            setLoading(false)
        }
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
                            <Label htmlFor="heroImages">Hero Image URLs (comma separated)</Label>
                            <Textarea
                                id="heroImages"
                                name="heroImages"
                                value={formData.heroImages}
                                onChange={(e) => setFormData({ ...formData, heroImages: e.target.value })}
                                placeholder="https://example.com/hero1.jpg, https://example.com/hero2.jpg"
                                rows={4}
                            />
                            <p className="text-xs text-muted-foreground mt-2">
                                Enter the URLs of the images to display in the main hero section, separated by commas. These will map to the 3 carousel slides natively.
                            </p>
                        </div>

                        {/* Preview */}
                        {formData.heroImages && (
                            <div className="mt-4 p-4 border border-border rounded-lg bg-muted/30">
                                <Label className="mb-2 block">Preview</Label>
                                <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
                                    {formData.heroImages.split(',').map(s => s.trim()).filter(Boolean).map((img, idx) => (
                                        <div key={idx} className="relative aspect-[16/9] w-full overflow-hidden rounded-md border border-border bg-muted">
                                            <img
                                                src={img}
                                                alt={`Hero Preview ${idx + 1}`}
                                                className="object-cover w-full h-full"
                                                onError={(e) => {
                                                    (e.target as HTMLImageElement).src = "/placeholder.svg"
                                                }}
                                            />
                                        </div>
                                    ))}
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
