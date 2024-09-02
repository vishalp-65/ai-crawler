import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

interface User {
    name: string;
    email: string;
    profileImageURL: string;
    conversationId: string[];
}

interface UserContextType {
    user: User | null;
    loading: boolean;
    error: string | null;
    fetchUserData: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const useUser = () => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error("useUser must be used within a UserProvider");
    }
    return context;
};

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const fetchUserData = async () => {
        setLoading(true);
        const token = window.localStorage.getItem("__ai_chatbot_token");

        if (!token) {
            setError("Token not found");
            setLoading(false);
            return;
        }

        try {
            const { data } = await axios.get<User>(`/api/user`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setUser(data);
            setError(null);
        } catch (err) {
            console.error("Failed to fetch user data:", err);
            setError("Failed to fetch user data");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUserData();
    }, []);

    return (
        <UserContext.Provider value={{ user, loading, error, fetchUserData }}>
            {children}
        </UserContext.Provider>
    );
};
