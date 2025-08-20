"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { api } from "@/lib/api";
import { useWebSocket } from "@/hooks/useWebSocket";
import { toast } from "sonner";

interface IrrigationControlProps {
	farmId: number;
	sectionNumber: number;
	initialMode?: string;
	initialMoisture?: number;
	initialValveOpen?: boolean;
}

export default function IrrigationControl({
	farmId,
	sectionNumber,
	initialMode = "manual",
	initialMoisture = 0,
	initialValveOpen = false,
}: IrrigationControlProps) {
	const [mode, setMode] = useState(initialMode);
	const [moisture, setMoisture] = useState(initialMoisture);
	const [valveOpen, setValveOpen] = useState(initialValveOpen);
	const [irrigating, setIrrigating] = useState(initialValveOpen); // Initialize based on valve state
	const [loading, setLoading] = useState(false);
	const [lastUpdate, setLastUpdate] = useState<Date | null>(null);
	const [duration, setDuration] = useState(60);

	// Threshold states
	const [minThreshold, setMinThreshold] = useState(30);
	const [maxThreshold, setMaxThreshold] = useState(70);
	const [thresholdLoading, setThresholdLoading] = useState(false);

	// Update irrigating state when valve state changes
	useEffect(() => {
		setIrrigating(valveOpen);
	}, [valveOpen]);

	// Debug moisture changes
	useEffect(() => {
		console.log("🔄 Moisture state changed to:", moisture);
	}, [moisture]);

	// Live WebSocket connection for real-time updates
	const { isConnected: wsConnected, sendMessage } = useWebSocket({
		onMessage: (message) => {
			console.log("📨 IrrigationControl received WebSocket message:", message);

			// Only process section_update messages for this specific section
			if (
				message.type === "section_update" &&
				parseInt(message.data.farm_id) === farmId &&
				parseInt(message.data.section_number) === sectionNumber
			) {
				console.log("✅ Processing section update for this section:", {
					farmId,
					sectionNumber,
				});

				// Update local state with real-time data
				if (message.data.moisture_value !== undefined) {
					const newMoistureValue = parseFloat(message.data.moisture_value);
					console.log(
						"💧 Updating moisture value from",
						moisture,
						"to",
						newMoistureValue
					);
					setMoisture(newMoistureValue);
				}
				if (message.data.valve_open !== undefined) {
					console.log("🚰 Updating valve state:", message.data.valve_open);
					setValveOpen(message.data.valve_open);
					setIrrigating(message.data.valve_open);
				}
				if (message.data.mode !== undefined) {
					console.log("⚙️ Updating mode:", message.data.mode);
					setMode(message.data.mode);
				}
				if (message.data.min_threshold !== undefined) {
					console.log("📉 Updating min threshold:", message.data.min_threshold);
					setMinThreshold(parseFloat(message.data.min_threshold));
				}
				if (message.data.max_threshold !== undefined) {
					console.log("📈 Updating max threshold:", message.data.max_threshold);
					setMaxThreshold(parseFloat(message.data.max_threshold));
				}
				setLastUpdate(new Date());
			} else if (message.type === "section_update") {
				// This is a section_update but not for our section - ignore silently
				console.log("📨 Ignoring section update for different section:", {
					messageFarmId: message.data?.farm_id,
					messageSectionNumber: message.data?.section_number,
					expectedFarmId: farmId,
					expectedSectionNumber: sectionNumber,
				});
			}
			// Don't log errors for normal WebSocket messages like 'connection', 'subscribed', 'pong'
		},
		onConnect: () => {
			console.log("🔌 WebSocket connected, subscribing to section updates:", {
				farmId,
				sectionNumber,
			});
			// Subscribe to section updates
			sendMessage({
				type: "subscribe",
				farmId: farmId,
				sectionNumber: sectionNumber,
			});
		},
	});

	const handleStartIrrigation = async () => {
		try {
			setLoading(true);
			console.log(
				`🚰 Starting irrigation on Farm ${farmId}, Section ${sectionNumber}`
			);

			await api.startIrrigation(farmId, sectionNumber, duration);

			toast.success(`Irrigation started for ${duration} seconds`);
			setIrrigating(true);
		} catch (error) {
			console.error("❌ Error starting irrigation:", error);
			toast.error("Failed to start irrigation");
		} finally {
			setLoading(false);
		}
	};

	const handleStopIrrigation = async () => {
		try {
			setLoading(true);
			console.log(
				`🛑 Stopping irrigation on Farm ${farmId}, Section ${sectionNumber}`
			);

			await api.stopIrrigation(farmId, sectionNumber);

			toast.success("Irrigation stopped");
			setIrrigating(false);
		} catch (error) {
			console.error("❌ Error stopping irrigation:", error);
			toast.error("Failed to stop irrigation");
		} finally {
			setLoading(false);
		}
	};

	const handleModeChange = async (newMode: string) => {
		try {
			setLoading(true);
			console.log(
				`⚙️ Setting mode to ${newMode} on Farm ${farmId}, Section ${sectionNumber}`
			);

			await api.setMode(farmId, sectionNumber, newMode);

			setMode(newMode);
			toast.success(`Mode set to ${newMode}`);

			// Stop irrigation if switching to auto mode
			if (newMode === "auto" && irrigating) {
				setIrrigating(false);
			}
		} catch (error) {
			console.error("❌ Error setting mode:", error);
			toast.error("Failed to set mode");
		} finally {
			setLoading(false);
		}
	};

	const handleThresholdUpdate = async () => {
		try {
			setThresholdLoading(true);
			console.log(
				`🔧 Updating thresholds on Farm ${farmId}, Section ${sectionNumber}:`,
				{ minThreshold, maxThreshold }
			);

			await api.updateConfig(farmId, sectionNumber, {
				min_threshold: minThreshold,
				max_threshold: maxThreshold,
			});

			toast.success("Thresholds updated");
		} catch (error) {
			console.error("❌ Error updating thresholds:", error);
			toast.error("Failed to update thresholds");
		} finally {
			setThresholdLoading(false);
		}
	};

	const getMoistureStatus = () => {
		if (minThreshold === 0 && maxThreshold === 0) return "Not configured";
		if (moisture < minThreshold) return "Low";
		if (moisture >= maxThreshold) return "High";
		return "Optimal";
	};

	const getMoistureColor = () => {
		if (minThreshold === 0 && maxThreshold === 0) return "text-gray-500";
		if (moisture < minThreshold) return "text-red-500";
		if (moisture >= maxThreshold) return "text-green-500";
		return "text-yellow-500";
	};

	return (
		<Card className="w-full">
			<CardHeader>
				<CardTitle className="flex items-center justify-between">
					Irrigation Control
					{/* <Badge variant={wsConnected ? "default" : "destructive"}>
						{wsConnected ? "Live" : "Offline"}
					</Badge> */}
				</CardTitle>
			</CardHeader>
			<CardContent className="space-y-6">
				{/* Live Moisture Display */}
				{/* <div className="space-y-2">
					<Label>Live Moisture Reading</Label>
					<div className="flex items-center space-x-2">
						<div className={`text-2xl font-bold ${getMoistureColor()}`}>
							{moisture}%
						</div>
						<Badge variant="outline">{getMoistureStatus()}</Badge>
						{lastUpdate && (
							<span className="text-sm text-muted-foreground">
								Last: {lastUpdate.toLocaleTimeString()}
							</span>
						)}
					</div>
				</div> */}

				{/* Mode Control */}
				<div className="space-y-2">
					<Label>Mode</Label>
					<div className="flex space-x-2">
						<Button
							variant={mode === "manual" ? "default" : "outline"}
							onClick={() => handleModeChange("manual")}
							disabled={loading}
						>
							Manual
						</Button>
						<Button
							variant={mode === "auto" ? "default" : "outline"}
							onClick={() => handleModeChange("auto")}
							disabled={loading}
						>
							Auto
						</Button>
					</div>
				</div>

				{/* Manual Irrigation Controls */}
				{mode === "manual" && (
					<div className="space-y-4">
						<div className="space-y-2">
							<Label>Duration (seconds)</Label>
							<Input
								type="number"
								min="1"
								max="3600"
								value={duration}
								onChange={(e) => setDuration(parseInt(e.target.value))}
								disabled={loading}
							/>
						</div>

						<div className="flex space-x-2">
							<Button
								onClick={handleStartIrrigation}
								disabled={loading || irrigating}
								className="flex-1"
							>
								{loading ? "Starting..." : "Start Irrigation"}
							</Button>
							<Button
								variant="destructive"
								onClick={handleStopIrrigation}
								disabled={loading || !irrigating}
								className="flex-1"
							>
								{loading ? "Stopping..." : "Stop Irrigation"}
							</Button>
						</div>
					</div>
				)}

				{/* Auto Mode Thresholds */}
				{mode === "auto" && (
					<div className="space-y-4">
						<div className="grid grid-cols-2 gap-4">
							<div className="space-y-2">
								<Label>Min Threshold (%)</Label>
								<Input
									type="number"
									min="0"
									max="100"
									value={minThreshold}
									onChange={(e) =>
										setMinThreshold(parseInt(e.target.value) || 0)
									}
									disabled={thresholdLoading}
								/>
							</div>
							<div className="space-y-2">
								<Label>Max Threshold (%)</Label>
								<Input
									type="number"
									min="0"
									max="100"
									value={maxThreshold}
									onChange={(e) =>
										setMaxThreshold(parseInt(e.target.value) || 0)
									}
									disabled={thresholdLoading}
								/>
							</div>
						</div>

						<Button
							onClick={handleThresholdUpdate}
							disabled={thresholdLoading}
							className="w-full"
						>
							{thresholdLoading ? "Updating..." : "Update Thresholds"}
						</Button>

						<div className="text-sm text-muted-foreground">
							{minThreshold === 0 && maxThreshold === 0 ? (
								<p>
									• Set minimum and maximum thresholds to enable automatic
									irrigation
								</p>
							) : (
								<>
									<p>
										• Irrigation starts when moisture drops below {minThreshold}
										%
									</p>
									<p>
										• Irrigation stops when moisture reaches {maxThreshold}%
									</p>
								</>
							)}
						</div>
					</div>
				)}

				{/* Status Display */}
				<div className="space-y-2">
					<Label>Status</Label>
					<div className="flex items-center space-x-2">
						<div
							className={`w-3 h-3 rounded-full ${
								valveOpen ? "bg-green-500" : "bg-gray-300"
							}`}
						/>
						<span>{valveOpen ? "Irrigating" : "Idle"}</span>
					</div>
				</div>
			</CardContent>
		</Card>
	);
}
