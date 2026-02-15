import db from "@/lib/db";
import { Package, ShoppingBag, Users, DollarSign } from "lucide-react";

async function getStats() {
    const productCount = await db.product.count();
    const orderCount = await db.order.count();
    const userCount = await db.user.count();
    const totalRevenue = await db.order.aggregate({
        _sum: { total: true },
        where: { paymentStatus: 'paid' }
    });

    return { productCount, orderCount, userCount, revenue: totalRevenue._sum.total || 0 };
}

export default async function AdminDashboard() {
    const stats = await getStats();

    return (
        <div>
            <h1 style={{ fontFamily: "var(--font-heading)", fontSize: "2rem", marginBottom: "2rem", color: "var(--color-earth)" }}>Dashboard Overview</h1>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "2rem" }}>
                <div style={{ padding: "1.5rem", backgroundColor: "white", borderRadius: "16px", boxShadow: "var(--shadow-sm)" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.5rem" }}>
                        <span style={{ fontSize: "0.875rem", opacity: 0.7 }}>Total Revenue</span>
                        <DollarSign size={20} color="var(--color-success)" />
                    </div>
                    <p style={{ fontSize: "1.5rem", fontWeight: 700 }}>${stats.revenue.toFixed(2)}</p>
                </div>

                <div style={{ padding: "1.5rem", backgroundColor: "white", borderRadius: "16px", boxShadow: "var(--shadow-sm)" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.5rem" }}>
                        <span style={{ fontSize: "0.875rem", opacity: 0.7 }}>Orders</span>
                        <ShoppingBag size={20} color="var(--color-earth)" />
                    </div>
                    <p style={{ fontSize: "1.5rem", fontWeight: 700 }}>{stats.orderCount}</p>
                </div>

                <div style={{ padding: "1.5rem", backgroundColor: "white", borderRadius: "16px", boxShadow: "var(--shadow-sm)" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.5rem" }}>
                        <span style={{ fontSize: "0.875rem", opacity: 0.7 }}>Products</span>
                        <Package size={20} color="var(--color-clay)" />
                    </div>
                    <p style={{ fontSize: "1.5rem", fontWeight: 700 }}>{stats.productCount}</p>
                </div>

                <div style={{ padding: "1.5rem", backgroundColor: "white", borderRadius: "16px", boxShadow: "var(--shadow-sm)" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.5rem" }}>
                        <span style={{ fontSize: "0.875rem", opacity: 0.7 }}>Users</span>
                        <Users size={20} color="var(--color-stone)" />
                    </div>
                    <p style={{ fontSize: "1.5rem", fontWeight: 700 }}>{stats.userCount}</p>
                </div>
            </div>
        </div>
    );
}
