import HeroSection from "@/components/HeroSection";
import ProductGrid from "@/components/ProductGrid";
import ParallaxSection from "@/components/ParallaxSection";
import LuxuryShowcase from "@/components/LuxuryShowcase";
import InfiniteMarquee from "@/components/InfiniteMarquee";
import { fetchProducts, fetchCategories } from "@/lib/api";
import { Sparkles, ShieldCheck, HeartHandshake, Award } from "lucide-react";

export default async function HomePage() {
  const [products, categories] = await Promise.all([
    fetchProducts(),
    fetchCategories(),
  ]);

  return (
    <div className="space-y-12">
      {/* 1. Hero Section with Framer Motion Parallax & Micro-interactions */}
      <HeroSection />

      {/* 2. Infinite Continuous Marquee Banner (Moving Left) */}
      <InfiniteMarquee speed={28} direction="left" />

      {/* 3. Primary Collections Grid with Interactive Filtering & Staggered Animations */}
      <ProductGrid
        initialProducts={products}
        categories={categories}
        title="Atelier Masterpieces"
        subtitle="Explore our hand-finished acoustic transducers, flying tourbillons, and spatial living systems."
      />

      {/* 4. Materials Architecture Showcase */}
      <LuxuryShowcase />

      {/* 5. Reverse Infinite Continuous Marquee Banner (Moving Right) */}
      <InfiniteMarquee speed={24} direction="right" className="my-8" />

      {/* 6. Parallax Section */}
      <ParallaxSection />

      {/* 5. Provenance & Curatorial Advisory */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-8 rounded-3xl bg-white/[0.02] border border-white/[0.08] relative overflow-hidden group hover:border-luxury-accent/30 transition-all duration-500">
            <Award className="w-8 h-8 text-luxury-accent mb-4" />
            <h3 className="font-serif text-xl font-medium text-white mb-2">Serialized Registry</h3>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Every creation receives a laser-etched matrix code cataloged in our Geneva vaults, guaranteeing perpetual provenance and priority allocation for future releases.
            </p>
          </div>

          <div className="p-8 rounded-3xl bg-white/[0.02] border border-white/[0.08] relative overflow-hidden group hover:border-luxury-accent/30 transition-all duration-500">
            <ShieldCheck className="w-8 h-8 text-luxury-accent mb-4" />
            <h3 className="font-serif text-xl font-medium text-white mb-2">Concierge Care</h3>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Enjoy five years of complimentary servicing, acoustic re-calibration, and annual movement inspection conducted by our master horologists.
            </p>
          </div>

          <div className="p-8 rounded-3xl bg-white/[0.02] border border-white/[0.08] relative overflow-hidden group hover:border-luxury-accent/30 transition-all duration-500">
            <HeartHandshake className="w-8 h-8 text-luxury-accent mb-4" />
            <h3 className="font-serif text-xl font-medium text-white mb-2">Private Salon Viewing</h3>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Experience private viewings hosted at our private galleries in Mayfair London, Ginza Tokyo, and Upper East Side Manhattan.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
