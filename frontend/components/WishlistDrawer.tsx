"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { X, Heart, ShoppingBag, Trash2, ArrowRight } from "lucide-react";
import { useWishlist } from "@/context/WishlistContext";
import { useCart } from "@/context/CartContext";
import { formatCurrency } from "@/lib/utils";

export default function WishlistDrawer() {
  const { wishlist, isWishlistOpen, setIsWishlistOpen, toggleWishlist, clearWishlist } = useWishlist();
  const { addToCart } = useCart();

  const handleMoveToCart = (product: any) => {
    addToCart(product, 1);
    toggleWishlist(product);
  };

  return (
    <AnimatePresence>
      {isWishlistOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsWishlistOpen(false)}
            className="fixed inset-0 bg-black/75 backdrop-blur-md"
          />

          {/* Slide-in Drawer */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="relative w-full max-w-md bg-[#101118] border-l border-white/[0.1] h-full flex flex-col z-10 shadow-2xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-white/[0.08] bg-[#0c0d14]">
              <div className="flex items-center gap-2">
                <Heart className="w-5 h-5 text-luxury-accent fill-luxury-accent" />
                <span className="font-serif text-lg font-medium text-white tracking-wide">
                  Curated Wishlist
                </span>
                <span className="text-xs text-zinc-500 font-mono">({wishlist.length})</span>
              </div>
              <button
                onClick={() => setIsWishlistOpen(false)}
                className="p-2 rounded-full text-zinc-400 hover:text-white hover:bg-white/[0.06] transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* List */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {wishlist.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center py-12">
                  <div className="w-16 h-16 rounded-full bg-white/[0.03] border border-white/10 flex items-center justify-center text-zinc-600 mb-4">
                    <Heart className="w-7 h-7" />
                  </div>
                  <div className="font-serif text-lg text-white mb-1">Wishlist is empty</div>
                  <p className="text-xs text-zinc-400 max-w-xs mb-6">
                    Tap the heart on any artifact to curate your personal collection of luxury heirlooms.
                  </p>
                  <button
                    onClick={() => setIsWishlistOpen(false)}
                    className="px-6 py-2.5 rounded-full bg-white/[0.08] hover:bg-luxury-accent hover:text-black text-xs uppercase tracking-widest text-white transition-all font-semibold"
                  >
                    Explore Atelier
                  </button>
                </div>
              ) : (
                <AnimatePresence initial={false}>
                  {wishlist.map(({ product }) => (
                    <motion.div
                      key={product.id}
                      layout
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, x: -30 }}
                      className="flex gap-4 p-3.5 rounded-2xl bg-white/[0.02] border border-white/[0.06] hover:border-white/10 transition-colors"
                    >
                      <div className="relative w-20 h-24 rounded-xl overflow-hidden bg-[#161722] shrink-0">
                        <Image
                          src={product.images?.[0] || "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=1200&q=80"}
                          alt={product.title}
                          fill
                          className="object-cover object-center"
                        />
                      </div>

                      <div className="flex flex-col flex-1 justify-between min-w-0">
                        <div>
                          <div className="flex items-start justify-between gap-2">
                            <h4 className="font-serif text-sm font-medium text-white truncate">
                              {product.title}
                            </h4>
                            <button
                              onClick={() => toggleWishlist(product)}
                              className="text-zinc-500 hover:text-red-400 p-1"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                          <div className="font-serif text-sm font-semibold text-luxury-champagne mt-1">
                            {formatCurrency(product.price)}
                          </div>
                        </div>

                        <div className="pt-2">
                          <button
                            onClick={() => handleMoveToCart(product)}
                            className="w-full py-1.5 px-3 rounded-full bg-white/[0.08] hover:bg-luxury-accent hover:text-black text-white text-[11px] font-semibold uppercase tracking-wider transition-colors flex items-center justify-center gap-1.5"
                          >
                            <ShoppingBag className="w-3 h-3" />
                            <span>Move to Bag</span>
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              )}
            </div>

            {/* Footer */}
            {wishlist.length > 0 && (
              <div className="p-6 border-t border-white/[0.08] bg-[#0c0d14]">
                <button
                  onClick={clearWishlist}
                  className="w-full py-2.5 text-xs text-zinc-400 hover:text-red-400 transition-colors uppercase tracking-wider"
                >
                  Clear Wishlist
                </button>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
