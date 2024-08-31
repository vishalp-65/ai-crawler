import React from "react";
import MessageBox from "./MessageBox";

type Props = {};

const MessageContainer = (props: Props) => {
    return (
        <div>
            <MessageBox data={""} isLast={false} />
        </div>
    );
};

export default MessageContainer;
