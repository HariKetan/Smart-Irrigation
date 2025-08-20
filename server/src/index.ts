import express from "express";
import cors from "cors";
import { createServer } from "http";
import { WebSocketServer, WebSocket as WS } from "ws";

import authRouter from "./routes/auth";
import sectionsRouter from "./routes/sections";
import analyticsRouter from "./routes/analytics";
import devicesRouter from "./routes/devices";
import farmsRouter from "./routes/farms";
// import schedulingRouter from "./routes/scheduling";
import { authenticateToken } from "./lib/auth";
// import { CronService } from "./services/CronService";
import { mqttService } from "./services/MqttService";
import { serverConfig, wsConfig } from "./lib/config";

const app = express();
const server = createServer(app);
const PORT = serverConfig.port;

// WebSocket server
const wss = new WebSocketServer({ server });

// Store client subscriptions
const clientSubscriptions = new Map<WS, Set<string>>();

// WebSocket connection handling
wss.on("connection", (ws, req) => {
	console.log("🔌 WebSocket client connected");

	// Initialize client subscriptions
	clientSubscriptions.set(ws, new Set());

	// Send initial connection message
	ws.send(
		JSON.stringify({
			type: "connection",
			data: { message: "Connected to Irrigation System" },
			timestamp: new Date().toISOString(),
		})
	);

	ws.on("message", (message) => {
		try {
			const data = JSON.parse(message.toString());
			console.log("📨 WebSocket message received:", data);

			// Handle different message types
			switch (data.type) {
				case "subscribe":
					// Subscribe to specific section updates
					const subscriptionKey = `${data.farmId}-${data.sectionNumber}`;
					clientSubscriptions.get(ws)?.add(subscriptionKey);
					ws.send(
						JSON.stringify({
							type: "subscribed",
							data: { farmId: data.farmId, sectionNumber: data.sectionNumber },
							timestamp: new Date().toISOString(),
						})
					);
					console.log(`📡 Client subscribed to section ${subscriptionKey}`);
					break;
				case "request_update":
					// Handle update requests
					ws.send(
						JSON.stringify({
							type: "update_requested",
							data: { farmId: data.farmId, sectionNumber: data.sectionNumber },
							timestamp: new Date().toISOString(),
						})
					);
					break;
				case "ping":
					ws.send(
						JSON.stringify({
							type: "pong",
							data: {},
							timestamp: new Date().toISOString(),
						})
					);
					break;
				default:
					console.log("Unknown message type:", data.type);
			}
		} catch (error) {
			console.error("Error parsing WebSocket message:", error);
		}
	});

	ws.on("close", () => {
		console.log("🔌 WebSocket client disconnected");
		// Clean up subscriptions
		clientSubscriptions.delete(ws);
	});

	ws.on("error", (error) => {
		console.error("WebSocket error:", error);
		// Clean up subscriptions on error
		clientSubscriptions.delete(ws);
	});
});

// Function to broadcast to all connected clients
export const broadcastToClients = (message: any) => {
	wss.clients.forEach((client) => {
		if (client.readyState === 1) {
			// WebSocket.OPEN
			client.send(JSON.stringify(message));
		}
	});
};

// Function to broadcast section-specific updates
export const broadcastSectionUpdate = (
	farmId: number,
	sectionNumber: number,
	data: any
) => {
	const subscriptionKey = `${farmId}-${sectionNumber}`;
	const message = {
		type: "section_update",
		data: {
			farm_id: farmId,
			section_number: sectionNumber,
			...data,
		},
		timestamp: new Date().toISOString(),
	};

	wss.clients.forEach((client) => {
		if (
			client.readyState === 1 &&
			clientSubscriptions.get(client as WS)?.has(subscriptionKey)
		) {
			client.send(JSON.stringify(message));
		}
	});
};

// Middleware
app.use(
	cors({
		origin: serverConfig.corsOrigin,
		credentials: true,
	})
);
app.use(express.json());

// Routes
app.get("/", (req, res) => {
	res.json({ message: "Welcome to the Irrigation System API" });
});

// Test endpoint to check if server is running
app.get("/api/health", (req, res) => {
	res.json({
		status: "OK",
		timestamp: new Date().toISOString(),
		message: "Server is running",
	});
});

// Debug endpoint to test authentication
app.get("/api/debug/auth", authenticateToken, (req, res) => {
	res.json({
		message: "Authentication successful",
		user: req.user,
		timestamp: new Date().toISOString(),
	});
});

// API routes
// app.use('/api/sensors', sensorsRouter);
// app.use('/api/readings', readingsRouter);
// app.use('/api/sections', sectionsRouter);
// app.use('/api/valves', valvesRouter);
app.use("/api/auth", authRouter);
app.use("/api/sections", sectionsRouter);
app.use("/api/analytics", analyticsRouter);
app.use("/api/devices", devicesRouter);
app.use("/api/farms", farmsRouter);
// app.use("/api/scheduling", schedulingRouter);

// Sample API routes (keeping for backward compatibility)
// app.get('/api/health', (req, res) => {
//   res.json({ status: 'OK', timestamp: new Date().toISOString() });
// });

// app.get('/api/data', (req, res) => {
//   res.json({
//     message: 'Sample data from server',
//     data: [
//       { id: 1, name: 'Sensor 1', value: 25.5 },
//       { id: 2, name: 'Sensor 2', value: 30.2 },
//       { id: 3, name: 'Sensor 3', value: 28.7 },
//       { id: 4, name: 'Sensor 4', value: 28.7 }
//     ]
//   });
// });

// Start server
server.listen(Number(PORT), "0.0.0.0", async () => {
	console.log(`🚀 Server is running on port ${PORT}`);
	console.log(`📡 API available at http://localhost:${PORT}`);
	console.log(`🌐 Network access: http://192.168.1.150:${PORT}`);
	console.log(`🔌 WebSocket available at ws://localhost:${PORT}`);

	try {
		// Initialize MQTT service
		await mqttService.connect();
		console.log("✅ MQTT service initialized");
	} catch (error) {
		console.error("❌ Failed to initialize MQTT service:", error);
	}

	// Cron service disabled for now - not needed for core MQTT functionality
	// const cronService = CronService.getInstance();
	// cronService.start();
});
