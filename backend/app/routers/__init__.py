from .auth import router as auth_router
from .products import router as products_router
from .orders import router as orders_router
from .reviews import router as reviews_router
from .analytics import router as analytics_router

__all__ = ["auth_router", "products_router", "orders_router", "reviews_router", "analytics_router"]
