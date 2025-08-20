import mqtt from "mqtt";
import { mqttConfig } from "../lib/config";
import { broadcastSectionUpdate } from "../index";
import { prisma } from "../lib/prisma";

export class MqttService {
	private static instance: MqttService;
	private client: mqtt.MqttClient | null = null;
	private isConnected = false;
	private reconnectAttempts = 0;
	private maxReconnectAttempts = 10;

	private constructor() {}

	public static getInstance(): MqttService {
		if (!MqttService.instance) {
			MqttService.instance = new MqttService();
		}
		return MqttService.instance;
	}

	public async connect(): Promise<void> {
		if (this.client && this.isConnected) {
			return;
		}

		try {
			console.log("Connecting to MQTT broker...");

			this.client = mqtt.connect(mqttConfig.brokerUrl, {
				username: mqttConfig.username,
				password: mqttConfig.password,
				reconnectPeriod: mqttConfig.reconnectPeriod,
				connectTimeout: mqttConfig.connectTimeout,
				clean: true,
				keepalive: 60,
				// MQTTS configuration
				rejectUnauthorized: false, // Allow self-signed certificates
			});

			this.setupEventHandlers();

			return new Promise((resolve, reject) => {
				const timeout = setTimeout(() => {
					reject(new Error("MQTT connection timeout"));
				}, mqttConfig.connectTimeout);

				this.client!.once("connect", () => {
					clearTimeout(timeout);
					this.isConnected = true;
					this.reconnectAttempts = 0;
					console.log("✅ MQTT client connected successfully");
					this.subscribeToTopics();
					resolve();
				});

				this.client!.once("error", (error: Error) => {
					clearTimeout(timeout);
					console.error("❌ MQTT connection error:", error);
					reject(error);
				});
			});
		} catch (error) {
			console.error("❌ Failed to create MQTT client:", error);
			throw error;
		}
	}

	private setupEventHandlers(): void {
		if (!this.client) return;

		this.client.on("connect", () => {
			console.log("✅ MQTT client connected");
			this.isConnected = true;
			this.reconnectAttempts = 0;
			this.subscribeToTopics();
		});

		this.client.on("message", async (topic: string, message: Buffer) => {
			await this.handleMessage(topic, message);
		});

		this.client.on("error", (error: Error) => {
			console.error("❌ MQTT client error:", error);
			this.isConnected = false;
		});

		this.client.on("disconnect", () => {
			console.log("⚠️ MQTT client disconnected");
			this.isConnected = false;
		});

		this.client.on("reconnect", () => {
			this.reconnectAttempts++;
			console.log(
				`🔄 MQTT client reconnecting... (attempt ${this.reconnectAttempts})`
			);

			if (this.reconnectAttempts >= this.maxReconnectAttempts) {
				console.error("❌ Max MQTT reconnection attempts reached");
				this.disconnect();
			}
		});

		this.client.on("close", () => {
			console.log("🔌 MQTT client connection closed");
			this.isConnected = false;
		});
	}

	private subscribeToTopics(): void {
		if (!this.client || !this.isConnected) return;

		const topics = [
			"farm/+/section/+/moisture",
			"farm/+/section/+/status",
			"farm/+/section/+/irrigation",
			"farm/+/section/+/ack",
			"farm/+/section/+/config",
			"farm/+/test",
		];

		topics.forEach((topic) => {
			this.client!.subscribe(topic, (error: Error | null) => {
				if (error) {
					console.error(`❌ Failed to subscribe to ${topic}:`, error);
				} else {
					console.log(`📡 Subscribed to ${topic}`);
				}
			});
		});
	}

	private async handleMessage(topic: string, message: Buffer): Promise<void> {
		try {
			const data = JSON.parse(message.toString());
			const topicParts = topic.split("/");

			if (topicParts.length >= 4) {
				const farmId = parseInt(topicParts[1]);
				const sectionNumber = parseInt(topicParts[3]);
				const messageType = topicParts[4];

				console.log(`📨 MQTT message received: ${topic}`);
				console.log(`📊 Message data:`, JSON.stringify(data, null, 2));

				// Process message based on type
				switch (messageType) {
					case "moisture":
						await this.handleMoistureMessage(farmId, sectionNumber, data);
						break;

					case "irrigation":
						await this.handleIrrigationMessage(farmId, sectionNumber, data);
						break;

					case "status":
						await this.handleStatusMessage(farmId, sectionNumber, data);
						break;

					case "ack":
						await this.handleAckMessage(farmId, sectionNumber, data);
						break;

					case "config":
						await this.handleConfigMessage(farmId, sectionNumber, data);
						break;
				}
			}
		} catch (error) {
			console.error("❌ Error processing MQTT message:", error);
		}
	}

