"use client";

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

interface DeviceStatusProps {
	data: DeviceStatusData | null;
}

export function DeviceStatus({ data }: DeviceStatusProps) {
	if (!data) {
		return (
			<div className="text-center text-gray-500 py-4">
				<p>No device status available</p>
			</div>
		);
	}

	// Check if device is offline (no recent data)
	const isDeviceOffline = !data.wifi && !data.mqtt && data.uptime === 0;

	// Check if device has no ID (no device data at all)
	const hasNoDeviceData = !data.device_id || data.device_id === "";

	if (hasNoDeviceData) {
		return (
			<div className="text-center text-gray-500 py-4">
				<p>No device data available</p>
			</div>
		);
	}

	const formatUptime = (uptime: number) => {
		// Handle invalid uptime values
		if (!uptime || isNaN(uptime) || uptime < 0) {
			return "0h 0m";
		}

		const hours = Math.floor(uptime / 3600);
		const minutes = Math.floor((uptime % 3600) / 60);
		return `${hours}h ${minutes}m`;
	};

	const getStatusColor = (status: boolean) => {
		return status ? "text-green-600" : "text-red-600";
	};

	const getStatusIcon = (status: boolean) => {
		return status ? (
			<div className="w-2 h-2 bg-green-500 rounded-full"></div>
		) : (
			<div className="w-2 h-2 bg-red-500 rounded-full"></div>
		);
	};

	// Show offline message if device is not connected
	if (isDeviceOffline) {
		return (
			<div className="space-y-4">
				{/* Device ID - Full Width */}
				<div className="flex items-center justify-between">
					<span className="text-sm font-medium text-gray-700">Device ID</span>
					<span className="text-sm text-gray-600 font-mono">
						{data.device_id}
					</span>
				</div>

				{/* Offline Status */}
				<div className="p-4 bg-yellow-50 border border-yellow-200 rounded">
					<div className="flex items-center gap-2">
						<div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
						<div>
							<span className="text-sm font-medium text-yellow-800">
								Device Offline
							</span>
							<p className="text-sm text-yellow-700 mt-1">
								{data.last_error || "No recent data from device"}
							</p>
						</div>
					</div>
				</div>

				{/* Default Values Grid */}
				<div className="grid grid-cols-3 gap-3">
					<div className="flex flex-col items-center justify-center p-2 bg-gray-50 rounded">
						<span className="text-sm font-medium text-gray-700 mb-1">
							{data.min_threshold || 30}%
						</span>
						<span className="text-xs text-gray-600">Min</span>
					</div>
					<div className="flex flex-col items-center justify-center p-2 bg-gray-50 rounded">
						<span className="text-sm font-medium text-gray-700 mb-1">
							{data.max_threshold || 70}%
						</span>
						<span className="text-xs text-gray-600">Max</span>
					</div>
					<div className="flex flex-col items-center justify-center p-2 bg-gray-50 rounded">
						<span className="text-sm font-medium text-gray-700 mb-1">
							{data.reporting_interval || 60}s
						</span>
						<span className="text-xs text-gray-600">Interval</span>
					</div>
				</div>
			</div>
		);
	}

	return (
		<div className="space-y-4">
			{/* Device ID - Full Width */}
			<div className="flex items-center justify-between">
				<span className="text-sm font-medium text-gray-700">Device ID</span>
				<span className="text-sm text-gray-600 font-mono">
					{data.device_id}
				</span>
			</div>

			{/* Connection Status - 3 Grid */}
			<div className="grid grid-cols-3 gap-3">
				<div className="flex flex-col items-center justify-center p-2 bg-gray-50 rounded">
					<div className="flex items-center gap-2 mb-1">
						{getStatusIcon(data.wifi)}
						<span className={`text-xs ${getStatusColor(data.wifi)}`}>
							{data.wifi ? "Connected" : "Offline"}
						</span>
					</div>
					<span className="text-xs text-gray-600">WiFi</span>
				</div>
				<div className="flex flex-col items-center justify-center p-2 bg-gray-50 rounded">
					<div className="flex items-center gap-2 mb-1">
						{getStatusIcon(data.mqtt)}
						<span className={`text-xs ${getStatusColor(data.mqtt)}`}>
							{data.mqtt ? "Connected" : "Offline"}
						</span>
					</div>
					<span className="text-xs text-gray-600">MQTT</span>
				</div>
				<div className="flex flex-col items-center justify-center p-2 bg-gray-50 rounded">
					<span className="text-sm font-medium text-gray-700 mb-1">
						{formatUptime(data.uptime)}
					</span>
					<span className="text-xs text-gray-600">Uptime</span>
				</div>
			</div>

			{/* Irrigation Controller Specific Data - 3 Grid */}
			{data.mode && (
				<div className="grid grid-cols-3 gap-3">
					<div className="flex flex-col items-center justify-center p-2 bg-gray-50 rounded">
						<span
							className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium mb-1 ${
								data.mode === "auto"
									? "bg-green-100 text-green-800"
									: "bg-blue-100 text-blue-800"
							}`}
						>
							{data.mode.charAt(0).toUpperCase() + data.mode.slice(1)}
						</span>
						<span className="text-xs text-gray-600">Mode</span>
					</div>

					<div className="flex flex-col items-center justify-center p-2 bg-gray-50 rounded">
						<span
							className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium mb-1 ${
								data.valve_on
									? "bg-red-100 text-red-800"
									: "bg-gray-100 text-gray-800"
							}`}
						>
							{data.valve_on ? "Open" : "Closed"}
						</span>
						<span className="text-xs text-gray-600">Valve</span>
					</div>

					{data.latest_moisture !== undefined ? (
						<div className="flex flex-col items-center justify-center p-2 bg-gray-50 rounded">
							<span className="text-sm font-medium text-gray-700 mb-1">
								{data.latest_moisture}%
							</span>
							<span className="text-xs text-gray-600">Moisture</span>
						</div>
					) : (
						<div className="flex flex-col items-center justify-center p-2 bg-gray-50 rounded">
							<span className="text-sm font-medium text-gray-700 mb-1">-</span>
							<span className="text-xs text-gray-600">Moisture</span>
						</div>
					)}
				</div>
			)}

			{/* Thresholds and Reporting - 3 Grid */}
			<div className="grid grid-cols-3 gap-3">
				{data.min_threshold !== undefined &&
				data.max_threshold !== undefined ? (
					<div className="flex flex-col items-center justify-center p-2 bg-gray-50 rounded">
						<span className="text-sm font-medium text-gray-700 mb-1">
							{data.min_threshold}%
						</span>
						<span className="text-xs text-gray-600">Min</span>
					</div>
				) : (
					<div className="flex flex-col items-center justify-center p-2 bg-gray-50 rounded">
						<span className="text-sm font-medium text-gray-700 mb-1">-</span>
						<span className="text-xs text-gray-600">Min</span>
					</div>
				)}

				{data.min_threshold !== undefined &&
				data.max_threshold !== undefined ? (
					<div className="flex flex-col items-center justify-center p-2 bg-gray-50 rounded">
						<span className="text-sm font-medium text-gray-700 mb-1">
							{data.max_threshold}%
						</span>
						<span className="text-xs text-gray-600">Max</span>
					</div>
				) : (
					<div className="flex flex-col items-center justify-center p-2 bg-gray-50 rounded">
						<span className="text-sm font-medium text-gray-700 mb-1">-</span>
						<span className="text-xs text-gray-600">Max</span>
					</div>
				)}

				{data.reporting_interval ? (
					<div className="flex flex-col items-center justify-center p-2 bg-gray-50 rounded">
						<span className="text-sm font-medium text-gray-700 mb-1">
							{data.reporting_interval}s
						</span>
						<span className="text-xs text-gray-600">Interval</span>
					</div>
				) : (
					<div className="flex flex-col items-center justify-center p-2 bg-gray-50 rounded">
						<span className="text-sm font-medium text-gray-700 mb-1">-</span>
						<span className="text-xs text-gray-600">Interval</span>
					</div>
				)}
			</div>

			{/* Last Error - Full Width */}
			{data.last_error && data.last_error !== "" && (
				<div className="p-2 bg-red-50 border border-red-200 rounded">
					<div className="flex items-start gap-2">
						<div className="w-2 h-2 bg-red-500 rounded-full mt-1.5 flex-shrink-0"></div>
						<div>
							<span className="text-xs font-medium text-red-800">
								Last Error
							</span>
							<p className="text-xs text-red-700 mt-1">{data.last_error}</p>
						</div>
					</div>
				</div>
			)}
		</div>
	);
}
