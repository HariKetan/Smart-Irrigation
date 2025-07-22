"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Droplets, Gauge, AlertTriangle, Power, Activity } from "lucide-react"

// Mock data for demonstration
const analyticsData = {
  daily: {
    waterUsage: [1200, 1500, 1300, 1400, 1600, 1800, 1700],
    moistureLevels: [45, 42, 48, 44, 46, 43, 47],
    activeValves: [2, 3, 2, 3, 2, 3, 2],
    alerts: [1, 2, 0, 1, 2, 1, 0],
  },
  weekly: {
    waterUsage: [8500, 9200, 8800, 9500, 8900, 9100, 9300],
    moistureLevels: [45, 43, 46, 44, 47, 45, 46],
    activeValves: [2, 3, 2, 3, 2, 3, 2],
    alerts: [5, 7, 4, 6, 5, 4, 3],
  },
  monthly: {
    waterUsage: [35000, 38000, 36000, 37000, 39000, 37500, 38500],
    moistureLevels: [45, 44, 46, 45, 47, 46, 45],
    activeValves: [2, 3, 2, 3, 2, 3, 2],
    alerts: [15, 18, 14, 16, 17, 15, 14],
  },
}

export default function Analytics() {
  return (
    <div className="min-h-screen bg-background p-3 md:p-6">
      <div className="max-w-7xl mx-auto space-y-4 md:space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-2xl md:text-3xl font-bold">Analytics Dashboard</h1>
          <p className="text-sm text-muted-foreground">Monitor system performance and trends</p>
        </div>

        {/* Time Period Tabs */}
        <Tabs defaultValue="daily" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="daily">Daily</TabsTrigger>
            <TabsTrigger value="weekly">Weekly</TabsTrigger>
            <TabsTrigger value="monthly">Monthly</TabsTrigger>
          </TabsList>

          {/* Daily Analytics */}
          <TabsContent value="daily" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Water Usage</CardTitle>
                  <Droplets className="h-4 w-4 text-blue-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {analyticsData.daily.waterUsage.reduce((a, b) => a + b, 0).toLocaleString()}L
                  </div>
                  <p className="text-xs text-muted-foreground">Last 7 days</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Average Moisture</CardTitle>
                  <Gauge className="h-4 w-4 text-orange-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {Math.round(
                      analyticsData.daily.moistureLevels.reduce((a, b) => a + b, 0) /
                        analyticsData.daily.moistureLevels.length
                    )}
                    %
                  </div>
                  <p className="text-xs text-muted-foreground">Last 7 days</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Active Valves</CardTitle>
                  <Power className="h-4 w-4 text-green-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {Math.round(
                      analyticsData.daily.activeValves.reduce((a, b) => a + b, 0) /
                        analyticsData.daily.activeValves.length
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground">Average per day</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Alerts</CardTitle>
                  <AlertTriangle className="h-4 w-4 text-red-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {analyticsData.daily.alerts.reduce((a, b) => a + b, 0)}
                  </div>
                  <p className="text-xs text-muted-foreground">Last 7 days</p>
                </CardContent>
              </Card>
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle>Water Usage Trend</CardTitle>
                  <CardDescription>Daily water consumption in liters</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px] flex items-center justify-center border rounded-lg">
                    <p className="text-muted-foreground">Chart visualization will be implemented here</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Moisture Levels</CardTitle>
                  <CardDescription>Average soil moisture percentage</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px] flex items-center justify-center border rounded-lg">
                    <p className="text-muted-foreground">Chart visualization will be implemented here</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Weekly Analytics */}
          <TabsContent value="weekly" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Water Usage</CardTitle>
                  <Droplets className="h-4 w-4 text-blue-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {analyticsData.weekly.waterUsage.reduce((a, b) => a + b, 0).toLocaleString()}L
                  </div>
                  <p className="text-xs text-muted-foreground">Last 7 weeks</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Average Moisture</CardTitle>
                  <Gauge className="h-4 w-4 text-orange-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {Math.round(
                      analyticsData.weekly.moistureLevels.reduce((a, b) => a + b, 0) /
                        analyticsData.weekly.moistureLevels.length
                    )}
                    %
                  </div>
                  <p className="text-xs text-muted-foreground">Last 7 weeks</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Active Valves</CardTitle>
                  <Power className="h-4 w-4 text-green-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {Math.round(
                      analyticsData.weekly.activeValves.reduce((a, b) => a + b, 0) /
                        analyticsData.weekly.activeValves.length
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground">Average per week</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Alerts</CardTitle>
                  <AlertTriangle className="h-4 w-4 text-red-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {analyticsData.weekly.alerts.reduce((a, b) => a + b, 0)}
                  </div>
                  <p className="text-xs text-muted-foreground">Last 7 weeks</p>
                </CardContent>
              </Card>
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle>Weekly Water Usage</CardTitle>
                  <CardDescription>Water consumption by week</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px] flex items-center justify-center border rounded-lg">
                    <p className="text-muted-foreground">Chart visualization will be implemented here</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Weekly Moisture Trends</CardTitle>
                  <CardDescription>Average moisture levels by week</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px] flex items-center justify-center border rounded-lg">
                    <p className="text-muted-foreground">Chart visualization will be implemented here</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Monthly Analytics */}
          <TabsContent value="monthly" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Water Usage</CardTitle>
                  <Droplets className="h-4 w-4 text-blue-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {analyticsData.monthly.waterUsage.reduce((a, b) => a + b, 0).toLocaleString()}L
                  </div>
                  <p className="text-xs text-muted-foreground">Last 7 months</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Average Moisture</CardTitle>
                  <Gauge className="h-4 w-4 text-orange-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {Math.round(
                      analyticsData.monthly.moistureLevels.reduce((a, b) => a + b, 0) /
                        analyticsData.monthly.moistureLevels.length
                    )}
                    %
                  </div>
                  <p className="text-xs text-muted-foreground">Last 7 months</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Active Valves</CardTitle>
                  <Power className="h-4 w-4 text-green-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {Math.round(
                      analyticsData.monthly.activeValves.reduce((a, b) => a + b, 0) /
                        analyticsData.monthly.activeValves.length
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground">Average per month</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Alerts</CardTitle>
                  <AlertTriangle className="h-4 w-4 text-red-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {analyticsData.monthly.alerts.reduce((a, b) => a + b, 0)}
                  </div>
                  <p className="text-xs text-muted-foreground">Last 7 months</p>
                </CardContent>
              </Card>
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle>Monthly Water Usage</CardTitle>
                  <CardDescription>Water consumption by month</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px] flex items-center justify-center border rounded-lg">
                    <p className="text-muted-foreground">Chart visualization will be implemented here</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Monthly Moisture Trends</CardTitle>
                  <CardDescription>Average moisture levels by month</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px] flex items-center justify-center border rounded-lg">
                    <p className="text-muted-foreground">Chart visualization will be implemented here</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
} 