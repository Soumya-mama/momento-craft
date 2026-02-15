"use client";

import { useState } from "react";
import { Product } from "@/types";
import { Button } from "@/components/ui/Button";
import { useCart } from "@/hooks/useCart";
import { Upload, Check, ChevronDown, ChevronUp } from "lucide-react";
import styles from "./ProductDetails.module.css";
import Image from "next/image";

interface ProductDetailsProps {
    product: Product;
}

export function ProductDetails({ product }: ProductDetailsProps) {
    const { addItem } = useCart();
    const [quantity, setQuantity] = useState(1);
    const [selectedSize, setSelectedSize] = useState<string>("Medium (12x16)");
    const [selectedFrame, setSelectedFrame] = useState<string>("None");
    const [customImage, setCustomImage] = useState<File | null>(null);

    const images = JSON.parse(product.images) as string[];
    const [activeImage, setActiveImage] = useState(images[0] || "/placeholder.jpg");

    const handleAddToCart = () => {
        addItem({
            productId: product.id,
            name: product.name,
            price: product.price, // Logic to add price for frame/size could be here
            image: activeImage,
            quantity,
            options: {
                Size: selectedSize,
                Frame: selectedFrame,
                CustomImage: customImage ? "Uploaded" : "None",
            },
        });
        alert("Added to cart!");
    };

    const isPortrait = product.category === "portraits";

    return (
        <div className={styles.container}>
            <div className={styles.gallery}>
                <div className={styles.mainImageContainer}>
                    <img src={activeImage} alt={product.name} className={styles.mainImage} />
                </div>
                <div className={styles.thumbnails}>
                    {images.map((img, idx) => (
                        <button
                            key={idx}
                            className={`${styles.thumbnail} ${activeImage === img ? styles.activeThumbnail : ''}`}
                            onClick={() => setActiveImage(img)}
                        >
                            <img src={img} alt={`View ${idx + 1}`} />
                        </button>
                    ))}
                </div>
            </div>

            <div className={styles.info}>
                <h1 className={styles.title}>{product.name}</h1>
                <p className={styles.price}>${product.price.toFixed(2)}</p>
                <div className={styles.description} dangerouslySetInnerHTML={{ __html: product.description }} />

                <div className={styles.options}>
                    <div className={styles.optionGroup}>
                        <label>Size</label>
                        <select
                            value={selectedSize}
                            onChange={(e) => setSelectedSize(e.target.value)}
                            className={styles.select}
                        >
                            <option>Small (8x10)</option>
                            <option>Medium (12x16)</option>
                            <option>Large (18x24)</option>
                        </select>
                    </div>

                    <div className={styles.optionGroup}>
                        <label>Frame</label>
                        <select
                            value={selectedFrame}
                            onChange={(e) => setSelectedFrame(e.target.value)}
                            className={styles.select}
                        >
                            <option>None</option>
                            <option>Classic Wood (+$25)</option>
                            <option>Modern Black (+$30)</option>
                            <option>Gold Ornate (+$45)</option>
                        </select>
                    </div>

                    {isPortrait && (
                        <div className={styles.optionGroup}>
                            <label>Upload Your Photo</label>
                            <div className={styles.fileUpload}>
                                <input
                                    type="file"
                                    id="file-upload"
                                    accept="image/*"
                                    onChange={(e) => setCustomImage(e.target.files?.[0] || null)}
                                    className={styles.fileInput}
                                />
                                <label htmlFor="file-upload" className={styles.fileLabel}>
                                    {customImage ? (
                                        <><Check size={18} /> {customImage.name}</>
                                    ) : (
                                        <><Upload size={18} /> Choose Image</>
                                    )}
                                </label>
                            </div>
                        </div>
                    )}

                    <div className={styles.quantityGroup}>
                        <label>Quantity</label>
                        <div className={styles.quantityControls}>
                            <button onClick={() => setQuantity(Math.max(1, quantity - 1))}><ChevronDown size={16} /></button>
                            <span>{quantity}</span>
                            <button onClick={() => setQuantity(quantity + 1)}><ChevronUp size={16} /></button>
                        </div>
                    </div>
                </div>

                <div className={styles.actions}>
                    <Button size="lg" className={styles.fullWidthBtn} onClick={handleAddToCart}>
                        Add to Cart - ${(product.price * quantity).toFixed(2)}
                    </Button>

                    <p className={styles.deliveryInfo}>
                        Estimated delivery: 5-7 business days
                    </p>
                </div>
            </div>
        </div>
    );
}
