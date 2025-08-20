import jwt from "jsonwebtoken";
import { config } from "./config";

export const signToken = (payload: any) => {
	return jwt.sign(payload, config.jwtSecret, { expiresIn: "1d" });
};

export const verifyToken = (token: string) => {
	try {
		return jwt.verify(token, config.jwtSecret);
	} catch (error) {
		throw new Error("Invalid token");
	}
};
