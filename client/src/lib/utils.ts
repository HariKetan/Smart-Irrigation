import { MoistureStatus } from "@/types"
import { MOISTURE_STATUS_THRESHOLDS, MOISTURE_STATUS_STYLES } from "./constants"

export function cn(...classes: (string | undefined | null | false)[]) {
  return classes.filter(Boolean).join(" ")
}

export const getMoistureStatus = (moisture: number | null | undefined, threshold: number | null | undefined) => {
  const moistureValue = moisture ?? 0;
  const thresholdValue = threshold ?? 60;
  
  if (moistureValue < thresholdValue - 10)
    return { status: "Critical", color: "destructive", bgColor: "bg-red-200 border-red-300" }
  if (moistureValue < thresholdValue) return { status: "Low", color: "secondary", bgColor: "bg-yellow-100 border-orange-300" }
  return { status: "Optimal", color: "default", bgColor: "bg-green-200 border-green-300" }
}

export const calculateAverage = (numbers: (number | null | undefined)[]): number => {
  const validNumbers = numbers.filter(num => num !== null && num !== undefined && !isNaN(num)) as number[]
  if (validNumbers.length === 0) return 0
  return Math.round(validNumbers.reduce((sum, num) => sum + num, 0) / validNumbers.length)
}

export const formatNumber = (num: number | null | undefined): string => {
  if (num === null || num === undefined || isNaN(num)) {
    return '0'
  }
  return num.toLocaleString()
}

export function formatDate(date: string): string {
  return new Date(date).toLocaleDateString()
}
