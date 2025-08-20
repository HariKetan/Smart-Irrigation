import express from "express";
import { prisma } from "../lib/prisma";
import { authenticateToken } from "../lib/auth";
import { validateFarmAccess } from "../lib/farmAccess";
import {
	APP_CONSTANTS,
	TIME_INTERVALS,
	ANALYTICS_PERIODS,
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

// Comprehensive analytics endpoint
router.get(
	"/",
	authenticateToken,
	validateFarmAccess("query"),
	async (req, res) => {
		try {
			const farmId = req.farmId!;
			const { period = "7d", sectionNumber } = req.query;

			console.log(
				`📊 Generating comprehensive analytics for Farm ${farmId}, Period: ${period}`
			);

			// Parse period to get days
			let days: number;
			switch (period) {
				case "1d":
					days = 1;
					break;
				case "7d":
					days = 7;
					break;
				case "30d":
					days = 30;
					break;
				case "90d":
					days = 90;
					break;
				case "1y":
					days = 365;
					break;
				default:
					days = 7;
			}

			const startDate = new Date();
			startDate.setDate(startDate.getDate() - days);

			// Build where clause
			let whereClause: any = {
				farm_id: farmId,
				start_time: {
					gte: startDate,
				},
			};

			if (sectionNumber) {
				whereClause.section_number = parseInt(sectionNumber as string);
			}

			// Get water usage analytics using Prisma
			const waterUsage = await prisma.irrigationEvent.groupBy({
				by: ["section_number"],
				where: whereClause,
				_sum: {
					water_ml: true,
				},
				_count: {
					id: true,
				},
			});

			// Get moisture readings analytics
			const moistureReadings = await prisma.moistureReading.groupBy({
				by: ["section_number"],
				where: {
					farm_id: farmId,
					timestamp: {
						gte: startDate,
					},
					...(sectionNumber && {
						section_number: parseInt(sectionNumber as string),
					}),
				},
				_avg: {
					value: true,
				},
				_min: {
					value: true,
				},
				_max: {
					value: true,
				},
				_count: {
					id: true,
				},
			});

			// Get device statuses
			const irrigationDevices = await prisma.irrigationDeviceStatus.findMany({
				where: {
					farm_id: farmId,
					...(sectionNumber && {
						section_number: parseInt(sectionNumber as string),
					}),
				},
			});

			const moistureDevices = await prisma.moistureDeviceStatus.findMany({
				where: {
					farm_id: farmId,
					...(sectionNumber && {
						section_number: parseInt(sectionNumber as string),
					}),
				},
			});

			// Calculate summary statistics
			const totalWaterUsage =
				waterUsage.reduce((sum, item) => sum + (item._sum.water_ml || 0), 0) /
				1000; // Convert to liters
			const totalEvents = waterUsage.reduce(
				(sum, item) => sum + (item._count.id || 0),
				0
			);
			const averageMoisture =
				moistureReadings.length > 0
					? moistureReadings.reduce(
							(sum, item) => sum + (item._avg.value || 0),
							0
					  ) / moistureReadings.length
					: 0;
			const activeValves = irrigationDevices.filter(
				(device) => device.valve_on === 1
			).length;

			const result = {
				waterUsage: waterUsage.map((item) => ({
					section_number: item.section_number,
					water_liters: (item._sum.water_ml || 0) / 1000,
					irrigation_count: item._count.id || 0,
				})),
				moistureReadings: moistureReadings.map((item) => ({
					section_number: item.section_number,
					avg_moisture: item._avg.value || 0,
					min_moisture: item._min.value || 0,
					max_moisture: item._max.value || 0,
					reading_count: item._count.id || 0,
				})),
				summary: {
					totalWaterUsage,
					averageMoisture: Math.round(averageMoisture),
					activeValves,
					totalEvents,
					period: days,
				},
			};

			res.json(convertBigIntsToNumbers(result));
		} catch (error) {
			console.error("Error generating analytics:", error);
			res.status(500).json({ error: "Failed to generate analytics" });
		}
	}
);

// Water usage analytics
router.get(
	"/water-usage",
	authenticateToken,
	validateFarmAccess("query"),
	async (req, res) => {
		try {
			const farmId = req.farmId!;
			const { period = "7d", sectionNumber } = req.query;

			let days: number;
			switch (period) {
				case "1d":
					days = 1;
					break;
				case "7d":
					days = 7;
					break;
				case "30d":
					days = 30;
					break;
				case "90d":
					days = 90;
					break;
				case "1y":
					days = 365;
					break;
				default:
					days = 7;
			}

			const startDate = new Date();
			startDate.setDate(startDate.getDate() - days);

			let whereClause: any = {
				farm_id: farmId,
				start_time: {
					gte: startDate,
				},
			};

			if (sectionNumber) {
				whereClause.section_number = parseInt(sectionNumber as string);
			}

			// Get water usage data grouped by date
			const waterUsage = await prisma.irrigationEvent.groupBy({
				by: ["start_time"],
				where: whereClause,
				_sum: {
					water_ml: true,
				},
				_count: {
					id: true,
				},
			});

			// Format the data for charts and group by date properly
			const waterUsageByDate = waterUsage.reduce((acc: any, item) => {
				const date = new Date(item.start_time);
				const dayKey = date.toISOString().split("T")[0]; // YYYY-MM-DD format

				if (acc[dayKey]) {
					acc[dayKey].water_liters += (item._sum.water_ml || 0) / 1000;
					acc[dayKey].event_count += item._count.id || 0;
				} else {
					acc[dayKey] = {
						date: dayKey,
						water_liters: (item._sum.water_ml || 0) / 1000,
						event_count: item._count.id || 0,
					};
				}
				return acc;
			}, {});

			// Convert to array and sort by date
			const formattedData = Object.values(waterUsageByDate).sort(
				(a: any, b: any) =>
					new Date(a.date).getTime() - new Date(b.date).getTime()
			);

			// Calculate target (average daily usage * 1.2 for 20% buffer)
			const totalWater = formattedData.reduce(
				(sum: number, item: any) => sum + item.water_liters,
				0
			);
			const avgDailyUsage =
				formattedData.length > 0 ? totalWater / formattedData.length : 0;
			const targetDailyUsage = avgDailyUsage * 1.2; // 20% buffer

			// Add target to each data point
			const finalData = formattedData.map((item: any) => ({
				...item,
				water_liters: Math.round(item.water_liters * 100) / 100, // Round to 2 decimal places
				target_liters: Math.round(targetDailyUsage * 100) / 100,
			}));

			res.json(convertBigIntsToNumbers(finalData));
		} catch (error) {
			console.error("Error fetching water usage analytics:", error);
			res.status(500).json({ error: "Failed to fetch water usage analytics" });
		}
	}
);

// Moisture trends analytics
router.get(
	"/moisture-trends",
	authenticateToken,
	validateFarmAccess("query"),
	async (req, res) => {
		try {
			const farmId = req.farmId!;
			const { period = "7d", sectionNumber } = req.query;

			let days: number;
			switch (period) {
				case "1d":
					days = 1;
					break;
				case "7d":
					days = 7;
					break;
				case "30d":
					days = 30;
					break;
				case "90d":
					days = 90;
					break;
				case "1y":
					days = 365;
					break;
				default:
					days = 7;
			}

			const startDate = new Date();
			startDate.setDate(startDate.getDate() - days);

			let whereClause: any = {
				farm_id: farmId,
				timestamp: {
					gte: startDate,
				},
			};

			if (sectionNumber) {
				whereClause.section_number = parseInt(sectionNumber as string);
			}

			// Get moisture data grouped by date
			const moistureData = await prisma.moistureReading.groupBy({
				by: ["timestamp"],
				where: whereClause,
				_avg: {
					value: true,
				},
				_min: {
					value: true,
				},
				_max: {
					value: true,
				},
				_count: {
					id: true,
				},
			});

			// Format the data for charts and group by date properly
			const moistureByDate = moistureData.reduce((acc: any, item) => {
				const date = new Date(item.timestamp);
				const dayKey = date.toISOString().split("T")[0]; // YYYY-MM-DD format

				if (acc[dayKey]) {
					// Calculate running averages
					const existing = acc[dayKey];
					const newCount = existing.reading_count + (item._count.id || 0);
					existing.avg_moisture =
						(existing.avg_moisture * existing.reading_count +
							(item._avg.value || 0) * (item._count.id || 0)) /
						newCount;
					existing.min_moisture = Math.min(
						existing.min_moisture,
						item._min.value || 0
					);
					existing.max_moisture = Math.max(
						existing.max_moisture,
						item._max.value || 0
					);
					existing.reading_count = newCount;
				} else {
					acc[dayKey] = {
						date: dayKey,
						avg_moisture: item._avg.value || 0,
						min_moisture: item._min.value || 0,
						max_moisture: item._max.value || 0,
						reading_count: item._count.id || 0,
					};
				}
				return acc;
			}, {});

			// Convert to array and sort by date
			const formattedData = Object.values(moistureByDate).sort(
				(a: any, b: any) =>
					new Date(a.date).getTime() - new Date(b.date).getTime()
			);

			// Round moisture values to 1 decimal place
			const finalData = formattedData.map((item: any) => ({
				...item,
				avg_moisture: Math.round(item.avg_moisture * 10) / 10,
				min_moisture: Math.round(item.min_moisture * 10) / 10,
				max_moisture: Math.round(item.max_moisture * 10) / 10,
			}));

			res.json(convertBigIntsToNumbers(finalData));
		} catch (error) {
			console.error("Error fetching moisture trends analytics:", error);
			res
				.status(500)
				.json({ error: "Failed to fetch moisture trends analytics" });
		}
	}
);

// Efficiency report
router.get(
	"/efficiency",
	authenticateToken,
	validateFarmAccess("query"),
	async (req, res) => {
		try {
			const farmId = req.farmId!;
			const { days = 30 } = req.query;

			console.log(
				`📈 Generating efficiency report for Farm ${farmId}, Days: ${days}`
			);

			const efficiencyBySection = await prisma.$queryRaw`
      SELECT 
        ie.section_number,
        s.name as section_name,
        COUNT(*) as total_irrigations,
        SUM(ie.water_ml) / 1000.0 as total_water_liters,
        AVG(ie.water_ml) / 1000.0 as avg_water_per_irrigation,
        AVG(EXTRACT(EPOCH FROM (ie.end_time - ie.start_time)) / 60) as avg_duration_minutes,
        (100 - (AVG(ie.water_ml) / 1000.0 / 10)) as efficiency_score
      FROM irrigation_events ie
      JOIN sections s ON ie.farm_id = s.farm_id AND ie.section_number = s.section_number
      WHERE ie.farm_id = ${farmId}
      AND ie.start_time >= NOW() - INTERVAL '${parseInt(days as string)} days'
      GROUP BY ie.section_number, s.name
      ORDER BY efficiency_score DESC
    `;

			const waterTrends = await prisma.$queryRaw`
      SELECT 
        DATE_TRUNC('week', start_time) as week,
        SUM(water_ml) / 1000.0 as water_liters,
        COUNT(*) as irrigation_count,
        AVG(water_ml) / 1000.0 as avg_water_per_irrigation
      FROM irrigation_events 
      WHERE farm_id = ${farmId}
      AND start_time >= NOW() - INTERVAL '${parseInt(days as string)} days'
      GROUP BY DATE_TRUNC('week', start_time)
      ORDER BY week DESC
    `;

			const peakUsageTimes = await prisma.$queryRaw`
      SELECT 
        EXTRACT(HOUR FROM start_time) as hour_of_day,
        COUNT(*) as irrigation_count,
        SUM(water_ml) / 1000.0 as total_water_liters
      FROM irrigation_events 
      WHERE farm_id = ${farmId}
      AND start_time >= NOW() - INTERVAL '${parseInt(days as string)} days'
      GROUP BY EXTRACT(HOUR FROM start_time)
      ORDER BY total_water_liters DESC
      LIMIT 5
    `;

			const recommendations = await prisma.$queryRaw`
      SELECT 
        ie.section_number,
        s.name as section_name,
        AVG(ie.water_ml) / 1000.0 as avg_water_per_irrigation,
        AVG(mr.value) as avg_moisture_before_irrigation,
        CASE 
          WHEN AVG(mr.value) > 60 THEN 'Consider reducing irrigation frequency - soil moisture is high'
          				WHEN AVG(ie.water_ml) > ${
										APP_CONSTANTS.DEFAULT_WATER_USAGE_THRESHOLD
									} THEN 'Consider reducing irrigation duration - high water usage detected'
          ELSE 'Water usage appears optimal'
        END as recommendation
      FROM irrigation_events ie
      JOIN sections s ON ie.farm_id = s.farm_id AND ie.section_number = s.section_number
      LEFT JOIN moisture_readings mr ON 
        ie.farm_id = mr.farm_id AND 
        ie.section_number = mr.section_number AND
        mr.timestamp BETWEEN ie.start_time - INTERVAL '1 hour' AND ie.start_time
      WHERE ie.farm_id = ${farmId}
      AND ie.start_time >= NOW() - INTERVAL '${parseInt(days as string)} days'
      GROUP BY ie.section_number, s.name
      ORDER BY avg_water_per_irrigation DESC
    `;

			res.json({
				success: true,
				data: {
					days: parseInt(days as string),
					efficiency_by_section: efficiencyBySection,
					water_trends: waterTrends,
					peak_usage_times: peakUsageTimes,
					recommendations: recommendations,
				},
			});
		} catch (error) {
			console.error("❌ Error generating efficiency report:", error);
			res.status(500).json({ error: "Failed to generate efficiency report" });
		}
	}
);

// Moisture readings endpoint
router.get(
	"/moisture-readings",
	authenticateToken,
	validateFarmAccess("query"),
	async (req, res) => {
		try {
			const farmId = req.farmId!;
			const { sectionNumber, limit = "100", days = "7" } = req.query;

			console.log(
				`💧 Fetching moisture readings for Farm ${farmId}, Section: ${sectionNumber}, Limit: ${limit}, Days: ${days}`
			);

			// Build where conditions
			const where: any = {
				farm_id: farmId,
			};

			if (sectionNumber) {
				where.section_number = parseInt(sectionNumber as string);
			}

			// Calculate date range
			const daysAgo = new Date();
			daysAgo.setDate(daysAgo.getDate() - parseInt(days as string));

			where.timestamp = {
				gte: daysAgo,
			};

			const moistureReadings = await prisma.moistureReading.findMany({
				where,
				orderBy: {
					timestamp: "desc",
				},
				take: parseInt(limit as string),
			});

			res.json(convertBigIntsToNumbers(moistureReadings));
		} catch (error) {
			console.error("❌ Error fetching moisture readings:", error);
			res.status(500).json({ error: "Failed to fetch moisture readings" });
		}
	}
);

// Latest moisture readings endpoint
router.get(
	"/moisture-readings/latest",
	authenticateToken,
	validateFarmAccess("query"),
	async (req, res) => {
		try {
			const farmId = req.farmId!;
			const { sectionNumber } = req.query;

			console.log(
				`💧 Fetching latest moisture readings for Farm ${farmId}, Section: ${sectionNumber}`
			);

			// Build where clause
			let whereClause = `WHERE farm_id = ${farmId}`;
			if (sectionNumber) {
				whereClause += ` AND section_number = ${parseInt(
					sectionNumber as string
				)}`;
			}

			// Use Prisma's findMany instead of raw SQL to avoid syntax issues
			const latestReadings = await prisma.moistureReading.findMany({
				where: {
					farm_id: farmId,
					...(sectionNumber && {
						section_number: parseInt(sectionNumber as string),
					}),
				},
				distinct: ["section_number"],
				orderBy: [{ section_number: "asc" }, { timestamp: "desc" }],
			});

			res.json(convertBigIntsToNumbers(latestReadings));
		} catch (error) {
			console.error("❌ Error fetching latest moisture readings:", error);
			res
				.status(500)
				.json({ error: "Failed to fetch latest moisture readings" });
		}
	}
);

// Section usage endpoint
router.get(
	"/irrigation-events/section-usage",
	authenticateToken,
	validateFarmAccess("query"),
	async (req, res) => {
		try {
			const farmId = req.farmId!;
			const { days = "7" } = req.query;

			console.log(
				`📊 Fetching section usage for Farm ${farmId}, Days: ${days}`
			);

			// Calculate date range
			const daysAgo = new Date();
			daysAgo.setDate(daysAgo.getDate() - parseInt(days as string));

			// Get irrigation events
			const irrigationEvents = await prisma.irrigationEvent.findMany({
				where: {
					farm_id: farmId,
					start_time: {
						gte: daysAgo,
					},
				},
				orderBy: {
					start_time: "desc",
				},
			});

			// Group by section
			const sectionUsage = irrigationEvents.reduce((acc: any[], event) => {
				const durationMinutes =
					(new Date(event.end_time).getTime() -
						new Date(event.start_time).getTime()) /
					(1000 * 60);

				const existingSection = acc.find(
					(item) => item.section_number === event.section_number
				);

				if (existingSection) {
					existingSection.event_count += 1;
					existingSection.water_liters += event.water_ml / 1000.0;
					existingSection.total_duration_minutes += durationMinutes;
					existingSection.avg_duration_minutes =
						existingSection.total_duration_minutes /
						existingSection.event_count;
				} else {
					acc.push({
						section_number: event.section_number,
						event_count: 1,
						water_liters: event.water_ml / 1000.0,
						total_duration_minutes: durationMinutes,
						avg_duration_minutes: durationMinutes,
					});
				}

				return acc;
			}, []);

			// Sort by section number and round values
			sectionUsage.sort((a, b) => a.section_number - b.section_number);

			// Round values to 2 decimal places
			const finalSectionUsage = sectionUsage.map((item) => ({
				...item,
				water_liters: Math.round(item.water_liters * 100) / 100,
				avg_duration_minutes: Math.round(item.avg_duration_minutes * 100) / 100,
			}));

			res.json(finalSectionUsage);
		} catch (error) {
			console.error("❌ Error fetching section usage:", error);
			res.status(500).json({ error: "Failed to fetch section usage" });
		}
	}
);

// Irrigation events endpoint
router.get(
	"/irrigation-events",
	authenticateToken,
	validateFarmAccess("query"),
	async (req, res) => {
		try {
			const farmId = req.farmId!;
			const { sectionNumber, limit = "100", days = "7" } = req.query;

			console.log(
				`🚰 Fetching irrigation events for Farm ${farmId}, Section: ${sectionNumber}, Limit: ${limit}, Days: ${days}`
			);

			// Build where conditions
			const where: any = {
				farm_id: farmId,
			};

			if (sectionNumber) {
				where.section_number = parseInt(sectionNumber as string);
			}

			// Calculate date range
			const daysAgo = new Date();
			daysAgo.setDate(daysAgo.getDate() - parseInt(days as string));

			where.start_time = {
				gte: daysAgo,
			};

			const irrigationEvents = await prisma.irrigationEvent.findMany({
				where,
				orderBy: {
					start_time: "desc",
				},
			});

			console.log(
				`📊 Found ${irrigationEvents.length} irrigation events for section ${sectionNumber}`
			);

			// Debug: Show all events
			irrigationEvents.forEach((event, index) => {
				console.log(
					`📅 Event ${index + 1}: Date: ${
						new Date(event.start_time).toISOString().split("T")[0]
					}, Section: ${event.section_number}, Water: ${event.water_ml}ml`
				);
			});

			res.json(convertBigIntsToNumbers(irrigationEvents));
		} catch (error) {
			console.error("❌ Error fetching irrigation events:", error);
			res.status(500).json({ error: "Failed to fetch irrigation events" });
		}
	}
);

// Daily usage endpoint
router.get(
	"/irrigation-events/daily-usage",
	authenticateToken,
	validateFarmAccess("query"),
	async (req, res) => {
		try {
			const farmId = req.farmId!;
			const { days = "7", sectionNumber } = req.query;

			console.log(
				`📊 Fetching daily usage for Farm ${farmId}, Days: ${days}, Section: ${sectionNumber}`
			);

			// Calculate date range
			const daysAgo = new Date();
			daysAgo.setDate(daysAgo.getDate() - parseInt(days as string));

			// Build where conditions
			const where: any = {
				farm_id: farmId,
				start_time: {
					gte: daysAgo,
				},
			};

			if (sectionNumber) {
				where.section_number = parseInt(sectionNumber as string);
			}

			// Get irrigation events
			const irrigationEvents = await prisma.irrigationEvent.findMany({
				where,
				orderBy: {
					start_time: "desc",
				},
			});

			console.log(
				`📊 Found ${irrigationEvents.length} irrigation events for section ${sectionNumber}`
			);

			// Group by day and section
			const dailyUsage = irrigationEvents.reduce((acc: any[], event) => {
				const date = new Date(event.start_time);
				const dayKey = date.toISOString().split("T")[0]; // YYYY-MM-DD format
				const durationMinutes =
					(new Date(event.end_time).getTime() -
						new Date(event.start_time).getTime()) /
					(1000 * 60);

				console.log(
					`📅 Processing event for date: ${dayKey}, section: ${event.section_number}, water: ${event.water_ml}ml`
				);

				// If sectionNumber is provided, group only by date (not by section_number)
				const existingDay = sectionNumber
					? acc.find((item) => item.date === dayKey)
					: acc.find(
							(item) =>
								item.date === dayKey &&
								item.section_number === event.section_number
					  );

				if (existingDay) {
					console.log(`📊 Updating existing day: ${dayKey}`);
					existingDay.event_count += 1;
					existingDay.water_liters += event.water_ml / 1000.0;
					existingDay.total_duration_minutes += durationMinutes;
					existingDay.avg_duration_minutes =
						existingDay.total_duration_minutes / existingDay.event_count;
				} else {
					console.log(`📊 Creating new day: ${dayKey}`);
					const newItem: any = {
						date: dayKey,
						event_count: 1,
						water_liters: event.water_ml / 1000.0,
						total_duration_minutes: durationMinutes,
						avg_duration_minutes: durationMinutes,
					};

					// Only include section_number if not filtering by specific section
					if (!sectionNumber) {
						newItem.section_number = event.section_number;
					}

					acc.push(newItem);
				}

				return acc;
			}, []);

			console.log(`📊 Final daily usage data:`, dailyUsage);

			// Debug: Check for duplicates
			const dateCounts: { [key: string]: number } = {};
			dailyUsage.forEach((item: any) => {
				dateCounts[item.date] = (dateCounts[item.date] || 0) + 1;
			});

			console.log(`📊 Date counts:`, dateCounts);
			const duplicates = Object.entries(dateCounts).filter(
				([date, count]) => count > 1
			);
			if (duplicates.length > 0) {
				console.log(`⚠️ Found duplicate dates:`, duplicates);
			}

			// Sort by date (desc) and section number
			dailyUsage.sort((a, b) => {
				if (a.date !== b.date) {
					return b.date.localeCompare(a.date);
				}
				// Only sort by section_number if it exists in both items
				if (a.section_number !== undefined && b.section_number !== undefined) {
					return a.section_number - b.section_number;
				}
				return 0;
			});

			// Calculate target (average daily usage * 1.2 for 20% buffer)
			const totalWater = dailyUsage.reduce(
				(sum: number, item: any) => sum + item.water_liters,
				0
			);
			const avgDailyUsage =
				dailyUsage.length > 0 ? totalWater / dailyUsage.length : 0;
			const targetDailyUsage = avgDailyUsage * 1.2; // 20% buffer

			// Round values to 2 decimal places and add target
			const finalDailyUsage = dailyUsage.map((item) => ({
				...item,
				water_liters: Math.round(item.water_liters * 100) / 100,
				avg_duration_minutes: Math.round(item.avg_duration_minutes * 100) / 100,
				target_liters: Math.round(targetDailyUsage * 100) / 100,
			}));

			res.json(finalDailyUsage);
		} catch (error) {
			console.error("❌ Error fetching daily usage:", error);
			res.status(500).json({ error: "Failed to fetch daily usage" });
		}
	}
);

// Analytics summary endpoint
router.get(
	"/summary",
	authenticateToken,
	validateFarmAccess("query"),
	async (req, res) => {
		try {
			const farmId = req.farmId!;
			const { days = "7" } = req.query;
			const periodDays = parseInt(days as string);

			const startDate = new Date();
			startDate.setDate(startDate.getDate() - periodDays);

			// Get water usage summary
			const waterUsageResult = await prisma.irrigationEvent.aggregate({
				where: {
					farm_id: farmId,
					start_time: {
						gte: startDate,
					},
				},
				_sum: {
					water_ml: true,
				},
				_count: {
					id: true,
				},
			});

			// Get moisture readings summary
			const moistureResult = await prisma.moistureReading.aggregate({
				where: {
					farm_id: farmId,
					timestamp: {
						gte: startDate,
					},
				},
				_avg: {
					value: true,
				},
			});

			// Get active valves count
			const activeValves = await prisma.irrigationDeviceStatus.count({
				where: {
					farm_id: farmId,
					valve_on: 1,
				},
			});

			const summary = {
				totalWaterUsage: (waterUsageResult._sum.water_ml || 0) / 1000, // Convert to liters
				averageMoisture: Math.round(moistureResult._avg.value || 0),
				activeValves,
				totalEvents: waterUsageResult._count.id || 0,
				period: periodDays,
			};

			res.json(convertBigIntsToNumbers(summary));
		} catch (error) {
			console.error("Error fetching analytics summary:", error);
			res.status(500).json({ error: "Failed to fetch analytics summary" });
		}
	}
);

// Valve activity analytics endpoint
router.get(
	"/valve-activity",
	authenticateToken,
	validateFarmAccess("query"),
	async (req, res) => {
		try {
			const farmId = req.farmId!;
			const { days = "7" } = req.query;
			const daysNum = parseInt(days as string);

			console.log(
				`📊 Generating valve activity analytics for Farm ${farmId}, Days: ${daysNum}`
			);

			// Calculate date range
			const daysAgo = new Date();
			daysAgo.setDate(daysAgo.getDate() - daysNum);

			// Get all irrigation events for the period
			const irrigationEvents = await prisma.irrigationEvent.findMany({
				where: {
					farm_id: farmId,
					start_time: {
						gte: daysAgo,
					},
				},
				orderBy: {
					start_time: "desc",
				},
			});

			// Group by day
			const dailyActivity = irrigationEvents.reduce((acc: any[], event) => {
				const date = new Date(event.start_time);
				const dayKey = date.toISOString().split("T")[0]; // YYYY-MM-DD format

				const existingDay = acc.find((item) => item.date === dayKey);

				if (existingDay) {
					existingDay.total_events += 1;
					existingDay.water_usage += event.water_ml / 1000.0;
				} else {
					acc.push({
						date: dayKey,
						active_valves: 1, // Count as 1 active valve per day with events
						total_events: 1,
						water_usage: event.water_ml / 1000.0,
					});
				}

				return acc;
			}, []);

			// Sort by date (desc)
			dailyActivity.sort((a, b) => b.date.localeCompare(a.date));

			res.json(dailyActivity);
		} catch (error) {
			console.error("❌ Error generating valve activity analytics:", error);
			res
				.status(500)
				.json({ error: "Failed to generate valve activity analytics" });
		}
	}
);

export default router;
