"use client";
import Container from "@/components/Container";
import { UserProvider } from "@/context/user_context";

export default function Home() {
    return (
        <UserProvider>
            <div className="relative w-full min-h-screen">
                <Container />
            </div>
        </UserProvider>
    );
}
