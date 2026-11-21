import { Product, Category, Order, Review, User } from "@/types";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

// Fallback Luxury Seed Catalog in case backend API is connecting
export const FALLBACK_PRODUCTS: Product[] = [
  {
    id: 1,
    title: "AURA Aetherial Pro Wireless Headphones",
    subtitle: "Beryllium Drivers & Active Spatial Cancelling",
    slug: "aura-aetherial-pro",
    description: "Engineered without compromise. Incorporates bespoke 45mm custom-tuned pure beryllium acoustic drivers encased within CNC-milled aerospace grade 5 titanium. Featuring lossless 24-bit/192kHz Bluetooth 5.4 streaming, active room-geometry cancellation, and lambskin cushions.",
    price: 890,
    original_price: 980,
    rating: 4.9,
    reviews_count: 48,
    category_id: 1,
    category_name: "Audio & Acoustics",
    stock: 18,
    is_featured: true,
    is_trending: true,
    badge: "Flagship Acoustic",
    variants: [
      { id: "slate-titanium", name: "Slate Titanium", hex: "#2B2D42" },
      { id: "obsidian-black", name: "Obsidian Black", hex: "#111111" },
      { id: "champagne-gold", name: "Champagne Gold", hex: "#D4AF37" }
    ],
    specs: {
      "Transducer": "45mm Pure Beryllium Diaphragms",
      "Frequency Response": "5Hz - 48,000Hz",
      "Battery Life": "42 Hours with ANC Active",
      "Chassis": "Aerospace Grade 5 Milled Titanium",
      "Connectivity": "Bluetooth 5.4 / Lossless USB-C Audio / 3.5mm Pure Silver Cable"
    },
    images: [
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1484704849700-f032a568e944?auto=format&fit=crop&w=1200&q=80"
    ]
  },
  {
    id: 2,
    title: "Chronos Orbit Flying Tourbillon",
    subtitle: "Sapphire Monobloc & 72-Hour Co-Axial Reserve",
    slug: "chronos-orbit-tourbillon",
    description: "A transcendent expression of micro-engineering. Suspends a single-axis flying tourbillon within a monolithic synthetic sapphire crystal case, offering complete 360-degree transparency of its 288-component in-house mechanical movement.",
    price: 3850,
    original_price: 4200,
    rating: 5.0,
    reviews_count: 27,
    category_id: 2,
    category_name: "Haute Horlogerie",
    stock: 6,
    is_featured: true,
    is_trending: true,
    badge: "Limited Edition 50 Pcs",
    variants: [
      { id: "sapphire-clear", name: "Pure Sapphire", hex: "#E0E7FF" },
      { id: "smoked-sapphire", name: "Smoked Anthracite", hex: "#334155" }
    ],
    specs: {
      "Movement": "Calibre A-88 Flying Tourbillon, Hand-wound",
      "Power Reserve": "72 Hours via Dual Coupled Barrels",
      "Case Material": "Solid Monolithic Corundum Sapphire Crystal",
      "Water Resistance": "50 meters (5 ATM)"
    },
    images: [
      "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=1200&q=80"
    ]
  },
  {
    id: 3,
    title: "Vespera Spatial Architectural Soundbar",
    subtitle: "Dolby Atmos 9.1.4 in Machined Anodized Aluminum",
    slug: "vespera-spatial-soundbar",
    description: "Sculpted from a single extrusion of architectural aluminum, the Vespera seamlessly blends museum-grade design with cinematic acoustics. Fourteen custom neodymium drivers project three-dimensional soundscapes that adapt in real time.",
    price: 1450,
    original_price: 1600,
    rating: 4.8,
    reviews_count: 34,
    category_id: 3,
    category_name: "Smart Living",
    stock: 12,
    is_featured: true,
    is_trending: false,
    badge: "Red Dot Best of Best",
    variants: [
      { id: "silver-mist", name: "Silver Mist", hex: "#E2E8F0" },
      { id: "matte-black", name: "Matte Black", hex: "#1E293B" }
    ],
    specs: {
      "Audio Channels": "9.1.4 Dolby Atmos & DTS:X Pro",
      "Drivers": "14 Custom Neodymium High-Excursion Arrays",
      "Amplification": "550W Class-D Tri-amplified"
    },
    images: [
      "https://images.unsplash.com/photo-1545454675-3531b543be5d?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&w=1200&q=80"
    ]
  },
  {
    id: 4,
    title: "Lumina Vision Titanium AR Spectacles",
    subtitle: "Dual 4K Micro-OLED Waveguide Optics",
    slug: "lumina-vision-ar",
    description: "Weighing only 64 grams, Lumina Vision combines surgical titanium wireframes with diffractive optical waveguides delivering 4,000-nit peak outdoor brightness and real-time neural speech translation.",
    price: 1280,
    original_price: 1400,
    rating: 4.9,
    reviews_count: 29,
    category_id: 4,
    category_name: "Optics & Vision",
    stock: 9,
    is_featured: true,
    is_trending: true,
    badge: "Innovation Award",
    variants: [
      { id: "brushed-gunmetal", name: "Brushed Gunmetal", hex: "#4A5568" },
      { id: "pale-gold", name: "Pale Gold", hex: "#ECC94B" }
    ],
    specs: {
      "Displays": "Dual 0.55\" Micro-OLED 3840x2160 @ 120Hz",
      "Peak Brightness": "4,000 nits",
      "Sensors": "Sub-millimeter ToF Depth + 6DoF Inertial Tracking"
    },
    images: [
      "https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=1200&q=80"
    ]
  },
  {
    id: 5,
    title: "Valise Noire Carbon Weave Duffel",
    subtitle: "Ballistic Carbon Twill & Tuscan Vegetable Leather",
    slug: "valise-noire-carbon-duffel",
    description: "Crafted from resilient 3K carbon-infused ballistic weave paired with hand-buffed Tuscan vegetable-tanned leather. Features an integrated capacitive fingerprint biometric lock.",
    price: 760,
    original_price: 850,
    rating: 4.9,
    reviews_count: 52,
    category_id: 5,
    category_name: "Leather & Travel",
    stock: 14,
    is_featured: false,
    is_trending: true,
    badge: "Bestseller",
    variants: [
      { id: "stealth-carbon", name: "Stealth Carbon", hex: "#18181B" },
      { id: "havana-brown", name: "Havana Brown", hex: "#78350F" }
    ],
    specs: {
      "Exterior": "3K Carbon Fiber Weave + Full-Grain Italian Calfskin",
      "Locking": "Capacitive Fingerprint Sensor (0.2s Unlock)"
    },
    images: [
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=1200&q=80"
    ]
  },
  {
    id: 6,
    title: "Monolith Ambient Air Purifier & Lamp",
    subtitle: "Volcanic Basalt Ceramic & True Medical HEPA-H14",
    slug: "monolith-purifier-lamp",
    description: "Cast from dense volcanic basalt stone composite, the Monolith silently purifies 850 cubic feet per hour with medical-grade HEPA-H14 filtration while casting a warm circadian glow.",
    price: 680,
    original_price: 750,
    rating: 4.7,
    reviews_count: 21,
    category_id: 3,
    category_name: "Smart Living",
    stock: 8,
    is_featured: false,
    is_trending: false,
    badge: "New Arrival",
    variants: [
      { id: "basalt-charcoal", name: "Basalt Charcoal", hex: "#27272A" },
      { id: "limestone-ivory", name: "Limestone Ivory", hex: "#F4F4F5" }
    ],
    specs: {
      "Filtration": "Medical Grade True HEPA-H14 + Activated Carbon",
      "Acoustics": "Near-silent 19dB in Sleep Sanctuary Mode"
    },
    images: [
      "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=1200&q=80"
    ]
  },
  {
    id: 7,
    title: "Eclipse MagSafe Wireless Charging Valet",
    subtitle: "Solid Billet Aluminum & Horween Leather Inlay",
    slug: "eclipse-charging-valet",
    description: "Carved from a solid billet of aerospace aluminum with an inlay of genuine Chicago Horween leather. Charges your iPhone, Watch Ultra, and AirPods simultaneously with high-speed Qi2.",
    price: 340,
    original_price: 380,
    rating: 4.9,
    reviews_count: 64,
    category_id: 3,
    category_name: "Smart Living",
    stock: 25,
    is_featured: false,
    is_trending: true,
    badge: "Essential",
    variants: [
      { id: "space-gray-leather", name: "Space Gray & Black Horween", hex: "#374151" },
      { id: "silver-tan-leather", name: "Silver & Saddle Tan", hex: "#D97706" }
    ],
    specs: {
      "Chassis": "CNC Milled Billet Aluminum (Weight: 1.2 kg)",
      "Wireless Speeds": "Phone (15W Qi2), Watch Ultra (5W), Audio (5W)"
    },
    images: [
      "https://images.unsplash.com/photo-1586105251261-72a756497a11?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?auto=format&fit=crop&w=1200&q=80"
    ]
  },
  {
    id: 8,
    title: "Spectra Artisan Mechanical Keyboard",
    subtitle: "CNC Brass Weight & Hand-Lubed Ceramic Switches",
    slug: "spectra-artisan-keyboard",
    description: "Tactile perfection. The Spectra features a gasket-mounted acoustic isolated sandwich architecture with custom hand-lubricated ceramic stem linear switches and a polished mirror brass weight plate.",
    price: 540,
    original_price: 590,
    rating: 4.9,
    reviews_count: 41,
    category_id: 1,
    category_name: "Audio & Acoustics",
    stock: 11,
    is_featured: true,
    is_trending: false,
    badge: "Artisan Guild",
    variants: [
      { id: "ceramic-white", name: "Ceramic Glaze White", hex: "#F8FAFC" },
      { id: "raw-titanium", name: "Anodized Silver", hex: "#94A3B8" }
    ],
    specs: {
      "Plate Mounting": "Dual Gasket Silicon Dampened",
      "Switches": "Custom Factory Hand-Lubed 45g Ceramic Linear",
      "Weight": "2.4 kg (Solid Polished Brass Base Plate)"
    },
    images: [
      "https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?auto=format&fit=crop&w=1200&q=80"
    ]
  }
];

