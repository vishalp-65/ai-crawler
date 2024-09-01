"use client";
import { PiDotsThreeOutlineFill } from "react-icons/pi";
import clsx from "clsx";
import { formatAIText } from "@/utils/helper";
import { formatTime } from "@/utils";

interface MessageBoxProps {
    data: any;
}

const MessageBox: React.FC<MessageBoxProps> = ({ data }) => {
    const isUser = data.creator === "user";
    const isGenerating = data.isGenerating;
    const formattedMessage = formatAIText(data.message ? data.message : "");

    const container = clsx(
        "flex gap-1 py-2 px-0 md:px-2",
        isUser && "justify-end"
    );

    const avatar = clsx(isUser && "order-2");

    const body = clsx("flex flex-col gap-2", isUser && "items-end");

    const message = clsx(
        "text-sm w-fit overflow-hidden",
        isUser
            ? "bg-teal-500 dark:bg-secondary text-white"
            : "bg-gray-200/70 shadow-sm dark:bg-gray-700 mr-[18%] px-3",
        "rounded-2xl py-2 px-3"
    );

    return (
        <div className={container}>
            <div className={avatar}></div>
            <div className={body}>
                <div className="flex items-center gap-1">
                    <div className="text-sm text-gray-500">
                        {isUser ? "You" : "AI bot"}
                    </div>
                    <div className="text-xs text-gray-400">
                        {formatTime(data.createdAt)}
                    </div>
                </div>
                <div className={message}>
                    <div>
                        {isGenerating ? (
                            <div className="flex items-center">
                                <PiDotsThreeOutlineFill className="animate-bounce text-3xl w-full text-nowrap" />
                                {/* <span className="ml-2">AI is typing...</span> */}
                            </div>
                        ) : isUser ? (
                            <p>{data.message}</p>
                        ) : (
                            <div
                                className="formatted-message"
                                dangerouslySetInnerHTML={{
                                    __html: formattedMessage,
                                }}
                            />
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MessageBox;
