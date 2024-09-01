import React from "react";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { InputData } from "@/types";

interface MessageInputProps {
    inputData: InputData;
    setInputData: React.Dispatch<React.SetStateAction<InputData>>;
    handleSend: () => void;
    isGenerating: boolean;
}

const ChatBox: React.FC<MessageInputProps> = ({
    inputData,
    setInputData,
    handleSend,
    isGenerating,
}) => {
    const handleChange = (
        e: React.ChangeEvent<
            HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
        >
    ) => {
        const { name, value } = e.target;
        setInputData({
            ...inputData,
            [name]: value,
        });
    };

    return (
        <div
            className="flex items-end justify-between gap-4 border border-gray-400/70 dark:border-gray-600 
        rounded-md px-3 py-4 shadow-md w-full dark:bg-gray-900/30 backdrop-blur-sm"
        >
            <div className="flex flex-col items-center justify-between gap-3 w-full">
                <Input
                    id="url"
                    type="text"
                    name="url"
                    value={inputData.url}
                    placeholder="Enter website URL for crawl"
                    className="border-gray-300 dark:border-gray-700 dark:bg-gray-900/50 backdrop-blur-sm"
                    onChange={handleChange}
                    required
                />
                <Textarea
                    id="content"
                    name="content"
                    value={inputData.content}
                    placeholder="Ask what you want"
                    className="max-h-40 border-gray-300 dark:border-gray-700 dark:bg-gray-900/50 backdrop-blur-sm"
                    onChange={handleChange}
                    required
                />
            </div>
            <Button
                size="lg"
                className="dark:bg-secondary hover:dark:bg-secondary/80"
                onClick={handleSend}
                disabled={isGenerating}
            >
                Send
            </Button>
        </div>
    );
};

export default ChatBox;
