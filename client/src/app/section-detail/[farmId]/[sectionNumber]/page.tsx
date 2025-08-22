"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
	ArrowLeft,
	Gauge,
	Settings,
	AlertTriangle,
	MapPin,
	Activity,
	TrendingUp,
	Calendar,
	Save,
} from "lucide-react";
import { api } from "@/lib/api";
import { useWebSocket } from "@/hooks/useWebSocket";
import IrrigationControl from "@/components/IrrigationControl";
import ReportingIntervalControl from "@/components/ReportingIntervalControl";
import { MoistureChart } from "@/components/MoistureChart";
import { DeviceStatus } from "@/components/DeviceStatus";

interface DeviceStatusData {
	device_id: string;
	mqtt: boolean;
	wifi: boolean;
	uptime: number;
	last_error: string;
	mode?: string;
	valve_on?: number;
	latest_moisture?: number;
	min_threshold?: number;
	max_threshold?: number;
	reporting_interval?: number;
}

interface Section {
	id: number | string;
	name: string;
	crop: string;
	moisture: number;
	minThreshold?: number;
	maxThreshold?: number;
	waterUsed: number;
	valveOpen: boolean;
	lastIrrigation?: string;
	nextIrrigation?: string;
	area?: number;
	location?: string;
	flowRate?: number;
	dailyUsage?: number[];
	weeklyTarget?: number;
	soilPh?: number;
	plantingDate?: string;
	expectedHarvest?: string;
	mode?: string;
	deviceStatus?: unknown;
	farm?: unknown;
}

interface SectionUsage {
	section_number: number;
	water_liters: number;
	event_count: number;
	avg_duration_minutes: number;
	last_irrigation: string;
}

interface DailyUsage {
	date: string;
	water_liters: number;
	event_count: number;
	avg_duration_minutes: number;
	target_liters?: number;
	total_duration_minutes?: number;
	section_number?: number;
}

interface DeviceConfig {
	minThreshold: number;
	maxThreshold: number;
	enableDeepSleep: boolean;
	deepSleepDuration: number;
	reportingInterval: number;
}

interface MoistureReading {
	id: number;
	farm_id: number;
	section_number: number;
	value: number;
	timestamp: string;
	farm?: unknown;
	section?: unknown;
}

