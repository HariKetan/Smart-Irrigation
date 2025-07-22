export const MOISTURE_STATUS_THRESHOLDS = {
  CRITICAL: 10, // percentage points below threshold
  LOW: 0, // percentage points below threshold
}

export const MOISTURE_STATUS_STYLES = {
  CRITICAL: {
    status: "Critical",
    color: "destructive",
    bgColor: "bg-red-50 border-red-200",
  },
  LOW: {
    status: "Low",
    color: "secondary",
    bgColor: "bg-orange-50 border-orange-200",
  },
  OPTIMAL: {
    status: "Optimal",
    color: "default",
    bgColor: "bg-green-50 border-green-200",
  },
} as const 