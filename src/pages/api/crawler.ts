import { MessageService } from "@/services";
import { ApiError, catchAsync, connectDB } from "@/utils";
import httpStatus from "http-status";
import Joi from "joi";
import { NextApiRequest, NextApiResponse } from "next";

const crawler = catchAsync(
    async (req: NextApiRequest, res: NextApiResponse) => {
        connectDB();

        const { url, content, conversationId } = req.body;

        // Validate URL and content types
        const schema = Joi.object({
            url: Joi.string().uri().required(),
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
            .json({ response, message: "Text generated successfully" });
    }
);

export default crawler;
