"use client"

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  Play,
  Square,
  Zap,
  Clock,
  CheckCircle,
  AlertTriangle,
  Loader2,
  Settings
} from 'lucide-react'
import { api } from '@/lib/api'

interface CronServiceControlProps {
  onStatusChange?: () => void
}

export default function CronServiceControl({ onStatusChange }: CronServiceControlProps) {
  const [isRunning, setIsRunning] = useState(false)
  const [loading, setLoading] = useState(false)
  const [lastCheck, setLastCheck] = useState<Date | null>(null)

  useEffect(() => {
    fetchStatus()
  }, [])

  const fetchStatus = async () => {
    try {
      const status = await api.getCronStatus() as { isRunning: boolean }
      setIsRunning(status.isRunning)
      setLastCheck(new Date())
    } catch (error) {
      console.error('Error fetching cron status:', error)
    }
  }

  const handleStart = async () => {
    setLoading(true)
    try {
      await api.startCronService()
      await fetchStatus()
      onStatusChange?.()
    } catch (error) {
      console.error('Error starting cron service:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleStop = async () => {
    setLoading(true)
    try {
      await api.stopCronService()
      await fetchStatus()
      onStatusChange?.()
    } catch (error) {
      console.error('Error stopping cron service:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleManualTrigger = async () => {
    setLoading(true)
    try {
      await api.triggerCronManually()
      await fetchStatus()
      onStatusChange?.()
    } catch (error) {
      console.error('Error triggering cron manually:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Settings className="h-5 w-5" />
          Automation Service
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Status Display */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium">Status:</span>
            <Badge variant={isRunning ? 'default' : 'secondary'}>
              <div className="flex items-center gap-1">
                {isRunning ? (
                  <>
                    <CheckCircle className="h-3 w-3" />
                    Running
                  </>
                ) : (
                  <>
                    <AlertTriangle className="h-3 w-3" />
                    Stopped
                  </>
                )}
              </div>
            </Badge>
          </div>
          {lastCheck && (
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <Clock className="h-3 w-3" />
              Last check: {lastCheck.toLocaleTimeString()}
            </div>
          )}
        </div>

        {/* Service Description */}
        <div className="text-sm text-muted-foreground">
          <p>The automation service automatically executes scheduled irrigations based on your configured schedules.</p>
          <ul className="mt-2 space-y-1">
            <li>• Checks for scheduled irrigations every minute</li>
            <li>• Cleans up old records daily at 2 AM</li>
            <li>• Generates upcoming schedules daily at 3 AM</li>
          </ul>
        </div>

        {/* Control Buttons */}
        <div className="flex gap-2">
          {isRunning ? (
            <Button
              onClick={handleStop}
              disabled={loading}
              variant="destructive"
              size="sm"
            >
              {loading ? (
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              ) : (
                <Square className="h-4 w-4 mr-2" />
              )}
              Stop Service
            </Button>
          ) : (
            <Button
              onClick={handleStart}
              disabled={loading}
              size="sm"
            >
              {loading ? (
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              ) : (
                <Play className="h-4 w-4 mr-2" />
              )}
              Start Service
            </Button>
          )}

          <Button
            onClick={handleManualTrigger}
            disabled={loading || !isRunning}
            variant="outline"
            size="sm"
          >
            {loading ? (
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
            ) : (
              <Zap className="h-4 w-4 mr-2" />
            )}
            Manual Trigger
          </Button>

          <Button
            onClick={fetchStatus}
            disabled={loading}
            variant="outline"
            size="sm"
          >
            <Clock className="h-4 w-4 mr-2" />
            Refresh
          </Button>
        </div>

        {/* Current Status Info */}
        {isRunning && (
          <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
            <div className="flex items-center gap-2 text-green-800">
              <CheckCircle className="h-4 w-4" />
              <span className="text-sm font-medium">Service Active</span>
            </div>
            <p className="text-xs text-green-700 mt-1">
              The automation service is running and will execute scheduled irrigations automatically.
            </p>
          </div>
        )}

        {!isRunning && (
          <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
            <div className="flex items-center gap-2 text-yellow-800">
              <AlertTriangle className="h-4 w-4" />
              <span className="text-sm font-medium">Service Inactive</span>
            </div>
            <p className="text-xs text-yellow-700 mt-1">
              The automation service is stopped. Scheduled irrigations will not execute automatically.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  )
} 