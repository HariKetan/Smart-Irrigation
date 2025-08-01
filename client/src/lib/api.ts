import { getTokenFromCookie } from './auth';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

export function getApiBaseUrl() {
  return API_BASE_URL;
}

// Get current user's farm IDs from auth context or localStorage
export function getCurrentUserFarmIds(): number[] {
  if (typeof window === 'undefined') return [1]; // SSR fallback
  
  try {
    const userData = localStorage.getItem('user');
    if (userData) {
      const user = JSON.parse(userData);
      return user.farm_ids || [1];
    }
  } catch (error) {
    console.error('Error parsing user data:', error);
  }
  
  return [1]; // Default fallback
}

// Get current user data
export function getCurrentUser(): any | null {
  if (typeof window === 'undefined') return null;
  
  try {
    const userData = localStorage.getItem('user');
    return userData ? JSON.parse(userData) : null;
  } catch (error) {
    console.error('Error parsing user data:', error);
    return null;
  }
}

// API client with automatic farm_id inclusion
export class ApiClient {
  private baseUrl: string;
  private token: string | null;

  constructor() {
    this.baseUrl = API_BASE_URL;
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
    if (includeFarmId && !url.includes('farm_id=')) {
      const farmIds = getCurrentUserFarmIds();
      const separator = url.includes('?') ? '&' : '?';
      finalUrl = `${url}${separator}farm_id=${farmIds[0]}`;
    }

    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      ...(options.headers as Record<string, string>),
    };

    if (this.token) {
      headers['Authorization'] = `Bearer ${this.token}`;
      console.log('🔐 API Debug:', {
        endpoint,
        hasToken: !!this.token,
        tokenLength: this.token.length,
        farmIds: getCurrentUserFarmIds()
      });
    } else {
      console.log('⚠️ API Debug: No token found for endpoint:', endpoint);
    }

    const response = await fetch(finalUrl, {
      ...options,
      headers,
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
    }

    return response.json();
  }

  // GET request
  async get<T>(endpoint: string, includeFarmId: boolean = true): Promise<T> {
    return this.request<T>(endpoint, { method: 'GET' }, includeFarmId);
  }

  // POST request
  async post<T>(endpoint: string, data: any, includeFarmId: boolean = true): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'POST',
      body: JSON.stringify(data),
    }, includeFarmId);
  }

  // PUT request
  async put<T>(endpoint: string, data: any, includeFarmId: boolean = true): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'PUT',
      body: JSON.stringify(data),
    }, includeFarmId);
  }

  // PATCH request
  async patch<T>(endpoint: string, data: any, includeFarmId: boolean = true): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'PATCH',
      body: JSON.stringify(data),
    }, includeFarmId);
  }

  // DELETE request
  async delete<T>(endpoint: string, includeFarmId: boolean = true): Promise<T> {
    return this.request<T>(endpoint, { method: 'DELETE' }, includeFarmId);
  }
}

// Export singleton instance
export const apiClient = new ApiClient();

