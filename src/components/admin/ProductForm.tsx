"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

export function ProductForm() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        description: "",
        price: "",
        category: "portraits",
        image: "",
        stock: "10",
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const res = await fetch("/api/products", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    ...formData,
                    price: parseFloat(formData.price),
                    stock: parseInt(formData.stock),
                    images: JSON.stringify([formData.image]),
                    category: formData.category
                }),
            });

            if (!res.ok) throw new Error("Failed to create product");

            router.push("/admin/products");
            router.refresh();
        } catch (error) {
            alert("Failed to create product");
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} style={{ maxWidth: "600px", padding: "2rem", backgroundColor: "white", borderRadius: "16px", boxShadow: "var(--shadow-sm)" }}>
            <div style={{ display: "grid", gap: "1.5rem" }}>
                <div style={{ display: "grid", gap: "0.5rem" }}>
                    <label>Product Name</label>
                    <input
                        required
                        value={formData.name}
                        onChange={e => setFormData({ ...formData, name: e.target.value })}
                        style={{ padding: "0.75rem", border: "1px solid var(--color-stone)", borderRadius: "8px" }}
                    />
                </div>

                <div style={{ display: "grid", gap: "0.5rem" }}>
                    <label>Description</label>
                    <textarea
                        required
                        rows={4}
                        value={formData.description}
                        onChange={e => setFormData({ ...formData, description: e.target.value })}
                        style={{ padding: "0.75rem", border: "1px solid var(--color-stone)", borderRadius: "8px" }}
                    />
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                    <div style={{ display: "grid", gap: "0.5rem" }}>
                        <label>Price</label>
                        <input
                            type="number"
                            step="0.01"
                            required
                            value={formData.price}
                            onChange={e => setFormData({ ...formData, price: e.target.value })}
                            style={{ padding: "0.75rem", border: "1px solid var(--color-stone)", borderRadius: "8px" }}
                        />
                    </div>
                    <div style={{ display: "grid", gap: "0.5rem" }}>
                        <label>Stock</label>
                        <input
                            type="number"
                            required
                            value={formData.stock}
                            onChange={e => setFormData({ ...formData, stock: e.target.value })}
                            style={{ padding: "0.75rem", border: "1px solid var(--color-stone)", borderRadius: "8px" }}
                        />
                    </div>
                </div>

                <div style={{ display: "grid", gap: "0.5rem" }}>
                    <label>Category</label>
                    <select
                        value={formData.category}
                        onChange={e => setFormData({ ...formData, category: e.target.value })}
                        style={{ padding: "0.75rem", border: "1px solid var(--color-stone)", borderRadius: "8px" }}
                    >
                        <option value="portraits">Portraits</option>
                        <option value="crafts">Crafts</option>
                        <option value="gifts">Gifts</option>
                    </select>
                </div>

                <div style={{ display: "grid", gap: "0.5rem" }}>
                    <label>Image URL</label>
                    <input
                        type="url"
                        required
                        placeholder="https://example.com/image.jpg"
                        value={formData.image}
                        onChange={e => setFormData({ ...formData, image: e.target.value })}
                        style={{ padding: "0.75rem", border: "1px solid var(--color-stone)", borderRadius: "8px" }}
                    />
                </div>

                <Button type="submit" size="lg" disabled={loading}>
                    {loading ? <><Loader2 className="spin" /> Creating...</> : "Create Product"}
                </Button>
            </div>
        </form>
    );
}
