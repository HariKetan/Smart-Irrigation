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
import { useWebSocket } from "@/hooks/useWebSocket";
import type { IrrigationDeviceStatus, MoistureDeviceStatus } from "@/types";

import BulkOperations from "@/components/BulkOperations";

interface Section {
	id: number;
	farm_id: number;
	section_number: number;
	name: string;
	crop: string;
	moisture?: number;
	minThreshold?: number;
	maxThreshold?: number;
	waterUsed?: number;
	valveOpen: boolean;
	area: number;
	location: string;
	lastIrrigation: string;
	nextIrrigation: string;
	mode?: string;
	deviceStatus?: unknown;
	farm?: unknown;
}

interface MoistureReading {
	id: number;
	farm_id: number;
	section_number: number;
	value?: number;
	timestamp: string;
	farm_name?: string;
	section_name?: string;
}

interface SectionUsage {
	section_number: number;
	water_liters: number;
	event_count: number;
	avg_duration_minutes: number;
	last_irrigation: string;
}

interface DeviceStatus {
	device_id: string;
	section_number: number;
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

	const [irrigationDeviceStatuses, setIrrigationDeviceStatuses] = useState<
		IrrigationDeviceStatus[]
	>([]);
	const [moistureDeviceStatuses, setMoistureDeviceStatuses] = useState<
		MoistureDeviceStatus[]
	>([]);
	const [moistureReadings, setMoistureReadings] =
		useState<MoistureReadingsData | null>(null);
	const [loading, setLoading] = useState(true);
	const [totalWaterUsed, setTotalWaterUsed] = useState(0);
	const [activeValves, setActiveValves] = useState(0);
	const [activeSensors, setActiveSensors] = useState(0);
	const [systemStatus, setSystemStatus] = useState({
		online: true,
		wifiConnected: true,
		mqttConnected: true,
		wsConnected: false,
		lastError: "",
	});

