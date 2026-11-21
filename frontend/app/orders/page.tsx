"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Package, Truck, CheckCircle2, Clock, Sparkles, ArrowUpRight, Search, ShieldCheck } from "lucide-react";
import { Order } from "@/types";
import { fetchOrders } from "@/lib/api";
import { formatCurrency, formatDate } from "@/lib/utils";

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    async function load() {
      const data = await fetchOrders();
      setOrders(data);
      setLoading(false);
    }
    load();
  }, []);

  const filteredOrders = orders.filter((o) =>
    o.order_number.toLowerCase().includes(search.toLowerCase()) ||
    o.customer_name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="pt-28 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-white/[0.08] pb-8 mb-10 gap-6">
        <div>
          <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-luxury-accent mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Client Registry</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-medium text-white tracking-tight">
            Acquisition Ledger & Logistics
          </h1>
          <p className="text-sm text-zinc-400 mt-2 max-w-xl">
            Track armored transit, customs provenance, and white-glove courier status for your serialized heirlooms.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="w-4 h-4 text-zinc-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search docket number..."
              className="pl-10 pr-4 py-2.5 rounded-full bg-white/[0.04] border border-white/[0.08] text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-luxury-accent/50"
            />
          </div>
          <a
            href="http://localhost:8501"
            target="_blank"
            rel="noreferrer"
            className="px-4 py-2.5 rounded-full bg-luxury-accent/10 border border-luxury-accent/30 text-luxury-champagne hover:bg-luxury-accent/20 text-xs font-medium uppercase tracking-wider transition-colors inline-flex items-center gap-1.5"
          >
            <span>Analytics Portal</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>

      {/* Orders List */}
      {loading ? (
        <div className="py-20 text-center">
          <div className="w-8 h-8 rounded-full border-2 border-luxury-accent border-t-transparent animate-spin mx-auto mb-4" />
          <div className="text-xs uppercase tracking-widest text-zinc-500">Accessing Geneva Ledger...</div>
        </div>
      ) : filteredOrders.length === 0 ? (
        <div className="text-center py-24 rounded-3xl bg-white/[0.02] border border-dashed border-white/10">
          <Package className="w-12 h-12 text-zinc-600 mx-auto mb-3" />
          <h3 className="font-serif text-xl text-white mb-1">No Acquisition Records Located</h3>
          <p className="text-xs text-zinc-400 mb-6">Explore our atelier to initiate your premier acquisition.</p>
          <Link
            href="/products"
            className="px-6 py-3 rounded-full bg-luxury-accent text-black font-semibold text-xs uppercase tracking-widest shadow-glow"
          >
            Explore Catalog
          </Link>
        </div>
      ) : (
        <div className="space-y-6">
          {filteredOrders.map((order) => (
            <motion.div
              key={order.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-3xl bg-[#111219] border border-white/[0.08] p-6 sm:p-8 shadow-glass hover:border-luxury-accent/30 transition-all"
            >
              {/* Order Meta Bar */}
              <div className="flex flex-wrap items-center justify-between pb-6 border-b border-white/[0.06] gap-4">
                <div>
                  <div className="text-[10px] uppercase tracking-widest text-zinc-500 font-mono">
                    Docket Identifier
                  </div>
                  <div className="font-mono text-base font-semibold text-luxury-champagne">
                    {order.order_number}
                  </div>
                </div>

                <div>
                  <div className="text-[10px] uppercase tracking-widest text-zinc-500">
                    Acquisition Date
                  </div>
                  <div className="text-xs text-white font-medium">
                    {formatDate(order.created_at)}
                  </div>
                </div>

                <div>
                  <div className="text-[10px] uppercase tracking-widest text-zinc-500">
                    Total Settled
                  </div>
                  <div className="font-serif text-lg font-bold text-white">
                    {formatCurrency(order.total_amount)}
                  </div>
                </div>

                <div>
                  <span
                    className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider ${
                      order.status === "delivered"
                        ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/30"
                        : order.status === "shipped"
                        ? "bg-blue-500/10 text-blue-400 border border-blue-500/30"
                        : "bg-luxury-accent/10 text-luxury-accent border border-luxury-accent/30"
                    }`}
                  >
                    {order.status === "delivered" ? (
                      <CheckCircle2 className="w-3.5 h-3.5" />
                    ) : order.status === "shipped" ? (
                      <Truck className="w-3.5 h-3.5" />
                    ) : (
                      <Clock className="w-3.5 h-3.5" />
                    )}
                    <span>{order.status}</span>
                  </span>
                </div>
              </div>

              {/* Items List */}
              <div className="py-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                {order.items.map((it, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-4 p-3 rounded-2xl bg-white/[0.02] border border-white/[0.04]"
                  >
                    <div className="relative w-16 h-16 rounded-xl overflow-hidden bg-[#161722] shrink-0">
                      {it.image ? (
                        <Image src={it.image} alt={it.title} fill className="object-cover" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-zinc-600">
                          <Package className="w-6 h-6" />
                        </div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-serif text-sm font-medium text-white truncate">
                        {it.title}
                      </div>
                      <div className="text-xs text-zinc-400">
                        Qty: {it.quantity} {it.variant && `• ${it.variant}`}
                      </div>
                      <div className="text-xs font-semibold text-luxury-champagne mt-0.5">
                        {formatCurrency(it.price * it.quantity)}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Shipping & Transit Footer */}
              <div className="pt-4 border-t border-white/[0.06] flex flex-wrap items-center justify-between text-xs text-zinc-400 gap-4">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-luxury-accent" />
                  <span>
                    Consigned to: <strong className="text-white">{order.customer_name}</strong> ({order.shipping_address?.city || "London"})
                  </span>
                </div>
                <div className="text-[11px] font-mono text-zinc-500">
                  Payment: {order.payment_method.toUpperCase()} • Armored Courier Transit
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}

    </div>
  );
}
