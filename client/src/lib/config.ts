import { APP_CONSTANTS } from "./constants";

interface ClientConfig {
	// API Configuration
	apiUrl: string;
	wsUrl: string;

	// Google Maps Configuration
	googleMapsApiKey: string;

	// Application Configuration
	appName: string;
	appVersion: string;

	// Feature Flags
	enableAnalytics: boolean;
	enableMaps: boolean;
	enableRealTime: boolean;

	// WebSocket Configuration
	wsReconnectInterval: number;
	wsMaxReconnectAttempts: number;

	// UI Configuration
	theme: string;
	enableDarkMode: boolean;

	// Development Configuration
	enableDebugLogging: boolean;
	enableMockData: boolean;
}

// Validate required environment variables
function validateConfig(): void {
	const required = ["NEXT_PUBLIC_API_URL"];

	const missing = required.filter((key) => !process.env[key]);

	if (missing.length > 0) {
		console.warn(
			`Missing required environment variables: ${missing.join(", ")}`
		);
	}
}

// Create configuration object
export const config: ClientConfig = {
	// API Configuration
	apiUrl:
		process.env.NEXT_PUBLIC_API_URL ||
		`http://${APP_CONSTANTS.DEFAULT_HOST}:${APP_CONSTANTS.DEFAULT_PORT}`,
	wsUrl:
		process.env.NEXT_PUBLIC_WS_URL ||
		`ws://${APP_CONSTANTS.DEFAULT_HOST}:${APP_CONSTANTS.DEFAULT_PORT}`,

	// Google Maps Configuration
	googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "",

	// Application Configuration
	appName: process.env.NEXT_PUBLIC_APP_NAME || "Smart Irrigation System",
	appVersion: process.env.NEXT_PUBLIC_APP_VERSION || "1.0.0",

	// Feature Flags
	enableAnalytics: process.env.NEXT_PUBLIC_ENABLE_ANALYTICS === "true",
	enableMaps: process.env.NEXT_PUBLIC_ENABLE_MAPS === "true",
	enableRealTime: process.env.NEXT_PUBLIC_ENABLE_REAL_TIME === "true",

	// WebSocket Configuration
	wsReconnectInterval: parseInt(
		process.env.NEXT_PUBLIC_WS_RECONNECT_INTERVAL || "5000"
	),
	wsMaxReconnectAttempts: parseInt(
		process.env.NEXT_PUBLIC_WS_MAX_RECONNECT_ATTEMPTS || "10"
	),

	// UI Configuration
	theme: process.env.NEXT_PUBLIC_THEME || "light",
	enableDarkMode: process.env.NEXT_PUBLIC_ENABLE_DARK_MODE === "true",

	// Development Configuration
	enableDebugLogging: process.env.NEXT_PUBLIC_ENABLE_DEBUG_LOGGING === "true",
	enableMockData: process.env.NEXT_PUBLIC_ENABLE_MOCK_DATA === "true",
};

// Validate configuration on import
validateConfig();

// Export individual config sections for convenience
export const apiConfig = {
	url: config.apiUrl,
	wsUrl: config.wsUrl,
};

export const mapsConfig = {
	apiKey: config.googleMapsApiKey,
	enabled: config.enableMaps,
};

export const featureConfig = {
	analytics: config.enableAnalytics,
	maps: config.enableMaps,
	realTime: config.enableRealTime,
};

export const wsConfig = {
	url: config.wsUrl,
	reconnectInterval: config.wsReconnectInterval,
	maxReconnectAttempts: config.wsMaxReconnectAttempts,
};

export const uiConfig = {
	theme: config.theme,
	enableDarkMode: config.enableDarkMode,
};

export const devConfig = {
	enableDebugLogging: config.enableDebugLogging,
	enableMockData: config.enableMockData,
};
