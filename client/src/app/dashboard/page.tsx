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
import {
  Droplets,
  Gauge,
  AlertTriangle,
  Power,
  MapPin,
  ChevronRight,
  Activity,
  CheckCircle,
} from "lucide-react";
import { getApiBaseUrl } from "@/lib/api";
import { getMoistureStatus, calculateAverage, formatNumber } from "@/lib/utils";

interface Section {
  id: number;
  name: string;
  crop: string;
  moisture: number;
  threshold: number;
  waterUsed: number;
  valveOpen: boolean;
  area: number;
  location: string;
  lastIrrigation: string;
  nextIrrigation: string;
}

interface MoistureReading {
  id: number;
  farmer_id: number;
  section_id: number;
  value: number;
  timestamp: string;
}

export default function DashboardPage() {
  const router = useRouter();
  const [sections, setSections] = useState<Section[]>([]);
  const [latestReadings, setLatestReadings] = useState<MoistureReading[]>([]);
  const [loading, setLoading] = useState(true);
  const [totalWaterUsed, setTotalWaterUsed] = useState(0);
  const [activeValves, setActiveValves] = useState(0);

  const fetchSections = async () => {
    try {
      const apiBaseUrl = getApiBaseUrl();
      const [sectionsResponse, readingsResponse] = await Promise.all([
        fetch(`${apiBaseUrl}/api/real/sections`),
        fetch(`${apiBaseUrl}/api/real/moisture-readings/latest`),
      ]);

      if (sectionsResponse.ok && readingsResponse.ok) {
        const sectionsData = await sectionsResponse.json();
        const readingsData = await readingsResponse.json();
        setSections(sectionsData);
        setLatestReadings(readingsData);
      } else {
        console.error("Failed to fetch data");
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
    const total = sections.reduce((sum, section) => sum + section.waterUsed, 0);
    const active = sections.filter((section) => section.valveOpen).length;
    setTotalWaterUsed(total);
    setActiveValves(active);
  }, [sections]);

  const handleSectionSelect = (sectionId: number) => {
    router.push(`/section-detail/${sectionId}`);
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
          <Badge
            variant="outline"
            className="flex items-center gap-1 w-fit mx-auto"
          >
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            System Online
          </Badge>
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
              <p className="text-xs text-muted-foreground">Today</p>
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
              return (
                <Card
                  key={section.id}
                  className={`${moistureStatus.bgColor} transition-all duration-200 cursor-pointer hover:shadow-md dark:${moistureStatus.bgColor}`}
                  onClick={() => handleSectionSelect(section.id)}
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
                        <ChevronRight className="h-4 w-4 text-black dark:text-black" />
                      </div>
                    </div>
                  </CardHeader>

                  <CardContent className="pt-0 space-y-3">
                    {/* Moisture Level */}
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm text-black dark:text-black">
                        <span>Soil Moisture</span>
                        <span className="font-bold">{section.moisture}%</span>
                      </div>
                      <Progress value={section.moisture} className="h-2" />
                      <div className="text-xs text-muted-foreground dark:text-black">
                        Target: {section.threshold}% •{" "}
                        {section.moisture < section.threshold
                          ? `${
                              section.threshold - section.moisture
                            }% below target`
                          : "Above target"}
                      </div>
                    </div>

                    {/* Quick Stats */}
                    <div className="grid grid-cols-2 gap-2 text-center">
                      <div className="space-y-1">
                        <div className="flex items-center justify-center gap-1">
                          <Droplets className="h-3 w-3 text-blue-500 dark:text-blue-500" />
                          <span className="text-xs text-black dark:text-black">
                            Used
                          </span>
                        </div>
                        <div className="text-sm font-medium text-black dark:text-black">
                          {formatNumber(section.waterUsed)}L
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
                    {section.moisture < section.threshold ? (
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
        </div>

        {/* Latest Moisture Readings */}
        <div className="space-y-3">
          <h2 className="text-lg md:text-xl font-semibold">
            Latest Moisture Readings
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
            {latestReadings.map((reading) => {
              const moistureStatus = getMoistureStatus(reading.value, 60); // Using 60% as default threshold
              return (
                <Card
                  key={reading.id}
                  className="hover:shadow-md transition-shadow"
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Droplets className="h-4 w-4 text-blue-500" />
                        <div>
                          <CardTitle className="text-base">
                            Section {reading.section_id}
                          </CardTitle>
                          <CardDescription className="text-sm">
                            Moisture Sensor
                          </CardDescription>
                        </div>
                      </div>
                      <Badge
                        variant={moistureStatus.color as any}
                        className="text-xs"
                      >
                        {moistureStatus.status}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0 space-y-3">
                    {/* Moisture Value */}
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Moisture Level</span>
                        <span className="font-bold">
                          {reading.value.toFixed(1)}%
                        </span>
                      </div>
                      <Progress value={reading.value} className="h-2" />
                    </div>

                    {/* Timestamp */}
                    <div className="text-xs text-muted-foreground">
                      Last updated:{" "}
                      {new Date(reading.timestamp).toLocaleString()}
                    </div>

                    {/* Quick Action */}
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full"
                      onClick={() => handleSectionSelect(reading.section_id)}
                    >
                      View Section Details
                    </Button>
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
        </div>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-2 gap-3">
            <Button variant="outline" className="h-12">
              <Activity className="h-4 w-4 mr-2" />
              System Status
            </Button>
            <Button variant="outline" className="h-12">
              <Droplets className="h-4 w-4 mr-2" />
              Water Report
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
