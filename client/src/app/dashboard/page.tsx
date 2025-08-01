"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import {
  Droplets,
  Gauge,
  AlertTriangle,
  Power,
  MapPin,
  ChevronRight,
  Activity,
  CheckCircle,
  Settings,
  Wifi,
  Signal,
  Clock,
  Zap,
  Thermometer,
} from "lucide-react";
import { api, getCurrentUserFarmIds } from "@/lib/api";
import { getMoistureStatus, calculateAverage, formatNumber } from "@/lib/utils";

import BulkOperations from "@/components/BulkOperations";

interface Section {
  id: number;
  farm_id: number;
  section_number: number;
  name: string;
  crop: string;
  moisture?: number;
  threshold?: number;
  waterUsed?: number;
  valveOpen: boolean;
  area: number;
  location: string;
  lastIrrigation: string;
  nextIrrigation: string;
  mode?: string;
  deviceStatus?: any;
  farm?: any;
}

interface MoistureReading {
  id: number;
  farm_id: number;
  section_id: number;
  value?: number;
  timestamp: string;
  farm_name?: string;
  section_name?: string;
}

interface SectionUsage {
  section_id: number;
  water_liters: number;
  event_count: number;
  avg_duration_minutes: number;
  last_irrigation: string;
}

interface DeviceStatus {
  device_id: string;
  section_id: number;
  uptime: number;
  wifi: boolean | number;
  mqtt: boolean | number;
  last_error: string;
  valve_on?: number;
  mode?: string;
  latest_moisture?: number;
  threshold?: number;
  pulse_count?: number;
  water_ml?: number;
  timestamp: number;
}

