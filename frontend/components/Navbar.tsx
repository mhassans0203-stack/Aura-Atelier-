"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingBag, Heart, User as UserIcon, Menu, X, ArrowUpRight, ShieldCheck, Sparkles } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { useAuth } from "@/context/AuthContext";

const navLinks = [
  { name: "Collections", href: "/products" },
  { name: "Audio", href: "/products?category=audio-acoustics" },
  { name: "Horlogerie", href: "/products?category=haute-horlogerie" },
  { name: "Smart Living", href: "/products?category=smart-living" },
  { name: "Orders", href: "/orders" },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  
  const pathname = usePathname();
  const { totalItems, setIsCartOpen } = useCart();
  const { wishlist, setIsWishlistOpen } = useWishlist();
  const { user, logout } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? "bg-[#090A0F]/85 backdrop-blur-xl border-b border-white/[0.08] py-3.5 shadow-glass"
            : "bg-transparent py-5 border-b border-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          
          {/* Brand Logo */}
          <Link href="/" className="group flex items-center gap-2">
            <motion.div
              whileHover={{ rotate: 180 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="w-8 h-8 rounded-full border border-luxury-accent/60 flex items-center justify-center bg-luxury-surface/50"
            >
              <div className="w-3 h-3 rounded-full bg-gradient-to-tr from-luxury-accent to-luxury-champagne shadow-glow" />
            </motion.div>
            <div className="flex flex-col">
              <span className="font-serif text-xl sm:text-2xl font-bold tracking-wider text-white uppercase group-hover:text-luxury-accent transition-colors">
                AURA
              </span>
              <span className="text-[9px] uppercase tracking-[0.25em] text-luxury-muted -mt-1">
                Atelier Luxury
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 bg-white/[0.03] border border-white/[0.06] rounded-full p-1.5 backdrop-blur-md">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  onMouseEnter={() => setHoveredLink(link.name)}
                  onMouseLeave={() => setHoveredLink(null)}
                  className={`relative px-4 py-1.5 text-xs uppercase tracking-widest font-medium transition-colors duration-300 ${
                    isActive ? "text-white" : "text-zinc-400 hover:text-white"
                  }`}
                >
                  {/* Hover background pill animation */}
                  {hoveredLink === link.name && (
                    <motion.div
                      layoutId="nav-hover-pill"
                      className="absolute inset-0 bg-white/[0.08] rounded-full -z-10"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                  {isActive && !hoveredLink && (
                    <motion.div
                      layoutId="nav-active-pill"
                      className="absolute inset-0 bg-white/[0.12] rounded-full -z-10 border border-white/10"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                  {link.name}
                </Link>
              );
            })}
          </nav>

          {/* Right Action Icons */}
          <div className="flex items-center gap-2 sm:gap-3">
            
            {/* Streamlit Analytics Portal Pill */}
            <a
              href="http://localhost:8501"
              target="_blank"
              rel="noreferrer"
              className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-medium tracking-wider uppercase bg-luxury-accent/10 hover:bg-luxury-accent/20 border border-luxury-accent/30 text-luxury-champagne transition-all"
            >
              <Sparkles className="w-3 h-3 text-luxury-accent animate-pulse" />
              <span>Intelligence Suite</span>
              <ArrowUpRight className="w-3 h-3 opacity-70" />
            </a>

            {/* Wishlist Button */}
            <motion.button
              whileTap={{ scale: 0.92 }}
              onClick={() => setIsWishlistOpen(true)}
              className="relative p-2.5 rounded-full text-zinc-300 hover:text-white hover:bg-white/[0.06] transition-colors"
              aria-label="Wishlist"
            >
              <Heart className="w-5 h-5" />
              {wishlist.length > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute top-1 right-1 w-4 h-4 rounded-full bg-luxury-accent text-black text-[10px] font-bold flex items-center justify-center shadow-glow"
                >
                  {wishlist.length}
                </motion.span>
              )}
            </motion.button>

            {/* Cart Button */}
            <motion.button
              whileTap={{ scale: 0.92 }}
              onClick={() => setIsCartOpen(true)}
              className="relative p-2.5 rounded-full text-zinc-300 hover:text-white hover:bg-white/[0.06] transition-colors"
              aria-label="Shopping Bag"
            >
              <ShoppingBag className="w-5 h-5" />
              {totalItems > 0 && (
                <motion.span
                  key={totalItems}
                  initial={{ scale: 0.5, y: -4 }}
                  animate={{ scale: 1, y: 0 }}
                  transition={{ type: "spring", stiffness: 500, damping: 25 }}
                  className="absolute top-1 right-1 w-4 h-4 rounded-full bg-luxury-accent text-black text-[10px] font-bold flex items-center justify-center shadow-glow"
                >
                  {totalItems}
                </motion.span>
              )}
            </motion.button>

            {/* User Account / Profile */}
            <div className="relative">
              <button
                onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)}
                className="flex items-center gap-2 p-2 rounded-full text-zinc-300 hover:text-white hover:bg-white/[0.06] transition-colors"
              >
                <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-zinc-700 to-zinc-500 flex items-center justify-center text-xs font-semibold text-white">
                  {user?.full_name ? user.full_name[0] : <UserIcon className="w-4 h-4" />}
                </div>
              </button>

              <AnimatePresence>
                {isUserDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.95 }}
                    transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                    className="absolute right-0 mt-2 w-56 bg-[#12131A] border border-white/[0.1] rounded-2xl shadow-luxury p-3 text-sm z-50 backdrop-blur-2xl"
                  >
                    <div className="px-3 py-2 border-b border-white/[0.06] mb-2">
                      <div className="font-semibold text-white truncate">{user?.full_name || "Guest Client"}</div>
                      <div className="text-xs text-zinc-400 truncate">{user?.email || "Exclusive Access"}</div>
                    </div>
                    <Link
                      href="/orders"
                      onClick={() => setIsUserDropdownOpen(false)}
                      className="flex items-center justify-between px-3 py-2 rounded-lg text-zinc-300 hover:bg-white/[0.05] hover:text-white transition-colors"
                    >
                      <span>Order History</span>
                      <ArrowUpRight className="w-3.5 h-3.5 opacity-60" />
                    </Link>
                    <a
                      href="http://localhost:8501"
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center justify-between px-3 py-2 rounded-lg text-luxury-champagne hover:bg-white/[0.05] transition-colors"
                    >
                      <span>Streamlit Analytics</span>
                      <Sparkles className="w-3.5 h-3.5 text-luxury-accent" />
                    </a>
                    <div className="border-t border-white/[0.06] mt-2 pt-2">
                      <button
                        onClick={() => {
                          logout();
                          setIsUserDropdownOpen(false);
                        }}
                        className="w-full text-left px-3 py-2 text-xs text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
                      >
                        Sign Out
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 text-zinc-300 hover:text-white"
              aria-label="Toggle Navigation"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Slide-down Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="md:hidden border-b border-white/[0.08] bg-[#090A0F]/95 backdrop-blur-2xl px-6 py-6"
            >
              <div className="flex flex-col gap-4">
                {navLinks.map((link, idx) => (
                  <motion.div
                    key={link.name}
                    initial={{ opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.05 }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="text-lg font-medium text-zinc-300 hover:text-white block py-1"
                    >
                      {link.name}
                    </Link>
                  </motion.div>
                ))}
                <div className="border-t border-white/[0.08] pt-4 mt-2">
                  <a
                    href="http://localhost:8501"
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center justify-between py-2 text-luxury-champagne font-medium"
                  >
                    <span>Streamlit Executive Suite</span>
                    <ArrowUpRight className="w-4 h-4 text-luxury-accent" />
                  </a>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
}
