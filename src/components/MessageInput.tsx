import React, { useEffect, useState } from "react";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { InputData } from "@/types";
import { Switch } from "./ui/switch";

interface MessageInputProps {
    inputData: InputData;
    setInputData: React.Dispatch<React.SetStateAction<InputData>>;
    handleSend: () => void;
    isGenerating: boolean;
    conversationId: string | null;
}

const MessageInput: React.FC<MessageInputProps> = ({
    inputData,
    setInputData,
    handleSend,
    isGenerating,
    conversationId,
}) => {
    const [isURLEnable, setIsURLEnable] = useState<boolean>(
        conversationId === null
    );
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

    useEffect(() => {
        if (conversationId) {
            setIsURLEnable(false);
        }
    }, [conversationId]);

    return (
        <div
            className="z-10 flex items-end justify-between gap-4 border border-gray-300 dark:border-gray-700 border-b-0
        rounded-md px-3 py-4 shadow-lg w-full bg-gray-100/80 dark:bg-gray-900/70 backdrop-blur-md"
        >
            <div className="flex flex-col items-center justify-between gap-3 w-full">
                {isURLEnable && (
                    <Input
                        id="url"
                        type="text"
                        name="url"
                        value={inputData.url}
                        placeholder="Enter website URL for crawl"
                        className="border-gray-300 bg-gray-200/80 dark:border-gray-800/70 dark:bg-gray-800/50 backdrop-blur-sm"
                        onChange={handleChange}
                        disabled={isGenerating}
                        required
                    />
                )}
                <Textarea
                    id="content"
                    name="content"
                    value={inputData.content}
                    placeholder="Ask what you want"
                    className="max-h-40 border-gray-300 bg-gray-200/80 dark:border-gray-700 dark:bg-gray-800/50 backdrop-blur-sm"
                    onChange={handleChange}
                    disabled={isGenerating}
                    required
                />
            </div>
            <div>
                <div className="flex items-center gap-1 mb-3 text-sm">
                    <Switch
                        checked={isURLEnable}
                        disabled={isGenerating || !conversationId}
                        onCheckedChange={() => setIsURLEnable(!isURLEnable)}
                    />
                    <p>URL</p>
                </div>
                <Button
                    size="lg"
                    className="dark:bg-secondary dark:text-white hover:dark:bg-secondary/80"
                    onClick={handleSend}
                    disabled={isGenerating || !inputData.content}
                >
                    {isGenerating ? "Processing..." : "Send"}
                </Button>
            </div>
        </div>
    );
};

export default MessageInput;
