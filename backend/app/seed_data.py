import json
import random
import uuid
from datetime import datetime, timedelta
from sqlalchemy.orm import Session
from .database import engine, SessionLocal, Base
from .models.user import User
from .models.product import Product, Category
from .models.order import Order
from .models.review import Review
from .routers.auth import hash_password

CATEGORIES_DATA = [
    {
        "name": "Audio & Acoustics",
        "slug": "audio-acoustics",
        "description": "Bespoke acoustic transducers, aerospace alloys, and immersive spatial sound engineering.",
        "image_url": "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=1200&q=80"
    },
    {
        "name": "Haute Horlogerie",
        "slug": "haute-horlogerie",
        "description": "Masterpiece mechanical timepieces, sapphire crystal engineering, and hand-finished chronometry.",
        "image_url": "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=1200&q=80"
    },
    {
        "name": "Smart Living",
        "slug": "smart-living",
        "description": "Architectural minimalism meets intelligent environmental and ambient automation.",
        "image_url": "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80"
    },
    {
        "name": "Optics & Vision",
        "slug": "optics-vision",
        "description": "Precision micro-OLED augmented optics sculpted in lightweight medical-grade titanium.",
        "image_url": "https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&w=1200&q=80"
    },
    {
        "name": "Leather & Travel",
        "slug": "leather-travel",
        "description": "Hand-stitched Tuscan calfskin, ballistic carbon weave, and biometric security travel gear.",
        "image_url": "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=1200&q=80"
    }
]

