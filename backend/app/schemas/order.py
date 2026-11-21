from pydantic import BaseModel
from typing import Optional, List, Any, Dict
from datetime import datetime

class OrderItemSchema(BaseModel):
    product_id: int
    title: str
    price: float
    quantity: int
    variant: Optional[str] = None
    image: Optional[str] = None

class ShippingAddressSchema(BaseModel):
    full_name: str
    address_line: str
    city: str
    state: str
    postal_code: str
    country: str
    phone: Optional[str] = None

class OrderCreate(BaseModel):
    customer_name: str
    customer_email: str
    items: List[OrderItemSchema]
    shipping_address: ShippingAddressSchema
    payment_method: str = "credit_card"
    discount_code: Optional[str] = None

class OrderResponse(BaseModel):
    id: int
    order_number: str
    user_id: Optional[int] = None
    customer_name: str
    customer_email: str
    subtotal: float
    discount: float
    shipping_fee: float
    total_amount: float
    status: str
    payment_status: str
    payment_method: str
    shipping_address: Dict[str, Any]
    items: List[Dict[str, Any]]
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True

class OrderStatusUpdate(BaseModel):
    status: Optional[str] = None
    payment_status: Optional[str] = None
