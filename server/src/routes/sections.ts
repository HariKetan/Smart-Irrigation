import express from "express";
import { prisma } from "../lib/prisma";
import { authenticateToken } from "../lib/auth";
import { validateFarmAccess } from "../lib/farmAccess";
import { mqttService } from "../services/MqttService";
import { broadcastSectionUpdate } from "../index";
import {
	APP_CONSTANTS,
	TIME_INTERVALS,
	IRRIGATION_MODES,
} from "../lib/constants";

const router = express.Router();

// Helper function to convert BigInt values to numbers for JSON serialization
function convertBigIntsToNumbers(obj: any): any {
	if (obj === null || obj === undefined) {
		return obj;
	}
	if (typeof obj === "bigint") {
		return Number(obj);
	}
	if (Array.isArray(obj)) {
		return obj.map(convertBigIntsToNumbers);
	}
	if (typeof obj === "object") {
		const converted: any = {};
		for (const [key, value] of Object.entries(obj)) {
			converted[key] = convertBigIntsToNumbers(value);
		}
		return converted;
	}
	return obj;
}

// Get all sections for a farm with real-time data
router.get(
	"/",
	authenticateToken,
	validateFarmAccess("query"),
	async (req, res) => {
		try {
			const farmId = req.farmId!;

			// Get sections for the specific farm
			const sections = await prisma.section.findMany({
				where: { farm_id: farmId },
				include: { farm: true },
				orderBy: { section_number: "asc" },
			});

			// Get latest moisture readings for each section
			const moistureReadings = await prisma.$queryRaw`
        SELECT 
          section_number::int as section_number,
          value::float as moisture
        FROM moisture_readings 
        WHERE farm_id = ${farmId}
        AND (section_number, timestamp) IN (
          SELECT section_number, MAX(timestamp) 
          FROM moisture_readings 
          WHERE farm_id = ${farmId}
          GROUP BY section_number
        )
      `;

			// Get water usage for each section (last 24 hours)
			const waterUsage = await prisma.$queryRaw`
        SELECT 
          section_number::int as section_number,
          COALESCE(SUM(water_ml) / 1000.0, 0)::float as waterUsed
        FROM irrigation_events 
        WHERE farm_id = ${farmId}
        AND start_time >= NOW() - INTERVAL '1 day'
        GROUP BY section_number
      `;

			// Get valve status for each section
			const valveStatus = await prisma.$queryRaw`
        SELECT 
          section_number::int as section_number,
          COALESCE(valve_on::boolean, false) as valveOpen
        FROM irrigation_device_status 
        WHERE farm_id = ${farmId}
        AND (section_number, timestamp) IN (
          SELECT section_number, MAX(timestamp) 
          FROM irrigation_device_status 
          WHERE farm_id = ${farmId}
          GROUP BY section_number
        )
      `;

			// Get last irrigation time for each section
			const lastIrrigation = await prisma.$queryRaw`
        SELECT 
          section_number::int as section_number,
          start_time as lastIrrigation
        FROM irrigation_events 
        WHERE farm_id = ${farmId}
        AND (section_number, start_time) IN (
          SELECT section_number, MAX(start_time) 
          FROM irrigation_events 
          WHERE farm_id = ${farmId}
          GROUP BY section_number
        )
      `;

			// Get device status for all sections
			const deviceStatuses = await prisma.irrigationDeviceStatus.findMany({
				where: {
					farm_id: farmId,
				},
				orderBy: { timestamp: "desc" },
				distinct: ["section_number"],
			});

			
			// Combine all data
			const sectionsWithData = sections.map((section: any) => {
				const moisture = (moistureReadings as any[]).find(
					(r) => r.section_number === section.section_number
				);
				const water = (waterUsage as any[]).find(
					(w) => w.section_number === section.section_number
				);
				const valve = (valveStatus as any[]).find(
					(v) => v.section_number === section.section_number
				);
				const irrigation = (lastIrrigation as any[]).find(
					(i) => i.section_number === section.section_number
				);

				// Get device status for this section
				const deviceStatus = deviceStatuses.find(
					(ds) => ds.section_number === section.section_number
				);

				let crop = "";
				let plantingDate = "";
	
				if (section.section_number === 1) {
					crop = "Arecanut";
					plantingDate = "19-07-2025";
				} else if (section.section_number === 2) {
					crop = "Arecanut";
					plantingDate = "20-07-2025";
				}
				else if (section.section_number === 3) {
					crop = "Arecanut";
					plantingDate = "21-07-2025";
				}
				else if (section.section_number === 4) {
					crop = "Arecanut";
					plantingDate = "22-07-2025";
				}
				else {
					crop = `Crop ${section.section_number}`;
					plantingDate = "Unknown Date";
				}

				return {
					id: section.id,
					farm_id: section.farm_id,
					section_number: section.section_number,
					name: section.name,
					crop: crop,
					plantingDate: plantingDate,
					minThreshold: deviceStatus
						? Number(deviceStatus.min_threshold)
						: undefined,
					maxThreshold: deviceStatus
						? Number(deviceStatus.max_threshold)
						: undefined,
					area: 2500,
					location: `Zone ${section.section_number}`,
					farm: section.farm,
					moisture: moisture ? Math.round(moisture.moisture) : 0,
					waterUsed: water ? Math.round(water.waterUsed) : 0,
					valveOpen: deviceStatus ? Boolean(deviceStatus.valve_on) : false,
					mode: deviceStatus ? deviceStatus.mode : "manual",
					lastIrrigation: irrigation
						? irrigation.lastIrrigation
						: new Date(Date.now() - TIME_INTERVALS.DAY).toISOString(),
					nextIrrigation: new Date(
						Date.now() + TIME_INTERVALS.DAY
					).toISOString(),
				};
			});

			res.json(sectionsWithData);
		} catch (error) {
			console.error("Error fetching sections:", error);
			res.status(500).json({ error: "Failed to fetch sections" });
		}
	}
);

