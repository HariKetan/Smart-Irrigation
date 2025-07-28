'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Switch } from '@/components/ui/switch'
import { Slider } from '@/components/ui/slider'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
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
  Activity,
  TrendingUp,
  Calendar,
  Zap,
  Wifi,
  Signal,
  Thermometer,
  Save,
  RefreshCw
} from 'lucide-react'
import { getApiBaseUrl } from '@/lib/api'

interface Section {
  id: number | string
  name: string
  crop: string
  moisture: number
  threshold: number
  waterUsed: number
  valveOpen: boolean
  lastIrrigation?: string
  nextIrrigation?: string
  area?: number
  location?: string
  flowRate?: number
  dailyUsage?: number[]
  weeklyTarget?: number
  soilPh?: number
  plantingDate?: string
  expectedHarvest?: string
  mode?: string
  deviceStatus?: any
  farm?: any
}

interface SectionUsage {
  section_id: number;
  water_liters: number;
  event_count: number;
  avg_duration_minutes: number;
  last_irrigation: string;
}

interface DailyUsage {
  date: string;
  water_liters: number;
  event_count: number;
  avg_duration_minutes: number;
}

interface DeviceConfig {
  threshold: number;
  enableDeepSleep: boolean;
  deepSleepDuration: number;
  reportingInterval: number;
}

