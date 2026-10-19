export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  image_url?: string;
  product_count?: number;
  created_at?: string;
}

export interface ProductDescriptionSection {
  id: string;
  type: "heading" | "text" | "image" | "list" | "callout";
  title?: string;
  content?: string;
  items?: string[];
  image_url?: string;
}

export interface ProductIngredient {
  name: string;
  amount: string;
  purpose: string;
}

export interface Product {
  id: string;
  name: string;
  slug?: string;
  tagline: string;
  sku?: string;
  description?: string;
  description_sections?: ProductDescriptionSection[];
  description_images?: string[];
  images?: string[];
  highlights?: string[];
  dosage?: string;
  ingredients_list?: ProductIngredient[];
  price: number;
  original_price: number;
  save_amount: number;
  discount_percent?: number;
  image_url: string;
  badge?: string;
  is_featured?: boolean;
  in_stock: boolean;
  stock_quantity?: number;
  category?: string;
  category_id?: string;
  created_at?: string;
}

export type OrderStatus =
  | "Pending"
  | "Processing"
  | "Confirmed"
  | "Shipped"
  | "Out for Delivery"
  | "Delivered"
  | "Cancelled";

export type PaymentStatus = "Pending" | "Paid" | "Failed" | "Refunded";

export interface Order {
  id: string;
  order_number: string;
  customer_name: string;
  customer_phone: string;
  customer_email?: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  product_id: string;
  product_name: string;
  quantity: number;
  total_amount: number;
  discount_amount?: number;
  payment_method: "COD" | "Prepaid";
  payment_status?: PaymentStatus;
  status: OrderStatus;
  tracking_number?: string;
  courier_partner?: string;
  estimated_delivery?: string;
  notes?: string;
  created_at: string;
}

export interface Customer {
  id: string;
  name: string;
  phone: string;
  email?: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  total_orders: number;
  total_spent: number;
  first_order_date?: string;
  last_order_date?: string;
  recent_orders?: Order[];
}

export interface SalesStats {
  totalRevenue: number;
  totalOrders: number;
  totalCustomers: number;
  averageOrderValue: number;
  pendingOrders: number;
  processingOrders: number;
  shippedOrders: number;
  deliveredOrders: number;
  cancelledOrders: number;
  totalRefunds: number;
  lowStockCount: number;
  topSellingProducts: Array<{
    id: string;
    name: string;
    salesCount: number;
    revenue: number;
    image_url: string;
    category?: string;
  }>;
  categoryPerformance: Array<{
    category: string;
    count: number;
    revenue: number;
  }>;
  dailyRevenue: Array<{
    date: string;
    revenue: number;
    orders: number;
  }>;
  recentOrders: Order[];
}

export interface AdminUser {
  id: string;
  username: string;
  password_hash: string;
  name: string;
  role: string;
  created_at: string;
  last_login?: string;
}
