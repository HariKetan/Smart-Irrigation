"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { api } from "@/lib/api";
import {
	setTokenInCookie,
	removeTokenFromCookie,
	storeUserData,
	removeUserData,
} from "@/lib/auth";
import type { User, AuthContextType } from "@/types";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
	const [isAuthenticated, setIsAuthenticated] = useState(false);
	const [user, setUser] = useState<User | null>(null);
	const [isLoading, setIsLoading] = useState(true);
	const router = useRouter();

	const fetchUserProfile = async () => {
		try {
			const userData = await api.getProfile();
			setUser(userData);
			setIsAuthenticated(true);
		} catch (error) {
			console.error("Failed to fetch user profile:", error);
			// Token might be invalid, clear auth state
			logout();
		}
	};

	const getTokenFromCookie = () => {
		if (typeof document === "undefined") return null;
		const cookies = document.cookie.split(";");
		const authCookie = cookies.find((cookie) =>
			cookie.trim().startsWith("auth-token=")
		);
		return authCookie ? authCookie.split("=")[1] : null;
	};

	useEffect(() => {
		const initializeAuth = async () => {
			try {
				// Check if auth token exists
				const token = getTokenFromCookie();
				if (token) {
					// Try to fetch user profile to validate token
					await fetchUserProfile();
				}
			} catch (error) {
				console.error("Auth initialization error:", error);
				logout();
			} finally {
				setIsLoading(false);
			}
		};

		initializeAuth();
	}, []);

	const login = (token: string, userData: User) => {
		try {
			// Set auth token cookie
			setTokenInCookie(token);
			// Store user data in localStorage
			storeUserData(userData);
			setIsAuthenticated(true);
			setUser(userData);
			router.push("/dashboard");
		} catch (error) {
			console.error("Login error:", error);
			throw error;
		}
	};

	const logout = () => {
		try {
			// Remove auth token cookie
			removeTokenFromCookie();
			// Remove user data from localStorage
			removeUserData();
			setIsAuthenticated(false);
			setUser(null);
			router.push("/login");
		} catch (error) {
			console.error("Logout error:", error);
		}
	};

	// Check if token is expired (basic check)
	const isTokenExpired = (token: string): boolean => {
		try {
			const payload = JSON.parse(atob(token.split(".")[1]));
			return payload.exp * 1000 < Date.now();
		} catch {
			return true;
		}
	};

	// Refresh token if needed
	const refreshTokenIfNeeded = async () => {
		const token = getTokenFromCookie();
		if (token && isTokenExpired(token)) {
			console.log("Token expired, logging out");
			logout();
			return false;
		}
		return true;
	};

	return (
		<AuthContext.Provider
			value={{
				isAuthenticated,
				user,
				login,
				logout,
				fetchUserProfile,
				isLoading,
			}}
		>
			{children}
		</AuthContext.Provider>
	);
}

export function useAuth() {
	const context = useContext(AuthContext);
	if (context === undefined) {
		throw new Error("useAuth must be used within an AuthProvider");
	}
	return context;
}
