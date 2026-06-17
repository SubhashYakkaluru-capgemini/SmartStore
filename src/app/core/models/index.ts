// User and Authentication Models
export type UserRole = 'admin' | 'sales';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  createdAt: Date;
}

export interface Employee {
  id: string;
  name: string;
  email: string;
  department: string;
  salary: number;
  createdAt: Date;
}

export interface Product {
  id: string;
  name: string;
  sku: string;
  price: number;
  quantity: number;
  reorderLevel: number;
  category: string;
  createdAt: Date;
}

export interface Sale {
  id: string;
  productId: string;
  productName: string;
  quantity: number;
  unitPrice: number;
  totalAmount: number;
  saleDate: Date;
  salesperson: string;
}

export interface Notification {
  id: string;
  type: 'info' | 'warning' | 'error' | 'success';
  title: string;
  message: string;
  timestamp: Date;
  read: boolean;
}

export interface DashboardMetrics {
  totalRevenue: number;
  todayRevenue: number;
  lowStock: number;
  activeProducts: number;
}
