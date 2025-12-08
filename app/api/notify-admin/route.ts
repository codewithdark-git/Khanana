import { NextResponse } from "next/server"
import type { Order } from "@/lib/orders"
import { sql } from "@/lib/db"

// Admin email for notifications
const ADMIN_EMAIL = process.env.ADMIN_NOTIFY_EMAIL || "khananhkhanana@gmail.com"

export async function POST(request: Request) {
  try {
    const { order } = (await request.json()) as { order: Order }

    // Store notification in database
    try {
      await sql`
        INSERT INTO admin_notifications (order_id, type, title, message)
        VALUES (
          ${order.id},
          'new_order',
          ${"New Order: " + order.productName},
          ${`Customer: ${order.customerName} | Phone: ${order.customerPhone} | Total: Rs ${order.totalAmount.toLocaleString()}`}
        )
      `
    } catch (dbError) {
      console.log("[v0] Failed to save notification to DB (table may not exist):", dbError)
    }

    // Try to send email if Resend API key is configured
    if (process.env.RESEND_API_KEY) {
      try {
        const { Resend } = await import("resend")
        const resend = new Resend(process.env.RESEND_API_KEY)

        await resend.emails.send({
          from: "Khanana Orders <onboarding@resend.dev>",
          to: [ADMIN_EMAIL],
          subject: `New Order #${order.id} - ${order.productName}`,
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
              <div style="background-color: #7c2d12; padding: 20px; border-radius: 8px 8px 0 0;">
                <h1 style="color: #ffffff; margin: 0; font-size: 24px;">Khanana - New Order!</h1>
              </div>
              
              <div style="background-color: #fef3c7; padding: 20px; border: 1px solid #d4a574;">
                <h2 style="color: #7c2d12; margin-top: 0;">Order #${order.id}</h2>
                <p><strong>Date:</strong> ${new Date(order.createdAt).toLocaleString()}</p>
                
                <div style="background-color: #ffffff; padding: 15px; border-radius: 8px; margin-top: 15px;">
                  <h3 style="color: #7c2d12; margin-top: 0;">Customer Details</h3>
                  <p><strong>Name:</strong> ${order.customerName}</p>
                  <p><strong>Phone:</strong> ${order.customerPhone}</p>
                  <p><strong>Email:</strong> ${order.customerEmail}</p>
                  <p><strong>Address:</strong> ${order.customerAddress}</p>
                </div>
                
                <div style="background-color: #ffffff; padding: 15px; border-radius: 8px; margin-top: 15px;">
                  <h3 style="color: #7c2d12; margin-top: 0;">Order Details</h3>
                  <p><strong>Product:</strong> ${order.productName}</p>
                  <p><strong>Price:</strong> Rs ${order.productPrice.toLocaleString()}</p>
                  <p><strong>Quantity:</strong> ${order.quantity}</p>
                  <p style="font-size: 18px; color: #7c2d12;"><strong>Total:</strong> Rs ${order.totalAmount.toLocaleString()}</p>
                </div>
                
                <div style="margin-top: 20px; text-align: center;">
                  <a href="https://wa.me/${order.customerPhone.replace(/[^0-9]/g, "")}" 
                     style="background-color: #22c55e; color: #ffffff; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: bold; display: inline-block;">
                    Contact Customer on WhatsApp
                  </a>
                </div>
              </div>
              
              <div style="background-color: #7c2d12; padding: 15px; border-radius: 0 0 8px 8px; text-align: center;">
                <p style="color: #fef3c7; margin: 0; font-size: 14px;">Khanana - Authentic Pathan Shawls</p>
              </div>
            </div>
          `,
        })

        console.log("[v0] Email sent successfully to:", ADMIN_EMAIL)
        return NextResponse.json({
          success: true,
          message: "Email notification sent",
          adminEmail: ADMIN_EMAIL,
        })
      } catch (emailError) {
        console.error("[v0] Failed to send email:", emailError)
      }
    } else {
      console.log("[v0] RESEND_API_KEY not configured - email not sent")
      console.log("[v0] To enable email notifications, add RESEND_API_KEY to environment variables")
    }

    // Log order details for debugging
    console.log(`
========================================
NEW ORDER NOTIFICATION - KHANANA
========================================
Order ID: ${order.id}
Date: ${new Date(order.createdAt).toLocaleString()}

CUSTOMER DETAILS:
- Name: ${order.customerName}
- Phone: ${order.customerPhone}
- Email: ${order.customerEmail}
- Address: ${order.customerAddress}

ORDER DETAILS:
- Product: ${order.productName}
- Price: Rs ${order.productPrice.toLocaleString()}
- Quantity: ${order.quantity}
- Total: Rs ${order.totalAmount.toLocaleString()}

WhatsApp: https://wa.me/${order.customerPhone.replace(/[^0-9]/g, "")}
========================================
Admin Email: ${ADMIN_EMAIL}
    `)

    return NextResponse.json({
      success: true,
      message: "Admin notification logged (add RESEND_API_KEY for email)",
      adminEmail: ADMIN_EMAIL,
    })
  } catch (error) {
    console.error("[v0] Failed to notify admin:", error)
    return NextResponse.json({ success: false, error: "Failed to send notification" }, { status: 500 })
  }
}
