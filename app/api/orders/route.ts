import { NextResponse } from "next/server"
import { getOrders, addOrder, getNewOrdersCount } from "@/lib/orders"

export async function GET() {
  try {
    const orders = await getOrders()
    const newOrdersCount = await getNewOrdersCount()
    return NextResponse.json({
      success: true,
      data: orders,
      newOrdersCount,
    })
  } catch (error) {
    console.error("GET /api/orders error:", error)
    return NextResponse.json({ success: false, error: "Failed to fetch orders" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()

    const {
      customerName,
      customerEmail,
      customerPhone,
      customerAddress,
      customerCity,
      productId,
      productName,
      productPrice,
      quantity,
      totalAmount,
    } = body

    // Validate required fields
    if (!customerName || !customerPhone || !customerAddress || !productId) {
      return NextResponse.json({ success: false, error: "Missing required fields" }, { status: 400 })
    }

    const newOrder = await addOrder({
      customerName,
      customerEmail: customerEmail || "",
      customerPhone,
      customerAddress,
      customerCity: customerCity || "",
      productId,
      productName,
      productPrice,
      quantity,
      totalAmount,
    })

    // Send email notification to admin
    try {
      const baseUrl =
        process.env.NEXT_PUBLIC_BASE_URL || process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : ""
      if (baseUrl) {
        await fetch(`${baseUrl}/api/notify-admin`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ order: newOrder }),
        })
      }
    } catch (emailError) {
      console.error("Failed to send email notification:", emailError)
    }

    return NextResponse.json({
      success: true,
      data: newOrder,
      message: "Order placed successfully",
    })
  } catch (error) {
    console.error("POST /api/orders error:", error)
    return NextResponse.json({ success: false, error: "Failed to create order" }, { status: 500 })
  }
}
