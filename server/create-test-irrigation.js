const { PrismaClient } = require("./src/generated/prisma");

const prisma = new PrismaClient();

async function createTestIrrigationEvents() {
	try {
		console.log("🚰 Creating test irrigation events...");

		// First, ensure we have a farm and sections
		let farm = await prisma.farm.findFirst({
			where: { id: 1 },
		});

		if (!farm) {
			farm = await prisma.farm.create({
				data: {
					id: 1,
					name: "Test Farm",
					location: "Test Location",
				},
			});
			console.log("✅ Created test farm:", farm);
		}

		// Create sections if they don't exist
		for (let sectionNum = 1; sectionNum <= 4; sectionNum++) {
			let section = await prisma.section.findFirst({
				where: { farm_id: 1, section_number: sectionNum },
			});

			if (!section) {
				section = await prisma.section.create({
					data: {
						farm_id: 1,
						section_number: sectionNum,
						name: `Test Section ${sectionNum}`,
					},
				});
				console.log(`✅ Created test section ${sectionNum}:`, section);
			}
		}

		// Create irrigation events for the last 7 days
		const now = new Date();
		const irrigationEvents = [];

		for (let sectionNum = 1; sectionNum <= 4; sectionNum++) {
			// Create 2-3 irrigation events per section over the last 7 days
			for (let day = 0; day < 7; day += 2) {
				// Every 2 days
				const startTime = new Date(now);
				startTime.setDate(startTime.getDate() - day);
				startTime.setHours(8 + Math.floor(Math.random() * 8), 0, 0, 0); // Random hour between 8-16

				const endTime = new Date(startTime);
				endTime.setMinutes(
					endTime.getMinutes() + 15 + Math.floor(Math.random() * 30)
				); // 15-45 minutes duration

				const waterMl = 500 + Math.floor(Math.random() * 1000); // 500-1500ml

				irrigationEvents.push({
					farm_id: 1,
					section_number: sectionNum,
					water_ml: waterMl,
					start_time: startTime,
					end_time: endTime,
				});
			}
		}

		console.log(`📊 Creating ${irrigationEvents.length} irrigation events...`);

		// Insert irrigation events
		for (const event of irrigationEvents) {
			await prisma.irrigationEvent.create({
				data: event,
			});
		}

		console.log("🎉 Test irrigation events created successfully!");

		// Verify the data
		const count = await prisma.irrigationEvent.count({
			where: { farm_id: 1 },
		});
		console.log(`📊 Total irrigation events in database: ${count}`);
	} catch (error) {
		console.error("❌ Error creating test irrigation events:", error);
	} finally {
		await prisma.$disconnect();
	}
}

createTestIrrigationEvents();