	// WebSocket integration for real-time updates
	const { isConnected: wsConnected, sendMessage } = useWebSocket({
		onMessage: (message) => {
			console.log("📨 Dashboard received WebSocket message:", message);

			if (message.type === "section_update") {
				const { farm_id, section_number, ...updateData } = message.data;
				console.log("🔄 Processing section update:", {
					farm_id,
					section_number,
					updateData,
				});

				// Update sections data
				setSections((prevSections) => {
					return prevSections.map((section) => {
						if (
							section.farm_id === farm_id &&
							section.section_number === section_number
						) {
							// Update section with new data
							const updatedSection = { ...section };

							if (updateData.moisture_value !== undefined) {
								updatedSection.moisture = updateData.moisture_value;
							}
							if (updateData.valve_open !== undefined) {
								updatedSection.valveOpen = updateData.valve_open;
							}
							if (updateData.mode !== undefined) {
								updatedSection.mode = updateData.mode;
							}
							if (updateData.min_threshold !== undefined) {
								updatedSection.minThreshold = updateData.min_threshold;
							}
							if (updateData.max_threshold !== undefined) {
								updatedSection.maxThreshold = updateData.max_threshold;
							}
							return updatedSection;
						}
						return section;
					});
				});

				// Update device statuses based on message type
				if (updateData.type === "device_status_update") {
					// Handle device status updates
					if (updateData.device_type === "moisture") {
						// Update moisture device status
						setMoistureDeviceStatuses((prevStatuses) => {
							const existingIndex = prevStatuses.findIndex(
								(status) =>
									status.farm_id === farm_id &&
									status.section_number === section_number &&
									status.device_id === updateData.device_id
							);

							const newStatus: Partial<MoistureDeviceStatus> = {
								farm_id: farm_id,
								section_number: section_number,
								device_id: updateData.device_id,
								timestamp: new Date(updateData.timestamp).getTime(),
								uptime: updateData.uptime || 0,
								wifi: updateData.wifi || false,
								mqtt: updateData.mqtt || false,
								last_error: updateData.last_error || "",
								enable_deep_sleep: updateData.enable_deep_sleep || false,
								reporting_interval: updateData.reporting_interval || 60,
								deep_sleep_duration: updateData.deep_sleep_duration || 0,
							};

							if (existingIndex >= 0) {
								const updated = [...prevStatuses];
								updated[existingIndex] = {
									...updated[existingIndex],
									...newStatus,
								};
								return updated;
							} else {
								// Create a minimal status object for new devices
								const minimalStatus: MoistureDeviceStatus = {
									id: 0, // Will be set by backend
									device_id: newStatus.device_id!,
									farm_id: newStatus.farm_id!,
									section_number: newStatus.section_number!,
									timestamp: newStatus.timestamp!,
									uptime: newStatus.uptime!,
									wifi: newStatus.wifi!,
									mqtt: newStatus.mqtt!,
									last_error: newStatus.last_error!,
									enable_deep_sleep: newStatus.enable_deep_sleep!,
									reporting_interval: newStatus.reporting_interval!,
									deep_sleep_duration: newStatus.deep_sleep_duration!,
									created_at: new Date().toISOString(),
								};
								return [...prevStatuses, minimalStatus];
							}
						});
					} else if (updateData.device_type === "irrigation") {
						// Update irrigation device status
						setIrrigationDeviceStatuses((prevStatuses) => {
							const existingIndex = prevStatuses.findIndex(
								(status) =>
									status.farm_id === farm_id &&
									status.section_number === section_number &&
									status.device_id === updateData.device_id
							);

							const newStatus: Partial<IrrigationDeviceStatus> = {
								farm_id: farm_id,
								section_number: section_number,
								device_id: updateData.device_id,
								timestamp: new Date(updateData.timestamp).getTime(),
								uptime: updateData.uptime || 0,
								wifi: updateData.wifi || 0,
								mqtt: updateData.mqtt || 0,
								last_error: updateData.last_error || "",
								valve_on: updateData.valve_on || 0,
								mode: updateData.mode || "auto",
								latest_moisture: updateData.latest_moisture || 0,
								threshold: updateData.threshold || 60,
								pulse_count: updateData.pulse_count || 0,
								water_ml: updateData.water_ml || 0,
							};

							if (existingIndex >= 0) {
								const updated = [...prevStatuses];
								updated[existingIndex] = {
									...updated[existingIndex],
									...newStatus,
								};
								return updated;
							} else {
								// Create a minimal status object for new devices
								const minimalStatus: IrrigationDeviceStatus = {
									id: 0, // Will be set by backend
									device_id: newStatus.device_id!,
									farm_id: newStatus.farm_id!,
									section_number: newStatus.section_number!,
									timestamp: newStatus.timestamp!,
									uptime: newStatus.uptime!,
									wifi: newStatus.wifi!,
									mqtt: newStatus.mqtt!,
									last_error: newStatus.last_error!,
									valve_on: newStatus.valve_on!,
									mode: newStatus.mode!,
									latest_moisture: newStatus.latest_moisture!,
									threshold: newStatus.threshold!,
									pulse_count: newStatus.pulse_count!,
									water_ml: newStatus.water_ml!,
									created_at: new Date().toISOString(),
								};
								return [...prevStatuses, minimalStatus];
							}
						});
					}
				} else if (updateData.type === "moisture_update") {
					// Update moisture device status
					setMoistureDeviceStatuses((prevStatuses) => {
						const existingIndex = prevStatuses.findIndex(
							(status) =>
								status.farm_id === farm_id &&
								status.section_number === section_number
						);

						const newStatus: Partial<MoistureDeviceStatus> = {
							farm_id: farm_id,
							section_number: section_number,
							device_id: `moisture_${farm_id}_${section_number}`,
							timestamp: Date.now(),
							uptime: 0,
							wifi: true,
							mqtt: true,
							last_error: "",
							enable_deep_sleep: false,
							reporting_interval: 60,
							deep_sleep_duration: 0,
						};

						if (existingIndex >= 0) {
							const updated = [...prevStatuses];
							updated[existingIndex] = {
								...updated[existingIndex],
								...newStatus,
							};
							return updated;
						} else {
							// Create a minimal status object for new devices
							const minimalStatus: MoistureDeviceStatus = {
								id: 0, // Will be set by backend
								device_id: newStatus.device_id!,
								farm_id: newStatus.farm_id!,
								section_number: newStatus.section_number!,
								timestamp: newStatus.timestamp!,
								uptime: newStatus.uptime!,
								wifi: newStatus.wifi!,
								mqtt: newStatus.mqtt!,
								last_error: newStatus.last_error!,
								enable_deep_sleep: newStatus.enable_deep_sleep!,
								reporting_interval: newStatus.reporting_interval!,
								deep_sleep_duration: newStatus.deep_sleep_duration!,
								created_at: new Date().toISOString(),
							};
							return [...prevStatuses, minimalStatus];
						}
					});
				} else if (
					updateData.type === "irrigation_update" ||
					updateData.type === "irrigation_complete"
				) {
					// Update irrigation device status
					setIrrigationDeviceStatuses((prevStatuses) => {
						const existingIndex = prevStatuses.findIndex(
							(status) =>
								status.farm_id === farm_id &&
								status.section_number === section_number
						);

						const newStatus: Partial<IrrigationDeviceStatus> = {
							farm_id: farm_id,
							section_number: section_number,
							device_id: `irrigation_${farm_id}_${section_number}`,
							timestamp: Date.now(),
							uptime: 0,
							wifi: 1, // Use number for irrigation devices
							mqtt: 1, // Use number for irrigation devices
							last_error: "",
							valve_on: updateData.valve_open ? 1 : 0,
							mode: updateData.mode || "manual",
							latest_moisture: 0,
							threshold: 60,
							pulse_count: 0,
							water_ml: updateData.water_ml || 0,
						};

						if (existingIndex >= 0) {
							const updated = [...prevStatuses];
							updated[existingIndex] = {
								...updated[existingIndex],
								...newStatus,
							};
							return updated;
						} else {
							// Create a minimal status object for new devices
							const minimalStatus: IrrigationDeviceStatus = {
								id: 0, // Will be set by backend
								device_id: newStatus.device_id!,
								farm_id: newStatus.farm_id!,
								section_number: newStatus.section_number!,
								timestamp: newStatus.timestamp!,
								uptime: newStatus.uptime!,
								wifi: newStatus.wifi!,
								mqtt: newStatus.mqtt!,
								last_error: newStatus.last_error!,
								valve_on: newStatus.valve_on!,
								mode: newStatus.mode!,
								latest_moisture: newStatus.latest_moisture!,
								threshold: newStatus.threshold!,
								pulse_count: newStatus.pulse_count!,
								water_ml: newStatus.water_ml!,
								created_at: new Date().toISOString(),
							};
							return [...prevStatuses, minimalStatus];
						}
					});
				}
			}
		},
		onConnect: () => {
			console.log(
				"🔌 Dashboard WebSocket connected, subscribing to all sections"
			);
			// Update system status
			setSystemStatus((prev) => ({ ...prev, wsConnected: true }));
			// Subscribe to all sections for this user's farms
			const farmIds = getCurrentUserFarmIds();
			farmIds.forEach((farmId) => {
				// Subscribe to sections 1-4 (typical range)
				for (let sectionNumber = 1; sectionNumber <= 4; sectionNumber++) {
					sendMessage({
						type: "subscribe",
						farmId: farmId,
						sectionNumber: sectionNumber,
					});
				}
			});
		},
		onDisconnect: () => {
			console.log("🔌 Dashboard WebSocket disconnected");
			setSystemStatus((prev) => ({ ...prev, wsConnected: false }));
		},
	});

