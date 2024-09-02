import { NextApiRequest, NextApiResponse } from "next";
import JWTService from "@/services/jwt.service";
import httpStatus from "http-status";

export const authMiddleware = async (
    req: NextApiRequest,
    res: NextApiResponse
) => {
    const token = req.headers.authorization?.replace("Bearer ", "");
    console.log("token", token);
    if (!token) {
        return res
            .status(httpStatus.UNAUTHORIZED)
            .json({ error: "Token not provided" });
    }

    try {
        const user = JWTService.decodeToken(token);
        (req as any).user = user; // Attach user to the request object
    } catch (error) {
        console.error("Token verification failed:", error);
        return res
            .status(httpStatus.UNAUTHORIZED)
            .json({ error: "Invalid or expired token" });
    }
};
