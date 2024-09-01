import { ApiError } from "@/utils";
import { GoogleGenerativeAI } from "@google/generative-ai";
import fs from "fs";
import httpStatus from "http-status";
const genAI = new GoogleGenerativeAI(
    process.env.NEXT_API_GOOGLE_API_KEY as string
);

export default async function generateAIMessage(content: string, data: any) {
    console.log("Gemini start");
    try {
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        const result = await model.generateContent([
            content,
            {
                text: data,
            },
        ]);
        // console.log("Google result", result.response.text());
        return result.response.text();
    } catch (error) {
        console.log("error in gemini", error);
        throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, "Gemini error");
    }
}
