import { authMiddleware } from "@/middlewares/authMiddleware";
import { MessageService, UserService } from "@/services";
import { ApiError, catchAsync } from "@/utils";
import httpStatus from "http-status";
import Joi from "joi";
import { NextApiRequest, NextApiResponse } from "next";

const conversations = catchAsync(
    async (req: NextApiRequest, res: NextApiResponse) => {
        await authMiddleware(req, res);

        // Access user from the request object
        const user = (req as any).user;

        if (!user) {
            return res
                .status(httpStatus.UNAUTHORIZED)
                .json({ error: "Unauthorized" });
        }

        const { conversationId } = req.body;
        console.log("user conversation", conversationId);

        // Ensure conversationId is a single string
        if (Array.isArray(conversationId) || !conversationId) {
            throw new ApiError(
                httpStatus.BAD_REQUEST,
                "Invalid conversationId"
            );
        }

        // Validate conversationId type
        const schema = Joi.object({
            conversationId: Joi.string().required(),
        });
        const { error } = schema.validate({ conversationId });
        if (error) {
            throw new ApiError(httpStatus.BAD_REQUEST, error.message);
        }

        await UserService.updateConversation(conversationId, user);
        return res.status(httpStatus.OK).json({ message: "User updated" });
    }
);

export default conversations;
