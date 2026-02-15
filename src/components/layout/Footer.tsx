import Link from "next/link";
import { Instagram, Facebook, Mail } from "lucide-react";
import styles from "./Footer.module.css";

export function Footer() {
    return (
        <footer className={styles.footer}>
            <div className={styles.container}>
                <div className={styles.section}>
                    <h3 className={styles.logo}>SoulSketch Studio</h3>
                    <p className={styles.tagline}>
                        Turning your memories into timeless art.
                        Handcrafted with love and passion.
                    </p>
                    <div className={styles.socials}>
                        <a href="#" aria-label="Instagram"><Instagram size={20} /></a>
                        <a href="#" aria-label="Facebook"><Facebook size={20} /></a>
                        <a href="#" aria-label="Email"><Mail size={20} /></a>
                    </div>
                </div>

                <div className={styles.section}>
                    <h4>Shop</h4>
                    <ul>
                        <li><Link href="/category/portraits">Custom Portraits</Link></li>
                        <li><Link href="/category/crafts">Handmade Crafts</Link></li>
                        <li><Link href="/category/gifts">Personalized Gifts</Link></li>
                    </ul>
                </div>

                <div className={styles.section}>
                    <h4>Help</h4>
                    <ul>
                        <li><Link href="/shipping">Shipping & Returns</Link></li>
                        <li><Link href="/faq">FAQ</Link></li>
                        <li><Link href="/contact">Contact Us</Link></li>
                    </ul>
                </div>

                <div className={styles.section}>
                    <h4>Newsletter</h4>
                    <p className={styles.newsletterText}>Subscribe for updates and exclusive offers.</p>
                    <form className={styles.form}>
                        <input type="email" placeholder="Your email" className={styles.input} />
                        <button type="submit" className={styles.button}>Subscribe</button>
                    </form>
                </div>
            </div>
            <div className={styles.bottom}>
                <p>&copy; {new Date().getFullYear()} SoulSketch Studio. All rights reserved.</p>
            </div>
        </footer>
    );
}
