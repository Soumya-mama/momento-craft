"use client";

import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { useState } from "react";
import { Loader2 } from "lucide-react";

export default function LoginPage() {
    const { login } = useAuth();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            await login(email, password);
        } catch (err: any) {
            setError(err.message || "Login failed");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{
            minHeight: "80vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "var(--color-cream)",
            padding: "2rem"
        }}>
            <div style={{
                width: "100%",
                maxWidth: "400px",
                backgroundColor: "white",
                padding: "2.5rem",
                borderRadius: "16px",
                boxShadow: "var(--shadow-md)"
            }}>
                <h1 style={{
                    fontFamily: "var(--font-heading)",
                    fontSize: "2rem",
                    textAlign: "center",
                    color: "var(--color-earth)",
                    marginBottom: "2rem"
                }}>
                    Sign In
                </h1>

                {error && (
                    <div style={{
                        backgroundColor: "rgba(255, 0, 0, 0.1)",
                        color: "var(--color-error)",
                        padding: "0.75rem",
                        borderRadius: "8px",
                        marginBottom: "1.5rem",
                        fontSize: "0.875rem",
                        textAlign: "center"
                    }}>
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
                    <div style={{ display: "grid", gap: "0.5rem" }}>
                        <label htmlFor="email" style={{ fontSize: "0.875rem", fontWeight: 700 }}>Email Address</label>
                        <input
                            id="email"
                            type="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            style={{ padding: "0.75rem", border: "1px solid var(--color-stone)", borderRadius: "8px" }}
                            placeholder="you@example.com"
                        />
                    </div>

                    <div style={{ display: "grid", gap: "0.5rem" }}>
                        <label htmlFor="password" style={{ fontSize: "0.875rem", fontWeight: 700 }}>Password</label>
                        <input
                            id="password"
                            type="password"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            style={{ padding: "0.75rem", border: "1px solid var(--color-stone)", borderRadius: "8px" }}
                            placeholder="••••••••"
                        />
                    </div>

                    <Button type="submit" size="lg" disabled={loading} style={{ marginTop: "0.5rem" }}>
                        {loading ? <><Loader2 className="spin" size={18} style={{ marginRight: "0.5rem" }} /> Signing In...</> : "Sign In"}
                    </Button>
                </form>

                <p style={{ textAlign: "center", marginTop: "2rem", fontSize: "0.875rem", color: "var(--color-text-dark)", opacity: 0.8 }}>
                    Don't have an account? <Link href="/register" style={{ fontWeight: 700, textDecoration: "underline", color: "var(--color-earth)" }}>Create Account</Link>
                </p>
            </div>
        </div>
    );
}
