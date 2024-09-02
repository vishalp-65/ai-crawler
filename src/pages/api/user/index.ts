import { NextApiRequest, NextApiResponse } from "next";
import { catchAsync } from "@/utils";
import httpStatus from "http-status";
import { authMiddleware } from "@/middlewares/authMiddleware";
import { UserService } from "@/services";

const handler = catchAsync(
    async (req: NextApiRequest, res: NextApiResponse) => {
        await authMiddleware(req, res);

        // Access user from the request object
        const user = (req as any).user;

        if (!user) {
            return res
                .status(httpStatus.UNAUTHORIZED)
                .json({ error: "Unauthorized" });
        }

        try {
            const userDetails = await UserService.getUser(user.email);
            return res.status(httpStatus.OK).json(userDetails);
        } catch (error) {
            console.error("Failed to get user details:", error);
            return res
                .status(httpStatus.INTERNAL_SERVER_ERROR)
                .json({ error: "Failed to get user details" });
        }
    }
);

export default handler;
