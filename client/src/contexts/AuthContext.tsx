"use client"

import { createContext, useContext, useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { getApiBaseUrl } from "@/lib/api"

interface User {
  id: string
  email: string
  name: string
}

interface AuthContextType {
  isAuthenticated: boolean
  user: User | null
  login: (token: string, userData: User) => void
  logout: () => void
  fetchUserProfile: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [user, setUser] = useState<User | null>(null)
  const router = useRouter()

  const fetchUserProfile = async () => {
    try {
      const apiBaseUrl = getApiBaseUrl()
      const response = await fetch(`${apiBaseUrl}/api/auth/me`, {
        headers: {
          "Authorization": `Bearer ${getTokenFromCookie()}`,
        },
      })

      if (response.ok) {
        const userData = await response.json()
        setUser(userData)
      }
    } catch (error) {
      console.error("Failed to fetch user profile:", error)
    }
  }

  const getTokenFromCookie = () => {
    const cookies = document.cookie.split(';')
    const authCookie = cookies.find(cookie => cookie.trim().startsWith('auth-token='))
    return authCookie ? authCookie.split('=')[1] : null
  }

  useEffect(() => {
    // Check if auth token exists
    const token = getTokenFromCookie()
    if (token) {
      setIsAuthenticated(true)
      fetchUserProfile()
    }
  }, [])

  const login = (token: string, userData: User) => {
    // Set auth token cookie
    document.cookie = `auth-token=${token}; path=/`
    setIsAuthenticated(true)
    setUser(userData)
    router.push("/dashboard")
  }

  const logout = () => {
    // Remove auth token cookie
    document.cookie = "auth-token=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT"
    setIsAuthenticated(false)
    setUser(null)
    router.push("/login")
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout, fetchUserProfile }}>
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