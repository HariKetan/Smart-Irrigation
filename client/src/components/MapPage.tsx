"use client"

import { useState, useEffect, useRef } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { MapPin, Activity, Droplets, Thermometer, Gauge } from "lucide-react"
import { Loader } from "@googlemaps/js-api-loader"
import { getApiBaseUrl } from "@/lib/api"

interface Sensor {
  id: number
  name: string
  type: 'MOISTURE' | 'PH' | 'NUTRIENT' | 'WATER_FLOW'
  location: string
  isActive: boolean
  zoneId?: number
  zone?: {
    id: number
    name: string
  }
  readings?: {
    id: number
    value: number
    unit: string
    timestamp: string
  }[]
}

interface Valve {
  id: number
  name: string
  isOpen: boolean
  flowRate: number
  location: string
  isActive: boolean
  zoneId?: number
  zone?: {
    id: number
    name: string
  }
}

// Farm boundary coordinates (dotted box)
const farmBoundary = [
  { lat: 12.9232764, lng: 77.5016282 }, // Top-left
  { lat: 12.9233045, lng: 77.5019524 }, // Top-right
  { lat: 12.9229646, lng: 77.5019806 }, // Bottom-right
  { lat: 12.9229499, lng: 77.5016604 }, // Bottom-left
  { lat: 12.9232764, lng: 77.5016282 }, // Back to start (close the polygon)
]

// Section polygons (4 sections inside the farm boundary)
const sectionPolygons = [
  [ // Section 1 (top-left)
    { lat: 12.9232764, lng: 77.5016282 },
    { lat: 12.9232900, lng: 77.5017900 },
    { lat: 12.9231200, lng: 77.5018000 },
    { lat: 12.9231100, lng: 77.5016500 },
    { lat: 12.9232764, lng: 77.5016282 },
  ],
  [ // Section 2 (top-right)
    { lat: 12.9232900, lng: 77.5017900 },
    { lat: 12.9233045, lng: 77.5019524 },
    { lat: 12.9231200, lng: 77.5019700 },
    { lat: 12.9231200, lng: 77.5018000 },
    { lat: 12.9232900, lng: 77.5017900 },
  ],
  [ // Section 3 (bottom-right)
    { lat: 12.9231200, lng: 77.5018000 },
    { lat: 12.9231200, lng: 77.5019700 },
    { lat: 12.9229646, lng: 77.5019806 },
    { lat: 12.9229499, lng: 77.5018200 },
    { lat: 12.9231200, lng: 77.5018000 },
  ],
  [ // Section 4 (bottom-left)
    { lat: 12.9231100, lng: 77.5016500 },
    { lat: 12.9231200, lng: 77.5018000 },
    { lat: 12.9229499, lng: 77.5018200 },
    { lat: 12.9229499, lng: 77.5016604 },
    { lat: 12.9231100, lng: 77.5016500 },
  ],
]

const sectionColors = [
  '#fbbf24', // amber-400
  '#60a5fa', // blue-400
  '#34d399', // green-400
  '#f472b6', // pink-400
]

