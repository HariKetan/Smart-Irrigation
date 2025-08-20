const { PrismaClient } = require("./src/generated/prisma/index.js");
const jwt = require("jsonwebtoken");

const prisma = new PrismaClient();

async function testIrrigationControl() {
	try {
		console.log("🧪 Testing Irrigation Control System...\n");

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

		console.log("📊 Testing Current System State...");

		// Test 1: Get all sections
		console.log("\n1️⃣ Testing sections API...");
		const sectionsResponse = await fetch(`${baseUrl}/api/sections`, {
			headers,
		});

		if (sectionsResponse.ok) {
			const sections = await sectionsResponse.json();
			console.log("✅ Sections found:", sections.length);
			sections.forEach((section, index) => {
				console.log(`   Section ${index + 1}:`, {
					name: section.name,
					moisture: section.moisture,
					threshold: section.threshold,
					valveOpen: section.valveOpen,
					mode: section.mode,
				});
			});
		} else {
			console.error("❌ Sections API failed:", sectionsResponse.status);
		}

		// Test 2: Test irrigation start
		console.log("\n2️⃣ Testing irrigation start...");
		const startResponse = await fetch(`${baseUrl}/api/sections/1/1/irrigate`, {
			method: "POST",
			headers,
			body: JSON.stringify({ duration: 30 }),
		});

		if (startResponse.ok) {
			const startResult = await startResponse.json();
			console.log("✅ Irrigation started:", startResult);
		} else {
			const errorText = await startResponse.text();
			console.error(
				"❌ Irrigation start failed:",
				startResponse.status,
				errorText
			);
		}

		// Test 3: Test mode change
		console.log("\n3️⃣ Testing mode change...");
		const modeResponse = await fetch(`${baseUrl}/api/sections/1/1/mode`, {
			method: "POST",
			headers,
			body: JSON.stringify({ mode: "auto" }),
		});

		if (modeResponse.ok) {
			const modeResult = await modeResponse.json();
			console.log("✅ Mode changed:", modeResult);
		} else {
			const errorText = await modeResponse.text();
			console.error("❌ Mode change failed:", modeResponse.status, errorText);
		}

		// Test 4: Test configuration update
		console.log("\n4️⃣ Testing configuration update...");
		const configResponse = await fetch(`${baseUrl}/api/sections/1/1/config`, {
			method: "PUT",
			headers,
			body: JSON.stringify({
				threshold: 50,
				min_threshold: 40,
				max_threshold: 80,
			}),
		});

		if (configResponse.ok) {
			const configResult = await configResponse.json();
			console.log("✅ Configuration updated:", configResult);
		} else {
			const errorText = await configResponse.text();
			console.error(
				"❌ Configuration update failed:",
				configResponse.status,
				errorText
			);
		}

		// Test 5: Test irrigation stop
		console.log("\n5️⃣ Testing irrigation stop...");
		const stopResponse = await fetch(`${baseUrl}/api/sections/1/1/stop`, {
			method: "POST",
			headers,
			body: JSON.stringify({}),
		});

		if (stopResponse.ok) {
			const stopResult = await stopResponse.json();
			console.log("✅ Irrigation stopped:", stopResult);
		} else {
			const errorText = await stopResponse.text();
			console.error(
				"❌ Irrigation stop failed:",
				stopResponse.status,
				errorText
			);
		}

		// Test 6: Test device status
		console.log("\n6️⃣ Testing device status...");
		const deviceStatusResponse = await fetch(
			`${baseUrl}/api/devices/irrigation/status?farm_id=1`,
			{
				headers,
			}
		);

		if (deviceStatusResponse.ok) {
			const deviceStatus = await deviceStatusResponse.json();
			console.log(
				"✅ Irrigation device status:",
				deviceStatus.length,
				"devices"
			);
			if (deviceStatus.length > 0) {
				console.log("   Latest device:", {
					device_id: deviceStatus[0].device_id,
					valve_on: deviceStatus[0].valve_on,
					mode: deviceStatus[0].mode,
					timestamp: new Date(deviceStatus[0].timestamp).toISOString(),
				});
			}
		} else {
			console.error("❌ Device status failed:", deviceStatusResponse.status);
		}

		// Test 7: Test moisture device status
		console.log("\n7️⃣ Testing moisture device status...");
		const moistureStatusResponse = await fetch(
			`${baseUrl}/api/devices/moisture/status?farm_id=1`,
			{
				headers,
			}
		);

		if (moistureStatusResponse.ok) {
			const moistureStatus = await moistureStatusResponse.json();
			console.log(
				"✅ Moisture device status:",
				moistureStatus.length,
				"devices"
			);
			if (moistureStatus.length > 0) {
				console.log("   Latest device:", {
					device_id: moistureStatus[0].device_id,
					wifi: moistureStatus[0].wifi,
					mqtt: moistureStatus[0].mqtt,
					timestamp: new Date(moistureStatus[0].timestamp).toISOString(),
				});
			}
		} else {
			console.error(
				"❌ Moisture device status failed:",
				moistureStatusResponse.status
			);
		}

		// Test 8: Test bulk operations
		console.log("\n8️⃣ Testing bulk operations...");
		const bulkResponse = await fetch(`${baseUrl}/api/devices/bulk/mode`, {
			method: "POST",
			headers,
			body: JSON.stringify({
				sections: [{ sectionNumber: 1 }, { sectionNumber: 2 }],
				mode: "manual",
			}),
		});

		if (bulkResponse.ok) {
			const bulkResult = await bulkResponse.json();
			console.log("✅ Bulk mode change:", bulkResult);
		} else {
			const errorText = await bulkResponse.text();
			console.error(
				"❌ Bulk operation failed:",
				bulkResponse.status,
				errorText
			);
		}

		console.log("\n✅ Irrigation Control System test completed!");
	} catch (error) {
		console.error("❌ Test failed:", error);
	} finally {
		await prisma.$disconnect();
	}
}

testIrrigationControl();
