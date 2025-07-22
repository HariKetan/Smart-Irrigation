import { MoistureStatus } from "@/types"
import { MOISTURE_STATUS_THRESHOLDS, MOISTURE_STATUS_STYLES } from "./constants"

export function cn(...classes: (string | undefined | null | false)[]) {
  return classes.filter(Boolean).join(" ")
}

export const getMoistureStatus = (moisture: number, threshold: number) => {
  if (moisture < threshold - 10)
    return { status: "Critical", color: "destructive", bgColor: "bg-red-200 border-red-300" }
  if (moisture < threshold) return { status: "Low", color: "secondary", bgColor: "bg-yellow-100 border-orange-300" }
  return { status: "Optimal", color: "default", bgColor: "bg-green-200 border-green-300" }
}

export const calculateAverage = (numbers: number[]): number => {
  if (numbers.length === 0) return 0
  return Math.round(numbers.reduce((sum, num) => sum + num, 0) / numbers.length)
}

export const formatNumber = (num: number): string => {
  return num.toLocaleString()
}

export function formatDate(date: string): string {
  return new Date(date).toLocaleDateString()
}
