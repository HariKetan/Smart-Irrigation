"use client"

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Calendar,
  Clock,
  Droplets,
  Thermometer,
  Cloud,
  AlertTriangle,
  CheckCircle,
  Loader2
} from 'lucide-react'
import { api } from '@/lib/api'
import SchedulingSystem from '@/components/SchedulingSystem'
import CronServiceControl from '@/components/CronServiceControl'

interface Section {
  id: number
  name: string
}

interface ScheduleStats {
  total: number
  byStatus: {
    executed?: number
    skipped?: number
    failed?: number
    pending?: number
  }
}

export default function SchedulingPage() {
  const [sections, setSections] = useState<Section[]>([])
  const [upcomingIrrigations, setUpcomingIrrigations] = useState<any[]>([])
  const [scheduleStats, setScheduleStats] = useState<ScheduleStats | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    setLoading(true)
    try {
      // Fetch sections
      const sectionsData = await api.getSections() as Section[]
      setSections(sectionsData)

      // Fetch upcoming irrigations
      const upcomingData = await api.getUpcomingIrrigations(24) as any[]
      setUpcomingIrrigations(upcomingData)

      // Fetch schedule stats
      const statsData = await api.getScheduleStats(30) as ScheduleStats
      setScheduleStats(statsData)
    } catch (error) {
      console.error('Error fetching scheduling data:', error)
    } finally {
      setLoading(false)
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'executed':
        return 'bg-green-100 text-green-800'
      case 'skipped':
        return 'bg-yellow-100 text-yellow-800'
      case 'failed':
        return 'bg-red-100 text-red-800'
      case 'pending':
        return 'bg-blue-100 text-blue-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'executed':
        return <CheckCircle className="h-4 w-4" />
      case 'skipped':
        return <AlertTriangle className="h-4 w-4" />
      case 'failed':
        return <AlertTriangle className="h-4 w-4" />
      case 'pending':
        return <Clock className="h-4 w-4" />
      default:
        return <Clock className="h-4 w-4" />
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
          <p className="text-muted-foreground">Loading scheduling system...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">Irrigation Scheduling</h1>
        <p className="text-muted-foreground">
          Manage automated irrigation schedules and monitor upcoming events
        </p>
      </div>

      {/* Stats Overview */}
      {scheduleStats && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Scheduled</p>
                  <p className="text-2xl font-bold">{scheduleStats.total}</p>
                </div>
                <Calendar className="h-8 w-8 text-muted-foreground" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Executed</p>
                  <p className="text-2xl font-bold text-green-600">
                    {scheduleStats.byStatus.executed || 0}
                  </p>
                </div>
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Skipped</p>
                  <p className="text-2xl font-bold text-yellow-600">
                    {scheduleStats.byStatus.skipped || 0}
                  </p>
                </div>
                <AlertTriangle className="h-8 w-8 text-yellow-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Failed</p>
                  <p className="text-2xl font-bold text-red-600">
                    {scheduleStats.byStatus.failed || 0}
                  </p>
                </div>
                <AlertTriangle className="h-8 w-8 text-red-600" />
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Upcoming Irrigations */}
      {upcomingIrrigations.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              Upcoming Irrigations (Next 24 Hours)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {upcomingIrrigations.map((irrigation) => (
                <div
                  key={irrigation.id}
                  className="flex items-center justify-between p-3 border rounded-lg"
                >
                  <div className="flex items-center gap-4">
                    <div>
                      <p className="font-medium">{irrigation.schedule?.name}</p>
                      <p className="text-sm text-muted-foreground">
                        Section {irrigation.section?.name}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">
                        {new Date(irrigation.scheduled_time).toLocaleString()}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Droplets className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">
                        {irrigation.duration_minutes} minutes
                      </span>
                    </div>
                  </div>
                  <Badge className={getStatusColor(irrigation.status)}>
                    <div className="flex items-center gap-1">
                      {getStatusIcon(irrigation.status)}
                      {irrigation.status}
                    </div>
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Cron Service Control */}
      <CronServiceControl onStatusChange={fetchData} />

      {/* Scheduling System */}
      <SchedulingSystem
        sections={sections}
        onScheduleChange={fetchData}
      />
    </div>
  )
} 