PRODUCTS_DATA = [
    {
        "category_slug": "audio-acoustics",
        "title": "AURA Aetherial Pro Wireless Headphones",
        "subtitle": "Beryllium Drivers & Active Spatial Cancelling",
        "slug": "aura-aetherial-pro",
        "description": "Engineered without compromise. The Aetherial Pro incorporates bespoke 45mm custom-tuned pure beryllium acoustic drivers encased within CNC-milled aerospace grade 5 titanium. Featuring lossless 24-bit/192kHz Bluetooth 5.4 streaming, active adaptive room-geometry noise cancellation, and supple lambskin ear cushions that provide effortless fatigue-free listening.",
        "price": 890.0,
        "original_price": 980.0,
        "rating": 4.9,
        "reviews_count": 48,
        "stock": 18,
        "is_featured": True,
        "is_trending": True,
        "badge": "Flagship Acoustic",
        "variants": [
            {"id": "slate-titanium", "name": "Slate Titanium", "hex": "#2B2D42"},
            {"id": "obsidian-black", "name": "Obsidian Black", "hex": "#111111"},
            {"id": "champagne-gold", "name": "Champagne Gold", "hex": "#D4AF37"}
        ],
        "specs": {
            "Transducer": "45mm Pure Beryllium Diaphragms",
            "Frequency Response": "5Hz - 48,000Hz",
            "Battery Life": "42 Hours with ANC Active",
            "Chassis": "Aerospace Grade 5 Milled Titanium",
            "Connectivity": "Bluetooth 5.4 / Lossless USB-C Audio / 3.5mm Pure Silver Cable",
            "Weight": "310 grams"
        },
        "images": [
            "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=1200&q=80",
            "https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&w=1200&q=80",
            "https://images.unsplash.com/photo-1484704849700-f032a568e944?auto=format&fit=crop&w=1200&q=80"
        ]
    },
    {
        "category_slug": "haute-horlogerie",
        "title": "Chronos Orbit Flying Tourbillon",
        "subtitle": "Sapphire Monobloc & 72-Hour Co-Axial Reserve",
        "slug": "chronos-orbit-tourbillon",
        "description": "A transcendent expression of micro-engineering. The Chronos Orbit suspends a single-axis flying tourbillon within a monolithic synthetic sapphire crystal case, offering complete 360-degree transparency of its 288-component in-house mechanical movement. Hand-chamfered bridges, blued steel screws, and a dual-barrel system deliver 72 hours of uninterrupted chronometric precision.",
        "price": 3850.0,
        "original_price": 4200.0,
        "rating": 5.0,
        "reviews_count": 27,
        "stock": 6,
        "is_featured": True,
        "is_trending": True,
        "badge": "Limited Edition 50 Pcs",
        "variants": [
            {"id": "sapphire-clear", "name": "Pure Sapphire", "hex": "#E0E7FF"},
            {"id": "smoked-sapphire", "name": "Smoked Anthracite", "hex": "#334155"}
        ],
        "specs": {
            "Movement": "Calibre A-88 Flying Tourbillon, Hand-wound",
            "Power Reserve": "72 Hours via Dual Coupled Barrels",
            "Case Diameter": "41.5mm, 10.8mm Thickness",
            "Case Material": "Solid Monolithic Corundum Sapphire Crystal",
            "Water Resistance": "50 meters (5 ATM)",
            "Strap": "Integrated FKM Rubber & Hand-Stitched Alligator"
        },
        "images": [
            "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=1200&q=80",
            "https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=1200&q=80",
            "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=1200&q=80"
        ]
    },
    {
        "category_slug": "smart-living",
        "title": "Vespera Spatial Architectural Soundbar",
        "subtitle": "Dolby Atmos 9.1.4 in Machined Anodized Aluminum",
        "slug": "vespera-spatial-soundbar",
        "description": "Sculpted from a single extrusion of architectural aluminum, the Vespera seamlessly blends museum-grade design with cinematic acoustics. Fourteen custom neodymium drivers project three-dimensional soundscapes that adapt in real time to the acoustics of your living space via LiDAR room-mapping.",
        "price": 1450.0,
        "original_price": 1600.0,
        "rating": 4.8,
        "reviews_count": 34,
        "stock": 12,
        "is_featured": True,
        "is_trending": False,
        "badge": "Red Dot Best of Best",
        "variants": [
            {"id": "silver-mist", "name": "Silver Mist", "hex": "#E2E8F0"},
            {"id": "matte-black", "name": "Matte Black", "hex": "#1E293B"}
        ],
        "specs": {
            "Audio Channels": "9.1.4 Dolby Atmos & DTS:X Pro",
            "Drivers": "14 Custom Neodymium High-Excursion Arrays",
            "Amplification": "550W Class-D Tri-amplified",
            "LiDAR Mapping": "Automatic Continuous Room Calibration",
            "Inputs": "eARC HDMI 2.1, Optical, AirPlay 2, Spotify Connect",
            "Dimensions": "112cm x 6.5cm x 11cm"
        },
        "images": [
            "https://images.unsplash.com/photo-1545454675-3531b543be5d?auto=format&fit=crop&w=1200&q=80",
            "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&w=1200&q=80"
        ]
    },
    {
        "category_slug": "optics-vision",
        "title": "Lumina Vision Titanium AR Spectacles",
        "subtitle": "Dual 4K Micro-OLED Waveguide Optics",
        "slug": "lumina-vision-ar",
        "description": "The threshold of human-computer interface. Weighing only 64 grams, Lumina Vision combines surgical titanium wireframes with diffractive optical waveguides delivering 4,000-nit peak outdoor brightness. Real-time neural speech translation, heads-up navigation, and context-aware spatial overlays disappear effortlessly into your daily attire.",
        "price": 1280.0,
        "original_price": 1400.0,
        "rating": 4.9,
        "reviews_count": 29,
        "stock": 9,
        "is_featured": True,
        "is_trending": True,
        "badge": "Innovation of the Year",
        "variants": [
            {"id": "brushed-gunmetal", "name": "Brushed Gunmetal", "hex": "#4A5568"},
            {"id": "pale-gold", "name": "Rose Gold", "hex": "#ECC94B"}
        ],
        "specs": {
            "Displays": "Dual 0.55\" Micro-OLED 3840x2160 @ 120Hz",
            "Peak Brightness": "4,000 nits (Full Sunlight Legibility)",
            "Sensors": "Sub-millimeter ToF Depth + 6DoF Inertial Tracking",
            "Frame Weight": "64g (Titanium Alloy)",
            "Battery": "14 hours with accompanying wireless charging case",
            "Prescription": "Magnetic Zeiss custom prescription insert support"
        },
        "images": [
            "https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&w=1200&q=80",
            "https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=1200&q=80"
        ]
    },
    {
        "category_slug": "leather-travel",
        "title": "Valise Noire Carbon Weave Duffel",
        "subtitle": "Ballistic Carbon Twill & Tuscan Vegetable Leather",
        "slug": "valise-noire-carbon-duffel",
        "description": "Crafted for the discerning global traveler. Engineered from resilient 3K carbon-infused ballistic weave paired with hand-buffed full-grain Tuscan vegetable-tanned leather. Features an integrated capacitive fingerprint biometric lock, water-sealed Riri zippers, and an RFID-shielded passport sanctuary compartment.",
        "price": 760.0,
        "original_price": 850.0,
        "rating": 4.9,
        "reviews_count": 52,
        "stock": 14,
        "is_featured": False,
        "is_trending": True,
        "badge": "Bestseller",
        "variants": [
            {"id": "stealth-carbon", "name": "Stealth Carbon", "hex": "#18181B"},
            {"id": "havana-brown", "name": "Havana Cognac", "hex": "#78350F"}
        ],
        "specs": {
            "Exterior": "3K Carbon Fiber Weave + Full-Grain Italian Calfskin",
            "Locking Mechanism": "Capacitive Fingerprint Sensor (0.2s Unlock)",
            "Hardware": "Solid Machined Brass with Matte PVD Coating",
            "Dimensions": "52cm x 28cm x 26cm (IATA Cabin Compliant)",
            "Volume": "38 Liters",
            "Weight": "1.78 kg"
        },
        "images": [
            "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=1200&q=80",
            "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=1200&q=80"
        ]
    },
    {
        "category_slug": "smart-living",
        "title": "Monolith Ambient Air Purifier & Lamp",
        "subtitle": "Volcanic Basalt Ceramic & True Medical HEPA-H14",
        "slug": "monolith-purifier-lamp",
        "description": "An architectural sculpture that rejuvenates the sanctuary of your home. Cast from dense volcanic basalt stone composite, the Monolith silently purifies 850 cubic feet per hour with medical-grade HEPA-H14 filtration while casting a warm circadian glow that synchronizes with the sun.",
        "price": 680.0,
        "original_price": 750.0,
        "rating": 4.7,
        "reviews_count": 21,
        "stock": 8,
        "is_featured": False,
        "is_trending": False,
        "badge": "New Arrival",
        "variants": [
            {"id": "basalt-charcoal", "name": "Basalt Charcoal", "hex": "#27272A"},
            {"id": "limestone-ivory", "name": "Limestone Ivory", "hex": "#F4F4F5"}
        ],
        "specs": {
            "Filtration": "Medical Grade True HEPA-H14 + Activated Carbon Pellet",
            "Acoustics": "Near-silent 19dB in Sleep Sanctuary Mode",
            "Circadian Lighting": "1800K - 4000K Stepless Color Temperature",
            "Sensors": "Laser PM2.5, VOC, Temperature & Humidity",
            "Room Coverage": "Up to 800 sq ft (75 m²)"
        },
        "images": [
            "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80",
            "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=1200&q=80"
        ]
    },
    {
        "category_slug": "smart-living",
        "title": "Eclipse MagSafe Wireless Charging Valet",
        "subtitle": "Solid Billet Aluminum & Horween Leather Inlay",
        "slug": "eclipse-charging-valet",
        "description": "The ultimate bedside or executive desk artifact. Carved from a 4-pound solid billet of aerospace aluminum with an inlay of genuine Chicago Horween leather. Charges your iPhone, Apple Watch Ultra, and AirPods simultaneously with high-speed 25W Qi2 and MagSafe certification.",
        "price": 340.0,
        "original_price": 380.0,
        "rating": 4.9,
        "reviews_count": 64,
        "stock": 25,
        "is_featured": False,
        "is_trending": True,
        "badge": "Essential",
        "variants": [
            {"id": "space-gray-leather", "name": "Space Gray & Black Horween", "hex": "#374151"},
            {"id": "silver-tan-leather", "name": "Silver & Saddle Tan", "hex": "#D97706"}
        ],
        "specs": {
            "Chassis": "CNC Milled Billet Aluminum (Weight: 1.2 kg)",
            "Pad Material": "Vegetable Tanned Chicago Horween Leather",
            "Wireless Speeds": "Phone (15W Qi2), Watch Ultra (Fast 5W), Audio (5W)",
            "Power Adapter": "Included 65W GaN Compact USB-C Supply with Braided Cable"
        },
        "images": [
            "https://images.unsplash.com/photo-1586105251261-72a756497a11?auto=format&fit=crop&w=1200&q=80",
            "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?auto=format&fit=crop&w=1200&q=80"
        ]
    },
    {
        "category_slug": "audio-acoustics",
        "title": "Spectra Artisan Mechanical Keyboard",
        "subtitle": "CNC Brass Weight & Hand-Lubed Ceramic Switches",
        "slug": "spectra-artisan-keyboard",
        "description": "Tactile perfection. The Spectra features a gasket-mounted acoustic isolated sandwich architecture with custom hand-lubricated ceramic stem linear switches. The mirror-polished brass base weight produces a deep, marbly acoustic profile that transforms every keystroke into an opulent sensory experience.",
        "price": 540.0,
        "original_price": 590.0,
        "rating": 4.9,
        "reviews_count": 41,
        "stock": 11,
        "is_featured": True,
        "is_trending": False,
        "badge": "Artisan Guild",
        "variants": [
            {"id": "ceramic-white", "name": "Ceramic Glaze White", "hex": "#F8FAFC"},
            {"id": "raw-titanium", "name": "Anodized Silver", "hex": "#94A3B8"}
        ],
        "specs": {
            "Plate Mounting": "Dual Gasket Silicon Dampened",
            "Switches": "Custom Factory Hand-Lubed 45g Ceramic Linear",
            "Weight": "2.4 kg (Solid Polished Brass Base Plate)",
            "Keycaps": "Triple-shot PBT Profile with Crisp Dye-Sub Legends",
            "Connectivity": "Tri-Mode: 2.4GHz Wireless (1000Hz), Bluetooth 5.3, Detachable USB-C"
        },
        "images": [
            "https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=1200&q=80",
            "https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?auto=format&fit=crop&w=1200&q=80"
        ]
    }
]

