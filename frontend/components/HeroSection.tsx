"use client";

import React, { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Sparkles, ShieldCheck, Gem } from "lucide-react";
import { formatCurrency } from "@/lib/utils";

export default function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  // Parallax transformations
  const yText = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const yImage = useTransform(scrollYProgress, [0, 1], [0, -70]);
  const opacity = useTransform(scrollYProgress, [0, 0.85], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.95]);

  return (
    <div
      ref={containerRef}
      className="relative min-h-[92vh] flex items-center justify-center overflow-hidden pt-28 pb-16 px-4 sm:px-6 lg:px-8"
    >
      {/* Ambient Lighting & Luminous Aura */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-luxury-accent/15 via-luxury-gold/5 to-transparent rounded-full blur-[140px] pointer-events-none -z-10" />
      <div className="absolute bottom-10 right-10 w-[400px] h-[400px] bg-blue-500/5 rounded-full blur-[120px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
        
        {/* Left Column: Typography & CTAs */}
        <motion.div
          style={{ y: yText, opacity }}
          className="lg:col-span-7 flex flex-col items-start z-10"
        >
          {/* Subtle Tagline Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.08] text-xs font-medium tracking-widest uppercase text-luxury-champagne mb-6 backdrop-blur-md"
          >
            <Sparkles className="w-3.5 h-3.5 text-luxury-accent" />
            <span>Autumn / Winter Collection 2026</span>
          </motion.div>

          {/* Master Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="text-4xl sm:text-6xl lg:text-7xl font-serif font-medium tracking-tight text-white leading-[1.08] mb-6"
          >
            Pure form. <br />
            <span className="italic font-light bg-gradient-to-r from-luxury-accent via-white to-luxury-champagne bg-clip-text text-transparent">
              Immaculate
            </span>{" "}
            presence.
          </motion.h1>

          {/* Subtext */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="text-base sm:text-lg text-zinc-400 font-normal max-w-xl leading-relaxed mb-8"
          >
            Bridging master Swiss chronometry, beryllium acoustics, and aerospace titanium engineering into heirloom artifacts designed for generations of connoisseurs.
          </motion.p>

          {/* Animated Call-to-Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-wrap items-center gap-4 w-full sm:w-auto"
          >
            {/* Primary Magnetic CTA */}
            <Link
              href="/products"
              className="group relative inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full text-sm font-semibold tracking-wider uppercase text-black bg-gradient-to-r from-luxury-champagne via-luxury-accent to-luxury-gold shadow-glow hover:shadow-glow-lg transition-all duration-300"
            >
              <span>Explore Collection</span>
              <motion.span
                animate={{ x: [0, 4, 0] }}
                transition={{ repeat: Infinity, duration: 1.6, ease: "easeInOut" }}
              >
                <ArrowRight className="w-4 h-4 text-black" />
              </motion.span>
            </Link>

            {/* Secondary Glass CTA */}
            <Link
              href="/products/chronos-orbit-tourbillon"
              className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-full text-sm font-medium tracking-wider uppercase text-white bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.1] hover:border-luxury-accent/40 backdrop-blur-md transition-all duration-300"
            >
              <span>View Horlogerie</span>
            </Link>
          </motion.div>

          {/* Trust Metric Badges */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="grid grid-cols-3 gap-6 sm:gap-10 pt-10 mt-10 border-t border-white/[0.08] w-full max-w-lg"
          >
            <div>
              <div className="text-2xl font-serif font-bold text-white tracking-tight">45mm</div>
              <div className="text-xs text-zinc-500 uppercase tracking-widest mt-1">Pure Beryllium</div>
            </div>
            <div>
              <div className="text-2xl font-serif font-bold text-white tracking-tight">72 Hr</div>
              <div className="text-xs text-zinc-500 uppercase tracking-widest mt-1">Tourbillon Reserve</div>
            </div>
            <div>
              <div className="text-2xl font-serif font-bold text-white tracking-tight">Grade 5</div>
              <div className="text-xs text-zinc-500 uppercase tracking-widest mt-1">Aero Titanium</div>
            </div>
          </motion.div>
        </motion.div>

        {/* Right Column: Hero Product Reveal */}
        <motion.div
          style={{ y: yImage, scale }}
          className="lg:col-span-5 relative flex items-center justify-center"
        >
          {/* Circular Architectural Frame */}
          <div className="relative w-full max-w-[460px] aspect-square rounded-3xl p-3 bg-gradient-to-b from-white/[0.12] via-white/[0.03] to-transparent border border-white/[0.15] shadow-luxury backdrop-blur-md group">
            
            <div className="relative w-full h-full rounded-2xl overflow-hidden bg-[#111219]">
              <Image
                src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=1200&q=80"
                alt="AURA Aetherial Pro Wireless Headphones"
                fill
                priority
                sizes="(max-width: 768px) 100vw, 460px"
                className="object-cover object-center group-hover:scale-105 transition-transform duration-1000 ease-apple-ease"
              />
              
              {/* Subtle glass reflection overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#090A0F] via-transparent to-transparent opacity-80" />

              {/* Floating Product Tag Capsule */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="absolute bottom-6 left-6 right-6 p-4 rounded-xl bg-black/60 backdrop-blur-xl border border-white/10 flex items-center justify-between"
              >
                <div>
                  <div className="text-[10px] tracking-widest uppercase text-luxury-accent font-semibold">Featured Masterpiece</div>
                  <div className="text-sm font-semibold text-white">AURA Aetherial Pro Studio</div>
                </div>
                <div className="text-right">
                  <div className="text-xs line-through text-zinc-500">$980</div>
                  <div className="text-sm font-serif font-bold text-luxury-champagne">$890</div>
                </div>
              </motion.div>
            </div>

            {/* Glowing Accent Ring */}
            <div className="absolute -inset-1 rounded-3xl bg-gradient-to-tr from-luxury-accent/30 to-transparent -z-10 blur-xl opacity-60" />
          </div>
        </motion.div>

      </div>
    </div>
  );
}
