"use client";

import { useCart } from "@/hooks/useCart";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { Trash2, Plus, Minus, ArrowRight } from "lucide-react";
import Image from "next/image";

export default function CartPage() {
    const { items, removeItem, updateQuantity, total, clearCart } = useCart();

    if (items.length === 0) {
        return (
            <div style={{ padding: "6rem 1.5rem", textAlign: "center", minHeight: "60vh", backgroundColor: "var(--color-cream)" }}>
                <h1 style={{ fontFamily: "var(--font-heading)", fontSize: "2.5rem", marginBottom: "1.5rem", color: "var(--color-earth)" }}>
                    Your Cart is Empty
                </h1>
                <p style={{ marginBottom: "2rem", opacity: 0.8 }}>Looks like you haven't added any unique pieces yet.</p>
                <Link href="/">
                    <Button size="lg">Start Shopping</Button>
                </Link>
            </div>
        );
    }

    return (
        <div style={{ padding: "4rem 1.5rem", minHeight: "80vh", backgroundColor: "var(--color-cream)" }}>
            <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
                <h1 style={{ fontFamily: "var(--font-heading)", fontSize: "3rem", marginBottom: "3rem", color: "var(--color-earth)" }}>
                    Your Cart
                </h1>

                <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: "4rem" }}>
                    <div>
                        {items.map((item) => (
                            <div key={item.id} style={{
                                display: "flex", gap: "1.5rem", padding: "1.5rem 0",
                                borderBottom: "1px solid rgba(0,0,0,0.1)", alignItems: "center"
                            }}>
                                <div style={{ width: "100px", height: "100px", position: "relative", borderRadius: "8px", overflow: "hidden", backgroundColor: "var(--color-sand)" }}>
                                    <img src={item.image} alt={item.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                                </div>

                                <div style={{ flex: 1 }}>
                                    <h3 style={{ fontFamily: "var(--font-heading)", fontSize: "1.25rem", marginBottom: "0.5rem" }}>{item.name}</h3>
                                    <p style={{ color: "var(--color-earth)", fontWeight: 700, marginBottom: "0.5rem" }}>${item.price.toFixed(2)}</p>

                                    {item.options && (
                                        <div style={{ fontSize: "0.875rem", opacity: 0.7, marginBottom: "0.5rem" }}>
                                            {Object.entries(item.options).map(([key, value]) => (
                                                <span key={key} style={{ display: "block" }}>{key}: {value}</span>
                                            ))}
                                        </div>
                                    )}
                                </div>

                                <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                                    <div style={{ display: "flex", alignItems: "center", border: "1px solid var(--color-stone)", borderRadius: "999px", padding: "0.25rem 0.5rem" }}>
                                        <button onClick={() => updateQuantity(item.id, item.quantity - 1)} disabled={item.quantity <= 1} style={{ padding: "0.25rem" }}>
                                            <Minus size={14} />
                                        </button>
                                        <span style={{ margin: "0 0.75rem", minWidth: "20px", textAlign: "center" }}>{item.quantity}</span>
                                        <button onClick={() => updateQuantity(item.id, item.quantity + 1)} style={{ padding: "0.25rem" }}>
                                            <Plus size={14} />
                                        </button>
                                    </div>
                                    <button onClick={() => removeItem(item.id)} style={{ color: "var(--color-error)", padding: "0.5rem" }}>
                                        <Trash2 size={18} />
                                    </button>
                                </div>
                            </div>
                        ))}

                        <div style={{ marginTop: "2rem" }}>
                            <Button variant="ghost" onClick={clearCart} style={{ color: "var(--color-stone)" }}>
                                Clear Cart
                            </Button>
                        </div>
                    </div>

                    <div style={{ backgroundColor: "white", padding: "2rem", borderRadius: "16px", height: "fit-content", boxShadow: "var(--shadow-md)" }}>
                        <h2 style={{ fontFamily: "var(--font-heading)", fontSize: "1.5rem", marginBottom: "1.5rem" }}>Order Summary</h2>

                        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "1rem", opacity: 0.8 }}>
                            <span>Subtotal</span>
                            <span>${total.toFixed(2)}</span>
                        </div>
                        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "1rem", opacity: 0.8 }}>
                            <span>Shipping</span>
                            <span>Calculated at checkout</span>
                        </div>

                        <div style={{ borderTop: "1px solid rgba(0,0,0,0.1)", margin: "1.5rem 0" }}></div>

                        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "2rem", fontSize: "1.25rem", fontWeight: 700, color: "var(--color-earth)" }}>
                            <span>Total</span>
                            <span>${total.toFixed(2)}</span>
                        </div>

                        <Link href="/checkout">
                            <Button size="lg" className="fullWidthBtn" style={{ width: "100%" }}>
                                Proceed to Checkout <ArrowRight size={18} style={{ marginLeft: "0.5rem" }} />
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
