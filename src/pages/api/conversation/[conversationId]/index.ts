import { MessageService } from "@/services";
import { ApiError, catchAsync } from "@/utils";
import httpStatus from "http-status";
import Joi from "joi";
import { NextApiRequest, NextApiResponse } from "next";

const conversations = catchAsync(
    async (req: NextApiRequest, res: NextApiResponse) => {
        // connectDB();
        const { conversationId } = req.query;

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

        const response = await MessageService.getMessageByConversations(
            conversationId
        );
        return res
            .status(httpStatus.OK)
            .json({ response, message: "All Messages" });
    }
);

export default conversations;
