from pydantic import BaseModel
from typing import List, Dict, Any, Optional

class AnalyticsSummary(BaseModel):
    total_revenue: float
    total_orders: int
    total_customers: int
    average_order_value: float
    total_inventory_units: int
    low_stock_alerts_count: int
    conversion_rate: float
    growth_rate_pct: float

class SalesTrendPoint(BaseModel):
    date: str
    revenue: float
    orders_count: int

class CategoryShare(BaseModel):
    category: str
    revenue: float
    units_sold: int
    percentage: float

class TopProductMetric(BaseModel):
    id: int
    title: str
    category: str
    units_sold: int
    revenue: float
    rating: float
    stock: int

class InventoryStatusItem(BaseModel):
    id: int
    title: str
    category: str
    stock: int
    status: str  # "In Stock", "Low Stock", "Critical"
    unit_price: float
    inventory_value: float

class ForecastPoint(BaseModel):
    date: str
    projected_revenue: float
    lower_bound: float
    upper_bound: float
