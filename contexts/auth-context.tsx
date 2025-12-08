"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

interface Admin {
  id: string
  email: string
  name: string
}

interface AuthContextType {
  admin: Admin | null
  isAuthenticated: boolean
  isLoading: boolean
  login: (email: string, password: string) => Promise<void>
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

// Simple in-memory admin credentials (in production, use a real database)
const ADMIN_CREDENTIALS = {
  email: process.env.NEXT_PUBLIC_ADMIN_EMAIL || "admin@khanan.com",
  password: process.env.NEXT_PUBLIC_ADMIN_PASSWORD || "admin123",
  id: "admin-1",
  name: "Admin",
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [admin, setAdmin] = useState<Admin | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check if admin is already logged in
    if (typeof window !== "undefined") {
      const savedAdmin = localStorage.getItem("admin")
      if (savedAdmin) {
        try {
          setAdmin(JSON.parse(savedAdmin))
        } catch (error) {
          console.error("Failed to parse admin data:", error)
        }
      }
    }
    setIsLoading(false)
  }, [])

  const login = async (email: string, password: string) => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 500))

    if (email === ADMIN_CREDENTIALS.email && password === ADMIN_CREDENTIALS.password) {
      const adminData: Admin = {
        id: ADMIN_CREDENTIALS.id,
        email: ADMIN_CREDENTIALS.email,
        name: ADMIN_CREDENTIALS.name,
      }
      setAdmin(adminData)
      if (typeof window !== "undefined") {
        localStorage.setItem("admin", JSON.stringify(adminData))
      }
    } else {
      throw new Error("Invalid email or password")
    }
  }

  const logout = () => {
    setAdmin(null)
    if (typeof window !== "undefined") {
      localStorage.removeItem("admin")
    }
  }

  return (
    <AuthContext.Provider value={{ admin, isAuthenticated: !!admin, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