// Get specific section by farm_id and section_number (with farm ID in URL)
router.get(
	"/:farmId/:sectionNumber",
	authenticateToken,
	validateFarmAccess("params"),
	async (req, res) => {
		try {
			const { farmId, sectionNumber } = req.params;
			const farmIdInt = parseInt(farmId);
			const sectionNumberInt = parseInt(sectionNumber);

			// Verify the user has access to this farm
			if (req.farmId !== farmIdInt) {
				return res.status(403).json({ error: "Access denied to this farm" });
			}

			// Get section using farm_id and section_number
			const section = await prisma.section.findFirst({
				where: {
					farm_id: farmIdInt,
					section_number: sectionNumberInt,
				},
				include: { farm: true },
			});

			if (!section) {
				return res.status(404).json({ error: "Section not found" });
			}

			// Get latest moisture reading
			let moisture = 0;
			try {
				const moistureReading = await prisma.moistureReading.findFirst({
					where: {
						farm_id: farmIdInt,
						section_number: sectionNumberInt,
					},
					orderBy: { timestamp: "desc" },
				});
				if (moistureReading) {
					moisture = Math.round(moistureReading.value);
				}
			} catch (error) {
				console.error("Error fetching moisture:", error);
			}

			// Get water usage for today
			let waterUsed = 0;
			try {
				const waterUsage = await prisma.irrigationEvent.aggregate({
					where: {
						farm_id: farmIdInt,
						section_number: sectionNumberInt,
						start_time: {
							gte: new Date(Date.now() - TIME_INTERVALS.DAY),
						},
					},
					_sum: {
						water_ml: true,
					},
				});
				waterUsed = waterUsage._sum.water_ml
					? Math.round(waterUsage._sum.water_ml / 1000)
					: 0;
			} catch (error) {
				console.error("Error fetching water usage:", error);
			}

			// Get valve status
			let valveOpen = false;
			try {
				const valveStatus = await prisma.irrigationDeviceStatus.findFirst({
					where: {
						farm_id: farmIdInt,
						section_number: sectionNumberInt,
					},
					orderBy: { createdAt: "desc" },
				});
				valveOpen = Boolean(valveStatus?.valve_on);
			} catch (error) {
				console.error("Error fetching valve status:", error);
			}

			// Get last irrigation time
			let lastIrrigation = new Date(
				Date.now() - TIME_INTERVALS.DAY
			).toISOString();
			try {
				const lastEvent = await prisma.irrigationEvent.findFirst({
					where: {
						farm_id: farmIdInt,
						section_number: sectionNumberInt,
					},
					orderBy: { start_time: "desc" },
				});
				if (lastEvent) {
					lastIrrigation = lastEvent.start_time.toISOString();
				}
			} catch (error) {
				console.error("Error fetching last irrigation:", error);
			}

			// Get device status for mode and threshold
			let mode = "manual";
			let minThreshold: number | undefined = undefined;
			let maxThreshold: number | undefined = undefined;
			let deviceId = "";
			let mqtt = false;
			let wifi = false;
			let uptime = 0;
			let lastError = "";
			let valveOn = 0;
			let latestMoisture = 0;
			let reportingInterval = 60;

			try {
				const deviceStatus = await prisma.irrigationDeviceStatus.findFirst({
					where: {
						farm_id: farmIdInt,
						section_number: sectionNumberInt,
					},
					orderBy: { createdAt: "desc" },
				});
				if (deviceStatus) {
					mode = deviceStatus.mode || "manual";
					minThreshold = Number(deviceStatus.min_threshold);
					maxThreshold = Number(deviceStatus.max_threshold);
					deviceId = deviceStatus.device_id || "";
					mqtt = Boolean(deviceStatus.mqtt);
					wifi = Boolean(deviceStatus.wifi);
					uptime = Math.floor(Number(deviceStatus.uptime) / 1000) || 0; // Convert milliseconds to seconds
					lastError = deviceStatus.last_error || "";
					valveOn = Number(deviceStatus.valve_on) || 0;
					latestMoisture = Number(deviceStatus.latest_moisture) || 0;
					// Note: reporting_interval is not in IrrigationDeviceStatus model
					// It comes from MoistureDeviceStatus for moisture sensors
				}
			} catch (error) {
				console.error("Error fetching device status:", error);
			}

			// Also check for moisture device status to get reporting_interval
			try {
				const moistureDeviceStatus =
					await prisma.moistureDeviceStatus.findFirst({
						where: {
							farm_id: farmIdInt,
							section_number: sectionNumberInt,
						},
						orderBy: { createdAt: "desc" },
					});
				if (moistureDeviceStatus) {
					reportingInterval =
						Number(moistureDeviceStatus.reporting_interval) || 60;
					// If we don't have irrigation device data, use moisture device data for basic info
					if (!deviceId) {
						deviceId = moistureDeviceStatus.device_id || "";
						mqtt = Boolean(moistureDeviceStatus.mqtt);
						wifi = Boolean(moistureDeviceStatus.wifi);
						uptime =
							Math.floor(Number(moistureDeviceStatus.uptime) / 1000) || 0; // Convert milliseconds to seconds
						lastError = moistureDeviceStatus.last_error || "";
					}
				}
			} catch (error) {
				console.error("Error fetching moisture device status:", error);
			}

			let crop = "";
			let plantingDate = "";

			if (section.section_number === 1) {
				crop = "Arecanut";
				plantingDate = "19-07-2025";
			} else if (section.section_number === 2) {
				crop = "Arecanut";
				plantingDate = "20-07-2025";
			} else if (section.section_number === 3) {
				crop = "Arecanut";
				plantingDate = "21-07-2025";
			} else if (section.section_number === 4) {
				crop = "Arecanut";
				plantingDate = "22-07-2025";
			}
			else {	
				crop = `Crop ${section.section_number}`;
				plantingDate = "Unknown Date";
			}

			// Combine all data
			const sectionWithData = {
				id: section.id,
				farm_id: section.farm_id,
				section_number: section.section_number,
				name: section.name,
				// crop: `Crop ${section.section_number}`,
				crop: crop,
				plantingDate: plantingDate,
				moisture: moisture,
				minThreshold: minThreshold,
				maxThreshold: maxThreshold,
				waterUsed: waterUsed,
				valveOpen: valveOpen,
				lastIrrigation: lastIrrigation,
				nextIrrigation: new Date(Date.now() + TIME_INTERVALS.DAY).toISOString(),
				area: 2500,
				location: `Zone ${section.section_number}`,
				mode: mode,
				farm: section.farm,
				deviceStatus: {
					device_id: deviceId,
					mqtt: mqtt,
					wifi: wifi,
					uptime: uptime,
					last_error: lastError,
					mode: mode,
					valve_on: valveOn,
					latest_moisture: latestMoisture,
					min_threshold: minThreshold,
					max_threshold: maxThreshold,
					reporting_interval: reportingInterval,
				},
			};

			res.json(sectionWithData);
		} catch (error) {
			console.error("Error fetching section:", error);
			res.status(500).json({ error: "Failed to fetch section" });
		}
	}
);

