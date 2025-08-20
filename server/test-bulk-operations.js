const { PrismaClient } = require("./src/generated/prisma/client");
const jwt = require("jsonwebtoken");

const prisma = new PrismaClient();

async function testBulkOperations() {
	try {
		console.log("🧪 Testing Bulk Operations...\n");

		// Generate a test token
		const token = jwt.sign(
			{ userId: "cmdu3x3gg0000d4upl3msz10n", farmId: 1 },
			process.env.JWT_SECRET || "your-secret-key",
			{ expiresIn: "1h" }
		);

		const baseUrl = "http://localhost:5001";
		const headers = {
			"Content-Type": "application/json",
			Authorization: `Bearer ${token}`,
		};

		// Test data
		const testSections = [{ sectionNumber: 1 }, { sectionNumber: 2 }];

		console.log(
			"📋 Test Sections:",
			testSections.map((s) => s.sectionNumber).join(", ")
		);

		// Test 1: Bulk Mode Change
		console.log("\n1️⃣ Testing Bulk Mode Change...");
		try {
			const modeResponse = await fetch(`${baseUrl}/api/devices/bulk/mode`, {
				method: "POST",
				headers,
				body: JSON.stringify({
					sections: testSections,
					mode: "manual",
				}),
			});

			const modeResult = await modeResponse.json();
			console.log(
				"✅ Mode Change Result:",
				JSON.stringify(modeResult, null, 2)
			);
		} catch (error) {
			console.error("❌ Mode Change Error:", error.message);
		}

		// Test 2: Bulk Config Update
		console.log("\n2️⃣ Testing Bulk Config Update...");
		try {
			const configResponse = await fetch(`${baseUrl}/api/devices/bulk/config`, {
				method: "POST",
				headers,
				body: JSON.stringify({
					sections: testSections,
					config: { threshold: 50 },
				}),
			});

			const configResult = await configResponse.json();
			console.log(
				"✅ Config Update Result:",
				JSON.stringify(configResult, null, 2)
			);
		} catch (error) {
			console.error("❌ Config Update Error:", error.message);
		}

		// Test 3: Bulk Irrigation Start
		console.log("\n3️⃣ Testing Bulk Irrigation Start...");
		try {
			const irrigateResponse = await fetch(
				`${baseUrl}/api/devices/bulk/irrigate`,
				{
					method: "POST",
					headers,
					body: JSON.stringify({
						sections: testSections,
						duration: 30,
					}),
				}
			);

			const irrigateResult = await irrigateResponse.json();
			console.log(
				"✅ Irrigation Start Result:",
				JSON.stringify(irrigateResult, null, 2)
			);
		} catch (error) {
			console.error("❌ Irrigation Start Error:", error.message);
		}

		// Test 4: Bulk Irrigation Stop
		console.log("\n4️⃣ Testing Bulk Irrigation Stop...");
		try {
			const stopResponse = await fetch(`${baseUrl}/api/devices/bulk/stop`, {
				method: "POST",
				headers,
				body: JSON.stringify({
					sections: testSections,
				}),
			});

			const stopResult = await stopResponse.json();
			console.log(
				"✅ Irrigation Stop Result:",
				JSON.stringify(stopResult, null, 2)
			);
		} catch (error) {
			console.error("❌ Irrigation Stop Error:", error.message);
		}

		console.log("\n🎉 Bulk Operations Test Complete!");
	} catch (error) {
		console.error("❌ Test failed:", error);
	} finally {
		await prisma.$disconnect();
	}
}

// Run the test
testBulkOperations();
