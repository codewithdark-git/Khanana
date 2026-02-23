"use client"

import { ImageIcon } from "lucide-react"
import { useEffect, useState } from "react"

export function AboutImage() {
    const [aboutImage, setAboutImage] = useState<string | null>(null)

    useEffect(() => {
        // Fetch from API instead of localStorage
        const fetchSettings = async () => {
            try {
                const res = await fetch("/api/settings")
                const data = await res.json()
                if (data.success && data.data.aboutImage) {
                    setAboutImage(data.data.aboutImage)
                }
            } catch (error) {
                console.error("Failed to fetch settings:", error)
            }
        }
        fetchSettings()
    }, [])

    if (aboutImage) {
        return <img src={aboutImage} alt="About Khanana" className="w-full h-full object-cover" />
    }

    return (
        <>
            <ImageIcon className="w-12 h-12 sm:w-16 sm:h-16 lg:w-20 lg:h-20 text-muted-foreground/30 mb-2 sm:mb-3 lg:mb-4" />
            <p className="text-muted-foreground/50 text-xs sm:text-sm lg:text-base">About Image (Admin will add)</p>
        </>
    )
}
