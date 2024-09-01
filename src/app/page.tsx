import MessageContainer from "@/components/MessageContainer";
import Navbar from "@/components/Navbar";

export default function Home() {
    return (
        <div className="relative w-full min-h-screen">
            <div className="">
                <Navbar />
            </div>
            <MessageContainer />
        </div>
    );
}
