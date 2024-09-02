// File: src/pages/api/user/update.ts

import { NextApiRequest, NextApiResponse } from "next";
import { UserService } from "@/services"; // Assuming you have a UserService to handle DB operations
import { catchAsync } from "@/utils"; // Assuming you have a utility function for async error handling
import httpStatus from "http-status";

const updateUser = catchAsync(
    async (req: NextApiRequest, res: NextApiResponse) => {
        if (req.method !== "PUT") {
            return res
                .status(httpStatus.METHOD_NOT_ALLOWED)
                .json({ error: "Method not allowed" });
        }

        const { email, name, age } = req.body;

        if (!email || !name || !age) {
            return res
                .status(httpStatus.BAD_REQUEST)
                .json({ error: "Missing required fields" });
        }

        try {
            const updatedUser = await UserService.updateUser(email, {
                name,
                age,
            });
            return res.status(httpStatus.OK).json(updatedUser);
        } catch (error) {
            console.error("Failed to update user:", error);
            return res
                .status(httpStatus.INTERNAL_SERVER_ERROR)
                .json({ error: "Failed to update user" });
        }
    }
);

export default updateUser;
