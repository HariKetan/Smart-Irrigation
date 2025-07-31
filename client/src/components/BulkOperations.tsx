"use client"

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Switch } from '@/components/ui/switch'
import { Slider } from '@/components/ui/slider'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { Checkbox } from '@/components/ui/checkbox'
import {
  Play,
  Square,
  Settings,
  Zap,
  CheckCircle,
  AlertTriangle,
  Loader2,
  Users,
  Target,
  Clock
} from 'lucide-react'
import { api } from '@/lib/api'

interface Section {
  id: number
  name: string
  moisture?: number
  valveOpen?: boolean
  mode?: string
}

interface BulkOperationsProps {
  sections: Section[]
  onOperationComplete?: () => void
}

interface BulkOperationResult {
  sectionId: number
  success: boolean
  message?: string
  error?: string
}

export default function BulkOperations({ sections, onOperationComplete }: BulkOperationsProps) {
  const [selectedSections, setSelectedSections] = useState<number[]>([])
  const [operation, setOperation] = useState<'irrigate' | 'stop' | 'mode' | 'config'>('irrigate')
  const [duration, setDuration] = useState(60)
  const [mode, setMode] = useState('manual')
  const [threshold, setThreshold] = useState(30)
  const [loading, setLoading] = useState(false)
  const [results, setResults] = useState<BulkOperationResult[]>([])

  const handleSectionToggle = (sectionId: number) => {
    setSelectedSections(prev => 
      prev.includes(sectionId) 
        ? prev.filter(id => id !== sectionId)
        : [...prev, sectionId]
    )
  }

  const handleSelectAll = () => {
    if (selectedSections.length === sections.length) {
      setSelectedSections([])
    } else {
      setSelectedSections(sections.map(s => s.id))
    }
  }

  const executeBulkOperation = async () => {
    if (selectedSections.length === 0) return

    setLoading(true)
    setResults([])

    try {
      let response: any

      switch (operation) {
        case 'irrigate':
          response = await api.bulkIrrigate(selectedSections, duration, mode)
          break
        case 'stop':
          response = await api.bulkStopIrrigation(selectedSections)
          break
        case 'mode':
          response = await api.bulkSetMode(selectedSections, mode)
          break
        case 'config':
          response = await api.bulkUpdateConfig(selectedSections, { threshold })
          break
      }

      if (response.success) {
        setResults(response.results || [])
        onOperationComplete?.()
      }
    } catch (error) {
      console.error('Bulk operation failed:', error)
      setResults([{
        sectionId: 0,
        success: false,
        error: 'Operation failed'
      }])
    } finally {
      setLoading(false)
    }
  }

  const getOperationDescription = () => {
    switch (operation) {
      case 'irrigate':
        return `Start irrigation for ${selectedSections.length} sections for ${Math.floor(duration / 60)}m ${duration % 60}s`
      case 'stop':
        return `Stop irrigation for ${selectedSections.length} sections`
      case 'mode':
        return `Set ${selectedSections.length} sections to ${mode} mode`
      case 'config':
        return `Update threshold to ${threshold}% for ${selectedSections.length} sections`
    }
  }

  const successfulResults = results.filter(r => r.success).length
  const failedResults = results.filter(r => !r.success).length

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Users className="h-5 w-5" />
          Bulk Operations
          {selectedSections.length > 0 && (
            <Badge variant="secondary">{selectedSections.length} selected</Badge>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Section Selection */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label className="text-sm font-medium">Select Sections</Label>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleSelectAll}
            >
              {selectedSections.length === sections.length ? 'Deselect All' : 'Select All'}
            </Button>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2 max-h-32 overflow-y-auto">
            {sections.map((section) => (
              <div key={section.id} className="flex items-center space-x-2">
                <Checkbox
                  id={`section-${section.id}`}
                  checked={selectedSections.includes(section.id)}
                  onCheckedChange={() => handleSectionToggle(section.id)}
                />
                <Label htmlFor={`section-${section.id}`} className="text-sm">
                  {section.name}
                </Label>
              </div>
            ))}
          </div>
        </div>

        {/* Operation Selection */}
        <div className="space-y-2">
          <Label className="text-sm font-medium">Operation Type</Label>
          <div className="grid grid-cols-2 gap-2">
            <Button
              variant={operation === 'irrigate' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setOperation('irrigate')}
            >
              <Play className="h-4 w-4 mr-1" />
              Irrigate
            </Button>
            <Button
              variant={operation === 'stop' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setOperation('stop')}
            >
              <Square className="h-4 w-4 mr-1" />
              Stop
            </Button>
            <Button
              variant={operation === 'mode' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setOperation('mode')}
            >
              <Settings className="h-4 w-4 mr-1" />
              Mode
            </Button>
            <Button
              variant={operation === 'config' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setOperation('config')}
            >
              <Target className="h-4 w-4 mr-1" />
              Config
            </Button>
          </div>
        </div>

        {/* Operation Parameters */}
        {operation === 'irrigate' && (
          <div className="space-y-4">
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

            <div>
              <Label className="text-sm font-medium">Mode</Label>
              <div className="flex items-center space-x-2 mt-2">
                <Switch
                  checked={mode === 'auto'}
                  onCheckedChange={(checked) => setMode(checked ? 'auto' : 'manual')}
                />
                <span className="text-sm">{mode === 'auto' ? 'Automatic' : 'Manual'}</span>
              </div>
            </div>
          </div>
        )}

        {operation === 'mode' && (
          <div>
            <Label className="text-sm font-medium">Mode</Label>
            <div className="flex items-center space-x-2 mt-2">
              <Switch
                checked={mode === 'auto'}
                onCheckedChange={(checked) => setMode(checked ? 'auto' : 'manual')}
              />
              <span className="text-sm">{mode === 'auto' ? 'Automatic' : 'Manual'}</span>
            </div>
          </div>
        )}

        {operation === 'config' && (
          <div>
            <Label className="text-sm font-medium">Moisture Threshold (%)</Label>
            <div className="flex items-center gap-4 mt-2">
              <Slider
                value={[threshold]}
                onValueChange={(value) => setThreshold(value[0])}
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
            </div>
          </div>
        )}

        {/* Execute Button */}
        <Button
          onClick={executeBulkOperation}
          disabled={loading || selectedSections.length === 0}
          className="w-full"
        >
          {loading ? (
            <>
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              Executing...
            </>
          ) : (
            <>
              <Zap className="h-4 w-4 mr-2" />
              {getOperationDescription()}
            </>
          )}
        </Button>

        {/* Results */}
        {results.length > 0 && (
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="font-medium">Results</span>
              <div className="flex items-center gap-2">
                {successfulResults > 0 && (
                  <div className="flex items-center gap-1 text-green-600">
                    <CheckCircle className="h-4 w-4" />
                    <span>{successfulResults} success</span>
                  </div>
                )}
                {failedResults > 0 && (
                  <div className="flex items-center gap-1 text-red-600">
                    <AlertTriangle className="h-4 w-4" />
                    <span>{failedResults} failed</span>
                  </div>
                )}
              </div>
            </div>
            
            <div className="max-h-32 overflow-y-auto space-y-1">
              {results.map((result, index) => (
                <div
                  key={index}
                  className={`flex items-center gap-2 text-xs p-2 rounded ${
                    result.success ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'
                  }`}
                >
                  {result.success ? (
                    <CheckCircle className="h-3 w-3" />
                  ) : (
                    <AlertTriangle className="h-3 w-3" />
                  )}
                  <span>
                    Section {result.sectionId}: {result.message || result.error}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
} 