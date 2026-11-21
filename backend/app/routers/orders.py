from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from typing import List, Optional
import json
import uuid
from datetime import datetime

from ..database import get_db
from ..models.order import Order
from ..models.product import Product
from ..models.user import User
from ..schemas.order import OrderCreate, OrderResponse, OrderStatusUpdate
from .auth import get_current_user

router = APIRouter(prefix="/api/orders", tags=["Orders"])

def format_order(o: Order) -> dict:
    try:
        shipping_addr = json.loads(o.shipping_address_json) if o.shipping_address_json else {}
    except Exception:
        shipping_addr = {}

    try:
        items = json.loads(o.items_json) if o.items_json else []
    except Exception:
        items = []

    return {
        "id": o.id,
        "order_number": o.order_number,
        "user_id": o.user_id,
        "customer_name": o.customer_name,
        "customer_email": o.customer_email,
        "subtotal": o.subtotal,
        "discount": o.discount,
        "shipping_fee": o.shipping_fee,
        "total_amount": o.total_amount,
        "status": o.status,
        "payment_status": o.payment_status,
        "payment_method": o.payment_method,
        "shipping_address": shipping_addr,
        "items": items,
        "created_at": o.created_at,
        "updated_at": o.updated_at
    }

@router.post("", response_model=OrderResponse)
def create_order(order_in: OrderCreate, db: Session = Depends(get_db), current_user: Optional[User] = Depends(get_current_user)):
    if not order_in.items:
        raise HTTPException(status_code=400, detail="Order must contain at least one item")

    subtotal = 0.0
    items_data = []

    for item in order_in.items:
        product = db.query(Product).filter(Product.id == item.product_id).first()
        if not product:
            raise HTTPException(status_code=404, detail=f"Product with ID {item.product_id} not found")
        
        # Decrement stock if available
        if product.stock >= item.quantity:
            product.stock -= item.quantity
        else:
            product.stock = 0

        item_total = item.price * item.quantity
        subtotal += item_total

        items_data.append({
            "productId": item.product_id,
            "title": product.title,
            "price": item.price,
            "quantity": item.quantity,
            "variant": item.variant,
            "image": item.image or (json.loads(product.images_json)[0] if product.images_json else "")
        })

    # Luxury perks: Free express white-glove shipping on orders over $500
    shipping_fee = 0.0 if subtotal > 500 else 50.0
    discount = 0.0
    if order_in.discount_code and order_in.discount_code.upper() in ["AURA10", "LUXURY10", "WELCOME10"]:
        discount = round(subtotal * 0.10, 2)

    total_amount = round(subtotal - discount + shipping_fee, 2)
    order_number = f"AUR-{datetime.utcnow().strftime('%Y%m%d')}-{uuid.uuid4().hex[:6].upper()}"

    new_order = Order(
        order_number=order_number,
        user_id=current_user.id if current_user else None,
        customer_name=order_in.customer_name,
        customer_email=order_in.customer_email,
        subtotal=subtotal,
        discount=discount,
        shipping_fee=shipping_fee,
        total_amount=total_amount,
        status="processing",
        payment_status="paid",
        payment_method=order_in.payment_method,
        shipping_address_json=json.dumps(order_in.shipping_address.model_dump()),
        items_json=json.dumps(items_data),
        created_at=datetime.utcnow(),
        updated_at=datetime.utcnow()
    )

    db.add(new_order)
    db.commit()
    db.refresh(new_order)

    return format_order(new_order)

@router.get("", response_model=List[OrderResponse])
def get_orders(
    status: Optional[str] = Query(None),
    limit: int = Query(50, le=200),
    db: Session = Depends(get_db),
    current_user: Optional[User] = Depends(get_current_user)
):
    query = db.query(Order)
    if current_user and current_user.role != "admin":
        query = query.filter(Order.user_id == current_user.id)
    if status:
        query = query.filter(Order.status == status)

    orders = query.order_by(Order.created_at.desc()).limit(limit).all()
    return [format_order(o) for o in orders]

@router.get("/{order_identifier}", response_model=OrderResponse)
def get_order(order_identifier: str, db: Session = Depends(get_db)):
    if order_identifier.isdigit():
        order = db.query(Order).filter(Order.id == int(order_identifier)).first()
    else:
        order = db.query(Order).filter(Order.order_number == order_identifier).first()

    if not order:
        raise HTTPException(status_code=404, detail="Order not found")

    return format_order(order)

@router.patch("/{order_id}/status", response_model=OrderResponse)
def update_order_status(order_id: int, payload: OrderStatusUpdate, db: Session = Depends(get_db)):
    order = db.query(Order).filter(Order.id == order_id).first()
    if not order:
        raise HTTPException(status_code=404, detail="Order not found")

    if payload.status:
        order.status = payload.status
    if payload.payment_status:
        order.payment_status = payload.payment_status
    order.updated_at = datetime.utcnow()

    db.commit()
    db.refresh(order)
    return format_order(order)
