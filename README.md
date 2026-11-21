# AURA • Haute Horlogerie & Bespoke Design Ecosystem

> A production-ready, ultra-premium luxury e-commerce ecosystem combining Apple-inspired fluid micro-interactions with deep enterprise analytics.

Built with **Next.js 16 (React 19 + Framer Motion)**, **Python FastAPI REST APIs**, and a **Streamlit Executive Business Analytics Dashboard**.

---

## 🏛️ Architecture Overview

The ecosystem is architected into three decoupled, scalable applications communicating via secure REST APIs over a unified relational database:

```
E-commerce/
├── backend/            # FastAPI REST API & Database Layer (Port 8000)
│   ├── app/
│   │   ├── main.py             # Application factory & CORS
│   │   ├── config.py           # Unified environment settings
│   │   ├── database.py         # SQLAlchemy engine & session factory
│   │   ├── seed_data.py        # Realistic luxury catalog & 165+ orders
│   │   ├── models/             # User, Product, Category, Order, Review
│   │   ├── schemas/            # Pydantic validation schemas
│   │   └── routers/            # /api/auth, /api/products, /api/orders, /api/analytics
│   ├── ecommerce.db            # Shared Relational Database
│   ├── requirements.txt
│   └── run.py
│
├── frontend/           # Next.js 16 Luxury Storefront (Port 3000)
│   ├── app/                    # App Router (Home, Catalog, Product Detail, Orders)
│   ├── components/             # Framer Motion animated components
│   │   ├── Navbar.tsx          # Sticky glass navbar with hover pill
│   │   ├── HeroSection.tsx     # Parallax typography & 3D tilt reveal
│   │   ├── ProductCard.tsx     # Zoom hover, tactile cart feedback, variant switcher
│   │   ├── ProductGrid.tsx     # Staggered reveals & live search
│   │   ├── CartDrawer.tsx      # Slide-in bag with free shipping meter
│   │   ├── WishlistDrawer.tsx  # Interactive saved artifacts
│   │   ├── CheckoutModal.tsx   # Multi-step checkout with confetti celebration
│   │   ├── LuxuryShowcase.tsx  # Interactive materials spotlight
│   │   └── ParallaxSection.tsx # Scroll-linked parallax editorial
│   ├── context/                # CartContext, WishlistContext, AuthContext
│   ├── lib/api.ts              # Resilient backend fetcher
│   └── types/index.ts          # TypeScript domain models
│
├── dashboard/          # Streamlit Executive Suite (Port 8501)
│   ├── app.py                  # Dark-themed enterprise dashboard
│   ├── requirements.txt
│   └── .env                    # Configured to connect to FastAPI REST
│
├── start_all.bat       # One-click Windows CMD launcher
├── start_all.ps1       # One-click PowerShell launcher
└── README.md
```

---

## ✨ Implemented Animation & Micro-Interaction Specifications

### 1. Hero Section Animations
- **Fade-in & Slide-up**: Cascading staggered header entrance (`cubic-bezier(0.16, 1, 0.3, 1)`).
- **Product Image Reveal**: Smooth scale-up and floating elevation with depth aura.
- **Scroll-Linked Parallax**: Real-time counter-scrolling via Framer Motion `useScroll` and `useTransform`.
- **Magnetic CTAs**: Luminous gradient glow hover effects with bouncing arrow micro-motion.
- **Ambient Lighting**: Floating radial aura light blending with deep obsidian surfaces.

### 2. Scroll & Viewport Animations
- **Staggered Reveals**: Products reveal with coordinated timing offsets as they enter view.
- **Parallax Editorial**: Background and foreground translate at differential speeds during scroll.
- **Sticky Glass Navbar**: Blur intensity and border opacity dynamically transition upon scroll > 20px.

### 3. Product Micro-Interactions
- **Smooth Image Zoom**: Subtle 1.06x scale with cubic easing on card hover.
- **Tactile Add-to-Bag**: Instant spring confirmation button that transforms to "Added" state.
- **Variant Switcher**: Interactive swatch dots triggering smooth cross-fading product imagery.
- **Wishlist Heart Pop**: Animated scale sequence `[1, 1.35, 1]` with vibrant gold fill.

### 4. Shopping & Checkout Experience
- **Animated Bag Drawer**: Spring-damped slide-over drawer with real-time subtotal updates.
- **White-Glove Shipping Meter**: Interactive progress bar unlocking complimentary transit at \$500.
- **Multi-Step Checkout**: Animated progress steps (Shipping & Sanctuary ➔ Payment ➔ Confirmation).
- **Celebratory Confetti**: Particle burst celebration upon order authorization.

---

## ⚡ Quick Start & Launch Instructions

### Option A: One-Click Launch (Windows)
Double-click `start_all.bat` or run in PowerShell:
```powershell
.\start_all.ps1
```
This spawns all three services concurrently in organized terminal windows.

### Option B: Manual Service Startup

#### 1. Start the FastAPI Backend (Port 8000)
```powershell
cd backend
python -m uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload
```
- API Base: `http://localhost:8000`
- Interactive Swagger Documentation: `http://localhost:8000/docs`

#### 2. Start the Next.js Storefront (Port 3000)
```powershell
cd frontend
npm.cmd run dev
```
- Storefront URL: `http://localhost:3000`

#### 3. Start the Streamlit Analytics Dashboard (Port 8501)
```powershell
cd dashboard
python -m streamlit run app.py --server.port 8501
```
- Dashboard URL: `http://localhost:8501`

---

## 📊 Streamlit Business Analytics Features

The Streamlit dashboard connects securely to the FastAPI backend at `http://localhost:8000/api/analytics/...` and includes:
1. **Executive KPI Cards**: Total Gross Revenue, Completed Orders, Average Order Value (AOV), Client Registry, and Inventory Health.
2. **Sales Velocity**: Plotly interactive area chart with 7-day moving averages and date range selector.
3. **Monthly & Yearly Reports**: Aggregate revenue tables with one-click **CSV Export**.
4. **Product Velocity**: Best-selling artifacts by revenue and volume, plus category donut breakdown.
5. **Inventory Monitoring**: Low-stock threshold alerts, warehouse asset valuation, and automated reorder recommendations.
6. **Predictive Revenue Forecasting**: Trend regression with 95% confidence corridor bands for 3 to 12 months ahead.
7. **Master Transaction Ledger**: Searchable customer order ledger with status filters and full compliance CSV export.

---

## 🔐 Credentials & Seed Accounts

The SQLite database is pre-seeded with 8 luxury artifacts, 165+ realistic historical orders, and customer reviews:
- **Client Account**: `client@aura.luxury` / `LuxuryPass2026!`
- **Admin Account**: `admin@aura.luxury` / `LuxuryAdmin2026!`
- **Promotional Invitation Code**: `AURA10` (10% VIP client deduction at checkout)
