const { PrismaClient } = require("./src/generated/prisma");

const prisma = new PrismaClient();

// Helper function to get random number between min and max
const random = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

// Helper function to get random float between min and max
const randomFloat = (min, max) => Math.random() * (max - min) + min;

// Helper function to get random date within the last N days
const randomDate = (daysAgo) => {
	const date = new Date();
	date.setDate(date.getDate() - random(0, daysAgo));
	date.setHours(random(0, 23), random(0, 59), random(0, 59));
	return date;
};

// Helper function to get sequential dates for the last N days
const getSequentialDates = (days) => {
	const dates = [];
	for (let i = days - 1; i >= 0; i--) {
		const date = new Date();
		date.setDate(date.getDate() - i);
		date.setHours(random(8, 18), random(0, 59), random(0, 59));
		dates.push(date);
	}
	return dates;
};

async function seedRealisticData() {
	console.log("🌱 Seeding realistic data...");

	try {
		// Ensure farm and sections exist
		const farm = await prisma.farm.upsert({
			where: { id: 1 },
			update: {},
			create: {
				id: 1,
				name: "Main Farm",
				location: "Central Valley, CA",
			},
		});

		console.log("✅ Farm created:", farm.name);

		// Create sections if they don't exist
		const sections = [];
		for (let i = 1; i <= 4; i++) {
			const section = await prisma.section.upsert({
				where: {
					farm_section_number_unique: {
						farm_id: 1,
						section_number: i,
					},
				},
				update: {},
				create: {
					name: `Section ${i}`,
					farm_id: 1,
					section_number: i,
				},
			});
			sections.push(section);
			console.log(`✅ Section ${i} created`);
		}

		// Generate moisture readings for the last 30 days
		console.log("📊 Generating moisture readings...");
		const moistureReadings = [];
		const dates = getSequentialDates(30);

		for (const date of dates) {
			for (let sectionNumber = 1; sectionNumber <= 4; sectionNumber++) {
				// Generate 3-8 readings per day per section
				const readingsPerDay = random(3, 8);

				for (let reading = 0; reading < readingsPerDay; reading++) {
					const readingTime = new Date(date);
					readingTime.setHours(
						random(6, 22), // 6 AM to 10 PM
						random(0, 59),
						random(0, 59)
					);

					// Realistic moisture values based on time of day and section
					let baseMoisture = 45; // Base moisture level

					// Morning readings tend to be higher (dew)
					if (readingTime.getHours() < 10) {
						baseMoisture += random(5, 15);
					}

					// Afternoon readings tend to be lower (evaporation)
					if (readingTime.getHours() > 14) {
						baseMoisture -= random(5, 15);
					}

					// Add some variation based on section
					baseMoisture += (sectionNumber - 1) * random(-3, 3);

					// Ensure moisture stays within realistic bounds
					const moisture = Math.max(
						20,
						Math.min(85, baseMoisture + random(-8, 8))
					);

					moistureReadings.push({
						farm_id: 1,
						section_number: sectionNumber,
						value: moisture,
						timestamp: readingTime,
					});
				}
			}
		}

		// Insert moisture readings in batches
		const batchSize = 100;
		for (let i = 0; i < moistureReadings.length; i += batchSize) {
			const batch = moistureReadings.slice(i, i + batchSize);
			await prisma.moistureReading.createMany({
				data: batch,
				skipDuplicates: true,
			});
		}

		console.log(`✅ Created ${moistureReadings.length} moisture readings`);

		// Generate irrigation events for the last 30 days
		console.log("🚰 Generating irrigation events...");
		const irrigationEvents = [];

		for (const date of dates) {
			for (let sectionNumber = 1; sectionNumber <= 4; sectionNumber++) {
				// 30% chance of irrigation per day per section
				if (random(1, 100) <= 30) {
					const startTime = new Date(date);
					startTime.setHours(random(6, 18), random(0, 59), random(0, 59));

					const duration = random(5, 45); // 5-45 minutes
					const endTime = new Date(startTime.getTime() + duration * 60 * 1000);

					// Water usage based on duration (roughly 2-4 L per minute)
					const waterPerMinute = randomFloat(2, 4);
					const waterUsed = duration * waterPerMinute;

					irrigationEvents.push({
						farm_id: 1,
						section_number: sectionNumber,
						water_ml: waterUsed * 1000, // Convert to ml
						start_time: startTime,
						end_time: endTime,
					});
				}
			}
		}

		// Insert irrigation events
		await prisma.irrigationEvent.createMany({
			data: irrigationEvents,
			skipDuplicates: true,
		});

		console.log(`✅ Created ${irrigationEvents.length} irrigation events`);

		// Generate device status records
		console.log("📱 Generating device status records...");

		// Moisture device statuses (one per section)
		for (let sectionNumber = 1; sectionNumber <= 4; sectionNumber++) {
			await prisma.moistureDeviceStatus.create({
				data: {
					device_id: `moisture_sensor_${sectionNumber}`,
					farm_id: 1,
					section_number: sectionNumber,
					mqtt: true,
					wifi: true,
					uptime: BigInt(random(86400, 604800)), // 1-7 days in seconds
					timestamp: new Date(),
					last_error: "",
					enable_deep_sleep: random(0, 1) === 1,
					reporting_interval: random(30, 300), // 30s to 5 minutes
					deep_sleep_duration: random(60, 3600), // 1 minute to 1 hour
				},
			});
		}

		// Irrigation device statuses (one per section)
		for (let sectionNumber = 1; sectionNumber <= 4; sectionNumber++) {
			await prisma.irrigationDeviceStatus.create({
				data: {
					device_id: `irrigation_controller_${sectionNumber}`,
					farm_id: 1,
					section_number: sectionNumber,
					uptime: BigInt(random(86400, 604800)), // 1-7 days in seconds
					wifi: random(0, 1),
					mqtt: random(0, 1),
					last_error: "",
					valve_on: random(0, 1), // Random valve state
					mode: random(0, 1) === 1 ? "auto" : "manual",
					latest_moisture: random(30, 80),
					threshold: 50,
					min_threshold: 30,
					max_threshold: 70,
					pulse_count: random(0, 1000),
					water_ml: random(0, 5000),
					timestamp: new Date(),
				},
			});
		}

		console.log("✅ Created device status records");

		// Generate some recent device acknowledgments
		console.log("✅ Generating device acknowledgments...");
		const acks = [];

		for (let i = 0; i < 20; i++) {
			const sectionNumber = random(1, 4);
			acks.push({
				device_id: `irrigation_controller_${sectionNumber}`,
				farm_id: 1,
				section_number: sectionNumber,
				ack_json: {
					command: random(0, 1) === 1 ? "irrigate" : "stop",
					result: "success",
					details: "Command executed successfully",
					timestamp: randomDate(7),
				},
				timestamp: randomDate(7),
			});
		}

		await prisma.deviceAck.createMany({
			data: acks,
			skipDuplicates: true,
		});

		console.log(`✅ Created ${acks.length} device acknowledgments`);

		console.log("🎉 Realistic data seeding completed successfully!");
		console.log("\n📊 Data Summary:");
		console.log(`- Moisture readings: ${moistureReadings.length}`);
		console.log(`- Irrigation events: ${irrigationEvents.length}`);
		console.log(`- Device statuses: 8 (4 moisture + 4 irrigation)`);
		console.log(`- Device acks: ${acks.length}`);
		console.log(
			"\n🌱 Your analytics dashboard should now show realistic data!"
		);
	} catch (error) {
		console.error("❌ Error seeding data:", error);
	} finally {
		await prisma.$disconnect();
	}
}

// Run the seeding
seedRealisticData();
