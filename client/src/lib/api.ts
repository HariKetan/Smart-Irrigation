/**
 * Utility function to get the API base URL
 * Automatically detects the server URL based on current location
 */
export function getApiBaseUrl(): string {
  // If environment variable is set, use it
  if (process.env.NEXT_PUBLIC_API_BASE_URL) {
    console.log('Using environment API URL:', process.env.NEXT_PUBLIC_API_BASE_URL)
    return process.env.NEXT_PUBLIC_API_BASE_URL
  }
  
  // Auto-detect based on current location
  const currentHost = typeof window !== 'undefined' ? window.location.hostname : 'localhost'
  const serverPort = '3001'
  const autoDetectedUrl = `http://${currentHost}:${serverPort}`
  
  console.log('Auto-detected API URL:', autoDetectedUrl)
  console.log('Current hostname:', currentHost)
  
  return autoDetectedUrl
}

/**
 * Helper function to make API requests
 */
export async function apiRequest(endpoint: string, options: RequestInit = {}) {
  const baseUrl = getApiBaseUrl()
  const url = `${baseUrl}${endpoint}`
  
  console.log('Making API request to:', url)
  
  const response = await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  })
  
  if (!response.ok) {
    const error = await response.json().catch(() => ({ error: 'Network error' }))
    throw new Error(error.error || `HTTP ${response.status}`)
  }
  
  return response.json()
} 