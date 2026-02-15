"use client";

import { useState, useEffect, createContext, useContext, ReactNode } from "react";

export interface CartItem {
    id: string;
    productId: string;
    name: string;
    price: number;
    image: string;
    quantity: number;
    options?: Record<string, string>;
}

interface CartContextType {
    items: CartItem[];
    addItem: (item: Omit<CartItem, "id">) => void;
    removeItem: (id: string) => void;
    updateQuantity: (id: string, quantity: number) => void;
    clearCart: () => void;
    total: number;
    itemCount: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
    const [items, setItems] = useState<CartItem[]>([]);

    useEffect(() => {
        const savedCart = localStorage.getItem("cart");
        if (savedCart) {
            try {
                setItems(JSON.parse(savedCart));
            } catch (e) {
                console.error("Failed to parse cart", e);
            }
        }
    }, []);

    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(items));
    }, [items]);

    const addItem = (newItem: Omit<CartItem, "id">) => {
        setItems((prev) => {
            const existingItem = prev.find(
                (item) => item.productId === newItem.productId && JSON.stringify(item.options) === JSON.stringify(newItem.options)
            );

            if (existingItem) {
                return prev.map((item) =>
                    item.id === existingItem.id
                        ? { ...item, quantity: item.quantity + newItem.quantity }
                        : item
                );
            }

            return [...prev, { ...newItem, id: Math.random().toString(36).substr(2, 9) }];
        });
    };

    const removeItem = (id: string) => {
        setItems((prev) => prev.filter((item) => item.id !== id));
    };

    const updateQuantity = (id: string, quantity: number) => {
        setItems((prev) =>
            prev.map((item) => (item.id === id ? { ...item, quantity: Math.max(0, quantity) } : item))
        );
    };

    const clearCart = () => {
        setItems([]);
    };

    const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

    return (
        <CartContext.Provider value={{ items, addItem, removeItem, updateQuantity, clearCart, total, itemCount }}>
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    const context = useContext(CartContext);
    if (context === undefined) {
        throw new Error("useCart must be used within a CartProvider");
    }
    return context;
}
