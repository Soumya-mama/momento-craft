import db from "@/lib/db";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Plus, Edit, Trash2 } from "lucide-react";
import Image from "next/image";

export default async function AdminProductsPage() {
    const products = await db.product.findMany({
        orderBy: { createdAt: "desc" },
    });

    return (
        <div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "2rem" }}>
                <h1 style={{ fontFamily: "var(--font-heading)", fontSize: "2rem", color: "var(--color-earth)" }}>Products</h1>
                <Link href="/admin/products/new">
                    <Button><Plus size={18} style={{ marginRight: "0.5rem" }} /> Add Product</Button>
                </Link>
            </div>

            <div style={{ backgroundColor: "white", borderRadius: "16px", overflow: "hidden", boxShadow: "var(--shadow-sm)" }}>
                <table style={{ width: "100%", borderCollapse: "collapse" }}>
                    <thead>
                        <tr style={{ backgroundColor: "var(--color-sand)", textAlign: "left" }}>
                            <th style={{ padding: "1rem" }}>Image</th>
                            <th style={{ padding: "1rem" }}>Name</th>
                            <th style={{ padding: "1rem" }}>Category</th>
                            <th style={{ padding: "1rem" }}>Price</th>
                            <th style={{ padding: "1rem" }}>Stock</th>
                            <th style={{ padding: "1rem" }}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((product: any) => {
                            let image = "/placeholder.jpg";
                            try {
                                const images = JSON.parse(product.images);
                                if (Array.isArray(images) && images.length > 0) {
                                    image = images[0];
                                }
                            } catch (e) {
                                // console.error("Error parsing images", e);
                            }
                            return (
                                <tr key={product.id} style={{ borderBottom: "1px solid #eee" }}>
                                    <td style={{ padding: "1rem" }}>
                                        <div style={{ width: "50px", height: "50px", borderRadius: "8px", overflow: "hidden", backgroundColor: "var(--color-sand)" }}>
                                            <img src={image} alt={product.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                                        </div>
                                    </td>
                                    <td style={{ padding: "1rem", fontWeight: 500 }}>{product.name}</td>
                                    <td style={{ padding: "1rem", textTransform: "capitalize" }}>{product.category}</td>
                                    <td style={{ padding: "1rem" }}>${product.price.toFixed(2)}</td>
                                    <td style={{ padding: "1rem" }}>{product.stock}</td>
                                    <td style={{ padding: "1rem" }}>
                                        <div style={{ display: "flex", gap: "0.5rem" }}>
                                            <Button variant="ghost" size="sm" style={{ padding: "0.5rem" }}><Edit size={16} /></Button>
                                            <Button variant="ghost" size="sm" style={{ padding: "0.5rem", color: "var(--color-error)" }}><Trash2 size={16} /></Button>
                                        </div>
                                    </td>
                                </tr>
                            )
                        })}
                        {products.length === 0 && (
                            <tr>
                                <td colSpan={6} style={{ padding: "2rem", textAlign: "center", opacity: 0.7 }}>No products found. Add one to get started.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