interface MoistureReadingsData {
  data: MoistureReading[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export default function DashboardPage() {
  const router = useRouter();
  const [sections, setSections] = useState<Section[]>([]);
  const [latestReadings, setLatestReadings] = useState<MoistureReading[]>([]);
  const [sectionUsage, setSectionUsage] = useState<SectionUsage[]>([]);

  const [deviceStatuses, setDeviceStatuses] = useState<DeviceStatus[]>([]);
  const [moistureReadings, setMoistureReadings] = useState<MoistureReadingsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [totalWaterUsed, setTotalWaterUsed] = useState(0);
  const [activeValves, setActiveValves] = useState(0);
  const [systemStatus, setSystemStatus] = useState({
    online: true,
    wifiConnected: true,
    mqttConnected: true,
    lastError: ""
  });

  const fetchSections = async () => {
    try {
      // Get sections data
      const sectionsData = await api.getSections() as any[];
      console.log('Fetched sections data:', sectionsData);
      setSections(sectionsData);
      
      // Get latest moisture readings
      const readingsData = await api.getLatestMoistureReadings() as any[];
      setLatestReadings(readingsData);
      
      // Get section usage statistics
      const usageData = await api.getSectionUsage() as any[];
      setSectionUsage(usageData);
      
      // Get device status (using irrigation device status as proxy)
      const deviceStatusData = await api.getIrrigationDeviceStatus() as any[];
      setDeviceStatuses(deviceStatusData);

      // Update system status based on device statuses
      if (deviceStatusData.length > 0) {
        const latestStatus = deviceStatusData[0];
        setSystemStatus({
          online: true,
          wifiConnected: Boolean(latestStatus.wifi),
          mqttConnected: Boolean(latestStatus.mqtt),
          lastError: latestStatus.last_error || ""
        });
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSections();
  }, []);

  useEffect(() => {
    // Calculate total water used from section usage data
    const total = sectionUsage.reduce((sum, usage) => sum + usage.water_liters, 0);
    const active = sections.filter((section) => section.valveOpen).length;
    setTotalWaterUsed(total);
    setActiveValves(active);
  }, [sections, sectionUsage]);

  const handleSectionSelect = (section: Section) => {
    // Debug logging
    console.log('Section clicked:', section);
    console.log('farm_id:', section.farm_id);
    console.log('section_number:', section.section_number);
    
    // Navigate to the section detail page using farm_id and section_number
    const route = `/section-detail/${section.farm_id}/${section.section_number}`;
    console.log('Navigating to:', route);
    router.push(route);
  };



  // Helper function to get water usage for a specific section
  const getSectionWaterUsage = (sectionId: number): number => {
    const usage = sectionUsage.find(u => u.section_id === sectionId);
    return usage ? usage.water_liters : 0;
  };

  // Helper function to get device status for a section
  const getSectionDeviceStatus = (sectionId: number): DeviceStatus | null => {
    return deviceStatuses.find(d => d.device_id === `irrigation_controller_1` && d.section_id === sectionId) || null;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background  p-3 md:p-6">
      <div className="max-w-7xl mx-auto space-y-4 md:space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-2xl md:text-3xl font-bold">
            Smart Irrigation Control
          </h1>
          <p className="text-sm text-muted-foreground">
            Monitor and control your farm's irrigation system
          </p>
          <div className="flex items-center justify-center gap-4">
            <Badge
              variant="outline"
              className="flex items-center gap-1"
            >
              <div className={`w-2 h-2 rounded-full ${systemStatus.online ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`}></div>
              {systemStatus.online ? 'System Online' : 'System Offline'}
            </Badge>
            <Badge
              variant="outline"
              className="flex items-center gap-1"
            >
              <Wifi className={`h-3 w-3 ${systemStatus.wifiConnected ? 'text-green-500' : 'text-red-500'}`} />
              {systemStatus.wifiConnected ? 'WiFi' : 'No WiFi'}
            </Badge>
            <Badge
              variant="outline"
              className="flex items-center gap-1"
            >
              <Signal className={`h-3 w-3 ${systemStatus.mqttConnected ? 'text-green-500' : 'text-red-500'}`} />
              {systemStatus.mqttConnected ? 'MQTT' : 'No MQTT'}
            </Badge>
          </div>
        </div>

        {/* Overview Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
          <Card>
            <CardContent className="p-3 md:p-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs md:text-sm font-medium">
                  Total Water
                </span>
                <Droplets className="h-4 w-4 text-blue-500" />
              </div>
              <div className="text-lg md:text-2xl font-bold">
                {formatNumber(totalWaterUsed)}L
              </div>
              <p className="text-xs text-muted-foreground">Last 7 days</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-3 md:p-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs md:text-sm font-medium">
                  Active Valves
                </span>
                <Power className="h-4 w-4 text-green-500" />
              </div>
              <div className="text-lg md:text-2xl font-bold">
                {activeValves}/{sections.length}
              </div>
              <p className="text-xs text-muted-foreground">Irrigating</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-3 md:p-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs md:text-sm font-medium">
                  Avg Moisture
                </span>
                <Gauge className="h-4 w-4 text-orange-500" />
              </div>
              <div className="text-lg md:text-2xl font-bold">
                {latestReadings.length > 0
                  ? calculateAverage(
                      latestReadings.map((r) => r.value)
                    ).toFixed(1)
                  : sections.length > 0
                  ? calculateAverage(sections.map((s) => s.moisture))
                  : 0}
                %
              </div>
              <p className="text-xs text-muted-foreground">All sensors</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-3 md:p-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs md:text-sm font-medium">
                  Active Sensors
                </span>
                <Activity className="h-4 w-4 text-green-500" />
              </div>
              <div className="text-lg md:text-2xl font-bold">
                {latestReadings.length}
              </div>
              <p className="text-xs text-muted-foreground">Reporting</p>
            </CardContent>
          </Card>
        </div>



        {/* Section Cards */}
        <div className="space-y-3">
          <h2 className="text-lg md:text-xl font-semibold">Farm Sections</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
            {sections.map((section) => {
              const moistureStatus = getMoistureStatus(
                section.moisture,
                section.threshold
              );
              const deviceStatus = getSectionDeviceStatus(section.id);
              
              return (
                <Card
                  key={section.id}
                  className={`${moistureStatus.bgColor} transition-all duration-200 cursor-pointer hover:shadow-md dark:${moistureStatus.bgColor}`}
                  onClick={() => handleSectionSelect(section)}
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-black dark:text-black" />
                        <div>
                          <CardTitle className="text-base md:text-lg text-black dark:text-black">
                            {section.name}
                          </CardTitle>
                          <CardDescription className="text-sm text-black dark:text-black">
                            {section.crop}
                          </CardDescription>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge
                          variant={moistureStatus.color as any}
                          className="text-xs "
                        >
                          {moistureStatus.status}
                        </Badge>
                        <div className="flex items-center gap-1 text-xs text-black dark:text-black">
                          <span>View Details</span>
                          <ChevronRight className="h-3 w-3" />
                        </div>
                      </div>
                    </div>
                  </CardHeader>

                  <CardContent className="pt-0 space-y-3">
                    {/* Moisture Level */}
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm text-black dark:text-black">
                        <span>Soil Moisture</span>
                        <span className="font-bold">{section.moisture || 0}%</span>
                      </div>
                      <Progress value={section.moisture || 0} className="h-2" />
                      <div className="text-xs text-muted-foreground dark:text-black">
                        Target: {section.threshold || 60}% •{" "}
                        {(section.moisture || 0) < (section.threshold || 60)
                          ? `${
                              (section.threshold || 60) - (section.moisture || 0)
                            }% below target`
                          : "Above target"}
                      </div>
                    </div>

                    {/* Device Status */}
                    {deviceStatus && (
                      <div className="grid grid-cols-2 gap-2 text-xs">
                        <div className="flex items-center gap-1">
                          <div className={`w-2 h-2 rounded-full ${deviceStatus.wifi ? 'bg-green-500' : 'bg-red-500'}`}></div>
                          <span className="text-black dark:text-black">WiFi</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <div className={`w-2 h-2 rounded-full ${deviceStatus.mqtt ? 'bg-green-500' : 'bg-red-500'}`}></div>
                          <span className="text-black dark:text-black">MQTT</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="h-3 w-3 text-black dark:text-black" />
                          <span className="text-black dark:text-black">
                            {Math.round(deviceStatus.uptime / 1000 / 60)}m
                          </span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Thermometer className="h-3 w-3 text-black dark:text-black" />
                          <span className="text-black dark:text-black">
                            {deviceStatus.latest_moisture || 0}%
                          </span>
                        </div>
                      </div>
                    )}

                    {/* Quick Stats */}
                    <div className="grid grid-cols-3 gap-2 text-center">
                      <div className="space-y-1">
                        <div className="flex items-center justify-center gap-1">
                          <Droplets className="h-3 w-3 text-blue-500 dark:text-blue-500" />
                          <span className="text-xs text-black dark:text-black">
                            Used
                          </span>
                        </div>
                        <div className="text-sm font-medium text-black dark:text-black">
                          {formatNumber(getSectionWaterUsage(section.id))}L
                        </div>
                      </div>
                      <div className="space-y-1">
                        <div className="flex items-center justify-center gap-1">
                          <Settings className="h-3 w-3 text-purple-500 dark:text-purple-500" />
                          <span className="text-xs text-black dark:text-black">
                            Mode
                          </span>
                        </div>
                        <div className="text-sm font-medium text-black dark:text-black">
                          {section.mode || 'Manual'}
                        </div>
                      </div>
                      <div className="space-y-1">
                        <div className="flex items-center justify-center gap-1">
                          <Activity className="h-3 w-3 text-green-500 dark:text-green-500" />
                          <span className="text-xs text-black dark:text-black">
                            Status
                          </span>
                        </div>
                        <div className="flex items-center justify-center gap-1">
                          <div
                            className={`w-2 h-2 rounded-full ${
                              section.valveOpen
                                ? "bg-green-500 dark:bg-green-500"
                                : "bg-gray-400 dark:bg-gray-400"
                            }`}
                          ></div>
                          <span className="text-xs text-black dark:text-black">
                            {section.valveOpen ? "ON" : "OFF"}
                          </span>
                        </div>
                      </div>
                    </div>



                    {/* Status Alert */}
                    {(section.moisture || 0) < (section.threshold || 60) ? (
                      <Card className="border-orange-200 bg-orange-50">
                        <CardContent className="pt-0">
                          <div className="flex items-center gap-3">
                            <AlertTriangle className="h-5 w-5 text-orange-600" />
                            <div>
                              <div className="font-medium text-orange-800">
                                Action Required
                              </div>
                              <div className="text-sm text-orange-700">
                                Soil moisture is below the set threshold.
                                Consider starting irrigation.
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ) : (
                      <Card className="border-green-200 bg-green-50">
                        <CardContent className="pt-0">
                          <div className="flex items-center gap-3">
                            <CheckCircle className="h-5 w-5 text-green-600" />
                            <div>
                              <div className="font-medium text-green-800">
                                Optimal Conditions
                              </div>
                              <div className="text-sm text-green-700">
                                Soil moisture level is within the optimal range.
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    )}
                  </CardContent>
                </Card>
              );
            })}
          </div>
          {latestReadings.length === 0 && (
            <Card>
              <CardContent className="p-8 text-center">
                <Droplets className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-medium mb-2">
                  No Moisture Readings
                </h3>
                <p className="text-muted-foreground">
                  No moisture readings are currently available.
                </p>
              </CardContent>
            </Card>
          )}

          {/* Bulk Operations Panel */}
          <div className="col-span-full">
            <BulkOperations
              sections={sections}
              onOperationComplete={() => {
                // Refresh data after bulk operation
                fetchSections();
              }}
            />
          </div>
        </div>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <Button variant="outline" className="h-12">
              <Activity className="h-4 w-4 mr-2" />
              System Status
            </Button>
            <Button variant="outline" className="h-12">
              <Droplets className="h-4 w-4 mr-2" />
              Water Report
            </Button>
            <Button 
              variant="outline" 
              className="h-12"
              onClick={() => router.push('/section-detail/1/1')}
            >
              <Clock className="h-4 w-4 mr-2" />
              Reporting Control
            </Button>
            <Button 
              variant="outline" 
              className="h-12"
              onClick={async () => {
                try {
                  // Set all sections to 5-second reporting for live mode
                  const farmIds = getCurrentUserFarmIds();
                  const farmId = farmIds[0] || 1;
                  for (let i = 1; i <= 4; i++) {
                    await api.updateReportingInterval(farmId, i, 5);
                  }
                  alert('Live mode activated! All sections now reporting every 5 seconds.');
                } catch (error) {
                  console.error('Error setting live mode:', error);
                  alert('Failed to set live mode. Please try again.');
                }
              }}
            >
              <Zap className="h-4 w-4 mr-2" />
              Activate Live Mode
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
