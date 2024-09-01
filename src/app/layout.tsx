import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ThemeContextProvider from "@/context/theme-context";
import ThemeSwitch from "@/components/theme-switch";
import { Toaster } from "react-hot-toast";
import { connectDB } from "@/utils";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "AI chat app",
    description: "Generated using Gemini and Vishal",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    connectDB();

    return (
        <html lang="en">
            <body
                className={`${inter.className} bg-gray-50 text-gray-950 
                  relative dark:bg-gray-900 dark:text-gray-50 dark:text-opacity-90`}
            >
                <div
                    className="bg-[#fbe2e3] absolute top-[-6rem] -z-10 right-[11rem] 
                    h-[31.25rem] w-[31.25rem] rounded-full blur-[10rem] sm:w-[68.75rem] 
                    dark:bg-[#714243]"
                />
                <div
                    className="bg-[#dbd7fb] absolute top-[-1rem] -z-10 left-[-35rem] 
                      h-[31.25rem] w-[50rem] rounded-full blur-[10rem] sm:w-[68.75rem] 
                      md:left-[-33rem] lg:left-[-28rem] xl:left-[-15rem] 2xl:left-[-5rem] 
                      dark:bg-[#312f48]"
                />
                <ThemeContextProvider>
                    <div className="px-2 md:px-12 lg:px-32 flex items-center justify-center">
                        {children}
                        <div className="hidden md:block">
                            <ThemeSwitch />
                        </div>
                        <Toaster />
                    </div>
                </ThemeContextProvider>
            </body>
        </html>
    );
}
