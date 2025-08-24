"use client";

import { useState, useEffect } from "react";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Droplets, Gauge, Power, Activity, RefreshCw } from "lucide-react";
import {
	LineChart,
	Line,
	AreaChart,
	Area,
	BarChart,
	Bar,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	Legend,
	ResponsiveContainer,
} from "recharts";
import { api } from "@/lib/api";

interface AnalyticsSummary {
	totalWaterUsage: number;
	averageMoisture: number;
	activeValves: number;
	totalEvents: number;
	period: number;
}

interface WaterUsageData {
	date: string;
	water_liters: number;
	event_count: number;
	target_liters?: number;
}

interface MoistureTrendsData {
	date: string;
	avg_moisture: number;
	min_moisture: number;
	max_moisture: number;
	reading_count: number;
}

interface ValveActivityData {
	date: string;
	active_valves: number;
	total_events: number;
}

export default function Analytics() {
	const [activeTab, setActiveTab] = useState("daily");
	const [loading, setLoading] = useState(true);
	const [refreshing, setRefreshing] = useState(false);
	const [summary, setSummary] = useState<AnalyticsSummary | null>(null);
	const [waterUsage, setWaterUsage] = useState<WaterUsageData[]>([]);
	const [moistureTrends, setMoistureTrends] = useState<MoistureTrendsData[]>(
		[]
	);
	const [valveActivity, setValveActivity] = useState<ValveActivityData[]>([]);

	const getPeriodDays = (tab: string) => {
		switch (tab) {
			case "daily":
				return 1;
			case "weekly":
				return 7;
			case "monthly":
				return 30;
			default:
				return 7;
		}
	};

	const getPeriodString = (tab: string) => {
		switch (tab) {
			case "daily":
				return "1d";
			case "weekly":
				return "7d";
			case "monthly":
				return "30d";
			default:
				return "7d";
		}
	};

	const fetchAnalyticsData = async (period: number) => {
		try {
			setLoading(true);

			const periodString = getPeriodString(activeTab);

			const [summaryData, waterData, moistureData, valveData] =
				await Promise.all([
					api.getAnalyticsSummary(period),
					api.getWaterUsageAnalytics(periodString),
					api.getMoistureTrendsAnalytics(period),
					api.getValveActivityAnalytics(period),
				]);

			setSummary(summaryData as AnalyticsSummary);
			setWaterUsage(waterData as WaterUsageData[]);
			setMoistureTrends(moistureData as MoistureTrendsData[]);
			setValveActivity(valveData as ValveActivityData[]);
		} catch (error) {
			console.error("Error fetching analytics data:", error);
		} finally {
			setLoading(false);
			setRefreshing(false);
		}
	};

	useEffect(() => {
		const period = getPeriodDays(activeTab);
		fetchAnalyticsData(period);
	}, [activeTab]);

	const handleRefresh = () => {
		setRefreshing(true);
		const period = getPeriodDays(activeTab);
		fetchAnalyticsData(period);
	};

	const formatDate = (dateString: string) => {
		const date = new Date(dateString);
		return date.toLocaleDateString("en-US", {
			month: "short",
			day: "numeric",
		});
	};

	const formatWaterUsage = (liters: number) => {
		if (liters >= 1000) {
			return `${(liters / 1000).toFixed(1)}k L`;
		}
		return `${Math.round(liters)} L`;
	};

	if (loading) {
		return (
			<div className="min-h-screen bg-background flex items-center justify-center">
				<div className="text-center">
					<div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary mx-auto"></div>
					<p className="mt-4 text-muted-foreground">
						Loading analytics data...
					</p>
				</div>
			</div>
		);
	}

	return (
		<div className="min-h-screen bg-background p-3 md:p-6">
			<div className="max-w-7xl mx-auto space-y-4 md:space-y-6">
				{/* Header */}
				<div className="flex items-center justify-between">
					<div className="text-center md:text-left">
						<h1 className="text-2xl md:text-3xl font-bold">
							Analytics Dashboard
						</h1>
						<p className="text-sm text-muted-foreground">
							Monitor system performance and trends
						</p>
					</div>
					<Button
						onClick={handleRefresh}
						disabled={refreshing}
						variant="outline"
						size="sm"
						className="flex items-center gap-2"
					>
						<RefreshCw
							className={`h-4 w-4 ${refreshing ? "animate-spin" : ""}`}
						/>
						Refresh
					</Button>
				</div>

				{/* Summary Cards */}
				{summary && (
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
						<Card>
							<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
								<CardTitle className="text-sm font-medium">
									Total Water Usage
								</CardTitle>
								<Droplets className="h-4 w-4 text-blue-500" />
							</CardHeader>
							<CardContent>
								<div className="text-2xl font-bold">
									{formatWaterUsage(summary.totalWaterUsage)}
								</div>
								<p className="text-xs text-muted-foreground">
									Last {summary.period} days
								</p>
							</CardContent>
						</Card>

						<Card>
							<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
								<CardTitle className="text-sm font-medium">
									Average Moisture
								</CardTitle>
								<Gauge className="h-4 w-4 text-orange-500" />
							</CardHeader>
							<CardContent>
								<div className="text-2xl font-bold">
									{summary.averageMoisture}%
								</div>
								<p className="text-xs text-muted-foreground">
									Last {summary.period} days
								</p>
							</CardContent>
						</Card>

						<Card>
							<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
								<CardTitle className="text-sm font-medium">
									Active Valves
								</CardTitle>
								<Power className="h-4 w-4 text-green-500" />
							</CardHeader>
							<CardContent>
								<div className="text-2xl font-bold">{summary.activeValves}</div>
								<p className="text-xs text-muted-foreground">
									Currently active
								</p>
							</CardContent>
						</Card>

						<Card>
							<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
								<CardTitle className="text-sm font-medium">
									Total Events
								</CardTitle>
								<Activity className="h-4 w-4 text-purple-500" />
							</CardHeader>
							<CardContent>
								<div className="text-2xl font-bold">{summary.totalEvents}</div>
								<p className="text-xs text-muted-foreground">
									Last {summary.period} days
								</p>
							</CardContent>
						</Card>
					</div>
				)}

				{/* Time Period Tabs */}
				<Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
					<TabsList className="grid w-full grid-cols-3">
						<TabsTrigger value="daily">Daily</TabsTrigger>
						<TabsTrigger value="weekly">Weekly</TabsTrigger>
						<TabsTrigger value="monthly">Monthly</TabsTrigger>
					</TabsList>

					{/* Charts Section - 3-Grid Layout for Large Screens */}
					<TabsContent value={activeTab} className="space-y-4">
						<div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 gap-4">
							{/* Water Usage Chart */}
							<Card>
								<CardHeader>
									<CardTitle>Water Usage Trend</CardTitle>
									<CardDescription>
										Daily water consumption in liters
									</CardDescription>
								</CardHeader>
								<CardContent>
									<ResponsiveContainer width="100%" height={300}>
										<AreaChart data={waterUsage}>
											<CartesianGrid strokeDasharray="3 3" />
											<XAxis
												dataKey="date"
												tickFormatter={formatDate}
												fontSize={12}
											/>
											<YAxis fontSize={12} />
											<Tooltip
												formatter={(value: number) => [
													`${value} L`,
													"Water Usage",
												]}
												labelFormatter={formatDate}
											/>
											<Area
												type="monotone"
												dataKey="water_liters"
												stroke="#3b82f6"
												fill="#3b82f6"
												fillOpacity={0.3}
											/>
										</AreaChart>
									</ResponsiveContainer>
								</CardContent>
							</Card>

							{/* Moisture Levels Chart */}
							<Card>
								<CardHeader>
									<CardTitle>Moisture Levels</CardTitle>
									<CardDescription>
										Average soil moisture percentage
									</CardDescription>
								</CardHeader>
								<CardContent>
									<ResponsiveContainer width="100%" height={300}>
										<LineChart data={moistureTrends}>
											<CartesianGrid strokeDasharray="3 3" />
											<XAxis
												dataKey="date"
												tickFormatter={formatDate}
												fontSize={12}
											/>
											<YAxis fontSize={12} />
											<Tooltip
												formatter={(value: number) => [`${value}%`, "Moisture"]}
												labelFormatter={formatDate}
											/>
											<Legend />
											<Line
												type="monotone"
												dataKey="avg_moisture"
												stroke="#f97316"
												strokeWidth={2}
												name="Average"
											/>
											<Line
												type="monotone"
												dataKey="min_moisture"
												stroke="#ef4444"
												strokeWidth={1}
												name="Minimum"
											/>
											<Line
												type="monotone"
												dataKey="max_moisture"
												stroke="#22c55e"
												strokeWidth={1}
												name="Maximum"
											/>
										</LineChart>
									</ResponsiveContainer>
								</CardContent>
							</Card>

							{/* Valve Activity Chart - Spans 2 columns on large screens */}
							{/* <Card className="lg:col-span-2 xl:col-span-1">
								<CardHeader>
									<CardTitle>Valve Activity</CardTitle>
									<CardDescription>
										Number of active valves per day
									</CardDescription>
								</CardHeader>
								<CardContent>
									<ResponsiveContainer width="100%" height={300}>
										<BarChart data={valveActivity}>
											<CartesianGrid strokeDasharray="3 3" />
											<XAxis
												dataKey="date"
												tickFormatter={formatDate}
												fontSize={12}
											/>
											<YAxis fontSize={12} />
											<Tooltip
												formatter={(value: number) => [value, "Active Valves"]}
												labelFormatter={formatDate}
											/>
											<Bar
												dataKey="active_valves"
												fill="#22c55e"
												radius={[4, 4, 0, 0]}
											/>
										</BarChart>
									</ResponsiveContainer>
								</CardContent>
							</Card> */}

							{/* Irrigation Events Chart - Spans 2 columns on large screens */}
							{/* <Card className="lg:col-span-2 xl:col-span-1">
								<CardHeader>
									<CardTitle>Irrigation Events</CardTitle>
									<CardDescription>
										Number of irrigation events per day
									</CardDescription>
								</CardHeader>
								<CardContent>
									<ResponsiveContainer width="100%" height={300}>
										<BarChart data={waterUsage}>
											<CartesianGrid strokeDasharray="3 3" />
											<XAxis
												dataKey="date"
												tickFormatter={formatDate}
												fontSize={12}
											/>
											<YAxis fontSize={12} />
											<Tooltip
												formatter={(value: number) => [value, "Events"]}
												labelFormatter={formatDate}
											/>
											<Bar
												dataKey="event_count"
												fill="#8b5cf6"
												radius={[4, 4, 0, 0]}
											/>
										</BarChart>
									</ResponsiveContainer>
								</CardContent>
							</Card> */}
						</div>

						{/* Data Table */}
						<Card>
							<CardHeader>
								<CardTitle>Detailed Data</CardTitle>
								<CardDescription>
									Raw analytics data for the selected period
								</CardDescription>
							</CardHeader>
							<CardContent>
								<div className="overflow-x-auto">
									<table className="w-full text-sm">
										<thead>
											<tr className="border-b">
												<th className="text-left p-2">Date</th>
												<th className="text-left p-2">Water Usage (L)</th>
												<th className="text-left p-2">Events</th>
												<th className="text-left p-2">Avg Moisture (%)</th>
												<th className="text-left p-2">Active Valves</th>
											</tr>
										</thead>
										<tbody>
											{waterUsage.map((item, index) => {
												const moistureItem = moistureTrends.find(
													(m) => m.date === item.date
												);
												const valveItem = valveActivity.find(
													(v) => v.date === item.date
												);
												return (
													<tr
														key={index}
														className="border-b hover:bg-muted/50"
													>
														<td className="p-2">{formatDate(item.date)}</td>
														<td className="p-2">
															{Math.round(item.water_liters)}
														</td>
														<td className="p-2">{item.event_count}</td>
														<td className="p-2">
															{moistureItem
																? Math.round(moistureItem.avg_moisture)
																: "-"}
														</td>
														<td className="p-2">
															{valveItem ? valveItem.active_valves : "-"}
														</td>
													</tr>
												);
											})}
										</tbody>
									</table>
								</div>
							</CardContent>
						</Card>
					</TabsContent>
				</Tabs>
			</div>
		</div>
	);
}
