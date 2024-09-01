"use client";
import Image from "next/image";
import React, { useState } from "react";
import { Settings, User } from "lucide-react";
import { IoMoonOutline } from "react-icons/io5";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuPortal,
    DropdownMenuRadioGroup,
    DropdownMenuSeparator,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { IoIosMenu } from "react-icons/io";
import { FiSun } from "react-icons/fi";
import { CiCirclePlus } from "react-icons/ci";
import { useTheme } from "@/context/theme-context";
import { UserModal } from "./UserModal";

type Props = {};

const Navbar = (props: Props) => {
    const { setCurrTheme } = useTheme();
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    const handleNewChat = () => {
        window.localStorage.removeItem("conversationId");
        window.location.reload();
    };

    return (
        <div
            className="flex items-center justify-between h-12 shadow-sm border border-t-0 px-4
        border-gray-400 dark:border-gray-600 bg-gray-100/80 dark:bg-gray-700/50 rounded-md backdrop-blur-md"
        >
            <div className="font-serif font-semibold cursor-pointer">
                <Image
                    src="/chatgpt.svg"
                    alt="homeicon"
                    width={40}
                    height={40}
                    className="w-9 h-9 rounded-full"
                />
                {/* <p>Chat Bot</p> */}
            </div>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <div className="text-2xl cursor-pointer dark:bg-gray-700 dark:text-white">
                        <IoIosMenu />
                    </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56">
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuGroup>
                        <DropdownMenuItem
                            className="cursor-pointer"
                            onClick={handleNewChat}
                        >
                            <CiCirclePlus className="mr-2 h-5 w-5" />
                            <span>New Chat</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem
                            className="cursor-pointer"
                            onClick={openModal}
                        >
                            <User className="mr-2 h-4 w-4" />
                            <span>Profile</span>
                        </DropdownMenuItem>

                        <DropdownMenuItem className="cursor-pointer">
                            <Settings className="mr-2 h-4 w-4" />
                            <span>Settings</span>
                        </DropdownMenuItem>
                    </DropdownMenuGroup>
                    <DropdownMenuRadioGroup>
                        <DropdownMenuSub>
                            <DropdownMenuSubTrigger>
                                <IoMoonOutline className="mr-2 h-4 w-4" />
                                <span>Theme</span>
                            </DropdownMenuSubTrigger>
                            <DropdownMenuPortal>
                                <DropdownMenuSubContent>
                                    <DropdownMenuItem
                                        className="cursor-pointer"
                                        onClick={() => setCurrTheme("light")}
                                    >
                                        <FiSun className="mr-2 h-4 w-4" />
                                        <span>Light</span>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem
                                        className="cursor-pointer"
                                        onClick={() => setCurrTheme("dark")}
                                    >
                                        <IoMoonOutline className="mr-2 h-4 w-4" />
                                        <span>Dark</span>
                                    </DropdownMenuItem>
                                </DropdownMenuSubContent>
                            </DropdownMenuPortal>
                        </DropdownMenuSub>
                    </DropdownMenuRadioGroup>
                    {/* <DropdownMenuSeparator />
                    <DropdownMenuItem>
                        <LogOut className="mr-2 h-4 w-4" />
                        <span>Log out</span>
                    </DropdownMenuItem> */}
                </DropdownMenuContent>
            </DropdownMenu>
            <UserModal isOpen={isModalOpen} onClose={closeModal} />
        </div>
    );
};

export default Navbar;
