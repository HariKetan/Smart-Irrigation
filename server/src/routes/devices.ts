import express from "express";
import { prisma } from "../lib/prisma";
import { authenticateToken } from "../lib/auth";
import { validateFarmAccess } from "../lib/farmAccess";
import { mqttService } from "../services/MqttService";
import { broadcastSectionUpdate } from "../index";
import { APP_CONSTANTS, IRRIGATION_MODES } from "../lib/constants";

const router = express.Router();

// Helper function to convert BigInt values to numbers for JSON serialization
function convertBigIntsToNumbers(obj: any): any {
	if (obj === null || obj === undefined) {
		return obj;
	}
	if (typeof obj === "bigint") {
		return Number(obj);
	}
	if (obj instanceof Date) {
		return obj.toISOString();
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

// Get device status for irrigation controllers
router.get(
	"/irrigation/status",
	authenticateToken,
	validateFarmAccess("query"),
	async (req, res) => {
		try {
			const { farm_id, section_number } = req.query;

			const where: any = {};

			if (farm_id) {
				where.farm_id = parseInt(farm_id as string);
			}

			if (section_number) {
				where.section_number = parseInt(section_number as string);
			}

			const deviceStatus = await prisma.irrigationDeviceStatus.findMany({
				where,
				include: {
					farm: true,
					section: true,
				},
				orderBy: { createdAt: "desc" },
			});

			// Convert BigInt values to numbers for JSON serialization
			const convertedDeviceStatus = convertBigIntsToNumbers(deviceStatus);

			res.json(convertedDeviceStatus);
		} catch (error) {
			console.error("Error fetching irrigation device status:", error);
			res
				.status(500)
				.json({ error: "Failed to fetch irrigation device status" });
		}
	}
);

// Get device status for moisture sensors
router.get(
	"/moisture/status",
	authenticateToken,
	validateFarmAccess("query"),
	async (req, res) => {
		try {
			const { farm_id, section_number } = req.query;

			const where: any = {};

			if (farm_id) {
				where.farm_id = parseInt(farm_id as string);
			}

			if (section_number) {
				where.section_number = parseInt(section_number as string);
			}

			const deviceStatus = await prisma.moistureDeviceStatus.findMany({
				where,
				include: {
					farm: true,
					section: true,
				},
				orderBy: { createdAt: "desc" },
			});

			// Convert BigInt values to numbers for JSON serialization
			const convertedDeviceStatus = convertBigIntsToNumbers(deviceStatus);

			res.json(convertedDeviceStatus);
		} catch (error) {
			console.error("Error fetching moisture device status:", error);
			res.status(500).json({ error: "Failed to fetch moisture device status" });
		}
	}
);

// Get device acknowledgments
router.get("/acks", async (req, res) => {
	try {
		const { farm_id, section_number, device_id } = req.query;

		const where: any = {};

		if (farm_id) {
			where.farm_id = parseInt(farm_id as string);
		}

		if (section_number) {
			where.section_number = parseInt(section_number as string);
		}

		if (device_id) {
			where.device_id = device_id as string;
		}

		const deviceAcks = await prisma.deviceAck.findMany({
			where,
			include: {
				farm: true,
				section: true,
			},
			orderBy: { timestamp: "desc" },
		});

		res.json(deviceAcks);
	} catch (error) {
		console.error("Error fetching device acknowledgments:", error);
		res.status(500).json({ error: "Failed to fetch device acknowledgments" });
	}
});

// Get MQTT connection status
router.get("/mqtt-status", async (req, res) => {
	try {
		const status = mqttService.getConnectionStatus();
		res.json({
			connected: status.connected,
			reconnectAttempts: status.reconnectAttempts,
			timestamp: new Date().toISOString(),
		});
	} catch (error) {
		console.error("Error fetching MQTT status:", error);
		res.status(500).json({ error: "Failed to fetch MQTT status" });
	}
});

// Get moisture readings count
router.get("/moisture-readings-count", async (req, res) => {
	try {
		const { farm_id } = req.query;

		const where: any = {};

		if (farm_id) {
			where.farm_id = parseInt(farm_id as string);
		}

		const count = await prisma.moistureReading.count({ where });
		const latestReading = await prisma.moistureReading.findFirst({
			where,
			orderBy: { timestamp: "desc" },
		});

		res.json({
			total_readings: count,
			latest_reading: latestReading
				? {
						farm_id: latestReading.farm_id,
						section_number: latestReading.section_number,
						value: latestReading.value,
						timestamp: latestReading.timestamp,
				  }
				: null,
			timestamp: new Date().toISOString(),
		});
	} catch (error) {
		console.error("Error fetching moisture readings count:", error);
		res.status(500).json({ error: "Failed to fetch moisture readings count" });
	}
});

// Bulk irrigation operations
router.post(
	"/bulk/irrigate",
	authenticateToken,
	validateFarmAccess("body"),
	async (req, res) => {
		try {
			const { sections, duration = APP_CONSTANTS.DEFAULT_IRRIGATION_DURATION } =
				req.body; // sections: [{sectionNumber}]
			const farmId = req.farmId!; // User must be authenticated and have farm access

			if (!Array.isArray(sections) || sections.length === 0) {
				return res
					.status(400)
					.json({ error: "sections must be a non-empty array" });
			}

			// Validate section numbers
			for (const section of sections) {
				if (
					!section.sectionNumber ||
					typeof section.sectionNumber !== "number" ||
					section.sectionNumber < 1
				) {
					return res.status(400).json({
						error:
							"Each section must have a valid sectionNumber (positive integer)",
					});
				}
			}

			if (duration <= 0 || duration > APP_CONSTANTS.MAX_IRRIGATION_DURATION) {
				return res.status(400).json({
					error: `Duration must be between 1 and ${APP_CONSTANTS.MAX_IRRIGATION_DURATION} seconds`,
				});
			}

			const results: any[] = [];
			const errors: any[] = [];

			// Process each section concurrently
			const promises = sections.map(async (section: any) => {
				try {
					const { sectionNumber } = section;

					// Set mode to manual first
					await mqttService.sendModeCommand(farmId, sectionNumber, "manual");

					// Wait a moment for mode change
					await new Promise((resolve) => setTimeout(resolve, 500));

					// Send irrigation command
					await mqttService.sendIrrigationCommand(
						farmId,
						sectionNumber,
						duration
					);

					return {
						farmId: farmId,
						sectionNumber,
						success: true,
						message: `Started irrigation for ${duration} seconds`,
					};
				} catch (error) {
					return {
						farmId: farmId,
						sectionNumber: section.sectionNumber,
						success: false,
						error: error instanceof Error ? error.message : "Unknown error",
					};
				}
			});

			const sectionResults = await Promise.all(promises);

			// Separate successes and errors
			sectionResults.forEach((result) => {
				if (result.success) {
					results.push(result);
				} else {
					errors.push(result);
				}
			});

			console.log(
				`✅ Bulk irrigation completed: ${results.length} successful, ${errors.length} failed`
			);

			res.json({
				success: true,
				message: `Bulk irrigation operation completed`,
				summary: {
					total: sections.length,
					successful: results.length,
					failed: errors.length,
				},
				results,
				errors,
			});

			// Broadcast updates for successful operations
			results.forEach((result) => {
				broadcastSectionUpdate(result.farmId, result.sectionNumber, {
					valve_open: true,
					mode: "manual",
					irrigation_duration: duration,
				});
			});
		} catch (error) {
			console.error("❌ Error in bulk irrigation:", error);
			res.status(500).json({ error: "Failed to execute bulk irrigation" });
		}
	}
);

// Bulk stop irrigation operations
router.post(
	"/bulk/stop",
	authenticateToken,
	validateFarmAccess("body"),
	async (req, res) => {
		try {
			const { sections } = req.body; // sections: [{sectionNumber}]
			const farmId = req.farmId!;

			if (!Array.isArray(sections) || sections.length === 0) {
				return res
					.status(400)
					.json({ error: "sections must be a non-empty array" });
			}

			// Validate section numbers
			for (const section of sections) {
				if (
					!section.sectionNumber ||
					typeof section.sectionNumber !== "number" ||
					section.sectionNumber < 1
				) {
					return res.status(400).json({
						error:
							"Each section must have a valid sectionNumber (positive integer)",
					});
				}
			}

			const results: any[] = [];
			const errors: any[] = [];

			// Process each section concurrently
			const promises = sections.map(async (section: any) => {
				try {
					const { sectionNumber } = section;

					// Send stop command
					await mqttService.sendStopCommand(farmId, sectionNumber);

					return {
						farmId: farmId,
						sectionNumber,
						success: true,
						message: `Stopped irrigation`,
					};
				} catch (error) {
					return {
						farmId: farmId,
						sectionNumber: section.sectionNumber,
						success: false,
						error: error instanceof Error ? error.message : "Unknown error",
					};
				}
			});

			const sectionResults = await Promise.all(promises);

			// Separate successes and errors
			sectionResults.forEach((result) => {
				if (result.success) {
					results.push(result);
				} else {
					errors.push(result);
				}
			});

			console.log(
				`✅ Bulk stop irrigation completed: ${results.length} successful, ${errors.length} failed`
			);

			res.json({
				success: true,
				message: `Bulk stop irrigation operation completed`,
				summary: {
					total: sections.length,
					successful: results.length,
					failed: errors.length,
				},
				results,
				errors,
			});

			// Broadcast updates for successful operations
			results.forEach((result) => {
				broadcastSectionUpdate(result.farmId, result.sectionNumber, {
					valve_open: false,
					mode: "manual",
				});
			});
		} catch (error) {
			console.error("❌ Error in bulk stop irrigation:", error);
			res.status(500).json({ error: "Failed to execute bulk stop irrigation" });
		}
	}
);

// Bulk mode change
router.post(
	"/bulk/mode",
	authenticateToken,
	validateFarmAccess("body"),
	async (req, res) => {
		try {
			const { sections, mode } = req.body; // sections: [{sectionNumber}]
			const farmId = req.farmId!;

			if (!Array.isArray(sections) || sections.length === 0) {
				return res
					.status(400)
					.json({ error: "sections must be a non-empty array" });
			}

			// Validate section numbers
			for (const section of sections) {
				if (
					!section.sectionNumber ||
					typeof section.sectionNumber !== "number" ||
					section.sectionNumber < 1
				) {
					return res.status(400).json({
						error:
							"Each section must have a valid sectionNumber (positive integer)",
					});
				}
			}

			if (!Object.values(IRRIGATION_MODES).includes(mode)) {
				return res.status(400).json({
					error: `Invalid mode. Must be "${IRRIGATION_MODES.AUTO}" or "${IRRIGATION_MODES.MANUAL}"`,
				});
			}

			const results: any[] = [];
			const errors: any[] = [];

			// Process each section
			for (const section of sections) {
				try {
					const { sectionNumber } = section;

					await mqttService.sendModeCommand(farmId, sectionNumber, mode);

					results.push({
						farmId: farmId,
						sectionNumber,
						success: true,
						message: `Mode set to ${mode}`,
					});
				} catch (error) {
					errors.push({
						farmId: farmId,
						sectionNumber: section.sectionNumber,
						success: false,
						error: error instanceof Error ? error.message : "Unknown error",
					});
				}
			}

			res.json({
				success: true,
				message: `Bulk mode change completed`,
				summary: {
					total: sections.length,
					successful: results.length,
					failed: errors.length,
				},
				results,
				errors,
			});
		} catch (error) {
			console.error("Error in bulk mode change:", error);
			res.status(500).json({ error: "Failed to execute bulk mode change" });
		}
	}
);

// Bulk configuration update
router.post(
	"/bulk/config",
	authenticateToken,
	validateFarmAccess("body"),
	async (req, res) => {
		try {
			const { sections, config } = req.body; // sections: [{sectionNumber}]
			const farmId = req.farmId!;

			if (!Array.isArray(sections) || sections.length === 0) {
				return res
					.status(400)
					.json({ error: "sections must be a non-empty array" });
			}

			// Validate section numbers
			for (const section of sections) {
				if (
					!section.sectionNumber ||
					typeof section.sectionNumber !== "number" ||
					section.sectionNumber < 1
				) {
					return res.status(400).json({
						error:
							"Each section must have a valid sectionNumber (positive integer)",
					});
				}
			}

			if (!config || typeof config !== "object") {
				return res.status(400).json({ error: "config must be a valid object" });
			}

			const results: any[] = [];
			const errors: any[] = [];

			// Process each section
			for (const section of sections) {
				try {
					const { sectionNumber } = section;

					await mqttService.sendConfigCommand(farmId, sectionNumber, config);

					results.push({
						farmId: farmId,
						sectionNumber,
						success: true,
						message: "Configuration updated",
					});
				} catch (error) {
					errors.push({
						farmId: farmId,
						sectionNumber: section.sectionNumber,
						success: false,
						error: error instanceof Error ? error.message : "Unknown error",
					});
				}
			}

			res.json({
				success: true,
				message: `Bulk configuration update completed`,
				summary: {
					total: sections.length,
					successful: results.length,
					failed: errors.length,
				},
				results,
				errors,
			});
		} catch (error) {
			console.error("Error in bulk configuration update:", error);
			res
				.status(500)
				.json({ error: "Failed to execute bulk configuration update" });
		}
	}
);

export default router;
