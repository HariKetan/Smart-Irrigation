"use client";

import { useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

interface ProtectedRouteProps {
	children: React.ReactNode;
	fallback?: React.ReactNode;
}

export function ProtectedRoute({ children, fallback }: ProtectedRouteProps) {
	const { isAuthenticated, isLoading } = useAuth();
	const router = useRouter();

	useEffect(() => {
		if (!isLoading && !isAuthenticated) {
			router.push("/login");
		}
	}, [isAuthenticated, isLoading, router]);

	if (isLoading) {
		return (
			fallback || (
				<div className="min-h-screen flex items-center justify-center">
					<div className="flex flex-col items-center space-y-4">
						<Loader2 className="h-8 w-8 animate-spin" />
						<p className="text-muted-foreground">Loading...</p>
					</div>
				</div>
			)
		);
	}

	if (!isAuthenticated) {
		return null; // Will redirect to login
	}

	return <>{children}</>;
}
