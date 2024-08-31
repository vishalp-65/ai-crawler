import MessageContainer from "@/components/MessageContainer";
import ChatBox from "@/components/MessageInput";
import Navbar from "@/components/Navbar";
import Image from "next/image";

export default function Home() {
    return (
        <div className="relative w-full min-h-screen">
            <div className="">
                <Navbar />
            </div>
            <MessageContainer />
            <div className="absolute bottom-0 w-full pb-3">
                <ChatBox />
            </div>
        </div>
    );
}
