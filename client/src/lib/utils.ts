import { MoistureStatus } from "@/types";

export function cn(...classes: (string | undefined | null | false)[]) {
	return classes.filter(Boolean).join(" ");
}

export const getMoistureStatus = (
	moisture: number | null | undefined,
	minThreshold: number | null | undefined,
	maxThreshold: number | null | undefined
) => {
	const moistureValue = moisture ?? 0;

	// If thresholds are not defined, return unknown status
	if (
		minThreshold === null ||
		minThreshold === undefined ||
		maxThreshold === null ||
		maxThreshold === undefined
	) {
		return {
			status: "Unknown",
			color: "secondary",
			bgColor: "bg-gray-200 border-gray-300",
		};
	}

	if (moistureValue < minThreshold)
		return {
			status: "Critical",
			color: "destructive",
			bgColor: "bg-red-200 border-red-300",
		};
	if (moistureValue > maxThreshold)
		return {
			status: "High",
			color: "secondary",
			bgColor: "bg-yellow-100 border-orange-300",
		};
	return {
		status: "Optimal",
		color: "default",
		bgColor: "bg-emerald-200 border-emerald-400",
	};
};

export const calculateAverage = (
	numbers: (number | null | undefined)[]
): number => {
	const validNumbers = numbers.filter(
		(num) => num !== null && num !== undefined && !isNaN(num)
	) as number[];
	if (validNumbers.length === 0) return 0;
	return Math.round(
		validNumbers.reduce((sum, num) => sum + num, 0) / validNumbers.length
	);
};

export const formatNumber = (num: number | null | undefined): string => {
	if (num === null || num === undefined || isNaN(num)) {
		return "0";
	}
	return num.toLocaleString();
};

export function formatDate(date: string): string {
	return new Date(date).toLocaleDateString();
}
