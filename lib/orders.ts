import { prisma } from "@/lib/prisma"

export interface Order {
  id: string
  customerName: string
  customerEmail: string
  customerPhone: string
  customerAddress: string
  customerCity?: string
  productId: string
  productName: string
  productPrice: number
  quantity: number
  totalAmount: number
  status: "new" | "contacted" | "confirmed" | "shipped" | "delivered" | "cancelled"
  createdAt: string
  notes?: string
}

// Admin email for notifications
export const ADMIN_EMAIL = "codewithdark90@gmail.com"

export async function getOrders(): Promise<Order[]> {
  const orders = await prisma.order.findMany({
    orderBy: { createdAt: 'desc' }
  })

  return orders.map((row) => mapToOrderInterface(row))
}

export async function getOrderById(id: string): Promise<Order | null> {
  const order = await prisma.order.findUnique({
    where: { id }
  })

  if (!order) return null
  return mapToOrderInterface(order)
}

export async function addOrder(order: Omit<Order, "id" | "createdAt" | "status">): Promise<Order> {
  const id = `ORD-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`

  const productsJson = [
    {
      productId: order.productId,
      productName: order.productName,
      productPrice: order.productPrice,
      quantity: order.quantity,
    },
  ]

  const newOrder = await prisma.order.create({
    data: {
      id,
      customerName: order.customerName,
      customerEmail: order.customerEmail,
      customerPhone: order.customerPhone,
      customerAddress: order.customerAddress,
      customerCity: order.customerCity || "",
      products: productsJson as any, // Prisma Json type workaround
      subtotal: order.totalAmount, // Assuming distinct fields for now
      shipping: 0,
      totalAmount: order.totalAmount,
      status: 'new',
    }
  })

  return mapToOrderInterface(newOrder)
}

export async function updateOrderStatus(id: string, status: Order["status"], notes?: string): Promise<Order | null> {
  try {
    const updatedOrder = await prisma.order.update({
      where: { id },
      data: {
        status,
        notes: notes || undefined
      }
    })
    return mapToOrderInterface(updatedOrder)
  } catch (e) {
    return null
  }
}

export async function deleteOrder(id: string): Promise<boolean> {
  try {
    await prisma.order.delete({
      where: { id }
    })
    return true
  } catch (e) {
    return false
  }
}

export async function getNewOrdersCount(): Promise<number> {
  return await prisma.order.count({
    where: { status: 'new' }
  })
}

function mapToOrderInterface(row: any): Order {
  const products = Array.isArray(row.products) ? row.products : []
  const firstProduct = products[0] || {}

  return {
    id: row.id,
    customerName: row.customerName,
    customerEmail: row.customerEmail,
    customerPhone: row.customerPhone,
    customerAddress: row.customerAddress,
    customerCity: row.customerCity || "",
    productId: firstProduct.productId || "",
    productName: firstProduct.productName || "",
    productPrice: firstProduct.productPrice || 0,
    quantity: firstProduct.quantity || 1,
    totalAmount: row.totalAmount,
    status: row.status as Order["status"],
    notes: row.notes || undefined,
    createdAt: row.createdAt.toISOString(),
  }
}
