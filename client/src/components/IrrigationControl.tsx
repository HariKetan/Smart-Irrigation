"use client"

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Switch } from '@/components/ui/switch'
import { Slider } from '@/components/ui/slider'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Separator } from '@/components/ui/separator'
import {
  Play,
  Square,
  Settings,
  Gauge,
  Clock,
  Droplets,
  Power,
  AlertTriangle,
  CheckCircle,
  Wifi,
  Signal,
  Thermometer,
  Save,
  RefreshCw,
  Timer,
  Zap,
  Loader2
} from 'lucide-react'
import { api } from '@/lib/api'
import { useWebSocket } from '@/hooks/useWebSocket'

interface IrrigationControlProps {
  farmId: number
  sectionNumber: number
  currentMode?: string
  currentValveState?: boolean
  currentMoisture?: number
  currentThreshold?: number
  deviceStatus?: any
  reportingInterval?: number
  onModeChange?: (mode: string) => void
  onValveChange?: (valveOpen: boolean) => void
  onConfigUpdate?: (config: any) => void
}

interface DeviceConfig {
  threshold: number
  enableDeepSleep: boolean
  deepSleepDuration: number
  reportingInterval: number
}

export default function IrrigationControl({
  farmId,
  sectionNumber,
  currentMode = 'auto',
  currentValveState = false,
  currentMoisture = 0,
  currentThreshold = 30,
  deviceStatus,
  reportingInterval = 60,
  onModeChange,
  onValveChange,
  onConfigUpdate
}: IrrigationControlProps) {
  const [mode, setMode] = useState(currentMode)
  const [valveOpen, setValveOpen] = useState(currentValveState)
  const [moisture, setMoisture] = useState(currentMoisture)
  const [threshold, setThreshold] = useState(currentThreshold)
  const [duration, setDuration] = useState(60) // seconds
  const [irrigating, setIrrigating] = useState(false)
  const [loading, setLoading] = useState(false)
  const [config, setConfig] = useState<DeviceConfig>({
    threshold: currentThreshold,
    enableDeepSleep: false,
    deepSleepDuration: 300,
    reportingInterval: 60
  })
  const [showConfig, setShowConfig] = useState(false)
  const [lastUpdate, setLastUpdate] = useState<Date>(new Date())
  const [thresholdSaveStatus, setThresholdSaveStatus] = useState<{
    success?: boolean
    message?: string
  }>({})

  // WebSocket for real-time updates
  const { isConnected: wsConnected, sendMessage } = useWebSocket({
    onMessage: (message) => {
      console.log('📨 IrrigationControl received WebSocket message:', message);
      if (message.type === 'section_update' && message.data.farm_id === farmId && message.data.section_number === sectionNumber) {
        console.log('✅ Processing section update for this section:', { farmId, sectionNumber });
        // Update local state with real-time data
        if (message.data.moisture_value !== undefined) {
          console.log('💧 Updating moisture value:', message.data.moisture_value);
          setMoisture(message.data.moisture_value)
        }
        if (message.data.valve_open !== undefined) {
          console.log('🚰 Updating valve state:', message.data.valve_open);
          setValveOpen(message.data.valve_open)
          setIrrigating(message.data.valve_open)
        }
        if (message.data.mode !== undefined) {
          console.log('⚙️ Updating mode:', message.data.mode);
          setMode(message.data.mode)
        }
        setLastUpdate(new Date())
      } else {
        console.log('❌ Message not for this section or wrong type:', { 
          messageType: message.type, 
          messageFarmId: message.data?.farm_id, 
          messageSectionNumber: message.data?.section_number,
          expectedFarmId: farmId,
          expectedSectionNumber: sectionNumber
        });
      }
    },
    onConnect: () => {
      console.log('🔌 WebSocket connected, subscribing to section updates:', { farmId, sectionNumber });
      // Subscribe to section updates
      sendMessage({
        type: 'subscribe',
        farmId: farmId,
        sectionNumber: sectionNumber
      })
    }
  })

  // Update local state when props change
  useEffect(() => {
    setMode(currentMode)
    setValveOpen(currentValveState)
    setMoisture(currentMoisture)
    setThreshold(currentThreshold)
  }, [currentMode, currentValveState, currentMoisture, currentThreshold])

  const handleModeToggle = async () => {
    const newMode = mode === 'auto' ? 'manual' : 'auto'
    setLoading(true)
    try {
      await api.setMode(farmId, sectionNumber, newMode)
      setMode(newMode)
      onModeChange?.(newMode)
    } catch (error) {
      console.error('Error changing mode:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleStartIrrigation = async () => {
    console.log('🚰 Starting irrigation...', { farmId, sectionNumber, duration });
    setLoading(true)
    try {
      await api.startIrrigation(farmId, sectionNumber, duration)
      console.log('✅ Irrigation started successfully');
      setIrrigating(true)
      setValveOpen(true)
      onValveChange?.(true)
      setLastUpdate(new Date())
    } catch (error) {
      console.error('❌ Error starting irrigation:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleStopIrrigation = async () => {
    console.log('🛑 Stopping irrigation...', { farmId, sectionNumber });
    setLoading(true)
    try {
      await api.stopIrrigation(farmId, sectionNumber)
      console.log('✅ Irrigation stopped successfully');
      setIrrigating(false)
      setValveOpen(false)
      onValveChange?.(false)
      setLastUpdate(new Date())
    } catch (error) {
      console.error('❌ Error stopping irrigation:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleThresholdChange = (value: number[]) => {
    setThreshold(value[0])
  }

  const handleThresholdSave = async () => {
    setLoading(true)
    setThresholdSaveStatus({})
    try {
      await api.updateConfig(farmId, sectionNumber, { threshold })
      onConfigUpdate?.({ threshold })
      setLastUpdate(new Date())
      setThresholdSaveStatus({
        success: true,
        message: `Threshold updated to ${threshold}% successfully!`
      })
      // Clear success message after 3 seconds
      setTimeout(() => setThresholdSaveStatus({}), 3000)
    } catch (error) {
      console.error('Error updating threshold:', error)
      setThresholdSaveStatus({
        success: false,
        message: error instanceof Error ? error.message : 'Failed to update threshold'
      })
    } finally {
      setLoading(false)
    }
  }

  const handleConfigSave = async () => {
    setLoading(true)
    try {
      await api.updateConfig(farmId, sectionNumber, config)
      onConfigUpdate?.(config)
      setShowConfig(false)
      setLastUpdate(new Date())
    } catch (error) {
      console.error('Error updating config:', error)
    } finally {
      setLoading(false)
    }
  }

  const getMoistureStatus = (moisture: number, threshold: number) => {
    if (moisture < threshold * 0.7) return 'critical'
    if (moisture < threshold) return 'low'
    if (moisture < threshold * 1.3) return 'good'
    return 'excellent'
  }

  const moistureStatus = getMoistureStatus(moisture, threshold)
  const moistureColor = {
    critical: 'text-red-500',
    low: 'text-orange-500',
    good: 'text-green-500',
    excellent: 'text-blue-500'
  }[moistureStatus]

  const moistureBgColor = {
    critical: 'bg-red-100',
    low: 'bg-orange-100',
    good: 'bg-green-100',
    excellent: 'bg-blue-100'
  }[moistureStatus]

  return (
    <div className="space-y-4">
      {/* Mode Control */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5" />
            Irrigation Mode
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div>
              <Label className="text-sm font-medium">Current Mode</Label>
              <div className="flex items-center gap-2 mt-1">
                <Badge variant={mode === 'auto' ? 'default' : 'secondary'}>
                  {mode === 'auto' ? 'Automatic' : 'Manual'}
                </Badge>
                {mode === 'auto' && (
                  <span className="text-sm text-muted-foreground">
                    Threshold: {threshold}%
                  </span>
                )}
              </div>
            </div>
            <Switch
              checked={mode === 'auto'}
              onCheckedChange={handleModeToggle}
              disabled={loading}
            />
          </div>
        </CardContent>
      </Card>

      {/* Live Mode Indicator */}
      {reportingInterval <= 10 && (
        <Card className="border-green-200 bg-green-50">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-green-800">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              Live Mode Active
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm text-green-700">Reporting Interval</span>
                <Badge variant="default" className="bg-green-600">
                  {reportingInterval} seconds
                </Badge>
              </div>
              <div className="text-xs text-green-600">
                • Real-time moisture monitoring every {reportingInterval} seconds
                • Immediate irrigation controller response
                • High battery usage - monitor device power
                • Perfect for critical monitoring and testing
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Manual Irrigation Control */}
      {mode === 'manual' && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="h-5 w-5" />
              Manual Irrigation Control
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Duration Control */}
            <div>
              <Label className="text-sm font-medium">Duration (seconds)</Label>
              <div className="flex items-center gap-4 mt-2">
                <Slider
                  value={[duration]}
                  onValueChange={(value) => setDuration(value[0])}
                  max={3600}
                  min={10}
                  step={10}
                  className="flex-1"
                />
                <Input
                  type="number"
                  value={duration}
                  onChange={(e) => setDuration(parseInt(e.target.value) || 60)}
                  min={10}
                  max={3600}
                  className="w-20"
                />
              </div>
              <div className="text-xs text-muted-foreground mt-1">
                {Math.floor(duration / 60)}m {duration % 60}s
              </div>
            </div>

            {/* Control Buttons */}
            <div className="flex gap-2">
              <Button
                onClick={handleStartIrrigation}
                disabled={loading || irrigating}
                className="flex-1"
                variant="default"
              >
                <Play className="h-4 w-4 mr-2" />
                Start Irrigation
              </Button>
              <Button
                onClick={handleStopIrrigation}
                disabled={loading || !irrigating}
                className="flex-1"
                variant="destructive"
              >
                <Square className="h-4 w-4 mr-2" />
                Stop Irrigation
              </Button>
            </div>

            {/* Status */}
            {irrigating && (
              <div className="flex items-center gap-2 p-3 bg-blue-50 rounded-lg">
                <Timer className="h-4 w-4 text-blue-500 animate-pulse" />
                <span className="text-sm font-medium text-blue-700">
                  Irrigating for {Math.floor(duration / 60)}m {duration % 60}s
                </span>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Auto Mode Settings */}
      {mode === 'auto' && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Gauge className="h-5 w-5" />
              Automatic Mode Settings
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Threshold Control */}
            <div>
              <Label className="text-sm font-medium">Moisture Threshold</Label>
              <div className="flex items-center gap-4 mt-2">
                <Slider
                  value={[threshold]}
                  onValueChange={handleThresholdChange}
                  max={80}
                  min={10}
                  step={5}
                  className="flex-1"
                />
                <Input
                  type="number"
                  value={threshold}
                  onChange={(e) => setThreshold(parseInt(e.target.value) || 30)}
                  min={10}
                  max={80}
                  className="w-20"
                />
                <span className="text-sm">%</span>
              </div>
            </div>

            {/* Current Status */}
            <div className="p-3 rounded-lg border">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">Current Moisture</span>
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className={moistureColor}>
                    {moisture}%
                  </Badge>
                  <div className="flex items-center gap-1">
                    <div className={`w-2 h-2 rounded-full ${wsConnected ? 'bg-green-500 animate-pulse' : 'bg-gray-400'}`}></div>
                    <span className="text-xs text-muted-foreground">
                      {wsConnected ? 'Live' : 'Offline'}
                    </span>
                  </div>
                </div>
              </div>
              <Progress value={moisture} max={100} className="mb-2" />
              <div className="text-xs text-muted-foreground">
                {moisture < threshold ? 'Irrigation needed' : 'Moisture level adequate'}
              </div>
              <div className="text-xs text-muted-foreground mt-1">
                Last updated: {lastUpdate.toLocaleTimeString()}
              </div>
            </div>

            {/* Send Threshold to Device */}
            <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
              <div>
                <div className="text-sm font-medium text-blue-800">Threshold Update</div>
                <div className="text-xs text-blue-600">
                  Send new threshold ({threshold}%) to device
                </div>
              </div>
              <Button
                onClick={handleThresholdSave}
                disabled={loading || threshold === currentThreshold}
                size="sm"
                variant="default"
              >
                {loading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Save className="h-4 w-4" />
                )}
                {loading ? 'Sending...' : 'Send to Device'}
              </Button>
            </div>

            {/* Status Messages */}
            {thresholdSaveStatus.message && (
              <div className={`flex items-center gap-2 p-3 rounded-lg ${
                thresholdSaveStatus.success 
                  ? 'bg-green-50 border border-green-200' 
                  : 'bg-red-50 border border-red-200'
              }`}>
                {thresholdSaveStatus.success ? (
                  <CheckCircle className="h-4 w-4 text-green-600" />
                ) : (
                  <AlertTriangle className="h-4 w-4 text-red-600" />
                )}
                <span className={`text-sm ${
                  thresholdSaveStatus.success ? 'text-green-800' : 'text-red-800'
                }`}>
                  {thresholdSaveStatus.message}
                </span>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Live Moisture Readings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Thermometer className="h-5 w-5" />
            Live Moisture Readings
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Real-time Moisture Display */}
          <div className="p-4 rounded-lg border-2 border-dashed border-blue-200 bg-blue-50">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <div className={`w-3 h-3 rounded-full ${wsConnected ? 'bg-green-500 animate-pulse' : 'bg-gray-400'}`}></div>
                <span className="text-sm font-medium">
                  {wsConnected ? 'Live Data' : 'Offline'}
                </span>
              </div>
              <div className="text-xs text-muted-foreground">
                Updated: {lastUpdate.toLocaleTimeString()}
              </div>
            </div>
            
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600 mb-2">
                {moisture}%
              </div>
              <div className="text-sm text-muted-foreground">
                Current Soil Moisture
              </div>
            </div>

            <div className="mt-4">
              <div className="flex justify-between text-sm mb-1">
                <span>Moisture Level</span>
                <span>{moisture}%</span>
              </div>
              <Progress value={moisture} max={100} className="h-3" />
              <div className="flex justify-between text-xs text-muted-foreground mt-1">
                <span>0%</span>
                <span>50%</span>
                <span>100%</span>
              </div>
            </div>

            {/* Status Indicator */}
            <div className="mt-3 p-2 rounded-lg bg-white">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Status</span>
                <Badge variant={moisture < threshold ? 'destructive' : 'default'}>
                  {moisture < threshold ? 'Needs Water' : 'Adequate'}
                </Badge>
              </div>
              <div className="text-xs text-muted-foreground mt-1">
                Threshold: {threshold}% • Difference: {Math.abs(moisture - threshold)}%
              </div>
            </div>
          </div>

          {/* Connection Status */}
          <div className="flex items-center justify-between p-2 bg-muted rounded-lg">
            <div className="flex items-center gap-2">
              <Signal className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm">WebSocket Connection</span>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant={wsConnected ? 'default' : 'secondary'}>
                {wsConnected ? 'Connected' : 'Disconnected'}
              </Badge>
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  // Trigger a refresh by sending a message to request latest data
                  sendMessage({
                    type: 'request_update',
                    farmId: farmId,
                    sectionNumber: sectionNumber
                  })
                  setLastUpdate(new Date())
                }}
                disabled={loading}
              >
                <RefreshCw className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Device Status */}
      {deviceStatus && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Signal className="h-5 w-5" />
              Device Status
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center gap-2">
                <Wifi className={`h-4 w-4 ${deviceStatus.wifi ? 'text-green-500' : 'text-red-500'}`} />
                <span className="text-sm">WiFi</span>
                <Badge variant={deviceStatus.wifi ? 'default' : 'destructive'} className="text-xs">
                  {deviceStatus.wifi ? 'Connected' : 'Disconnected'}
                </Badge>
              </div>
              <div className="flex items-center gap-2">
                <Signal className={`h-4 w-4 ${deviceStatus.mqtt ? 'text-green-500' : 'text-red-500'}`} />
                <span className="text-sm">MQTT</span>
                <Badge variant={deviceStatus.mqtt ? 'default' : 'destructive'} className="text-xs">
                  {deviceStatus.mqtt ? 'Connected' : 'Disconnected'}
                </Badge>
              </div>
              <div className="flex items-center gap-2">
                <Power className={`h-4 w-4 ${valveOpen ? 'text-green-500' : 'text-gray-500'}`} />
                <span className="text-sm">Valve</span>
                <Badge variant={valveOpen ? 'default' : 'secondary'} className="text-xs">
                  {valveOpen ? 'Open' : 'Closed'}
                </Badge>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-blue-500" />
                <span className="text-sm">Uptime</span>
                <span className="text-xs text-muted-foreground">
                  {Math.floor(deviceStatus.uptime / 3600)}h {Math.floor((deviceStatus.uptime % 3600) / 60)}m
                </span>
              </div>
            </div>
            {deviceStatus.last_error && (
              <div className="mt-3 p-2 bg-red-50 rounded-lg">
                <div className="flex items-center gap-2">
                  <AlertTriangle className="h-4 w-4 text-red-500" />
                  <span className="text-sm text-red-700">Error: {deviceStatus.last_error}</span>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Advanced Configuration */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5" />
            Advanced Configuration
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowConfig(!showConfig)}
              className="ml-auto"
            >
              {showConfig ? 'Hide' : 'Show'}
            </Button>
          </CardTitle>
        </CardHeader>
        {showConfig && (
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="text-sm font-medium">Reporting Interval (seconds)</Label>
                <Input
                  type="number"
                  value={config.reportingInterval}
                  onChange={(e) => setConfig({...config, reportingInterval: parseInt(e.target.value) || 60})}
                  min={30}
                  max={3600}
                  className="mt-1"
                />
              </div>
              <div>
                <Label className="text-sm font-medium">Deep Sleep Duration (seconds)</Label>
                <Input
                  type="number"
                  value={config.deepSleepDuration}
                  onChange={(e) => setConfig({...config, deepSleepDuration: parseInt(e.target.value) || 300})}
                  min={60}
                  max={3600}
                  className="mt-1"
                />
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Switch
                checked={config.enableDeepSleep}
                onCheckedChange={(checked) => setConfig({...config, enableDeepSleep: checked})}
              />
              <Label className="text-sm">Enable Deep Sleep</Label>
            </div>
            <Button
              onClick={handleConfigSave}
              disabled={loading}
              className="w-full"
            >
              <Save className="h-4 w-4 mr-2" />
              Save Configuration
            </Button>
          </CardContent>
        )}
      </Card>

      {/* Status Footer */}
      <div className="flex items-center justify-between text-xs text-muted-foreground">
        <span>Last updated: {lastUpdate.toLocaleTimeString()}</span>
        <div className="flex items-center gap-1">
          <div className={`w-2 h-2 rounded-full ${wsConnected ? 'bg-green-500' : 'bg-red-500'}`}></div>
          <span>{wsConnected ? 'Live' : 'Offline'}</span>
        </div>
      </div>
    </div>
  )
} 