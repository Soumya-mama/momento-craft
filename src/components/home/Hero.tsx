"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import styles from "./Hero.module.css";

export function Hero() {
    return (
        <section className={styles.hero}>
            <div className={styles.content}>
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className={styles.title}
                >
                    Turning Memories into <span className={styles.highlight}>Timeless Art</span>
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                    className={styles.subtitle}
                >
                    Handcrafted portraits, unique gifts, and personalized art that speaks to the soul.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
                    className={styles.cta}
                >
                    <Link href="/category/portraits">
                        <Button size="lg">Shop Custom Portraits</Button>
                    </Link>
                    <Link href="/category/gifts">
                        <Button variant="outline" size="lg">Explore Gifts</Button>
                    </Link>
                </motion.div>
            </div>

            <div className={styles.background}>
                <div className={styles.overlay}></div>
                {/* Placeholder for Hero Image - In real app, use next/image with a real photo */}
                <div className={styles.imagePlaceholder}></div>
            </div>
        </section>
    );
}
