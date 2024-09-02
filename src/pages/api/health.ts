import { NextApiRequest, NextApiResponse } from "next";
import { catchAsync } from "@/utils";
import httpStatus from "http-status";

const healthCheck = catchAsync(
    async (req: NextApiRequest, res: NextApiResponse) => {
        return res.status(httpStatus.OK).json("All good for AWS health check");
    }
);

export default healthCheck;
