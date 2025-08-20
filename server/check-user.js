const { PrismaClient } = require("./src/generated/prisma");

const prisma = new PrismaClient();

async function checkUser() {
	try {
		console.log("👤 Checking user details...");

		const user = await prisma.user.findFirst({
			where: { email: "test@example.com" },
		});

		if (user) {
			console.log("✅ User found:", {
				id: user.id,
				email: user.email,
				name: user.name,
				farm_ids: user.farm_ids,
			});
		} else {
			console.log("❌ User not found");
		}

		// Check if farm 1 exists
		const farm = await prisma.farm.findFirst({
			where: { id: 1 },
		});

		if (farm) {
			console.log("✅ Farm 1 found:", farm);
		} else {
			console.log("❌ Farm 1 not found");
		}

		// Check moisture readings for farm 1, section 1
		const readings = await prisma.moistureReading.findMany({
			where: {
				farm_id: 1,
				section_number: 1,
			},
			take: 5,
			orderBy: { timestamp: "desc" },
		});

		console.log(
			`📊 Found ${readings.length} moisture readings for farm 1, section 1`
		);
		if (readings.length > 0) {
			console.log("Latest reading:", readings[0]);
		}
	} catch (error) {
		console.error("❌ Error checking user:", error);
	} finally {
		await prisma.$disconnect();
	}
}

checkUser();
