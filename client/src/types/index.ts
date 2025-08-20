// Core data types matching backend schema
export interface User {
	id: string;
	email: string;
	name: string;
	farm_ids: number[];
}

export interface Farm {
	id: number;
	name: string;
	location: string;
	created_at: string;
	updated_at: string;
}

export interface Section {
	id: number;
	name: string;
	farm_id: number;
	section_number: number;
	created_at: string;
	updated_at: string;
	farm?: Farm;
}

export interface MoistureReading {
	id: number;
	farm_id: number;
	section_number: number;
	value: number;
	timestamp: string;
	farm?: Farm;
	section?: Section;
}

export interface IrrigationEvent {
	id: number;
	farm_id: number;
	section_number: number;
	water_ml: number;
	start_time: string;
	end_time: string;
	farm?: Farm;
	section?: Section;
}

export interface MoistureDeviceStatus {
	id: number;
	device_id: string;
	farm_id: number;
	section_number: number;
	mqtt: boolean;
	wifi: boolean;
	uptime: number;
	timestamp: number;
	last_error: string;
	enable_deep_sleep: boolean;
	reporting_interval: number;
	deep_sleep_duration: number;
	created_at: string;
	farm?: Farm;
	section?: Section;
}

export interface IrrigationDeviceStatus {
	id: number;
	device_id: string;
	farm_id: number;
	section_number: number;
	uptime: number;
	wifi: number;
	mqtt: number;
	last_error: string;
	valve_on: number;
	mode: string;
	latest_moisture: number;
	threshold: number;
	pulse_count: number;
	water_ml: number;
	timestamp: number;
	created_at: string;
	farm?: Farm;
	section?: Section;
}

export interface DeviceAck {
	id: number;
	device_id: string;
	farm_id: number;
	section_number: number;
	ack_json: any;
	timestamp: string;
	farm?: Farm;
	section?: Section;
}

// UI-specific types
export interface MoistureStatus {
	status: "Critical" | "Low" | "Optimal";
	color: "destructive" | "secondary" | "default";
	bgColor: string;
}

export interface SectionWithData extends Section {
	moisture?: number;
	threshold?: number;
	waterUsed?: number;
	valveOpen: boolean;
	lastIrrigation?: string;
	mode?: string;
	deviceStatus?: MoistureDeviceStatus | IrrigationDeviceStatus;
}

export interface SectionUsage {
	section_number: number;
	water_liters: number;
	event_count: number;
	avg_duration_minutes: number;
	last_irrigation: string;
}

export interface SystemStatus {
	online: boolean;
	wifiConnected: boolean;
	mqttConnected: boolean;
	lastError: string;
}

// API Response types
export interface PaginatedResponse<T> {
	data: T[];
	pagination: {
		page: number;
		limit: number;
		total: number;
		totalPages: number;
	};
}

export interface ApiResponse<T> {
	data: T;
	message?: string;
	error?: string;
}

// Auth types
export interface AuthContextType {
	isAuthenticated: boolean;
	user: User | null;
	login: (token: string, userData: User) => void;
	logout: () => void;
	fetchUserProfile: () => Promise<void>;
	isLoading: boolean;
}

export interface LoginCredentials {
	email: string;
	password: string;
}

export interface RegisterData {
	email: string;
	password: string;
	name?: string;
}
