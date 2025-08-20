const { PrismaClient } = require("./src/generated/prisma");
const bcrypt = require("bcrypt");

const prisma = new PrismaClient();

async function createTestUser() {
	try {
		console.log("👤 Creating test user...");

		// Check if user already exists
		const existingUser = await prisma.user.findFirst({
			where: { email: "test@example.com" },
		});

		if (existingUser) {
			console.log("✅ Test user already exists:", existingUser);
			return;
		}

		// Hash password
		const hashedPassword = await bcrypt.hash("password123", 10);

		// Create test user
		const user = await prisma.user.create({
			data: {
				email: "test@example.com",
				password: hashedPassword,
				name: "Test User",
				farm_ids: [1], // Access to farm 1
			},
		});

		console.log("✅ Test user created:", {
			id: user.id,
			email: user.email,
			name: user.name,
			farm_ids: user.farm_ids,
		});

		// Generate JWT token
		const jwt = require("jsonwebtoken");
		const token = jwt.sign(
			{ userId: user.id.toString(), farmId: 1 },
			"abcdefghujkl"
		);

		console.log("🔑 JWT Token:", token);
		console.log("📝 Test credentials:");
		console.log("   Email: test@example.com");
		console.log("   Password: password123");
	} catch (error) {
		console.error("❌ Error creating test user:", error);
	} finally {
		await prisma.$disconnect();
	}
}

createTestUser();
