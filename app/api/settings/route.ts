import { prisma } from "@/lib/prisma"
import { type NextRequest, NextResponse } from "next/server"

const SETTINGS_ID = "site_settings"

// GET /api/settings - Fetch site settings
export async function GET() {
    try {
        let settings = await prisma.siteSettings.findUnique({
            where: { id: SETTINGS_ID }
        })

        // If no settings exist, create default
        if (!settings) {
            settings = await prisma.siteSettings.create({
                data: { id: SETTINGS_ID }
            })
        }

        return NextResponse.json({ success: true, data: settings })
    } catch (error) {
        console.error("Failed to fetch settings:", error)
        return NextResponse.json(
            { success: false, error: "Failed to fetch settings" },
            { status: 500 }
        )
    }
}

// PUT /api/settings - Update site settings
export async function PUT(request: NextRequest) {
    try {
        const data = await request.json()

        const settings = await prisma.siteSettings.upsert({
            where: { id: SETTINGS_ID },
            update: {
                heroImage: data.heroImage,
                aboutImage: data.aboutImage,
            },
            create: {
                id: SETTINGS_ID,
                heroImage: data.heroImage,
                aboutImage: data.aboutImage,
            }
        })

        return NextResponse.json({ success: true, data: settings })
    } catch (error) {
        console.error("Failed to update settings:", error)
        return NextResponse.json(
            { success: false, error: "Failed to update settings" },
            { status: 500 }
        )
    }
}
