import { TbMessageChatbot } from "react-icons/tb";

export const Loading = () => {
    return (
        <div
            className="h-screen w-full flex flex-col justify-center items-center 
         text-black dark:text-white"
        >
            <TbMessageChatbot className="animate-pulse transition duration-700 w-20 h-20" />
        </div>
    );
};
