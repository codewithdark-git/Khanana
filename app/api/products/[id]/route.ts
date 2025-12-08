import { prisma } from "@/lib/prisma"
import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    const product = await prisma.product.findUnique({
      where: { id }
    })

    if (!product) {
      return NextResponse.json(
        {
          success: false,
          error: "Product not found",
        },
        { status: 404 },
      )
    }

    return NextResponse.json({
      success: true,
      data: product,
    })
  } catch (error) {
    console.error(error)
    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch product",
      },
      { status: 500 },
    )
  }
}

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    const data = await request.json()

    const product = await prisma.product.update({
      where: { id },
      data: {
        name: data.name,
        description: data.description,
        originalPrice: Number(data.originalPrice),
        discountedPrice: Number(data.discountedPrice),
        discountPercentage: Number(data.discountPercentage),
        image: data.image,
        imageAlt: data.imageAlt,
        style: data.style,
        tiktokUrl: data.tiktokUrl,
        featured: data.featured,
      }
    })

    return NextResponse.json({
      success: true,
      data: product,
      message: "Product updated successfully",
    })
  } catch (error) {
    console.error(error)
    return NextResponse.json(
      {
        success: false,
        error: "Failed to update product",
      },
      { status: 500 },
    )
  }
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params

    await prisma.product.delete({
      where: { id }
    })

    return NextResponse.json({
      success: true,
      id,
      message: "Product deleted successfully",
    })
  } catch (error) {
    console.error(error)
    return NextResponse.json(
      {
        success: false,
        error: "Failed to delete product",
      },
      { status: 500 },
    )
  }
}
