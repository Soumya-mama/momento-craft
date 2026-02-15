"use client";

import { useState, useEffect, createContext, useContext, ReactNode } from "react";
import { useRouter } from "next/navigation";

interface User {
    id: string;
    email: string;
    name: string | null;
    role: string;
}

interface AuthContextType {
    user: User | null;
    isLoading: boolean;
    login: (data: any) => Promise<void>;
    register: (data: any) => Promise<void>;
    logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        checkAuth();
    }, []);

    const checkAuth = async () => {
        try {
            const res = await fetch("/api/auth/me");
            const data = await res.json();
            setUser(data.user);
        } catch (error) {
            setUser(null);
        } finally {
            setIsLoading(false);
        }
    };

    const login = async (data: any) => {
        const res = await fetch("/api/auth/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
        });

        if (!res.ok) {
            const err = await res.json();
            throw new Error(err.error || 'Login failed');
        }

        const result = await res.json();
        setUser(result.user);
        router.refresh();
    };

    const register = async (data: any) => {
        const res = await fetch("/api/auth/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
        });

        if (!res.ok) {
            const err = await res.json();
            throw new Error(err.error || 'Registration failed');
        }

        const result = await res.json();
        setUser(result.user);
        router.refresh();
    };

    const logout = async () => {
        await fetch("/api/auth/logout", { method: "POST" });
        setUser(null);
        router.push("/");
        router.refresh();
    };

    return (
        <AuthContext.Provider value={{ user, isLoading, login, register, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
}
