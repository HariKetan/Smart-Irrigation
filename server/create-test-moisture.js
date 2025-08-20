const { PrismaClient } = require("./src/generated/prisma");

const prisma = new PrismaClient();

async function createTestMoistureReadings() {
	try {
		console.log("💧 Creating test moisture readings...");

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

		// Create moisture readings for the last 7 days
		const now = new Date();
		const moistureReadings = [];

		for (let sectionNum = 1; sectionNum <= 4; sectionNum++) {
			// Create readings for the last 7 days, every hour
			for (let day = 0; day < 7; day++) {
				for (let hour = 0; hour < 24; hour++) {
					const timestamp = new Date(now);
					timestamp.setDate(timestamp.getDate() - day);
					timestamp.setHours(hour, 0, 0, 0);

					// Generate realistic moisture values (30-80%)
					const baseMoisture = 50 + sectionNum * 5; // Different base for each section
					const variation = Math.random() * 20 - 10; // ±10 variation
					const moistureValue = Math.max(
						30,
						Math.min(80, baseMoisture + variation)
					);

					moistureReadings.push({
						farm_id: 1,
						section_number: sectionNum,
						value: Math.round(moistureValue),
						timestamp: timestamp,
					});
				}
			}
		}

		console.log(`📊 Creating ${moistureReadings.length} moisture readings...`);

		// Insert moisture readings in batches
		const batchSize = 100;
		for (let i = 0; i < moistureReadings.length; i += batchSize) {
			const batch = moistureReadings.slice(i, i + batchSize);
			await prisma.moistureReading.createMany({
				data: batch,
				skipDuplicates: true,
			});
			console.log(
				`✅ Inserted batch ${Math.floor(i / batchSize) + 1}/${Math.ceil(
					moistureReadings.length / batchSize
				)}`
			);
		}

		console.log("🎉 Test moisture readings created successfully!");

		// Verify the data
		const count = await prisma.moistureReading.count({
			where: { farm_id: 1 },
		});
		console.log(`📊 Total moisture readings in database: ${count}`);
	} catch (error) {
		console.error("❌ Error creating test moisture readings:", error);
	} finally {
		await prisma.$disconnect();
	}
}

createTestMoistureReadings();
