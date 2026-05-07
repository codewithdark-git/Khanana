"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState, useRef, useEffect } from "react"
import { cn } from "@/lib/utils"
import { useLanguage } from "@/contexts/language-context"
import { useWishlist } from "@/contexts/wishlist-context"
import { Heart, Menu, X, ChevronDown } from "lucide-react"

const shopCategories = [
  { name: "All Products", href: "/products" },
  { name: "Shawls", href: "/products?category=shawl" },
  { name: "Cloth (Unstitched)", href: "/products?category=cloth" },
  { name: "Chappal (Footwear)", href: "/products?category=chappal" },
]

const navigation = [
  { name: "Home", href: "/" },
  { name: "Shop", href: "/products", hasDropdown: true },
  { name: "Our Story", href: "/about" },
  { name: "Contact", href: "/contact" },
]

export function Navbar() {
  const pathname = usePathname()
  const { t } = useLanguage()
  const { wishlist } = useWishlist()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [shopDropdownOpen, setShopDropdownOpen] = useState(false)
  const [mobileShopExpanded, setMobileShopExpanded] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShopDropdownOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  // Close mobile menu when route changes
  useEffect(() => {
    setMobileMenuOpen(false)
    setMobileShopExpanded(false)
  }, [pathname])

  // Lock body scroll while mobile menu is open
  useEffect(() => {
    const html = document.documentElement
    if (mobileMenuOpen) {
      html.classList.add("scroll-locked")
    } else {
      html.classList.remove("scroll-locked")
    }
    return () => html.classList.remove("scroll-locked")
  }, [mobileMenuOpen])

  // Close menu on Escape
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMobileMenuOpen(false)
        setShopDropdownOpen(false)
      }
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [])

  const isShopActive = pathname === "/products" || pathname.startsWith("/products?")

  return (
    <nav className="bg-background/85 backdrop-blur-md border-b border-border sticky top-0 z-50 supports-[backdrop-filter]:bg-background/75">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 lg:h-20">
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2 group" aria-label="Khanana home">
              <div className="relative">
                <div className="w-10 h-10 lg:w-12 lg:h-12 bg-gradient-to-br from-primary to-primary/80 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-primary/25 group-hover:scale-105 transition-all duration-300">
                  <span className="text-primary-foreground font-serif font-bold text-lg lg:text-xl">K</span>
                </div>
                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-secondary rounded-full border-2 border-background" />
              </div>
              <div className="flex flex-col">
                <span className="text-xl lg:text-2xl font-serif font-bold text-foreground group-hover:text-primary transition-colors leading-none">
                  {t("nav.brand")}
                </span>
                <span className="text-[10px] lg:text-xs text-muted-foreground tracking-wider">HERITAGE CRAFTS</span>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:block">
            <div className="ml-10 flex items-baseline space-x-1">
              {navigation.map((item) => (
                item.hasDropdown ? (
                  <div 
                    key={item.href} 
                    className="relative group" 
                    ref={dropdownRef}
                    onMouseEnter={() => setShopDropdownOpen(true)}
                    onMouseLeave={() => setShopDropdownOpen(false)}
                  >
                    <button
                      onClick={() => setShopDropdownOpen(!shopDropdownOpen)}
                      className={cn(
                        "px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center gap-1",
                        isShopActive
                          ? "bg-primary text-primary-foreground shadow-md"
                          : "text-muted-foreground hover:text-foreground hover:bg-muted",
                      )}
                    >
                      {item.name}
                      <ChevronDown className={cn(
                        "w-3.5 h-3.5 transition-transform duration-200",
                        shopDropdownOpen && "rotate-180"
                      )} />
                    </button>

                    {/* Dropdown Menu */}
                    {shopDropdownOpen && (
                      <div className="absolute top-full left-0 mt-1 w-56 bg-card rounded-xl shadow-xl border border-border/50 py-2 z-50 overflow-hidden animate-slide-down">
                        {shopCategories.map((cat) => (
                          <Link
                            key={cat.href}
                            href={cat.href}
                            onClick={() => setShopDropdownOpen(false)}
                            className="block px-4 py-2.5 text-sm text-muted-foreground hover:text-foreground hover:bg-muted hover:pl-5 transition-all duration-200"
                          >
                            {cat.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200",
                      pathname === item.href
                        ? "bg-primary text-primary-foreground shadow-md"
                        : "text-muted-foreground hover:text-foreground hover:bg-muted",
                    )}
                  >
                    {item.name}
                  </Link>
                )
              ))}
            </div>
          </div>

          <div className="flex items-center space-x-3">
            {/* Wishlist */}
            <Link
              href="/wishlist"
              className="relative p-2 text-muted-foreground hover:text-primary transition-colors"
              aria-label="Wishlist"
            >
              <Heart className="w-5 h-5" />
              {wishlist.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                  {wishlist.length}
                </span>
              )}
            </Link>

            <button
              className="lg:hidden p-2 text-muted-foreground hover:text-foreground transition-colors"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-menu"
            >
              <div className="relative w-6 h-6">
                <Menu
                  className={`absolute inset-0 w-6 h-6 transition-all duration-300 ${
                    mobileMenuOpen ? "opacity-0 rotate-90 scale-75" : "opacity-100 rotate-0 scale-100"
                  }`}
                />
                <X
                  className={`absolute inset-0 w-6 h-6 transition-all duration-300 ${
                    mobileMenuOpen ? "opacity-100 rotate-0 scale-100" : "opacity-0 -rotate-90 scale-75"
                  }`}
                />
              </div>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div
            className="lg:hidden py-4 border-t border-border animate-slide-down max-h-[calc(100svh-4rem)] overflow-y-auto"
            id="mobile-menu"
          >
            <div className="flex flex-col space-y-1">
              {navigation.map((item) => (
                item.hasDropdown ? (
                  <div key={item.href}>
                    <button
                      onClick={() => setMobileShopExpanded(!mobileShopExpanded)}
                      className={cn(
                        "w-full flex items-center justify-between px-4 py-3 rounded-lg text-base font-medium transition-colors",
                        isShopActive
                          ? "bg-primary text-primary-foreground"
                          : "text-muted-foreground hover:text-foreground hover:bg-muted",
                      )}
                    >
                      {item.name}
                      <ChevronDown className={cn(
                        "w-4 h-4 transition-transform duration-200",
                        mobileShopExpanded && "rotate-180"
                      )} />
                    </button>
                    {mobileShopExpanded && (
                      <div className="ml-4 mt-1 space-y-1">
                        {shopCategories.map((cat) => (
                          <Link
                            key={cat.href}
                            href={cat.href}
                            onClick={() => {
                              setMobileMenuOpen(false)
                              setMobileShopExpanded(false)
                            }}
                            className="block px-4 py-2.5 rounded-lg text-sm text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                          >
                            {cat.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={cn(
                      "px-4 py-3 rounded-lg text-base font-medium transition-colors",
                      pathname === item.href
                        ? "bg-primary text-primary-foreground"
                        : "text-muted-foreground hover:text-foreground hover:bg-muted",
                    )}
                  >
                    {item.name}
                  </Link>
                )
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
