"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import type { Order } from "@/lib/orders"
import {
  Search,
  Copy,
  Check,
  MessageCircle,
  Mail,
  MapPin,
  Package,
  Clock,
  Trash2,
  ChevronDown,
  ChevronUp,
  Phone,
} from "lucide-react"

const statusColors: Record<Order["status"], string> = {
  new: "bg-red-500 text-white",
  contacted: "bg-yellow-500 text-white",
  confirmed: "bg-blue-500 text-white",
  shipped: "bg-purple-500 text-white",
  delivered: "bg-green-500 text-white",
  cancelled: "bg-gray-500 text-white",
}

const statusLabels: Record<Order["status"], string> = {
  new: "New",
  contacted: "Contacted",
  confirmed: "Confirmed",
  shipped: "Shipped",
  delivered: "Delivered",
  cancelled: "Cancelled",
}

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([])
  const [filteredOrders, setFilteredOrders] = useState<Order[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [isLoading, setIsLoading] = useState(true)
  const [copiedField, setCopiedField] = useState<string | null>(null)
  const [expandedOrder, setExpandedOrder] = useState<string | null>(null)
  const [statusFilter, setStatusFilter] = useState<Order["status"] | "all">("all")

  useEffect(() => {
    fetchOrders()
  }, [])

  const fetchOrders = async () => {
    try {
      const response = await fetch("/api/orders")
      const data = await response.json()
      if (data.success) {
        setOrders(data.data)
        setFilteredOrders(data.data)
      }
    } catch (error) {
      console.error("Failed to fetch orders:", error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    let filtered = orders

    if (searchQuery) {
      filtered = filtered.filter(
        (o) =>
          o.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
          o.customerPhone.includes(searchQuery) ||
          o.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
          o.productName.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    }

    if (statusFilter !== "all") {
      filtered = filtered.filter((o) => o.status === statusFilter)
    }

    setFilteredOrders(filtered)
  }, [searchQuery, statusFilter, orders])

  const copyToClipboard = async (text: string, fieldId: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopiedField(fieldId)
      setTimeout(() => setCopiedField(null), 2000)
    } catch (err) {
      console.error("Failed to copy:", err)
    }
  }

  const updateStatus = async (orderId: string, newStatus: Order["status"]) => {
    try {
      const response = await fetch(`/api/orders/${orderId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      })
      const data = await response.json()
      if (data.success) {
        setOrders(orders.map((o) => (o.id === orderId ? { ...o, status: newStatus } : o)))
      }
    } catch (error) {
      console.error("Failed to update order:", error)
    }
  }

  const deleteOrderHandler = async (orderId: string) => {
    if (!confirm("Are you sure you want to delete this order?")) return

    try {
      const response = await fetch(`/api/orders/${orderId}`, { method: "DELETE" })
      const data = await response.json()
      if (data.success) {
        setOrders(orders.filter((o) => o.id !== orderId))
      }
    } catch (error) {
      console.error("Failed to delete order:", error)
    }
  }

  const getWhatsAppUrl = (phone: string, customerName: string, productName: string) => {
    const cleanPhone = phone.replace(/[^0-9]/g, "")
    const fullPhone = cleanPhone.startsWith("92") ? cleanPhone : `92${cleanPhone.replace(/^0/, "")}`
    const message = `Hi ${customerName}! This is Khanana. Thank you for your order of "${productName}". I'm contacting you to confirm your order and discuss the payment method. How would you like to proceed?`
    return `https://wa.me/${fullPhone}?text=${encodeURIComponent(message)}`
  }

  const newOrdersCount = orders.filter((o) => o.status === "new").length

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
        <div>
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-foreground font-serif">Orders</h1>
          <p className="text-sm text-muted-foreground">Manage customer orders</p>
        </div>
        {newOrdersCount > 0 && (
          <Badge className="bg-red-500 text-white text-xs sm:text-sm px-3 py-1 w-fit">
            {newOrdersCount} New Order{newOrdersCount > 1 ? "s" : ""}
          </Badge>
        )}
      </div>

      {/* Filters - Mobile Optimized */}
      <div className="flex flex-col gap-3">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search orders..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9 text-sm h-10"
          />
        </div>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value as Order["status"] | "all")}
          className="px-3 py-2 border border-border rounded-lg bg-background text-foreground text-sm h-10"
        >
          <option value="all">All Status</option>
          <option value="new">New Orders</option>
          <option value="contacted">Contacted</option>
          <option value="confirmed">Confirmed</option>
          <option value="shipped">Shipped</option>
          <option value="delivered">Delivered</option>
          <option value="cancelled">Cancelled</option>
        </select>
      </div>

      {/* Orders List */}
      {isLoading ? (
        <div className="flex items-center justify-center py-8">
          <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin" />
        </div>
      ) : filteredOrders.length > 0 ? (
        <div className="space-y-3 sm:space-y-4">
          {filteredOrders.map((order) => (
            <Card key={order.id} className={order.status === "new" ? "border-red-500 border-2" : ""}>
              <CardHeader className="p-3 sm:p-4 pb-2">
                <div className="flex flex-col gap-2">
                  <div className="flex items-start justify-between">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <CardTitle className="text-sm sm:text-base font-mono">{order.id}</CardTitle>
                        <Badge className={`${statusColors[order.status]} text-xs`}>{statusLabels[order.status]}</Badge>
                      </div>
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Clock className="w-3 h-3" />
                        {new Date(order.createdAt).toLocaleDateString()}
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => deleteOrderHandler(order.id)}
                      className="text-destructive hover:text-destructive h-8 w-8 p-0"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="p-3 sm:p-4 pt-0 space-y-3">
                {/* WhatsApp Number - Prominent */}
                <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2 min-w-0">
                      <Phone className="w-4 h-4 text-green-600 flex-shrink-0" />
                      <div className="min-w-0">
                        <p className="text-xs text-green-700">WhatsApp</p>
                        <p className="font-semibold text-green-800 text-sm truncate">{order.customerPhone}</p>
                      </div>
                    </div>
                    <div className="flex gap-1 flex-shrink-0">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => copyToClipboard(order.customerPhone, `phone-${order.id}`)}
                        className="h-8 w-8 p-0"
                      >
                        {copiedField === `phone-${order.id}` ? (
                          <Check className="w-3 h-3 text-green-600" />
                        ) : (
                          <Copy className="w-3 h-3" />
                        )}
                      </Button>
                      <a
                        href={getWhatsAppUrl(order.customerPhone, order.customerName, order.productName)}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Button size="sm" className="h-8 bg-green-600 hover:bg-green-700 text-white px-2">
                          <MessageCircle className="w-3 h-3 sm:mr-1" />
                          <span className="hidden sm:inline text-xs">Chat</span>
                        </Button>
                      </a>
                    </div>
                  </div>
                </div>

                {/* Customer Name & Email - Compact */}
                <div className="grid grid-cols-1 gap-2">
                  <div className="flex items-center justify-between p-2 bg-muted rounded text-sm">
                    <span className="truncate">{order.customerName}</span>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => copyToClipboard(order.customerName, `name-${order.id}`)}
                      className="h-6 w-6 p-0 flex-shrink-0"
                    >
                      {copiedField === `name-${order.id}` ? (
                        <Check className="w-3 h-3 text-green-600" />
                      ) : (
                        <Copy className="w-3 h-3" />
                      )}
                    </Button>
                  </div>
                </div>

                {/* Expandable Details */}
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setExpandedOrder(expandedOrder === order.id ? null : order.id)}
                  className="w-full justify-between text-muted-foreground h-8 text-xs"
                >
                  <span>View Details</span>
                  {expandedOrder === order.id ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </Button>

                {expandedOrder === order.id && (
                  <div className="space-y-3 pt-2 border-t border-border">
                    {/* Email */}
                    <div className="flex items-center justify-between p-2 bg-muted rounded text-sm">
                      <div className="flex items-center gap-2 min-w-0">
                        <Mail className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                        <span className="truncate">{order.customerEmail}</span>
                      </div>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => copyToClipboard(order.customerEmail, `email-${order.id}`)}
                        className="h-6 w-6 p-0 flex-shrink-0"
                      >
                        {copiedField === `email-${order.id}` ? (
                          <Check className="w-3 h-3 text-green-600" />
                        ) : (
                          <Copy className="w-3 h-3" />
                        )}
                      </Button>
                    </div>

                    {/* Address */}
                    <div className="flex items-start justify-between p-2 bg-muted rounded text-sm">
                      <div className="flex items-start gap-2 min-w-0 flex-1">
                        <MapPin className="w-4 h-4 text-muted-foreground mt-0.5 flex-shrink-0" />
                        <span className="text-sm">{order.customerAddress}</span>
                      </div>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => copyToClipboard(order.customerAddress, `address-${order.id}`)}
                        className="h-6 w-6 p-0 flex-shrink-0"
                      >
                        {copiedField === `address-${order.id}` ? (
                          <Check className="w-3 h-3 text-green-600" />
                        ) : (
                          <Copy className="w-3 h-3" />
                        )}
                      </Button>
                    </div>

                    {/* Order Details */}
                    <div className="p-3 bg-muted rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <Package className="w-4 h-4 text-muted-foreground" />
                        <span className="font-medium text-sm">Order Details</span>
                      </div>
                      <div className="grid grid-cols-2 gap-2 text-xs sm:text-sm">
                        <div>
                          <span className="text-muted-foreground">Product:</span>
                          <p className="font-medium truncate">{order.productName}</p>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Price:</span>
                          <p className="font-medium">Rs {order.productPrice.toLocaleString()}</p>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Qty:</span>
                          <p className="font-medium">{order.quantity}</p>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Total:</span>
                          <p className="font-semibold text-primary">Rs {order.totalAmount.toLocaleString()}</p>
                        </div>
                      </div>
                    </div>

                    {/* Copy All */}
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        const allInfo = `Order: ${order.id}
Customer: ${order.customerName}
Phone: ${order.customerPhone}
Email: ${order.customerEmail}
Address: ${order.customerAddress}
Product: ${order.productName}
Qty: ${order.quantity}
Total: Rs ${order.totalAmount.toLocaleString()}`
                        copyToClipboard(allInfo, `all-${order.id}`)
                      }}
                      className="w-full text-xs h-8"
                    >
                      {copiedField === `all-${order.id}` ? (
                        <>
                          <Check className="w-3 h-3 mr-1 text-green-600" />
                          Copied!
                        </>
                      ) : (
                        <>
                          <Copy className="w-3 h-3 mr-1" />
                          Copy All Info
                        </>
                      )}
                    </Button>
                  </div>
                )}

                {/* Status Update */}
                <div className="pt-2 border-t border-border">
                  <select
                    value={order.status}
                    onChange={(e) => updateStatus(order.id, e.target.value as Order["status"])}
                    className="w-full px-3 py-2 border border-border rounded-lg bg-background text-sm"
                  >
                    <option value="new">New Order</option>
                    <option value="contacted">Contacted</option>
                    <option value="confirmed">Confirmed</option>
                    <option value="shipped">Shipped</option>
                    <option value="delivered">Delivered</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card>
          <CardContent className="p-6 sm:p-8 text-center">
            <Package className="w-10 h-10 text-muted-foreground mx-auto mb-3" />
            <p className="text-muted-foreground text-sm">No orders found</p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
