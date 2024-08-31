import React from "react";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";

type Props = {};

const ChatBox = (props: Props) => {
    return (
        <div
            className="flex items-end justify-between gap-4 border border-gray-400 dark:border-gray-500 
        rounded-md px-3 py-4 shadow-md w-full dark:bg-gray-900/30 backdrop-blur-sm"
        >
            <div className="flex flex-col items-center justify-between gap-3 w-full">
                <Input
                    placeholder="Enter website URL for crawl"
                    className="border-gray-400 dark:bg-gray-900/50 backdrop-blur-sm"
                />
                <Textarea
                    placeholder="Ask what you want"
                    className="max-h-40 border-gray-400 dark:bg-gray-900/50 backdrop-blur-sm"
                />
            </div>
            <Button
                size="lg"
                className="dark:bg-secondary hover:dark:bg-secondary/80"
            >
                Send
            </Button>
        </div>
    );
};

export default ChatBox;