// Toggle valve for a section
router.post(
	"/:farmId/:sectionNumber/valve",
	authenticateToken,
	validateFarmAccess("params"),
	async (req, res) => {
		try {
			const { farmId, sectionNumber } = req.params;
			const {
				valveOpen,
				duration = APP_CONSTANTS.DEFAULT_IRRIGATION_DURATION,
			} = req.body;
			const farmIdInt = parseInt(farmId);
			const sectionNumberInt = parseInt(sectionNumber);

			// Verify the user has access to this farm
			if (req.farmId !== farmIdInt) {
				return res.status(403).json({ error: "Access denied to this farm" });
			}

			console.log(
				`🚰 Toggling valve for Farm ${farmIdInt}, Section ${sectionNumberInt}, Valve: ${valveOpen}, Duration: ${duration}s`
			);

			// Validate section exists
			const section = await prisma.section.findFirst({
				where: {
					farm_id: farmIdInt,
					section_number: sectionNumberInt,
				},
			});

			if (!section) {
				return res.status(404).json({ error: "Section not found" });
			}

			// Validate duration
			if (duration <= 0 || duration > APP_CONSTANTS.MAX_IRRIGATION_DURATION) {
				return res.status(400).json({
					error: `Duration must be between 1 and ${APP_CONSTANTS.MAX_IRRIGATION_DURATION} seconds`,
				});
			}

			try {
				if (valveOpen) {
					await mqttService.sendIrrigationCommand(
						farmIdInt,
						sectionNumberInt,
						duration
					);
				} else {
					await mqttService.sendStopCommand(farmIdInt, sectionNumberInt);
				}

				res.json({
					success: true,
					valveOpen: valveOpen,
					duration: duration,
					message: `Valve ${
						valveOpen ? "opened" : "closed"
					} for farm ${farmIdInt}, section ${sectionNumberInt}`,
				});

				// Broadcast real-time update
				broadcastSectionUpdate(farmIdInt, sectionNumberInt, {
					valve_open: valveOpen,
					duration: duration,
				});
			} catch (error) {
				console.error("Error sending MQTT command:", error);
				res.status(500).json({
					error: "Failed to send command to device",
					details: error instanceof Error ? error.message : "Unknown error",
				});
			}
		} catch (error) {
			console.error("Error toggling valve:", error);
			res.status(500).json({ error: "Failed to toggle valve" });
		}
	}
);

