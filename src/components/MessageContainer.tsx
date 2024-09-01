"use client";
import React, { useEffect, useRef, useState } from "react";
import MessageBox from "./MessageBox";
import ChatBox from "./MessageInput";
import toast from "react-hot-toast";
import axios from "axios";
import { InputData } from "@/types";

const MessageContainer: React.FC = () => {
    const localStorageId = window.localStorage.getItem("conversationId");
    const bottomRef = useRef<HTMLDivElement>(null);
    const [inputData, setInputData] = useState<InputData>({
        url: "https://www.investopedia.com/terms/a/artificial-intelligence-ai.asp", // Just for testing
        content: "What is AI?",
    });
    const [messages, setMessages] = useState<any[]>([]);
    const [isGenerating, setIsGenerating] = useState<boolean>(false);
    const [conversationId, setConversationId] = useState<string | null>(
        localStorageId ? localStorageId : null
    );

    const scrollToBottom = () => {
        bottomRef?.current?.scrollIntoView({ behavior: "smooth" });
    };

    const handleSend = async () => {
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
                creator: "user",
                createdAt: new Date(),
            };
            setMessages((prevMessages) => [...prevMessages, newMessage]);

            const { data } = await axios.post("/api/crawler", {
                url: inputData.url ? inputData.url : undefined,
                content: inputData.content,
                conversationId: conversationId ? conversationId : undefined,
            });

            // Update conversationId if it's a new conversation
            console.log("response", data);
            if (!conversationId) {
                setConversationId(data.response.conversationId);
                if (data.response.conversationId) {
                    window.localStorage.setItem(
                        "conversationId",
                        data.response.conversationId
                    );
                }
            }
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
        }
    };

    const fetchMessage = async (conversationId: string) => {
        if (!conversationId) {
            return;
        }
        try {
            const { data } = await axios.get(
                `api/conversation/${conversationId}`
            );
            // console.log("message data", data);
            setMessages(data.response);
            console.log("messages", data.response);
            scrollToBottom();
        } catch (error) {
            toast.error("Unable to get messages");
        }
    };

    useEffect(() => {
        if (localStorageId) {
            fetchMessage(localStorageId);
        }
    }, []);

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    return (
        <div className="flex flex-col min-h-screen pt-12">
            <div className="flex-1 overflow-y-auto p-0 md:p-4">
                {messages.map((message, index) => (
                    <MessageBox key={index} data={message} />
                ))}
                {isGenerating && (
                    <MessageBox data={{ creator: "ai", isGenerating: true }} />
                )}
                <div className="pt-44" ref={bottomRef} />
            </div>
            <div className="fixed bottom-0 left-0 w-full px-1 md:px-4 pb-1.5">
                <div className="w-full md:max-w-[90%] lg:w-[80%] mx-auto">
                    <ChatBox
                        inputData={inputData}
                        setInputData={setInputData}
                        handleSend={handleSend}
                        isGenerating={isGenerating}
                    />
                </div>
            </div>
        </div>
    );
};

export default MessageContainer;
