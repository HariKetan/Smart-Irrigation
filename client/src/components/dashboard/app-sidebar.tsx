"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
	LayoutDashboard,
	Settings,
	Users,
	FileText,
	BarChart,
	LogOut,
	Menu,
	MapPin,
	Droplets,
} from "lucide-react";
import { SidebarTrigger, useSidebar } from "@/components/ui/sidebar";
import { useAuth } from "@/contexts/AuthContext";
import { useMobile } from "@/hooks/use-mobile";
import { Button } from "@/components/ui/button";

const sidebarLinks = [
	{
		title: "Dashboard",
		href: "/dashboard",
		icon: LayoutDashboard,
	},
	{
		title: "Farm Map",
		href: "/map",
		icon: MapPin,
	},
	{
		title: "Analytics",
		href: "/analytics",
		icon: BarChart,
	},
	{
		title: "Water Report",
		href: "/water-report",
		icon: Droplets,
	}
];

export function AppSidebar() {
	const pathname = usePathname();
	const { isCollapsed, setIsCollapsed } = useSidebar();
	const { logout } = useAuth();
	const isMobile = useMobile();

	// Close sidebar when clicking outside on mobile
	const handleClickOutside = (e: React.MouseEvent) => {
		if (isMobile && !isCollapsed) {
			const target = e.target as HTMLElement;
			if (!target.closest(".sidebar-content")) {
				setIsCollapsed(true);
			}
		}
	};

	if (isMobile) {
		return (
			<>
				{/* Floating Hamburger Button */}
				<Button
					variant="outline"
					size="icon"
					className={cn(
						"fixed top-20 left-4 z-50 rounded-full shadow-md bg-background transition-opacity duration-300",
						isCollapsed ? "opacity-100" : "opacity-0 pointer-events-none"
					)}
					onClick={() => setIsCollapsed(!isCollapsed)}
				>
					<Menu className="h-4 w-4" />
				</Button>

				{/* Mobile Sidebar Overlay */}
				<div
					className={cn(
						"fixed inset-0 bg-background/80 backdrop-blur-sm transition-opacity duration-300",
						!isCollapsed ? "opacity-100 z-40" : "opacity-0 pointer-events-none"
					)}
					onClick={handleClickOutside}
				>
					<div
						className={cn(
							"sidebar-content fixed top-15 left-0 h-[calc(100vh-3.75rem)] flex flex-col border-r bg-background transition-all duration-300",
							"w-64",
							!isCollapsed ? "translate-x-0" : "-translate-x-full"
						)}
					>
						{/* <div className="flex h-14 items-center border-b px-4">
              <SidebarTrigger className="-ml-1" />
            </div> */}
						<div className="flex-1 overflow-auto py-2">
							<nav className="grid items-start px-2 text-sm font-medium">
								{sidebarLinks.map((link) => {
									const Icon = link.icon;
									return (
										<Link
											key={link.href}
											href={link.href}
											className={cn(
												"flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary hover:bg-muted/50",
												pathname === link.href && "bg-muted text-primary"
											)}
											onClick={() => setIsCollapsed(true)}
										>
											<Icon className="h-4 w-4" />
											<span>{link.title}</span>
										</Link>
									);
								})}
							</nav>
						</div>
					</div>
				</div>
			</>
		);
	}

	return (
		<div
			className={cn(
				"sticky top-0 flex h-screen flex-col border-r bg-background transition-all duration-300",
				isCollapsed ? "w-16" : "w-64"
			)}
		>
			<div className="flex-1 overflow-auto py-2">
				<nav className="grid items-start px-2 text-sm font-medium">
					{sidebarLinks.map((link) => {
						const Icon = link.icon;
						return (
							<Link
								key={link.href}
								href={link.href}
								className={cn(
									"flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary hover:bg-muted/50",
									pathname === link.href && "bg-muted text-primary",
									isCollapsed && "justify-center"
								)}
							>
								<Icon className="h-4 w-4" />
								{!isCollapsed && <span>{link.title}</span>}
							</Link>
						);
					})}
				</nav>
			</div>
		</div>
	);
}
