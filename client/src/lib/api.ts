import { getTokenFromCookie } from "./auth";
import { apiConfig } from "./config";
import type {
	User,
	Section,
	MoistureReading,
	IrrigationEvent,
	MoistureDeviceStatus,
	IrrigationDeviceStatus,
	SectionUsage,
	PaginatedResponse,
	ApiResponse,
	LoginCredentials,
	RegisterData,
} from "@/types";

export function getApiBaseUrl() {
	return apiConfig.url;
}

// Get current user's farm IDs from auth context or localStorage
export function getCurrentUserFarmIds(): number[] {
	if (typeof window === "undefined") return [1]; // SSR fallback

	try {
		const userData = localStorage.getItem("user");
		if (userData) {
			const user = JSON.parse(userData);
			return user.farm_ids || [1];
		}
	} catch (error) {
		console.error("Error parsing user data:", error);
	}

	return [1]; // Default fallback
}

// Get current user data
export function getCurrentUser(): User | null {
	if (typeof window === "undefined") return null;

	try {
		const userData = localStorage.getItem("user");
		return userData ? JSON.parse(userData) : null;
	} catch (error) {
		console.error("Error parsing user data:", error);
		return null;
	}
}

// API client with automatic farm_id inclusion
export class ApiClient {
	private baseUrl: string;
	private token: string | null;

	constructor() {
		this.baseUrl = apiConfig.url;
		this.token = getTokenFromCookie();
	}

	// Method to refresh token (call this when token might have changed)
	refreshToken() {
		this.token = getTokenFromCookie();
	}

	private async request<T>(
		endpoint: string,
		options: RequestInit = {},
		includeFarmId: boolean = true
	): Promise<T> {
		// Refresh token before each request
		this.refreshToken();

		const url = `${this.baseUrl}${endpoint}`;

		// Add farm_id to query params if needed
		let finalUrl = url;
		if (includeFarmId && !url.includes("farm_id=")) {
			const farmIds = getCurrentUserFarmIds();
			if (farmIds.length > 0) {
				const separator = url.includes("?") ? "&" : "?";
				finalUrl = `${url}${separator}farm_id=${farmIds[0]}`;
			}
		}

		const headers: Record<string, string> = {
			"Content-Type": "application/json",
			...(options.headers as Record<string, string>),
		};

		if (this.token) {
			headers["Authorization"] = `Bearer ${this.token}`;
			// Debug logging only in development
			if (process.env.NODE_ENV === "development") {
				console.log("🔐 API Debug:", {
					endpoint,
					hasToken: !!this.token,
					tokenLength: this.token.length,
					farmIds: getCurrentUserFarmIds(),
				});
			}
		} else {
			if (process.env.NODE_ENV === "development") {
				console.log("⚠️ API Debug: No token found for endpoint:", endpoint);
			}
		}

		const response = await fetch(finalUrl, {
			...options,
			headers,
		});

		if (!response.ok) {
			const errorData = await response.json().catch(() => ({}));
			const errorMessage =
				typeof errorData === "object" && errorData && "error" in errorData
					? String(errorData.error)
					: `HTTP error! status: ${response.status}`;
			throw new Error(errorMessage);
		}

		return response.json();
	}

	// GET request
	async get<T>(endpoint: string, includeFarmId: boolean = true): Promise<T> {
		return this.request<T>(endpoint, { method: "GET" }, includeFarmId);
	}

	// POST request
	async post<T>(
		endpoint: string,
		data: any,
		includeFarmId: boolean = true
	): Promise<T> {
		return this.request<T>(
			endpoint,
			{
				method: "POST",
				body: JSON.stringify(data),
			},
			includeFarmId
		);
	}

	// PUT request
	async put<T>(
		endpoint: string,
		data: any,
		includeFarmId: boolean = true
	): Promise<T> {
		return this.request<T>(
			endpoint,
			{
				method: "PUT",
				body: JSON.stringify(data),
			},
			includeFarmId
		);
	}

	// PATCH request
	async patch<T>(
		endpoint: string,
		data: any,
		includeFarmId: boolean = true
	): Promise<T> {
		return this.request<T>(
			endpoint,
			{
				method: "PATCH",
				body: JSON.stringify(data),
			},
			includeFarmId
		);
	}

	// DELETE request
	async delete<T>(endpoint: string, includeFarmId: boolean = true): Promise<T> {
		return this.request<T>(endpoint, { method: "DELETE" }, includeFarmId);
	}
}

// Export singleton instance
export const apiClient = new ApiClient();

