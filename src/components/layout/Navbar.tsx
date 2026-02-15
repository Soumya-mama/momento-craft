"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ShoppingBag, User, Search, Menu, X, Moon, Sun } from "lucide-react";
import { useState, useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useTheme } from "@/context/ThemeContext";
import { Button } from "@/components/ui/Button";
import styles from "./Navbar.module.css";

export function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const pathname = usePathname();
    const { user, logout } = useAuth();
    const { theme, toggleTheme } = useTheme();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const navLinks = [
        { name: "Portraits", href: "/category/portraits" },
        { name: "Crafts", href: "/category/crafts" },
        { name: "Gifts", href: "/category/gifts" },
        { name: "About", href: "/about" },
    ];

    return (
        <nav className={`${styles.navbar} ${isScrolled ? styles.scrolled : ""}`}>
            <div className={styles.container}>
                <button
                    className={styles.mobileMenuBtn}
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                >
                    {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>

                <Link href="/" className={styles.logo}>
                    SoulSketch
                </Link>

                {/* Desktop Nav */}
                <ul className={styles.navLinks}>
                    {navLinks.map((link) => (
                        <li key={link.name}>
                            <Link
                                href={link.href}
                                className={styles.navLink}
                                style={pathname === link.href ? { color: 'var(--color-clay)' } : {}}
                            >
                                {link.name}
                            </Link>
                        </li>
                    ))}
                </ul>

                {/* Mobile Nav Overlay */}
                <div className={`${styles.mobileMenu} ${isMobileMenuOpen ? styles.mobileMenuOpen : ''}`}>
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            className={styles.mobileNavLink}
                            onClick={() => setIsMobileMenuOpen(false)}
                        >
                            {link.name}
                        </Link>
                    ))}
                </div>

                <div className={styles.actions}>
                    <button
                        className={styles.iconButton}
                        onClick={toggleTheme}
                        aria-label="Toggle Theme"
                    >
                        {theme === 'dark' ? <Sun size={22} /> : <Moon size={22} />}
                    </button>

                    <button className={styles.iconButton} aria-label="Search">
                        <Search size={22} />
                    </button>

                    <Link href="/cart" className={styles.iconButton} aria-label="Cart">
                        <ShoppingBag size={22} />
                        <span className={styles.badge}>0</span>
                    </Link>

                    {user ? (
                        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                            <Link href="/profile" className={styles.iconButton}>
                                <User size={22} />
                            </Link>
                            <Button size="sm" variant="ghost" onClick={() => logout()}>
                                Logout
                            </Button>
                        </div>
                    ) : (
                        <div style={{ display: 'flex', gap: '0.5rem' }}>
                            <Link href="/register">
                                <Button size="sm" variant="ghost">Sign Up</Button>
                            </Link>
                            <Link href="/login">
                                <Button size="sm" variant="secondary">Login</Button>
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
}
