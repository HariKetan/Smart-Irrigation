import { Section } from "@/types"

// Multi-farm section configuration
// Each farm can have sections 1-4 (hardware limitation)
// Sections are identified by farm_id + section_number combination
export const FARM_SECTIONS = 4; // Number of sections per farm (1-4)

export const FARMS_CONFIG = {
  1: { name: 'Farm 1', sections: 4 },
  2: { name: 'Farm 2', sections: 4 }
};

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