"use client";

import React, { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Sparkles, Award } from "lucide-react";

export default function ParallaxSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const yBg = useTransform(scrollYProgress, [0, 1], [-80, 80]);
  const yContent = useTransform(scrollYProgress, [0, 1], [40, -40]);

  return (
    <section
      ref={containerRef}
      className="relative min-h-[70vh] flex items-center justify-center overflow-hidden my-24 border-y border-white/[0.08]"
    >
      {/* Background Image with Parallax Movement */}
      <motion.div style={{ y: yBg }} className="absolute inset-0 -top-24 -bottom-24 w-full h-[130%] -z-10">
        <Image
          src="https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=1920&q=85"
          alt="Luxury Watch Atelier"
          fill
          className="object-cover object-center brightness-[0.25]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#090A0F] via-black/40 to-[#090A0F]" />
      </motion.div>

      {/* Content Container */}
      <motion.div
        style={{ y: yContent }}
        className="max-w-4xl mx-auto px-6 py-20 text-center z-10"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.05] border border-white/[0.1] text-xs font-semibold tracking-widest uppercase text-luxury-champagne mb-6 backdrop-blur-md"
        >
          <Award className="w-4 h-4 text-luxury-accent" />
          <span>Atelier Philosophy</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-3xl sm:text-5xl lg:text-6xl font-serif font-medium text-white tracking-tight leading-[1.15] mb-6"
        >
          Precision is not an ambition. <br />
          <span className="italic font-light text-luxury-champagne">It is our singular threshold.</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-sm sm:text-lg text-zinc-300 max-w-2xl mx-auto leading-relaxed mb-10"
        >
          Every acoustic membrane, synthetic sapphire crystal monobloc, and hand-stitched Tuscan hide is individually serialized and documented in our private Geneva archive.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="flex flex-wrap items-center justify-center gap-4"
        >
          <Link
            href="/products/haute-horlogerie"
            className="px-8 py-4 rounded-full bg-gradient-to-r from-luxury-champagne via-luxury-accent to-luxury-gold text-black font-semibold text-xs uppercase tracking-widest shadow-glow hover:shadow-glow-lg transition-all"
          >
            Discover Haute Horlogerie
          </Link>
          <a
            href="http://localhost:8501"
            target="_blank"
            rel="noreferrer"
            className="px-8 py-4 rounded-full bg-white/[0.05] hover:bg-white/[0.1] border border-white/10 text-white font-medium text-xs uppercase tracking-widest transition-all"
          >
            Executive Analytics Suite
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
}
