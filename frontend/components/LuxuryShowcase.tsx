"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Shield, Cpu, Compass } from "lucide-react";

const MATERIALS = [
  {
    id: "beryllium",
    name: "Pure Beryllium",
    category: "Acoustic Engineering",
    icon: Sparkles,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=1200&q=80",
    headline: "Unrivaled stiffness-to-weight acoustic velocity",
    description: "Beryllium is one of the rarest elements in the universe, delivering sound propagation speeds over 12,000 meters per second — four times faster than titanium and steel, resulting in zero harmonic breakup across the audible spectrum.",
    stats: [
      { label: "Velocity", val: "12,890 m/s" },
      { label: "Resonance", val: "Sub-harmonic 0.02%" },
      { label: "Purity", val: "99.98% Be" },
    ]
  },
  {
    id: "sapphire",
    name: "Corundum Sapphire",
    category: "Horological Monobloc",
    icon: Compass,
    image: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=1200&q=80",
    headline: "9 Mohs hardness carved with ultrasound lasers",
    description: "Synthesized at 2,050°C and diamond-milled over 180 continuous hours to achieve optical clarity with zero chromatic aberration. Second in hardness only to natural diamond.",
    stats: [
      { label: "Hardness", val: "9 Mohs Scale" },
      { label: "Milling Time", val: "180 Hours" },
      { label: "Transmittance", val: "99.4% Optical" },
    ]
  },
  {
    id: "titanium",
    name: "Grade 5 Titanium",
    category: "Aerospace Metallurgy",
    icon: Shield,
    image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&w=1200&q=80",
    headline: "Medical biocompatibility with cryogenic resilience",
    description: "Alloyed with 6% aluminum and 4% vanadium (Ti-6Al-4V), offering supreme tensile strength exceeding 1,100 MPa while maintaining featherlight ergonomics and hypoallergenic skin comfort.",
    stats: [
      { label: "Tensile", val: "1,170 MPa" },
      { label: "Weight", val: "4.43 g/cm³" },
      { label: "Tolerance", val: "± 0.002mm" },
    ]
  },
  {
    id: "leather",
    name: "Tuscan Calfskin",
    category: "Tannery Heirloom",
    icon: Cpu,
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=1200&q=80",
    headline: "Slow chestnut bark vegetable tanning in Florence",
    description: "Tanned using centuries-old organic chestnut and mimosa tannins over 60 days without chromium. Develops a deeply personal golden caramel patina that reflects your worldly travels.",
    stats: [
      { label: "Tanning Cycle", val: "60 Days" },
      { label: "Origin", val: "Santa Croce, Italy" },
      { label: "Tannin", val: "100% Organic" },
    ]
  }
];

export default function LuxuryShowcase() {
  const [activeTab, setActiveTab] = useState(MATERIALS[0].id);
  const activeMaterial = MATERIALS.find((m) => m.id === activeTab) || MATERIALS[0];

  return (
    <section className="relative py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Title */}
      <div className="text-center max-w-2xl mx-auto mb-16">
        <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-luxury-accent mb-3">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Material Architecture</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-serif font-medium text-white tracking-tight">
          Crafted from Elements of Permanence
        </h2>
        <p className="text-sm sm:text-base text-zinc-400 mt-3">
          Each artifact is conceived using materials selected for their extreme acoustic, mechanical, or tactile supremacy.
        </p>
      </div>

      {/* Tabs Switcher */}
      <div className="flex justify-center mb-12">
        <div className="inline-flex p-1.5 rounded-full bg-white/[0.03] border border-white/[0.08] backdrop-blur-md gap-1 overflow-x-auto max-w-full">
          {MATERIALS.map((m) => {
            const isSelected = activeTab === m.id;
            return (
              <button
                key={m.id}
                onClick={() => setActiveTab(m.id)}
                className={`relative px-5 py-2.5 rounded-full text-xs uppercase tracking-widest font-medium transition-colors whitespace-nowrap ${
                  isSelected ? "text-black font-semibold" : "text-zinc-400 hover:text-white"
                }`}
              >
                {isSelected && (
                  <motion.div
                    layoutId="material-tab-pill"
                    className="absolute inset-0 rounded-full bg-gradient-to-r from-luxury-champagne via-luxury-accent to-luxury-gold shadow-glow -z-10"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
                {m.name}
              </button>
            );
          })}
        </div>
      </div>

      {/* Material Spotlight Panel */}
      <div className="relative rounded-3xl bg-[#111219] border border-white/[0.08] overflow-hidden shadow-luxury">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeMaterial.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center p-8 sm:p-12 lg:p-16"
          >
            {/* Left Column: Image */}
            <div className="lg:col-span-6 relative aspect-[4/3] rounded-2xl overflow-hidden bg-[#161722] border border-white/10">
              <Image
                src={activeMaterial.image}
                alt={activeMaterial.name}
                fill
                className="object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4">
                <span className="px-3 py-1 rounded-full text-[10px] uppercase tracking-wider font-semibold bg-black/60 backdrop-blur-md text-luxury-champagne border border-white/10">
                  {activeMaterial.category}
                </span>
              </div>
            </div>

            {/* Right Column: Narrative & Stats */}
            <div className="lg:col-span-6 flex flex-col justify-between">
              <div>
                <span className="text-xs uppercase tracking-widest text-luxury-accent font-semibold">
                  {activeMaterial.category}
                </span>
                <h3 className="text-2xl sm:text-3xl font-serif font-medium text-white tracking-tight mt-1 mb-4">
                  {activeMaterial.headline}
                </h3>
                <p className="text-sm text-zinc-300 leading-relaxed mb-8">
                  {activeMaterial.description}
                </p>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-3 gap-4 pt-6 border-t border-white/[0.08]">
                {activeMaterial.stats.map((stat) => (
                  <div key={stat.label}>
                    <div className="text-lg sm:text-xl font-serif font-bold text-luxury-champagne">
                      {stat.val}
                    </div>
                    <div className="text-[10px] uppercase tracking-wider text-zinc-500 mt-1">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
