import type { Metadata } from "next";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";
import { WishlistProvider } from "@/context/WishlistContext";
import { AuthProvider } from "@/context/AuthContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CartDrawer from "@/components/CartDrawer";
import WishlistDrawer from "@/components/WishlistDrawer";

export const metadata: Metadata = {
  title: "AURA | Atelier of Haute Horlogerie & Pure Acoustic Design",
  description: "Connoisseur acoustics, Swiss tourbillons, and aerospace titanium living artifacts engineered for generations of patrons.",
};

export default function RootLayout({
  children,
}: ReadencodedRootLayoutProps) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400..900;1,400..900&family=Plus+Jakarta+Sans:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-[#090A0F] text-[#F3F4F6] min-h-screen flex flex-col font-sans antialiased selection:bg-[#D4AF37] selection:text-black">
        <AuthProvider>
          <WishlistProvider>
            <CartProvider>
              <Navbar />
              <main className="flex-1">
                {children}
              </main>
              <Footer />
              <CartDrawer />
              <WishlistDrawer />
            </CartProvider>
          </WishlistProvider>
        </AuthProvider>
      </body>
    </html>
  );
}

interface ReadencodedRootLayoutProps {
  children: React.ReactNode;
}