	private async handleMoistureMessage(
		farmId: number,
		sectionNumber: number,
		data: any
	): Promise<void> {
		try {
			if (data.value === undefined) {
				console.error("Missing value field in moisture data:", data);
				return;
			}

			// Ensure farm and section exist
			await this.ensureFarmAndSection(farmId, sectionNumber);

			// Save moisture reading to database with server timestamp
			const serverTimestamp = new Date();
			await prisma.moistureReading.create({
				data: {
					farm_id: farmId,
					section_number: sectionNumber,
					value: parseFloat(data.value),
					timestamp: serverTimestamp,
				},
			});

			console.log(
				`💧 Moisture reading saved: Farm ${farmId}, Section ${sectionNumber}, Value: ${data.value}`
			);

			// Broadcast update
			broadcastSectionUpdate(farmId, sectionNumber, {
				moisture_value: parseFloat(data.value),
				timestamp: serverTimestamp.toISOString(),
				type: "moisture_update",
			});

			// Also broadcast as section update for real-time UI updates
			broadcastSectionUpdate(farmId, sectionNumber, {
				moisture_value: parseFloat(data.value),
				timestamp: serverTimestamp.toISOString(),
				type: "section_update",
			});
		} catch (error) {
			console.error("❌ Error handling moisture message:", error);
		}
	}

	private async handleIrrigationMessage(
		farmId: number,
		sectionNumber: number,
		data: any
	): Promise<void> {
		try {
			// Validate required fields
			const requiredFields = ["start_time", "end_time", "water_ml"];
			if (!requiredFields.every((field) => data[field] !== undefined)) {
				console.error("Missing required fields in irrigation data:", data);
				return;
			}

			// Ensure farm and section exist
			await this.ensureFarmAndSection(farmId, sectionNumber);

			// Use server timestamps for irrigation events
			const serverTimestamp = new Date();
			const startTime = new Date(serverTimestamp.getTime() - 60000); // 1 minute ago
			const endTime = serverTimestamp;

			// Save irrigation event to database
			await prisma.irrigationEvent.create({
				data: {
					farm_id: farmId,
					section_number: sectionNumber,
					water_ml: parseFloat(data.water_ml),
					start_time: startTime,
					end_time: endTime,
				},
			});

			console.log(
				`🚰 Irrigation event saved: Farm ${farmId}, Section ${sectionNumber}, Water: ${data.water_ml}ml`
			);

			// Broadcast update
			broadcastSectionUpdate(farmId, sectionNumber, {
				valve_open: false,
				mode: "manual",
				water_ml: parseFloat(data.water_ml),
				timestamp: endTime.toISOString(),
				type: "irrigation_complete",
			});

			// Also broadcast as section update for real-time UI updates
			broadcastSectionUpdate(farmId, sectionNumber, {
				valve_open: false,
				water_ml: parseFloat(data.water_ml),
				timestamp: endTime.toISOString(),
				type: "section_update",
			});
		} catch (error) {
			console.error("❌ Error handling irrigation message:", error);
		}
	}

