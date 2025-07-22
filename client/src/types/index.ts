export interface Section {
  id: number
  name: string
  crop: string
  moisture: number
  threshold: number
  valveOpen: boolean
  waterUsed: number
  temperature: number
  humidity?: number
  lastWatered: string
  flowRate: number
  dailyUsage?: number[]
  weeklyTarget?: number
  soilPh?: number
  plantingDate?: string
  expectedHarvest?: string
}

export interface MoistureStatus {
  status: "Critical" | "Low" | "Optimal"
  color: "destructive" | "secondary" | "default"
  bgColor: string
}

export interface User {
  email: string
  name?: string
  role?: string
}

export interface AuthContextType {
  isAuthenticated: boolean
  login: (token: string) => void
  logout: () => void
} 