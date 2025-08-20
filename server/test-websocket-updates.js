const WebSocket = require("ws");
const { PrismaClient } = require("./src/generated/prisma/index.js");
const jwt = require("jsonwebtoken");

const prisma = new PrismaClient();

async function testWebSocketUpdates() {
	try {
		console.log("🧪 Testing WebSocket Section Updates...\n");

		// Generate a test token
		const token = jwt.sign(
			{ userId: "cmdu3x3gg0000d4upl3msz10n", farmId: 1 },
			process.env.JWT_SECRET || "your-secret-key",
			{ expiresIn: "1h" }
		);

		const wsUrl = "ws://localhost:5001";

		console.log("🔌 Testing WebSocket connection for section updates...");

		// Test WebSocket connection
		const ws = new WebSocket(wsUrl);

		ws.on("open", () => {
			console.log("✅ WebSocket connected successfully");

			// Subscribe to section 1-1
			ws.send(
				JSON.stringify({
					type: "subscribe",
					farmId: 1,
					sectionNumber: 1,
				})
			);

			console.log("📡 Subscribed to section 1-1");

			// Wait a moment then send a test moisture update
			setTimeout(() => {
				console.log("💧 Simulating moisture update...");
				// This would normally come from MQTT, but we'll simulate it
				ws.send(
					JSON.stringify({
						type: "section_update",
						farmId: 1,
						sectionNumber: 1,
						moisture_value: 75,
						timestamp: new Date().toISOString(),
					})
				);
			}, 2000);
		});

		ws.on("message", (data) => {
			const message = JSON.parse(data.toString());
			console.log("📨 WebSocket message received:", message);

			if (message.type === "section_update") {
				console.log("✅ Section update received:", message.data);
			}
		});

		ws.on("error", (error) => {
			console.error("❌ WebSocket error:", error);
		});

		ws.on("close", () => {
			console.log("🔌 WebSocket closed");
		});

		// Test API endpoints
		console.log("\n📊 Testing API endpoints...");

		const baseUrl = "http://localhost:5001";
		const headers = {
			"Content-Type": "application/json",
			Authorization: `Bearer ${token}`,
		};

		// Test section detail API
		console.log("🔍 Testing section detail API...");
		const sectionResponse = await fetch(`${baseUrl}/api/sections/1/1`, {
			headers,
		});

		if (sectionResponse.ok) {
			const sectionData = await sectionResponse.json();
			console.log("✅ Section data:", {
				id: sectionData.id,
				name: sectionData.name,
				moisture: sectionData.moisture,
				threshold: sectionData.threshold,
				valveOpen: sectionData.valveOpen,
				mode: sectionData.mode,
			});
		} else {
			console.error("❌ Section API failed:", sectionResponse.status);
		}

		// Test moisture readings API
		console.log("💧 Testing moisture readings API...");
		const readingsResponse = await fetch(
			`${baseUrl}/api/sections/1/1/readings`,
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
					value: readingsData[0].value,
					timestamp: new Date(readingsData[0].timestamp).toISOString(),
				});
			}
		} else {
			console.error(
				"❌ Moisture readings API failed:",
				readingsResponse.status
			);
		}

		// Wait for WebSocket messages
		console.log("\n⏳ Waiting for WebSocket messages (15 seconds)...");
		await new Promise((resolve) => setTimeout(resolve, 15000));

		// Close WebSocket
		ws.close();

		console.log("\n✅ WebSocket Section Updates test completed!");
	} catch (error) {
		console.error("❌ Test failed:", error);
	} finally {
		await prisma.$disconnect();
	}
}

testWebSocketUpdates();
