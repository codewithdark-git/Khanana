"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { useAuth } from "@/contexts/auth-context"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { LayoutDashboard, Package, LogOut, Menu, X, ShoppingCart, Home, MessageSquare, ImageIcon, Info } from "lucide-react"
import { useState, useEffect } from "react"

const adminNavigation = [
  { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { name: "Orders", href: "/admin/orders", icon: ShoppingCart },
  { name: "Products", href: "/admin/products", icon: Package },
  { name: "Reviews", href: "/admin/reviews", icon: MessageSquare },
  { name: "Media", href: "/admin/media", icon: ImageIcon },
  { name: "Home Content", href: "/admin/home", icon: Home },
  { name: "About Us", href: "/admin/about", icon: Info },
]

export function AdminSidebar() {
  const pathname = usePathname()
  const { logout } = useAuth()
  const [isOpen, setIsOpen] = useState(false)
  const [newOrdersCount, setNewOrdersCount] = useState(0)

  useEffect(() => {
    const fetchOrdersCount = async () => {
      try {
        const response = await fetch("/api/orders")
        const data = await response.json()
        if (data.success) {
          setNewOrdersCount(data.newOrdersCount || 0)
        }
      } catch (error) {
        console.error("Failed to fetch orders count:", error)
      }
    }

    fetchOrdersCount()
    const interval = setInterval(fetchOrdersCount, 30000)
    return () => clearInterval(interval)
  }, [])

  return (
    <>
      <div className="md:hidden fixed top-0 left-0 right-0 h-14 bg-background border-b border-border z-50 flex items-center justify-between px-4">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 hover:bg-muted rounded-lg transition-colors"
          aria-label="Toggle menu"
        >
          {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>

        <span className="font-serif font-bold text-lg text-primary">Khanana Admin</span>

        <Link href="/" className="p-2 hover:bg-muted rounded-lg transition-colors">
          <Home className="w-5 h-5" />
        </Link>
      </div>

      <aside
        className={cn(
          "fixed left-0 top-0 h-full w-64 bg-card border-r border-border transition-transform duration-300 z-40",
          "md:translate-x-0",
          isOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        {/* Logo */}
        <div className="p-4 sm:p-6 border-b border-border">
          <Link href="/admin" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-primary/10 border-2 border-primary flex items-center justify-center">
              <span className="text-lg font-bold text-primary font-serif">K</span>
            </div>
            <div>
              <h1 className="text-lg font-bold text-foreground font-serif">Khanana</h1>
              <p className="text-xs text-muted-foreground">Admin Panel</p>
            </div>
          </Link>
        </div>

        {/* Navigation */}
        <nav className="p-3 sm:p-4 space-y-1">
          {adminNavigation.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.href
            const showBadge = item.name === "Orders" && newOrdersCount > 0

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className={cn(
                  "flex items-center justify-between px-3 py-2.5 rounded-lg transition-colors text-sm",
                  isActive
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground",
                )}
              >
                <div className="flex items-center gap-3">
                  <Icon className="w-5 h-5" />
                  <span className="font-medium">{item.name}</span>
                </div>
                {showBadge && (
                  <Badge className="bg-red-500 text-white text-xs px-2 py-0.5 min-w-[20px] text-center">
                    {newOrdersCount}
                  </Badge>
                )}
              </Link>
            )
          })}
        </nav>

        {/* Bottom Section */}
        <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4 border-t border-border space-y-2">
          <Link
            href="/"
            onClick={() => setIsOpen(false)}
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
          >
            <Home className="w-5 h-5" />
            <span className="font-medium">View Store</span>
          </Link>
          <Button onClick={logout} variant="outline" className="w-full justify-start text-sm h-10 bg-transparent">
            <LogOut className="w-4 h-4 mr-3" />
            Logout
          </Button>
        </div>
      </aside>

      {/* Mobile Overlay */}
      {isOpen && <div className="fixed inset-0 bg-black/50 md:hidden z-30" onClick={() => setIsOpen(false)} />}
    </>
  )
}
