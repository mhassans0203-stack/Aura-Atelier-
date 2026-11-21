from sqlalchemy import Column, Integer, String, Float, DateTime, ForeignKey, Text
from sqlalchemy.orm import relationship
from datetime import datetime
from ..database import Base

class Order(Base):
    __tablename__ = "orders"

    id = Column(Integer, primary_key=True, index=True)
    order_number = Column(String, unique=True, index=True, nullable=False)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=True)
    customer_name = Column(String, nullable=False)
    customer_email = Column(String, nullable=False)
    
    subtotal = Column(Float, nullable=False)
    discount = Column(Float, default=0.0)
    shipping_fee = Column(Float, default=0.0)
    total_amount = Column(Float, nullable=False)
    
    status = Column(String, default="processing")  # pending, processing, shipped, delivered, cancelled
    payment_status = Column(String, default="paid")  # paid, pending, failed, refunded
    payment_method = Column(String, default="credit_card")  # credit_card, apple_pay, crypto
    
    shipping_address_json = Column(Text, default="{}")
    items_json = Column(Text, nullable=False)  # list of {productId, title, price, quantity, variant, image}
    
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
