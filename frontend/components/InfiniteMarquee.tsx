"use client";

import React from "react";
import { motion } from "framer-motion";
import { Sparkles, Gem, Award, Shield, Compass, Cpu } from "lucide-react";

interface InfiniteMarqueeProps {
  speed?: number; // duration in seconds for full loop
  direction?: "left" | "right";
  pauseOnHover?: boolean;
  className?: string;
}

const MARQUEE_ITEMS = [
  { text: "Pure Beryllium Acoustics", icon: Sparkles },
  { text: "Haute Horlogerie Suisse", icon: Gem },
  { text: "Monolithic Corundum Sapphire", icon: Award },
  { text: "Grade 5 Aerospace Titanium", icon: Shield },
  { text: "Dolby Atmos 9.1.4 Spatial Sound", icon: Cpu },
  { text: "Serialized Geneva Vault Archive", icon: Compass },
  { text: "White-Glove Armored Transit", icon: Shield },
  { text: "Tuscan Vegetable-Tanned Calfskin", icon: Award },
  { text: "Diffractive 4K Waveguide Optics", icon: Sparkles },
];

export default function InfiniteMarquee({
  speed = 32,
  direction = "left",
  pauseOnHover = true,
  className = "",
}: InfiniteMarqueeProps) {
  // Duplicate array twice to ensure seamless continuous infinite scrolling loop
  const duplicatedItems = [...MARQUEE_ITEMS, ...MARQUEE_ITEMS];

  const animateX = direction === "left" ? ["0%", "-50%"] : ["-50%", "0%"];

  return (
    <div
      className={`relative w-full overflow-hidden py-5 border-y border-white/[0.08] bg-[#0c0d14]/90 backdrop-blur-xl ${className}`}
    >
      {/* Left Edge Smooth Vignette Gradient Fade */}
      <div className="absolute top-0 bottom-0 left-0 w-24 sm:w-40 bg-gradient-to-r from-[#090A0F] via-[#090A0F]/70 to-transparent z-20 pointer-events-none" />

      {/* Right Edge Smooth Vignette Gradient Fade */}
      <div className="absolute top-0 bottom-0 right-0 w-24 sm:w-40 bg-gradient-to-l from-[#090A0F] via-[#090A0F]/70 to-transparent z-20 pointer-events-none" />

      {/* Smooth Continuous Marquee Ribbon */}
      <motion.div
        animate={{ x: animateX }}
        transition={{
          repeat: Infinity,
          repeatType: "loop",
          duration: speed,
          ease: "linear",
        }}
        whileHover={pauseOnHover ? { animationPlayState: "paused" } : undefined}
        className="flex items-center w-max gap-8 sm:gap-12 cursor-default select-none"
      >
        {duplicatedItems.map((item, index) => {
          const Icon = item.icon;
          return (
            <div
              key={index}
              className="flex items-center gap-3 shrink-0 group transition-transform duration-300"
            >
              <div className="w-6 h-6 rounded-full bg-luxury-accent/10 border border-luxury-accent/30 flex items-center justify-center text-luxury-accent group-hover:scale-110 transition-transform">
                <Icon className="w-3.5 h-3.5 text-luxury-accent animate-pulse" />
              </div>
              <span className="font-serif text-xs sm:text-sm font-medium tracking-[0.2em] uppercase text-zinc-300 group-hover:text-luxury-champagne transition-colors">
                {item.text}
              </span>
              <span className="text-luxury-accent/40 text-xs pl-4">✦</span>
            </div>
          );
        })}
      </motion.div>
    </div>
  );
}
