export enum Role {
  OWNER = 'Owner',
  STAFF = 'Staff',
  CUSTOMER = 'Customer',
}

export interface User {
  id: string;
  name: string;
  role: Role;
  username: string;
}

export enum ProductType {
  COW_MILK = 'Cow Milk',
  BUFFALO_MILK = 'Buffalo Milk',
  CURD = 'Curd',
  PANEER = 'Paneer',
  OTHER = 'Other',
}

export enum ProductUnit {
  LITRE = 'litre',
  KG = 'kg',
}

export interface Product {
  id: string;
  name: string;
  type: ProductType;
  price: number;
  unit: ProductUnit;
  imageUrl: string;
  stock: number;
}

export enum OrderStatus {
  PENDING = 'Pending',
  DELIVERED = 'Delivered',
  CANCELLED = 'Cancelled',
}

export enum SubscriptionFrequency {
  ONCE = 'Once',
  DAILY = 'Daily',
  WEEKLY = 'Weekly',
  MONTHLY = 'Monthly',
}

export interface CustomerInfo {
  name: string;
  street: string;
  city: string;
  pin: string;
  contactNumber: string;
  whatsappNumber: string;
}

export interface Order {
  id: string;
  productId: string;
  quantity: number;
  customerId: string;
  customerInfo: CustomerInfo;
  status: OrderStatus;
  orderDate: string;
  deliveryDate: string;
  frequency: SubscriptionFrequency;
  routeNotes?: string;
}

export interface MilkIntake {
  id: string;
  date: string;
  cowMilkLiters: number;
  buffaloMilkLiters: number;
}

export interface Conversion {
  id: string;
  date: string;
  milkUsedLiters: number;
  curdProducedKg: number;
  paneerProducedKg: number;
}

export interface StaffActivity {
  id: string;
  staffId: string;
  staffName: string;
  action: string;
  timestamp: string;
}

export interface SupportTicket {
  id: string;
  customerId: string;
  customerName: string;
  subject: string;
  message: string;
  date: string;
  status: 'Open' | 'Closed';
}

export interface Review {
  id: string;
  customerName: string;
  rating: number; // 1 to 5
  comment: string;
  date: string;
}