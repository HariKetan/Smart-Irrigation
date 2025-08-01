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
import { api } from '@/lib/api'
import IrrigationControl from '@/components/IrrigationControl'
import ReportingIntervalControl from '@/components/ReportingIntervalControl'
import { MoistureChart } from '@/components/MoistureChart'
import { DeviceStatus } from '@/components/DeviceStatus'

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

interface MoistureReading {
  id: number;
  farm_id: number;
  section_id: number;
  value: number;
  timestamp: string;
  farm?: any;
  section?: any;
}

export default function SectionDetailPage() {
  const params = useParams()
  const router = useRouter()
  const [section, setSection] = useState<Section | null>(null)
  const [sectionUsage, setSectionUsage] = useState<SectionUsage | null>(null)
  const [dailyUsage, setDailyUsage] = useState<DailyUsage[]>([])
  const [moistureReadings, setMoistureReadings] = useState<MoistureReading[]>([])
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

  const farmId = parseInt(params.farmId as string)
  const sectionNumber = parseInt(params.sectionNumber as string)

  const fetchSection = async () => {
    try {
      // Get section data using new API structure
      const sectionData = await api.getSection(farmId, sectionNumber) as any;
      setSection(sectionData);
      
      // Get section usage statistics
      const usageData = await api.getSectionUsage(7) as any[];
      const sectionUsageData = usageData.find((usage: any) => usage.section_number === sectionNumber);
      setSectionUsage(sectionUsageData || null);
      
      // Get daily usage statistics
      const dailyData = await api.getDailyUsage(7, sectionNumber) as any[];
      setDailyUsage(dailyData);
      
      // Get moisture readings for this section
      const readingsData = await api.getSectionReadings(farmId, sectionNumber) as any[];
      setMoistureReadings(readingsData);

      // Update device config from section data
      if (sectionData.deviceStatus) {
        setDeviceConfig({
          threshold: sectionData.deviceStatus.threshold || 40,
          enableDeepSleep: false, // Default values
          deepSleepDuration: 60,
          reportingInterval: 60
        })
      }
    } catch (error) {
      console.error('Error fetching section:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (farmId && sectionNumber) {
      fetchSection()
    }
  }, [farmId, sectionNumber])

  const handleValveToggle = async () => {
    if (!section) return
    
    setToggling(true)
    try {
      await api.toggleValve(farmId, sectionNumber, { 
        valveOpen: !section.valveOpen,
        duration: 60 // 60 seconds default
      });
      // Refresh section data
      await fetchSection()
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
      await api.setMode(farmId, sectionNumber, newMode);
      await fetchSection()
    } catch (error) {
      console.error('Error changing mode:', error)
    }
  }

  const handleConfigUpdate = async () => {
    if (!section) return
    
    setConfiguring(true)
    try {
      await api.updateConfig(farmId, sectionNumber, deviceConfig)
      await fetchSection()
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
              <DeviceStatus data={section.deviceStatus} />
            </CardContent>
          </Card>
        )}

        {/* Moisture Chart */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Moisture Readings
            </CardTitle>
          </CardHeader>
          <CardContent>
            <MoistureChart data={moistureReadings} />
          </CardContent>
        </Card>

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

        {/* Irrigation Control */}
        <IrrigationControl
          farmId={farmId}
          sectionNumber={sectionNumber}
          initialMode={section.mode || 'manual'}
          initialMoisture={section.moisture || 0}
          initialValveOpen={section.valveOpen || false}
        />

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

            </div>
            <Button onClick={handleConfigUpdate} disabled={configuring} className="w-full">
              <Save className="h-4 w-4 mr-2" />
              {configuring ? 'Updating...' : 'Update Configuration'}
            </Button>
          </CardContent>
        </Card>

        {/* Reporting Interval Control */}
        <ReportingIntervalControl
          farmId={farmId}
          sectionNumber={sectionNumber}
          currentInterval={deviceConfig.reportingInterval}
          onIntervalChange={(newInterval) => {
            setDeviceConfig(prev => ({ ...prev, reportingInterval: newInterval }))
          }}
        />

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