"use client"

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { Badge } from '@/components/ui/badge'
import { Checkbox } from '@/components/ui/checkbox'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import {
  Calendar,
  Clock,
  Play,
  Pause,
  Edit,
  Trash2,
  Plus,
  Settings,
  AlertTriangle,
  CheckCircle,
  Loader2,
  Zap,
  Droplets,
  Thermometer,
  Cloud,
  Users
} from 'lucide-react'
import { api } from '@/lib/api'

interface Schedule {
  id: string
  name: string
  farm_id: number
  section_ids: number[]
  start_time: string
  duration_minutes: number
  frequency: string
  days_of_week: number[]
  day_of_month?: number
  is_active: boolean
  weather_dependent: boolean
  min_temperature?: number
  max_temperature?: number
  min_moisture?: number
  created_by: string
  created_at: string
  updated_at: string
  next_run?: string
  last_run?: string
}

interface Section {
  id: number
  name: string
}

interface SchedulingSystemProps {
  sections: Section[]
  onScheduleChange?: () => void
}

const DAYS_OF_WEEK = [
  { value: 0, label: 'Sunday' },
  { value: 1, label: 'Monday' },
  { value: 2, label: 'Tuesday' },
  { value: 3, label: 'Wednesday' },
  { value: 4, label: 'Thursday' },
  { value: 5, label: 'Friday' },
  { value: 6, label: 'Saturday' }
]

