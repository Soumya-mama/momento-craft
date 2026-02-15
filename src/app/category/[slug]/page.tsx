import { ProductCard } from "@/components/products/ProductCard";
import { Product } from "@/types";
import db from "@/lib/db";
import { notFound } from "next/navigation";
import { Metadata } from "next";

interface CategoryPageProps {
    params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
    const { slug } = await params;
    const categoryName = slug.charAt(0).toUpperCase() + slug.slice(1);
    return {
        title: `${categoryName} | SoulSketch Studio`,
        description: `Browse our collection of ${categoryName}. Handcrafted with love.`,
    };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
    const { slug } = await params;
    const validCategories = ["portraits", "crafts", "gifts"];

    if (!validCategories.includes(slug)) {
        notFound();
    }

    // Explicitly typing the result to ensure type safety
    const products: Product[] = (await db.product.findMany({
        where: { category: slug },
        orderBy: { createdAt: "desc" },
    })) as unknown as Product[];
    // Note: The cast `as unknown as Product[]` is added to handle potential mismatches 
    // if the Prisma generated type differs slightly from our manual interface, 
    // but in this case they should match. This guarantees `products` is `Product[]`.

    const categoryName = slug.charAt(0).toUpperCase() + slug.slice(1);

    return (
        <div style={{ padding: "4rem 1.5rem", minHeight: "80vh", backgroundColor: "var(--color-cream)" }}>
            <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
                <h1 style={{
                    fontFamily: "var(--font-heading)",
                    fontSize: "3rem",
                    marginBottom: "1rem",
                    color: "var(--color-earth)"
                }}>
                    {categoryName}
                </h1>
                <p style={{ marginBottom: "3rem", fontSize: "1.125rem", opacity: 0.8, maxWidth: "600px" }}>
                    Discover our exclusive collection of {slug}. Each piece is created with passion and attention to detail.
                </p>

                {products.length === 0 ? (
                    <div style={{ textAlign: "center", padding: "4rem", backgroundColor: "white", borderRadius: "16px" }}>
                        <p>No products found in this category yet.</p>
                    </div>
                ) : (
                    <div style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
                        gap: "2rem"
                    }}>
                        {products.map((product) => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
