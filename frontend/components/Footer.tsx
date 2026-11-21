"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Sparkles, Shield, Clock, Award, ArrowRight, Check } from "lucide-react";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setTimeout(() => {
        setEmail("");
      }, 4000);
    }
  };

  return (
    <footer className="relative bg-[#07080C] border-t border-white/[0.08] pt-20 pb-12 overflow-hidden">
      
      {/* Ambient background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-luxury-accent/5 blur-[160px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Trust Badges Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pb-16 border-b border-white/[0.08]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-white/[0.03] border border-white/10 flex items-center justify-center shrink-0">
              <Award className="w-5 h-5 text-luxury-accent" />
            </div>
            <div>
              <div className="text-xs font-semibold text-white uppercase tracking-wider">Bespoke Atelier</div>
              <div className="text-[11px] text-zinc-400">Hand-finished in Geneva</div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-white/[0.03] border border-white/10 flex items-center justify-center shrink-0">
              <Shield className="w-5 h-5 text-luxury-accent" />
            </div>
            <div>
              <div className="text-xs font-semibold text-white uppercase tracking-wider">Concierge Warranty</div>
              <div className="text-[11px] text-zinc-400">5-year global coverage</div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-white/[0.03] border border-white/10 flex items-center justify-center shrink-0">
              <Clock className="w-5 h-5 text-luxury-accent" />
            </div>
            <div>
              <div className="text-xs font-semibold text-white uppercase tracking-wider">Armored Transit</div>
              <div className="text-[11px] text-zinc-400">White-glove escort delivery</div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-white/[0.03] border border-white/10 flex items-center justify-center shrink-0">
              <Sparkles className="w-5 h-5 text-luxury-accent" />
            </div>
            <div>
              <div className="text-xs font-semibold text-white uppercase tracking-wider">Carbon Neutral</div>
              <div className="text-[11px] text-zinc-400">Certified sustainable luxury</div>
            </div>
          </div>
        </div>

        {/* Main Footer Links & Newsletter */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 py-16">
          
          {/* Brand Info */}
          <div className="md:col-span-4 space-y-4">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-full border border-luxury-accent/60 flex items-center justify-center bg-luxury-surface/50">
                <div className="w-2.5 h-2.5 rounded-full bg-luxury-accent shadow-glow" />
              </div>
              <span className="font-serif text-2xl font-bold tracking-wider text-white uppercase">
                AURA
              </span>
            </Link>
            <p className="text-xs text-zinc-400 max-w-sm leading-relaxed">
              Atelier of haute horlogerie, pure beryllium acoustics, diffractive optical waveguides, and heirloom travel gear crafted in limited serialized editions.
            </p>
            <div className="text-xs text-zinc-500 font-mono pt-2">
              Mayfair • Geneva • Tokyo • Manhattan
            </div>
          </div>

          {/* Navigation Columns */}
          <div className="md:col-span-2 space-y-3">
            <h4 className="text-xs uppercase tracking-widest text-white font-semibold">Atelier</h4>
            <ul className="space-y-2 text-xs text-zinc-400">
              <li><Link href="/products" className="hover:text-white transition-colors">All Collections</Link></li>
              <li><Link href="/products?category=audio-acoustics" className="hover:text-white transition-colors">Acoustics</Link></li>
              <li><Link href="/products?category=haute-horlogerie" className="hover:text-white transition-colors">Horlogerie</Link></li>
              <li><Link href="/products?category=smart-living" className="hover:text-white transition-colors">Smart Living</Link></li>
              <li><Link href="/products?category=optics-vision" className="hover:text-white transition-colors">Waveguide Optics</Link></li>
            </ul>
          </div>

          <div className="md:col-span-2 space-y-3">
            <h4 className="text-xs uppercase tracking-widest text-white font-semibold">Concierge</h4>
            <ul className="space-y-2 text-xs text-zinc-400">
              <li><Link href="/orders" className="hover:text-white transition-colors">Client Orders</Link></li>
              <li><a href="http://localhost:8501" target="_blank" rel="noreferrer" className="text-luxury-champagne hover:underline">Streamlit Analytics</a></li>
              <li><a href="http://localhost:8000/docs" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">FastAPI Specs</a></li>
              <li><span className="hover:text-white cursor-pointer transition-colors">Private Viewing</span></li>
              <li><span className="hover:text-white cursor-pointer transition-colors">Archival Provenance</span></li>
            </ul>
          </div>

          {/* Newsletter / Invitation */}
          <div className="md:col-span-4 space-y-4">
            <h4 className="text-xs uppercase tracking-widest text-white font-semibold">The Atelier Registry</h4>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Receive private salon invitations and prior acquisition allocations ahead of public releases.
            </p>
            <form onSubmit={handleSubscribe} className="relative flex items-center">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Private Email..."
                required
                className="w-full pl-4 pr-12 py-3 rounded-full bg-white/[0.04] border border-white/[0.08] text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-luxury-accent/50 transition-colors"
              />
              <button
                type="submit"
                className="absolute right-1.5 p-2 rounded-full bg-luxury-accent text-black hover:bg-luxury-champagne transition-colors"
              >
                {subscribed ? <Check className="w-3.5 h-3.5" /> : <ArrowRight className="w-3.5 h-3.5" />}
              </button>
            </form>
            {subscribed && (
              <div className="text-[11px] text-emerald-400">
                ✓ Your invitation request has been logged in our Geneva registry.
              </div>
            )}
          </div>

        </div>

        {/* Bottom Copyright */}
        <div className="pt-8 border-t border-white/[0.06] flex flex-col sm:flex-row items-center justify-between text-xs text-zinc-500 gap-4">
          <div>
            © {new Date().getFullYear()} AURA Atelier SA. All international rights reserved.
          </div>
          <div className="flex items-center gap-6">
            <span className="hover:text-zinc-300 cursor-pointer">Privacy Charter</span>
            <span className="hover:text-zinc-300 cursor-pointer">Terms of Allocation</span>
            <span className="hover:text-zinc-300 cursor-pointer">Heirloom Guarantee</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
