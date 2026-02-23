"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Save, Loader2 } from "lucide-react"
import { toast } from "sonner"

export default function AdminAboutPage() {
    const [loading, setLoading] = useState(false)
    const [formData, setFormData] = useState({
        imageUrl: "",
    })

    useEffect(() => {
        // Fetch from API instead of localStorage
        const fetchSettings = async () => {
            try {
                const res = await fetch("/api/settings")
                const data = await res.json()
                if (data.success && data.data.aboutImage) {
                    setFormData({ imageUrl: data.data.aboutImage })
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
            const res = await fetch("/api/settings", {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ aboutImage: formData.imageUrl })
            })
            const data = await res.json()
            if (data.success) {
                toast.success("About page image updated successfully!")
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
                <h1 className="text-2xl sm:text-3xl font-bold text-foreground font-serif">About Us Image</h1>
                <p className="text-sm text-muted-foreground">Manage the image for the "Our Story" section</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                <Card>
                    <CardHeader>
                        <CardTitle>Main Image</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="imageUrl">About Image URL</Label>
                            <Input
                                id="imageUrl"
                                name="imageUrl"
                                value={formData.imageUrl}
                                onChange={handleChange}
                                placeholder="/images/about.jpg"
                            />
                            <p className="text-xs text-muted-foreground">
                                This image will appear alongside the "Our Story" text.
                            </p>
                        </div>

                        {/* Preview */}
                        {formData.imageUrl && (
                            <div className="mt-4 p-4 border border-border rounded-lg bg-muted/30">
                                <Label className="mb-2 block">Preview</Label>
                                <div className="relative aspect-square w-full max-w-xs overflow-hidden rounded-md border border-border bg-muted">
                                    <img
                                        src={formData.imageUrl}
                                        alt="About Preview"
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
