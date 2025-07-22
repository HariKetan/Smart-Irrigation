import { Request, Response } from "express";
import { verifyToken } from "../../lib/jwt";
import { prisma } from "../../lib/prisma";

export const me = async (req: Request, res: Response) => {
  try {
    const token = req.headers.authorization?.replace('Bearer ', '');

    if (!token) {
      return res.status(401).json({ error: "Not authenticated" });
    }

    const decoded = verifyToken(token) as {
      userId: string;
    };

    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
      select: {
        id: true,
        email: true,
        name: true,
      },
    });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    return res.json(user);
  } catch (error) {
    console.error("Auth check error:", error);
    return res.status(401).json({ error: "Invalid token" });
  }
}; 