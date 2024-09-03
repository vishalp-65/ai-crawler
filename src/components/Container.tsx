import React, { Suspense } from "react";
import dynamic from "next/dynamic";
import { useUser } from "@/context/user_context";
import { Loading } from "./Loading";

// Dynamically import components with ssr: false
const Navbar = dynamic(() => import("./Navbar"), { ssr: false });
const MessageContainer = dynamic(() => import("./MessageContainer"), {
    ssr: false,
});

const Container: React.FC = () => {
    const { loading } = useUser();

    if (loading) {
        return <Loading />;
    }

    return (
        <div>
            <div className="fixed top-0 left-0 w-full px-0 md:px-4 pb-1.5">
                <div className="w-full md:max-w-[90%] lg:w-[80%] mx-auto">
                    <Navbar />
                </div>
            </div>
            <Suspense fallback={<Loading />}>
                <MessageContainer />
            </Suspense>
        </div>
    );
};

export default Container;
