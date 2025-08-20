const WebSocket = require("ws");
const { PrismaClient } = require("./src/generated/prisma/index.js");
const jwt = require("jsonwebtoken");

const prisma = new PrismaClient();

async function testWebSocketAndDevices() {
	try {
		console.log("🧪 Testing WebSocket and Device Status...\n");

		// Generate a test token
		const token = jwt.sign(
			{ userId: "cmdu3x3gg0000d4upl3msz10n", farmId: 1 },
			process.env.JWT_SECRET || "your-secret-key",
			{ expiresIn: "1h" }
		);

		const baseUrl = "http://localhost:5001";
		const wsUrl = "ws://localhost:5001";
		const headers = {
			"Content-Type": "application/json",
			Authorization: `Bearer ${token}`,
		};

		console.log("🔌 Testing WebSocket connection...");

		// Test WebSocket connection
		const ws = new WebSocket(wsUrl);

		ws.on("open", () => {
			console.log("✅ WebSocket connected successfully");

			// Subscribe to section updates
			ws.send(
				JSON.stringify({
					type: "subscribe",
					farmId: 1,
					sectionNumber: 1,
				})
			);

			console.log("📡 Subscribed to section 1-1");
		});

		ws.on("message", (data) => {
			const message = JSON.parse(data.toString());
			console.log("📨 WebSocket message received:", message);
		});

		ws.on("error", (error) => {
			console.error("❌ WebSocket error:", error);
		});

		ws.on("close", () => {
			console.log("🔌 WebSocket closed");
		});

		// Test device status endpoints
		console.log("\n📊 Testing Device Status Endpoints...");

		// Test irrigation device status
		console.log("🔧 Testing irrigation device status...");
		const irrigationResponse = await fetch(
			`${baseUrl}/api/devices/irrigation/status?farm_id=1`,
			{
				headers,
			}
		);

		if (irrigationResponse.ok) {
			const irrigationData = await irrigationResponse.json();
			console.log(
				"✅ Irrigation device status:",
				irrigationData.length,
				"devices found"
			);
			if (irrigationData.length > 0) {
				console.log("   Latest device:", {
					device_id: irrigationData[0].device_id,
					section_number: irrigationData[0].section_number,
					timestamp: new Date(irrigationData[0].timestamp).toISOString(),
					valve_on: irrigationData[0].valve_on,
					mode: irrigationData[0].mode,
				});
			}
		} else {
			console.error(
				"❌ Irrigation device status failed:",
				irrigationResponse.status
			);
		}

		// Test moisture device status
		console.log("💧 Testing moisture device status...");
		const moistureResponse = await fetch(
			`${baseUrl}/api/devices/moisture/status?farm_id=1`,
			{
				headers,
			}
		);

		if (moistureResponse.ok) {
			const moistureData = await moistureResponse.json();
			console.log(
				"✅ Moisture device status:",
				moistureData.length,
				"devices found"
			);
			if (moistureData.length > 0) {
				console.log("   Latest device:", {
					device_id: moistureData[0].device_id,
					section_number: moistureData[0].section_number,
					timestamp: new Date(moistureData[0].timestamp).toISOString(),
					wifi: moistureData[0].wifi,
					mqtt: moistureData[0].mqtt,
				});
			}
		} else {
			console.error(
				"❌ Moisture device status failed:",
				moistureResponse.status
			);
		}

		// Test moisture readings
		console.log("\n💧 Testing moisture readings...");
		const readingsResponse = await fetch(
			`${baseUrl}/api/analytics/moisture-readings/latest`,
			{
				headers,
			}
		);

		if (readingsResponse.ok) {
			const readingsData = await readingsResponse.json();
			console.log(
				"✅ Moisture readings:",
				readingsData.length,
				"readings found"
			);
			if (readingsData.length > 0) {
				console.log("   Latest reading:", {
					section_number: readingsData[0].section_number,
					value: readingsData[0].value,
					timestamp: new Date(readingsData[0].timestamp).toISOString(),
				});
			}
		} else {
			console.error("❌ Moisture readings failed:", readingsResponse.status);
		}

		// Wait for WebSocket messages
		console.log("\n⏳ Waiting for WebSocket messages (10 seconds)...");
		await new Promise((resolve) => setTimeout(resolve, 10000));

		// Close WebSocket
		ws.close();

		console.log("\n✅ WebSocket and Device Status test completed!");
	} catch (error) {
		console.error("❌ Test failed:", error);
	} finally {
		await prisma.$disconnect();
	}
}

testWebSocketAndDevices();
