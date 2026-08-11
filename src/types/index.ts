export interface Product {
  id: string;
  name: string;
  slug: string;
  price: number;
  salePrice?: number;
  brand: string;
  category: string;
  description: string;
  images: string[];
  rating: number;
  reviewCount: number;
  stock: number;
  sku: string;
  tags: string[];
  variations?: Variation[];
  specifications?: Record<string, string>;
  createdAt: string;
  isFeatured?: boolean;
}

export interface Variation {
  name: string; // e.g., "Color", "Size"
  options: string[];
}

export interface CartItem {
  id: string;
  product: Product;
  quantity: number;
  selectedVariations: Record<string, string>; // e.g., { "Color": "Red", "Size": "M" }
}

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone?: string;
  role: 'user' | 'admin';
}

export interface Address {
  id: string;
  firstName: string;
  lastName: string;
  address: string;
  city: string;
  province: string;
  postalCode: string;
  country: string;
  isDefault: boolean;
}

export interface Order {
  id: string;
  userId: string;
  items: CartItem[];
  subtotal: number;
  tax: number;
  shipping: number;
  discount: number;
  total: number;
  status: 'Pending' | 'Confirmed' | 'Processing' | 'Shipped' | 'Out for Delivery' | 'Delivered' | 'Cancelled';
  paymentMethod: string;
  shippingAddress: Address;
  date: string;
}

export interface Review {
  id: string;
  productId: string;
  userId: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
  status: 'approved' | 'pending' | 'rejected';
}

export interface Coupon {
  id: string;
  code: string;
  discountType: 'percentage' | 'fixed';
  discountValue: number;
  minPurchase: number;
  expiry: string;
  status: 'active' | 'inactive';
}
