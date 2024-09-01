import { ApiError } from "@/utils";
import { GoogleGenerativeAI } from "@google/generative-ai";
import httpStatus from "http-status";
const genAI = new GoogleGenerativeAI(
    process.env.NEXT_API_GOOGLE_API_KEY as string
);

export default async function generateAIMessage(content: string, data?: any) {
    console.log("Gemini start");
    try {
        let result;
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        if (data) {
            result = await model.generateContent([
                content,
                {
                    text: data,
                },
            ]);
        } else {
            result = await model.generateContent(content);
        }
        // console.log("Google result", result.response.text());
        return result.response.text();
    } catch (error) {
        console.log("error in gemini", error);
        throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, "Gemini error");
    }
}
