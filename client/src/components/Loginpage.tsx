"use client";

import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
	CardFooter,
} from "@/components/ui/card";
import { toast } from "sonner";
import Link from "next/link";
import { api } from "@/lib/api";
import type { LoginCredentials } from "@/types";
import { Navbar } from "@/components/Navbar";

export default function LoginPage() {
	const [credentials, setCredentials] = useState<LoginCredentials>({
		email: "",
		password: "",
	});
	const [isLoading, setIsLoading] = useState(false);
	const { login } = useAuth();

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setIsLoading(true);

		try {
			const response = await api.login(credentials);
			login(response.token, response.user);
			toast.success("Successfully logged in!", {
				description: "Welcome back to your account",
			});
		} catch (error) {
			console.error("Login error:", error);
			toast.error("Login failed", {
				description:
					error instanceof Error
						? error.message
						: "Please check your credentials and try again",
			});
		} finally {
			setIsLoading(false);
		}
	};

	const handleInputChange =
		(field: keyof LoginCredentials) =>
		(e: React.ChangeEvent<HTMLInputElement>) => {
			setCredentials((prev) => ({
				...prev,
				[field]: e.target.value,
			}));
		};

	return (
		<div className="flex flex-col min-h-screen">
			<Navbar />
			<div className="flex flex-1 items-center justify-center">
			<Card className="w-[350px]">
				<CardHeader>
					<CardTitle>Login</CardTitle>
					<CardDescription>
						Enter your credentials to access your account
					</CardDescription>
				</CardHeader>
				<CardContent>
					<form onSubmit={handleSubmit} className="space-y-4">
						<div className="space-y-2">
							<label htmlFor="email" className="text-sm font-medium">
								Email
							</label>
							<Input
								id="email"
								type="email"
								placeholder="Enter your email"
								value={credentials.email}
								onChange={handleInputChange("email")}
								required
								disabled={isLoading}
							/>
						</div>
						<div className="space-y-2">
							<label htmlFor="password" className="text-sm font-medium">
								Password
							</label>
							<Input
								id="password"
								type="password"
								placeholder="Enter your password"
								value={credentials.password}
								onChange={handleInputChange("password")}
								required
								disabled={isLoading}
							/>
						</div>
						<Button type="submit" className="w-full" disabled={isLoading}>
							{isLoading ? "Logging in..." : "Login"}
						</Button>
					</form>
				</CardContent>
				<CardFooter className="flex justify-center">
					<p className="text-sm text-muted-foreground">
						Don't have an account?{" "}
						<Link href="/register" className="text-primary hover:underline">
							Register here
						</Link>
					</p>
				</CardFooter>
			</Card>
			</div>
		</div>
	);
}