REVIEWS_DATA = [
    {
        "author_name": "Lord Harrison V.",
        "rating": 5.0,
        "headline": "Beyond transcendent acoustics.",
        "comment": "The Aetherial Pro headphones are nothing short of an acoustic revelation. The beryllium drivers present soundstage separation I have only ever heard in six-figure studio monitoring environments. Truly peerless craftsmanship."
    },
    {
        "author_name": "Elena Rostova",
        "rating": 5.0,
        "headline": "A horological tour de force.",
        "comment": "Holding the Chronos Orbit in hand is like cradling pure light. The sapphire case machining is flawlessly transparent. The 72-hour reserve has kept time within a single second over three weeks."
    },
    {
        "author_name": "Julian Vance",
        "rating": 5.0,
        "headline": "Spatial audio that reimagines cinema.",
        "comment": "The Vespera soundbar completely replaced my bulky 7.1 amplifier and satellite speakers. The Dolby Atmos height channels bounce off high ceilings with uncanny precision."
    },
    {
        "author_name": "Dr. Claire Beaumont",
        "rating": 4.8,
        "headline": "The future of ambient computing.",
        "comment": "The Lumina AR glasses have transformed my daily rounds and international flights. The waveguide optics are crisp and non-intrusive. Exceptionally lightweight."
    },
    {
        "author_name": "Marcus Sterling",
        "rating": 5.0,
        "headline": "Exquisite travel sanctuary.",
        "comment": "The Valise Noire duffel draws compliments at every private aviation terminal and luxury hotel check-in. The fingerprint biometric latch gives utter peace of mind."
    }
]

