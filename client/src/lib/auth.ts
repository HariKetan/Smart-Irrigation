// Get token from cookie
export function getTokenFromCookie(): string | null {
  if (typeof document === 'undefined') return null;
  
  const cookies = document.cookie.split(';');
  const authCookie = cookies.find(cookie => cookie.trim().startsWith('auth-token='));
  return authCookie ? authCookie.split('=')[1] : null;
}

// Set token in cookie
export function setTokenInCookie(token: string): void {
  if (typeof document === 'undefined') return;
  
  document.cookie = `auth-token=${token}; path=/; max-age=86400`; // 24 hours
}

// Remove token from cookie
export function removeTokenFromCookie(): void {
  if (typeof document === 'undefined') return;
  
  document.cookie = "auth-token=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT";
}

// Store user data in localStorage
export function storeUserData(user: any): void {
  if (typeof localStorage === 'undefined') return;
  
  localStorage.setItem('user', JSON.stringify(user));
}

// Get user data from localStorage
export function getUserData(): any | null {
  if (typeof localStorage === 'undefined') return null;
  
  try {
    const userData = localStorage.getItem('user');
    return userData ? JSON.parse(userData) : null;
  } catch (error) {
    console.error('Error parsing user data:', error);
    return null;
  }
}

// Remove user data from localStorage
export function removeUserData(): void {
  if (typeof localStorage === 'undefined') return;
  
  localStorage.removeItem('user');
} 