const mqtt = require("mqtt");

// MQTT Configuration - Use environment variables
const mqttConfig = {
	brokerUrl: process.env.MQTT_BROKER_URL || "mqtts://localhost:8883",
	username: process.env.MQTT_USERNAME || "intellirack",
	password: process.env.MQTT_PASSWORD || "intellirack@123",
	clientId: "test_client_" + Math.random().toString(16).substr(2, 8),
};

console.log("🔍 Testing MQTT connection...");
console.log("Broker URL:", mqttConfig.brokerUrl);
console.log("Client ID:", mqttConfig.clientId);

// Connect to MQTT broker
const client = mqtt.connect(mqttConfig.brokerUrl, {
	username: mqttConfig.username,
	password: mqttConfig.password,
	clientId: mqttConfig.clientId,
	clean: true,
	reconnectPeriod: 1000,
	connectTimeout: 30000,
	// MQTTS configuration
	rejectUnauthorized: false, // Allow self-signed certificates
});

// Event handlers
client.on("connect", () => {
	console.log("✅ Connected to MQTT broker");

	// Subscribe to test topic and all farm topics
	const topics = [
		"farm/1/test",
		"farm/1/section/+/status",
		"farm/1/section/+/command",
		"farm/1/section/+/mode",
		"farm/1/section/+/moisture",
		"farm/1/section/+/config",
		"farm/1/section/+/ack",
		"farm/1/section/+/irrigation",
	];

	topics.forEach((topic) => {
		client.subscribe(topic, (err) => {
			if (err) {
				console.log(`❌ Failed to subscribe to ${topic}:`, err);
			} else {
				console.log(`📡 Subscribed to ${topic}`);
			}
		});
	});

	// Send a test message to trigger ESP32 response
	setTimeout(() => {
		console.log("📤 Sending test message to trigger ESP32...");
		const testMessage = {
			action: "ping",
			timestamp: new Date().toISOString(),
		};
		client.publish("farm/1/test", JSON.stringify(testMessage));
	}, 2000);
});

client.on("message", (topic, message) => {
	console.log(`📨 Received message on ${topic}:`);
	try {
		const data = JSON.parse(message.toString());
		console.log("📋 Message data:", JSON.stringify(data, null, 2));
	} catch (error) {
		console.log("📋 Raw message:", message.toString());
	}
});

client.on("error", (error) => {
	console.log("❌ MQTT error:", error);
});

client.on("close", () => {
	console.log("🔌 MQTT connection closed");
});

client.on("reconnect", () => {
	console.log("🔄 MQTT reconnecting...");
});

// Handle process termination
process.on("SIGINT", () => {
	console.log("\n🛑 Disconnecting from MQTT...");
	client.end();
	process.exit(0);
});

// Keep the script running for 30 seconds
setTimeout(() => {
	console.log("⏰ Test completed, disconnecting...");
	client.end();
	process.exit(0);
}, 30000);
