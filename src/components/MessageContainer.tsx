"use client";
import React, { useEffect, useState } from "react";
import MessageBox from "./MessageBox";
import ChatBox from "./MessageInput";
import toast from "react-hot-toast";
import axios from "axios";
import { InputData } from "@/types";

type Props = {};

const MessageContainer = (props: Props) => {
    const [inputData, setInputData] = useState<InputData>({
        url: "https://www.investopedia.com/terms/a/artificial-intelligence-ai.asp", // Just for testing
        content: "What is AI ?",
    });
    const [isGenerating, setIsGenerating] = useState<boolean>(false);

    const handleSend = async () => {
        if (!inputData.url || !inputData.content) {
            toast.error("Enter URL and Question");
            return;
        }

        try {
            setIsGenerating(true);
            const { data } = await axios.post("api/crawler", {
                conversationId: undefined,
                url: inputData.url,
                content: inputData.content,
            });
            console.log("crawler data", data);
        } catch (error) {
            toast.error("Something went wrong");
        } finally {
            setIsGenerating(false);
            setInputData({
                url: "",
                content: "",
            });
        }
    };
    useEffect(() => {
        // getMessages("66d4189c4d4b130db78d0878");
    }, []);

    const getMessages = async (conversationId: string) => {
        try {
            const { data } = await axios.get(
                `api/conversation/${conversationId}`
            );
            console.log("messages", data);
        } catch (error) {
            console.log("error getting messages", error);
        }
    };

    return (
        <div>
            <MessageBox data={""} isGenerating={isGenerating} />
            <div className="absolute bottom-0 w-full pb-1.5">
                <ChatBox
                    inputData={inputData}
                    setInputData={setInputData}
                    handleSend={handleSend}
                    isGenerating={isGenerating}
                />
            </div>
        </div>
    );
};

export default MessageContainer;
