import { prisma } from "@/lib/prisma"
import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
    try {
        const reviews = await prisma.review.findMany({
            orderBy: { date: 'desc' }
        })

        return NextResponse.json({
            success: true,
            data: reviews,
        })
    } catch (error) {
        console.error("Error fetching reviews:", error)
        return NextResponse.json(
            {
                success: false,
                error: "Failed to fetch reviews",
            },
            { status: 500 },
        )
    }
}

export async function POST(request: NextRequest) {
    try {
        const data = await request.json()

        const review = await prisma.review.create({
            data: {
                name: data.name,
                rating: data.rating,
                text: data.text,
                textUr: data.textUr,
                date: new Date(),
                verified: false,
                location: data.location,
            }
        })

        return NextResponse.json({
            success: true,
            data: review,
            message: "Review submitted successfully",
        })
    } catch (error) {
        console.error("Error creating review:", error)
        return NextResponse.json(
            {
                success: false,
                error: "Failed to submit review",
            },
            { status: 500 },
        )
    }
}
