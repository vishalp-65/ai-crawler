import { CrawlerService } from "@/services";
import { ApiError, catchAsync } from "@/utils";
import httpStatus from "http-status";
import Joi from "joi";
import { NextApiRequest, NextApiResponse } from "next";

const urlSchema = Joi.string().uri().required();

export const crawler = catchAsync(
    async (req: NextApiRequest, res: NextApiResponse) => {
        const { url, content } = req.body;
        const { error } = urlSchema.validate(url);

        if (error) {
            throw new ApiError(httpStatus.BAD_REQUEST, "Invalid URL");
        }
        const response = await CrawlerService.crawler(url, content);
        return res.status(httpStatus.OK).json(response);
    }
);
