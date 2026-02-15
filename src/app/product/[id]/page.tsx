import db from "@/lib/db";
import { notFound } from "next/navigation";
import { ProductDetails } from "@/components/products/ProductDetails";
import { Metadata } from "next";

interface ProductPageProps {
    params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
    const { id } = await params;
    const product = await db.product.findUnique({
        where: { id },
    });

    if (!product) return { title: "Product Not Found" };

    return {
        title: `${product.name} | SoulSketch Studio`,
        description: product.description.substring(0, 160),
    };
}

export default async function ProductPage({ params }: ProductPageProps) {
    const { id } = await params;

    // Try to find in DB
    let product = await db.product.findUnique({
        where: { id },
    });

    // Fallback for mock data (IDs 1-4 from homepage)
    if (!product) {
        const mockProducts = [
            {
                id: "1",
                name: "Custom Oil Portrait",
                description: "Hand-painted oil portrait based on your photo. Our artists spend over 20 hours perfecting every detail to capture the soul of the subject. Available in various sizes and frame options.",
                price: 149.99,
                category: "portraits",
                images: JSON.stringify(["https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?q=80&w=2000&auto=format&fit=crop", "https://images.unsplash.com/photo-1578321272175-10118eb98cb8"]),
                stock: 10,
                createdAt: new Date(), updatedAt: new Date()
            },
            // ... add other mocks if needed for demo
            {
                id: "2",
                name: "Handmade Clay Vase",
                description: "Unique aesthetic vase for your home.",
                price: 45.00,
                category: "crafts",
                images: JSON.stringify(["https://images.unsplash.com/photo-1610701596007-11502861dcfa?q=80&w=2000&auto=format&fit=crop"]),
                stock: 5,
                createdAt: new Date(), updatedAt: new Date()
            },
            {
                id: "3",
                name: "Personalized Memory Box",
                description: "Wooden box engraved with your message.",
                price: 89.00,
                category: "gifts",
                images: JSON.stringify(["https://images.unsplash.com/photo-1544816155-12df9643f363?q=80&w=2000&auto=format&fit=crop"]),
                stock: 8,
                createdAt: new Date(), updatedAt: new Date()
            },
            {
                id: "4",
                name: "Minimalist Sketch",
                description: "Charcoal sketch of your favorite memory.",
                price: 75.00,
                category: "portraits",
                images: JSON.stringify(["https://images.unsplash.com/photo-1513364776144-60967b0f800f?q=80&w=2000&auto=format&fit=crop"]),
                stock: 15,
                createdAt: new Date(), updatedAt: new Date()
            },
        ];
        product = mockProducts.find(p => p.id === id) || null;
    }

    if (!product) {
        notFound();
    }

    return (
        <div style={{ backgroundColor: 'var(--color-cream)', minHeight: '100vh' }}>
            {/* @ts-ignore - mismatch in Product type vs DB type due to mock properties */}
            <ProductDetails product={product} />
        </div>
    );
}
