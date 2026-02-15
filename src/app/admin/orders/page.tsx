import db from "@/lib/db";
import { Button } from "@/components/ui/Button";

export default async function AdminOrdersPage() {
    const orders = await db.order.findMany({
        include: {
            user: true,
            items: { include: { product: true } }
        },
        orderBy: { createdAt: "desc" },
    });

    return (
        <div>
            <h1 style={{ fontFamily: "var(--font-heading)", fontSize: "2rem", marginBottom: "2rem", color: "var(--color-earth)" }}>Orders</h1>

            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                {orders.map((order: any) => (
                    <div key={order.id} style={{ backgroundColor: "white", padding: "1.5rem", borderRadius: "16px", boxShadow: "var(--shadow-sm)" }}>
                        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "1rem", flexWrap: "wrap", gap: "1rem" }}>
                            <div>
                                <h3 style={{ fontWeight: 700 }}>Order #{order.id.slice(-6).toUpperCase()}</h3>
                                <p style={{ fontSize: "0.875rem", opacity: 0.7 }}>{new Date(order.createdAt).toLocaleDateString()}</p>
                            </div>
                            <div>
                                <span style={{
                                    padding: "0.25rem 0.75rem", borderRadius: "999px", fontSize: "0.875rem", fontWeight: 500,
                                    backgroundColor: order.status === 'delivered' ? 'var(--color-success)' : 'var(--color-clay)',
                                    color: 'white'
                                }}>
                                    {order.status.toUpperCase()}
                                </span>
                            </div>
                        </div>

                        <div style={{ marginBottom: "1rem" }}>
                            <p><strong>Customer:</strong> {order.user.name} ({order.user.email})</p>
                            <p><strong>Total:</strong> ${order.total.toFixed(2)}</p>
                        </div>

                        <div style={{ backgroundColor: "var(--color-cream)", padding: "1rem", borderRadius: "8px" }}>
                            {order.items.map((item: any) => (
                                <div key={item.id} style={{ display: "flex", justifyContent: "space-between", fontSize: "0.9rem", marginBottom: "0.5rem" }}>
                                    <span>{item.quantity}x {item.product.name}</span>
                                    <span>${(item.price * item.quantity).toFixed(2)}</span>
                                </div>
                            ))}
                        </div>

                        <div style={{ marginTop: "1rem", display: "flex", gap: "1rem" }}>
                            <Button size="sm" variant="outline">Update Status</Button>
                        </div>
                    </div>
                ))}

                {orders.length === 0 && (
                    <div style={{ textAlign: "center", padding: "2rem", opacity: 0.7 }}>No orders found yet.</div>
                )}
            </div>
        </div>
    );
}