export default function SectionDetailPage() {
	const params = useParams();
	const router = useRouter();
	const farmId = parseInt(params.farmId as string);
	const sectionNumber = parseInt(params.sectionNumber as string);
	const [maxWaterUsageTarget, setMaxWaterUsageTarget] = useState<number>(100);
	// State management
	const [section, setSection] = useState<Section | null>(null);
	const [deviceStatus, setDeviceStatus] = useState<DeviceStatusData | null>(
		null
	);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);
	const [toggling, setToggling] = useState(false);
	const [configuring, setConfiguring] = useState(false);
	const [sectionUsage, setSectionUsage] = useState<SectionUsage | null>(null);
	const [dailyUsage, setDailyUsage] = useState<DailyUsage[]>([]);
	const [moistureReadings, setMoistureReadings] = useState<MoistureReading[]>(
		[]
	);
	const [waterUsageTarget, setWaterUsageTarget] = useState<number>(0);
	const [editingTarget, setEditingTarget] = useState(false);
	const [savingTarget, setSavingTarget] = useState(false);
	const [deviceConfig, setDeviceConfig] = useState<DeviceConfig>({
		minThreshold: 30,
		maxThreshold: 70,
		enableDeepSleep: false,
		deepSleepDuration: 60,
		reportingInterval: 60,
	});

	// WebSocket connection for real-time updates
	const { isConnected: wsConnected, sendMessage } = useWebSocket({
		onMessage: (message) => {
			if (message.type === "section_update") {
				const updateData = message.data;
				if (updateData.section_number === sectionNumber) {
					setSection((prevSection) => {
						if (!prevSection) return prevSection;
						return {
							...prevSection,
							moisture: updateData.moisture_value || prevSection.moisture,
							valveOpen: updateData.valve_on === 1,
							mode: updateData.mode || prevSection.mode,
							// Update thresholds from device status
							minThreshold:
								updateData.min_threshold || prevSection.minThreshold,
							maxThreshold:
								updateData.max_threshold || prevSection.maxThreshold,
						};
					});

					// Update device config with new threshold values
					if (
						updateData.min_threshold !== undefined ||
						updateData.max_threshold !== undefined
					) {
						setDeviceConfig((prevConfig) => ({
							...prevConfig,
							minThreshold:
								updateData.min_threshold !== undefined
									? updateData.min_threshold
									: prevConfig.minThreshold,
							maxThreshold:
								updateData.max_threshold !== undefined
									? updateData.max_threshold
									: prevConfig.maxThreshold,
						}));
					}

					// Add new moisture reading
					if (updateData.moisture_value !== undefined) {
						const newReading: MoistureReading = {
							id: Date.now(),
							farm_id: farmId,
							section_number: sectionNumber,
							value: updateData.moisture_value,
							timestamp: updateData.timestamp || new Date().toISOString(),
						};

						setMoistureReadings((prevReadings) => {
							const updatedReadings = [...prevReadings, newReading];
							// Keep only last 50 readings
							return updatedReadings.slice(-50);
						});
					}
				}
			}
			// Handle device status updates
			if (message.type === "device_status_update") {
				const updateData = message.data;
				console.log("📊 Device status update received:", updateData);

				// Update device status
				if (updateData.device_type === "irrigation") {
					setDeviceStatus((prevStatus) => {
						if (!prevStatus) return prevStatus;
						return {
							...prevStatus,
							mqtt: Boolean(updateData.mqtt),
							wifi: Boolean(updateData.wifi),
							uptime: Math.floor(parseInt(updateData.uptime || "0") / 1000), // Convert milliseconds to seconds
							last_error: updateData.last_error || "",
							mode: updateData.mode || prevStatus.mode,
							valve_on: parseInt(updateData.valve_on || "0"),
							latest_moisture: parseInt(updateData.latest_moisture || "0"),
							min_threshold:
								updateData.min_threshold !== undefined
									? parseInt(updateData.min_threshold)
									: prevStatus.min_threshold,
							max_threshold:
								updateData.max_threshold !== undefined
									? parseInt(updateData.max_threshold)
									: prevStatus.max_threshold,
							reporting_interval: parseInt(
								updateData.reporting_interval || "60"
							),
						};
					});
				}

				// Update device config with new threshold values
				if (
					updateData.min_threshold !== undefined ||
					updateData.max_threshold !== undefined
				) {
					setDeviceConfig((prevConfig) => ({
						...prevConfig,
						minThreshold:
							updateData.min_threshold !== undefined
								? updateData.min_threshold
								: prevConfig.minThreshold,
						maxThreshold:
							updateData.max_threshold !== undefined
								? updateData.max_threshold
								: prevConfig.maxThreshold,
					}));
				}
			}
		},
		onConnect: () => {
			console.log(
				"🔌 Section Detail WebSocket connected, subscribing to section",
				sectionNumber
			);
			// Subscribe to this specific section
			sendMessage({
				type: "subscribe",
				farmId: farmId,
				sectionNumber: sectionNumber,
			});
		},
		onDisconnect: () => {
			console.log("🔌 Section Detail WebSocket disconnected");
		},
	});

	const fetchSection = async () => {
		try {
			// Get section data using new API structure
			const sectionData = (await api.getSection(farmId, sectionNumber)) as any;
			setSection(sectionData);

			// Get section usage statistics
			const usageData = (await api.getSectionUsage(7)) as any[];
			const sectionUsageData = usageData.find(
				(usage: any) => usage.section_number === sectionNumber
			);
			setSectionUsage(sectionUsageData || null);

			// Get daily usage statistics
			const dailyData = (await api.getDailyUsage(7, sectionNumber)) as any[];
			console.log(`📊 Received daily usage data:`, dailyData);
			setDailyUsage(dailyData);

			// Initialize water usage target from localStorage or daily data
			const savedTarget = localStorage.getItem(`waterTarget_${farmId}_${sectionNumber}`);
			if (savedTarget) {
				setWaterUsageTarget(parseInt(savedTarget));
				setMaxWaterUsageTarget(parseInt(savedTarget));
			} else if (dailyData.length > 0 && dailyData[0].target_liters) {
				setWaterUsageTarget(dailyData[0].target_liters);
			}

			// Get moisture readings for this section
			const readingsData = (await api.getSectionReadings(
				farmId,
				sectionNumber
			)) as any[];
			setMoistureReadings(readingsData);

			// Update device config from section data (now includes min/max thresholds from irrigation device)
			if (sectionData.deviceStatus) {
				setDeviceConfig({
					minThreshold: sectionData.deviceStatus.min_threshold,
					maxThreshold: sectionData.deviceStatus.max_threshold,
					enableDeepSleep: sectionData.deviceStatus.enable_deep_sleep || false,
					deepSleepDuration: sectionData.deviceStatus.deep_sleep_duration || 60,
					reportingInterval: sectionData.deviceStatus.reporting_interval || 60,
				});

				// Set device status for DeviceStatus component
				setDeviceStatus({
					device_id:
						sectionData.deviceStatus.device_id || "irrigation_controller_1",
					mqtt: Boolean(sectionData.deviceStatus.mqtt),
					wifi: Boolean(sectionData.deviceStatus.wifi),
					uptime: parseInt(sectionData.deviceStatus.uptime || "0"),
					last_error: sectionData.deviceStatus.last_error || "",
					mode: sectionData.deviceStatus.mode || "manual",
					valve_on: parseInt(sectionData.deviceStatus.valve_on || "0"),
					latest_moisture: parseInt(
						sectionData.deviceStatus.latest_moisture || "0"
					),
					min_threshold: sectionData.deviceStatus.min_threshold,
					max_threshold: sectionData.deviceStatus.max_threshold,
					reporting_interval: parseInt(
						sectionData.deviceStatus.reporting_interval || "60"
					),
				});

				// Update section with min/max thresholds from irrigation device status
				setSection((prevSection) => {
					if (!prevSection) return prevSection;
					return {
						...prevSection,
						minThreshold: sectionData.deviceStatus.min_threshold,
						maxThreshold: sectionData.deviceStatus.max_threshold,
					};
				});
			} else {
				// Set default device status if no data is available
				setDeviceStatus({
					device_id: "",
					mqtt: false,
					wifi: false,
					uptime: 0,
					last_error: "No device data available",
					mode: "manual",
					valve_on: 0,
					latest_moisture: 0,
					min_threshold: undefined,
					max_threshold: undefined,
					reporting_interval: 60,
				});
			}
		} catch (error) {
			console.error("Error fetching section:", error);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		if (farmId && sectionNumber) {
			fetchSection();
		}
	}, [farmId, sectionNumber]);

	const handleValveToggle = async () => {
		if (!section) return;

		setToggling(true);
		try {
			await api.toggleValve(farmId, sectionNumber, {
				valveOpen: !section.valveOpen,
				duration: 60, // 60 seconds default
			});
			// Refresh section data
			await fetchSection();
		} catch (error) {
			console.error("Error toggling valve:", error);
		} finally {
			setToggling(false);
		}
	};

	const handleModeToggle = async () => {
		if (!section) return;

		try {
			const newMode = section.mode === "auto" ? "manual" : "auto";
			await api.setMode(farmId, sectionNumber, newMode);
			await fetchSection();
		} catch (error) {
			console.error("Error changing mode:", error);
		}
	};

	const handleConfigUpdate = async () => {
		if (!section) return;

		setConfiguring(true);
		try {
			// Only send the fields that the API expects
			const configData = {
				enable_deep_sleep: deviceConfig.enableDeepSleep,
				deep_sleep_duration: deviceConfig.deepSleepDuration,
				reporting_interval: deviceConfig.reportingInterval,
			};
			await api.updateConfig(farmId, sectionNumber, configData);
			await fetchSection();
		} catch (error) {
			console.error("Error updating configuration:", error);
		} finally {
			setConfiguring(false);
		}
	};

	const updateThreshold = (newThreshold: number) => {
		setDeviceConfig((prev) => ({ ...prev, threshold: newThreshold }));
	};

	const handleSaveWaterTarget = async () => {
		setSavingTarget(true);
		try {
			// Save to localStorage for persistence
			localStorage.setItem(`waterTarget_${farmId}_${sectionNumber}`, waterUsageTarget.toString());
			
			// Here you would typically save to your API
			// await api.updateWaterTarget(farmId, sectionNumber, waterUsageTarget);
			console.log("Saving water usage target:", waterUsageTarget);
			setEditingTarget(false);
			// You could show a success toast here
		} catch (error) {
			console.error("Error saving water target:", error);
			// You could show an error toast here
		} finally {
			setSavingTarget(false);
		}
	};

	// Updated moisture status logic using min/max thresholds
	const getMoistureStatus = (
		moisture: number,
		minThreshold: number,
		maxThreshold: number
	) => {
		if (moisture < minThreshold) {
			return {
				status: "Critical",
				color: "destructive",
				bgColor: "bg-red-200 border-red-200",
			};
		}
		if (moisture > maxThreshold) {
			return {
				status: "High",
				color: "secondary",
				bgColor: "bg-orange-200 border-orange-200",
			};
		}
		return {
			status: "Optimal",
			color: "default",
			bgColor: "bg-emerald-200 border-emerald-400",
		};
	};

	// Helper function to get target display
	const getTargetDisplay = () => {
		// Only show target if we have actual hardware values
		if (
			section?.minThreshold !== undefined &&
			section?.maxThreshold !== undefined
		) {
			return {
				text: `Target: ${section.minThreshold}% - ${section.maxThreshold}%`,
				status:
					section.moisture < section.minThreshold
						? `${section.minThreshold - section.moisture}% below min`
						: section.moisture > section.maxThreshold
						? `${section.moisture - section.maxThreshold}% above max`
						: "Optimal",
				statusColor:
					section.moisture < section.minThreshold
						? "text-red-600 font-medium"
						: section.moisture > section.maxThreshold
						? "text-orange-600 font-medium"
						: "",
			};
		}
		return {
			text: "Target: Not configured",
			status: "",
			statusColor: "",
		};
	};

	const targetDisplay = getTargetDisplay();

	// Calculate today's water usage from daily usage data
	const getTodayWaterUsage = (): number => {
		if (!dailyUsage || dailyUsage.length === 0) return 0;
		
		const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD format
		const todayUsage = dailyUsage.find(usage => usage.date === today);
		
		console.log(`📅 Today's date: ${today}`);
		console.log(`📊 Daily usage data:`, dailyUsage);
		console.log(`🔍 Today's usage found:`, todayUsage);
		
		return todayUsage ? todayUsage.water_liters : 0;
	};

	const getTodayEventCount = (): number => {
		if (!dailyUsage || dailyUsage.length === 0) return 0;
		
		const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD format
		const todayUsage = dailyUsage.find(usage => usage.date === today);
		
		return todayUsage ? todayUsage.event_count : 0;
	};

	if (loading) {
		return (
			<div className="container mx-auto px-4 py-8">
				<div className="flex items-center justify-center min-h-[400px]">
					<div className="text-center">
						<div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
						<p className="text-muted-foreground">Loading section details...</p>
					</div>
				</div>
			</div>
		);
	}

	if (error || !section) {
		return (
			<div className="min-h-screen bg-background p-4 flex items-center justify-center">
				<div className="text-center">
					<AlertTriangle className="h-12 w-12 text-red-500 mx-auto mb-4" />
					<h2 className="text-xl font-semibold mb-2">Error Loading Section</h2>
					<p className="text-muted-foreground mb-4">
						{error || "Section not found"}
					</p>
					<Button onClick={() => router.back()}>
						<ArrowLeft className="h-4 w-4 mr-2" />
						Go Back
					</Button>
				</div>
			</div>
		);
	}

	const moistureStatus =
		section.minThreshold !== undefined && section.maxThreshold !== undefined
			? getMoistureStatus(
					section.moisture,
					section.minThreshold,
					section.maxThreshold
			  )
			: {
					status: "Unknown",
					color: "secondary",
					bgColor: "bg-gray-200 border-gray-200",
			  };

	return (
		<div className="min-h-screen bg-background p-3 md:p-6">
			<div className="max-w-7xl mx-auto space-y-4 md:space-y-6">
				{/* Header */}
				<div className="flex items-center gap-3">
					<Button variant="outline" size="sm" onClick={() => router.back()}>
						<ArrowLeft className="h-4 w-4" />
					</Button>
					<div className="flex flex-col items-start">
						<div className="flex items-center gap-2">
							<MapPin className="h-5 w-5" />
							<h1 className="text-xl md:text-2xl font-bold">
								{section?.name || "Section"}
							</h1>
							<Badge
								variant={
									moistureStatus.color as
										| "default"
										| "secondary"
										| "destructive"
										| "outline"
								}
							>
								{moistureStatus.status}
							</Badge>
						</div>
						<p className="text-sm text-muted-foreground">
							{section?.crop || "Unknown Crop"} • Planted {section?.plantingDate || "Unknown Date"}
						</p>
					</div>
				</div>

				{/* Device Status */}
				{/* {section && section.deviceStatus !== undefined && section.deviceStatus !== null && (
					<Card>
						<CardHeader>
							<CardTitle className="flex items-center gap-2">
								<Activity className="h-5 w-5" />
								Device Status
							</CardTitle>
						</CardHeader>
						<CardContent>
							<DeviceStatus data={deviceStatus} />
						</CardContent>
					</Card>
				)} */}

				{/* Current Status */}
				<Card className={moistureStatus.bgColor}>
					<CardHeader>
						<CardTitle className="flex items-center justify-between">
							<div className="flex items-center gap-2 dark:text-gray-900">
								<Gauge className="h-5 w-5" />
								Current Status
							</div>
							<Badge variant={wsConnected ? "default" : "destructive"}>
								{wsConnected ? "Live" : "Offline"}
							</Badge>
						</CardTitle>
					</CardHeader>
					<CardContent>
						<div className="space-y-4">
							<div className="flex justify-between items-center">
								<span className="text-lg font-semibold dark:text-gray-900">Soil Moisture</span>
								<span className="text-2xl font-bold dark:text-gray-900">{section.moisture}%</span>
							</div>
							<Progress
								value={section.moisture}
								className="h-4 dark:text-black"
							/>
							<div className="flex justify-between text-sm text-muted-foreground dark:text-gray-700">
								<span>{targetDisplay.text}</span>
								<span className={targetDisplay.statusColor}>
									{targetDisplay.status}
								</span>
							</div>
						</div>
					</CardContent>
				</Card>

				{/* Moisture Chart */}
				<Card>
					<CardHeader>
						<CardTitle className="flex items-center gap-2">
							<Gauge className="h-5 w-5" />
							Moisture Readings
						</CardTitle>
					</CardHeader>
					<CardContent>
						<MoistureChart data={moistureReadings} />
					</CardContent>
				</Card>

				

				{/* Irrigation Control */}
				<IrrigationControl
					farmId={farmId}
					sectionNumber={sectionNumber}
					initialMode={section.mode || "manual"}
					initialMoisture={section.moisture || 0}
					initialValveOpen={section.valveOpen || false}
				/>

				{/* Device Configuration */}
				{/* <Card>
					<CardHeader>
						<CardTitle className="flex items-center gap-2">
							<Settings className="h-5 w-5" />
							Device Configuration
						</CardTitle>
					</CardHeader>
					<CardContent className="space-y-4">
						<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
							<div className="space-y-2">
								<Label htmlFor="deepSleep">Enable Deep Sleep</Label>
								<Switch
									id="deepSleep"
									checked={deviceConfig.enableDeepSleep}
									onCheckedChange={(checked) =>
										setDeviceConfig((prev) => ({
											...prev,
											enableDeepSleep: checked,
										}))
									}
								/>
							</div>
							<div className="space-y-2">
								<Label htmlFor="deepSleepDuration">
									Deep Sleep Duration (seconds)
								</Label>
								<Input
									id="deepSleepDuration"
									type="number"
									value={deviceConfig.deepSleepDuration}
									onChange={(e) =>
										setDeviceConfig((prev) => ({
											...prev,
											deepSleepDuration: parseInt(e.target.value),
										}))
									}
									min={10}
									max={3600}
								/>
							</div>
						</div>
						<Button
							onClick={handleConfigUpdate}
							disabled={configuring}
							className="w-full"
						>
							<Save className="h-4 w-4 mr-2" />
							{configuring ? "Updating..." : "Update Configuration"}
						</Button>
					</CardContent>
				</Card> */}

				{/* Reporting Interval Control */}
				{/* <ReportingIntervalControl
					farmId={farmId}
					sectionNumber={sectionNumber}
					currentInterval={deviceConfig.reportingInterval}
					onIntervalChange={(newInterval) => {
						setDeviceConfig((prev) => ({
							...prev,
							reportingInterval: newInterval,
						}));
					}}
				/> */}

				{/* Water Usage Analytics - 3-Grid Layout for Large Screens */}
				<Card>
					<CardHeader>
						<CardTitle className="flex items-center gap-2">
							<TrendingUp className="h-5 w-5" />
							Water Usage Analytics
						</CardTitle>
					</CardHeader>
					<CardContent className="space-y-4">
						{/* Today's Usage */}
						<div className="flex justify-between items-center p-3 bg-muted rounded-lg">
							<div>
								<div className="font-medium">Today&apos;s Usage</div>
								<div className="text-sm text-muted-foreground">
									Required Water:{" "}
									{editingTarget ? (
										<span className="inline-flex items-center gap-2">
											<Input
												type="number"
												value={waterUsageTarget}
												onChange={(e) => setWaterUsageTarget(Number(e.target.value))}
												className="w-20 h-6 text-sm inline"
												placeholder="0"
												min="0"
											/>
											<span className="text-xs">L/day</span>
											<Button
												size="sm"
												onClick={handleSaveWaterTarget}
												disabled={savingTarget}
												className="h-6 px-2 text-xs"
											>
												{savingTarget ? "Saving..." : "Save"}
											</Button>
											<Button
												size="sm"
												variant="outline"
												onClick={() => setEditingTarget(false)}
												className="h-6 px-2 text-xs"
											>
												Cancel
											</Button>
										</span>
									) : (
										<span className="inline-flex items-center gap-2">
											{waterUsageTarget}L/day
											<Button
												size="sm"
												variant="ghost"
												onClick={() => setEditingTarget(true)}
												className="h-4 w-4 p-0"
											>
												<Settings className="h-3 w-3" />
											</Button>
										</span>
									)}
								</div>
								<div className="text-xs text-muted-foreground mt-1">
									{getTodayEventCount()} irrigation events today
								</div>
							</div>
							<div className="text-right">
								<div className="text-2xl font-bold">
									{getTodayWaterUsage()}L
								</div>
								<div className={`text-sm ${getTodayWaterUsage() > waterUsageTarget ? 'text-red-600' : 'text-green-600'}`}>
									{getTodayWaterUsage() > waterUsageTarget ? 'Overflow' : 'Within target'}
								</div>
								<div className="text-xs text-muted-foreground mt-1">
									{new Date().toLocaleDateString('en-US', { 
										weekday: 'short', 
										month: 'short', 
										day: 'numeric' 
									})}
								</div>
							</div>
						</div>

						{/* Weekly Usage Chart - 3-Grid Layout */}
						<div className="space-y-3">
							<h4 className="font-medium">Last 7 Days</h4>
							<div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
								{(dailyUsage ?? []).map((usage, index) => {
									console.log(`📊 Rendering daily usage item:`, usage);
									const maxUsage = maxWaterUsageTarget;
									const date = new Date(usage.date);
									const dayName = date.toLocaleDateString("en-US", {
										weekday: "short",
									});
									const monthDay = date.toLocaleDateString("en-US", {
										month: "short",
										day: "numeric",
									});

									return (
										<div key={`${usage.date}-${index}`} className="p-3 bg-muted rounded-lg">
											<div className="flex justify-between items-center mb-2">
												<div>
													<div className="font-medium">{dayName}</div>
													<div className="text-xs text-muted-foreground">
														{monthDay}
													</div>
												</div>
												<div className="text-sm font-bold">
													{usage.water_liters}L
												</div>
											</div>
											<Progress
												value={(usage.water_liters / maxUsage) * 100}
												className="h-2"
											/>
											<div className="text-xs text-muted-foreground mt-1">
												{Number(usage.event_count)} events
											</div>
										</div>
									);
								})}
							</div>
						</div>
					</CardContent>
				</Card>

				{/* Crop Information */}
				<Card>
					<CardHeader>
						<CardTitle className="flex items-center gap-2">
							<Calendar className="h-5 w-5" />
							Crop Information
						</CardTitle>
					</CardHeader>
					<CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4">
						<div className="text-center p-3 bg-muted rounded-lg">
							<div className="text-sm text-muted-foreground">Crop Type</div>
							<div className="font-semibold">{section.crop}</div>
						</div>
						<div className="text-center p-3 bg-muted rounded-lg">
							<div className="text-sm text-muted-foreground">Planted</div>
							<div className="font-semibold">{section.plantingDate}</div>
						</div>
						<div className="text-center p-3 bg-muted rounded-lg">
							<div className="text-sm text-muted-foreground">
								Expected Harvest
							</div>
							<div className="font-semibold">{section.expectedHarvest}</div>
						</div>
					</CardContent>
				</Card>
			</div>
		</div>
	);
}
