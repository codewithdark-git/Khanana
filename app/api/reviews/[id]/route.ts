import { prisma } from "@/lib/prisma"
import { type NextRequest, NextResponse } from "next/server"

export async function PATCH(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params
        const data = await request.json()

        const review = await prisma.review.update({
            where: { id },
            data: {
                verified: data.verified
            }
        })

        return NextResponse.json({
            success: true,
            data: review,
            message: "Review updated successfully",
        })
    } catch (error) {
        console.error("Error updating review:", error)
        return NextResponse.json(
            {
                success: false,
                error: "Failed to update review",
            },
            { status: 500 },
        )
    }
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params

        await prisma.review.delete({
            where: { id }
        })

        return NextResponse.json({
            success: true,
            id,
            message: "Review deleted successfully",
        })
    } catch (error) {
        console.error("Error deleting review:", error)
        return NextResponse.json(
            {
                success: false,
                error: "Failed to delete review",
            },
            { status: 500 },
        )
    }
}
