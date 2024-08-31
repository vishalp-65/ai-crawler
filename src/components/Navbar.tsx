import React from "react";

type Props = {};

const Navbar = (props: Props) => {
    return (
        <div
            className="flex items-center justify-between h-12 shadow-sm border border-t-0 
        border-gray-400 rounded-md"
        >
            <div className="ml-2 font-serif font-semibold cursor-pointer">
                AI Crawler
            </div>
        </div>
    );
};

export default Navbar;