// Stop irrigation
router.post(
	"/:farmId/:sectionNumber/stop",
	authenticateToken,
	validateFarmAccess("params"),
	async (req, res) => {
		try {
			const { farmId, sectionNumber } = req.params;
			const farmIdInt = parseInt(farmId);
			const sectionNumberInt = parseInt(sectionNumber);

			// Verify the user has access to this farm
			if (req.farmId !== farmIdInt) {
				return res.status(403).json({ error: "Access denied to this farm" });
			}

			// Validate section exists
			const section = await prisma.section.findFirst({
				where: {
					farm_id: farmIdInt,
					section_number: sectionNumberInt,
				},
			});

			if (!section) {
				return res.status(404).json({ error: "Section not found" });
			}

			try {
				await mqttService.sendStopCommand(farmIdInt, sectionNumberInt);

				console.log(
					`✅ Irrigation stopped successfully for farm ${farmIdInt}, section ${sectionNumberInt}`
				);

				res.json({
					success: true,
					message: `Stopped irrigation on farm ${farmIdInt}, section ${sectionNumberInt}`,
				});

				// Broadcast real-time update
				broadcastSectionUpdate(farmIdInt, sectionNumberInt, {
					valve_open: false,
					mode: "manual",
				});
			} catch (error) {
				console.error("❌ Error sending stop command:", error);
				res.status(500).json({
					error: "Failed to send stop command to device",
					details: error instanceof Error ? error.message : "Unknown error",
				});
			}
		} catch (error) {
			console.error("Error stopping irrigation:", error);
			res.status(500).json({ error: "Failed to stop irrigation" });
		}
	}
);

