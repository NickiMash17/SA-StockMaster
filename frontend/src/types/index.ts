// Core data types for the application

export interface Product {
  productId: number;
  name: string;
  description?: string;
  price: number;
  cost: number;
  quantity: number;
  categoryId: number;
  supplierId: number;
  sku: string;
  barcode?: string;
  isLowStock: boolean;
  reorderLevel: number;
  category?: Category;
  supplier?: Supplier;
}

export interface Category {
  categoryId: number;
  name: string;
  description?: string;
}

export interface Supplier {
  supplierId: number;
  name: string;
  contactPerson?: string;
  email?: string;
  phone?: string;
  address?: string;
}

export interface StockMovement {
  movementId: number;
  productId: number;
  quantity: number;
  movementType: 'IN' | 'OUT';
  reference?: string;
  movementDate: string;
  product?: Product;
}

export interface DashboardStats {
  totalProducts: number;
  totalCategories: number;
  totalSuppliers: number;
  lowStockItems: number;
  recentMovements: StockMovement[];
}

export interface Settings {
  id: number;
  vatRegistered: boolean;
  vatRate: number;
  companyName?: string;
  companyAddress?: string;
  companyPhone?: string;
  companyEmail?: string;
}
