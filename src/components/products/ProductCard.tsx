"use client";

import Link from "next/link";
import Image from "next/image";
import { Product } from "@/types";
import { Button } from "@/components/ui/Button";
import { useCart } from "@/hooks/useCart";
import styles from "./ProductCard.module.css";
import { ShoppingBag } from "lucide-react";

interface ProductCardProps {
    product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
    const { addItem } = useCart();
    const images = JSON.parse(product.images) as string[];
    const mainImage = images[0] || "/placeholder.jpg";

    const handleAddToCart = (e: React.MouseEvent) => {
        e.preventDefault();
        addItem({
            productId: product.id,
            name: product.name,
            price: product.price,
            image: mainImage,
            quantity: 1,
        });
    };

    return (
        <Link href={`/product/${product.id}`} className={styles.card}>
            <div className={styles.imageContainer}>
                {/* In production, use next/image with proper remotePatterns */}
                <img src={mainImage} alt={product.name} className={styles.image} />
                <div className={styles.overlay}>
                    <Button
                        size="sm"
                        onClick={handleAddToCart}
                        className={styles.addToCartBtn}
                    >
                        <ShoppingBag size={18} style={{ marginRight: '0.5rem' }} /> Add to Cart
                    </Button>
                </div>
            </div>
            <div className={styles.details}>
                <h3 className={styles.name}>{product.name}</h3>
                <p className={styles.category}>{product.category}</p>
                <p className={styles.price}>${product.price.toFixed(2)}</p>
            </div>
        </Link>
    );
}
