"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Star, Trash2, CheckCircle, XCircle, Search, Loader2 } from "lucide-react"

import type { Review } from "@/lib/reviews"
import { Input } from "@/components/ui/input"
import { toast } from "sonner"
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog"

export default function AdminReviewsPage() {
    const [reviews, setReviews] = useState<Review[]>([])
    const [loading, setLoading] = useState(true)
    const [searchQuery, setSearchQuery] = useState("")

    const filteredReviews = reviews.filter(
        (review) =>
            review.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            review.text.toLowerCase().includes(searchQuery.toLowerCase()) ||
            review.location?.toLowerCase().includes(searchQuery.toLowerCase()),
    )

    useEffect(() => {
        fetchReviews()
    }, [])

    const fetchReviews = async () => {
        try {
            const res = await fetch('/api/reviews')
            const data = await res.json()
            if (data.success) {
                setReviews(data.data)
            }
        } catch (error) {
            toast.error("Failed to fetch reviews")
        } finally {
            setLoading(false)
        }
    }

    const [deleteId, setDeleteId] = useState<string | null>(null)

    const handleDelete = async () => {
        if (!deleteId) return

        try {
            const res = await fetch(`/api/reviews/${deleteId}`, { method: 'DELETE' })
            if (res.ok) {
                setReviews(reviews.filter((r) => r.id !== deleteId))
                toast.success("Review deleted successfully")
            } else {
                toast.error("Failed to delete review")
            }
        } catch (error) {
            toast.error("Error deleting review")
        } finally {
            setDeleteId(null)
        }
    }

    const toggleVerification = async (id: string) => {
        const review = reviews.find(r => r.id === id)
        if (!review) return

        try {
            const newStatus = !review.verified
            const res = await fetch(`/api/reviews/${id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ verified: newStatus })
            })

            if (res.ok) {
                setReviews(
                    reviews.map((r) => {
                        if (r.id === id) {
                            toast.success(newStatus ? "Review verified" : "Review unverified")
                            return { ...r, verified: newStatus }
                        }
                        return r
                    }),
                )
            }
        } catch (error) {
            toast.error("Failed to update status")
        }
    }

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h1 className="text-2xl sm:text-3xl font-bold text-foreground font-serif">Reviews</h1>
                    <p className="text-sm text-muted-foreground">Manage customer testimonials</p>
                </div>
            </div>

            <div className="relative max-w-md">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                    placeholder="Search reviews..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-9"
                />
            </div>

            <div className="grid gap-4">
                {filteredReviews.length === 0 ? (
                    <div className="text-center py-12 bg-muted/30 rounded-lg">
                        <p className="text-muted-foreground">No reviews found matching your search.</p>
                    </div>
                ) : (
                    filteredReviews.map((review) => (
                        <Card key={review.id} className="overflow-hidden">
                            <CardContent className="p-0">
                                <div className="flex flex-col md:flex-row">
                                    <div className="p-4 md:p-6 flex-1 space-y-3">
                                        <div className="flex items-start justify-between">
                                            <div className="space-y-1">
                                                <div className="flex items-center gap-2">
                                                    <h3 className="font-semibold text-base sm:text-lg">{review.name}</h3>
                                                    {review.verified ? (
                                                        <Badge variant="secondary" className="bg-green-100 text-green-700 hover:bg-green-100 border-green-200 gap-1">
                                                            <CheckCircle className="w-3 h-3" /> Verified
                                                        </Badge>
                                                    ) : (
                                                        <Badge variant="outline" className="text-muted-foreground gap-1">
                                                            Unverified
                                                        </Badge>
                                                    )}
                                                </div>
                                                <div className="flex items-center text-xs text-muted-foreground gap-2">
                                                    <span>{review.location || "Unknown Location"}</span>
                                                    <span>•</span>
                                                    <span>{new Date(review.date).toLocaleDateString()}</span>
                                                </div>
                                            </div>
                                            <div className="flex">
                                                {Array.from({ length: 5 }).map((_, i) => (
                                                    <Star
                                                        key={i}
                                                        className={`w-4 h-4 ${i < review.rating ? "text-yellow-400 fill-yellow-400" : "text-muted-foreground/30"}`}
                                                    />
                                                ))}
                                            </div>
                                        </div>

                                        <div className="space-y-2">
                                            <p className="text-sm text-foreground/90 leading-relaxed">{review.text}</p>
                                        </div>
                                    </div>

                                    {/* Actions - Right side on desktop, Bottom on mobile */}
                                    <div className="bg-muted/30 p-4 flex md:flex-col items-center justify-end gap-2 border-t md:border-t-0 md:border-l border-border md:w-48">
                                        <Button
                                            variant={review.verified ? "secondary" : "default"}
                                            size="sm"
                                            className="w-full"
                                            onClick={() => toggleVerification(review.id)}
                                        >
                                            {review.verified ? (
                                                <>
                                                    <XCircle className="w-4 h-4 mr-2" />
                                                    Unverify
                                                </>
                                            ) : (
                                                <>
                                                    <CheckCircle className="w-4 h-4 mr-2" />
                                                    Verify
                                                </>
                                            )}
                                        </Button>
                                        <Button
                                            variant="destructive"
                                            size="sm"
                                            className="w-full"
                                            onClick={() => setDeleteId(review.id)}
                                        >
                                            <Trash2 className="w-4 h-4 mr-2" />
                                            Delete
                                        </Button>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))
                )}
            </div>
            <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                            This action cannot be undone. This will permanently delete the review.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={handleDelete} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
                            Delete
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    )
}
