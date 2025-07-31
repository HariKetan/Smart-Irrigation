"use client"

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import {
  Clock,
  Save,
  Loader2,
  CheckCircle,
  AlertTriangle,
  Info
} from 'lucide-react'
import { api } from '@/lib/api'

interface ReportingIntervalControlProps {
  farmId: number
  sectionNumber: number
  currentInterval?: number
  onIntervalChange?: (newInterval: number) => void
}

export default function ReportingIntervalControl({
  farmId,
  sectionNumber,
  currentInterval = 60,
  onIntervalChange
}: ReportingIntervalControlProps) {
  const [interval, setInterval] = useState(currentInterval)
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    setInterval(currentInterval)
  }, [currentInterval])

  const handleSave = async () => {
    if (interval < 5 || interval > 3600) {
      setError('Interval must be between 5 and 3600 seconds')
      return
    }

    setLoading(true)
    setError(null)
    setSuccess(false)

    try {
      await api.updateReportingInterval(farmId, sectionNumber, interval)
      setSuccess(true)
      onIntervalChange?.(interval)
      
      // Clear success message after 3 seconds
      setTimeout(() => setSuccess(false), 3000)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update reporting interval')
    } finally {
      setLoading(false)
    }
  }

  const getIntervalDescription = (seconds: number) => {
    if (seconds < 60) return `${seconds} seconds`
    if (seconds === 60) return '1 minute'
    if (seconds < 3600) return `${Math.round(seconds / 60)} minutes`
    if (seconds === 3600) return '1 hour'
    return `${Math.round(seconds / 3600)} hours`
  }

  const getDataFrequency = (seconds: number) => {
    const perMinute = 60 / seconds
    const perHour = 3600 / seconds
    const perDay = 86400 / seconds

    if (perMinute >= 1) return `${perMinute.toFixed(1)} readings per minute`
    if (perHour >= 1) return `${perHour.toFixed(1)} readings per hour`
    return `${perDay.toFixed(1)} readings per day`
  }

  const getBatteryImpact = (seconds: number) => {
    if (seconds <= 10) return { level: 'Very High', color: 'destructive' as const }
    if (seconds <= 30) return { level: 'High', color: 'destructive' as const }
    if (seconds <= 120) return { level: 'Medium', color: 'default' as const }
    return { level: 'Low', color: 'secondary' as const }
  }

  const batteryImpact = getBatteryImpact(interval)

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Clock className="h-5 w-5" />
          Reporting Interval Control
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Current Status */}
        <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm font-medium">Current Interval:</span>
          </div>
          <Badge variant="outline">
            {getIntervalDescription(currentInterval)}
          </Badge>
        </div>

        {/* Interval Input */}
        <div className="space-y-2">
          <Label htmlFor="reporting-interval">Reporting Interval (seconds)</Label>
          <div className="flex gap-2">
                          <Input
                id="reporting-interval"
                type="number"
                value={interval}
                onChange={(e) => setInterval(parseInt(e.target.value) || 60)}
                min={5}
                max={3600}
                className="flex-1"
                placeholder="60"
              />
            <Button
              onClick={handleSave}
              disabled={loading || interval === currentInterval}
              className="min-w-[100px]"
            >
              {loading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Save className="h-4 w-4" />
              )}
              {loading ? 'Saving...' : 'Save'}
            </Button>
          </div>
        </div>

        {/* Quick Presets */}
        <div className="space-y-2">
          <Label className="text-sm font-medium">Quick Presets</Label>
          <div className="flex flex-wrap gap-2">
            {[5, 30, 60, 120, 300, 600].map((preset) => (
              <Button
                key={preset}
                variant={interval === preset ? "default" : "outline"}
                size="sm"
                onClick={() => setInterval(preset)}
                disabled={loading}
              >
                {preset === 5 ? 'Live (5s)' : `${preset}s`}
              </Button>
            ))}
          </div>
        </div>

        {/* Impact Analysis */}
        <div className="space-y-3 p-3 bg-muted/50 rounded-lg">
          <div className="flex items-center gap-2">
            <Info className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm font-medium">Impact Analysis</span>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-sm">
            <div>
              <span className="text-muted-foreground">Data Frequency:</span>
              <div className="font-medium">{getDataFrequency(interval)}</div>
            </div>
            <div>
              <span className="text-muted-foreground">Battery Impact:</span>
              <Badge variant={batteryImpact.color} className="ml-1">
                {batteryImpact.level}
              </Badge>
            </div>
            <div>
              <span className="text-muted-foreground">New Interval:</span>
              <div className="font-medium">{getIntervalDescription(interval)}</div>
            </div>
          </div>
        </div>

        {/* Success/Error Messages */}
        {success && (
          <div className="flex items-center gap-2 p-3 bg-green-50 border border-green-200 rounded-lg">
            <CheckCircle className="h-4 w-4 text-green-600" />
            <span className="text-sm text-green-800">
              Reporting interval updated successfully! Device will apply changes on next cycle.
            </span>
          </div>
        )}

        {error && (
          <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-lg">
            <AlertTriangle className="h-4 w-4 text-red-600" />
            <span className="text-sm text-red-800">{error}</span>
          </div>
        )}

        {/* Information */}
        <div className="text-xs text-muted-foreground space-y-1">
          <p>• Live Mode: 5 seconds (very high battery usage, real-time monitoring)</p>
          <p>• Minimum interval: 10 seconds (high battery usage)</p>
          <p>• Recommended: 60-300 seconds for optimal balance</p>
          <p>• Maximum interval: 3600 seconds (1 hour)</p>
          <p>• Changes take effect on the next reporting cycle</p>
        </div>
      </CardContent>
    </Card>
  )
} 