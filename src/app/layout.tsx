import type { Metadata } from "next";
import { Cinzel, Lato } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/hooks/useAuth";
import { CartProvider } from "@/hooks/useCart";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ThemeProvider } from "@/context/ThemeContext";

const cinzel = Cinzel({
  subsets: ["latin"],
  variable: "--font-heading",
  weight: ["400", "700"],
});

const lato = Lato({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["300", "400", "700"],
});

export const metadata: Metadata = {
  title: "SoulSketch Studio | Custom Portraits & Handmade Art",
  description: "SoulSketch Studio - Where memories become art. Custom portraits, handmade crafts, and personalized gifts.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${cinzel.variable} ${lato.variable}`}>
        <ThemeProvider>
          <AuthProvider>
            <CartProvider>
              <Navbar />
              <main style={{ minHeight: '80vh' }}>
                {children}
              </main>
              <Footer />
            </CartProvider>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
