"use client";
import React, {
    createContext,
    useCallback,
    useContext,
    useEffect,
    useMemo,
    useState,
} from "react";
import axios from "axios";

interface User {
    name: string;
    email: string;
    age: number;
    profileImageURL: string;
    conversationId: string[];
}

interface UserContextType {
    user: User | null;
    loading: boolean;
    error: string | null;
    fetchUserData: () => void;
    handleConversationId: (id: string) => void;
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
    const [conversationId, setConversationId] = useState<string | null>(null);
    let token: string | null;

    const fetchUserData = useCallback(async () => {
        setLoading(true);
        token = window.localStorage.getItem("__ai_chatbot_token");

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
    }, []);

    const updateConversationId = useCallback(async (id: string | null) => {
        if (!id) return;
        try {
            // Add the conversationId to the user model if it's not there already
            await axios.put(
                `/api/user/conversation`,
                { conversationId: id },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
        } catch (error) {}
    }, []);

    const handleConversationId = (id: string) => {
        setConversationId(id);
    };

    useEffect(() => {
        fetchUserData();
    }, [fetchUserData]);

    useEffect(() => {
        updateConversationId(conversationId);
    }, [conversationId]);

    const value = useMemo(
        () => ({ user, loading, error, fetchUserData, handleConversationId }),
        [user, loading, error, fetchUserData, handleConversationId]
    );

    return (
        <UserContext.Provider value={value}>{children}</UserContext.Provider>
    );
};