	const fetchSections = async () => {
		try {
			// Get sections data
			const sectionsData = (await api.getSections()) as any[];
			console.log("Fetched sections data:", sectionsData);
			setSections(sectionsData);

			// Get latest moisture readings
			const readingsData = (await api.getLatestMoistureReadings()) as any[];
			setLatestReadings(readingsData);

			// Get section usage statistics
			const usageData = (await api.getSectionUsage()) as any[];
			setSectionUsage(usageData);

			// Get irrigation device statuses (valves)
			const irrigationStatusData =
				(await api.getIrrigationDeviceStatus()) as IrrigationDeviceStatus[];
			console.log("Fetched irrigation device statuses:", irrigationStatusData);
			setIrrigationDeviceStatuses(irrigationStatusData);

			// Get moisture device statuses (sensors)
			const moistureStatusData =
				(await api.getMoistureDeviceStatus()) as MoistureDeviceStatus[];
			console.log("Fetched moisture device statuses:", moistureStatusData);
			setMoistureDeviceStatuses(moistureStatusData);

			// Update system status based on device statuses
			if (irrigationStatusData.length > 0) {
				const latestStatus = irrigationStatusData[0];
				setSystemStatus({
					online: true,
					wifiConnected: Boolean(latestStatus.wifi),
					mqttConnected: Boolean(latestStatus.mqtt),
					wsConnected: wsConnected, // Add WebSocket status
					lastError: latestStatus.last_error || "",
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
		const total = sectionUsage.reduce(
			(sum, usage) => sum + usage.water_liters,
			0
		);

		// Calculate active valves (sections with irrigation devices that reported within last 5 minutes)
		const now = Date.now();
		const fiveMinutesAgo = now - 5 * 60 * 1000; // 5 minutes in milliseconds

		console.log("🔍 Calculating active devices...");
		console.log("Current time:", new Date(now).toISOString());
		console.log("Five minutes ago:", new Date(fiveMinutesAgo).toISOString());

		// Get unique sections with active irrigation devices (running valves)
		const activeValveSections = new Set<number>();
		irrigationDeviceStatuses.forEach((device) => {
			// Handle different timestamp formats
			let deviceTime: number;
			if (typeof device.timestamp === "number") {
				deviceTime = device.timestamp;
			} else if (typeof device.timestamp === "string") {
				deviceTime = new Date(device.timestamp).getTime();
			} else if (typeof device.timestamp === "bigint") {
				deviceTime = Number(device.timestamp);
			} else {
				console.warn("Unknown timestamp format for device:", device);
				return;
			}

			const isActive = deviceTime > fiveMinutesAgo && device.valve_on === 1;
			console.log(
				`Valve ${device.device_id} (Section ${
					device.section_number
				}): ${new Date(deviceTime).toISOString()} - Valve: ${
					device.valve_on === 1 ? "ON" : "OFF"
				} - ${isActive ? "ACTIVE" : "INACTIVE"}`
			);

			if (isActive) {
				activeValveSections.add(device.section_number);
			}
		});

		const activeValveCount = activeValveSections.size;

		// Calculate active sensors (sections with moisture devices that reported within last 5 minutes)
		const activeSensorSections = new Set<number>();
		moistureDeviceStatuses.forEach((device) => {
			// Handle different timestamp formats
			let deviceTime: number;
			if (typeof device.timestamp === "number") {
				deviceTime = device.timestamp;
			} else if (typeof device.timestamp === "string") {
				deviceTime = new Date(device.timestamp).getTime();
			} else if (typeof device.timestamp === "bigint") {
				deviceTime = Number(device.timestamp);
			} else {
				console.warn("Unknown timestamp format for device:", device);
				return;
			}

			const isActive = deviceTime > fiveMinutesAgo;
			console.log(
				`Sensor ${device.device_id} (Section ${
					device.section_number
				}): ${new Date(deviceTime).toISOString()} - ${
					isActive ? "ACTIVE" : "INACTIVE"
				}`
			);

			if (isActive) {
				activeSensorSections.add(device.section_number);
			}
		});

		const activeSensorCount = activeSensorSections.size;

		console.log(
			`📊 Active devices: ${activeValveCount} valves, ${activeSensorCount} sensors`
		);

		setTotalWaterUsed(total);
		setActiveValves(activeValveCount);
		setActiveSensors(activeSensorCount);
	}, [
		sections,
		sectionUsage,
		irrigationDeviceStatuses,
		moistureDeviceStatuses,
	]);

	const handleSectionSelect = (section: Section) => {
		// Debug logging
		console.log("Section clicked:", section);
		console.log("farm_id:", section.farm_id);
		console.log("section_number:", section.section_number);

		// Navigate to the section detail page using farm_id and section_number
		const route = `/section-detail/${section.farm_id}/${section.section_number}`;
		console.log("Navigating to:", route);
		router.push(route);
	};

	// Helper function to get water usage for a specific section
	const getSectionWaterUsage = (sectionId: number): number => {
		// Find the section to get its section_number
		const section = sections.find(s => s.id === sectionId);
		if (!section) return 0;
		
		// Use section_number to find water usage
		const usage = sectionUsage.find((u) => u.section_number === section.section_number);
		return usage ? usage.water_liters : 0;
	};

	// Helper function to get irrigation device status for a section
	const getSectionIrrigationStatus = (
		sectionNumber: number
	): IrrigationDeviceStatus | null => {
		return (
			irrigationDeviceStatuses.find(
				(device) => device.section_number === sectionNumber
			) || null
		);
	};

	// Helper function to get moisture device status for a section
	const getSectionMoistureStatus = (
		sectionNumber: number
	): MoistureDeviceStatus | null => {
		return (
			moistureDeviceStatuses.find(
				(device) => device.section_number === sectionNumber
			) || null
		);
	};

	// Helper function to get target display for dashboard sections
	const getSectionTargetDisplay = (section: Section) => {
		if (
			section.minThreshold !== undefined &&
			section.maxThreshold !== undefined
		) {
			const status =
				(section.moisture || 0) < section.minThreshold
					? `${section.minThreshold - (section.moisture || 0)}% below min`
					: (section.moisture || 0) > section.maxThreshold
					? `${(section.moisture || 0) - section.maxThreshold}% above max`
					: "Optimal";
			return `Target: ${section.minThreshold}% - ${section.maxThreshold}% • ${status}`;
		}
		return "Target: Not configured";
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
						<Badge variant="outline" className="flex items-center gap-1">
							<div
								className={`w-2 h-2 rounded-full ${
									systemStatus.online
										? "bg-green-500 animate-pulse"
										: "bg-red-500"
								}`}
							></div>
							{systemStatus.online ? "System Online" : "System Offline"}
						</Badge>
						<Badge variant="outline" className="flex items-center gap-1">
							<Wifi
								className={`h-3 w-3 ${
									systemStatus.wifiConnected ? "text-green-500" : "text-red-500"
								}`}
							/>
							{systemStatus.wifiConnected ? "WiFi" : "No WiFi"}
						</Badge>
						<Badge variant="outline" className="flex items-center gap-1">
							<Signal
								className={`h-3 w-3 ${
									systemStatus.mqttConnected ? "text-green-500" : "text-red-500"
								}`}
							/>
							{systemStatus.mqttConnected ? "MQTT" : "No MQTT"}
						</Badge>
						<Badge variant="outline" className="flex items-center gap-1">
							<Activity
								className={`h-3 w-3 ${
									systemStatus.wsConnected ? "text-green-500" : "text-red-500"
								}`}
							/>
							{systemStatus.wsConnected ? "Live" : "No Live"}
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
							<p className="text-xs text-muted-foreground">
								Irrigation controllers online
							</p>
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
								{activeSensors}/{sections.length}
							</div>
							<p className="text-xs text-muted-foreground">
								Moisture sensors online
							</p>
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
								section.minThreshold,
								section.maxThreshold
							);
							const irrigationStatus = getSectionIrrigationStatus(
								section.section_number
							);
							const moistureDeviceStatus = getSectionMoistureStatus(
								section.section_number
							);

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
												<span className="font-bold">
													{section.moisture || 0}%
												</span>
											</div>
											<Progress value={section.moisture || 0} className="h-2" />
											<div className="text-xs text-muted-foreground dark:text-black">
												{getSectionTargetDisplay(section)}
											</div>
										</div>

										{/* Device Status
										{(irrigationStatus || moistureDeviceStatus) && (
											<div className="grid grid-cols-2 gap-2 text-xs">
												{irrigationStatus && (
													<>
														<div className="flex items-center gap-1">
															<div
																className={`w-2 h-2 rounded-full ${
																	irrigationStatus.wifi
																		? "bg-green-500"
																		: "bg-red-500"
																}`}
															></div>
															<span className="text-black dark:text-black">
																Valve WiFi
															</span>
														</div>
														<div className="flex items-center gap-1">
															<div
																className={`w-2 h-2 rounded-full ${
																	irrigationStatus.mqtt
																		? "bg-green-500"
																		: "bg-red-500"
																}`}
															></div>
															<span className="text-black dark:text-black">
																Valve MQTT
															</span>
														</div>
													</>
												)}
												{moistureDeviceStatus && (
													<>
														<div className="flex items-center gap-1">
															<div
																className={`w-2 h-2 rounded-full ${
																	moistureDeviceStatus.wifi
																		? "bg-green-500"
																		: "bg-red-500"
																}`}
															></div>
															<span className="text-black dark:text-black">
																Sensor WiFi
															</span>
														</div>
														<div className="flex items-center gap-1">
															<div
																className={`w-2 h-2 rounded-full ${
																	moistureDeviceStatus.mqtt
																		? "bg-green-500"
																		: "bg-red-500"
																}`}
															></div>
															<span className="text-black dark:text-black">
																Sensor MQTT
															</span>
														</div>
													</>
												)}
											</div>
										)} */}

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
													{section.mode || "Manual"}
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
										{(section.moisture || 0) < (section.minThreshold || 60) ? (
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
					<CardContent className="grid grid-cols-2 md:grid-cols-2 gap-3">
						<Button variant="outline" className="h-12">
							<Activity className="h-4 w-4 mr-2" />
							System Status
						</Button>
						<Button
							variant="outline"
							className="h-12"
							onClick={() => router.push("/water-report")}
						>
							<Droplets className="h-4 w-4 mr-2" />
							Water Report
						</Button>
						
					</CardContent>
				</Card>
			</div>
		</div>
	);
}