	private async handleStatusMessage(
		farmId: number,
		sectionNumber: number,
		data: any
	): Promise<void> {
		try {
			// Ensure farm and section exist
			await this.ensureFarmAndSection(farmId, sectionNumber);

			// Determine if this is a moisture or irrigation device
			const isMoistureDevice =
				(data.device_id && data.device_id.toLowerCase().includes("moisture")) ||
				(data.enable_deep_sleep !== undefined &&
					data.deep_sleep_duration !== undefined) ||
				(data.device_id && data.device_id.toLowerCase().includes("sensor"));

			if (isMoistureDevice) {
				// Save moisture device status with server timestamp
				const serverTimestamp = new Date();
				await prisma.moistureDeviceStatus.create({
					data: {
						device_id: data.device_id || "unknown",
						farm_id: farmId,
						section_number: sectionNumber,
						mqtt: Boolean(data.mqtt),
						wifi: Boolean(data.wifi),
						uptime: parseInt(data.uptime || "0"),
						timestamp: serverTimestamp,
						last_error: data.last_error || "",
						enable_deep_sleep: Boolean(data.enable_deep_sleep),
						reporting_interval: parseInt(data.reporting_interval || "0"),
						deep_sleep_duration: parseInt(data.deep_sleep_duration || "0"),
					},
				});

				console.log(
					`📊 Moisture device status saved: Farm ${farmId}, Section ${sectionNumber}, Device: ${data.device_id}`
				);

				// Broadcast moisture device status update
				broadcastSectionUpdate(farmId, sectionNumber, {
					device_type: "moisture",
					device_id: data.device_id || "unknown",
					wifi: Boolean(data.wifi),
					mqtt: Boolean(data.mqtt),
					uptime: Math.floor(parseInt(data.uptime || "0") / 1000), // Convert milliseconds to seconds
					last_error: data.last_error || "",
					enable_deep_sleep: Boolean(data.enable_deep_sleep),
					reporting_interval: parseInt(data.reporting_interval || "0"),
					deep_sleep_duration: parseInt(data.deep_sleep_duration || "0"),
					timestamp: serverTimestamp.toISOString(),
					type: "device_status_update",
				});

				// Also broadcast threshold as section update
				broadcastSectionUpdate(farmId, sectionNumber, {
					min_threshold:
						data.min_threshold !== undefined
							? parseInt(data.min_threshold)
							: undefined,
					max_threshold:
						data.max_threshold !== undefined
							? parseInt(data.max_threshold)
							: undefined,
					timestamp: serverTimestamp.toISOString(),
					type: "section_update",
				});
			} else {
				// Save irrigation device status with server timestamp
				const serverTimestamp = new Date();
				await prisma.irrigationDeviceStatus.create({
					data: {
						device_id: data.device_id || "unknown",
						farm_id: farmId,
						section_number: sectionNumber,
						uptime: parseInt(data.uptime || "0"),
						wifi: parseInt(data.wifi || "0"),
						mqtt: parseInt(data.mqtt || "0"),
						last_error: data.last_error || "",
						valve_on: parseInt(data.valve_on || "0"),
						mode: data.mode || "auto",
						latest_moisture: parseInt(data.latest_moisture || "0"),
						min_threshold:
							data.min_threshold !== undefined
								? parseInt(data.min_threshold)
								: undefined,
						max_threshold:
							data.max_threshold !== undefined
								? parseInt(data.max_threshold)
								: undefined,
						pulse_count: parseInt(data.pulse_count || "0"),
						water_ml: parseInt(data.water_ml || "0"),
						timestamp: serverTimestamp,
					},
				});

				console.log(
					`📊 Irrigation device status saved: Farm ${farmId}, Section ${sectionNumber}, Device: ${data.device_id}`
				);

				// Broadcast irrigation device status update
				broadcastSectionUpdate(farmId, sectionNumber, {
					device_type: "irrigation",
					device_id: data.device_id || "unknown",
					wifi: parseInt(data.wifi || "0"),
					mqtt: parseInt(data.mqtt || "0"),
					uptime: Math.floor(parseInt(data.uptime || "0") / 1000), // Convert milliseconds to seconds
					last_error: data.last_error || "",
					valve_on: parseInt(data.valve_on || "0"),
					mode: data.mode || "auto",
					latest_moisture: parseInt(data.latest_moisture || "0"),
					min_threshold:
						data.min_threshold !== undefined
							? parseInt(data.min_threshold)
							: undefined,
					max_threshold:
						data.max_threshold !== undefined
							? parseInt(data.max_threshold)
							: undefined,
					pulse_count: parseInt(data.pulse_count || "0"),
					water_ml: parseInt(data.water_ml || "0"),
					timestamp: serverTimestamp.toISOString(),
					type: "device_status_update",
				});

				// Also broadcast valve and mode as section update
				broadcastSectionUpdate(farmId, sectionNumber, {
					valve_open: Boolean(data.valve_on),
					mode: data.mode || "auto",
					min_threshold:
						data.min_threshold !== undefined
							? parseInt(data.min_threshold)
							: undefined,
					max_threshold:
						data.max_threshold !== undefined
							? parseInt(data.max_threshold)
							: undefined,
					timestamp: serverTimestamp.toISOString(),
					type: "section_update",
				});
			}
		} catch (error) {
			console.error("❌ Error handling status message:", error);
		}
	}

	private async handleAckMessage(
		farmId: number,
		sectionNumber: number,
		data: any
	): Promise<void> {
		try {
			// Ensure farm and section exist
			await this.ensureFarmAndSection(farmId, sectionNumber);

			// Save device acknowledgment
			await prisma.deviceAck.create({
				data: {
					device_id: data.device_id || "unknown",
					farm_id: farmId,
					section_number: sectionNumber,
					ack_json: data,
					timestamp: new Date(),
				},
			});

			console.log(
				`✅ ACK saved: Farm ${farmId}, Section ${sectionNumber}, Device: ${data.device_id}`
			);

			// Broadcast ACK update
			broadcastSectionUpdate(farmId, sectionNumber, {
				ack: {
					command: data.command,
					result: data.result,
					details: data.details,
				},
				timestamp: data.timestamp || new Date().toISOString(),
				type: "command_ack",
			});
		} catch (error) {
			console.error("❌ Error handling ACK message:", error);
		}
	}

