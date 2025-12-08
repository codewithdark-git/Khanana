import { prisma } from "@/lib/prisma"
import { type NextRequest, NextResponse } from "next/server"

export async function GET() {
    try {
        const media = await prisma.media.findMany({
            orderBy: { createdAt: 'desc' }
        })
        return NextResponse.json({ success: true, data: media })
    } catch (error) {
        return NextResponse.json({ success: false, error: "Failed to fetch media" }, { status: 500 })
    }
}

export async function POST(request: NextRequest) {
    try {
        const data = await request.json()
        const media = await prisma.media.create({
            data: {
                url: data.url,
                type: "image", // Default
                name: data.name
            }
        })
        return NextResponse.json({ success: true, data: media })
    } catch (error) {
        return NextResponse.json({ success: false, error: "Failed to save media" }, { status: 500 })
    }
}

export async function DELETE(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url)
        const id = searchParams.get('id')

        if (!id) {
            return NextResponse.json({ success: false, error: "ID required" }, { status: 400 })
        }

        await prisma.media.delete({ where: { id } })
        return NextResponse.json({ success: true })
    } catch (error) {
        return NextResponse.json({ success: false, error: "Failed to delete media" }, { status: 500 })
    }
}
