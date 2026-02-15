"use client";

import { useState } from "react";
import { useCart } from "@/hooks/useCart";
import { Button } from "@/components/ui/Button";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

export default function CheckoutPage() {
    const { items, total, clearCart } = useCart();
    const { user } = useAuth();
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState({
        name: user?.name || "",
        email: user?.email || "",
        address: "",
        city: "",
        postalCode: "",
        country: "",
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            // Mock payment processing
            await new Promise(resolve => setTimeout(resolve, 2000));

            // Create order
            const res = await fetch("/api/orders", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    items,
                    total,
                    shippingAddress: formData,
                }),
            });

            if (!res.ok) throw new Error("Failed to create order");

            const order = await res.json();
            clearCart();
            router.push(`/order-confirmation/${order.id}`);
        } catch (error) {
            alert("Something went wrong. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    if (items.length === 0) {
        return <div style={{ padding: "4rem", textAlign: "center" }}>Cart is empty</div>;
    }

    return (
        <div style={{ padding: "4rem 1.5rem", minHeight: "80vh", backgroundColor: "var(--color-cream)" }}>
            <div style={{ maxWidth: "800px", margin: "0 auto" }}>
                <h1 style={{ fontFamily: "var(--font-heading)", fontSize: "2.5rem", marginBottom: "2rem", color: "var(--color-earth)" }}>Checkout</h1>

                <div style={{ display: "grid", gridTemplateColumns: "1.5fr 1fr", gap: "3rem" }}>
                    <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
                        <h2 style={{ fontSize: "1.5rem", fontFamily: "var(--font-heading)" }}>Shipping Details</h2>

                        <div style={{ display: "grid", gap: "0.5rem" }}>
                            <label>Full Name</label>
                            <input
                                type="text"
                                required
                                value={formData.name}
                                onChange={e => setFormData({ ...formData, name: e.target.value })}
                                style={{ padding: "0.75rem", border: "1px solid var(--color-stone)", borderRadius: "8px" }}
                            />
                        </div>

                        <div style={{ display: "grid", gap: "0.5rem" }}>
                            <label>Email</label>
                            <input
                                type="email"
                                required
                                value={formData.email}
                                onChange={e => setFormData({ ...formData, email: e.target.value })}
                                style={{ padding: "0.75rem", border: "1px solid var(--color-stone)", borderRadius: "8px" }}
                            />
                        </div>

                        <div style={{ display: "grid", gap: "0.5rem" }}>
                            <label>Address</label>
                            <input
                                type="text"
                                required
                                value={formData.address}
                                onChange={e => setFormData({ ...formData, address: e.target.value })}
                                style={{ padding: "0.75rem", border: "1px solid var(--color-stone)", borderRadius: "8px" }}
                            />
                        </div>

                        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                            <div style={{ display: "grid", gap: "0.5rem" }}>
                                <label>City</label>
                                <input
                                    type="text"
                                    required
                                    value={formData.city}
                                    onChange={e => setFormData({ ...formData, city: e.target.value })}
                                    style={{ padding: "0.75rem", border: "1px solid var(--color-stone)", borderRadius: "8px" }}
                                />
                            </div>
                            <div style={{ display: "grid", gap: "0.5rem" }}>
                                <label>Postal Code</label>
                                <input
                                    type="text"
                                    required
                                    value={formData.postalCode}
                                    onChange={e => setFormData({ ...formData, postalCode: e.target.value })}
                                    style={{ padding: "0.75rem", border: "1px solid var(--color-stone)", borderRadius: "8px" }}
                                />
                            </div>
                        </div>

                        <h2 style={{ fontSize: "1.5rem", fontFamily: "var(--font-heading)", marginTop: "1rem" }}>Payment</h2>
                        <div style={{ padding: "1rem", backgroundColor: "white", borderRadius: "8px", border: "1px solid var(--color-stone)" }}>
                            <p>Secure Mock Payment Gateway (Stripe/Razorpay)</p>
                            <p style={{ fontSize: "0.875rem", opacity: 0.7, marginTop: "0.5rem" }}>No real charge will be made.</p>
                        </div>

                        <Button type="submit" size="lg" disabled={loading} style={{ marginTop: "1rem" }}>
                            {loading ? <><Loader2 style={{ marginRight: "0.5rem" }} className="spin" /> Processing...</> : `Pay $${total.toFixed(2)}`}
                        </Button>
                    </form>

                    <div style={{ backgroundColor: "white", padding: "1.5rem", borderRadius: "16px", height: "fit-content", boxShadow: "var(--shadow-sm)" }}>
                        <h3 style={{ fontFamily: "var(--font-heading)", marginBottom: "1rem" }}>In Your Cart</h3>
                        <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "1rem" }}>
                            {items.map(item => (
                                <li key={item.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: "0.9rem" }}>
                                    <span>{item.quantity}x {item.name}</span>
                                    <span style={{ fontWeight: 700 }}>${(item.price * item.quantity).toFixed(2)}</span>
                                </li>
                            ))}
                        </ul>
                        <div style={{ borderTop: "1px solid #eee", margin: "1rem 0", paddingTop: "1rem", display: "flex", justifyContent: "space-between", fontWeight: 700 }}>
                            <span>Total</span>
                            <span>${total.toFixed(2)}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
