import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import { prisma } from "../../lib/prisma";

export const register = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return res.status(400).json({ error: "User already exists" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    return res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    console.error("Registration error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}; 