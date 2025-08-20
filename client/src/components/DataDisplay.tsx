"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Droplets, Activity, Gauge, RefreshCw } from "lucide-react";
import { api } from "@/lib/api";

interface Sensor {
	id: string;
	name: string;
	type: "MOISTURE" | "WATER_FLOW";
	value: number;
	unit: string;
	zone: string;
	status: string;
	location: string;
	lastReading: string;
	isActive: boolean;
	zoneId: number;
}

export default function DataDisplay() {
	const [sensors, setSensors] = useState<Sensor[]>([]);
	const [loading, setLoading] = useState(true);
	const [refreshing, setRefreshing] = useState(false);

	const fetchSensors = async () => {
		try {
			// Get latest moisture readings which contain real sensor data
			const readings = (await api.getLatestMoistureReadings()) as any[];

			// Transform readings data to match Sensor interface
			const sensorData = readings.map((reading) => ({
				id: `sensor-${reading.section_number}`,
				name: `Section ${reading.section_number}`,
				type: "MOISTURE" as const,
				value: reading.value || 0,
				unit: "%",
				zone: `Zone ${reading.section_number}`,
				status: "Active", // All readings are from active sensors
				location: `Zone ${reading.section_number}`,
				lastReading: reading.timestamp || new Date().toISOString(),
				isActive: true,
				zoneId: reading.section_number,
			}));

			setSensors(sensorData);
		} catch (error) {
			console.error("Error fetching sensors:", error);
		} finally {
			setLoading(false);
			setRefreshing(false);
		}
	};

	useEffect(() => {
		fetchSensors();
	}, []);

	const handleRefresh = () => {
		setRefreshing(true);
		fetchSensors();
	};

	const getSensorIcon = (type: string) => {
		switch (type) {
			case "MOISTURE":
				return <Droplets className="h-4 w-4" />;
			case "WATER_FLOW":
				return <Gauge className="h-4 w-4" />;
			default:
				return <Activity className="h-4 w-4" />;
		}
	};

	const getSensorColor = (type: string) => {
		switch (type) {
			case "MOISTURE":
				return "text-blue-500";
			case "WATER_FLOW":
				return "text-purple-500";
			default:
				return "text-gray-500";
		}
	};

	const formatTimestamp = (timestamp: string) => {
		const date = new Date(timestamp);
		const now = new Date();
		const diffInMinutes = Math.floor(
			(now.getTime() - date.getTime()) / (1000 * 60)
		);

		if (diffInMinutes < 1) return "Just now";
		if (diffInMinutes < 60) return `${diffInMinutes} min ago`;
		if (diffInMinutes < 1440)
			return `${Math.floor(diffInMinutes / 60)} hours ago`;
		return `${Math.floor(diffInMinutes / 1440)} days ago`;
	};

	if (loading) {
		return (
			<div className="min-h-screen bg-background flex items-center justify-center">
				<div className="text-center">
					<div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary mx-auto"></div>
					<p className="mt-4 text-muted-foreground">Loading sensor data...</p>
				</div>
			</div>
		);
	}

	return (
		<div className="min-h-screen bg-background">
			<div className="p-3 md:p-6 pt-16 md:pt-6">
				<div className="max-w-7xl mx-auto space-y-4 md:space-y-6">
					{/* Header */}
					<div className="flex items-center justify-between">
						<div className="space-y-2">
							<h1 className="text-2xl md:text-3xl font-bold">Sensor Data</h1>
							<p className="text-sm text-muted-foreground">
								Real-time sensor readings from your irrigation system
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

					{/* Sensor Grid */}
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
						{sensors.map((sensor) => {
							return (
								<Card
									key={sensor.id}
									className="hover:shadow-lg transition-shadow"
								>
									<CardHeader className="pb-3">
										<div className="flex items-center justify-between">
											<div className="flex items-center gap-2">
												<div
													className={`p-2 rounded-lg bg-muted ${getSensorColor(
														sensor.type
													)}`}
												>
													{getSensorIcon(sensor.type)}
												</div>
												<div>
													<CardTitle className="text-base">
														{sensor.name}
													</CardTitle>
													<p className="text-xs text-muted-foreground capitalize">
														{sensor.type.toLowerCase()} sensor
													</p>
												</div>
											</div>
											<Badge
												variant={sensor.isActive ? "default" : "secondary"}
											>
												{sensor.isActive ? "Active" : "Inactive"}
											</Badge>
										</div>
									</CardHeader>
									<CardContent className="pt-0">
										<div className="space-y-3">
											<div className="flex justify-between items-center">
												<span className="text-sm text-muted-foreground">
													Current Value
												</span>
												<span className="text-sm font-medium">
													{sensor.value} {sensor.unit}
												</span>
											</div>

											<div className="flex justify-between items-center">
												<span className="text-sm text-muted-foreground">
													Zone
												</span>
												<span className="text-sm font-medium">
													{sensor.zone}
												</span>
											</div>

											<div className="flex items-center justify-between">
												<span className="text-sm text-muted-foreground">
													Location
												</span>
												<span className="text-sm font-medium truncate max-w-[120px]">
													{sensor.location}
												</span>
											</div>

											<div className="flex items-center justify-between">
												<span className="text-sm text-muted-foreground">
													Last Update
												</span>
												<span className="text-xs text-muted-foreground">
													{formatTimestamp(sensor.lastReading)}
												</span>
											</div>
										</div>
									</CardContent>
								</Card>
							);
						})}
					</div>

					{/* Summary Stats */}
					<div className="grid grid-cols-1 md:grid-cols-4 gap-4">
						<Card>
							<CardContent className="p-4">
								<div className="flex items-center justify-between">
									<div>
										<p className="text-sm text-muted-foreground">
											Total Sensors
										</p>
										<p className="text-2xl font-bold">{sensors.length}</p>
									</div>
									<Activity className="h-8 w-8 text-blue-500" />
								</div>
							</CardContent>
						</Card>

						<Card>
							<CardContent className="p-4">
								<div className="flex items-center justify-between">
									<div>
										<p className="text-sm text-muted-foreground">
											Active Sensors
										</p>
										<p className="text-2xl font-bold text-green-600">
											{sensors.filter((s) => s.isActive).length}
										</p>
									</div>
									<div className="h-8 w-8 bg-green-100 rounded-full flex items-center justify-center">
										<div className="h-3 w-3 bg-green-500 rounded-full"></div>
									</div>
								</div>
							</CardContent>
						</Card>

						<Card>
							<CardContent className="p-4">
								<div className="flex items-center justify-between">
									<div>
										<p className="text-sm text-muted-foreground">
											Inactive Sensors
										</p>
										<p className="text-2xl font-bold text-red-600">
											{sensors.filter((s) => !s.isActive).length}
										</p>
									</div>
									<div className="h-8 w-8 bg-red-100 rounded-full flex items-center justify-center">
										<div className="h-3 w-3 bg-red-500 rounded-full"></div>
									</div>
								</div>
							</CardContent>
						</Card>

						<Card>
							<CardContent className="p-4">
								<div className="flex items-center justify-between">
									<div>
										<p className="text-sm text-muted-foreground">
											Zones Covered
										</p>
										<p className="text-2xl font-bold">
											{new Set(sensors.map((s) => s.zone).filter(Boolean)).size}
										</p>
									</div>
									<Droplets className="h-8 w-8 text-blue-500" />
								</div>
							</CardContent>
						</Card>
					</div>

					{sensors.length === 0 && (
						<Card>
							<CardContent className="p-8 text-center">
								<Activity className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
								<h3 className="text-lg font-medium mb-2">No Sensors Found</h3>
								<p className="text-muted-foreground">
									No sensors are currently configured in your irrigation system.
								</p>
							</CardContent>
						</Card>
					)}
				</div>
			</div>
		</div>
	);
}
