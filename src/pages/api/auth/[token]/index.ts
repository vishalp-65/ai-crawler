import { MessageService, UserService } from "@/services";
import { ApiError, catchAsync } from "@/utils";
import httpStatus from "http-status";
import Joi from "joi";
import { NextApiRequest, NextApiResponse } from "next";

const conversations = catchAsync(
    async (req: NextApiRequest, res: NextApiResponse) => {
        // connectDB();
        const { token } = req.query;
        console.log("backend token", token);
        // Ensure conversationId is a single string
        if (Array.isArray(token) || !token) {
            throw new ApiError(
                httpStatus.BAD_REQUEST,
                "Invalid conversationId"
            );
        }

        // Validate conversationId type
        const schema = Joi.object({
            token: Joi.string().required(),
        });
        const { error } = schema.validate({ token });
        if (error) {
            throw new ApiError(httpStatus.BAD_REQUEST, error.message);
        }

        const authToken = await UserService.verifyToken(token);
        return res.status(httpStatus.OK).json(authToken);
    }
);

export default conversations;
