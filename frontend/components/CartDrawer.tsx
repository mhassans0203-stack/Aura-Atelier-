"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight, Sparkles, ShieldCheck } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { formatCurrency } from "@/lib/utils";
import CheckoutModal from "./CheckoutModal";

export default function CartDrawer() {
  const { cart, isCartOpen, setIsCartOpen, removeFromCart, updateQuantity, subtotal, totalItems } = useCart();
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  const freeShippingThreshold = 500;
  const progressPercent = Math.min((subtotal / freeShippingThreshold) * 100, 100);

  const handleOpenCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  return (
    <>
      <AnimatePresence>
        {isCartOpen && (
          <div className="fixed inset-0 z-50 flex justify-end">
            
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={() => setIsCartOpen(false)}
              className="fixed inset-0 bg-black/75 backdrop-blur-md"
            />

            {/* Slide-in Drawer Window */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="relative w-full max-w-md bg-[#101118] border-l border-white/[0.1] h-full flex flex-col z-10 shadow-2xl"
            >
              {/* Drawer Header */}
              <div className="flex items-center justify-between p-6 border-b border-white/[0.08] bg-[#0c0d14]">
                <div className="flex items-center gap-2">
                  <ShoppingBag className="w-5 h-5 text-luxury-accent" />
                  <span className="font-serif text-lg font-medium text-white tracking-wide">
                    Acquisition Bag
                  </span>
                  <span className="text-xs text-zinc-500 font-mono">({totalItems})</span>
                </div>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="p-2 rounded-full text-zinc-400 hover:text-white hover:bg-white/[0.06] transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Free Courier Shipping Progress Bar */}
              <div className="p-4 bg-white/[0.02] border-b border-white/[0.06]">
                <div className="flex items-center justify-between text-xs mb-2">
                  <span className="text-zinc-400">
                    {subtotal >= freeShippingThreshold ? (
                      <span className="text-emerald-400 font-semibold flex items-center gap-1">
                        <Sparkles className="w-3.5 h-3.5 text-luxury-accent" /> Complimentary White-Glove Transit Unlocked
                      </span>
                    ) : (
                      <span>
                        Add <strong className="text-white">{formatCurrency(freeShippingThreshold - subtotal)}</strong> for Complimentary White-Glove Transit
                      </span>
                    )}
                  </span>
                  <span className="text-zinc-500 font-mono text-[10px]">{Math.round(progressPercent)}%</span>
                </div>
                <div className="h-1.5 w-full bg-white/[0.08] rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${progressPercent}%` }}
                    transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                    className="h-full bg-gradient-to-r from-luxury-accent to-luxury-champagne rounded-full"
                  />
                </div>
              </div>

              {/* Items List */}
              <div className="flex-1 overflow-y-auto p-6 space-y-4">
                {cart.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center py-12">
                    <div className="w-16 h-16 rounded-full bg-white/[0.03] border border-white/10 flex items-center justify-center text-zinc-600 mb-4">
                      <ShoppingBag className="w-7 h-7" />
                    </div>
                    <div className="font-serif text-lg text-white mb-1">Your bag is silent</div>
                    <p className="text-xs text-zinc-400 max-w-xs mb-6">
                      Explore our atelier of beryllium acoustic drivers, horology, and architectural home sanctuaries.
                    </p>
                    <button
                      onClick={() => setIsCartOpen(false)}
                      className="px-6 py-2.5 rounded-full bg-white/[0.08] hover:bg-luxury-accent hover:text-black text-xs uppercase tracking-widest text-white transition-all font-semibold"
                    >
                      Discover Collection
                    </button>
                  </div>
                ) : (
                  <AnimatePresence initial={false}>
                    {cart.map((item) => (
                      <motion.div
                        key={`${item.product.id}-${item.selectedVariant?.id || 'default'}`}
                        layout
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, x: -30 }}
                        transition={{ duration: 0.3 }}
                        className="flex gap-4 p-3.5 rounded-2xl bg-white/[0.02] border border-white/[0.06] hover:border-white/10 transition-colors"
                      >
                        {/* Thumbnail */}
                        <div className="relative w-20 h-24 rounded-xl overflow-hidden bg-[#161722] shrink-0">
                          <Image
                            src={item.product.images?.[0] || "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=1200&q=80"}
                            alt={item.product.title}
                            fill
                            className="object-cover object-center"
                          />
                        </div>

                        {/* Details */}
                        <div className="flex flex-col flex-1 justify-between min-w-0">
                          <div>
                            <div className="flex items-start justify-between gap-2">
                              <h4 className="font-serif text-sm font-medium text-white truncate">
                                {item.product.title}
                              </h4>
                              <button
                                onClick={() => removeFromCart(item.product.id, item.selectedVariant?.id)}
                                className="text-zinc-500 hover:text-red-400 transition-colors p-1"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>

                            {item.selectedVariant && (
                              <div className="flex items-center gap-1.5 mt-1 text-[11px] text-zinc-400">
                                <span
                                  className="w-2.5 h-2.5 rounded-full border border-white/20"
                                  style={{ backgroundColor: item.selectedVariant.hex }}
                                />
                                <span>{item.selectedVariant.name}</span>
                              </div>
                            )}
                          </div>

                          {/* Price & Quantity Controls */}
                          <div className="flex items-center justify-between pt-2">
                            <span className="font-serif text-sm font-semibold text-luxury-champagne">
                              {formatCurrency(item.product.price * item.quantity)}
                            </span>

                            <div className="flex items-center gap-2 border border-white/10 rounded-full px-2 py-0.5 bg-black/40">
                              <button
                                onClick={() => updateQuantity(item.product.id, item.quantity - 1, item.selectedVariant?.id)}
                                className="text-zinc-400 hover:text-white p-0.5"
                              >
                                <Minus className="w-3 h-3" />
                              </button>
                              <span className="text-xs font-mono text-white px-1">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() => updateQuantity(item.product.id, item.quantity + 1, item.selectedVariant?.id)}
                                className="text-zinc-400 hover:text-white p-0.5"
                              >
                                <Plus className="w-3 h-3" />
                              </button>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                )}
              </div>

              {/* Drawer Footer */}
              {cart.length > 0 && (
                <div className="p-6 border-t border-white/[0.08] bg-[#0c0d14] space-y-4">
                  <div className="space-y-1.5 text-xs">
                    <div className="flex justify-between text-zinc-400">
                      <span>Subtotal</span>
                      <span className="text-white font-serif font-medium">{formatCurrency(subtotal)}</span>
                    </div>
                    <div className="flex justify-between text-zinc-400">
                      <span>Armored Transit</span>
                      <span className="text-emerald-400">
                        {subtotal >= freeShippingThreshold ? "Complimentary" : formatCurrency(50)}
                      </span>
                    </div>
                    <div className="pt-2 border-t border-white/[0.06] flex justify-between text-base font-serif font-bold text-white">
                      <span>Estimated Settlement</span>
                      <span className="text-luxury-champagne">
                        {formatCurrency(subtotal >= freeShippingThreshold ? subtotal : subtotal + 50)}
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={handleOpenCheckout}
                    className="w-full py-4 rounded-full bg-gradient-to-r from-luxury-champagne via-luxury-accent to-luxury-gold text-black font-semibold text-xs uppercase tracking-widest shadow-glow hover:shadow-glow-lg transition-all flex items-center justify-center gap-2 group"
                  >
                    <span>Proceed to Acquisition</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>

                  <div className="flex items-center justify-center gap-2 text-[10px] text-zinc-500 uppercase tracking-wider">
                    <ShieldCheck className="w-3.5 h-3.5 text-luxury-accent" />
                    <span>256-bit Encrypted Concierge Checkout</span>
                  </div>
                </div>
              )}
            </motion.div>

          </div>
        )}
      </AnimatePresence>

      {/* Checkout Modal Trigger */}
      <CheckoutModal isOpen={isCheckoutOpen} onClose={() => setIsCheckoutOpen(false)} />
    </>
  );
}
