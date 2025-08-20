// Client Application Constants
export const APP_CONSTANTS = {
	// Server Configuration
	DEFAULT_PORT: 5000,
	DEFAULT_HOST: "localhost",

	// Client Configuration
	DEFAULT_CLIENT_PORT: 3000,
	DEFAULT_CLIENT_HOST: "localhost",

	// WebSocket Configuration
	DEFAULT_WS_RECONNECT_INTERVAL: 5000,
	DEFAULT_WS_HEARTBEAT_INTERVAL: 30000,
	DEFAULT_WS_MAX_RECONNECT_ATTEMPTS: 10,

	// API Configuration
	DEFAULT_API_TIMEOUT: 30000, // 30 seconds
	DEFAULT_RATE_LIMIT: 100, // requests per minute

	// Irrigation Configuration
	DEFAULT_IRRIGATION_DURATION: 60, // seconds
	MAX_IRRIGATION_DURATION: 3600, // 1 hour in seconds
	MIN_IRRIGATION_DURATION: 1, // 1 second

	// Moisture Configuration
	DEFAULT_MOISTURE_THRESHOLD: 60,
	MIN_MOISTURE_THRESHOLD: 0,
	MAX_MOISTURE_THRESHOLD: 100,

	// Water Usage Configuration
	DEFAULT_WATER_USAGE_THRESHOLD: 5000, // ml
	WATER_ML_TO_LITERS: 1000, // conversion factor

	// Time Configuration
	SECONDS_PER_MINUTE: 60,
	MINUTES_PER_HOUR: 60,
	HOURS_PER_DAY: 24,
	MILLISECONDS_PER_SECOND: 1000,

	// Analytics Configuration
	DEFAULT_ANALYTICS_PERIOD: "7d",
	DEFAULT_EFFICIENCY_DAYS: 30,

	// UI Configuration
	DEFAULT_PAGE_SIZE: 10,
	MAX_PAGE_SIZE: 100,
	DEFAULT_THEME: "light",

	// Error Handling
	DEFAULT_MAX_RETRIES: 3,
	DEFAULT_RETRY_DELAY: 1000,

	// Application Configuration
	DEFAULT_APP_NAME: "Smart Irrigation System",
	DEFAULT_APP_VERSION: "1.0.0",
} as const;

// Environment-specific configurations
export const ENV_CONFIG = {
	development: {
		enableDebugLogging: true,
		enableMockData: true,
		enableRealTime: true,
	},
	production: {
		enableDebugLogging: false,
		enableMockData: false,
		enableRealTime: true,
	},
	test: {
		enableDebugLogging: false,
		enableMockData: true,
		enableRealTime: false,
	},
} as const;

// API Response Messages
export const API_MESSAGES = {
	SUCCESS: {
		IRRIGATION_STARTED: "Irrigation started successfully",
		IRRIGATION_STOPPED: "Irrigation stopped successfully",
		MODE_CHANGED: "Mode changed successfully",
		CONFIG_UPDATED: "Configuration updated successfully",
		BULK_OPERATION_COMPLETED: "Bulk operation completed successfully",
	},
	ERROR: {
		AUTHENTICATION_REQUIRED: "Authentication required",
		FARM_ACCESS_REQUIRED: "Farm access required",
		ACCESS_DENIED: "Access denied",
		SECTION_NOT_FOUND: "Section not found",
		INVALID_DURATION: "Invalid irrigation duration",
		INVALID_MODE: "Invalid mode specified",
		MQTT_COMMAND_FAILED: "MQTT command failed",
		DATABASE_ERROR: "Database operation failed",
		VALIDATION_ERROR: "Validation error",
		NETWORK_ERROR: "Network error",
		TIMEOUT_ERROR: "Request timeout",
	},
} as const;

