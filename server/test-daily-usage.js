const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function testDailyUsage() {
	try {
		const farmId = 1;
		const sectionNumber = 1;
		const days = 7;

		// Calculate date range
		const daysAgo = new Date();
		daysAgo.setDate(daysAgo.getDate() - days);

		console.log(
			`📊 Testing daily usage for Farm ${farmId}, Section ${sectionNumber}, Days: ${days}`
		);
		console.log(`📅 Date range: ${daysAgo.toISOString()} to now`);

		// Get irrigation events
		const irrigationEvents = await prisma.irrigationEvent.findMany({
			where: {
				farm_id: farmId,
				section_number: sectionNumber,
				start_time: {
					gte: daysAgo,
				},
			},
			orderBy: {
				start_time: "desc",
			},
		});

		console.log(`📊 Found ${irrigationEvents.length} irrigation events`);

		// Show all events
		irrigationEvents.forEach((event, index) => {
			const date = new Date(event.start_time);
			const dayKey = date.toISOString().split("T")[0];
			console.log(
				`📅 Event ${index + 1}: Date: ${dayKey}, Water: ${
					event.water_ml
				}ml, Duration: ${
					(new Date(event.end_time).getTime() -
						new Date(event.start_time).getTime()) /
					(1000 * 60)
				}min`
			);
		});

		// Group by day
		const dailyUsage = irrigationEvents.reduce((acc, event) => {
			const date = new Date(event.start_time);
			const dayKey = date.toISOString().split("T")[0];
			const durationMinutes =
				(new Date(event.end_time).getTime() -
					new Date(event.start_time).getTime()) /
				(1000 * 60);

			const existingDay = acc.find((item) => item.date === dayKey);

			if (existingDay) {
				console.log(`📊 Updating existing day: ${dayKey}`);
				existingDay.event_count += 1;
				existingDay.water_liters += event.water_ml / 1000.0;
				existingDay.total_duration_minutes += durationMinutes;
				existingDay.avg_duration_minutes =
					existingDay.total_duration_minutes / existingDay.event_count;
			} else {
				console.log(`📊 Creating new day: ${dayKey}`);
				acc.push({
					date: dayKey,
					event_count: 1,
					water_liters: event.water_ml / 1000.0,
					total_duration_minutes: durationMinutes,
					avg_duration_minutes: durationMinutes,
				});
			}

			return acc;
		}, []);

		console.log(`📊 Final daily usage data:`, dailyUsage);

		// Check for duplicates
		const dateCounts = {};
		dailyUsage.forEach((item) => {
			dateCounts[item.date] = (dateCounts[item.date] || 0) + 1;
		});

		console.log(`📊 Date counts:`, dateCounts);
		const duplicates = Object.entries(dateCounts).filter(
			([date, count]) => count > 1
		);
		if (duplicates.length > 0) {
			console.log(`⚠️ Found duplicate dates:`, duplicates);
		} else {
			console.log(`✅ No duplicate dates found`);
		}
	} catch (error) {
		console.error("❌ Error:", error);
	} finally {
		await prisma.$disconnect();
	}
}

testDailyUsage();
