import httpStatus from "http-status";
import { ApiError } from "../utils";
import axios from "axios";
import { MessagesModel, ConversationModel, CrawlModel } from "@/models";
import generateAIMessage, { startingAIChat } from "./ai.service";
import { dataCrawler } from "@/utils/CrawlData";

class MessageService {
    public static async messageHandler(
        url: string,
        content: string,
        conversationId?: string
    ) {
        if (!content) {
            throw new ApiError(httpStatus.BAD_REQUEST, "All fields required");
        }
        if (!conversationId && !url) {
            throw new ApiError(httpStatus.BAD_REQUEST, "URL is required");
        }
        try {
            let conversation;
            let aiMessageResponse: any;
            let crawledData;
            let geminiText;

            // Crawl the web page
            if (url) {
                const { data } = await axios.get(url);
                crawledData = await dataCrawler(data);
            }

            // Store the user's message
            const userMessage: any = await MessagesModel.create({
                message: content,
                role: "user",
                createdAt: new Date(),
            });

            // Handle conversation creation or updating
            if (!conversationId) {
                // Create a new conversation
                conversation = await ConversationModel.create({
                    messages: [userMessage._id],
                    url: url,
                    createdAt: new Date(),
                });
                // Update user message with conversationId
                userMessage.conversationId = conversation._id;
                await userMessage.save();
                // Generate AI response asynchronously
                geminiText = await generateAIMessage(
                    content,
                    crawledData?.text ? crawledData?.text : undefined
                );
            } else {
                // Find existing conversation and update
                conversation = await ConversationModel.findById(conversationId);
                if (!conversation) {
                    throw new ApiError(
                        httpStatus.NOT_FOUND,
                        "Conversation not found"
                    );
                }
                conversation.messages.push(userMessage._id);
                await conversation.save();
                // Update user message with conversationId
                userMessage.conversationId = conversation._id;
                await userMessage.save();

                // Starting AI chat using previous messages history
                const messages = await MessagesModel.find({
                    _id: { $in: conversation.messages },
                }).sort({ createdAt: 1 });

                // Format the message history
                const formattedMessages = messages.map((msg: any) => ({
                    role: msg.role,
                    parts: [{ text: msg.message }],
                }));

                // Generate AI response asynchronously
                geminiText = await startingAIChat(content, formattedMessages);
            }

            aiMessageResponse = await MessagesModel.create({
                message: geminiText,
                role: "model",
                conversationId: conversation._id,
                crawlDataId: crawledData?.crawlResponse?._id,
                createdAt: new Date(),
            });

            // Update conversation with AI message
            conversation.messages.push(aiMessageResponse._id);
            await conversation.save();
            return {
                message: aiMessageResponse?.message,
                role: aiMessageResponse?.role,
                createdAt: aiMessageResponse?.createdAt,
                conversationId: conversation._id,
                messageId: aiMessageResponse?._id,
            };
        } catch (error) {
            console.log("Error while processing messages", error);
            throw new ApiError(
                httpStatus.INTERNAL_SERVER_ERROR,
                "Unable to process messages"
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
