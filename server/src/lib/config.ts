import dotenv from "dotenv";
import { APP_CONSTANTS } from "./constants";

// Load environment variables
dotenv.config();

interface Config {
	// Server Configuration
	port: number;
	nodeEnv: string;

	// Database Configuration
	databaseUrl: string;

	// JWT Configuration
	jwtSecret: string;
	jwtExpiresIn: string;

	// MQTT Configuration
	mqttBrokerUrl: string;
	mqttUsername: string;
	mqttPassword: string;
	mqttReconnectPeriod: number;
	mqttConnectTimeout: number;

	// CORS Configuration
	corsOrigin: string;

	// Logging Configuration
	logLevel: string;
	logFile: string;

	// Security Configuration
	bcryptRounds: number;
	rateLimitWindowMs: number;
	rateLimitMaxRequests: number;

	// WebSocket Configuration
	wsHeartbeatInterval: number;
	wsMaxClients: number;

	// Cron Service Configuration
	cronEnabled: boolean;
	cronCheckInterval: number;

	// Analytics Configuration
	analyticsRetentionDays: number;
	maxAnalyticsQueryDays: number;
}

// Validate required environment variables
function validateConfig(): void {
	const required = ["DATABASE_URL", "JWT_SECRET"];
	const mqttRequired = ["MQTT_USERNAME", "MQTT_PASSWORD"];

	const missing = required.filter((key) => !process.env[key]);
	const missingMqtt = mqttRequired.filter((key) => !process.env[key]);

	if (missing.length > 0) {
		throw new Error(
			`Missing required environment variables: ${missing.join(", ")}`
		);
	}

	if (missingMqtt.length > 0) {
		console.warn(
			`⚠️  Missing MQTT credentials: ${missingMqtt.join(
				", "
			)}. MQTT functionality may not work properly.`
		);
	}
}

// Create configuration object
export const config: Config = {
	// Server Configuration
	port: parseInt(process.env.PORT || APP_CONSTANTS.DEFAULT_PORT.toString()),
	nodeEnv: process.env.NODE_ENV || "development",

	// Database Configuration
	databaseUrl: process.env.DATABASE_URL!,

	// JWT Configuration
	jwtSecret: process.env.JWT_SECRET!,
	jwtExpiresIn: process.env.JWT_EXPIRES_IN || "24h",

	// MQTT Configuration
	mqttBrokerUrl:
		process.env.MQTT_BROKER_URL ||
		`mqtts://${APP_CONSTANTS.DEFAULT_MQTT_HOST}:8883`, // MQTTS port

	mqttUsername: process.env.MQTT_USERNAME || "",
	mqttPassword: process.env.MQTT_PASSWORD || "",
	mqttReconnectPeriod: parseInt(
		process.env.MQTT_RECONNECT_PERIOD ||
			APP_CONSTANTS.DEFAULT_MQTT_RECONNECT_PERIOD.toString()
	),
	mqttConnectTimeout: parseInt(process.env.MQTT_CONNECT_TIMEOUT || "10000"),

	// CORS Configuration
	corsOrigin:
		process.env.CORS_ORIGIN ||
		`http://${APP_CONSTANTS.DEFAULT_CLIENT_HOST}:${APP_CONSTANTS.DEFAULT_CLIENT_PORT}`,

	// Logging Configuration
	logLevel: process.env.LOG_LEVEL || "info",
	logFile: process.env.LOG_FILE || "logs/server.log",

	// Security Configuration
	bcryptRounds: parseInt(process.env.BCRYPT_ROUNDS || "12"),
	rateLimitWindowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS || "900000"),
	rateLimitMaxRequests: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS || "100"),

	// WebSocket Configuration
	wsHeartbeatInterval: parseInt(process.env.WS_HEARTBEAT_INTERVAL || "30000"),
	wsMaxClients: parseInt(process.env.WS_MAX_CLIENTS || "100"),

	// Cron Service Configuration
	cronEnabled: process.env.CRON_ENABLED === "true",
	cronCheckInterval: parseInt(process.env.CRON_CHECK_INTERVAL || "60000"),

	// Analytics Configuration
	analyticsRetentionDays: parseInt(
		process.env.ANALYTICS_RETENTION_DAYS || "90"
	),
	maxAnalyticsQueryDays: parseInt(
		process.env.MAX_ANALYTICS_QUERY_DAYS || "365"
	),
};

// Validate configuration on import
validateConfig();

// Export individual config sections for convenience
export const serverConfig = {
	port: config.port,
	nodeEnv: config.nodeEnv,
	corsOrigin: config.corsOrigin,
};

export const mqttConfig = {
	brokerUrl: config.mqttBrokerUrl,
	username: config.mqttUsername,
	password: config.mqttPassword,
	reconnectPeriod: config.mqttReconnectPeriod,
	connectTimeout: config.mqttConnectTimeout,
	// MQTTS configuration
	protocol: "mqtts" as const,
	rejectUnauthorized: false, // Allow self-signed certificates
};

export const securityConfig = {
	jwtSecret: config.jwtSecret,
	jwtExpiresIn: config.jwtExpiresIn,
	bcryptRounds: config.bcryptRounds,
	rateLimitWindowMs: config.rateLimitWindowMs,
	rateLimitMaxRequests: config.rateLimitMaxRequests,
};

export const wsConfig = {
	heartbeatInterval: config.wsHeartbeatInterval,
	maxClients: config.wsMaxClients,
};

export const cronConfig = {
	enabled: config.cronEnabled,
	checkInterval: config.cronCheckInterval,
};

export const analyticsConfig = {
	retentionDays: config.analyticsRetentionDays,
	maxQueryDays: config.maxAnalyticsQueryDays,
};
