import { CheckCircle } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

interface PageProps {
    params: Promise<{ id: string }>;
}

export default async function OrderConfirmationPage({ params }: PageProps) {
    const { id } = await params;
    return (
        <div style={{ padding: "6rem 1.5rem", textAlign: "center", minHeight: "80vh", backgroundColor: "var(--color-cream)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
            <CheckCircle size={80} color="var(--color-success)" style={{ marginBottom: "2rem" }} />
            <h1 style={{ fontFamily: "var(--font-heading)", fontSize: "3rem", marginBottom: "1rem", color: "var(--color-earth)" }}>
                Thank You!
            </h1>
            <p style={{ fontSize: "1.25rem", marginBottom: "1rem" }}>Your order <strong>#{id.slice(-6).toUpperCase()}</strong> has been placed successfully.</p>
            <p style={{ marginBottom: "3rem", opacity: 0.8, maxWidth: "500px" }}>
                We have sent a confirmation email to you. We will notify you when your handmade piece is on its way.
            </p>
            <Link href="/">
                <Button size="lg">Continue Shopping</Button>
            </Link>
        </div>
    );
}