export default function MapPage() {
  const [selectedSensor, setSelectedSensor] = useState<Sensor | null>(null)
  const [selectedValve, setSelectedValve] = useState<Valve | null>(null)
  const [sensors, setSensors] = useState<Sensor[]>([])
  const [valves, setValves] = useState<Valve[]>([])
  const [loading, setLoading] = useState(true)
  const [map, setMap] = useState<google.maps.Map | null>(null)
  const mapRef = useRef<HTMLDivElement>(null)
  const markersRef = useRef<google.maps.Marker[]>([])
  const infoWindowRef = useRef<google.maps.InfoWindow | null>(null)
  const polygonRef = useRef<google.maps.Polygon | null>(null)

  // Fetch sensors and valves from database
  useEffect(() => {
    const fetchData = async () => {
      try {
        const apiBaseUrl = getApiBaseUrl()
        const [sensorsResponse, valvesResponse] = await Promise.all([
          fetch(`${apiBaseUrl}/api/sensors`),
          fetch(`${apiBaseUrl}/api/valves`)
        ])

        if (sensorsResponse.ok && valvesResponse.ok) {
          const sensorsData = await sensorsResponse.json()
          const valvesData = await valvesResponse.json()
          setSensors(sensorsData)
          setValves(valvesData)
        } else {
          console.error('Failed to fetch data')
        }
      } catch (error) {
        console.error('Error fetching data:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  useEffect(() => {
    const initMap = async () => {
      const loader = new Loader({
        apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "YOUR_API_KEY_HERE",
        version: "weekly",
      })

      try {
        const google = await loader.load()
        
        if (mapRef.current) {
          const mapInstance = new google.maps.Map(mapRef.current, {
            center: { lat: 12.9231345, lng: 77.5018035 }, // Bangalore coordinates
            zoom: 20,
            mapTypeId: google.maps.MapTypeId.TERRAIN,
            mapTypeControl: true,
            streetViewControl: true,
            fullscreenControl: false,
            zoomControl: true,
          })

          setMap(mapInstance)
          infoWindowRef.current = new google.maps.InfoWindow()

          // Add farm boundary polygon (dotted box)
          const farmPolygon = new google.maps.Polygon({
            paths: farmBoundary,
            strokeColor: '#22c55e', // Green color
            strokeOpacity: 1.0,
            strokeWeight: 3,
            fillColor: '#22c55e',
            fillOpacity: 0.1, // Very light fill
            map: mapInstance
          })

          polygonRef.current = farmPolygon

          // Add dotted border effect using multiple polylines
          for (let i = 0; i < farmBoundary.length - 1; i++) {
            const start = farmBoundary[i]
            const end = farmBoundary[i + 1]
            
            // Create a polyline for each edge with dotted style
            new google.maps.Polyline({
              path: [start, end],
              strokeColor: '#22c55e',
              strokeOpacity: 1.0,
              strokeWeight: 3,
              icons: [{
                icon: {
                  path: google.maps.SymbolPath.CIRCLE,
                  scale: 2,
                  fillColor: '#22c55e',
                  fillOpacity: 1,
                  strokeColor: '#22c55e',
                  strokeWeight: 1,
                },
                offset: '0',
                repeat: '10px'
              }],
              map: mapInstance
            })
          }

          // Draw section polygons and add click listeners
          sectionPolygons.forEach((polygonCoords, idx) => {
            const sectionPolygon = new google.maps.Polygon({
              paths: polygonCoords,
              strokeColor: sectionColors[idx],
              strokeOpacity: 0.8,
              strokeWeight: 2,
              fillColor: sectionColors[idx],
              fillOpacity: 0.18,
              map: mapInstance,
              clickable: true,
              zIndex: 2,
            })
            sectionPolygon.addListener('click', () => {
              window.location.href = `/section-detail/${idx + 1}`
            })
          })
        }
      } catch (error) {
        console.error("Error loading Google Maps:", error)
      }
    }

    if (!loading) {
      initMap()
    }
  }, [loading])

  // Add sensor markers when sensors data is loaded
  useEffect(() => {
    if (map && sensors.length > 0) {
      sensors.forEach((sensor) => {
        // Parse location string to get coordinates
        const locationParts = sensor.location.split(',')
        if (locationParts.length >= 2) {
          const lat = parseFloat(locationParts[0].trim())
          const lng = parseFloat(locationParts[1].trim())
          
          if (!isNaN(lat) && !isNaN(lng)) {
            const marker = new google.maps.Marker({
              position: { lat, lng },
              map: map,
              title: sensor.name,
              icon: {
                url: `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(`
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="12" cy="12" r="10" fill="${sensor.isActive ? '#22c55e' : '#ef4444'}" stroke="white" stroke-width="2"/>
                    <text x="12" y="16" text-anchor="middle" fill="white" font-size="12" font-weight="bold">S</text>
                  </svg>
                `)}`,
                scaledSize: new google.maps.Size(24, 24),
              },
            })

            marker.addListener("click", () => {
              setSelectedSensor(sensor)
              if (infoWindowRef.current) {
                const latestReading = sensor.readings?.[0]
                infoWindowRef.current.setContent(`
                  <div style="padding: 8px; min-width: 200px;">
                    <h3 style="margin: 0 0 8px 0; font-weight: bold;">${sensor.name}</h3>
                    <p style="margin: 4px 0; font-size: 14px;">Type: ${sensor.type}</p>
                    <p style="margin: 4px 0; font-size: 14px;">Value: ${latestReading ? `${latestReading.value} ${latestReading.unit}` : 'No data'}</p>
                    <p style="margin: 4px 0; font-size: 14px;">Status: ${sensor.isActive ? 'Active' : 'Inactive'}</p>
                    <p style="margin: 4px 0; font-size: 12px; color: #666;">Zone: ${sensor.zone?.name || 'Unassigned'}</p>
                  </div>
                `)
                infoWindowRef.current.open(map, marker)
              }
            })

            markersRef.current.push(marker)
          }
        }
      })
    }
  }, [map, sensors])

  // Add valve markers when valves data is loaded
  useEffect(() => {
    if (map && valves.length > 0) {
      valves.forEach((valve, idx) => {
        // Parse location string to get coordinates
        const locationParts = valve.location.split(',')
        if (locationParts.length >= 2) {
          const lat = parseFloat(locationParts[0].trim())
          const lng = parseFloat(locationParts[1].trim())
          
          if (!isNaN(lat) && !isNaN(lng)) {
            const marker = new google.maps.Marker({
              position: { lat, lng },
              map: map,
              title: valve.name,
              icon: {
                url: `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(`
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="4" y="4" width="16" height="16" fill="${valve.isOpen ? '#3b82f6' : '#6b7280'}" stroke="white" stroke-width="2"/>
                    <text x="12" y="16" text-anchor="middle" fill="white" font-size="12" font-weight="bold">V</text>
                  </svg>
                `)}`,
                scaledSize: new google.maps.Size(24, 24),
              },
              zIndex: 3,
            })

            marker.addListener("click", () => {
              setSelectedValve(valve)
              if (infoWindowRef.current) {
                infoWindowRef.current.setContent(`
                  <div style="padding: 8px; min-width: 200px;">
                    <h3 style="margin: 0 0 8px 0; font-weight: bold;">${valve.name}</h3>
                    <p style="margin: 4px 0; font-size: 14px;">Status: ${valve.isOpen ? 'Open' : 'Closed'}</p>
                    <p style="margin: 4px 0; font-size: 14px;">Flow Rate: ${valve.flowRate} L/min</p>
                    <p style="margin: 4px 0; font-size: 12px; color: #666;">Zone: ${valve.zone?.name || 'Unassigned'}</p>
                  </div>
                `)
                infoWindowRef.current.open(map, marker)
              }
            })

            // Add click listener to navigate to section detail
            marker.addListener("click", () => {
              window.location.href = `/section-detail/${valve.zoneId || idx + 1}`
            })

            markersRef.current.push(marker)
          }
        }
      })
    }
  }, [map, valves])

  const getSensorIcon = (type: string) => {
    switch (type) {
      case 'MOISTURE':
        return <Droplets className="h-4 w-4" />
      default:
        return <Activity className="h-4 w-4" />
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Loading map data...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="p-3 md:p-6 pt-16 md:pt-6">
        <div className="max-w-7xl mx-auto space-y-4 md:space-y-6">
          {/* Header */}
          <div className="text-center space-y-2">
            <h1 className="text-2xl md:text-3xl font-bold">Farm Map & Sensor Locations</h1>
            <p className="text-sm text-muted-foreground">
              Real-time view of sensor and valve locations across your farm
            </p>
            <Badge variant="outline" className="flex items-center gap-1 w-fit mx-auto">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              Live Data
            </Badge>
          </div>

          {/* Main Map Container */}
          <Card className="overflow-hidden">
            <CardHeader>
              <CardTitle className="text-lg">Farm Layout</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="relative">
                <div 
                  ref={mapRef} 
                  className="w-full h-[600px] rounded-lg"
                />
                
                {/* Legend */}
                <div className="absolute top-4 right-4 bg-background/90 backdrop-blur p-3 rounded-lg border shadow-lg">
                  <h4 className="text-sm font-medium mb-2">Legend</h4>
                  <div className="space-y-1 text-xs">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                      <span>Active Sensor</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                      <span>Inactive Sensor</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-blue-500 rounded"></div>
                      <span>Open Valve</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-gray-500 rounded"></div>
                      <span>Closed Valve</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-1 bg-green-500 rounded"></div>
                      <span>Farm Boundary</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded" style={{ background: sectionColors[0] }}></div>
                      <span>Section 1</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded" style={{ background: sectionColors[1] }}></div>
                      <span>Section 2</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded" style={{ background: sectionColors[2] }}></div>
                      <span>Section 3</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded" style={{ background: sectionColors[3] }}></div>
                      <span>Section 4</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Sensor/Valve Details */}
          {(selectedSensor || selectedValve) && (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">
                  {selectedSensor ? 'Sensor Details' : 'Valve Details'}
                </CardTitle>
              </CardHeader>
              <CardContent>
                {selectedSensor && (
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      {getSensorIcon(selectedSensor.type)}
                      <div>
                        <h3 className="font-medium">{selectedSensor.name}</h3>
                        <p className="text-sm text-muted-foreground capitalize">{selectedSensor.type.toLowerCase()} sensor</p>
                      </div>
                      <Badge variant={selectedSensor.isActive ? 'default' : 'destructive'}>
                        {selectedSensor.isActive ? 'Active' : 'Inactive'}
                      </Badge>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-muted-foreground">Current Value</p>
                        <p className="text-lg font-semibold">
                          {selectedSensor.readings?.[0] 
                            ? `${selectedSensor.readings[0].value} ${selectedSensor.readings[0].unit}`
                            : 'No data'
                          }
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Zone</p>
                        <p className="text-sm">{selectedSensor.zone?.name || 'Unassigned'}</p>
                      </div>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setSelectedSensor(null)}
                    >
                      Close
                    </Button>
                  </div>
                )}
                {selectedValve && (
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <MapPin className={`h-5 w-5 ${selectedValve.isOpen ? 'text-blue-500' : 'text-gray-500'}`} />
                      <div>
                        <h3 className="font-medium">{selectedValve.name}</h3>
                        <p className="text-sm text-muted-foreground">Irrigation valve</p>
                      </div>
                      <Badge variant={selectedValve.isOpen ? 'default' : 'secondary'}>
                        {selectedValve.isOpen ? 'Open' : 'Closed'}
                      </Badge>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-muted-foreground">Flow Rate</p>
                        <p className="text-lg font-semibold">{selectedValve.flowRate} L/min</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Zone</p>
                        <p className="text-sm">{selectedValve.zone?.name || 'Unassigned'}</p>
                      </div>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setSelectedValve(null)}
                    >
                      Close
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          {/* System Status Summary */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Sensors</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Active</span>
                    <Badge variant="default">{sensors.filter(s => s.isActive).length}</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Inactive</span>
                    <Badge variant="secondary">{sensors.filter(s => !s.isActive).length}</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base">Valves</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Open</span>
                    <Badge variant="default">{valves.filter(v => v.isOpen).length}</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Closed</span>
                    <Badge variant="secondary">{valves.filter(v => !v.isOpen).length}</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base">Water Flow</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Total Flow</span>
                    <span className="text-sm font-medium">
                      {valves.filter(v => v.isOpen).reduce((sum, v) => sum + v.flowRate, 0).toFixed(1)} L/min
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
