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
        const model = genAI.getGenerativeModel({
            model: "gemini-1.5-pro",
        });
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

export async function startingAIChat(content: string, history?: any[]) {
    console.log("Gemini chat start");
    try {
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });

        // Initialize chat with history if available
        const chat = model.startChat({
            history: history || [], // Use provided history or empty array
        });

        // Send the new message
        const result = await chat.sendMessage(content);

        // Return the response text
        return result.response.text();
    } catch (error) {
        console.log("error in gemini", error);
        throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, "Gemini error");
    }
}
