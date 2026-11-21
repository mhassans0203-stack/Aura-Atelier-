export interface ProductVariant {
  id: string;
  name: string;
  hex: string;
}

export interface Product {
  id: number;
  title: string;
  subtitle?: string;
  slug: string;
  description: string;
  price: number;
  original_price?: number;
  rating: number;
  reviews_count: number;
  category_id: number;
  category_name?: string;
  stock: number;
  is_featured: boolean;
  is_trending: boolean;
  badge?: string;
  variants?: ProductVariant[];
  specs?: Record<string, string>;
  images?: string[];
  created_at?: string;
}

export interface Category {
  id: number;
  name: string;
  slug: string;
  description?: string;
  image_url?: string;
  product_count?: number;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedVariant?: ProductVariant;
}

export interface WishlistItem {
  product: Product;
  addedAt: string;
}

export interface ShippingAddress {
  full_name: string;
  address_line: string;
  city: string;
  state: string;
  postal_code: string;
  country: string;
  phone?: string;
}

export interface OrderItem {
  productId: number;
  title: string;
  price: number;
  quantity: number;
  variant?: string;
  image?: string;
}

export interface Order {
  id: number;
  order_number: string;
  user_id?: number;
  customer_name: string;
  customer_email: string;
  subtotal: number;
  discount: number;
  shipping_fee: number;
  total_amount: number;
  status: string;
  payment_status: string;
  payment_method: string;
  shipping_address: ShippingAddress;
  items: OrderItem[];
  created_at: string;
  updated_at: string;
}

export interface User {
  id: number;
  email: string;
  full_name: string;
  role: string;
  created_at: string;
}

export interface Review {
  id: number;
  product_id: number;
  author_name: string;
  rating: number;
  headline?: string;
  comment: string;
  verified_purchase: boolean;
  created_at: string;
}
