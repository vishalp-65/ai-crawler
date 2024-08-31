import { NextApiRequest, NextApiResponse } from "next";

const catchAsync =
    (fn: (req: NextApiRequest, res: NextApiResponse) => Promise<void>) =>
    (req: NextApiRequest, res: NextApiResponse) => {
        fn(req, res).catch((err) => {
            // Handle error here, or pass it to Next.js' built-in error handling
            console.error(err);
            res.status(500).json({ message: "Internal Server Error" });
        });
    };

export default catchAsync;
