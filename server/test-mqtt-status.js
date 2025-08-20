const mqtt = require("mqtt");

// MQTT Configuration
const mqttConfig = {
	host: "mqtt.judesonleo.app",
	port: 8883,
	protocol: "mqtts",
	username: "intellirack",
	password: "intellirack@123",
	rejectUnauthorized: false,
};

const mqttBrokerUrl = "mqtts://mqtt.judesonleo.app:8883";

console.log("🧪 Testing MQTT Status Message Handling...\n");

// Connect to MQTT broker
const client = mqtt.connect(mqttBrokerUrl, mqttConfig);

client.on("connect", () => {
	console.log("✅ Connected to MQTT broker");

	// Subscribe to status topics
	const topics = [
		"farm/+/section/+/status",
		"farm/+/section/+/moisture",
		"farm/+/section/+/irrigation",
		"farm/+/section/+/ack",
	];

	topics.forEach((topic) => {
		client.subscribe(topic, (err) => {
			if (err) {
				console.error(`❌ Failed to subscribe to ${topic}:`, err);
			} else {
				console.log(`📡 Subscribed to ${topic}`);
			}
		});
	});

	console.log("\n🔍 Listening for MQTT messages...");
	console.log("Press Ctrl+C to stop\n");
});

client.on("message", (topic, message) => {
	try {
		const data = JSON.parse(message.toString());
		console.log(`📨 Received message on topic: ${topic}`);
		console.log(`📊 Data:`, JSON.stringify(data, null, 2));
		console.log("---\n");
	} catch (error) {
		console.error(`❌ Error parsing message from ${topic}:`, error);
		console.log(`📄 Raw message:`, message.toString());
		console.log("---\n");
	}
});

client.on("error", (error) => {
	console.error("❌ MQTT error:", error);
});

client.on("close", () => {
	console.log("🔌 MQTT connection closed");
});

// Handle graceful shutdown
process.on("SIGINT", () => {
	console.log("\n🛑 Shutting down...");
	client.end();
	process.exit(0);
});

// Keep the script running
setTimeout(() => {
	console.log("⏰ Test completed (30 seconds)");
	client.end();
	process.exit(0);
}, 30000);