def seed_database():
    Base.metadata.create_all(bind=engine)
    db = SessionLocal()

    try:
        # Check if already seeded
        if db.query(User).first():
            print("Database already contains data. Skipping re-seed.")
            return

        print("Seeding AURA Luxury Commerce Database...")

        # 1. Seed Users
        admin_user = User(
            email="admin@aura.luxury",
            hashed_password=hash_password("LuxuryAdmin2026!"),
            full_name="Alexander Wright (Executive)",
            role="admin",
            created_at=datetime.utcnow() - timedelta(days=200)
        )
        client_user = User(
            email="client@aura.luxury",
            hashed_password=hash_password("LuxuryPass2026!"),
            full_name="Lady Victoria Sinclair",
            role="customer",
            created_at=datetime.utcnow() - timedelta(days=180)
        )
        db.add_all([admin_user, client_user])
        db.commit()

        # 2. Seed Categories
        category_map = {}
        for cat_info in CATEGORIES_DATA:
            cat = Category(
                name=cat_info["name"],
                slug=cat_info["slug"],
                description=cat_info["description"],
                image_url=cat_info["image_url"]
            )
            db.add(cat)
            db.commit()
            db.refresh(cat)
            category_map[cat.slug] = cat

        # 3. Seed Products
        product_list = []
        for prod_info in PRODUCTS_DATA:
            cat = category_map[prod_info["category_slug"]]
            product = Product(
                title=prod_info["title"],
                subtitle=prod_info["subtitle"],
                slug=prod_info["slug"],
                description=prod_info["description"],
                price=prod_info["price"],
                original_price=prod_info["original_price"],
                rating=prod_info["rating"],
                reviews_count=prod_info["reviews_count"],
                category_id=cat.id,
                stock=prod_info["stock"],
                is_featured=prod_info["is_featured"],
                is_trending=prod_info["is_trending"],
                badge=prod_info["badge"],
                variants_json=json.dumps(prod_info["variants"]),
                specs_json=json.dumps(prod_info["specs"]),
                images_json=json.dumps(prod_info["images"]),
                created_at=datetime.utcnow() - timedelta(days=random.randint(60, 180))
            )
            db.add(product)
            db.commit()
            db.refresh(product)
            product_list.append(product)

        # 4. Seed Reviews for products
        for i, product in enumerate(product_list):
            for review_data in REVIEWS_DATA:
                review = Review(
                    product_id=product.id,
                    user_id=client_user.id,
                    author_name=review_data["author_name"],
                    rating=review_data["rating"],
                    headline=review_data["headline"],
                    comment=review_data["comment"],
                    verified_purchase=True,
                    created_at=datetime.utcnow() - timedelta(days=random.randint(10, 90))
                )
                db.add(review)
        db.commit()

        # 5. Seed 160 realistic historical orders over past 180 days
        print("Generating 160+ realistic luxury historical orders for analytics...")
        customer_names = [
            ("Victoria Sinclair", "client@aura.luxury", "London, UK"),
            ("Lord Harrison Vance", "harrison.vance@mayfair.co.uk", "London, UK"),
            ("Elena Rostova", "elena.rostova@geneva-capital.ch", "Geneva, Switzerland"),
            ("Julian Montgomery", "j.montgomery@manhattan-cap.com", "New York, USA"),
            ("Marcus Sterling", "sterling@monaco-holdings.mc", "Monaco"),
            ("Dr. Claire Beaumont", "cbeaumont@sorbonne.fr", "Paris, France"),
            ("Kenji Takahashi", "kenji@tokyo-aero.jp", "Tokyo, Japan"),
            ("Sophia Van Der Bilt", "sophia@amsterdam-arts.nl", "Amsterdam, Netherlands"),
            ("Matteo Rossi", "rossi@milano-design.it", "Milan, Italy"),
            ("Henrik Lindqvist", "lindqvist@stockholm-tech.se", "Stockholm, Sweden")
        ]

        payment_methods = ["credit_card", "apple_pay", "crypto"]
        statuses = ["delivered", "delivered", "delivered", "shipped", "processing"]

        now = datetime.utcnow()
        for i in range(165):
            cust_name, cust_email, city_country = random.choice(customer_names)
            order_date = now - timedelta(days=random.randint(1, 180), hours=random.randint(1, 23), minutes=random.randint(0, 59))
            
            # Select 1 to 3 items
            selected_products = random.sample(product_list, k=random.choices([1, 2, 3], weights=[0.65, 0.25, 0.10])[0])
            items_json_data = []
            subtotal = 0.0

            for p in selected_products:
                qty = 1 if p.price > 1000 else random.choice([1, 2])
                item_price = p.price
                subtotal += item_price * qty
                variants = json.loads(p.variants_json)
                v_name = variants[0]["name"] if variants else None
                img = json.loads(p.images_json)[0] if p.images_json else ""
                items_json_data.append({
                    "productId": p.id,
                    "title": p.title,
                    "price": item_price,
                    "quantity": qty,
                    "variant": v_name,
                    "image": img
                })

            shipping_fee = 0.0 if subtotal > 500 else 50.0
            discount = round(subtotal * 0.10, 2) if random.random() < 0.2 else 0.0
            total_amount = round(subtotal - discount + shipping_fee, 2)

            # Order status based on age
            age_days = (now - order_date).days
            if age_days > 5:
                status = "delivered"
            elif age_days > 2:
                status = "shipped"
            else:
                status = "processing"

            order_num = f"AUR-{order_date.strftime('%Y%m%d')}-{uuid.uuid4().hex[:6].upper()}"
            shipping_addr = {
                "full_name": cust_name,
                "address_line": f"{random.randint(10, 999)} Avenue des Étoiles",
                "city": city_country.split(",")[0].strip(),
                "state": "Metropolis",
                "postal_code": f"{random.randint(10000, 99999)}",
                "country": city_country.split(",")[1].strip() if "," in city_country else "USA"
            }

            order = Order(
                order_number=order_num,
                user_id=client_user.id if cust_email == client_user.email else None,
                customer_name=cust_name,
                customer_email=cust_email,
                subtotal=subtotal,
                discount=discount,
                shipping_fee=shipping_fee,
                total_amount=total_amount,
                status=status,
                payment_status="paid",
                payment_method=random.choice(payment_methods),
                shipping_address_json=json.dumps(shipping_addr),
                items_json=json.dumps(items_json_data),
                created_at=order_date,
                updated_at=order_date + timedelta(hours=random.randint(2, 48))
            )
            db.add(order)

        db.commit()
        print("AURA Luxury Database successfully seeded with catalog, users, reviews, and 165 historical orders!")

    except Exception as e:
        print(f"Error seeding database: {e}")
        db.rollback()
    finally:
        db.close()

if __name__ == "__main__":
    seed_database()
