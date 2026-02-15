import { getSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import { LayoutDashboard, Package, ShoppingBag, LogOut } from "lucide-react";
import { Button } from "@/components/ui/Button";

export default async function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const session = await getSession();

    if (!session || session.role !== "admin") {
        redirect("/login");
    }

    return (
        <div style={{ display: "flex", minHeight: "100vh", backgroundColor: "var(--color-cream)" }}>
            {/* Sidebar */}
            <aside style={{
                width: "250px",
                backgroundColor: "var(--color-earth)",
                color: "var(--color-cream)",
                padding: "2rem",
                display: "flex",
                flexDirection: "column"
            }}>
                <h2 style={{ fontFamily: "var(--font-heading)", fontSize: "1.5rem", marginBottom: "3rem" }}>Admin Panel</h2>

                <nav style={{ display: "flex", flexDirection: "column", gap: "1rem", flex: 1 }}>
                    <Link href="/admin" style={{ display: "flex", alignItems: "center", gap: "0.75rem", padding: "0.75rem", borderRadius: "8px", backgroundColor: "rgba(255,255,255,0.1)" }}>
                        <LayoutDashboard size={20} /> Dashboard
                    </Link>
                    <Link href="/admin/products" style={{ display: "flex", alignItems: "center", gap: "0.75rem", padding: "0.75rem", borderRadius: "8px" }}>
                        <Package size={20} /> Products
                    </Link>
                    <Link href="/admin/orders" style={{ display: "flex", alignItems: "center", gap: "0.75rem", padding: "0.75rem", borderRadius: "8px" }}>
                        <ShoppingBag size={20} /> Orders
                    </Link>
                </nav>

                <form action="/api/auth/logout" method="POST">
                    <button type="submit" style={{ display: "flex", alignItems: "center", gap: "0.75rem", color: "white", opacity: 0.8, cursor: "pointer" }}>
                        <LogOut size={20} /> Logout
                    </button>
                </form>
            </aside>

            {/* Main Content */}
            <main style={{ flex: 1, padding: "2rem" }}>
                {children}
            </main>
        </div>
    );
}
