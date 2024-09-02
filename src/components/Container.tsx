import React from "react";
import Navbar from "./Navbar";
import MessageContainer from "./MessageContainer";
import { useUser } from "@/context/user_context";
import { Loading } from "./Loading";

type Props = {};

const Container = (props: Props) => {
    const { loading } = useUser();

    if (loading) {
        return <Loading />;
    }

    return (
        <div>
            <div className="fixed top-0 left-0 w-full px-1 md:px-4 pb-1.5">
                <div className="w-full md:max-w-[90%] lg:w-[80%] mx-auto">
                    <Navbar />
                </div>
            </div>
            <MessageContainer />
        </div>
    );
};

export default Container;
