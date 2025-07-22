"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Slider } from "@/components/ui/slider"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import {
  ArrowLeft,
  Droplets,
  Gauge,
  Settings,
  AlertTriangle,
  CheckCircle,
  Power,
  MapPin,
  Clock,
  Thermometer,
  Activity,
  TrendingUp,
  Calendar,
} from "lucide-react"

interface SectionDetailProps {
  sectionId: number
  onBack: () => void
}

// Mock detailed data for sections
const sectionDetails = {
  1: {
    id: 1,
    name: "Section A",
    crop: "Tomatoes",
    moisture: 45,
    threshold: 40,
    valveOpen: true,
    waterUsed: 1250,
    temperature: 24,
    humidity: 65,
    lastWatered: "2 hours ago",
    flowRate: 15.2,
    dailyUsage: [20, 150, 180, 145, 160, 140, 155],
    weeklyTarget: 1000,
    soilPh: 6.8,
    plantingDate: "2024-03-15",
    expectedHarvest: "2024-06-15",
  },
  2: {
    id: 2,
    name: "Section B",
    crop: "Lettuce",
    moisture: 35,
    threshold: 50,
    valveOpen: false,
    waterUsed: 890,
    temperature: 22,
    humidity: 70,
    lastWatered: "4 hours ago",
    flowRate: 0,
    dailyUsage: [80, 95, 110, 85, 90, 75, 85],
    weeklyTarget: 600,
    soilPh: 7.2,
    plantingDate: "2024-04-01",
    expectedHarvest: "2024-05-30",
  },
  3: {
    id: 3,
    name: "Section C",
    crop: "Carrots",
    moisture: 60,
    threshold: 45,
    valveOpen: false,
    waterUsed: 1100,
    temperature: 26,
    humidity: 60,
    lastWatered: "1 hour ago",
    flowRate: 0,
    dailyUsage: [100, 120, 140, 115, 125, 105, 120],
    weeklyTarget: 800,
    soilPh: 6.5,
    plantingDate: "2024-03-20",
    expectedHarvest: "2024-07-20",
  },
  4: {
    id: 4,
    name: "Section D",
    crop: "Peppers",
    moisture: 30,
    threshold: 40,
    valveOpen: true,
    waterUsed: 950,
    temperature: 25,
    humidity: 68,
    lastWatered: "30 min ago",
    flowRate: 12.8,
    dailyUsage: [90, 110, 130, 105, 115, 95, 110],
    weeklyTarget: 750,
    soilPh: 6.9,
    plantingDate: "2024-03-25",
    expectedHarvest: "2024-07-25",
  },
  5: {
    id: 5,
    name: "Section E",
    crop: "Arecanut",
    moisture: 30,
    threshold: 40,
    valveOpen: true,
    waterUsed: 950,
    temperature: 25,
    humidity: 68,
    lastWatered: "30 min ago",
    flowRate: 12.8,
    dailyUsage: [90, 110, 130, 105, 115, 95, 110],
    weeklyTarget: 750,
    soilPh: 6.9,
    plantingDate: "2024-03-25",
    expectedHarvest: "2024-07-25",
  },
}