	private async handleConfigMessage(
		farmId: number,
		sectionNumber: number,
		data: any
	): Promise<void> {
		try {
			// Handle configuration updates
			if (data.min_threshold !== undefined) {
				console.log(
					`⚙️ Min threshold updated: Farm ${farmId}, Section ${sectionNumber}, Value: ${data.min_threshold}`
				);
			}

			if (data.max_threshold !== undefined) {
				console.log(
					`⚙️ Max threshold updated: Farm ${farmId}, Section ${sectionNumber}, Value: ${data.max_threshold}`
				);
			}

			// Broadcast config update with threshold fields
			broadcastSectionUpdate(farmId, sectionNumber, {
				config: data,
				min_threshold: data.min_threshold,
				max_threshold: data.max_threshold,
				timestamp: data.timestamp || new Date().toISOString(),
				type: "config_update",
			});
		} catch (error) {
			console.error("❌ Error handling config message:", error);
		}
	}

	private async ensureFarmAndSection(
		farmId: number,
		sectionNumber: number
	): Promise<void> {
		try {
			// First, ensure farm exists
			let farm = await prisma.farm.findUnique({
				where: { id: farmId },
			});

			if (!farm) {
				// Create farm if it doesn't exist
				farm = await prisma.farm.create({
					data: {
						id: farmId,
						name: `Farm ${farmId}`,
						location: `Farm Location ${farmId}`,
					},
				});
				console.log(`🏭 Created new farm: ${farm.name} (ID: ${farmId})`);
			}

			// Then, ensure section exists
			let section = await prisma.section.findFirst({
				where: { farm_id: farmId, section_number: sectionNumber },
			});

			if (!section) {
				// Create section if it doesn't exist
				section = await prisma.section.create({
					data: {
						name: `Section ${sectionNumber}`,
						farm_id: farmId,
						section_number: sectionNumber,
					},
				});
				console.log(
					`🌱 Created new section: ${section.name} (Farm: ${farmId}, Section: ${sectionNumber})`
				);
			}
		} catch (error) {
			console.error(`❌ Error ensuring farm and section exist:`, error);
			throw error;
		}
	}

	public async sendCommand(topic: string, payload: any): Promise<void> {
		if (!this.client || !this.isConnected) {
			throw new Error("MQTT client not connected");
		}

		return new Promise((resolve, reject) => {
			const message = JSON.stringify(payload);
			console.log(`📤 Sending MQTT command to ${topic}:`, payload);

			this.client!.publish(topic, message, { qos: 1 }, (error?: Error) => {
				if (error) {
					console.error(`❌ MQTT publish error for ${topic}:`, error);
					reject(error);
				} else {
					console.log(`✅ MQTT command sent successfully to ${topic}`);
					resolve();
				}
			});
		});
	}

	public async sendIrrigationCommand(
		farmId: number,
		sectionNumber: number,
		duration: number
	): Promise<void> {
		const topic = `farm/${farmId}/section/${sectionNumber}/command`;
		const payload = {
			action: "irrigate",
			duration: duration,
			timestamp: new Date().toISOString(),
		};

		await this.sendCommand(topic, payload);
	}

	public async sendStopCommand(
		farmId: number,
		sectionNumber: number
	): Promise<void> {
		const topic = `farm/${farmId}/section/${sectionNumber}/command`;
		const payload = {
			action: "stop",
			timestamp: new Date().toISOString(),
		};

		await this.sendCommand(topic, payload);
	}

	public async sendModeCommand(
		farmId: number,
		sectionNumber: number,
		mode: string
	): Promise<void> {
		const topic = `farm/${farmId}/section/${sectionNumber}/mode`;
		const payload = {
			mode: mode,
			timestamp: new Date().toISOString(),
		};

		await this.sendCommand(topic, payload);
	}

	public async sendConfigCommand(
		farmId: number,
		sectionNumber: number,
		config: any
	): Promise<void> {
		const topic = `farm/${farmId}/section/${sectionNumber}/config`;
		const payload = {
			...config,
			timestamp: new Date().toISOString(),
		};

		await this.sendCommand(topic, payload);
	}

	public isClientConnected(): boolean {
		return this.isConnected && this.client !== null;
	}

	public disconnect(): void {
		if (this.client) {
			this.client.end();
			this.client = null;
			this.isConnected = false;
			console.log("🔌 MQTT client disconnected");
		}
	}

	public getConnectionStatus(): {
		connected: boolean;
		reconnectAttempts: number;
	} {
		return {
			connected: this.isConnected,
			reconnectAttempts: this.reconnectAttempts,
		};
	}
}

// Export singleton instance
export const mqttService = MqttService.getInstance();
