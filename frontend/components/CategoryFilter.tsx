"use client";

import React from "react";
import { motion } from "framer-motion";
import { Category } from "@/types";

interface CategoryFilterProps {
  categories: Category[];
  selectedCategory: string;
  onSelectCategory: (slug: string) => void;
}

export default function CategoryFilter({
  categories,
  selectedCategory,
  onSelectCategory,
}: CategoryFilterProps) {
  const allCategories = [{ id: 0, name: "All Collections", slug: "all" }, ...categories];

  return (
    <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none py-1">
      {allCategories.map((cat) => {
        const isSelected = selectedCategory === cat.slug;
        return (
          <button
            key={cat.slug}
            onClick={() => onSelectCategory(cat.slug)}
            className={`relative px-5 py-2.5 rounded-full text-xs uppercase tracking-widest font-medium whitespace-nowrap transition-colors duration-300 ${
              isSelected ? "text-black font-semibold" : "text-zinc-400 hover:text-white bg-white/[0.03] border border-white/[0.08]"
            }`}
          >
            {isSelected && (
              <motion.div
                layoutId="category-pill"
                className="absolute inset-0 rounded-full bg-gradient-to-r from-luxury-champagne via-luxury-accent to-luxury-gold shadow-glow -z-10"
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
              />
            )}
            {cat.name}
          </button>
        );
      })}
    </div>
  );
}
