"use client";
import { PiDotsThreeOutlineFill } from "react-icons/pi";
import { formatDate } from "@/utils";
import clsx from "clsx";
import Image from "next/image";
import { useState } from "react";

interface MessageBoxProps {
    data: any;
    isGenerating: boolean;
}

const MessageBox: React.FC<MessageBoxProps> = ({ data, isGenerating }) => {
    const [imageModalOpen, setImageModalOpen] = useState(false);

    const isOwn = true;

    const container = clsx("flex gap-3 py-4 px-2", isOwn && "justify-end");

    const avatar = clsx(isOwn && "order-2");

    const body = clsx("flex flex-col gap-2", isOwn && "items-end");

    const message = clsx(
        "text-sm w-fit overflow-hidden",
        isOwn ? "bg-teal-500 dark:bg-secondary text-white" : "bg-gray-100",
        data.image ? "rounded-md p-0" : "rounded-full py-2 px-3"
    );

    return (
        <div className={container}>
            <div className={avatar}></div>
            <div className={body}>
                <div className="flex items-center gap-1">
                    <div className="text-sm text-gray-500">
                        {isOwn ? "You" : "AI bot"}
                    </div>
                    <div className="text-xs text-gray-400">today</div>
                </div>
                <div className={message}>
                    {data.image ? (
                        <Image
                            alt="Image"
                            height="288"
                            width="288"
                            onClick={() => setImageModalOpen(true)}
                            src={data.image}
                            className="
                            object-cover 
                            cursor-pointer 
                            hover:scale-110 
                            transition 
                            translate
                        "
                        />
                    ) : (
                        <div>
                            {isGenerating ? (
                                <PiDotsThreeOutlineFill className="text-2xl animate-bounce" />
                            ) : (
                                "Message is here"
                            )}{" "}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default MessageBox;