export const FALLBACK_CATEGORIES: Category[] = [
  { id: 1, name: "Audio & Acoustics", slug: "audio-acoustics", product_count: 2 },
  { id: 2, name: "Haute Horlogerie", slug: "haute-horlogerie", product_count: 1 },
  { id: 3, name: "Smart Living", slug: "smart-living", product_count: 3 },
  { id: 4, name: "Optics & Vision", slug: "optics-vision", product_count: 1 },
  { id: 5, name: "Leather & Travel", slug: "leather-travel", product_count: 1 }
];

export async function fetchProducts(params?: {
  category_slug?: string;
  search?: string;
  featured_only?: boolean;
  trending_only?: boolean;
  sort_by?: string;
  min_price?: number;
  max_price?: number;
}): Promise<Product[]> {
  try {
    const url = new URL(`${API_BASE}/api/products`);
    if (params) {
      Object.entries(params).forEach(([key, val]) => {
        if (val !== undefined && val !== null && val !== "" && val !== "all") {
          url.searchParams.append(key, String(val));
        }
      });
    }
    const res = await fetch(url.toString(), { cache: "no-store" });
    if (!res.ok) throw new Error("Failed to fetch products");
    return await res.json();
  } catch (err) {
    console.warn("Using fallback products dataset:", err);
    let list = [...FALLBACK_PRODUCTS];
    if (params?.category_slug && params.category_slug !== "all") {
      const cat = FALLBACK_CATEGORIES.find(c => c.slug === params.category_slug);
      if (cat) list = list.filter(p => p.category_id === cat.id);
    }
    if (params?.search) {
      const q = params.search.toLowerCase();
      list = list.filter(p => p.title.toLowerCase().includes(q) || p.description.toLowerCase().includes(q));
    }
    if (params?.featured_only) {
      list = list.filter(p => p.is_featured);
    }
    if (params?.trending_only) {
      list = list.filter(p => p.is_trending);
    }
    if (params?.sort_by === "price_asc") {
      list.sort((a, b) => a.price - b.price);
    } else if (params?.sort_by === "price_desc") {
      list.sort((a, b) => b.price - a.price);
    } else if (params?.sort_by === "rating") {
      list.sort((a, b) => b.rating - a.rating);
    }
    return list;
  }
}

export async function fetchProductById(idOrSlug: string): Promise<Product | null> {
  try {
    const res = await fetch(`${API_BASE}/api/products/${idOrSlug}`, { cache: "no-store" });
    if (!res.ok) throw new Error("Product not found");
    return await res.json();
  } catch (err) {
    console.warn("Product fallback lookup:", err);
    const prod = FALLBACK_PRODUCTS.find(p => String(p.id) === idOrSlug || p.slug === idOrSlug);
    return prod || null;
  }
}

export async function fetchCategories(): Promise<Category[]> {
  try {
    const res = await fetch(`${API_BASE}/api/products/categories`, { cache: "no-store" });
    if (!res.ok) throw new Error("Failed to fetch categories");
    return await res.json();
  } catch {
    return FALLBACK_CATEGORIES;
  }
}

export async function submitOrder(orderData: any): Promise<Order> {
  const res = await fetch(`${API_BASE}/api/orders`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(orderData),
  });
  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(errorText || "Failed to submit order");
  }
  return await res.json();
}

export async function fetchOrders(): Promise<Order[]> {
  try {
    const res = await fetch(`${API_BASE}/api/orders`, { cache: "no-store" });
    if (!res.ok) return [];
    return await res.json();
  } catch {
    return [];
  }
}
