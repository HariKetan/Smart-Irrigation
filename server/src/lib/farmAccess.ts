import { Request, Response, NextFunction } from "express";
import { prisma } from "./prisma";

// Extend Request interface to include user
declare global {
	namespace Express {
		interface Request {
			user?: {
				id: string;
				email: string;
				farm_ids: number[];
			};
		}
	}
}

/**
 * Middleware to validate user access to a specific farm
 * Can be used with farm_id from query params, body, or params
 */
export const validateFarmAccess = (
	farmIdSource: "query" | "body" | "params" = "query"
) => {
	return async (req: Request, res: Response, next: NextFunction) => {
		try {
			// Get farm_id from the specified source
			let farmId: number;

			switch (farmIdSource) {
				case "query":
					farmId = parseInt(req.query.farm_id as string);
					break;
				case "body":
					farmId = parseInt(req.body.farm_id as string);
					break;
				case "params":
					farmId = parseInt(req.params.farmId as string);
					break;
				default:
					farmId = parseInt(req.query.farm_id as string);
			}

			// If no farm_id provided, use the first farm the user has access to
			if (!farmId || isNaN(farmId)) {
				if (req.user?.farm_ids && req.user.farm_ids.length > 0) {
					farmId = req.user.farm_ids[0];
				} else {
					return res
						.status(400)
						.json({
							error: "No farm_id provided and user has no assigned farms",
						});
				}
			}

			// Check if user has access to this farm
			if (!req.user?.farm_ids?.includes(farmId)) {
				return res.status(403).json({
					error: "Access denied to this farm",
					user_farms: req.user?.farm_ids,
					requested_farm: farmId,
				});
			}

			// Verify farm exists
			const farm = await prisma.farm.findUnique({
				where: { id: farmId },
			});

			if (!farm) {
				return res.status(404).json({ error: "Farm not found" });
			}

			// Add farm info to request for use in route handlers
			req.farm = {
				id: farm.id,
				name: farm.name,
				location: farm.location || undefined,
			};
			req.farmId = farmId;

			next();
		} catch (error) {
			console.error("Farm access validation error:", error);
			res.status(500).json({ error: "Farm access validation failed" });
		}
	};
};

/**
 * Helper function to get user's accessible farms
 */
export const getUserFarms = async (userId: string) => {
	const user = await prisma.user.findUnique({
		where: { id: userId },
		select: { farm_ids: true },
	});

	if (!user) return [];

	const farms = await prisma.farm.findMany({
		where: { id: { in: user.farm_ids } },
		select: { id: true, name: true, location: true },
	});

	return farms;
};

// Extend Request interface to include farm info
declare global {
	namespace Express {
		interface Request {
			farm?: {
				id: number;
				name: string;
				location?: string;
			};
			farmId?: number;
		}
	}
}