// Set irrigation mode for a section
router.post(
	"/:farmId/:sectionNumber/mode",
	authenticateToken,
	validateFarmAccess("params"),
	async (req, res) => {
		try {
			const { farmId, sectionNumber } = req.params;
			const { mode } = req.body;
			const farmIdInt = parseInt(farmId);
			const sectionNumberInt = parseInt(sectionNumber);

			// Verify the user has access to this farm
			if (req.farmId !== farmIdInt) {
				return res.status(403).json({ error: "Access denied to this farm" });
			}

			if (!["auto", "manual"].includes(mode)) {
				return res
					.status(400)
					.json({ error: 'Invalid mode. Must be "auto" or "manual"' });
			}

			// Get section using farm_id and section_number
			const section = await prisma.section.findFirst({
				where: {
					farm_id: farmIdInt,
					section_number: sectionNumberInt,
				},
			});

			if (!section) {
				return res.status(404).json({ error: "Section not found" });
			}

			try {
				await mqttService.sendModeCommand(farmIdInt, sectionNumberInt, mode);

				res.json({
					success: true,
					mode: mode,
					message: `Mode set to ${mode} for farm ${farmIdInt}, section ${sectionNumberInt}`,
				});

				// Broadcast real-time update
				broadcastSectionUpdate(farmIdInt, sectionNumberInt, {
					mode: mode,
					valve_open: false,
				});
			} catch (error) {
				console.error("Error sending MQTT command:", error);
				res.status(500).json({
					error: "Failed to send command to device",
					details: error instanceof Error ? error.message : "Unknown error",
				});
			}
		} catch (error) {
			console.error("Error setting mode:", error);
			res.status(500).json({ error: "Failed to set mode" });
		}
	}
);

// Start irrigation
router.post(
	"/:farmId/:sectionNumber/irrigate",
	authenticateToken,
	validateFarmAccess("params"),
	async (req, res) => {
		try {
			const { farmId, sectionNumber } = req.params;
			const { duration = APP_CONSTANTS.DEFAULT_IRRIGATION_DURATION } = req.body;
			const farmIdInt = parseInt(farmId);
			const sectionNumberInt = parseInt(sectionNumber);

			// Verify the user has access to this farm
			if (req.farmId !== farmIdInt) {
				return res.status(403).json({ error: "Access denied to this farm" });
			}

			console.log(
				`🚰 Starting irrigation for Farm ${farmIdInt}, Section ${sectionNumberInt}, Duration: ${duration}s`
			);

			// Validate section exists
			const section = await prisma.section.findFirst({
				where: {
					farm_id: farmIdInt,
					section_number: sectionNumberInt,
				},
			});

			if (!section) {
				return res.status(404).json({ error: "Section not found" });
			}

			// Validate duration
			if (duration <= 0 || duration > APP_CONSTANTS.MAX_IRRIGATION_DURATION) {
				return res.status(400).json({
					error: `Duration must be between 1 and ${APP_CONSTANTS.MAX_IRRIGATION_DURATION} seconds`,
				});
			}

			// First set mode to manual (required for irrigation commands)
			await mqttService.sendModeCommand(farmIdInt, sectionNumberInt, "manual");

			// Wait a moment for mode change to take effect
			await new Promise((resolve) => setTimeout(resolve, 500));

			// Send irrigation command
			await mqttService.sendIrrigationCommand(
				farmIdInt,
				sectionNumberInt,
				duration
			);

			// Broadcast update
			broadcastSectionUpdate(farmIdInt, sectionNumberInt, {
				valve_open: true,
				mode: "manual",
				irrigation_duration: duration,
				type: "irrigation_start",
			});

			res.json({
				success: true,
				message: `Irrigation started for farm ${farmIdInt}, section ${sectionNumberInt} for ${duration} seconds`,
				duration: duration,
			});
		} catch (error) {
			console.error("❌ Error starting irrigation:", error);
			res.status(500).json({ error: "Failed to start irrigation" });
		}
	}
);

