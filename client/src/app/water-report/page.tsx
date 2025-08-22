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
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import {
	Droplets,
	Calendar,
	BarChart3,
	TrendingUp,
	Activity,
	Download,
	RefreshCw,
	ArrowLeft,
	AlertTriangle,
} from "lucide-react";
import { api } from "@/lib/api";
import { formatNumber } from "@/lib/utils";
import { toast } from "sonner";
import {
	Select,
} from "@/components/ui/select";

interface WaterUsageData {
	date: string;
	water_liters: number;
	event_count: number;
	target_liters?: number;
}

interface SectionUsage {
	section_number: number;
	water_liters: number;
	event_count: number;
	avg_duration_minutes: number;
	last_irrigation: string;
}

interface WaterReportData {
	dailyUsage: WaterUsageData[];
	sectionUsage: SectionUsage[];
	totalWaterUsed: number;
	totalEvents: number;
	averageDailyUsage: number;
	peakUsageDay: string;
	peakUsageAmount: number;
}

export default function WaterReportPage() {
	const router = useRouter();
	const [loading, setLoading] = useState(true);
	const [refreshing, setRefreshing] = useState(false);
	const [period, setPeriod] = useState("7d");
	const [selectedSection, setSelectedSection] = useState<string>("all");
	const [reportData, setReportData] = useState<WaterReportData | null>(null);

	const fetchWaterReport = async () => {
		try {
			setLoading(true);
			
			console.log(`🔍 Fetching water report for period: ${period}, section: ${selectedSection}`);
			
			// Fetch water usage analytics
			const waterUsageData = await api.getWaterUsageAnalytics(period, selectedSection === "all" ? undefined : parseInt(selectedSection));
			console.log(`📊 Water usage data:`, waterUsageData);
			
			// Fetch section usage data
			const sectionUsageData = await api.getSectionUsage(period === "7d" ? 7 : period === "30d" ? 30 : 90);
			console.log(`📊 Section usage data (all):`, sectionUsageData);
			
			// Filter section usage by selected section if not "all"
			const filteredSectionUsage = selectedSection === "all" 
				? sectionUsageData 
				: sectionUsageData.filter(section => section.section_number === parseInt(selectedSection));
			console.log(`📊 Filtered section usage for section ${selectedSection}:`, filteredSectionUsage);
			
			// Calculate summary statistics
			const totalWaterUsed = waterUsageData.reduce((sum: number, item: WaterUsageData) => sum + item.water_liters, 0);
			const totalEvents = waterUsageData.reduce((sum: number, item: WaterUsageData) => sum + item.event_count, 0);
			const averageDailyUsage = totalWaterUsed / waterUsageData.length || 0;
			
			// Find peak usage day
			const peakUsage = waterUsageData.reduce((max: WaterUsageData, item: WaterUsageData) => 
				item.water_liters > max.water_liters ? item : max, waterUsageData[0] || { water_liters: 0, date: "" });
			
			setReportData({
				dailyUsage: waterUsageData,
				sectionUsage: filteredSectionUsage,
				totalWaterUsed,
				totalEvents,
				averageDailyUsage,
				peakUsageDay: peakUsage.date,
				peakUsageAmount: peakUsage.water_liters,
			});
		} catch (error) {
			console.error("Error fetching water report:", error);
			toast.error("Failed to load water report data");
		} finally {
			setLoading(false);
		}
	};

	const handleRefresh = async () => {
		setRefreshing(true);
		await fetchWaterReport();
		setRefreshing(false);
	};

	const handleExport = () => {
		if (!reportData) return;
		
		// Create CSV content
		const csvContent = [
			"Date,Water Used (L),Events,Target (L)",
			...reportData.dailyUsage.map(item => 
				`${item.date},${item.water_liters},${item.event_count},${item.target_liters || ""}`
			)
		].join("\n");
		
		// Download CSV file
		const blob = new Blob([csvContent], { type: "text/csv" });
		const url = window.URL.createObjectURL(blob);
		const a = document.createElement("a");
		a.href = url;
		a.download = `water-report-${period}-${new Date().toISOString().split('T')[0]}.csv`;
		document.body.appendChild(a);
		a.click();
		document.body.removeChild(a);
		window.URL.revokeObjectURL(url);
		
		toast.success("Water report exported successfully");
	};

	useEffect(() => {
		fetchWaterReport();
	}, [period, selectedSection]);

	if (loading) {
		return (
			<div className="min-h-screen bg-background flex items-center justify-center">
				<div className="text-center">
					<div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary mx-auto"></div>
					<p className="mt-4 text-muted-foreground">Loading water report...</p>
				</div>
			</div>
		);
	}

	return (
		<div className="min-h-screen bg-background p-3 md:p-6">
			<div className="max-w-7xl mx-auto space-y-4 md:space-y-6">
				{/* Header */}
				<div className="flex items-center justify-between">
					<div className="flex items-center gap-4">
						<Button
							variant="ghost"
							size="sm"
							onClick={() => router.back()}
							className="flex items-center gap-2"
						>
							<ArrowLeft className="h-4 w-4" />
							Back
						</Button>
						<div>
							<h1 className="text-2xl md:text-3xl font-bold flex items-center gap-2">
								<Droplets className="h-6 w-6 text-blue-500" />
								Water Usage Report
							</h1>
							<p className="text-sm text-muted-foreground">
								{selectedSection === "all" 
									? "Comprehensive analysis of irrigation water consumption"
									: `Water consumption analysis for Section ${selectedSection}`
								}
							</p>
						</div>
					</div>
					<div className="flex items-center gap-2">
						<Button
							onClick={handleRefresh}
							disabled={refreshing}
							variant="outline"
							size="sm"
							className="flex items-center gap-2"
						>
							<RefreshCw className={`h-4 w-4 ${refreshing ? "animate-spin" : ""}`} />
							Refresh
						</Button>
						<Button
							onClick={handleExport}
							variant="outline"
							size="sm"
							className="flex items-center gap-2"
						>
							<Download className="h-4 w-4" />
							Export
						</Button>
					</div>
				</div>

				{/* Filters */}
				<Card>
					<CardContent className="p-4">
						<div className="flex items-center gap-4">
							<div className="flex items-center gap-2">
								<Calendar className="h-4 w-4" />
								<span className="text-sm font-medium">Period:</span>
								<Select value={period} onChange={(e) => setPeriod(e.target.value)} className="w-32">
									<option value="7d">Last 7 days</option>
									<option value="30d">Last 30 days</option>
									<option value="90d">Last 90 days</option>
								</Select>
							</div>
							<div className="flex items-center gap-2">
								<Activity className="h-4 w-4" />
								<span className="text-sm font-medium">Section:</span>
								<Select value={selectedSection} onChange={(e) => setSelectedSection(e.target.value)} className="w-32">
									<option value="all">All Sections</option>
									<option value="1">Section 1</option>
									<option value="2">Section 2</option>
									<option value="3">Section 3</option>
									<option value="4">Section 4</option>
								</Select>
							</div>
						</div>
					</CardContent>
				</Card>

				{/* Summary Cards */}
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
					<Card>
						<CardContent className="p-4">
							<div className="flex items-center justify-between mb-2">
								<span className="text-sm font-medium">Total Water Used</span>
								<Droplets className="h-4 w-4 text-blue-500" />
							</div>
							<div className="text-2xl font-bold">
								{formatNumber(reportData?.totalWaterUsed || 0)}L
							</div>
							<p className="text-xs text-muted-foreground">
								{selectedSection === "all" 
									? (period === "7d" ? "Last 7 days" : period === "30d" ? "Last 30 days" : "Last 90 days")
									: `Section ${selectedSection} - ${period === "7d" ? "Last 7 days" : period === "30d" ? "Last 30 days" : "Last 90 days"}`
								}
							</p>
						</CardContent>
					</Card>

					<Card>
						<CardContent className="p-4">
							<div className="flex items-center justify-between mb-2">
								<span className="text-sm font-medium">Total Events</span>
								<Activity className="h-4 w-4 text-green-500" />
							</div>
							<div className="text-2xl font-bold">
								{reportData?.totalEvents || 0}
							</div>
							<p className="text-xs text-muted-foreground">
								{selectedSection === "all" 
									? "Irrigation sessions"
									: `Section ${selectedSection} sessions`
								}
							</p>
						</CardContent>
					</Card>

					<Card>
						<CardContent className="p-4">
							<div className="flex items-center justify-between mb-2">
								<span className="text-sm font-medium">Avg Daily Usage</span>
								<TrendingUp className="h-4 w-4 text-orange-500" />
							</div>
							<div className="text-2xl font-bold">
								{formatNumber(reportData?.averageDailyUsage || 0)}L
							</div>
							<p className="text-xs text-muted-foreground">
								{selectedSection === "all" 
									? "Per day average"
									: `Section ${selectedSection} daily average`
								}
							</p>
						</CardContent>
					</Card>
				</div>

				{/* Main Content Tabs */}
				<Tabs defaultValue="overview" className="space-y-4">
					<TabsList className="grid w-full grid-cols-3">
						<TabsTrigger value="overview">Overview</TabsTrigger>
						<TabsTrigger value="daily">Daily Breakdown</TabsTrigger>
						<TabsTrigger value="sections">Section Analysis</TabsTrigger>
					</TabsList>

					<TabsContent value="overview" className="space-y-4">
							<Card>
								<CardHeader>
									<CardTitle className="flex items-center gap-2">
										<BarChart3 className="h-5 w-5" />
										Water Usage Trends
									</CardTitle>
									<CardDescription>
										Daily water consumption over the selected period
									</CardDescription>
								</CardHeader>
								<CardContent>
									{reportData?.dailyUsage && reportData.dailyUsage.length > 0 ? (
										<div className="space-y-4">
											{reportData.dailyUsage.map((item, index) => (
												<div key={index} className="flex items-center justify-between">
													<div className="flex items-center gap-2">
														<span className="text-sm font-medium">{item.date}</span>
														<Badge variant="outline">{item.event_count} events</Badge>
													</div>
													<div className="text-right">
														<div className="font-bold">{formatNumber(item.water_liters)}L</div>
														<div className="text-xs text-muted-foreground">
															{item.target_liters ? `${Math.round((item.water_liters / item.target_liters) * 100)}% of target` : ""}
														</div>
													</div>
												</div>
											))}
										</div>
									) : (
										<div className="text-center py-8 text-muted-foreground">
											<Droplets className="h-12 w-12 mx-auto mb-4 opacity-50" />
											<p>No water usage data available for the selected period</p>
										</div>
									)}
								</CardContent>
							</Card>
					</TabsContent>

					<TabsContent value="daily" className="space-y-4">
						<Card>
							<CardHeader>
								<CardTitle>Daily Water Usage Breakdown</CardTitle>
								<CardDescription>
									Detailed daily irrigation events and water consumption
								</CardDescription>
							</CardHeader>
							<CardContent>
								<Table>
									<TableHeader>
										<TableRow>
											<TableHead>Date</TableHead>
											<TableHead>Water Used (L)</TableHead>
											<TableHead>Events</TableHead>
											<TableHead>Avg per Event</TableHead>
											<TableHead>Target</TableHead>
											<TableHead>Status</TableHead>
										</TableRow>
									</TableHeader>
									<TableBody>
										{reportData?.dailyUsage.map((item, index) => (
											<TableRow key={index}>
												<TableCell className="font-medium">{item.date}</TableCell>
												<TableCell>{formatNumber(item.water_liters)}L</TableCell>
												<TableCell>{item.event_count}</TableCell>
												<TableCell>
													{item.event_count > 0 ? formatNumber(item.water_liters / item.event_count) : 0}L
												</TableCell>
												<TableCell>
													{item.target_liters ? `${formatNumber(item.target_liters)}L` : "-"}
												</TableCell>
												<TableCell>
													{item.target_liters ? (
														<Badge variant={item.water_liters <= item.target_liters ? "default" : "destructive"}>
															{item.water_liters <= item.target_liters ? "On Target" : "Over Target"}
														</Badge>
													) : (
														<Badge variant="outline">No Target</Badge>
													)}
												</TableCell>
											</TableRow>
										))}
									</TableBody>
								</Table>
							</CardContent>
						</Card>
					</TabsContent>

					<TabsContent value="sections" className="space-y-4">
						<Card>
							<CardHeader>
								<CardTitle>Section-wise Water Usage</CardTitle>
								<CardDescription>
									{selectedSection === "all" 
										? "Water consumption breakdown by irrigation sections"
										: `Water consumption for Section ${selectedSection} only`
									}
								</CardDescription>
							</CardHeader>
							<CardContent>
								{selectedSection !== "all" && (
									<div className="mb-4 p-3 bg-blue-50 rounded-lg">
										<div className="flex items-center gap-2 text-blue-800">
											<Activity className="h-4 w-4" />
											<span className="text-sm font-medium">
												Showing data for Section {selectedSection} only. 
												Switch to "All Sections" to see all section data.
											</span>
										</div>
									</div>
								)}
								<Table>
									<TableHeader>
										<TableRow>
											<TableHead>Section</TableHead>
											<TableHead>Water Used (L)</TableHead>
											<TableHead>Events</TableHead>
											<TableHead>Avg Duration</TableHead>
											<TableHead>Last Irrigation</TableHead>
											<TableHead>Usage %</TableHead>
										</TableRow>
									</TableHeader>
									<TableBody>
										{reportData?.sectionUsage.map((section) => (
											<TableRow key={section.section_number}>
												<TableCell className="font-medium">
													Section {section.section_number}
												</TableCell>
												<TableCell>{formatNumber(section.water_liters)}L</TableCell>
												<TableCell>{section.event_count}</TableCell>
												<TableCell>{Math.round(section.avg_duration_minutes)}min</TableCell>
												<TableCell>{section.last_irrigation}</TableCell>
												<TableCell>
													{reportData?.totalWaterUsed ? 
														Math.round((section.water_liters / reportData.totalWaterUsed) * 100) : 0}%
												</TableCell>
											</TableRow>
										))}
									</TableBody>
								</Table>
							</CardContent>
						</Card>
					</TabsContent>
				</Tabs>
			</div>
		</div>
	);
} 