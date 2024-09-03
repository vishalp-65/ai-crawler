"use client";
import React, { useEffect, useRef, useState, useCallback } from "react";
import MessageBox from "./MessageBox";
import MessageInput from "./MessageInput";
import toast from "react-hot-toast";
import axios from "axios";
import { InputData } from "@/types";
import { useSearchParams } from "next/navigation";
import { useUser } from "@/context/user_context";

const MessageContainer: React.FC = () => {
    const searchParams = useSearchParams();
    const id = searchParams ? searchParams.get("conversationId") : null;
    const { handleConversationId } = useUser();
    const bottomRef = useRef<HTMLDivElement>(null);
    const [inputData, setInputData] = useState<InputData>({
        url: "https://www.investopedia.com/terms/a/artificial-intelligence-ai.asp", // Just for testing
        content: "What is AI ?",
    });
    const [messages, setMessages] = useState<any[]>([]);
    const [isGenerating, setIsGenerating] = useState<boolean>(false);
    const [conversationId, setConversationId] = useState<string | null>(
        id ? id : null
    );

    const scrollToBottom = useCallback(() => {
        bottomRef?.current?.scrollIntoView({ behavior: "smooth" });
    }, []);

    const fetchMessage = useCallback(
        async (conversationId: string) => {
            try {
                const { data } = await axios.get(
                    `/api/conversation/${conversationId}`
                );
                setMessages(data.response);
                scrollToBottom();
            } catch (error) {
                toast.error("Unable to get messages");
            }
        },
        [scrollToBottom]
    );

    const handleSend = useCallback(async () => {
        if (!inputData.content) {
            toast.error("Ask something");
            return;
        }
        if (!conversationId && !inputData.url) {
            toast.error("Enter URL");
            return;
        }

        try {
            setIsGenerating(true);

            // Optimistically update UI with user message
            const newMessage = {
                message: inputData.content,
                role: "user",
                createdAt: new Date(),
            };
            setMessages((prevMessages) => [...prevMessages, newMessage]);

            const { data } = await axios.post("/api/ask", {
                url: inputData.url ? inputData.url : undefined,
                content: inputData.content,
                conversationId: conversationId ? conversationId : undefined,
            });

            // Setting conversation ID
            if (!conversationId) {
                setConversationId(data.response.conversationId);
            }
            // Update message state
            setMessages((prevMessages) => [...prevMessages, data.response]);
        } catch (error: any) {
            toast.error(error.message);
            console.error("Error sending message:", error);
        } finally {
            setIsGenerating(false);
            setInputData({
                url: "",
                content: "",
            });
            scrollToBottom();
        }
    }, [inputData.content, inputData.url, conversationId, scrollToBottom]);

    useEffect(() => {
        if (conversationId) {
            fetchMessage(conversationId);
        }
    }, [conversationId, fetchMessage]);

    useEffect(() => {
        scrollToBottom();
    }, [messages, scrollToBottom]);

    useEffect(() => {
        if (conversationId) {
            window.history.pushState(
                null,
                "",
                `?conversationId=${conversationId}`
            );
            handleConversationId(conversationId);
        }
    }, [conversationId]);

    return (
        <div className="flex flex-col min-h-screen pt-12">
            <div className="flex-1 overflow-y-auto p-0 md:p-4">
                {messages.map((message, index) => (
                    <MessageBox key={index} data={message} />
                ))}
                {isGenerating && (
                    <MessageBox
                        data={{
                            role: "model",
                            isGenerating: true,
                            createdAt: new Date(),
                        }}
                    />
                )}
                <div className="pt-44" ref={bottomRef} />
            </div>
            <div className="fixed bottom-0 left-0 w-full px-0 md:px-4">
                <div className="w-full md:max-w-[90%] lg:w-[80%] mx-auto">
                    <MessageInput
                        inputData={inputData}
                        setInputData={setInputData}
                        handleSend={handleSend}
                        isGenerating={isGenerating}
                        conversationId={conversationId}
                    />
                </div>
            </div>
        </div>
    );
};

export default MessageContainer;