// Convenience functions for common API calls
export const api = {
	// Sections
	getSections: (): Promise<Section[]> =>
		apiClient.get<Section[]>("/api/sections", false),

	getSection: (farmId: number, sectionNumber: number): Promise<Section> =>
		apiClient.get<Section>(`/api/sections/${farmId}/${sectionNumber}`, false),

	toggleValve: (
		farmId: number,
		sectionNumber: number,
		data: { valveOpen: boolean; duration?: number }
	): Promise<ApiResponse<any>> =>
		apiClient.post<ApiResponse<any>>(
			`/api/sections/${farmId}/${sectionNumber}/valve`,
			data
		),

	// Section control
	startIrrigation: (
		farmId: number,
		sectionNumber: number,
		duration: number = 60
	): Promise<ApiResponse<any>> =>
		apiClient.post<ApiResponse<any>>(
			`/api/sections/${farmId}/${sectionNumber}/irrigate`,
			{ duration }
		),

	stopIrrigation: (
		farmId: number,
		sectionNumber: number
	): Promise<ApiResponse<any>> =>
		apiClient.post<ApiResponse<any>>(
			`/api/sections/${farmId}/${sectionNumber}/stop`,
			{}
		),

	setMode: (
		farmId: number,
		sectionNumber: number,
		mode: string
	): Promise<ApiResponse<any>> =>
		apiClient.post<ApiResponse<any>>(
			`/api/sections/${farmId}/${sectionNumber}/mode`,
			{
				mode,
			}
		),

	updateConfig: (
		farmId: number,
		sectionNumber: number,
		config: {
			min_threshold?: number;
			max_threshold?: number;
			enable_deep_sleep?: boolean;
			deep_sleep_duration?: number;
			reporting_interval?: number;
		}
	): Promise<ApiResponse<any>> =>
		apiClient.put<ApiResponse<any>>(
			`/api/sections/${farmId}/${sectionNumber}/config`,
			config
		),

	updateReportingInterval: (
		farmId: number,
		sectionNumber: number,
		interval: number
	): Promise<ApiResponse<any>> =>
		apiClient.put<ApiResponse<any>>(
			`/api/sections/${farmId}/${sectionNumber}/config`,
			{ reporting_interval: interval }
		),

	// Bulk operations
	bulkIrrigate: (
		sectionNumbers: number[],
		duration: number = 60
	): Promise<ApiResponse<any>> => {
		const sections = sectionNumbers.map((sectionNumber) => ({ sectionNumber }));
		return apiClient.post<ApiResponse<any>>(
			"/api/devices/bulk/irrigate",
			{
				sections,
				duration,
			},
			false
		);
	},

	bulkStopIrrigation: (sectionNumbers: number[]): Promise<ApiResponse<any>> => {
		const sections = sectionNumbers.map((sectionNumber) => ({ sectionNumber }));
		return apiClient.post<ApiResponse<any>>(
			"/api/devices/bulk/stop",
			{
				sections,
			},
			false
		);
	},

	bulkSetMode: (
		sectionNumbers: number[],
		mode: string
	): Promise<ApiResponse<any>> => {
		const sections = sectionNumbers.map((sectionNumber) => ({ sectionNumber }));
		return apiClient.post<ApiResponse<any>>(
			"/api/devices/bulk/mode",
			{
				sections,
				mode,
			},
			false
		);
	},

	bulkUpdateConfig: (
		sectionNumbers: number[],
		config: any
	): Promise<ApiResponse<any>> => {
		const sections = sectionNumbers.map((sectionNumber) => ({ sectionNumber }));
		return apiClient.post<ApiResponse<any>>(
			"/api/devices/bulk/config",
			{
				sections,
				config,
			},
			false
		);
	},

	// Moisture readings
	getMoistureReadings: (params?: {
		farm_id?: number;
		section_number?: number;
		page?: number;
		limit?: number;
	}): Promise<PaginatedResponse<MoistureReading>> =>
		apiClient.get<PaginatedResponse<MoistureReading>>(
			`/api/analytics/moisture-readings${
				params ? "?" + new URLSearchParams(params as any).toString() : ""
			}`,
			false
		),

	getLatestMoistureReadings: (
		sectionNumber?: number
	): Promise<MoistureReading[]> => {
		const params = new URLSearchParams();
		if (sectionNumber) params.append("sectionNumber", sectionNumber.toString());
		return apiClient.get<MoistureReading[]>(
			`/api/analytics/moisture-readings/latest${
				params.toString() ? "?" + params.toString() : ""
			}`,
			false
		);
	},

	// Irrigation events
	getIrrigationEvents: (params?: {
		farm_id?: number;
		section_number?: number;
		page?: number;
		limit?: number;
	}): Promise<PaginatedResponse<IrrigationEvent>> =>
		apiClient.get<PaginatedResponse<IrrigationEvent>>(
			`/api/analytics/irrigation-events${
				params ? "?" + new URLSearchParams(params as any).toString() : ""
			}`,
			false
		),

	getSectionUsage: (days: number = 7): Promise<SectionUsage[]> =>
		apiClient.get<SectionUsage[]>(
			`/api/analytics/irrigation-events/section-usage?days=${days}`,
			false
		),

	getDailyUsage: (days: number = 7, sectionNumber?: number): Promise<any> => {
		const params = new URLSearchParams({ days: days.toString() });
		if (sectionNumber)
			params.append("sectionNumber", sectionNumber.toString());
		return apiClient.get<any>(
			`/api/analytics/irrigation-events/daily-usage?${params}`,
			false
		);
	},

	// Device status
	getIrrigationDeviceStatus: (params?: {
		farm_id?: number;
		sectionNumber?: number;
	}): Promise<IrrigationDeviceStatus[]> =>
		apiClient.get<IrrigationDeviceStatus[]>(
			`/api/devices/irrigation/status${
				params ? "?" + new URLSearchParams(params as any).toString() : ""
			}`,
			false
		),

	getMoistureDeviceStatus: (params?: {
		farm_id?: number;
		sectionNumber?: number;
	}): Promise<MoistureDeviceStatus[]> =>
		apiClient.get<MoistureDeviceStatus[]>(
			`/api/devices/moisture/status${
				params ? "?" + new URLSearchParams(params as any).toString() : ""
			}`,
			false
		),

	getSectionReadings: (farmId: number, sectionNumber: number): Promise<any> =>
		apiClient.get<any>(
			`/api/sections/${farmId}/${sectionNumber}/readings`,
			false
		),

	getDeviceStatus: (farmId: number, sectionNumber: number): Promise<any> =>
		apiClient.get<any>(
			`/api/sections/${farmId}/${sectionNumber}/device-status`,
			false
		),

	// Analytics
	getAnalytics: (
		period: string = "7d",
		sectionNumber?: number
	): Promise<any> => {
		const params = new URLSearchParams({ period });
		if (sectionNumber) params.append("sectionNumber", sectionNumber.toString());
		return apiClient.get<any>(`/api/analytics?${params}`, false);
	},

	getWaterUsageAnalytics: (
		period: string = "7d",
		sectionNumber?: number
	): Promise<any> => {
		const params = new URLSearchParams({ period });
		if (sectionNumber) params.append("sectionNumber", sectionNumber.toString());
		return apiClient.get<any>(`/api/analytics/water-usage?${params}`, false);
	},

	getMoistureTrends: (
		period: string = "7d",
		sectionNumber?: number
	): Promise<any> => {
		const params = new URLSearchParams({ period });
		if (sectionNumber) params.append("sectionNumber", sectionNumber.toString());
		return apiClient.get<any>(
			`/api/analytics/moisture-trends?${params}`,
			false
		);
	},

	getEfficiencyReport: (days: number = 30): Promise<any> =>
		apiClient.get<any>(`/api/analytics/efficiency?days=${days}`, false),

	// Analytics summary functions
	getAnalyticsSummary: (period: number = 7): Promise<any> =>
		apiClient.get<any>(`/api/analytics/summary?days=${period}`, false),

	getValveActivityAnalytics: (period: number = 7): Promise<any> =>
		apiClient.get<any>(`/api/analytics/valve-activity?days=${period}`, false),

	getMoistureTrendsAnalytics: (period: number = 7): Promise<any> =>
		apiClient.get<any>(`/api/analytics/moisture-trends?days=${period}`, false),

	// Farms
	getFarms: (): Promise<any[]> => apiClient.get<any[]>("/api/farms", false),
	getFarm: (id: number): Promise<any> =>
		apiClient.get<any>(`/api/farms/${id}`, false),

	// Auth
	login: (
		credentials: LoginCredentials
	): Promise<{ token: string; user: User }> =>
		apiClient.post<{ token: string; user: User }>(
			"/api/auth/login",
			credentials,
			false
		),

	register: (userData: RegisterData): Promise<{ token: string; user: User }> =>
		apiClient.post<{ token: string; user: User }>(
			"/api/auth/register",
			userData,
			false
		),

	getProfile: (): Promise<User> => apiClient.get<User>("/api/auth/me", false),
};
