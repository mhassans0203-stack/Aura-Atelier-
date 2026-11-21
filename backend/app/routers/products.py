from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from typing import List, Optional
import json

from ..database import get_db
from ..models.product import Product, Category
from ..schemas.product import ProductResponse, CategoryResponse

router = APIRouter(prefix="/api/products", tags=["Products & Categories"])

def format_product(p: Product) -> dict:
    try:
        variants = json.loads(p.variants_json) if p.variants_json else []
    except Exception:
        variants = []
    
    try:
        specs = json.loads(p.specs_json) if p.specs_json else {}
    except Exception:
        specs = {}
        
    try:
        images = json.loads(p.images_json) if p.images_json else []
    except Exception:
        images = []

    return {
        "id": p.id,
        "title": p.title,
        "subtitle": p.subtitle,
        "slug": p.slug,
        "description": p.description,
        "price": p.price,
        "original_price": p.original_price,
        "rating": p.rating,
        "reviews_count": p.reviews_count,
        "category_id": p.category_id,
        "category_name": p.category.name if p.category else None,
        "stock": p.stock,
        "is_featured": p.is_featured,
        "is_trending": p.is_trending,
        "badge": p.badge,
        "variants": variants,
        "specs": specs,
        "images": images,
        "created_at": p.created_at
    }

@router.get("/categories", response_model=List[CategoryResponse])
def get_categories(db: Session = Depends(get_db)):
    categories = db.query(Category).all()
    res = []
    for c in categories:
        res.append({
            "id": c.id,
            "name": c.name,
            "slug": c.slug,
            "description": c.description,
            "image_url": c.image_url,
            "product_count": len(c.products)
        })
    return res

@router.get("", response_model=List[ProductResponse])
def get_products(
    category_slug: Optional[str] = Query(None),
    search: Optional[str] = Query(None),
    min_price: Optional[float] = Query(None),
    max_price: Optional[float] = Query(None),
    featured_only: Optional[bool] = Query(None),
    trending_only: Optional[bool] = Query(None),
    sort_by: Optional[str] = Query("featured"),
    limit: int = Query(50, le=100),
    offset: int = Query(0),
    db: Session = Depends(get_db)
):
    query = db.query(Product)

    if category_slug and category_slug != "all":
        category = db.query(Category).filter(Category.slug == category_slug).first()
        if category:
            query = query.filter(Product.category_id == category.id)

    if search:
        search_filter = f"%{search}%"
        query = query.filter((Product.title.ilike(search_filter)) | (Product.description.ilike(search_filter)) | (Product.subtitle.ilike(search_filter)))

    if min_price is not None:
        query = query.filter(Product.price >= min_price)
    if max_price is not None:
        query = query.filter(Product.price <= max_price)

    if featured_only:
        query = query.filter(Product.is_featured == True)
    if trending_only:
        query = query.filter(Product.is_trending == True)

    if sort_by == "price_asc":
        query = query.order_by(Product.price.asc())
    elif sort_by == "price_desc":
        query = query.order_by(Product.price.desc())
    elif sort_by == "rating":
        query = query.order_by(Product.rating.desc())
    elif sort_by == "newest":
        query = query.order_by(Product.created_at.desc())
    else:
        # Default featured
        query = query.order_by(Product.is_featured.desc(), Product.id.asc())

    products = query.offset(offset).limit(limit).all()
    return [format_product(p) for p in products]

@router.get("/featured", response_model=List[ProductResponse])
def get_featured_products(limit: int = 4, db: Session = Depends(get_db)):
    products = db.query(Product).filter(Product.is_featured == True).limit(limit).all()
    return [format_product(p) for p in products]

@router.get("/{product_id_or_slug}", response_model=ProductResponse)
def get_product(product_id_or_slug: str, db: Session = Depends(get_db)):
    if product_id_or_slug.isdigit():
        product = db.query(Product).filter(Product.id == int(product_id_or_slug)).first()
    else:
        product = db.query(Product).filter(Product.slug == product_id_or_slug).first()

    if not product:
        raise HTTPException(status_code=404, detail="Product not found")

    return format_product(product)