export default function SchedulingSystem({ sections, onScheduleChange }: SchedulingSystemProps) {
  const [schedules, setSchedules] = useState<Schedule[]>([])
  const [loading, setLoading] = useState(false)
  const [showCreateForm, setShowCreateForm] = useState(false)
  const [editingSchedule, setEditingSchedule] = useState<Schedule | null>(null)
  const [formData, setFormData] = useState({
    name: '',
    section_ids: [] as number[],
    start_time: '06:00',
    duration_minutes: 30,
    frequency: 'daily',
    days_of_week: [] as number[],
    day_of_month: 1,
    weather_dependent: false,
    min_temperature: undefined as number | undefined,
    max_temperature: undefined as number | undefined,
    min_moisture: undefined as number | undefined
  })

  useEffect(() => {
    fetchSchedules()
  }, [])

  const fetchSchedules = async () => {
    setLoading(true)
    try {
      const data = await api.getSchedules()
      setSchedules(data)
    } catch (error) {
      console.error('Error fetching schedules:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleCreateSchedule = async () => {
    try {
      await api.createSchedule(formData)
      setShowCreateForm(false)
      resetForm()
      fetchSchedules()
      onScheduleChange?.()
    } catch (error) {
      console.error('Error creating schedule:', error)
    }
  }

  const handleUpdateSchedule = async () => {
    if (!editingSchedule) return
    
    try {
      await api.updateSchedule(editingSchedule.id, formData)
      setEditingSchedule(null)
      resetForm()
      fetchSchedules()
      onScheduleChange?.()
    } catch (error) {
      console.error('Error updating schedule:', error)
    }
  }

  const handleDeleteSchedule = async (scheduleId: string) => {
    if (!confirm('Are you sure you want to delete this schedule?')) return
    
    try {
      await api.deleteSchedule(scheduleId)
      fetchSchedules()
      onScheduleChange?.()
    } catch (error) {
      console.error('Error deleting schedule:', error)
    }
  }

  const handleToggleSchedule = async (scheduleId: string) => {
    try {
      await api.toggleSchedule(scheduleId)
      fetchSchedules()
      onScheduleChange?.()
    } catch (error) {
      console.error('Error toggling schedule:', error)
    }
  }

  const resetForm = () => {
    setFormData({
      name: '',
      section_ids: [],
      start_time: '06:00',
      duration_minutes: 30,
      frequency: 'daily',
      days_of_week: [],
      day_of_month: 1,
      weather_dependent: false,
      min_temperature: undefined,
      max_temperature: undefined,
      min_moisture: undefined
    })
  }

  const editSchedule = (schedule: Schedule) => {
    setEditingSchedule(schedule)
    setFormData({
      name: schedule.name,
      section_ids: schedule.section_ids,
      start_time: schedule.start_time,
      duration_minutes: schedule.duration_minutes,
      frequency: schedule.frequency,
      days_of_week: schedule.days_of_week,
      day_of_month: schedule.day_of_month || 1,
      weather_dependent: schedule.weather_dependent,
      min_temperature: schedule.min_temperature,
      max_temperature: schedule.max_temperature,
      min_moisture: schedule.min_moisture
    })
  }

  const getFrequencyDescription = (schedule: Schedule) => {
    switch (schedule.frequency) {
      case 'daily':
        return 'Daily'
      case 'weekly':
        if (schedule.days_of_week.length === 0) return 'Weekly'
        const days = schedule.days_of_week.map(d => DAYS_OF_WEEK[d].label).join(', ')
        return `Weekly (${days})`
      case 'monthly':
        return `Monthly (day ${schedule.day_of_month})`
      default:
        return schedule.frequency
    }
  }

  const getNextRunDisplay = (schedule: Schedule) => {
    if (!schedule.next_run) return 'Not scheduled'
    const nextRun = new Date(schedule.next_run)
    const now = new Date()
    const diffMs = nextRun.getTime() - now.getTime()
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60))
    const diffDays = Math.floor(diffHours / 24)
    
    if (diffDays > 0) {
      return `In ${diffDays} day${diffDays > 1 ? 's' : ''}`
    } else if (diffHours > 0) {
      return `In ${diffHours} hour${diffHours > 1 ? 's' : ''}`
    } else {
      return 'Soon'
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Irrigation Schedules</h2>
          <p className="text-muted-foreground">Manage automated irrigation schedules</p>
        </div>
        <Button onClick={() => setShowCreateForm(true)}>
          <Plus className="h-4 w-4 mr-2" />
          New Schedule
        </Button>
      </div>

      {/* Create/Edit Form */}
      {(showCreateForm || editingSchedule) && (
        <Card>
          <CardHeader>
            <CardTitle>
              {editingSchedule ? 'Edit Schedule' : 'Create New Schedule'}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name">Schedule Name</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Morning Irrigation"
                />
              </div>

              <div>
                <Label htmlFor="start_time">Start Time</Label>
                <Input
                  id="start_time"
                  type="time"
                  value={formData.start_time}
                  onChange={(e) => setFormData({ ...formData, start_time: e.target.value })}
                />
              </div>

              <div>
                <Label htmlFor="duration">Duration (minutes)</Label>
                <Input
                  id="duration"
                  type="number"
                  value={formData.duration_minutes}
                  onChange={(e) => setFormData({ ...formData, duration_minutes: parseInt(e.target.value) || 30 })}
                  min={1}
                  max={480}
                />
              </div>

              <div>
                <Label htmlFor="frequency">Frequency</Label>
                <Select
                  value={formData.frequency}
                  onValueChange={(value) => setFormData({ ...formData, frequency: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="daily">Daily</SelectItem>
                    <SelectItem value="weekly">Weekly</SelectItem>
                    <SelectItem value="monthly">Monthly</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {formData.frequency === 'weekly' && (
                <div className="md:col-span-2">
                  <Label>Days of Week</Label>
                  <div className="grid grid-cols-4 gap-2 mt-2">
                    {DAYS_OF_WEEK.map((day) => (
                      <div key={day.value} className="flex items-center space-x-2">
                        <Checkbox
                          id={`day-${day.value}`}
                          checked={formData.days_of_week.includes(day.value)}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              setFormData({
                                ...formData,
                                days_of_week: [...formData.days_of_week, day.value]
                              })
                            } else {
                              setFormData({
                                ...formData,
                                days_of_week: formData.days_of_week.filter(d => d !== day.value)
                              })
                            }
                          }}
                        />
                        <Label htmlFor={`day-${day.value}`} className="text-sm">
                          {day.label}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {formData.frequency === 'monthly' && (
                <div>
                  <Label htmlFor="day_of_month">Day of Month</Label>
                  <Input
                    id="day_of_month"
                    type="number"
                    value={formData.day_of_month}
                    onChange={(e) => setFormData({ ...formData, day_of_month: parseInt(e.target.value) || 1 })}
                    min={1}
                    max={31}
                  />
                </div>
              )}

              <div className="md:col-span-2">
                <Label>Sections</Label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mt-2">
                  {sections.map((section) => (
                    <div key={section.id} className="flex items-center space-x-2">
                      <Checkbox
                        id={`section-${section.id}`}
                        checked={formData.section_ids.includes(section.id)}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            setFormData({
                              ...formData,
                              section_ids: [...formData.section_ids, section.id]
                            })
                          } else {
                            setFormData({
                              ...formData,
                              section_ids: formData.section_ids.filter(id => id !== section.id)
                            })
                          }
                        }}
                      />
                      <Label htmlFor={`section-${section.id}`} className="text-sm">
                        {section.name}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Weather and Conditions */}
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Switch
                  checked={formData.weather_dependent}
                  onCheckedChange={(checked) => setFormData({ ...formData, weather_dependent: checked })}
                />
                <Label>Weather Dependent (skip if rain forecast)</Label>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="min_temperature">Min Temperature (°C)</Label>
                  <Input
                    id="min_temperature"
                    type="number"
                    value={formData.min_temperature || ''}
                    onChange={(e) => setFormData({ ...formData, min_temperature: e.target.value ? parseFloat(e.target.value) : undefined })}
                    placeholder="Optional"
                  />
                </div>

                <div>
                  <Label htmlFor="max_temperature">Max Temperature (°C)</Label>
                  <Input
                    id="max_temperature"
                    type="number"
                    value={formData.max_temperature || ''}
                    onChange={(e) => setFormData({ ...formData, max_temperature: e.target.value ? parseFloat(e.target.value) : undefined })}
                    placeholder="Optional"
                  />
                </div>

                <div>
                  <Label htmlFor="min_moisture">Min Moisture (%)</Label>
                  <Input
                    id="min_moisture"
                    type="number"
                    value={formData.min_moisture || ''}
                    onChange={(e) => setFormData({ ...formData, min_moisture: e.target.value ? parseInt(e.target.value) : undefined })}
                    placeholder="Optional"
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-end space-x-2">
              <Button
                variant="outline"
                onClick={() => {
                  setShowCreateForm(false)
                  setEditingSchedule(null)
                  resetForm()
                }}
              >
                Cancel
              </Button>
              <Button
                onClick={editingSchedule ? handleUpdateSchedule : handleCreateSchedule}
                disabled={!formData.name || formData.section_ids.length === 0}
              >
                {editingSchedule ? 'Update Schedule' : 'Create Schedule'}
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Schedules List */}
      {loading ? (
        <div className="flex items-center justify-center p-8">
          <Loader2 className="h-8 w-8 animate-spin" />
        </div>
      ) : (
        <div className="grid gap-4">
          {schedules.map((schedule) => (
            <Card key={schedule.id}>
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="text-lg font-semibold">{schedule.name}</h3>
                      <Badge variant={schedule.is_active ? 'default' : 'secondary'}>
                        {schedule.is_active ? 'Active' : 'Inactive'}
                      </Badge>
                      {schedule.weather_dependent && (
                        <Badge variant="outline" className="flex items-center gap-1">
                          <Cloud className="h-3 w-3" />
                          Weather
                        </Badge>
                      )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4" />
                        <span>{schedule.start_time} ({schedule.duration_minutes} min)</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4" />
                        <span>{getFrequencyDescription(schedule)}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4" />
                        <span>{schedule.section_ids.length} section(s)</span>
                      </div>
                    </div>

                    <div className="mt-4 flex items-center gap-4 text-sm">
                      <div className="flex items-center gap-2">
                        <Zap className="h-4 w-4" />
                        <span>Next: {getNextRunDisplay(schedule)}</span>
                      </div>
                      {schedule.last_run && (
                        <div className="flex items-center gap-2">
                          <Droplets className="h-4 w-4" />
                          <span>Last: {new Date(schedule.last_run).toLocaleDateString()}</span>
                        </div>
                      )}
                    </div>

                    {/* Conditions */}
                    {(schedule.min_temperature || schedule.max_temperature || schedule.min_moisture) && (
                      <div className="mt-3 flex items-center gap-4 text-sm">
                        {schedule.min_temperature && (
                          <div className="flex items-center gap-1">
                            <Thermometer className="h-3 w-3" />
                            <span>Min: {schedule.min_temperature}°C</span>
                          </div>
                        )}
                        {schedule.max_temperature && (
                          <div className="flex items-center gap-1">
                            <Thermometer className="h-3 w-3" />
                            <span>Max: {schedule.max_temperature}°C</span>
                          </div>
                        )}
                        {schedule.min_moisture && (
                          <div className="flex items-center gap-1">
                            <Droplets className="h-3 w-3" />
                            <span>Min: {schedule.min_moisture}%</span>
                          </div>
                        )}
                      </div>
                    )}
                  </div>

                  <div className="flex items-center gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleToggleSchedule(schedule.id)}
                    >
                      {schedule.is_active ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => editSchedule(schedule)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleDeleteSchedule(schedule.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}

          {schedules.length === 0 && (
            <Card>
              <CardContent className="p-8 text-center">
                <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-medium mb-2">No Schedules</h3>
                <p className="text-muted-foreground mb-4">
                  Create your first irrigation schedule to automate watering.
                </p>
                <Button onClick={() => setShowCreateForm(true)}>
                  <Plus className="h-4 w-4 mr-2" />
                  Create Schedule
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      )}
    </div>
  )
} 