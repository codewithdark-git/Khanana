import { prisma } from "@/lib/prisma"
import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const featured = searchParams.get("featured")
    const category = searchParams.get("category")

    const where: Record<string, unknown> = {}
    if (featured === "true") {
      where.featured = true
    }
    if (category) {
      where.category = category
    }

    const products = await prisma.product.findMany({ where })

    return NextResponse.json({
      success: true,
      data: products,
      count: products.length,
    })
  } catch (error) {
    console.error("Error fetching products:", error)
    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch products",
      },
      { status: 500 },
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()

    // Validate using Zod or manual validation if needed, but for now direct creation
    const product = await prisma.product.create({
      data: {
        name: data.name,
        description: data.description,
        originalPrice: Number(data.originalPrice),
        discountedPrice: Number(data.discountedPrice),
        discountPercentage: Number(data.discountPercentage),
        images: data.images || [],
        imageAlt: data.imageAlt,
        style: data.style,
        category: data.category || "shawl",
        tiktokUrl: data.tiktokUrl,
        featured: data.featured || false,
      }
    })

    return NextResponse.json({
      success: true,
      data: product,
      message: "Product created successfully",
    })
  } catch (error) {
    console.error("Error creating product:", error)
    return NextResponse.json(
      {
        success: false,
        error: "Failed to create product",
      },
      { status: 500 },
    )
  }
}
