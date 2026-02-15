"use client";

import Link from "next/link";
import { Product } from "@/types";
import { Button } from "@/components/ui/Button";
import { ShoppingCart } from "lucide-react";
import { useCart } from "@/hooks/useCart";
import Image from "next/image";
import styles from "./ProductCard.module.css";

interface ProductCardProps {
    product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
    const { addToCart } = useCart();

    let mainImage = "/placeholder.jpg";
    try {
        const images = JSON.parse(product.images);
        if (Array.isArray(images) && images.length > 0) {
            mainImage = images[0];
        }
    } catch (e) {
        // console.error("Failed to parse images for product", product.id);
    }

    return (
        <div className={styles.card}>
            <Link href={`/product/${product.id}`} className={styles.imageLink}>
                <div className={styles.imageWrapper}>
                    <img
                        src={mainImage}
                        alt={product.name}
                        className={styles.image}
                        loading="lazy"
                    />
                </div>
            </Link>

            <div className={styles.content}>
                <div className={styles.header}>
                    <span className={styles.category}>{product.category}</span>
                    <span className={styles.price}>${product.price.toFixed(2)}</span>
                </div>

                <Link href={`/product/${product.id}`}>
                    <h3 className={styles.title}>{product.name}</h3>
                </Link>

                <p className={styles.description}>
                    {product.description.length > 60
                        ? product.description.substring(0, 60) + "..."
                        : product.description}
                </p>

                <Button
                    onClick={() => addToCart(product.id, 1)}
                    className={styles.addToCartBtn}
                    fullWidth
                    variant="primary"
                >
                    <ShoppingCart size={18} style={{ marginRight: "0.5rem" }} />
                    Add to Cart
                </Button>
            </div>
        </div>
    );
}
