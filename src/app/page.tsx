import ChatBox from "@/components/ChatBox";
import Image from "next/image";

export default function Home() {
    return (
        <div className="relative w-full min-h-screen">
            <div className="absolute bottom-0 pb-2">
                <ChatBox />
            </div>
        </div>
    );
}