export default function SectionDetail({ sectionId, onBack }: SectionDetailProps) {
  const section = sectionDetails[sectionId as keyof typeof sectionDetails]
  const [currentSection, setCurrentSection] = useState(section)

  if (!section) {
    return (
      <div className="min-h-screen bg-background p-4 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold mb-2">Section not found</h2>
          <Button onClick={onBack}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Dashboard
          </Button>
        </div>
      </div>
    )
  }

  const toggleValve = () => {
    setCurrentSection((prev) => ({
      ...prev,
      valveOpen: !prev.valveOpen,
      flowRate: !prev.valveOpen ? Math.random() * 20 + 10 : 0,
    }))
  }

  const updateThreshold = (newThreshold: number) => {
    setCurrentSection((prev) => ({
      ...prev,
      threshold: newThreshold,
    }))
  }

  const getMoistureStatus = (moisture: number, threshold: number) => {
    if (moisture < threshold - 10)
      return { status: "Critical", color: "destructive", bgColor: "bg-red-200 border-red-200" }
    if (moisture < threshold) return { status: "Low", color: "secondary", bgColor: "bg-yellow-100 border-orange-200" }
    return { status: "Optimal", color: "default", bgColor: "bg-green-200 border-green-200" }
  }

  const moistureStatus = getMoistureStatus(currentSection.moisture, currentSection.threshold)

  return (
    <div className="min-h-screen bg-background p-3 md:p-6">
      <div className="max-w-7xl mx-auto space-y-4 md:space-y-6">
        {/* Header */}
        <div className="flex flex-col items-center text-center gap-3">
          <Button variant="outline" size="sm" onClick={onBack}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div className="flex flex-col items-center">
            <div className="flex items-center gap-2">
              <MapPin className="h-5 w-5" />
              <h1 className="text-xl md:text-2xl font-bold">{currentSection.name}</h1>
              <Badge variant={moistureStatus.color as any}>{moistureStatus.status}</Badge>
            </div>
            <p className="text-sm text-muted-foreground">
              {currentSection.crop} • Planted {currentSection.plantingDate}
            </p>
          </div>
        </div>

        {/* Main Status Card */}
        <Card className={`${moistureStatus.bgColor} transition-all duration-200`}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 dark:text-black">
              <Gauge className="h-5 w-5 dark:text-black" />
              Current Status
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Moisture Level - Prominent */}
            <div className="space-y-3">
              <div className="flex justify-between items-center dark:text-black">
                <span className="text-lg font-medium">Soil Moisture</span>
                <span className="text-3xl font-bold">{currentSection.moisture}%</span>
              </div>
              <Progress value={currentSection.moisture} className="h-4 dark:text-black" />
              <div className="flex justify-between text-sm text-muted-foreground dark:text-black">
                <span>Target: {currentSection.threshold}%</span>
                <span className={currentSection.moisture < currentSection.threshold ? "text-red-600 font-medium" : ""}>
                  {currentSection.moisture < currentSection.threshold
                    ? `${currentSection.threshold - currentSection.moisture}% below target`
                    : "Above target"}
                </span>
              </div>
            </div>

            {/* Environmental Grid */}
            {/* <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center p-3 bg-background rounded-lg">
                <Thermometer className="h-4 w-4 mx-auto mb-1 text-orange-500" />
                <div className="text-sm text-muted-foreground">Temperature</div>
                <div className="text-lg font-semibold">{currentSection.temperature}°C</div>
              </div>
              <div className="text-center p-3 bg-background rounded-lg">
                <Droplets className="h-4 w-4 mx-auto mb-1 text-blue-500" />
                <div className="text-sm text-muted-foreground">Humidity</div>
                <div className="text-lg font-semibold">{currentSection.humidity}%</div>
              </div>
              <div className="text-center p-3 bg-background rounded-lg">
                <Activity className="h-4 w-4 mx-auto mb-1 text-green-500" />
                <div className="text-sm text-muted-foreground">Soil pH</div>
                <div className="text-lg font-semibold">{currentSection.soilPh}</div>
              </div>
              <div className="text-center p-3 bg-background rounded-lg">
                <Clock className="h-4 w-4 mx-auto mb-1 text-purple-500" />
                <div className="text-sm text-muted-foreground">Last Watered</div>
                <div className="text-lg font-semibold">{currentSection.lastWatered}</div>
              </div>
            </div> */}
          </CardContent>
        </Card>

        {/* Valve Control */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="h-5 w-5" />
              Irrigation Control
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Valve Switch */}
            <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <div
                    className={`w-3 h-3 rounded-full ${currentSection.valveOpen ? "bg-green-500 animate-pulse" : "bg-gray-400"}`}
                  ></div>
                  <span className="font-medium">Water Valve</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  {currentSection.valveOpen
                    ? `Irrigating at ${currentSection.flowRate.toFixed(1)} L/min`
                    : "Irrigation stopped"}
                </p>
              </div>
              <Switch
                checked={currentSection.valveOpen}
                onCheckedChange={toggleValve}
                className="data-[state=checked]:bg-green-600 scale-125"
              />
            </div>

            {/* Threshold Setting */}
            <div className="space-y-4 p-4 bg-muted rounded-lg">
              <div className="flex justify-between items-center">
                <label className="font-medium">Auto-irrigation Threshold</label>
                <span className="text-lg font-bold text-blue-600">{currentSection.threshold}%</span>
              </div>
              <Slider
                value={[currentSection.threshold]}
                onValueChange={(value) => updateThreshold(value[0])}
                max={100}
                min={10}
                step={5}
                className="w-full"
              />
              <p className="text-sm text-muted-foreground">
                Valve opens automatically when moisture drops below this level
              </p>
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-2 gap-3">
              <Button variant={currentSection.valveOpen ? "destructive" : "default"} onClick={toggleValve}>
                <Power className="h-4 w-4 mr-2" />
                {currentSection.valveOpen ? "Stop Irrigation" : "Start Irrigation"}
              </Button>
              <Button variant="outline" onClick={() => updateThreshold(currentSection.moisture + 5)}>
                <Settings className="h-4 w-4 mr-2" />
                Auto-adjust
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Water Usage Analytics */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Water Usage Analytics
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Today's Usage */}
            <div className="flex justify-between items-center p-3 bg-muted rounded-lg">
              <div>
                <div className="font-medium">Today's Usage</div>
                <div className="text-sm text-muted-foreground">Target: {currentSection.weeklyTarget / 7}L/day</div>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold">{currentSection.waterUsed}L</div>
                <div className="text-sm text-green-600">Within target</div>
              </div>
            </div>

            {/* Weekly Usage Chart */}
            <div className="space-y-3">
              <h4 className="font-medium">Last 7 Days</h4>
              <div className="space-y-2">
                {currentSection.dailyUsage.map((usage, index) => {
                  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
                  const maxUsage = Math.max(...currentSection.dailyUsage)
                  return (
                    <div key={index} className="flex items-center gap-3">
                      <div className="w-8 text-sm">{days[index]}</div>
                      <div className="flex-1">
                        <Progress value={(usage / maxUsage) * 100} className="h-2" />
                      </div>
                      <div className="w-12 text-sm text-right">{usage}L</div>
                    </div>
                  )
                })}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Crop Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Crop Information
            </CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-3 bg-muted rounded-lg">
              <div className="text-sm text-muted-foreground">Crop Type</div>
              <div className="font-semibold">{currentSection.crop}</div>
            </div>
            <div className="text-center p-3 bg-muted rounded-lg">
              <div className="text-sm text-muted-foreground">Planted</div>
              <div className="font-semibold">{currentSection.plantingDate}</div>
            </div>
            <div className="text-center p-3 bg-muted rounded-lg">
              <div className="text-sm text-muted-foreground">Expected Harvest</div>
              <div className="font-semibold">{currentSection.expectedHarvest}</div>
            </div>
          </CardContent>
        </Card>

        {/* Status Alert */}
        {/* {currentSection.moisture < currentSection.threshold ? (
          <Card className="border-orange-200 bg-orange-50">
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <AlertTriangle className="h-5 w-5 text-orange-600" />
                <div>
                  <div className="font-medium text-orange-800">Action Required</div>
                  <div className="text-sm text-orange-700">
                    Soil moisture is below the set threshold. Consider starting irrigation.
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ) : (
          <Card className="border-green-200 bg-green-50">
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <CheckCircle className="h-5 w-5 text-green-600" />
                <div>
                  <div className="font-medium text-green-800">Optimal Conditions</div>
                  <div className="text-sm text-green-700">Soil moisture level is within the optimal range.</div>
                </div>
              </div>
            </CardContent>
          </Card>
        )} */}
      </div>
    </div>
  )
}
