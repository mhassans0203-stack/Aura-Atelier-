from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List, Optional
from datetime import datetime
from pydantic import BaseModel

from ..database import get_db
from ..models.review import Review
from ..models.product import Product
from ..models.user import User
from .auth import get_current_user

router = APIRouter(prefix="/api/reviews", tags=["Reviews"])

class ReviewCreateSchema(BaseModel):
    author_name: str
    rating: float
    headline: Optional[str] = None
    comment: str

class ReviewResponseSchema(BaseModel):
    id: int
    product_id: int
    author_name: str
    rating: float
    headline: Optional[str] = None
    comment: str
    verified_purchase: bool
    created_at: datetime

    class Config:
        from_attributes = True

@router.get("/product/{product_id}", response_model=List[ReviewResponseSchema])
def get_product_reviews(product_id: int, db: Session = Depends(get_db)):
    reviews = db.query(Review).filter(Review.product_id == product_id).order_by(Review.created_at.desc()).all()
    return reviews

@router.post("/product/{product_id}", response_model=ReviewResponseSchema)
def add_product_review(
    product_id: int,
    review_in: ReviewCreateSchema,
    db: Session = Depends(get_db),
    current_user: Optional[User] = Depends(get_current_user)
):
    product = db.query(Product).filter(Product.id == product_id).first()
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")

    review = Review(
        product_id=product_id,
        user_id=current_user.id if current_user else None,
        author_name=review_in.author_name,
        rating=review_in.rating,
        headline=review_in.headline,
        comment=review_in.comment,
        verified_purchase=True,
        created_at=datetime.utcnow()
    )

    db.add(review)
    
    # Recalculate product rating
    existing_reviews = db.query(Review).filter(Review.product_id == product_id).all()
    all_ratings = [r.rating for r in existing_reviews] + [review_in.rating]
    product.rating = round(sum(all_ratings) / len(all_ratings), 1)
    product.reviews_count = len(all_ratings)

    db.commit()
    db.refresh(review)
    return review
