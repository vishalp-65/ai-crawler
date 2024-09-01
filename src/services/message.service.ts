import httpStatus from "http-status";
import { ApiError } from "../utils";
import axios from "axios";
import { MessagesModel, ConversationModel, CrawlModel } from "@/models";
import generateAIMessage from "./ai.service";
import { dataCrawler } from "@/utils/CrawlData";

class MessageService {
    public static async messageHandler(
        url: string,
        content: string,
        conversationId?: string
    ) {
        if (!url || !content) {
            throw new ApiError(httpStatus.BAD_REQUEST, "All fields required");
        }
        try {
            let conversation;
            let response: any;
            const { data } = await axios.get(url);
            const crawledData = await dataCrawler(data);

            const geminiText = await generateAIMessage(
                content,
                crawledData.text
            );

            if (!conversationId) {
                // Create a new conversation and message
                response = await MessagesModel.create({
                    crawlDataId: crawledData.crawlResponse._id,
                    message: geminiText,
                    creator: "ai",
                });
                conversation = await ConversationModel.create({
                    messages: [response._id],
                    url: url,
                });
                crawledData.crawlResponse.messageId = response._id;
                await crawledData.crawlResponse.save();
            } else {
                // Find the conversation and add the new message
                conversation = await ConversationModel.findById(conversationId);
                if (!conversation) {
                    throw new ApiError(
                        httpStatus.NOT_FOUND,
                        "Conversation not found"
                    );
                }
                response = await MessagesModel.create({
                    conversationId, // Assign the conversationId
                    crawlDataId: crawledData.crawlResponse._id,
                    message: geminiText,
                    creator: "ai",
                });
                conversation.messages.push(response._id);
                await conversation.save();
            }

            return {
                geminiText,
                conversationId: conversation._id,
                messageId: response._id,
                createdAt: response.createdAt,
            };
        } catch (error) {
            console.log("Error while crawling", error);
            throw new ApiError(
                httpStatus.INTERNAL_SERVER_ERROR,
                "Unable to crawl web URL"
            );
        }
    }

    public static async getMessageByConversations(conversationId: string) {
        try {
            // Find the conversation by ID and populate the messages
            const conversation = await ConversationModel.findById(
                conversationId
            ).populate("messages");

            // If the conversation is not found, throw a 404 error
            if (!conversation) {
                throw new ApiError(
                    httpStatus.NOT_FOUND,
                    "Conversation not found"
                );
            }

            // Return the messages array
            return conversation.messages;
        } catch (error) {
            console.error("Error fetching messages by conversationId", error);

            // Handle any other errors with a generic 500 status
            throw new ApiError(
                httpStatus.INTERNAL_SERVER_ERROR,
                "Unable to fetch messages"
            );
        }
    }
}

export default MessageService;