export default function SectionDetailPage() {
  const params = useParams()
  const router = useRouter()
  const [section, setSection] = useState<Section | null>(null)
  const [sectionUsage, setSectionUsage] = useState<SectionUsage | null>(null)
  const [dailyUsage, setDailyUsage] = useState<DailyUsage[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [toggling, setToggling] = useState(false)
  const [configuring, setConfiguring] = useState(false)
  const [deviceConfig, setDeviceConfig] = useState<DeviceConfig>({
    threshold: 40,
    enableDeepSleep: false,
    deepSleepDuration: 60,
    reportingInterval: 60
  })

  const sectionId = params.id as string

  const fetchSection = async () => {
    try {
      const apiBaseUrl = getApiBaseUrl()
      const [sectionResponse, usageResponse, dailyResponse] = await Promise.all([
        fetch(`${apiBaseUrl}/api/real/sections/${sectionId}`),
        fetch(`${apiBaseUrl}/api/real/irrigation-events/section-usage?days=7`),
        fetch(`${apiBaseUrl}/api/real/irrigation-events/daily-usage?days=7&section_id=${sectionId}`)
      ])
      
      if (sectionResponse.ok && usageResponse.ok && dailyResponse.ok) {
        const sectionData = await sectionResponse.json()
        const usageData = await usageResponse.json()
        const dailyData = await dailyResponse.json()
        
        // Find the usage data for this specific section
        const sectionUsageData = usageData.find((usage: SectionUsage) => 
          usage.section_id === parseInt(sectionId)
        )
        
        setSection(sectionData)
        setSectionUsage(sectionUsageData || null)
        setDailyUsage(dailyData)

        // Update device config from section data
        if (sectionData.deviceStatus) {
          setDeviceConfig({
            threshold: sectionData.deviceStatus.threshold || 40,
            enableDeepSleep: false, // Default values
            deepSleepDuration: 60,
            reportingInterval: 60
          })
        }
      } else {
        console.error('Failed to fetch section data')
      }
    } catch (error) {
      console.error('Error fetching section:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (sectionId) {
      fetchSection()
    }
  }, [sectionId])

  const handleValveToggle = async () => {
    if (!section) return
    
    setToggling(true)
    try {
      const apiBaseUrl = getApiBaseUrl()
      const response = await fetch(`${apiBaseUrl}/api/real/sections/${sectionId}/valve`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          valveOpen: !section.valveOpen,
          duration: 60 // 60 seconds default
        }),
      })

      if (response.ok) {
        // Refresh section data
        await fetchSection()
      } else {
        console.error('Failed to toggle valve')
      }
    } catch (error) {
      console.error('Error toggling valve:', error)
    } finally {
      setToggling(false)
    }
  }

  const handleModeToggle = async () => {
    if (!section) return
    
    try {
      const newMode = section.mode === 'auto' ? 'manual' : 'auto'
      const apiBaseUrl = getApiBaseUrl()
      const response = await fetch(`${apiBaseUrl}/api/real/sections/${sectionId}/mode`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ mode: newMode }),
      })

      if (response.ok) {
        await fetchSection()
      } else {
        console.error('Failed to change mode')
      }
    } catch (error) {
      console.error('Error changing mode:', error)
    }
  }

  const handleConfigUpdate = async () => {
    if (!section) return
    
    setConfiguring(true)
    try {
      const apiBaseUrl = getApiBaseUrl()
      const response = await fetch(`${apiBaseUrl}/api/real/sections/${sectionId}/config`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(deviceConfig),
      })

      if (response.ok) {
        await fetchSection()
      } else {
        console.error('Failed to update configuration')
      }
    } catch (error) {
      console.error('Error updating configuration:', error)
    } finally {
      setConfiguring(false)
    }
  }

  const updateThreshold = (newThreshold: number) => {
    setDeviceConfig(prev => ({ ...prev, threshold: newThreshold }))
  }

  const getMoistureStatus = (moisture: number, threshold: number) => {
    if (moisture < threshold - 10)
      return { status: "Critical", color: "destructive", bgColor: "bg-red-200 border-red-200" }
    if (moisture < threshold) return { status: "Low", color: "secondary", bgColor: "bg-yellow-100 border-orange-200" }
    return { status: "Optimal", color: "default", bgColor: "bg-green-200 border-green-200" }
  }

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading section details...</p>
          </div>
        </div>
      </div>
    )
  }

  if (error || !section) {
    return (
      <div className="min-h-screen bg-background p-4 flex items-center justify-center">
        <div className="text-center">
          <AlertTriangle className="h-12 w-12 text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-semibold mb-2">Error Loading Section</h2>
          <p className="text-muted-foreground mb-4">{error || 'Section not found'}</p>
          <Button onClick={() => router.back()}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Go Back
          </Button>
        </div>
      </div>
    )
  }

  const moistureStatus = getMoistureStatus(section.moisture, deviceConfig.threshold)

  return (
    <div className="min-h-screen bg-background p-3 md:p-6">
      <div className="max-w-7xl mx-auto space-y-4 md:space-y-6">
        {/* Header */}
        <div className="flex flex-col items-center text-center gap-3">
          <Button variant="outline" size="sm" onClick={() => router.back()}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div className="flex flex-col items-center">
            <div className="flex items-center gap-2">
              <MapPin className="h-5 w-5" />
              <h1 className="text-xl md:text-2xl font-bold">{section.name}</h1>
              <Badge variant={moistureStatus.color as any}>{moistureStatus.status}</Badge>
            </div>
            <p className="text-sm text-muted-foreground">
              {section.crop} • Planted {section.plantingDate}
            </p>
          </div>
        </div>

        {/* Device Status */}
        {section.deviceStatus && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="h-5 w-5" />
                Device Status
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="flex items-center gap-2">
                  <div className={`w-3 h-3 rounded-full ${section.deviceStatus.wifi ? 'bg-green-500' : 'bg-red-500'}`}></div>
                  <div>
                    <div className="text-sm font-medium">WiFi</div>
                    <div className="text-xs text-muted-foreground">
                      {section.deviceStatus.wifi ? 'Connected' : 'Disconnected'}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className={`w-3 h-3 rounded-full ${section.deviceStatus.mqtt ? 'bg-green-500' : 'bg-red-500'}`}></div>
                  <div>
                    <div className="text-sm font-medium">MQTT</div>
                    <div className="text-xs text-muted-foreground">
                      {section.deviceStatus.mqtt ? 'Connected' : 'Disconnected'}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-blue-500" />
                  <div>
                    <div className="text-sm font-medium">Uptime</div>
                    <div className="text-xs text-muted-foreground">
                      {Math.round(section.deviceStatus.uptime / 1000 / 60)} minutes
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Thermometer className="h-4 w-4 text-orange-500" />
                  <div>
                    <div className="text-sm font-medium">Latest Moisture</div>
                    <div className="text-xs text-muted-foreground">
                      {section.deviceStatus.latest_moisture || 0}%
                    </div>
                  </div>
                </div>
              </div>
              {section.deviceStatus.last_error && (
                <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                  <div className="flex items-center gap-2">
                    <AlertTriangle className="h-4 w-4 text-red-500" />
                    <div className="text-sm text-red-700">
                      Last Error: {section.deviceStatus.last_error}
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        )}

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
                <span className="text-3xl font-bold">{section.moisture}%</span>
              </div>
              <Progress value={section.moisture} className="h-4 dark:text-black" />
              <div className="flex justify-between text-sm text-muted-foreground dark:text-black">
                <span>Target: {deviceConfig.threshold}%</span>
                <span className={section.moisture < deviceConfig.threshold ? "text-red-600 font-medium" : ""}>
                  {section.moisture < deviceConfig.threshold
                    ? `${deviceConfig.threshold - section.moisture}% below target`
                    : "Above target"}
                </span>
              </div>
            </div>
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
                    className={`w-3 h-3 rounded-full ${section.valveOpen ? "bg-green-500 animate-pulse" : "bg-gray-400"}`}
                  ></div>
                  <span className="font-medium">Water Valve</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  {section.valveOpen
                    ? `Irrigating at ${section.flowRate?.toFixed(1) ?? 0} L/min`
                    : "Irrigation stopped"}
                </p>
              </div>
              <Switch
                checked={section.valveOpen}
                onCheckedChange={handleValveToggle}
                disabled={toggling}
                className="data-[state=checked]:bg-green-600 scale-125"
              />
            </div>

            {/* Mode Control */}
            <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <Zap className="h-4 w-4 text-blue-500" />
                  <span className="font-medium">Operation Mode</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  {section.mode === 'auto' 
                    ? 'Automatic irrigation based on moisture levels'
                    : 'Manual control only'}
                </p>
              </div>
              <Switch
                checked={section.mode === 'auto'}
                onCheckedChange={handleModeToggle}
                className="data-[state=checked]:bg-blue-600 scale-125"
              />
            </div>

            {/* Threshold Setting */}
            <div className="space-y-4 p-4 bg-muted rounded-lg">
              <div className="flex justify-between items-center">
                <label className="font-medium">Auto-irrigation Threshold</label>
                <span className="text-lg font-bold text-blue-600">{deviceConfig.threshold}%</span>
              </div>
              <Slider
                value={[deviceConfig.threshold]}
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
              <Button variant={section.valveOpen ? "destructive" : "default"} onClick={handleValveToggle} disabled={toggling}>
                <Power className="h-4 w-4 mr-2" />
                {toggling ? (
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                ) : (
                  <>
                    {section.valveOpen ? "Stop Irrigation" : "Start Irrigation"}
                  </>
                )}
              </Button>
              <Button variant="outline" onClick={handleModeToggle}>
                <Settings className="h-4 w-4 mr-2" />
                {section.mode === 'auto' ? 'Switch to Manual' : 'Switch to Auto'}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Device Configuration */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="h-5 w-5" />
              Device Configuration
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="deepSleep">Enable Deep Sleep</Label>
                <Switch
                  id="deepSleep"
                  checked={deviceConfig.enableDeepSleep}
                  onCheckedChange={(checked) => 
                    setDeviceConfig(prev => ({ ...prev, enableDeepSleep: checked }))
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="deepSleepDuration">Deep Sleep Duration (seconds)</Label>
                <Input
                  id="deepSleepDuration"
                  type="number"
                  value={deviceConfig.deepSleepDuration}
                  onChange={(e) => 
                    setDeviceConfig(prev => ({ ...prev, deepSleepDuration: parseInt(e.target.value) }))
                  }
                  min={10}
                  max={3600}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="reportingInterval">Reporting Interval (seconds)</Label>
                <Input
                  id="reportingInterval"
                  type="number"
                  value={deviceConfig.reportingInterval}
                  onChange={(e) => 
                    setDeviceConfig(prev => ({ ...prev, reportingInterval: parseInt(e.target.value) }))
                  }
                  min={10}
                  max={3600}
                />
              </div>
            </div>
            <Button onClick={handleConfigUpdate} disabled={configuring} className="w-full">
              <Save className="h-4 w-4 mr-2" />
              {configuring ? 'Updating...' : 'Update Configuration'}
            </Button>
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
                <div className="text-sm text-muted-foreground">Target: {section.weeklyTarget ? section.weeklyTarget / 7 : 0}L/day</div>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold">{sectionUsage?.water_liters ?? 0}L</div>
                <div className="text-sm text-green-600">Within target</div>
              </div>
            </div>

            {/* Weekly Usage Chart */}
            <div className="space-y-3">
              <h4 className="font-medium">Last 7 Days</h4>
              <div className="space-y-2">
                {(dailyUsage ?? []).map((usage, index) => {
                  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
                  const maxUsage = Math.max(...dailyUsage.map(u => u.water_liters), 1)
                  const date = new Date(usage.date)
                  return (
                    <div key={index} className="flex items-center gap-3">
                      <div className="w-8 text-sm">{days[date.getDay()]}</div>
                      <div className="flex-1">
                        <Progress value={(usage.water_liters / maxUsage) * 100} className="h-2" />
                      </div>
                      <div className="w-12 text-sm text-right">{usage.water_liters}L</div>
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
              <div className="font-semibold">{section.crop}</div>
            </div>
            <div className="text-center p-3 bg-muted rounded-lg">
              <div className="text-sm text-muted-foreground">Planted</div>
              <div className="font-semibold">{section.plantingDate}</div>
            </div>
            <div className="text-center p-3 bg-muted rounded-lg">
              <div className="text-sm text-muted-foreground">Expected Harvest</div>
              <div className="font-semibold">{section.expectedHarvest}</div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
} 