// Convenience functions for common API calls
export const api = {
  // Sections
  getSections: (farmId?: number) => 
    apiClient.get(`/api/real/sections${farmId ? `?farm_id=${farmId}` : ''}`, false),
  
  getSection: (farmId: number, sectionNumber: number) => 
    apiClient.get(`/api/real/sections/${farmId}/${sectionNumber}`, false),
  
  toggleValve: (farmId: number, sectionNumber: number, data: { valveOpen: boolean; duration?: number }) =>
    apiClient.post(`/api/real/sections/${farmId}/${sectionNumber}/valve`, data, false),

  // Section control
  startIrrigation: (farmId: number, sectionNumber: number, duration: number = 60) =>
    apiClient.post(`/api/real/${farmId}/${sectionNumber}/irrigate`, {
      duration
    }, false),

  stopIrrigation: (farmId: number, sectionNumber: number) =>
    apiClient.post(`/api/real/${farmId}/${sectionNumber}/stop-irrigation`, {}, false),

  setMode: (farmId: number, sectionNumber: number, mode: string) =>
    apiClient.post(`/api/real/sections/${farmId}/${sectionNumber}/mode`, {
      mode
    }, false),

  updateConfig: (farmId: number, sectionNumber: number, config: {
    threshold?: number;
    min_threshold?: number;
    max_threshold?: number;
    enable_deep_sleep?: boolean;
    deep_sleep_duration?: number;
    reporting_interval?: number;
  }) =>
    apiClient.put(`/api/real/${farmId}/${sectionNumber}/config`, config, false),

  // Bulk operations
  bulkIrrigate: (sections: {farmId: number, sectionNumber: number}[], duration: number = 60) =>
    apiClient.post('/api/real/sections/bulk/irrigate', {
      sections,
      duration
    }, false),

  bulkStopIrrigation: (sections: {farmId: number, sectionNumber: number}[]) =>
    apiClient.post('/api/real/sections/bulk/stop-irrigation', {
      sections
    }, false),

  bulkSetMode: (sections: {farmId: number, sectionNumber: number}[], mode: string) =>
    apiClient.post('/api/real/sections/bulk/mode', {
      sections,
      mode
    }, false),

  bulkUpdateConfig: (sectionIds: number[], config: any, farmId?: number) =>
    apiClient.post('/api/real/sections/bulk/config', {
      sectionIds,
      config,
      farm_id: farmId || getCurrentUserFarmIds()[0]
    }, false),

  // Scheduling API methods
  getSchedules: (farmId?: number) =>
    apiClient.get(`/api/scheduling${farmId ? `?farm_id=${farmId}` : ''}`, false),

  createSchedule: (scheduleData: any, farmId?: number) =>
    apiClient.post('/api/scheduling', {
      ...scheduleData,
      farm_id: farmId || getCurrentUserFarmIds()[0]
    }, false),

  getSchedule: (scheduleId: string) =>
    apiClient.get(`/api/scheduling/${scheduleId}`, false),

  updateSchedule: (scheduleId: string, scheduleData: any) =>
    apiClient.put(`/api/scheduling/${scheduleId}`, scheduleData, false),

  deleteSchedule: (scheduleId: string) =>
    apiClient.delete(`/api/scheduling/${scheduleId}`, false),

  toggleSchedule: (scheduleId: string) =>
    apiClient.patch(`/api/scheduling/${scheduleId}/toggle`, {}, false),

  getScheduledIrrigations: (scheduleId: string, options?: any) =>
    apiClient.get(`/api/scheduling/${scheduleId}/irrigations${options ? '?' + new URLSearchParams(options).toString() : ''}`, false),

  executeScheduledIrrigation: (scheduleId: string, sectionId: number, scheduledTime: string) =>
    apiClient.post(`/api/scheduling/${scheduleId}/execute`, {
      sectionId,
      scheduledTime
    }, false),

  getUpcomingIrrigations: (hours?: number, farmId?: number) =>
    apiClient.get(`/api/scheduling/upcoming/irrigations${hours ? `?hours=${hours}` : ''}${farmId ? `&farm_id=${farmId}` : ''}`, false),

  getScheduleStats: (days?: number, farmId?: number) =>
    apiClient.get(`/api/scheduling/stats/overview${days ? `?days=${days}` : ''}${farmId ? `&farm_id=${farmId}` : ''}`, false),

  // Cron service control
  getCronStatus: () => apiClient.get('/api/scheduling/cron/status', false),
  startCronService: () => apiClient.post('/api/scheduling/cron/start', {}, false),
  stopCronService: () => apiClient.post('/api/scheduling/cron/stop', {}, false),
  triggerCronManually: () => apiClient.post('/api/scheduling/cron/trigger', {}, false),

  // Moisture readings
  getMoistureReadings: (params?: { farm_id?: number; section_number?: number; page?: number; limit?: number }) =>
    apiClient.get(`/api/real/moisture-readings${params ? '?' + new URLSearchParams(params as any).toString() : ''}`, false),
  
  getLatestMoistureReadings: () =>
    apiClient.get('/api/real/moisture-readings/latest', false),
  
  // Irrigation events
  getIrrigationEvents: (params?: { farm_id?: number; section_number?: number; page?: number; limit?: number }) =>
    apiClient.get(`/api/real/irrigation-events${params ? '?' + new URLSearchParams(params as any).toString() : ''}`, false),
  
  getSectionUsage: (days: number = 7) =>
    apiClient.get(`/api/real/irrigation-events/section-usage?days=${days}`, false),
  
  getDailyUsage: (days: number = 7, sectionNumber?: number) => {
    const params = new URLSearchParams({ days: days.toString() });
    if (sectionNumber) params.append('section_number', sectionNumber.toString());
    return apiClient.get(`/api/real/irrigation-events/daily-usage?${params}`, false);
  },
  
  // Device status
  getIrrigationDeviceStatus: (params?: { farm_id?: number; section_number?: number }) =>
    apiClient.get(`/api/real/device-status/irrigation${params ? '?' + new URLSearchParams(params as any).toString() : ''}`, false),
  
  getMoistureDeviceStatus: (params?: { farm_id?: number; section_number?: number }) =>
    apiClient.get(`/api/real/device-status/moisture${params ? '?' + new URLSearchParams(params as any).toString() : ''}`, false),
  
  getSectionReadings: (farmId: number, sectionNumber: number) =>
    apiClient.get(`/api/real/sections/${farmId}/${sectionNumber}/readings`, false),

  getDeviceStatus: (farmId: number, sectionNumber: number) =>
    apiClient.get(`/api/real/sections/${farmId}/${sectionNumber}/device-status`, false),
  
  // Analytics
  getAnalyticsSummary: (period: number = 7) =>
    apiClient.get(`/api/real/analytics/summary?period=${period}`, false),
  
  // Water Usage Analytics
  getWaterUsageAnalytics: (farmId: number, period: string = '7d', sectionNumber?: number) =>
    apiClient.get(`/api/real/analytics/water-usage/${farmId}?period=${period}${sectionNumber ? `&sectionNumber=${sectionNumber}` : ''}`, false),

  getWaterEfficiencyReport: (farmId: number, days: number = 30) =>
    apiClient.get(`/api/real/analytics/efficiency/${farmId}?days=${days}`, false),

  getMoistureTrendsAnalytics: (period: number = 7) =>
    apiClient.get(`/api/real/analytics/moisture-trends?period=${period}`, false),
  
  getValveActivityAnalytics: (period: number = 7) =>
    apiClient.get(`/api/real/analytics/valve-activity?period=${period}`, false),
  
  // Farms
  getFarms: () => apiClient.get('/api/farms', false),
  getFarm: (id: number) => apiClient.get(`/api/farms/${id}`, false),
  
  // Auth
  login: (credentials: { email: string; password: string }) =>
    apiClient.post('/api/auth/login', credentials, false),
  
  register: (userData: { email: string; password: string; name?: string }) =>
    apiClient.post('/api/auth/register', userData, false),
  
  getProfile: () => apiClient.get('/api/auth/me', false),
}; 