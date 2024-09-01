import { NextApiRequest, NextApiResponse } from "next";
import MessageService from "@/services/message.service";
import { ApiError, catchAsync, connectDB } from "@/utils";
import httpStatus from "http-status";
import Joi from "joi";

const crawler = catchAsync(
    async (req: NextApiRequest, res: NextApiResponse) => {
        await connectDB();

        const { url, content, conversationId } = req.body;

        // Validate request body
        const schema = Joi.object({
            url: Joi.string().uri().optional(),
            content: Joi.string().required(),
            conversationId: Joi.string().optional(),
        });

        const { error } = schema.validate({ url, content, conversationId });
        if (error) {
            throw new ApiError(httpStatus.BAD_REQUEST, error.message);
        }

        const response = await MessageService.messageHandler(
            url,
            content,
            conversationId
        );

        return res
            .status(httpStatus.OK)
            .json({ response, message: "User message sent successfully" });
    }
);

export default crawler;
