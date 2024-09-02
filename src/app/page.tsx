"use client";
import MessageContainer from "@/components/MessageContainer";
import Navbar from "@/components/Navbar";
import { UserProvider } from "@/context/user_context";

export default function Home() {
    return (
        <div className="relative w-full min-h-screen">
            <UserProvider>
                <div className="fixed top-0 left-0 w-full px-1 md:px-4 pb-1.5">
                    <div className="w-full md:max-w-[90%] lg:w-[80%] mx-auto">
                        <Navbar />
                    </div>
                </div>
                <MessageContainer />
            </UserProvider>
        </div>
    );
}
