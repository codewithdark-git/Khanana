"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { Product } from "@/lib/products"
import type { Order } from "@/lib/orders"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { Package, ShoppingCart, TrendingUp, DollarSign } from "lucide-react"
import Link from "next/link"

export default function AdminDashboard() {
  const [products, setProducts] = useState<Product[]>([])
  const [orders, setOrders] = useState<Order[]>([])
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalValue: 0,
    averagePrice: 0,
    newOrders: 0,
    totalOrders: 0,
  })

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [productsRes, ordersRes] = await Promise.all([fetch("/api/products"), fetch("/api/orders")])

        const productsData = await productsRes.json()
        const ordersData = await ordersRes.json()

        if (productsData.success) {
          setProducts(productsData.data)
          const totalValue = productsData.data.reduce((sum: number, p: Product) => sum + p.discountedPrice, 0)
          const avgPrice = productsData.data.length > 0 ? Math.round(totalValue / productsData.data.length) : 0

          setStats((prev) => ({
            ...prev,
            totalProducts: productsData.data.length,
            totalValue,
            averagePrice: avgPrice,
          }))
        }

        if (ordersData.success) {
          setOrders(ordersData.data)
          setStats((prev) => ({
            ...prev,
            newOrders: ordersData.newOrdersCount || 0,
            totalOrders: ordersData.data.length,
          }))
        }
      } catch (error) {
        console.error("Failed to fetch data:", error)
      }
    }

    fetchData()
  }, [])

  const chartData = products.slice(0, 5).map((p) => ({
    name: p.name.substring(0, 8) + "...",
    price: p.discountedPrice,
    original: p.originalPrice,
  }))

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-foreground font-serif">Dashboard</h1>
        <p className="text-sm text-muted-foreground mt-1">Welcome to Khanana Admin Panel</p>
      </div>

      {/* Stats Cards - Responsive Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <Card>
          <CardContent className="p-3 sm:p-4">
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Package className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Products</p>
                <p className="text-lg sm:text-xl font-bold">{stats.totalProducts}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-3 sm:p-4">
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="p-2 bg-green-500/10 rounded-lg">
                <ShoppingCart className="w-4 h-4 sm:w-5 sm:h-5 text-green-600" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">New Orders</p>
                <p className="text-lg sm:text-xl font-bold text-green-600">{stats.newOrders}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-3 sm:p-4">
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="p-2 bg-blue-500/10 rounded-lg">
                <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Total Orders</p>
                <p className="text-lg sm:text-xl font-bold">{stats.totalOrders}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-3 sm:p-4">
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="p-2 bg-secondary/30 rounded-lg">
                <DollarSign className="w-4 h-4 sm:w-5 sm:h-5 text-secondary-foreground" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Avg Price</p>
                <p className="text-lg sm:text-xl font-bold">Rs {stats.averagePrice.toLocaleString()}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Links */}
      <div className="grid grid-cols-2 gap-3 sm:gap-4">
        <Link href="/admin/orders">
          <Card className="hover:border-primary/50 transition-colors cursor-pointer h-full">
            <CardContent className="p-4 flex items-center justify-between">
              <div>
                <p className="font-medium text-sm sm:text-base">View Orders</p>
                <p className="text-xs text-muted-foreground">Manage customer orders</p>
              </div>
              <ShoppingCart className="w-5 h-5 text-muted-foreground" />
            </CardContent>
          </Card>
        </Link>

        <Link href="/admin/products">
          <Card className="hover:border-primary/50 transition-colors cursor-pointer h-full">
            <CardContent className="p-4 flex items-center justify-between">
              <div>
                <p className="font-medium text-sm sm:text-base">Manage Products</p>
                <p className="text-xs text-muted-foreground">Edit product catalog</p>
              </div>
              <Package className="w-5 h-5 text-muted-foreground" />
            </CardContent>
          </Card>
        </Link>
      </div>

      {/* Price Chart - Hidden on very small screens */}
      <Card className="hidden sm:block">
        <CardHeader className="pb-2">
          <CardTitle className="text-base sm:text-lg">Top Products by Price</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" tick={{ fontSize: 10 }} />
              <YAxis tick={{ fontSize: 10 }} />
              <Tooltip />
              <Bar dataKey="price" fill="hsl(var(--primary))" name="Current Price" />
              <Bar dataKey="original" fill="hsl(var(--muted))" name="Original Price" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Recent Orders */}
      <Card>
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <CardTitle className="text-base sm:text-lg">Recent Orders</CardTitle>
            <Link href="/admin/orders" className="text-xs sm:text-sm text-primary hover:underline">
              View All
            </Link>
          </div>
        </CardHeader>
        <CardContent>
          {orders.length > 0 ? (
            <div className="space-y-2 sm:space-y-3">
              {orders.slice(0, 5).map((order) => (
                <div
                  key={order.id}
                  className={`flex items-center justify-between p-2 sm:p-3 rounded-lg ${
                    order.status === "new" ? "bg-red-50 border border-red-200" : "bg-muted"
                  }`}
                >
                  <div className="min-w-0 flex-1">
                    <p className="font-medium text-sm truncate">{order.customerName}</p>
                    <p className="text-xs text-muted-foreground truncate">{order.productName}</p>
                  </div>
                  <div className="text-right ml-2">
                    <p className="font-semibold text-sm">Rs {order.totalAmount.toLocaleString()}</p>
                    <p
                      className={`text-xs ${order.status === "new" ? "text-red-600 font-medium" : "text-muted-foreground"}`}
                    >
                      {order.status === "new" ? "NEW" : order.status}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-muted-foreground text-center py-4">No orders yet</p>
          )}
        </CardContent>
      </Card>

      {/* Recent Products */}
      <Card>
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <CardTitle className="text-base sm:text-lg">Products</CardTitle>
            <Link href="/admin/products" className="text-xs sm:text-sm text-primary hover:underline">
              View All
            </Link>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-2 sm:space-y-3">
            {products.slice(0, 4).map((product) => (
              <div key={product.id} className="flex items-center justify-between p-2 sm:p-3 bg-muted rounded-lg">
                <div className="min-w-0 flex-1">
                  <p className="font-medium text-sm truncate">{product.name}</p>
                  <p className="text-xs text-muted-foreground">{product.style}</p>
                </div>
                <div className="text-right ml-2">
                  <p className="font-semibold text-sm">Rs {product.discountedPrice.toLocaleString()}</p>
                  <p className="text-xs text-green-600">-{product.discountPercentage}%</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
