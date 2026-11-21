"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, ShoppingBag, Check, Star } from "lucide-react";
import { Product, ProductVariant } from "@/types";
import { formatCurrency } from "@/lib/utils";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();

  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | undefined>(
    product.variants && product.variants.length > 0 ? product.variants[0] : undefined
  );
  const [isAdded, setIsAdded] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const isFavorite = isInWishlist(product.id);
  const images = product.images && product.images.length > 0
    ? product.images
    : ["https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=1200&q=80"];

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1, selectedVariant);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  const handleToggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product);
  };

  const handleVariantChange = (e: React.MouseEvent, variant: ProductVariant, idx: number) => {
    e.preventDefault();
    e.stopPropagation();
    setSelectedVariant(variant);
    if (images.length > idx) {
      setCurrentImageIndex(idx % images.length);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      whileHover={{ y: -8 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="group relative flex flex-col rounded-2xl bg-[#111219] border border-white/[0.08] hover:border-luxury-accent/30 overflow-hidden shadow-glass hover:shadow-luxury transition-colors duration-500"
    >
      <Link href={`/products/${product.slug}`} className="flex flex-col flex-1">
        
        {/* Image Container with Smooth Zoom */}
        <div className="relative aspect-[4/5] w-full overflow-hidden bg-[#161722]">
          
          <AnimatePresence mode="wait">
            <motion.div
              key={currentImageIndex}
              initial={{ opacity: 0.7 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0.7 }}
              transition={{ duration: 0.4 }}
              className="relative w-full h-full"
            >
              <Image
                src={images[currentImageIndex]}
                alt={product.title}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover object-center group-hover:scale-106 transition-transform duration-700 ease-apple-ease"
              />
            </motion.div>
          </AnimatePresence>

          {/* Top Badge (e.g. Flagship Acoustic, Limited Edition) */}
          {product.badge && (
            <div className="absolute top-3.5 left-3.5 z-10">
              <span className="px-2.5 py-1 rounded-full text-[10px] uppercase tracking-wider font-semibold bg-black/60 backdrop-blur-md text-luxury-champagne border border-white/10">
                {product.badge}
              </span>
            </div>
          )}

          {/* Wishlist Button with Heart Pop Animation */}
          <motion.button
            whileTap={{ scale: 0.85 }}
            onClick={handleToggleWishlist}
            className="absolute top-3.5 right-3.5 z-10 p-2.5 rounded-full bg-black/50 hover:bg-black/70 backdrop-blur-md border border-white/10 text-white transition-colors"
            aria-label="Save to Wishlist"
          >
            <motion.div
              animate={isFavorite ? { scale: [1, 1.35, 1] } : { scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              <Heart
                className={`w-4 h-4 transition-colors ${
                  isFavorite ? "fill-luxury-accent text-luxury-accent" : "text-white"
                }`}
              />
            </motion.div>
          </motion.button>

          {/* Overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#111219] via-transparent to-transparent opacity-60" />
        </div>

        {/* Content Details */}
        <div className="flex flex-col flex-1 p-5">
          
          {/* Category & Rating */}
          <div className="flex items-center justify-between text-xs text-zinc-400 mb-1.5">
            <span className="uppercase tracking-widest text-[10px] text-luxury-muted font-medium">
              {product.category_name || "Bespoke Artifact"}
            </span>
            <div className="flex items-center gap-1 text-zinc-300">
              <Star className="w-3.5 h-3.5 fill-luxury-accent text-luxury-accent" />
              <span>{product.rating.toFixed(1)}</span>
              <span className="text-zinc-500">({product.reviews_count})</span>
            </div>
          </div>

          {/* Title */}
          <h3 className="font-serif text-lg font-medium text-white group-hover:text-luxury-champagne transition-colors line-clamp-1 mb-1">
            {product.title}
          </h3>

          {/* Subtitle */}
          {product.subtitle && (
            <p className="text-xs text-zinc-400 line-clamp-1 mb-3">
              {product.subtitle}
            </p>
          )}

          {/* Variants Selector Dots */}
          {product.variants && product.variants.length > 0 && (
            <div className="flex items-center gap-1.5 mb-4 pt-1">
              {product.variants.map((v, idx) => (
                <button
                  key={v.id}
                  onClick={(e) => handleVariantChange(e, v, idx)}
                  title={v.name}
                  className={`w-4 h-4 rounded-full border transition-all ${
                    selectedVariant?.id === v.id
                      ? "border-luxury-accent ring-2 ring-luxury-accent/30 scale-110"
                      : "border-white/20 hover:scale-105"
                  }`}
                  style={{ backgroundColor: v.hex }}
                />
              ))}
              <span className="text-[11px] text-zinc-400 ml-1.5 truncate max-w-[120px]">
                {selectedVariant?.name}
              </span>
            </div>
          )}

          {/* Price & Add to Bag Row */}
          <div className="mt-auto pt-3 border-t border-white/[0.06] flex items-center justify-between">
            <div>
              <div className="font-serif text-lg font-semibold text-white tracking-tight">
                {formatCurrency(product.price)}
              </div>
              {product.original_price && (
                <div className="text-xs text-zinc-500 line-through">
                  {formatCurrency(product.original_price)}
                </div>
              )}
            </div>

            {/* Tactile Animated Add to Bag Button */}
            <motion.button
              whileTap={{ scale: 0.94 }}
              onClick={handleAddToCart}
              className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full text-xs font-semibold tracking-wider uppercase transition-all duration-300 ${
                isAdded
                  ? "bg-emerald-500 text-black shadow-glow"
                  : "bg-white/[0.08] hover:bg-luxury-accent hover:text-black text-white border border-white/[0.12] hover:border-transparent"
              }`}
            >
              <AnimatePresence mode="wait">
                {isAdded ? (
                  <motion.span
                    key="added"
                    initial={{ opacity: 0, scale: 0.6 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.6 }}
                    className="flex items-center gap-1"
                  >
                    <Check className="w-3.5 h-3.5" />
                    <span>Added</span>
                  </motion.span>
                ) : (
                  <motion.span
                    key="add"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex items-center gap-1.5"
                  >
                    <ShoppingBag className="w-3.5 h-3.5" />
                    <span>Bag</span>
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.button>
          </div>

        </div>
      </Link>
    </motion.div>
  );
}