// Update section configuration
router.put(
	"/:farmId/:sectionNumber/config",
	authenticateToken,
	validateFarmAccess("params"),
	async (req, res) => {
		try {
			const { farmId, sectionNumber } = req.params;
			const {
				min_threshold,
				max_threshold,
				enable_deep_sleep,
				deep_sleep_duration,
				reporting_interval,
			} = req.body;
			const farmIdInt = parseInt(farmId);
			const sectionNumberInt = parseInt(sectionNumber);

			// Verify the user has access to this farm
			if (req.farmId !== farmIdInt) {
				return res.status(403).json({ error: "Access denied to this farm" });
			}

			console.log(
				`🔧 Updating config for Farm ${farmIdInt}, Section ${sectionNumberInt}:`,
				req.body
			);

			// Validate section exists
			const section = await prisma.section.findFirst({
				where: {
					farm_id: farmIdInt,
					section_number: sectionNumberInt,
				},
			});

			if (!section) {
				return res.status(404).json({ error: "Section not found" });
			}

			// Prepare MQTT config command
			const configCommand: any = {
				timestamp: new Date().toISOString(),
			};

			// Add config parameters if provided
			if (min_threshold !== undefined)
				configCommand.min_threshold = min_threshold;
			if (max_threshold !== undefined)
				configCommand.max_threshold = max_threshold;
			if (enable_deep_sleep !== undefined)
				configCommand.enable_deep_sleep = enable_deep_sleep;
			if (deep_sleep_duration !== undefined)
				configCommand.deep_sleep_duration = deep_sleep_duration;
			if (reporting_interval !== undefined)
				configCommand.reporting_interval = reporting_interval;

			// Send config command via MQTT
			await mqttService.sendConfigCommand(
				farmIdInt,
				sectionNumberInt,
				configCommand
			);

			// Broadcast update
			broadcastSectionUpdate(farmIdInt, sectionNumberInt, {
				type: "config_update",
				config: configCommand,
			});

			res.json({
				success: true,
				message: `Configuration updated for farm ${farmIdInt}, section ${sectionNumberInt}`,
				config: configCommand,
			});
		} catch (error) {
			console.error("❌ Error updating config:", error);
			res.status(500).json({ error: "Failed to update configuration" });
		}
	}
);

// Get moisture readings for a specific section
router.get(
	"/:farmId/:sectionNumber/readings",
	authenticateToken,
	validateFarmAccess("params"),
	async (req, res) => {
		try {
			const { farmId, sectionNumber } = req.params;
			const farmIdInt = parseInt(farmId);
			const sectionNumberInt = parseInt(sectionNumber);

			// Verify the user has access to this farm
			if (req.farmId !== farmIdInt) {
				return res.status(403).json({ error: "Access denied to this farm" });
			}

			// Get section using farm_id and section_number
			const section = await prisma.section.findFirst({
				where: {
					farm_id: farmIdInt,
					section_number: sectionNumberInt,
				},
			});

			if (!section) {
				return res.status(404).json({ error: "Section not found" });
			}

			const readings = await prisma.moistureReading.findMany({
				where: {
					farm_id: farmIdInt,
					section_number: sectionNumberInt,
				},
				orderBy: { timestamp: "desc" },
				take: 50,
			});

			res.json(readings);
		} catch (error) {
			console.error("Error fetching readings:", error);
			res.status(500).json({ error: "Failed to fetch readings" });
		}
	}
);

// Get device status for a specific section
router.get(
	"/:farmId/:sectionNumber/device-status",
	authenticateToken,
	validateFarmAccess("params"),
	async (req, res) => {
		try {
			const { farmId, sectionNumber } = req.params;
			const farmIdInt = parseInt(farmId);
			const sectionNumberInt = parseInt(sectionNumber);

			// Verify the user has access to this farm
			if (req.farmId !== farmIdInt) {
				return res.status(403).json({ error: "Access denied to this farm" });
			}

			// Get section using farm_id and section_number
			const section = await prisma.section.findFirst({
				where: {
					farm_id: farmIdInt,
					section_number: sectionNumberInt,
				},
			});

			if (!section) {
				return res.status(404).json({ error: "Section not found" });
			}

			// Get latest moisture device status
			const moistureStatus = await prisma.moistureDeviceStatus.findFirst({
				where: {
					farm_id: farmIdInt,
					section_number: sectionNumberInt,
				},
				orderBy: { createdAt: "desc" },
			});

			// Get latest irrigation device status
			const irrigationStatus = await prisma.irrigationDeviceStatus.findFirst({
				where: {
					farm_id: farmIdInt,
					section_number: sectionNumberInt,
				},
				orderBy: { createdAt: "desc" },
			});

			// Combine the statuses, prioritizing irrigation status if both exist
			const deviceStatus = irrigationStatus || moistureStatus;

			if (!deviceStatus) {
				return res
					.status(404)
					.json({ error: "No device status found for this section" });
			}

			// Convert BigInt values to numbers
			const convertedStatus = convertBigIntsToNumbers(deviceStatus);

			res.json(convertedStatus);
		} catch (error) {
			console.error("Error fetching device status:", error);
			res.status(500).json({ error: "Failed to fetch device status" });
		}
	}
);

export default router;