// HTTP Status Codes
export const HTTP_STATUS = {
	OK: 200,
	CREATED: 201,
	NO_CONTENT: 204,
	BAD_REQUEST: 400,
	UNAUTHORIZED: 401,
	FORBIDDEN: 403,
	NOT_FOUND: 404,
	CONFLICT: 409,
	UNPROCESSABLE_ENTITY: 422,
	INTERNAL_SERVER_ERROR: 500,
	SERVICE_UNAVAILABLE: 503,
} as const;

// WebSocket Event Types
export const WS_EVENTS = {
	CONNECT: "connect",
	DISCONNECT: "disconnect",
	ERROR: "error",
	MESSAGE: "message",
	SECTION_UPDATE: "section_update",
	DEVICE_STATUS: "device_status",
	MOISTURE_UPDATE: "moisture_update",
	IRRIGATION_EVENT: "irrigation_event",
} as const;

// UI Constants
export const UI_CONSTANTS = {
	BREAKPOINTS: {
		MOBILE: 768,
		TABLET: 1024,
		DESKTOP: 1200,
	},
	ANIMATION_DURATION: {
		FAST: 150,
		NORMAL: 300,
		SLOW: 500,
	},
	Z_INDEX: {
		DROPDOWN: 1000,
		MODAL: 2000,
		TOOLTIP: 3000,
		NOTIFICATION: 4000,
	},
} as const;

// Validation Rules
export const VALIDATION_RULES = {
	EMAIL: {
		PATTERN: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
		MESSAGE: "Please enter a valid email address",
	},
	PASSWORD: {
		MIN_LENGTH: 8,
		PATTERN: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
		MESSAGE:
			"Password must contain at least 8 characters, one uppercase, one lowercase, one number, and one special character",
	},
	FARM_NAME: {
		MIN_LENGTH: 2,
		MAX_LENGTH: 100,
		PATTERN: /^[a-zA-Z0-9\s\-_]+$/,
		MESSAGE:
			"Farm name must be 2-100 characters and contain only letters, numbers, spaces, hyphens, and underscores",
	},
	SECTION_NUMBER: {
		MIN: 1,
		MAX: 999,
		MESSAGE: "Section number must be between 1 and 999",
	},
} as const;

// Time Intervals (in milliseconds)
export const TIME_INTERVALS = {
	SECOND: 1000,
	MINUTE: 60 * 1000,
	HOUR: 60 * 60 * 1000,
	DAY: 24 * 60 * 60 * 1000,
	WEEK: 7 * 24 * 60 * 60 * 1000,
	MONTH: 30 * 24 * 60 * 60 * 1000,
	YEAR: 365 * 24 * 60 * 60 * 1000,
} as const;

// Analytics Periods
export const ANALYTICS_PERIODS = {
	"1d": { interval: "1 hour", days: 1 },
	"7d": { interval: "1 day", days: 7 },
	"30d": { interval: "1 day", days: 30 },
	"90d": { interval: "1 week", days: 90 },
	"1y": { interval: "1 month", days: 365 },
} as const;

// Irrigation Modes
export const IRRIGATION_MODES = {
	AUTO: "auto",
	MANUAL: "manual",
} as const;

// Device Types
export const DEVICE_TYPES = {
	IRRIGATION_CONTROLLER: "irrigation_controller",
	MOISTURE_SENSOR: "moisture_sensor",
} as const;

// Status Types
export const STATUS_TYPES = {
	ONLINE: "online",
	OFFLINE: "offline",
	ERROR: "error",
	MAINTENANCE: "maintenance",
} as const;

// Theme Types
export const THEME_TYPES = {
	LIGHT: "light",
	DARK: "dark",
	SYSTEM: "system",
} as const;

// Local Storage Keys
export const STORAGE_KEYS = {
	AUTH_TOKEN: "auth_token",
	REFRESH_TOKEN: "refresh_token",
	USER_PREFERENCES: "user_preferences",
	THEME: "theme",
	LANGUAGE: "language",
} as const;
