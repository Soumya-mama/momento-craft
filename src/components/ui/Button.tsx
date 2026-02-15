"use client";

import { ButtonHTMLAttributes, forwardRef } from "react";
import styles from "./Button.module.css";
import { Loader2 } from "lucide-react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: "primary" | "secondary" | "outline" | "ghost";
    size?: "sm" | "md" | "lg";
    isLoading?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className = "", variant = "primary", size = "md", isLoading, children, disabled, ...props }, ref) => {
        return (
            <button
                ref={ref}
                className={`${styles.button} ${styles[variant]} ${styles[size]} ${className}`}
                disabled={disabled || isLoading}
                {...props}
            >
                {isLoading && <Loader2 className={styles.spinner} size={16} />}
                {children}
            </button>
        );
    }
);

Button.displayName = "Button";

export { Button };
