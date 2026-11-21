from pydantic import BaseModel
from typing import Optional, List, Any
from datetime import datetime

class CategoryBase(BaseModel):
    name: str
    slug: str
    description: Optional[str] = None
    image_url: Optional[str] = None

class CategoryResponse(CategoryBase):
    id: int
    product_count: Optional[int] = 0

    class Config:
        from_attributes = True

class ProductBase(BaseModel):
    title: str
    subtitle: Optional[str] = None
    slug: str
    description: str
    price: float
    original_price: Optional[float] = None
    category_id: int
    stock: int = 10
    is_featured: bool = False
    is_trending: bool = False
    badge: Optional[str] = None

class ProductCreate(ProductBase):
    variants_json: Optional[str] = "[]"
    specs_json: Optional[str] = "{}"
    images_json: Optional[str] = "[]"

class ProductResponse(ProductBase):
    id: int
    rating: float
    reviews_count: int
    variants: Optional[List[Any]] = []
    specs: Optional[dict] = {}
    images: Optional[List[str]] = []
    category_name: Optional[str] = None
    created_at: datetime

    class Config:
        from_attributes = True

class ProductFilterParams(BaseModel):
    category_slug: Optional[str] = None
    search: Optional[str] = None
    min_price: Optional[float] = None
    max_price: Optional[float] = None
    featured_only: Optional[bool] = None
    trending_only: Optional[bool] = None
    sort_by: Optional[str] = "featured"  # "featured", "price_asc", "price_desc", "rating", "newest"
