"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Star,
  ShoppingBag,
  Heart,
  Shield,
  Truck,
  RotateCcw,
  Check,
  ChevronRight,
  Sparkles,
  ArrowLeft,
  Share2
} from "lucide-react";
import { Product, ProductVariant, Review } from "@/types";
import { fetchProductById, FALLBACK_PRODUCTS } from "@/lib/api";
import { formatCurrency, formatDate } from "@/lib/utils";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";

export default function ProductDetailPage() {
  const params = useParams();
  const idOrSlug = params.id as string;

  const [product, setProduct] = useState<Product | null>(null);
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | undefined>(undefined);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isAdded, setIsAdded] = useState(false);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [newReviewAuthor, setNewReviewAuthor] = useState("");
  const [newReviewComment, setNewReviewComment] = useState("");
  const [newReviewRating, setNewReviewRating] = useState(5);
  const [reviewSubmitted, setReviewSubmitted] = useState(false);

  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();

  useEffect(() => {
    async function loadData() {
      const data = await fetchProductById(idOrSlug);
      if (data) {
        setProduct(data);
        if (data.variants && data.variants.length > 0) {
          setSelectedVariant(data.variants[0]);
        }
      } else {
        // Fallback to first product
        setProduct(FALLBACK_PRODUCTS[0]);
        setSelectedVariant(FALLBACK_PRODUCTS[0].variants?.[0]);
      }
    }
    loadData();
  }, [idOrSlug]);

  // Load reviews from API
  useEffect(() => {
    if (product?.id) {
      fetch(`http://localhost:8000/api/reviews/product/${product.id}`)
        .then((res) => (res.ok ? res.json() : []))
        .then((data) => {
          if (Array.isArray(data) && data.length > 0) {
            setReviews(data);
          } else {
            // Default initial review
            setReviews([
              {
                id: 1,
                product_id: product.id,
                author_name: "Lord Harrison V.",
                rating: 5,
                headline: "Beyond transcendent acoustics",
                comment: "The precision separation across the soundstage is peerless. The beryllium diaphragm presents an astonishingly natural presence.",
                verified_purchase: true,
                created_at: new Date().toISOString(),
              },
            ]);
          }
        })
        .catch(() => {});
    }
  }, [product?.id]);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-24">
        <div className="w-8 h-8 rounded-full border-2 border-luxury-accent border-t-transparent animate-spin" />
      </div>
    );
  }

  const isFavorite = isInWishlist(product.id);
  const images = product.images && product.images.length > 0
    ? product.images
    : ["https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=1200&q=80"];

  const handleAddToCart = () => {
    addToCart(product, quantity, selectedVariant);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2200);
  };

  const handleReviewSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReviewAuthor.trim() || !newReviewComment.trim()) return;

    const payload = {
      author_name: newReviewAuthor,
      rating: newReviewRating,
      headline: "Connoisseur Review",
      comment: newReviewComment,
    };

    try {
      const res = await fetch(`http://localhost:8000/api/reviews/product/${product.id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (res.ok) {
        const createdReview = await res.json();
        setReviews([createdReview, ...reviews]);
      } else {
        throw new Error();
      }
    } catch {
      setReviews([
        {
          id: Date.now(),
          product_id: product.id,
          author_name: newReviewAuthor,
          rating: newReviewRating,
          headline: "Connoisseur Review",
          comment: newReviewComment,
          verified_purchase: true,
          created_at: new Date().toISOString(),
        },
        ...reviews,
      ]);
    }

    setReviewSubmitted(true);
    setNewReviewAuthor("");
    setNewReviewComment("");
    setTimeout(() => setReviewSubmitted(false), 4000);
  };

  return (
    <div className="pt-28 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      
      {/* Breadcrumb Navigation */}
      <div className="flex items-center gap-2 text-xs text-zinc-400 mb-8">
        <Link href="/" className="hover:text-white transition-colors">Atelier</Link>
        <ChevronRight className="w-3.5 h-3.5 text-zinc-600" />
        <Link href="/products" className="hover:text-white transition-colors">Catalog</Link>
        <ChevronRight className="w-3.5 h-3.5 text-zinc-600" />
        <span className="text-luxury-champagne truncate max-w-xs">{product.title}</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
        
        {/* Left Column: Image Gallery */}
        <div className="lg:col-span-7 flex flex-col gap-4">
          {/* Main Large Display with Cross-Fade Animation */}
          <div className="relative aspect-[4/3] sm:aspect-[16/11] rounded-3xl overflow-hidden bg-[#12131A] border border-white/[0.08] shadow-luxury">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeImageIndex}
                initial={{ opacity: 0.6, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0.6, scale: 0.98 }}
                transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                className="relative w-full h-full"
              >
                <Image
                  src={images[activeImageIndex]}
                  alt={product.title}
                  fill
                  priority
                  className="object-cover object-center"
                />
              </motion.div>
            </AnimatePresence>

            {/* Badge */}
            {product.badge && (
              <div className="absolute top-5 left-5">
                <span className="px-3 py-1.5 rounded-full text-xs uppercase tracking-wider font-semibold bg-black/60 backdrop-blur-md text-luxury-champagne border border-white/10">
                  {product.badge}
                </span>
              </div>
            )}

            {/* Wishlist Button */}
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => toggleWishlist(product)}
              className="absolute top-5 right-5 p-3 rounded-full bg-black/50 hover:bg-black/80 backdrop-blur-md border border-white/10 text-white transition-colors"
            >
              <Heart
                className={`w-5 h-5 ${isFavorite ? "fill-luxury-accent text-luxury-accent" : "text-white"}`}
              />
            </motion.button>
          </div>

          {/* Thumbnail Strip */}
          {images.length > 1 && (
            <div className="flex items-center gap-3 overflow-x-auto pb-2">
              {images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImageIndex(idx)}
                  className={`relative w-24 h-20 rounded-xl overflow-hidden border transition-all ${
                    activeImageIndex === idx
                      ? "border-luxury-accent ring-2 ring-luxury-accent/30 scale-102"
                      : "border-white/10 opacity-60 hover:opacity-100"
                  }`}
                >
                  <Image src={img} alt={`Thumbnail ${idx + 1}`} fill className="object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right Column: Product Narrative & Actions */}
        <div className="lg:col-span-5 flex flex-col">
          
          {/* Category & Rating */}
          <div className="flex items-center justify-between text-xs text-zinc-400 mb-2">
            <span className="uppercase tracking-widest text-[11px] text-luxury-accent font-semibold">
              {product.category_name || "Haute Edition"}
            </span>
            <div className="flex items-center gap-1.5 text-zinc-300">
              <Star className="w-4 h-4 fill-luxury-accent text-luxury-accent" />
              <span className="font-semibold text-white">{product.rating.toFixed(1)}</span>
              <span className="text-zinc-500">({product.reviews_count} Connoisseur Ratings)</span>
            </div>
          </div>

          {/* Title */}
          <h1 className="font-serif text-3xl sm:text-4xl font-medium text-white tracking-tight mb-2">
            {product.title}
          </h1>

          {/* Subtitle */}
          {product.subtitle && (
            <p className="text-sm text-zinc-400 mb-6">
              {product.subtitle}
            </p>
          )}

          {/* Pricing */}
          <div className="flex items-baseline gap-3 mb-6 pb-6 border-b border-white/[0.08]">
            <span className="font-serif text-3xl sm:text-4xl font-semibold text-white">
              {formatCurrency(product.price)}
            </span>
            {product.original_price && (
              <span className="text-sm text-zinc-500 line-through">
                {formatCurrency(product.original_price)}
              </span>
            )}
            <span className="ml-auto text-xs text-emerald-400 font-medium">
              In Stock: {product.stock} Allocated
            </span>
          </div>

          {/* Description */}
          <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed mb-8">
            {product.description}
          </p>

          {/* Variant Selector */}
          {product.variants && product.variants.length > 0 && (
            <div className="mb-8">
              <label className="block text-xs uppercase tracking-wider text-zinc-400 mb-3 font-medium">
                Finish: <span className="text-white font-semibold">{selectedVariant?.name}</span>
              </label>
              <div className="flex items-center gap-3">
                {product.variants.map((v, idx) => (
                  <button
                    key={v.id}
                    onClick={() => {
                      setSelectedVariant(v);
                      if (images.length > idx) setActiveImageIndex(idx);
                    }}
                    className={`flex items-center gap-2 px-4 py-2.5 rounded-full border text-xs transition-all ${
                      selectedVariant?.id === v.id
                        ? "bg-white/[0.08] border-luxury-accent text-white shadow-glow"
                        : "bg-white/[0.02] border-white/10 text-zinc-400 hover:text-white"
                    }`}
                  >
                    <span
                      className="w-3.5 h-3.5 rounded-full border border-white/20"
                      style={{ backgroundColor: v.hex }}
                    />
                    <span>{v.name}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Quantity & Add to Cart Controls */}
          <div className="flex items-center gap-4 mb-8">
            <div className="flex items-center border border-white/15 rounded-full px-3 py-2 bg-white/[0.03]">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="text-zinc-400 hover:text-white px-2 text-sm"
              >
                -
              </button>
              <span className="font-mono text-sm text-white px-3 font-semibold">
                {quantity}
              </span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="text-zinc-400 hover:text-white px-2 text-sm"
              >
                +
              </button>
            </div>

            <motion.button
              whileTap={{ scale: 0.96 }}
              onClick={handleAddToCart}
              className={`flex-1 py-4 px-6 rounded-full font-semibold text-xs uppercase tracking-widest transition-all duration-300 flex items-center justify-center gap-2 ${
                isAdded
                  ? "bg-emerald-500 text-black shadow-glow"
                  : "bg-gradient-to-r from-luxury-champagne via-luxury-accent to-luxury-gold text-black shadow-glow hover:shadow-glow-lg"
              }`}
            >
              {isAdded ? (
                <>
                  <Check className="w-4 h-4" />
                  <span>Added to Private Bag</span>
                </>
              ) : (
                <>
                  <ShoppingBag className="w-4 h-4" />
                  <span>Acquire Artifact ({formatCurrency(product.price * quantity)})</span>
                </>
              )}
            </motion.button>
          </div>

          {/* Concierge Guarantees */}
          <div className="grid grid-cols-2 gap-3 p-4 rounded-2xl bg-white/[0.02] border border-white/[0.06] text-xs">
            <div className="flex items-center gap-2.5 text-zinc-300">
              <Truck className="w-4 h-4 text-luxury-accent shrink-0" />
              <span>Armored Courier Transit</span>
            </div>
            <div className="flex items-center gap-2.5 text-zinc-300">
              <Shield className="w-4 h-4 text-luxury-accent shrink-0" />
              <span>5-Year Concierge Warranty</span>
            </div>
            <div className="flex items-center gap-2.5 text-zinc-300">
              <Sparkles className="w-4 h-4 text-luxury-accent shrink-0" />
              <span>Serialized Geneva Provenance</span>
            </div>
            <div className="flex items-center gap-2.5 text-zinc-300">
              <RotateCcw className="w-4 h-4 text-luxury-accent shrink-0" />
              <span>30-Day Discretion Return</span>
            </div>
          </div>

        </div>
      </div>

      {/* Technical Specifications Matrix */}
      {product.specs && Object.keys(product.specs).length > 0 && (
        <section className="mt-20 pt-16 border-t border-white/[0.08]">
          <h3 className="font-serif text-2xl text-white mb-8">Technical Specifications</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Object.entries(product.specs).map(([key, val]) => (
              <div key={key} className="p-5 rounded-2xl bg-white/[0.02] border border-white/[0.06]">
                <div className="text-[11px] uppercase tracking-wider text-luxury-accent font-semibold mb-1">
                  {key}
                </div>
                <div className="text-sm font-medium text-white">{val}</div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Connoisseur Reviews & Submission */}
      <section className="mt-20 pt-16 border-t border-white/[0.08]">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-4">
          <div>
            <h3 className="font-serif text-2xl text-white">Patron Testimonials</h3>
            <p className="text-xs text-zinc-400 mt-1">
              Verified acquisitions recorded by our international clientele.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex items-center text-luxury-accent">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-luxury-accent" />
              ))}
            </div>
            <span className="font-serif text-lg font-bold text-white">{product.rating.toFixed(1)} / 5.0</span>
          </div>
        </div>

        {/* Reviews List */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {reviews.map((rev) => (
            <div key={rev.id} className="p-6 rounded-2xl bg-white/[0.02] border border-white/[0.06] space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-luxury-accent/30 to-luxury-champagne/10 text-luxury-accent text-xs font-bold flex items-center justify-center">
                    {rev.author_name[0]}
                  </div>
                  <span className="text-xs font-semibold text-white">{rev.author_name}</span>
                </div>
                <div className="flex items-center text-luxury-accent">
                  {[...Array(Math.round(rev.rating))].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-luxury-accent" />
                  ))}
                </div>
              </div>
              {rev.headline && (
                <div className="font-serif text-sm font-medium text-luxury-champagne">
                  "{rev.headline}"
                </div>
              )}
              <p className="text-xs text-zinc-300 leading-relaxed">{rev.comment}</p>
              <div className="text-[10px] text-zinc-500 font-mono">
                Verified Acquisition • {formatDate(rev.created_at)}
              </div>
            </div>
          ))}
        </div>

        {/* Add Review Form */}
        <div className="p-6 sm:p-8 rounded-3xl bg-white/[0.02] border border-white/[0.08] max-w-2xl">
          <h4 className="font-serif text-lg text-white mb-4">Leave Archival Commentary</h4>
          <form onSubmit={handleReviewSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs uppercase tracking-wider text-zinc-400 mb-1">
                  Patron Name
                </label>
                <input
                  type="text"
                  value={newReviewAuthor}
                  onChange={(e) => setNewReviewAuthor(e.target.value)}
                  placeholder="e.g. Lord Julian Vance"
                  required
                  className="w-full px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/[0.08] text-xs text-white focus:outline-none focus:border-luxury-accent/50"
                />
              </div>
              <div>
                <label className="block text-xs uppercase tracking-wider text-zinc-400 mb-1">
                  Rating
                </label>
                <select
                  value={newReviewRating}
                  onChange={(e) => setNewReviewRating(Number(e.target.value))}
                  className="w-full px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/[0.08] text-xs text-white focus:outline-none focus:border-luxury-accent/50"
                >
                  <option value={5} className="bg-[#12131A]">5 Stars - Exceptional Heirloom</option>
                  <option value={4} className="bg-[#12131A]">4 Stars - Superior Craftsmanship</option>
                  <option value={3} className="bg-[#12131A]">3 Stars - Satisfactory</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider text-zinc-400 mb-1">
                Commentary
              </label>
              <textarea
                value={newReviewComment}
                onChange={(e) => setNewReviewComment(e.target.value)}
                rows={3}
                placeholder="Share your sensory and tactile impressions..."
                required
                className="w-full px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/[0.08] text-xs text-white focus:outline-none focus:border-luxury-accent/50"
              />
            </div>

            <button
              type="submit"
              className="px-6 py-3 rounded-full bg-white/[0.08] hover:bg-luxury-accent hover:text-black text-xs uppercase tracking-widest text-white font-semibold transition-all"
            >
              Submit Commentary
            </button>

            {reviewSubmitted && (
              <span className="text-xs text-emerald-400 ml-3">
                ✓ Commentary verified and inscribed.
              </span>
            )}
          </form>
        </div>
      </section>

    </div>
  );
}
