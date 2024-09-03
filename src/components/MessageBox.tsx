import { PiDotsThreeOutlineFill } from "react-icons/pi";
import clsx from "clsx";
import { formatAIText } from "@/utils/helper";
import { formatTime } from "@/utils";
import Image from "next/image";
import { useUser } from "@/context/user_context";

interface MessageBoxProps {
    data: any;
}

const MessageBox: React.FC<MessageBoxProps> = ({ data }) => {
    const isUser = data.role === "user";
    const { user } = useUser();
    const isGenerating = data.isGenerating;
    const formattedMessage = formatAIText(data.message ? data.message : "");

    const container = clsx(
        "flex gap-2 py-2 px-0 md:px-2",
        isUser && "justify-end"
    );

    const avatar = clsx(isUser && "order-2");

    const body = clsx("flex flex-col gap-1 w-[85%]", isUser && "items-end");

    const message = clsx(
        "text-sm w-fit overflow-hidden",
        isUser
            ? "bg-primary dark:bg-secondary text-white"
            : "bg-gray-200/70 shadow-sm dark:bg-gray-700 px-3",
        "rounded-2xl py-2 px-3"
    );

    return (
        <div className={container}>
            <div className={avatar}>
                <div
                    className="
                        -z-10
                        relative 
                        inline-block 
                        rounded-full 
                        overflow-hidden
                    "
                >
                    <Image
                        width={20}
                        height={20}
                        src={
                            isUser
                                ? user?.profileImageURL
                                    ? user?.profileImageURL
                                    : "/placeholder.jpg"
                                : "/gemini.svg"
                        }
                        alt="Avatar"
                        className={`${
                            isUser ? "h-10 w-10 rounded-full" : "w-7 h-7"
                        }`}
                    />
                </div>
            </div>
            <div className={body}>
                <div className="flex items-center gap-2">
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
                            <div className="flex items-center justify-center">
                                <PiDotsThreeOutlineFill className="animate-bounce text-3xl w-full text-nowrap" />
                                {/* <span className="ml-2 text-lg">typing...</span> */}
                            </div>
                        ) : isUser ? (
                            <p>{data.message}</p>
                        ) : (
                            <div
                                className="formatted-message text-wrap"
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
